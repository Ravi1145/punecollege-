import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Engineering vs MBA in Pune 2026 | Fees, Salary & Career Comparison",
  description:
    "Should you choose Engineering (B.Tech) or MBA in Pune 2026? Compare fees, starting salary, top colleges, entrance exams, and 10-year career paths. Detailed side-by-side comparison.",
  path: "/pune-colleges-comparison-engineering-mba",
  keywords: [
    "engineering colleges comparison pune",
    "mba colleges comparison pune",
    "pune colleges ranking engineering mba",
    "engineering colleges pune fees",
    "mba colleges pune fees",
    "engineering vs mba pune",
    "btech or mba which is better pune",
  ],
})

const comparison = [
  { param: "Course Duration", engineering: "4 years (B.Tech / BE)", mba: "2 years (MBA / PGDM)" },
  { param: "Eligibility", engineering: "12th PCM, 45%+ marks", mba: "Graduation (any stream), 50%+" },
  { param: "Entrance Exam", engineering: "MHT-CET / JEE Main", mba: "CAT / MAT / CMAT / SNAP" },
  { param: "Fees Range (Total)", engineering: "₹4L–₹19L (4 years)", mba: "₹3L–₹22L (2 years)" },
  { param: "Avg Starting Salary (Pune)", engineering: "₹4–12 LPA", mba: "₹6–28 LPA" },
  { param: "Highest Package (Pune)", engineering: "₹40–45 LPA (top college)", mba: "₹55–65 LPA (SIBM Pune)" },
  { param: "Top Entrance Exam Difficulty", engineering: "JEE Advanced (hardest), MHT-CET (moderate)", mba: "CAT (hard), SNAP (moderate), MAT (easy)" },
  { param: "Return on Investment", engineering: "Best at govt. colleges (COEP ₹5L fee → ₹12 LPA avg)", mba: "Best at Indira Institute (₹5L fee → ₹7 LPA avg)" },
  { param: "Job Market in Pune", engineering: "Excellent — IT, auto, manufacturing", mba: "Excellent — BFSI, consulting, FMCG" },
  { param: "Further Study Options", engineering: "M.Tech, MBA, MS abroad", mba: "CFA, CA, PhD, Executive MBA" },
]

const topEngineeringColleges = [
  { rank: 1, name: "COEP Pune", fees: "₹80K–₹1.8L/yr", placement: "₹12 LPA avg", exam: "MHT-CET 95+ %ile" },
  { rank: 2, name: "PICT Pune", fees: "₹1.4L–₹1.9L/yr", placement: "₹7.5 LPA avg", exam: "MHT-CET 92–95 %ile" },
  { rank: 3, name: "VIT Pune", fees: "₹1.6L–₹2.2L/yr", placement: "₹8.5 LPA avg", exam: "MHT-CET 88–92 %ile" },
  { rank: 4, name: "SIT Pune", fees: "₹3.6L–₹4.8L/yr", placement: "₹9.8 LPA avg", exam: "SET / JEE" },
  { rank: 5, name: "MIT-WPU Pune", fees: "₹2L–₹3.8L/yr", placement: "₹7.2 LPA avg", exam: "MHT-CET 75–85 %ile" },
]

const topMBAColleges = [
  { rank: 1, name: "SIBM Pune", fees: "₹16L–₹22L total", placement: "₹28 LPA avg", exam: "SNAP 60+ %ile" },
  { rank: 2, name: "SCMHRD Pune", fees: "₹12L–₹16L total", placement: "₹22 LPA avg", exam: "SNAP 55+ %ile" },
  { rank: 3, name: "SCIT Pune", fees: "₹14L–₹18L total", placement: "₹18 LPA avg", exam: "SNAP 50+ %ile" },
  { rank: 4, name: "MIT-SOM Pune", fees: "₹7L–₹11L total", placement: "₹12 LPA avg", exam: "CAT / MAT / CMAT" },
  { rank: 5, name: "BIMM Pune", fees: "₹5L–₹7.5L total", placement: "₹8.5 LPA avg", exam: "CAT / MAT / CMAT" },
]

const faqs = [
  {
    question: "Is B.Tech or MBA better in Pune in 2026?",
    answer: "It depends on your background and goals. If you're in 12th grade, B.Tech at COEP or PICT is an excellent choice — low fees (₹4–8L total), great Pune IT/manufacturing placements. If you already have a degree and want to fast-track to management roles, MBA at SIBM Pune (₹28 LPA avg) or MIT-SOM (₹12 LPA avg, better ROI) is the better path. Engineering gives more career flexibility; MBA gives faster salary jumps.",
  },
  {
    question: "Can I do MBA after B.Tech in Pune?",
    answer: "Absolutely — this is one of the most common career paths in Pune. B.Tech + MBA is highly valued by Pune companies (TCS, Infosys, Wipro, Bajaj, L&T, consulting firms). After 0–2 years of work experience, top choices are SIBM Pune (SNAP), MIT-SOM Pune (MAT/CMAT), and SCMHRD Pune (SNAP). Many tech engineers from Pune use MBA to transition into product management, consulting, or finance.",
  },
  {
    question: "Which has a better return on investment — Engineering or MBA in Pune?",
    answer: "Government engineering colleges offer the best ROI: COEP total fee ₹4–7L → ₹12 LPA average placement = break-even in 6 months. For MBA, Indira Institute of Management (₹4.2–6.5L total, ₹7.2 LPA avg) offers the best ROI. SIBM Pune (₹22L fees, ₹28 LPA avg) has good ROI but takes longer to break even. Avoid deemed private engineering colleges with ₹16–20L total fees and only ₹5–7 LPA placements.",
  },
  {
    question: "What are the fees for engineering vs MBA in Pune?",
    answer: "Engineering (4 years): Government (COEP) — ₹4–7L total. Autonomous (PICT, VIT Pune) — ₹6–9L total. Deemed (SIT Pune) — ₹14–19L total. MBA (2 years): Budget (Suryadatta, Indira) — ₹3–6.5L total. Mid-range (MIT-SOM, BIMM) — ₹5–11L total. Premium (SIBM, SCMHRD) — ₹12–22L total. Engineering has lower cost for equivalent quality institutions.",
  },
  {
    question: "Which entrance exam is harder — MHT-CET or CAT?",
    answer: "CAT is significantly harder than MHT-CET. CAT tests advanced quantitative aptitude, verbal reasoning, and data interpretation at a high level — 99+ percentile needed for IIMs. MHT-CET tests 11th–12th PCM syllabus and is considered moderate difficulty. For Pune college admissions, MHT-CET (for engineering) is more commonly cleared than CAT. However, MAT and CMAT (for MBA) are easier than both.",
  },
  {
    question: "Which Pune stream has better placement — Engineering or MBA?",
    answer: "MBA colleges in Pune have higher absolute placement packages (SIBM at ₹28 LPA avg), but engineering colleges have broader employment (more graduates placed overall). For the best engineering placement in Pune: COEP (₹12 LPA avg), VIT Pune (₹8.5 LPA). For MBA: SIBM Pune (₹28 LPA), SCMHRD (₹22 LPA). Top MBA salaries are higher, but you need a prior degree + MBA exam to qualify.",
  },
  {
    question: "Is Pune good for both engineering and MBA students?",
    answer: "Yes — Pune is Maharashtra's education and industrial capital, making it ideal for both streams. For engineering students: Pune has 300+ manufacturing companies (Bajaj, Tata Motors, Mercedes-Benz), 150+ IT firms, and strong campus recruitment. For MBA students: Pune has BFSI companies (HDFC, ICICI, Citi), consulting offices (McKinsey, BCG, Deloitte), FMCG firms (P&G, HUL, Marico), and a thriving startup ecosystem.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "Engineering vs MBA Pune", url: "/pune-colleges-comparison-engineering-mba" },
]

export default function PuneCollegesComparisonPage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link>
              <span>›</span>
              <span className="text-white">Engineering vs MBA Pune</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Engineering vs MBA in Pune 2026 — Fees, Rankings & Career Comparison
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Side-by-side comparison of engineering (B.Tech) and MBA colleges in Pune — fees, entrance exams, average salaries, top recruiters, and career paths. Make the right choice for 2026.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Choose Engineering</strong> if you&apos;re in 12th grade with PCM — COEP (₹5L fees, ₹12 LPA avg) gives best value. <strong>Choose MBA</strong> if you have a degree and want fast management growth — SIBM Pune (₹28 LPA avg) or MIT-SOM (₹12 LPA avg, better ROI). <strong>Best path</strong>: B.Tech at COEP/PICT → 2 years work → MBA at SIBM/MIT-SOM = maximum long-term salary.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Main Comparison Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Engineering vs MBA — Complete Comparison 2026</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left bg-gray-50 text-gray-600 font-semibold">Parameter</th>
                    <th className="px-4 py-3 text-center bg-blue-600 text-white font-bold">Engineering (B.Tech)</th>
                    <th className="px-4 py-3 text-center bg-orange-500 text-white font-bold">MBA / PGDM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {comparison.map((row) => (
                    <tr key={row.param} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-700 text-sm">{row.param}</td>
                      <td className="px-4 py-3 text-center text-sm text-blue-800 bg-blue-50/30">{row.engineering}</td>
                      <td className="px-4 py-3 text-center text-sm text-orange-800 bg-orange-50/30">{row.mba}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Side-by-Side Colleges */}
          <h2 className="text-xl font-bold text-gray-900 mb-5">Top 5 Engineering vs Top 5 MBA Colleges in Pune</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Engineering */}
            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-blue-600 text-white">
                <h3 className="font-bold text-sm">🏛️ Top Engineering Colleges Pune 2026</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {topEngineeringColleges.map((c) => (
                  <div key={c.name} className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{c.rank}</span>
                      <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 ml-7 text-xs text-gray-500">
                      <span>Fees: <span className="text-blue-700 font-medium">{c.fees}</span></span>
                      <span>Avg: <span className="text-green-700 font-medium">{c.placement}</span></span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 bg-gray-50">
                <Link href="/engineering-colleges-pune" className="text-xs text-blue-600 font-semibold hover:underline">View all engineering colleges →</Link>
              </div>
            </div>

            {/* MBA */}
            <div className="bg-white rounded-2xl border border-orange-100 shadow-sm overflow-hidden">
              <div className="px-4 py-3 bg-orange-500 text-white">
                <h3 className="font-bold text-sm">🎓 Top MBA Colleges Pune 2026</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {topMBAColleges.map((c) => (
                  <div key={c.name} className="px-4 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{c.rank}</span>
                      <span className="font-semibold text-gray-900 text-sm">{c.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-0.5 ml-7 text-xs text-gray-500">
                      <span>Fees: <span className="text-orange-700 font-medium">{c.fees}</span></span>
                      <span>Avg: <span className="text-green-700 font-medium">{c.placement}</span></span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 bg-gray-50">
                <Link href="/mba-colleges-pune" className="text-xs text-orange-600 font-semibold hover:underline">View all MBA colleges →</Link>
              </div>
            </div>
          </div>

          {/* Choose If */}
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {[
              {
                title: "Choose Engineering if...",
                color: "blue",
                points: [
                  "You're in 12th grade with PCM",
                  "You want to work in IT, software, automotive, or manufacturing",
                  "You prefer a longer but more stable career path",
                  "You want low fees — government colleges like COEP cost only ₹4–7L total",
                  "You're interested in core technical fields (CS, Mechanical, Electronics)",
                  "You want the option to do MBA later after work experience",
                ],
              },
              {
                title: "Choose MBA if...",
                color: "orange",
                points: [
                  "You already have a graduation degree (any stream)",
                  "You want to move into management, consulting, or finance",
                  "You have strong communication and leadership skills",
                  "You're targeting ₹15–30 LPA within 2 years of graduation",
                  "You're okay with higher fees for faster salary growth",
                  "You have 0–3 years of work experience and want to pivot careers",
                ],
              },
            ].map(({ title, color, points }) => (
              <div key={title} className={`bg-white rounded-2xl border ${color === "blue" ? "border-blue-100" : "border-orange-100"} shadow-sm p-5`}>
                <h3 className={`font-bold text-lg mb-4 ${color === "blue" ? "text-blue-700" : "text-orange-600"}`}>{title}</h3>
                <ul className="space-y-2">
                  {points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${color === "blue" ? "text-blue-500" : "text-orange-500"}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQs — Engineering vs MBA in Pune</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Guides */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Comparison Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
              { label: "NAAC A+ Colleges in Pune", href: "/naac-a-plus-colleges-pune", icon: "⭐" },
              { label: "Low Fee Colleges in Pune", href: "/low-fee-colleges-pune", icon: "💰" },
              { label: "Pune Colleges Fees Guide 2026", href: "/colleges-pune-fees", icon: "📊" },
              { label: "Top Placement Colleges in Pune", href: "/top-placement-colleges-pune", icon: "💼" },
              { label: "College Fees Calculator", href: "/pune-college-fees-calculator", icon: "🧮" },
              { label: "Placement Comparator Tool", href: "/pune-college-placement-comparator", icon: "📈" },
              { label: "Admission Deadline Tracker 2026", href: "/pune-admission-deadline-tracker-2026", icon: "📅" },
              ].map(({ label, href, icon }) => (
                <Link key={href} href={href} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 hover:border-orange-200 hover:shadow transition-all group">
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <p className="font-bold text-lg">Still deciding between Engineering and MBA?</p>
              <p className="text-blue-200 text-sm">Talk to our counsellors — free, personalised advice in 15 minutes.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/counselling" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                Get Free Counselling →
              </Link>
              <Link href="/ai-finder" className="flex items-center justify-center gap-2 bg-white text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors">
                Try AI College Finder →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
