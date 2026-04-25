import { NextRequest, NextResponse } from 'next/server'
import { getAllColleges, insertCollege, updateCollege, deleteCollege } from '@/lib/db'
import { isAuthorized, unauthorized, safeInt, safeId } from '@/lib/admin-auth'

// GET /api/admin/colleges — paginated list with filters
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const { searchParams } = new URL(req.url)
    const result = await getAllColleges({
      status: searchParams.get('status') || undefined,
      city:   searchParams.get('city')   || undefined,
      stream: searchParams.get('stream') || undefined,
      search: searchParams.get('search') || undefined,
      page:   safeInt(searchParams.get('page'),  1),
      limit:  safeInt(searchParams.get('limit'), 25, 100),
    })
    return NextResponse.json(result)
  } catch (err) {
    console.error('[admin/colleges GET]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/colleges — create college
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const body = await req.json()
    if (!body.slug || !body.name || !body.city) {
      return NextResponse.json({ error: 'slug, name, and city are required' }, { status: 400 })
    }
    const id = await insertCollege(body)
    return NextResponse.json({ success: true, id }, { status: 201 })
  } catch (err) {
    const msg = String(err)
    if (msg.includes('duplicate key') || msg.includes('unique')) {
      return NextResponse.json({ error: 'A college with this slug already exists' }, { status: 409 })
    }
    console.error('[admin/colleges POST]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/admin/colleges — update college by id in body
export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const body = await req.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await updateCollege(safeId(String(id)), data)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/colleges PUT]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/colleges?id=123 — soft delete (archive)
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const rawId = new URL(req.url).searchParams.get('id')
    if (!rawId) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await deleteCollege(safeId(rawId))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/colleges DELETE]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
