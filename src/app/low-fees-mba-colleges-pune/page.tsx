import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle, TrendingUp, BookOpen, IndianRupee } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Low Fees MBA Colleges in Pune 2026 | Under ₹5L & ₹10L Options",
  description:
    "Affordable MBA colleges in Pune 2026 with fees under ₹5 lakh and ₹10 lakh. Suryadatta ₹2.8L, IIMM ₹3.8L, Indira Institute ₹4.2L total. Compare budget MBA programs.",
  path: "/low-fees-mba-colleges-pune",
  keywords: [
    "low fees mba colleges in pune",
    "affordable mba colleges pune",
    "cheapest mba colleges in pune",
    "mba colleges in pune under 5 lakh",
    "mba colleges in pune under 10 lakh",
    "budget mba colleges pune",
    "low cost mba colleges pune",
  ],
})

const under5LMBAColleges = [
  {
    name: "Suryadatta Institute of Management & Mass Communication",
    type: "Private",
    feesTotal: "₹2.8L (2 years)",
    feesPerYear: "~₹1.4L/yr",
    naac: "A",
    exam: "MAH-CET / CAT",
    slug: "suryadatta-institute-management-pune",
    note: "Most affordable MBA in Pune",
  },
  {
    name: "Indian Institute of Management & Commerce (IIMM Pune)",
    type: "Private",
    feesTotal: "₹3.8L (2 years)",
    feesPerYear: "~₹1.9L/yr",
    naac: "A",
    exam: "MAH-CET / CAT / XAT",
    slug: "iimm-pune-indian-institute-management-commerce",
    note: "Affordable & NAAC accredited",
  },
  {
    name: "Indira Institute of Management (IIMM) Pune",
    type: "Private",
    feesTotal: "₹4.2L (2 years)",
    feesPerYear: "~₹2.1L/yr",
    naac: "A+",
    exam: "MAH-CET / CAT",
    slug: "indira-institute-of-management-pune",
    note: "Best value NAAC A+",
  },
  {
    name: "Balaji Institute of Modern Management (BIMM)",
    type: "Private",
    feesTotal: "₹5L (2 years)",
    feesPerYear: "~₹2.5L/yr",
    naac: "A",
    exam: "MAH-CET / CAT / XAT",
    slug: "bimm-balaji-institute-modern-management-pune",
    note: "Strong alumni network",
  },
]

const under10LMBAColleges = [
  {
    name: "MIT School of Management (MIT-SOM)",
    type: "Deemed",
    feesTotal: "₹7–11L (2 years)",
    feesPerYear: "~₹3.5–5.5L/yr",
    naac: "A+",
    exam: "MAH-CET / CAT / XAT / CMAT",
    slug: "mit-som-school-of-management-pune",
    note: "NAAC A+ deemed university",
  },
  {
    name: "Symbiosis Centre for Management Studies (SCMS)",
    type: "Deemed",
    feesTotal: "₹8–10L (2 years)",
    feesPerYear: "~₹4–5L/yr",
    naac: "A+",
    exam: "SNAP",
    slug: "symbiosis-centre-management-studies-pune",
    note: "Symbiosis group",
  },
]

const faqs = [
  {
    question: "Which is the cheapest MBA college in Pune?",
    answer:
      "Suryadatta Institute of Management & Mass Communication is the most affordable MBA college in Pune with total 2-year MBA fees of approximately ₹2.8 lakh (₹1.4L/year). IIMM Pune charges ₹3.8L total, and Indira Institute of Management (Pune) charges ₹4.2L total. All three are NAAC-accredited and affiliated to Savitribai Phule Pune University (SPPU). Admission is through MAH-CET scores.",
  },
  {
    question: "Can I do MBA in Pune under 5 lakh total fees?",
    answer:
      "Yes, you can complete MBA in Pune under ₹5 lakh total fees at Suryadatta Institute (₹2.8L), IIMM Pune (₹3.8L), and Indira Institute of Management (₹4.2L). BIMM charges exactly ₹5L for the full 2-year program. These colleges offer PGDM and MBA programs affiliated to SPPU with average placements of ₹4–6 LPA.",
  },
  {
    question: "What is the fee for MBA at MIT-SOM Pune?",
    answer:
      "MIT School of Management (MIT-SOM) in Pune charges ₹7–11 lakh for the full 2-year MBA program depending on the specialization and batch. The MBA fee at MIT-SOM is approximately ₹3.5–5.5L per year. It is a deemed university with NAAC A+ grade and accepts MAH-CET, CAT, XAT, and CMAT scores. Average placement is ₹7–9 LPA.",
  },
  {
    question: "What is the ROI on an affordable MBA from Pune?",
    answer:
      "The ROI (Return on Investment) for an affordable MBA from Pune is excellent. If you pay ₹4L total fees and get placed at ₹5 LPA, you recover the full investment in under 1 year. Compared to premier MBA colleges charging ₹22–25L, budget Pune MBA colleges offer salary-to-fees ratios of 1:1 to 2:1 within 2 years. Over 5 years, even ₹5 LPA placement yields ₹25L total income vs ₹4L investment.",
  },
  {
    question: "Should I take education loan for MBA in Pune?",
    answer:
      "For affordable MBA colleges in Pune charging ₹3–5L, education loans may not be necessary if you have savings. However, for MIT-SOM (₹7–11L) or SIBM (₹22L+), education loans make sense. Banks like SBI, HDFC, and Axis offer MBA education loans at 8.5–12% interest. The loan amount of ₹5L at 9% for 5 years means EMI of ~₹10,400/month — manageable with a ₹5 LPA salary.",
  },
  {
    question: "Which MBA college in Pune has the best salary-to-fees ratio?",
    answer:
      "Indira Institute of Management (Pune) offers the best salary-to-fees ratio among affordable MBA colleges. With total fees of ₹4.2L and average placement of ₹5.5 LPA, you recover investment in under 1 year. IIMM Pune (₹3.8L fees, ₹4.5 LPA avg) and BIMM (₹5L fees, ₹5.8 LPA avg) also offer excellent ROI. All three are NAAC A/A+ accredited.",
  },
  {
    question: "Are MBA colleges in Pune under 5 lakh worth it?",
    answer:
      "Yes, affordable MBA colleges in Pune under ₹5 lakh are worth it if you have clear career goals and leverage networking opportunities. Colleges like Indira Institute of Management, IIMM Pune, and Suryadatta are NAAC accredited and AICTE approved. They offer placements in reputed companies in the ₹4–7 LPA range. For banking, finance, or marketing careers in Pune/Maharashtra, these colleges provide good value compared to taking ₹20L+ loans for tier-2 national MBA colleges.",
  },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "Low Fees MBA Colleges Pune", url: "/low-fees-mba-colleges-pune" },
]

export default function LowFeesMBACollegesPunePage() {
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
              <span>/</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link>
              <span>/</span>
              <span className="text-white">Low Fees MBA Colleges Pune</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Cheapest MBA Colleges in Pune 2026
            </h1>
            <p className="text-blue-200 text-base max-w-3xl mb-6">
              Complete list of affordable MBA colleges in Pune with fees under ₹5 lakh and ₹10 lakh total. Compare fee structures, average placements, and ROI to pick the best budget MBA program.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-2">⚡ Quick Answer — Cheapest MBA Colleges in Pune</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Suryadatta Institute</strong> is cheapest at ₹2.8L total (2 years). <strong>IIMM Pune</strong> ₹3.8L, <strong>Indira Institute</strong> ₹4.2L, <strong>BIMM</strong> ₹5L. All under ₹5L and NAAC accredited. Admission via <strong>MAH-CET</strong> or <strong>CAT</strong>. Average placement ₹4–6 LPA. MIT-SOM (₹7–11L) offers higher placements of ₹7–9 LPA.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Cheapest MBA (2 yrs)", value: "₹2.8L", icon: "🏛️" },
              { label: "Under ₹5L Options", value: "4 Colleges", icon: "💰" },
              { label: "Min Avg Placement", value: "₹4 LPA", icon: "📈" },
              { label: "ROI Recovery", value: "< 1 Year", icon: "🎯" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-lg font-extrabold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Table 1: Under ₹5L */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100 bg-green-50">
              <h2 className="text-lg font-bold text-gray-900">MBA Colleges in Pune — Under ₹5 Lakh Total Fees</h2>
              <p className="text-xs text-gray-500 mt-0.5">2-year MBA/PGDM total cost. All colleges are AICTE approved and NAAC accredited. Data verified 2026.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-center hidden sm:table-cell">NAAC</th>
                    <th className="px-4 py-3 text-right">Per Year</th>
                    <th className="px-4 py-3 text-right hidden md:table-cell">2-Yr Total</th>
                    <th className="px-4 py-3 text-center">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {under5LMBAColleges.map((c) => (
                    <tr key={c.slug} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          <span className="text-xs text-gray-500">{c.type}</span>
                          <span className="text-xs bg-green-50 text-green-700 px-1.5 rounded-full">{c.note}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.naac === "A+" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                          {c.naac}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-gray-700">{c.feesPerYear}</td>
                      <td className="px-4 py-3 text-right text-xs font-semibold text-green-700 hidden md:table-cell">{c.feesTotal}</td>
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

          {/* Table 2: Under ₹10L */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-gray-100 bg-blue-50">
              <h2 className="text-lg font-bold text-gray-900">MBA Colleges in Pune — Under ₹10 Lakh Total Fees</h2>
              <p className="text-xs text-gray-500 mt-0.5">Deemed universities and top-ranked MBA colleges with stronger placements, fees ₹5–10L for 2 years.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0A1628] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">College</th>
                    <th className="px-4 py-3 text-center hidden sm:table-cell">NAAC</th>
                    <th className="px-4 py-3 text-right">Per Year</th>
                    <th className="px-4 py-3 text-right hidden md:table-cell">2-Yr Total</th>
                    <th className="px-4 py-3 text-center">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {under10LMBAColleges.map((c) => (
                    <tr key={c.slug} className="hover:bg-orange-50/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{c.name}</p>
                        <div className="flex flex-wrap gap-1 mt-0.5">
                          <span className="text-xs text-gray-500">{c.type}</span>
                          <span className="text-xs bg-blue-50 text-blue-700 px-1.5 rounded-full">{c.note}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          {c.naac}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-gray-700">{c.feesPerYear}</td>
                      <td className="px-4 py-3 text-right text-xs font-semibold text-blue-700 hidden md:table-cell">{c.feesTotal}</td>
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

          {/* MBA Loan & ROI */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" /> MBA Loan Options & ROI Calculation
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Education Loan for MBA in Pune</h3>
                <div className="space-y-2">
                  {[
                    { bank: "SBI Scholar Loan", rate: "8.5%/yr", max: "Up to ₹40L" },
                    { bank: "HDFC Credila", rate: "10–12%/yr", max: "Up to ₹75L" },
                    { bank: "Axis Bank", rate: "11–13%/yr", max: "Up to ₹40L" },
                    { bank: "NBFC (Avanse, Auxilo)", rate: "12–14%/yr", max: "Up to ₹50L" },
                  ].map(({ bank, rate, max }) => (
                    <div key={bank} className="flex items-center justify-between text-sm border-b border-gray-50 pb-2">
                      <span className="text-gray-700 font-medium">{bank}</span>
                      <div className="text-right">
                        <span className="text-xs text-gray-500">{rate}</span>
                        <span className="text-xs text-blue-700 ml-2">{max}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">Moratorium period: course duration + 6 months. Repayment: 5–15 years.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">ROI Comparison — MBA Fees vs Salary</h3>
                <div className="space-y-3">
                  {[
                    { college: "Suryadatta / IIMM", fees: "₹2.8–3.8L", placement: "₹4–5 LPA", recovery: "< 1 year" },
                    { college: "Indira / BIMM", fees: "₹4.2–5L", placement: "₹5–6 LPA", recovery: "~1 year" },
                    { college: "MIT-SOM", fees: "₹7–11L", placement: "₹7–9 LPA", recovery: "1.5–2 years" },
                  ].map(({ college, fees, placement, recovery }) => (
                    <div key={college} className="bg-gray-50 rounded-xl p-3">
                      <p className="font-semibold text-gray-900 text-sm">{college}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Fees: <span className="text-red-600 font-medium">{fees}</span></span>
                        <span className="text-xs text-gray-500">Salary: <span className="text-green-700 font-medium">{placement}</span></span>
                        <span className="text-xs text-gray-500">Recovery: <span className="text-blue-700 font-medium">{recovery}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* How to Reduce MBA Fees */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-orange-500" /> How to Reduce MBA Fees in Pune
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                {[
                  { title: "Maharashtra MBA Fee Waiver (EBC)", desc: "Economically Backward Class students with family income below ₹8L/year get 50% fee waiver at government-aided MBA colleges through MAH-CET CAP process." },
                  { title: "Post-Matric Scholarship (SC/ST)", desc: "SC/ST students get full MBA fees covered by Maharashtra government's Post-Matric Scholarship scheme. Apply through MahaDBT portal before admission." },
                  { title: "Merit Scholarship (MAH-CET Rank)", desc: "Top 500 MAH-CET rankers are offered institutional merit scholarships by SPPU-affiliated MBA colleges worth ₹25,000–₹1L per year." },
                  { title: "Corporate Sponsorship", desc: "Some Pune companies sponsor MBA fees for their employees at SPPU-affiliated colleges. Check with your employer's HR for educational assistance programs." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { title: "AICTE GPAT / CMAT Scholarship", desc: "AICTE provides merit-cum-means scholarship for PGDM students at AICTE-approved institutes. ₹30,000/year for eligible candidates via NSP portal." },
                  { title: "OBC Non-Creamy Layer Waiver", desc: "OBC (Non-Creamy Layer) students with family income below ₹8L/year get 25–50% fee reduction at government-aided MBA colleges in Maharashtra." },
                  { title: "Minority Scholarship (NSP)", desc: "Students from Muslim, Christian, Sikh, Buddhist, Jain, and Zoroastrian communities can apply for minority scholarship via NSP at scholarships.gov.in." },
                  { title: "College Merit-Based Fellowships", desc: "MIT-SOM and SIBM Pune offer need-based and merit-based fellowships for students scoring above 99 percentile in MAH-CET or 90+ in CAT/XAT." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — Low Fees MBA Colleges in Pune</h2>
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
              <p className="font-bold text-lg">Find the best value MBA for your budget</p>
              <p className="text-blue-200 text-sm">Use our MBA Predictor or get free counselling on loans & scholarships.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/predictor" className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                MBA Predictor →
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
