import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { counsellingSchema } from '@/lib/validations'
import { insertLead, insertBooking } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = counsellingSchema.parse(body)

    const leadId = insertLead({
      name: validated.name,
      phone: validated.phone,
      email: validated.email,
      stream: validated.stream,
      exam_score: validated.exam_score,
      source: 'counselling',
    })

    const bookingId = insertBooking({ ...validated, lead_id: leadId })

    return NextResponse.json({
      success: true,
      bookingRef: `BOOK-${bookingId.toString().padStart(4, '0')}`,
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
