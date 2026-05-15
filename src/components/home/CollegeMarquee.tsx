"use client"

import Link from "next/link"
import { Building2 } from "lucide-react"

// ── College data ──────────────────────────────────────────────────────────────
const COLLEGES = [
  {
    slug:     "coep-college-of-engineering-pune",
    abbr:     "COEP",
    name:     "COEP",
    subtitle: "Technological University",
    color:    "#1E40AF",   // blue
    bg:       "#EFF6FF",
  },
  {
    slug:     "mit-world-peace-university",
    abbr:     "MIT",
    name:     "MIT-WPU",
    subtitle: "MIT World Peace University",
    color:    "#B91C1C",   // red
    bg:       "#FEF2F2",
  },
  {
    slug:     "pict-pune-institute-of-computer-technology",
    abbr:     "PICT",
    name:     "PICT",
    subtitle: "Pune Institute of Computer Technology",
    color:    "#047857",   // green
    bg:       "#ECFDF5",
  },
  {
    slug:     "symbiosis-international-university",
    abbr:     "SIU",
    name:     "Symbiosis",
    subtitle: "International (Deemed) University",
    color:    "#7C3AED",   // purple
    bg:       "#F5F3FF",
  },
  {
    slug:     "dpu-dr-dy-patil-vidyapeeth",
    abbr:     "DPU",
    name:     "DPU",
    subtitle: "Dr. D.Y. Patil Vidyapeeth",
    color:    "#B45309",   // amber
    bg:       "#FFFBEB",
  },
  {
    slug:     "vit-pune-vishwakarma-institute-of-technology",
    abbr:     "VIT",
    name:     "VIT Pune",
    subtitle: "Vishwakarma Institute of Technology",
    color:    "#0369A1",   // sky
    bg:       "#F0F9FF",
  },
  {
    slug:     "dy-patil-engineering-college-pune",
    abbr:     "DYP",
    name:     "DY Patil",
    subtitle: "College of Engineering & Technology",
    color:    "#065F46",   // emerald
    bg:       "#ECFDF5",
  },
  {
    slug:     "pccoe-pimpri-chinchwad-college-of-engineering",
    abbr:     "PCCO",
    name:     "PCCOE",
    subtitle: "Pimpri Chinchwad College of Engineering",
    color:    "#9D174D",   // pink
    bg:       "#FDF2F8",
  },
]

// Duplicate list for seamless infinite scroll (3× so gap never shows)
const ITEMS = [...COLLEGES, ...COLLEGES, ...COLLEGES]

// ── Component ─────────────────────────────────────────────────────────────────

export default function CollegeMarquee() {
  return (
    <section className="bg-white py-8 border-b border-gray-100">
      {/* Section title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-3 justify-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200 max-w-[80px]" />
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            Top Colleges in Pune
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200 max-w-[80px]" />
        </div>
      </div>

      {/* Marquee wrapper */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track — pauses on hover via group */}
        <div className="group flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {ITEMS.map((c, i) => (
            <CollegeCard key={`${c.slug}-${i}`} college={c} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CollegeCard ───────────────────────────────────────────────────────────────

function CollegeCard({ college }: { college: typeof COLLEGES[0] }) {
  return (
    <Link
      href={`/colleges/${college.slug}`}
      className="group/card flex items-center gap-3 bg-white border border-gray-100 hover:border-gray-200 rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-[210px] cursor-pointer"
    >
      {/* Logo placeholder — letter avatar */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-base select-none"
        style={{ backgroundColor: college.bg, color: college.color }}
      >
        {college.abbr.slice(0, 2)}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-gray-900 font-bold text-sm truncate group-hover/card:text-[var(--color-accent)] transition-colors">
          {college.name}
        </p>
        <p className="text-gray-400 text-[11px] truncate leading-tight mt-0.5">
          {college.subtitle}
        </p>
      </div>
    </Link>
  )
}
