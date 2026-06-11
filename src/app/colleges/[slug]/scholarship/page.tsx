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
    title: `${col.name} Scholarships 2025-26 | MahaDBT, Merit & Government Schemes`,
    description: `Complete list of scholarships available at ${col.name} 2025-26: MahaDBT, EBC freeship, merit scholarships, minority scholarships. Reduce fees from ₹${(col.feesRange.min/100000).toFixed(1)}L to zero.`,
    path: `/colleges/${slug}/scholarship`,
    keywords: [`${col.shortName} scholarship`, `${col.name} scholarship 2025`, `${col.shortName} fee waiver`, `${col.shortName} mahadbt`, `scholarship ${col.name}`],
  })
}

export const revalidate = 3600

export default async function CollegeScholarship({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const col = colleges.find(c => c.slug === slug)
  if (!col) notFound()

  const scholarships = [
    { name: "MahaDBT — Government Scholarship", eligibility: "SC/ST/OBC/NT/SBC/EWS students with family income below ₹8 lakh", benefit: "Full tuition fee coverage", deadline: "November–December 2025", type: "Government" },
    { name: "EBC (Economically Backward Class) Freeship", eligibility: "Open category with family income below ₹8 lakh/year", benefit: "Full tuition fee waiver", deadline: "October–November 2025", type: "Government" },
    { name: "Post Matric Scholarship (SC/ST)", eligibility: "SC/ST students of Maharashtra", benefit: "Full tuition + maintenance allowance", deadline: "October 2025", type: "Government" },
    { name: "Minority Scholarship", eligibility: "Muslim, Christian, Sikh, Buddhist, Parsi, Jain students", benefit: "Up to ₹25,000/year", deadline: "October 2025", type: "Government" },
    { name: `${col.shortName} Merit Scholarship`, eligibility: "Top 10% students in MHT-CET or 80%+ in 12th", benefit: "25–50% fee reduction for 1st year", deadline: "At time of admission", type: "College" },
    { name: "Rajarshi Shahu Maharaj Scholarship", eligibility: "OBC students of Maharashtra with 60%+ marks", benefit: "Up to ₹10,000/year", deadline: "September 2025", type: "Government" },
    { name: "National Scholarship Portal (NSP) Schemes", eligibility: "Various — income-based, merit-based, minority", benefit: "₹10,000–₹50,000/year", deadline: "October–November 2025", type: "Central Government" },
    { name: "Education Loan (SBI Vidya Lakshmi)", eligibility: "All admitted students", benefit: "Up to ₹20 lakh at 8–9% p.a.", deadline: "Ongoing", type: "Loan" },
  ]

  const faqs = [
    { question: `How do I apply for MahaDBT scholarship at ${col.shortName}?`, answer: `Register on the MahaDBT portal (mahadbt.maharashtra.gov.in), fill the scholarship application form, and submit it through your college. Your college admin will forward it to the government. Ensure all documents (income certificate, caste certificate, marksheets) are ready before applying.` },
    { question: `What is the income limit for scholarships at ${col.name}?`, answer: `For government scholarships like EBC Freeship and Post Matric Scholarship, the family income limit is generally ₹8 lakh per year. For some SC/ST schemes, there is no income limit. Merit scholarships do not have income criteria.` },
    { question: `Does ${col.shortName} have its own scholarship?`, answer: `Yes, ${col.name} offers merit-based scholarships for students who score in the top 10% of MHT-CET or score 80%+ in Class 12. Some colleges also offer sports quotas and special alumni-funded scholarships. Contact the college directly for the latest scholarship schemes.` },
    { question: `Can I get full fee waiver at ${col.name}?`, answer: `Yes, eligible SC/ST students and EBC (Economically Backward Class) students from Maharashtra can avail full tuition fee waiver through government scholarship schemes (MahaDBT Freeship). This essentially makes education free for qualifying students.` },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges", url: "/colleges" },
    { name: col.name, url: `/colleges/${col.slug}` },
    { name: "Scholarship", url: `/colleges/${col.slug}/scholarship` },
  ])

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />

      <div className="bg-surface min-h-screen">
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link><span>›</span>
              <Link href={`/colleges/${col.slug}`} className="hover:text-white">{col.shortName}</Link><span>›</span>
              <span className="text-white">Scholarship</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white mb-2">{col.name} Scholarships 2025-26</h1>
            <p className="text-gray-300 text-sm">MahaDBT, EBC Freeship, merit scholarships & education loans — reduce fees to ₹0</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Sub-nav */}
          <div className="flex gap-2 flex-wrap text-sm">
            {["Overview", "Fees", "Placements", "Cutoff", "Admission", "Scholarship"].map(tab => (
              <Link key={tab} href={tab === "Overview" ? `/colleges/${col.slug}` : `/colleges/${col.slug}/${tab.toLowerCase()}`}
                className={`px-4 py-2 rounded-full border transition-colors ${tab === "Scholarship" ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"}`}>
                {tab}
              </Link>
            ))}
          </div>

          {/* Alert */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <strong>💰 Did you know?</strong> Eligible students at {col.name} can get full fee waivers through government schemes. If your family income is below ₹8 lakh/year, you likely qualify for at least one scholarship.
          </div>

          {/* Scholarship Cards */}
          <div className="space-y-4">
            {scholarships.map(s => (
              <div key={s.name} className="bg-white rounded-xl shadow p-5 border border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-bold text-gray-900 text-sm">{s.name}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.type === "Government" || s.type === "Central Government" ? "bg-green-50 text-green-700" : s.type === "College" ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-600"}`}>
                        {s.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2"><strong>Eligibility:</strong> {s.eligibility}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="text-green-700 font-semibold">✓ {s.benefit}</span>
                      <span className="text-gray-500">Deadline: {s.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How to Apply */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">How to Apply for Scholarships at {col.shortName}</h2>
            <ol className="space-y-3 text-sm">
              {[
                "Get admission confirmed at the college and collect student ID",
                "Collect required documents: caste certificate, income certificate, domicile, Aadhar, 10th-12th marksheets",
                "Register on MahaDBT portal (mahadbt.maharashtra.gov.in) for state government scholarships",
                "Register on NSP (scholarships.gov.in) for central government scholarships",
                "Submit online application with all documents within the deadline",
                "College scholarship section will verify and forward your application",
                "Scholarship amount is disbursed directly to your bank account after approval",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Scholarship FAQs — {col.shortName}</h2>
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

          {/* Links */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-3">Related Pages</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href={`/colleges/${col.slug}/fees`} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">{col.shortName} Fees</Link>
              <Link href="/scholarships" className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">All Pune Scholarships</Link>
              <Link href="/counselling" className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 hover:bg-blue-100 transition-colors">Free Counselling</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
