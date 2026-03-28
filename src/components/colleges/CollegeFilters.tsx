"use client"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter, X, ChevronDown, ChevronUp, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

const STREAMS = ["Engineering", "MBA", "Medical", "Arts & Science", "Management", "Law", "Architecture"]
const COLLEGE_TYPES = ["Government", "Private", "Deemed", "Autonomous"]
const NAAC_GRADES = ["A++", "A+", "A", "B++", "B+"]
const PUNE_AREAS = ["Shivajinagar", "Kothrud", "Hadapsar", "Wakad", "Tathawade", "Akurdi", "Bavdhan", "Karve Nagar", "Bibwewadi", "Viman Nagar", "Dhankawadi", "Lavale"]
const EXAMS = ["MHT-CET", "JEE Main", "JEE Advanced", "NEET", "CAT", "SNAP", "MAT", "CMAT", "NATA", "SET"]

interface FiltersState {
  streams: string[]
  types: string[]
  naac: string[]
  areas: string[]
  exams: string[]
  feesMin: number
  feesMax: number
  hostel: boolean
  nirfRanked: boolean
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-3"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && children}
    </div>
  )
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[]
  selected: string[]
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
            className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
          />
          <span className={cn(
            "text-sm transition-colors",
            selected.includes(option) ? "text-orange-600 font-medium" : "text-gray-600 group-hover:text-gray-900"
          )}>
            {option}
          </span>
        </label>
      ))}
    </div>
  )
}

interface CollegeFiltersProps {
  onFiltersChange?: (filters: FiltersState) => void
  className?: string
}

export default function CollegeFilters({ onFiltersChange, className }: CollegeFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeCount, setActiveCount] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)

  const [filters, setFilters] = useState<FiltersState>({
    streams: searchParams.get("stream") ? [searchParams.get("stream")!] : [],
    types: [],
    naac: [],
    areas: [],
    exams: [],
    feesMin: 0,
    feesMax: 2500000,
    hostel: false,
    nirfRanked: false,
  })

  useEffect(() => {
    let count = 0
    if (filters.streams.length) count += filters.streams.length
    if (filters.types.length) count += filters.types.length
    if (filters.naac.length) count += filters.naac.length
    if (filters.areas.length) count += filters.areas.length
    if (filters.exams.length) count += filters.exams.length
    if (filters.hostel) count++
    if (filters.nirfRanked) count++
    if (filters.feesMax < 2500000) count++
    setActiveCount(count)
    onFiltersChange?.(filters)
  }, [filters, onFiltersChange])

  const toggleArray = (key: keyof FiltersState, value: string) => {
    setFilters((prev) => {
      const arr = prev[key] as string[]
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      }
    })
  }

  const resetFilters = () => {
    setFilters({
      streams: [],
      types: [],
      naac: [],
      areas: [],
      exams: [],
      feesMin: 0,
      feesMax: 2500000,
      hostel: false,
      nirfRanked: false,
    })
  }

  const filterContent = (
    <div className={cn("bg-white rounded-2xl border border-gray-100 p-5", className)}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-orange-500" />
          <h2 className="font-bold text-gray-900">Filters</h2>
          {activeCount > 0 && (
            <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      <FilterSection title="Stream / Program">
        <CheckboxGroup
          options={STREAMS}
          selected={filters.streams}
          onChange={(v) => toggleArray("streams", v)}
        />
      </FilterSection>

      <FilterSection title="College Type">
        <CheckboxGroup
          options={COLLEGE_TYPES}
          selected={filters.types}
          onChange={(v) => toggleArray("types", v)}
        />
      </FilterSection>

      <FilterSection title="NAAC Grade">
        <CheckboxGroup
          options={NAAC_GRADES}
          selected={filters.naac}
          onChange={(v) => toggleArray("naac", v)}
        />
      </FilterSection>

      <FilterSection title="Annual Fees Range" defaultOpen={false}>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">
              Max Fees: ₹{(filters.feesMax / 100000).toFixed(1)}L/yr
            </label>
            <input
              type="range"
              min={0}
              max={2500000}
              step={50000}
              value={filters.feesMax}
              onChange={(e) => setFilters((p) => ({ ...p, feesMax: Number(e.target.value) }))}
              className="w-full accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Free</span>
              <span>₹25L/yr</span>
            </div>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Location in Pune" defaultOpen={false}>
        <CheckboxGroup
          options={PUNE_AREAS}
          selected={filters.areas}
          onChange={(v) => toggleArray("areas", v)}
        />
      </FilterSection>

      <FilterSection title="Entrance Exam" defaultOpen={false}>
        <CheckboxGroup
          options={EXAMS}
          selected={filters.exams}
          onChange={(v) => toggleArray("exams", v)}
        />
      </FilterSection>

      <FilterSection title="Other Filters" defaultOpen={true}>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.hostel}
              onChange={(e) => setFilters((p) => ({ ...p, hostel: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-orange-500"
            />
            <span className="text-sm text-gray-600">Has Hostel Facility</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.nirfRanked}
              onChange={(e) => setFilters((p) => ({ ...p, nirfRanked: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-orange-500"
            />
            <span className="text-sm text-gray-600">NIRF Ranked</span>
          </label>
        </div>
      </FilterSection>
    </div>
  )

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:border-orange-300 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeCount > 0 && (
            <span className="bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <span className="font-bold text-gray-900">Filters</span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-5">{filterContent}</div>
            <div className="px-5 pb-8 pt-2 flex gap-3">
              <button onClick={resetFilters} className="flex-1 border border-gray-200 rounded-xl py-3 text-sm font-medium text-gray-700">
                Reset
              </button>
              <button onClick={() => setMobileOpen(false)} className="flex-1 bg-orange-500 text-white rounded-xl py-3 text-sm font-semibold">
                Apply Filters {activeCount > 0 && `(${activeCount})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="hidden lg:block">{filterContent}</div>
    </>
  )
}
