'use server'
import { createAdminClient } from '@/lib/supabase/admin'
import { toggleAgentActive } from '@/lib/supabase/queries-admin'
import { revalidatePath } from 'next/cache'
import { requireSuperAdmin } from '@/lib/server-auth'

export async function inviteAgentAction(formData: FormData) {
  await requireSuperAdmin()
  const admin = createAdminClient()
  const email     = formData.get('email') as string
  const full_name = formData.get('full_name') as string

  if (!email) throw new Error('Email is required')

  // Generate temp password
  const tempPassword = `Cp${Math.random().toString(36).slice(-8)}1!`

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { full_name },
  })
  if (error) throw new Error(error.message)

  // Upsert profile with agent role
  const { error: profileError } = await admin.from('profiles').upsert({
    id: data.user.id,
    email,
    full_name: full_name || null,
    role: 'agent',
    is_active: true,
  })
  if (profileError) throw new Error(profileError.message)

  revalidatePath('/admin/agents')
}

export async function toggleAgentActiveAction(id: string, is_active: boolean) {
  await requireSuperAdmin()
  await toggleAgentActive(id, is_active)
  revalidatePath('/admin/agents')
}
