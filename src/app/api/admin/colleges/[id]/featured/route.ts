import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase.from('profiles').select('role, is_active').eq('id', user.id).single()
  if (!profile?.is_active) return null
  return profile
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const profile = await requireAdmin()
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { id } = await params
    const body = await request.json()
    const featured: boolean = Boolean(body.featured)

    const admin = createAdminClient()

    let featured_order = 0
    if (featured) {
      const { data } = await admin
        .from('colleges')
        .select('featured_order')
        .eq('featured', true)
        .order('featured_order', { ascending: false })
        .limit(1)
        .single()
      featured_order = ((data?.featured_order ?? 0) as number) + 1
    }

    const { error } = await admin
      .from('colleges')
      .update({ featured, featured_order: featured ? featured_order : 0 })
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ ok: true, featured, featured_order })
  } catch (err) {
    console.error('[PATCH /api/admin/colleges/[id]/featured]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
