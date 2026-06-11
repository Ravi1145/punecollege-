import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { btechColleges } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"

export const metadata: Metadata = genMeta({
  title: "BTech Colleges in Pune with Best Placement 2026 | Avg & Highest Packages",
  description: "BTech colleges in Pune with highest placement packages 2026. COEP (₹12 LPA avg), SIT Pune (₹9.8 LPA), VIT Pune (₹8.5 LPA). Top recruiters, sector-wise data and placement statistics.",
  path: "/btech-colleges-in-pune-with-placement",
  keywords: [
    "btech colleges in pune with placement", "btech placement pune 2026",
    "engineering college placement pune", "best placement engineering pune",
    "btech highest package pune", "engineering college average package pune",
  ],
})
export const revalidate = 300

const faqs = [
  { question: "Which BTech college in Pune has the best placement?", answer: "COEP has the best overall BTech placement with ₹12 LPA average and companies like Volkswagen, Cummins, and L&T. SIT Pune leads private colleges at ₹9.8 LPA average with Microsoft and Amazon on campus. PICT has the best CS/IT placement rate (98%+) with Goldman Sachs and Deutsche Bank." },
  { question: "What is the average BTech placement package in Pune?", answer: "BTech placement averages in Pune (2024 batch): COEP ₹12 LPA, SIT Pune ₹9.8 LPA, VIT Pune ₹8.5 LPA, PICT ₹7.5 LPA, MIT-WPU ₹7.2 LPA, PCCOE ₹6.5 LPA, DYPCOE ₹5.1 LPA. CS/IT branch typically earns 30–50% more than the college average across all branches." },
  { question: "What is the highest BTech package from Pune colleges?", answer: "Highest BTech packages from Pune (2024): SIT Pune ₹42 LPA (Microsoft), COEP ₹45 LPA (product company), PICT ₹42 LPA (Goldman Sachs), VIT Pune ₹35 LPA, MIT-WPU ₹32 LPA. These outlier packages go to top CS/IT students placed at product companies and investment banks." },
  { question: "Which companies recruit from BTech colleges in Pune?", answer: "Top BTech recruiters in Pune: IT sector — TCS, Infosys, Wipro, Capgemini, Persistent, Zensar. Product companies — Amazon, Microsoft, Goldman Sachs, Deutsche Bank (PICT), Barclays. Manufacturing — L&T, Cummins, Tata Motors, Bajaj Auto (via COEP). Auto tech — KPIT, Bosch, Volkswagen. Defence — DRDO, HAL (COEP alumni)." },
  { question: "Is BTech placement from Pune colleges good compared to other cities?", answer: "Pune BTech placement is comparable to top colleges in Hyderabad and Bangalore for mid-tier colleges. COEP and PICT outcomes rival NIT Tier-1 colleges for core engineering. Pune's unique advantage is diverse placement across IT, manufacturing, auto, finance, and defence sectors — not just IT like Bengaluru-focused colleges." },
]

export default function BTechWithPlacement() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
    { name: "BTech Placements", url: "/btech-colleges-in-pune-with-placement" },
  ])
  const sortedByPlacement = [...btechColleges].sort((a, b) => b.avgPlacement - a.avgPlacement)

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1.5">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/btech-colleges-in-pune" className="hover:text-white">BTech Colleges Pune</Link><span>›</span>
              <span className="text-white">Placements</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">BTech Colleges in Pune with Best Placements 2026</h1>
            <p className="text-blue-100 mb-5">College-wise average package, highest package, top recruiters and placement rate for Pune BTech colleges.</p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-3xl" data-speakable="true">
              <p className="text-green-300 text-xs font-bold uppercase mb-1">⚡ Quick Answer</p>
              <p className="text-white text-sm">
                <strong>COEP</strong> has the best BTech placement: avg ₹12 LPA, highest ₹45 LPA. <strong>SIT Pune</strong> leads private colleges: avg ₹9.8 LPA, Microsoft/Amazon on campus. <strong>PICT</strong> has 98%+ placement rate with Goldman Sachs. All three have consistent 100% eligible student placement records.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {[{ v: "₹12 LPA", l: "COEP Avg Pkg" }, { v: "₹9.8 LPA", l: "SIT Avg Pkg" }, { v: "98%+", l: "PICT Place Rate" }, { v: "₹45 LPA", l: "Highest Pkg" }]
                .map(s => (
                  <div key={s.l} className="bg-white/10 rounded-xl px-4 py-3 text-center">
                    <p className="text-xl font-extrabold text-orange-400">{s.v}</p>
                    <p className="text-xs text-white/70 mt-0.5">{s.l}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

          {/* Placement Table */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">BTech Placement Statistics — Pune 2024 Batch</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-600">
                    <th className="px-4 py-3 font-semibold">College</th>
                    <th className="px-4 py-3 font-semibold">Avg Package</th>
                    <th className="px-4 py-3 font-semibold">Highest Pkg</th>
                    <th className="px-4 py-3 font-semibold">Placed %</th>
                    <th className="px-4 py-3 font-semibold">Top 3 Recruiters</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedByPlacement.map((c, i) => (
                    <tr key={c.shortName} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 font-medium">
                        <Link href={`/colleges/${c.slug}/placements`} className="text-blue-700 hover:underline">{c.shortName}</Link>
                      </td>
                      <td className="px-4 py-3 font-semibold text-green-700">₹{(c.avgPlacement / 100000).toFixed(1)} LPA</td>
                      <td className="px-4 py-3 font-semibold text-blue-700">₹{(c.highestPlacement / 100000).toFixed(1)} LPA</td>
                      <td className="px-4 py-3 text-gray-700">{c.nirfRank ? "95–100%" : "85–95%"}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{c.topRecruiters.slice(0, 3).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQs — BTech Placements in Pune</h2>
            <div className="space-y-0 divide-y divide-gray-100">
              {faqs.map((faq, i) => (
                <details key={faq.question} className="group py-4" open={i === 0}>
                  <summary className="cursor-pointer flex items-start justify-between gap-4 list-none">
                    <h3 className="text-sm font-semibold text-gray-800">{faq.question}</h3>
                    <span className="text-gray-400 shrink-0 text-xs mt-0.5">▾</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">Related Pages</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Engineering Placements Pune", href: "/engineering-colleges-pune-placement" },
                { label: "Best BTech Colleges Pune", href: "/best-btech-colleges-in-pune" },
                { label: "BTech Fees Pune", href: "/btech-colleges-in-pune-with-fees" },
                { label: "Top Placement Colleges", href: "/top-placement-colleges-pune" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">{l.label}</Link>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Target ₹10+ LPA After BTech from Pune?</h2>
            <p className="text-gray-300 mb-5 text-sm">Free counselling — plan your college choice and branch to maximize placement outcomes.</p>
            <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg inline-block">Free Counselling →</Link>
          </section>
        </div>
      </div>
    </>
  )
}
