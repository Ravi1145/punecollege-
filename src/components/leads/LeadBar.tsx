"use client"

import { useState, useEffect } from "react"
import { X, Clock } from "lucide-react"

// Admission deadline — matches site_settings in Supabase
const DEADLINE = new Date("2026-07-31T23:59:59+05:30")

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 })

  useEffect(() => {
    function calc() {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, mins: 0 })
      const days  = Math.floor(diff / 86_400_000)
      const hours = Math.floor((diff % 86_400_000) / 3_600_000)
      const mins  = Math.floor((diff % 3_600_000)  / 60_000)
      setTimeLeft({ days, hours, mins })
    }
    calc()
    const id = setInterval(calc, 60_000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

export default function LeadBar() {
  const [dismissed, setDismissed] = useState(true) // start hidden to avoid SSR flash
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const countdown = useCountdown(DEADLINE)

  useEffect(() => {
    const wasDismissed = localStorage.getItem("lead_bar_dismissed") === "true"
    if (!wasDismissed) setDismissed(false)
  }, [])

  const dismiss = () => {
    setDismissed(true)
    localStorage.setItem("lead_bar_dismissed", "true")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[6-9]\d{9}$/.test(phone)) return
    setLoading(true)
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          source: "lead_bar",
          utm_source: new URLSearchParams(window.location.search).get("utm_source") || "organic",
          utm_medium: new URLSearchParams(window.location.search).get("utm_medium") || "none",
          utm_campaign: new URLSearchParams(window.location.search).get("utm_campaign") || "none",
        }),
      })
      setSubmitted(true)
      setTimeout(dismiss, 5000)
    } catch {
      // silently fail — don't break UX
    } finally {
      setLoading(false)
    }
  }

  if (dismissed) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[150] bg-gradient-to-r from-[#0A1628] to-[#1a56db] text-white text-sm shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center gap-3 flex-wrap sm:flex-nowrap">

        {/* Announcement text */}
        <p className="font-semibold text-white/90 shrink-0 text-xs sm:text-sm">
          🎓 Admission 2026 Open
        </p>

        {/* Countdown */}
        <div className="flex items-center gap-1 text-xs shrink-0">
          <Clock className="w-3 h-3 text-orange-400" />
          <span className="text-orange-300 font-mono font-bold">
            {countdown.days}d {countdown.hours}h {countdown.mins}m
          </span>
          <span className="text-white/60 hidden sm:inline">left</span>
        </div>

        {/* Lead form */}
        {submitted ? (
          <p className="text-green-400 font-semibold text-xs flex-1 text-center sm:text-left">
            ✅ Check WhatsApp for college list!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 flex-1 justify-end sm:justify-end">
            <input
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Enter phone for FREE guide"
              className="w-40 sm:w-48 px-3 py-1 rounded-lg text-gray-900 text-xs placeholder-gray-500 outline-none focus:ring-2 focus:ring-orange-400 bg-white"
              maxLength={10}
            />
            <button
              type="submit"
              disabled={loading || phone.length !== 10}
              className="px-3 py-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-colors shrink-0"
            >
              {loading ? "…" : "Get Guide"}
            </button>
          </form>
        )}

        {/* Dismiss */}
        <button
          onClick={dismiss}
          className="text-white/60 hover:text-white p-1 shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
