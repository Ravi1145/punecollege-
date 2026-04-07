import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle, TrendingUp, Award, MapPin, ExternalLink, BookOpen, Users } from "lucide-react"

export const metadata: Metadata = genMeta({
  title: "Best Engineering Colleges in Pune 2025 | Fees, Rankings & Placements",
  description: "List of top 12 engineering colleges in Pune 2025 with NIRF ranks, NAAC grades, annual fees (₹80K–₹4.8L), and average placements (₹5–12 LPA). Compare COEP, PICT, VIT Pune, SIT Pune & more.",
  path: "/engineering-colleges-pune",
  keywords: [
    "engineering colleges in pune",
    "best engineering college in pune",
    "top btech colleges pune 2025",
    "engineering college pune fees",
    "COEP pune admission",
    "PICT pune",
    "VIT pune",
    "government engineering college pune",
    "MHT-CET colleges pune",
    "JEE main colleges pune",
    "engineering colleges pune with placement",
    "NAAC A+ engineering colleges pune",
  ],
})

const colleges = [
  { rank: 1, name: "College of Engineering Pune (COEP)", type: "Government", nirf: 49, naac: "A+", fees: "₹80K–₹1.8L/yr", placement: "₹12 LPA avg | ₹45 LPA highest", exam: "MHT-CET / JEE", slug: "coep-college-of-engineering-pune", highlight: "Best Govt. | Lowest Fees" },
  { rank: 2, name: "Pune Institute of Computer Technology (PICT)", type: "Autonomous", nirf: null, naac: "A", fees: "₹1.4L–₹1.9L/yr", placement: "₹7.5 LPA avg | ₹35 LPA highest", exam: "MHT-CET / JEE", slug: "pict-pune-institute-of-computer-technology", highlight: "Best for CS/IT" },
  { rank: 3, name: "Vishwakarma Institute of Technology (VIT Pune)", type: "Autonomous", nirf: 101, naac: "A+", fees: "₹1.6L–₹2.2L/yr", placement: "₹8.5 LPA avg | ₹40 LPA highest", exam: "MHT-CET / JEE", slug: "vit-pune-vishwakarma-institute-of-technology", highlight: "NIRF #101" },
  { rank: 4, name: "Symbiosis Institute of Technology (SIT Pune)", type: "Deemed", nirf: null, naac: "A+", fees: "₹3.6L–₹4.8L/yr", placement: "₹9.8 LPA avg | ₹42 LPA highest", exam: "SET / JEE", slug: "symbiosis-institute-of-technology-pune", highlight: "Best Deemed | Top Recruiters" },
  { rank: 5, name: "MIT World Peace University (MIT-WPU)", type: "Deemed", nirf: null, naac: "A+", fees: "₹2.0L–₹3.8L/yr", placement: "₹7.2 LPA avg | ₹38 LPA highest", exam: "MHT-CET / JEE", slug: "mit-wpu-mit-world-peace-university", highlight: "Best Infrastructure" },
  { rank: 6, name: "Cummins College of Engineering for Women", type: "Autonomous", nirf: null, naac: "A+", fees: "₹1.3L–₹1.75L/yr", placement: "₹6.8 LPA avg | ₹28 LPA highest", exam: "MHT-CET / JEE", slug: "cummins-college-of-engineering-pune", highlight: "Best Women's College" },
  { rank: 7, name: "JSPM Rajarshi Shahu College of Engineering", type: "Private", nirf: null, naac: "A", fees: "₹1.2L–₹1.7L/yr", placement: "₹5.2 LPA avg | ₹22 LPA highest", exam: "MHT-CET", slug: "jspm-rscoe-rajarshi-shahu-college-of-engineering", highlight: "Best Private Budget" },
  { rank: 8, name: "AISSMS College of Engineering", type: "Private", nirf: null, naac: "A", fees: "₹1.1L–₹1.55L/yr", placement: "₹4.8 LPA avg | ₹20 LPA highest", exam: "MHT-CET", slug: "aissms-college-of-engineering-pune", highlight: "Affordable & Reliable" },
  { rank: 9, name: "Sinhgad College of Engineering", type: "Private", nirf: null, naac: "A", fees: "₹1.15L–₹1.6L/yr", placement: "₹4.9 LPA avg | ₹18 LPA highest", exam: "MHT-CET", slug: "sinhgad-college-of-engineering-pune", highlight: "Large Campus" },
  { rank: 10, name: "Bharati Vidyapeeth College of Engineering", type: "Deemed", nirf: null, naac: "A", fees: "₹1.45L–₹1.95L/yr", placement: "₹5.6 LPA avg | ₹22 LPA highest", exam: "MHT-CET / JEE", slug: "bharati-vidyapeeth-college-engineering-pune", highlight: "Strong Alumni Network" },
  { rank: 11, name: "D.Y. Patil College of Engineering Akurdi", type: "Private", nirf: null, naac: "A", fees: "₹1.05L–₹1.55L/yr", placement: "₹5.1 LPA avg | ₹20 LPA highest", exam: "MHT-CET", slug: "dy-patil-college-engineering-akurdi-pune", highlight: "Good Industry Tie-ups" },
  { rank: 12, name: "Indira College of Engineering & Management", type: "Private", nirf: null, naac: "B++", fees: "₹95K–₹1.35L/yr", placement: "₹4.2 LPA avg | ₹16 LPA highest", exam: "MHT-CET", slug: "indira-college-of-engineering-management-pune", highlight: "Best Budget Option" },
]

const faqs = [
  { question: "Which is the best engineering college in Pune?", answer: "College of Engineering Pune (COEP) is the best engineering college in Pune. It is a government autonomous institute established in 1854 with NIRF Rank 49, NAAC A+ grade, annual fees of just ₹80,000–₹1.8L, and average placement of ₹12 LPA. Admission is through MHT-CET (95+ percentile) or JEE Main." },
  { question: "What is the fee for engineering college in Pune?", answer: "Engineering college fees in Pune range from ₹80,000/year (COEP - Government) to ₹4.8L/year (SIT Pune - Deemed). Government colleges charge ₹80K–₹1.8L/year. Autonomous private colleges charge ₹1.4L–₹2.2L/year. Deemed universities charge ₹2L–₹4.8L/year. SC/ST/OBC students get fee concessions and government scholarships." },
  { question: "What exam is needed for engineering college in Pune?", answer: "MHT-CET (Maharashtra Common Entrance Test) is the primary exam for most Pune engineering colleges. JEE Main is accepted at COEP, VIT Pune, SIT Pune, and MIT-WPU. For deemed universities like SIT Pune, SET (Symbiosis Entrance Test) is also accepted. MHT-CET is conducted in April–May every year." },
  { question: "What MHT-CET score is needed for top Pune engineering colleges?", answer: "COEP requires 95+ percentile in MHT-CET for Computer Engineering. VIT Pune and PICT require 90–95 percentile. MIT-WPU requires 75–85 percentile. Private colleges like JSPM and AISSMS accept 60–75 percentile. SC/ST categories get 15–20 percentile relaxation." },
  { question: "Which Pune engineering college has the best placements?", answer: "COEP has the highest average package (₹12 LPA) among government colleges. SIT Pune (Symbiosis) has the highest average among private/deemed colleges at ₹9.8 LPA. VIT Pune averages ₹8.5 LPA. Top recruiters include TCS, Infosys, Wipro, L&T, Bajaj Auto, and multinational tech companies." },
  { question: "Is COEP better than VIT Pune?", answer: "COEP is ranked higher (NIRF 49) and has lower fees (₹80K/yr vs ₹1.6L/yr) than VIT Pune (NIRF 101). COEP has better placements (₹12 LPA avg vs ₹8.5 LPA). However, VIT Pune has better infrastructure and industry connections for non-CS branches. For CS/IT, PICT is also an excellent alternative to both." },
  { question: "Can I get COEP with 80 percentile in MHT-CET?", answer: "No, COEP requires 95+ percentile for Computer Engineering branch. For Mechanical or Civil at COEP, you may need 90+ percentile. With 80 percentile, you can target VIT Pune (lower branches), JSPM RSCOE, AISSMS, or Sinhgad College of Engineering." },
  { question: "Which is the best private engineering college in Pune?", answer: "Among private autonomous colleges, PICT (Pune Institute of Computer Technology) is considered the best for CS/IT with ₹7.5 LPA average placement. VIT Pune is best overall for private autonomous status. Among deemed universities, SIT Pune (Symbiosis) has the highest placements (₹9.8 LPA avg)." },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "Engineering Colleges in Pune", url: "/engineering-colleges-pune" },
]

export default function EngineeringCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Engineering Colleges in Pune 2025",
    description: "List of top 12 engineering colleges in Pune ranked by NIRF, NAAC grade, fees, and placements",
    numberOfItems: colleges.length,
    itemListElement: colleges.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `https://collegepune.in/colleges/${c.slug}`,
    })),
  }

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="bg-[#F8FAFC] min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-12 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link>
              <span>/</span>
              <span className="text-white">Engineering Colleges in Pune</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Best Engineering Colleges in Pune 2025
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Complete list of top 12 engineering colleges in Pune ranked by NIRF, NAAC grade, fees, and placements. Includes government, autonomous, and deemed university options for B.Tech, M.Tech admission.
            </p>
            {/* Quick Answer Box — optimized for featured snippets & AI extraction */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>COEP (College of Engineering Pune)</strong> is the best engineering college in Pune with NIRF Rank 49, NAAC A+, fees ₹80K–₹1.8L/year, and ₹12 LPA average placement. Other top colleges: <strong>PICT</strong> (CS/IT), <strong>VIT Pune</strong> (NIRF 101), <strong>SIT Pune</strong> (best deemed, ₹9.8 LPA avg). Admission via <strong>MHT-CET</strong> (95+ percentile for COEP) or JEE Main.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Engineering Colleges", value: "12+", icon: "🏛️" },
              { label: "Lowest Fees/yr", value: "₹80,000", icon: "💰" },
              { label: "Highest Avg Package", value: "₹12 LPA", icon: "📈" },
              { label: "Top NIRF Rank", value: "#49 (COEP)", icon: "🏆" },
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
              <h2 className="text-lg font-bold text-gray-900">Engineering College Rankings & Comparison 2025</h2>
              <p className="text-xs text-gray-400 mt-0.5">Ranked by NIRF rank, NAAC grade, placements & fees. Data verified 2025.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-3 sm:px-4 py-3 text-left w-8">#</th>
                    <th className="px-3 sm:px-4 py-3 text-left">College</th>
                    <th className="px-3 sm:px-4 py-3 text-center hidden sm:table-cell">NAAC</th>
                    <th className="px-3 sm:px-4 py-3 text-right hidden md:table-cell">Fees/Year</th>
                    <th className="px-3 sm:px-4 py-3 text-right hidden lg:table-cell">Avg Package</th>
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
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          <span className="text-xs text-gray-500">{c.type}</span>
                          {c.nirf && <span className="text-xs bg-purple-50 text-purple-700 px-1.5 rounded-full">NIRF #{c.nirf}</span>}
                          <span className="text-xs bg-blue-50 text-blue-700 px-1.5 rounded-full">{c.highlight}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-center hidden sm:table-cell">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.naac === "A+" ? "bg-green-100 text-green-700" : c.naac === "A" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
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

          {/* Top 3 Deep Dive */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Top 3 Engineering Colleges in Pune — Detailed Review</h2>
          <div className="space-y-5 mb-10">
            {/* COEP */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full">🥇 Rank 1</span>
                    <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">NAAC A+</span>
                    <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-2 py-0.5 rounded-full">NIRF #49</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Government</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">1. College of Engineering Pune (COEP)</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> Shivajinagar, Pune · Est. 1854</p>
                </div>
                <Link href="/colleges/coep-college-of-engineering-pune" className="inline-flex items-center gap-2 bg-[#0A1628] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#1E3A5F] transition-colors flex-shrink-0">
                  Full Details →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Annual Fees", value: "₹80K–₹1.8L" },
                  { label: "Avg Placement", value: "₹12 LPA" },
                  { label: "Highest Package", value: "₹45 LPA" },
                  { label: "MHT-CET Cutoff", value: "95+ percentile" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-sm font-bold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                COEP is India&apos;s third-oldest engineering college and Pune&apos;s premier technical institution. Affiliated to Savitribai Phule Pune University (SPPU), it offers B.Tech, M.Tech, and Ph.D. programs. Top recruiters include TCS Digital, Bajaj Auto, Mercedes-Benz, and Siemens. The Computer Engineering branch is the most sought-after with a CET cutoff of 99.5+ percentile.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["B.Tech CSE", "B.Tech Mechanical", "B.Tech Civil", "B.Tech Electronics", "M.Tech", "Ph.D"].map(c => (
                  <span key={c} className="text-xs bg-orange-50 text-orange-700 border border-orange-100 px-2.5 py-1 rounded-full">{c}</span>
                ))}
              </div>
            </div>

            {/* PICT */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs bg-gray-100 text-gray-700 font-bold px-2 py-0.5 rounded-full">🥈 Rank 2</span>
                    <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">NAAC A</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Best for CS/IT</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">2. Pune Institute of Computer Technology (PICT)</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> Dhankawadi, Pune · Est. 1983</p>
                </div>
                <Link href="/colleges/pict-pune-institute-of-computer-technology" className="inline-flex items-center gap-2 bg-[#0A1628] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#1E3A5F] transition-colors flex-shrink-0">
                  Full Details →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Annual Fees", value: "₹1.4L–₹1.9L" },
                  { label: "Avg Placement", value: "₹7.5 LPA" },
                  { label: "Highest Package", value: "₹35 LPA" },
                  { label: "MHT-CET Cutoff", value: "92–95 percentile" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-sm font-bold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                PICT is exclusively focused on Computer and IT engineering, making it Pune&apos;s most specialized CS college. It has the highest computer engineering placement rate in Pune. Top recruiters include Google, Microsoft, Amazon, Goldman Sachs, and Deutsche Bank. The institute has produced numerous startup founders and top engineers at major tech companies.
              </p>
            </div>

            {/* VIT Pune */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">🥉 Rank 3</span>
                    <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">NAAC A+</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">NIRF #101</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">3. Vishwakarma Institute of Technology (VIT Pune)</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> Bibwewadi, Pune · Est. 1983</p>
                </div>
                <Link href="/colleges/vit-pune-vishwakarma-institute-of-technology" className="inline-flex items-center gap-2 bg-[#0A1628] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#1E3A5F] transition-colors flex-shrink-0">
                  Full Details →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Annual Fees", value: "₹1.6L–₹2.2L" },
                  { label: "Avg Placement", value: "₹8.5 LPA" },
                  { label: "Highest Package", value: "₹40 LPA" },
                  { label: "MHT-CET Cutoff", value: "88–92 percentile" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-sm font-bold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                VIT Pune is an autonomous institute affiliated to SPPU with NIRF Rank 101 nationally. Known for strong industry connections with Bajaj Auto, Tata Motors, L&T, and Bosch. Excellent for Mechanical, Electronics, and Civil engineering. Has a dedicated incubation center and strong alumni network in manufacturing and automotive sectors.
              </p>
            </div>
          </div>

          {/* Admission Process */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> Admission Process for Engineering Colleges in Pune
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Step-by-Step Admission Process</h3>
                <ol className="space-y-2">
                  {[
                    "Appear for MHT-CET (April–May) or JEE Main (Jan & April)",
                    "Register on MHT-CET CAP portal after results (June–July)",
                    "Fill college preferences in CAP Round 1",
                    "Accept allotment and pay seat confirmation fee",
                    "Report to college with original documents",
                    "Complete admission formalities & pay full fees",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Documents Required</h3>
                <ul className="space-y-1.5">
                  {[
                    "MHT-CET / JEE scorecard",
                    "Class 10 & 12 marksheets + passing certificate",
                    "Caste certificate (if applicable)",
                    "Domicile certificate (Maharashtra)",
                    "Income certificate (for fee concession)",
                    "Aadhar card & passport photos",
                    "Character certificate from last school",
                  ].map((doc, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — Engineering Colleges in Pune</h2>
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
              <p className="font-bold text-lg">Not sure which college to pick?</p>
              <p className="text-blue-200 text-sm">Use our free College Predictor or get expert counselling.</p>
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
