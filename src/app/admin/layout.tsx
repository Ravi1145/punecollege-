import Sidebar from '@/components/admin/Sidebar'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // No user — middleware will redirect to /admin/login.
  // Render bare children so the login page can display without a sidebar.
  if (!user) {
    return <>{children}</>
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active')
    .eq('id', user.id)
    .single()

  // Inactive / no profile — let middleware handle the redirect, just render children
  if (!profile || !profile.is_active) {
    return <>{children}</>
  }

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
