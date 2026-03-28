"use client"
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Enquiry } from "@/types"

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  replied: "bg-blue-100 text-blue-700",
  closed: "bg-gray-100 text-gray-600",
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const fetchEnquiries = useCallback(async () => {
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/enquiry", { headers: { "x-admin-key": key } })
      if (res.status === 401) { router.replace("/admin/login"); return }
      const data = await res.json()
      setEnquiries(Array.isArray(data) ? data : [])
    } catch {
      setError("Failed to load enquiries")
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => { fetchEnquiries() }, [fetchEnquiries])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={fetchEnquiries}
          className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
          Refresh
        </button>
        <span className="text-xs text-gray-400 ml-auto">{enquiries.length} enquiries total</span>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["#", "Name", "Phone", "College", "Course", "Contact Pref.", "Message", "Status", "Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-400 text-sm">Loading…</td></tr>
              ) : enquiries.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-400 text-sm">No enquiries yet</td></tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-400 text-xs">{enq.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{enq.name}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{enq.phone}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs max-w-[140px] truncate">{enq.college_name}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{enq.course ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-full text-[11px] font-medium capitalize">
                        {enq.preferred_contact}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs max-w-[160px] truncate">{enq.message ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize",
                        STATUS_COLORS[enq.status ?? "new"]
                      )}>
                        {enq.status ?? "new"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                      {enq.created_at ? new Date(enq.created_at).toLocaleDateString("en-IN") : "—"}
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
