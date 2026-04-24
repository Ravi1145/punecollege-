import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { enquirySchema } from '@/lib/validations'
import { insertLead, insertEnquiry, getAllEnquiries } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = enquirySchema.parse(body)

    const leadId = await insertLead({
      name: validated.name,
      phone: validated.phone,
      email: validated.email,
      college_interest: validated.college_name,
      course_interest: validated.course,
      source: 'enquiry_form',
      page_url: req.headers.get('referer') ?? undefined,
    })

    const enquiryId = await insertEnquiry({ ...validated, lead_id: leadId })

    return NextResponse.json({
      success: true,
      enquiryId,
      leadId,
      message: 'Enquiry received! Our team will WhatsApp you within 2 hours.',
      bookingRef: `ENQ-${enquiryId.toString().padStart(4, '0')}`,
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
  return NextResponse.json(await getAllEnquiries())
}
