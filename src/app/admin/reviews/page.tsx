"use client"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, XCircle, RefreshCw, Star, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Review {
  id: string
  college_slug: string
  college_name: string
  student_name: string
  course: string
  year: string
  rating: number
  title: string
  body: string
  pros: string[]
  cons: string[]
  status: string
  created_at: string
}

const STATUS_COLORS: Record<string, string> = {
  pending:  "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={cn("w-3.5 h-3.5", i <= rating ? "fill-orange-400 text-orange-400" : "text-gray-200")} />
      ))}
    </div>
  )
}

export default function AdminReviewsPage() {
  const [reviews, setReviews]     = useState<Review[]>([])
  const [total, setTotal]         = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage]           = useState(1)
  const [statusFilter, setStatusFilter] = useState("pending")
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState("")
  const [actionId, setActionId]   = useState<string | null>(null)
  const router = useRouter()

  const fetchReviews = useCallback(async () => {
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    setLoading(true); setError("")
    try {
      const params = new URLSearchParams({ status: statusFilter, page: String(page), limit: "20" })
      const res = await fetch(`/api/admin/reviews?${params}`, { headers: { "x-admin-key": key } })
      if (res.status === 401) { router.replace("/admin/login"); return }
      const json = await res.json()
      setReviews(json.reviews ?? [])
      setTotal(json.total ?? 0)
      setTotalPages(json.totalPages ?? 1)
    } catch { setError("Failed to load reviews") }
    finally { setLoading(false) }
  }, [page, statusFilter, router])

  useEffect(() => { fetchReviews() }, [fetchReviews])

  const handleAction = async (id: string, action: "approved" | "rejected" | "delete") => {
    const key = localStorage.getItem("admin_key")
    if (!key) return
    setActionId(id)
    try {
      if (action === "delete") {
        if (!confirm("Permanently delete this review?")) { setActionId(null); return }
        const res = await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE", headers: { "x-admin-key": key } })
        if (!res.ok) { const j = await res.json().catch(() => ({})); setError(j.error ?? "Delete failed"); setActionId(null); return }
      } else {
        const res = await fetch("/api/admin/reviews", {
          method: "PATCH",
          headers: { "Content-Type": "application/json", "x-admin-key": key },
          body: JSON.stringify({ id, status: action }),
        })
        if (!res.ok) { const j = await res.json().catch(() => ({})); setError(j.error ?? "Action failed"); setActionId(null); return }
      }
      fetchReviews()
    } finally { setActionId(null) }
  }

  const pendingCount = statusFilter === "pending" ? total : 0

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 bg-white"
        >
          <option value="pending">Pending Moderation</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="all">All Reviews</option>
        </select>
        <button onClick={fetchReviews}
          className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors">
          <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
          Refresh
        </button>
        {pendingCount > 0 && (
          <span className="ml-auto text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full">
            {pendingCount} pending review{pendingCount !== 1 ? "s" : ""} waiting
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500">{total} review{total !== 1 ? "s" : ""}</p>
      {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

      {/* Review cards */}
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-16 text-gray-400 bg-white rounded-xl border border-gray-100">
          <CheckCircle className="w-10 h-10 mx-auto mb-3 text-gray-200" />
          <p className="text-sm">No {statusFilter} reviews</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map(r => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4">
                {/* Left: review info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize", STATUS_COLORS[r.status])}>
                      {r.status}
                    </span>
                    <StarRow rating={r.rating} />
                    <span className="text-xs text-gray-400">
                      {new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{r.title || "(no title)"}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    by <strong>{r.student_name}</strong>
                    {r.course && ` · ${r.course}`}
                    {r.year && ` · ${r.year}`}
                  </p>
                  <a href={`/colleges/${r.college_slug}`} target="_blank"
                    className="text-[11px] text-orange-600 hover:underline font-medium"
                    rel="noopener noreferrer">
                    {r.college_name || r.college_slug} ↗
                  </a>
                  <p className="text-sm text-gray-700 mt-2 leading-relaxed">{r.body}</p>
                  {(r.pros?.length > 0 || r.cons?.length > 0) && (
                    <div className="flex gap-6 mt-3">
                      {r.pros?.length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold text-green-700 mb-1">PROS</p>
                          <ul className="space-y-0.5">
                            {r.pros.map((p, i) => <li key={i} className="text-xs text-gray-600">✓ {p}</li>)}
                          </ul>
                        </div>
                      )}
                      {r.cons?.length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold text-red-600 mb-1">CONS</p>
                          <ul className="space-y-0.5">
                            {r.cons.map((c, i) => <li key={i} className="text-xs text-gray-600">✗ {c}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right: action buttons */}
                <div className="flex flex-col gap-2 shrink-0">
                  {r.status !== "approved" && (
                    <button
                      onClick={() => handleAction(r.id, "approved")}
                      disabled={actionId === r.id}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve
                    </button>
                  )}
                  {r.status !== "rejected" && (
                    <button
                      onClick={() => handleAction(r.id, "rejected")}
                      disabled={actionId === r.id}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleAction(r.id, "delete")}
                    disabled={actionId === r.id}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500 text-xs">Showing {((page-1)*20)+1}–{Math.min(page*20, total)} of {total}</p>
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
