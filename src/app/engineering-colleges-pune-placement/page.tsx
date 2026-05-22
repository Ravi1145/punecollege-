import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { TrendingUp, ExternalLink } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Best Engineering Colleges in Pune for Placements 2026 | Package Data",
  description:
    "Compare average & highest placement packages of top Pune engineering colleges 2026. COEP ₹12 LPA avg, SIT Pune ₹9.8 LPA, VIT Pune ₹8.5 LPA. Top recruiters, placement % & salary data.",
  path: "/engineering-colleges-pune-placement",
  keywords: [
    "best engineering colleges in pune with placement",
    "top placement engineering colleges pune",
    "colleges with best placement pune engineering",
    "colleges with 100% placement pune engineering",
    "highest placement engineering colleges pune",
    "average package engineering colleges pune",
    "campus placement engineering colleges pune",
  ],
})

const placementData = [
  { rank: 1, name: "College of Engineering Pune (COEP)", type: "Government", avg: "₹12 LPA", highest: "₹45 LPA", rate: "92%", slug: "coep-college-of-engineering-pune", recruiters: "TCS Digital, Bajaj Auto, Mercedes-Benz, Siemens, L&T, Volkswagen" },
  { rank: 2, name: "Symbiosis Institute of Technology (SIT Pune)", type: "Deemed", avg: "₹9.8 LPA", highest: "₹42 LPA", rate: "94%", slug: "symbiosis-institute-of-technology-pune", recruiters: "Google, Microsoft, Capgemini, Wipro, Honeywell, Amazon" },
  { rank: 3, name: "Vishwakarma Institute of Technology (VIT Pune)", type: "Autonomous", avg: "₹8.5 LPA", highest: "₹40 LPA", rate: "88%", slug: "vit-pune-vishwakarma-institute-of-technology", recruiters: "TCS, Infosys, Bajaj Auto, Bosch, Cummins, Tata Technologies" },
  { rank: 4, name: "Pune Institute of Computer Technology (PICT)", type: "Autonomous", avg: "₹7.5 LPA", highest: "₹35 LPA", rate: "90%", slug: "pict-pune-institute-of-computer-technology", recruiters: "Goldman Sachs, Amazon, Deutsche Bank, Persistent, JPMC" },
  { rank: 5, name: "MIT World Peace University (MIT-WPU)", type: "Deemed", avg: "₹7.2 LPA", highest: "₹38 LPA", rate: "85%", slug: "mit-wpu-mit-world-peace-university", recruiters: "TCS, Wipro, Capgemini, Tech Mahindra, Accenture, Mindtree" },
  { rank: 6, name: "Cummins College of Engineering for Women", type: "Autonomous", avg: "₹6.8 LPA", highest: "₹28 LPA", rate: "87%", slug: "cummins-college-of-engineering-pune", recruiters: "Cummins India, Eaton, Emerson, Tata Technologies, KPIT" },
  { rank: 7, name: "JSPM Rajarshi Shahu College of Engineering", type: "Private", avg: "₹5.2 LPA", highest: "₹22 LPA", rate: "78%", slug: "jspm-rscoe-rajarshi-shahu-college-of-engineering", recruiters: "TCS, Infosys, Wipro, HCL, Hexaware, Mphasis" },
  { rank: 8, name: "AISSMS College of Engineering", type: "Private", avg: "₹4.8 LPA", highest: "₹20 LPA", rate: "75%", slug: "aissms-college-of-engineering-pune", recruiters: "TCS, Wipro, Zensar, Persistent, Cognizant, L&T Infotech" },
  { rank: 9, name: "Sinhgad College of Engineering", type: "Private", avg: "₹4.9 LPA", highest: "₹18 LPA", rate: "76%", slug: "sinhgad-college-of-engineering-pune", recruiters: "TCS, Infosys, HCL, Mphasis, NIIT Technologies" },
  { rank: 10, name: "Bharati Vidyapeeth College of Engineering", type: "Deemed", avg: "₹5.6 LPA", highest: "₹22 LPA", rate: "80%", slug: "bharati-vidyapeeth-college-engineering-pune", recruiters: "TCS, Wipro, Infosys, Capgemini, Persistent" },
]

const topRecruiters = [
  { sector: "IT / Software", companies: ["TCS", "Infosys", "Wipro", "Cognizant", "HCL", "Capgemini", "Tech Mahindra", "Persistent", "Zensar"] },
  { sector: "Automotive / Manufacturing", companies: ["Bajaj Auto", "Tata Motors", "Mercedes-Benz", "Volkswagen", "Bosch", "Cummins", "L&T", "Thermax", "KPIT"] },
  { sector: "Finance / BFSI", companies: ["Goldman Sachs", "Deutsche Bank", "JPMC", "HDFC Bank", "Axis Bank", "Bajaj Finserv"] },
  { sector: "Consulting / Services", companies: ["Accenture", "Deloitte", "EY", "PwC", "McKinsey (select)", "BCG Digital"] },
]

const faqs = [
  {
    question: "Which engineering college in Pune has the best placement package?",
    answer: "COEP Pune (College of Engineering Pune) has the best average placement package at ₹12 LPA with a highest package of ₹45 LPA. SIT Pune (Symbiosis) is the best private/deemed college for placements at ₹9.8 LPA avg. For CS/IT specifically, PICT Pune offers excellent placements at top tech firms like Goldman Sachs and Amazon (₹7.5 LPA avg).",
  },
  {
    question: "What is the average placement package at engineering colleges in Pune?",
    answer: "Average placement packages at Pune engineering colleges vary by type: Government (COEP): ₹12 LPA avg. Autonomous private (VIT Pune, PICT): ₹7.5–8.5 LPA avg. Deemed (SIT Pune): ₹9.8 LPA avg. Private (JSPM, AISSMS, Sinhgad): ₹4.8–5.6 LPA avg. The citywide average across all Pune engineering colleges is approximately ₹6–7 LPA.",
  },
  {
    question: "Do engineering colleges in Pune have 100% placement?",
    answer: "No Pune engineering college guarantees 100% placement. SIT Pune has the highest placement rate at 94%. COEP achieves around 92%. PICT achieves about 90%. Private colleges like JSPM and AISSMS place 75–80% of their students. Note: placement percentage includes all offers — many students choose higher studies, government jobs, or self-employment, which reduces the overall figure.",
  },
  {
    question: "Which companies recruit from Pune engineering colleges?",
    answer: "Top recruiters at Pune engineering colleges: IT sector — TCS, Infosys, Wipro, Cognizant, HCL, Capgemini, Persistent. Manufacturing/Auto — Bajaj Auto, L&T, Bosch, Cummins, Tata Motors, Mercedes-Benz. Finance — Goldman Sachs (PICT), Deutsche Bank. Consulting — Accenture, Deloitte. Mass recruiters (all colleges): TCS, Wipro, Infosys. Premium recruiters (COEP, PICT, VIT Pune): Goldman Sachs, Google, Microsoft.",
  },
  {
    question: "Is campus placement mandatory at engineering colleges in Pune?",
    answer: "Campus placement is optional at all Pune engineering colleges. The Training & Placement (T&P) cell facilitates company visits and drives — students choose whether to sit for placements. At top colleges like COEP and SIT Pune, participation rates are very high (80–90%). Many CS/IT students at PICT prefer off-campus opportunities at startups over campus drives.",
  },
  {
    question: "What is the average engineering salary in Pune for freshers?",
    answer: "Fresher engineering salary in Pune (2025): Computer Science/IT graduates from top colleges (COEP, PICT): ₹7–15 LPA. CS graduates from private colleges: ₹3.5–6 LPA. Mechanical/Civil from government colleges: ₹4–8 LPA. Mechanical from private colleges: ₹3–5 LPA. The highest-paying roles are in software development, data science, and VLSI design at MNCs.",
  },
  {
    question: "Which is better for placements — VIT Pune or PICT Pune?",
    answer: "PICT Pune (average ₹7.5 LPA, highest ₹35 LPA) and VIT Pune (average ₹8.5 LPA, highest ₹40 LPA) are comparable. VIT Pune has a slightly higher average due to strong Mechanical/Electronics placements in the auto sector. PICT Pune has better CS/IT-specific placements (Goldman Sachs, Deutsche Bank, JPMC). For software jobs, PICT is preferred; for core/manufacturing, VIT Pune is stronger.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Engineering Colleges Pune", url: "/engineering-colleges-pune" },
  { name: "Best for Placements", url: "/engineering-colleges-pune-placement" },
]

export default function EngineeringCollegesPunePlacementPage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Engineering Colleges in Pune for Placements 2026",
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
              <Link href="/engineering-colleges-pune" className="hover:text-white">Engineering Colleges Pune</Link>
              <span>›</span>
              <span className="text-white">Best for Placements</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Best Engineering Colleges in Pune for Placements 2026
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Ranked by average placement package, highest package, placement rate, and top recruiters. Data from 2024–25 placement season.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>COEP Pune</strong> has the best average placement (₹12 LPA avg, ₹45 LPA highest) among all Pune engineering colleges. <strong>SIT Pune</strong> is the top private/deemed college (₹9.8 LPA avg). <strong>PICT Pune</strong> is best specifically for CS/IT placements (Goldman Sachs, Amazon, Deutsche Bank). Top recruiters: TCS, Bajaj Auto, Mercedes-Benz, Goldman Sachs, Google.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Best Avg Package", value: "₹12 LPA", icon: "📈", note: "COEP Pune" },
              { label: "Highest Package", value: "₹45 LPA", icon: "🏆", note: "COEP Pune" },
              { label: "Best Placement Rate", value: "94%", icon: "✅", note: "SIT Pune" },
              { label: "Top Recruiter", value: "TCS / Bajaj", icon: "🏢", note: "All colleges" },
            ].map(({ label, value, icon, note }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-lg font-extrabold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                <p className="text-xs text-orange-600 font-medium">{note}</p>
              </div>
            ))}
          </div>

          {/* Placement Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Engineering College Placement Rankings — Pune 2026</h2>
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
                        <p className="font-semibold text-gray-900">{c.name}</p>
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
              <TrendingUp className="w-5 h-5 text-orange-500" /> Top Recruiters at Pune Engineering Colleges
            </h2>
            <div className="space-y-3">
              {topRecruiters.map((r) => (
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
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQs — Engineering Placements in Pune 2026</h2>
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
              <p className="font-bold text-lg">Want to maximise your placement chances?</p>
              <p className="text-blue-200 text-sm">Get personalised college recommendations based on your MHT-CET/JEE score.</p>
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
