import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { Award, BookOpen, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = genMeta({
  title: "Best Arts & Science Colleges in Pune 2026 | BA, BSc, BCom Fees & Admission",
  description: "Top arts, science and commerce colleges in Pune 2026. Compare Fergusson College, SP College, BMCC, Symbiosis College and more. BA/BSc/BCom fees from ₹10K–₹1.5L/yr, NAAC grades, placements & admission process.",
  path: "/arts-colleges-pune",
  keywords: [
    "arts colleges in pune 2026",
    "science colleges in pune 2026",
    "commerce colleges in pune 2026",
    "ba colleges pune",
    "bsc colleges pune",
    "bcom colleges pune",
    "fergusson college pune 2026",
    "sp college pune admission",
    "bmcc pune bcom fees",
    "symbiosis college pune",
    "best arts college pune",
    "sppu affiliated arts colleges pune",
    "humanities colleges pune",
    "liberal arts pune 2026",
  ],
})

const colleges = [
  {
    rank: 1,
    name: "Fergusson College, Pune",
    type: "Government-aided (Autonomous)",
    naac: "A+",
    fees: "₹10K–₹30K/yr",
    programs: "BA, BSc, BCom, BCA",
    seats: 2400,
    highlight: "Est. 1885 | Most Prestigious | NAAC A+",
    slug: "fergusson-college-pune",
    strengths: ["Heritage campus", "Affordable fees", "Strong alumni", "150+ years"],
  },
  {
    rank: 2,
    name: "SP College (Sir Parashurambhau College)",
    type: "Government-aided (Autonomous)",
    naac: "A+",
    fees: "₹12K–₹28K/yr",
    programs: "BA, BSc, BCom",
    seats: 1800,
    highlight: "NAAC A+ | Strong Science dept",
    slug: "sp-college-pune-sir-parashurambhau-college",
    strengths: ["Best Science stream", "Research programs", "Central location", "Low fees"],
  },
  {
    rank: 3,
    name: "BMCC — Brihan Maharashtra College of Commerce",
    type: "Government-aided",
    naac: "A",
    fees: "₹8K–₹20K/yr",
    programs: "BCom, MCom, BBA",
    seats: 3000,
    highlight: "Best BCom College Pune | Lowest Fees",
    slug: "bmcc-brihan-maharashtra-college-of-commerce-pune",
    strengths: ["Commerce focus", "Cheapest BCom", "Good placements", "SPPU top rank"],
  },
  {
    rank: 4,
    name: "Symbiosis College of Arts & Commerce",
    type: "Private (Deemed)",
    naac: "A",
    fees: "₹40K–₹80K/yr",
    programs: "BA, BCom, BBA, BCA",
    seats: 1200,
    highlight: "Symbiosis Brand | Best Private Arts",
    slug: "symbiosis-college-of-arts-commerce-pune",
    strengths: ["Modern campus", "Industry interface", "International exposure", "Strong brand"],
  },
  {
    rank: 5,
    name: "Modern College of Arts, Science & Commerce",
    type: "Government-aided",
    naac: "A",
    fees: "₹10K–₹25K/yr",
    programs: "BA, BSc, BCom",
    seats: 2200,
    highlight: "Shivajinagar | Strong Faculty",
    slug: "modern-college-of-arts-science-commerce-pune",
    strengths: ["Central location", "Experienced faculty", "Research programs", "Affordable"],
  },
  {
    rank: 6,
    name: "Garware College of Commerce",
    type: "Government-aided",
    naac: "A",
    fees: "₹8K–₹18K/yr",
    programs: "BCom, MCom, BBA",
    seats: 1600,
    highlight: "Best for Commerce | Economics strength",
    slug: "garware-college-of-commerce-pune",
    strengths: ["Commerce specialization", "Affordable", "Good network", "Pune University top"],
  },
  {
    rank: 7,
    name: "Nowrosjee Wadia College",
    type: "Government-aided",
    naac: "A",
    fees: "₹10K–₹22K/yr",
    programs: "BA, BSc, BCom",
    seats: 1500,
    highlight: "Heritage | Strong in Arts & Languages",
    slug: "nowrosjee-wadia-college-pune",
    strengths: ["1832 est.", "Language programs", "Cultural events", "Historic campus"],
  },
  {
    rank: 8,
    name: "MES Abasaheb Garware College",
    type: "Government-aided",
    naac: "A",
    fees: "₹12K–₹24K/yr",
    programs: "BA, BSc, BCom",
    seats: 1400,
    highlight: "Karve Road | Good Science Labs",
    slug: "mes-abasaheb-garware-college-pune",
    strengths: ["Science labs", "Library resources", "Sports facilities", "Affordable"],
  },
  {
    rank: 9,
    name: "Poona College of Arts, Science & Commerce",
    type: "Government-aided",
    naac: "A",
    fees: "₹8K–₹16K/yr",
    programs: "BA, BSc, BCom",
    seats: 1800,
    highlight: "Camp Area | Affordable & Accessible",
    slug: "poona-college-of-arts-science-commerce-pune",
    strengths: ["Central location", "Camp area", "Diverse student body", "Low fees"],
  },
  {
    rank: 10,
    name: "Sinhgad College of Arts, Commerce & Science",
    type: "Private",
    naac: "A",
    fees: "₹20K–₹40K/yr",
    programs: "BA, BSc, BCom, BCA",
    seats: 1200,
    highlight: "Sinhgad Group | Modern Infrastructure",
    slug: "sinhgad-college-arts-commerce-science-pune",
    strengths: ["Modern labs", "IT facilities", "Sports complex", "Placement assistance"],
  },
]

const faqs = [
  {
    question: "Which is the best arts college in Pune 2026?",
    answer: "Fergusson College is the most prestigious arts college in Pune, established in 1885 with NAAC A+ grade and the lowest fees (₹10–30K/yr). SP College is best for BSc programs, BMCC is the top choice for BCom, and Symbiosis College of Arts & Commerce is the best private option with modern infrastructure and a Symbiosis brand advantage.",
  },
  {
    question: "What is the fee for arts and science colleges in Pune?",
    answer: "Arts and science college fees in Pune range from ₹8,000 to ₹80,000 per year. Government-aided autonomous colleges like Fergusson (₹10–30K), SP College (₹12–28K), and BMCC (₹8–20K/yr) are the most affordable. Private colleges like Symbiosis charge ₹40–80K/yr. Total 3-year BA/BSc/BCom costs ₹24,000 to ₹2.4 lakh.",
  },
  {
    question: "How to get admission in Fergusson College Pune 2026?",
    answer: "Fergusson College admissions are based on HSC (Class 12) merit through the Centralised Admission Process (CAP) by SPPU. You need 70%+ in HSC for Science, 60%+ for Commerce, and 55%+ for Arts. Apply online at the SPPU admission portal (admission.sppu.ac.in). Forms open in June 2026. There are no entrance tests — pure merit-based.",
  },
  {
    question: "Is BCom from BMCC Pune good for placements?",
    answer: "Yes, BCom from BMCC (Brihan Maharashtra College of Commerce) is well-respected in Pune's corporate and banking sector. BMCC graduates get placed in banks (HDFC, ICICI), accounting firms (Deloitte, EY), and companies like Infosys and TCS via campus recruitment. Average starting salary is ₹3–5 LPA. Many students pursue CA/CMA/MBA after BCom from BMCC.",
  },
  {
    question: "What career can I do after BA/BSc from Pune colleges?",
    answer: "After BA from Pune colleges, careers include civil services (UPSC/MPSC), MBA/MMS admissions, journalism, content writing, teaching (B.Ed), law (BA LLB), and government exams. After BSc, options include MSc/MTech, government research jobs, MBA, data science, and pharma. Most graduates earn ₹3–8 LPA in their first job, rising to ₹8–15 LPA within 5 years.",
  },
]

const breadcrumb = [
  { name: "Home", url: "https://collegepune.com" },
  { name: "Colleges", url: "https://collegepune.com/colleges" },
  { name: "Arts Colleges Pune", url: "https://collegepune.com/arts-colleges-pune" },
]

export const revalidate = 86400

export default function ArtsCollegesPune() {
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
            <span className="text-white">Arts Colleges Pune</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Best Arts &amp; Science Colleges in Pune 2026
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto text-base mb-6">
            Compare top BA, BSc &amp; BCom colleges in Pune — fees from ₹8K to ₹80K/year, NAAC grades, SPPU CAP admissions &amp; career outcomes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { icon: BookOpen, text: "10 Top Colleges" },
              { icon: TrendingUp, text: "Fees from ₹8K/yr" },
              { icon: Award, text: "NAAC A+ Ranked" },
              { icon: Users, text: "BA · BSc · BCom · BCA" },
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
            <p className="text-sm font-bold text-orange-700 mb-1">⚡ Quick Answer — Top Arts &amp; Science Colleges Pune 2026</p>
            <p className="text-sm text-gray-700">
              <strong>Best Arts:</strong> Fergusson College · <strong>Best Science:</strong> SP College ·{" "}
              <strong>Best Commerce (BCom):</strong> BMCC · <strong>Best Private:</strong> Symbiosis College ·{" "}
              <strong>Cheapest:</strong> BMCC &amp; Poona College (₹8K/yr)
            </p>
          </div>

          {/* Fee comparison cards */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Arts &amp; Science Colleges in Pune — Ranked 2026</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#0A1628" }}>
                  {["Rank", "College", "Type", "NAAC", "Fees/yr", "Programs", "Seats", "Highlight"].map(h => (
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
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.type}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">{c.naac}</span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{c.fees}</td>
                    <td className="px-4 py-3 text-gray-600">{c.programs}</td>
                    <td className="px-4 py-3 text-gray-600">{c.seats.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{c.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Program wise section */}
          <h2 className="text-xl font-bold text-gray-900 mb-5">Choose by Program — Best Colleges by Stream</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              {
                stream: "BA (Arts)", emoji: "📚", best: "Fergusson College", why: "Heritage, affordable, best humanities faculty in Pune",
                also: ["SP College", "Modern College", "Nowrosjee Wadia"],
                fees: "₹10K–₹30K/yr",
              },
              {
                stream: "BSc (Science)", emoji: "🔬", best: "SP College (Parashurambhau)", why: "NAAC A+, strong Physics/Chemistry/Biology labs",
                also: ["Fergusson College", "Modern College", "Garware College"],
                fees: "₹12K–₹28K/yr",
              },
              {
                stream: "BCom (Commerce)", emoji: "📊", best: "BMCC Pune", why: "Cheapest fees, best commerce network, CA/CMA prep",
                also: ["Garware College", "Poona College", "Symbiosis College"],
                fees: "₹8K–₹20K/yr",
              },
            ].map(({ stream, emoji, best, why, also, fees }) => (
              <div key={stream} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="text-2xl mb-2">{emoji}</div>
                <h3 className="font-bold text-gray-900 mb-1">{stream}</h3>
                <p className="text-xs text-orange-600 font-semibold mb-1">Best: {best}</p>
                <p className="text-xs text-gray-500 mb-3">{why}</p>
                <p className="text-xs text-gray-600 font-medium mb-1">Also consider:</p>
                <ul className="text-xs text-gray-500 space-y-0.5 mb-3">
                  {also.map(a => <li key={a}>• {a}</li>)}
                </ul>
                <p className="text-xs text-blue-700 font-semibold">Fees: {fees}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-6 text-center mb-10" style={{ background: "linear-gradient(135deg,#0A1628,#1E3A5F)" }}>
            <p className="text-white font-bold text-lg mb-2">Not sure which stream — Arts, Science or Commerce?</p>
            <p className="text-blue-200 text-sm mb-4">Our AI College Finder matches you to the best college based on your Class 12 marks, stream preference &amp; budget.</p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — Arts &amp; Science Colleges Pune</h2>
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
              { label: "MBA Colleges Pune", href: "/mba-colleges-pune" },
              { label: "Medical Colleges Pune", href: "/medical-colleges-pune" },
              { label: "Law Colleges Pune", href: "/law-colleges-pune" },
              { label: "BCA Colleges Pune", href: "/bca-colleges-pune" },
              { label: "Government Colleges Pune", href: "/government-colleges-pune" },
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
