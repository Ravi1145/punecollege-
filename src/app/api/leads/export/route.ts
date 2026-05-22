import { NextRequest, NextResponse } from 'next/server'
import { exportLeadsCSV } from '@/lib/db'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  // Accept either Supabase session (admin UI) or legacy x-admin-key header (CI/tools)
  const adminKey = req.headers.get('x-admin-key')
  const keyValid = adminKey && process.env.ADMIN_PASSWORD && adminKey === process.env.ADMIN_PASSWORD

  if (!keyValid) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { data: profile } = await supabase.from('profiles').select('role, is_active').eq('id', user.id).single()
    if (!profile?.is_active || profile.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const csv = await exportLeadsCSV()
  const date = new Date().toISOString().split('T')[0]
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="leads-${date}.csv"`,
    },
  })
}
