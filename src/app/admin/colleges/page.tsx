"use client"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, RefreshCw, Pencil, Trash2, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface College {
  id: number
  slug: string
  name: string
  short_name?: string
  city: string
  stream?: string
  type?: string
  naac_grade?: string
  status: string
  ai_generated: boolean
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  published: "bg-green-100 text-green-700",
  draft:     "bg-yellow-100 text-yellow-700",
  archived:  "bg-gray-100 text-gray-500",
}

export default function AdminCollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [total, setTotal]       = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage]         = useState(1)
  const [search, setSearch]     = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState("")
  const router = useRouter()

  const fetchColleges = useCallback(async () => {
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    setLoading(true); setError("")
    try {
      const params = new URLSearchParams({ page: String(page), limit: "25" })
      if (search)       params.set("search", search)
      if (statusFilter) params.set("status", statusFilter)
      const res = await fetch(`/api/admin/colleges?${params}`, { headers: { "x-admin-key": key } })
      if (res.status === 401) { router.replace("/admin/login"); return }
      const json = await res.json()
      setColleges(json.colleges ?? [])
      setTotal(json.total ?? 0)
      setTotalPages(json.totalPages ?? 1)
    } catch { setError("Failed to load colleges") }
    finally { setLoading(false) }
  }, [page, search, statusFilter, router])

  useEffect(() => { fetchColleges() }, [fetchColleges])

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Archive "${name}"? It will be hidden from public view.`)) return
    const key = localStorage.getItem("admin_key")
    if (!key) return
    await fetch(`/api/admin/colleges?id=${id}`, { method: "DELETE", headers: { "x-admin-key": key } })
    fetchColleges()
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search colleges…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 bg-white"
        >
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <button
          onClick={fetchColleges}
          className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
          Refresh
        </button>
        <Link
          href="/admin/colleges/add"
          className="ml-auto flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add College
        </Link>
      </div>

      <p className="text-xs text-gray-500">{total} college{total !== 1 ? "s" : ""} total</p>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "Name", "City", "Stream", "Type", "NAAC", "Status", "AI", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={9} className="px-4 py-10 text-center text-gray-400 text-sm">Loading…</td></tr>
              ) : colleges.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-gray-400 text-sm">
                    No colleges found.{" "}
                    <Link href="/admin/colleges/add" className="text-orange-500 hover:underline">Add one</Link>
                    {" "}or use the{" "}
                    <Link href="/admin/ai-studio" className="text-orange-500 hover:underline">AI Studio</Link>.
                  </td>
                </tr>
              ) : (
                colleges.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{c.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 text-sm">{c.name}</div>
                      {c.short_name && <div className="text-xs text-gray-400">{c.short_name}</div>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{c.city}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{c.stream ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{c.type ?? "—"}</td>
                    <td className="px-4 py-3">
                      {c.naac_grade ? (
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[11px] font-bold">{c.naac_grade}</span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("px-2 py-0.5 rounded-full text-[11px] font-medium capitalize", STATUS_COLORS[c.status] ?? "bg-gray-100 text-gray-500")}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {c.ai_generated && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-medium">AI</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/colleges/${c.id}`}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(c.id, c.name)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Archive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500 text-xs">
            Showing {((page - 1) * 25) + 1}–{Math.min(page * 25, total)} of {total}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1.5 text-xs font-medium">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
