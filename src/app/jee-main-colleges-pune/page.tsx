import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateCollegeListSchema } from "@/lib/seo"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "JEE Main Colleges in Pune 2026 | JEE Accepting Engineering Colleges",
  description: "Top engineering colleges in Pune accepting JEE Main 2026 scores — COEP (NIRF #49), VIT Pune (NIRF #101), SIT Pune, MIT-WPU. Fees ₹80K–₹4.8L/yr, cutoffs & admission process.",
  path: "/jee-main-colleges-pune",
  keywords: [
    "jee main colleges pune 2026", "jee main accepting colleges pune", "engineering colleges pune jee main",
    "coep jee main cutoff", "vit pune jee main", "jee main pune admission",
    "jee main colleges maharashtra pune", "jee score accepting colleges pune",
  ],
})

const colleges = [
  { rank: 1, name: "COEP Technological University", slug: "coep-college-of-engineering-pune", nirf: 49, naac: "A+", fees: "₹80K–₹1.8L/yr", jeeNote: "AIQ 15% seats via JEE Main; 50+ percentile required", highlight: "Best Govt. | NIRF #49" },
  { rank: 2, name: "VIT Pune (Vishwakarma Institute of Technology)", slug: "vit-pune-vishwakarma-institute-of-technology", nirf: 101, naac: "A+", fees: "₹1.6L–₹2.2L/yr", jeeNote: "JEE Main 70+ percentile accepted", highlight: "NIRF #101" },
  { rank: 3, name: "Symbiosis Institute of Technology (SIT Pune)", slug: "symbiosis-institute-of-technology-pune", nirf: null, naac: "A+", fees: "₹3.6L–₹4.8L/yr", jeeNote: "JEE Main + SITEEE accepted", highlight: "Best Deemed" },
  { rank: 4, name: "MIT World Peace University (MIT-WPU)", slug: "mit-wpu-mit-world-peace-university", nirf: null, naac: "A+", fees: "₹2.0L–₹3.8L/yr", jeeNote: "JEE Main 60+ percentile accepted", highlight: "Large Campus" },
  { rank: 5, name: "Cummins College of Engineering for Women", slug: "cummins-college-of-engineering-pune", nirf: null, naac: "A+", fees: "₹1.3L–₹1.75L/yr", jeeNote: "JEE Main 65+ percentile", highlight: "Best Women's College" },
  { rank: 6, name: "Bharati Vidyapeeth College of Engineering", slug: "bharati-vidyapeeth-college-engineering-pune", nirf: null, naac: "A", fees: "₹1.45L–₹1.95L/yr", jeeNote: "JEE Main 50+ percentile", highlight: "Strong Alumni" },
]

const faqs = [
  { question: "Which Pune engineering colleges accept JEE Main 2026?", answer: "COEP Pune (NIRF #49) accepts JEE Main for 15% AIQ seats at 50+ percentile. VIT Pune (NIRF #101) accepts 70+ percentile. SIT Pune (Symbiosis) accepts JEE Main + SITEEE. MIT-WPU accepts 60+ percentile. Cummins College accepts 65+ percentile. All these are top-ranked autonomous or government colleges." },
  { question: "What JEE Main score is required for COEP Pune?", answer: "COEP Pune requires approximately 50+ percentile in JEE Main for AIQ seats in most branches. For Computer Engineering, the JEE Main cutoff is higher — approximately 95+ percentile. COEP gets 15% of seats filled via AIQ (JEE Main) and 85% via MHT-CET state quota." },
  { question: "Is JEE Main accepted in Pune colleges for 2026?", answer: "Yes. Major Pune engineering colleges accepting JEE Main 2026: COEP (NIRF #49), VIT Pune (NIRF #101), SIT Pune (Symbiosis), MIT-WPU, Cummins College, Bharati Vidyapeeth, D.Y. Patil Engineering. All process admissions through DTE Maharashtra CAP rounds after JEE Main results (April 2026)." },
  { question: "Is MHT-CET better than JEE for Pune engineering admission?", answer: "For Pune students targeting local colleges, MHT-CET is better — 85% of seats in SPPU-affiliated colleges are filled via MHT-CET state quota. JEE Main only fills 15% AIQ seats. However, for COEP top branches (CS/IT), JEE Main can give a better chance than competing with all Maharashtra MHT-CET toppers." },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "JEE Main Colleges Pune", url: "/jee-main-colleges-pune" },
]

export default function JeeMainCollegesPune() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const itemListSchema = generateCollegeListSchema(
    colleges.map(c => ({ name: c.name, slug: c.slug })),
    "JEE Main Colleges in Pune 2026"
  )

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-[#0A1628] to-indigo-900 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/engineering-colleges-pune" className="hover:text-white">Engineering Colleges</Link><span>›</span>
              <span className="text-white">JEE Main Colleges Pune</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">JEE Main Colleges in Pune 2026</h1>
            <p className="text-blue-100 text-lg max-w-3xl mb-5">
              Top engineering colleges in Pune accepting JEE Main 2026 scores. Compare cutoffs, fees, NIRF ranks and admission process for COEP, VIT Pune, SIT Pune, MIT-WPU and more.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-3xl" data-speakable="true">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>COEP Pune</strong> (NIRF #49) is the best JEE Main accepting college in Pune — 15% AIQ seats, fees ₹80K/yr. Minimum 50+ percentile required for most branches. <strong>VIT Pune</strong> (NIRF #101) requires 70+ percentile. Admission via <strong>DTE Maharashtra CAP</strong> after JEE Main results.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">Engineering Colleges in Pune Accepting JEE Main 2026</h2>
          {colleges.map((c) => (
            <div key={c.rank} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{c.rank}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg">
                    <Link href={`/colleges/${c.slug}`} className="hover:text-indigo-700">{c.name}</Link>
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1 text-xs">
                    {c.nirf && <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">NIRF #{c.nirf}</span>}
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">NAAC {c.naac}</span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{c.fees}</span>
                  </div>
                  <p className="text-xs text-indigo-700 mt-2 bg-indigo-50 px-3 py-1.5 rounded-lg inline-block">🎯 JEE: {c.jeeNote}</p>
                </div>
                <Link href={`/colleges/${c.slug}`} className="hidden md:block shrink-0 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700">View Profile</Link>
              </div>
            </div>
          ))}

          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">FAQs — JEE Main Colleges in Pune</h2>
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
                { label: "Engineering Colleges Pune", href: "/engineering-colleges-pune" },
                { label: "MHT-CET Colleges Pune", href: "/mht-cet-colleges-pune" },
                { label: "COEP Pune Profile", href: "/colleges/coep-college-of-engineering-pune" },
                { label: "JEE Colleges Pune", href: "/jee-colleges-pune" },
                { label: "College Predictor", href: "/predictor" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full border border-indigo-200 text-indigo-700 text-sm hover:bg-indigo-50">{l.label}</Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
