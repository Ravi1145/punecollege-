"use client"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Lead } from "@/types"

const STATUS_COLORS: Record<string, string> = {
  new: "bg-yellow-100 text-yellow-700",
  contacted: "bg-blue-100 text-blue-700",
  converted: "bg-green-100 text-green-700",
  lost: "bg-red-100 text-red-700",
}

interface LeadsResponse {
  leads: Lead[]
  total: number
  page: number
  totalPages: number
}

export default function AdminLeadsPage() {
  const [data, setData] = useState<LeadsResponse | null>(null)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const fetchLeads = useCallback(async () => {
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" })
      if (statusFilter) params.set("status", statusFilter)
      const res = await fetch(`/api/leads?${params}`, { headers: { "x-admin-key": key } })
      if (res.status === 401) { router.replace("/admin/login"); return }
      const json = await res.json()
      setData(json)
    } catch {
      setError("Failed to load leads")
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter, router])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  const handleStatusChange = async (id: number, status: string) => {
    const key = localStorage.getItem("admin_key")
    if (!key) return
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ status }),
    })
    fetchLeads()
  }

  const handleExport = async () => {
    const key = localStorage.getItem("admin_key")
    if (!key) return
    const res = await fetch("/api/leads/export", { headers: { "x-admin-key": key } })
    if (!res.ok) return
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 bg-white"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
        <button
          onClick={fetchLeads}
          className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
          Refresh
        </button>
        <button
          onClick={handleExport}
          className="ml-auto flex items-center gap-1.5 bg-[#0A1628] hover:bg-[#162040] text-white rounded-lg px-3 py-2 text-sm transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "Name", "Phone", "Email", "Source", "Stream", "College", "Status", "Created"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-400 text-sm">Loading…</td></tr>
              ) : data?.leads.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-400 text-sm">No leads found</td></tr>
              ) : (
                data?.leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{lead.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{lead.name}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{lead.phone}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[140px] truncate">{lead.email ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[11px] font-medium capitalize whitespace-nowrap">
                        {lead.source?.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{lead.stream ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs max-w-[120px] truncate">{lead.college_interest ?? "—"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status ?? "new"}
                        onChange={(e) => lead.id && handleStatusChange(lead.id, e.target.value)}
                        className={cn(
                          "text-xs font-semibold px-2 py-1 rounded-full border-0 outline-none cursor-pointer",
                          STATUS_COLORS[lead.status ?? "new"]
                        )}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {lead.created_at ? new Date(lead.created_at).toLocaleDateString("en-IN") : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500 text-xs">
            Showing {((page - 1) * 20) + 1}–{Math.min(page * 20, data.total)} of {data.total} leads
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1.5 text-xs font-medium">{page} / {data.totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
