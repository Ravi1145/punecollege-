import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAllColleges, getCollegeById, insertCollege, updateCollege, deleteCollege } from '@/lib/db'
import { isAuthorized, unauthorized, safeInt, safeId } from '@/lib/admin-auth'
import { pingIndexNow } from '@/lib/indexnow'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://collegepune.com'

// GET /api/admin/colleges — paginated list with filters
// By default excludes archived; pass ?status=archived to see them
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const { searchParams } = new URL(req.url)
    const statusParam = searchParams.get('status') || undefined
    const result = await getAllColleges({
      status:          statusParam,
      excludeArchived: !statusParam,
      city:            searchParams.get('city')   || undefined,
      stream:          searchParams.get('stream') || undefined,
      search:          searchParams.get('search') || undefined,
      page:            safeInt(searchParams.get('page'),  1),
      limit:           safeInt(searchParams.get('limit'), 25, 100),
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
    revalidatePath('/colleges')
    if (body.slug) {
      revalidatePath(`/colleges/${body.slug}`)
      pingIndexNow([`${BASE_URL}/colleges/${body.slug}`, `${BASE_URL}/colleges`])
    }
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
    revalidatePath('/colleges')
    if (data.slug) {
      revalidatePath(`/colleges/${data.slug}`)
      pingIndexNow([`${BASE_URL}/colleges/${data.slug}`, `${BASE_URL}/colleges`])
    }
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
    const numId = safeId(rawId)
    // Fetch slug before archiving so we can revalidate the correct page
    const college = await getCollegeById(numId)
    await deleteCollege(numId)
    revalidatePath('/colleges')
    if (college?.slug) {
      revalidatePath(`/colleges/${college.slug}`)
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/colleges DELETE]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
