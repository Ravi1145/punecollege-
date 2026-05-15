"use client"

import { useState } from "react"
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

// ── Component ─────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (q) router.push(`/colleges?search=${encodeURIComponent(q)}`)
  }

  return (
    <section className="relative overflow-hidden" style={{ minHeight: "44vh" }}>

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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* ════════ LEFT — text content (always visible, no framer-motion opacity) ════════ */}
          <div className="pt-4 pb-8 lg:pt-10 lg:pb-16">

            {/* AI badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold mb-5"
              style={{ border: "1.5px solid color-mix(in srgb, var(--color-accent) 60%, transparent)", color: "var(--color-accent)" }}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              India&apos;s AI-Powered College Portal 2026
            </div>

            {/* H1 — includes primary keyword "colleges in pune 2026" */}
            <h1
              className="font-extrabold leading-[1.05] tracking-tight mb-1"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
            >
              <span className="text-accent">Best Colleges in Pune</span>
              <span className="text-white"> 2026</span>
            </h1>

            {/* H2 */}
            <h2
              className="text-white font-extrabold leading-[1.1] tracking-tight mb-4"
              style={{ fontSize: "clamp(1.75rem, 3.3vw, 2.85rem)" }}
            >
              Find Your College with AI — Admission Open
            </h2>

            {/* Subheading */}
            <p
              className="leading-relaxed mb-6 max-w-lg"
              style={{ color: "rgba(200,218,240,0.92)", fontSize: "0.97rem" }}
            >
              Compare colleges, fees, placements &amp; get direct admission
              guidance for BTech, MBA, BCA &amp; more.
            </p>

            {/* Scholarship banner */}
            <div
              className="rounded-2xl overflow-hidden mb-6 flex items-center justify-between px-5 py-3.5"
              style={{
                background: "linear-gradient(90deg, #FFD000 0%, #FFA500 45%, #FF7A00 100%)",
                boxShadow: "0 4px 20px rgba(255,160,0,0.30)",
              }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl select-none" aria-hidden>🎓</span>
                <div>
                  <p className="font-bold text-[11px] uppercase tracking-[0.12em]" style={{ color: "#1a0500" }}>
                    Scholarships Upto
                  </p>
                  <p className="font-extrabold leading-none mt-0.5" style={{ color: "#1a0500", fontSize: "1.85rem" }}>
                    ₹50,000<sup style={{ verticalAlign: "super", fontSize: "0.75rem", fontWeight: 700 }}>*</sup>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-sm" style={{ color: "#1a0500" }}>Apply Before</p>
                  <p className="font-extrabold text-xl leading-tight" style={{ color: "#1a0500" }}>Deadline!</p>
                </div>
                <span className="text-3xl select-none" aria-hidden>💰</span>
              </div>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="mb-4">
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
            <div className="flex flex-wrap gap-2 mb-7">
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
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link
                href="/ai-finder"
                className="flex items-center justify-center gap-2.5 font-bold text-white px-7 py-3.5 rounded-xl text-base transition-all hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: "var(--color-accent)",
                  boxShadow: "0 4px 18px color-mix(in srgb, var(--color-accent) 42%, transparent)",
                }}
              >
                <GraduationCap className="w-5 h-5" />
                Find My College
              </Link>

              <Link
                href="/counselling"
                className="flex items-center justify-center gap-2.5 font-semibold text-white px-7 py-3.5 rounded-xl text-base transition-all active:scale-95"
                style={{ border: "1px solid rgba(255,255,255,0.35)", backgroundColor: "rgba(255,255,255,0.05)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
              >
                <Phone className="w-4 h-4" />
                Talk to Counselor
              </Link>
            </div>

            {/* Trust micro-copy */}
            <p className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(74,222,128,0.9)" }}>
              <Shield className="w-3.5 h-3.5 shrink-0" />
              100% Free Guidance &nbsp;·&nbsp; No Hidden Charges
            </p>
          </div>

          {/* ════════ RIGHT — floating cards + stats (sit over the student photo) ════════ */}
          <div className="relative hidden lg:flex flex-col justify-between self-stretch py-10">

            {/* Feature cards */}
            <div className="flex flex-col gap-3 items-end pr-2">
              {FEATURE_CARDS.map(({ icon: Icon, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0.1, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.45, ease: EASE }}
                  className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3"
                  style={{
                    boxShadow: "0 4px 24px rgba(0,0,0,0.20)",
                    minWidth: 172,
                    maxWidth: 200,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "#FFF3E0" }}
                  >
                    <Icon className="w-[18px] h-[18px] text-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900 leading-tight">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats bar */}
            <div
              className="mt-8 rounded-2xl"
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
                      <p className="font-extrabold text-base leading-none text-accent">
                        {value}
                      </p>
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
      </div>

      {/* ── Bottom trust strip ── */}
      <div className="relative z-10 mt-6 sm:mt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center justify-center">
            {[
              { emoji: "🤝", text: "Shiksha Partner"        },
              { emoji: "🛡", text: "NAAC Verified Data"     },
              { emoji: "🏛️", text: "SPPU Listed"            },
              { emoji: "💰", text: "Accurate Fee Info"      },
              { emoji: "⭐", text: "50K+ Student Reviews"   },
              { emoji: "🎧", text: "Free Counseling"        },
            ].map(({ emoji, text }, i, arr) => (
              <div
                key={text}
                className="flex items-center gap-2 text-sm px-4 sm:px-6 py-1"
                style={{
                  color: "rgba(178,200,228,0.85)",
                  borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
                }}
              >
                <span aria-hidden>{emoji}</span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
