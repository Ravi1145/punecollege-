import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { Award, BookOpen, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = genMeta({
  title: "Best BCA Colleges in Pune 2026 | Fees, MHT-CET Cutoff & IT Placements",
  description: "Top BCA (Bachelor of Computer Applications) colleges in Pune 2026. Compare Symbiosis, MIT, Fergusson, Indira and more. Fees ₹30K–₹2L/yr, MHT-CET cutoffs, placement packages up to ₹12 LPA & admission process.",
  path: "/bca-colleges-pune",
  keywords: [
    "bca colleges in pune 2026",
    "best bca college pune",
    "bca fees pune 2026",
    "bca admission pune",
    "symbiosis bca pune",
    "mit bca pune",
    "fergusson college bca pune",
    "bca it colleges pune",
    "bca placement pune",
    "bsc computer science pune",
    "bsc it colleges pune",
    "bca vs bsc cs pune",
    "computer application colleges pune 2026",
  ],
})

const colleges = [
  {
    rank: 1,
    name: "Symbiosis College of Arts & Commerce",
    type: "Deemed",
    naac: "A",
    fees: "₹1.2L–₹1.8L/yr",
    placement: "₹8–12 LPA",
    seats: 120,
    cutoff: "Merit + Entrance",
    highlight: "Best BCA Brand | Tech-forward curriculum | MNCs",
    slug: "symbiosis-college-of-arts-commerce-pune",
  },
  {
    rank: 2,
    name: "MIT Arts, Commerce & Science College",
    type: "Private (Autonomous)",
    naac: "A+",
    fees: "₹80K–₹1.2L/yr",
    placement: "₹6–10 LPA",
    seats: 120,
    cutoff: "HSC 60%+",
    highlight: "MIT Brand | Modern Labs | Strong Placements",
    slug: "mit-arts-commerce-science-college-pune",
  },
  {
    rank: 3,
    name: "Fergusson College (Autonomous)",
    type: "Govt-aided (Autonomous)",
    naac: "A+",
    fees: "₹30K–₹50K/yr",
    placement: "₹4–7 LPA",
    seats: 60,
    cutoff: "HSC 65%+",
    highlight: "Heritage + Tech | Most Affordable BCA",
    slug: "fergusson-college-pune",
  },
  {
    rank: 4,
    name: "Indira College of Commerce & Science",
    type: "Private",
    naac: "A",
    fees: "₹60K–₹90K/yr",
    placement: "₹5–8 LPA",
    seats: 120,
    cutoff: "HSC 55%+",
    highlight: "IT-focused BCA | Pune-Nashik Highway",
    slug: "indira-college-of-commerce-science-pune",
  },
  {
    rank: 5,
    name: "Sinhgad College of Arts, Commerce & Science",
    type: "Private",
    naac: "A",
    fees: "₹50K–₹75K/yr",
    placement: "₹4–7 LPA",
    seats: 120,
    cutoff: "HSC 55%+",
    highlight: "Sinhgad Group | Large BCA Batch",
    slug: "sinhgad-college-arts-commerce-science-pune",
  },
  {
    rank: 6,
    name: "DY Patil Arts, Commerce & Science College",
    type: "Private",
    naac: "A",
    fees: "₹55K–₹80K/yr",
    placement: "₹4–6 LPA",
    seats: 60,
    cutoff: "HSC 55%+",
    highlight: "DY Patil Group | Pimpri Campus",
    slug: "dy-patil-arts-commerce-college-pune",
  },
  {
    rank: 7,
    name: "BMCC — Brihan Maharashtra College of Commerce",
    type: "Govt-aided",
    naac: "A",
    fees: "₹20K–₹35K/yr",
    placement: "₹3–5 LPA",
    seats: 60,
    cutoff: "HSC 60%+",
    highlight: "Cheapest BCA Pune | BMCC Brand",
    slug: "bmcc-brihan-maharashtra-college-of-commerce-pune",
  },
]

const faqs = [
  {
    question: "Which is the best BCA college in Pune 2026?",
    answer: "Symbiosis College of Arts & Commerce offers the best BCA in Pune with placements at top IT companies (TCS, Infosys, Wipro, Cognizant) averaging ₹8–12 LPA. MIT Arts, Commerce & Science College is the best for the MIT brand with modern computer labs. Fergusson College is the most affordable option with NAAC A+ accreditation at just ₹30–50K/year.",
  },
  {
    question: "What is the fee for BCA in Pune?",
    answer: "BCA total 3-year fees in Pune: BMCC (₹60–1L total), Fergusson (₹90K–1.5L total), Sinhgad/DY Patil (₹1.5–2.25L total), Indira/MIT (₹1.8–3.6L total), Symbiosis (₹3.6–5.4L total). Fees depend heavily on whether it's a government-aided, private, or deemed university college.",
  },
  {
    question: "Is BCA better than BSc Computer Science in Pune?",
    answer: "BCA is more application-oriented (programming, software development, database management) while BSc CS has a stronger mathematical/theoretical foundation. For direct IT jobs, BCA grads are often preferred as they have more practical projects. For research/government jobs, BSc CS is better. Both allow MCA/MTech/MBA after graduation. Top IT recruiters accept both equally.",
  },
  {
    question: "What are the career opportunities after BCA from Pune?",
    answer: "BCA graduates from Pune colleges work as: Software Developers (₹4–8 LPA), Web Developers (₹4–7 LPA), Data Analysts (₹5–9 LPA), System Administrators (₹4–6 LPA), and IT Consultants (₹6–12 LPA). Top recruiters: TCS, Infosys, Wipro, Capgemini, Cognizant, Accenture. Many BCA graduates from Symbiosis and MIT also start their own tech startups. Pursuing MCA after BCA can push salaries to ₹10–20 LPA.",
  },
  {
    question: "What percentage is required for BCA admission in Pune?",
    answer: "BCA admission in Pune requires HSC (Class 12) in any stream with Mathematics as a subject. Minimum percentage: Government-aided colleges (60%+), Private colleges (50–55%+), Deemed colleges like Symbiosis (60%+ plus entrance/interview). MHT-CET is not mandatory for BCA — direct HSC merit is used. Some colleges also accept students with PCB (Biology) if they have HSC-level Mathematics.",
  },
]

const breadcrumb = [
  { name: "Home", url: "https://collegepune.com" },
  { name: "Colleges", url: "https://collegepune.com/colleges" },
  { name: "BCA Colleges Pune", url: "https://collegepune.com/bca-colleges-pune" },
]

export const revalidate = 86400

export default function BCACollegesPune() {
  return (
    <>
      <Script id="schema-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />
      <Script id="schema-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumb)) }} />

      <div className="min-h-screen bg-surface">
        {/* Hero */}
        <div className="py-14 px-4 text-center" style={{ background: "linear-gradient(135deg,#0A1628 0%,#1E3A5F 100%)" }}>
          <nav className="text-xs text-blue-300 mb-4 flex items-center justify-center gap-1">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/colleges" className="hover:text-white">Colleges</Link>
            <span>›</span>
            <span className="text-white">BCA Colleges Pune</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Best BCA Colleges in Pune 2026</h1>
          <p className="text-blue-200 max-w-2xl mx-auto text-base mb-6">
            Compare top BCA &amp; BSc Computer Science colleges in Pune — fees from ₹20K to ₹1.8L/year, IT placements up to ₹12 LPA, and admission without MHT-CET.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { icon: BookOpen, text: "7 BCA Colleges" },
              { icon: TrendingUp, text: "Up to ₹12 LPA" },
              { icon: Award, text: "NAAC A+ Colleges" },
              { icon: Users, text: "BCA · BSc CS · BCA IT" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-blue-200">
                <Icon className="w-4 h-4 text-orange-400" />
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-10">
          {/* Quick Answer */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-8">
            <p className="text-sm font-bold text-orange-700 mb-1">⚡ Quick Answer — BCA Colleges Pune 2026</p>
            <p className="text-sm text-gray-700">
              <strong>Best placement:</strong> Symbiosis (₹12 LPA) · <strong>Best brand:</strong> MIT Arts ·{" "}
              <strong>Cheapest:</strong> BMCC (₹20K/yr) · <strong>Best NAAC:</strong> Fergusson &amp; MIT (A+) ·{" "}
              <strong>No entrance needed:</strong> Most colleges (HSC merit)
            </p>
          </div>

          {/* Table */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">BCA Colleges in Pune — Ranked 2026</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#0A1628" }}>
                  {["Rank", "College", "Type", "NAAC", "Fees/yr", "Avg Placement", "Seats", "Cutoff"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-white font-semibold whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {colleges.map((c, i) => (
                  <tr key={c.slug} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-bold text-orange-600">#{c.rank}</td>
                    <td className="px-4 py-3">
                      <Link href={`/colleges/${c.slug}`} className="font-semibold text-blue-700 hover:text-orange-600 transition-colors">
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.type}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">{c.naac}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{c.fees}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.placement}</td>
                    <td className="px-4 py-3 text-gray-600">{c.seats}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{c.cutoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BCA vs BSc box */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h3 className="font-bold text-blue-900 mb-3">💻 BCA — Best For:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Direct entry into software development</li>
                <li>✓ Startup / freelancing path</li>
                <li>✓ TCS, Infosys, Wipro campus recruitment</li>
                <li>✓ MCA / MBA after graduation</li>
                <li>✓ App / web development focus</li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
              <h3 className="font-bold text-purple-900 mb-3">🔬 BSc CS — Best For:</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>✓ Data Science / AI / ML roles</li>
                <li>✓ Government / research jobs</li>
                <li>✓ MTech / MS abroad after graduation</li>
                <li>✓ GATE exam eligibility</li>
                <li>✓ Strong mathematics foundation</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-6 text-center mb-10" style={{ background: "linear-gradient(135deg,#0A1628,#1E3A5F)" }}>
            <p className="text-white font-bold text-lg mb-2">BCA, BSc CS or BTech — what&apos;s right for you?</p>
            <p className="text-blue-200 text-sm mb-4">Our AI Finder compares all 3 paths based on your Class 12 marks, budget &amp; career goal — in 60 seconds.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ai-finder" className="inline-flex items-center justify-center gap-2 font-bold text-white px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-all" style={{ background: "linear-gradient(90deg,var(--color-accent),color-mix(in srgb, var(--color-accent) 70%, #FFD000))" }}>
                Try AI College Finder
              </Link>
              <Link href="/counselling" className="inline-flex items-center justify-center gap-2 font-semibold text-white px-6 py-3 rounded-xl text-sm border border-white/30 hover:bg-white/10 transition-all">
                Free Counselling
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — BCA Colleges Pune</h2>
          <div className="space-y-4 mb-10">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Related */}
          <h2 className="text-lg font-bold text-gray-900 mb-4">Related Guides</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Engineering Colleges Pune", href: "/engineering-colleges-pune" },
              { label: "Arts & Science Colleges Pune", href: "/arts-colleges-pune" },
              { label: "MBA Colleges Pune", href: "/mba-colleges-pune" },
              { label: "Government Colleges Pune", href: "/government-colleges-pune" },
              { label: "All Colleges in Pune", href: "/colleges" },
              { label: "AI College Finder", href: "/ai-finder" },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm text-blue-600 hover:text-orange-600 bg-white border border-gray-100 rounded-lg px-4 py-3 text-center shadow-sm transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
