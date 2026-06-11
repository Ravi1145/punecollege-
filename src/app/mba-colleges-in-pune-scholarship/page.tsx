import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "MBA Scholarships in Pune 2026 | Government, Merit & College Scholarships",
  description: "Complete guide to MBA scholarships in Pune 2026. MahaDBT, EBC Freeship, merit scholarships, AICTE scholarships, minority scholarships to reduce MBA fees in Pune.",
  path: "/mba-colleges-in-pune-scholarship",
  keywords: ["mba scholarship pune", "mba colleges pune scholarship 2026", "government scholarship mba pune", "mahadbt mba scholarship pune", "mba free scholarship pune"],
})
export const revalidate = 300

const scholarships = [
  { name: "MahaDBT — Post Matric Scholarship (SC/ST)", eligibility: "SC/ST students from Maharashtra", benefit: "Full tuition fee + maintenance allowance", agency: "Maharashtra Government", deadline: "November 2026", link: "mahadbt.maharashtra.gov.in" },
  { name: "EBC (Economically Backward Class) Freeship", eligibility: "Open category, family income < ₹8L/year", benefit: "Full tuition fee waiver", agency: "Maharashtra Government", deadline: "October 2026", link: "mahadbt.maharashtra.gov.in" },
  { name: "OBC/NT/SBC Post Matric Scholarship", eligibility: "OBC/NT/SBC students from Maharashtra", benefit: "Partial/full tuition coverage", agency: "Maharashtra Government", deadline: "October 2026", link: "mahadbt.maharashtra.gov.in" },
  { name: "AICTE Pragati Scholarship (Girls)", eligibility: "Girl students in AICTE-approved MBA, family income < ₹8L/year", benefit: "₹50,000/year + contingency ₹20,000", agency: "AICTE / Central Government", deadline: "September 2026", link: "scholarships.gov.in" },
  { name: "National Scholarship Portal — Merit Scholarship", eligibility: "Merit-based, income criteria applicable", benefit: "₹10,000–₹25,000/year", agency: "Central Government", deadline: "October 2026", link: "scholarships.gov.in" },
  { name: "Minority Scholarship (NSP)", eligibility: "Muslim/Christian/Sikh/Buddhist/Parsi/Jain students, income criteria", benefit: "Up to ₹25,000/year", agency: "Ministry of Minority Affairs", deadline: "September 2026", link: "scholarships.gov.in" },
  { name: "SIBM Pune Merit Scholarship", eligibility: "Top 5% SNAP scorers + SIBM academic merit", benefit: "25-50% fee waiver for 1 year", agency: "SIBM Pune / Symbiosis", deadline: "At admission", link: "sibm.edu" },
  { name: "MIT-SOM Merit Scholarship", eligibility: "MAH-CET 90+ percentile or CAT 80+ percentile", benefit: "₹50,000–₹1L fee reduction", agency: "MIT World Peace University", deadline: "At admission", link: "mitwpu.edu.in" },
]

const faqs = [
  { question: "Can I get scholarship for MBA in Pune?", answer: "Yes. MBA students in Pune can avail MahaDBT scholarships (SC/ST/OBC/EBC), AICTE Pragati scholarship (girls, up to ₹50,000/yr), NSP merit scholarships, and college-specific merit scholarships. SC/ST and EBC (income < ₹8L/yr) students can get full tuition fee waiver at any AICTE-approved Pune MBA college." },
  { question: "What is the income limit for MBA scholarship in Pune?", answer: "For EBC Freeship (full fee waiver): family income < ₹8L/year, Open category. For OBC scholarship: income < ₹8L/year. For SC/ST: no income limit for post-matric scholarship. For NSP merit scholarship: income < ₹4.5L/year. College merit scholarships have no income criteria." },
  { question: "Does MahaDBT scholarship apply to MBA in Pune?", answer: "Yes. MahaDBT post-matric scholarship applies to all AICTE-approved MBA programs in Maharashtra including Pune. SC/ST students can get full tuition reimbursement. OBC/NT/SBC students get partial fee coverage. Apply on the MahaDBT portal after taking admission." },
  { question: "Is AICTE Pragati scholarship available for MBA?", answer: "Yes. AICTE Pragati Scholarship for Girls is available for girl students in AICTE-approved MBA programs with family income below ₹8 lakh/year. The scholarship provides ₹50,000 per year as tuition fee + ₹20,000 per year as contingency allowance. Apply at aicte-pragati-saksham-gov.in." },
]

export default function MBAScholarshipPune() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Scholarships", url: "/mba-colleges-in-pune-scholarship" },
  ])

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1.5">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/mba-colleges-in-pune" className="hover:text-white">MBA Colleges</Link><span>›</span>
              <span className="text-white">Scholarships</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">MBA Scholarships in Pune 2026</h1>
            <p className="text-blue-100 mb-4">Government scholarships, college merit scholarships and central government schemes to fund your MBA in Pune.</p>
            <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 max-w-3xl">
              <p className="text-green-300 text-xs font-bold uppercase mb-1">💰 Key Fact</p>
              <p className="text-white text-sm">SC/ST and EBC students with family income below ₹8 lakh can get <strong>100% MBA tuition fee waiver</strong> through MahaDBT — making MBA effectively free at any AICTE-approved Pune college.</p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">MBA Scholarships Available in Pune 2026</h2>
            {scholarships.map(s => (
              <div key={s.name} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm">{s.name}</h3>
                    <p className="text-xs text-gray-600 mt-1"><strong>Eligibility:</strong> {s.eligibility}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs">
                      <span className="text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full">✓ {s.benefit}</span>
                      <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">{s.agency}</span>
                      <span className="text-gray-500">Deadline: {s.deadline}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">MBA Scholarship FAQs</h2>
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

          <section className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="text-base font-bold text-gray-900 mb-3">Related Pages</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                { label: "MBA Under 5 Lakh", href: "/mba-colleges-in-pune-under-5-lakh" },
                { label: "Scholarships Pune", href: "/scholarships" },
                { label: "MBA Admission Process", href: "/mba-admission-process-pune" },
                { label: "College Scholarships", href: "/colleges-in-pune-with-hostel" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">{l.label}</Link>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Need Help with MBA Scholarship Applications?</h2>
            <p className="text-gray-300 mb-5 text-sm">Our counsellors guide you through MahaDBT, AICTE, and college scholarship applications — free.</p>
            <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg inline-block">Free Counselling →</Link>
          </section>
        </div>
      </div>
    </>
  )
}
