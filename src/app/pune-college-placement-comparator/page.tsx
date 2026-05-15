import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import PlacementComparator from "@/components/tools/PlacementComparator"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Pune College Placement Comparator 2026 | Avg & Highest Package Tool",
  description:
    "Compare placement packages across Pune engineering and MBA colleges. Interactive comparator for average salary, highest package, and placement % — 2026 data. COEP ₹12L, SIBM ₹28L avg.",
  path: "/pune-college-placement-comparator",
  keywords: [
    "average package engineering colleges pune",
    "average package mba colleges pune",
    "engineering colleges pune highest package",
    "mba colleges pune highest package",
    "internship engineering colleges pune",
    "job oriented engineering colleges pune",
    "placement comparator pune colleges",
  ],
})

const engineeringData = [
  { name: "COEP Pune", type: "Government", avg: "₹12 LPA", highest: "₹45 LPA", rate: "92%", recruiters: "TCS, Bajaj, Mercedes, Siemens, L&T" },
  { name: "SIT Pune", type: "Deemed", avg: "₹9.8 LPA", highest: "₹42 LPA", rate: "94%", recruiters: "Google, Microsoft, Capgemini, Wipro, Honeywell" },
  { name: "VIT Pune", type: "Autonomous", avg: "₹8.5 LPA", highest: "₹40 LPA", rate: "88%", recruiters: "TCS, Infosys, Bajaj Auto, Bosch, Cummins" },
  { name: "PICT Pune", type: "Autonomous", avg: "₹7.5 LPA", highest: "₹35 LPA", rate: "90%", recruiters: "Goldman Sachs, Amazon, Deutsche Bank, Persistent" },
  { name: "MIT-WPU Pune", type: "Deemed", avg: "₹7.2 LPA", highest: "₹38 LPA", rate: "85%", recruiters: "TCS, Wipro, Capgemini, Tech Mahindra, Accenture" },
  { name: "Cummins College", type: "Autonomous", avg: "₹6.8 LPA", highest: "₹28 LPA", rate: "87%", recruiters: "Cummins, Eaton, Emerson, Tata Technologies" },
  { name: "JSPM RSCOE", type: "Private", avg: "₹5.2 LPA", highest: "₹22 LPA", rate: "78%", recruiters: "TCS, Infosys, Wipro, HCL, Hexaware" },
  { name: "AISSMS College", type: "Private", avg: "₹4.8 LPA", highest: "₹20 LPA", rate: "75%", recruiters: "TCS, Wipro, Zensar, Persistent, Cognizant" },
  { name: "Sinhgad College", type: "Private", avg: "₹4.9 LPA", highest: "₹18 LPA", rate: "76%", recruiters: "TCS, Infosys, HCL, Mphasis, NIIT Technologies" },
]

const mbaData = [
  { name: "SIBM Pune", type: "Deemed", avg: "₹28 LPA", highest: "₹65 LPA", rate: "100%", recruiters: "McKinsey, BCG, Goldman Sachs, P&G, Deloitte" },
  { name: "SCMHRD Pune", type: "Deemed", avg: "₹22 LPA", highest: "₹55 LPA", rate: "100%", recruiters: "Amazon, Accenture, Capgemini, EY, KPMG" },
  { name: "SCIT Pune", type: "Deemed", avg: "₹18 LPA", highest: "₹45 LPA", rate: "98%", recruiters: "Microsoft, TCS, Cognizant, Infosys BPM, Wipro" },
  { name: "MIT-SOM Pune", type: "Autonomous", avg: "₹12 LPA", highest: "₹32 LPA", rate: "92%", recruiters: "HDFC Bank, ICICI, Bajaj Finserv, Mahindra, Tata" },
  { name: "BIMM Pune", type: "Autonomous", avg: "₹8.5 LPA", highest: "₹22 LPA", rate: "88%", recruiters: "HDFC, Axis Bank, Reliance, HUL, Aditya Birla" },
  { name: "Indira Institute", type: "Autonomous", avg: "₹7.2 LPA", highest: "₹18 LPA", rate: "85%", recruiters: "Pune-based SMEs, BFSI companies, FMCG firms" },
  { name: "Suryadatta Institute", type: "Private", avg: "₹5.8 LPA", highest: "₹14 LPA", rate: "80%", recruiters: "Local Pune companies, Banking sector, Insurance" },
]

const topRecruiters = [
  { sector: "Technology", companies: "TCS, Infosys, Wipro, Cognizant, HCL, Capgemini, Tech Mahindra, Persistent, Zensar, Mphasis" },
  { sector: "Automotive / Manufacturing", companies: "Bajaj Auto, Tata Motors, Mercedes-Benz, Volkswagen, Bosch, Cummins, L&T, Thermax, Mahindra" },
  { sector: "Consulting", companies: "McKinsey, BCG, Deloitte, KPMG, EY, Accenture, PwC" },
  { sector: "Banking / Finance", companies: "HDFC Bank, ICICI Bank, Goldman Sachs, Deutsche Bank, Citi, Axis Bank, Kotak, Bajaj Finserv" },
  { sector: "FMCG / Consumer", companies: "P&G, HUL, Marico, Nestlé, ITC, Godrej, Aditya Birla Group" },
  { sector: "E-Commerce / Startups", companies: "Amazon, Flipkart, Zomato, Swiggy, Ola, PhonePe, Razorpay, CRED" },
]

const faqs = [
  {
    question: "Which Pune engineering college has the highest average placement package?",
    answer: "COEP Pune (College of Engineering Pune) has the highest average placement package among engineering colleges in Pune at ₹12 LPA (2024–25). SIT Pune (Symbiosis) is second at ₹9.8 LPA avg, followed by VIT Pune at ₹8.5 LPA avg. The highest individual package at Pune engineering colleges is ₹45 LPA at COEP (Mercedes-Benz, international tech firms).",
  },
  {
    question: "Which Pune MBA college has the best placement?",
    answer: "SIBM Pune (Symbiosis Institute of Business Management) has the best MBA placement in Pune with ₹28 LPA average and ₹65 LPA highest package. Top recruiters include McKinsey, BCG, Goldman Sachs, and P&G. SCMHRD Pune is second with ₹22 LPA avg. For best ROI: MIT-SOM Pune gives ₹12 LPA avg at only ₹7–11L total fees.",
  },
  {
    question: "What is the average package at VIT Pune for engineering?",
    answer: "The average placement package at VIT Pune (Vishwakarma Institute of Technology) is ₹8.5 LPA for the 2024–25 batch. The highest package was ₹40 LPA. Top recruiters include Bajaj Auto, Bosch, Cummins, TCS, Infosys, and Capgemini. VIT Pune is particularly strong for Mechanical and Electronics placements in the Pune automotive/manufacturing sector.",
  },
  {
    question: "Do private engineering colleges in Pune have good placements?",
    answer: "Private engineering colleges in Pune have decent but not exceptional placements compared to government/autonomous colleges. JSPM RSCOE averages ₹5.2 LPA, AISSMS averages ₹4.8 LPA, Sinhgad College averages ₹4.9 LPA. Most private college placements are dominated by TCS, Infosys, Wipro, HCL mass recruiters. For better placements, target PICT, VIT Pune, or SIT Pune over generic private colleges.",
  },
  {
    question: "What is the placement percentage at SIBM Pune?",
    answer: "SIBM Pune achieves near 100% placement for its MBA batch. The 2024 batch saw 100% placement with average salary of ₹28 LPA and highest international package of ₹65 LPA. McKinsey, BCG, P&G, Goldman Sachs, and Hindustan Unilever are among the top recruiters visiting SIBM Pune campus annually.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Tools", url: "/pune-college-placement-comparator" },
  { name: "Placement Comparator", url: "/pune-college-placement-comparator" },
]

export default function PuneCollegePlacementComparatorPage() {
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
              <span className="text-white">Placement Comparator</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Pune College Placement Comparator 2026
            </h1>
            <p className="text-blue-200 text-sm max-w-2xl">
              Compare average salary, highest package, and placement % across Pune engineering and MBA colleges. Select up to 4 colleges and see side-by-side bar charts.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Interactive Comparator */}
          <PlacementComparator />

          {/* Engineering Placement Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-8 mb-6">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Engineering College Placements in Pune 2026</h2>
              <p className="text-xs text-gray-400 mt-0.5">Data from 2024–25 placement season. LPA = Lakhs Per Annum.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-right">Avg Package</th>
                    <th className="px-4 py-3 text-right hidden sm:table-cell">Highest</th>
                    <th className="px-4 py-3 text-center hidden md:table-cell">Rate</th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">Top Recruiters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {engineeringData.map((c) => (
                    <tr key={c.name} className="hover:bg-blue-50/20">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        <span className="text-xs text-gray-400">{c.type}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-green-700">{c.avg}</td>
                      <td className="px-4 py-3 text-right text-sm text-orange-700 hidden sm:table-cell">{c.highest}</td>
                      <td className="px-4 py-3 text-center hidden md:table-cell">
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{c.rate}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell">{c.recruiters}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MBA Placement Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">MBA College Placements in Pune 2026</h2>
              <p className="text-xs text-gray-400 mt-0.5">Data from 2024–25 final placements. LPA = Lakhs Per Annum.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-right">Avg Package</th>
                    <th className="px-4 py-3 text-right hidden sm:table-cell">Highest</th>
                    <th className="px-4 py-3 text-center hidden md:table-cell">Rate</th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">Top Recruiters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mbaData.map((c) => (
                    <tr key={c.name} className="hover:bg-orange-50/20">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        <span className="text-xs text-gray-400">{c.type}</span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-green-700">{c.avg}</td>
                      <td className="px-4 py-3 text-right text-sm text-orange-700 hidden sm:table-cell">{c.highest}</td>
                      <td className="px-4 py-3 text-center hidden md:table-cell">
                        <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-semibold">{c.rate}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 hidden lg:table-cell">{c.recruiters}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Recruiters */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Top Recruiters at Pune Colleges by Sector</h2>
            <div className="space-y-3">
              {topRecruiters.map((r) => (
                <div key={r.sector} className="flex flex-col sm:flex-row sm:items-start gap-2">
                  <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0 w-fit">{r.sector}</span>
                  <p className="text-xs text-gray-500 leading-relaxed">{r.companies}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQs — Pune College Placements 2026</h2>
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
              <p className="font-bold text-lg">Want to maximise your placement chances?</p>
              <p className="text-blue-200 text-sm">Get personalised college recommendations based on your profile — free.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/counselling" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                Free Counselling →
              </Link>
              <Link href="/compare" className="flex items-center justify-center gap-2 bg-white text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors">
                Full College Compare →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
