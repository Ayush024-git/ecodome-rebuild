import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

// Mongo singleton
let db
async function connectToMongo() {
  if (db) return db
  if (!process.env.MONGO_URL) throw new Error('MONGO_URL is not configured')
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  db = client.db(process.env.DB_NAME || 'ecodome')
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

async function handleRoute(request, { params }) {
  const { path = [] } = params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'ECODOME API online', version: '1.0.0' }))
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
