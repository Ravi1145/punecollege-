"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, TrendingUp, Heart, IndianRupee, Star } from "lucide-react"
import { College } from "@/types"
import CompareButton from "@/components/ui/CompareButton"
import { formatFeesRange, formatCurrency, getNaacColor, getTypeColor, cn } from "@/lib/utils"

const COLLEGE_BANNER = "/college-default-banner.jpg"

const SHORTLIST_KEY = "shortlisted_colleges"

function safeLS(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}

interface CollegeCardProps {
  college: College
  variant?: "default" | "compact" | "featured"
  priority?: boolean
}

function abbrev(shortName: string): string {
  const first = shortName.split(/[\s\-]/)[0]
  return first.slice(0, 5).toUpperCase()
}

export default function CollegeCard({ college, variant = "default" }: CollegeCardProps) {
  const [isShortlisted, setIsShortlisted] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    try {
      const stored = safeLS(SHORTLIST_KEY)
      if (stored) setIsShortlisted(JSON.parse(stored).includes(college.slug))
    } catch {}
  }, [college.slug])

  const toggleShortlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const stored = safeLS(SHORTLIST_KEY)
      let list: string[] = stored ? JSON.parse(stored) : []
      list = isShortlisted ? list.filter(s => s !== college.slug) : [...list, college.slug]
      localStorage.setItem(SHORTLIST_KEY, JSON.stringify(list))
      setIsShortlisted(!isShortlisted)
    } catch {}
  }

  /* ── Compact variant ── */
  if (variant === "compact") {
    return (
      <Link href={`/colleges/${college.slug}`} className="block">
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex-shrink-0 flex items-center justify-center overflow-hidden">
            {college.logo && !logoError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={college.logo}
                alt={`${college.name} logo`}
                width={40}
                height={40}
                className="object-contain p-0.5 bg-white rounded-lg"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-[9px] font-black text-white leading-tight text-center tracking-tight">{abbrev(college.shortName)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
              {college.name}
            </p>
            <p className="text-xs text-gray-500">{college.location}</p>
          </div>
          <span className={cn("text-xs px-1.5 py-0.5 rounded font-semibold flex-shrink-0", getNaacColor(college.naac))}>
            {college.naac}
          </span>
        </div>
      </Link>
    )
  }

  /* ── Derived values ── */
  const feesText = college.feesRange.min > 0 || college.feesRange.max > 0
    ? formatFeesRange(college.feesRange.min, college.feesRange.max)
    : "Contact College"

  const placementText = college.avgPlacement > 0
    ? formatCurrency(college.avgPlacement)
    : "—"

  const topCourses = college.courses.slice(0, 3)
  const extraCourses = college.courses.length - 3

  return (
    <Link href={`/colleges/${college.slug}`} className="block group h-full">
      <article className="bg-white rounded-2xl border border-gray-100 hover:border-orange-400 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">

        {/* ── Header with campus image as background ── */}
        <div
          className="relative p-4 pb-3 overflow-hidden"
          style={{ backgroundImage: `url(${COLLEGE_BANNER})`, backgroundSize: "cover", backgroundPosition: "center" }}
          role="img"
          aria-label={`${college.name} campus`}
        >
          {/* semi-transparent overlay — image visible, text still readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 via-[#0A1628]/55 to-[#0A1628]/70" />

          {/* Heart button */}
          <button
            onClick={toggleShortlist}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20",
              isShortlisted
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white/15 text-white/70 hover:bg-white/25 hover:text-white"
            )}
            aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
          >
            <Heart className={cn("w-4 h-4", isShortlisted && "fill-current")} />
          </button>

          {/* Abbreviation badge + name row */}
          <div className="relative z-10 flex items-start gap-3 pr-10">
            {/* Logo badge — logo_url first, then cover image, then abbreviation text */}
            <div className="shrink-0 w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center overflow-hidden">
              {college.logo && !logoError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={college.logo}
                  alt={`${college.name} logo`}
                  width={56}
                  height={56}
                  className="object-contain p-1"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-[#0A1628] font-black text-[11px] leading-tight text-center tracking-tight px-1">
                  {abbrev(college.shortName)}
                </span>
              )}
            </div>

            {/* Name + location */}
            <div className="flex-1 min-w-0 pt-0.5">
              <h3
                className="text-white font-bold text-sm leading-snug line-clamp-2 group-hover:text-orange-300 transition-colors"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              >
                {college.name}
              </h3>
              <div className="flex items-center gap-1 mt-1.5">
                <MapPin className="w-3 h-3 text-orange-300 shrink-0" />
                <span className="text-xs text-white/90 truncate" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}>
                  {college.location}
                </span>
              </div>
            </div>
          </div>

          {/* Badge row */}
          <div className="relative z-10 flex flex-wrap gap-1.5 mt-3">
            <span className={cn("text-xs px-2.5 py-0.5 rounded-full font-bold", getNaacColor(college.naac))}>
              NAAC {college.naac}
            </span>
            <span className={cn("text-xs px-2.5 py-0.5 rounded-full font-medium", getTypeColor(college.type))}>
              {college.type}
            </span>
            {college.nirfRank ? (
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-orange-500 text-white">
                NIRF #{college.nirfRank}
              </span>
            ) : (
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-orange-500 text-white">
                Est. {college.established}
              </span>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-4 flex flex-col flex-1 gap-3">

          {/* Fees + Placement */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1 mb-1">
                <IndianRupee className="w-3 h-3 text-orange-400 shrink-0" />
                <span className="text-[9px] text-orange-500 font-semibold uppercase tracking-wider">Annual Fees</span>
              </div>
              <p className="text-xs font-bold text-gray-900 leading-tight">{feesText}</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-blue-400 shrink-0" />
                <span className="text-[9px] text-blue-500 font-semibold uppercase tracking-wider">Avg Package</span>
              </div>
              <p className="text-xs font-bold text-gray-900 leading-tight">{placementText}</p>
            </div>
          </div>

          {/* Stream + entrance exam tags */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-medium">
              {college.stream}
            </span>
            {college.entranceExams.slice(0, 2).map(exam => (
              <span key={exam} className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full font-medium">
                {exam}
              </span>
            ))}
            {topCourses.length > 0 && extraCourses > 0 && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full font-medium">
                +{extraCourses} More
              </span>
            )}
          </div>

          {/* Rating + Compare — pushed to bottom */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold text-gray-800">{college.rating.toFixed(1)}</span>
              {college.reviewCount > 0 && (
                <span className="text-xs text-gray-400">({college.reviewCount.toLocaleString()})</span>
              )}
            </div>
            <CompareButton collegeSlug={college.slug} collegeName={college.shortName} />
          </div>

        </div>
      </article>
    </Link>
  )
}
