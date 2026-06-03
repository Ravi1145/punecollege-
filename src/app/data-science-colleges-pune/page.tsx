import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta } from "@/lib/seo"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Data Science Colleges in Pune 2026 | Fees, Courses & Admission",
  description: "Best Data Science colleges in Pune 2026 — COEP, VIT Pune, MIT-WPU, Symbiosis. Compare BSc Data Science, BTech AI/ML & MTech DS fees (₹80K–₹3.5L/yr), placements & MHT-CET cutoffs.",
  path: "/data-science-colleges-pune",
  keywords: [
    "data science colleges pune", "data science course pune 2026", "bsc data science pune",
    "btech data science pune", "mtech data science pune", "ai ml colleges pune",
    "artificial intelligence colleges pune 2026", "data science admission pune",
    "best data science college pune fees", "data science engineering colleges pune",
  ],
})

const colleges = [
  {
    name: "COEP Technological University",
    slug: "coep-college-of-engineering-pune",
    program: "BTech Computer Engineering (AI/DS electives)",
    fees: "₹80K–₹1.1L/yr",
    cutoff: "99.8 percentile (MHT-CET CSE)",
    placement: "₹12 LPA avg",
    highlight: "NIRF #49 — best value for AI/DS track",
  },
  {
    name: "MIT World Peace University (MIT-WPU)",
    slug: "mit-world-peace-university-pune",
    program: "BTech CSE (AI & Data Science) / BSc Data Science",
    fees: "₹2.2L–₹3.5L/yr",
    cutoff: "82–88 percentile (MHT-CET)",
    placement: "₹9 LPA avg",
    highlight: "Dedicated AI & Data Science BTech programme",
  },
  {
    name: "VIT Pune",
    slug: "vit-pune-vishwakarma-institute-of-technology",
    program: "BTech CS with Data Science specialisation",
    fees: "₹1.6L–₹2.2L/yr",
    cutoff: "88–92 percentile (MHT-CET)",
    placement: "₹8.5 LPA avg",
    highlight: "NIRF #101 — strong industry projects in DS",
  },
  {
    name: "Symbiosis Institute of Technology (SIT)",
    slug: "sit-pune-symbiosis-institute-of-technology",
    program: "BTech CSE (AI/ML) / MTech Data Science",
    fees: "₹3L–₹4.8L/yr",
    cutoff: "85–90 percentile (MHT-CET)",
    placement: "₹9.8 LPA avg",
    highlight: "Best for AI/ML research — Symbiosis brand",
  },
  {
    name: "Pune Institute of Computer Technology (PICT)",
    slug: "pict-pune-institute-of-computer-technology",
    program: "BTech CS / IT (strong DS curriculum)",
    fees: "₹1.4L–₹1.9L/yr",
    cutoff: "92–94 percentile (MHT-CET)",
    placement: "₹7.5 LPA avg",
    highlight: "Best CS-focused college with strong data analytics placements",
  },
  {
    name: "IIIT Pune",
    slug: "colleges",
    program: "BTech CSE (AI/Data Science focus)",
    fees: "₹1.5L–₹2L/yr",
    cutoff: "95–98 percentile (MHT-CET / JEE)",
    placement: "₹14 LPA avg",
    highlight: "Government IIIT — best AI/ML curriculum in Pune",
  },
]

const faqs = [
  { q: "Which is the best college for Data Science in Pune in 2026?", a: "IIIT Pune and COEP are the best for Data Science in Pune — both government colleges with strong AI/ML curriculum and placements of ₹12–14 LPA. For private colleges, MIT-WPU's dedicated BTech AI & Data Science programme and SIT Pune's MTech Data Science are excellent options." },
  { q: "What is the fee for a Data Science course in Pune?", a: "Data Science course fees in Pune range from ₹80,000/year (COEP government) to ₹4.8L/year (SIT Pune deemed university). BSc Data Science programmes range from ₹40,000–₹1.5L/year. MCA/MTech Data Science: ₹1.5L–₹3L/year total." },
  { q: "What MHT-CET score is needed for Data Science colleges in Pune?", a: "IIIT Pune needs 95+ percentile, PICT 92+, VIT Pune 88+, MIT-WPU 82+. For COEP's Computer Engineering (which includes AI/DS electives), you need 99.8 percentile. Private colleges below 80 percentile like DY Patil and Indira College also offer data science programmes." },
  { q: "What are the job prospects after Data Science from Pune colleges?", a: "Data Science graduates from Pune colleges join companies like TCS, Infosys, Persistent, Zensar, and startups in Hinjewadi IT Park. Average salaries range from ₹6–15 LPA. Top performers from COEP and IIIT get ₹25–40 LPA from product companies like Google, Amazon, and Goldman Sachs." },
  { q: "Is there a BSc Data Science college in Pune?", a: "Yes — MIT-WPU, Symbiosis College of Arts and Commerce (SCAC), Fergusson College, and Pune University department offer BSc Data Science / Statistics programmes. Fees range from ₹40,000–₹1.5L/year. Duration: 3 years (UG) or 2 years (PG specialisation)." },
]

export default function DataScienceCollegesPune() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-[#0A1628] to-purple-900 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4 flex gap-1 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/engineering-colleges-pune" className="hover:text-white">Engineering Colleges</Link>
            <span>/</span>
            <span className="text-white">Data Science Colleges Pune</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Data Science Colleges in Pune 2026</h1>
          <p className="text-blue-100 text-lg max-w-3xl">
            Complete guide to BSc, BTech, and MTech Data Science &amp; AI/ML programmes in Pune for 2026 admissions. Compare fees, MHT-CET cutoffs, placements, and curriculum depth.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="bg-white/10 px-3 py-1 rounded-full">6 colleges listed</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">Updated June 2026</span>
            <span className="bg-white/10 px-3 py-1 rounded-full">MHT-CET 2026 Cutoffs</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Colleges", value: "6+" },
            { label: "Min Fees/yr", value: "₹80K" },
            { label: "Avg Placement", value: "₹9 LPA" },
            { label: "Top Package", value: "₹40 LPA" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-purple-700">{s.value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* College cards */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Best Data Science Colleges in Pune 2026</h2>
          <div className="space-y-4">
            {colleges.map((c, i) => (
              <div key={c.name} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                      <Link href={`/colleges/${c.slug}`} className="hover:text-purple-700 transition-colors">
                        {c.name}
                      </Link>
                    </h3>
                    <p className="text-purple-700 text-sm font-medium mt-0.5">{c.program}</p>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div><span className="text-gray-400 text-xs block">Fees/year</span><strong className="text-gray-800">{c.fees}</strong></div>
                      <div><span className="text-gray-400 text-xs block">MHT-CET Cutoff</span><strong className="text-gray-800">{c.cutoff}</strong></div>
                      <div><span className="text-gray-400 text-xs block">Avg Placement</span><strong className="text-gray-800">{c.placement}</strong></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1.5">{c.highlight}</p>
                  </div>
                  <Link href={`/colleges/${c.slug}`} className="hidden md:block shrink-0 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">FAQs — Data Science Colleges in Pune</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }) => (
              <details key={q} className="border border-gray-100 rounded-xl p-4">
                <summary className="font-semibold text-gray-800 cursor-pointer">{q}</summary>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Related Pages</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Computer Engineering Colleges Pune", href: "/computer-engineering-colleges-pune" },
              { label: "Engineering Colleges Pune", href: "/engineering-colleges-pune" },
              { label: "VIT Pune vs MIT-WPU", href: "/vit-pune-vs-mit-wpu" },
              { label: "COEP vs PICT Pune", href: "/coep-vs-pict-pune" },
              { label: "AI College Finder", href: "/ai-finder" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full border border-purple-200 text-purple-700 text-sm hover:bg-purple-50 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
