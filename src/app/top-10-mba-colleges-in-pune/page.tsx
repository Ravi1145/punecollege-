import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle, MapPin, ExternalLink, BookOpen } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Top 10 MBA Colleges in Pune 2026 | SNAP/CAT Cutoff, Fees & Placements",
  description:
    "Top 10 MBA colleges in Pune 2026: SIBM (NIRF #13, ₹28 LPA avg), SCMHRD (₹22 LPA), MIT-SOM (₹8–10L fees). SNAP cutoff 88–97 %ile. Fees ₹2.5L–₹21L. Compare free.",
  path: "/top-10-mba-colleges-in-pune",
  keywords: [
    "top 10 mba colleges in pune",
    "top mba colleges in pune",
    "best mba colleges in pune",
    "best mba colleges pune ranking",
  ],
})

const colleges = [
  {
    rank: 1,
    name: "Symbiosis Institute of Business Management (SIBM Pune)",
    type: "Deemed University",
    nirf: 13,
    naac: "A+",
    fees: "₹19L–₹21L (2yr)",
    avgPackage: "₹28 LPA",
    highestPackage: "₹65 LPA",
    placement: "100%",
    exam: "SNAP",
    slug: "sibm-symbiosis-institute-business-management-pune",
    highlight: "NIRF #13 | Best MBA Pune",
    location: "Viman Nagar, Pune",
  },
  {
    rank: 2,
    name: "Symbiosis Centre for Management & HRD (SCMHRD)",
    type: "Deemed University",
    nirf: null,
    naac: "A+",
    fees: "₹16L–₹18L (2yr)",
    avgPackage: "₹22 LPA",
    highestPackage: "₹55 LPA",
    placement: "100%",
    exam: "SNAP",
    slug: "scmhrd-symbiosis-centre-management-hrd",
    highlight: "Top SNAP College",
    location: "Hinjewadi, Pune",
  },
  {
    rank: 3,
    name: "MIT School of Management (MIT-SOM)",
    type: "Deemed University",
    nirf: null,
    naac: "A+",
    fees: "₹8L–₹10L (2yr)",
    avgPackage: "₹12 LPA",
    highestPackage: "₹32 LPA",
    placement: "95%",
    exam: "CAT / MAT / CMAT",
    slug: "mit-som-mit-school-of-management-pune",
    highlight: "Best Value MBA",
    location: "Kothrud, Pune",
  },
  {
    rank: 4,
    name: "Symbiosis Centre for Information Technology (SCIT)",
    type: "Deemed University",
    nirf: null,
    naac: "A+",
    fees: "₹14L–₹16L (2yr)",
    avgPackage: "₹16 LPA",
    highestPackage: "₹38 LPA",
    placement: "98%",
    exam: "SNAP",
    slug: "siib-symbiosis-institute-of-international-business-pune",
    highlight: "Best MBA IT/IS",
    location: "Hinjewadi, Pune",
  },
  {
    rank: 5,
    name: "Balaji Institute of Modern Management (BIMM Pune)",
    type: "Private",
    nirf: null,
    naac: "A",
    fees: "₹6L–₹8L (2yr)",
    avgPackage: "₹10 LPA",
    highestPackage: "₹28 LPA",
    placement: "92%",
    exam: "CAT / MAT / CMAT / XAT",
    slug: "balaji-institute-of-modern-management-pune",
    highlight: "Best Budget MBA",
    location: "Tathawade, Pune",
  },
  {
    rank: 6,
    name: "Indira Institute of Management (IIMP Pune)",
    type: "Private",
    nirf: null,
    naac: "A",
    fees: "₹5.5L–₹7L (2yr)",
    avgPackage: "₹8.5 LPA",
    highestPackage: "₹24 LPA",
    placement: "89%",
    exam: "CAT / MAT / CMAT",
    slug: "indira-institute-of-management-pune",
    highlight: "Strong Industry Links",
    location: "Wakad, Pune",
  },
  {
    rank: 7,
    name: "Indian Institute of Management & Commerce (IIMC Pune)",
    type: "Private",
    nirf: null,
    naac: "A",
    fees: "₹4.5L–₹6L (2yr)",
    avgPackage: "₹7.8 LPA",
    highestPackage: "₹20 LPA",
    placement: "87%",
    exam: "CAT / MAT / CMAT",
    slug: "iimc-pune-indian-institute-management-commerce",
    highlight: "Affordable MBA",
    location: "Deccan, Pune",
  },
  {
    rank: 8,
    name: "Suryadatta Institute of Management (SIM Pune)",
    type: "Private",
    nirf: null,
    naac: "B++",
    fees: "₹3.5L–₹5L (2yr)",
    avgPackage: "₹6.5 LPA",
    highestPackage: "₹18 LPA",
    placement: "83%",
    exam: "MAT / CMAT",
    slug: "suryadatta-institute-management-pune",
    highlight: "Budget Friendly",
    location: "Shivajinagar, Pune",
  },
  {
    rank: 9,
    name: "BATU School of Management Studies",
    type: "State University",
    nirf: null,
    naac: "A",
    fees: "₹2.5L–₹4L (2yr)",
    avgPackage: "₹5.8 LPA",
    highestPackage: "₹16 LPA",
    placement: "80%",
    exam: "MAH-MBA CET / CAT",
    slug: "batu-school-management-studies-pune",
    highlight: "Govt. University MBA",
    location: "Lonere / Pune Campus",
  },
  {
    rank: 10,
    name: "MIT College of Management (MITCOM Pune)",
    type: "Autonomous",
    nirf: null,
    naac: "A",
    fees: "₹3.8L–₹5.5L (2yr)",
    avgPackage: "₹7.2 LPA",
    highestPackage: "₹22 LPA",
    placement: "86%",
    exam: "CAT / MAT / CMAT",
    slug: "mit-school-of-management-pune",
    highlight: "Good ROI MBA",
    location: "Kothrud, Pune",
  },
]

const topFiveDetails = [
  {
    rank: 1,
    emoji: "🥇",
    badge: "bg-yellow-100 text-yellow-700",
    name: "Symbiosis Institute of Business Management (SIBM Pune)",
    slug: "sibm-symbiosis-institute-business-management-pune",
    location: "Viman Nagar, Pune · Est. 1978",
    nirf: 13,
    naac: "A+",
    type: "Deemed University",
    stats: [
      { label: "Total Fees (2yr)", value: "₹19L–₹21L" },
      { label: "Avg Placement", value: "₹28 LPA" },
      { label: "Highest Package", value: "₹65 LPA" },
      { label: "SNAP Cutoff", value: "97+ percentile" },
    ],
    description:
      "SIBM Pune is ranked #13 in India by NIRF (Management category) and is consistently rated Pune's best MBA college. With 100% placement and an average package of ₹28 LPA, it attracts top recruiters like McKinsey, BCG, Deloitte, Goldman Sachs, Amazon, and ITC. Admission is purely through SNAP followed by a group exercise and personal interaction (PI). The 2-year MBA programme covers Finance, Marketing, HR and Operations specializations.",
    courses: ["MBA Finance", "MBA Marketing", "MBA HR", "MBA Operations", "MBA Business Analytics"],
  },
  {
    rank: 2,
    emoji: "🥈",
    badge: "bg-gray-100 text-gray-700",
    name: "Symbiosis Centre for Management & HRD (SCMHRD)",
    slug: "scmhrd-symbiosis-centre-management-hrd",
    location: "Hinjewadi, Pune · Est. 1993",
    nirf: null,
    naac: "A+",
    type: "Deemed University",
    stats: [
      { label: "Total Fees (2yr)", value: "₹16L–₹18L" },
      { label: "Avg Placement", value: "₹22 LPA" },
      { label: "Highest Package", value: "₹55 LPA" },
      { label: "SNAP Cutoff", value: "94+ percentile" },
    ],
    description:
      "SCMHRD is SIBM's sister institution in Hinjewadi's IT hub, making it particularly strong in placements with tech and consulting firms. Known for its flagship MBA in Infrastructure Management and Rural Management alongside traditional Business Management. Top recruiters include Amazon, Flipkart, Capgemini, Infosys BPO, HDFC Bank, ICICI Bank and EY.",
    courses: ["MBA Business Management", "MBA Infrastructure Management", "MBA Rural Management"],
  },
  {
    rank: 3,
    emoji: "🥉",
    badge: "bg-orange-100 text-orange-700",
    name: "MIT School of Management (MIT-SOM)",
    slug: "mit-som-mit-school-of-management-pune",
    location: "Kothrud, Pune · Est. 1983",
    nirf: null,
    naac: "A+",
    type: "Deemed University",
    stats: [
      { label: "Total Fees (2yr)", value: "₹8L–₹10L" },
      { label: "Avg Placement", value: "₹12 LPA" },
      { label: "Highest Package", value: "₹32 LPA" },
      { label: "CAT / CMAT Cutoff", value: "CAT 70+ / CMAT 150+" },
    ],
    description:
      "MIT-SOM offers the best value-for-money MBA in Pune with NAAC A+ at significantly lower fees than Symbiosis institutions. It is part of the MIT World Peace University ecosystem with excellent campus facilities. Recruiters include TCS, Wipro, Capgemini, Bajaj Finserv, HDFC Life, Reliance and Mahindra. Accepts CAT, MAT, CMAT, and ATMA scores.",
    courses: ["MBA Finance", "MBA Marketing", "MBA HR", "MBA IT Management", "MBA International Business"],
  },
  {
    rank: 4,
    emoji: "4️⃣",
    badge: "bg-blue-100 text-blue-700",
    name: "Symbiosis Centre for Information Technology (SCIT)",
    slug: "siib-symbiosis-institute-of-international-business-pune",
    location: "Hinjewadi, Pune · Est. 2000",
    nirf: null,
    naac: "A+",
    type: "Deemed University",
    stats: [
      { label: "Total Fees (2yr)", value: "₹14L–₹16L" },
      { label: "Avg Placement", value: "₹16 LPA" },
      { label: "Highest Package", value: "₹38 LPA" },
      { label: "SNAP Cutoff", value: "88+ percentile" },
    ],
    description:
      "SCIT is unique in Pune for its MBA in Information Technology and Business Management, perfectly positioned in Pune's IT hub at Hinjewadi. Tech placements are exceptionally strong with recruiters including Infosys, TCS, HCL, Accenture, IBM, Cognizant, and Capgemini. Ideal for engineering graduates looking to transition to tech management roles.",
    courses: ["MBA Information Technology", "MBA Business Management (IT focus)"],
  },
  {
    rank: 5,
    emoji: "5️⃣",
    badge: "bg-green-100 text-green-700",
    name: "Balaji Institute of Modern Management (BIMM Pune)",
    slug: "balaji-institute-of-modern-management-pune",
    location: "Tathawade, Pune · Est. 2004",
    nirf: null,
    naac: "A",
    type: "Private",
    stats: [
      { label: "Total Fees (2yr)", value: "₹6L–₹8L" },
      { label: "Avg Placement", value: "₹10 LPA" },
      { label: "Highest Package", value: "₹28 LPA" },
      { label: "CAT / MAT Cutoff", value: "CAT 60+ / MAT 500+" },
    ],
    description:
      "BIMM Pune offers the best budget MBA with NAAC A grade at approximately one-third the cost of SIBM/SCMHRD. Strong in Finance and Marketing specializations with recruiters including HDFC Bank, Axis Bank, ICICI Bank, Kotak, Amazon, and various FMCG companies. The college runs active alumni mentorship programs and has a strong corporate relations cell.",
    courses: ["MBA Finance", "MBA Marketing", "MBA HR", "MBA Operations", "MBA Business Analytics"],
  },
]

const faqs = [
  {
    question: "Which is the No. 1 MBA college in Pune?",
    answer:
      "Symbiosis Institute of Business Management (SIBM Pune) is the No. 1 MBA college in Pune with NIRF Rank 13 (Management), NAAC A+, 100% placement record, and ₹28 LPA average package. Admission is through SNAP (97+ percentile required) followed by Group Exercise and Personal Interaction.",
  },
  {
    question: "What is the SNAP cutoff for SIBM Pune and SCMHRD in 2026?",
    answer:
      "SIBM Pune requires a SNAP percentile of 97+ for the shortlisting round. SCMHRD requires approximately 94+ percentile. SCIT requires 88+ percentile. After SNAP shortlisting, candidates appear for Group Exercise (GE) and Personal Interaction (PI). The final selection is based on SNAP score (50%), GE (25%), and PI (25%).",
  },
  {
    question: "What is the total MBA fee at top Pune colleges?",
    answer:
      "SIBM Pune charges ₹19L–₹21L for the 2-year MBA (highest). SCMHRD: ₹16L–₹18L. SCIT: ₹14L–₹16L. MIT-SOM: ₹8L–₹10L. BIMM: ₹6L–₹8L. Indira Institute: ₹5.5L–₹7L. Government/state university options like BATU charge as low as ₹2.5L–₹4L for the full programme.",
  },
  {
    question: "Is CAT score accepted at Pune MBA colleges?",
    answer:
      "Yes, MIT-SOM, BIMM, Indira Institute, IIMC and MIT College of Management accept CAT scores. Symbiosis institutions (SIBM, SCMHRD, SCIT) exclusively use SNAP. MAH-MBA CET (conducted by Maharashtra government) is accepted at state universities and many private colleges. CMAT, MAT, XAT and ATMA are also widely accepted at Pune MBA colleges.",
  },
  {
    question: "Which Pune MBA college has the highest average placement package?",
    answer:
      "SIBM Pune has the highest average MBA placement package in Pune at ₹28 LPA with a highest package of ₹65 LPA. SCMHRD is second at ₹22 LPA average. SCIT averages ₹16 LPA. MIT-SOM averages ₹12 LPA. BIMM averages ₹10 LPA. All Symbiosis institutions report 100% placement within 3 months of final semester.",
  },
  {
    question: "What are the top recruiters for MBA graduates in Pune?",
    answer:
      "Top MBA recruiters in Pune include McKinsey, BCG, Deloitte, EY, KPMG, Amazon, Flipkart, HDFC Bank, ICICI Bank, Axis Bank, Bajaj Finserv, Mahindra, TCS, Infosys, Wipro, Capgemini, ITC, HUL, Asian Paints, Marico, and Reliance. Management consulting, BFSI, and FMCG are the dominant sectors for MBA placements from Pune colleges.",
  },
  {
    question: "Is SIBM Pune worth the ₹20 lakh fees?",
    answer:
      "Yes, given SIBM Pune's ₹28 LPA average placement, the ROI is strong — students typically recover their investment within 1–1.5 years of working. The college has NIRF Rank 13 (Management), 100% placement, and alumni in senior positions at top global firms. Compared to IIMs (₹25–32 LPA fees), SIBM Pune offers comparable placements at lower cost for Tier-1 companies.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "Top 10 MBA Colleges in Pune", url: "/top-10-mba-colleges-in-pune" },
]

export default function Top10MBACollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top 10 MBA Colleges in Pune 2026",
    description: "NIRF-ranked list of the top 10 MBA colleges in Pune by SNAP/CAT cutoff, fees, and placements",
    numberOfItems: colleges.length,
    itemListElement: colleges.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `https://collegepune.com/colleges/${c.slug}`,
    })),
  }

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link>
              <span>›</span>
              <span className="text-white">Top 10 MBA Colleges in Pune</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Top 10 MBA Colleges in Pune 2026 (NIRF Ranked &amp; SNAP/CAT)
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Definitive ranked list of Pune&apos;s top 10 MBA colleges for 2026. Compare NIRF rank, SNAP/CAT cutoffs, total fees, average placement packages, and top recruiters — all in one place.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>SIBM Pune (NIRF #13)</strong> is Pune&apos;s best MBA college with ₹28 LPA avg, 100% placement. Top 5: <strong>SCMHRD</strong> (₹22 LPA avg), <strong>MIT-SOM</strong> (best value, ₹12 LPA), <strong>SCIT</strong> (best for IT, ₹16 LPA), <strong>BIMM</strong> (budget pick, ₹10 LPA). Symbiosis colleges need <strong>SNAP</strong>; others accept <strong>CAT/MAT/CMAT</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "MBA Colleges Ranked", value: "Top 10", icon: "🏛️" },
              { label: "Lowest Total Fees", value: "₹2.5L (2yr)", icon: "💰" },
              { label: "Best Avg Package", value: "₹28 LPA", icon: "📈" },
              { label: "Top NIRF Rank", value: "#13 (SIBM)", icon: "🏆" },
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
              <h2 className="text-lg font-bold text-gray-900">Top 10 MBA Colleges in Pune — Ranking Table 2026</h2>
              <p className="text-xs text-gray-400 mt-0.5">Ranked by NIRF rank, NAAC grade, placement average & entrance exam. Data verified 2026.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-3 sm:px-4 py-3 text-left w-8">#</th>
                    <th className="px-3 sm:px-4 py-3 text-left">College</th>
                    <th className="px-3 sm:px-4 py-3 text-center hidden sm:table-cell">NAAC</th>
                    <th className="px-3 sm:px-4 py-3 text-right hidden md:table-cell">Total Fees</th>
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
                      <td className="px-3 sm:px-4 py-3 text-right text-xs font-semibold text-green-700 hidden lg:table-cell">{c.avgPackage}</td>
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

          {/* Top 5 Deep Dive */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Top 5 MBA Colleges in Pune — Detailed Review</h2>
          <div className="space-y-5 mb-10">
            {topFiveDetails.map((c) => (
              <div key={c.rank} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.badge}`}>{c.emoji} Rank {c.rank}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.naac === "A+" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>NAAC {c.naac}</span>
                      {c.nirf && <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-2 py-0.5 rounded-full">NIRF #{c.nirf}</span>}
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{c.type}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{c.rank}. {c.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {c.location}</p>
                  </div>
                  <Link href={`/colleges/${c.slug}`} className="inline-flex items-center gap-2 bg-[#0A1628] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#1E3A5F] transition-colors flex-shrink-0">
                    Full Details →
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {c.stats.map(({ label, value }) => (
                    <div key={label} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-bold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{c.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {c.courses.map((course) => (
                    <span key={course} className="text-xs bg-orange-50 text-orange-700 border border-orange-100 px-2.5 py-1 rounded-full">{course}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Admission Process */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> MBA Admission Process in Pune 2026
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Symbiosis Colleges (SNAP Route)</h3>
                <ol className="space-y-2">
                  {[
                    "Register for SNAP (October) at snaptest.org",
                    "Appear for SNAP exam (December)",
                    "Register separately on the Symbiosis admission portal",
                    "Shortlisted candidates appear for GE-PI (Feb–March)",
                    "Merit list announced — accept admission offer online",
                    "Pay confirmation fees and report to campus",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Documents Required for MBA Admission</h3>
                <ul className="space-y-1.5">
                  {[
                    "SNAP / CAT / MAT / CMAT scorecard",
                    "Bachelor's degree marksheets (all years)",
                    "Bachelor's degree passing certificate",
                    "Class 10 & 12 certificates and marksheets",
                    "Work experience certificate (if any)",
                    "Caste certificate (if applicable)",
                    "Aadhar card & passport size photographs",
                    "Character certificate from last institution",
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
            <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — Top 10 MBA Colleges in Pune</h2>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related MBA Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
              { label: "Best MBA Colleges in Pune 2026", href: "/mba-colleges-pune", icon: "🏛️" },
              { label: "MBA Placement Guide — LPA Stats", href: "/mba-colleges-pune-placement", icon: "💼" },
              { label: "Low Fees MBA Colleges in Pune", href: "/low-fees-mba-colleges-pune", icon: "💰" },
              { label: "MBA Scholarships in Pune", href: "/mba-colleges-pune-scholarship", icon: "🎓" },
              { label: "CAT Score Colleges in Pune", href: "/cat-colleges-pune", icon: "📝" },
              { label: "PGDM Colleges in Pune", href: "/pgdm-colleges-pune", icon: "📊" },
              { label: "Admission Without CAT (MAH-CET)", href: "/mba-admission-pune-without-cat", icon: "🚀" },
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
              <p className="font-bold text-lg">Which MBA college is right for your profile?</p>
              <p className="text-blue-200 text-sm">Get free expert counselling to shortlist colleges based on your SNAP/CAT score and budget.</p>
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
