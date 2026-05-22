import { redirect } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active, full_name')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.is_active) redirect('/admin/login')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        role={profile.role as 'super_admin' | 'agent'}
        userEmail={user.email ?? ''}
      />
      <main className="flex-1 overflow-auto min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
