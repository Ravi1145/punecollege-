"use client"

import { useState } from "react"
import Link from "next/link"

interface ScholarshipMatch {
  id: string
  name: string
  amount: string
  deadline: string
  link: string
  priority: string
  description: string
  matchScore: number
  matchReasons: string[]
  actionItem: string
  urgent: boolean
}

interface FinderResult {
  matches: ScholarshipMatch[]
  summary: string
  totalAmount: string
}

const STREAMS = ["Engineering (B.Tech/BE)", "MBA / PGDM", "Medical (MBBS/BDS)", "Science (BSc)", "Commerce (BCom/BBA)", "Arts (BA)", "Pharmacy (BPharm)", "Law (LLB)", "Design", "BCA / MCA"]
const CATEGORIES = ["General (No caste reservation)", "OBC", "SC (Scheduled Caste)", "ST (Scheduled Tribe)", "EBC (Economically Backward Class)", "NT / VJNT / SBC", "Minority (Muslim/Sikh/Christian/Buddhist/Jain/Parsi)"]
const INCOMES = ["Below ₹2 LPA", "₹2–4.5 LPA", "₹4.5–8 LPA", "Above ₹8 LPA"]

export default function ScholarshipFinder() {
  const [step, setStep] = useState<"form" | "loading" | "results">("form")
  const [form, setForm] = useState({ stream: "", category: "", incomeRange: "", marks: "", yearOfStudy: "", college: "" })
  const [result, setResult] = useState<FinderResult | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.stream || !form.category || !form.incomeRange || !form.marks) {
      setError("Please fill all required fields.")
      return
    }
    setError("")
    setStep("loading")

    try {
      const res = await fetch("/api/scholarships/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data)
      setStep("results")
    } catch {
      setError("Could not fetch results. Please try again.")
      setStep("form")
    }
  }

  if (step === "loading") {
    return (
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-orange-100 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 animate-pulse">
          <span className="text-3xl">🎓</span>
        </div>
        <h3 className="font-extrabold text-gray-900 text-lg mb-2">Finding Your Scholarships…</h3>
        <p className="text-sm text-gray-500">Our AI is matching your profile to 14+ scholarships in our database</p>
      </div>
    )
  }

  if (step === "results" && result) {
    return (
      <div className="space-y-5">
        {/* Summary banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-5 text-white">
          <div className="flex flex-wrap items-start gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-extrabold text-lg mb-1">✅ Found {result.matches.length} Scholarships for You</p>
              <p className="text-sm text-green-100 leading-relaxed">{result.summary}</p>
            </div>
            {result.totalAmount && (
              <div className="shrink-0 bg-white/20 rounded-xl px-4 py-2 text-center">
                <p className="text-xs text-green-100">Total accessible</p>
                <p className="font-extrabold text-base">{result.totalAmount}</p>
              </div>
            )}
          </div>
        </div>

        {/* Scholarship matches */}
        <div className="space-y-4">
          {result.matches.map((s, idx) => (
            <div key={s.id} className={`bg-white rounded-2xl border ${s.urgent ? "border-orange-200" : "border-gray-100"} shadow-sm p-5 hover:shadow-md transition-shadow`}>
              <div className="flex flex-wrap items-start gap-3 mb-3">
                <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-xl text-sm font-extrabold text-orange-700 shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-extrabold text-gray-900 text-sm">{s.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${s.matchScore >= 85 ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                      {s.matchScore}% match
                    </span>
                    {s.urgent && <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-50 text-red-600">Urgent</span>}
                  </div>
                  <p className="text-xs text-gray-500">{s.description}</p>
                </div>
                <a href={s.link} target="_blank" rel="noopener noreferrer"
                  className="shrink-0 text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition-colors">
                  Apply →
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-gray-600 mb-3">
                <div>
                  <span className="font-semibold text-gray-900 block">Amount</span>
                  <span className="text-green-700 font-semibold">{s.amount}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block">Deadline</span>
                  <span className="text-red-600 font-semibold">{s.deadline}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900 block">Priority</span>
                  <span className={s.priority === "High" ? "text-red-600 font-semibold" : "text-gray-600"}>{s.priority}</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-3 space-y-2">
                <div>
                  <p className="text-xs font-semibold text-blue-900 mb-1">Why you qualify:</p>
                  <ul className="space-y-0.5">
                    {s.matchReasons.map((r, i) => (
                      <li key={i} className="text-xs text-blue-700 flex gap-1.5">
                        <span className="text-blue-400">✓</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-blue-100 pt-2">
                  <p className="text-xs font-semibold text-blue-900">Next step:</p>
                  <p className="text-xs text-blue-700">{s.actionItem}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap gap-3">
          <button onClick={() => { setStep("form"); setResult(null) }}
            className="text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl transition-colors">
            ← Try Again
          </button>
          <Link href="/counselling"
            className="text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl transition-colors">
            Get Free Application Help
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Course / Stream *</label>
          <select value={form.stream} onChange={e => setForm(f => ({ ...f, stream: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
            <option value="">Select your stream</option>
            {STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Caste / Category *</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Family Annual Income *</label>
          <select value={form.incomeRange} onChange={e => setForm(f => ({ ...f, incomeRange: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
            <option value="">Select income range</option>
            {INCOMES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Last Exam Marks / Percentile *</label>
          <div className="relative">
            <input type="number" min="0" max="100" placeholder="e.g. 82" value={form.marks}
              onChange={e => setForm(f => ({ ...f, marks: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 pr-8" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">Year of Study</label>
          <select value={form.yearOfStudy} onChange={e => setForm(f => ({ ...f, yearOfStudy: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white">
            <option value="">Select year</option>
            <option value="Seeking Admission (New)">Seeking Admission (New)</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">College Name (optional)</label>
          <input type="text" placeholder="e.g. COEP, MIT-WPU…" value={form.college}
            onChange={e => setForm(f => ({ ...f, college: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
      </div>

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      <button type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold py-3 px-6 rounded-xl text-sm transition-all shadow-lg shadow-orange-100">
        🔍 Find My Scholarships (Free)
      </button>
      <p className="text-center text-xs text-gray-400">AI-powered matching · 100% free · No sign-up required</p>
    </form>
  )
}
