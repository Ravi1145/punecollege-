"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import { colleges as staticColleges } from "@/data/colleges"
import type { College } from "@/types"
import CollegeCard from "@/components/colleges/CollegeCard"
import FilterTabs from "@/components/ui/FilterTabs"

const TABS = ["All", "Engineering", "MBA", "Medical", "Law", "Architecture", "Government"]
const CACHE_KEY = "cp_featured_colleges"
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCached(): College[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    return data
  } catch {
    return null
  }
}

function setCache(colleges: College[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: colleges, ts: Date.now() }))
  } catch {}
}

export default function FeaturedColleges() {
  const [activeTab, setActiveTab] = useState("All")
  const [featuredColleges, setFeaturedColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use cached data instantly — no flash of static colleges
    const cached = getCached()
    if (cached) {
      setFeaturedColleges(cached)
      setLoading(false)
      return
    }

    fetch("/api/colleges/featured")
      .then((r) => r.json())
      .then((data) => {
        if (data.colleges?.length > 0) {
          setFeaturedColleges(data.colleges)
          setCache(data.colleges)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Featured DB colleges first, then static fill (deduped)
  const allColleges: College[] = (() => {
    const featuredSlugs = new Set(featuredColleges.map((c) => c.slug))
    const staticFill = staticColleges.filter((c) => !featuredSlugs.has(c.slug))
    return [...featuredColleges, ...staticFill]
  })()

  const filtered = allColleges
    .filter((c) => {
      if (activeTab === "All") return true
      if (activeTab === "Government") return c.type === "Government"
      if (activeTab === "MBA") return c.stream === "MBA" || c.stream === "Management"
      return c.stream === activeTab
    })
    .slice(0, 12)

  const featuredSet = new Set(featuredColleges.map((c) => c.slug))

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Colleges in Pune</h2>
            <p className="text-gray-500 mt-2 flex items-center gap-1.5">
              {!loading && featuredColleges.length > 0 && (
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

        {/* Skeleton — only shown on very first load before any data */}
        {loading && (
          <div className="flex gap-3 sm:gap-5 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 overflow-x-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-[82vw] sm:w-72 h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* College cards — featured always first */}
        {!loading && (
          <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filtered.map((college) => (
              <div key={college.slug} className="flex-shrink-0 w-[82vw] sm:w-72 snap-start relative">
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
