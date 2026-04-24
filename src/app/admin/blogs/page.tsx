"use client"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, RefreshCw, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Blog {
  id: number
  slug: string
  title: string
  excerpt?: string
  author?: string
  category?: string
  status: string
  ai_generated: boolean
  published_at?: string
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  published: "bg-green-100 text-green-700",
  draft:     "bg-yellow-100 text-yellow-700",
  archived:  "bg-gray-100 text-gray-500",
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs]           = useState<Blog[]>([])
  const [total, setTotal]           = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage]             = useState(1)
  const [statusFilter, setStatusFilter] = useState("")
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState("")
  const router = useRouter()

  const fetchBlogs = useCallback(async () => {
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    setLoading(true); setError("")
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" })
      if (statusFilter) params.set("status", statusFilter)
      const res = await fetch(`/api/admin/blogs?${params}`, { headers: { "x-admin-key": key } })
      if (res.status === 401) { router.replace("/admin/login"); return }
      const json = await res.json()
      setBlogs(json.blogs ?? [])
      setTotal(json.total ?? 0)
      setTotalPages(json.totalPages ?? 1)
    } catch { setError("Failed to load blogs") }
    finally { setLoading(false) }
  }, [page, statusFilter, router])

  useEffect(() => { fetchBlogs() }, [fetchBlogs])

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Archive "${title}"?`)) return
    const key = localStorage.getItem("admin_key")
    if (!key) return
    await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE", headers: { "x-admin-key": key } })
    fetchBlogs()
  }

  const handlePublish = async (id: number, currentStatus: string) => {
    const key = localStorage.getItem("admin_key")
    if (!key) return
    const newStatus = currentStatus === "published" ? "draft" : "published"
    await fetch("/api/admin/blogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-key": key },
      body: JSON.stringify({ id, status: newStatus }),
    })
    fetchBlogs()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 bg-white">
          <option value="">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button onClick={fetchBlogs}
          className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
          <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
          Refresh
        </button>
        <Link href="/admin/blogs/add"
          className="ml-auto flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
          <Plus className="w-3.5 h-3.5" />
          New Post
        </Link>
      </div>

      <p className="text-xs text-gray-500">{total} post{total !== 1 ? "s" : ""} total</p>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "Title", "Category", "Author", "Status", "AI", "Published", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-10 text-center text-gray-400 text-sm">Loading…</td></tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center text-gray-400 text-sm">
                    No blog posts yet.{" "}
                    <Link href="/admin/ai-studio" className="text-orange-500 hover:underline">Generate with AI</Link>
                  </td>
                </tr>
              ) : (
                blogs.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{b.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900 text-sm max-w-[280px] truncate">{b.title}</div>
                      <div className="text-xs text-gray-400 font-mono">{b.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{b.category ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{b.author ?? "—"}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handlePublish(b.id, b.status)}
                        className={cn("px-2 py-0.5 rounded-full text-[11px] font-medium capitalize cursor-pointer hover:opacity-80 transition-opacity", STATUS_COLORS[b.status])}>
                        {b.status}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {b.ai_generated && <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-medium">AI</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {b.published_at ? new Date(b.published_at).toLocaleDateString("en-IN") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/blogs/${b.id}`}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                          <Pencil className="w-3.5 h-3.5" />
                        </Link>
                        <button onClick={() => handleDelete(b.id, b.title)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Archive">
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

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500 text-xs">Showing {((page-1)*20)+1}–{Math.min(page*20,total)} of {total}</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
              className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1.5 text-xs font-medium">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
