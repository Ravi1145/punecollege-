import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { counsellingSchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendLeadEmail } from '@/lib/mailer'
import { isAllowedOrigin } from '@/lib/csrf'

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
  }
  try {
    const body = await req.json()
    const validated = counsellingSchema.parse(body)
    const referer = req.headers.get('referer') ?? ''

    const admin = createAdminClient()
    const { data, error } = await admin.from('leads').insert({
      name:       validated.name,
      phone:      validated.phone,
      email:      validated.email || null,
      stream:     validated.stream ?? null,
      exam_score: validated.exam_score ?? null,
      source:     'counselling',
      page_url:   referer || null,
      message:    [
        validated.preferred_date ? `Preferred date: ${validated.preferred_date}` : null,
        validated.preferred_time ? `Preferred time: ${validated.preferred_time}` : null,
      ].filter(Boolean).join('\n') || null,
      status: 'new',
    }).select('id').single()

    if (error) console.error('[counselling] Supabase insert error:', error.message)

    const ref = data?.id ? `BOOK-${data.id.slice(-6).toUpperCase()}` : `BOOK-${Date.now().toString(36).toUpperCase()}`

    try {
      await sendLeadEmail({
        name:      validated.name,
        phone:     validated.phone,
        email:     validated.email,
        stream:    validated.stream,
        source:    'counselling',
        page_url:  referer,
      })
    } catch (emailErr) {
      console.error('[counselling] email failed:', emailErr)
    }

    return NextResponse.json({
      success: true,
      bookingRef: ref,
      message: "Booking confirmed! We'll send you a WhatsApp reminder before your session.",
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 })
    }
    console.error('Counselling booking error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
