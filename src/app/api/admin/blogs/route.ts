import { NextRequest, NextResponse } from 'next/server'
import { getAllBlogs, insertBlog, updateBlog, deleteBlog } from '@/lib/db'

// GET /api/admin/blogs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const result = await getAllBlogs({
      status:   searchParams.get('status')   ?? undefined,
      category: searchParams.get('category') ?? undefined,
      search:   searchParams.get('search')   ?? undefined,
      page:     Number(searchParams.get('page')  ?? 1),
      limit:    Number(searchParams.get('limit') ?? 20),
    })
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// POST /api/admin/blogs — create blog post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.slug || !body.title) {
      return NextResponse.json({ error: 'slug and title are required' }, { status: 400 })
    }
    // Auto-set published_at when publishing
    if (body.status === 'published' && !body.published_at) {
      body.published_at = new Date().toISOString()
    }
    const id = await insertBlog(body)
    return NextResponse.json({ success: true, id }, { status: 201 })
  } catch (err) {
    const msg = String(err)
    if (msg.includes('duplicate key') || msg.includes('unique')) {
      return NextResponse.json({ error: 'A blog post with this slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// PUT /api/admin/blogs — update blog by id in body
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    // Auto-set published_at on first publish
    if (data.status === 'published' && !data.published_at) {
      data.published_at = new Date().toISOString()
    }
    await updateBlog(Number(id), data)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// DELETE /api/admin/blogs?id=123
export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await deleteBlog(Number(id))
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
