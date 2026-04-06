"use client"
import { useState } from "react"
import { courses } from "@/data/courses"
import CourseCard from "./CourseCard"
import CourseFilters from "./CourseFilters"

export default function CoursesClient() {
  const [filters, setFilters] = useState({ streams: [] as string[], levels: [] as string[] })

  const filtered = courses.filter((c) => {
    if (filters.streams.length && !filters.streams.some((s) => c.stream.includes(s))) return false
    if (filters.levels.length && !filters.levels.includes(c.level)) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CourseFilters onFiltersChange={setFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
