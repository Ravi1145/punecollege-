'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    redirect('/admin/login?error=Please+enter+email+and+password')
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect('/admin/login?error=' + encodeURIComponent(error.message))
  }

  // Verify profile exists and is active
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login?error=Authentication+failed')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.is_active) {
    await supabase.auth.signOut()
    redirect('/admin/login?error=Account+is+inactive+or+not+found')
  }

  redirect('/admin')
}
