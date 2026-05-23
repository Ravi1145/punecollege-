"use client"

import { useState, useEffect, useCallback } from "react"
import { X, GraduationCap, ArrowRight, CheckCircle } from "lucide-react"

const SESSION_KEY = "exit_popup_shown"

const COURSES = [
  { value: "BTech",  label: "B.Tech / Engineering" },
  { value: "MBA",    label: "MBA / PGDM" },
  { value: "MBBS",   label: "MBBS / Medical" },
  { value: "BBA",    label: "BBA / Management" },
  { value: "BArch",  label: "B.Arch / Architecture" },
  { value: "BSc",    label: "B.Sc / Science" },
  { value: "BCom",   label: "B.Com / Commerce" },
  { value: "Law",    label: "LLB / Law" },
  { value: "Other",  label: "Other Course" },
]

export default function ExitPopup() {
  const [visible, setVisible]       = useState(false)
  const [name, setName]             = useState("")
  const [phone, setPhone]           = useState("")
  const [stream, setStream]         = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]             = useState(false)
  const [error, setError]           = useState("")

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
    const cleanedPhone = phone.replace(/\D/g, "")

    if (name.trim().length < 2) {
      setError("Enter your name (at least 2 characters)")
      return
    }
    if (cleanedPhone.length !== 10) {
      setError("Enter a valid 10-digit mobile number")
      return
    }
    if (!stream) {
      setError("Please select a course you're interested in")
      return
    }

    setError("")
    setSubmitting(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    name.trim(),
          phone:   cleanedPhone,
          stream,
          source:  "exit_popup",
          message: "Free counselling request via exit popup",
        }),
      })
      if (!res.ok) throw new Error("Server error")
      setDone(true)
      setTimeout(() => setVisible(false), 4000)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Get free college counselling"
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
              <h2 className="text-xl font-extrabold text-gray-900 mb-2">We&apos;ll call you soon! 🎉</h2>
              <p className="text-gray-500 text-sm">
                Our counsellor will contact you within 2 hours with personalised college recommendations. Good luck!
              </p>
            </div>
          ) : (
            <>
              {/* Icon */}
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-5">
                <GraduationCap className="w-7 h-7 text-orange-500" />
              </div>

              {/* Copy */}
              <h2 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
                Wait! Get{" "}
                <span className="text-orange-500">Free Counselling</span>
                {" "}for Pune Colleges
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Tell us your details and our expert counsellor will call you with the best college options, fees, and admission tips.
              </p>

              {/* Bullets */}
              <ul className="space-y-1.5 mb-6">
                {[
                  "Personalised college shortlist based on your score",
                  "Fees, cutoffs & placement data for 2026",
                  "Expert guidance — completely free",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  maxLength={50}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none text-gray-900 text-sm transition-colors"
                  required
                />

                {/* Phone */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-medium select-none">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Mobile number"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none text-gray-900 text-sm transition-colors"
                    required
                  />
                </div>

                {/* Course */}
                <select
                  value={stream}
                  onChange={(e) => setStream(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 outline-none text-sm transition-colors bg-white text-gray-900"
                  required
                >
                  <option value="" disabled>Select course interest</option>
                  {COURSES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>

                {error && <p className="text-red-500 text-xs">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  {submitting ? "Submitting…" : (
                    <>Get Free Counselling <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>

              <p className="text-center text-[11px] text-gray-400 mt-3">
                Free · No spam · Our counsellor calls within 2 hours
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
