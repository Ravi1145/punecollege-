"use client"
import { useState } from "react"
import Link from "next/link"
import { blogCalendar, highValueTopics, quickWins } from "@/data/blogCalendar"
import type { BlogCalendarEntry } from "@/data/blogCalendar"
import {
  Calendar, TrendingUp, Zap, ExternalLink, ChevronDown, ChevronUp,
  BarChart2, Tag, Clock, Target
} from "lucide-react"
import { cn } from "@/lib/utils"

const VOLUME_COLORS: Record<BlogCalendarEntry["searchVolume"], string> = {
  "Very High": "bg-green-100 text-green-800",
  "High":      "bg-blue-100 text-blue-800",
  "Medium":    "bg-yellow-100 text-yellow-700",
}

const DIFFICULTY_COLORS: Record<BlogCalendarEntry["difficulty"], string> = {
  Low:    "bg-emerald-100 text-emerald-700",
  Medium: "bg-orange-100 text-orange-700",
  Hard:   "bg-red-100 text-red-700",
}

const INTENT_COLORS: Record<BlogCalendarEntry["intent"], string> = {
  Informational: "bg-sky-100 text-sky-700",
  Commercial:    "bg-purple-100 text-purple-700",
  Transactional: "bg-pink-100 text-pink-700",
}

const CATEGORY_COLORS: Record<string, string> = {
  Admissions:   "bg-orange-500",
  Comparisons:  "bg-blue-500",
  Rankings:     "bg-purple-500",
  "Campus Life":"bg-green-500",
  Guidance:     "bg-teal-500",
  Career:       "bg-pink-500",
}

function encodeAddParam(val: string) {
  return encodeURIComponent(val)
}

function BlogRow({ entry, expanded, onToggle }: {
  entry: BlogCalendarEntry
  expanded: boolean
  onToggle: () => void
}) {
  const addUrl = `/admin/blogs/add?title=${encodeAddParam(entry.title)}&slug=${encodeAddParam(entry.slug)}`

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      {/* Header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
      >
        {/* Week badge */}
        <div className="shrink-0 w-10 h-10 rounded-lg bg-[#0A1628] text-white flex flex-col items-center justify-center text-xs font-bold leading-tight">
          <span className="text-[8px] font-normal text-blue-300 uppercase tracking-wide">wk</span>
          <span>{entry.week}</span>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap mb-1.5">
            <span className={cn(
              "inline-block w-2 h-2 rounded-full mt-1.5 shrink-0",
              CATEGORY_COLORS[entry.category] ?? "bg-gray-400"
            )} />
            <p className="font-semibold text-gray-900 text-sm leading-snug">{entry.title}</p>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-1">
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold", VOLUME_COLORS[entry.searchVolume])}>
              {entry.searchVolume} demand
            </span>
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold", DIFFICULTY_COLORS[entry.difficulty])}>
              {entry.difficulty} difficulty
            </span>
            <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold", INTENT_COLORS[entry.intent])}>
              {entry.intent}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-600">
              {entry.publishMonth}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-600">
              ~{entry.estimatedMonthlySearches}/mo
            </span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href={addUrl}
            onClick={(e) => e.stopPropagation()}
            className="hidden sm:flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Write
          </Link>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-4 text-sm">
          {/* Excerpt */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Excerpt / Meta Description</p>
            <p className="text-gray-700 text-sm leading-relaxed">{entry.excerpt}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Keywords */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Target Keywords</p>
              <div className="space-y-1">
                <span className="inline-block bg-orange-100 text-orange-800 text-[11px] font-semibold px-2 py-1 rounded-lg mr-1">
                  🎯 {entry.targetKeyword}
                </span>
                {entry.secondaryKeywords.map((kw) => (
                  <span key={kw} className="inline-block bg-gray-100 text-gray-600 text-[11px] px-2 py-1 rounded-lg mr-1 mb-1">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Content specs */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Content Specs</p>
              <div className="space-y-1 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>Word count: <strong className="text-gray-900">{entry.wordCount.toLocaleString()} words</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                  <span>Category: <strong className="text-gray-900">{entry.category}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-3.5 h-3.5 text-gray-400" />
                  <span>CTA: <strong className="text-gray-900">{entry.cta}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Outline */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Article Outline ({entry.outline.length} sections)</p>
            <ol className="space-y-1">
              {entry.outline.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 mt-0.5">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          {/* Internal links */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Internal Links to Add</p>
            <div className="flex flex-wrap gap-1.5">
              {entry.internalLinks.map((link) => (
                <Link
                  key={link}
                  href={link}
                  target="_blank"
                  className="text-[11px] text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-lg"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Write button (mobile) */}
          <Link
            href={addUrl}
            className="sm:hidden flex items-center justify-center gap-2 w-full py-2.5 bg-orange-500 text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Start Writing This Post
          </Link>
        </div>
      )}
    </div>
  )
}

export default function BlogCalendarPage() {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"all" | "quick" | "high-value">("all")
  const [filterCategory, setFilterCategory] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(blogCalendar.map((e) => e.category)))]

  const sourceList =
    activeTab === "quick"      ? quickWins :
    activeTab === "high-value" ? highValueTopics :
    blogCalendar

  const displayed = filterCategory === "All"
    ? sourceList
    : sourceList.filter((e) => e.category === filterCategory)

  const byWeek = displayed.reduce<Record<number, BlogCalendarEntry[]>>((acc, entry) => {
    if (!acc[entry.week]) acc[entry.week] = []
    acc[entry.week].push(entry)
    return acc
  }, {})

  const totalSearches = blogCalendar.reduce((sum, e) => {
    const n = parseInt(e.estimatedMonthlySearches.replace(/[^0-9]/g, ""), 10)
    return sum + (isNaN(n) ? 0 : n)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Topics",        value: blogCalendar.length,                             icon: Calendar,  color: "text-blue-600",   bg: "bg-blue-50" },
          { label: "High-Value Topics",   value: highValueTopics.length,                          icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Quick Wins",          value: quickWins.length,                                icon: Zap,       color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Est. Monthly Reach",  value: `${(totalSearches / 1000).toFixed(0)}K+`,        icon: BarChart2, color: "text-green-600",  bg: "bg-green-50" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2", bg)}>
              <Icon className={cn("w-4 h-4", color)} />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          {/* View tabs */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl w-fit">
            {(["all", "high-value", "quick"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors capitalize",
                  activeTab === tab ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {tab === "all" ? `All (${blogCalendar.length})` :
                 tab === "high-value" ? `High Value (${highValueTopics.length})` :
                 `Quick Wins (${quickWins.length})`}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={cn(
                  "text-[11px] font-semibold px-2.5 py-1 rounded-full transition-colors",
                  filterCategory === cat
                    ? "bg-[#0A1628] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-[11px] text-gray-500 px-1">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          Very High demand
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          High demand
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          Medium demand
        </div>
        <div className="flex items-center gap-1.5 ml-4">
          {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
            <span key={cat} className="flex items-center gap-1">
              <span className={cn("w-2.5 h-2.5 rounded-full", color)} />
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Topics grouped by week */}
      {Object.keys(byWeek).sort((a, b) => Number(a) - Number(b)).map((weekStr) => {
        const week = Number(weekStr)
        const entries = byWeek[week]
        return (
          <div key={week} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Week {week} — {entries[0]?.publishMonth}
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            {entries.map((entry) => (
              <BlogRow
                key={entry.slug}
                entry={entry}
                expanded={expandedSlug === entry.slug}
                onToggle={() => setExpandedSlug(expandedSlug === entry.slug ? null : entry.slug)}
              />
            ))}
          </div>
        )
      })}

      {displayed.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No topics match the selected filters.
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1a2d4f] rounded-xl p-6 text-white text-center">
        <h3 className="font-bold text-lg mb-1">Ready to publish?</h3>
        <p className="text-blue-200 text-sm mb-4">Click any topic above to expand the full brief, then hit "Write" to open the blog editor pre-filled.</p>
        <Link
          href="/admin/blogs/add"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          Open Blog Editor
        </Link>
      </div>
    </div>
  )
}
