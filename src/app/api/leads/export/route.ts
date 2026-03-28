import { NextRequest, NextResponse } from 'next/server'
import { exportLeadsCSV } from '@/lib/db'

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const csv = exportLeadsCSV()
  const date = new Date().toISOString().split('T')[0]
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="leads-${date}.csv"`,
    },
  })
}
