import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateCollegeListSchema } from "@/lib/seo"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Best BCom Colleges in Pune 2026 | Fees, Admission & Placements",
  description: "Top BCom colleges in Pune 2026 — Fergusson College, SP College, Garware College. Fees ₹10,000–₹1.5L/yr, NAAC grades, placements & SPPU affiliation. Admission via CUET/merit.",
  path: "/bcom-colleges-pune",
  keywords: [
    "bcom colleges pune 2026", "best bcom college in pune", "bcom admission pune",
    "bachelor of commerce pune", "bcom fees pune", "commerce colleges pune 2026",
    "fergusson college bcom", "sp college bcom pune", "garware college pune bcom",
    "sppu bcom colleges", "bcom placement pune",
  ],
})

const colleges = [
  { rank: 1, name: "Fergusson College", slug: "fergusson-college-pune", naac: "A+", type: "Government Aided", fees: "₹15K–₹40K/yr", highlight: "Most Prestigious | Est. 1885" },
  { rank: 2, name: "SP College (Sir Parashurambhau)", slug: "sp-college-pune", naac: "A+", type: "Government Aided", fees: "₹12K–₹35K/yr", highlight: "Top SPPU Commerce College" },
  { rank: 3, name: "Garware College of Commerce", slug: "garware-college-of-commerce-pune", naac: "A", type: "Government Aided", fees: "₹10K–₹28K/yr", highlight: "Best BCom — Lowest Fees" },
  { rank: 4, name: "Symbiosis College of Arts & Commerce (SCAC)", slug: "colleges", naac: "A+", type: "Autonomous", fees: "₹60K–₹90K/yr", highlight: "Symbiosis Brand | SPPU" },
  { rank: 5, name: "Modern College of Arts, Science & Commerce", slug: "modern-college-pune", naac: "A", type: "Government Aided", fees: "₹18K–₹42K/yr", highlight: "Large Intake | Strong Alumni" },
  { rank: 6, name: "Brihan Maharashtra College of Commerce (BMCC)", slug: "bmcc-brihan-maharashtra-college-commerce-pune", naac: "A", type: "Government Aided", fees: "₹15K–₹38K/yr", highlight: "Commerce Specialist College" },
]

const faqs = [
  { question: "Which is the best BCom college in Pune in 2026?", answer: "Fergusson College (NAAC A+, Est. 1885) is the most prestigious BCom college in Pune. For lowest fees, Garware College of Commerce is excellent at ₹10K–₹28K/yr. For placements and industry exposure, Symbiosis College of Arts & Commerce (SCAC) is the top private option." },
  { question: "What is the fee for BCom in Pune 2026?", answer: "BCom fees in Pune range from ₹10,000–₹42,000/year for government-aided colleges (Fergusson, SP College, Garware). Private autonomous colleges charge ₹60,000–₹1.5L/year. Total 3-year BCom cost: ₹30,000–₹1.5L at government colleges." },
  { question: "How to get admission in BCom in Pune 2026?", answer: "BCom admission in Pune is merit-based (12th marks) or via CUET for central university seats. SPPU-affiliated colleges take direct applications online in June–July. Key documents: 12th marksheet, domicile certificate, caste certificate (if applicable), and CUET scorecard." },
  { question: "What is the scope of BCom from Pune?", answer: "BCom graduates from Pune colleges can pursue CA (ICAI), CMA, MBA, M.Com, CS, or direct jobs in banking, finance, accounting, and consulting. Average starting salary: ₹2.5–₹4.5 LPA. Top employers: KPMG, Deloitte, PwC, Axis Bank, HDFC Bank, and Pune-based NBFCs." },
]

const BASE_URL = "https://collegepune.com"
const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "BCom Colleges in Pune", url: "/bcom-colleges-pune" },
]

export default function BComCollegesPune() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const itemListSchema = generateCollegeListSchema(
    colleges.map(c => ({ name: c.name, slug: c.slug })),
    "Best BCom Colleges in Pune 2026"
  )

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-[#0A1628] to-blue-900 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link><span>›</span>
              <span className="text-white">BCom Colleges Pune</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Best BCom Colleges in Pune 2026</h1>
            <p className="text-blue-100 text-lg max-w-3xl mb-5">
              Complete guide to Bachelor of Commerce (BCom) colleges in Pune — Fergusson, SP College, Garware, SCAC. Fees ₹10K–₹1.5L/yr, NAAC grades, placements & SPPU admission details.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-3xl" data-speakable="true">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>Fergusson College</strong> (NAAC A+) is the best BCom college in Pune. For lowest fees, <strong>Garware College</strong> charges just ₹10K–₹28K/yr. Admission is merit-based on 12th board marks, with applications opening in June 2026.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Top BCom Colleges in Pune 2026</h2>
          {colleges.map((c) => (
            <div key={c.rank} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{c.rank}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">
                    <Link href={`/colleges/${c.slug}`} className="hover:text-blue-700">{c.name}</Link>
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1 text-xs">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">NAAC {c.naac}</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c.type}</span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{c.fees}</span>
                    <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">{c.highlight}</span>
                  </div>
                </div>
                <Link href={`/colleges/${c.slug}`} className="hidden md:block shrink-0 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">View Profile</Link>
              </div>
            </div>
          ))}

          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">FAQs — BCom Colleges in Pune</h2>
            <div className="space-y-3">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="border border-gray-100 rounded-xl p-4">
                  <summary className="font-semibold text-gray-800 cursor-pointer">{question}</summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Related Pages</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Commerce Colleges Pune", href: "/commerce-colleges-pune" },
                { label: "Arts Colleges Pune", href: "/arts-colleges-pune" },
                { label: "Government Colleges Pune", href: "/government-colleges-pune" },
                { label: "Low Fee Colleges Pune", href: "/low-fee-colleges-pune" },
                { label: "All Colleges Pune", href: "/colleges" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full border border-blue-200 text-blue-700 text-sm hover:bg-blue-50">{l.label}</Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
