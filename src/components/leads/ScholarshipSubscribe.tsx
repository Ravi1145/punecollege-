"use client"
import { useState } from "react"
import { Bell, CheckCircle, Loader2 } from "lucide-react"

interface ScholarshipSubscribeProps {
  context?: string
}

export default function ScholarshipSubscribe({ context = "scholarship_subscribe" }: ScholarshipSubscribeProps) {
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number")
      return
    }
    setError("")
    setLoading(true)
    try {
      const sp = new URLSearchParams(window.location.search)
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          source:       context,
          message:      "Scholarship alert subscription",
          utm_source:   sp.get("utm_source")   || "organic",
          utm_medium:   sp.get("utm_medium")   || "none",
          utm_campaign: sp.get("utm_campaign") || "scholarship",
          utm_content:  sp.get("utm_content")  || "none",
        }),
      })
      const data = await res.json()
      if (data.success) setSuccess(true)
      else setError("Something went wrong. Please try again.")
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 flex items-start gap-4">
        <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-green-800">You&apos;re on the list! 🎉</p>
          <p className="text-sm text-green-700 mt-0.5">
            We&apos;ll WhatsApp you when new scholarships or deadlines are announced.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)", boxShadow: "0 4px 24px rgba(10,22,40,0.18)" }}
    >
      <div className="px-5 py-5 sm:px-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
            <Bell className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="font-bold text-white text-base leading-tight">Get Scholarship Alerts on WhatsApp</p>
            <p className="text-sm mt-0.5" style={{ color: "rgba(178,200,228,0.85)" }}>
              New scholarships, deadlines &amp; merit lists — free alerts, no spam.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
          <div className="flex-1 min-w-0">
            <input
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError("") }}
              placeholder="Your WhatsApp number"
              className="w-full px-4 py-2.5 rounded-xl text-gray-900 text-sm placeholder:text-gray-400 outline-none bg-white"
              inputMode="numeric"
              maxLength={10}
            />
            {error && <p className="text-red-300 text-xs mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 font-bold text-white text-sm px-5 py-2.5 rounded-xl transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center gap-2 justify-center bg-accent"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
            {loading ? "Saving…" : "Alert Me"}
          </button>
        </form>
        <p className="text-xs mt-3" style={{ color: "rgba(148,175,210,0.75)" }}>
          🔒 Only used for scholarship alerts. Unsubscribe any time.
        </p>
      </div>
    </div>
  )
}
