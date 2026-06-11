import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateCollegeListSchema } from "@/lib/seo"
import { mbaColleges, mbaFAQs } from "@/data/mbaColleges"

export const metadata: Metadata = genMeta({
  title: "MBA Colleges in Pune 2026 | Fees, Cutoff & Placement",
  description: "120+ MBA colleges in Pune 2026. Fees ₹1.25L–16L/yr, MAH-CET cutoffs, placements ₹7–24 LPA, NAAC grades. SIBM, SCMHRD, PUMBA, MIT-SOM compared.",
  path: "/mba-colleges-in-pune",
  keywords: [
    "mba colleges in pune", "best mba colleges in pune", "top mba colleges in pune",
    "mba colleges pune 2026", "mba in pune", "pune mba colleges list",
    "mba colleges pune fees", "mba admission pune 2026", "mba colleges pune mah cet",
    "government mba colleges pune", "private mba colleges pune",
  ],
})

export const revalidate = 300

const clusterLinks = [
  { label: "Under ₹5 Lakh", href: "/mba-colleges-in-pune-under-5-lakh" },
  { label: "Under ₹10 Lakh", href: "/mba-colleges-in-pune-under-10-lakh" },
  { label: "CAT Score", href: "/mba-colleges-in-pune-accepting-cat" },
  { label: "CMAT Score", href: "/mba-colleges-in-pune-accepting-cmat" },
  { label: "MAH-CET Admission", href: "/mba-colleges-in-pune-accepting-mh-cet" },
  { label: "Best Placements", href: "/mba-colleges-in-pune-with-100-placement" },
  { label: "Highest Package", href: "/mba-colleges-in-pune-highest-package" },
  { label: "Direct Admission", href: "/mba-colleges-in-pune-direct-admission" },
  { label: "Marketing Specialization", href: "/mba-colleges-in-pune-for-marketing" },
  { label: "Finance Specialization", href: "/mba-colleges-in-pune-for-finance" },
  { label: "HR Specialization", href: "/mba-colleges-in-pune-for-hr" },
  { label: "Business Analytics", href: "/mba-colleges-in-pune-for-business-analytics" },
  { label: "With Hostel", href: "/mba-colleges-in-pune-with-hostel" },
  { label: "For Girls", href: "/mba-colleges-in-pune-for-girls" },
  { label: "Part-Time", href: "/mba-colleges-in-pune-part-time" },
  { label: "Executive MBA", href: "/mba-colleges-in-pune-executive" },
  { label: "Cutoffs 2026", href: "/mba-cutoff-pune" },
  { label: "Admission Process", href: "/mba-admission-process-pune" },
]

export default function MBACollegesInPune() {
  const faqSchema = generateFAQSchema(mbaFAQs.general)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
  ])
  const itemListSchema = generateCollegeListSchema(
    mbaColleges.map(c => ({ name: c.name, slug: c.slug, description: c.highlights[0] })),
    "MBA Colleges in Pune 2026"
  )
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Master of Business Administration (MBA)",
    description: "2-year postgraduate management program offered at 120+ AICTE-approved colleges in Pune. Admission via MAH-CET MBA, CAT, CMAT, SNAP, and other entrance exams.",
    provider: { "@type": "City", name: "Pune", sameAs: "https://en.wikipedia.org/wiki/Pune" },
    timeRequired: "P2Y",
    educationalCredentialAwarded: "MBA",
    offers: { "@type": "AggregateOffer", priceCurrency: "INR", lowPrice: 125000, highPrice: 1600000, offerCount: 120 },
  }

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Script id="course-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <header className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white py-14 px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1.5">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <span className="text-white">MBA Colleges in Pune</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">MBA Colleges in Pune 2026</h1>
            <p className="text-blue-100 text-lg max-w-3xl mb-6">
              Complete guide to 120+ MBA colleges in Pune — fees, MAH-CET cutoffs, placements, NAAC grades and admission process for 2026 batch.
            </p>
            {/* Quick Answer Box — AI Overview target */}
            <div className="bg-white/10 border border-white/20 rounded-xl p-5 max-w-3xl" data-speakable="true">
              <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>SIBM Pune</strong> (NIRF #14, avg ₹24 LPA) is the best MBA college in Pune.
                <strong> PUMBA</strong> is the best government MBA at ₹1.25L/yr. MBA fees range ₹1.25L–16L/year.
                Admission via <strong>MAH-CET MBA</strong> (most colleges), SNAP (Symbiosis), or CAT/CMAT.
              </p>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {[
                { v: "120+", l: "MBA Colleges" },
                { v: "₹1.25L–16L", l: "Annual Fees" },
                { v: "₹7–24 LPA", l: "Avg Placement" },
                { v: "MAH-CET/CAT", l: "Entrance Exams" },
              ].map(s => (
                <div key={s.l} className="bg-white/10 rounded-xl px-4 py-3 text-center">
                  <p className="text-2xl font-extrabold text-orange-400">{s.v}</p>
                  <p className="text-sm text-white/70 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <main id="main-content" className="max-w-6xl mx-auto px-4 py-10 space-y-10">

          {/* Filter Cluster Links */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Browse MBA Colleges by Filter</h2>
            <div className="flex flex-wrap gap-2">
              {clusterLinks.map(l => (
                <Link key={l.href} href={l.href}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </section>

          {/* College Table */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top MBA Colleges in Pune 2026 — Rankings & Fees</h2>
            <div className="space-y-4">
              {mbaColleges.map((col) => (
                <article key={col.slug} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                      #{col.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg">
                        <Link href={`/colleges/${col.slug}`} className="hover:text-blue-700">{col.name}</Link>
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">{col.location} · Est. {col.established}</p>
                      <div className="flex flex-wrap gap-2 text-xs mb-3">
                        <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium border border-green-100">NAAC {col.naac}</span>
                        {col.nirfRank && <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium border border-blue-100">NIRF #{col.nirfRank}</span>}
                        <span className="bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">{col.type}</span>
                        {col.hostel && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-100">🏠 Hostel</span>}
                      </div>
                      {/* Key metrics */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                          <p className="font-bold text-gray-900">₹{(col.feesPerYear / 100000).toFixed(1)}L/yr</p>
                          <p className="text-xs text-gray-500">Annual Fees</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                          <p className="font-bold text-green-700">₹{(col.avgPlacement / 100000).toFixed(1)} LPA</p>
                          <p className="text-xs text-gray-500">Avg Package</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                          <p className="font-bold text-blue-700">₹{(col.highestPlacement / 100000).toFixed(1)} LPA</p>
                          <p className="text-xs text-gray-500">Highest Pkg</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                          <p className="font-bold text-gray-900 text-xs leading-tight">{col.entranceExams.slice(0, 2).join(", ")}</p>
                          <p className="text-xs text-gray-500">Entrance Exam</p>
                        </div>
                      </div>
                      {/* Highlight */}
                      <p className="text-xs text-gray-600 mt-3 italic">{col.highlights[0]}</p>
                    </div>
                    <Link href={`/colleges/${col.slug}`}
                      className="hidden md:block shrink-0 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Comparison Table */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">MBA Colleges in Pune — Quick Comparison 2026</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-600">
                    <th className="px-4 py-3 font-semibold">College</th>
                    <th className="px-4 py-3 font-semibold">NAAC</th>
                    <th className="px-4 py-3 font-semibold">Fees/yr</th>
                    <th className="px-4 py-3 font-semibold">Avg LPA</th>
                    <th className="px-4 py-3 font-semibold">Exam</th>
                    <th className="px-4 py-3 font-semibold">Cutoff</th>
                  </tr>
                </thead>
                <tbody>
                  {mbaColleges.map((c, i) => (
                    <tr key={c.shortName} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 font-medium">
                        <Link href={`/colleges/${c.slug}`} className="text-blue-700 hover:underline">{c.shortName}</Link>
                      </td>
                      <td className="px-4 py-3"><span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">{c.naac}</span></td>
                      <td className="px-4 py-3 font-semibold">₹{(c.feesPerYear / 100000).toFixed(1)}L</td>
                      <td className="px-4 py-3 font-semibold text-green-700">₹{(c.avgPlacement / 100000).toFixed(1)}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{c.entranceExams[0]}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{c.mahCetCutoff ?? c.catCutoff ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Intro Content — E-E-A-T */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm prose prose-sm max-w-none">
            <h2 className="text-xl font-bold text-gray-900 mb-4">MBA Colleges in Pune — Complete Guide 2026</h2>
            <p className="text-gray-700 leading-relaxed">
              Pune is India&apos;s third-largest MBA education hub after Mumbai and Bangalore, with over 120 AICTE-approved MBA colleges. The city offers the widest range of MBA options — from the prestigious SIBM Pune (NIRF #14) to the ultra-affordable PUMBA (government, ₹1.25L/yr) and a full spectrum of private and deemed university programs in between.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              The primary admission route for most Pune MBA colleges is through <strong>MAH-CET MBA</strong> (Maharashtra Common Entrance Test for MBA), conducted by the Maharashtra State CET Cell. DTE Maharashtra then runs the Centralized Admission Process (CAP) for seat allotment across state-level and institutional quota seats. Symbiosis group colleges (SIBM, SCMHRD, SIIB) require the <strong>SNAP exam</strong> specifically.
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">Types of MBA Colleges in Pune</h3>
            <ul className="text-gray-700 space-y-1">
              <li><strong>Government:</strong> PUMBA (₹1.25L/yr) — lowest fees, highest CAP cutoff (95+ percentile)</li>
              <li><strong>Deemed Universities:</strong> Symbiosis (SIBM, SCMHRD, SIIB), MIT-WPU, DYPIM — independent admission, accept SNAP/CAT/CMAT</li>
              <li><strong>Autonomous Private:</strong> IIMP, Indira MBA, MAEER — accept MAH-CET, CAT, CMAT; moderate fees ₹4–9L</li>
              <li><strong>SPPU Affiliated:</strong> 70+ colleges affiliated to Savitribai Phule Pune University — admission via CAP</li>
            </ul>
            <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">MBA Specializations in Pune</h3>
            <p className="text-gray-700">Pune MBA colleges offer specializations in Marketing, Finance, HR, Operations, Business Analytics, International Business, Supply Chain Management, Data Science, Entrepreneurship, and Healthcare Management. Finance and Analytics have the highest average placement packages (20–30% above average).</p>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — MBA in Pune</h2>
            <div className="space-y-3">
              {mbaFAQs.general.map(faq => (
                <details key={faq.question} className="group border border-gray-100 rounded-xl p-4">
                  <summary className="cursor-pointer font-semibold text-gray-800 text-sm flex justify-between items-center">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2">▾</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related Pages */}
          <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Related MBA Pages</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                { label: "Best MBA Colleges Pune", href: "/best-mba-colleges-pune" },
                { label: "MBA Placements Pune", href: "/mba-colleges-pune-placement" },
                { label: "Low Fees MBA Pune", href: "/low-fees-mba-colleges-pune" },
                { label: "MBA Direct Admission", href: "/direct-admission-mba-colleges-pune" },
                { label: "MBA Scholarship Pune", href: "/mba-colleges-pune-scholarship" },
                { label: "MBA Without CAT Pune", href: "/mba-admission-pune-without-cat" },
                { label: "PGDM Colleges Pune", href: "/pgdm-colleges-pune" },
                { label: "Compare MBA Colleges", href: "/compare" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">{l.label}</Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Get Free MBA Admission Guidance</h2>
            <p className="text-gray-300 mb-6 text-sm max-w-lg mx-auto">Our Pune-based counsellors will help you shortlist MBA colleges based on your MAH-CET score, budget, and career goals — free, no sales pressure.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Free Counselling →</Link>
              <Link href="/predictor" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors">College Predictor</Link>
            </div>
          </section>

        </main>
      </div>
    </>
  )
}
