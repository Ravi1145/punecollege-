import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta } from "@/lib/seo"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "MHT-CET Counselling 2026 Pune | CAP Rounds, Choice Filling & Seat Allotment Guide",
  description: "Complete MHT-CET 2026 counselling guide for Pune engineering colleges. CAP round dates, choice filling tips, document list, seat allotment process, and COEP, PICT, VIT Pune cutoffs.",
  path: "/mht-cet-counselling-pune-2026",
  keywords: [
    "mht-cet counselling 2026 pune", "mht cet cap round 2026", "mht-cet seat allotment pune",
    "mht cet choice filling 2026", "mht-cet counselling process pune colleges",
    "mht cet 2026 cap round dates", "engineering admission pune 2026 mht-cet",
    "mht cet document verification pune", "coep pict vit mht-cet counselling",
  ],
})

const capRounds = [
  { round: "CAP Round 0 (Institutional Level)", dates: "July 1–10, 2026 (est.)", desc: "Direct admissions at autonomous institutes like COEP, PICT, VIT Pune before central allotment." },
  { round: "CAP Round 1", dates: "July 15–25, 2026 (est.)", desc: "First allotment of seats. Fill preferences, submit documents. Accept or cancel allotment." },
  { round: "CAP Round 2", dates: "August 1–10, 2026 (est.)", desc: "For students who didn't get preferred college or cancelled Round 1. Re-fill preferences." },
  { round: "CAP Round 3", dates: "August 15–25, 2026 (est.)", desc: "Final round. Remaining vacant seats allotted. Institute-level rounds follow." },
]

const documents = [
  "MHT-CET 2026 scorecard (original + 3 copies)",
  "SSC (10th) marksheet & certificate",
  "HSC (12th) marksheet & certificate",
  "Domicile certificate (Maharashtra)",
  "Nationality certificate / Aadhaar card",
  "Caste certificate (if applicable — OBC/SC/ST/VJ-NT/SBC)",
  "Non-creamy layer certificate (for OBC, VJ-NT, SBC)",
  "Income certificate (for EBC scholarship)",
  "EWS certificate (if applicable)",
  "Leaving certificate from last school/college",
  "Recent passport photos (8–10 copies)",
  "Demand draft / online payment receipt for registration fee",
]

const faqs = [
  { q: "What is MHT-CET CAP Round and how does it work?", a: "CAP (Centralised Admission Process) is Maharashtra's online seat allotment system for engineering admissions. After MHT-CET results, students register on the CAP portal, fill document verification, then choose colleges in order of preference. Allotment is merit-based — higher MHT-CET percentile = better chances at top colleges like COEP and PICT. There are 3 main CAP rounds; after each round, you can accept, upgrade, or cancel." },
  { q: "How to fill choice form for MHT-CET CAP Round 1?", a: "Log in to cap.mahacet.org after document verification. Go to 'Option Form'. Add colleges in order of preference (you can add up to 300+ preferences). Put COEP first if your score is 97+ percentile, PICT for 92+, VIT Pune for 88+. Always fill 15–20 options to ensure you get a seat. Confirm and lock the form before the deadline — you cannot edit after locking." },
  { q: "What documents are needed for MHT-CET counselling 2026?", a: "Required documents: MHT-CET 2026 scorecard, 10th and 12th marksheets, domicile certificate, Aadhaar card, caste certificate (if applicable), non-creamy layer certificate (OBC/VJ-NT/SBC), income certificate, and recent photos. Carry originals + 3 self-attested copies of each. Missing documents can lead to rejection of seat." },
  { q: "Can I change my college after CAP Round 1 allotment?", a: "Yes. After Round 1 allotment, you can: (1) Accept the seat and freeze (confirm final choice), (2) Accept and float (keep the seat and participate in Round 2 for a better college), or (3) Cancel and participate in Round 2 from scratch. If you choose 'float', you automatically participate in Round 2 and may get a better allotment." },
  { q: "What is the MHT-CET cutoff for COEP Pune 2026?", a: "COEP MHT-CET 2025 cutoffs: Computer Engineering (Open) 99.8 percentile, Mechanical (Open) 98.5 percentile, Electronics (Open) 99.2 percentile. 2026 expected cutoffs will be similar. For SC/ST categories, cutoffs drop by 10–15 percentile points." },
  { q: "When does MHT-CET 2026 counselling start?", a: "MHT-CET 2026 results are expected in June 2026. CAP Round 1 registration typically starts mid-July 2026. Document verification: July 1–15. Choice filling: July 15–20. Round 1 allotment: July 25. Check cetcell.mahacet.org for official dates." },
]

export default function MhtCetCounsellingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#0A1628] to-blue-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4 flex gap-1 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/exams/mht-cet" className="hover:text-white">MHT-CET 2026</Link>
            <span>/</span>
            <span className="text-white">MHT-CET Counselling Pune 2026</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">MHT-CET Counselling 2026 — Pune Engineering Colleges</h1>
          <p className="text-blue-100 text-lg max-w-3xl">
            Step-by-step guide to MHT-CET 2026 CAP counselling for Pune engineering colleges — COEP, PICT, VIT Pune, MIT-WPU, SIT Pune. Covers CAP round dates, document list, choice filling strategy, and cutoffs.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-full">Updated June 2026</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">CAP Round Dates Inside</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">10.9 Lakh Candidates</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Quick steps */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-5">MHT-CET 2026 Counselling — Step-by-Step Process</h2>
          <ol className="space-y-4">
            {[
              { step: 1, title: "Check MHT-CET 2026 Result", desc: "Results declared on mahacet.org / cetcell.mahacet.org. Download your scorecard. Your percentile determines which colleges you can target." },
              { step: 2, title: "Register on CAP Portal", desc: "Go to cap.mahacet.org. Create an account with your MHT-CET application number, Aadhaar, and mobile number. Pay the registration fee (₹500 for Open, ₹250 for reserved categories)." },
              { step: 3, title: "Document Verification (DV)", desc: "Visit the nearest DTE facilitation centre with all original documents + 3 copies. This is mandatory before you can fill choices. Book your DV slot online." },
              { step: 4, title: "Fill Option Form (Choice Filling)", desc: "Log in and fill your college preferences. Add 15–25 options. Put dream colleges first, then backups. Lock the form before the deadline — changes are not allowed after locking." },
              { step: 5, title: "CAP Round 1 Seat Allotment", desc: "Check your allotment on the CAP portal. Decide to Accept & Freeze, Accept & Float, or Cancel. Pay seat acceptance fee if accepting." },
              { step: 6, title: "Report to College", desc: "Carry all original documents to your allotted college for final admission. Pay remaining fees. Take admission within the deadline or your seat is cancelled." },
            ].map(({ step, title, desc }) => (
              <li key={step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{step}</div>
                <div>
                  <div className="font-semibold text-gray-900">{title}</div>
                  <p className="text-sm text-gray-600 mt-0.5">{desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* CAP Round dates */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">MHT-CET CAP Round 2026 — Expected Dates</h2>
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 mb-4">
            ⚠️ Dates below are estimates based on 2025 schedule. Official dates will be announced on <strong>cetcell.mahacet.org</strong>.
          </p>
          <div className="space-y-3">
            {capRounds.map((r) => (
              <div key={r.round} className="border border-gray-100 rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm">{r.round}</span>
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{r.dates}</span>
                </div>
                <p className="text-sm text-gray-600">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Documents */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Documents Required for MHT-CET Counselling 2026</h2>
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li key={doc} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 font-bold mt-0.5">✓</span>
                {doc}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
            Tip: Arrange all documents in a folder before your DV appointment. Missing even one document can delay your admission by an entire round.
          </p>
        </section>

        {/* Cutoff table */}
        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">MHT-CET Cutoffs — Pune Engineering Colleges 2025</h2>
            <p className="text-sm text-gray-500 mt-1">Use these as a reference for 2026 targets. Expect ±0.5 percentile variation.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">College</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Branch</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Open (Gen)</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">OBC</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">SC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { college: "COEP", branch: "Computer Engg", open: "99.8%ile", obc: "99.5%ile", sc: "97%ile" },
                  { college: "COEP", branch: "Mechanical", open: "98.5%ile", obc: "97%ile", sc: "94%ile" },
                  { college: "PICT", branch: "Computer Engg", open: "94%ile", obc: "91%ile", sc: "86%ile" },
                  { college: "VIT Pune", branch: "Computer Engg", open: "91%ile", obc: "88%ile", sc: "82%ile" },
                  { college: "MIT-WPU", branch: "CSE (AI/DS)", open: "86%ile", obc: "82%ile", sc: "76%ile" },
                  { college: "SIT Pune", branch: "Computer Engg", open: "88%ile", obc: "84%ile", sc: "78%ile" },
                ].map((row) => (
                  <tr key={`${row.college}-${row.branch}`} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{row.college}</td>
                    <td className="px-4 py-3 text-gray-700">{row.branch}</td>
                    <td className="px-4 py-3 text-blue-700 font-medium">{row.open}</td>
                    <td className="px-4 py-3 text-gray-700">{row.obc}</td>
                    <td className="px-4 py-3 text-gray-700">{row.sc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">MHT-CET Counselling 2026 — FAQs</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="border border-gray-100 rounded-xl p-4">
                <summary className="font-semibold text-gray-800 cursor-pointer text-sm">{q}</summary>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Pages</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "MHT-CET Colleges Pune", href: "/mht-cet-colleges-pune" },
              { label: "Engineering Colleges Pune", href: "/engineering-colleges-pune" },
              { label: "COEP Pune Profile", href: "/colleges/coep-college-of-engineering-pune" },
              { label: "Direct Admission Engineering Pune", href: "/direct-admission-engineering-colleges-pune" },
              { label: "College Predictor", href: "/predictor" },
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
