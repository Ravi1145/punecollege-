import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
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
    const logo_url: string | null = typeof body.logo_url === 'string' ? body.logo_url : null

    const admin = createAdminClient()
    const { error } = await admin
      .from('colleges')
      .update({ logo_url })
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Fetch slug to bust the ISR cache on the college's public page
    const { data: slugRow } = await admin
      .from('colleges')
      .select('slug')
      .eq('id', id)
      .single()

    if (slugRow?.slug) revalidatePath(`/colleges/${slugRow.slug}`)
    revalidatePath('/colleges')  // listing page also shows logos in cards

    return NextResponse.json({ ok: true, logo_url })
  } catch (err) {
    console.error('[PATCH /api/admin/colleges/[id]/logo]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
