import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { Award, BookOpen, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = genMeta({
  title: "Best BBA Colleges Pune 2026 | Fees, Cutoff & Placement",
  description: "Top BBA colleges in Pune 2026 — Symbiosis, MIT-WPU, Indira, Fergusson. Fees ₹40K–₹2.5L/yr, SET/HSC cutoffs, average placement ₹3.5–8 LPA and complete admission guide.",
  path: "/bba-colleges-pune",
  keywords: [
    "bba colleges in pune 2026",
    "best bba college pune",
    "bba fees pune 2026",
    "bba admission pune",
    "symbiosis bba pune",
    "mit wpu bba pune",
    "fergusson college bba pune",
    "bba placement pune",
    "bba vs bcom pune",
    "bachelor of business administration pune",
    "bba colleges pune 2026",
  ],
})
export const revalidate = 300

const colleges = [
  {
    rank: 1,
    name: "Symbiosis College of Arts & Commerce (BBA)",
    type: "Deemed",
    naac: "A",
    fees: "₹1.4L–₹2L/yr",
    placement: "₹5–8 LPA",
    seats: 180,
    cutoff: "SET 2026 + Merit",
    highlight: "Top BBA Brand | SNAP-linked Pathway to MBA | Global Exposure",
    slug: "symbiosis-college-of-arts-commerce-pune",
  },
  {
    rank: 2,
    name: "MIT-WPU School of Management (BBA)",
    type: "Deemed University",
    naac: "A+",
    fees: "₹1.8L–₹2.5L/yr",
    placement: "₹5–8 LPA",
    seats: 120,
    cutoff: "HSC 60%+ / Entrance",
    highlight: "MIT Brand | Industry Mentors | Strong Placement Cell",
    slug: "mit-wpu-mit-world-peace-university",
  },
  {
    rank: 3,
    name: "Indira College of Commerce & Science (BBA)",
    type: "Private (Autonomous)",
    naac: "A",
    fees: "₹60K–₹90K/yr",
    placement: "₹3.5–6 LPA",
    seats: 120,
    cutoff: "HSC 55%+",
    highlight: "Affordable | Autonomous | Good Faculty",
    slug: "indira-college-of-engineering-management-pune",
  },
  {
    rank: 4,
    name: "Fergusson College (BBA)",
    type: "Autonomous",
    naac: "A++",
    fees: "₹40K–₹60K/yr",
    placement: "₹3–5.5 LPA",
    seats: 60,
    cutoff: "HSC 70%+",
    highlight: "NAAC A++ | Heritage College | Best Value BBA",
    slug: "government-college-of-engineering-pune",
  },
  {
    rank: 5,
    name: "MAEER's MIT College of Commerce (BBA)",
    type: "Private",
    naac: "A",
    fees: "₹70K–₹1L/yr",
    placement: "₹3–5 LPA",
    seats: 120,
    cutoff: "HSC 55%+",
    highlight: "MIT Group | Internship Support | Industry Tie-ups",
    slug: "mit-wpu-mit-world-peace-university",
  },
  {
    rank: 6,
    name: "ISBM College of Commerce & Science (BBA)",
    type: "Private",
    naac: "B+",
    fees: "₹55K–₹80K/yr",
    placement: "₹3–4.5 LPA",
    seats: 60,
    cutoff: "HSC 50%+",
    highlight: "Budget Option | Practical Training | Good Campus",
    slug: "government-college-of-engineering-pune",
  },
]

const faqs = [
  {
    question: "What is the eligibility for BBA in Pune 2026?",
    answer: "BBA eligibility in Pune 2026: 10+2 (any stream) with minimum 45–60% marks depending on college. Symbiosis requires SET 2026 entrance test. MIT-WPU requires entrance + PI. Government-affiliated colleges: Merit based on HSC 12th marks. No specific stream restriction — Science, Commerce, or Arts students can apply for BBA.",
  },
  {
    question: "What is the average salary after BBA from Pune?",
    answer: "Average salary after BBA from top Pune colleges: Symbiosis BBA ₹5–8 LPA, MIT-WPU BBA ₹5–8 LPA, Indira College BBA ₹3.5–6 LPA, Fergusson College BBA ₹3–5.5 LPA. Top recruiters: HDFC Bank, ICICI Bank, Deloitte, KPMG, Infosys BPO, and marketing firms. Many students pursue MBA after BBA for ₹15–25 LPA packages.",
  },
  {
    question: "Is BBA better than BCom in Pune?",
    answer: "BBA vs BCom in Pune: BBA focuses on management, entrepreneurship, and business skills — better for MBA pathway and corporate roles. BCom focuses on accounting, finance, and taxation — better for CA, banking, and finance careers. BBA fees are higher (₹40K–2.5L/yr vs BCom ₹15K–50K/yr). For MBA aspirants: BBA is the better foundation. For CA/CPA: BCom is preferred.",
  },
  {
    question: "What entrance exam is required for BBA in Pune?",
    answer: "BBA entrance exams for Pune 2026: Symbiosis (SET 2026 — May), MIT-WPU (own entrance), MAEER MIT (HSC merit), Indira College (HSC merit). SET (Symbiosis Entrance Test) is the most important — register at set-test.com before March 2026. Government-affiliated colleges use FYJC-linked merit lists.",
  },
  {
    question: "What are the scope and career options after BBA Pune?",
    answer: "Career options after BBA from Pune: MBA/PGDM (most popular — SIBM, IMT), Banking & Finance (₹4–8 LPA), Marketing Executive (₹3.5–6 LPA), HR Executive (₹3–5 LPA), Entrepreneurship, Sales Management. BBA from Symbiosis gives SNAP pathway to SIBM, SCMHRD for ₹18–28 LPA MBA placements.",
  },
]

export default function BBACollegesPunePage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BBA Colleges Pune", url: "/bba-colleges-pune" },
  ])
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-blue-300 mb-4 flex gap-1 items-center">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <span className="text-white">BBA Colleges Pune</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Best BBA Colleges in Pune 2026
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mb-6">
              Top Bachelor of Business Administration colleges in Pune with fees, SET/HSC cutoffs, placement data, and complete admission guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: "💼", label: "6 Top BBA Colleges" },
                { icon: "📝", label: "SET / HSC Cutoff" },
                { icon: "💰", label: "Fees ₹40K–₹2.5L/yr" },
                { icon: "📈", label: "Placement ₹3.5–8 LPA" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-white text-sm">
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colleges Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Top BBA Colleges in Pune 2026</h2>
          <div className="space-y-4">
            {colleges.map((c) => (
              <div key={c.rank} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <span className="font-extrabold text-orange-600 text-sm">#{c.rank}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Link href={`/colleges/${c.slug}`} className="font-bold text-gray-900 hover:text-orange-600 transition-colors text-base">
                        {c.name}
                      </Link>
                      <span className="text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{c.type}</span>
                      <span className="text-[11px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">NAAC {c.naac}</span>
                    </div>
                    <p className="text-xs text-orange-600 font-semibold mb-2">{c.highlight}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-600">
                      <div><span className="font-semibold">Fees:</span> {c.fees}</div>
                      <div><span className="font-semibold">Placement:</span> {c.placement}</div>
                      <div><span className="font-semibold">Seats:</span> {c.seats}</div>
                      <div><span className="font-semibold">Cutoff:</span> {c.cutoff}</div>
                    </div>
                  </div>
                  <Link href={`/colleges/${c.slug}`}
                    className="shrink-0 text-xs font-semibold text-orange-600 hover:text-orange-700 border border-orange-200 hover:border-orange-400 px-3 py-1.5 rounded-lg transition-colors">
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Info Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, title: "3-Year Programme", desc: "BBA is a 3-year undergraduate degree. Choose specializations in Marketing, Finance, HR, or International Business." },
              { icon: Award, title: "SET for Symbiosis", desc: "SET 2026 required for Symbiosis BBA. Register at set-test.com before March 2026." },
              { icon: TrendingUp, title: "MBA Gateway", desc: "BBA from Symbiosis gives SNAP eligibility for SIBM — India's top MBA with ₹28 LPA average placement." },
              { icon: Users, title: "Any Stream Eligible", desc: "Science, Commerce, or Arts students from 10+2 can apply for BBA. No specific stream restriction." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-10">
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">Frequently Asked Questions — BBA in Pune</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 group">
                  <summary className="font-semibold text-gray-900 text-sm cursor-pointer list-none flex items-center justify-between gap-2">
                    {faq.question}
                    <span className="text-orange-500 text-lg group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Related Guides */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related BBA & Commerce Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
              { label: "Arts & Science Colleges in Pune", href: "/arts-colleges-pune", icon: "📚" },
              { label: "Commerce Colleges in Pune", href: "/commerce-colleges-pune", icon: "📊" },
              { label: "Science Colleges in Pune", href: "/science-colleges-pune", icon: "🔬" },
              { label: "BCA Colleges in Pune", href: "/bca-colleges-pune", icon: "💻" },
              { label: "BSc IT Colleges in Pune", href: "/bsc-it-colleges-pune", icon: "🖥️" },
              { label: "Law Colleges in Pune", href: "/law-colleges-pune", icon: "⚖️" },
              { label: "Design Colleges in Pune", href: "/design-colleges-pune", icon: "🎨" },
              ].map(({ label, href, icon }) => (
                <Link key={href} href={href} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3 hover:border-orange-200 hover:shadow transition-all group">
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-6 text-center">
            <h2 className="text-xl font-extrabold text-white mb-2">Need Help Choosing a BBA College in Pune?</h2>
            <p className="text-gray-300 text-sm mb-4">Our counselors help you pick the right BBA college, prepare for SET, and plan your MBA pathway.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
                Book Free Counselling
              </Link>
              <Link href="/mba-colleges-pune" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors border border-white/20">
                View MBA Colleges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
