"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { CollegeCutoff } from "@/data/cutoffs"

const CutoffChart = dynamic(() => import("./CutoffChart"), { ssr: false })

interface Props {
  data: CollegeCutoff
  slug: string     // used as sessionStorage key
  height?: number
}

export default function GatedCutoffChart({ data, slug, height = 260 }: Props) {
  const storageKey = `cutoff_unlocked_${slug}_${data.exam}`
  const [unlocked, setUnlocked] = useState(false)
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUnlocked(sessionStorage.getItem(storageKey) === "true")
    }
  }, [storageKey])

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter valid 10-digit mobile number")
      return
    }
    setLoading(true)
    setError("")
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          source: 'college_page',
          message: `Cutoff gate: ${slug} / ${data.exam}`,
          utm_source: new URLSearchParams(window.location.search).get("utm_source") || "organic",
        }),
      })
      sessionStorage.setItem(storageKey, "true")
      setUnlocked(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (unlocked) {
    return <CutoffChart data={data} height={height} />
  }

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ height }}>
      {/* Blurred chart preview */}
      <div className="pointer-events-none select-none filter blur-sm opacity-60">
        <CutoffChart data={data} height={height} />
      </div>

      {/* Gate overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 max-w-sm w-full mx-4 text-center">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="font-extrabold text-gray-900 text-sm mb-1">
            Unlock 2020–2026 Cutoff Data
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Enter your mobile to see complete category-wise cutoff trends — free.
          </p>
          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError("") }}
              placeholder="10-digit mobile number"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              maxLength={10}
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading || phone.length !== 10}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
            >
              {loading ? "Unlocking…" : "🔓 Show Full Chart"}
            </button>
          </form>
          <p className="text-[10px] text-gray-400 mt-2">No spam. Get college alerts on WhatsApp.</p>
        </div>
      </div>
    </div>
  )
}
