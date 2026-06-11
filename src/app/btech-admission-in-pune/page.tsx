import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateHowToSchema } from "@/lib/seo"
import { btechColleges } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"

export const metadata: Metadata = genMeta({
  title: "BTech Admission in Pune 2026 | MHT-CET Process, Dates & Documents",
  description: "Complete BTech admission process in Pune 2026. MHT-CET registration, CAP rounds, documents required, important dates, and direct admission options for engineering colleges.",
  path: "/btech-admission-in-pune",
  keywords: [
    "btech admission in pune", "btech admission pune 2026", "mht cet btech admission pune",
    "engineering admission pune 2026", "cap round engineering pune", "btech admission process pune",
    "how to get btech admission pune", "btech admission documents pune",
  ],
})
export const revalidate = 300

const admissionSteps = [
  { step: 1, title: "Appear in MHT-CET 2026 (PCM)", description: "Register on mahacet.org and appear for MHT-CET PCM (Physics, Chemistry, Mathematics) exam held in April–May 2026. This is the primary eligibility exam for 90%+ of BTech seats in Pune. Score determines your CAP round eligibility and college options." },
  { step: 2, title: "Check MHT-CET Results & Percentile", description: "MHT-CET 2026 results are declared in June. Your percentile (0–100) determines your rank in Maharashtra. Target percentile: COEP requires 99+, PICT/VIT Pune 92–97+, mid-tier colleges 70–85+. Use the CollegePune predictor to know which colleges you can target." },
  { step: 3, title: "Register on DTE Maharashtra CAP Portal", description: "After results, register on dtemaharashtra.gov.in for the Centralized Admission Process (CAP). Upload documents: 10th and 12th marksheets, MHT-CET scorecard, domicile certificate, caste certificate (if applicable), Aadhar. Complete Facilitation Centre (FC) document verification." },
  { step: 4, title: "Fill Online Option Form (College Preferences)", description: "The most critical step. Fill your college-branch preferences in order of priority. You can add up to 300 preferences. Research each college's closing cutoff from previous years. Use CollegePune's comparison tool to shortlist. Changing preferences multiple times before the lock-in date is allowed." },
  { step: 5, title: "CAP Round 1 Allotment (July 2026)", description: "DTE Maharashtra releases Round 1 allotment in July 2026. If satisfied with the allotment, accept the seat by paying ₹25,000 acceptance fee. You can still participate in Round 2 if you want a better college. Floating: you stay in the system for improvement." },
  { step: 6, title: "CAP Round 2 & 3 (July–August 2026)", description: "Round 2 and Round 3 allow seat upgrades. After Round 3, spot admission rounds are conducted for remaining vacant seats. Cutoffs typically drop 2–5 percentile in each successive round." },
  { step: 7, title: "Report to College & Complete Admission", description: "Accept your final allotment and pay full semester fees. Report to the college with all original certificates for document verification. Complete the enrollment formalities. Classes begin August 2026." },
]

const faqs = [
  { question: "What is the BTech admission process in Pune 2026?", answer: "BTech admission in Pune 2026: Appear in MHT-CET PCM (April–May 2026) → Check results (June) → Register on DTE Maharashtra CAP portal → Document verification → Fill college preferences → CAP Round 1 allotment (July) → Round 2/3 for improvement → Report to college (August 2026). For deemed universities (MIT-WPU, SIT), apply directly via their own process." },
  { question: "What is the last date for BTech admission in Pune 2026?", answer: "BTech admission 2026 timeline: MHT-CET registration: February–March 2026. Exam: April–May 2026. Results: June 2026. CAP registration: June–July 2026. Round 1: July 2026. Round 2: Late July 2026. Round 3 / Spot: August 2026. Classes begin: August 2026. Direct/Management quota deadline: August–September 2026." },
  { question: "What documents are needed for BTech admission in Pune?", answer: "Documents for BTech CAP admission in Pune: MHT-CET 2026 scorecard, 10th marksheet + passing certificate, 12th marksheet + passing certificate, Maharashtra domicile certificate, Caste/Category certificate (OBC/SC/ST/NT/EBC — must be recent), Non-creamy layer certificate (OBC/NT), Aadhar card, passport photos, gap certificate (if applicable)." },
  { question: "Can I get BTech admission in Pune without MHT-CET?", answer: "Yes. Management quota seats (15% of intake) at private Pune BTech colleges don't require MHT-CET. Apply directly to the college with 12th PCM marks and pay higher management quota fees. JEE Main score alone can secure seats at deemed universities (MIT-WPU, SIT Pune). Direct admission is also available through the college's own entrance test." },
  { question: "What is the minimum percentage for BTech admission in Pune?", answer: "Minimum eligibility for BTech in Pune: 10+2 with Physics, Chemistry, Mathematics (PCM) and 50% aggregate (45% for OBC/SC/ST/NT/SBC). MHT-CET score is the primary admission criterion — percentage alone doesn't guarantee admission at competitive colleges. Government colleges have 50% minimum + high MHT-CET percentile requirement." },
]

export default function BTechAdmissionInPune() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
    { name: "BTech Admission in Pune", url: "/btech-admission-in-pune" },
  ])
  const howToSchema = generateHowToSchema("BTech Admission Process in Pune 2026", admissionSteps)

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1.5">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/btech-colleges-in-pune" className="hover:text-white">BTech Colleges Pune</Link><span>›</span>
              <span className="text-white">Admission</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">BTech Admission in Pune 2026</h1>
            <p className="text-blue-100 mb-5">Complete step-by-step guide — MHT-CET to CAP allotment to enrollment. All dates, documents and deadlines.</p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-3xl" data-speakable="true">
              <p className="text-green-300 text-xs font-bold uppercase mb-1">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                BTech admission in Pune is through <strong>MHT-CET PCM</strong> (April–May 2026) → DTE Maharashtra <strong>CAP rounds</strong> (July–August 2026). JEE Main is not mandatory — MHT-CET alone is sufficient. Management quota is available without any entrance exam. Classes begin August 2026.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {[
                { v: "MHT-CET", l: "Primary Exam" },
                { v: "3 Rounds", l: "CAP Rounds" },
                { v: "August 2026", l: "Classes Begin" },
                { v: "300", l: "Max Preferences" },
              ].map(s => (
                <div key={s.l} className="bg-white/10 rounded-xl px-4 py-3 text-center">
                  <p className="text-xl font-extrabold text-orange-400">{s.v}</p>
                  <p className="text-xs text-white/70 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

          {/* Important Dates */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">BTech Admission 2026 — Important Dates</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 text-left text-gray-600"><th className="px-4 py-2 font-semibold">Event</th><th className="px-4 py-2 font-semibold">Date</th><th className="px-4 py-2 font-semibold">Action</th></tr></thead>
                <tbody>
                  {[
                    { event: "MHT-CET PCM Registration", date: "Feb–Mar 2026", action: "Register at mahacet.org" },
                    { event: "MHT-CET PCM Exam", date: "April–May 2026", action: "Appear for the exam" },
                    { event: "MHT-CET Results", date: "June 2026", action: "Check percentile" },
                    { event: "CAP Registration + FC Verification", date: "June–July 2026", action: "Register on DTE portal" },
                    { event: "Online Option Form", date: "June–July 2026", action: "Fill college preferences" },
                    { event: "CAP Round 1 Allotment", date: "July 2026", action: "Accept or wait for Round 2" },
                    { event: "CAP Round 2", date: "Late July 2026", action: "Seat upgrade option" },
                    { event: "CAP Round 3 / Spot", date: "August 2026", action: "Final allotment" },
                    { event: "Direct / Mgmt Quota", date: "July–Sep 2026", action: "Apply directly to college" },
                    { event: "Classes Begin", date: "August 2026", action: "Orientation + induction" },
                  ].map((r, i) => (
                    <tr key={r.event} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-2.5 font-medium text-gray-800">{r.event}</td>
                      <td className="px-4 py-2.5 text-blue-700 font-semibold">{r.date}</td>
                      <td className="px-4 py-2.5 text-gray-500 text-xs">{r.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Steps */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Step-by-Step BTech Admission Process 2026</h2>
            <div className="space-y-5">
              {admissionSteps.map(s => (
                <div key={s.step} className="flex gap-4">
                  <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">{s.step}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{s.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Documents */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Documents Required for BTech Admission in Pune</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[
                "MHT-CET 2026 scorecard / JEE Main scorecard",
                "10th (SSC) Marksheet + Passing Certificate",
                "12th (HSC) Marksheet + Passing Certificate",
                "Maharashtra Domicile Certificate",
                "Caste Certificate — OBC/SC/ST/NT (if applicable)",
                "Non-Creamy Layer Certificate (OBC/NT — recent)",
                "EBC/EWS Certificate (if applicable)",
                "Aadhar Card / Photo ID",
                "3 Passport-size Photographs",
                "Migration Certificate (if from another board)",
                "Gap Certificate (if gap year after 12th)",
                "College Allotment Letter (after CAP)",
              ].map(d => (
                <div key={d} className="flex items-start gap-2 p-2.5 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                  <span className="text-gray-700">{d}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQs — BTech Admission Pune 2026</h2>
            <div className="space-y-0 divide-y divide-gray-100">
              {faqs.map((faq, i) => (
                <details key={faq.question} className="group py-4" open={i === 0}>
                  <summary className="cursor-pointer flex items-start justify-between gap-4 list-none">
                    <h3 className="text-sm font-semibold text-gray-800 leading-snug">{faq.question}</h3>
                    <span className="shrink-0 text-gray-400 mt-0.5 text-xs">▾</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed pr-6">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related */}
          <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">Related Pages</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "BTech via MHT-CET", href: "/btech-colleges-in-pune-through-mht-cet" },
                { label: "BTech without JEE", href: "/btech-colleges-in-pune-without-jee" },
                { label: "BTech Direct Admission", href: "/btech-colleges-in-pune-direct-admission" },
                { label: "Best BTech Colleges", href: "/best-btech-colleges-in-pune" },
                { label: "MHT-CET Counselling 2026", href: "/mht-cet-counselling-pune-2026" },
                { label: "College Predictor", href: "/predictor" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">{l.label}</Link>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Need Help With BTech Admission in Pune?</h2>
            <p className="text-gray-300 mb-5 text-sm">Free counselling — our advisors guide you through the entire CAP process and option form strategy.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg">Book Free Session →</Link>
              <Link href="/predictor" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg">College Predictor</Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
