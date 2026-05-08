import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "MBA Admission in Pune Without CAT 2026 | MAT, CMAT, SNAP Colleges",
  description:
    "Get MBA admission in Pune without CAT 2026. Colleges accepting MAT, CMAT, SNAP, XAT, ATMA. MIT-SOM, BIMM, Indira Institute, IIMM — no CAT required. Full list with fees & cutoffs.",
  path: "/mba-admission-pune-without-cat",
  keywords: [
    "mba admission without cat pune",
    "admission without entrance exam pune mba",
    "mba admission pune without cat",
    "mba colleges pune mat score",
    "mba colleges pune cmat",
    "mba without cat maharashtra",
    "direct mba admission pune",
  ],
})

const examColleges = [
  {
    exam: "MAT (Management Aptitude Test)",
    frequency: "5 times a year (Feb, May, Jun, Sep, Dec)",
    difficulty: "Easy–Moderate",
    colleges: [
      { name: "MIT School of Management (MIT-SOM)", fees: "₹7L–₹11L", cutoff: "500+ score (650 = good)" },
      { name: "BIMM Pune", fees: "₹5L–₹7.5L", cutoff: "450+ score" },
      { name: "Indira Institute of Management", fees: "₹4.2L–₹6.5L", cutoff: "400+ score" },
      { name: "Suryadatta Institute of Management", fees: "₹2.8L–₹4.5L", cutoff: "400+ score" },
      { name: "IIMM Pune", fees: "₹3.8L–₹5.5L", cutoff: "450+ score" },
    ],
  },
  {
    exam: "CMAT (Common Management Admission Test)",
    frequency: "Once a year (January)",
    difficulty: "Moderate",
    colleges: [
      { name: "MIT School of Management (MIT-SOM)", fees: "₹7L–₹11L", cutoff: "200+ out of 400" },
      { name: "BIMM Pune", fees: "₹5L–₹7.5L", cutoff: "180+ score" },
      { name: "Indira Institute of Management", fees: "₹4.2L–₹6.5L", cutoff: "160+ score" },
      { name: "Suryadatta Institute", fees: "₹2.8L–₹4.5L", cutoff: "150+ score" },
      { name: "BATU (Bharati Vidyapeeth)", fees: "₹4L–₹6.8L", cutoff: "180+ score" },
    ],
  },
  {
    exam: "SNAP (Symbiosis National Aptitude Test)",
    frequency: "3 times a year (December)",
    difficulty: "Moderate–Hard",
    colleges: [
      { name: "SIBM Pune", fees: "₹16L–₹22L", cutoff: "60+ percentile" },
      { name: "SCMHRD Pune", fees: "₹12L–₹16L", cutoff: "55+ percentile" },
      { name: "SCIT Pune", fees: "₹14L–₹18L", cutoff: "50+ percentile" },
    ],
  },
]

const difficultyComparison = [
  { exam: "CAT", difficulty: "Very Hard", attempts: "Once/year (Nov)", score: "Percentile (99+ for IIM)", puneMBA: "Accepted but not required" },
  { exam: "SNAP", difficulty: "Moderate", attempts: "3 times (Dec)", score: "Percentile (60+ for SIBM)", puneMBA: "Mandatory for Symbiosis only" },
  { exam: "XAT", difficulty: "Hard", attempts: "Once/year (Jan)", score: "Percentile (90+ for XLRI)", puneMBA: "Accepted at select colleges" },
  { exam: "CMAT", difficulty: "Moderate", attempts: "Once/year (Jan)", score: "Score out of 400", puneMBA: "Accepted at 5+ Pune colleges" },
  { exam: "MAT", difficulty: "Easy–Moderate", attempts: "5 times/year", score: "Score (500+ good)", puneMBA: "Accepted at 7+ Pune colleges" },
  { exam: "ATMA", difficulty: "Easy", attempts: "Multiple times", score: "Score (600+ good)", puneMBA: "Accepted at some Pune colleges" },
]

const faqs = [
  {
    question: "Which MBA colleges in Pune don't require CAT?",
    answer: "Most Pune MBA colleges don't require CAT. Colleges accepting alternatives: MIT-SOM (MAT/CMAT/CAT), BIMM (MAT/CMAT/XAT), Indira Institute of Management (MAT/CMAT), IIMM Pune (MAT/CMAT/CAT), Suryadatta Institute (MAT/CMAT/XAT), Bharati Vidyapeeth (BVP-CET/MAT). Only Symbiosis colleges (SIBM, SCMHRD, SCIT) mandate SNAP — not CAT.",
  },
  {
    question: "Is MAT easier than CAT for MBA admission in Pune?",
    answer: "Yes, MAT is significantly easier than CAT. MAT is conducted 5 times a year (online + offline), has lower difficulty, and is accepted by 7+ Pune MBA colleges. CAT is conducted once yearly in November and is much harder — but CAT is also accepted at most Pune colleges (it's not mandatory, just one of many accepted exams).",
  },
  {
    question: "Can I get MBA admission in Pune without any entrance exam?",
    answer: "Yes — through management quota / direct admission. Private MBA colleges like MIT-SOM, BIMM, Indira Institute, and Suryadatta offer direct admission in the management quota. No entrance exam is required — only a graduation degree is needed. Management quota fees are typically 20–30% higher than regular fees.",
  },
  {
    question: "What is the CMAT cutoff for MIT-SOM Pune?",
    answer: "The expected CMAT cutoff for MIT-SOM Pune (MIT School of Management) is 200+ out of 400 for the general category. For MBA Finance and Marketing specializations, the cutoff can be 220+. CMAT is conducted once a year in January by the National Testing Agency (NTA). Applications open October–December.",
  },
  {
    question: "Does SIBM Pune accept CAT score instead of SNAP?",
    answer: "No — SIBM Pune (Symbiosis Institute of Business Management) is a Symbiosis institute and mandatorily requires SNAP score. CAT score alone is NOT accepted for SIBM admission. You must appear for SNAP 2026 (December 6, 13, 20) and score 60+ percentile to be eligible for SIBM Pune's selection process (WAT + PI).",
  },
  {
    question: "Which is the best MBA college in Pune that accepts MAT?",
    answer: "MIT School of Management (MIT-SOM) Pune is the best MBA college accepting MAT, with NAAC A+ grade, ₹12 LPA average placement, and fees of ₹7–11L total. BIMM Pune is the best budget option accepting MAT (₹5–7.5L, ₹8.5 LPA avg). Both accept MAT, CMAT, and CAT — giving you multiple chances to qualify.",
  },
  {
    question: "Can I get MBA admission in Pune after scoring 50 percentile in MAT?",
    answer: "Yes. Colleges accepting 50 percentile in MAT include Indira Institute of Management (₹4.2–6.5L), Suryadatta Institute (₹2.8–4.5L), and IIMM Pune (₹3.8–5.5L). These colleges are AICTE-approved with decent placements (₹5–7 LPA). With 50 percentile MAT, focus on these colleges and also explore direct/management quota options.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "MBA Colleges Pune", url: "/mba-colleges-pune" },
  { name: "MBA Without CAT", url: "/mba-admission-pune-without-cat" },
]

export default function MBAAdmissionWithoutCATPage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-[#F8FAFC] min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <Link href="/mba-colleges-pune" className="hover:text-white">MBA Colleges Pune</Link>
              <span>›</span>
              <span className="text-white">MBA Without CAT</span>
            </nav>
            <div className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-3">✅ CAT NOT Required at Most Pune MBA Colleges</div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              MBA Admission in Pune Without CAT 2026
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Get MBA admission at top Pune colleges using MAT, CMAT, SNAP, or direct management quota — CAT is optional. Complete list of colleges, cutoffs, and fees.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>CAT is NOT compulsory for MBA in Pune.</strong> Most colleges — MIT-SOM, BIMM, Indira Institute, IIMM, Suryadatta — accept <strong>MAT</strong> (5 times/year, easy), <strong>CMAT</strong> (January), or <strong>direct admission</strong>. Only Symbiosis institutes (SIBM, SCMHRD, SCIT) require <strong>SNAP</strong> — not CAT. The easiest path: MAT score + direct apply to MIT-SOM or BIMM.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Lead CTA */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="font-bold text-gray-900 text-sm">Not sure which exam to take for MBA in Pune?</p>
              <p className="text-xs text-gray-500">Get free personalised guidance from our MBA counsellors.</p>
            </div>
            <Link href="/counselling" className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
              Get Free Guidance →
            </Link>
          </div>

          {/* Exam Difficulty Comparison */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">MBA Entrance Exam Comparison — Easiest to Hardest</h2>
              <p className="text-xs text-gray-400 mt-0.5">All these exams are accepted by Pune MBA colleges. CAT is hardest; MAT/ATMA are easiest.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Exam</th>
                    <th className="px-4 py-3 text-center">Difficulty</th>
                    <th className="px-4 py-3 text-center hidden sm:table-cell">Frequency</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Pune Relevance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {difficultyComparison.map((e) => (
                    <tr key={e.exam} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{e.exam}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          e.difficulty.includes("Very Hard") ? "bg-red-100 text-red-700" :
                          e.difficulty.includes("Hard") ? "bg-orange-100 text-orange-700" :
                          e.difficulty.includes("Moderate") ? "bg-yellow-100 text-yellow-700" :
                          "bg-green-100 text-green-700"
                        }`}>
                          {e.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-xs text-gray-500 hidden sm:table-cell">{e.attempts}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 hidden md:table-cell">{e.puneMBA}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Colleges by Exam */}
          <h2 className="text-xl font-bold text-gray-900 mb-5">Pune MBA Colleges by Entrance Exam (Without CAT)</h2>
          <div className="space-y-6 mb-8">
            {examColleges.map((section) => (
              <div key={section.exam} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-bold text-gray-900">{section.exam}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Frequency: {section.frequency} · Difficulty: {section.difficulty}</p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-4 py-2 text-left text-xs text-gray-500 font-semibold">College</th>
                      <th className="px-4 py-2 text-right text-xs text-gray-500 font-semibold">Total Fees</th>
                      <th className="px-4 py-2 text-right text-xs text-gray-500 font-semibold hidden sm:table-cell">Cutoff</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {section.colleges.map((c) => (
                      <tr key={c.name} className="hover:bg-orange-50/20">
                        <td className="px-4 py-2.5 font-medium text-gray-900">{c.name}</td>
                        <td className="px-4 py-2.5 text-right text-xs text-orange-700 font-semibold">{c.fees}</td>
                        <td className="px-4 py-2.5 text-right text-xs text-gray-500 hidden sm:table-cell">{c.cutoff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          {/* Direct Admission Box */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 sm:p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">🎯 MBA Without Any Entrance Exam — Direct / Management Quota</h2>
            <p className="text-sm text-gray-600 mb-4">
              If you don&apos;t want to appear for any exam — MAT, CMAT, or CAT — you can still get MBA admission in Pune through the <strong>management quota / direct admission</strong> route.
            </p>
            <ul className="space-y-1.5 mb-4">
              {[
                "Only graduation degree required (any stream, 50%+ marks)",
                "No entrance exam score needed",
                "Colleges: MIT-SOM, BIMM, Indira Institute, Suryadatta, IIMM",
                "Fees 20–30% higher than merit quota",
                "AICTE-approved, legally valid MBA degree",
                "Contact colleges directly — admissions open till September 2026",
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
            <Link href="/counselling" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
              Get Direct Admission Guidance →
            </Link>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQs — MBA Admission in Pune Without CAT</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <p className="font-bold text-lg">Need MBA admission guidance for Pune?</p>
              <p className="text-blue-200 text-sm">Our counsellors help you choose the right exam and college — for free.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/counselling" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                Free MBA Counselling →
              </Link>
              <Link href="/mba-colleges-pune" className="flex items-center justify-center gap-2 bg-white text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors">
                View MBA Colleges →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
