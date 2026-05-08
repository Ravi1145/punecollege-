import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle, BookOpen } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Engineering Admission in Pune Without JEE 2026 | MHT-CET Only Colleges",
  description:
    "Get B.Tech admission in Pune without JEE Main score in 2026. 80%+ of Pune engineering colleges accept MHT-CET only. List of top colleges, lateral entry, and management quota options.",
  path: "/engineering-admission-pune-without-jee",
  keywords: [
    "engineering admission without jee pune",
    "admission without entrance exam pune engineering",
    "btech admission pune without jee",
    "mht-cet only colleges pune",
    "engineering colleges pune without jee main",
    "lateral entry btech pune",
    "direct admission engineering pune",
  ],
})

const mhtCetOnlyColleges = [
  { name: "College of Engineering Pune (COEP)", type: "Government", naac: "A+", nirf: 49, jeeRequired: false, note: "MHT-CET 95+ %ile for CSE" },
  { name: "JSPM Rajarshi Shahu College of Engineering", type: "Private", naac: "A", nirf: null, jeeRequired: false, note: "MHT-CET 60–75 %ile" },
  { name: "AISSMS College of Engineering", type: "Private", naac: "A", nirf: null, jeeRequired: false, note: "MHT-CET 60–70 %ile" },
  { name: "Sinhgad College of Engineering", type: "Private", naac: "A", nirf: null, jeeRequired: false, note: "MHT-CET 65–75 %ile" },
  { name: "Indira College of Engineering", type: "Private", naac: "B++", nirf: null, jeeRequired: false, note: "MHT-CET 55–65 %ile" },
  { name: "D.Y. Patil College of Engineering, Akurdi", type: "Private", naac: "A", nirf: null, jeeRequired: false, note: "MHT-CET 60–70 %ile" },
  { name: "Bharati Vidyapeeth College of Engineering", type: "Deemed", naac: "A", nirf: null, jeeRequired: false, note: "MHT-CET or BVP CET" },
]

const bothExamColleges = [
  { name: "PICT Pune", type: "Autonomous", naac: "A", jeeNote: "Optional — MHT-CET preferred", cutoff: "92–95 %ile MHT-CET" },
  { name: "VIT Pune", type: "Autonomous", naac: "A+", jeeNote: "JEE accepted but MHT-CET primary", cutoff: "88–92 %ile MHT-CET" },
  { name: "SIT Pune (Symbiosis)", type: "Deemed", naac: "A+", jeeNote: "SET / JEE / MHT-CET all accepted", cutoff: "SET or JEE 85+ %ile" },
  { name: "MIT-WPU Pune", type: "Deemed", naac: "A+", jeeNote: "MHT-CET or JEE both accepted", cutoff: "75–85 %ile MHT-CET" },
  { name: "Cummins College of Engineering", type: "Autonomous", naac: "A+", jeeNote: "MHT-CET or JEE", cutoff: "88–92 %ile MHT-CET" },
]

const faqs = [
  {
    question: "Is JEE compulsory for engineering colleges in Pune?",
    answer: "No — JEE Main is NOT compulsory for most Pune engineering colleges. Over 80% of Pune colleges — including COEP, JSPM, AISSMS, Sinhgad, Indira, and D.Y. Patil — admit students through MHT-CET only. JEE is optional at VIT Pune, MIT-WPU, and SIT Pune, and mandatory for IITs/NITs only.",
  },
  {
    question: "What MHT-CET percentile is needed to get into COEP without JEE?",
    answer: "For Computer Engineering at COEP (the most competitive branch), you need 99.5+ percentile in MHT-CET. For Mechanical Engineering at COEP, you need 95+ percentile. For Civil and other branches, 90+ percentile is typically sufficient. These are General category cutoffs — SC/ST students get 10–15 percentile relaxation.",
  },
  {
    question: "Can I get admission in a top Pune engineering college with only MHT-CET?",
    answer: "Yes. COEP (NIRF #49), PICT (best CS college in Pune), and VIT Pune (NIRF #101) all accept MHT-CET as the primary entrance exam. You don't need JEE to get into these top-ranked colleges. PICT and VIT Pune accept MHT-CET; JEE score is optional and rarely changes the allocation.",
  },
  {
    question: "What is lateral entry admission in Pune engineering colleges without JEE?",
    answer: "Diploma holders can get direct admission to the 2nd year of B.Tech programs at Pune engineering colleges through lateral entry — without JEE Main. DTE Maharashtra conducts the Direct Second Year (DSE) CAP rounds. Eligible candidates: 3-year diploma in relevant branch with 45%+ marks. Top colleges accepting lateral entry: COEP, VIT Pune, PICT, JSPM RSCOE.",
  },
  {
    question: "How to apply for MHT-CET 2026?",
    answer: "Register on cetcell.mahacet.org. MHT-CET 2026 registration: January–February 2026. Exam: April 15 – May 15, 2026 (PCM group for engineering). Results: June 2026. CAP Round 1 counselling: July 2026. Eligibility: 12th pass with Physics, Chemistry, Mathematics (PCM), minimum 45% marks (40% for reserved categories).",
  },
  {
    question: "Can I get management quota BTech in Pune without JEE or MHT-CET?",
    answer: "Yes. Private and deemed engineering colleges in Pune (VIT Pune, MIT-WPU, SIT Pune, Cummins, JSPM) offer management quota seats that don't require JEE or MHT-CET scores. You only need a 12th pass with PCM. Management quota fees are typically 2–3x regular fees (₹2.5L–₹5L/yr). Contact the college admissions office directly.",
  },
  {
    question: "Which Pune engineering college can I get with 70 percentile in MHT-CET without JEE?",
    answer: "With 70 percentile in MHT-CET (without JEE), you can target: JSPM RSCOE (60–75 %ile), AISSMS College of Engineering (60–70 %ile), Sinhgad College of Engineering (65–75 %ile), Indira College of Engineering (55–65 %ile), D.Y. Patil College Akurdi (60–70 %ile). All these colleges accept MHT-CET only — no JEE required.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "Engineering Colleges Pune", url: "/engineering-colleges-pune" },
  { name: "Admission Without JEE", url: "/engineering-admission-pune-without-jee" },
]

export default function EngineeringAdmissionWithoutJEEPage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-[#F8FAFC] min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <Link href="/engineering-colleges-pune" className="hover:text-white">Engineering Colleges Pune</Link>
              <span>›</span>
              <span className="text-white">Admission Without JEE</span>
            </nav>
            <div className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-3">✅ JEE NOT Required at 80%+ Pune Colleges</div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Engineering Admission in Pune Without JEE 2026
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Get B.Tech / BE admission at top Pune engineering colleges using only MHT-CET score. Complete guide to MHT-CET colleges, lateral entry, and management quota routes — no JEE needed.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Yes, you can get B.Tech admission in Pune without JEE Main.</strong> Over 80% of Pune engineering colleges — including <strong>COEP</strong> (NIRF #49), <strong>PICT</strong>, <strong>JSPM</strong>, and <strong>AISSMS</strong> — admit students through <strong>MHT-CET only</strong>. Alternatives: lateral entry (diploma holders, no entrance exam), management quota (12th pass sufficient, no JEE/MHT-CET needed).
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "MHT-CET Only Colleges", value: "80%+", icon: "🎯" },
              { label: "Top College Without JEE", value: "COEP", icon: "🏆" },
              { label: "Lateral Entry Option", value: "2nd Year", icon: "📚" },
              { label: "Mgmt Quota", value: "No Exam", icon: "✅" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-lg font-extrabold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* MHT-CET Only Colleges */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100 bg-green-50">
              <h2 className="text-lg font-bold text-gray-900">✅ Pune Engineering Colleges Accepting MHT-CET Only (No JEE Required)</h2>
              <p className="text-xs text-gray-500 mt-0.5">These colleges do NOT require JEE Main for B.Tech admission 2026.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-center hidden sm:table-cell">NAAC</th>
                    <th className="px-4 py-3 text-center hidden md:table-cell">NIRF</th>
                    <th className="px-4 py-3 text-left">MHT-CET Cutoff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mhtCetOnlyColleges.map((c) => (
                    <tr key={c.name} className="hover:bg-green-50/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                        <span className="text-xs text-gray-500">{c.type}</span>
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.naac === "A+" ? "bg-green-100 text-green-700" : c.naac === "A" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                          {c.naac}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center hidden md:table-cell text-xs text-gray-500">
                        {c.nirf ? `#${c.nirf}` : "—"}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Both Exams */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100 bg-blue-50">
              <h2 className="text-lg font-bold text-gray-900">Colleges Accepting Both JEE & MHT-CET (JEE Optional)</h2>
              <p className="text-xs text-gray-500 mt-0.5">JEE score gives a slight advantage but MHT-CET alone is sufficient for admission.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#1E3A5F] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-left hidden sm:table-cell">JEE Status</th>
                    <th className="px-4 py-3 text-left">MHT-CET Cutoff</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {bothExamColleges.map((c) => (
                    <tr key={c.name} className="hover:bg-blue-50/20 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                        <span className="text-xs text-gray-500">{c.type} · NAAC {c.naac}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600 hidden sm:table-cell">{c.jeeNote}</td>
                      <td className="px-4 py-3 text-xs font-medium text-orange-700">{c.cutoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alternate Routes */}
          <h2 className="text-xl font-bold text-gray-900 mb-5">Other Routes to Engineering Admission in Pune Without JEE</h2>
          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            {[
              {
                title: "Lateral Entry (Diploma → BTech)",
                icon: "📘",
                color: "blue",
                points: [
                  "Direct 2nd year B.Tech admission for diploma holders",
                  "No JEE or MHT-CET required",
                  "Need: 3-year diploma in relevant branch with 45%+ marks",
                  "DTE Maharashtra conducts DSE-CAP rounds (July–August)",
                  "Available at COEP, VIT Pune, PICT, JSPM RSCOE, AISSMS",
                  "About 10–15% of total intake reserved for lateral entry",
                ],
              },
              {
                title: "Management Quota (No Entrance Exam)",
                icon: "🏛️",
                color: "orange",
                points: [
                  "No JEE, no MHT-CET required",
                  "Only 12th pass with PCM needed",
                  "Available at private & deemed colleges (VIT Pune, MIT-WPU, SIT Pune)",
                  "Fees 2–3x regular: ₹2.5L–₹5L per year",
                  "Contact college admissions office directly",
                  "AICTE-regulated, legally valid admission",
                ],
              },
            ].map(({ title, icon, color, points }) => (
              <div key={title} className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5`}>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">{icon}</span> {title}
                </h3>
                <ul className="space-y-1.5">
                  {points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${color === "blue" ? "text-blue-500" : "text-orange-500"}`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* MHT-CET Process */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> MHT-CET 2026 — Key Dates & How to Apply
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Event</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Date (Expected)</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { event: "MHT-CET Registration", date: "Jan–Feb 2026", detail: "cetcell.mahacet.org · ₹800 fee (Gen) · ₹600 (Reserved)" },
                    { event: "Admit Card", date: "April 2026", detail: "Download from official portal" },
                    { event: "MHT-CET Exam (PCM)", date: "Apr 15–May 15, 2026", detail: "Online CBT mode · 100 MCQ · 180 min" },
                    { event: "Result Declaration", date: "June 2026", detail: "Percentile score released on portal" },
                    { event: "CAP Registration", date: "June–July 2026", detail: "Register at dtemaharashtra.gov.in" },
                    { event: "CAP Round 1 Allotment", date: "July 2026", detail: "College preferences locked, seat allotted" },
                    { event: "CAP Round 2", date: "August 2026", detail: "Seat upgrade / re-allotment round" },
                    { event: "Direct Admission / Mgmt Quota", date: "August–September 2026", detail: "Contact colleges directly" },
                  ].map((row) => (
                    <tr key={row.event} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-medium text-gray-900">{row.event}</td>
                      <td className="px-4 py-2.5 text-orange-700 font-semibold">{row.date}</td>
                      <td className="px-4 py-2.5 text-gray-500 text-xs hidden sm:table-cell">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQs — Engineering Admission in Pune Without JEE</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <p className="font-bold text-lg">Know your MHT-CET percentile?</p>
              <p className="text-blue-200 text-sm">Use our predictor or get free counselling to find your best college match.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/predictor" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                College Predictor →
              </Link>
              <Link href="/counselling" className="flex items-center justify-center gap-2 bg-white text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors">
                Free Counselling →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
