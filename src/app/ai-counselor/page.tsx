import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"
import AICounselorClient from "@/components/ai/AICounselorClient"
import Link from "next/link"

export const metadata: Metadata = genMeta({
  title: "AI Career Counselor for Pune Colleges 2026 — Free Instant Advice",
  description: "Chat with Aarav, our AI career counselor, for free instant advice on Pune colleges, courses, entrance exams, career paths, and scholarships. Powered by Claude AI.",
  path: "/ai-counselor",
  keywords: [
    "ai career counselor pune",
    "free college counselling pune 2026",
    "which college should i join pune",
    "career guidance pune students",
    "pune college admission help 2026",
    "best college for engineering pune",
    "mba college pune counselling",
  ],
})

export const revalidate = 3600

const STARTER_QUESTIONS = [
  "I scored 85 percentile in MHT-CET. Which engineering colleges in Pune can I get?",
  "Should I choose COEP or MIT-WPU for Computer Engineering?",
  "What's the best MBA college in Pune under ₹5 LPA fees?",
  "I want to become a product manager. Which course should I do?",
  "Compare VIT Pune vs PICT for CSE placements",
  "Which Pune college has best placements for mechanical engineering?",
]

export default function AICounselorPage() {
  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1A3A5F] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-blue-300 mb-4 flex gap-1 items-center">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <span className="text-white">AI Career Counselor</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-2xl shrink-0">
              🤖
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Meet Aarav — Your AI Career Counselor
              </h1>
              <p className="text-gray-300 text-sm max-w-2xl">
                Ask anything about Pune colleges, entrance exams, career paths, fees, and placements. Aarav gives you instant, honest answers — free, anytime.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {["100% Free", "Instant Replies", "Pune Specialist", "Powered by Claude AI"].map(tag => (
                  <span key={tag} className="text-xs bg-white/10 text-white px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Starter questions */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Popular questions to start with</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {STARTER_QUESTIONS.map((q) => (
              <button key={q}
                className="starter-q text-left text-xs text-gray-700 bg-white border border-gray-100 hover:border-orange-200 hover:bg-orange-50 rounded-xl px-4 py-3 transition-colors font-medium"
                data-question={q}>
                💬 {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat interface */}
        <AICounselorClient starterQuestions={STARTER_QUESTIONS} />

        {/* Trust indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: "🎓", label: "109+ colleges", sub: "in our database" },
            { icon: "💬", label: "Free chat", sub: "no sign-up needed" },
            { icon: "⚡", label: "Instant replies", sub: "powered by Claude AI" },
            { icon: "📍", label: "Pune specialist", sub: "hyper-local data" },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="font-extrabold text-gray-900 text-sm">{item.label}</p>
              <p className="text-xs text-gray-400">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Also try */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-extrabold text-gray-900 mb-3">Also Try These Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: "/scholarships", icon: "🎓", label: "Scholarship Finder", sub: "Find scholarships you qualify for" },
              { href: "/ai-finder", icon: "🤖", label: "AI College Finder", sub: "Get college recommendations" },
              { href: "/career-paths", icon: "🗺️", label: "Career Path Mapper", sub: "Explore career trajectories" },
            ].map(item => (
              <Link key={item.href} href={item.href}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-colors">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-400">{item.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
