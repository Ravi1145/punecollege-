import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { colleges } from "@/data/colleges"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"

// All pre-defined comparison pairs for static generation + sitemap
export const COMPARISON_PAIRS = [
  ["coep-college-of-engineering-pune", "pict-pune-institute-of-computer-technology"],
  ["coep-college-of-engineering-pune", "vit-pune-vishwakarma-institute-of-technology"],
  ["coep-college-of-engineering-pune", "mit-wpu-mit-world-peace-university"],
  ["coep-college-of-engineering-pune", "pccoe-pimpri-chinchwad-college-of-engineering"],
  ["pict-pune-institute-of-computer-technology", "vit-pune-vishwakarma-institute-of-technology"],
  ["pict-pune-institute-of-computer-technology", "mit-wpu-mit-world-peace-university"],
  ["mit-wpu-mit-world-peace-university", "pccoe-pimpri-chinchwad-college-of-engineering"],
  ["mit-wpu-mit-world-peace-university", "symbiosis-institute-of-business-management-sibm"],
  ["vit-pune-vishwakarma-institute-of-technology", "pccoe-pimpri-chinchwad-college-of-engineering"],
  ["symbiosis-institute-of-business-management-sibm", "mit-wpu-mit-world-peace-university"],
  ["dy-patil-university-pune", "mit-wpu-mit-world-peace-university"],
  ["flame-university-pune", "symbiosis-institute-of-business-management-sibm"],
  ["symbiosis-institute-of-technology-pune", "mit-wpu-mit-world-peace-university"],
  ["aissms-college-of-engineering-pune", "pccoe-pimpri-chinchwad-college-of-engineering"],
]

export function generateStaticParams() {
  return COMPARISON_PAIRS.map(([a, b]) => ({ slug: `${a}-vs-${b}` }))
}

function parseSlug(slug: string): [string, string] | null {
  // Try longest match: find "-vs-" separator
  const parts = slug.split("-vs-")
  if (parts.length < 2) return null
  // Try each split point to find valid college slugs
  for (let i = 1; i < parts.length; i++) {
    const a = parts.slice(0, i).join("-vs-")
    const b = parts.slice(i).join("-vs-")
    const colA = colleges.find(c => c.slug === a)
    const colB = colleges.find(c => c.slug === b)
    if (colA && colB) return [a, b]
  }
  return null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const parsed = parseSlug(slug)
  if (!parsed) return {}
  const [slugA, slugB] = parsed
  const colA = colleges.find(c => c.slug === slugA)!
  const colB = colleges.find(c => c.slug === slugB)!
  return genMeta({
    title: `${colA.shortName} vs ${colB.shortName} Pune 2026 | Fees, Placement & Cutoff Comparison`,
    description: `${colA.name} vs ${colB.name} — side-by-side comparison of fees (${colA.shortName}: ₹${(colA.feesRange.min/100000).toFixed(1)}L vs ${colB.shortName}: ₹${(colB.feesRange.min/100000).toFixed(1)}L), placements, NAAC, cutoff & admission 2026.`,
    path: `/compare/${slug}`,
    keywords: [
      `${colA.shortName} vs ${colB.shortName}`,
      `${colA.name} vs ${colB.name}`,
      `${colA.shortName} vs ${colB.shortName} pune`,
      `${colA.shortName} or ${colB.shortName} which is better`,
      `${colA.shortName} vs ${colB.shortName} fees`,
      `${colA.shortName} vs ${colB.shortName} placement`,
    ],
  })
}

export const revalidate = 3600

export default async function CompareSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const parsed = parseSlug(slug)
  if (!parsed) notFound()

  const [slugA, slugB] = parsed
  const colA = colleges.find(c => c.slug === slugA)!
  const colB = colleges.find(c => c.slug === slugB)!

  const faqs = [
    { question: `Which is better: ${colA.shortName} or ${colB.shortName}?`, answer: `${colA.shortName} is known for ${colA.tags?.[0] ?? 'quality education'} with an average placement of ₹${(colA.avgPlacement/100000).toFixed(1)} LPA. ${colB.shortName} offers ${colB.tags?.[0] ?? 'quality education'} with ₹${(colB.avgPlacement/100000).toFixed(1)} LPA average. The better choice depends on your branch preference, budget, and career goals.` },
    { question: `What are the fees at ${colA.shortName} vs ${colB.shortName}?`, answer: `${colA.name} fees range from ₹${(colA.feesRange.min/100000).toFixed(1)}L to ₹${(colA.feesRange.max/100000).toFixed(1)}L per year. ${colB.name} fees range from ₹${(colB.feesRange.min/100000).toFixed(1)}L to ₹${(colB.feesRange.max/100000).toFixed(1)}L per year.` },
    { question: `What is the placement record at ${colA.shortName} vs ${colB.shortName}?`, answer: `${colA.name} has an average placement package of ₹${(colA.avgPlacement/100000).toFixed(1)} LPA with highest at ₹${(colA.highestPlacement/100000).toFixed(1)} LPA. ${colB.name} offers ₹${(colB.avgPlacement/100000).toFixed(1)} LPA average with ₹${(colB.highestPlacement/100000).toFixed(1)} LPA highest package.` },
    { question: `Which entrance exam is required for ${colA.shortName} and ${colB.shortName}?`, answer: `${colA.name} accepts ${colA.entranceExams.join(", ")}. ${colB.name} accepts ${colB.entranceExams.join(", ")}.` },
    { question: `Does ${colA.shortName} or ${colB.shortName} have hostel?`, answer: `${colA.shortName} ${colA.hostel ? 'provides on-campus hostel facilities' : 'does not have on-campus hostel'}. ${colB.shortName} ${colB.hostel ? 'provides on-campus hostel facilities' : 'does not have on-campus hostel'}.` },
  ]

  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Compare", url: "/compare" },
    { name: `${colA.shortName} vs ${colB.shortName}`, url: `/compare/${slug}` },
  ])

  const compareSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${colA.name} vs ${colB.name} Comparison 2026`,
    description: `Detailed comparison of ${colA.name} and ${colB.name} including fees, placements, NAAC accreditation, cutoffs, courses offered, and campus facilities for 2026 admissions.`,
    url: `https://collegepune.com/compare/${slug}`,
    inLanguage: "en-IN",
    about: [
      { "@type": "CollegeOrUniversity", name: colA.name, url: `https://collegepune.com/colleges/${colA.slug}` },
      { "@type": "CollegeOrUniversity", name: colB.name, url: `https://collegepune.com/colleges/${colB.slug}` },
    ],
  }

  const metrics = [
    { label: "Type", a: colA.type, b: colB.type },
    { label: "Established", a: colA.established.toString(), b: colB.established.toString() },
    { label: "NAAC Grade", a: colA.naac ?? "N/A", b: colB.naac ?? "N/A" },
    { label: "NIRF Rank", a: colA.nirfRank ? `#${colA.nirfRank}` : "Unranked", b: colB.nirfRank ? `#${colB.nirfRank}` : "Unranked" },
    { label: "Location", a: colA.location, b: colB.location },
    { label: "Fees (Min/yr)", a: `₹${(colA.feesRange.min/100000).toFixed(1)} L`, b: `₹${(colB.feesRange.min/100000).toFixed(1)} L` },
    { label: "Fees (Max/yr)", a: `₹${(colA.feesRange.max/100000).toFixed(1)} L`, b: `₹${(colB.feesRange.max/100000).toFixed(1)} L` },
    { label: "Avg Placement", a: `₹${(colA.avgPlacement/100000).toFixed(1)} LPA`, b: `₹${(colB.avgPlacement/100000).toFixed(1)} LPA` },
    { label: "Highest Package", a: `₹${(colA.highestPlacement/100000).toFixed(1)} LPA`, b: `₹${(colB.highestPlacement/100000).toFixed(1)} LPA` },
    { label: "Hostel", a: colA.hostel ? "✓ Available" : "✗ No", b: colB.hostel ? "✓ Available" : "✗ No" },
    { label: "Entrance Exams", a: colA.entranceExams.join(", "), b: colB.entranceExams.join(", ") },
    { label: "Courses", a: colA.courses.join(", "), b: colB.courses.join(", ") },
  ]

  // Other comparisons to internally link
  const relatedComparisons = COMPARISON_PAIRS
    .filter(([a, b]) => (a === slugA || b === slugA || a === slugB || b === slugB) && `${a}-vs-${b}` !== slug)
    .slice(0, 6)
    .map(([a, b]) => {
      const cA = colleges.find(c => c.slug === a)
      const cB = colleges.find(c => c.slug === b)
      return cA && cB ? { label: `${cA.shortName} vs ${cB.shortName}`, href: `/compare/${a}-vs-${b}` } : null
    })
    .filter(Boolean)

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="compare-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(compareSchema) }} />

      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <Link href="/compare" className="hover:text-white">Compare</Link>
              <span>›</span>
              <span className="text-white">{colA.shortName} vs {colB.shortName}</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              {colA.name} vs {colB.name}
            </h1>
            <p className="text-gray-300 max-w-2xl">
              Detailed comparison for 2026 admissions — fees, placements, NAAC grade, cutoffs, campus & courses.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

          {/* Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[colA, colB].map((col) => (
              <div key={col.slug} className="bg-white rounded-xl shadow p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-blue-700">{col.shortName.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-lg leading-tight">{col.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">{col.location}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {col.naac && <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">NAAC {col.naac}</span>}
                      {col.nirfRank && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">NIRF #{col.nirfRank}</span>}
                      <span className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full">{col.type}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-gray-900">₹{(col.avgPlacement/100000).toFixed(1)} LPA</p>
                    <p className="text-xs text-gray-500">Avg Placement</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-gray-900">₹{(col.feesRange.min/100000).toFixed(1)}L</p>
                    <p className="text-xs text-gray-500">Min Fees/yr</p>
                  </div>
                </div>
                <Link href={`/colleges/${col.slug}`} className="mt-4 block w-full text-center text-sm text-blue-600 border border-blue-200 rounded-lg py-2 hover:bg-blue-50 transition-colors">
                  View Full Profile →
                </Link>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{colA.shortName} vs {colB.shortName} — Side-by-Side</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-6 py-3 text-gray-600 font-semibold w-1/3">Parameter</th>
                    <th className="text-left px-6 py-3 text-blue-700 font-semibold">{colA.shortName}</th>
                    <th className="text-left px-6 py-3 text-indigo-700 font-semibold">{colB.shortName}</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.map((m, i) => (
                    <tr key={m.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-6 py-3 font-medium text-gray-700">{m.label}</td>
                      <td className="px-6 py-3 text-gray-800">{m.a}</td>
                      <td className="px-6 py-3 text-gray-800">{m.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Placement Detail */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Placement Comparison 2024</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[colA, colB].map((col) => (
                <div key={col.slug}>
                  <h3 className="font-semibold text-gray-800 mb-3">{col.shortName} Placements</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Average Package</span>
                      <span className="font-semibold">₹{(col.avgPlacement/100000).toFixed(1)} LPA</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Highest Package</span>
                      <span className="font-semibold">₹{(col.highestPlacement/100000).toFixed(1)} LPA</span>
                    </div>
                    <div className="pt-1">
                      <p className="text-gray-600 mb-1.5">Top Recruiters:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {col.topRecruiters.slice(0, 6).map(r => (
                          <span key={r} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{r}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verdict */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Verdict: {colA.shortName} vs {colB.shortName}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Choose {colA.shortName} if…</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• You want {colA.type.toLowerCase()} college benefits</li>
                  <li>• Your budget is ₹{(colA.feesRange.min/100000).toFixed(1)}L–{(colA.feesRange.max/100000).toFixed(1)}L/yr</li>
                  <li>• You prefer {colA.location}</li>
                  {colA.nirfRank && colB.nirfRank && colA.nirfRank < colB.nirfRank && <li>• Better NIRF rank (#{colA.nirfRank})</li>}
                  {colA.avgPlacement > colB.avgPlacement && <li>• Higher average placement (₹{(colA.avgPlacement/100000).toFixed(1)} LPA)</li>}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-indigo-800 mb-2">Choose {colB.shortName} if…</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• You want {colB.type.toLowerCase()} college benefits</li>
                  <li>• Your budget is ₹{(colB.feesRange.min/100000).toFixed(1)}L–{(colB.feesRange.max/100000).toFixed(1)}L/yr</li>
                  <li>• You prefer {colB.location}</li>
                  {colA.nirfRank && colB.nirfRank && colB.nirfRank < colA.nirfRank && <li>• Better NIRF rank (#{colB.nirfRank})</li>}
                  {colB.avgPlacement > colA.avgPlacement && <li>• Higher average placement (₹{(colB.avgPlacement/100000).toFixed(1)} LPA)</li>}
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group">
                  <summary className="flex items-center justify-between cursor-pointer py-3 border-b border-gray-100 font-medium text-gray-800 text-sm">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="pt-2 pb-1 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Related Comparisons */}
          {relatedComparisons.length > 0 && (
            <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Related Comparisons</h2>
              <div className="flex flex-wrap gap-3">
                {relatedComparisons.map((c) => c && (
                  <Link key={c.href} href={c.href} className="text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors">
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Need Help Choosing Between {colA.shortName} and {colB.shortName}?</h2>
            <p className="text-gray-300 mb-6 text-sm">Talk to our free Pune college counsellor — get personalised guidance in 15 minutes.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Free Counselling
              </Link>
              <Link href="/compare" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Compare Other Colleges
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
