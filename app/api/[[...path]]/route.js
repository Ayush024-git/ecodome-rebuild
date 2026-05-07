import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

// Mongo singleton
let client
let db
async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

const SEED_PAPERS = [
  {
    title: 'Blue Carbon Sequestration Across Indo-Pacific Mangrove Belts: A Decade of Drone-Based Biomass Estimation',
    abstract: 'We synthesize ten years of UAV-LiDAR campaigns across 38 mangrove ecosystems spanning the Indo-Pacific to estimate above- and below-ground carbon stocks. Our model corrects for tidal canopy occlusion and recovers a biomass underestimation bias of 18.7% in earlier studies. We find Indo-Pacific mangroves store an average of 1,083 ± 144 Mg C ha⁻¹ — reaffirming their disproportionate role in the global blue-carbon ledger and underscoring the urgency of intact-canopy protection.',
    category: 'Mangrove Conservation',
    region: 'Indo-Pacific',
    year: 2025,
    authors: ['Aanya Kapoor','Dr. Ravi Mehta','Lina Sutarno','Joaquin Reyes'],
    tags: ['Blue Carbon','LiDAR','Remote Sensing','IPCC'],
    image: 'https://images.unsplash.com/photo-1771985239333-cbf2ab43f566?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxtYW5ncm92ZSUyMGFlcmlhbHxlbnwwfHx8fDE3NzgxNTY4NjF8MA&ixlib=rb-4.1.0&q=85',
    citations: 184,
    downloads: 4720,
    pdfUrl: '#'
  },
  {
    title: 'Juvenile Blacktip Reef Sharks Use Mangrove Roots as Refugia: Evidence from Acoustic Telemetry in French Polynesia',
    abstract: 'Acoustic tagging of 64 juvenile Carcharhinus melanopterus across three lagoons in the Society Islands reveals near-exclusive nocturnal residency within mangrove root systems. Habitat preference correlates strongly with root-density indices and inversely with reef-flat predator activity. Findings argue for the integrated protection of mangrove–reef corridors as a single conservation unit.',
    category: 'Shark Ecology',
    region: 'French Polynesia',
    year: 2025,
    authors: ['Nalu Tehei','Dr. Marie Lévy','Sam Whitfield'],
    tags: ['Sharks','Acoustic Telemetry','Nursery Habitat'],
    image: 'https://images.unsplash.com/photo-1702382116645-e93f30e25626?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwxfHx1bmRlcndhdGVyJTIwc2hhcmt8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85',
    citations: 96,
    downloads: 2840,
    pdfUrl: '#'
  },
  {
    title: 'Coral–Mangrove Connectivity via Environmental DNA: Reconstructing Larval Pathways in Caribbean Reef Systems',
    abstract: 'We deploy environmental DNA metabarcoding across 14 paired mangrove-and-reef sites in Belize and the Bahamas to trace species overlap. Of 312 fish species detected, 41% appear in both habitats, suggesting strong larval mediation by mangroves — with implications for marine protected area design.',
    category: 'Marine Biodiversity',
    region: 'Caribbean',
    year: 2024,
    authors: ['Mateo Salazar','Dr. Keisha Brown','Aanya Kapoor'],
    tags: ['eDNA','Connectivity','MPA Design','Coral Reefs'],
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwxfHxjb3JhbCUyMHJlZWZ8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85',
    citations: 142,
    downloads: 3610,
    pdfUrl: '#'
  },
  {
    title: 'Mangrove Loss as a Predictor of Coastal Storm Damage: Multi-Decadal Satellite Analysis of 1,200 Cyclone Events',
    abstract: 'We pair Landsat mangrove-cover time series (1986–2024) with a global cyclone damage database to test the hypothesis that mangrove buffers mitigate storm losses. Coastlines that retained ≥80% mangrove cover sustained 47–69% lower property damage and 81% fewer fatalities than degraded coastlines, controlling for storm intensity and exposure.',
    category: 'Climate Impact',
    region: 'Global',
    year: 2024,
    authors: ['Dr. Ifeoma Okeke','Hiro Tanaka','Lina Sutarno'],
    tags: ['Climate Resilience','Cyclones','Coastal Protection'],
    image: 'https://images.unsplash.com/photo-1560260240-c6ef90a163a4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwzfHxvY2VhbiUyMHdhdmV8ZW58MHx8fHwxNzc4MTU2ODY5fDA&ixlib=rb-4.1.0&q=85',
    citations: 211,
    downloads: 5980,
    pdfUrl: '#'
  },
  {
    title: 'Restoration at Scale: Community-Led Mangrove Replanting in the Sundarbans Delivers 84% Survival at 36 Months',
    abstract: 'A four-year longitudinal study of community-led replanting across 1,420 ha in the Indian Sundarbans. Survival rates exceed agency-led plantations by 31 percentage points. We attribute this to species-site matching, local stewardship, and adaptive aftercare — offering a replicable model for low-income coastal nations.',
    category: 'Mangrove Conservation',
    region: 'South Asia',
    year: 2025,
    authors: ['Aanya Kapoor','Sundari Das','Aniket Roy'],
    tags: ['Restoration','Community Science','Sundarbans'],
    image: 'https://images.unsplash.com/photo-1717292741426-d050f4f25503?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxtYW5ncm92ZSUyMHJvb3RzJTIwdW5kZXJ3YXRlcnxlbnwwfHx8fDE3NzgxNTY4Njl8MA&ixlib=rb-4.1.0&q=85',
    citations: 73,
    downloads: 1890,
    pdfUrl: '#'
  },
  {
    title: 'Bleaching Refugia in Mangrove-Adjacent Reefs: Thermal Buffering by Tannin-Rich Outflow',
    abstract: 'During the 2024 marine heatwave we monitored 22 paired reef sites and found mangrove-adjacent reefs experienced 1.8–2.6 °C lower peak SST and 38% lower bleaching incidence. Tannin-rich mangrove outflow contributes to UV attenuation and creates micro-refugia for stressed corals.',
    category: 'Marine Biodiversity',
    region: 'Coral Triangle',
    year: 2025,
    authors: ['Joaquin Reyes','Dr. Marie Lévy'],
    tags: ['Bleaching','SST','Refugia'],
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAxODF8MHwxfHNlYXJjaHwzfHxjb3JhbCUyMHJlZWZ8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85',
    citations: 58,
    downloads: 1530,
    pdfUrl: '#'
  },
  {
    title: 'Citizen-Science eDNA Sampling by Youth Volunteers Achieves Lab-Grade Species Detection in Mangrove Estuaries',
    abstract: 'We trained 312 youth volunteers (ages 14–22) across 9 countries to collect eDNA water samples following a standardized protocol. Detection accuracy reached 96.4% versus expert teams — demonstrating that distributed youth networks can produce defensible biodiversity data at a fraction of cost.',
    category: 'Marine Biodiversity',
    region: 'Global',
    year: 2024,
    authors: ['Dr. Ifeoma Okeke','Sam Whitfield','Lina Sutarno','Mateo Salazar'],
    tags: ['Citizen Science','eDNA','Youth Networks'],
    image: 'https://images.unsplash.com/photo-1568816633267-1738dc4aaf97?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2ODl8MHwxfHNlYXJjaHwzfHxtYXJpbmUlMjByZXNlYXJjaCUyMGRpdmVyfGVufDB8fHx8MTc3ODE1Njg2OXww&ixlib=rb-4.1.0&q=85',
    citations: 124,
    downloads: 4180,
    pdfUrl: '#'
  },
  {
    title: 'A Global Atlas of Shark Nursery Habitats Identifies 217 Critical Sites for Immediate Protection',
    abstract: 'Compiling data from 1,840 published surveys, we map 217 shark nursery hotspots, of which only 23% lie within existing MPAs. Mangrove-adjacent nurseries dominate (61%). We propose a tiered protection framework that could safeguard 78% of identified sites within 5 years.',
    category: 'Shark Ecology',
    region: 'Global',
    year: 2025,
    authors: ['Nalu Tehei','Sam Whitfield','Dr. Keisha Brown','Mateo Salazar'],
    tags: ['Atlas','MPAs','Policy'],
    image: 'https://images.unsplash.com/photo-1702381964715-dcb5667a92f1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHw0fHx1bmRlcndhdGVyJTIwc2hhcmt8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85',
    citations: 167,
    downloads: 5240,
    pdfUrl: '#'
  },
  {
    title: 'Rapid Sea-Level Rise and Mangrove Vertical Accretion: Will Forests Drown This Century?',
    abstract: 'Coupling sediment-elevation tables with high-resolution SLR projections, we model survival probability for 412 mangrove sites under SSP2-4.5 and SSP5-8.5. Under high emissions, 36% of sites face submergence by 2100. Sediment-supply restoration emerges as the single most effective adaptation lever.',
    category: 'Climate Impact',
    region: 'Global',
    year: 2025,
    authors: ['Hiro Tanaka','Dr. Ravi Mehta'],
    tags: ['Sea-Level Rise','Adaptation','Modeling'],
    image: 'https://images.unsplash.com/photo-1651011097573-d7783bab82b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwyfHxtYW5ncm92ZSUyMGFlcmlhbHxlbnwwfHx8fDE3NzgxNTY4NjF8MA&ixlib=rb-4.1.0&q=85',
    citations: 89,
    downloads: 2410,
    pdfUrl: '#'
  },
  {
    title: 'Microplastic Accumulation in Mangrove Sediments Outpaces Open-Coast Beaches by an Order of Magnitude',
    abstract: 'Sediment cores from 26 mangrove forests and adjacent beaches show mangrove sediments contain 9.4× more microplastics on average. Tidal flushing and root-trapping concentrate plastic debris, threatening juvenile fish nurseries. We propose protocols for mangrove plastic accounting at national scale.',
    category: 'Climate Impact',
    region: 'West Africa',
    year: 2024,
    authors: ['Dr. Ifeoma Okeke','Aniket Roy'],
    tags: ['Microplastics','Sediments','Pollution'],
    image: 'https://images.unsplash.com/photo-1578142880638-9fc9aba285c2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwzfHxtYW5ncm92ZSUyMHJvb3RzJTIwdW5kZXJ3YXRlcnxlbnwwfHx8fDE3NzgxNTY4Njl8MA&ixlib=rb-4.1.0&q=85',
    citations: 78,
    downloads: 2090,
    pdfUrl: '#'
  },
  {
    title: 'Reef Shark Population Recovery After 5 Years of Mangrove Replanting in the Bay of Bengal',
    abstract: 'A before-after-control-impact (BACI) study across 11 sites shows replanted mangroves trigger a 2.4× increase in juvenile reef shark abundance within 5 years. Recovery follows a logistic trajectory with inflection at year 3, suggesting clear policy-relevant thresholds for habitat continuity.',
    category: 'Shark Ecology',
    region: 'South Asia',
    year: 2025,
    authors: ['Aanya Kapoor','Sundari Das','Nalu Tehei'],
    tags: ['Recovery','BACI','Replanting'],
    image: 'https://images.unsplash.com/photo-1702382116546-9ac886ed2e24?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODl8MHwxfHNlYXJjaHwyfHx1bmRlcndhdGVyJTIwc2hhcmt8ZW58MHx8fHwxNzc4MTU2ODYwfDA&ixlib=rb-4.1.0&q=85',
    citations: 64,
    downloads: 1740,
    pdfUrl: '#'
  },
  {
    title: 'Open Hardware Tide-Gate Sensors Enable Distributed Mangrove Hydrology Monitoring',
    abstract: 'We release schematics and firmware for a $42 solar tide-gate sensor that streams hourly hydrology to an open API. Deployed at 96 sites by youth teams, the network produces hydroperiod data previously achievable only by funded labs.',
    category: 'Mangrove Conservation',
    region: 'Global',
    year: 2024,
    authors: ['Sam Whitfield','Hiro Tanaka','Joaquin Reyes'],
    tags: ['Open Hardware','Hydrology','IoT'],
    image: 'https://images.unsplash.com/photo-1616141893496-fbc65370493e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxNzV8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmV8ZW58MHx8fHwxNzc4MTU2ODY5fDA&ixlib=rb-4.1.0&q=85',
    citations: 41,
    downloads: 1280,
    pdfUrl: '#'
  },
]

async function ensureSeed(db) {
  const col = db.collection('research_papers')
  const sys = db.collection('system')
  // Atomic claim: only the request that creates this doc will perform the seed.
  const claim = await sys.updateOne(
    { _id: 'seed_lock_v1' },
    { $setOnInsert: { _id: 'seed_lock_v1', startedAt: new Date() } },
    { upsert: true }
  )
  if (!claim.upsertedId) {
    const count = await col.countDocuments()
    return { seeded: false, count }
  }
  const docs = SEED_PAPERS.map((p, idx) => ({
    id: uuidv4(),
    ...p,
    submittedAt: new Date(Date.now() - idx * 86400000 * 7),
    status: 'approved',
    references: [
      'Spalding, M. et al. (2010). World Atlas of Mangroves.',
      'Friess, D.A. et al. (2019). The State of the World’s Mangrove Forests. Annu. Rev. Environ. Resour.',
      'Donato, D.C. et al. (2011). Mangroves among the most carbon-rich forests in the tropics. Nature Geoscience.',
      'Heupel, M.R. et al. (2007). Shark nursery areas: concepts, definition, characterization and assumptions. Mar. Ecol. Prog. Ser.',
    ],
    figures: [
      { caption: 'Above- and below-ground biomass distribution across study sites.', src: p.image },
      { caption: 'Decadal change in mangrove canopy area (1996–2024).', src: p.image },
    ],
  }))
  await col.insertMany(docs)
  return { seeded: true, count: docs.length }
}

async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'ECODOME API online', version: '1.0.0' }))
    }

    // ---------- RESEARCH ----------
    if (route === '/research/seed' && method === 'POST') {
      const result = await ensureSeed(db)
      return handleCORS(NextResponse.json(result))
    }

    if (route === '/research' && method === 'GET') {
      const url = new URL(request.url)
      const q = (url.searchParams.get('q') || '').trim()
      const category = url.searchParams.get('category') || ''
      const region = url.searchParams.get('region') || ''
      const year = url.searchParams.get('year') || ''
      const author = url.searchParams.get('author') || ''
      const limit = Math.min(parseInt(url.searchParams.get('limit') || '24', 10), 100)
      const skip = parseInt(url.searchParams.get('skip') || '0', 10)

      // ensure seed if empty
      await ensureSeed(db)

      const filter = { status: 'approved' }
      if (category) filter.category = category
      if (region) filter.region = region
      if (year) filter.year = parseInt(year, 10)
      if (author) filter.authors = { $regex: author, $options: 'i' }
      if (q) {
        filter.$or = [
          { title: { $regex: q, $options: 'i' } },
          { abstract: { $regex: q, $options: 'i' } },
          { tags: { $regex: q, $options: 'i' } },
          { authors: { $regex: q, $options: 'i' } },
        ]
      }

      const col = db.collection('research_papers')
      const total = await col.countDocuments(filter)
      const items = await col.find(filter).sort({ year: -1, citations: -1 }).skip(skip).limit(limit).toArray()
      const cleaned = items.map(({ _id, ...rest }) => rest)

      // facets for filters
      const all = await col.find({ status: 'approved' }, { projection: { category: 1, region: 1, year: 1, authors: 1 } }).toArray()
      const facetCount = (key) => {
        const map = new Map()
        for (const d of all) {
          const v = d[key]
          if (Array.isArray(v)) v.forEach(x => map.set(x, (map.get(x) || 0) + 1))
          else if (v != null) map.set(v, (map.get(v) || 0) + 1)
        }
        return [...map.entries()].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count)
      }
      const facets = {
        categories: facetCount('category'),
        regions: facetCount('region'),
        years: facetCount('year').sort((a,b) => b.value - a.value),
        authors: facetCount('authors').slice(0, 12),
      }

      return handleCORS(NextResponse.json({ items: cleaned, total, facets }))
    }

    if (route.startsWith('/research/') && method === 'GET') {
      const id = route.split('/').pop()
      const doc = await db.collection('research_papers').findOne({ id })
      if (!doc) return handleCORS(NextResponse.json({ error: 'Not found' }, { status: 404 }))
      const { _id, ...rest } = doc
      // related: same category, exclude self
      const related = await db.collection('research_papers')
        .find({ category: doc.category, id: { $ne: id }, status: 'approved' })
        .limit(3).toArray()
      return handleCORS(NextResponse.json({ ...rest, related: related.map(({ _id, ...r }) => r) }))
    }

    if (route === '/research' && method === 'POST') {
      const body = await request.json()
      if (!body.title || !body.abstract || !body.category) {
        return handleCORS(NextResponse.json({ error: 'title, abstract, category required' }, { status: 400 }))
      }
      const doc = {
        id: uuidv4(),
        title: body.title,
        abstract: body.abstract,
        category: body.category,
        region: body.region || 'Global',
        year: body.year || new Date().getFullYear(),
        authors: body.authors || ['Anonymous Contributor'],
        tags: body.tags || [],
        image: body.image || 'https://images.unsplash.com/photo-1771985239333-cbf2ab43f566?crop=entropy&cs=srgb&fm=jpg&q=85',
        citations: 0,
        downloads: 0,
        pdfUrl: body.pdfUrl || '#',
        references: body.references || [],
        figures: body.figures || [],
        submittedAt: new Date(),
        status: 'pending',
      }
      await db.collection('research_papers').insertOne(doc)
      const { _id, ...rest } = doc
      return handleCORS(NextResponse.json(rest, { status: 201 }))
    }

    // ---------- BOOKMARKS ----------
    if (route === '/bookmarks' && method === 'POST') {
      const body = await request.json()
      if (!body.paperId || !body.userKey) {
        return handleCORS(NextResponse.json({ error: 'paperId & userKey required' }, { status: 400 }))
      }
      await db.collection('bookmarks').updateOne(
        { userKey: body.userKey, paperId: body.paperId },
        { $set: { userKey: body.userKey, paperId: body.paperId, createdAt: new Date() } },
        { upsert: true }
      )
      return handleCORS(NextResponse.json({ ok: true }))
    }
    if (route === '/bookmarks' && method === 'DELETE') {
      const url = new URL(request.url)
      const userKey = url.searchParams.get('userKey')
      const paperId = url.searchParams.get('paperId')
      await db.collection('bookmarks').deleteOne({ userKey, paperId })
      return handleCORS(NextResponse.json({ ok: true }))
    }
    if (route === '/bookmarks' && method === 'GET') {
      const url = new URL(request.url)
      const userKey = url.searchParams.get('userKey')
      const items = await db.collection('bookmarks').find({ userKey }).toArray()
      return handleCORS(NextResponse.json({ items: items.map(({ _id, ...r }) => r) }))
    }

    // ---------- NEWSLETTER ----------
    if (route === '/newsletter' && method === 'POST') {
      const body = await request.json()
      if (!body.email) return handleCORS(NextResponse.json({ error: 'email required' }, { status: 400 }))
      await db.collection('subscribers').updateOne(
        { email: body.email.toLowerCase() },
        { $set: { email: body.email.toLowerCase(), subscribedAt: new Date() } },
        { upsert: true }
      )
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // ---------- CONTACT ----------
    if (route === '/contact' && method === 'POST') {
      const body = await request.json()
      if (!body.email || !body.message) return handleCORS(NextResponse.json({ error: 'email & message required' }, { status: 400 }))
      await db.collection('contact_messages').insertOne({
        id: uuidv4(),
        name: body.name || '',
        email: body.email,
        organization: body.organization || '',
        intent: body.intent || 'general',
        message: body.message,
        createdAt: new Date(),
      })
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // ---------- COMMUNITY ----------
    if (route === '/community/join' && method === 'POST') {
      const body = await request.json()
      if (!body.email || !body.name) return handleCORS(NextResponse.json({ error: 'email & name required' }, { status: 400 }))
      await db.collection('members').updateOne(
        { email: body.email.toLowerCase() },
        { $set: { id: uuidv4(), email: body.email.toLowerCase(), name: body.name, role: body.role || 'member', country: body.country || '', joinedAt: new Date() } },
        { upsert: true }
      )
      return handleCORS(NextResponse.json({ ok: true }))
    }

    // ---------- FUTURE PROJECTS NOTIFY ----------
    if (route === '/projects/notify' && method === 'POST') {
      const body = await request.json()
      if (!body.email || !body.projectId) {
        return handleCORS(NextResponse.json({ error: 'email & projectId required' }, { status: 400 }))
      }
      await db.collection('project_notifications').updateOne(
        { email: body.email.toLowerCase(), projectId: body.projectId },
        {
          $set: {
            email: body.email.toLowerCase(),
            projectId: body.projectId,
            projectTitle: body.projectTitle || '',
            updatedAt: new Date(),
          },
          $setOnInsert: { id: uuidv4(), createdAt: new Date() },
        },
        { upsert: true }
      )
      return handleCORS(NextResponse.json({ ok: true }))
    }
    if (route === '/projects/notify' && method === 'GET') {
      const items = await db.collection('project_notifications').find({}).limit(500).toArray()
      const byProject = {}
      for (const it of items) {
        byProject[it.projectId] = (byProject[it.projectId] || 0) + 1
      }
      return handleCORS(NextResponse.json({ counts: byProject, total: items.length }))
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))
  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json({ error: 'Internal server error', detail: String(error?.message || error) }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
