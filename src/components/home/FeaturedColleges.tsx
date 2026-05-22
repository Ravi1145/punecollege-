"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { colleges as staticColleges } from "@/data/colleges"
import type { College } from "@/types"
import CollegeCard from "@/components/colleges/CollegeCard"
import FilterTabs from "@/components/ui/FilterTabs"

const TABS = ["All", "Engineering", "MBA", "Medical", "Law", "Architecture", "Government"]

export default function FeaturedColleges() {
  const [activeTab, setActiveTab] = useState("All")
  const [featuredColleges, setFeaturedColleges] = useState<College[]>([])
  const [loadingFeatured, setLoadingFeatured] = useState(true)

  // Fetch featured colleges from DB once
  useEffect(() => {
    fetch("/api/colleges/featured")
      .then((r) => r.json())
      .then((data) => {
        if (data.colleges?.length > 0) setFeaturedColleges(data.colleges)
      })
      .catch(() => {})
      .finally(() => setLoadingFeatured(false))
  }, [])

  // All colleges shown in the tab (featured DB first, then static fill)
  const allColleges: College[] = (() => {
    // Merge: featured DB colleges first, then static (deduped by slug)
    const featuredSlugs = new Set(featuredColleges.map((c) => c.slug))
    const staticFill = staticColleges.filter((c) => !featuredSlugs.has(c.slug))
    return [...featuredColleges, ...staticFill]
  })()

  const filtered = allColleges
    .filter((c) => {
      if (activeTab === "All") return true
      if (activeTab === "Government") return c.type === "Government"
      return c.stream === activeTab
    })
    .slice(0, 12)

  // Featured badge slugs for the current view
  const featuredSet = new Set(featuredColleges.map((c) => c.slug))

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Colleges in Pune</h2>
            <p className="text-gray-500 mt-2 flex items-center gap-1.5">
              {!loadingFeatured && featuredColleges.length > 0 && (
                <>
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-amber-600 font-medium">{featuredColleges.length} featured</span>
                  <span className="text-gray-300">·</span>
                </>
              )}
              NIRF ranked and top-rated colleges across all streams
            </p>
          </div>
          <Link
            href="/colleges"
            className="hidden sm:flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter tabs */}
        <FilterTabs tabs={TABS} active={activeTab} onChange={setActiveTab} className="mb-6" />

        {/* Loading skeleton */}
        {loadingFeatured && featuredColleges.length === 0 && (
          <div className="flex gap-5 pb-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-72 h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Horizontal scroll row */}
        {(!loadingFeatured || filtered.length > 0) && (
          <div className="flex gap-5 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filtered.map((college) => (
              <div key={college.id} className="flex-shrink-0 w-72 relative">
                {/* Featured star badge */}
                {featuredSet.has(college.slug) && (
                  <div className="absolute top-2 left-2 z-20 flex items-center gap-1 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    Featured
                  </div>
                )}
                <CollegeCard college={college} />
              </div>
            ))}
          </div>
        )}

        {/* Mobile view all */}
        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            View All Colleges <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
