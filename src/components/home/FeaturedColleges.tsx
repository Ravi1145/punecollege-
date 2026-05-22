"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { colleges } from "@/data/colleges"
import CollegeCard from "@/components/colleges/CollegeCard"
import FilterTabs from "@/components/ui/FilterTabs"

const TABS = ["All", "Engineering", "MBA", "Medical", "Law", "Architecture", "Government"]

export default function FeaturedColleges() {
  const [activeTab, setActiveTab] = useState("All")

  const filtered = colleges
    .filter((c) => {
      if (activeTab === "All") return true
      if (activeTab === "Government") return c.type === "Government"
      return c.stream === activeTab
    })
    .slice(0, 10)

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Colleges in Pune</h2>
            <p className="text-gray-500 mt-2">NIRF ranked and top-rated colleges across all streams</p>
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

        {/* Horizontal scroll row */}
        <div className="flex gap-5 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filtered.map((college) => (
            <div key={college.id} className="flex-shrink-0 w-72">
              <CollegeCard college={college} />
            </div>
          ))}
        </div>

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
