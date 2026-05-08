import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle, AlertCircle, BookOpen, Users, Phone } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Direct Admission in MBA Colleges Pune 2026 | Without SNAP/CAT",
  description:
    "Get direct MBA admission in Pune 2026 without SNAP or CAT score. Management quota, NRI quota at SIBM Pune, MIT-SOM, BIMM. Fees ₹5L–₹25L for direct admission.",
  path: "/direct-admission-mba-colleges-pune",
  keywords: [
    "mba direct admission pune",
    "direct admission in mba colleges pune",
    "management quota mba pune",
    "mba admission without cat pune",
  ],
})

const mbaCollegesDirectAdmission = [
  {
    name: "SIBM Pune (Symbiosis Institute of Business Management)",
    mq: "No MQ — SNAP mandatory",
    regularFees: "₹21L (2-yr total)",
    mgmtFees: "Not available",
    note: "Must clear SNAP — no direct admission route",
    directAvailable: false,
  },
  {
    name: "MIT School of Management (MIT-SOM)",
    mq: "~20%",
    regularFees: "₹5L–₹7L/yr",
    mgmtFees: "₹7L–₹10L/yr",
    note: "Direct admission possible — contact directly",
    directAvailable: true,
  },
  {
    name: "BIMM Pune (Balaji Institute of Modern Management)",
    mq: "~25%",
    regularFees: "₹4.5L–₹6L/yr",
    mgmtFees: "₹6.5L–₹9L/yr",
    note: "Accepts direct + MAT/CMAT applicants",
    directAvailable: true,
  },
  {
    name: "Indira Institute of Management (IIMP)",
    mq: "~30%",
    regularFees: "₹3L–₹4.5L/yr",
    mgmtFees: "₹5L–₹7L/yr",
    note: "Flexible criteria for MQ seats",
    directAvailable: true,
  },
  {
    name: "IIMM Pune (Indian Institute of Materials Management)",
    mq: "~25%",
    regularFees: "₹3.5L–₹5L/yr",
    mgmtFees: "₹5.5L–₹8L/yr",
    note: "Supply chain / operations MBA",
    directAvailable: true,
  },
  {
    name: "AIMS Pune",
    mq: "~30%",
    regularFees: "₹2.5L–₹3.5L/yr",
    mgmtFees: "₹4L–₹6L/yr",
    note: "Good for working professionals",
    directAvailable: true,
  },
]

const pgdmVsMba = [
  {
    aspect: "Degree Type",
    mba: "MBA — University degree (SPPU affiliated)",
    pgdm: "PGDM — Diploma (AICTE approved, equivalent to MBA)",
  },
  {
    aspect: "Regulatory Body",
    mba: "Affiliated University (SPPU, SIU)",
    pgdm: "AICTE approved autonomous institution",
  },
  {
    aspect: "Direct Admission",
    mba: "Possible — management quota available",
    pgdm: "Generally easier — autonomous institutions have flexibility",
  },
  {
    aspect: "Entrance Exam",
    mba: "CAT/MAT/CMAT/SNAP varies by college",
    pgdm: "Often MAT/CMAT/own test — more flexible",
  },
  {
    aspect: "Fee Range",
    mba: "₹4L–₹25L (2 years total)",
    pgdm: "₹5L–₹18L (2 years total)",
  },
  {
    aspect: "Industry Value",
    mba: "Traditional preference in large companies",
    pgdm: "Equally valued — accepted across industries",
  },
]

const faqs = [
  {
    question: "Can I get direct MBA admission in Pune without SNAP or CAT?",
    answer:
      "Yes, for most non-Symbiosis MBA colleges in Pune. SIBM Pune (Symbiosis) mandates SNAP and does not offer management quota. However, colleges like MIT-SOM, BIMM Pune, Indira Institute, and IIMM Pune offer direct admission through management quota based on graduation marks and an interview. No SNAP, CAT, or any entrance exam is strictly required for MQ seats at these colleges.",
  },
  {
    question: "Does SIBM Pune have management quota or direct admission?",
    answer:
      "No. SIBM Pune (Symbiosis Institute of Business Management) does NOT offer management quota admission. All seats at SIBM are filled through SNAP (Symbiosis National Aptitude Test) merit. A SNAP score above 95 percentile with PI/WAT performance is needed for SIBM. There is no backdoor or direct route into SIBM Pune.",
  },
  {
    question: "What is the fee for MBA in Pune through direct admission?",
    answer:
      "MBA through direct/management quota in Pune costs ₹5L–₹12L per year, totaling ₹10L–₹25L for the 2-year program. MIT-SOM management quota fees are approximately ₹7L–₹10L/year. BIMM Pune MQ fees are ₹6.5L–₹9L/year. Indira Institute MQ fees are ₹5L–₹7L/year. Compare this to regular admission which costs ₹3L–₹8L/year.",
  },
  {
    question: "What is the difference between MBA and PGDM for direct admission?",
    answer:
      "MBA is a university-affiliated degree (e.g., SPPU) while PGDM is an autonomous diploma equivalent to MBA, approved by AICTE. For direct admission purposes, PGDM institutes are generally more flexible since they are autonomous and set their own admission criteria. Both are equally valued by employers. If you want direct admission without strict entrance requirements, PGDM institutes like BIMM Pune often have more flexibility.",
  },
  {
    question: "What documents are needed for direct MBA admission in Pune?",
    answer:
      "For direct MBA admission you need: graduation certificate and all semester marksheets, Class 10 and 12 certificates, entrance exam scorecard (if available — MAT/CMAT preferred but may not be mandatory for MQ), work experience certificate (if any), photo ID (Aadhar), recent passport photos, migration certificate, and gap certificate if there is a break in education. Some colleges also require a Statement of Purpose (SOP).",
  },
  {
    question: "Is management quota MBA from Pune colleges recognized by employers?",
    answer:
      "Yes, the mode of admission (MQ vs regular) does not appear on your degree certificate. Employers only see your institution name, degree, and percentage. An MBA from MIT-SOM or BIMM Pune through management quota carries the same degree as a student admitted through regular entrance exam scores. The value lies in the institution's reputation and your performance, not admission route.",
  },
  {
    question: "What is the eligibility for direct MBA admission in Pune?",
    answer:
      "Eligibility for direct MBA in Pune: Graduation in any discipline with minimum 50% marks (45% for reserved categories). Most colleges require a bachelor's degree from a recognized university. Some colleges prefer work experience (1–2 years) but it is not mandatory for freshers. CAT/MAT/CMAT score is preferred but not strictly required for management quota seats. Age limit: typically under 30 years, but varies by college.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "MBA Admissions", url: "/mba-colleges-pune" },
  { name: "Direct MBA Admission Pune", url: "/direct-admission-mba-colleges-pune" },
]

export default function DirectAdmissionMBAPage() {
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

      <div className="bg-[#F8FAFC] min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/mba-colleges-pune" className="hover:text-white">
                MBA Colleges Pune
              </Link>
              <span>/</span>
              <span className="text-white">Direct MBA Admission Pune</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Direct Admission in MBA Colleges Pune 2026
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Complete guide to MBA management quota, NRI quota, and direct admission in Pune 2026 without SNAP or CAT.
              College-wise fees, eligibility, and step-by-step process.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl mb-6">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Yes — direct MBA admission is possible in Pune without SNAP or CAT</strong> at non-Symbiosis
                colleges. <strong>SIBM Pune requires SNAP</strong> — no management quota there. MIT-SOM, BIMM Pune,
                Indira Institute, and IIMM Pune offer direct/management quota MBA seats. Fees range from{" "}
                <strong>₹5L–₹12L/year</strong> for direct admission.
              </p>
            </div>
            {/* Above-fold CTA */}
            <Link
              href="/counselling"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              <Phone className="w-4 h-4" /> Get Free MBA Admission Counselling →
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "MBA Colleges with MQ", value: "15+", icon: "🏛️" },
              { label: "Min Fees (MQ)", value: "₹5L/yr", icon: "💰" },
              { label: "Max Fees (MQ)", value: "₹12L/yr", icon: "📈" },
              { label: "Exam Required (MQ)", value: "None*", icon: "✅" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-lg font-extrabold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Section 1: SNAP/CAT vs Direct */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> SNAP/CAT Required vs Direct Admission — Pune MBA Colleges
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm text-red-700">
                  Symbiosis Group — SNAP Mandatory
                </h3>
                <ul className="space-y-2">
                  {[
                    "SIBM Pune — SNAP 95+ percentile required",
                    "SCMHRD Pune — SNAP 97+ percentile required",
                    "SIIB Pune — SNAP 90+ percentile required",
                    "SIMS Pune — SNAP 85+ percentile required",
                    "No management quota at any Symbiosis institution",
                    "Direct admission is NOT possible at SIBM/Symbiosis",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm text-green-700">
                  Non-Symbiosis — Direct Admission Possible
                </h3>
                <ul className="space-y-2">
                  {[
                    "MIT-SOM — MAT/CMAT preferred, MQ available",
                    "BIMM Pune — accepts direct + MAT/CMAT",
                    "Indira Institute — flexible MQ criteria",
                    "IIMM Pune — management quota available",
                    "AIMS Pune — direct admission possible",
                    "CAT score helpful but NOT mandatory for MQ",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: MBA Colleges MQ Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                MBA Colleges in Pune with Management Quota — 2026 Fees
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Direct admission availability, fees, and notes. Data verified 2026.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-center">Direct Available</th>
                    <th className="px-4 py-3 text-right hidden sm:table-cell">Regular Fees</th>
                    <th className="px-4 py-3 text-right">MQ Fees</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mbaCollegesDirectAdmission.map((c) => (
                    <tr key={c.name} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            c.directAvailable
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {c.directAvailable ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-green-700 font-semibold hidden sm:table-cell">
                        {c.regularFees}
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-red-600 font-semibold">{c.mgmtFees}</td>
                      <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: NRI Quota MBA */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" /> NRI Quota MBA Colleges in Pune
            </h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Several Pune MBA colleges offer NRI/overseas quota seats, typically 5–15% of total intake. These seats are
              charged at higher fees (in USD or INR equivalent) and require NRI/OCI certificate or a sponsorship letter
              from an NRI relative.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  name: "MIT-SOM Pune",
                  seats: "Up to 15%",
                  fees: "$4,000–$6,000/yr",
                  note: "Popular for NRI/overseas MBA",
                },
                {
                  name: "BIMM Pune",
                  seats: "Up to 10%",
                  fees: "$3,000–$5,000/yr",
                  note: "Flexible NRI admission",
                },
                {
                  name: "Symbiosis (SIMS Pune)",
                  seats: "Up to 15%",
                  fees: "$5,000–$8,000/yr",
                  note: "SNAP still required for Symbiosis NRI",
                },
                {
                  name: "Indira College MBA",
                  seats: "Up to 10%",
                  fees: "$2,500–$4,000/yr",
                  note: "Budget-friendly NRI option",
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

          {/* Section 4: PGDM vs MBA */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">PGDM vs MBA in Pune — Which Accepts Direct Admission?</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Key differences for direct admission seekers
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Aspect</th>
                    <th className="px-4 py-3 text-left font-semibold text-blue-700">MBA</th>
                    <th className="px-4 py-3 text-left font-semibold text-orange-600">PGDM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {pgdmVsMba.map((row) => (
                    <tr key={row.aspect} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-900 text-sm">{row.aspect}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.mba}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.pgdm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 5: Step-by-step */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> Step-by-Step Direct MBA Admission Process in Pune
            </h2>
            <ol className="space-y-3">
              {[
                {
                  step: "Shortlist non-Symbiosis MBA colleges in Pune",
                  detail:
                    "Focus on MIT-SOM, BIMM, Indira Institute, IIMM, and AIMS Pune. These offer management quota. SIBM and Symbiosis group do not offer direct admission.",
                },
                {
                  step: "Verify your eligibility",
                  detail:
                    "Ensure you have at least 50% in graduation (any stream). Check if the college requires a minimum entrance score — many don't for MQ seats.",
                },
                {
                  step: "Contact college admission office",
                  detail:
                    "Call or visit directly and ask about 'management quota' or 'institute-level seats'. Avoid intermediary agents — deal directly with the college.",
                },
                {
                  step: "Submit application with documents",
                  detail:
                    "Submit graduation marksheets, 10th/12th certificates, entrance score (if available), ID proof, and 2 recommendation letters if required.",
                },
                {
                  step: "Attend GD-PI (Group Discussion & Personal Interview)",
                  detail:
                    "Most MBA colleges conduct a GD and PI even for management quota candidates. Prepare with basic current affairs, business awareness, and WHY MBA.",
                },
                {
                  step: "Pay management quota fees and collect admission letter",
                  detail:
                    "Upon selection, pay the first year fees. Get a provisional admission letter. Register with SPPU or affiliating university for student enrollment.",
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

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Frequently Asked Questions — Direct MBA Admission in Pune
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
              <p className="font-bold text-lg">Need guidance for direct MBA admission?</p>
              <p className="text-blue-200 text-sm">
                Our counsellors help you navigate management quota and find the right MBA college in Pune.
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
                href="/mba-colleges-pune"
                className="flex items-center justify-center gap-2 bg-white text-[#0A1628] font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors"
              >
                View All MBA Colleges →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
