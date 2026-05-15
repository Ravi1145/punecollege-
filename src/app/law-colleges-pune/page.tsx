import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { Award, BookOpen, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = genMeta({
  title: "Best Law Colleges in Pune 2026 | LLB, LLM Fees, CLAT Cutoff & Placements",
  description: "Top law colleges in Pune 2026 — ILS Law College, Symbiosis Law School, MNLU Pune, BVDU Law College. Compare LLB fees (₹20K–₹2.5L/yr), CLAT cutoffs, placement packages & admission process.",
  path: "/law-colleges-pune",
  keywords: [
    "law colleges in pune 2026",
    "best law college pune",
    "llb colleges pune fees",
    "clat cutoff pune 2026",
    "symbiosis law school pune",
    "ils law college pune",
    "mnlu pune admission 2026",
    "bvdu law college pune",
    "ba llb colleges pune",
    "nlat mh-cet law pune",
  ],
})

const colleges = [
  { rank: 1, name: "ILS Law College Pune", type: "Government-aided", naac: "A", fees: "₹20K–₹40K/yr", program: "BA LLB (5yr), LLM", seats: 180, clat: "Merit based", slug: "ils-law-college-pune", highlight: "Oldest & Most Prestigious | 1924 Est." },
  { rank: 2, name: "Symbiosis Law School (SLS), Pune", type: "Deemed", naac: "A+", fees: "₹1.8L–₹2.5L/yr", program: "BA LLB, BBA LLB, LLM", seats: 200, clat: "SLAT score", slug: "sls-symbiosis-law-school-pune", highlight: "Top 5 Law School India | Best Placements" },
  { rank: 3, name: "Maharashtra National Law University (MNLU), Pune", type: "Government (NLU)", naac: "–", fees: "₹2L–₹2.5L/yr", program: "BA LLB (5yr)", seats: 120, clat: "CLAT top 2000", slug: "mnlu-maharashtra-national-law-university-pune", highlight: "NLU Status | CLAT admission | Premium" },
  { rank: 4, name: "Bharati Vidyapeeth Law College", type: "Private", naac: "A", fees: "₹60K–₹90K/yr", program: "BA LLB, LLB (3yr)", seats: 120, clat: "MH-CET Law", slug: "bharati-vidyapeeth-law-college-pune", highlight: "Affordable Private | Good faculty" },
  { rank: 5, name: "New Law College, Pune (BMCC Road)", type: "Government-aided", naac: "B+", fees: "₹15K–₹25K/yr", program: "LLB (3yr)", seats: 360, clat: "MH-CET Law", slug: "new-law-college-pune", highlight: "Cheapest Law Degree | Large intake" },
  { rank: 6, name: "Modern Law College, Pune (Shivajinagar)", type: "Private", naac: "B+", fees: "₹30K–₹50K/yr", program: "BA LLB, LLB (3yr)", seats: 180, clat: "MH-CET Law", slug: "modern-law-college-pune", highlight: "Central location | SPPU affiliated" },
]

const faqs = [
  { question: "Which is the best law college in Pune 2026?", answer: "ILS Law College is the most prestigious government-aided law college in Pune (est. 1924) with the lowest fees (₹20–40K/yr). Symbiosis Law School (SLS) is the best private option with top 5 national ranking and excellent placements in law firms and corporate legal departments. MNLU Pune is the NLU (National Law University) for Maharashtra with CLAT-based admission." },
  { question: "What is the fee for law colleges in Pune?", answer: "Law college fees in Pune range widely: Government-aided colleges like ILS (₹20–40K/yr) and New Law College (₹15–25K/yr) are the most affordable. Private colleges charge ₹60K–₹90K/yr. Deemed universities like Symbiosis Law School charge ₹1.8–2.5 lakh/year. Total 5-year BA LLB course costs ₹1 lakh (govt) to ₹12.5 lakh (private)." },
  { question: "Is CLAT required for law colleges in Pune?", answer: "CLAT (Common Law Admission Test) is required only for MNLU Pune (NLU status). Most other law colleges in Pune use MH-CET Law (Maharashtra common entrance test for law) for BA LLB and LLB admissions. Symbiosis Law School uses its own SLAT (Symbiosis Law Admission Test). Top scorers in Class 12 can apply directly to ILS Law College." },
  { question: "What are career opportunities after law from Pune colleges?", answer: "Law graduates from Pune colleges pursue careers as advocates in High Court / District Courts, corporate lawyers in MNCs, legal officers in banks & government departments, judicial services (MPSC/UPSC), and in law firms. SLS graduates command ₹6–15 LPA in top law firms. MNLU Pune graduates frequently join Delhi NCR law firms and LLM programs abroad." },
  { question: "Which law college in Pune has the best placements?", answer: "Symbiosis Law School (SLS) has the best placements among Pune law colleges with an average package of ₹6–8 LPA and top offers up to ₹18 LPA from firms like AZB & Partners, Trilegal, Khaitan & Co, and corporate legal departments of Infosys, TCS, and Wipro. MNLU Pune also has strong placement in government and top law firms." },
]

const breadcrumb = [
  { name: "Home", url: "https://collegepune.com" },
  { name: "Colleges", url: "https://collegepune.com/colleges" },
  { name: "Law Colleges Pune", url: "https://collegepune.com/law-colleges-pune" },
]

export const revalidate = 86400

export default function LawCollegesPune() {
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
            <span className="text-white">Law Colleges Pune</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Best Law Colleges in Pune 2026</h1>
          <p className="text-blue-200 max-w-2xl mx-auto text-base mb-6">
            Compare top LLB & BA LLB colleges in Pune — fees from ₹15K to ₹2.5L/year, CLAT & MH-CET Law cutoffs, and career placement data.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { icon: BookOpen, text: "6 Top Law Colleges" },
              { icon: TrendingUp, text: "Up to ₹18 LPA" },
              { icon: Award, text: "NLU + NAAC Ranked" },
              { icon: Users, text: "BA LLB / LLB / LLM" },
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
            <p className="text-sm font-bold text-orange-700 mb-1">⚡ Quick Answer — Top Law Colleges Pune 2026</p>
            <p className="text-sm text-gray-700">
              <strong>Most prestigious:</strong> ILS Law College · <strong>Best private:</strong> Symbiosis Law School (SLS) · <strong>NLU option:</strong> MNLU Pune ·{" "}
              <strong>Cheapest:</strong> New Law College (₹15K/yr) · <strong>Best placement:</strong> SLS (₹18 LPA top offer)
            </p>
          </div>

          {/* College table */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Law Colleges in Pune — Ranked 2026</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#0A1628" }}>
                  {["Rank", "College", "Type", "NAAC", "Fees/yr", "Program", "Seats", "Highlight"].map(h => (
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
                    <td className="px-4 py-3 font-medium text-gray-800">{c.fees}</td>
                    <td className="px-4 py-3 text-gray-600">{c.program}</td>
                    <td className="px-4 py-3 text-gray-600">{c.seats}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{c.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-6 text-center mb-10" style={{ background: "linear-gradient(135deg,#0A1628,#1E3A5F)" }}>
            <p className="text-white font-bold text-lg mb-2">Need help choosing the right law college?</p>
            <p className="text-blue-200 text-sm mb-4">Our expert counsellors help you pick between ILS, SLS, MNLU and more based on your budget, CLAT score & career goals.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ai-finder" className="inline-flex items-center justify-center gap-2 font-bold text-white px-6 py-3 rounded-xl text-sm hover:opacity-90 transition-all" style={{ background: "linear-gradient(90deg,var(--color-accent),color-mix(in srgb, var(--color-accent) 70%, #FFD000))" }}>
                AI College Finder
              </Link>
              <Link href="/counselling" className="inline-flex items-center justify-center gap-2 font-semibold text-white px-6 py-3 rounded-xl text-sm border border-white/30 hover:bg-white/10 transition-all">
                Free Counselling
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — Law Colleges Pune</h2>
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
              { label: "Design Colleges Pune", href: "/design-colleges-pune" },
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
