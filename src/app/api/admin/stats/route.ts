import { NextRequest, NextResponse } from 'next/server'
import { getLeadsStats } from '@/lib/db'

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key')
  if (adminKey !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(await getLeadsStats())
}
