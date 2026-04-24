import { NextRequest, NextResponse } from 'next/server'
import { getAllBlogs } from '@/lib/db'

// GET /api/blogs — public published blogs
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const result = await getAllBlogs({
      status:   'published',
      category: searchParams.get('category') ?? undefined,
      search:   searchParams.get('search')   ?? undefined,
      page:     Number(searchParams.get('page')  ?? 1),
      limit:    Number(searchParams.get('limit') ?? 10),
    })
    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to load blogs' }, { status: 500 })
  }
}
