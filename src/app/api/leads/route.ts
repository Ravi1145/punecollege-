import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { leadSchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendLeadEmail } from '@/lib/mailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = leadSchema.parse(body)
    const referer = req.headers.get('referer') ?? ''

    const admin = createAdminClient()
    const { error } = await admin.from('leads').insert({
      name:            validated.name,
      phone:           validated.phone,
      email:           validated.email || null,
      stream:          validated.stream ?? null,
      college_interest: validated.college_interest ?? null,
      course_interest: validated.course_interest ?? null,
      budget:          validated.budget ?? null,
      exam_type:       validated.exam_type ?? null,
      exam_score:      validated.exam_score ?? null,
      career_goal:     validated.career_goal ?? null,
      source:          validated.source ?? 'website',
      message:         validated.message ?? null,
      page_url:        referer || null,
      status:          'new',
    })

    if (error) console.error('[leads] Supabase insert error:', error.message)

    try {
      await sendLeadEmail({ ...validated, page_url: referer })
    } catch (emailErr) {
      console.error('[leads] email failed:', emailErr)
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Our counsellor will contact you within 2 hours.',
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 })
    }
    console.error('Lead save error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500)

  if (error) return NextResponse.json({ leads: [], total: 0 })
  return NextResponse.json({ leads: data ?? [], total: data?.length ?? 0 })
}
