import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { Award, BookOpen, TrendingUp, Users } from "lucide-react"

export const metadata: Metadata = genMeta({
  title: "Best Pharmacy Colleges in Pune 2026 | B.Pharm, M.Pharm Fees & NEET Cutoff",
  description: "Top pharmacy colleges in Pune 2026. Compare Poona College of Pharmacy, MAEER's MIT, Sinhgad College of Pharmacy and more. B.Pharm/M.Pharm fees ₹60K–₹1.5L/yr, MHT-CET cutoffs, placements & admission guide.",
  path: "/pharmacy-colleges-pune",
  keywords: [
    "pharmacy colleges in pune 2026",
    "best pharmacy college pune",
    "b pharm colleges pune fees",
    "m pharm colleges pune",
    "mht cet pharmacy cutoff pune 2026",
    "poona college of pharmacy pune",
    "sinhgad college of pharmacy pune",
    "d pharm colleges pune",
    "pharmacy admission pune 2026",
    "government pharmacy college pune",
    "drug inspector pharmacy pune",
  ],
})

const colleges = [
  {
    rank: 1,
    name: "Poona College of Pharmacy",
    type: "Private (Autonomous)",
    naac: "A",
    fees: "₹80K–₹1.2L/yr",
    programs: "D.Pharm, B.Pharm, M.Pharm, Pharm.D",
    seats: 360,
    cutoff: "MHT-CET 75+ %ile",
    highlight: "Best Pharmacy College Pune | Research Excellence",
    slug: "poona-college-of-pharmacy-pune",
  },
  {
    rank: 2,
    name: "MAEER's MIT College of Pharmacy",
    type: "Private",
    naac: "A+",
    fees: "₹90K–₹1.4L/yr",
    programs: "B.Pharm, M.Pharm, Pharm.D",
    seats: 200,
    cutoff: "MHT-CET 70+ %ile",
    highlight: "MIT Group | Modern Labs | Good Placements",
    slug: "mit-college-of-pharmacy-pune",
  },
  {
    rank: 3,
    name: "Sinhgad College of Pharmacy, Vadgaon",
    type: "Private",
    naac: "A",
    fees: "₹70K–₹1.1L/yr",
    programs: "D.Pharm, B.Pharm, M.Pharm",
    seats: 300,
    cutoff: "MHT-CET 65+ %ile",
    highlight: "Sinhgad Group | Largest Intake in Pune",
    slug: "sinhgad-college-of-pharmacy-pune",
  },
  {
    rank: 4,
    name: "Bharati Vidyapeeth College of Pharmacy",
    type: "Deemed",
    naac: "A",
    fees: "₹75K–₹1.2L/yr",
    programs: "B.Pharm, M.Pharm, Ph.D",
    seats: 180,
    cutoff: "MHT-CET 65+ %ile",
    highlight: "Deemed University | Research Focus",
    slug: "bharati-vidyapeeth-college-pharmacy-pune",
  },
  {
    rank: 5,
    name: "Government College of Pharmacy, Pune",
    type: "Government",
    naac: "B+",
    fees: "₹25K–₹40K/yr",
    programs: "D.Pharm, B.Pharm",
    seats: 120,
    cutoff: "MHT-CET 80+ %ile",
    highlight: "Cheapest Option | Government Quality",
    slug: "government-college-pharmacy-pune",
  },
  {
    rank: 6,
    name: "Indira College of Pharmacy, Tathawade",
    type: "Private",
    naac: "B+",
    fees: "₹60K–₹95K/yr",
    programs: "D.Pharm, B.Pharm",
    seats: 180,
    cutoff: "MHT-CET 55+ %ile",
    highlight: "Affordable Private | Pune-Nashik Highway",
    slug: "indira-college-pharmacy-pune",
  },
  {
    rank: 7,
    name: "JSPM's Charak College of Pharmacy",
    type: "Private",
    naac: "B+",
    fees: "₹65K–₹1L/yr",
    programs: "D.Pharm, B.Pharm, M.Pharm",
    seats: 180,
    cutoff: "MHT-CET 55+ %ile",
    highlight: "JSPM Group | Hadapsar Campus",
    slug: "jspm-charak-college-pharmacy-pune",
  },
]

const faqs = [
  {
    question: "Which is the best pharmacy college in Pune 2026?",
    answer: "Poona College of Pharmacy is the top pharmacy college in Pune for B.Pharm and M.Pharm with strong research programs and industry connections. MAEER's MIT College of Pharmacy is the best option for students with an NAAC A+ rating and MIT group brand. Government College of Pharmacy is the best affordable option with fees of just ₹25–40K/yr.",
  },
  {
    question: "What is the MHT-CET cutoff for pharmacy colleges in Pune?",
    answer: "MHT-CET PCB/PCM percentile cutoffs for Pune pharmacy colleges: Government College (80+ %ile), Poona College of Pharmacy (75+ %ile), MIT (70+ %ile), Sinhgad (65+ %ile), Bharati Vidyapeeth (65+ %ile), and Indira/JSPM (55+ %ile). D.Pharm admissions require HSC PCB with 45%+ marks and a lower MHT-CET score.",
  },
  {
    question: "What is the fee for B.Pharm in Pune?",
    answer: "B.Pharm total 4-year fees in Pune: Government College (₹1–1.5 lakh total), Sinhgad/Indira (₹2.8–4.4 lakh total), Poona College (₹3.2–4.8 lakh total), MIT (₹3.6–5.6 lakh total). D.Pharm is a 2-year diploma with total fees of ₹50K–₹1.5 lakh. M.Pharm 2-year fees are ₹1.2–2.4 lakh extra after B.Pharm.",
  },
  {
    question: "What are placements like after pharmacy from Pune colleges?",
    answer: "Pharmacy graduates from Pune colleges get placed in roles like Quality Assurance/QC executive (₹3–5 LPA), Medical Representative (₹3.5–6 LPA), Drug Inspector (Government, ₹6–10 LPA), Hospital Pharmacist (₹3–5 LPA), and R&D roles in pharma companies like Sun Pharma, Cipla, Dr. Reddy's, Lupin, Wockhardt, and Serum Institute of India — all of which have offices near Pune.",
  },
  {
    question: "Is NEET required for B.Pharm admission in Pune?",
    answer: "No, NEET is NOT required for B.Pharm admission in Pune. B.Pharm uses MHT-CET (Physics, Chemistry, Biology/Mathematics) for admission through the Centralised Admission Process (CAP). NEET is only required for MBBS/BDS admissions. D.Pharm admissions are based on HSC (Class 12) PCB marks directly through direct admission at colleges.",
  },
]

const breadcrumb = [
  { name: "Home", url: "https://collegepune.com" },
  { name: "Colleges", url: "https://collegepune.com/colleges" },
  { name: "Pharmacy Colleges Pune", url: "https://collegepune.com/pharmacy-colleges-pune" },
]

export const revalidate = 86400

export default function PharmacyCollegesPune() {
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
            <span className="text-white">Pharmacy Colleges Pune</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Best Pharmacy Colleges in Pune 2026</h1>
          <p className="text-blue-200 max-w-2xl mx-auto text-base mb-6">
            Compare top B.Pharm, M.Pharm &amp; D.Pharm colleges in Pune — fees from ₹25K to ₹1.4L/year, MHT-CET cutoffs, placements &amp; Serum Institute connections.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { icon: BookOpen, text: "7 Pharmacy Colleges" },
              { icon: TrendingUp, text: "Avg ₹4–6 LPA" },
              { icon: Award, text: "NAAC Accredited" },
              { icon: Users, text: "D.Pharm · B.Pharm · M.Pharm" },
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
            <p className="text-sm font-bold text-orange-700 mb-1">⚡ Quick Answer — Pharmacy Colleges Pune 2026</p>
            <p className="text-sm text-gray-700">
              <strong>Best overall:</strong> Poona College of Pharmacy · <strong>Best NAAC A+:</strong> MIT ·{" "}
              <strong>Cheapest:</strong> Government College (₹25K/yr) · <strong>Biggest intake:</strong> Sinhgad ·{" "}
              <strong>Best research:</strong> Bharati Vidyapeeth (Deemed)
            </p>
          </div>

          {/* Table */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pharmacy Colleges in Pune — Ranked 2026</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#0A1628" }}>
                  {["Rank", "College", "Type", "NAAC", "Fees/yr", "Programs", "Seats", "MHT-CET"].map(h => (
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
                    <td className="px-4 py-3 text-gray-600">{c.programs}</td>
                    <td className="px-4 py-3 text-gray-600">{c.seats}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{c.cutoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pharma industry note */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-10">
            <h3 className="font-bold text-blue-900 mb-2">🏭 Why Pune for Pharmacy?</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              Pune is one of India&apos;s top pharma hubs with <strong>Serum Institute of India</strong> (world&apos;s largest vaccine maker),{" "}
              <strong>Lupin, Cipla, Wockhardt, Emcure</strong> and 200+ pharma companies in Pune & Aurangabad within 3 hours.
              Pharmacy graduates from Pune colleges have direct access to campus placements and internships at these companies.
            </p>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-6 text-center mb-10" style={{ background: "linear-gradient(135deg,#0A1628,#1E3A5F)" }}>
            <p className="text-white font-bold text-lg mb-2">B.Pharm or D.Pharm — which is right for you?</p>
            <p className="text-blue-200 text-sm mb-4">Our counsellors help you pick the best pharmacy college based on your MHT-CET score, budget &amp; career goal.</p>
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
          <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions — Pharmacy Colleges Pune</h2>
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
              { label: "Medical Colleges Pune", href: "/medical-colleges-pune" },
              { label: "Engineering Colleges Pune", href: "/engineering-colleges-pune" },
              { label: "BCA Colleges Pune", href: "/bca-colleges-pune" },
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
