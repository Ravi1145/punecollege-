import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import StatsCard from '@/components/admin/StatsCard'
import Link from 'next/link'

export const revalidate = 60

export default async function AdminDashboard() {
  const admin = createAdminClient()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await admin
    .from('profiles').select('role').eq('id', user!.id).single()
  const isSuperAdmin = profile?.role === 'super_admin'

  const [
    { count: collegesCount },
    { count: blogsCount },
    { count: leadsCount },
    { count: pendingBlogs },
    { count: pendingReviews },
    { count: pendingQa },
    { data: recentLeads },
    { data: recentColleges },
  ] = await Promise.all([
    admin.from('colleges').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    admin.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    isSuperAdmin
      ? admin.from('leads').select('*', { count: 'exact', head: true })
      : Promise.resolve({ count: 0 }),
    admin.from('blogs').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    admin.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    admin.from('qa_questions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    isSuperAdmin
      ? admin.from('leads').select('id,name,phone,stream,status,created_at').order('created_at', { ascending: false }).limit(5)
      : Promise.resolve({ data: [] }),
    admin.from('colleges').select('id,name,slug,status,created_at').order('created_at', { ascending: false }).limit(5),
  ])

  const pendingTotal = (pendingBlogs ?? 0) + (pendingReviews ?? 0) + (pendingQa ?? 0)

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, {user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Published Colleges" value={collegesCount ?? 0} icon="🏫" color="blue" />
        <StatsCard label="Published Blogs" value={blogsCount ?? 0} icon="📝" color="green" />
        {isSuperAdmin && (
          <StatsCard label="Total Leads" value={leadsCount ?? 0} icon="👥" color="purple" />
        )}
        <StatsCard label="Pending Approvals" value={pendingTotal} icon="⏳" color="orange" />
      </div>

      {/* Pending alert */}
      {pendingTotal > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8 flex items-center justify-between">
          <div>
            <span className="font-semibold text-orange-800">⚠️ {pendingTotal} items awaiting approval</span>
            <div className="text-xs text-orange-600 mt-0.5">
              {pendingBlogs ?? 0} blogs · {pendingReviews ?? 0} reviews · {pendingQa ?? 0} Q&A
            </div>
          </div>
          <Link href="/admin/approvals"
            className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700">
            Review Now →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Leads */}
        {isSuperAdmin && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
              <h2 className="font-bold text-gray-900">Recent Leads</h2>
              <Link href="/admin/leads" className="text-xs text-blue-600 hover:underline">View all →</Link>
            </div>
            {(recentLeads ?? []).length === 0 ? (
              <div className="p-6 text-center text-gray-400 text-sm">No leads yet</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {(recentLeads ?? []).map((lead: Record<string, string>) => (
                  <div key={lead.id} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{lead.name}</div>
                      <div className="text-xs text-gray-400">{lead.phone} · {lead.stream ?? 'No stream'}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>{lead.status}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(lead.created_at).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Recent Colleges */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-gray-900">Recent Colleges</h2>
            <Link href="/admin/colleges" className="text-xs text-blue-600 hover:underline">View all →</Link>
          </div>
          {(recentColleges ?? []).length === 0 ? (
            <div className="p-6 text-center text-gray-400 text-sm">
              No colleges yet.{' '}
              <Link href="/admin/colleges/new" className="text-blue-600 underline">Add one →</Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {(recentColleges ?? []).map((c: Record<string, string>) => (
                <div key={c.id} className="px-5 py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm text-gray-900">{c.name}</div>
                    <div className="text-xs text-gray-400 font-mono">{c.slug}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    c.status === 'published' ? 'bg-green-100 text-green-700' :
                    c.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>{c.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <h2 className="font-bold text-gray-900 mb-3">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { href: '/admin/colleges/new', icon: '🏫', label: 'Add College' },
          { href: '/admin/blogs/new', icon: '📝', label: 'Write Blog' },
          { href: '/admin/approvals', icon: '✅', label: 'Approvals' },
          { href: '/admin/hero', icon: '🖼️', label: 'Hero Banners' },
          ...(isSuperAdmin ? [
            { href: '/admin/leads', icon: '👥', label: 'View Leads' },
            { href: '/admin/import', icon: '📥', label: 'Import JSON' },
            { href: '/admin/agents', icon: '👤', label: 'Manage Agents' },
          ] : []),
        ].map((item) => (
          <Link key={item.href} href={item.href}
            className="bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all text-center">
            <div className="text-2xl mb-1.5">{item.icon}</div>
            <div className="text-sm font-semibold text-gray-800">{item.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
