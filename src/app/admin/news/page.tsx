"use client"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Plus, RefreshCw, Trash2, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsItem {
  id: string
  title: string
  url: string
  source: string
  category: string
  published_at: string
  summary: string | null
  approved: boolean
}

const CATEGORIES = ["admissions", "exams", "results", "scholarships", "general"] as const

const EMPTY_FORM = {
  title: "",
  url: "",
  source: "",
  category: "general",
  summary: "",
}

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const fetchNews = useCallback(async () => {
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/news", {
        headers: { "x-admin-key": key },
      })
      if (res.status === 401) { router.replace("/admin/login"); return }
      const data = await res.json()
      setItems(Array.isArray(data) ? data : (data.items ?? []))
    } catch {
      setItems([])
      setError("Failed to load news")
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchNews() }, [fetchNews])

  const handleToggle = async (id: string, approved: boolean) => {
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    setTogglingId(id)
    try {
      await fetch(`/api/admin/news/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify({ approved }),
      })
      setItems((prev) =>
        prev.map((item) => item.id === id ? { ...item, approved } : item)
      )
    } finally {
      setTogglingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    if (!confirm("Delete this news item?")) return
    setDeletingId(id)
    try {
      await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": key },
      })
      setItems((prev) => prev.filter((item) => item.id !== id))
    } finally {
      setDeletingId(null)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    if (!form.title.trim() || !form.url.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/admin/news", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify({
          title: form.title.trim(),
          url: form.url.trim(),
          source: form.source.trim() || "Manual",
          category: form.category,
          summary: form.summary.trim() || null,
          published_at: new Date().toISOString(),
        }),
      })
      if (res.ok) {
        setForm(EMPTY_FORM)
        setShowForm(false)
        fetchNews()
      }
    } finally {
      setSubmitting(false)
    }
  }

  const setField = (field: keyof typeof EMPTY_FORM, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={fetchNews}
          className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
          Refresh
        </button>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="ml-auto flex items-center gap-1.5 bg-[#0A1628] hover:bg-[#162040] text-white rounded-lg px-3 py-2 text-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add News
        </button>
      </div>

      {/* Inline Add Form */}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3"
        >
          <h2 className="text-sm font-semibold text-gray-800">Add News Article</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Title"
              required
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              className="col-span-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white"
            />
            <input
              type="url"
              placeholder="URL"
              required
              value={form.url}
              onChange={(e) => setField("url", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white"
            />
            <input
              type="text"
              placeholder="Source (e.g. Times of India)"
              value={form.source}
              onChange={(e) => setField("source", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white"
            />
            <select
              value={form.category}
              onChange={(e) => setField("category", e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} className="capitalize">{c}</option>
              ))}
            </select>
            <textarea
              placeholder="Summary (optional)"
              rows={2}
              value={form.summary}
              onChange={(e) => setField("summary", e.target.value)}
              className="col-span-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 bg-white resize-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-[var(--color-accent)] text-white font-bold text-xs px-3 py-1.5 rounded-lg disabled:opacity-60"
            >
              {submitting ? "Adding…" : "Add Article"}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM) }}
              className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Title", "Source", "Category", "Published", "Approved", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-sm">
                    Loading…
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-sm">
                    No news articles yet. Click &ldquo;Add News&rdquo; to add one.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    {/* Title */}
                    <td className="px-4 py-3 max-w-[240px]">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-gray-900 hover:text-orange-600 line-clamp-2 flex items-start gap-1 group"
                      >
                        <span className="line-clamp-2">{item.title}</span>
                        <ExternalLink className="w-3 h-3 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                      {item.summary && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{item.summary}</p>
                      )}
                    </td>
                    {/* Source */}
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                      {item.source || "—"}
                    </td>
                    {/* Category */}
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[11px] font-medium capitalize whitespace-nowrap">
                        {item.category}
                      </span>
                    </td>
                    {/* Published */}
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {item.published_at
                        ? new Date(item.published_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    {/* Approved badge */}
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[11px] font-semibold",
                          item.approved
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        )}
                      >
                        {item.approved ? "Live" : "Pending"}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        {item.approved ? (
                          <button
                            onClick={() => handleToggle(item.id, false)}
                            disabled={togglingId === item.id}
                            className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors disabled:opacity-50"
                          >
                            {togglingId === item.id ? "…" : "Reject"}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggle(item.id, true)}
                            disabled={togglingId === item.id}
                            className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors disabled:opacity-50"
                          >
                            {togglingId === item.id ? "…" : "Approve"}
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className="text-xs px-2 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          {deletingId === item.id ? "…" : "Delete"}
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
    </div>
  )
}
