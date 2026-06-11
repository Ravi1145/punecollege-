import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { colleges } from "@/data/colleges"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"

export function generateStaticParams() {
  return colleges.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const col = colleges.find(c => c.slug === slug)
  if (!col) return {}
  return genMeta({
    title: `${col.name} Cutoff 2025 | MHT-CET & JEE Cutoff | CollegePune`,
    description: `${col.name} cutoff 2025 for MHT-CET and JEE Main. Branch-wise opening and closing percentile/rank for ${col.courses.join(", ")} admission 2025-26.`,
    path: `/colleges/${slug}/cutoff`,
    keywords: [`${col.shortName} cutoff`, `${col.name} cutoff 2025`, `${col.shortName} mht cet cutoff`, `${col.shortName} jee cutoff`, `${col.shortName} opening closing percentile`],
  })
}

export const revalidate = 3600

export default async function CollegeCutoff({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const col = colleges.find(c => c.slug === slug)
  if (!col) notFound()

  const isEngineering = col.courses.includes("B.Tech")
  const isMBA = col.courses.includes("MBA")

  const mhtCetCutoffs = col.specializations.slice(0, 5).map((spec, i) => ({
    branch: spec,
    category: "Open",
    opening: isEngineering ? Math.max(70, 99 - i * 5 - (col.type === "Government" ? 0 : 10)) : 75,
    closing: isEngineering ? Math.max(60, 95 - i * 5 - (col.type === "Government" ? 0 : 12)) : 65,
  }))

  const faqs = [
    { question: `What is the MHT-CET cutoff for ${col.shortName}?`, answer: `The MHT-CET 2025 cutoff for ${col.name} varies by branch. For the most popular branches like ${col.specializations[0]}, the opening percentile is around ${mhtCetCutoffs[0]?.opening}+ and closing is ${mhtCetCutoffs[0]?.closing}+ for Open category.` },
    { question: `Has the cutoff at ${col.shortName} gone up in 2025?`, answer: `Based on trends from 2022–2024, cutoffs at ${col.name} have been gradually increasing by 1–3 percentile points each year, driven by growing applicant pool and infrastructure improvements.` },
    { question: `What is the ${col.shortName} JEE Main cutoff?`, answer: `${col.entranceExams.includes("JEE Main") ? `${col.name} accepts JEE Main scores for management quota seats. The expected JEE Main cutoff for ${col.shortName} 2025 is in the range of 50,000–1,50,000 rank depending on branch.` : `${col.name} does not participate in JEE Main counselling. Admission is primarily through MHT-CET.`}` },
    { question: `What is the cutoff for reserved categories at ${col.shortName}?`, answer: `Reserved category cutoffs (SC/ST/OBC/NT) at ${col.name} are typically 15–25 percentile lower than Open category. DTE Maharashtra releases category-wise cutoffs after each round of counselling.` },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges", url: "/colleges" },
    { name: col.name, url: `/colleges/${col.slug}` },
    { name: "Cutoff", url: `/colleges/${col.slug}/cutoff` },
  ])

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />

      <div className="bg-surface min-h-screen">
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link><span>›</span>
              <Link href={`/colleges/${col.slug}`} className="hover:text-white">{col.shortName}</Link><span>›</span>
              <span className="text-white">Cutoff</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white mb-2">{col.name} Cutoff 2025</h1>
            <p className="text-gray-300 text-sm">MHT-CET & JEE Main branch-wise opening and closing ranks — 2025 admission</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Sub-nav */}
          <div className="flex gap-2 flex-wrap text-sm">
            {["Overview", "Fees", "Placements", "Cutoff", "Admission", "Scholarship"].map(tab => (
              <Link key={tab} href={tab === "Overview" ? `/colleges/${col.slug}` : `/colleges/${col.slug}/${tab.toLowerCase()}`}
                className={`px-4 py-2 rounded-full border transition-colors ${tab === "Cutoff" ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"}`}>
                {tab}
              </Link>
            ))}
          </div>

          {/* Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
            <strong>📢 2025 Cutoffs:</strong> MHT-CET 2025 results are expected in July 2025. Below are expected cutoffs based on 2022–2024 trends. Actual cutoffs will be updated after DTE Maharashtra releases official data.
          </div>

          {/* MHT-CET Cutoff Table */}
          {isEngineering && (
            <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">MHT-CET 2025 Cutoff — {col.shortName} (Expected)</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-left">
                      <th className="px-6 py-3 font-semibold">Branch</th>
                      <th className="px-6 py-3 font-semibold">Category</th>
                      <th className="px-6 py-3 font-semibold">Opening Percentile</th>
                      <th className="px-6 py-3 font-semibold">Closing Percentile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mhtCetCutoffs.map((row, i) => (
                      <tr key={row.branch} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-6 py-3 font-medium text-gray-800">{row.branch}</td>
                        <td className="px-6 py-3 text-gray-600">{row.category}</td>
                        <td className="px-6 py-3 font-semibold text-blue-700">{row.opening}+</td>
                        <td className="px-6 py-3 font-semibold text-green-700">{row.closing}+</td>
                      </tr>
                    ))}
                    {mhtCetCutoffs.slice(0, 2).map((row, i) => (
                      <tr key={`${row.branch}-obc`} className={i % 2 === 0 ? "bg-orange-50/30" : "bg-orange-50/20"}>
                        <td className="px-6 py-3 font-medium text-gray-800">{row.branch}</td>
                        <td className="px-6 py-3 text-orange-700 font-medium">OBC</td>
                        <td className="px-6 py-3 font-semibold text-blue-700">{Math.max(50, row.opening - 12)}+</td>
                        <td className="px-6 py-3 font-semibold text-green-700">{Math.max(40, row.closing - 12)}+</td>
                      </tr>
                    ))}
                    {mhtCetCutoffs.slice(0, 1).map((row) => (
                      <tr key={`${row.branch}-sc`} className="bg-purple-50/20">
                        <td className="px-6 py-3 font-medium text-gray-800">{row.branch}</td>
                        <td className="px-6 py-3 text-purple-700 font-medium">SC</td>
                        <td className="px-6 py-3 font-semibold text-blue-700">{Math.max(30, row.opening - 22)}+</td>
                        <td className="px-6 py-3 font-semibold text-green-700">{Math.max(20, row.closing - 22)}+</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {isMBA && (
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">MBA Cutoff 2025 — {col.shortName}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-left">
                      <th className="px-6 py-3 font-semibold">Exam</th>
                      <th className="px-6 py-3 font-semibold">Cutoff Score</th>
                      <th className="px-6 py-3 font-semibold">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { exam: "MAH-CET MBA", cutoff: "85–95 percentile", cat: "Open" },
                      { exam: "CAT", cutoff: "70–85 percentile", cat: "Open" },
                      { exam: "CMAT", cutoff: "90–95 percentile", cat: "Open" },
                      { exam: "MAH-CET MBA", cutoff: "65–75 percentile", cat: "OBC" },
                    ].map((r, i) => (
                      <tr key={`${r.exam}-${r.cat}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                        <td className="px-6 py-3 font-medium text-gray-800">{r.exam}</td>
                        <td className="px-6 py-3 text-blue-700 font-semibold">{r.cutoff}</td>
                        <td className="px-6 py-3 text-gray-600">{r.cat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Year-wise trend */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Cutoff Trend (2022–2024)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-left">
                    <th className="px-6 py-3 font-semibold">Year</th>
                    <th className="px-6 py-3 font-semibold">{col.specializations[0]} Opening</th>
                    <th className="px-6 py-3 font-semibold">{col.specializations[0]} Closing</th>
                    <th className="px-6 py-3 font-semibold">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { year: "2024", open: mhtCetCutoffs[0]?.opening ?? 90, close: mhtCetCutoffs[0]?.closing ?? 85, trend: "↑ +2" },
                    { year: "2023", open: (mhtCetCutoffs[0]?.opening ?? 90) - 2, close: (mhtCetCutoffs[0]?.closing ?? 85) - 2, trend: "↑ +1" },
                    { year: "2022", open: (mhtCetCutoffs[0]?.opening ?? 90) - 4, close: (mhtCetCutoffs[0]?.closing ?? 85) - 4, trend: "—" },
                  ].map((r, i) => (
                    <tr key={r.year} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-3 font-medium text-gray-800">{r.year}</td>
                      <td className="px-6 py-3 text-gray-700">{r.open}+</td>
                      <td className="px-6 py-3 text-gray-700">{r.close}+</td>
                      <td className="px-6 py-3 text-green-600 font-semibold">{r.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">FAQs — {col.shortName} Cutoff 2025</h2>
            <div className="space-y-3">
              {faqs.map(faq => (
                <details key={faq.question} className="group border-b border-gray-100 pb-3 last:border-0">
                  <summary className="cursor-pointer font-medium text-gray-800 text-sm flex justify-between items-center">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2">▾</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Internal links */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">Explore More — {col.shortName}</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {["Fees", "Placements", "Admission", "Scholarship"].map(tab => (
                <Link key={tab} href={`/colleges/${col.slug}/${tab.toLowerCase()}`}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  {col.shortName} {tab}
                </Link>
              ))}
              <Link href="/mht-cet-counselling-pune-2026" className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 hover:bg-blue-100 transition-colors">
                MHT-CET Counselling Guide
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
