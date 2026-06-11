import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"

export const metadata: Metadata = genMeta({
  title: "MBA Cutoff Pune 2026 | MAH-CET MBA, CAT & SNAP Cutoffs All Colleges",
  description: "MBA cutoff 2026 for all Pune colleges. MAH-CET MBA, CAT, SNAP, CMAT cutoffs for SIBM, SCMHRD, PUMBA, MIT-SOM and 120+ Pune MBA colleges. Category-wise cutoffs.",
  path: "/mba-cutoff-pune",
  keywords: ["mba cutoff pune", "mba college cutoff pune 2026", "mah cet mba cutoff pune 2026", "cat cutoff mba pune", "snap cutoff pune", "pumba cutoff", "sibm cutoff"],
})
export const revalidate = 300

export default function MBACutoffPune() {
  const faqs = [
    { question: "What is the MAH-CET MBA cutoff for Pune colleges 2026?", answer: "MAH-CET MBA 2026 cutoffs for Pune (Open category): PUMBA 95+ percentile, MIT-SOM 85-95, DYPIM 75-85, BVIMR 65-75, Indira MBA 70-80. These are expected cutoffs based on 2022-2025 trends. Official cutoffs will be released by DTE Maharashtra after CAP rounds." },
    { question: "What is the SNAP cutoff for SIBM Pune 2026?", answer: "SNAP cutoff for SIBM Pune 2026 (expected): 95+ percentile overall SNAP score. Additionally, SIBM shortlists based on SNAP score + WAT + PI. CAT 90+ percentile is an alternative. SIBM's overall acceptance rate is ~3-5% of applicants." },
    { question: "What is the MAH-CET cutoff for PUMBA MBA?", answer: "PUMBA (Pune University MBA) MAH-CET cutoff: 95+ percentile for Open category, 85+ for OBC, 75+ for SC, 65+ for ST. This is one of the highest cutoffs among Maharashtra MBA colleges because PUMBA has limited seats (~120) and very high demand due to low fees (₹1.25L/yr)." },
    { question: "What is the MBA cutoff for 50 percentile in Pune?", answer: "With 50 percentile in MAH-CET MBA, you can get admission in 3rd or 4th CAP round in many private SPPU-affiliated MBA colleges in Pune. These colleges have reasonable NAAC grades and placement records. Direct admission/management quota is also possible at 50 percentile at many private Pune MBA colleges." },
    { question: "How is MBA cutoff decided in Maharashtra?", answer: "MBA cutoffs in Maharashtra (for CAP seats) are determined by DTE Maharashtra based on: MAH-CET percentile, category (Open/OBC/SC/ST/NT/EBC), domicile (Maharashtra/non-Maharashtra), and preference order. After each CAP round, the lowest percentile admitted = that round's closing cutoff. Cutoffs typically drop 2-5 percentile in each subsequent round." },
  ]

  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "MBA Cutoff Pune", url: "/mba-cutoff-pune" },
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
              <span className="text-white">MBA Cutoff Pune</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">MBA Cutoff Pune 2026</h1>
            <p className="text-blue-100 mb-5">MAH-CET MBA, CAT, SNAP & CMAT cutoffs for all major Pune MBA colleges. Category-wise data.</p>
            <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-4 max-w-3xl">
              <p className="text-yellow-200 text-xs font-bold uppercase mb-1">📢 Notice</p>
              <p className="text-white text-sm">MAH-CET MBA 2026 results expected June 2026. Cutoffs below are based on 2022–2025 trends. Actual DTE Maharashtra cutoffs will be updated live after each CAP round.</p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

          {/* MAH-CET Cutoff Table */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">MAH-CET MBA Cutoff 2026 — Pune Colleges (Expected)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-600">
                    <th className="px-4 py-3 font-semibold">College</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Open</th>
                    <th className="px-4 py-3 font-semibold">OBC</th>
                    <th className="px-4 py-3 font-semibold">SC/ST</th>
                    <th className="px-4 py-3 font-semibold">CAP Round</th>
                  </tr>
                </thead>
                <tbody>
                  {mbaColleges.filter(c => c.mahCetCutoff).map((c, i) => (
                    <tr key={c.shortName} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 font-medium">
                        <Link href={`/colleges/${c.slug}`} className="text-blue-700 hover:underline">{c.shortName}</Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.type}</td>
                      <td className="px-4 py-3 font-semibold text-blue-700">{c.mahCetCutoff}</td>
                      <td className="px-4 py-3 text-gray-600">{c.mahCetCutoff ? `${parseInt(c.mahCetCutoff) - 10}–${parseInt(c.mahCetCutoff) + 5}` : "—"}</td>
                      <td className="px-4 py-3 text-gray-600">Lower by 20–25 pts</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">Round 1</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SNAP Cutoff */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">SNAP Cutoff 2026 — Symbiosis MBA Colleges Pune</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-600">
                    <th className="px-4 py-3 font-semibold">College</th>
                    <th className="px-4 py-3 font-semibold">SNAP Cutoff (Expected)</th>
                    <th className="px-4 py-3 font-semibold">Selection Process</th>
                    <th className="px-4 py-3 font-semibold">Avg Package</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "SIBM Pune", snap: "95+ percentile", process: "SNAP + WAT + PI", avg: "₹24 LPA" },
                    { name: "SCMHRD", snap: "90+ percentile", process: "SNAP + GE + PI", avg: "₹19 LPA" },
                    { name: "SIIB Pune", snap: "85+ percentile", process: "SNAP + GE + PI", avg: "₹14 LPA" },
                    { name: "SIMMC Pune", snap: "75+ percentile", process: "SNAP + PI", avg: "₹10 LPA" },
                  ].map((r, i) => (
                    <tr key={r.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                      <td className="px-4 py-3 font-semibold text-blue-700">{r.snap}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{r.process}</td>
                      <td className="px-4 py-3 font-semibold text-green-700">{r.avg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CAT Cutoff */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">CAT Cutoff 2025-26 — Top MBA Colleges Pune</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-600">
                    <th className="px-4 py-3 font-semibold">College</th>
                    <th className="px-4 py-3 font-semibold">CAT Cutoff</th>
                    <th className="px-4 py-3 font-semibold">Use of CAT</th>
                  </tr>
                </thead>
                <tbody>
                  {mbaColleges.filter(c => c.catCutoff).map((c, i) => (
                    <tr key={c.shortName} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 font-medium text-gray-800">{c.shortName}</td>
                      <td className="px-4 py-3 font-semibold text-blue-700">{c.catCutoff}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{c.type === "Deemed" ? "Primary exam" : "Alternative to MAH-CET"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQ — MBA Cutoff in Pune 2026</h2>
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

          <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">Related Pages</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                { label: "MBA Admission Process Pune", href: "/mba-admission-process-pune" },
                { label: "MBA Accepting MAH-CET", href: "/mba-colleges-in-pune-accepting-mh-cet" },
                { label: "MBA Accepting CAT", href: "/mba-colleges-in-pune-accepting-cat" },
                { label: "MBA 50 Percentile Colleges", href: "/mba-colleges-in-pune-cutoff-50-percentile" },
                { label: "MBA Direct Admission", href: "/mba-colleges-in-pune-direct-admission" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">{l.label}</Link>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Know Your Cutoff Range? Get Your College List</h2>
            <p className="text-gray-300 mb-5 text-sm">Free counselling — get personalised MBA college predictions based on your MAH-CET/CAT score.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/predictor" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg">College Predictor →</Link>
              <Link href="/counselling" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg">Free Counselling</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
