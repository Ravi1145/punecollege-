/**
 * server-auth.ts — shared auth guard for all server actions.
 *
 * Usage (top of every 'use server' file):
 *   const profile = await requireAdmin()
 *   // throws redirect to /admin/login if not authenticated/active
 */
'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type AdminProfile = { id: string; role: 'super_admin' | 'agent'; is_active: boolean }

/**
 * Validates the current session and returns the active admin profile.
 * Redirects to /admin/login if:
 *   - No session
 *   - Profile missing or inactive
 */
export async function requireAdmin(): Promise<AdminProfile> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.is_active) redirect('/admin/login')

  return { id: user.id, role: profile.role as AdminProfile['role'], is_active: profile.is_active }
}

/**
 * Super-admin only guard — agents are redirected to /admin.
 */
export async function requireSuperAdmin(): Promise<AdminProfile> {
  const profile = await requireAdmin()
  if (profile.role !== 'super_admin') redirect('/admin')
  return profile
}
