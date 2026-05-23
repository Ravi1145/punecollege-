"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Sparkles, Phone, GraduationCap, Search, ChevronRight,
  Building2, Users, FileText, Gift, BookOpen, Headphones, Shield,
} from "lucide-react"

// ── Animation — only used on decorative elements, never on critical text ──────
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

// ── Data ─────────────────────────────────────────────────────────────────────

const FEATURE_CARDS = [
  { icon: Building2, label: "Top Colleges", sub: "in Pune"    },
  { icon: Users,     label: "Expert",       sub: "Counseling" },
  { icon: FileText,  label: "Easy",         sub: "Admission"  },
  { icon: Gift,      label: "Scholarships", sub: "Available"  },
]

const STATS = [
  { icon: Building2,  value: "25+",  label: "Colleges"          },
  { icon: BookOpen,   value: "500+", label: "Courses"           },
  { icon: Users,      value: "50K+", label: "Student Reviews"   },
  { icon: Headphones, value: "100%", label: "Admission Support" },
]

const PILLS = ["COEP", "MIT-WPU", "PICT", "Symbiosis", "DY Patil"]

const TYPEWRITER_WORDS = [
  "University",
  "Course",
  "Career Goal",
  "Stream",
  "Budget",
]

function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 50, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const word = words[wordIndex]

    if (phase === "typing") {
      if (displayed.length < word.length) {
        timeoutRef.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed)
      } else {
        timeoutRef.current = setTimeout(() => setPhase("pausing"), pauseMs)
      }
    } else if (phase === "pausing") {
      setPhase("deleting")
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed)
      } else {
        setWordIndex((i) => (i + 1) % words.length)
        setPhase("typing")
      }
    }

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [displayed, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseMs])

  return displayed
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const typewriterText = useTypewriter(TYPEWRITER_WORDS)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (q) router.push(`/colleges?search=${encodeURIComponent(q)}`)
  }

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "32vh" }}>

      {/* ── Full-width background image ──
          Save your hero photo to:  public/hero-students.jpg
          The image should be ~1400×800px with dark navy on the left half.
      ── */}
      <Image
        src="/hero-students.jpg"
        alt="Students at top colleges in Pune 2026"
        fill
        priority
        quality={85}
        sizes="100vw"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: "center center" }}
      />

      {/* Subtle overlay — image already has dark navy on left, just boost text contrast slightly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(7,27,59,0.55) 0%, rgba(7,27,59,0.30) 45%, rgba(7,27,59,0.10) 70%, rgba(7,27,59,0.05) 100%)",
        }}
      />

      {/* Fallback background — visible when image is missing */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(135deg, #0A1628 0%, #071B3B 55%, #0a1f40 100%)" }}
      />

      {/* ── Decorative circles top-right ── */}
      <div className="absolute pointer-events-none rounded-full"
           style={{ width: 340, height: 340, top: -90, right: -90,
                    border: "3px solid rgba(255,106,0,0.40)", zIndex: 1 }} />
      <div className="absolute pointer-events-none rounded-full"
           style={{ width: 220, height: 220, top: -40, right: -40,
                    border: "2px solid rgba(255,106,0,0.18)", zIndex: 1 }} />

      {/* ── Main grid ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">

          {/* ════════ LEFT — text content (always visible, no framer-motion opacity) ════════ */}
          <div className="pt-1 pb-3 lg:pt-4 lg:pb-6">

            {/* AI badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-3"
              style={{ border: "1.5px solid color-mix(in srgb, var(--color-accent) 60%, transparent)", color: "var(--color-accent)" }}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              India&apos;s AI-Powered College Portal 2026
            </div>

            {/* H1 — word-by-word animated reveal */}
            <h1
              aria-label="Best Colleges in Pune 2026"
              className="font-extrabold leading-[1.05] tracking-tight mb-1 flex flex-wrap gap-x-2"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)" }}
            >
              {["Best", "Colleges", "in", "Pune"].map((word, i) => (
                <motion.span
                  key={word}
                  className="text-accent inline-block"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: EASE }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="text-white inline-block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4 * 0.12, duration: 0.5, ease: EASE }}
              >
                2026
              </motion.span>
            </h1>

            {/* H2 — static + typewriter */}
            <motion.h2
              className="text-white font-extrabold leading-[1.1] tracking-tight mb-2"
              style={{ fontSize: "clamp(1.35rem, 2.6vw, 2.2rem)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5, ease: EASE }}
            >
              Find the Right{" "}
              <span className="text-accent">
                {typewriterText}
                <span className="inline-block w-[2px] h-[1em] bg-accent align-middle ml-0.5 animate-pulse" />
              </span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              className="leading-relaxed mb-2 max-w-lg"
              style={{ color: "rgba(200,218,240,0.92)", fontSize: "0.97rem" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.82, duration: 0.5, ease: EASE }}
            >
              Compare colleges, fees, placements &amp; get direct admission
              guidance for BTech, MBA, BCA &amp; more.
            </motion.p>


            {/* Search bar */}
            <form onSubmit={handleSearch} className="mb-3">
              <div
                className="flex items-center bg-white rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.28)" }}
              >
                <Search className="ml-4 w-5 h-5 shrink-0" style={{ color: "#9CA3AF" }} />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search colleges in Pune (e.g. COEP, MIT-WPU, PICT...)"
                  className="flex-1 px-3 py-[14px] text-gray-900 text-sm outline-none placeholder:text-gray-400 bg-transparent"
                />
                <button
                  type="submit"
                  className="shrink-0 font-bold text-white bg-accent px-6 py-[14px] text-sm transition-opacity hover:opacity-90"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Quick-search pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {PILLS.map(p => (
                <button
                  key={p}
                  onClick={() => router.push(`/colleges?search=${p}`)}
                  className="text-sm font-medium px-4 py-1.5 rounded-full text-white transition-all hover:opacity-75"
                  style={{
                    border: "1px solid rgba(255,255,255,0.30)",
                    backgroundColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  {p}
                </button>
              ))}
              <Link
                href="/colleges"
                className="text-sm font-medium px-4 py-1.5 rounded-full text-white flex items-center gap-1 transition-all hover:opacity-75"
                style={{
                  border: "1px solid rgba(255,255,255,0.30)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              >
                View All <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-row gap-3 mb-3">
              <Link
                href="/ai-finder"
                className="flex-1 flex items-center justify-center gap-2 font-bold text-white px-3 py-2.5 rounded-xl text-sm transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
                style={{
                  backgroundColor: "var(--color-accent)",
                  boxShadow: "0 4px 18px color-mix(in srgb, var(--color-accent) 42%, transparent)",
                }}
              >
                <GraduationCap className="w-4 h-4" />
                Find College
              </Link>

              <Link
                href="/counselling"
                className="flex-1 flex items-center justify-center gap-2 font-semibold text-white px-3 py-2.5 rounded-xl text-sm transition-all active:scale-95 whitespace-nowrap"
                style={{ border: "1px solid rgba(255,255,255,0.35)", backgroundColor: "rgba(255,255,255,0.05)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
              >
                <Phone className="w-4 h-4" />
                Talk to Advisor
              </Link>
            </div>

            {/* Trust micro-copy */}
            <p className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(74,222,128,0.9)" }}>
              <Shield className="w-3.5 h-3.5 shrink-0" />
              100% Free Guidance &nbsp;·&nbsp; No Hidden Charges
            </p>
          </div>

          {/* ════════ RIGHT — stats bar (desktop only) ════════ */}
          <div className="relative hidden lg:flex flex-col justify-end self-stretch py-10">
            <div
              className="rounded-2xl"
              style={{
                backgroundColor: "rgba(7,27,59,0.88)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.10)",
                padding: "14px 20px",
              }}
            >
              <div className="grid grid-cols-4 gap-2">
                {STATS.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-5 h-5 shrink-0" style={{ color: "rgba(255,255,255,0.42)" }} />
                    <div>
                      <p className="font-extrabold text-base leading-none text-accent">{value}</p>
                      <p className="leading-tight mt-0.5" style={{ color: "rgba(178,200,228,0.82)", fontSize: "0.62rem" }}>
                        {label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ════ Mobile stats strip (hidden on lg — shown in desktop right col) ════ */}
        <div className="lg:hidden grid grid-cols-4 gap-1 pb-3 pt-1">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-0.5">
              <p className="font-extrabold text-sm leading-none text-accent">{value}</p>
              <p className="leading-tight" style={{ color: "rgba(178,200,228,0.82)", fontSize: "0.6rem" }}>
                {label}
              </p>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}
