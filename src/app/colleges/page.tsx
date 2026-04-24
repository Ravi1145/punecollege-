import { Metadata } from "next"
import { Suspense } from "react"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema, generateItemListSchema } from "@/lib/seo"
import Script from "next/script"
import Link from "next/link"
import CollegeGrid from "@/components/colleges/CollegeGrid"
import { colleges } from "@/data/colleges"

export const metadata: Metadata = genMeta({
  title: "All Colleges in Pune 2026 — Fees, Rankings & Reviews",
  description: "Browse and compare 108+ colleges in Pune. Filter by stream (Engineering, MBA, Medical), fees, NAAC grade, and location. Government, private & deemed colleges with real placement data.",
  path: "/colleges",
  keywords: [
    "colleges in pune", "engineering colleges pune", "mba colleges pune",
    "medical colleges pune", "pune university colleges list", "colleges in pune with fees",
    "best college pune 2026", "naac a+ colleges pune", "nirf ranked colleges pune",
  ],
})

const listingFaqs = [
  { question: "How many colleges are there in Pune?", answer: "Pune has over 800 colleges including 400+ engineering colleges, 100+ MBA institutes, and 50+ medical colleges. CollegePune profiles 108+ top colleges with verified fees, placements, and NAAC data." },
  { question: "Which is the best government college in Pune?", answer: "COEP (College of Engineering Pune) is the best government engineering college — NIRF #49, NAAC A+, fees ₹80K–1.8L/yr, avg placement ₹12 LPA. For medical: AFMC (NIRF #4, NAAC A++). For arts/commerce: BMCC and Fergusson College." },
  { question: "Which Pune college has the best placements?", answer: "For MBA: SIBM Pune with ₹28 LPA average and McKinsey/BCG recruiters. For engineering: COEP with ₹12 LPA average and ₹45 LPA highest package. For overall placement salary, SIBM Pune leads all Pune colleges." },
  { question: "What is the fee range for engineering colleges in Pune?", answer: "Engineering fees in Pune 2026: Government (COEP) ₹80K–1.8L/yr; Autonomous private (PICT, VIT Pune) ₹1.4L–2.2L/yr; Deemed universities (SIT, MIT-WPU) ₹2L–4.8L/yr. SC/ST students get full fee waiver at government colleges." },
  { question: "Which entrance exam is needed for Pune college admission?", answer: "MHT-CET (April–May 2026) for engineering at SPPU-affiliated colleges. NEET 2026 (May 3) for medical. CAT 2026 (November) for PUMBA/IMT MBA. SNAP 2026 (December) for Symbiosis MBA colleges. SET 2026 (May) for Symbiosis UG programs." },
]

export default function CollegesPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges in Pune", url: "/colleges" },
  ])
  const faqSchema = generateFAQSchema(listingFaqs)
  const topColleges = colleges.slice(0, 10)
  const itemList = generateItemListSchema(
    topColleges.map(c => ({ name: c.name, url: `/colleges/${c.slug}`, description: `${c.type} college, NAAC ${c.naac}, avg placement ₹${(c.avgPlacement/100000).toFixed(1)} LPA` }))
  )

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="item-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <div className="bg-[#F8FAFC] min-h-screen">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-blue-300 mb-4 flex gap-1">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Colleges in Pune</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              All Colleges in Pune 2026
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Discover and compare 108+ top engineering, MBA, medical and arts colleges in Pune. Real fees, placements, and NAAC data.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {["Engineering", "MBA", "Medical", "Law", "Design", "Government"].map(s => (
                <Link key={s} href={`/colleges-in-pune/${s.toLowerCase()}-colleges-pune`}
                  className="text-xs bg-white/10 text-blue-200 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors">
                  {s} Colleges →
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="flex items-center justify-center h-64 text-gray-500">Loading colleges...</div>}>
          <CollegeGrid />
        </Suspense>

        {/* GEO + FAQ Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions — Pune Colleges 2026</h2>
          <div className="space-y-4">
            {listingFaqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Related searches */}
          <div className="mt-10">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Related Searches</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Engineering Colleges Pune", href: "/colleges-in-pune/engineering-colleges-pune" },
                { label: "MBA Colleges Pune", href: "/colleges-in-pune/mba-colleges-pune" },
                { label: "Government Colleges Pune", href: "/colleges-in-pune/government-colleges-pune" },
                { label: "NAAC A+ Colleges Pune", href: "/colleges-in-pune/naac-a-plus-colleges-pune" },
                { label: "NIRF Ranked Colleges Pune", href: "/colleges-in-pune/nirf-ranked-colleges-pune" },
                { label: "Low Fee Colleges Pune", href: "/colleges-in-pune/low-fee-colleges-pune" },
                { label: "MHT-CET Colleges Pune", href: "/colleges-in-pune/mht-cet-colleges-pune" },
                { label: "Top Placement Colleges Pune", href: "/colleges-in-pune/top-placement-colleges-pune" },
                { label: "Colleges with Hostel Pune", href: "/colleges-in-pune/hostel-facility-colleges-pune" },
                { label: "Medical Colleges Pune", href: "/colleges-in-pune/medical-colleges-pune" },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
