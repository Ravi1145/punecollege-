import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { rateLimit } from '@/lib/ratelimit'

// GET /api/reviews?college_slug=coep-pune
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('college_slug')
  if (!slug) return NextResponse.json({ error: 'college_slug required' }, { status: 400 })

  try {
    const admin = createAdminClient()

    // Look up college_id from slug
    const { data: college } = await admin
      .from('colleges')
      .select('id, name')
      .eq('slug', slug)
      .single()

    if (!college) {
      return NextResponse.json({ reviews: [], total: 0, avg: 0 })
    }

    const { data: reviews, error } = await admin
      .from('reviews')
      .select('*')
      .eq('college_id', college.id)
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('[reviews GET]', error.message)
      return NextResponse.json({ reviews: [], total: 0, avg: 0 })
    }

    const total = reviews?.length ?? 0
    const avg = total > 0
      ? Math.round(reviews!.reduce((s, r) => s + r.rating, 0) / total * 10) / 10
      : 0

    // Map DB shape → component's expected shape
    const mapped = (reviews ?? []).map((r) => ({
      id:           r.id,
      student_name: r.author_name,
      course:       r.course ?? '',
      year:         r.batch_year ? String(r.batch_year) : '',
      rating:       r.rating,
      title:        '',
      body:         r.body,
      pros:         r.pros ? r.pros.split('\n').filter(Boolean) : [],
      cons:         r.cons ? r.cons.split('\n').filter(Boolean) : [],
      created_at:   r.created_at,
    }))

    return NextResponse.json({ reviews: mapped, total, avg })
  } catch (err) {
    console.error('[reviews GET]', err)
    return NextResponse.json({ reviews: [], total: 0, avg: 0 })
  }
}

// POST /api/reviews
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
  const { allowed } = rateLimit(`reviews:${ip}`, 3, 60_000) // 3 reviews/min per IP
  if (!allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })

  try {
    const body = await req.json()
    const { college_slug, student_name, rating, review_body, course, year, title, pros, cons } = body

    if (!college_slug || !student_name || !rating || !review_body) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be 1–5' }, { status: 400 })
    }
    if (student_name.length < 2 || review_body.length < 30) {
      return NextResponse.json({ error: 'Name too short or review too brief' }, { status: 400 })
    }

    const admin = createAdminClient()

    // Look up college_id
    const { data: college } = await admin
      .from('colleges')
      .select('id')
      .eq('slug', college_slug)
      .single()

    // If college not found, still save review without college_id linkage
    const prosText = Array.isArray(pros) ? pros.join('\n') : (pros ?? null)
    const consText = Array.isArray(cons) ? cons.join('\n') : (cons ?? null)

    const { error } = await admin.from('reviews').insert({
      college_id:   college?.id ?? null,
      author_name:  student_name,
      rating:       Number(rating),
      body:         review_body,
      pros:         prosText || null,
      cons:         consText || null,
      course:       course || null,
      batch_year:   year && !isNaN(Number(year)) ? Number(year) : null,
      status:       'pending',
    })

    if (error) {
      console.error('[reviews POST]', error.message)
      return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Review submitted! It will appear after moderation (1–2 days).',
    })
  } catch (err) {
    console.error('[reviews POST]', err)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
