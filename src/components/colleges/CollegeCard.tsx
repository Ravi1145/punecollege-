"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, TrendingUp, Heart, BookOpen, IndianRupee, Award } from "lucide-react"
import { College } from "@/types"
import Badge from "@/components/ui/Badge"
import StarRating from "@/components/ui/StarRating"
import CompareButton from "@/components/ui/CompareButton"
import { formatFeesRange, formatCurrency, getNaacColor, getTypeColor, cn } from "@/lib/utils"

const SHORTLIST_KEY = "shortlisted_colleges"

interface CollegeCardProps {
  college: College
  variant?: "default" | "compact" | "featured"
}

export default function CollegeCard({ college, variant = "default" }: CollegeCardProps) {
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

  if (variant === "compact") {
    return (
      <Link href={`/colleges/${college.slug}`} className="block">
        <div className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {college.shortName.slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
              {college.name}
            </p>
            <p className="text-xs text-gray-500">{college.location}</p>
          </div>
          <span className={cn("text-xs px-1.5 py-0.5 rounded font-medium", getNaacColor(college.naac))}>
            {college.naac}
          </span>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/colleges/${college.slug}`} className="block group">
      <article className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Card Header */}
        <div className="relative bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] p-5 pb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {college.shortName.slice(0, 3)}
              </div>
              <div>
                <h3 className="text-white font-bold text-sm leading-tight group-hover:text-orange-300 transition-colors line-clamp-2">
                  {college.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{college.location}</span>
                </div>
              </div>
            </div>
            <button
              onClick={toggleShortlist}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0",
                isShortlisted
                  ? "bg-red-500 text-white"
                  : "bg-white/10 text-white hover:bg-red-500"
              )}
              aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
            >
              <Heart className={cn("w-4 h-4", isShortlisted && "fill-current")} />
            </button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold", getNaacColor(college.naac))}>
              NAAC {college.naac}
            </span>
            <span className={cn("text-xs px-2 py-0.5 rounded-full", getTypeColor(college.type))}>
              {college.type}
            </span>
            {college.nirfRank && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-semibold">
                NIRF #{college.nirfRank}
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 -mt-4">
          {/* Stats row */}
          <div className="bg-gray-50 rounded-xl p-3 grid grid-cols-2 gap-3 mb-4">
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                <IndianRupee className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">Annual Fees</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">
                {formatFeesRange(college.feesRange.min, college.feesRange.max)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                <TrendingUp className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">Avg Package</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">
                {formatCurrency(college.avgPlacement)}
              </p>
            </div>
          </div>

          {/* Courses */}
          <div className="mb-3">
            <div className="flex items-center gap-1 mb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">Top Courses</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {college.courses.slice(0, 3).map((course) => (
                <span key={course} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                  {course}
                </span>
              ))}
              {college.courses.length > 3 && (
                <span className="text-xs text-gray-400">+{college.courses.length - 3} more</span>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <StarRating rating={college.rating} reviewCount={college.reviewCount} size="sm" />
            <CompareButton collegeSlug={college.slug} collegeName={college.shortName} />
          </div>
        </div>
      </article>
    </Link>
  )
}
