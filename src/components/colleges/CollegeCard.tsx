"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, TrendingUp, Heart, IndianRupee, Star, GitCompare } from "lucide-react"
import { College } from "@/types"
import CompareButton from "@/components/ui/CompareButton"
import { formatFeesRange, formatCurrency, getNaacColor, getTypeColor, cn } from "@/lib/utils"

const SHORTLIST_KEY = "shortlisted_colleges"

interface CollegeCardProps {
  college: College
  variant?: "default" | "compact" | "featured"
  priority?: boolean
}

function CollegeLogo({ college, size = "md" }: { college: College; size?: "sm" | "md" | "lg"; priority?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0 font-bold text-white leading-tight text-center",
        size === "sm" && "w-9 h-9 text-[9px]",
        size === "md" && "w-[52px] h-[52px] text-xs",
        size === "lg" && "w-16 h-16 text-sm",
      )}
    >
      {college.shortName}
    </div>
  )
}

export default function CollegeCard({ college, variant = "default", priority = false }: CollegeCardProps) {
  const [isShortlisted, setIsShortlisted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(SHORTLIST_KEY)
    if (stored) {
      const list = JSON.parse(stored)
      setIsShortlisted(list.includes(college.slug))
    }
  }, [college.slug])

  const toggleShortlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const stored = localStorage.getItem(SHORTLIST_KEY)
    let list: string[] = stored ? JSON.parse(stored) : []
    if (isShortlisted) {
      list = list.filter((s) => s !== college.slug)
    } else {
      list.push(college.slug)
    }
    localStorage.setItem(SHORTLIST_KEY, JSON.stringify(list))
    setIsShortlisted(!isShortlisted)
  }

  /* ── Compact variant ── */
  if (variant === "compact") {
    return (
      <Link href={`/colleges/${college.slug}`} className="block">
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex-shrink-0 flex items-center justify-center">
            <span className="text-[9px] font-bold text-white leading-tight text-center px-0.5">{college.shortName}</span>
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

  /* ── Default / Featured variant ── */
  const feesText = college.feesRange.min > 0 || college.feesRange.max > 0
    ? formatFeesRange(college.feesRange.min, college.feesRange.max)
    : "Contact College"

  const placementText = college.avgPlacement > 0
    ? formatCurrency(college.avgPlacement)
    : "—"

  return (
    <Link href={`/colleges/${college.slug}`} className="block group h-full">
      <article className="bg-white rounded-2xl border border-gray-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">

        {/* ── Header ── */}
        <div className="relative bg-gradient-to-br from-[#0A1628] via-[#0d1f3c] to-[#1E3A5F] p-5">

          {/* Shortlist button */}
          <button
            onClick={toggleShortlist}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10",
              isShortlisted
                ? "bg-red-500 text-white shadow-lg"
                : "bg-white/10 text-white/70 hover:bg-red-500 hover:text-white"
            )}
            aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
          >
            <Heart className={cn("w-4 h-4", isShortlisted && "fill-current")} />
          </button>

          {/* Logo + Name */}
          <div className="flex items-start gap-3 pr-8">
            <CollegeLogo college={college} size="md" priority={priority} />
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-bold text-sm leading-snug group-hover:text-orange-300 transition-colors line-clamp-2">
                {college.name}
              </h3>
              <div className="flex items-center gap-1 mt-1.5">
                <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-400 truncate">{college.location}</span>
              </div>
            </div>
          </div>

          {/* Badge row */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold", getNaacColor(college.naac))}>
              NAAC {college.naac}
            </span>
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", getTypeColor(college.type))}>
              {college.type}
            </span>
            {college.nirfRank && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/90 text-white font-semibold">
                NIRF #{college.nirfRank}
              </span>
            )}
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-4 flex flex-col flex-1">

          {/* Fees + Placement stats */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1 mb-0.5">
                <IndianRupee className="w-3 h-3 text-orange-400" />
                <span className="text-[10px] text-orange-500 font-medium uppercase tracking-wide">Annual Fees</span>
              </div>
              <p className="text-sm font-bold text-gray-900 leading-tight">{feesText}</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1 mb-0.5">
                <TrendingUp className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] text-blue-500 font-medium uppercase tracking-wide">Avg Package</span>
              </div>
              <p className="text-sm font-bold text-gray-900 leading-tight">{placementText}</p>
            </div>
          </div>

          {/* Stream + Exams */}
          <div className="flex flex-wrap gap-1 mb-3">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
              {college.stream}
            </span>
            {college.entranceExams.slice(0, 2).map((exam) => (
              <span key={exam} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
                {exam}
              </span>
            ))}
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
