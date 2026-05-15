"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageCircle, ChevronRight, CheckCircle, ThumbsUp, ChevronDown, ChevronUp, Send } from "lucide-react"

// ── Static Q&A data ───────────────────────────────────────────────────────
const QA_DATA = [
  {
    id: 1,
    college: "COEP Pune",
    collegeSlug: "coep-college-of-engineering-pune",
    stream: "Engineering",
    streamColor: "bg-blue-100 text-blue-700",
    alumni: { name: "Rahul Sharma", batch: "2022", avatar: "R", color: "bg-blue-600" },
    question: "Is COEP worth the MHT-CET 97+ percentile cutoff? How are placements really?",
    answer: "Absolutely worth it. The brand value of COEP opens doors instantly — I got shortlisted by Goldman Sachs, Persistent, and KPIT in campus placements. The infrastructure is old but the peer group and faculty quality is exceptional. My package was ₹18 LPA. The 97+ percentile is tough but if you get it, don't think twice.",
    helpful: 142,
    replies: 8,
    verified: true,
  },
  {
    id: 2,
    college: "SIBM Pune",
    collegeSlug: "sibm-symbiosis-institute-business-management-pune",
    stream: "MBA",
    streamColor: "bg-orange-100 text-orange-700",
    alumni: { name: "Priya Mehta", batch: "2023", avatar: "P", color: "bg-orange-500" },
    question: "What SNAP score is actually needed for SIBM Pune? Official cutoff vs real cutoff?",
    answer: "Official cutoff is 98 percentile but realistically 96-97 gets you in for general category if your GE-PI-WAT is strong. I scored 96.4 and cleared all rounds. Focus heavily on the GE (Group Exercise) — most people lose marks there. The ROI is great: I paid ₹20L total, placed at ₹26 LPA. Two years go by very fast.",
    helpful: 98,
    replies: 5,
    verified: true,
  },
  {
    id: 3,
    college: "PICT Pune",
    collegeSlug: "pict-pune-institute-computer-technology",
    stream: "Engineering",
    streamColor: "bg-blue-100 text-blue-700",
    alumni: { name: "Akash Joshi", batch: "2021", avatar: "A", color: "bg-teal-600" },
    question: "PICT vs VIT Pune for CS — which has better placements and campus culture?",
    answer: "PICT wins on placements hands down — especially for CS/IT. The placement cell is more aggressive, companies like Persistent, Infosys, TCS, and Capgemini come every year. The median package is around ₹8-10 LPA. VIT has a bigger campus and more extracurricular opportunities. If you're career-focused, PICT. If you want a holistic college experience, VIT.",
    helpful: 76,
    replies: 12,
    verified: true,
  },
  {
    id: 4,
    college: "BJ Medical College",
    collegeSlug: "bj-medical-college-pune",
    stream: "Medical",
    streamColor: "bg-red-100 text-red-700",
    alumni: { name: "Dr. Sneha Patil", batch: "2020", avatar: "S", color: "bg-rose-500" },
    question: "What NEET score do I need for BJ Medical College Pune in state quota?",
    answer: "For Maharashtra state quota at BJ Medical, you need 625+ NEET score for general category. SC/OBC cutoffs are lower — around 560-580. The fees are ₹60K-1.2L/yr which is very affordable for a government medical college of this quality. The hospital exposure at Sassoon General Hospital is unmatched — I saw over 300 cases in my internship year alone.",
    helpful: 115,
    replies: 6,
    verified: true,
  },
  {
    id: 5,
    college: "MIT-WPU Pune",
    collegeSlug: "mit-world-peace-university-pune",
    stream: "Engineering",
    streamColor: "bg-blue-100 text-blue-700",
    alumni: { name: "Vikram Kulkarni", batch: "2023", avatar: "V", color: "bg-purple-600" },
    question: "Is MIT-WPU worth ₹3-4L/yr fees? How is the actual placement scenario?",
    answer: "The fees are on the higher side but the placement infrastructure has improved a lot. I got placed at ₹12 LPA at a product company. The campus is beautiful, labs are modern, and the startup incubator program is genuinely good. One thing — actively build your skills and network, because MIT-WPU placements are heavily dependent on your own effort compared to COEP or PICT.",
    helpful: 54,
    replies: 3,
    verified: false,
  },
  {
    id: 6,
    college: "Symbiosis Law School",
    collegeSlug: "symbiosis-law-school-pune",
    stream: "Law",
    streamColor: "bg-slate-100 text-slate-700",
    alumni: { name: "Ananya Singh", batch: "2022", avatar: "A", color: "bg-green-600" },
    question: "How is Symbiosis Law School compared to other NLUs? Is SLAT exam tough?",
    answer: "SLS Pune is top-tier for law — NIRF #8 consistently. Not an NLU but the brand is equivalent in corporate law circles. SLAT is easier than CLAT — focus on English and Legal Reasoning sections. The faculty includes practicing advocates which gives real-world perspective. I'm currently at a Tier-1 law firm with ₹15 LPA package.",
    helpful: 67,
    replies: 4,
    verified: true,
  },
]

// ── Collapsed answer helper ───────────────────────────────────────────────
const ANSWER_LIMIT = 140

function QACard({ qa }: { qa: typeof QA_DATA[0] }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = qa.answer.length > ANSWER_LIMIT
  const displayAnswer = expanded || !isLong ? qa.answer : qa.answer.slice(0, ANSWER_LIMIT) + "…"

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-4 flex flex-col gap-3">

      {/* Alumni header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className={`${qa.alumni.color} w-9 h-9 rounded-full flex items-center justify-center text-white font-extrabold text-sm shrink-0`}>
            {qa.alumni.avatar}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-gray-900">{qa.alumni.name}</span>
              {qa.verified && (
                <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              )}
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Alumni · {qa.college} · Batch {qa.alumni.batch}
            </p>
          </div>
        </div>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${qa.streamColor}`}>
          {qa.stream}
        </span>
      </div>

      {/* Question */}
      <div className="bg-surface rounded-xl px-3 py-2.5">
        <p className="text-xs font-semibold text-gray-800 leading-snug">
          <span className="text-accent mr-1 font-black">Q.</span>{qa.question}
        </p>
      </div>

      {/* Answer */}
      <div>
        <p className="text-xs text-gray-600 leading-relaxed">
          <span className="font-bold" style={{ color: "var(--color-navy)" }}>A. </span>
          {displayAnswer}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(v => !v)}
            className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-accent hover:opacity-80 transition-opacity"
          >
            {expanded ? <><ChevronUp className="w-3 h-3" /> Show less</> : <><ChevronDown className="w-3 h-3" /> Read full answer</>}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-accent transition-colors">
            <ThumbsUp className="w-3 h-3" />
            <span>{qa.helpful} helpful</span>
          </button>
          <Link
            href={`/qa?college=${qa.collegeSlug}`}
            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-accent transition-colors"
          >
            <MessageCircle className="w-3 h-3" />
            <span>{qa.replies} replies</span>
          </Link>
        </div>
        <Link
          href={`/colleges/${qa.collegeSlug}#alumni`}
          className="text-[10px] font-semibold text-accent hover:opacity-80 transition-opacity flex items-center gap-0.5"
        >
          View college <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}

// ── Ask a Question CTA card ───────────────────────────────────────────────
function AskCard() {
  const [question, setQuestion] = useState("")
  const [college, setCollege] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || !college.trim()) return
    setSent(true)
  }

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2 h-full">
        <CheckCircle className="w-8 h-8 text-green-600" />
        <p className="text-sm font-bold text-green-800">Question submitted!</p>
        <p className="text-xs text-green-600">Alumni will answer within 24–48 hours.</p>
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-4 h-full"
      style={{ background: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)" }}
    >
      <div>
        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-3">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-bold text-white">247 alumni answering</span>
        </div>
        <h3 className="text-lg font-extrabold text-white leading-tight">
          Have a question?<br />Ask a real alumni.
        </h3>
        <p className="text-xs text-white/60 mt-1.5">
          Get honest answers about placements, hostel, faculty, fees, and campus life — from people who actually studied there.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 flex-1">
        <input
          type="text"
          value={college}
          onChange={e => setCollege(e.target.value)}
          placeholder="Which college? (e.g. COEP, SIBM…)"
          className="w-full px-3 py-2.5 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-white"
        />
        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Your question for alumni…"
          rows={3}
          className="w-full px-3 py-2.5 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none bg-white resize-none"
        />
        <button
          type="submit"
          className="mt-auto flex items-center justify-center gap-2 w-full bg-accent hover:opacity-90 text-white font-bold text-sm py-2.5 rounded-xl transition-opacity"
        >
          <Send className="w-3.5 h-3.5" />
          Ask Alumni
        </button>
      </form>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────
export default function AlumniQASection() {
  const [activeFilter, setActiveFilter] = useState("All")
  const filters = ["All", "Engineering", "MBA", "Medical", "Law"]

  const filtered = activeFilter === "All"
    ? QA_DATA
    : QA_DATA.filter(q => q.stream === activeFilter)

  return (
    <section className="py-10 bg-surface border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #0A1628, #1E3A5F)" }}
            >
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">
                Alumni Q&amp;A
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Real answers from Pune college alumni</p>
            </div>
          </div>
          <Link
            href="/qa"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-accent hover:opacity-80 transition-opacity"
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Stream filter pills */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150"
              style={activeFilter === f
                ? { backgroundColor: "var(--color-accent)", borderColor: "var(--color-accent)", color: "#fff" }
                : { backgroundColor: "#fff", borderColor: "#e5e7eb", color: "#6b7280" }
              }
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid: Q&A cards + Ask card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.slice(0, 5).map(qa => (
            <QACard key={qa.id} qa={qa} />
          ))}
          {/* Ask card always last */}
          <AskCard />
        </div>

        {/* Mobile view-all */}
        <div className="mt-4 sm:hidden text-center">
          <Link href="/qa" className="text-xs font-semibold text-accent">
            View all Q&amp;As →
          </Link>
        </div>

      </div>
    </section>
  )
}
