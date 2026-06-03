import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta } from "@/lib/seo"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Pune Colleges with Fees Under 1 Lakh 2026 | Low Fee Engineering & MBA",
  description: "Best Pune colleges with annual fees under ₹1 lakh in 2026 — COEP (₹80K), AISSMS (₹1.1L), JSPM (₹95K). Low fee engineering, MBA, medical colleges in Pune with scholarships & hostel.",
  path: "/pune-colleges-fees-under-1-lakh",
  keywords: [
    "pune colleges fees under 1 lakh", "low fee colleges pune 2026", "cheap engineering colleges pune",
    "engineering colleges pune fees under 1 lakh", "government colleges pune low fees",
    "pune college less than 1 lakh per year", "affordable colleges pune 2026",
    "pune engineering college 1 lakh fees", "low fees btech pune",
  ],
})

const engineeringColleges = [
  { name: "COEP Technological University", fees: "₹80,000/yr", type: "Government", naac: "A+", nirf: "#49", note: "Cheapest top-ranked engineering college in Pune" },
  { name: "AIT Pune (Army Institute of Technology)", fees: "₹85,000/yr", type: "Government", naac: "A", nirf: "—", note: "Best value — ₹12–13.6 LPA average placement" },
  { name: "AISSMS College of Engineering", fees: "₹1.1L/yr", type: "Private (Aided)", naac: "A", nirf: "—", note: "Just above ₹1L — excellent placement in IT sector" },
  { name: "JSPM Rajarshi Shahu COE", fees: "₹95,000/yr", type: "Private (Unaided)", naac: "B++", nirf: "—", note: "Strong MHT-CET acceptance — good for Mech/CS" },
  { name: "Indira College of Engineering", fees: "₹97,000/yr", type: "Private (Unaided)", naac: "B+", nirf: "—", note: "Affordable option near Pune; good placement cell" },
  { name: "Sinhgad College of Engineering", fees: "₹98,000/yr", type: "Private (Unaided)", naac: "B++", nirf: "—", note: "Large college, strong alumni, multiple branches" },
]

const artsColleges = [
  { name: "Fergusson College", fees: "₹15,000–₹40,000/yr", type: "Government Aided", naac: "A+", note: "Most prestigious arts/science college in Pune" },
  { name: "SP College (Sir Parashurambhau College)", fees: "₹12,000–₹35,000/yr", type: "Government Aided", naac: "A+", note: "Excellent for BSc, BA, BCom programmes" },
  { name: "Garware College of Commerce", fees: "₹10,000–₹28,000/yr", type: "Government Aided", naac: "A", note: "Best BCom college in Pune with ₹1L/yr fees" },
]

const scholarships = [
  { name: "Government of Maharashtra EBC Scholarship", amount: "Full tuition waiver", eligibility: "Family income < ₹8L/yr, 50%+ HSC", link: "mahadbt.maharashtra.gov.in" },
  { name: "SC/ST Post-Matric Scholarship", amount: "Full fees + maintenance", eligibility: "SC/ST category students", link: "mahadbt.maharashtra.gov.in" },
  { name: "OBC/VJ-NT/SBC Scholarship", amount: "Tuition fee waiver", eligibility: "OBC/VJ-NT/SBC, income < ₹8L/yr", link: "mahadbt.maharashtra.gov.in" },
  { name: "National Scholarship Portal (NSP)", amount: "Up to ₹50,000/yr", eligibility: "Family income < ₹6L/yr", link: "scholarships.gov.in" },
  { name: "Prime Minister's Scholarship", amount: "₹25,000–₹30,000/yr", eligibility: "Defence personnel children", link: "scholarships.gov.in" },
]

export default function FeesUnder1LakhPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#0A1628] to-green-900 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4 flex gap-1 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/colleges-pune-fees" className="hover:text-white">Pune College Fees</Link>
            <span>/</span>
            <span className="text-white">Colleges Under ₹1 Lakh</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Pune Colleges with Fees Under ₹1 Lakh 2026</h1>
          <p className="text-green-100 text-lg max-w-3xl">
            Complete list of best colleges in Pune with annual fees under or near ₹1 lakh — engineering, arts, science, and commerce. Includes government scholarships that can bring fees to near-zero.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-full">Updated June 2026</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Scholarship Info Included</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        <section className="bg-green-50 border border-green-200 rounded-2xl p-5">
          <h2 className="font-bold text-green-800 mb-2">💡 Key Insight</h2>
          <p className="text-green-700 text-sm leading-relaxed">
            Government engineering colleges in Pune charge ₹80,000–₹1.1L/year. After applying for <strong>EBC scholarship</strong> (family income under ₹8L/yr), the effective fee drops to <strong>₹0–₹20,000/year</strong> for qualifying students. SC/ST students pay near-zero fees at ALL government colleges.
          </p>
        </section>

        {/* Engineering */}
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Low Fee Engineering Colleges in Pune 2026</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">College</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Annual Fees</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">NAAC</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">NIRF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {engineeringColleges.map((c) => (
                  <tr key={c.name} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{c.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{c.note}</div>
                    </td>
                    <td className="px-4 py-3 font-bold text-green-700">{c.fees}</td>
                    <td className="px-4 py-3 text-gray-700">{c.type}</td>
                    <td className="px-4 py-3 text-gray-700">{c.naac}</td>
                    <td className="px-4 py-3 text-gray-700">{c.nirf}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Arts/Science */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Arts, Science & Commerce Colleges — Fees Under ₹50,000/yr</h2>
          <div className="space-y-3">
            {artsColleges.map((c) => (
              <div key={c.name} className="flex flex-wrap items-center justify-between gap-2 border border-gray-100 rounded-xl p-4">
                <div>
                  <div className="font-semibold text-gray-900">{c.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{c.type} · NAAC {c.naac} · {c.note}</div>
                </div>
                <div className="text-green-700 font-bold">{c.fees}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Scholarships */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Scholarships That Reduce Fees to Near-Zero</h2>
          <div className="space-y-3">
            {scholarships.map((s) => (
              <div key={s.name} className="border border-gray-100 rounded-xl p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{s.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Eligibility: {s.eligibility}</div>
                  </div>
                  <div className="text-green-700 font-bold text-sm">{s.amount}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/scholarships" className="mt-4 inline-block text-blue-600 text-sm hover:underline">
            View all scholarships for Pune colleges →
          </Link>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Pages</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Low Fees Engineering Colleges Pune", href: "/low-fees-engineering-colleges-pune" },
              { label: "Government Colleges Pune", href: "/government-colleges-pune" },
              { label: "Scholarships Pune Colleges", href: "/scholarships" },
              { label: "Pune College Fees Calculator", href: "/pune-college-fees-calculator" },
              { label: "COEP Pune Profile", href: "/colleges/coep-college-of-engineering-pune" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full border border-green-200 text-green-700 text-sm hover:bg-green-50 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
