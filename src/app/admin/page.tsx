"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Users, TrendingUp, CheckCircle, Clock, BarChart2 } from "lucide-react"
import type { AdminStats } from "@/types"

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
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

  const statCards = [
    { label: "Total Leads", value: stats.totalLeads, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Today", value: stats.leadsToday, icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "This Week", value: stats.leadsThisWeek, icon: BarChart2, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "New", value: stats.newLeads, icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Contacted", value: stats.contactedLeads, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Converted", value: stats.convertedLeads, icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  ]

  const maxSourceCount = Math.max(...stats.leadsBySource.map((s) => s.count), 1)
  const maxDailyCount = Math.max(...stats.dailyTrend.map((d) => d.count), 1)

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mb-2`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Leads by Source */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Leads by Source</h2>
          <div className="space-y-3">
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
          <h2 className="text-sm font-bold text-gray-700 mb-4">Last 7 Days</h2>
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
