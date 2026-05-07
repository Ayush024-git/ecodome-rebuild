#!/usr/bin/env python3
"""
ECODOME Backend API Test Suite
Tests all endpoints according to the review request specification.
"""
import os
import sys
import requests
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/.env')

BASE_URL = os.getenv('NEXT_PUBLIC_BASE_URL', 'https://ecodome-research.preview.emergentagent.com')
API_URL = f"{BASE_URL}/api"

print(f"Testing ECODOME API at: {API_URL}")
print("=" * 80)

# Test counters
tests_passed = 0
tests_failed = 0
test_results = []

def log_test(name, passed, message=""):
    global tests_passed, tests_failed
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {name}")
    if message:
        print(f"   {message}")
    test_results.append({"name": name, "passed": passed, "message": message})
    if passed:
        tests_passed += 1
    else:
        tests_failed += 1

def check_no_mongo_id(data, path="root"):
    """Recursively check that no _id field is exposed"""
    if isinstance(data, dict):
        if '_id' in data:
            return False, f"Found _id at {path}"
        for key, value in data.items():
            result, msg = check_no_mongo_id(value, f"{path}.{key}")
            if not result:
                return False, msg
    elif isinstance(data, list):
        for i, item in enumerate(data):
            result, msg = check_no_mongo_id(item, f"{path}[{i}]")
            if not result:
                return False, msg
    return True, ""

# ============================================================================
# TEST 1: GET /api/ - Health check
# ============================================================================
print("\n[TEST 1] GET /api/ - Health check")
try:
    response = requests.get(f"{API_URL}/", timeout=10)
    if response.status_code == 200:
        data = response.json()
        if data.get('message') == 'ECODOME API online' and data.get('version') == '1.0.0':
            log_test("GET /api/ returns correct health check", True)
        else:
            log_test("GET /api/ returns correct health check", False, f"Unexpected response: {data}")
    else:
        log_test("GET /api/ returns correct health check", False, f"Status: {response.status_code}")
except Exception as e:
    log_test("GET /api/ returns correct health check", False, f"Error: {str(e)}")

# ============================================================================
# TEST 2: POST /api/research/seed - Seed data (idempotency)
# ============================================================================
print("\n[TEST 2] POST /api/research/seed - Seed data")
try:
    # First call should seed
    response = requests.post(f"{API_URL}/research/seed", timeout=10)
    if response.status_code == 200:
        data = response.json()
        if 'count' in data and data['count'] == 12:
            log_test("POST /api/research/seed returns count=12", True, f"seeded={data.get('seeded')}, count={data['count']}")
        else:
            log_test("POST /api/research/seed returns count=12", False, f"Response: {data}")
    else:
        log_test("POST /api/research/seed returns count=12", False, f"Status: {response.status_code}")
    
    # Second call should NOT duplicate
    response2 = requests.post(f"{API_URL}/research/seed", timeout=10)
    if response2.status_code == 200:
        data2 = response2.json()
        if data2.get('seeded') == False and data2.get('count') == 12:
            log_test("POST /api/research/seed is idempotent (2nd call)", True, f"seeded=False, count=12")
        else:
            log_test("POST /api/research/seed is idempotent (2nd call)", False, f"Expected seeded=False, got: {data2}")
    else:
        log_test("POST /api/research/seed is idempotent (2nd call)", False, f"Status: {response2.status_code}")
    
    # Parallel calls test - fire 5 in parallel
    print("   Testing parallel seed calls (5 concurrent)...")
    def call_seed():
        return requests.post(f"{API_URL}/research/seed", timeout=10)
    
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = [executor.submit(call_seed) for _ in range(5)]
        parallel_results = [f.result() for f in as_completed(futures)]
    
    # Verify total count is still 12
    response_check = requests.get(f"{API_URL}/research", timeout=10)
    if response_check.status_code == 200:
        total = response_check.json().get('total', 0)
        if total == 12:
            log_test("POST /api/research/seed handles parallel calls (no duplicates)", True, f"Total papers: {total}")
        else:
            log_test("POST /api/research/seed handles parallel calls (no duplicates)", False, f"Expected 12, got {total}")
    else:
        log_test("POST /api/research/seed handles parallel calls (no duplicates)", False, f"Status: {response_check.status_code}")
        
except Exception as e:
    log_test("POST /api/research/seed tests", False, f"Error: {str(e)}")

# ============================================================================
# TEST 3: GET /api/research - List with facets
# ============================================================================
print("\n[TEST 3] GET /api/research - List with facets")
try:
    response = requests.get(f"{API_URL}/research", timeout=10)
    if response.status_code == 200:
        data = response.json()
        
        # Check structure
        if 'items' in data and 'total' in data and 'facets' in data:
            log_test("GET /api/research returns items, total, facets", True)
        else:
            log_test("GET /api/research returns items, total, facets", False, f"Missing keys in response")
        
        # Check total
        if data.get('total') == 12:
            log_test("GET /api/research total === 12", True)
        else:
            log_test("GET /api/research total === 12", False, f"Total: {data.get('total')}")
        
        # Check items have uuid id (no _id)
        items = data.get('items', [])
        if items:
            first_item = items[0]
            if 'id' in first_item and '_id' not in first_item:
                log_test("GET /api/research items have uuid 'id' (no _id)", True)
            else:
                log_test("GET /api/research items have uuid 'id' (no _id)", False, f"Keys: {first_item.keys()}")
            
            # Check no _id anywhere in response
            no_id_check, msg = check_no_mongo_id(data)
            if no_id_check:
                log_test("GET /api/research no _id leakage", True)
            else:
                log_test("GET /api/research no _id leakage", False, msg)
        
        # Check sorting (year desc, then citations desc)
        if len(items) >= 2:
            sorted_correctly = True
            for i in range(len(items) - 1):
                if items[i]['year'] < items[i+1]['year']:
                    sorted_correctly = False
                    break
                elif items[i]['year'] == items[i+1]['year'] and items[i]['citations'] < items[i+1]['citations']:
                    sorted_correctly = False
                    break
            log_test("GET /api/research sorted by year desc, citations desc", sorted_correctly)
        
        # Check facets
        facets = data.get('facets', {})
        if 'categories' in facets and 'regions' in facets and 'years' in facets and 'authors' in facets:
            categories_count = len(facets['categories'])
            authors_count = len(facets['authors'])
            if categories_count == 4:
                log_test("GET /api/research facets.categories has 4 distinct", True)
            else:
                log_test("GET /api/research facets.categories has 4 distinct", False, f"Count: {categories_count}")
            
            if authors_count <= 12:
                log_test("GET /api/research facets.authors max 12", True, f"Count: {authors_count}")
            else:
                log_test("GET /api/research facets.authors max 12", False, f"Count: {authors_count}")
        else:
            log_test("GET /api/research facets structure", False, f"Facets keys: {facets.keys()}")
        
        # Store first paper ID for later tests
        global first_paper_id
        first_paper_id = items[0]['id'] if items else None
        
    else:
        log_test("GET /api/research", False, f"Status: {response.status_code}")
except Exception as e:
    log_test("GET /api/research tests", False, f"Error: {str(e)}")

# ============================================================================
# TEST 4: GET /api/research?q=shark - Search filter
# ============================================================================
print("\n[TEST 4] GET /api/research?q=shark - Search filter")
try:
    response = requests.get(f"{API_URL}/research?q=shark", timeout=10)
    if response.status_code == 200:
        data = response.json()
        items = data.get('items', [])
        if len(items) >= 2:
            # Verify items contain "shark" in title/abstract/tags/authors
            contains_shark = all(
                'shark' in item.get('title', '').lower() or
                'shark' in item.get('abstract', '').lower() or
                any('shark' in tag.lower() for tag in item.get('tags', [])) or
                any('shark' in author.lower() for author in item.get('authors', []))
                for item in items
            )
            log_test("GET /api/research?q=shark returns matching papers", contains_shark, f"Found {len(items)} papers")
        else:
            log_test("GET /api/research?q=shark returns matching papers", False, f"Expected ≥2, got {len(items)}")
    else:
        log_test("GET /api/research?q=shark", False, f"Status: {response.status_code}")
except Exception as e:
    log_test("GET /api/research?q=shark", False, f"Error: {str(e)}")

# ============================================================================
# TEST 5: GET /api/research?category=Shark Ecology - Category filter
# ============================================================================
print("\n[TEST 5] GET /api/research?category=Shark Ecology - Category filter")
try:
    response = requests.get(f"{API_URL}/research?category=Shark%20Ecology", timeout=10)
    if response.status_code == 200:
        data = response.json()
        items = data.get('items', [])
        if len(items) == 3:
            all_shark_ecology = all(item.get('category') == 'Shark Ecology' for item in items)
            log_test("GET /api/research?category=Shark Ecology", all_shark_ecology, f"Found {len(items)} papers")
        else:
            log_test("GET /api/research?category=Shark Ecology", False, f"Expected 3, got {len(items)}")
    else:
        log_test("GET /api/research?category=Shark Ecology", False, f"Status: {response.status_code}")
except Exception as e:
    log_test("GET /api/research?category=Shark Ecology", False, f"Error: {str(e)}")

# ============================================================================
# TEST 6: GET /api/research?year=2025 - Year filter
# ============================================================================
print("\n[TEST 6] GET /api/research?year=2025 - Year filter")
try:
    response = requests.get(f"{API_URL}/research?year=2025", timeout=10)
    if response.status_code == 200:
        data = response.json()
        items = data.get('items', [])
        all_2025 = all(item.get('year') == 2025 for item in items)
        if all_2025 and len(items) > 0:
            log_test("GET /api/research?year=2025", True, f"Found {len(items)} papers from 2025")
        else:
            log_test("GET /api/research?year=2025", False, f"Items: {len(items)}, all 2025: {all_2025}")
    else:
        log_test("GET /api/research?year=2025", False, f"Status: {response.status_code}")
except Exception as e:
    log_test("GET /api/research?year=2025", False, f"Error: {str(e)}")

# ============================================================================
# TEST 7: GET /api/research?region=Indo-Pacific - Region filter
# ============================================================================
print("\n[TEST 7] GET /api/research?region=Indo-Pacific - Region filter")
try:
    response = requests.get(f"{API_URL}/research?region=Indo-Pacific", timeout=10)
    if response.status_code == 200:
        data = response.json()
        items = data.get('items', [])
        all_indo_pacific = all(item.get('region') == 'Indo-Pacific' for item in items)
        if all_indo_pacific and len(items) > 0:
            log_test("GET /api/research?region=Indo-Pacific", True, f"Found {len(items)} papers")
        else:
            log_test("GET /api/research?region=Indo-Pacific", False, f"Items: {len(items)}, all Indo-Pacific: {all_indo_pacific}")
    else:
        log_test("GET /api/research?region=Indo-Pacific", False, f"Status: {response.status_code}")
except Exception as e:
    log_test("GET /api/research?region=Indo-Pacific", False, f"Error: {str(e)}")

# ============================================================================
# TEST 8: GET /api/research?author=Aanya - Author filter
# ============================================================================
print("\n[TEST 8] GET /api/research?author=Aanya - Author filter")
try:
    response = requests.get(f"{API_URL}/research?author=Aanya", timeout=10)
    if response.status_code == 200:
        data = response.json()
        items = data.get('items', [])
        has_aanya = all(
            any('aanya' in author.lower() for author in item.get('authors', []))
            for item in items
        )
        if has_aanya and len(items) > 0:
            log_test("GET /api/research?author=Aanya (case-insensitive)", True, f"Found {len(items)} papers")
        else:
            log_test("GET /api/research?author=Aanya (case-insensitive)", False, f"Items: {len(items)}, has Aanya: {has_aanya}")
    else:
        log_test("GET /api/research?author=Aanya", False, f"Status: {response.status_code}")
except Exception as e:
    log_test("GET /api/research?author=Aanya", False, f"Error: {str(e)}")

# ============================================================================
# TEST 9: GET /api/research?limit=3&skip=3 - Pagination
# ============================================================================
print("\n[TEST 9] GET /api/research?limit=3&skip=3 - Pagination")
try:
    response = requests.get(f"{API_URL}/research?limit=3&skip=3", timeout=10)
    if response.status_code == 200:
        data = response.json()
        items = data.get('items', [])
        if len(items) == 3:
            log_test("GET /api/research?limit=3&skip=3 pagination", True, f"Returned 3 items")
        else:
            log_test("GET /api/research?limit=3&skip=3 pagination", False, f"Expected 3, got {len(items)}")
    else:
        log_test("GET /api/research?limit=3&skip=3", False, f"Status: {response.status_code}")
except Exception as e:
    log_test("GET /api/research?limit=3&skip=3", False, f"Error: {str(e)}")

# ============================================================================
# TEST 10: GET /api/research/{id} - Paper detail with related
# ============================================================================
print("\n[TEST 10] GET /api/research/{id} - Paper detail")
try:
    if first_paper_id:
        response = requests.get(f"{API_URL}/research/{first_paper_id}", timeout=10)
        if response.status_code == 200:
            data = response.json()
            
            # Check required fields
            required_fields = ['id', 'title', 'abstract', 'category', 'related', 'references', 'figures', 'tags', 'authors']
            has_all_fields = all(field in data for field in required_fields)
            if has_all_fields:
                log_test("GET /api/research/{id} has all required fields", True)
            else:
                missing = [f for f in required_fields if f not in data]
                log_test("GET /api/research/{id} has all required fields", False, f"Missing: {missing}")
            
            # Check related array (max 3, same category, excluding self)
            related = data.get('related', [])
            if len(related) <= 3:
                log_test("GET /api/research/{id} related max 3", True, f"Count: {len(related)}")
            else:
                log_test("GET /api/research/{id} related max 3", False, f"Count: {len(related)}")
            
            # Check no _id in response
            no_id_check, msg = check_no_mongo_id(data)
            if no_id_check:
                log_test("GET /api/research/{id} no _id leakage", True)
            else:
                log_test("GET /api/research/{id} no _id leakage", False, msg)
            
            # Verify related papers are same category and not self
            if related:
                same_category = all(r.get('category') == data.get('category') for r in related)
                not_self = all(r.get('id') != first_paper_id for r in related)
                if same_category and not_self:
                    log_test("GET /api/research/{id} related same category, excludes self", True)
                else:
                    log_test("GET /api/research/{id} related same category, excludes self", False)
        else:
            log_test("GET /api/research/{id}", False, f"Status: {response.status_code}")
    else:
        log_test("GET /api/research/{id}", False, "No paper ID available")
except Exception as e:
    log_test("GET /api/research/{id} tests", False, f"Error: {str(e)}")

# ============================================================================
# TEST 11: GET /api/research/non-existent-id - 404 handling
# ============================================================================
print("\n[TEST 11] GET /api/research/non-existent-id - 404 handling")
try:
    response = requests.get(f"{API_URL}/research/non-existent-uuid-12345", timeout=10)
    if response.status_code == 404:
        data = response.json()
        if 'error' in data:
            log_test("GET /api/research/non-existent-id returns 404", True, f"Error: {data['error']}")
        else:
            log_test("GET /api/research/non-existent-id returns 404", False, "Missing error field")
    else:
        log_test("GET /api/research/non-existent-id returns 404", False, f"Status: {response.status_code}")
except Exception as e:
    log_test("GET /api/research/non-existent-id", False, f"Error: {str(e)}")

# ============================================================================
# TEST 12: POST /api/research - Create new paper
# ============================================================================
print("\n[TEST 12] POST /api/research - Create new paper")
try:
    # Valid submission
    new_paper = {
        "title": "Test Paper: Youth-Led Coral Restoration in the Pacific",
        "abstract": "This study examines the effectiveness of youth-led coral restoration initiatives across 15 Pacific island nations.",
        "category": "Marine Biodiversity"
    }
    response = requests.post(f"{API_URL}/research", json=new_paper, timeout=10)
    if response.status_code == 201:
        data = response.json()
        if 'id' in data and data.get('status') == 'pending':
            log_test("POST /api/research creates paper with status=pending", True, f"ID: {data['id']}")
            
            # Check no _id
            no_id_check, msg = check_no_mongo_id(data)
            if no_id_check:
                log_test("POST /api/research no _id in response", True)
            else:
                log_test("POST /api/research no _id in response", False, msg)
        else:
            log_test("POST /api/research creates paper", False, f"Response: {data}")
    else:
        log_test("POST /api/research creates paper", False, f"Status: {response.status_code}")
    
    # Missing required field (should return 400)
    invalid_paper = {"title": "Test", "abstract": "Test"}  # missing category
    response2 = requests.post(f"{API_URL}/research", json=invalid_paper, timeout=10)
    if response2.status_code == 400:
        log_test("POST /api/research missing required field returns 400", True)
    else:
        log_test("POST /api/research missing required field returns 400", False, f"Status: {response2.status_code}")
        
except Exception as e:
    log_test("POST /api/research tests", False, f"Error: {str(e)}")

# ============================================================================
# TEST 13: Bookmarks CRUD (POST / GET / DELETE)
# ============================================================================
print("\n[TEST 13] Bookmarks CRUD")
try:
    test_user_key = "test-user-ecodome-123"
    test_paper_id = first_paper_id if first_paper_id else "test-paper-id"
    
    # POST bookmark
    bookmark_data = {"paperId": test_paper_id, "userKey": test_user_key}
    response = requests.post(f"{API_URL}/bookmarks", json=bookmark_data, timeout=10)
    if response.status_code == 200:
        log_test("POST /api/bookmarks creates bookmark", True)
    else:
        log_test("POST /api/bookmarks creates bookmark", False, f"Status: {response.status_code}")
    
    # POST same bookmark again (should not duplicate - upsert)
    response2 = requests.post(f"{API_URL}/bookmarks", json=bookmark_data, timeout=10)
    if response2.status_code == 200:
        log_test("POST /api/bookmarks upsert (no duplicate)", True)
    else:
        log_test("POST /api/bookmarks upsert", False, f"Status: {response2.status_code}")
    
    # GET bookmarks
    response3 = requests.get(f"{API_URL}/bookmarks?userKey={test_user_key}", timeout=10)
    if response3.status_code == 200:
        data = response3.json()
        items = data.get('items', [])
        has_bookmark = any(item.get('paperId') == test_paper_id for item in items)
        if has_bookmark:
            log_test("GET /api/bookmarks returns bookmark", True, f"Found {len(items)} bookmarks")
        else:
            log_test("GET /api/bookmarks returns bookmark", False, f"Bookmark not found in {len(items)} items")
    else:
        log_test("GET /api/bookmarks", False, f"Status: {response3.status_code}")
    
    # DELETE bookmark
    response4 = requests.delete(f"{API_URL}/bookmarks?userKey={test_user_key}&paperId={test_paper_id}", timeout=10)
    if response4.status_code == 200:
        log_test("DELETE /api/bookmarks removes bookmark", True)
    else:
        log_test("DELETE /api/bookmarks", False, f"Status: {response4.status_code}")
    
    # GET bookmarks again (should be gone)
    response5 = requests.get(f"{API_URL}/bookmarks?userKey={test_user_key}", timeout=10)
    if response5.status_code == 200:
        data = response5.json()
        items = data.get('items', [])
        bookmark_gone = not any(item.get('paperId') == test_paper_id for item in items)
        if bookmark_gone:
            log_test("GET /api/bookmarks after DELETE (bookmark gone)", True)
        else:
            log_test("GET /api/bookmarks after DELETE", False, "Bookmark still exists")
    else:
        log_test("GET /api/bookmarks after DELETE", False, f"Status: {response5.status_code}")
    
    # Missing paperId (should return 400)
    response6 = requests.post(f"{API_URL}/bookmarks", json={"userKey": test_user_key}, timeout=10)
    if response6.status_code == 400:
        log_test("POST /api/bookmarks missing paperId returns 400", True)
    else:
        log_test("POST /api/bookmarks missing paperId returns 400", False, f"Status: {response6.status_code}")
        
except Exception as e:
    log_test("Bookmarks CRUD tests", False, f"Error: {str(e)}")

# ============================================================================
# TEST 14: POST /api/newsletter - Newsletter subscription
# ============================================================================
print("\n[TEST 14] POST /api/newsletter - Newsletter subscription")
try:
    email = "test.ecodome@example.com"
    
    # First subscription
    response = requests.post(f"{API_URL}/newsletter", json={"email": email}, timeout=10)
    if response.status_code == 200:
        log_test("POST /api/newsletter subscribes email", True)
    else:
        log_test("POST /api/newsletter subscribes email", False, f"Status: {response.status_code}")
    
    # Second subscription (should not duplicate - upsert)
    response2 = requests.post(f"{API_URL}/newsletter", json={"email": email}, timeout=10)
    if response2.status_code == 200:
        log_test("POST /api/newsletter upsert (no duplicate)", True)
    else:
        log_test("POST /api/newsletter upsert", False, f"Status: {response2.status_code}")
    
    # Missing email (should return 400)
    response3 = requests.post(f"{API_URL}/newsletter", json={}, timeout=10)
    if response3.status_code == 400:
        log_test("POST /api/newsletter missing email returns 400", True)
    else:
        log_test("POST /api/newsletter missing email returns 400", False, f"Status: {response3.status_code}")
        
except Exception as e:
    log_test("POST /api/newsletter tests", False, f"Error: {str(e)}")

# ============================================================================
# TEST 15: POST /api/contact - Contact form
# ============================================================================
print("\n[TEST 15] POST /api/contact - Contact form")
try:
    # Valid contact
    contact_data = {
        "email": "researcher@ecodome.org",
        "message": "I'm interested in collaborating on mangrove research.",
        "name": "Dr. Sarah Chen",
        "organization": "Pacific Marine Institute",
        "intent": "collaboration"
    }
    response = requests.post(f"{API_URL}/contact", json=contact_data, timeout=10)
    if response.status_code == 200:
        log_test("POST /api/contact submits message", True)
    else:
        log_test("POST /api/contact submits message", False, f"Status: {response.status_code}")
    
    # Missing email (should return 400)
    response2 = requests.post(f"{API_URL}/contact", json={"message": "Test"}, timeout=10)
    if response2.status_code == 400:
        log_test("POST /api/contact missing email returns 400", True)
    else:
        log_test("POST /api/contact missing email returns 400", False, f"Status: {response2.status_code}")
    
    # Missing message (should return 400)
    response3 = requests.post(f"{API_URL}/contact", json={"email": "test@example.com"}, timeout=10)
    if response3.status_code == 400:
        log_test("POST /api/contact missing message returns 400", True)
    else:
        log_test("POST /api/contact missing message returns 400", False, f"Status: {response3.status_code}")
        
except Exception as e:
    log_test("POST /api/contact tests", False, f"Error: {str(e)}")

# ============================================================================
# TEST 16: POST /api/community/join - Community join
# ============================================================================
print("\n[TEST 16] POST /api/community/join - Community join")
try:
    # Valid join
    member_data = {
        "email": "youth.researcher@ecodome.org",
        "name": "Maya Rodriguez",
        "role": "researcher",
        "country": "Philippines"
    }
    response = requests.post(f"{API_URL}/community/join", json=member_data, timeout=10)
    if response.status_code == 200:
        log_test("POST /api/community/join adds member", True)
    else:
        log_test("POST /api/community/join adds member", False, f"Status: {response.status_code}")
    
    # Missing email (should return 400)
    response2 = requests.post(f"{API_URL}/community/join", json={"name": "Test"}, timeout=10)
    if response2.status_code == 400:
        log_test("POST /api/community/join missing email returns 400", True)
    else:
        log_test("POST /api/community/join missing email returns 400", False, f"Status: {response2.status_code}")
    
    # Missing name (should return 400)
    response3 = requests.post(f"{API_URL}/community/join", json={"email": "test@example.com"}, timeout=10)
    if response3.status_code == 400:
        log_test("POST /api/community/join missing name returns 400", True)
    else:
        log_test("POST /api/community/join missing name returns 400", False, f"Status: {response3.status_code}")
        
except Exception as e:
    log_test("POST /api/community/join tests", False, f"Error: {str(e)}")

# ============================================================================
# SUMMARY
# ============================================================================
print("\n" + "=" * 80)
print("TEST SUMMARY")
print("=" * 80)
print(f"Total Tests: {tests_passed + tests_failed}")
print(f"✅ Passed: {tests_passed}")
print(f"❌ Failed: {tests_failed}")
print(f"Success Rate: {(tests_passed / (tests_passed + tests_failed) * 100):.1f}%")

if tests_failed > 0:
    print("\n❌ FAILED TESTS:")
    for result in test_results:
        if not result['passed']:
            print(f"  - {result['name']}")
            if result['message']:
                print(f"    {result['message']}")
    sys.exit(1)
else:
    print("\n✅ ALL TESTS PASSED!")
    sys.exit(0)
