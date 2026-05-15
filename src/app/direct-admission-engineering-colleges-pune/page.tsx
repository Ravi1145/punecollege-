import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle, AlertCircle, BookOpen, Users, Phone } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Direct Admission in Engineering Colleges Pune 2026 | Management Quota",
  description:
    "Get direct admission in Pune engineering colleges 2026 without MHT-CET rank. Management quota seats, NRI quota, and direct BTech admission process at COEP, PICT, VIT Pune & more.",
  path: "/direct-admission-engineering-colleges-pune",
  keywords: [
    "btech direct admission pune",
    "engineering direct admission pune",
    "direct admission in engineering colleges pune",
    "management quota engineering pune",
    "engineering admission without jee pune",
  ],
})

const managementQuotaColleges = [
  {
    name: "VIT Pune (Vishwakarma Institute of Technology)",
    quota: "~15%",
    regularFees: "₹1.6L–₹2.2L/yr",
    mgmtFees: "₹2.5L–₹3.5L/yr",
    eligibility: "12th PCM 50%+, no rank required",
    note: "Autonomous — limited MQ seats",
  },
  {
    name: "MIT-WPU (MIT World Peace University)",
    quota: "~20%",
    regularFees: "₹2.0L–₹3.8L/yr",
    mgmtFees: "₹3L–₹4.5L/yr",
    eligibility: "12th PCM 45%+, direct application",
    note: "Deemed University — higher MQ %",
  },
  {
    name: "SIT Pune (Symbiosis Institute of Technology)",
    quota: "~15%",
    regularFees: "₹3.6L–₹4.8L/yr",
    mgmtFees: "₹5L–₹6L/yr",
    eligibility: "12th PCM 50%+, SET score optional",
    note: "Premium deemed — fewer MQ seats",
  },
  {
    name: "MIT College of Engineering (MITCOE)",
    quota: "~25%",
    regularFees: "₹1.4L–₹1.8L/yr",
    mgmtFees: "₹2.5L–₹3.8L/yr",
    eligibility: "12th PCM 45%+",
    note: "Affiliated — higher MQ availability",
  },
  {
    name: "Cummins College of Engineering for Women",
    quota: "~10%",
    regularFees: "₹1.3L–₹1.75L/yr",
    mgmtFees: "₹2.2L–₹3L/yr",
    eligibility: "Female candidates, 12th PCM 45%+",
    note: "Women-only — very limited MQ seats",
  },
  {
    name: "JSPM Rajarshi Shahu College of Engineering",
    quota: "~30%",
    regularFees: "₹1.2L–₹1.7L/yr",
    mgmtFees: "₹2L–₹2.8L/yr",
    eligibility: "12th PCM 40%+",
    note: "Best MQ availability in Pune",
  },
  {
    name: "AISSMS College of Engineering",
    quota: "~30%",
    regularFees: "₹1.1L–₹1.55L/yr",
    mgmtFees: "₹1.9L–₹2.6L/yr",
    eligibility: "12th PCM 40%+",
    note: "Affordable management quota",
  },
]

const feeComparison = [
  {
    college: "VIT Pune",
    regular: "₹1.6L–₹2.2L/yr",
    mgmt: "₹2.5L–₹3.5L/yr",
    premium: "~55%",
  },
  {
    college: "MIT-WPU",
    regular: "₹2.0L–₹3.8L/yr",
    mgmt: "₹3L–₹4.5L/yr",
    premium: "~45%",
  },
  {
    college: "SIT Pune",
    regular: "₹3.6L–₹4.8L/yr",
    mgmt: "₹5L–₹6L/yr",
    premium: "~35%",
  },
  {
    college: "Cummins College",
    regular: "₹1.3L–₹1.75L/yr",
    mgmt: "₹2.2L–₹3L/yr",
    premium: "~70%",
  },
]

const faqs = [
  {
    question: "Is management quota admission legal in Pune engineering colleges?",
    answer:
      "Yes, management quota admission is completely legal. It is regulated by AICTE (All India Council for Technical Education) and DTE Maharashtra (Directorate of Technical Education). Private and deemed universities are permitted to fill up to 15–30% of their seats through institute-level (management quota) admissions. Fees are capped and approved by the Fee Regulating Authority (FRA) of Maharashtra.",
  },
  {
    question: "Does COEP have management quota seats?",
    answer:
      "No. College of Engineering Pune (COEP) is a government autonomous institute and does NOT offer management quota seats. 100% of its seats are filled through CAP (Centralized Admission Process) rounds conducted by DTE Maharashtra via MHT-CET or JEE Main scores.",
  },
  {
    question: "What documents are required for direct admission in Pune engineering college?",
    answer:
      "For management quota direct admission you need: Class 12 marksheet and passing certificate, Class 10 marksheet, Photo ID (Aadhar card), passport size photographs (6–8), migration certificate, gap certificate (if applicable), domicile certificate (for Maharashtra quota), and an MHT-CET scorecard (though rank may not be mandatory for MQ seats).",
  },
  {
    question: "How much does management quota cost compared to regular seats?",
    answer:
      "Management quota fees are typically 1.5x to 2.5x higher than regular CAP round fees. For example, VIT Pune regular fees are ₹1.6L–₹2.2L/year while management quota fees are ₹2.5L–₹3.5L/year. SIT Pune regular fees are ₹3.6L–₹4.8L/year vs management quota ₹5L–₹6L/year. Total extra cost over 4 years can range from ₹3L to ₹8L.",
  },
  {
    question: "Can I get direct BTech admission in Pune without any entrance exam?",
    answer:
      "Through the management quota route, some private and deemed colleges in Pune may consider direct admission primarily based on Class 12 PCM percentage without requiring an entrance exam score. However, at least 45–50% marks in 12th PCM are required. JSPM, AISSMS, and some other private colleges have the most flexible criteria for management quota.",
  },
  {
    question: "What is the NRI quota in Pune engineering colleges?",
    answer:
      "NRI (Non-Resident Indian) quota is typically 5–15% of seats reserved for NRI students or those sponsored by NRI relatives. Fees are charged in USD and are significantly higher (often $4,000–$8,000/year). Deemed universities like MIT-WPU, SIT Pune, and Symbiosis institutions are popular for NRI quota admissions. You need a valid NRI/OCI status and sponsorship letter.",
  },
  {
    question: "When does management quota admission process start in Pune?",
    answer:
      "Management quota admission typically begins after CAP Round 1 or Round 2 results (usually July–August). Colleges open their institute-level admission windows after DTE releases the CAP schedule. For 2026, the process is expected to start in August 2026. Contact individual college admission offices directly starting June 2026 to register your interest early.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Admissions", url: "/admissions" },
  { name: "Direct Admission Engineering Pune", url: "/direct-admission-engineering-colleges-pune" },
]

export default function DirectAdmissionEngineeringPage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>›</span>
              <Link href="/admissions" className="hover:text-white">
                Admissions
              </Link>
              <span>›</span>
              <span className="text-white">Direct Admission Engineering Pune</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Direct Admission in Engineering Colleges Pune 2026
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Complete guide to management quota, NRI quota, and direct BTech admission in Pune 2026. Fees, eligibility,
              and step-by-step process explained.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl mb-6">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Yes, direct/management quota admission is available</strong> in private and deemed engineering
                colleges in Pune. <strong>COEP and government colleges don&apos;t offer management quota</strong> — only
                CAP rounds. Colleges like VIT Pune, MIT-WPU, SIT Pune, JSPM, and AISSMS have 10–30% management quota
                seats. Fees are 1.5–2.5x higher than regular seats.
              </p>
            </div>
            {/* Above-fold CTA */}
            <Link
              href="/counselling"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              <Phone className="w-4 h-4" /> Get Free Counselling for Direct Admission →
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Colleges with MQ", value: "20+", icon: "🏛️" },
              { label: "Min MQ Seats %", value: "10%", icon: "📊" },
              { label: "Max MQ Seats %", value: "30%", icon: "📈" },
              { label: "Extra Fees (MQ)", value: "1.5–2.5x", icon: "💰" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-lg font-extrabold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Section 1: What is MQ */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> What is Direct / Management Quota Admission?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">CAP Rounds (Regular Admission)</h3>
                <ul className="space-y-2">
                  {[
                    "Conducted by DTE Maharashtra centrally",
                    "Based on MHT-CET or JEE Main merit rank",
                    "Covers 70–90% of available seats",
                    "Lower fees — government regulated",
                    "Transparent, competitive process",
                    "COEP, PICT, VIT, JSPM, AISSMS all participate",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Management Quota (Direct Admission)</h3>
                <ul className="space-y-2">
                  {[
                    "Managed by individual college admission office",
                    "Based primarily on 12th PCM marks",
                    "Covers 10–30% of private college seats",
                    "Higher fees — approved by FRA Maharashtra",
                    "No strict entrance rank required",
                    "Only private and deemed universities offer this",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Government colleges (COEP, SCOE, PVPIT) have 0% management quota — 100% of
                their seats go through DTE CAP rounds. Management quota is only for private and deemed universities
                approved by AICTE.
              </p>
            </div>
          </div>

          {/* Section 2: Management Quota Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                Engineering Colleges in Pune with Management Quota — 2026
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Seats, fees, and eligibility for direct admission. Data verified 2026.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-center">MQ Seats</th>
                    <th className="px-4 py-3 text-right hidden sm:table-cell">Regular Fees</th>
                    <th className="px-4 py-3 text-right">MQ Fees</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {managementQuotaColleges.map((c) => (
                    <tr key={c.name} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                        <p className="text-xs text-blue-600 mt-0.5">{c.note}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                          {c.quota}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-gray-600 hidden sm:table-cell">
                        {c.regularFees}
                      </td>
                      <td className="px-4 py-3 text-right text-xs font-semibold text-red-600">{c.mgmtFees}</td>
                      <td className="px-4 py-3 text-xs text-gray-600 hidden md:table-cell">{c.eligibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: NRI Quota */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" /> NRI Quota Engineering Colleges in Pune
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              NRI (Non-Resident Indian) quota is a separate category available at deemed and private universities. It
              typically constitutes 5–15% of seats and is charged in USD or INR equivalent. You need a valid NRI/OCI
              certificate or a sponsorship letter from an NRI relative.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: "MIT-WPU",
                  seats: "Up to 15%",
                  fees: "$5,000–$8,000/yr",
                  note: "Accepts OCI/NRI sponsored",
                },
                {
                  name: "SIT Pune (Symbiosis)",
                  seats: "Up to 10%",
                  fees: "$6,000–$9,000/yr",
                  note: "International campus facilities",
                },
                {
                  name: "VIT Pune",
                  seats: "Up to 5%",
                  fees: "$4,000–$6,000/yr",
                  note: "Limited NRI seats",
                },
                {
                  name: "Bharati Vidyapeeth CoE",
                  seats: "Up to 10%",
                  fees: "$3,500–$5,000/yr",
                  note: "Deemed university — flexible",
                },
              ].map((c) => (
                <div key={c.name} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                  <div className="flex gap-3 mt-1.5">
                    <span className="text-xs text-gray-500">Seats: {c.seats}</span>
                    <span className="text-xs font-semibold text-blue-700">Fees: {c.fees}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{c.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Step-by-step */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> Step-by-Step Direct Admission Process
            </h2>
            <ol className="space-y-3">
              {[
                {
                  step: "Identify colleges with management quota",
                  detail:
                    "Make a list of colleges where you want to seek direct admission. Check AICTE approval status and DTE Maharashtra records for management quota availability.",
                },
                {
                  step: "Contact college admission office directly",
                  detail:
                    "Call or visit the admission office of shortlisted colleges. Ask specifically for 'Institute Level seats' or 'Management Quota seats'. Do not rely solely on agents.",
                },
                {
                  step: "Submit application and documents",
                  detail:
                    "Submit Class 12 marksheet, photo ID, passport photos, and any available entrance scores. Fill the college's direct admission application form.",
                },
                {
                  step: "Attend college interview/counselling",
                  detail:
                    "Some colleges conduct a brief interview or counselling session for MQ seats. This is typically informal and assesses basic subject knowledge.",
                },
                {
                  step: "Pay management quota fees",
                  detail:
                    "Pay the first installment of management quota fees (usually 1 year in advance) via demand draft or online transfer. Get a fee receipt.",
                },
                {
                  step: "Receive provisional admission letter",
                  detail:
                    "College issues a provisional admission letter. Submit this to SPPU/affiliating university for enrollment. Collect your student ID and registration number.",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.step}</p>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Section 5: Fee Comparison */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Regular vs Management Quota Fees — Side by Side</h2>
              <p className="text-xs text-gray-400 mt-0.5">Annual fee comparison at popular Pune engineering colleges</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">College</th>
                    <th className="px-4 py-3 text-right font-semibold text-green-700">Regular (CAP)</th>
                    <th className="px-4 py-3 text-right font-semibold text-red-600">Management Quota</th>
                    <th className="px-4 py-3 text-center font-semibold">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {feeComparison.map((c) => (
                    <tr key={c.college} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-900">{c.college}</td>
                      <td className="px-4 py-3 text-right text-sm text-green-700 font-semibold">{c.regular}</td>
                      <td className="px-4 py-3 text-right text-sm text-red-600 font-semibold">{c.mgmt}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-full">
                          +{c.premium}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 bg-amber-50 border-t border-amber-100">
              <p className="text-xs text-amber-800">
                Over 4 years, management quota can cost ₹3L–₹9L more than regular CAP admission. Always verify fees
                with the Fee Regulating Authority (FRA) Maharashtra approved fee schedule.
              </p>
            </div>
          </div>

          {/* Section 6: Is it legal */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" /> Is Direct/Management Quota Admission Legal?
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <p className="text-sm text-green-800 font-semibold mb-1">
                Yes — Management Quota is 100% Legal in India
              </p>
              <p className="text-sm text-green-700 leading-relaxed">
                AICTE (All India Council for Technical Education) and DTE Maharashtra regulate management quota
                admissions. All private and deemed colleges are permitted to fill a specified percentage of seats through
                institute-level admissions. Fees are capped by the Fee Regulating Authority (FRA) of Maharashtra.
              </p>
            </div>
            <ul className="space-y-2">
              {[
                "AICTE approval required for all technical institutions",
                "Fees approved and capped by FRA Maharashtra",
                "DTE Maharashtra monitors MQ admissions via online portal",
                "Students get same degree as CAP round students",
                "No capitation fees allowed — any demand is illegal",
                "Complaint mechanism available at DTE Maharashtra helpline",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Frequently Asked Questions — Direct Admission in Engineering Colleges Pune
            </h2>
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
              <p className="font-bold text-lg">Need help with direct admission process?</p>
              <p className="text-blue-200 text-sm">
                Our counsellors guide you through management quota and NRI quota admissions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/counselling"
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
              >
                Get Free Counselling →
              </Link>
              <Link
                href="/engineering-colleges-pune"
                className="flex items-center justify-center gap-2 bg-white text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors"
              >
                View All Colleges →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
