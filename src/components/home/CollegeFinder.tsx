"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft, CheckCircle, Loader2, Lock, Phone, User, MapPin } from "lucide-react"
import { cn, formatFeesRange } from "@/lib/utils"
import { colleges } from "@/data/colleges"
import type { College } from "@/types"

// ─── Quiz constants ───────────────────────────────────────────────────────────

const STREAMS = [
  { label: "Engineering",    value: "Engineering",    emoji: "⚙️" },
  { label: "MBA",            value: "MBA",            emoji: "💼" },
  { label: "Medical",        value: "Medical",        emoji: "🏥" },
  { label: "Arts & Science", value: "Arts & Science", emoji: "📚" },
  { label: "Law",            value: "Law",            emoji: "⚖️" },
] as const

const BUDGETS = [
  { label: "Under ₹1L",  value: "under_1l",   display: "Under ₹1L/yr" },
  { label: "₹1L – ₹3L", value: "1l_to_3l",   display: "₹1L – ₹3L/yr" },
  { label: "₹3L – ₹5L", value: "3l_to_5l",   display: "₹3L – ₹5L/yr" },
  { label: "Above ₹5L",  value: "above_5l",   display: "Above ₹5L/yr" },
] as const

const SCORES = [
  { label: "Below 60 percentile",   value: "below_60" },
  { label: "60 – 80 percentile",    value: "60_to_80" },
  { label: "80 – 95 percentile",    value: "80_to_95" },
  { label: "Above 95 percentile",   value: "above_95" },
  { label: "Not applicable",        value: "na" },
] as const

const AREAS = [
  { label: "PCMC",           value: "PCMC" },
  { label: "Pune City",      value: "Pune City" },
  { label: "Pune Suburbs",   value: "Pune Suburbs" },
  { label: "Any area",       value: "Any" },
] as const

const STEP_TITLES = [
  "Which stream are you targeting?",
  "What's your annual fee budget?",
  "What's your entrance exam percentile?",
  "Which area of Pune do you prefer?",
  "Get your personalised college list",
]

// ─── Budget → fee range filter ────────────────────────────────────────────────

function matchesBudget(college: College, budget: string): boolean {
  const { min, max } = college.feesRange
  switch (budget) {
    case "under_1l":  return min < 100000
    case "1l_to_3l":  return min >= 100000 && min <= 300000
    case "3l_to_5l":  return min > 300000 && min <= 500000
    case "above_5l":  return max > 500000
    default:          return true
  }
}

// ─── Stream → college filter ──────────────────────────────────────────────────

function matchesStream(college: College, stream: string): boolean {
  // Direct stream field match (case-insensitive)
  if (college.stream.toLowerCase().includes(stream.toLowerCase())) return true
  // Also check courses array for partial match
  const streamLower = stream.toLowerCase()
  return college.courses.some((c) => c.toLowerCase().includes(streamLower))
}

// ─── Get matched colleges ─────────────────────────────────────────────────────

function getMatches(stream: string, budget: string): College[] {
  return colleges.filter(
    (c) => matchesStream(c, stream) && matchesBudget(c, budget),
  )
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface QuizData {
  stream: string
  budget: string
  score:  string
  area:   string
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  const pct = ((step) / 5) * 100
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Step {Math.min(step + 1, 5)} of 5
        </span>
        <span className="text-xs text-gray-400">{Math.round(pct)}% complete</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: "var(--color-accent, #f97316)",
          }}
        />
      </div>
    </div>
  )
}

function OptionButton({
  selected,
  onClick,
  children,
  className,
}: {
  selected?: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full border-2 rounded-xl px-4 py-3 text-left transition-all text-sm font-semibold",
        selected
          ? "border-[color:var(--color-accent,#f97316)] bg-orange-50 text-gray-900"
          : "border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50/40",
        className,
      )}
    >
      {children}
    </button>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      Back
    </button>
  )
}

function NextButton({
  onClick,
  disabled,
}: {
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "mt-4 ml-auto flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all",
        "bg-[color:var(--color-accent,#f97316)] hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed",
      )}
    >
      Next <ArrowRight className="w-3.5 h-3.5" />
    </button>
  )
}

function CollegeCard({ college }: { college: College }) {
  return (
    <Link
      href={`/colleges/${college.slug}`}
      className="block border border-gray-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm group-hover:text-orange-600 transition-colors truncate">
            {college.name}
          </p>
          <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {college.location}
          </p>
        </div>
        <span className="flex-shrink-0 text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded-lg">
          {college.shortName}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-xs text-gray-600 font-medium">
          {formatFeesRange(college.feesRange.min, college.feesRange.max)}
        </span>
        <span className="text-gray-300">·</span>
        <span className="text-xs text-gray-500">{college.stream}</span>
      </div>
      <div className="mt-2 flex items-center justify-end">
        <span className="text-xs font-semibold text-orange-600 flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
          View college <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CollegeFinder() {
  const [step,    setStep]    = useState(0)
  const [data,    setData]    = useState<Partial<QuizData>>({})
  const [name,    setName]    = useState("")
  const [phone,   setPhone]   = useState("")
  const [error,   setError]   = useState("")
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)
  const [matches, setMatches] = useState<College[]>([])

  // Auto-advance when an option is selected
  function pick(key: keyof QuizData, value: string) {
    setData((prev) => ({ ...prev, [key]: value }))
    setStep((s) => s + 1)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your full name.")
      return
    }
    const cleaned = phone.replace(/\D/g, "")
    if (!/^[6-9]\d{9}$/.test(cleaned)) {
      setError("Enter a valid 10-digit Indian mobile number.")
      return
    }

    setLoading(true)
    try {
      const sp = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : "",
      )

      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:         name.trim(),
          phone:        cleaned,
          source:       "ai_finder",
          stream:       data.stream,
          budget:       data.budget,
          score:        data.score,
          area:         data.area,
          utm_source:   sp.get("utm_source")   ?? "organic",
          utm_medium:   sp.get("utm_medium")   ?? "none",
          utm_campaign: sp.get("utm_campaign") ?? "none",
        }),
      })

      // Compute matches client-side for instant reveal
      const found = getMatches(data.stream ?? "", data.budget ?? "")
      setMatches(found.slice(0, 3))
      setDone(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Helpers for display in step 4 summary line
  const streamLabel  = STREAMS.find((s) => s.value === data.stream)?.label  ?? data.stream  ?? ""
  const budgetLabel  = BUDGETS.find((b) => b.value === data.budget)?.display ?? data.budget  ?? ""
  const scoreLabel   = SCORES.find((s)  => s.value === data.score)?.label    ?? data.score   ?? ""
  const areaLabel    = AREAS.find((a)   => a.value === data.area)?.label      ?? data.area    ?? ""

  // Stream href for "view all" link
  const streamHrefMap: Record<string, string> = {
    "Engineering":    "/engineering-colleges-pune",
    "MBA":            "/mba-colleges-pune",
    "Medical":        "/medical-colleges-pune",
    "Arts & Science": "/arts-science-colleges-pune",
    "Law":            "/law-colleges-pune",
  }
  const streamHref = streamHrefMap[data.stream ?? ""] ?? "/colleges"

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-2xl mx-auto">
      {/* Progress bar */}
      <ProgressBar step={step} />

      {/* Step 0 — Stream */}
      {step === 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {STEP_TITLES[0]}
          </h2>
          <div className="grid grid-cols-1 gap-2.5">
            {STREAMS.map((s) => (
              <OptionButton
                key={s.value}
                selected={data.stream === s.value}
                onClick={() => pick("stream", s.value)}
              >
                <span className="flex items-center gap-3">
                  <span className="text-xl leading-none">{s.emoji}</span>
                  <span>{s.label}</span>
                </span>
              </OptionButton>
            ))}
          </div>
        </div>
      )}

      {/* Step 1 — Budget */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {STEP_TITLES[1]}
          </h2>
          <div className="grid grid-cols-1 gap-2.5">
            {BUDGETS.map((b) => (
              <OptionButton
                key={b.value}
                selected={data.budget === b.value}
                onClick={() => pick("budget", b.value)}
              >
                {b.display}
              </OptionButton>
            ))}
          </div>
          <BackButton onClick={() => setStep(0)} />
        </div>
      )}

      {/* Step 2 — Score */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {STEP_TITLES[2]}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            CET / JEE / CAT / NEET — choose the band that fits.
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            {SCORES.map((s) => (
              <OptionButton
                key={s.value}
                selected={data.score === s.value}
                onClick={() => pick("score", s.value)}
              >
                {s.label}
              </OptionButton>
            ))}
          </div>
          <BackButton onClick={() => setStep(1)} />
        </div>
      )}

      {/* Step 3 — Location */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {STEP_TITLES[3]}
          </h2>
          <div className="grid grid-cols-1 gap-2.5">
            {AREAS.map((a) => (
              <OptionButton
                key={a.value}
                selected={data.area === a.value}
                onClick={() => pick("area", a.value)}
              >
                {a.label}
              </OptionButton>
            ))}
          </div>
          <BackButton onClick={() => setStep(2)} />
        </div>
      )}

      {/* Step 4 — Contact (gated) */}
      {step === 4 && !done && (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Lock className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-900">
              Get Your Personalised List
            </h2>
          </div>

          {/* Summary chip row */}
          <div className="flex flex-wrap gap-1.5 mb-5 mt-2">
            {[streamLabel, budgetLabel, scoreLabel, areaLabel].filter(Boolean).map((label) => (
              <span
                key={label}
                className="text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded-full px-2.5 py-0.5 font-medium"
              >
                {label}
              </span>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError("") }}
                placeholder="Your full name"
                autoComplete="name"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                  setError("")
                }}
                placeholder="Mobile number (10 digits)"
                maxLength={10}
                autoComplete="tel"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-[color:var(--color-accent,#f97316)] text-white font-bold rounded-xl py-3 w-full flex items-center justify-center gap-2 text-sm hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Show My College List — Free
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-3">
            No spam · Free service · Results in seconds
          </p>

          <BackButton onClick={() => setStep(3)} />
        </div>
      )}

      {/* Done — matched college cards */}
      {done && (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Your Top College Matches
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Based on <strong>{streamLabel}</strong> · <strong>{budgetLabel}</strong>
          </p>

          {matches.length > 0 ? (
            <div className="space-y-3">
              {matches.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}

              {/* View all link if fewer than expected */}
              {matches.length < 3 && (
                <Link
                  href={streamHref}
                  className="flex items-center justify-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 py-2 border border-orange-200 rounded-xl hover:bg-orange-50 transition-all"
                >
                  View all {streamLabel} colleges in Pune
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 text-sm mb-3">
                We&apos;re curating your personalised list.
              </p>
              <Link
                href={streamHref}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:underline"
              >
                Browse all {streamLabel} colleges
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* CTA */}
          <div className="mt-5 p-4 bg-navy/5 rounded-xl border border-navy/10 text-center"
            style={{ backgroundColor: "rgba(10,22,40,0.04)", borderColor: "rgba(10,22,40,0.08)" }}
          >
            <p className="text-sm font-semibold text-gray-800 mb-1">
              Want expert guidance?
            </p>
            <p className="text-xs text-gray-500 mb-3">
              Our counsellors will call you within 2 hours — completely free.
            </p>
            <a
              href="tel:+918080804422"
              className="inline-flex items-center gap-2 text-sm font-bold text-white px-5 py-2.5 rounded-xl transition-all hover:brightness-110"
              style={{ backgroundColor: "var(--color-primary, #0A1628)" }}
            >
              <Phone className="w-4 h-4" />
              Talk to a Counselor
            </a>
          </div>

          <p className="text-center text-xs text-gray-400 mt-3">
            247 students counselled this week · Free · No spam
          </p>
        </div>
      )}
    </div>
  )
}
