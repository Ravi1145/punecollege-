"use client"
import { useState } from "react"
import { Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const STREAMS = ["Engineering", "Management", "Medical", "Arts & Science", "Law", "Architecture"]
const LEVELS = ["UG", "PG", "Diploma", "PhD"]
const DURATIONS = ["1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "5.5 Years"]

interface CourseFiltersProps {
  onFiltersChange: (filters: { streams: string[]; levels: string[] }) => void
}

export default function CourseFilters({ onFiltersChange }: CourseFiltersProps) {
  const [streams, setStreams] = useState<string[]>([])
  const [levels, setLevels] = useState<string[]>([])

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
    setArr(next)
    onFiltersChange({ streams: val === streams[0] ? next : streams, levels: val === levels[0] ? next : levels })
  }

  const chips = (options: string[], selected: string[], onToggle: (v: string) => void) =>
    options.map((opt) => (
      <button
        key={opt}
        onClick={() => onToggle(opt)}
        className={cn(
          "px-3 py-1.5 rounded-full text-sm font-medium border transition-all",
          selected.includes(opt)
            ? "bg-orange-500 border-orange-500 text-white"
            : "bg-white border-gray-200 text-gray-600 hover:border-orange-300"
        )}
      >
        {opt}
      </button>
    ))

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-orange-500" />
        <h2 className="font-bold text-gray-900 text-sm">Filter Courses</h2>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Stream</p>
          <div className="flex flex-wrap gap-2">
            {chips(STREAMS, streams, (v) => {
              const next = streams.includes(v) ? streams.filter((s) => s !== v) : [...streams, v]
              setStreams(next)
              onFiltersChange({ streams: next, levels })
            })}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Level</p>
          <div className="flex flex-wrap gap-2">
            {chips(LEVELS, levels, (v) => {
              const next = levels.includes(v) ? levels.filter((l) => l !== v) : [...levels, v]
              setLevels(next)
              onFiltersChange({ streams, levels: next })
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
