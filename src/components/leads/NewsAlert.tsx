"use client"
import { useState } from "react"
import { Zap, CheckCircle, Loader2, X } from "lucide-react"

interface NewsAlertProps {
  /** Displayed in the banner heading, e.g. "MHT-CET 2026" */
  examName?: string
  source?: string
}

export default function NewsAlert({ examName = "MHT-CET 2026", source = "news_alert" }: NewsAlertProps) {
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [error, setError] = useState("")

  if (dismissed) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit number")
      return
    }
    setError("")
    setLoading(true)
    try {
      const sp = new URLSearchParams(window.location.search)
      const res = await fetch("/api/alert-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          exam_name:    examName,
          utm_source:   sp.get("utm_source")   || "organic",
          utm_medium:   sp.get("utm_medium")   || "none",
          utm_campaign: sp.get("utm_campaign") || "news_alert",
          utm_content:  sp.get("utm_content")  || "none",
        }),
      })
      const data = await res.json()
      if (data.success) setSuccess(true)
      else setError("Something went wrong. Try again.")
    } catch {
      setError("Network error. Try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
        <p className="text-sm font-semibold text-green-800">
          Done! We&apos;ll WhatsApp you the moment {examName} results are out.
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "linear-gradient(90deg, #0A1628 0%, #1a2f52 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Icon + text */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <Zap className="w-4 h-4 text-accent shrink-0" />
          <p className="text-sm font-semibold text-white leading-snug">
            Get <span className="text-accent">{examName}</span> merit list &amp; cutoff alerts instantly on WhatsApp
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none">
            <input
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError("") }}
              placeholder="Mobile number"
              className="w-full sm:w-36 px-3 py-2 rounded-lg text-gray-900 text-sm placeholder:text-gray-400 outline-none bg-white"
              inputMode="numeric"
              maxLength={10}
            />
            {error && <p className="text-red-300 text-xs mt-0.5">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 bg-accent text-white font-bold text-sm px-4 py-2 rounded-lg transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center gap-1.5 whitespace-nowrap"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
            {loading ? "…" : "Alert Me"}
          </button>
        </form>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="text-white/40 hover:text-white/70 transition-colors shrink-0 self-start sm:self-auto"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
