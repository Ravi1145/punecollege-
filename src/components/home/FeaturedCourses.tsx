"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, TrendingUp, IndianRupee } from "lucide-react"
import { courses } from "@/data/courses"
import { formatCurrency, formatFeesRange } from "@/lib/utils"
import FilterTabs from "@/components/ui/FilterTabs"

const COURSE_TABS = ["All", "Engineering", "Management", "Medical", "Law", "Architecture", "Commerce", "Arts", "Science"]

const COURSE_BANNER = "/college-default-banner.jpg"

const levelColors: Record<string, string> = {
  UG:      "bg-blue-500 text-white",
  PG:      "bg-purple-500 text-white",
  Diploma: "bg-green-500 text-white",
  PhD:     "bg-orange-500 text-white",
}

const streamEmoji: Record<string, string> = {
  Engineering:  "⚙️",
  Management:   "💼",
  Medical:      "🩺",
  Law:          "⚖️",
  Architecture: "🏛️",
  Commerce:     "📊",
  Arts:         "🎨",
  Science:      "🔬",
}

export default function FeaturedCourses() {
  const [activeTab, setActiveTab] = useState("All")

  const featured = courses
    .filter((c) => activeTab === "All" || c.stream === activeTab)
    .slice(0, 10)

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Courses in Pune</h2>
            <p className="text-gray-500 mt-2">Top UG & PG programs with fees, salary & entrance exam details</p>
          </div>
          <Link
            href="/courses"
            className="hidden sm:flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter tabs */}
        <FilterTabs tabs={COURSE_TABS} active={activeTab} onChange={setActiveTab} className="mb-6" />

        {/* Horizontal scroll row */}
        <div className="flex gap-5 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="flex-shrink-0 w-72 block group"
            >
              <article className="bg-white rounded-2xl border border-gray-100 hover:border-orange-400 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">

                {/* ── Header with campus image as background ── */}
                <div
                  className="relative p-4 pb-3 overflow-hidden"
                  style={{
                    backgroundImage: `url(${COURSE_BANNER})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                  }}
                >
                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/90 via-[#0A1628]/85 to-[#0A1628]/92" />

                  {/* Level badge top-right */}
                  <span className={`absolute top-3 right-3 z-20 text-xs font-bold px-2.5 py-0.5 rounded-full ${levelColors[course.level] ?? "bg-gray-500 text-white"}`}>
                    {course.level}
                  </span>

                  {/* Logo + name row */}
                  <div className="relative z-10 flex items-start gap-3 pr-10">
                    {/* Icon badge */}
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center">
                      <span className="text-2xl">{streamEmoji[course.stream] ?? "📚"}</span>
                    </div>

                    {/* Name + stream */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3
                        className="text-white font-bold text-base leading-snug group-hover:text-orange-300 transition-colors"
                        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                      >
                        {course.name}
                      </h3>
                      <p
                        className="text-xs text-white/90 mt-1 line-clamp-1"
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
                      >
                        {course.fullName}
                      </p>
                    </div>
                  </div>

                  {/* Badge row */}
                  <div className="relative z-10 flex flex-wrap gap-1.5 mt-3">
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-orange-500 text-white">
                      {course.stream}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-white/20 text-white border border-white/30">
                      {course.duration}
                    </span>
                  </div>
                </div>

                {/* ── Body ── */}
                <div className="p-4 flex flex-col flex-1 gap-3 bg-white">

                  {/* Fees + Salary */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5">
                      <div className="flex items-center gap-1 mb-1">
                        <IndianRupee className="w-3 h-3 text-orange-400 shrink-0" />
                        <span className="text-[9px] text-orange-500 font-semibold uppercase tracking-wider">Annual Fees</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900 leading-tight">
                        {formatFeesRange(course.avgFees.min, course.avgFees.max)}
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="w-3 h-3 text-blue-400 shrink-0" />
                        <span className="text-[9px] text-blue-500 font-semibold uppercase tracking-wider">Avg Salary</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900 leading-tight">
                        {formatCurrency(course.avgSalary)}
                      </p>
                    </div>
                  </div>

                  {/* Entrance exam tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {course.entranceExams.slice(0, 3).map((exam) => (
                      <span key={exam} className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full font-medium">
                        {exam}
                      </span>
                    ))}
                    {course.entranceExams.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full font-medium">
                        +{course.entranceExams.length - 3} More
                      </span>
                    )}
                  </div>

                  {/* Top colleges */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 mt-auto">
                    <span className="text-xs text-gray-400 font-medium w-full">Top Colleges:</span>
                    {course.topColleges.slice(0, 3).map((col) => (
                      <span key={col} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {col}
                      </span>
                    ))}
                    {course.topColleges.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        +{course.topColleges.length - 3}
                      </span>
                    )}
                  </div>

                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
