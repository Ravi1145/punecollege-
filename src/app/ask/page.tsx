"use client"

import { useState } from "react"
import Link from "next/link"
import { HelpCircle, Send, CheckCircle } from "lucide-react"

const STREAMS = ["Engineering", "MBA", "Medical", "Arts & Science", "BCA/BSc IT", "BBA", "Design", "Law", "Pharmacy", "Architecture"]

export default function AskPage() {
  const [form, setForm] = useState({ question: "", stream: "", college: "", phone: "" })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (form.question.trim().length < 20) e.question = "Question must be at least 20 characters"
    if (!form.stream) e.stream = "Select a stream"
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) e.phone = "Enter valid 10-digit number"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      // Submit as a lead with the question as notes
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: form.phone || "0000000000",
          source: "qa_question",
          stream: form.stream,
          notes: `Q: ${form.question} | College: ${form.college || "Not specified"}`,
          utm_source: new URLSearchParams(window.location.search).get("utm_source") || "organic",
        }),
      })
      setSubmitted(true)
    } catch {
      // fail silently
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">Question Submitted!</h2>
          <p className="text-gray-600 text-sm mb-2">Our counsellors and alumni will answer your question shortly.</p>
          {form.phone && form.phone !== "0000000000" && (
            <p className="text-sm text-green-700 font-semibold mb-4">📲 We'll notify you on WhatsApp when answered.</p>
          )}
          <div className="flex flex-col gap-3 mt-6">
            <Link href="/qa" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm transition-colors">
              Browse All Questions
            </Link>
            <Link href="/counselling" className="bg-white border border-gray-200 hover:border-gray-400 text-gray-700 font-semibold py-3 rounded-xl text-sm transition-colors">
              Book 1-on-1 Counselling (Free)
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav className="text-xs text-blue-300 mb-4 flex gap-1 items-center">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/qa" className="hover:text-white">Q&A</Link>
            <span>›</span>
            <span className="text-white">Ask a Question</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Ask a Pune College Question
          </h1>
          <p className="text-gray-300">Get answers from CollegePune counsellors and Pune college alumni. 100% free.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Question */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Your Question <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    placeholder="e.g. What is the MHT-CET cutoff for COEP CSE branch in 2026? What documents are needed for COEP hostel?"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 resize-none"
                  />
                  {errors.question && <p className="text-xs text-red-500 mt-1">{errors.question}</p>}
                  <p className="text-xs text-gray-400 mt-1">{form.question.length}/500 characters</p>
                </div>

                {/* Stream */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Stream <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {STREAMS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, stream: s })}
                        className={`text-xs px-3 py-2 rounded-xl border transition-all text-left ${
                          form.stream === s
                            ? "bg-orange-500 border-orange-500 text-white font-semibold"
                            : "border-gray-200 text-gray-700 hover:border-orange-300"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {errors.stream && <p className="text-xs text-red-500 mt-1">{errors.stream}</p>}
                </div>

                {/* College (optional) */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    College <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.college}
                    onChange={(e) => setForm({ ...form, college: e.target.value })}
                    placeholder="e.g. COEP, SIBM Pune, AFMC"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* Phone (optional for notification) */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Mobile Number <span className="text-gray-400 font-normal">(optional — to get notified on WhatsApp)</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                    maxLength={10}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Submitting…" : "Submit Question"}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <div className="flex items-start gap-2 mb-2">
                <HelpCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <h3 className="font-bold text-gray-900 text-sm">Tips for better answers</h3>
              </div>
              <ul className="text-xs text-gray-600 space-y-1.5">
                <li>• Be specific — mention the exam, score, and year</li>
                <li>• Include your category (Open/OBC/SC/ST)</li>
                <li>• Ask one question at a time</li>
                <li>• Add your mobile to get WhatsApp notification</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4">
              <h3 className="font-bold text-gray-900 text-sm mb-3">Popular Questions</h3>
              <div className="space-y-2">
                {[
                  "COEP MHT-CET cutoff 2026?",
                  "SIBM SNAP cutoff 2026?",
                  "AFMC NEET eligibility?",
                  "Direct admission engineering Pune?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setForm({ ...form, question: q })}
                    className="block w-full text-left text-xs text-orange-600 hover:text-orange-700 py-1 border-b border-gray-50 last:border-0"
                  >
                    → {q}
                  </button>
                ))}
              </div>
            </div>

            <Link href="/qa" className="block bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
              <p className="text-sm font-bold text-gray-900 mb-1">Browse Answered Questions</p>
              <p className="text-xs text-gray-500">See what others have asked →</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
