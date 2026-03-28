"use client"
import { useState } from "react"
import { Loader2, Trophy, TrendingUp, DollarSign, Users, BookOpen, Briefcase, Building2, Sparkles, ArrowRight } from "lucide-react"
import { colleges } from "@/data/colleges"
import { AIComparisonResult } from "@/types"
import { cn } from "@/lib/utils"

const categoryIcons: Record<string, React.ElementType> = {
  academics: BookOpen,
  placements: TrendingUp,
  fees: DollarSign,
  campus: Building2,
  faculty: Users,
  industry_connect: Briefcase,
}

export default function AIComparison() {
  const [college1, setCollege1] = useState("")
  const [college2, setCollege2] = useState("")
  const [result, setResult] = useState<AIComparisonResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCompare = async () => {
    if (!college1 || !college2) {
      setError("Please select both colleges")
      return
    }
    if (college1 === college2) {
      setError("Please select different colleges")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/ai-compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ college1, college2 }),
      })
      if (!res.ok) throw new Error("API error")
      const data = await res.json()
      setResult(data)
    } catch {
      setError("Comparison failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const col1Data = colleges.find((c) => c.slug === college1)
  const col2Data = colleges.find((c) => c.slug === college2)

  return (
    <div className="space-y-6">
      {/* College Selectors */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold text-gray-900">AI College Comparison</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              College 1
            </label>
            <select
              value={college1}
              onChange={(e) => setCollege1(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-orange-400 bg-white"
            >
              <option value="">Select a college</option>
              {colleges.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
              VS
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">
              College 2
            </label>
            <select
              value={college2}
              onChange={(e) => setCollege2(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-orange-400 bg-white"
            >
              <option value="">Select a college</option>
              {colleges.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <button
          onClick={handleCompare}
          disabled={loading || !college1 || !college2}
          className="mt-5 w-full sm:w-auto bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              AI Comparing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Compare with AI
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {result && !loading && (
        <>
          {/* Winner Banner */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">AI Verdict</p>
                <p className="text-xl font-bold">{result.winner} wins overall!</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{result.summary}</p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100 px-6 py-3">
              <div className="col-span-3 text-xs font-semibold text-gray-500 uppercase">Category</div>
              <div className="col-span-2 text-center text-xs font-semibold text-gray-700 truncate">
                {col1Data?.shortName || "College 1"}
              </div>
              <div className="col-span-2 text-center text-xs font-semibold text-gray-700 truncate">
                {col2Data?.shortName || "College 2"}
              </div>
            </div>

            {result.categories.map((cat) => {
              const Icon = categoryIcons[cat.name.toLowerCase().replace(/ /g, "_")] || BookOpen
              return (
                <div key={cat.name} className="grid grid-cols-7 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-start gap-2">
                  <div className="col-span-3 flex items-center gap-2">
                    <Icon className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-800 capitalize">{cat.name.replace(/_/g, " ")}</span>
                  </div>
                  <div className={cn(
                    "col-span-2 text-center text-xs rounded-lg px-2 py-1.5",
                    cat.winner === "college1"
                      ? "bg-green-50 text-green-800 font-semibold"
                      : cat.winner === "tie"
                      ? "bg-gray-50 text-gray-600"
                      : "text-gray-600"
                  )}>
                    {cat.college1Value}
                    {cat.winner === "college1" && " ✓"}
                  </div>
                  <div className={cn(
                    "col-span-2 text-center text-xs rounded-lg px-2 py-1.5",
                    cat.winner === "college2"
                      ? "bg-green-50 text-green-800 font-semibold"
                      : cat.winner === "tie"
                      ? "bg-gray-50 text-gray-600"
                      : "text-gray-600"
                  )}>
                    {cat.college2Value}
                    {cat.winner === "college2" && " ✓"}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.categories.slice(0, 4).map((cat) => (
              <div key={cat.name} className="bg-white rounded-xl border border-gray-100 p-4">
                <p className="text-xs font-bold text-gray-500 uppercase mb-1 capitalize">{cat.name.replace(/_/g, " ")}</p>
                <p className="text-sm text-gray-700">{cat.insight}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
