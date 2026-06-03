import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta } from "@/lib/seo"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "SIBM vs SCMHRD Pune 2026 | MBA Fees, CAT Cutoff & Placement Comparison",
  description: "SIBM vs SCMHRD Pune 2026: Compare MBA fees (₹16–22L vs ₹14–18L), SNAP/CAT cutoffs, placements (₹28 LPA vs ₹24 LPA), campus, specialisations & admission process.",
  path: "/sibm-vs-scmhrd-pune",
  keywords: [
    "sibm vs scmhrd pune", "sibm pune vs scmhrd pune", "sibm scmhrd comparison 2026",
    "sibm or scmhrd which is better", "symbiosis mba pune comparison",
    "sibm vs scmhrd placement", "sibm vs scmhrd fees", "sibm vs scmhrd cutoff",
  ],
})

const rows = [
  { param: "NIRF Rank (Management)", sibm: "#13", scmhrd: "#18" },
  { param: "NAAC Grade", sibm: "A+", scmhrd: "A+" },
  { param: "Program", sibm: "MBA (2-year)", scmhrd: "MBA-HRD (2-year)" },
  { param: "Total Fees", sibm: "₹16L–₹22L", scmhrd: "₹14L–₹18L" },
  { param: "SNAP Cutoff 2025", sibm: "98+ percentile", scmhrd: "95+ percentile" },
  { param: "Average Placement", sibm: "₹28 LPA", scmhrd: "₹24 LPA" },
  { param: "Highest Package", sibm: "₹65 LPA", scmhrd: "₹48 LPA" },
  { param: "Batch Size", sibm: "~180", scmhrd: "~120" },
  { param: "Specialisation", sibm: "Finance, Marketing, HR, Operations", scmhrd: "HRM focused + Marketing, Finance" },
  { param: "Top Recruiters", sibm: "McKinsey, BCG, P&G, Deloitte", scmhrd: "Deloitte, KPMG, HUL, Accenture" },
  { param: "Campus", sibm: "Lavale, Pune (Symbiosis campus)", scmhrd: "Lavale, Pune (same campus)" },
  { param: "Hostel", sibm: "Yes (₹1.2L–₹1.6L/yr)", scmhrd: "Yes (₹1.2L–₹1.6L/yr)" },
  { param: "Entrance Exam", sibm: "SNAP + GD-PI", scmhrd: "SNAP + GD-PI" },
  { param: "Lateral Diversity", sibm: "High (IT, consulting, FMCG)", scmhrd: "HR/people-roles dominant" },
]

export default function SibmVsScmhrd() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#0A1628] to-indigo-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4 flex gap-1 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/mba-colleges-pune" className="hover:text-white">MBA Colleges Pune</Link>
            <span>/</span>
            <span className="text-white">SIBM vs SCMHRD</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">SIBM vs SCMHRD Pune 2026</h1>
          <p className="text-blue-100 text-lg max-w-3xl">
            Both are top-tier Symbiosis MBA colleges on the same Lavale campus — but which should you choose? Compare SIBM Pune and SCMHRD on NIRF rank, SNAP cutoffs, fees, placements, and specialisations.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-full">Updated June 2026</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">SNAP 2025 Cutoffs</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">2025 Placement Data</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Verdict</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <div className="font-bold text-indigo-800 text-lg mb-1">🏆 Choose SIBM if…</div>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc list-inside">
                <li>You want the <strong>higher NIRF rank (#13)</strong> on your resume</li>
                <li>You&apos;re targeting consulting / finance roles</li>
                <li>You score <strong>98+ percentile in SNAP</strong></li>
                <li>You want larger batch = wider alumni network</li>
                <li>McKinsey, BCG, P&G are dream employers</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="font-bold text-purple-800 text-lg mb-1">✅ Choose SCMHRD if…</div>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc list-inside">
                <li>You score <strong>95–97 percentile in SNAP</strong></li>
                <li>You want HR / People management specialisation</li>
                <li>Lower fees (₹14L vs ₹22L) matters to you</li>
                <li>Smaller batch = more personalised experience</li>
                <li>Deloitte, KPMG, HUL are target companies</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">SIBM vs SCMHRD — Full Comparison 2026</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 w-1/3">Parameter</th>
                  <th className="text-left px-4 py-3 font-semibold text-indigo-700">
                    <Link href="/colleges/sibm-symbiosis-institute-business-management-pune" className="hover:underline">SIBM Pune</Link>
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-purple-700">SCMHRD Pune</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.param} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">{row.param}</td>
                    <td className="px-4 py-3 text-gray-800">{row.sibm}</td>
                    <td className="px-4 py-3 text-gray-800">{row.scmhrd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">FAQs — SIBM vs SCMHRD Pune</h2>
          <div className="space-y-4">
            {[
              { q: "Is SIBM or SCMHRD better for MBA in Pune 2026?", a: "SIBM Pune (NIRF #13) is ranked higher and offers better placements (₹28 LPA avg vs ₹24 LPA). However, SCMHRD (NIRF #18) has lower fees (₹14–18L vs ₹16–22L) and a smaller, more intimate batch. For consulting and finance, choose SIBM. For HR and people management roles, SCMHRD is specialised and preferred." },
              { q: "What is the SNAP cutoff for SIBM and SCMHRD in 2026?", a: "SIBM Pune SNAP 2025 cutoff was 98+ percentile (sectional cutoffs also apply). SCMHRD SNAP 2025 cutoff was 95+ percentile. Both require GD-PI rounds after clearing SNAP. Scores above 99 percentile significantly improve your chances at SIBM." },
              { q: "Which has better placement — SIBM or SCMHRD?", a: "SIBM Pune has higher placement numbers — ₹28 LPA average CTC with McKinsey, BCG, and P&G as top recruiters. SCMHRD placed its batch at ₹24 LPA average with Deloitte, KPMG, and HUL as top recruiters. Both are excellent for corporate placements." },
              { q: "Are SIBM and SCMHRD on the same campus?", a: "Yes, both SIBM and SCMHRD are part of the Symbiosis International University campus at Lavale, Pune. Students have access to shared facilities including library, sports complex, and health centre." },
            ].map(({ q, a }) => (
              <details key={q} className="border border-gray-100 rounded-xl p-4">
                <summary className="font-semibold text-gray-800 cursor-pointer">{q}</summary>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Comparisons</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "COEP vs PICT Pune", href: "/coep-vs-pict-pune" },
              { label: "VIT Pune vs MIT-WPU", href: "/vit-pune-vs-mit-wpu" },
              { label: "All MBA Colleges Pune", href: "/mba-colleges-pune" },
              { label: "Top 10 MBA Colleges Pune", href: "/top-10-mba-colleges-in-pune" },
              { label: "MBA Without CAT Pune", href: "/mba-admission-pune-without-cat" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full border border-indigo-200 text-indigo-700 text-sm hover:bg-indigo-50 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
