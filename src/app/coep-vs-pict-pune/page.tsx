import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta } from "@/lib/seo"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "COEP vs PICT Pune 2026 | Fees, Placements, Cutoff Comparison",
  description: "COEP vs PICT Pune 2026: Compare fees (COEP ₹80K vs PICT ₹1.4L), MHT-CET cutoff (99.8 vs 92 percentile), placements (₹12 LPA vs ₹7.5 LPA), courses & hostel. Which is better for CSE?",
  path: "/coep-vs-pict-pune",
  keywords: [
    "coep vs pict pune", "coep vs pict which is better", "coep pict comparison 2026",
    "coep pune vs pict pune fees", "coep vs pict placement", "coep vs pict cutoff",
    "best engineering college pune coep pict", "pict pune vs coep pune cse",
  ],
})

const rows = [
  { param: "NIRF Rank", coep: "#49 (National)", pict: "Not ranked" },
  { param: "NAAC Grade", coep: "A+", pict: "A" },
  { param: "Type", coep: "Government Autonomous", pict: "Private Autonomous" },
  { param: "Established", coep: "1854", pict: "1983" },
  { param: "Annual Fees (BTech)", coep: "₹80,000 – ₹1.8L", pict: "₹1.4L – ₹1.9L" },
  { param: "4-Year Total Cost", coep: "₹3.2L – ₹7.2L", pict: "₹5.6L – ₹7.6L" },
  { param: "MHT-CET Cutoff (CSE)", coep: "99.8 percentile", pict: "92+ percentile" },
  { param: "Average Placement", coep: "₹12 LPA", pict: "₹7.5 LPA" },
  { param: "Highest Package", coep: "₹45 LPA", pict: "₹40 LPA" },
  { param: "Top Recruiters", coep: "Google, Goldman Sachs, ISRO", pict: "TCS, Infosys, Persistent" },
  { param: "CSE Seats", coep: "120", pict: "180" },
  { param: "Hostel", coep: "Yes (₹55K–70K/yr)", pict: "No on-campus hostel" },
  { param: "Campus Area", coep: "30 acres", pict: "7 acres" },
  { param: "Entrance Exam", coep: "MHT-CET / JEE Main", pict: "MHT-CET" },
  { param: "Affiliation", coep: "Autonomous (COEP-TU)", pict: "SPPU" },
]

export default function CoepVsPict() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1628] to-blue-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4 flex gap-1 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/engineering-colleges-pune" className="hover:text-white">Engineering Colleges Pune</Link>
            <span>/</span>
            <span className="text-white">COEP vs PICT</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">COEP vs PICT Pune 2026</h1>
          <p className="text-blue-100 text-lg max-w-3xl">
            A head-to-head comparison of Pune&apos;s two most-discussed engineering colleges — College of Engineering Pune (COEP) and Pune Institute of Computer Technology (PICT). Compare fees, MHT-CET cutoffs, placements, and more.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-full">Updated June 2026</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">MHT-CET 2026 Cutoffs</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">2025 Placement Data</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Quick Verdict */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Verdict</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="font-bold text-blue-800 text-lg mb-1">🏆 Choose COEP if…</div>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc list-inside">
                <li>You score <strong>97+ percentile</strong> in MHT-CET</li>
                <li>Budget is a priority (₹80K/yr vs ₹1.4L)</li>
                <li>You want a NIRF-ranked government college</li>
                <li>You need on-campus hostel</li>
                <li>You want broader stream options (Mech, Civil, EE)</li>
              </ul>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <div className="font-bold text-orange-800 text-lg mb-1">✅ Choose PICT if…</div>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc list-inside">
                <li>You score <strong>90–97 percentile</strong> in MHT-CET</li>
                <li>You want CS/IT-only focused college</li>
                <li>You prefer smaller batch size (40–60 per div)</li>
                <li>PICT alumni network is strong in product companies</li>
                <li>You want slightly lower competition for placements</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">COEP vs PICT — Full Comparison 2026</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 w-1/3">Parameter</th>
                  <th className="text-left px-4 py-3 font-semibold text-blue-700">
                    <Link href="/colleges/coep-college-of-engineering-pune" className="hover:underline">COEP Pune</Link>
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-orange-700">
                    <Link href="/colleges/pict-pune-institute-of-computer-technology" className="hover:underline">PICT Pune</Link>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.param} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">{row.param}</td>
                    <td className="px-4 py-3 text-gray-800">{row.coep}</td>
                    <td className="px-4 py-3 text-gray-800">{row.pict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Fees Breakdown */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Fees Comparison — COEP vs PICT 2026</h2>
          <p className="text-gray-600 text-sm mb-4">COEP is a government college — fees are subsidised by Maharashtra government. PICT is a private autonomous college with higher but still reasonable fees.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-700 mb-2">COEP Pune Fees 2026</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>BTech (Open category): <strong>₹80,000–₹1.1L/yr</strong></li>
                <li>BTech (OBC/EBC): Significant concession</li>
                <li>BTech (SC/ST): Near-zero fees</li>
                <li>Hostel: ₹55,000–₹70,000/yr</li>
                <li>4-year total (Open): ₹3.2L–₹4.4L</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-orange-700 mb-2">PICT Pune Fees 2026</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>BTech Computer Engineering: <strong>₹1.4L–₹1.9L/yr</strong></li>
                <li>BTech IT: ₹1.3L–₹1.7L/yr</li>
                <li>No on-campus hostel</li>
                <li>4-year total: ₹5.6L–₹7.6L</li>
                <li>Scholarships: MahaDBT, NSP available</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Placement */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Placements — COEP vs PICT 2025 Batch</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-700 mb-3">COEP Placements 2025</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b pb-1"><span className="text-gray-600">Average CTC (CSE)</span><strong>₹12 LPA</strong></div>
                <div className="flex justify-between border-b pb-1"><span className="text-gray-600">Highest CTC</span><strong>₹45 LPA</strong></div>
                <div className="flex justify-between border-b pb-1"><span className="text-gray-600">Placement %</span><strong>96%</strong></div>
                <div className="flex justify-between border-b pb-1"><span className="text-gray-600">Companies visited</span><strong>85+</strong></div>
                <div className="flex justify-between"><span className="text-gray-600">Top recruiters</span><strong>Google, Goldman, ISRO</strong></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-orange-700 mb-3">PICT Placements 2025</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b pb-1"><span className="text-gray-600">Average CTC (CSE)</span><strong>₹7.5 LPA</strong></div>
                <div className="flex justify-between border-b pb-1"><span className="text-gray-600">Highest CTC</span><strong>₹40 LPA</strong></div>
                <div className="flex justify-between border-b pb-1"><span className="text-gray-600">Placement %</span><strong>92%</strong></div>
                <div className="flex justify-between border-b pb-1"><span className="text-gray-600">Companies visited</span><strong>60+</strong></div>
                <div className="flex justify-between"><span className="text-gray-600">Top recruiters</span><strong>TCS, Persistent, Infosys</strong></div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">FAQs — COEP vs PICT Pune</h2>
          <div className="space-y-4">
            {[
              { q: "Which is better — COEP or PICT Pune for CSE in 2026?", a: "COEP is better overall for CSE — higher NIRF rank (#49), better average placement (₹12 LPA vs ₹7.5 LPA), government fees (₹80K/yr vs ₹1.4L), and on-campus hostel. However, PICT is a solid choice if your MHT-CET score is in the 90–97 percentile range and you want a CS-focused environment." },
              { q: "What is the MHT-CET cutoff for COEP CSE 2026?", a: "COEP CSE MHT-CET 2025 cutoff (Round 1, Open category) was 99.8 percentile. Expected 2026 cutoff: 99.7–99.9 percentile. PICT CS cutoff was 92–94 percentile in 2025." },
              { q: "Does PICT Pune have hostel?", a: "No, PICT Pune does not have an on-campus hostel. Students typically stay in PGs near Dhankawadi (₹8,000–₹15,000/month). COEP has 5 boys' hostels and 3 girls' hostels at ₹55,000–70,000/year." },
              { q: "Is COEP or PICT better for placements?", a: "COEP has significantly higher placement figures — ₹12 LPA average vs ₹7.5 LPA at PICT. COEP also attracts top companies like Google and Goldman Sachs. Both colleges have ~90%+ placement rates." },
            ].map(({ q, a }) => (
              <details key={q} className="border border-gray-100 rounded-xl p-4">
                <summary className="font-semibold text-gray-800 cursor-pointer">{q}</summary>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Comparisons</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "VIT Pune vs MIT-WPU", href: "/vit-pune-vs-mit-wpu" },
              { label: "SIBM vs SCMHRD Pune", href: "/sibm-vs-scmhrd-pune" },
              { label: "All Engineering Colleges Pune", href: "/engineering-colleges-pune" },
              { label: "Top 10 Engineering Colleges Pune", href: "/top-10-engineering-colleges-in-pune" },
              { label: "Compare Colleges Tool", href: "/compare" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full border border-blue-200 text-blue-700 text-sm hover:bg-blue-50 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
