import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { cutoffsData, examLabels, streamLabels } from "@/data/cutoffs"

export const metadata: Metadata = genMeta({
  title: "Pune College Cutoffs 2026 | MHT-CET, JEE, NEET, SNAP | CollegePune",
  description: "Year-wise cutoffs 2020–2026 for top Pune colleges. MHT-CET, JEE Main, NEET, SNAP, CAT cutoffs for COEP, PICT, SIBM, AFMC, BJ Medical. Check your admission chances free.",
  path: "/cutoffs",
  keywords: [
    "mht-cet cutoff 2026 pune colleges",
    "jee main cutoff pune 2026",
    "neet cutoff pune colleges 2026",
    "coep cutoff 2026",
    "sibm snap cutoff 2026",
    "afmc neet cutoff 2026",
    "pune college admission cutoff",
    "engineering college cutoff pune",
    "mba college cutoff pune",
    "medical college cutoff pune",
  ],
})

const exams = [
  { key: "mht-cet", label: "MHT-CET", desc: "State-level CET for Engineering — most Pune colleges", icon: "⚙️", stream: "Engineering" },
  { key: "jee",     label: "JEE Main", desc: "National entrance for COEP, SIT, MIT-WPU (state quota)", icon: "🔬", stream: "Engineering" },
  { key: "neet",    label: "NEET UG",  desc: "For MBBS/BDS — AFMC, BJ Medical, DY Patil Medical", icon: "🏥", stream: "Medical" },
  { key: "snap",    label: "SNAP",     desc: "Symbiosis entrance — SIBM, SCMHRD, SIIB, SIMS", icon: "💼", stream: "MBA" },
  { key: "cat",     label: "CAT",      desc: "Top MBA colleges — IIM Pune, SIBM, SCMHRD (CAT route)", icon: "📊", stream: "MBA" },
]

const faqs = [
  {
    question: "What is the MHT-CET cutoff for COEP Pune in 2026?",
    answer: "COEP MHT-CET cutoff 2026 (estimated): Open — 99.8 percentile, OBC — 98.7 percentile, SC — 95.5 percentile, ST — 93.0 percentile. COEP consistently has the highest MHT-CET cutoff among Pune engineering colleges. Apply early for CAP registration.",
  },
  {
    question: "Can I get admission in Pune engineering college with 90 percentile MHT-CET?",
    answer: "With 90 percentile MHT-CET, you can get: VIT Pune (CSE/IT — 2nd round), MIT-WPU (most branches), SIT Pune (Civil, Mechanical), JSPM Narhe (CSE/IT), Sinhgad Institute of Technology. COEP (97+) and PICT (97+) are out of range. Use CollegePune's College Predictor for a personalized list.",
  },
  {
    question: "What NEET score is needed for AFMC Pune?",
    answer: "AFMC Pune requires 665+ NEET score in 2026 (Open category estimate). AFMC also conducts its own entrance + SSB interview. Free education + ₹21,000/month stipend makes it extremely competitive. BJ Medical College Pune requires 625+ marks.",
  },
  {
    question: "What is SNAP cutoff for SIBM Pune MBA 2026?",
    answer: "SIBM Pune SNAP 2026 cutoff is approximately 99+ percentile (Open category). SNAP score + GDPI (Group Discussion + Personal Interview) determines final admission. Fees: ₹16–22L for 2-year MBA. Average placement: ₹28 LPA.",
  },
  {
    question: "Are 2026 cutoffs available or just estimates?",
    answer: "MHT-CET 2026 results will be declared in May–June 2026. Official cutoffs from CET Cell will follow in July during CAP rounds. The 2026 figures shown here are trend-based estimates from 2020–2025 official data. Actual cutoffs may vary ±0.5–2 percentile points. Always verify with the official MHT-CET website.",
  },
]

export default function CutoffsPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Cutoffs", url: "/cutoffs" },
  ])
  const faqSchema = generateFAQSchema(faqs)

  // Group cutoffs by exam
  const byExam: Record<string, typeof cutoffsData> = {}
  for (const c of cutoffsData) {
    if (!byExam[c.exam]) byExam[c.exam] = []
    byExam[c.exam].push(c)
  }

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#0D3B2E] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-blue-300 mb-4 flex gap-1 items-center">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <span className="text-white">Cutoffs 2026</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Pune College Cutoffs 2026
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mb-5">
              Year-wise cutoffs (2020–2026) for MHT-CET, JEE, NEET, SNAP & CAT at top Pune colleges. Check your admission chances across all categories.
            </p>
            <div className="flex flex-wrap gap-3">
              {["MHT-CET", "JEE Main", "NEET", "SNAP", "CAT"].map((e) => (
                <span key={e} className="bg-white/10 text-white text-xs px-3 py-1 rounded-full font-medium">{e}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

          {/* Exam cards */}
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 mb-5">Browse by Entrance Exam</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {exams.map((exam) => {
                const count = (byExam[exam.key] || []).length
                return (
                  <div key={exam.key} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{exam.icon}</span>
                      <div>
                        <h3 className="font-extrabold text-gray-900 text-base">{exam.label}</h3>
                        <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{exam.stream}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{exam.desc}</p>
                    <div className="space-y-1">
                      {(byExam[exam.key] || []).slice(0, 4).map((c) => (
                        <Link
                          key={c.college_slug}
                          href={`/cutoffs/${exam.key}/${c.college_slug}`}
                          className="flex items-center justify-between text-xs text-gray-700 hover:text-orange-600 py-1 border-b border-gray-50 last:border-0"
                        >
                          <span className="font-medium">{c.college_short}</span>
                          <span className="text-gray-400">
                            Open: {c.cutoffs[c.cutoffs.length - 1].open}
                            {c.unit !== "rank" ? (c.unit === "score" ? " marks" : " %ile") : " rank"}
                          </span>
                        </Link>
                      ))}
                    </div>
                    {count > 0 && (
                      <p className="text-xs text-orange-600 font-semibold mt-2">{count} college{count > 1 ? "s" : ""} with data →</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* All cutoff pages grid */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">All Cutoff Pages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cutoffsData.map((c) => {
                const latest = c.cutoffs[c.cutoffs.length - 1]
                return (
                  <Link
                    key={`${c.exam}-${c.college_slug}`}
                    href={`/cutoffs/${c.exam}/${c.college_slug}`}
                    className="bg-white rounded-xl border border-gray-100 p-3.5 hover:shadow-md hover:border-orange-200 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-gray-900 text-sm">{c.college_short}</span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold">
                        {examLabels[c.exam] ?? c.exam.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 mb-2 truncate">{c.college_name}</p>
                    <div className="flex gap-2 text-[11px]">
                      <span className="text-blue-700 font-semibold">Open: {latest.open}</span>
                      <span className="text-orange-700">OBC: {latest.obc}</span>
                      <span className="text-green-700">SC: {latest.sc}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">Frequently Asked Questions — Pune College Cutoffs 2026</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 group">
                  <summary className="font-semibold text-gray-900 text-sm cursor-pointer list-none flex items-center justify-between gap-2">
                    {faq.question}
                    <span className="text-orange-500 text-lg group-open:rotate-45 transition-transform shrink-0">+</span>
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-6 text-center">
            <h2 className="text-xl font-extrabold text-white mb-2">Know Your Exact Chances in 30 Seconds</h2>
            <p className="text-gray-300 text-sm mb-4">Enter your score and get a personalized college shortlist based on 2026 cutoffs.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/predictor" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
                🎯 Try College Predictor
              </Link>
              <Link href="/counselling" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors border border-white/20">
                Book Free Counselling
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
