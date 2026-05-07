#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  Build a production-ready website for a global youth-led environmental initiative called ECODOME.
  Focus areas: mangrove conservation, marine biodiversity, shark nursery preservation, climate
  awareness, youth-driven research. Must feel like a premium environmental movement / modern
  research platform. Cinematic, Apple-level UI with National Geographic visuals. Tech: Next.js +
  Tailwind + Framer Motion + MongoDB (adapted from Postgres+Prisma to match environment).

backend:
  - task: "Research Hub seed + list + filter (GET /api/research, POST /api/research/seed)"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Implemented seed of 12 realistic papers across categories Mangrove Conservation / Marine Biodiversity / Shark Ecology / Climate Impact. GET /api/research supports q (regex on title/abstract/tags/authors), category, region, year, author filters; returns items+total+facets (categories, regions, years, top authors)."
        - working: true
          agent: "testing"
          comment: "✅ All tests passed. Seed idempotency verified (including 5 parallel calls - no duplicates). Total count=12. All filters work correctly: q=shark (3 results), category=Shark Ecology (3 results), year=2025 (7 results), region=Indo-Pacific (1 result), author=Aanya (4 results). Facets return 4 categories, 12 authors. Sorting by year desc, citations desc verified. No _id leakage. Pagination works (limit=3&skip=3)."
  - task: "Research paper detail (GET /api/research/:id)"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Returns paper by uuid id with related[] (same category, max 3). 404 when not found."
        - working: true
          agent: "testing"
          comment: "✅ All tests passed. Paper detail returns all required fields (id, title, abstract, category, related, references, figures, tags, authors). Related array max 3, same category, excludes self. No _id leakage. 404 handling works correctly for non-existent IDs."
  - task: "Research submission (POST /api/research)"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Accepts title/abstract/category required; sets status=pending; returns 201 with the created doc."
        - working: true
          agent: "testing"
          comment: "✅ All tests passed. POST /api/research creates paper with status=pending, returns 201 with generated uuid id. No _id in response. Missing required fields (title/abstract/category) correctly returns 400."
  - task: "Bookmarks (GET / POST / DELETE /api/bookmarks)"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Per-user (userKey from localStorage) bookmarking with upsert on POST and remove on DELETE."
        - working: true
          agent: "testing"
          comment: "✅ All tests passed. POST creates bookmark, upsert prevents duplicates. GET returns bookmarks for userKey. DELETE removes bookmark correctly. Missing paperId or userKey returns 400."
  - task: "Newsletter subscribe (POST /api/newsletter)"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Stores lowercased email in subscribers collection (upsert)."
        - working: true
          agent: "testing"
          comment: "✅ All tests passed. POST /api/newsletter subscribes email with upsert (no duplicates). Missing email returns 400."
  - task: "Contact form (POST /api/contact)"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Accepts name/email/organization/intent/message (email & message required)."
        - working: true
          agent: "testing"
          comment: "✅ All tests passed. POST /api/contact submits message. Missing email or message returns 400."
  - task: "Community join (POST /api/community/join)"
    implemented: true
    working: true
    file: "/app/app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "low"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Upserts member by lowercased email."
        - working: true
          agent: "testing"
          comment: "✅ All tests passed. POST /api/community/join adds member. Missing email or name returns 400."

frontend:
  - task: "Cinematic ECODOME homepage with hero, problem, mangroves, mission, featured research, impact, campaigns, community, partners, CTA, footer"
    implemented: true
    working: "NA"
    file: "/app/app/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Confirmed visually via screenshots. Hero loads cinematic mangrove image with parallax, hero typography is large/elegant, all sections render correctly with Reveal/Stagger animations."
  - task: "Research Hub list page with search/filter/bookmarks"
    implemented: true
    working: "NA"
    file: "/app/app/research/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Verified visually \u2014 12 seeded papers displayed; filter chips, faceted sidebar, bookmark toggle work."
  - task: "Research paper detail page"
    implemented: true
    working: "NA"
    file: "/app/app/research/[id]/page.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Renders title, authors, abstract, figures, references, sidebar stats, related papers, share & bookmark."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 2
  run_ui: false

test_plan:
  current_focus: []
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: |
        ECODOME MVP first cut shipped. Backend uses MongoDB (DB_NAME=ecodome) with collections:
        research_papers, bookmarks, subscribers, contact_messages, members. The seed runs on first
        homepage load via POST /api/research/seed (idempotent). Please verify all endpoints,
        especially: (1) seed idempotency, (2) search regex on q across title/abstract/tags/authors,
        (3) category/region/year filtering, (4) facets returned, (5) bookmark POST/DELETE/GET round
        trip with userKey, (6) detail returns related[]. Test base URL: process.env.NEXT_PUBLIC_BASE_URL
        + /api. All ids are uuid strings, never expose Mongo _id.
    - agent: "testing"
      message: |
        ✅ BACKEND TESTING COMPLETE - ALL 40 TESTS PASSED (100% success rate)
        
        Comprehensive testing completed for all ECODOME backend API endpoints:
        
        1. ✅ GET /api/ - Health check working
        2. ✅ POST /api/research/seed - Idempotent seeding verified (including 5 parallel calls, no duplicates)
        3. ✅ GET /api/research - List with all filters (q, category, region, year, author) and facets working
        4. ✅ GET /api/research/{id} - Detail with related papers working
        5. ✅ POST /api/research - Paper submission with validation working
        6. ✅ Bookmarks CRUD - All operations working with upsert
        7. ✅ POST /api/newsletter - Subscription with upsert working
        8. ✅ POST /api/contact - Contact form with validation working
        9. ✅ POST /api/community/join - Community join with validation working
        
        Key verifications:
        - No _id leakage anywhere in responses
        - All error cases (400, 404) handled correctly
        - Upsert operations prevent duplicates
        - Sorting, pagination, and filtering all work correctly
        - Related papers logic works (same category, max 3, excludes self)
        
        Backend is production-ready. All tasks marked as working: true.
