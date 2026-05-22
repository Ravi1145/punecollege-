import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Auth: accept both admin-key header (old) and session cookie (new)
  const adminKey = req.headers.get('x-admin-key')
  const isKeyAuth = adminKey === process.env.ADMIN_PASSWORD

  if (!isKeyAuth) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  const { id } = await params
  const body = await req.json()
  const { status, notes, assigned_to } = body

  const update: Record<string, string> = {}
  if (status)      update.status      = status
  if (notes !== undefined) update.notes = notes
  if (assigned_to) update.assigned_to = assigned_to

  const admin = createAdminClient()
  const { error } = await admin.from('leads').update(update).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
