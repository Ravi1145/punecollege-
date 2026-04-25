import { NextRequest, NextResponse } from 'next/server'
import { getCollegeById, updateCollege, deleteCollege } from '@/lib/db'
import { isAuthorized, unauthorized, safeId } from '@/lib/admin-auth'

// GET /api/admin/colleges/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const { id } = await params
    const college = await getCollegeById(safeId(id))
    if (!college) return NextResponse.json({ error: 'College not found' }, { status: 404 })
    return NextResponse.json({ college })
  } catch (err) {
    console.error('[admin/colleges/[id] GET]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/admin/colleges/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const { id } = await params
    const body = await req.json()
    await updateCollege(safeId(id), body)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/colleges/[id] PUT]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/colleges/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const { id } = await params
    await deleteCollege(safeId(id))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/colleges/[id] DELETE]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
