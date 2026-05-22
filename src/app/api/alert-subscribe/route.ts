import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendLeadEmail } from '@/lib/mailer'

const phoneRegex = /^[6-9]\d{9}$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { phone, exam_name, utm_source, utm_medium, utm_campaign, utm_content } = body

    if (!phone || !phoneRegex.test(phone)) {
      return NextResponse.json({ success: false, message: 'Enter a valid 10-digit Indian mobile number' }, { status: 400 })
    }

    const referer = req.headers.get('referer') ?? ''
    const admin = createAdminClient()

    const utmNote = [utm_source, utm_medium, utm_campaign, utm_content].filter(Boolean).join(' | ')
    const messageText = [
      exam_name ? `${exam_name} merit list & cutoff alert subscription` : 'WhatsApp alert subscription',
      utmNote ? `UTM: ${utmNote}` : null,
    ].filter(Boolean).join('\n')

    const { error } = await admin.from('leads').insert({
      name:     'Alert Subscriber',
      phone,
      source:   'news_alert',
      message:  messageText,
      page_url: referer || null,
      status:   'new',
    })

    if (error) console.error('[alert-subscribe] Supabase insert error:', error.message)

    try {
      await sendLeadEmail({
        name:    'Alert Subscriber',
        phone,
        source:  'news_alert',
        message: exam_name ? `${exam_name} merit list & cutoff alert subscription` : 'WhatsApp alert subscription',
        page_url: referer,
      })
    } catch (emailErr) {
      console.error('[alert-subscribe] email failed:', emailErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[alert-subscribe] error:', err)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
