import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import FeesCalculator from "@/components/tools/FeesCalculator"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Pune College Fees Calculator 2026 | Engineering & MBA Fee Estimator",
  description:
    "Calculate total 4-year engineering or 2-year MBA fees at Pune colleges. Compare COEP (₹80K/yr), VIT Pune, SIBM (₹8L/yr), MIT-SOM. Includes scholarship deductions for SC/ST/OBC/EBC.",
  path: "/pune-college-fees-calculator",
  keywords: [
    "engineering colleges in pune list with fees",
    "mba colleges in pune list with fees",
    "engineering colleges pune fees",
    "mba colleges pune fees",
    "pune engineering colleges list",
    "pune mba colleges list",
    "college fees calculator pune 2026",
  ],
})

const engineeringFees = [
  { name: "COEP Pune", type: "Government", annual: "₹80K–₹1.8L", total4yr: "₹3.2L–₹7.2L", naac: "A+", nirf: "#49" },
  { name: "PICT Pune", type: "Autonomous", annual: "₹1.4L–₹1.9L", total4yr: "₹5.6L–₹7.6L", naac: "A", nirf: "—" },
  { name: "VIT Pune", type: "Autonomous", annual: "₹1.6L–₹2.2L", total4yr: "₹6.4L–₹8.8L", naac: "A+", nirf: "#101" },
  { name: "SIT Pune", type: "Deemed", annual: "₹3.6L–₹4.8L", total4yr: "₹14.4L–₹19.2L", naac: "A+", nirf: "—" },
  { name: "MIT-WPU Pune", type: "Deemed", annual: "₹2L–₹3.8L", total4yr: "₹8L–₹15.2L", naac: "A+", nirf: "—" },
  { name: "Cummins College", type: "Autonomous", annual: "₹1.3L–₹1.75L", total4yr: "₹5.2L–₹7L", naac: "A+", nirf: "—" },
  { name: "JSPM RSCOE", type: "Private", annual: "₹1.2L–₹1.7L", total4yr: "₹4.8L–₹6.8L", naac: "A", nirf: "—" },
  { name: "AISSMS College", type: "Private", annual: "₹1.1L–₹1.55L", total4yr: "₹4.4L–₹6.2L", naac: "A", nirf: "—" },
  { name: "Sinhgad College", type: "Private", annual: "₹1.15L–₹1.6L", total4yr: "₹4.6L–₹6.4L", naac: "A", nirf: "—" },
]

const mbaFees = [
  { name: "SIBM Pune", type: "Deemed", annual: "₹8L–₹11L", total2yr: "₹16L–₹22L", naac: "A+", nirf: "#13" },
  { name: "SCMHRD Pune", type: "Deemed", annual: "₹6L–₹8L", total2yr: "₹12L–₹16L", naac: "A+", nirf: "—" },
  { name: "SCIT Pune", type: "Deemed", annual: "₹7L–₹9L", total2yr: "₹14L–₹18L", naac: "A+", nirf: "—" },
  { name: "MIT-SOM Pune", type: "Autonomous", annual: "₹3.5L–₹5.5L", total2yr: "₹7L–₹11L", naac: "A+", nirf: "—" },
  { name: "BIMM Pune", type: "Autonomous", annual: "₹2.5L–₹3.75L", total2yr: "₹5L–₹7.5L", naac: "A", nirf: "—" },
  { name: "Indira Institute", type: "Autonomous", annual: "₹2.1L–₹3.25L", total2yr: "₹4.2L–₹6.5L", naac: "A", nirf: "—" },
  { name: "Suryadatta Institute", type: "Private", annual: "₹1.4L–₹2.25L", total2yr: "₹2.8L–₹4.5L", naac: "B+", nirf: "—" },
  { name: "IIMM Pune", type: "Autonomous", annual: "₹1.9L–₹2.75L", total2yr: "₹3.8L–₹5.5L", naac: "B++", nirf: "—" },
]

const faqs = [
  {
    question: "What is the total 4-year fee for engineering at COEP Pune?",
    answer: "The total 4-year engineering fee at COEP Pune (College of Engineering Pune) is approximately ₹3.2L–₹7.2L depending on the branch and category. Annual fees range from ₹80,000 to ₹1.8L per year. SC/ST students pay nominal fees. This makes COEP the most affordable top engineering college in Pune.",
  },
  {
    question: "What is the total MBA fee at SIBM Pune?",
    answer: "The total 2-year MBA fee at SIBM Pune (Symbiosis Institute of Business Management) is ₹16L–₹22L for the complete program (2026–27 batch). This includes tuition, hostel, and other charges. With a merit scholarship (top SNAP scorers), you can get ₹1–3L off. SIBM Pune's ROI is strong — average placement is ₹28 LPA.",
  },
  {
    question: "Which is the cheapest engineering college in Pune with good placements?",
    answer: "COEP Pune is the cheapest top engineering college (₹80K–₹1.8L/yr) with excellent placements (₹12 LPA avg). Among private colleges, AISSMS (₹1.1L–₹1.55L/yr) and Sinhgad College (₹1.15L/yr) are affordable with decent placements (₹4.5–5 LPA). Indira College of Engineering (₹95K/yr) is the lowest-fee private college in Pune.",
  },
  {
    question: "Which is the cheapest MBA college in Pune?",
    answer: "Suryadatta Institute of Management is the most affordable MBA college in Pune with fees of ₹2.8L–₹4.5L total. IIMM Pune (₹3.8L–₹5.5L) and Indira Institute of Management (₹4.2L–₹6.5L) are the next most affordable. All three are AICTE-approved with NAAC grading and decent placement records.",
  },
  {
    question: "Can SC/ST students get free engineering education in Pune?",
    answer: "Yes. SC/ST students get full tuition fee waiver at government-aided engineering colleges in Pune under Maharashtra government post-matric scholarship. At COEP (government), fee is essentially zero after scholarship. At private colleges, SC/ST students get substantial waiver via MahaDBT. Apply at mahadbt.maharashtra.gov.in within 3 months of admission.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Tools", url: "/pune-college-fees-calculator" },
  { name: "Fees Calculator", url: "/pune-college-fees-calculator" },
]

export default function PuneCollegeFeesCalculatorPage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <span className="text-white">College Fees Calculator</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Pune College Fees Calculator 2026
            </h1>
            <p className="text-blue-200 text-sm max-w-2xl">
              Estimate your total engineering or MBA college fees in Pune — with scholarship deductions for SC/ST, OBC, and EBC categories. Free, instant, no login required.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Calculator */}
          <FeesCalculator />

          {/* Engineering Fees Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8 mb-6">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Engineering College Fees in Pune 2026 — Complete List</h2>
              <p className="text-xs text-gray-400 mt-0.5">Annual fee + total 4-year fee for B.Tech programs. General category rates.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-center hidden sm:table-cell">NAAC</th>
                    <th className="px-4 py-3 text-right">Annual Fee</th>
                    <th className="px-4 py-3 text-right">4-Year Total</th>
                    <th className="px-4 py-3 text-center hidden md:table-cell">NIRF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {engineeringFees.map((c) => (
                    <tr key={c.name} className="hover:bg-orange-50/20">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        <span className="text-xs text-gray-400">{c.type}</span>
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.naac === "A+" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{c.naac}</span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-gray-700">{c.annual}</td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-orange-700">{c.total4yr}</td>
                      <td className="px-4 py-3 text-center text-xs text-gray-500 hidden md:table-cell">{c.nirf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MBA Fees Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">MBA College Fees in Pune 2026 — Complete List</h2>
              <p className="text-xs text-gray-400 mt-0.5">Annual fee + total 2-year MBA program fee. General category rates.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-center hidden sm:table-cell">NAAC</th>
                    <th className="px-4 py-3 text-right">Annual Fee</th>
                    <th className="px-4 py-3 text-right">2-Year Total</th>
                    <th className="px-4 py-3 text-center hidden md:table-cell">NIRF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mbaFees.map((c) => (
                    <tr key={c.name} className="hover:bg-orange-50/20">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        <span className="text-xs text-gray-400">{c.type}</span>
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.naac === "A+" ? "bg-green-100 text-green-700" : c.naac === "A" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>{c.naac}</span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-gray-700">{c.annual}</td>
                      <td className="px-4 py-3 text-right text-sm font-bold text-orange-700">{c.total2yr}</td>
                      <td className="px-4 py-3 text-center text-xs text-gray-500 hidden md:table-cell">{c.nirf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQs — Pune College Fees 2026</h2>
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
              <p className="font-bold text-lg">Need help with scholarship applications?</p>
              <p className="text-blue-200 text-sm">Our counsellors help you apply for every scholarship you qualify for — free.</p>
            </div>
            <Link href="/counselling" className="flex-shrink-0 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
              Free Scholarship Guidance →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
