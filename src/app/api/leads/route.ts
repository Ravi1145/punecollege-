import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { leadSchema } from '@/lib/validations'
import { insertLead, getAllLeads } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validated = leadSchema.parse(body)
    const referer = req.headers.get('referer') ?? ''
    const leadId = insertLead({ ...validated, page_url: referer })
    return NextResponse.json({
      success: true,
      leadId,
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
  const { searchParams } = new URL(req.url)
  const result = getAllLeads({
    status: searchParams.get('status') ?? undefined,
    source: searchParams.get('source') ?? undefined,
    stream: searchParams.get('stream') ?? undefined,
    search: searchParams.get('search') ?? undefined,
    page: parseInt(searchParams.get('page') ?? '1'),
    limit: parseInt(searchParams.get('limit') ?? '50'),
  })
  return NextResponse.json(result)
}
