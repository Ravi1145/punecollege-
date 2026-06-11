import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { colleges } from "@/data/colleges"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"

export function generateStaticParams() {
  return colleges.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const col = colleges.find(c => c.slug === slug)
  if (!col) return {}
  return genMeta({
    title: `${col.name} Fees 2025-26 | Course-wise Fee Structure | CollegePune`,
    description: `${col.name} fee structure 2025-26: ${col.courses.join(", ")} fees range from ₹${(col.feesRange.min/100000).toFixed(1)}L to ₹${(col.feesRange.max/100000).toFixed(1)}L per year. Hostel, scholarship & payment details.`,
    path: `/colleges/${slug}/fees`,
    keywords: [`${col.shortName} fees`, `${col.name} fee structure`, `${col.shortName} fees per year`, `${col.name} fees 2025`, `${col.shortName} total fees`],
  })
}

export const revalidate = 3600

export default async function CollegeFees({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const col = colleges.find(c => c.slug === slug)
  if (!col) notFound()

  const faqs = [
    { question: `What is the total fee for ${col.courses[0]} at ${col.name}?`, answer: `The ${col.courses[0]} fee at ${col.name} ranges from ₹${(col.feesRange.min/100000).toFixed(1)} lakh to ₹${(col.feesRange.max/100000).toFixed(1)} lakh per year. Total program cost over ${col.courses[0].includes("M.") ? "2" : "4"} years is approximately ₹${(col.feesRange.min * (col.courses[0].includes("M.") ? 2 : 4) / 100000).toFixed(1)}L–₹${(col.feesRange.max * (col.courses[0].includes("M.") ? 2 : 4) / 100000).toFixed(1)}L.` },
    { question: `Does ${col.shortName} offer scholarships?`, answer: `Yes, ${col.name} offers merit-based scholarships, government scholarships (MahaDBT, EBC), and freeship cards for eligible students. SC/ST/OBC students can avail government scholarship covering full tuition. Merit scholarships are awarded to students with 80%+ marks.` },
    { question: `What is the hostel fee at ${col.name}?`, answer: `${col.hostel ? `${col.name} has on-campus hostel facilities. Hostel fees typically range from ₹60,000–₹1,20,000 per year including accommodation and mess. Exact charges vary by room type and meal plan.` : `${col.name} does not have on-campus hostel. Students can find private PG accommodation near the campus starting at ₹5,000–₹12,000 per month.`}` },
    { question: `Can I pay ${col.shortName} fees in installments?`, answer: `Yes, most colleges including ${col.name} allow fee payment in 2 installments per semester. Some colleges offer EMI options through education loans. Contact the accounts office for the exact installment schedule.` },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges", url: "/colleges" },
    { name: col.name, url: `/colleges/${col.slug}` },
    { name: "Fees", url: `/colleges/${col.slug}/fees` },
  ])

  const priceSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: col.name,
    url: `https://collegepune.com/colleges/${col.slug}`,
    tuitionFeeSpecification: {
      "@type": "MonetaryAmountDistribution",
      currency: "INR",
      minValue: col.feesRange.min,
      maxValue: col.feesRange.max,
      unitText: "per year",
    },
  }

  // Estimate course-wise fees
  const courseFees = col.courses.map(course => {
    const multiplier = course.startsWith("M") ? 1.3 : course === "PhD" ? 0.8 : 1
    const duration = course === "B.Tech" || course === "B.Pharm" ? 4 : course.startsWith("M") ? 2 : course === "MBA" ? 2 : course === "BBA" || course === "BCA" || course === "B.Com" ? 3 : 4
    return {
      course,
      duration: `${duration} Years`,
      minFee: `₹${((col.feesRange.min * multiplier) / 100000).toFixed(1)}L/yr`,
      maxFee: `₹${((col.feesRange.max * multiplier) / 100000).toFixed(1)}L/yr`,
      total: `₹${((col.feesRange.min * multiplier * duration) / 100000).toFixed(1)}L–₹${((col.feesRange.max * multiplier * duration) / 100000).toFixed(1)}L`,
    }
  })

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="price-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(priceSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />

      <div className="bg-surface min-h-screen">
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link>
              <span>›</span>
              <Link href={`/colleges/${col.slug}`} className="hover:text-white">{col.shortName}</Link>
              <span>›</span>
              <span className="text-white">Fees</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white mb-2">{col.name} — Fee Structure 2025-26</h1>
            <p className="text-gray-300 text-sm">Complete course-wise fee breakup, hostel charges & scholarship details</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Sub-nav */}
          <div className="flex gap-2 flex-wrap text-sm">
            {["Overview", "Fees", "Placements", "Cutoff", "Admission", "Scholarship"].map(tab => (
              <Link
                key={tab}
                href={tab === "Overview" ? `/colleges/${col.slug}` : `/colleges/${col.slug}/${tab.toLowerCase()}`}
                className={`px-4 py-2 rounded-full border transition-colors ${tab === "Fees" ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"}`}
              >
                {tab}
              </Link>
            ))}
          </div>

          {/* Fee Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Min Fees/yr", value: `₹${(col.feesRange.min/100000).toFixed(1)}L` },
              { label: "Max Fees/yr", value: `₹${(col.feesRange.max/100000).toFixed(1)}L` },
              { label: "Hostel", value: col.hostel ? "Available" : "Not Available" },
              { label: "Scholarships", value: "Available" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl shadow p-4 text-center border border-gray-100">
                <p className="text-2xl font-bold text-blue-700">{s.value}</p>
                <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Course-wise Fees Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Course-wise Fee Structure 2025-26</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-left">
                    <th className="px-6 py-3 font-semibold">Course</th>
                    <th className="px-6 py-3 font-semibold">Duration</th>
                    <th className="px-6 py-3 font-semibold">Annual Fees</th>
                    <th className="px-6 py-3 font-semibold">Total Program Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {courseFees.map((c, i) => (
                    <tr key={c.course} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-3 font-medium text-gray-800">{c.course}</td>
                      <td className="px-6 py-3 text-gray-600">{c.duration}</td>
                      <td className="px-6 py-3 text-gray-800">{c.minFee} – {c.maxFee}</td>
                      <td className="px-6 py-3 font-semibold text-blue-700">{c.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Additional Fees */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Additional Charges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {[
                { item: "Admission/Registration Fee", amount: "₹5,000–₹15,000 (one-time)" },
                { item: "Exam Fee (per semester)", amount: "₹1,500–₹3,000" },
                { item: "Library Fee (annual)", amount: "₹1,000–₹2,500" },
                { item: "Laboratory Fee (annual)", amount: "₹3,000–₹8,000" },
                { item: "Caution Deposit (refundable)", amount: "₹5,000–₹10,000" },
                { item: "Development/Infrastructure Fee", amount: "₹5,000–₹20,000/yr" },
                col.hostel ? { item: "Hostel (annual approx.)", amount: "₹60,000–₹1,20,000" } : { item: "Hostel", amount: "Not Available on Campus" },
                { item: "Transport (if opted)", amount: "₹15,000–₹30,000/yr" },
              ].map(f => (
                <div key={f.item} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-600">{f.item}</span>
                  <span className="font-medium text-gray-800">{f.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarship Notice */}
          <div className="bg-green-50 rounded-xl p-5 border border-green-100">
            <h2 className="font-bold text-green-800 mb-2">💡 Scholarship Options to Reduce Fees</h2>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>MahaDBT Scholarship</strong> — covers full tuition for eligible SC/ST/OBC/EBC students</li>
              <li>• <strong>EBC (Economically Backward Class)</strong> — for family income below ₹8 lakh/year</li>
              <li>• <strong>Merit Scholarship</strong> — awarded to top 10% scorers in MHT-CET / JEE</li>
              <li>• <strong>Freeship Card</strong> — full fee waiver for students with income below ₹1 lakh/year</li>
              <li>• <strong>Education Loans</strong> — SBI, Bank of Maharashtra offer loans at 8–9% p.a.</li>
            </ul>
            <Link href={`/colleges/${col.slug}/scholarship`} className="mt-3 inline-block text-sm text-green-800 font-semibold underline underline-offset-2">
              View All Scholarships at {col.shortName} →
            </Link>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">FAQs on {col.shortName} Fees</h2>
            <div className="space-y-3">
              {faqs.map(faq => (
                <details key={faq.question} className="group border-b border-gray-100 pb-3 last:border-0">
                  <summary className="cursor-pointer font-medium text-gray-800 text-sm flex justify-between items-center">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2">▾</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Internal Links */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">Explore More About {col.shortName}</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {["Placements", "Cutoff", "Admission", "Scholarship", "Overview"].map(tab => (
                <Link key={tab} href={tab === "Overview" ? `/colleges/${col.slug}` : `/colleges/${col.slug}/${tab.toLowerCase()}`}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  {col.shortName} {tab}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
