"use client"
import { useState, useMemo } from "react"
import { Award, TrendingUp, MapPin, ExternalLink, Filter, ChevronUp, ChevronDown } from "lucide-react"
import Link from "next/link"
import { colleges } from "@/data/colleges"
import { cn } from "@/lib/utils"

type SortKey = "nirfRank" | "avgPlacement" | "naac" | "name"
type StreamFilter = "All" | "Engineering" | "MBA" | "Medical"

const NAAC_ORDER: Record<string, number> = { "A++": 1, "A+": 2, "A": 3, "B++": 4, "B+": 5, "B": 6 }
const NAAC_COLORS: Record<string, string> = {
  "A++": "bg-emerald-100 text-emerald-800",
  "A+": "bg-green-100 text-green-700",
  "A": "bg-blue-100 text-blue-700",
  "B++": "bg-yellow-100 text-yellow-700",
  "B+": "bg-orange-100 text-orange-700",
  "B": "bg-gray-100 text-gray-700",
}

function formatINR(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  return `₹${n.toLocaleString("en-IN")}`
}

export default function NIRFInsightsPage() {
  const [stream, setStream] = useState<StreamFilter>("All")
  const [sortKey, setSortKey] = useState<SortKey>("nirfRank")
  const [sortAsc, setSortAsc] = useState(true)
  const [search, setSearch] = useState("")

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((a) => !a)
    else { setSortKey(key); setSortAsc(true) }
  }

  const filtered = useMemo(() => {
    let list = [...colleges]
    if (stream !== "All") list = list.filter((c) => c.stream === stream)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((c) => c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q))
    }
    list.sort((a, b) => {
      let va: number | string, vb: number | string
      if (sortKey === "nirfRank") {
        va = a.nirfRank ?? 99999
        vb = b.nirfRank ?? 99999
      } else if (sortKey === "avgPlacement") {
        va = a.avgPlacement
        vb = b.avgPlacement
      } else if (sortKey === "naac") {
        va = NAAC_ORDER[a.naac] ?? 99
        vb = NAAC_ORDER[b.naac] ?? 99
      } else {
        va = a.name
        vb = b.name
      }
      if (typeof va === "string" && typeof vb === "string") return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va)
      return sortAsc ? (va as number) - (vb as number) : (vb as number) - (va as number)
    })
    return list
  }, [stream, sortKey, sortAsc, search])

  const rankedColleges = filtered.filter((c) => c.nirfRank)
  const unrankedColleges = filtered.filter((c) => !c.nirfRank)

  const topByPlacement = [...colleges].sort((a, b) => b.avgPlacement - a.avgPlacement).slice(0, 5)
  const naacDistribution = colleges.reduce<Record<string, number>>((acc, c) => {
    acc[c.naac] = (acc[c.naac] || 0) + 1
    return acc
  }, {})

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 text-gray-300" />
    return sortAsc ? <ChevronUp className="w-3 h-3 text-orange-500" /> : <ChevronDown className="w-3 h-3 text-orange-500" />
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <Award className="w-3.5 h-3.5" /> NIRF &amp; NAAC INSIGHTS
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Pune College Rankings &amp; Accreditation
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto">
            Explore NIRF rankings, NAAC grades, and placement data for all major Pune colleges — all in one place.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Colleges Listed", value: colleges.length.toString(), color: "text-blue-700" },
            { label: "NIRF Ranked", value: colleges.filter((c) => c.nirfRank).length.toString(), color: "text-purple-700" },
            { label: "NAAC A+ / A++", value: colleges.filter((c) => c.naac === "A+" || c.naac === "A++").length.toString(), color: "text-green-700" },
            { label: "Avg Placement", value: formatINR(Math.round(colleges.reduce((s, c) => s + c.avgPlacement, 0) / colleges.length)), color: "text-orange-700" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
              <p className={cn("text-2xl font-extrabold", color)}>{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {/* Top Placement */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" /> Top 5 by Avg Placement
            </h2>
            <div className="space-y-3">
              {topByPlacement.map((c, i) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center text-xs font-bold text-orange-600 flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{c.shortName}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <div
                        className="h-1.5 bg-orange-400 rounded-full"
                        style={{ width: `${(c.avgPlacement / topByPlacement[0].avgPlacement) * 100}%`, maxWidth: "100%" }}
                      />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-700 flex-shrink-0">{formatINR(c.avgPlacement)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* NAAC Distribution */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" /> NAAC Grade Distribution
            </h2>
            <div className="space-y-2.5">
              {Object.entries(naacDistribution).sort((a, b) => (NAAC_ORDER[a[0]] ?? 99) - (NAAC_ORDER[b[0]] ?? 99)).map(([grade, count]) => (
                <div key={grade} className="flex items-center gap-3">
                  <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full w-12 text-center", NAAC_COLORS[grade] || "bg-gray-100 text-gray-600")}>
                    {grade}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(count / colleges.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Facts */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-900 mb-4">NIRF 2024 Quick Facts</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: "Best NIRF Rank in Pune", value: `#${colleges.filter(c => c.nirfRank).sort((a, b) => (a.nirfRank ?? 0) - (b.nirfRank ?? 0))[0]?.nirfRank} — ${colleges.filter(c => c.nirfRank).sort((a, b) => (a.nirfRank ?? 0) - (b.nirfRank ?? 0))[0]?.shortName}` },
                { label: "Government Colleges", value: `${colleges.filter(c => c.type === "Government").length} listed` },
                { label: "Deemed Universities", value: `${colleges.filter(c => c.type === "Deemed").length} listed` },
                { label: "Autonomous Institutes", value: `${colleges.filter(c => c.type === "Autonomous").length} listed` },
                { label: "Private Colleges", value: `${colleges.filter(c => c.type === "Private").length} listed` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 text-xs">{label}</span>
                  <span className="text-gray-900 text-xs font-semibold text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
          </div>
          <div className="flex gap-2 flex-wrap flex-1">
            {(["All", "Engineering", "MBA", "Medical"] as StreamFilter[]).map((s) => (
              <button
                key={s}
                onClick={() => setStream(s)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
                  stream === s ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search colleges..."
            className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm outline-none focus:border-orange-400 sm:w-56"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">{filtered.length} Colleges</h2>
            <p className="text-xs text-gray-400">Click column headers to sort</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-2 sm:px-5 py-3 text-xs font-semibold text-gray-500 w-8">#</th>
                  <th
                    className="text-left px-2 sm:px-4 py-3 text-xs font-semibold text-gray-500 cursor-pointer hover:text-gray-900 select-none"
                    onClick={() => handleSort("name")}
                  >
                    <span className="flex items-center gap-1">College <SortIcon col="name" /></span>
                  </th>
                  <th
                    className="text-center px-2 sm:px-4 py-3 text-xs font-semibold text-gray-500 cursor-pointer hover:text-gray-900 select-none whitespace-nowrap"
                    onClick={() => handleSort("nirfRank")}
                  >
                    <span className="flex items-center justify-center gap-1">NIRF Rank <SortIcon col="nirfRank" /></span>
                  </th>
                  <th
                    className="text-center px-4 py-3 text-xs font-semibold text-gray-500 cursor-pointer hover:text-gray-900 select-none"
                    onClick={() => handleSort("naac")}
                  >
                    <span className="flex items-center justify-center gap-1">NAAC <SortIcon col="naac" /></span>
                  </th>
                  <th
                    className="text-right px-2 sm:px-4 py-3 text-xs font-semibold text-gray-500 cursor-pointer hover:text-gray-900 select-none whitespace-nowrap"
                    onClick={() => handleSort("avgPlacement")}
                  >
                    <span className="flex items-center justify-end gap-1">Avg Package <SortIcon col="avgPlacement" /></span>
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 hidden sm:table-cell">Type</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 hidden md:table-cell">Stream</th>
                  <th className="px-2 sm:px-4 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {/* NIRF Ranked colleges first */}
                {rankedColleges.length > 0 && (
                  <>
                    <tr>
                      <td colSpan={8} className="px-3 sm:px-5 py-2 bg-purple-50 text-xs font-bold text-purple-700">
                        NIRF Ranked Colleges
                      </td>
                    </tr>
                    {rankedColleges.map((college, idx) => (
                      <tr key={college.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 text-xs text-gray-400">{idx + 1}</td>
                        <td className="px-2 sm:px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-[#0A1628] rounded-xl flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0">
                              {college.shortName.slice(0, 3)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{college.name}</p>
                              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3" />{college.location}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-center">
                          <span className="inline-flex items-center justify-center w-14 h-7 bg-purple-50 text-purple-800 text-xs font-bold rounded-lg">
                            #{college.nirfRank}
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-center">
                          <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", NAAC_COLORS[college.naac] || "bg-gray-100 text-gray-600")}>
                            {college.naac}
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-right font-bold text-gray-900 text-sm">{formatINR(college.avgPlacement)}</td>
                        <td className="px-2 sm:px-4 py-3 text-center hidden sm:table-cell">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{college.type}</span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-center hidden md:table-cell">
                          <span className="text-xs text-gray-500">{college.stream}</span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-center">
                          <Link href={`/colleges/${college.slug}`} className="text-xs text-orange-600 font-semibold hover:underline flex items-center justify-center gap-1">
                            View <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </>
                )}

                {/* Unranked */}
                {unrankedColleges.length > 0 && (
                  <>
                    <tr>
                      <td colSpan={8} className="px-3 sm:px-5 py-2 bg-gray-50 text-xs font-bold text-gray-500">
                        Other Listed Colleges (NIRF Unranked)
                      </td>
                    </tr>
                    {unrankedColleges.map((college, idx) => (
                      <tr key={college.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3 text-xs text-gray-300">—</td>
                        <td className="px-2 sm:px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 font-bold text-[10px] flex-shrink-0">
                              {college.shortName.slice(0, 3)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{college.name}</p>
                              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3" />{college.location}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-center">
                          <span className="text-xs text-gray-400">—</span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-center">
                          <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", NAAC_COLORS[college.naac] || "bg-gray-100 text-gray-600")}>
                            {college.naac}
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-right font-bold text-gray-900 text-sm">{formatINR(college.avgPlacement)}</td>
                        <td className="px-2 sm:px-4 py-3 text-center hidden sm:table-cell">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{college.type}</span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-center hidden md:table-cell">
                          <span className="text-xs text-gray-500">{college.stream}</span>
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-center">
                          <Link href={`/colleges/${college.slug}`} className="text-xs text-orange-600 font-semibold hover:underline flex items-center justify-center gap-1">
                            View <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </>
                )}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-gray-400 text-sm">
                      No colleges matched your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white">
            <p className="font-bold">Not sure which college to choose?</p>
            <p className="text-blue-200 text-sm">Use our College Predictor or talk to a free counsellor.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/predictor" className="bg-white text-[#0A1628] font-bold px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-colors hover:bg-gray-100">
              College Predictor →
            </Link>
            <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-colors">
              Free Counselling →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
