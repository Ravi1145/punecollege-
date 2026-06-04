import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateCollegeListSchema } from "@/lib/seo"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "NEET Cutoff for Pune Colleges 2026 | MBBS Cutoff Marks AFMC, BJ Medical",
  description: "NEET 2026 cutoff for Pune medical colleges — AFMC (650+ marks), BJ Medical (620+), DY Patil Medical (550+). Category-wise cutoffs (Open, OBC, SC, ST) for MBBS admission in Pune.",
  path: "/neet-cutoff-pune-colleges",
  keywords: [
    "neet cutoff pune colleges 2026", "neet cutoff pune medical colleges", "afmc neet cutoff 2026",
    "bj medical college neet cutoff", "dy patil medical neet cutoff pune",
    "mbbs cutoff pune 2026", "neet marks required pune medical college",
    "neet cutoff maharashtra pune", "neet ug cutoff pune government medical colleges",
  ],
})

const cutoffs = [
  { rank: 1, name: "AFMC Pune (Armed Forces Medical College)", slug: "afmc-armed-forces-medical-college-pune", type: "Government (Defence)", nirf: 4, fees: "₹50K total (4.5 yrs)", open: "650+ (NEET + AFMC test)", obc: "640+", sc: "620+", st: "610+", note: "NIRF #4 — Best in Pune" },
  { rank: 2, name: "BJ Medical College Pune", slug: "bj-medical-college-pune", type: "Government State", nirf: 18, fees: "₹60K/yr", open: "632 (State) / 641 (AIQ)", obc: "596+ (State)", sc: "548+", st: "528+", note: "Best Govt. Option" },
  { rank: 3, name: "D.Y. Patil Medical College (Deemed)", slug: "dy-patil-medical-college-pune", type: "Deemed Private", nirf: null, fees: "₹14L–₹18L/yr", open: "550+", obc: "530+", sc: "500+", st: "480+", note: "Largest Private MBBS" },
  { rank: 4, name: "Bharati Vidyapeeth Medical College", slug: "bharati-vidyapeeth-medical-college-pune", type: "Deemed", nirf: null, fees: "₹12L–₹15L/yr", open: "560+", obc: "540+", sc: "510+", st: "490+", note: "Established 1989" },
  { rank: 5, name: "Symbiosis Medical College for Women (SMCW)", slug: "symbiosis-medical-college-women-pune", type: "Deemed (Women only)", nirf: null, fees: "₹12.5L/yr", open: "565+ (Women)", obc: "545+", sc: "515+", st: "495+", note: "Women Only | SIU Campus" },
]

const faqs = [
  { question: "What is the NEET cutoff for Pune medical colleges in 2026?", answer: "NEET 2026 expected cutoffs for Pune medical colleges: AFMC (650+ marks + AFMC test), BJ Medical College state quota 620+ (open), AIQ 641+, D.Y. Patil Medical 550+, Bharati Vidyapeeth 560+, SMCW 565+ (women). OBC/SC/ST categories get 10–20 mark relaxation at government colleges." },
  { question: "What NEET score is needed for government medical college in Pune?", answer: "BJ Medical College Pune (NIRF #18) requires 632 marks (State Open quota). AFMC Pune (NIRF #4) needs 650+ marks in NEET plus clearing the AFMC entrance test. These are the only 2 government MBBS seats in Pune. Both have near-zero fees compared to private colleges." },
  { question: "What NEET score is needed for AFMC Pune?", answer: "AFMC Pune requires approximately 650+ marks in NEET UG 2026 (General category) plus qualifying the AFMC Written Entrance Test (100 marks). The selection is based on NEET score + AFMC test + Personal Interview. Post-selection, students get a 7-year bond for Armed Forces service. Fees are approximately ₹50,000 total for 4.5-year MBBS." },
  { question: "Which is the cheapest MBBS college in Pune via NEET?", answer: "AFMC Pune is the cheapest — total fees ₹50,000 for the entire 4.5-year MBBS (requires 650+ NEET). BJ Medical College charges ₹60,000/year (requires 620+ NEET state quota). These are government colleges. Private deemed colleges charge ₹12–18L/year and have lower NEET cutoffs (550–565+)." },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Medical Colleges", url: "/medical-colleges-pune" },
  { name: "NEET Cutoff Pune", url: "/neet-cutoff-pune-colleges" },
]

export default function NeetCutoffPuneColleges() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const itemListSchema = generateCollegeListSchema(
    cutoffs.map(c => ({ name: c.name, slug: c.slug })),
    "NEET Cutoff for Pune Medical Colleges 2026"
  )

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-[#0A1628] to-green-900 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/medical-colleges-pune" className="hover:text-white">Medical Colleges Pune</Link><span>›</span>
              <span className="text-white">NEET Cutoff Pune</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">NEET Cutoff for Pune Colleges 2026</h1>
            <p className="text-green-100 text-lg max-w-3xl mb-5">
              Category-wise NEET 2026 cutoff marks for MBBS admission in Pune — AFMC, BJ Medical, DY Patil Medical, Bharati Vidyapeeth, SMCW. State quota vs AIQ cutoffs compared.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-3xl" data-speakable="true">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>AFMC Pune</strong> (NIRF #4) needs <strong>650+ NEET marks</strong> + AFMC test. <strong>BJ Medical College</strong> (NIRF #18) state quota cutoff is <strong>632 marks</strong> (Open). Private colleges like DY Patil require 550+ marks. Government college fees: ₹50K–₹60K/yr vs private ₹12–18L/yr.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">NEET 2025 Cutoff — Pune Medical Colleges (Reference for 2026)</h2>
          <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
            ⚠️ 2026 cutoffs will be published after NEET UG 2026 results. Below are 2025 cutoffs for reference — expect ±10 marks variation.
          </p>

          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">#</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">College</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Fees</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Open</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">OBC</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">SC/ST</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cutoffs.map((c) => (
                  <tr key={c.rank} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500 font-medium">{c.rank}</td>
                    <td className="px-4 py-3">
                      <Link href={`/colleges/${c.slug}`} className="font-semibold text-gray-900 hover:text-green-700">{c.name}</Link>
                      {c.nirf && <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">NIRF #{c.nirf}</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{c.type}</td>
                    <td className="px-4 py-3 text-green-700 font-medium text-xs">{c.fees}</td>
                    <td className="px-4 py-3 text-center font-bold text-blue-700 text-xs">{c.open}</td>
                    <td className="px-4 py-3 text-center text-gray-700 text-xs">{c.obc}</td>
                    <td className="px-4 py-3 text-center text-gray-700 text-xs">{c.sc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">FAQs — NEET Cutoff Pune 2026</h2>
            <div className="space-y-3">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="border border-gray-100 rounded-xl p-4">
                  <summary className="font-semibold text-gray-800 cursor-pointer">{question}</summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Medical Colleges Pune", href: "/medical-colleges-pune" },
                { label: "NEET Colleges Pune", href: "/neet-colleges-pune" },
                { label: "MBBS Colleges Pune", href: "/mbbs-colleges-pune" },
                { label: "AFMC Pune Profile", href: "/colleges/afmc-armed-forces-medical-college-pune" },
                { label: "College Predictor", href: "/predictor" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full border border-green-200 text-green-700 text-sm hover:bg-green-50">{l.label}</Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
