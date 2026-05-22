"use client"
import { useState } from "react"
import { courses } from "@/data/courses"
import CourseCard from "./CourseCard"
import FilterTabs from "@/components/ui/FilterTabs"

const STREAM_TABS = ["All", "Engineering", "Management", "Medical", "Law", "Architecture", "Commerce", "Arts", "Science"]
const LEVEL_TABS = ["All Levels", "UG", "PG", "Diploma", "PhD"]

export default function CoursesClient() {
  const [activeStream, setActiveStream] = useState("All")
  const [activeLevel, setActiveLevel] = useState("All Levels")

  const filtered = courses.filter((c) => {
    const streamMatch = activeStream === "All" || c.stream === activeStream
    const levelMatch = activeLevel === "All Levels" || c.level === activeLevel
    return streamMatch && levelMatch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stream tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Filter by Stream</p>
        <FilterTabs tabs={STREAM_TABS} active={activeStream} onChange={setActiveStream} />
      </div>

      {/* Level tabs */}
      <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Filter by Level</p>
        <FilterTabs tabs={LEVEL_TABS} active={activeLevel} onChange={setActiveLevel} />
      </div>

      <p className="text-sm text-gray-500 mb-4">
        <span className="font-semibold text-gray-900">{filtered.length}</span> courses found
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
