import { NextRequest, NextResponse } from 'next/server'
import { updateLeadStatus } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const adminKey = req.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await params
  const { status, notes } = await req.json()
  await updateLeadStatus(parseInt(id), status, notes)
  return NextResponse.json({ success: true })
}
