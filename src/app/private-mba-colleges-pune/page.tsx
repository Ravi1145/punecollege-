import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle, BookOpen, ExternalLink } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Private MBA Colleges in Pune 2026 | Fees, Placements & Admission",
  description:
    "Top private MBA colleges in Pune 2026. Compare SIBM, MIT-SOM, BIMM, Indira Institute by fees (₹2.8L–₹22L total), SNAP/CAT cutoff, and average placements.",
  path: "/private-mba-colleges-pune",
  keywords: [
    "private mba colleges in pune",
    "top private mba colleges pune",
    "private mba colleges pune admission",
  ],
})

const colleges = [
  {
    rank: 1,
    name: "Symbiosis Institute of Business Management (SIBM)",
    type: "Deemed Private",
    naac: "A+",
    fees: "₹8L–₹11L/yr (₹16L–₹22L total)",
    placement: "₹18.2 LPA avg",
    exam: "SNAP",
    slug: "sibm-symbiosis-institute-of-business-management-pune",
    highlight: "Top MBA in Pune",
  },
  {
    rank: 2,
    name: "Symbiosis Centre for Management & HRD (SCMHRD)",
    type: "Deemed Private",
    naac: "A+",
    fees: "₹7.5L–₹10L/yr",
    placement: "₹17.5 LPA avg",
    exam: "SNAP",
    slug: "scmhrd-symbiosis-centre-management-hrd",
    highlight: "Best for HR & Marketing",
  },
  {
    rank: 3,
    name: "MIT School of Management (MIT-SOM)",
    type: "Autonomous Private",
    naac: "A+",
    fees: "₹3.5L–₹5.5L/yr (₹7L–₹11L total)",
    placement: "₹8.5 LPA avg",
    exam: "CAT / MAT / CMAT",
    slug: "mit-som-mit-school-of-management-pune",
    highlight: "Best Value MBA",
  },
  {
    rank: 4,
    name: "Bharati Vidyapeeth Institute of Management (BIMM)",
    type: "Autonomous Private",
    naac: "A",
    fees: "₹2.5L–₹3.75L/yr (₹5L–₹7.5L total)",
    placement: "₹6.8 LPA avg",
    exam: "CAT / MAT / CMAT",
    slug: "bimm-bharati-vidyapeeth-institute-management-pune",
    highlight: "Affordable PGDM",
  },
  {
    rank: 5,
    name: "Indira Institute of Management (IIMS Pune)",
    type: "Autonomous Private",
    naac: "A",
    fees: "₹2.1L–₹3.25L/yr (₹4.2L–₹6.5L total)",
    placement: "₹5.9 LPA avg",
    exam: "CAT / MAT / CMAT",
    slug: "indira-institute-of-management-pune",
    highlight: "Best Budget MBA",
  },
  {
    rank: 6,
    name: "Symbiosis Centre for Information Technology (SCIT)",
    type: "Deemed Private",
    naac: "A+",
    fees: "₹7L–₹9L/yr",
    placement: "₹14.2 LPA avg",
    exam: "SNAP",
    slug: "siib-symbiosis-institute-of-international-business-pune",
    highlight: "Best for IT Management",
  },
  {
    rank: 7,
    name: "Suryadatta Institute of Management (SIMTC)",
    type: "Autonomous Private",
    naac: "B+",
    fees: "₹1.4L–₹2.25L/yr (₹2.8L–₹4.5L total)",
    placement: "₹4.8 LPA avg",
    exam: "CAT / MAT / CMAT",
    slug: "suryadatta-institute-of-management-pune",
    highlight: "Most Affordable MBA",
  },
]

const faqs = [
  {
    question: "Which is the best private MBA college in Pune?",
    answer:
      "SIBM (Symbiosis Institute of Business Management) is the top-ranked private MBA college in Pune with ₹18.2 LPA average placement and SNAP as the entrance exam. SCMHRD is a close second (₹17.5 LPA avg). For budget-friendly options, MIT-SOM (₹8.5 LPA avg) and BIMM offer excellent value.",
  },
  {
    question: "What is the difference between deemed private MBA colleges and autonomous private MBA colleges in Pune?",
    answer:
      "Deemed private universities (SIBM, SCMHRD, SCIT) conduct their own entrance test (SNAP), award their own degrees, and have UGC autonomy. They charge ₹14L–₹22L total fees. Autonomous private colleges (MIT-SOM, BIMM, Indira) are affiliated to Savitribai Phule Pune University (SPPU), accept CAT/MAT/CMAT scores, and charge ₹4.2L–₹11L total fees.",
  },
  {
    question: "What exam is required for private MBA colleges in Pune?",
    answer:
      "For Symbiosis colleges (SIBM, SCMHRD, SCIT): SNAP (Symbiosis National Aptitude Test) is mandatory. For MIT-SOM, BIMM, Indira, Suryadatta: CAT, MAT, CMAT, or XAT scores are accepted. SNAP is held in December every year. CMAT is conducted by NTA in January.",
  },
  {
    question: "What is the total MBA fee at private colleges in Pune?",
    answer:
      "Total 2-year MBA fees at private Pune colleges: SIBM (₹16L–₹22L), SCMHRD (₹15L–₹20L), MIT-SOM (₹7L–₹11L), BIMM (₹5L–₹7.5L), Indira Institute (₹4.2L–₹6.5L), Suryadatta (₹2.8L–₹4.5L). Hostel and living expenses add ₹1.5L–₹3L/year extra.",
  },
  {
    question: "What SNAP score is needed for SIBM Pune?",
    answer:
      "SIBM Pune typically requires a SNAP score of 95+ percentile for shortlisting for GE-PIWAT (Group Exercise, Personal Interview, Written Ability Test). The final selection depends on SNAP score (50%), academic record (25%), work experience (5%), and GE-PIWAT performance (20%).",
  },
  {
    question: "Is private MBA better than government MBA college in Pune?",
    answer:
      "For top private deemed colleges like SIBM and SCMHRD, placements (₹17–18 LPA avg) significantly surpass most government MBA programs. However, PUMBA (Government College of Pune) offers excellent MBA at very low fees. For students who clear SNAP, private deemed Symbiosis colleges are clearly superior in placements and industry exposure.",
  },
  {
    question: "Can I get admission in private MBA college in Pune without CAT?",
    answer:
      "Yes. Most autonomous private MBA colleges (MIT-SOM, BIMM, Indira, Suryadatta) accept MAT, CMAT, MH-CET MBA, and XAT scores as alternatives to CAT. SNAP is only for Symbiosis group colleges. Many private colleges also conduct their own entrance tests for direct admission.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "MBA Colleges Pune", url: "/mba-colleges-pune" },
  { name: "Private MBA Colleges Pune", url: "/private-mba-colleges-pune" },
]

export default function PrivateMBACollegesPunePage() {
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
              <Link href="/mba-colleges-pune" className="hover:text-white">MBA Colleges Pune</Link>
              <span>›</span>
              <span className="text-white">Private MBA Colleges</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Private MBA Colleges in Pune 2026
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Complete guide to top private MBA colleges in Pune — deemed universities and autonomous colleges. Compare fees (₹2.8L–₹22L total), SNAP/CAT/CMAT cutoffs, average placements, and admission process for 2026.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                Top private MBA colleges in Pune: <strong>SIBM</strong> (₹18.2 LPA avg, SNAP required), <strong>SCMHRD</strong> (₹17.5 LPA avg), <strong>MIT-SOM</strong> (₹8.5 LPA avg, CAT/CMAT), <strong>BIMM</strong> (₹6.8 LPA avg), <strong>Indira Institute</strong> (₹5.9 LPA avg). Deemed private (SIBM, SCMHRD): use <strong>SNAP</strong>. Autonomous private (MIT-SOM, BIMM): use <strong>CAT/MAT/CMAT</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Private MBA Colleges", value: "50+", icon: "🏛️" },
              { label: "Lowest Total Fees", value: "₹2.8L", icon: "💰" },
              { label: "Highest Avg Package", value: "₹18.2 LPA", icon: "📈" },
              { label: "Top Entrance Exam", value: "SNAP / CAT", icon: "📝" },
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
              <h2 className="text-lg font-bold text-gray-900">Private MBA Colleges Comparison 2026</h2>
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
                    <th className="px-3 sm:px-4 py-3 text-left hidden md:table-cell">Fees</th>
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
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.naac === "A+" ? "bg-green-100 text-green-700" : c.naac === "A" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {c.naac}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-left text-xs text-gray-700 hidden md:table-cell">{c.fees}</td>
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

          {/* Types: Deemed vs Autonomous */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Deemed Private vs Autonomous Private MBA Colleges in Pune</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-xl border border-purple-200 p-4">
                <h3 className="font-bold text-gray-900 mb-1">Deemed Private (Symbiosis Group)</h3>
                <p className="text-xs text-gray-500 mb-2">SIBM, SCMHRD, SCIT</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p><strong>Entrance:</strong> SNAP (December, 60 mins)</p>
                  <p><strong>Total Fees:</strong> ₹14L–₹22L (2 years)</p>
                  <p><strong>Avg Package:</strong> ₹14–18 LPA</p>
                  <p className="text-green-700"><strong>Best for:</strong> Premium MBA, national recognition, top FMCG/Finance/Consulting recruiters</p>
                  <p className="text-red-700"><strong>Challenge:</strong> SNAP 95+ percentile needed, very competitive</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
                <h3 className="font-bold text-gray-900 mb-1">Autonomous Private MBA Colleges</h3>
                <p className="text-xs text-gray-500 mb-2">MIT-SOM, BIMM, Indira, Suryadatta</p>
                <div className="space-y-1 text-xs text-gray-700">
                  <p><strong>Entrance:</strong> CAT / MAT / CMAT / XAT / MH-CET</p>
                  <p><strong>Total Fees:</strong> ₹2.8L–₹11L (2 years)</p>
                  <p><strong>Avg Package:</strong> ₹5–8.5 LPA</p>
                  <p className="text-green-700"><strong>Best for:</strong> Affordable MBA, flexible exam acceptance, good ROI</p>
                  <p className="text-red-700"><strong>Challenge:</strong> Lower brand value vs Symbiosis for premium recruiters</p>
                </div>
              </div>
            </div>
          </div>

          {/* Admission Process */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> MBA Admission Process — Private Colleges in Pune
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">For Symbiosis Colleges (SIBM, SCMHRD, SCIT)</h3>
                <ol className="space-y-2">
                  {[
                    "Register for SNAP (Symbiosis National Aptitude Test) — December",
                    "Separately register for each Symbiosis institute of choice",
                    "Clear SNAP cutoff (95+ percentile for SIBM)",
                    "Attend GE-PIWAT (Group Exercise, PI, WAT) — Jan–Feb",
                    "Accept admission offer, pay acceptance fee",
                    "Complete document verification and fee payment",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">For Autonomous MBA Colleges (MIT-SOM, BIMM, Indira)</h3>
                <ol className="space-y-2">
                  {[
                    "Appear for CAT / MAT / CMAT / MH-CET MBA",
                    "Apply online to individual college with score",
                    "Clear shortlisting cutoff (varies 60–80 percentile)",
                    "Group Discussion + Personal Interview",
                    "Merit-based final admission offer",
                    "Pay fees and complete admission within deadline",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <div className="mt-3 bg-green-50 rounded-xl border border-green-200 p-3">
                  <ul className="text-xs text-green-700 space-y-1">
                    <li className="flex items-start gap-1"><CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" /> Work experience (1–3 years) improves selection chances</li>
                    <li className="flex items-start gap-1"><CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" /> Many colleges offer merit scholarships of 10–50%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — Private MBA Colleges in Pune</h2>
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
              <p className="font-bold text-lg">Need help choosing the right MBA college?</p>
              <p className="text-blue-200 text-sm">Get free expert counselling for private MBA admissions in Pune.</p>
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
