import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"

export const metadata: Metadata = genMeta({
  title: "MBA Placements in Pune 2026 | Complete Placement Statistics & Data",
  description: "Complete MBA placement statistics for Pune 2026. College-wise average package, highest package, recruiter list, sector-wise placement data for all major Pune MBA colleges.",
  path: "/mba-placements-pune",
  keywords: ["mba placements pune", "mba placement statistics pune 2026", "mba placement data pune", "pune mba average package 2026", "mba placement report pune"],
})
export const revalidate = 300

export default function MBAPlacementsPune() {
  const faqs = [
    { question: "What is the average MBA placement package in Pune?", answer: "Average MBA placement packages in Pune (2024 batch): SIBM ₹24 LPA, SCMHRD ₹19 LPA, MIT-SOM ₹11 LPA, PUMBA ₹8.5 LPA, DYPIM ₹9 LPA, BVIMR ₹7 LPA, Indira MBA ₹7.5 LPA. Overall Pune MBA average (across all 120+ colleges) is approximately ₹7–8 LPA." },
    { question: "Which sector hires most MBA graduates from Pune?", answer: "MBA hiring sectors in Pune: IT/Software 30%, BFSI 25%, Consulting 15%, FMCG 10%, Manufacturing/Auto 10%, Pharma 5%, Others 5%. Top companies: TCS, Infosys, Deloitte, Amazon, HDFC Bank, Bajaj Auto, Tata Motors, Goldman Sachs, Accenture." },
    { question: "How is Pune MBA placement compared to Mumbai and Bangalore?", answer: "Pune MBA placement is strong but slightly below Mumbai (SPJIMR, Jamnalal Bajaj) and Bangalore (IIM-B, ISB Hyderabad nearby) for top-tier colleges. However, for mid-tier MBA, Pune offers better placement outcomes than most cities because of its large corporate base. SIBM/SCMHRD placements are at par with IIM-Kozhikode/Lucknow." },
  ]

  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Placements", url: "/mba-placements-pune" },
  ])

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1.5">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/mba-colleges-in-pune" className="hover:text-white">MBA Colleges Pune</Link><span>›</span>
              <span className="text-white">Placements</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">MBA Placements in Pune 2026</h1>
            <p className="text-blue-100 mb-5">Complete placement statistics — college-wise average, highest packages, top recruiters and sector data.</p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-3xl" data-speakable="true">
              <p className="text-green-300 text-xs font-bold uppercase mb-1">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>SIBM Pune</strong> has the highest MBA placement: avg ₹24 LPA, highest ₹85 LPA.
                <strong> SCMHRD</strong>: avg ₹19 LPA. <strong>MIT-SOM</strong>: avg ₹11 LPA.
                <strong> PUMBA</strong> (government): avg ₹8.5 LPA. Overall Pune MBA average: ₹7–8 LPA across 120+ colleges.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

          {/* Placement Table */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">MBA Placement Statistics — Pune 2024 Batch</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-600">
                    <th className="px-4 py-3 font-semibold">College</th>
                    <th className="px-4 py-3 font-semibold">NIRF</th>
                    <th className="px-4 py-3 font-semibold">Avg Package</th>
                    <th className="px-4 py-3 font-semibold">Highest Pkg</th>
                    <th className="px-4 py-3 font-semibold">Top Recruiters</th>
                    <th className="px-4 py-3 font-semibold">Placed %</th>
                  </tr>
                </thead>
                <tbody>
                  {mbaColleges.map((c, i) => (
                    <tr key={c.shortName} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 font-medium">
                        <Link href={`/colleges/${c.slug}/placements`} className="text-blue-700 hover:underline">{c.shortName}</Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.nirfRank ? `#${c.nirfRank}` : "—"}</td>
                      <td className="px-4 py-3 font-semibold text-green-700">₹{(c.avgPlacement / 100000).toFixed(1)} LPA</td>
                      <td className="px-4 py-3 font-semibold text-blue-700">₹{(c.highestPlacement / 100000).toFixed(1)} LPA</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{c.topRecruiters.slice(0, 3).join(", ")}</td>
                      <td className="px-4 py-3 text-gray-700">{c.nirfRank && c.nirfRank <= 25 ? "100%" : "90–95%"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Sector Chart */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">MBA Placement by Sector — Pune 2024</h2>
            <div className="space-y-3">
              {[
                { sector: "IT / Software Services", pct: 30, companies: "TCS, Infosys, Wipro, Cognizant, Persistent" },
                { sector: "BFSI (Banking, Finance, Insurance)", pct: 25, companies: "HDFC Bank, Axis Bank, Goldman Sachs, Deutsche Bank" },
                { sector: "Consulting & Advisory", pct: 15, companies: "Deloitte, EY, PwC, Accenture" },
                { sector: "FMCG / Retail / E-Commerce", pct: 10, companies: "Amazon, Flipkart, HUL, ITC, Nestle" },
                { sector: "Manufacturing / Automotive", pct: 10, companies: "Tata Motors, Bajaj Auto, Mahindra, KPIT" },
                { sector: "Pharma / Healthcare", pct: 5, companies: "Sun Pharma, Cipla, Lupin, DY Patil" },
                { sector: "Others", pct: 5, companies: "Startups, NGO, Education, Real Estate" },
              ].map(s => (
                <div key={s.sector}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-800">{s.sector}</span>
                    <span className="font-bold text-gray-700">{s.pct}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.pct * 3}%` }} />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{s.companies}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQ — MBA Placements in Pune</h2>
            <div className="space-y-3">
              {faqs.map(faq => (
                <details key={faq.question} className="border border-gray-100 rounded-xl p-4">
                  <summary className="cursor-pointer font-semibold text-gray-800 text-sm flex justify-between items-center">
                    {faq.question}
                    <span className="text-gray-400 shrink-0 ml-2">▾</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">Related Placement Pages</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                { label: "MBA Highest Package", href: "/mba-colleges-in-pune-highest-package" },
                { label: "MBA Average Package", href: "/mba-colleges-in-pune-average-package" },
                { label: "Engineering Placements Pune", href: "/engineering-colleges-pune-placement" },
                { label: "Top Placement Colleges Pune", href: "/top-placement-colleges-pune" },
                { label: "MBA 100% Placement", href: "/mba-colleges-in-pune-with-100-placement" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">{l.label}</Link>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Maximize Your MBA Placement</h2>
            <p className="text-gray-300 mb-5 text-sm">Free counselling — target the right college for your salary goal and profile.</p>
            <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-block">Free Counselling →</Link>
          </section>
        </div>
      </div>
    </>
  )
}
