"use client"
import { useState, useEffect, useRef } from "react"
import { X, Loader2, CheckCircle, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const COURSES = [
  { icon: "⚙️", name: "Engineering", sub: "B.Tech | M.Tech" },
  { icon: "💼", name: "Management", sub: "MBA | BBA | PGDM" },
  { icon: "💻", name: "Computer Applications", sub: "BCA | MCA | B.Sc (CS)" },
  { icon: "🔬", name: "Sciences", sub: "B.Sc | M.Sc" },
  { icon: "📊", name: "Commerce", sub: "B.Com | M.Com" },
  { icon: "⚖️", name: "Law", sub: "BA LLB | LLB | LLM" },
  { icon: "✏️", name: "Architecture & Design", sub: "B.Arch | B.Des | M.Des" },
  { icon: "🍽️", name: "Hotel Management", sub: "BHM | MHM" },
]

const FEATURES = [
  { icon: "🏛️", label: "Top Colleges\nin Pune" },
  { icon: "🎓", label: "Expert\nCounselling" },
  { icon: "📋", label: "Easy\nAdmission" },
  { icon: "📈", label: "100%\nPlacement Assist" },
]

const STEPS = [
  { n: 1, label: "Fill the Enquiry Form" },
  { n: 2, label: "Get Expert Counselling" },
  { n: 3, label: "Choose Your Dream College" },
  { n: 4, label: "Easy Admission Confirmation" },
]

const TRUST = ["No Hidden Charges", "Transparent Process", "Personalized Guidance", "Trusted by 10,000+ Students"]

const TOP_COLLEGES = ["MIT-WPU", "VIT Pune", "Symbiosis", "D.Y. Patil", "PICT"]

export default function ScholarshipPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const shownRef = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (sessionStorage.getItem("scholarship_popup_shown")) return

    const timer = setTimeout(() => {
      if (shownRef.current) return
      shownRef.current = true
      sessionStorage.setItem("scholarship_popup_shown", "1")
      setIsOpen(true)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  const validate = () => {
    const e: { name?: string; phone?: string } = {}
    if (!name || name.trim().length < 2) e.name = "Enter your name"
    if (!phone || !/^[6-9]\d{9}$/.test(phone)) e.phone = "Enter valid 10-digit number"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "scholarship_popup" }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setTimeout(() => setIsOpen(false), 3500)
      } else {
        setErrors({ name: "Submission failed. Please try again." })
      }
    } catch {
      setErrors({ name: "Network error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{ background: "#0A1628" }}
      >
        {/* ── Close button ── */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.12)" }}
          aria-label="Close"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* ── Top orange accent bar ── */}
        <div className="h-1.5 w-full rounded-t-2xl" style={{ background: "linear-gradient(90deg,#FF6A00,#FF9A00)" }} />

        {/* ══════════════════════════ HEADER ══════════════════════════ */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between flex-wrap gap-2"
             style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Logo text */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm"
                 style={{ background: "linear-gradient(135deg,#FF6A00,#FF9A00)", color: "#fff" }}>
              CP
            </div>
            <div>
              <p className="font-extrabold text-white leading-tight text-base tracking-tight">
                College<span style={{ color: "#FF9A00" }}>Pune</span>
              </p>
              <p className="text-[10px] leading-none" style={{ color: "rgba(178,200,228,0.7)" }}>
                Your Future. Our Priority.
              </p>
            </div>
          </div>
          {/* Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
               style={{ background: "rgba(255,106,0,0.18)", border: "1px solid rgba(255,106,0,0.4)", color: "#FF9A00" }}>
            📍 PUNE&apos;S MOST TRUSTED EDUCATION PARTNER
          </div>
        </div>

        {/* ══════════════════════════ BODY ══════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

          {/* ── LEFT COLUMN ── */}
          <div className="p-5" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>

            {/* Headline */}
            <div className="mb-4">
              <p className="text-white font-extrabold leading-none tracking-tight"
                 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)" }}>
                ADMISSION
              </p>
              <p className="font-extrabold leading-none tracking-tight"
                 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", color: "#FF6A00" }}>
                OPEN 2026
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  ⭐ TOP COLLEGES.
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                  🎓 BRIGHT FUTURES.
                </span>
              </div>
              <p className="text-sm font-bold mt-1" style={{ color: "#FF9A00" }}>
                ── ALL IN PUNE ──
              </p>
            </div>

            {/* Courses */}
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-wider mb-2 px-2 py-1 rounded-lg inline-block"
                 style={{ background: "rgba(255,106,0,0.2)", color: "#FF9A00" }}>
                COURSES WE OFFER
              </p>
              <div className="grid grid-cols-1 gap-1.5">
                {COURSES.map(c => (
                  <div key={c.name} className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
                       style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <span className="text-lg w-6 text-center shrink-0">{c.icon}</span>
                    <div>
                      <p className="text-white font-semibold text-xs leading-tight">{c.name}</p>
                      <p className="text-[11px] leading-none" style={{ color: "rgba(178,200,228,0.6)" }}>{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top colleges */}
            <div className="pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2"
                 style={{ color: "#FF9A00" }}>
                TOP COLLEGES IN PUNE
              </p>
              <div className="flex flex-wrap gap-1.5">
                {TOP_COLLEGES.map(col => (
                  <span key={col} className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)" }}>
                    {col}
                  </span>
                ))}
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(255,106,0,0.2)", color: "#FF9A00", border: "1px solid rgba(255,106,0,0.3)" }}>
                  & Many More…
                </span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="p-5 flex flex-col gap-4">

            {/* Feature icons */}
            <div className="grid grid-cols-4 gap-2">
              {FEATURES.map(f => (
                <div key={f.label} className="flex flex-col items-center text-center px-1 py-2.5 rounded-xl"
                     style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="text-xl mb-1">{f.icon}</span>
                  <p className="text-[10px] font-semibold leading-tight whitespace-pre-line"
                     style={{ color: "rgba(200,218,240,0.9)" }}>
                    {f.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Scholarship Banner */}
            <div className="rounded-2xl overflow-hidden"
                 style={{ background: "linear-gradient(135deg,#FF6A00 0%,#FF9A00 60%,#FFD000 100%)" }}>
              <div className="flex items-stretch">
                <div className="flex-1 p-4">
                  <p className="font-bold text-[11px] uppercase tracking-widest" style={{ color: "#1a0500" }}>
                    SCHOLARSHIP UPTO
                  </p>
                  <p className="font-extrabold leading-none mt-1" style={{ color: "#1a0500", fontSize: "2rem" }}>
                    ₹50,000<sup style={{ fontSize: "0.6em", verticalAlign: "super", fontWeight: 700 }}>*</sup>
                  </p>
                  <div className="inline-flex mt-2 px-3 py-1 rounded-full font-bold text-xs text-white"
                       style={{ background: "#0A1628" }}>
                    ON MERIT BASIS
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-3 text-center min-w-[88px]"
                     style={{ background: "rgba(0,0,0,0.18)" }}>
                  <p className="font-extrabold leading-none" style={{ color: "#fff", fontSize: "1.6rem" }}>80%</p>
                  <p className="font-bold text-[10px] text-white leading-tight mt-0.5">OFF ON</p>
                  <p className="font-bold text-[10px] text-white leading-tight">APPLICATION</p>
                  <p className="font-bold text-[10px] text-white leading-tight">FORM</p>
                  <p className="font-bold text-[10px] text-white leading-tight">FOR YOU!</p>
                </div>
              </div>
            </div>

            {/* Lead Form */}
            {success ? (
              <div className="flex flex-col items-center justify-center py-6 rounded-2xl gap-3"
                   style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                     style={{ background: "rgba(34,197,94,0.2)" }}>
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <p className="font-bold text-white text-center">You&apos;re all set! 🎉</p>
                <p className="text-sm text-center" style={{ color: "rgba(178,200,228,0.8)" }}>
                  Our counsellor will call you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <p className="text-sm font-bold text-white">
                  Apply & Claim Your Scholarship →
                </p>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your Full Name"
                    className={cn(
                      "w-full text-sm px-4 py-3 rounded-xl outline-none transition-all",
                      "bg-white/10 text-white placeholder:text-white/40 border",
                      errors.name
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/15 focus:border-orange-400"
                    )}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="WhatsApp / Mobile Number"
                    maxLength={10}
                    className={cn(
                      "w-full text-sm px-4 py-3 rounded-xl outline-none transition-all",
                      "bg-white/10 text-white placeholder:text-white/40 border",
                      errors.phone
                        ? "border-red-400 focus:border-red-400"
                        : "border-white/15 focus:border-orange-400"
                    )}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 font-extrabold text-white py-3.5 rounded-xl text-sm transition-all active:scale-95 disabled:opacity-60"
                  style={{
                    background: "linear-gradient(90deg,#FF6A00,#FF9A00)",
                    boxShadow: "0 4px 18px rgba(255,106,0,0.40)",
                  }}
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                    : "✅ APPLY NOW — SECURE YOUR FUTURE TODAY!"}
                </button>
              </form>
            )}

            {/* Admission process */}
            <div className="pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-3 text-center"
                 style={{ color: "rgba(178,200,228,0.7)" }}>
                OUR SIMPLE ADMISSION PROCESS
              </p>
              <div className="flex flex-wrap items-center justify-between gap-y-2">
                {STEPS.map((s, i) => (
                  <div key={s.n} className="flex items-center gap-1">
                    <div className="flex flex-col items-center">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold text-white shrink-0"
                           style={{ background: "#FF6A00" }}>
                        {s.n}
                      </div>
                      <p className="text-[10px] font-semibold text-center leading-tight mt-1 max-w-[64px]"
                         style={{ color: "rgba(200,218,240,0.85)" }}>
                        {s.label}
                      </p>
                    </div>
                    {i < STEPS.length - 1 && (
                      <p className="text-orange-500 font-bold text-lg pb-3 mx-0.5">→</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Phone CTA */}
            <a
              href="tel:+917318538887"
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all active:scale-95"
              style={{
                background: "linear-gradient(90deg,#0A1628,#1E3A5F)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider"
                   style={{ color: "rgba(178,200,228,0.7)" }}>
                  TALK TO OUR ADMISSION EXPERTS
                </p>
                <p className="font-extrabold text-white text-lg leading-tight tracking-wide">
                  73185 38887
                </p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                   style={{ background: "linear-gradient(135deg,#FF6A00,#FF9A00)" }}>
                <Phone className="w-4 h-4 text-white" />
              </div>
            </a>

            {/* Website */}
            <p className="text-center text-xs" style={{ color: "rgba(178,200,228,0.45)" }}>
              🌐 www.collegepune.com
            </p>
          </div>
        </div>

        {/* ══════════════════════════ FOOTER TRUST BAR ══════════════════════════ */}
        <div className="px-4 py-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
             style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.2)" }}>
          {TRUST.map((t, i) => (
            <div key={t} className="flex items-center gap-1.5 text-[11px] font-semibold"
                 style={{ color: "rgba(178,200,228,0.7)" }}>
              <span className="text-green-400">✓</span>
              {t}
              {i < TRUST.length - 1 && (
                <span className="hidden sm:inline ml-2" style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
