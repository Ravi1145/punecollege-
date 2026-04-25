"use client"
import { useState } from "react"
import { GraduationCap, Search, ChevronRight, MapPin, TrendingUp, Award, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"
import { colleges } from "@/data/colleges"
import { cn } from "@/lib/utils"

type Exam = "MHT-CET" | "JEE Main" | "JEE Advanced" | "NEET" | "CAT" | "SNAP" | "MAT" | "CMAT"
type Category = "General" | "OBC" | "SC" | "ST"

const EXAM_RANGES: Record<string, { label: string; unit: string; min: number; max: number; streams: string[] }> = {
  "MHT-CET": { label: "MHT-CET Percentile", unit: "percentile", min: 0, max: 100, streams: ["Engineering"] },
  "JEE Main": { label: "JEE Main Percentile", unit: "percentile", min: 0, max: 100, streams: ["Engineering"] },
  "JEE Advanced": { label: "JEE Advanced Rank", unit: "rank", min: 1, max: 50000, streams: ["Engineering"] },
  "NEET": { label: "NEET Score", unit: "score", min: 0, max: 720, streams: ["Medical"] },
  "CAT": { label: "CAT Percentile", unit: "percentile", min: 0, max: 100, streams: ["MBA"] },
  "SNAP": { label: "SNAP Score", unit: "score", min: 0, max: 150, streams: ["MBA"] },
  "MAT": { label: "MAT Score", unit: "score", min: 0, max: 800, streams: ["MBA"] },
  "CMAT": { label: "CMAT Score", unit: "score", min: 0, max: 400, streams: ["MBA"] },
}

// Admission probability logic
function getProbability(college: (typeof colleges)[0], exam: Exam, score: number, category: Category): number {
  const catBonus = category === "SC" || category === "ST" ? 15 : category === "OBC" ? 7 : 0

  if (exam === "MHT-CET" && college.stream === "Engineering") {
    const adjusted = Math.min(score + catBonus * 0.3, 100)
    if (college.type === "Government") return adjusted >= 99.5 ? 85 : adjusted >= 99 ? 65 : adjusted >= 97 ? 40 : adjusted >= 95 ? 20 : 5
    if (college.naac === "A+" || college.naac === "A++") return adjusted >= 97 ? 80 : adjusted >= 95 ? 65 : adjusted >= 90 ? 45 : adjusted >= 85 ? 25 : 10
    return adjusted >= 90 ? 85 : adjusted >= 85 ? 70 : adjusted >= 80 ? 55 : adjusted >= 75 ? 40 : adjusted >= 60 ? 20 : 10
  }
  if (exam === "JEE Main" && college.stream === "Engineering") {
    const adjusted = Math.min(score + catBonus * 0.3, 100)
    if (college.type === "Government") return adjusted >= 99 ? 80 : adjusted >= 97 ? 60 : adjusted >= 95 ? 35 : 10
    return adjusted >= 95 ? 75 : adjusted >= 90 ? 60 : adjusted >= 85 ? 45 : adjusted >= 80 ? 30 : 15
  }
  if (exam === "NEET" && college.stream === "Medical") {
    const catMin = category === "General" ? 550 : category === "OBC" ? 500 : 450
    if (college.type === "Government") return score >= catMin + 40 ? 70 : score >= catMin + 20 ? 45 : score >= catMin ? 25 : 5
    return score >= catMin + 20 ? 75 : score >= catMin ? 55 : score >= catMin - 20 ? 35 : 10
  }
  if ((exam === "CAT" || exam === "SNAP" || exam === "MAT" || exam === "CMAT") && college.stream === "MBA") {
    const percentile = exam === "CAT" ? score : exam === "SNAP" ? (score / 150) * 100 : exam === "MAT" ? (score / 800) * 100 : (score / 400) * 100
    const adjusted = Math.min(percentile + catBonus * 0.5, 100)
    if (college.naac === "A++" || college.naac === "A+") return adjusted >= 90 ? 75 : adjusted >= 80 ? 55 : adjusted >= 70 ? 35 : 15
    return adjusted >= 80 ? 80 : adjusted >= 70 ? 65 : adjusted >= 60 ? 50 : adjusted >= 50 ? 30 : 15
  }
  return 0
}

function getProbabilityLabel(p: number) {
  if (p >= 70) return { label: "High Chance", color: "text-green-700 bg-green-100" }
  if (p >= 40) return { label: "Good Chance", color: "text-blue-700 bg-blue-100" }
  if (p >= 20) return { label: "Moderate", color: "text-yellow-700 bg-yellow-100" }
  return { label: "Low Chance", color: "text-red-700 bg-red-100" }
}

export default function PredictorPage() {
  const [exam, setExam] = useState<Exam>("MHT-CET")
  const [score, setScore] = useState("")
  const [category, setCategory] = useState<Category>("General")
  const [results, setResults] = useState<{ college: (typeof colleges)[0]; probability: number }[] | null>(null)
  const [predicted, setPredicted] = useState(false)

  const examConfig = EXAM_RANGES[exam]

  const handlePredict = () => {
    const numScore = parseFloat(score)
    if (isNaN(numScore)) return
    const eligible = colleges.filter((c) => examConfig.streams.includes(c.stream))
    const scored = eligible
      .map((c) => ({ college: c, probability: getProbability(c, exam, numScore, category) }))
      .filter((r) => r.probability > 0)
      .sort((a, b) => b.probability - a.probability)
    setResults(scored)
    setPredicted(true)
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <GraduationCap className="w-3.5 h-3.5" /> FREE COLLEGE PREDICTOR
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Find Your Best-Fit Colleges
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto text-base">
            Enter your exam score and get a personalised list of Pune colleges with admission probability.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Predictor Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Enter Your Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Exam */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Exam</label>
              <select
                value={exam}
                onChange={(e) => { setExam(e.target.value as Exam); setResults(null); setPredicted(false) }}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-white"
              >
                {Object.keys(EXAM_RANGES).map((e) => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            {/* Score */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                Your {examConfig.unit === "percentile" ? "Percentile" : examConfig.unit === "rank" ? "Rank" : "Score"}
              </label>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder={examConfig.unit === "rank" ? "e.g. 5000" : "e.g. 95.5"}
                min={examConfig.min}
                max={examConfig.max}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400"
              />
            </div>
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-white"
              >
                {(["General", "OBC", "SC", "ST"] as Category[]).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            {/* CTA */}
            <div className="flex items-end">
              <button
                onClick={handlePredict}
                disabled={!score}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Search className="w-4 h-4" /> Predict Colleges
              </button>
            </div>
          </div>

          {/* Score range hint */}
          <p className="text-xs text-gray-400 mt-3">
            Valid range: {examConfig.min} – {examConfig.max} {examConfig.unit} | Covers: {examConfig.streams.join(", ")} stream colleges in Pune
          </p>
        </div>

        {/* Results */}
        {predicted && results !== null && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                {results.length} Colleges Found <span className="text-sm font-normal text-gray-400">for {exam} {examConfig.unit === "rank" ? "Rank" : "Score"} {score} ({category})</span>
              </h2>
              <Link href="/counselling" className="text-xs text-orange-600 font-semibold hover:underline">
                Get expert guidance →
              </Link>
            </div>

            {results.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                <p className="text-gray-500 mb-3">No colleges matched your score. Consider improving your score or exploring other exams.</p>
                <Link href="/ai-finder" className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-bold">
                  <Sparkles className="w-4 h-4" /> Try AI Finder
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map(({ college, probability }) => {
                  const { label, color } = getProbabilityLabel(probability)
                  return (
                    <div key={college.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-orange-200 transition-colors">
                      <div className="w-12 h-12 bg-[#0A1628] rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {college.shortName.slice(0, 3)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-sm">{college.name}</h3>
                          {college.nirfRank && (
                            <span className="text-[11px] bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded-full">
                              NIRF #{college.nirfRank}
                            </span>
                          )}
                          <span className="text-[11px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                            NAAC {college.naac}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{college.location}</span>
                          <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />Avg ₹{(college.avgPlacement / 100000).toFixed(1)}L</span>
                          <span className="flex items-center gap-1"><Award className="w-3 h-3" />{college.type}</span>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end gap-3 sm:gap-2">
                        <div className="text-center">
                          <p className="text-2xl font-extrabold text-gray-900">{probability}%</p>
                          <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full", color)}>{label}</span>
                        </div>
                        <Link
                          href={`/colleges/${college.slug}`}
                          className="flex items-center gap-1 text-xs text-orange-600 font-semibold hover:underline whitespace-nowrap"
                        >
                          View Details <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* CTA banner */}
            <div className="mt-6 bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-white">
                <p className="font-bold">Want personalised guidance?</p>
                <p className="text-blue-200 text-sm">Talk to our expert counsellors — free, 15-min session.</p>
              </div>
              <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm whitespace-nowrap transition-colors">
                Book Free Session →
              </Link>
            </div>
          </div>
        )}
      {/* ── SEO Content Section ── */}
      <div className="bg-white border-t border-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About the Pune College Predictor 2026</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            The CollegePune College Predictor helps students identify which Pune colleges they are eligible for based on their entrance exam performance. Enter your <strong>MHT-CET percentile</strong>, <strong>JEE Main score</strong>, <strong>NEET score</strong>, <strong>CAT percentile</strong>, or <strong>SNAP score</strong> and instantly see admission probabilities for 100+ Pune colleges including COEP, PICT, VIT Pune, SIBM Pune, AFMC, and BJ Medical College.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { title: "MHT-CET 2026", desc: "95+ percentile for COEP. 90–95 for PICT. 75–85 for MIT-WPU. 60–75 for private colleges." },
              { title: "NEET 2026", desc: "650+ for AFMC. 625+ (Open) for BJ Medical College. 500–550 for DY Patil Management quota." },
              { title: "CAT / SNAP 2026", desc: "60+ SNAP percentile for SIBM Pune. 55+ for SCMHRD. CAT 50+ for MIT-SOM and BIMM." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to Use the College Predictor</h2>
          <ol className="space-y-2 text-sm text-gray-600">
            {[
              "Select your entrance exam (MHT-CET, JEE Main, NEET, CAT, or SNAP) from the dropdown.",
              "Enter your score or percentile in the input box.",
              "Select your category (General, OBC, SC, or ST) — reserved categories get cutoff relaxation.",
              "Click Predict — the tool ranks all eligible Pune colleges by your admission probability.",
              "Click View Details on any college to see fees, placements, and admission process.",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-5 h-5 bg-orange-500 text-white rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
      </div>
    </div>
  )
}

