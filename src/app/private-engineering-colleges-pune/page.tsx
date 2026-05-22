import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle, BookOpen, ExternalLink, MapPin } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Private Engineering Colleges in Pune 2026 | Fees, Rankings & Admission",
  description:
    "Top private engineering colleges in Pune 2026. Compare VIT Pune, SIT Pune, MIT-WPU, PICT, Cummins by fees (₹1.1L–₹4.8L/yr), NAAC grade, and placements.",
  path: "/private-engineering-colleges-pune",
  keywords: [
    "private engineering colleges in pune",
    "top private engineering colleges pune",
    "private engineering colleges pune admission",
  ],
})

const colleges = [
  {
    rank: 1,
    name: "Pune Institute of Computer Technology (PICT)",
    type: "Autonomous",
    naac: "A",
    fees: "₹1.4L–₹1.9L/yr",
    placement: "₹7.5 LPA avg",
    exam: "MHT-CET / JEE",
    slug: "pict-pune-institute-of-computer-technology",
    highlight: "Best for CS/IT",
  },
  {
    rank: 2,
    name: "Vishwakarma Institute of Technology (VIT Pune)",
    type: "Autonomous",
    naac: "A+",
    fees: "₹1.6L–₹2.2L/yr",
    placement: "₹8.5 LPA avg",
    exam: "MHT-CET / JEE",
    slug: "vit-pune-vishwakarma-institute-of-technology",
    highlight: "NIRF #101",
  },
  {
    rank: 3,
    name: "Symbiosis Institute of Technology (SIT Pune)",
    type: "Deemed",
    naac: "A+",
    fees: "₹3.6L–₹4.8L/yr",
    placement: "₹9.8 LPA avg",
    exam: "SET / JEE",
    slug: "symbiosis-institute-of-technology-pune",
    highlight: "Best Deemed",
  },
  {
    rank: 4,
    name: "MIT World Peace University (MIT-WPU)",
    type: "Deemed",
    naac: "A+",
    fees: "₹2.0L–₹3.8L/yr",
    placement: "₹7.2 LPA avg",
    exam: "MHT-CET / JEE",
    slug: "mit-wpu-mit-world-peace-university",
    highlight: "Best Infrastructure",
  },
  {
    rank: 5,
    name: "Cummins College of Engineering for Women",
    type: "Autonomous",
    naac: "A+",
    fees: "₹1.3L–₹1.75L/yr",
    placement: "₹6.8 LPA avg",
    exam: "MHT-CET / JEE",
    slug: "cummins-college-of-engineering-pune",
    highlight: "Best Women's College",
  },
  {
    rank: 6,
    name: "JSPM Rajarshi Shahu College of Engineering",
    type: "Private",
    naac: "A",
    fees: "₹1.2L–₹1.7L/yr",
    placement: "₹5.2 LPA avg",
    exam: "MHT-CET",
    slug: "jspm-rscoe-rajarshi-shahu-college-of-engineering",
    highlight: "Budget Pick",
  },
  {
    rank: 7,
    name: "AISSMS College of Engineering",
    type: "Private",
    naac: "A",
    fees: "₹1.1L–₹1.55L/yr",
    placement: "₹4.8 LPA avg",
    exam: "MHT-CET",
    slug: "aissms-college-of-engineering-pune",
    highlight: "Affordable & Reliable",
  },
]

const faqs = [
  {
    question: "Which is the best private engineering college in Pune?",
    answer:
      "PICT (Pune Institute of Computer Technology) is considered the best private autonomous engineering college in Pune for CS/IT. VIT Pune is best overall among autonomous private colleges. SIT Pune (Symbiosis) leads among deemed private universities with ₹9.8 LPA average placement.",
  },
  {
    question: "What is the difference between private autonomous, deemed, and government engineering colleges in Pune?",
    answer:
      "Government colleges (like COEP) are funded and run by the state government with lowest fees (₹80K–₹1.8L/yr). Autonomous private colleges (PICT, VIT Pune, Cummins) are affiliated to SPPU but set their own curriculum — fees ₹1.2L–₹2.2L/yr. Deemed universities (SIT Pune, MIT-WPU) are self-governing with UGC approval — fees ₹2L–₹4.8L/yr and own entrance exams.",
  },
  {
    question: "What is the admission process for private engineering colleges in Pune?",
    answer:
      "For most private autonomous colleges (PICT, VIT Pune, JSPM), admission is through MHT-CET CAP (Centralized Admission Process) for 80% seats and management quota (direct admission) for 20% seats. Deemed universities like SIT Pune conduct their own entrance test (SET) and JEE Main. CAP rounds happen in July–August.",
  },
  {
    question: "What percentage is required for direct admission in private engineering colleges in Pune?",
    answer:
      "For management quota (direct admission) in private engineering colleges in Pune, you need at least 60% in PCM in HSC (Class 12). Top colleges like VIT Pune and PICT require 70–75% for management quota. Fees under management quota can be 10–20% higher than CAP quota fees.",
  },
  {
    question: "Are private engineering colleges in Pune worth it?",
    answer:
      "Yes, top private engineering colleges like PICT and VIT Pune offer excellent placements (₹7.5–₹8.5 LPA average) and strong industry connections. The fee investment of ₹1.4L–₹2.2L/year is recovered within 1–2 years of employment. NAAC A+ colleges (VIT Pune, MIT-WPU, Cummins) also have strong national recognition.",
  },
  {
    question: "What is the fee range for private engineering colleges in Pune?",
    answer:
      "Private engineering college fees in Pune range from ₹1.1L/year (AISSMS — most affordable) to ₹4.8L/year (SIT Pune — deemed university). Autonomous private colleges charge ₹1.2L–₹2.2L/year. Deemed universities charge ₹2L–₹4.8L/year. SC/ST students are eligible for Maharashtra government scholarships and fee concessions.",
  },
  {
    question: "Which private engineering college in Pune has the best placements?",
    answer:
      "SIT Pune (Symbiosis) leads with ₹9.8 LPA average and ₹42 LPA highest package. VIT Pune comes second with ₹8.5 LPA average. PICT has the highest placement rate for CS/IT branches. Top recruiters include TCS, Infosys, Wipro, Bajaj Auto, Siemens, and international tech companies.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Engineering Colleges Pune", url: "/engineering-colleges-pune" },
  { name: "Private Engineering Colleges Pune", url: "/private-engineering-colleges-pune" },
]

export default function PrivateEngineeringCollegesPunePage() {
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
              <Link href="/engineering-colleges-pune" className="hover:text-white">Engineering Colleges Pune</Link>
              <span>›</span>
              <span className="text-white">Private Engineering Colleges</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Private Engineering Colleges in Pune 2026
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Complete guide to top private engineering colleges in Pune — autonomous, private aided, and deemed universities. Compare fees (₹1.1L–₹4.8L/yr), NAAC grades, placements, and admission process for 2026.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                The best private engineering colleges in Pune are <strong>PICT</strong> (CS/IT specialist, ₹7.5 LPA avg), <strong>VIT Pune</strong> (NAAC A+, NIRF #101, ₹8.5 LPA avg), <strong>SIT Pune</strong> (best deemed, ₹9.8 LPA avg), and <strong>MIT-WPU</strong> (excellent infrastructure, ₹7.2 LPA avg). Admission is via <strong>MHT-CET CAP</strong> for most colleges or <strong>SET/JEE</strong> for deemed universities.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Private Eng. Colleges", value: "70+", icon: "🏛️" },
              { label: "Lowest Fees/yr", value: "₹1.1L", icon: "💰" },
              { label: "Highest Avg Package", value: "₹9.8 LPA", icon: "📈" },
              { label: "Top NAAC Grade", value: "A+", icon: "🏆" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-lg font-extrabold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Private Engineering Colleges Comparison 2026</h2>
              <p className="text-xs text-gray-400 mt-0.5">Ranked by placements, NAAC grade, fees. Data verified 2026.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-3 sm:px-4 py-3 text-left w-8">#</th>
                    <th className="px-3 sm:px-4 py-3 text-left">College</th>
                    <th className="px-3 sm:px-4 py-3 text-center hidden sm:table-cell">Type</th>
                    <th className="px-3 sm:px-4 py-3 text-center hidden sm:table-cell">NAAC</th>
                    <th className="px-3 sm:px-4 py-3 text-right hidden md:table-cell">Fees/Year</th>
                    <th className="px-3 sm:px-4 py-3 text-right hidden lg:table-cell">Avg Placement</th>
                    <th className="px-3 sm:px-4 py-3 text-center hidden sm:table-cell">Exam</th>
                    <th className="px-3 sm:px-4 py-3 text-center">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {colleges.map((c) => (
                    <tr key={c.rank} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-3 sm:px-4 py-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${c.rank <= 3 ? "bg-orange-100 text-orange-700" : "bg-gray-50 text-gray-500"}`}>
                          {c.rank}
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3">
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        <span className="text-xs bg-blue-50 text-blue-700 px-1.5 rounded-full">{c.highlight}</span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-center text-xs text-gray-600 hidden sm:table-cell">{c.type}</td>
                      <td className="px-3 sm:px-4 py-3 text-center hidden sm:table-cell">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.naac === "A+" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                          {c.naac}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-right text-xs text-gray-700 hidden md:table-cell">{c.fees}</td>
                      <td className="px-3 sm:px-4 py-3 text-right text-xs font-semibold text-green-700 hidden lg:table-cell">{c.placement}</td>
                      <td className="px-3 sm:px-4 py-3 text-center text-xs text-gray-500 hidden sm:table-cell">{c.exam}</td>
                      <td className="px-3 sm:px-4 py-3 text-center">
                        <Link href={`/colleges/${c.slug}`} className="inline-flex items-center gap-1 text-xs bg-orange-500 hover:bg-orange-600 text-white px-2.5 py-1.5 rounded-lg">
                          View <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Types of Colleges */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Government vs Autonomous vs Deemed vs Private — What&apos;s the Difference?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  type: "Government",
                  example: "COEP, PCCOE (Govt. Aided)",
                  fees: "₹80K–₹1.8L/yr",
                  admission: "MHT-CET CAP (mandatory)",
                  pros: "Lowest fees, NIRF ranked, strong alumni",
                  cons: "Very high cutoffs (95+ percentile for COEP CS)",
                  color: "bg-green-50 border-green-200",
                },
                {
                  type: "Autonomous Private",
                  example: "PICT, VIT Pune, Cummins",
                  fees: "₹1.2L–₹2.2L/yr",
                  admission: "MHT-CET CAP + management quota",
                  pros: "Own curriculum, industry-focused, good placements",
                  cons: "Slightly higher fees than government",
                  color: "bg-blue-50 border-blue-200",
                },
                {
                  type: "Deemed University",
                  example: "SIT Pune, MIT-WPU, BVU",
                  fees: "₹2L–₹4.8L/yr",
                  admission: "Own entrance test (SET/JEE) + direct",
                  pros: "Own degree, international tie-ups, best infrastructure",
                  cons: "Highest fees, no CAP round for most seats",
                  color: "bg-purple-50 border-purple-200",
                },
                {
                  type: "Private Affiliated",
                  example: "JSPM, AISSMS, Sinhgad",
                  fees: "₹1.1L–₹1.7L/yr",
                  admission: "MHT-CET CAP + management quota",
                  pros: "Affordable fees, accessible cutoffs",
                  cons: "SPPU syllabus, lower average placements",
                  color: "bg-orange-50 border-orange-200",
                },
              ].map((item) => (
                <div key={item.type} className={`rounded-xl border p-4 ${item.color}`}>
                  <h3 className="font-bold text-gray-900 mb-1">{item.type}</h3>
                  <p className="text-xs text-gray-500 mb-2">Examples: {item.example}</p>
                  <div className="space-y-1 text-xs text-gray-700">
                    <p><strong>Fees:</strong> {item.fees}</p>
                    <p><strong>Admission:</strong> {item.admission}</p>
                    <p className="text-green-700"><strong>Pros:</strong> {item.pros}</p>
                    <p className="text-red-700"><strong>Cons:</strong> {item.cons}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admission Process */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> Admission Process for Private Engineering Colleges in Pune
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">CAP Quota (80% seats)</h3>
                <ol className="space-y-2">
                  {[
                    "Appear for MHT-CET (April–May) or JEE Main",
                    "Register on MHT-CET CAP portal after results (June)",
                    "Fill college & branch preferences for CAP Round 1",
                    "Accept allotment and pay seat booking fee (₹1,000)",
                    "Attend document verification at Facilitation Centre",
                    "Report to college, pay fees, complete admission",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Direct / Management Quota (20% seats)</h3>
                <ol className="space-y-2">
                  {[
                    "Contact college management office directly",
                    "Submit application with 12th marksheet",
                    "Attend counselling/merit-based selection",
                    "Pay management quota fee (10–20% higher)",
                    "Complete documentation and admission formalities",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <div className="mt-4 bg-yellow-50 rounded-xl border border-yellow-200 p-3">
                  <p className="text-xs text-yellow-800 font-semibold mb-1">Note for Deemed Universities (SIT Pune, MIT-WPU):</p>
                  <ul className="text-xs text-yellow-700 space-y-1">
                    <li className="flex items-start gap-1"><CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" /> Admission via own entrance test (SET for SIT, MHT-CET/JEE for MIT-WPU)</li>
                    <li className="flex items-start gap-1"><CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" /> Apply directly on college/university website</li>
                    <li className="flex items-start gap-1"><CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" /> CAP process does not apply to most deemed university seats</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — Private Engineering Colleges in Pune</h2>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Engineering Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
              { label: "Best Engineering Colleges in Pune 2026", href: "/engineering-colleges-pune", icon: "🏛️" },
              { label: "Top 10 Engineering Colleges — Ranked", href: "/top-10-engineering-colleges-in-pune", icon: "🏆" },
              { label: "Placement Stats — Avg & Highest LPA", href: "/engineering-colleges-pune-placement", icon: "💼" },
              { label: "Low Fees Engineering Colleges", href: "/low-fees-engineering-colleges-pune", icon: "💰" },
              { label: "Engineering Scholarships in Pune", href: "/engineering-colleges-pune-scholarship", icon: "🎓" },
              { label: "MHT-CET Colleges & Cutoffs 2026", href: "/mht-cet-colleges-pune", icon: "📝" },
              { label: "JEE Main Colleges in Pune", href: "/jee-colleges-pune", icon: "📚" },
              { label: "Computer Engineering Colleges Pune", href: "/computer-engineering-colleges-pune", icon: "💻" },
              { label: "Government Colleges in Pune", href: "/government-colleges-pune", icon: "🏛️" },
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
              <p className="font-bold text-lg">Not sure which private college to choose?</p>
              <p className="text-blue-200 text-sm">Get free expert counselling for private engineering admissions in Pune.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/predictor" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                College Predictor →
              </Link>
              <Link href="/counselling" className="flex items-center justify-center gap-2 bg-white text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors">
                Free Counselling →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
