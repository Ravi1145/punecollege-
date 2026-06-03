import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta } from "@/lib/seo"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "VIT Pune vs MIT-WPU 2026 | Fees, Placements, MHT-CET Cutoff Comparison",
  description: "VIT Pune vs MIT-WPU 2026: Compare fees (₹1.6L vs ₹2.5L), MHT-CET cutoffs, placements (₹8.5 LPA vs ₹9 LPA), NIRF ranks, hostel & campus. Which private engineering college is better?",
  path: "/vit-pune-vs-mit-wpu",
  keywords: [
    "vit pune vs mit wpu", "vit pune vs mit world peace university", "vit pune vs mitwpu 2026",
    "vit pune or mit wpu which is better", "vit pune vs mit wpu placement",
    "vit pune vs mit wpu fees", "vit pune vs mit wpu cutoff", "private engineering college pune comparison",
  ],
})

const rows = [
  { param: "NIRF Rank", vit: "#101 (Engineering)", mit: "Not ranked (new university)" },
  { param: "NAAC Grade", vit: "A+", mit: "A+" },
  { param: "Type", vit: "Private Autonomous", mit: "Deemed University" },
  { param: "Established", vit: "1983", mit: "1983 (University 2017)" },
  { param: "Annual Fees (BTech)", vit: "₹1.6L – ₹2.2L", mit: "₹2.2L – ₹3.5L" },
  { param: "4-Year Total Cost", vit: "₹6.4L – ₹8.8L", mit: "₹8.8L – ₹14L" },
  { param: "MHT-CET Cutoff (CSE)", vit: "88–92 percentile", mit: "82–88 percentile" },
  { param: "Average Placement", vit: "₹8.5 LPA", mit: "₹9 LPA" },
  { param: "Highest Package", vit: "₹32 LPA", mit: "₹42 LPA" },
  { param: "Top Recruiters", vit: "TCS, Cognizant, Persistent", mit: "TCS, Wipro, Capgemini, L&T" },
  { param: "BTech Seats (CSE)", vit: "120", mit: "180" },
  { param: "Campus Area", vit: "7 acres (Bibwewadi)", mit: "130 acres (Kothrud + Loni)" },
  { param: "Hostel", vit: "Yes (₹80K–₹1L/yr)", mit: "Yes (₹90K–₹1.2L/yr)" },
  { param: "Specialisations", vit: "Mech, Electronics, CS, IT", mit: "CS, Mech, Civil, AI/ML, Data Science" },
  { param: "MBA Program", vit: "No MBA", mit: "Yes — MIT School of Management" },
  { param: "Affiliation", vit: "SPPU (Autonomous)", mit: "MIT-WPU (Deemed University)" },
]

export default function VitVsMitWpu() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#0A1628] to-teal-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4 flex gap-1 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/engineering-colleges-pune" className="hover:text-white">Engineering Colleges Pune</Link>
            <span>/</span>
            <span className="text-white">VIT Pune vs MIT-WPU</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">VIT Pune vs MIT-WPU 2026</h1>
          <p className="text-blue-100 text-lg max-w-3xl">
            Comparing two of Pune&apos;s most popular private engineering colleges — Vishwakarma Institute of Technology (VIT Pune) and MIT World Peace University (MIT-WPU). Which should you choose for BTech in 2026?
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-full">Updated June 2026</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">MHT-CET 2026 Cutoffs</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">2025 Placement Data</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Verdict</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
              <div className="font-bold text-teal-800 text-lg mb-1">🏆 Choose VIT Pune if…</div>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc list-inside">
                <li>You score <strong>88–95 percentile</strong> in MHT-CET</li>
                <li>Budget is important — <strong>₹1.6L/yr vs ₹2.5L/yr</strong></li>
                <li>You want NIRF-ranked college (#101)</li>
                <li>Mechanical or Electronics engineering is your stream</li>
                <li>SPPU affiliation preferred over deemed university</li>
              </ul>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <div className="font-bold text-orange-800 text-lg mb-1">✅ Choose MIT-WPU if…</div>
              <ul className="text-sm text-gray-700 space-y-1.5 list-disc list-inside">
                <li>You score <strong>80–88 percentile</strong> in MHT-CET</li>
                <li>You want newer specialisations (AI/ML, Data Science)</li>
                <li>Larger campus (130 acres) matters to you</li>
                <li>You may want MBA later — MIT School of Management on campus</li>
                <li>Higher highest package ceiling (₹42 LPA vs ₹32 LPA)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">VIT Pune vs MIT-WPU — Full Comparison 2026</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 w-1/3">Parameter</th>
                  <th className="text-left px-4 py-3 font-semibold text-teal-700">
                    <Link href="/colleges/vit-pune-vishwakarma-institute-of-technology" className="hover:underline">VIT Pune</Link>
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-orange-700">
                    <Link href="/colleges/mit-wpu-mit-world-peace-university" className="hover:underline">MIT-WPU</Link>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.param} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700">{row.param}</td>
                    <td className="px-4 py-3 text-gray-800">{row.vit}</td>
                    <td className="px-4 py-3 text-gray-800">{row.mit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">FAQs — VIT Pune vs MIT-WPU 2026</h2>
          <div className="space-y-4">
            {[
              { q: "Is VIT Pune better than MIT-WPU in 2026?", a: "VIT Pune has a higher NIRF rank (#101) and lower fees (₹1.6L vs ₹2.5L/yr), making it better value for money. MIT-WPU has a larger campus, more modern specialisations (AI/ML, Data Science), and slightly higher average placement (₹9 LPA vs ₹8.5 LPA). For MHT-CET students in the 88–95 percentile range, VIT Pune is generally preferred." },
              { q: "What is the MHT-CET cutoff for VIT Pune CSE 2026?", a: "VIT Pune BTech CSE MHT-CET cutoff (2025, Open category Round 1) was approximately 88–92 percentile. MIT-WPU CSE cutoff was 82–88 percentile. Expect similar cutoffs in 2026." },
              { q: "Which has better placement — VIT Pune or MIT-WPU?", a: "MIT-WPU has a slightly higher average package (₹9 LPA vs ₹8.5 LPA at VIT Pune) and higher ceiling (₹42 LPA vs ₹32 LPA). Both colleges have strong industry connections. VIT Pune has a longer placement track record (since 1983), while MIT-WPU is expanding its corporate outreach significantly." },
              { q: "Does VIT Pune or MIT-WPU have better campus facilities?", a: "MIT-WPU wins on campus size — 130 acres across Kothrud and Loni Kalbhor vs VIT Pune's 7 acres in Bibwewadi. MIT-WPU has a full university campus with sports complex, cultural centre, and multiple schools. VIT Pune is more compact but very well-equipped for engineering labs." },
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
              { label: "SIBM vs SCMHRD Pune", href: "/sibm-vs-scmhrd-pune" },
              { label: "All Engineering Colleges Pune", href: "/engineering-colleges-pune" },
              { label: "Low Fees Engineering Colleges", href: "/low-fees-engineering-colleges-pune" },
              { label: "Compare Tool", href: "/compare" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full border border-teal-200 text-teal-700 text-sm hover:bg-teal-50 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
