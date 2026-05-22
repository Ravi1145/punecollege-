import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { blogs as staticBlogs } from '@/data/blogs'

// GET /api/blogs — public published blogs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') ?? undefined
    const search   = searchParams.get('search')   ?? undefined
    const page     = Number(searchParams.get('page')  ?? 1)
    const limit    = Number(searchParams.get('limit') ?? 10)
    const offset   = (page - 1) * limit

    const admin = createAdminClient()
    let query = admin
      .from('blogs')
      .select('id, title, slug, excerpt, category, status, created_at, author_id, image_url', { count: 'exact' })
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (category) query = query.eq('category', category)
    if (search)   query = query.ilike('title', `%${search}%`)

    const { data, count, error } = await query

    if (error || !data) {
      // Fallback to static data
      const filtered = staticBlogs
        .filter(b =>
          (!category || b.category === category) &&
          (!search   || b.title.toLowerCase().includes(search.toLowerCase()))
        )
      const paginated = filtered.slice(offset, offset + limit)
      return NextResponse.json({
        blogs: paginated, total: filtered.length,
        page, totalPages: Math.ceil(filtered.length / limit), source: 'static',
      }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } })
    }

    return NextResponse.json({
      blogs: data, total: count ?? 0,
      page, totalPages: Math.ceil((count ?? 0) / limit), source: 'supabase',
    }, { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } })
  } catch (err) {
    console.error('[GET /api/blogs]', err)
    return NextResponse.json({ error: 'Failed to load blogs' }, { status: 500 })
  }
}
