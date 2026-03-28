"use client"
import { useState } from "react"
import { courses } from "@/data/courses"
import CourseCard from "@/components/courses/CourseCard"
import CourseFilters from "@/components/courses/CourseFilters"

export default function CoursesPage() {
  const [filters, setFilters] = useState({ streams: [] as string[], levels: [] as string[] })

  const filtered = courses.filter((c) => {
    if (filters.streams.length && !filters.streams.some((s) => c.stream.includes(s))) return false
    if (filters.levels.length && !filters.levels.includes(c.level)) return false
    return true
  })

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Courses in Pune 2025
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Explore 500+ undergraduate and postgraduate courses offered by top Pune colleges. Compare fees, duration, salary, and top colleges.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CourseFilters onFiltersChange={setFilters} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  )
}
