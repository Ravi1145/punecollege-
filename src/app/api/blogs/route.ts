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
      // s-maxage=60: CDN caches for 60s; stale-while-revalidate=120 allows serving stale
      // for 2 more minutes while revalidating in background. Total max stale = 3 min.
      // Admin delete triggers revalidatePath() which busts the ISR pages immediately;
      // the CDN API response will be at most 60s stale.
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to load blogs' }, { status: 500 })
  }
}
