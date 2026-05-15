import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle, BookOpen, Award, ExternalLink } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Engineering Colleges in Pune with Scholarship 2026 | Merit & Need-Based",
  description:
    "Find engineering colleges in Pune offering scholarships in 2026. Government merit scholarships, EBC quota, SC/ST fee waiver, and private merit-based scholarships at COEP, PICT, VIT Pune & more.",
  path: "/engineering-colleges-pune-scholarship",
  keywords: [
    "engineering colleges with scholarship pune",
    "colleges in pune with low fees engineering",
    "engineering college scholarship maharashtra",
    "COEP scholarship",
    "engineering scholarship pune 2026",
    "merit scholarship engineering pune",
    "sc st scholarship engineering pune",
  ],
})

const collegeScholarships = [
  {
    name: "College of Engineering Pune (COEP)",
    type: "Government",
    naac: "A+",
    scheme: "EBC / SC/ST / Merit Scholarship",
    eligibility: "EBC: Family income < ₹8L. SC/ST: Full waiver. Merit: Top 10% MHT-CET",
    amount: "50–100% fee waiver",
    slug: "coep-college-of-engineering-pune",
  },
  {
    name: "VIT Pune (Vishwakarma Institute of Technology)",
    type: "Autonomous",
    naac: "A+",
    scheme: "Institutional Merit Scholarship",
    eligibility: "95+ percentile in MHT-CET or 90%+ in 12th boards",
    amount: "₹25,000–₹50,000/year",
    slug: "vit-pune-vishwakarma-institute-of-technology",
  },
  {
    name: "Symbiosis Institute of Technology (SIT Pune)",
    type: "Deemed",
    naac: "A+",
    scheme: "Symbiosis Scholarship & Merit Fellowship",
    eligibility: "Top 10 rank in SET exam or JEE Main 95+ percentile",
    amount: "₹50,000–₹2L/year",
    slug: "symbiosis-institute-of-technology-pune",
  },
  {
    name: "PICT Pune",
    type: "Autonomous",
    naac: "A",
    scheme: "PICT Merit Scholarship",
    eligibility: "92+ percentile MHT-CET, 85%+ in 12th",
    amount: "₹20,000–₹40,000/year",
    slug: "pict-pune-institute-of-computer-technology",
  },
  {
    name: "Sinhgad College of Engineering",
    type: "Private",
    naac: "A",
    scheme: "Sinhgad Merit & Need-Based Scholarship",
    eligibility: "EBC / SC/ST via government scheme; Merit: 75+ percentile MHT-CET",
    amount: "₹10,000–₹50,000/year",
    slug: "sinhgad-college-of-engineering-pune",
  },
  {
    name: "JSPM RSCOE",
    type: "Private",
    naac: "A",
    scheme: "EBC / Government Scholarship + Institutional",
    eligibility: "EBC income below ₹8L; Merit: 80+ percentile MHT-CET",
    amount: "₹15,000–₹50,000/year",
    slug: "jspm-rscoe-rajarshi-shahu-college-of-engineering",
  },
]

const govtScholarships = [
  {
    scheme: "EBC (Economically Backward Class) Scholarship",
    eligibility: "Family income below ₹8 lakh per year, non-SC/ST/OBC",
    benefit: "50% tuition fee waiver at all government and aided colleges",
    portal: "MahaDBT (mahadbt.maharashtra.gov.in)",
    deadline: "Before October every academic year",
  },
  {
    scheme: "SC/ST Full Fee Waiver",
    eligibility: "Students from Scheduled Caste or Scheduled Tribe category",
    benefit: "100% tuition fee waiver + ₹1,200/year for books & stationery",
    portal: "MahaDBT portal — post-matric scholarship",
    deadline: "Before October/November every year",
  },
  {
    scheme: "OBC (Non-Creamy Layer) Fee Reduction",
    eligibility: "OBC students with family income below ₹8L/year",
    benefit: "25–50% fee reduction at government-aided colleges",
    portal: "MahaDBT portal — OBC scholarship",
    deadline: "Before November every academic year",
  },
  {
    scheme: "Maharashtra Merit Scholarship (Top MHT-CET Rankers)",
    eligibility: "Students in top 10% of MHT-CET; 75%+ in HSC",
    benefit: "₹20,000–₹50,000/year merit scholarship",
    portal: "Apply through college admission office",
    deadline: "Within 30 days of admission confirmation",
  },
]

const nationalScholarships = [
  {
    scheme: "AICTE Pragati Scholarship (Girls)",
    eligibility: "Girl students in AICTE-approved colleges, family income < ₹8L/year",
    benefit: "₹50,000/year (tuition + other charges)",
    portal: "NSP (scholarships.gov.in)",
  },
  {
    scheme: "AICTE Saksham Scholarship (Divyaang)",
    eligibility: "Students with 40%+ disability in AICTE-approved colleges",
    benefit: "₹50,000/year",
    portal: "NSP portal",
  },
  {
    scheme: "PM Scholarship for NER / J&K Students",
    eligibility: "Students from North-East Region or Jammu & Kashmir",
    benefit: "₹30,000/year",
    portal: "NSP portal",
  },
  {
    scheme: "Central Sector Scholarship (CSSS)",
    eligibility: "80%+ in 12th boards, family income < ₹8L/year",
    benefit: "₹12,000/year (1st & 2nd year), ₹20,000/year (3rd & 4th year)",
    portal: "NSP portal",
  },
]

const faqs = [
  {
    question: "Which engineering colleges in Pune offer scholarships?",
    answer:
      "Most engineering colleges in Pune offer scholarships through government schemes. COEP (government) automatically provides EBC/SC/ST/OBC fee waivers. VIT Pune offers institutional merit scholarships of ₹25,000–₹50,000/year for students with 95+ percentile in MHT-CET. SIT Pune (Symbiosis) offers merit fellowships of ₹50,000–₹2L/year for top SET/JEE rankers. PICT, Sinhgad, and JSPM also offer merit scholarships for high-percentile students.",
  },
  {
    question: "How to get scholarship in engineering college in Pune?",
    answer:
      "To get a scholarship for engineering college in Pune: (1) Apply for EBC scholarship via MahaDBT portal if family income is below ₹8L/year. (2) SC/ST students should apply for post-matric scholarship on MahaDBT before October. (3) For merit scholarships, maintain 95+ percentile in MHT-CET. (4) For AICTE scholarships, apply via NSP portal (scholarships.gov.in) after college admission. (5) Check with your college's scholarship cell for institutional scholarships. Apply early — most deadlines are in October–November.",
  },
  {
    question: "What is EBC scholarship for engineering in Maharashtra?",
    answer:
      "EBC (Economically Backward Class) scholarship is a Maharashtra government scheme for students from non-SC/ST/OBC families with income below ₹8 lakh per year. EBC scholarship provides 50% tuition fee waiver at all government and government-aided engineering colleges. Students must apply via MahaDBT portal within 3 months of admission. Documents required: income certificate, caste certificate (non-SC/ST proof), Aadhar, admission receipt, and bank account details.",
  },
  {
    question: "Do SC/ST students get free engineering education in Pune?",
    answer:
      "Yes, SC (Scheduled Caste) and ST (Scheduled Tribe) students get full tuition fee waiver at all government and government-aided engineering colleges in Pune including COEP. The Maharashtra government's post-matric scholarship covers 100% tuition fees plus ₹1,200/year for books and stationery. Students must apply via MahaDBT portal every year before November. There is no income limit for SC/ST fee waivers.",
  },
  {
    question: "What is the COEP merit scholarship?",
    answer:
      "COEP (College of Engineering Pune) offers institutional merit scholarships for top-performing students. Students who maintain a CGPA above 8.5/10 in the first year are eligible for merit scholarships of ₹10,000–₹25,000/year from the college's alumni fund. Additionally, COEP students can avail government scholarships (EBC, SC/ST, OBC) and AICTE scholarships simultaneously. The Dr. A.P.J. Abdul Kalam merit scholarship is also available at COEP for students in financial need.",
  },
  {
    question: "Can I apply for AICTE scholarship at any Pune engineering college?",
    answer:
      "You can apply for AICTE scholarships (Pragati, Saksham) at any AICTE-approved engineering college in Pune. This includes COEP, VIT Pune, PICT, SIT Pune, JSPM, AISSMS, Sinhgad, and Indira College. Application is through the NSP (National Scholarship Portal) at scholarships.gov.in. You must apply within 3 months of admission confirmation. Pragati scholarship (for girl students) offers ₹50,000/year and requires family income below ₹8L/year.",
  },
  {
    question: "Which is the best scholarship for engineering students in Maharashtra?",
    answer:
      "The best scholarships for engineering students in Maharashtra are: (1) SC/ST Post-Matric Scholarship — full fee waiver, no income limit. (2) EBC Scholarship — 50% fee waiver for family income below ₹8L. (3) AICTE Pragati Scholarship — ₹50,000/year for girl students. (4) Central Sector Scholarship (CSSS) — ₹12,000–₹20,000/year for 80%+ in 12th. (5) OBC Scholarship — 25–50% fee reduction. Apply for all applicable scholarships as they can be combined in some cases.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "Engineering Colleges Pune Scholarship", url: "/engineering-colleges-pune-scholarship" },
]

const applySteps = [
  "Check eligibility: income certificate, caste certificate, MHT-CET scorecard",
  "Register on MahaDBT portal (mahadbt.maharashtra.gov.in) with Aadhar-linked mobile",
  "Select scholarship scheme matching your category (EBC/SC/ST/OBC/Merit)",
  "Upload documents: income proof, admission receipt, marksheets, bank passbook",
  "Submit application before deadline (usually October–November)",
  "Track application status on MahaDBT dashboard",
  "Scholarship amount directly credited to bank account via DBT",
]

export default function EngineeringCollegesPuneScholarshipPage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link>
              <span>›</span>
              <span className="text-white">Engineering Colleges Pune Scholarship</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Engineering Colleges in Pune with Scholarship 2026
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Complete guide to scholarships at Pune engineering colleges — government merit scholarships, EBC/SC/ST fee waivers, institutional fellowships at COEP, VIT Pune, PICT, SIT Pune, and more.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer — Engineering Scholarships in Pune</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>SC/ST students</strong> get 100% fee waiver at government colleges (COEP). <strong>EBC students</strong> (income &lt; ₹8L) get 50% fee waiver. <strong>VIT Pune</strong> offers ₹25–50K/yr merit scholarships. <strong>AICTE Pragati</strong> gives ₹50K/yr for girl students. Apply via <strong>MahaDBT</strong> before October deadline. Multiple scholarships can be combined.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "SC/ST Fee Waiver", value: "100%", icon: "🎓" },
              { label: "EBC Fee Waiver", value: "50%", icon: "💰" },
              { label: "AICTE Pragati/yr", value: "₹50,000", icon: "👩‍🎓" },
              { label: "Scholarship Types", value: "8+", icon: "📋" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-lg font-extrabold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Section 1: Govt Scholarships */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" /> Maharashtra Government Scholarships for Engineering
            </h2>
            <div className="space-y-4">
              {govtScholarships.map((s) => (
                <div key={s.scheme} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{s.scheme}</h3>
                    <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-full flex-shrink-0">{s.benefit}</span>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>
                      <span className="font-medium text-gray-900">Eligibility: </span>{s.eligibility}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Portal: </span>{s.portal}
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Deadline: </span>{s.deadline}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: College-wise Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Scholarships at Top Pune Engineering Colleges — 2026</h2>
              <p className="text-xs text-gray-400 mt-0.5">Institutional and government scholarships available at each college. Verify with the college scholarship cell.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-center hidden sm:table-cell">NAAC</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Scholarship Scheme</th>
                    <th className="px-4 py-3 text-right hidden lg:table-cell">Amount</th>
                    <th className="px-4 py-3 text-center">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {collegeScholarships.map((c) => (
                    <tr key={c.slug} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{c.type}</p>
                        <p className="text-xs text-gray-500 mt-0.5 md:hidden">{c.scheme}</p>
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.naac === "A+" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                          {c.naac}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-700 hidden md:table-cell">
                        <p className="font-medium">{c.scheme}</p>
                        <p className="text-gray-500 mt-0.5">{c.eligibility}</p>
                      </td>
                      <td className="px-4 py-3 text-right text-xs font-semibold text-green-700 hidden lg:table-cell">{c.amount}</td>
                      <td className="px-4 py-3 text-center">
                        <Link href={`/colleges/${c.slug}`} className="inline-flex items-center gap-1 text-xs bg-orange-500 hover:bg-orange-600 text-white px-2.5 py-1.5 rounded-lg">
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Private/Institutional Scholarships */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> Private & Institutional Scholarships in Pune
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  college: "COEP Merit Scholarship",
                  detail: "Students maintaining CGPA 8.5+ in year 1 get ₹10,000–₹25,000/year from COEP alumni fund. Dr. Kalam scholarship for needy students.",
                  badge: "Government",
                },
                {
                  college: "VIT Pune Scholarship",
                  detail: "Merit scholarship of ₹25,000–₹50,000/year for students with 95+ percentile in MHT-CET or 90%+ in 12th boards. Apply at admission time.",
                  badge: "Autonomous",
                },
                {
                  college: "Symbiosis (SIT Pune) Scholarship",
                  detail: "Symbiosis merit fellowship of ₹50,000–₹2L/year for top 10 SET rankers or JEE Main 95+ percentile. Renewable annually based on performance.",
                  badge: "Deemed",
                },
              ].map(({ college, detail, badge }) => (
                <div key={college} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">{college}</h3>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">{badge}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: How to Apply */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-orange-500" /> How to Apply for Scholarships — Step by Step
            </h2>
            <ol className="space-y-3">
              {applySteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm text-gray-700">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> Apply for scholarships every year — they are renewed annually, not automatically continued. Missing the October–November deadline means losing the scholarship for that academic year.
              </p>
            </div>
          </div>

          {/* Section 5: National Scholarships */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" /> National Scholarships for Engineering Students
            </h2>
            <div className="space-y-4">
              {nationalScholarships.map((s) => (
                <div key={s.scheme} className="border border-gray-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{s.scheme}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{s.eligibility}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-full">{s.benefit}</span>
                    <span className="text-xs text-blue-600">{s.portal}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="https://scholarships.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Apply at scholarships.gov.in (NSP Portal) <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — Engineering Scholarships in Pune</h2>
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
              <p className="font-bold text-lg">Need help applying for scholarships?</p>
              <p className="text-blue-200 text-sm">Get expert guidance on EBC, SC/ST, AICTE, and institutional scholarships.</p>
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
