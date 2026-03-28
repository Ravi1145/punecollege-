"use client"
import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { colleges } from "@/data/colleges"
import { College } from "@/types"
import CollegeCard from "./CollegeCard"
import CollegeFilters from "./CollegeFilters"
import { SlidersHorizontal, Grid3X3, List, ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import InlineLeadForm from "@/components/leads/InlineLeadForm"

type SortOption = "rating" | "fees_low" | "fees_high" | "placement" | "nirf"

export default function CollegeGrid() {
  const searchParams = useSearchParams()
  const [sortBy, setSortBy] = useState<SortOption>("rating")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState({
    streams: [] as string[],
    types: [] as string[],
    naac: [] as string[],
    areas: [] as string[],
    exams: [] as string[],
    feesMin: 0,
    feesMax: 2500000,
    hostel: false,
    nirfRanked: false,
  })

  const searchQuery = searchParams.get("search") || ""

  const filteredColleges = useMemo(() => {
    let result = [...colleges]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.shortName.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.courses.some((course) => course.toLowerCase().includes(q)) ||
          c.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    if (filters.streams.length) {
      result = result.filter((c) => filters.streams.includes(c.stream))
    }
    if (filters.types.length) {
      result = result.filter((c) => filters.types.includes(c.type))
    }
    if (filters.naac.length) {
      result = result.filter((c) => filters.naac.includes(c.naac))
    }
    if (filters.areas.length) {
      result = result.filter((c) =>
        filters.areas.some((area) => c.location.toLowerCase().includes(area.toLowerCase()))
      )
    }
    if (filters.exams.length) {
      result = result.filter((c) =>
        filters.exams.some((exam) => c.entranceExams.includes(exam))
      )
    }
    if (filters.feesMax < 2500000) {
      result = result.filter((c) => c.feesRange.min <= filters.feesMax)
    }
    if (filters.hostel) {
      result = result.filter((c) => c.hostel)
    }
    if (filters.nirfRanked) {
      result = result.filter((c) => c.nirfRank !== null)
    }

    // Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "fees_low":
        result.sort((a, b) => a.feesRange.min - b.feesRange.min)
        break
      case "fees_high":
        result.sort((a, b) => b.feesRange.max - a.feesRange.max)
        break
      case "placement":
        result.sort((a, b) => b.avgPlacement - a.avgPlacement)
        break
      case "nirf":
        result.sort((a, b) => (a.nirfRank ?? 9999) - (b.nirfRank ?? 9999))
        break
    }

    return result
  }, [filters, sortBy, searchQuery])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {searchQuery && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Search results for &quot;<span className="text-orange-600">{searchQuery}</span>&quot;
          </h1>
          <p className="text-gray-500 mt-1">{filteredColleges.length} colleges found</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-72 flex-shrink-0">
          <CollegeFilters onFiltersChange={setFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 bg-white rounded-xl border border-gray-100 px-4 py-3">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredColleges.length}</span> colleges found
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-sm text-gray-700 bg-transparent outline-none cursor-pointer"
                >
                  <option value="rating">Top Rated</option>
                  <option value="nirf">NIRF Rank</option>
                  <option value="placement">Best Placement</option>
                  <option value="fees_low">Fees: Low to High</option>
                  <option value="fees_high">Fees: High to Low</option>
                </select>
              </div>
              <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn("p-1.5 rounded", viewMode === "grid" ? "bg-orange-100 text-orange-600" : "text-gray-400 hover:text-gray-600")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn("p-1.5 rounded", viewMode === "list" ? "bg-orange-100 text-orange-600" : "text-gray-400 hover:text-gray-600")}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* College Cards */}
          {filteredColleges.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No colleges found</h3>
              <p className="text-gray-500 text-sm">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className={cn(
                "grid gap-5",
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-1"
              )}>
                {filteredColleges.slice(0, 5).map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
              {filteredColleges.length > 5 && (
                <InlineLeadForm context="Browse colleges in Pune" />
              )}
              {filteredColleges.length > 5 && (
                <div className={cn(
                  "grid gap-5",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                )}>
                  {filteredColleges.slice(5, 10).map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>
              )}
              {filteredColleges.length > 10 && (
                <InlineLeadForm context="Browse colleges in Pune" />
              )}
              {filteredColleges.length > 10 && (
                <div className={cn(
                  "grid gap-5",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                )}>
                  {filteredColleges.slice(10).map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
