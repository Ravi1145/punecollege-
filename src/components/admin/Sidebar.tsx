'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const superAdminLinks = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/colleges', label: 'Colleges', icon: '🏫' },
  { href: '/admin/courses', label: 'Courses', icon: '📚' },
  { href: '/admin/blogs', label: 'Blogs', icon: '📝' },
  { href: '/admin/leads', label: 'Leads', icon: '👥' },
  { href: '/admin/approvals', label: 'Approvals', icon: '✅' },
  { href: '/admin/reviews', label: 'Reviews', icon: '⭐' },
  { href: '/admin/qa', label: 'Q&A', icon: '❓' },
  { href: '/admin/hero', label: 'Hero & Banners', icon: '🖼️' },
  { href: '/admin/import', label: 'JSON Import', icon: '📥' },
  { href: '/admin/agents', label: 'Agents', icon: '👤' },
]

const agentLinks = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/colleges', label: 'Colleges', icon: '🏫' },
  { href: '/admin/courses', label: 'Courses', icon: '📚' },
  { href: '/admin/blogs', label: 'Blogs', icon: '📝' },
  { href: '/admin/approvals', label: 'My Submissions', icon: '✅' },
]

interface SidebarProps {
  role: 'super_admin' | 'agent'
  userEmail: string
}

export default function Sidebar({ role, userEmail }: SidebarProps) {
  const pathname = usePathname()
  const links = role === 'super_admin' ? superAdminLinks : agentLinks

  return (
    <aside className="w-64 min-h-screen bg-[#0A1628] flex flex-col shrink-0">
      <div className="px-6 py-5 border-b border-white/10">
        <div className="text-white font-extrabold text-lg">CollegePune</div>
        <div className="text-blue-300 text-xs mt-0.5">Admin Panel</div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== '/admin' && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                isActive
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-6 py-4 border-t border-white/10">
        <div className="text-gray-400 text-xs truncate">{userEmail}</div>
        <div className="text-blue-400 text-xs capitalize mt-0.5">
          {role.replace('_', ' ')}
        </div>
        <form action="/api/admin/logout" method="POST" className="mt-2">
          <button className="text-xs text-red-400 hover:text-red-300 transition-colors">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  )
}
