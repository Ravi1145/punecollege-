"use client"

import { useState, useEffect, useCallback } from "react"
import { X, Gift, ArrowRight, CheckCircle } from "lucide-react"

const SESSION_KEY = "exit_popup_shown"

export default function ExitPopup() {
  const [visible, setVisible] = useState(false)
  const [phone, setPhone] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  const show = useCallback(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    setVisible(true)
    sessionStorage.setItem(SESSION_KEY, "1")
  }, [])

  useEffect(() => {
    // Desktop: mouse leaves viewport upwards
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show()
    }

    // Mobile: back navigation / popstate
    const handlePopState = () => show()

    // Show after 45s if user hasn't left yet (fallback)
    const timer = setTimeout(show, 45000)

    document.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("popstate", handlePopState)
      clearTimeout(timer)
    }
  }, [show])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length !== 10) {
      setError("Enter a valid 10-digit mobile number")
      return
    }
    setError("")
    setSubmitting(true)
    try {
      // Get stream from URL if available
      const sp     = new URLSearchParams(window.location.search)
      const stream = sp.get("stream") ?? ""
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone:        cleaned,
          source:       "exit_popup",
          stream,
          utm_source:   sp.get("utm_source")   || "organic",
          utm_medium:   sp.get("utm_medium")   || "none",
          utm_campaign: sp.get("utm_campaign") || "none",
          utm_content:  sp.get("utm_content")  || "none",
        }),
      })
      setDone(true)
      setTimeout(() => setVisible(false), 3500)
    } catch {
      setError("Something went wrong. Try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Get free MHT-CET cutoff PDF"
      className="fixed inset-0 z-[500] flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top gradient strip */}
        <div className="h-2 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

        <div className="p-6 sm:p-8">
          {done ? (
            <div className="text-center py-4">
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-extrabold text-gray-900 mb-2">Check WhatsApp! 🎉</h2>
              <p className="text-gray-500 text-sm">
                We&apos;ve sent you the MHT-CET 2026 Cutoff PDF on WhatsApp. Good luck with your admission!
              </p>
            </div>
          ) : (
            <>
              {/* Icon */}
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-5">
                <Gift className="w-7 h-7 text-orange-500" />
              </div>

              {/* Copy */}
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
                Wait! Get MHT-CET 2026<br />
                <span className="text-orange-500">Cutoff PDF Free</span> on WhatsApp
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Category-wise cutoffs for COEP, PICT, VIT, MIT-WPU & 10 more colleges — updated for 2026.
              </p>

              {/* Bullets */}
              <ul className="space-y-1.5 mb-6">
                {[
                  "Open / OBC / SC / ST cutoffs 2020–2026",
                  "CAP Round 1, 2 & 3 data",
                  "Top 12 Pune engineering colleges",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter WhatsApp number"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none text-gray-900 text-sm transition-colors"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-xs">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  {submitting ? "Sending…" : (
                    <>Send PDF on WhatsApp <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              <p className="text-center text-[11px] text-gray-400 mt-3">
                Free forever · No spam · Unsubscribe anytime
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
