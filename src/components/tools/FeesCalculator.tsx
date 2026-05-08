"use client"

import { useState } from "react"

const engineeringColleges = [
  { name: "COEP Pune (Government)", minFee: 80000, maxFee: 180000, type: "Government" },
  { name: "PICT Pune (Autonomous)", minFee: 140000, maxFee: 190000, type: "Autonomous" },
  { name: "VIT Pune (Autonomous)", minFee: 160000, maxFee: 220000, type: "Autonomous" },
  { name: "SIT Pune (Deemed)", minFee: 360000, maxFee: 480000, type: "Deemed" },
  { name: "MIT-WPU Pune (Deemed)", minFee: 200000, maxFee: 380000, type: "Deemed" },
  { name: "Cummins College (Autonomous)", minFee: 130000, maxFee: 175000, type: "Autonomous" },
  { name: "JSPM RSCOE (Private)", minFee: 120000, maxFee: 170000, type: "Private" },
  { name: "AISSMS College (Private)", minFee: 110000, maxFee: 155000, type: "Private" },
  { name: "Sinhgad College (Private)", minFee: 115000, maxFee: 160000, type: "Private" },
]

const mbaColleges = [
  { name: "SIBM Pune (Deemed)", minFee: 800000, maxFee: 1100000, type: "Deemed", years: 2 },
  { name: "SCMHRD Pune (Deemed)", minFee: 600000, maxFee: 800000, type: "Deemed", years: 2 },
  { name: "SCIT Pune (Deemed)", minFee: 700000, maxFee: 900000, type: "Deemed", years: 2 },
  { name: "MIT-SOM Pune (Autonomous)", minFee: 350000, maxFee: 550000, type: "Autonomous", years: 2 },
  { name: "BIMM Pune (Autonomous)", minFee: 250000, maxFee: 375000, type: "Autonomous", years: 2 },
  { name: "Indira Institute (Autonomous)", minFee: 210000, maxFee: 325000, type: "Autonomous", years: 2 },
  { name: "Suryadatta Institute (Private)", minFee: 140000, maxFee: 225000, type: "Private", years: 2 },
  { name: "IIMM Pune (Autonomous)", minFee: 190000, maxFee: 275000, type: "Autonomous", years: 2 },
]

const scholarshipRates: Record<string, number> = {
  general: 0,
  obc: 0.3,
  sc_st: 1.0,
  ebc: 0.5,
}

const categoryLabels: Record<string, string> = {
  general: "General (No concession)",
  obc: "OBC (30% tuition waiver)",
  sc_st: "SC / ST (Full fee waiver)",
  ebc: "EBC / Open Poor (50% waiver)",
}

function fmt(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  return `₹${(n / 1000).toFixed(0)}K`
}

export default function FeesCalculator() {
  const [course, setCourse] = useState<"engineering" | "mba">("engineering")
  const [collegeIdx, setCollegeIdx] = useState(0)
  const [category, setCategory] = useState("general")

  const colleges = course === "engineering" ? engineeringColleges : mbaColleges
  const college = colleges[collegeIdx] ?? colleges[0]
  const years = course === "engineering" ? 4 : (college as typeof mbaColleges[0]).years ?? 2
  const discount = scholarshipRates[category] ?? 0

  const minTotal = college.minFee * years
  const maxTotal = college.maxFee * years
  const minAfter = Math.round(minTotal * (1 - discount))
  const maxAfter = Math.round(maxTotal * (1 - discount))
  const minSaving = minTotal - minAfter
  const maxSaving = maxTotal - maxAfter

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-5">🧮 Calculate Your College Fees</h2>

      {/* Step 1 — Course */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Step 1 — Select Course</p>
        <div className="flex gap-3">
          {(["engineering", "mba"] as const).map((c) => (
            <button
              key={c}
              onClick={() => { setCourse(c); setCollegeIdx(0) }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                course === c
                  ? "bg-[#0A1628] text-white border-[#0A1628]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {c === "engineering" ? "🏛️ Engineering (B.Tech)" : "🎓 MBA / PGDM"}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 — College */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Step 2 — Select College</p>
        <select
          value={collegeIdx}
          onChange={(e) => setCollegeIdx(Number(e.target.value))}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          {colleges.map((c, i) => (
            <option key={c.name} value={i}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Step 3 — Category */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Step 3 — Select Category</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left transition-colors ${
                category === key
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] rounded-2xl p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-3">📊 Fee Estimate</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-blue-300 mb-1">Annual Fee Range</p>
            <p className="text-lg font-extrabold">{fmt(college.minFee)} – {fmt(college.maxFee)}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-blue-300 mb-1">Total ({years} Years)</p>
            <p className="text-lg font-extrabold">{fmt(minTotal)} – {fmt(maxTotal)}</p>
          </div>
          {discount > 0 && (
            <>
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3">
                <p className="text-xs text-green-300 mb-1">After Scholarship</p>
                <p className="text-lg font-extrabold text-green-300">{fmt(minAfter)} – {fmt(maxAfter)}</p>
              </div>
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3">
                <p className="text-xs text-green-300 mb-1">You Save</p>
                <p className="text-lg font-extrabold text-green-300">{fmt(minSaving)} – {fmt(maxSaving)}</p>
              </div>
            </>
          )}
        </div>
        <p className="text-xs text-blue-300">
          * Estimates based on 2025–26 fee data. Actual fees may vary by branch and year. Apply via MahaDBT for government scholarships.
        </p>
      </div>
    </div>
  )
}
