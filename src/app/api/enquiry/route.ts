import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { enquirySchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendLeadEmail } from '@/lib/mailer'
import { isAllowedOrigin } from '@/lib/csrf'

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
  }
  try {
    const body = await req.json()
    const validated = enquirySchema.parse(body)
    const referer = req.headers.get('referer') ?? ''

    const admin = createAdminClient()
    const { data, error } = await admin.from('leads').insert({
      name:            validated.name,
      phone:           validated.phone,
      email:           validated.email || null,
      college_interest: validated.college_name,
      course_interest: validated.course ?? null,
      message:         validated.message ?? null,
      source:          'enquiry_form',
      page_url:        referer || null,
      status:          'new',
    }).select('id').single()

    if (error) console.error('[enquiry] Supabase insert error:', error.message)

    const ref = data?.id ? `ENQ-${data.id.slice(-6).toUpperCase()}` : `ENQ-${Date.now().toString(36).toUpperCase()}`

    // Send notification email
    try {
      await sendLeadEmail({
        name:             validated.name,
        phone:            validated.phone,
        email:            validated.email,
        college_interest: validated.college_name,
        source:           'enquiry_form',
        page_url:         referer,
      })
    } catch (emailErr) {
      console.error('[enquiry] email failed:', emailErr)
    }

    return NextResponse.json({
      success: true,
      enquiryId: data?.id ?? ref,
      leadId:    data?.id ?? null,
      message:   'Enquiry received! Our team will WhatsApp you within 2 hours.',
      bookingRef: ref,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 })
    }
    console.error('Enquiry error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const admin = createAdminClient()
  const { data } = await admin
    .from('leads')
    .select('*')
    .eq('source', 'enquiry_form')
    .order('created_at', { ascending: false })
  return NextResponse.json({ leads: data ?? [], total: data?.length ?? 0 })
}
