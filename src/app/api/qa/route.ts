import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

// GET /api/qa?college_slug=coep-pune
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('college_slug')
  const admin = createAdminClient()

  let query = admin
    .from('qa_questions')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(20)

  if (slug) {
    const { data: college } = await admin
      .from('colleges').select('id').eq('slug', slug).single()
    if (college) query = query.eq('college_id', college.id)
    else return NextResponse.json({ questions: [], total: 0 })
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ questions: [], total: 0 })
  return NextResponse.json({ questions: data ?? [], total: data?.length ?? 0 })
}

// POST /api/qa
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { college_slug, author_name, author_email, question } = body

    if (!author_name || !question) {
      return NextResponse.json({ error: 'Name and question are required' }, { status: 400 })
    }
    if (question.trim().length < 10) {
      return NextResponse.json({ error: 'Question too short (min 10 chars)' }, { status: 400 })
    }

    const admin = createAdminClient()

    // Look up college_id if slug provided
    let college_id: string | null = null
    if (college_slug) {
      const { data: college } = await admin
        .from('colleges').select('id').eq('slug', college_slug).single()
      college_id = college?.id ?? null
    }

    const { error } = await admin.from('qa_questions').insert({
      college_id,
      author_name: author_name.trim(),
      author_email: author_email || null,
      question:     question.trim(),
      status:       'pending',
    })

    if (error) {
      console.error('[qa POST]', error.message)
      return NextResponse.json({ error: 'Failed to submit question' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Question submitted! Alumni will answer within 24–48 hours.',
    })
  } catch (err) {
    console.error('[qa POST]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
