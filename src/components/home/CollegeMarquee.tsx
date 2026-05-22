"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Building2 } from "lucide-react"

// Deterministic accent colour per college (based on first char of slug)
const PALETTE = [
  { color: "#1E40AF", bg: "#EFF6FF" },
  { color: "#B91C1C", bg: "#FEF2F2" },
  { color: "#047857", bg: "#ECFDF5" },
  { color: "#7C3AED", bg: "#F5F3FF" },
  { color: "#B45309", bg: "#FFFBEB" },
  { color: "#0369A1", bg: "#F0F9FF" },
  { color: "#065F46", bg: "#ECFDF5" },
  { color: "#9D174D", bg: "#FDF2F8" },
  { color: "#1D4ED8", bg: "#EFF6FF" },
  { color: "#7E22CE", bg: "#FAF5FF" },
]

function accentFor(slug: string) {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) & 0xffffffff
  return PALETTE[Math.abs(h) % PALETTE.length]
}

interface MarqueeCollege {
  slug: string
  name: string
  shortName: string
  logo?: string
}

// Fallback list shown before fetch completes
const FALLBACK: MarqueeCollege[] = [
  { slug: "coep-college-of-engineering-pune",                name: "College of Engineering Pune", shortName: "COEP" },
  { slug: "mit-wpu-mit-world-peace-university",              name: "MIT World Peace University",        shortName: "MIT-WPU" },
  { slug: "pict-pune-institute-of-computer-technology",      name: "Pune Institute of Computer Tech",   shortName: "PICT" },
  { slug: "sibm-symbiosis-institute-business-management-pune", name: "Symbiosis Institute of Business", shortName: "SIBM" },
  { slug: "vit-pune-vishwakarma-institute-of-technology",    name: "Vishwakarma Institute of Tech",     shortName: "VIT Pune" },
  { slug: "dy-patil-college-engineering-akurdi-pune",        name: "DY Patil College of Engineering",   shortName: "DY Patil" },
  { slug: "pccoer-pimpri-chinchwad-college-of-engineering",  name: "Pimpri Chinchwad College of Engg",  shortName: "PCCOE" },
  { slug: "bj-medical-college-pune",                         name: "BJ Medical College",                shortName: "BJMC" },
]

export default function CollegeMarquee() {
  const [colleges, setColleges] = useState<MarqueeCollege[]>(FALLBACK)

  useEffect(() => {
    fetch("/api/colleges?limit=20")
      .then((r) => r.json())
      .then((data) => {
        const list: MarqueeCollege[] = (data.colleges ?? []).map(
          (c: { slug: string; name: string; shortName?: string; logo?: string }) => ({
            slug:      c.slug,
            name:      c.name,
            shortName: c.shortName ?? c.name.split(" ").map((w: string) => w[0]).join("").slice(0, 5),
            logo:      c.logo,
          })
        )
        if (list.length >= 4) setColleges(list)
      })
      .catch(() => {/* keep fallback */})
  }, [])

  // Triple for seamless infinite loop
  const ITEMS = [...colleges, ...colleges, ...colleges]

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
        {/* Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="group flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {ITEMS.map((c, i) => (
            <CollegeCard key={`${c.slug}-${i}`} college={c} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CollegeCard({ college }: { college: MarqueeCollege }) {
  const { color, bg } = accentFor(college.slug)

  return (
    <Link
      href={`/colleges/${college.slug}`}
      className="group/card flex items-center gap-3 bg-white border border-gray-100 hover:border-gray-200 rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-[210px] cursor-pointer"
    >
      {/* Logo or letter avatar */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        {college.logo ? (
          <Image
            src={college.logo}
            alt={`${college.shortName} logo`}
            width={44}
            height={44}
            className="w-full h-full object-contain p-1"
          />
        ) : (
          <span
            className="font-extrabold text-sm select-none leading-none"
            style={{ color }}
          >
            {college.shortName.slice(0, 2).toUpperCase()}
          </span>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-gray-900 font-bold text-sm truncate group-hover/card:text-[var(--color-accent)] transition-colors">
          {college.shortName}
        </p>
        <p className="text-gray-400 text-[11px] truncate leading-tight mt-0.5">
          {college.name}
        </p>
      </div>
    </Link>
  )
}
