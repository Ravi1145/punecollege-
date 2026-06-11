import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateHowToSchema } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "MBA Admission Process in Pune 2026 | Step-by-Step Guide | MAH-CET to Enrollment",
  description: "Complete MBA admission process in Pune 2026. Step-by-step guide from MAH-CET registration to DTE Maharashtra CAP allotment, fees payment, and enrollment. All important dates.",
  path: "/mba-admission-process-pune",
  keywords: ["mba admission process pune", "mba admission pune 2026", "how to get mba admission pune", "dte mba admission pune", "mah cet mba admission process pune 2026"],
})
export const revalidate = 300

const steps = [
  { step: 1, title: "Appear in MAH-CET MBA 2026", description: "Register on cetcell.mahacet.org and appear for MAH-CET MBA (held in March 2026). The exam is 2.5 hours with 200 MCQs covering Logical Reasoning (75), Abstract Reasoning (25), Quantitative Aptitude (50), and Verbal/Reading Comprehension (50). Score is valid for 1 year." },
  { step: 2, title: "For Symbiosis Colleges — Appear in SNAP 2025", description: "SIBM Pune, SCMHRD, SIIB require SNAP (Symbiosis National Aptitude Test), held in December. Register at snaptest.org. SNAP is separate from MAH-CET — you need both if targeting Symbiosis + other Pune colleges." },
  { step: 3, title: "Check Results and Calculate Percentile", description: "MAH-CET MBA results are declared in April–May 2026. Your percentile determines which colleges you can target. Use the CollegePune predictor to identify your college options based on your percentile and category." },
  { step: 4, title: "Register on DTE Maharashtra CAP Portal", description: "After results, register on the DTE Maharashtra CAP portal (dtemaharashtra.gov.in). Fill in personal details, upload documents: MAH-CET scorecard, 10th-12th marksheets, graduation marksheet/certificate, category certificate (if applicable), domicile certificate." },
  { step: 5, title: "Document Verification", description: "Attend document verification at a Facilitation Centre (FC) near you. This is mandatory for CAP participation. Bring original + attested photocopies of all documents. Verification is usually done in May–June 2026." },
  { step: 6, title: "Fill Online Option Form (College Preferences)", description: "The most critical step. Fill up to 300 college-branch preferences in decreasing order of preference. Research each college's cutoff, fees, placement, location. Use the CollegePune comparison tool to finalize your preference list." },
  { step: 7, title: "CAP Round 1 Allotment", description: "DTE releases CAP Round 1 seat allotment in July 2026. If you get a seat, you must pay the seat acceptance fee (₹15,000–₹25,000 for provisional acceptance). You can still participate in Round 2 if you want a better college." },
  { step: 8, title: "CAP Round 2 & 3 Allotment", description: "CAP Round 2 and 3 run in July–August 2026. Each round allows seat improvements (better college/branch). After Round 3, a final spot admission round is conducted for remaining vacant seats." },
  { step: 9, title: "Report to College & Pay Full Fees", description: "After accepting your final allotment, report to the college within the stipulated date. Pay the remaining semester fees. Submit all original certificates for verification. MBA classes typically begin in August 2026." },
]

const faqs = [
  { question: "What is the complete MBA admission process in Pune for 2026?", answer: "MBA admission in Pune 2026: (1) Appear in MAH-CET MBA (March 2026). (2) Register on DTE Maharashtra portal after results. (3) Document verification at Facilitation Centre. (4) Fill online option form with college preferences. (5) CAP Rounds 1-3 for seat allotment (July-August 2026). (6) Pay acceptance fee. (7) Report to college." },
  { question: "What documents are needed for MBA admission in Pune?", answer: "Documents for MBA CAP admission in Pune: MAH-CET MBA scorecard, 10th marksheet + certificate, 12th marksheet + certificate, Graduation marksheet (all semesters) + degree certificate, Category/Caste certificate (OBC/SC/ST/NT/EBC — recent non-creamy layer certificate), Maharashtra domicile certificate, Aadhar card, 2 passport photos, Admission fee DD/payment." },
  { question: "Can I get direct admission in MBA in Pune without MAH-CET?", answer: "Yes. Management quota seats (typically 15-20% of intake) at private Pune MBA colleges are available without going through CAP. You apply directly to the college. Management quota fees are usually 1.5–2× the regular CAP fees. Deemed universities like SIBM, MIT-WPU have institutional quota seats for direct admission." },
  { question: "What is the MBA admission last date in Pune 2026?", answer: "MBA 2026 admission timeline: MAH-CET registration: January-February 2026. Exam: March 2026. Results: April-May 2026. CAP Round 1: July 2026. CAP Round 2: Late July 2026. CAP Round 3: August 2026. Direct/Spot admission: August-September 2026. Classes begin: August 2026." },
]

export default function MBAAdmissionProcess() {
  const howToSchema = generateHowToSchema("MBA Admission Process in Pune 2026", steps.map(s => ({ step: s.step, title: s.title, description: s.description })))
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Admission Process", url: "/mba-admission-process-pune" },
  ])

  return (
    <>
      <Script id="howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1.5">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/mba-colleges-in-pune" className="hover:text-white">MBA Colleges Pune</Link><span>›</span>
              <span className="text-white">Admission Process</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">MBA Admission Process in Pune 2026</h1>
            <p className="text-blue-100 mb-4">Complete step-by-step guide from MAH-CET registration to enrollment — all important dates and documents.</p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-3xl" data-speakable="true">
              <p className="text-green-300 text-xs font-bold uppercase mb-1">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">MBA admission in Pune is through <strong>MAH-CET MBA</strong> (March 2026) → DTE Maharashtra CAP rounds (July-August 2026). For Symbiosis colleges, <strong>SNAP</strong> (December 2025) is required separately. Classes begin August 2026.</p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

          {/* Important Dates */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">MBA Admission 2026 — Important Dates</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 text-left text-gray-600"><th className="px-4 py-2 font-semibold">Event</th><th className="px-4 py-2 font-semibold">Expected Date</th><th className="px-4 py-2 font-semibold">Action</th></tr></thead>
                <tbody>
                  {[
                    { event: "SNAP 2025 Exam", date: "December 2025", action: "For Symbiosis colleges" },
                    { event: "MAH-CET MBA 2026 Registration", date: "January-February 2026", action: "Register at cetcell.mahacet.org" },
                    { event: "MAH-CET MBA 2026 Exam", date: "March 2026", action: "Appear for the exam" },
                    { event: "MAH-CET MBA Results", date: "April-May 2026", action: "Check percentile" },
                    { event: "CAP Registration + Doc Verification", date: "May-June 2026", action: "Register on DTE portal" },
                    { event: "Online Option Form", date: "June-July 2026", action: "Fill college preferences" },
                    { event: "CAP Round 1 Allotment", date: "July 2026", action: "Accept or wait for Round 2" },
                    { event: "CAP Round 2", date: "Late July 2026", action: "Seat improvement" },
                    { event: "CAP Round 3 / Spot Admission", date: "August 2026", action: "Final allotment" },
                    { event: "Reporting to College", date: "August 2026", action: "Fee payment + enrollment" },
                    { event: "MBA Classes Begin", date: "August 2026", action: "Orientation + induction" },
                  ].map((r, i) => (
                    <tr key={r.event} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-2.5 font-medium text-gray-800">{r.event}</td>
                      <td className="px-4 py-2.5 text-blue-700 font-semibold">{r.date}</td>
                      <td className="px-4 py-2.5 text-gray-600 text-xs">{r.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Step-by-Step */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Step-by-Step MBA Admission Guide 2026</h2>
            <div className="space-y-5">
              {steps.map(s => (
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Documents Required for MBA Admission in Pune</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {["MAH-CET MBA 2026 scorecard", "10th Marksheet + Certificate", "12th Marksheet + Certificate", "Graduation Marksheets (all semesters)", "Provisional/Degree Certificate", "Caste Certificate (if applicable)", "Maharashtra Domicile Certificate", "Non-Creamy Layer Certificate (OBC/NT)", "Aadhar Card / Photo ID", "2 Passport-size Photographs", "Migration Certificate", "Gap Certificate (if applicable)"].map(doc => (
                <div key={doc} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                  <span className="text-green-500 shrink-0">✓</span>
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQ — MBA Admission Pune 2026</h2>
            <div className="space-y-3">
              {faqs.map(faq => (
                <details key={faq.question} className="border border-gray-100 rounded-xl p-4">
                  <summary className="cursor-pointer font-semibold text-gray-800 text-sm flex justify-between items-center">
                    {faq.question}<span className="text-gray-400 shrink-0 ml-2">▾</span>
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
                { label: "MBA Cutoff Pune", href: "/mba-cutoff-pune" },
                { label: "MBA Accepting MAH-CET", href: "/mba-colleges-in-pune-accepting-mh-cet" },
                { label: "MBA Direct Admission", href: "/mba-colleges-in-pune-direct-admission" },
                { label: "MBA Under 5 Lakh", href: "/mba-colleges-in-pune-under-5-lakh" },
                { label: "MHT-CET Counselling Guide", href: "/mht-cet-counselling-pune-2026" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">{l.label}</Link>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">MBA Admission Guidance — Free</h2>
            <p className="text-gray-300 mb-5 text-sm">Our counsellors will walk you through the entire CAP process and help you fill the perfect option form.</p>
            <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg inline-block">Book Free Session →</Link>
          </section>
        </div>
      </div>
    </>
  )
}
