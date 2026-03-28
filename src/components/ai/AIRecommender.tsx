"use client"
import { useState } from "react"
import { Sparkles, Loader2, TrendingUp, IndianRupee, MapPin, ChevronRight, Brain } from "lucide-react"
import Link from "next/link"
import { cn, formatCurrency } from "@/lib/utils"
import { RecommendedCollege } from "@/types"

const STREAMS = ["Engineering (B.Tech/BE)", "MBA/Management", "Medical (MBBS)", "Commerce/BBA", "Arts/Humanities", "Computer Applications (BCA)"]
const EXAM_TYPES = ["MHT-CET", "JEE Main/Advanced", "NEET", "CAT", "SNAP", "MAT/CMAT", "Class 12 Merit"]

interface FormData {
  stream: string
  budget: number
  careerGoal: string
  examType: string
  examScore: string
  preferences: string[]
}

interface AIResult {
  colleges: RecommendedCollege[]
  reasoning: string
}

const PREFERENCES = ["Hostel", "Government College", "Strong Placements", "Research Focus", "Low Fees", "Near City"]

export default function AIRecommender() {
  const [form, setForm] = useState<FormData>({
    stream: "",
    budget: 200000,
    careerGoal: "",
    examType: "",
    examScore: "",
    preferences: [],
  })
  const [result, setResult] = useState<AIResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)

  const togglePref = (pref: string) => {
    setForm((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter((p) => p !== pref)
        : [...prev.preferences, pref],
    }))
  }

  const handleSubmit = async () => {
    if (!form.stream || !form.examType) {
      setError("Please select stream and exam type")
      return
    }
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/ai-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stream: form.stream,
          budget: form.budget.toString(),
          careerGoal: form.careerGoal,
          examType: form.examType,
          examScore: form.examScore,
          preferences: form.preferences,
        }),
      })
      if (!res.ok) throw new Error("API error")
      const data = await res.json()
      setResult(data)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] rounded-3xl p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 text-sm font-medium px-4 py-2 rounded-full mb-4">
            <Brain className="w-4 h-4" />
            AI-Powered Recommendations
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Find Your Perfect College in Pune</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Tell us about your preferences and let our AI analyze 25+ Pune colleges to find your best match
          </p>
        </div>

        {!result ? (
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 lg:p-8 space-y-6">
            {/* Stream */}
            <div>
              <label className="text-white font-semibold text-sm mb-3 block">
                What do you want to study? *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {STREAMS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm((p) => ({ ...p, stream: s }))}
                    className={cn(
                      "text-sm px-3 py-2.5 rounded-xl border transition-all text-left",
                      form.stream === s
                        ? "bg-orange-500 border-orange-500 text-white font-medium"
                        : "border-white/20 text-gray-300 hover:border-orange-400 hover:text-white"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="text-white font-semibold text-sm mb-3 block">
                Annual Budget: <span className="text-orange-400">₹{(form.budget / 100000).toFixed(1)}L/yr</span>
              </label>
              <input
                type="range"
                min={0}
                max={2500000}
                step={50000}
                value={form.budget}
                onChange={(e) => setForm((p) => ({ ...p, budget: Number(e.target.value) }))}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Free / Scholarship</span>
                <span>₹25L/yr</span>
              </div>
            </div>

            {/* Exam Type & Score */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white font-semibold text-sm mb-2 block">Entrance Exam *</label>
                <select
                  value={form.examType}
                  onChange={(e) => setForm((p) => ({ ...p, examType: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400"
                >
                  <option value="" className="text-gray-900">Select exam</option>
                  {EXAM_TYPES.map((e) => (
                    <option key={e} value={e} className="text-gray-900">{e}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white font-semibold text-sm mb-2 block">Score / Percentile</label>
                <input
                  type="text"
                  placeholder="e.g., 85 percentile or 620"
                  value={form.examScore}
                  onChange={(e) => setForm((p) => ({ ...p, examScore: e.target.value }))}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Career Goal */}
            <div>
              <label className="text-white font-semibold text-sm mb-2 block">Career Goal (optional)</label>
              <input
                type="text"
                placeholder="e.g., Software Engineer at Google, Finance Manager, Doctor..."
                value={form.careerGoal}
                onChange={(e) => setForm((p) => ({ ...p, careerGoal: e.target.value }))}
                className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 placeholder-gray-400"
              />
            </div>

            {/* Preferences */}
            <div>
              <label className="text-white font-semibold text-sm mb-3 block">Preferences (optional)</label>
              <div className="flex flex-wrap gap-2">
                {PREFERENCES.map((pref) => (
                  <button
                    key={pref}
                    onClick={() => togglePref(pref)}
                    className={cn(
                      "text-sm px-3 py-1.5 rounded-full border transition-all",
                      form.preferences.includes(pref)
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "border-white/20 text-gray-300 hover:border-orange-400"
                    )}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 text-base transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  AI is analyzing 25+ colleges...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Get AI Recommendations
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Reasoning */}
            <div className="bg-white/10 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">{result.reasoning}</p>
              </div>
            </div>

            {/* College Cards */}
            <div className="space-y-4">
              {result.colleges.map((college, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold bg-orange-500 text-white px-2 py-0.5 rounded-full">
                        #{i + 1} Match
                      </span>
                      <h3 className="text-white font-bold">{college.college}</h3>
                    </div>
                    <span className="text-2xl font-bold text-orange-400">{college.matchScore}%</span>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <IndianRupee className="w-4 h-4 text-gray-400" />
                        <span>Fees: <strong>{college.fees}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        <span>Avg Pkg: <strong>{college.avgPackage}</strong></span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 mb-2">Why this college?</p>
                      <ul className="space-y-1">
                        {college.reasons.map((r, j) => (
                          <li key={j} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-orange-500 mt-0.5">•</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {college.admissionTip && (
                      <div className="bg-orange-50 rounded-xl p-3 mb-4">
                        <p className="text-xs font-semibold text-orange-700 mb-1">Admission Tip</p>
                        <p className="text-xs text-orange-600">{college.admissionTip}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <Link
                        href={`/colleges/${college.slug}`}
                        className="flex-1 bg-[#0A1628] text-white text-sm font-semibold py-2.5 rounded-xl text-center hover:bg-[#1E3A5F] transition-colors"
                      >
                        Know More
                      </Link>
                      <a
                        href="#"
                        className="flex-1 bg-orange-500 text-white text-sm font-semibold py-2.5 rounded-xl text-center hover:bg-orange-600 transition-colors"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setResult(null)}
              className="w-full border border-white/20 text-white py-3 rounded-xl text-sm hover:bg-white/10 transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
