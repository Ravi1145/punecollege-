import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { TrendingUp, ExternalLink } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Best MBA Colleges in Pune for Placements 2026 | Average Package Data",
  description:
    "Compare MBA placement packages across Pune colleges 2026. SIBM ₹28 LPA avg, SCMHRD ₹22 LPA, MIT-SOM ₹12 LPA. Full recruiter list, placement %, and salary data for all top Pune MBA colleges.",
  path: "/mba-colleges-pune-placement",
  keywords: [
    "best mba colleges in pune with placement",
    "top placement mba colleges pune",
    "highest placement mba colleges pune",
    "average package mba colleges pune",
    "mba colleges in pune with placement",
    "mba placement pune 2026",
    "sibm pune placement",
  ],
})

const placementData = [
  { rank: 1, name: "SIBM Pune — Symbiosis Institute of Business Management", type: "Deemed", avg: "₹28 LPA", highest: "₹65 LPA", rate: "100%", slug: "sibm-pune-symbiosis-institute-of-business-management", recruiters: "McKinsey, BCG, Goldman Sachs, P&G, Deloitte, Hindustan Unilever" },
  { rank: 2, name: "SCMHRD — Symbiosis Centre for Management & HRD", type: "Deemed", avg: "₹22 LPA", highest: "₹55 LPA", rate: "100%", slug: "scmhrd-symbiosis-centre-management-hrd", recruiters: "Amazon, Accenture, Capgemini, EY, KPMG, Tata Motors" },
  { rank: 3, name: "SCIT — Symbiosis Centre for Information Technology", type: "Deemed", avg: "₹18 LPA", highest: "₹45 LPA", rate: "98%", slug: "symbiosis-centre-information-technology-pune", recruiters: "Microsoft, TCS, Cognizant, Infosys BPM, Wipro Digital" },
  { rank: 4, name: "MIT School of Management (MIT-SOM)", type: "Autonomous", avg: "₹12 LPA", highest: "₹32 LPA", rate: "92%", slug: "mit-school-of-management-pune", recruiters: "HDFC Bank, ICICI, Bajaj Finserv, Mahindra, Tata Group" },
  { rank: 5, name: "BIMM — Balaji Institute of Modern Management", type: "Autonomous", avg: "₹8.5 LPA", highest: "₹22 LPA", rate: "88%", slug: "balaji-institute-of-modern-management-pune", recruiters: "HDFC, Axis Bank, Reliance, HUL, Aditya Birla Group" },
  { rank: 6, name: "Indira Institute of Management Pune (IIMP)", type: "Autonomous", avg: "₹7.2 LPA", highest: "₹18 LPA", rate: "85%", slug: "indira-institute-of-management-pune", recruiters: "BFSI companies, FMCG firms, IT services, Retail chains" },
  { rank: 7, name: "Suryadatta Institute of Management", type: "Private", avg: "₹5.8 LPA", highest: "₹14 LPA", rate: "80%", slug: "suryadatta-institute-management-pune", recruiters: "Local Pune companies, Banking sector, Insurance, Retail" },
  { rank: 8, name: "BATU — Bharati Vidyapeeth Institute of Management", type: "Deemed", avg: "₹6.8 LPA", highest: "₹16 LPA", rate: "82%", slug: "bharati-vidyapeeth-institute-management-pune", recruiters: "HDFC, Kotak, Bajaj, Tech Mahindra, Infosys BPM" },
  { rank: 9, name: "MAEER MIT College of Management", type: "Autonomous", avg: "₹7.5 LPA", highest: "₹20 LPA", rate: "86%", slug: "mit-school-of-management-pune", recruiters: "Mahindra, Bajaj, TCS, Wipro, Barclays, Citi" },
  { rank: 10, name: "IIMM — Indian Institute of Materials Management", type: "Autonomous", avg: "₹6.5 LPA", highest: "₹16 LPA", rate: "80%", slug: "pumba-pune-university-mba", recruiters: "Amazon, Flipkart, DHL, Blue Dart, Maersk, TVS Logistics" },
]

const topMBARecruiters = [
  { sector: "Consulting", companies: ["McKinsey", "BCG", "Deloitte", "EY", "KPMG", "PwC", "Accenture Strategy"] },
  { sector: "Banking / Finance", companies: ["Goldman Sachs", "HDFC Bank", "ICICI Bank", "Citi", "Barclays", "Kotak", "Bajaj Finserv"] },
  { sector: "FMCG / Consumer", companies: ["P&G", "HUL", "Marico", "Nestlé", "ITC", "Godrej", "Aditya Birla"] },
  { sector: "Technology / IT", companies: ["Microsoft", "Amazon", "TCS", "Infosys BPM", "Cognizant", "Wipro Digital"] },
  { sector: "Manufacturing / Auto", companies: ["Tata Motors", "Mahindra", "Bajaj Auto", "L&T", "Cummins India", "Thermax"] },
]

const faqs = [
  {
    question: "Which MBA college in Pune has the highest placement package?",
    answer: "SIBM Pune (Symbiosis Institute of Business Management) has the highest MBA placement in Pune with ₹28 LPA average and ₹65 LPA highest package. McKinsey, BCG, Goldman Sachs, and P&G are among the top recruiters. SIBM Pune is NIRF Rank 13 and admission requires SNAP 2026 with 60+ percentile.",
  },
  {
    question: "What is the average MBA salary from Pune colleges?",
    answer: "Average MBA salaries from Pune colleges vary widely: SIBM Pune: ₹28 LPA. SCMHRD: ₹22 LPA. SCIT: ₹18 LPA. MIT-SOM: ₹12 LPA. BIMM: ₹8.5 LPA. Indira Institute: ₹7.2 LPA. Suryadatta: ₹5.8 LPA. The city average across all Pune MBA colleges is approximately ₹10–12 LPA. Specialisations in Finance and IT+MBA command 20–30% premium.",
  },
  {
    question: "Does SIBM Pune have 100% placement?",
    answer: "Yes — SIBM Pune achieves 100% placement for its MBA batch. The 2024 batch saw all students placed with an average package of ₹28 LPA. The highest international offer was ₹65 LPA. McKinsey, BCG, P&G, and Goldman Sachs are anchor recruiters. SIBM Pune also offers summer internships (PPO conversions) with an average stipend of ₹1.2–2L per month.",
  },
  {
    question: "Which Pune MBA college has the best placement for Finance specialisation?",
    answer: "SIBM Pune is best for Finance MBA with Goldman Sachs, Deutsche Bank, and Kotak among top recruiters (average ₹28 LPA). SCMHRD Pune is second for finance placements. For investment banking and capital markets specifically, SIBM Pune's Finance batch consistently attracts Tier-1 BFSI recruiters. MIT-SOM Pune is the best option for finance at a lower cost (₹12 LPA avg, ₹7–11L fees).",
  },
  {
    question: "What is the summer placement stipend at Pune MBA colleges?",
    answer: "Summer internship stipends at Pune MBA colleges: SIBM Pune — ₹80,000–₹2,00,000/month (McKinsey, BCG, Goldman Sachs). SCMHRD — ₹60,000–₹1,50,000/month. SCIT Pune — ₹50,000–₹1,00,000/month. MIT-SOM — ₹30,000–₹60,000/month. BIMM — ₹20,000–₹40,000/month. PPO (Pre-Placement Offer) conversion rate at SIBM Pune is approximately 30% of the summer batch.",
  },
  {
    question: "How does SNAP score affect placement at SIBM Pune?",
    answer: "SNAP score is required for admission to SIBM Pune but doesn't directly affect final placement — your academic performance, projects, case competitions, and interview skills during the 2-year MBA program determine placement outcomes. A student with 65 percentile SNAP can outperform a 75 percentile student in final placements. Focus on building your skill set, not just the entrance score.",
  },
  {
    question: "Is MBA placement better at SIBM or IIM Nagpur?",
    answer: "SIBM Pune has better mass placements (₹28 LPA avg) and stronger industry connections in the Pune-Mumbai corridor. IIM Nagpur has the IIM brand advantage but smaller batch and developing placement network. For Pune/Mumbai geography, FMCG, consulting, and BFSI roles, SIBM Pune is preferred by most recruiters. IIM Nagpur is catching up but SIBM has 40+ years of alumni network advantage.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "MBA Colleges Pune", url: "/mba-colleges-pune" },
  { name: "Best for Placements", url: "/mba-colleges-pune-placement" },
]

export default function MBACollegesPunePlacementPage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best MBA Colleges in Pune for Placements 2026",
    numberOfItems: placementData.length,
    itemListElement: placementData.map((c, i) => ({
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
              <Link href="/mba-colleges-pune" className="hover:text-white">MBA Colleges Pune</Link>
              <span>›</span>
              <span className="text-white">Best for Placements</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Best MBA Colleges in Pune for Placements 2026
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Ranked by average placement package, highest package, and placement rate. SIBM, SCMHRD, SCIT, MIT-SOM, BIMM — complete 2024–25 data.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>SIBM Pune</strong> has the best MBA placement in Pune — ₹28 LPA average, ₹65 LPA highest, 100% placement. <strong>SCMHRD</strong> is second (₹22 LPA avg). <strong>MIT-SOM Pune</strong> offers best ROI — ₹12 LPA avg at only ₹7–11L total fees. Top recruiters: McKinsey, BCG, Goldman Sachs, P&G, Deloitte, HDFC Bank.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Best Avg Package", value: "₹28 LPA", icon: "📈", note: "SIBM Pune" },
              { label: "Highest Package", value: "₹65 LPA", icon: "🏆", note: "SIBM Pune" },
              { label: "100% Placement", value: "SIBM & SCMHRD", icon: "✅", note: "Top 2 colleges" },
              { label: "Best ROI", value: "MIT-SOM", icon: "💡", note: "₹12 LPA, ₹7–11L fees" },
            ].map(({ label, value, icon, note }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-base font-extrabold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                <p className="text-xs text-orange-600 font-medium">{note}</p>
              </div>
            ))}
          </div>

          {/* Placement Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">MBA College Placement Rankings — Pune 2026</h2>
              <p className="text-xs text-gray-400 mt-0.5">Ranked by average package. Data from 2024–25 final placements.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-center w-8">#</th>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-right">Avg Package</th>
                    <th className="px-4 py-3 text-right hidden sm:table-cell">Highest</th>
                    <th className="px-4 py-3 text-center hidden md:table-cell">Rate</th>
                    <th className="px-4 py-3 text-center">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {placementData.map((c) => (
                    <tr key={c.rank} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-4 py-3 text-center">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mx-auto ${c.rank <= 3 ? "bg-orange-100 text-orange-700" : "bg-gray-50 text-gray-500"}`}>
                          {c.rank}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900 text-sm leading-tight">{c.name}</p>
                        <p className="text-xs text-gray-400">{c.type}</p>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-green-700">{c.avg}</td>
                      <td className="px-4 py-3 text-right text-xs text-orange-700 hidden sm:table-cell">{c.highest}</td>
                      <td className="px-4 py-3 text-center hidden md:table-cell">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{c.rate}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
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

          {/* Top Recruiters */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" /> Top Recruiters at Pune MBA Colleges
            </h2>
            <div className="space-y-3">
              {topMBARecruiters.map((r) => (
                <div key={r.sector} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs font-bold text-white bg-[#0A1628] px-3 py-1 rounded-full flex-shrink-0 w-fit">{r.sector}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {r.companies.map((company) => (
                      <span key={company} className="text-xs bg-gray-50 text-gray-700 border border-gray-100 px-2.5 py-1 rounded-full">{company}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQs — MBA Placements in Pune 2026</h2>
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
              <p className="font-bold text-lg">Target the right MBA college for your placement goals.</p>
              <p className="text-blue-200 text-sm">Our counsellors match you with the best option for your score and budget.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/counselling" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                Free MBA Counselling →
              </Link>
              <Link href="/mba-colleges-pune" className="flex items-center justify-center gap-2 bg-white text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors">
                All MBA Colleges →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
