"use client"
import Link from "next/link"
import { useState } from "react"

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

export default function CollegeMarqueeCard({ college }: { college: MarqueeCollege }) {
  const { color, bg } = accentFor(college.slug)
  const [imgError, setImgError] = useState(false)
  const showLogo = college.logo && !imgError

  return (
    <Link
      href={`/colleges/${college.slug}`}
      className="group/card flex items-center gap-3 bg-white border border-gray-100 hover:border-gray-200 rounded-2xl px-3 sm:px-4 py-3 sm:py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 min-w-[170px] sm:min-w-[210px] cursor-pointer"
    >
      {/* Logo or letter avatar */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        {showLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={college.logo}
            alt={`${college.shortName} logo`}
            width={44}
            height={44}
            className="w-full h-full object-contain p-1"
            onError={() => setImgError(true)}
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
