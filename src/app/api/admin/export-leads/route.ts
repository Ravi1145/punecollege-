import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const admin = createAdminClient()
  const { data: leads } = await admin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  const headers = [
    'id', 'name', 'email', 'phone', 'stream',
    'college_interest', 'course_interest', 'budget',
    'exam_type', 'exam_score', 'career_goal',
    'message', 'source', 'page_url', 'status', 'notes', 'created_at',
  ]

  if (!leads || leads.length === 0) {
    return new NextResponse(headers.join(',') + '\n', {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    })
  }

  const rows = leads.map((l) =>
    headers
      .map((h) => JSON.stringify(String((l as Record<string, unknown>)[h] ?? '')))
      .join(',')
  )
  const csv = [headers.join(','), ...rows].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
