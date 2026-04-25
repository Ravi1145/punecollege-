import { NextRequest, NextResponse } from 'next/server'
import { getAllBlogs, insertBlog, updateBlog, deleteBlog } from '@/lib/db'
import { isAuthorized, unauthorized, safeInt, safeId } from '@/lib/admin-auth'
import { pingIndexNow } from '@/lib/indexnow'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://collegepune.com'

// GET /api/admin/blogs
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const { searchParams } = new URL(req.url)
    const result = await getAllBlogs({
      status:   searchParams.get('status')   || undefined,
      category: searchParams.get('category') || undefined,
      search:   searchParams.get('search')   || undefined,
      page:     safeInt(searchParams.get('page'),  1),
      limit:    safeInt(searchParams.get('limit'), 20, 100),
    })
    return NextResponse.json(result)
  } catch (err) {
    console.error('[admin/blogs GET]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/blogs — create blog post
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()
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
    // Ping search engines immediately when publishing
    if (body.status === 'published' && body.slug) {
      pingIndexNow([`${BASE_URL}/blog/${body.slug}`, `${BASE_URL}/blog`])
    }
    return NextResponse.json({ success: true, id }, { status: 201 })
  } catch (err) {
    const msg = String(err)
    if (msg.includes('duplicate key') || msg.includes('unique')) {
      return NextResponse.json({ error: 'A blog post with this slug already exists' }, { status: 409 })
    }
    console.error('[admin/blogs POST]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/admin/blogs — update blog by id in body
export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const body = await req.json()
    const { id, ...data } = body
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    // Auto-set published_at on first publish
    if (data.status === 'published' && !data.published_at) {
      data.published_at = new Date().toISOString()
    }
    await updateBlog(safeId(String(id)), data)
    // Ping on publish/update
    if (data.status === 'published' && data.slug) {
      pingIndexNow([`${BASE_URL}/blog/${data.slug}`, `${BASE_URL}/blog`])
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/blogs PUT]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/blogs?id=123
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()
  try {
    const rawId = new URL(req.url).searchParams.get('id')
    if (!rawId) return NextResponse.json({ error: 'id is required' }, { status: 400 })
    await deleteBlog(safeId(rawId))
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/blogs DELETE]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
