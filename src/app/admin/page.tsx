"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Users, TrendingUp, CheckCircle, Clock, BarChart2,
  Building2, FileText, MessageSquare, PlusCircle, Upload,
  Eye, Globe
} from "lucide-react"
import type { AdminStats } from "@/types"

interface DashboardStats extends AdminStats {
  colleges: { total: number; published: number; draft: number; aiGenerated: number }
  blogs: { total: number; published: number; draft: number }
  enquiries: { total: number; pending: number }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    fetch("/api/admin/stats", { headers: { "x-admin-key": key } })
      .then((r) => {
        if (r.status === 401) { router.replace("/admin/login"); return null }
        return r.json()
      })
      .then((data) => { if (data) setStats(data) })
      .catch(() => setError("Failed to load stats"))
  }, [router])

  if (error) return <p className="text-red-500">{error}</p>
  if (!stats) return (
    <div className="flex items-center justify-center h-40">
      <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const maxSourceCount = Math.max(...stats.leadsBySource.map((s) => s.count), 1)
  const maxDailyCount  = Math.max(...stats.dailyTrend.map((d) => d.count), 1)

  return (
    <div className="space-y-6">

      {/* ── Entity Overview ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Colleges card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <Link href="/admin/colleges" className="text-xs text-orange-600 hover:underline font-medium">
              Manage →
            </Link>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{stats.colleges.total}</p>
          <p className="text-sm text-gray-500 mb-3">Total Colleges</p>
          <div className="flex gap-4 text-xs">
            <span className="text-green-600 font-semibold">
              <Globe className="w-3 h-3 inline mr-0.5" />{stats.colleges.published} Live
            </span>
            <span className="text-yellow-600 font-semibold">{stats.colleges.draft} Draft</span>
          </div>
        </div>

        {/* Blogs card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <Link href="/admin/blogs" className="text-xs text-orange-600 hover:underline font-medium">
              Manage →
            </Link>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{stats.blogs.total}</p>
          <p className="text-sm text-gray-500 mb-3">Total Blogs</p>
          <div className="flex gap-4 text-xs">
            <span className="text-green-600 font-semibold">
              <Eye className="w-3 h-3 inline mr-0.5" />{stats.blogs.published} Published
            </span>
            <span className="text-yellow-600 font-semibold">{stats.blogs.draft} Draft</span>
          </div>
        </div>

        {/* Enquiries card */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-orange-600" />
            </div>
            <Link href="/admin/enquiries" className="text-xs text-orange-600 hover:underline font-medium">
              View →
            </Link>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{stats.enquiries.total}</p>
          <p className="text-sm text-gray-500 mb-3">Total Enquiries</p>
          <div className="flex gap-4 text-xs">
            <span className="text-red-600 font-semibold">{stats.enquiries.pending} Pending</span>
            <span className="text-green-600 font-semibold">
              {stats.enquiries.total - stats.enquiries.pending} Handled
            </span>
          </div>
        </div>
      </div>

      {/* ── Lead Stats ───────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-bold text-gray-700 mb-3">Lead Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Total Leads",  value: stats.totalLeads,     icon: Users,       color: "text-blue-600",    bg: "bg-blue-50" },
            { label: "Today",        value: stats.leadsToday,     icon: TrendingUp,  color: "text-orange-600",  bg: "bg-orange-50" },
            { label: "This Week",    value: stats.leadsThisWeek,  icon: BarChart2,   color: "text-purple-600",  bg: "bg-purple-50" },
            { label: "New",          value: stats.newLeads,       icon: Clock,       color: "text-yellow-600",  bg: "bg-yellow-50" },
            { label: "Contacted",    value: stats.contactedLeads, icon: CheckCircle, color: "text-green-600",   bg: "bg-green-50" },
            { label: "Converted",    value: stats.convertedLeads, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Actions ────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-sm font-bold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/admin/colleges/add"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all text-center"
          >
            <PlusCircle className="w-6 h-6" />
            <span className="text-xs font-semibold">Add College</span>
          </Link>
          <Link
            href="/admin/blogs/add"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400 transition-all text-center"
          >
            <PlusCircle className="w-6 h-6" />
            <span className="text-xs font-semibold">Add Blog Post</span>
          </Link>
          <Link
            href="/admin/import"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-400 transition-all text-center"
          >
            <Upload className="w-6 h-6" />
            <span className="text-xs font-semibold">Import Sheet</span>
          </Link>
          <Link
            href="/admin/leads"
            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 transition-all text-center"
          >
            <Users className="w-6 h-6" />
            <span className="text-xs font-semibold">View Leads</span>
          </Link>
        </div>
      </div>

      {/* ── Charts ──────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Leads by Source */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Leads by Source</h2>
          <div className="space-y-3">
            {stats.leadsBySource.length === 0 && (
              <p className="text-xs text-gray-400">No data yet</p>
            )}
            {stats.leadsBySource.map(({ source, count }) => (
              <div key={source}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600 capitalize">{source.replace(/_/g, " ")}</span>
                  <span className="font-bold text-gray-900">{count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all"
                    style={{ width: `${(count / maxSourceCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Trend */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Leads — Last 7 Days</h2>
          <div className="flex items-end gap-1.5 h-32">
            {stats.dailyTrend.map(({ date, count }) => (
              <div key={date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-gray-700">{count}</span>
                <div
                  className="w-full bg-[#0A1628] rounded-t-sm transition-all"
                  style={{ height: `${Math.max((count / maxDailyCount) * 96, count > 0 ? 8 : 0)}px` }}
                />
                <span className="text-[10px] text-gray-400">
                  {new Date(date).toLocaleDateString("en-IN", { weekday: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leads by Stream */}
      {stats.leadsByStream.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Leads by Stream</h2>
          <div className="flex flex-wrap gap-2">
            {stats.leadsByStream.map(({ stream, count }) => (
              <span key={stream} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                {stream} ({count})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
