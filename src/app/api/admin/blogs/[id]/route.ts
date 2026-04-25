import { NextRequest, NextResponse } from 'next/server'
import { getBlogById, updateBlog, deleteBlog } from '@/lib/db'
import { isAuthorized, unauthorized, safeId } from '@/lib/admin-auth'

// GET /api/admin/blogs/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const { id } = await params
    const blog = await getBlogById(safeId(id))
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    return NextResponse.json({ blog })
  } catch (err) {
    console.error('[admin/blogs/[id] GET]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/admin/blogs/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const { id } = await params
    const body = await req.json()
    if (body.status === 'published' && !body.published_at) {
      body.published_at = new Date().toISOString()
    }
    await updateBlog(safeId(id), body)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/blogs/[id] PUT]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/blogs/[id]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const { id } = await params
    await deleteBlog(safeId(id))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/blogs/[id] DELETE]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
