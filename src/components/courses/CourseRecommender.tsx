"use client"

import { useState } from "react"
import Link from "next/link"

interface CourseRec {
  course: string
  duration: string
  level: string
  whyFit: string
  careerOptions: string[]
  entryExams: string[]
  avgSalaryEntry: string
  topPuneColleges: string[]
  matchScore: number
}

interface RecommendResult {
  recommendations: CourseRec[]
  counselorNote: string
}

const INTERESTS = ["Mathematics & Science", "Computers & Coding", "Business & Commerce", "Biology & Life Sciences", "Arts & Humanities", "Design & Creativity", "Law & Justice", "Sports & Fitness"]
const BUDGETS = ["Below ₹1L/year", "₹1L–₹3L/year", "₹3L–₹6L/year", "₹6L–₹10L/year", "Above ₹10L/year"]
const STAGES = ["After Class 12 (Undergraduate)", "After Graduation (Postgraduate)", "After Diploma"]

export default function CourseRecommender() {
  const [step, setStep] = useState<"form" | "loading" | "results">("form")
  const [form, setForm] = useState({ interests: "", skills: "", budget: "", careerGoal: "", afterClass12: "", examScores: "" })
  const [result, setResult] = useState<RecommendResult | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.interests || !form.budget || !form.careerGoal || !form.afterClass12) {
      setError("Please fill all required fields.")
      return
    }
    setError("")
    setStep("loading")

    try {
      const res = await fetch("/api/courses/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
      setStep("results")
    } catch {
      setError("Could not fetch recommendations. Please try again.")
      setStep("form")
    }
  }

  if (step === "loading") {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 animate-pulse">
          <span className="text-3xl">📚</span>
        </div>
        <h3 className="font-extrabold text-gray-900 text-lg mb-2">Analyzing Your Profile…</h3>
        <p className="text-sm text-gray-500">Finding the best course matches from 109+ Pune colleges</p>
      </div>
    )
  }

  if (step === "results" && result) {
    return (
      <div className="space-y-5">
        {/* Counselor note */}
        {result.counselorNote && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3">
            <span className="text-2xl shrink-0">🤖</span>
            <p className="text-sm text-blue-800 leading-relaxed">{result.counselorNote}</p>
          </div>
        )}

        {/* Course recommendations */}
        <div className="space-y-4">
          {result.recommendations.map((rec, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex flex-wrap items-start gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-xl text-sm font-extrabold text-blue-700 shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-extrabold text-gray-900 text-base">{rec.course}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${rec.matchScore >= 85 ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                      {rec.matchScore}% match
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">{rec.level} · {rec.duration}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{rec.whyFit}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Entry Salary</p>
                  <p className="text-green-700 font-semibold">{rec.avgSalaryEntry}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Entry Exams</p>
                  <p className="text-gray-600">{rec.entryExams.join(", ")}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold text-gray-900 mb-1">Career Options</p>
                  <p className="text-gray-600">{rec.careerOptions.join(" · ")}</p>
                </div>
              </div>

              {rec.topPuneColleges?.length > 0 && (
                <div className="bg-orange-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-orange-900 mb-1.5">Top Pune Colleges for this course:</p>
                  <div className="flex flex-wrap gap-2">
                    {rec.topPuneColleges.map(c => (
                      <span key={c} className="text-xs bg-white border border-orange-200 text-orange-800 px-2.5 py-1 rounded-lg font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <button onClick={() => { setStep("form"); setResult(null) }}
            className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl transition-colors">
            ← Try Again
          </button>
          <Link href="/ai-counselor"
            className="text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl transition-colors">
            Chat with AI Counselor
          </Link>
          <Link href="/colleges"
            className="text-xs font-semibold bg-white border border-gray-200 hover:border-orange-300 text-gray-700 px-4 py-2.5 rounded-xl transition-colors">
            Browse Colleges →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">What subjects interest you? *</label>
          <select value={form.interests} onChange={e => setForm(f => ({ ...f, interests: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
            <option value="">Select your interest</option>
            {INTERESTS.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">I am looking for *</label>
          <select value={form.afterClass12} onChange={e => setForm(f => ({ ...f, afterClass12: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
            <option value="">Select stage</option>
            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Annual Fee Budget *</label>
          <select value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
            <option value="">Select budget</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Career Goal *</label>
          <input type="text" placeholder="e.g. Software Engineer, Doctor, Start a business" value={form.careerGoal}
            onChange={e => setForm(f => ({ ...f, careerGoal: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Strengths (optional)</label>
          <input type="text" placeholder="e.g. Good at Maths, Creative, Problem solver" value={form.skills}
            onChange={e => setForm(f => ({ ...f, skills: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Exam Scores (optional)</label>
          <input type="text" placeholder="e.g. JEE 75 percentile, MHT-CET 90%, 12th 85%" value={form.examScores}
            onChange={e => setForm(f => ({ ...f, examScores: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
      </div>

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      <button type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3 px-6 rounded-xl text-sm transition-all shadow-lg shadow-blue-100">
        🎓 Get My Course Recommendations (Free)
      </button>
      <p className="text-center text-xs text-gray-400">AI-powered · 100% free · No sign-up required</p>
    </form>
  )
}
