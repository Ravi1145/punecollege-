import { NextRequest, NextResponse } from 'next/server'
import { getBlogById, updateBlog, deleteBlog } from '@/lib/db'

function auth(req: NextRequest) {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD
}

// GET /api/admin/blogs/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!auth(_req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    const blog = await getBlogById(Number(id))
    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    return NextResponse.json({ blog })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// PUT /api/admin/blogs/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    const body = await req.json()
    if (body.status === 'published' && !body.published_at) {
      body.published_at = new Date().toISOString()
    }
    await updateBlog(Number(id), body)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// DELETE /api/admin/blogs/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!auth(_req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await params
    await deleteBlog(Number(id))
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
