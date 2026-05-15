"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Fuse from "fuse.js"
import { colleges } from "@/data/colleges"
import { Search, X, ArrowRight } from "lucide-react"

const STREAM_COLORS: Record<string, string> = {
  Engineering: "bg-blue-50 text-blue-700",
  MBA: "bg-purple-50 text-purple-700",
  Medical: "bg-green-50 text-green-700",
  Arts: "bg-yellow-50 text-yellow-700",
  Design: "bg-pink-50 text-pink-700",
  Law: "bg-orange-50 text-orange-700",
  Pharmacy: "bg-teal-50 text-teal-700",
}

const fuse = new Fuse(colleges, {
  keys: [
    { name: "name", weight: 0.5 },
    { name: "shortName", weight: 0.3 },
    { name: "stream", weight: 0.1 },
    { name: "tags", weight: 0.1 },
  ],
  threshold: 0.35,
  includeScore: true,
  minMatchCharLength: 2,
})

export default function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = query.trim().length >= 2
    ? fuse.search(query).slice(0, 8).map((r) => r.item)
    : colleges.slice(0, 6)

  const openModal = useCallback(() => {
    setOpen(true)
    setQuery("")
    setActiveIdx(0)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
    setQuery("")
  }, [])

  const navigate = useCallback((slug: string) => {
    closeModal()
    router.push(`/colleges/${slug}`)
  }, [closeModal, router])

  // CMD+K / CTRL+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        open ? closeModal() : openModal()
      }
      if (e.key === "Escape") closeModal()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, openModal, closeModal])

  // Arrow key navigation
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIdx((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === "Enter" && results[activeIdx]) {
        navigate(results[activeIdx].slug)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, results, activeIdx, navigate])

  if (!open) {
    return (
      <button
        onClick={openModal}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:border-gray-300 transition-colors"
        aria-label="Search colleges (Ctrl+K)"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search colleges…</span>
        <kbd className="ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white border border-gray-200 rounded text-gray-400">⌘K</kbd>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0) }}
            placeholder="Search colleges in Pune…"
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            autoComplete="off"
          />
          <button onClick={closeModal} className="p-1 rounded-md hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-400">
              No colleges found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <>
              {!query.trim() && (
                <p className="px-4 pt-3 pb-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
                  Top Colleges
                </p>
              )}
              <ul>
                {results.map((college, idx) => (
                  <li key={college.slug}>
                    <button
                      onClick={() => navigate(college.slug)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        idx === activeIdx ? "bg-orange-50" : "hover:bg-gray-50"
                      }`}
                    >
                      {/* Initials badge */}
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-xs font-bold text-blue-700">
                        {college.shortName.slice(0, 2).toUpperCase()}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-gray-900 truncate">{college.name}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${STREAM_COLORS[college.stream] ?? "bg-gray-100 text-gray-600"}`}>
                            {college.stream}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                          <span>{college.naac} NAAC</span>
                          {college.nirfRank && <span>· NIRF #{college.nirfRank}</span>}
                          <span>· ₹{(college.feesRange.min / 100000).toFixed(0)}L–{(college.feesRange.max / 100000).toFixed(0)}L/yr</span>
                        </div>
                      </div>

                      <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-colors ${idx === activeIdx ? "text-orange-500" : "text-gray-300"}`} />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-400">
          <span><kbd className="font-mono bg-white border border-gray-200 rounded px-1">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono bg-white border border-gray-200 rounded px-1">↵</kbd> open</span>
          <span><kbd className="font-mono bg-white border border-gray-200 rounded px-1">Esc</kbd> close</span>
          <span className="ml-auto">
            <a href="/colleges" onClick={closeModal} className="text-orange-600 hover:underline font-medium">
              Browse all colleges →
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
