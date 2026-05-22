import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import StatsCard from '@/components/admin/StatsCard'
import Link from 'next/link'

export const revalidate = 60

export default async function AdminDashboard() {
  const admin = createAdminClient()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user!.id)
    .single()

  const isSuperAdmin = profile?.role === 'super_admin'

  const [
    { count: collegesCount },
    { count: blogsCount },
    { count: leadsCount },
    { count: pendingBlogs },
    { count: pendingReviews },
  ] = await Promise.all([
    admin.from('colleges').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    admin.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    admin.from('leads').select('*', { count: 'exact', head: true }),
    admin.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    admin.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ])

  const pendingTotal = (pendingBlogs ?? 0) + (pendingReviews ?? 0)

  const quickLinks = [
    { href: '/admin/colleges', label: 'Manage Colleges', icon: '🏫', desc: 'Add, edit, or remove college listings' },
    { href: '/admin/blogs', label: 'Manage Blogs', icon: '📝', desc: 'Write and publish blog articles' },
    { href: '/admin/approvals', label: 'Approvals Queue', icon: '✅', desc: 'Review pending submissions' },
    ...(isSuperAdmin ? [
      { href: '/admin/leads', label: 'View Leads', icon: '👥', desc: 'Student enquiries and contact forms' },
      { href: '/admin/import', label: 'JSON Import', icon: '📥', desc: 'Bulk import colleges or blogs' },
      { href: '/admin/agents', label: 'Manage Agents', icon: '👤', desc: 'Add or deactivate agent accounts' },
    ] : []),
  ]

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Published Colleges" value={collegesCount ?? 0} icon="🏫" color="blue" />
        <StatsCard label="Published Blogs" value={blogsCount ?? 0} icon="📝" color="green" />
        {isSuperAdmin && (
          <StatsCard label="Total Leads" value={leadsCount ?? 0} icon="👥" color="purple" />
        )}
        <StatsCard label="Pending Approvals" value={pendingTotal} icon="⏳" color="orange" />
      </div>

      {pendingTotal > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="font-semibold text-orange-800">
            ⚠️ {pendingTotal} items awaiting approval
          </div>
          <Link href="/admin/approvals" className="text-orange-700 text-sm underline font-medium">
            Go to Approvals →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
            <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
