import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateItemListSchema } from "@/lib/seo"
import { CheckCircle, MapPin, ExternalLink, BookOpen } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Top 10 Medical Colleges in Pune 2026 (NIRF Ranked)",
  description:
    "Ranked list of top 10 medical colleges in Pune 2026 by NIRF rank, NAAC grade, NEET cutoff & fees. AFMC #4, BJ Medical #18 — compare all data in one place.",
  path: "/top-10-medical-colleges-in-pune",
  keywords: [
    "top 10 medical colleges in pune",
    "top medical colleges in pune",
    "best medical colleges in pune",
    "best mbbs colleges pune ranking",
    "neet colleges pune 2026",
  ],
})

const colleges = [
  {
    rank: 1,
    name: "Armed Forces Medical College (AFMC)",
    type: "Government (Defence)",
    nirf: 4,
    naac: "A++",
    fees: "₹50K (total)",
    neetCutoff: "655+",
    seats: 150,
    exam: "NEET + AFMC Entrance",
    slug: "afmc-armed-forces-medical-college-pune",
    highlight: "Best NIRF | Near-Zero Fees",
    location: "Wanowrie, Pune",
  },
  {
    rank: 2,
    name: "BJ Government Medical College (BJMC)",
    type: "Government",
    nirf: 18,
    naac: "A",
    fees: "₹60K–₹1.2L/yr",
    neetCutoff: "625+",
    seats: 200,
    exam: "NEET (State Quota)",
    slug: "bj-medical-college-pune",
    highlight: "Best Govt. MBBS | NIRF #18",
    location: "Sassoon Road, Pune",
  },
  {
    rank: 3,
    name: "Dr. D.Y. Patil Medical College",
    type: "Deemed University",
    nirf: null,
    naac: "A+",
    fees: "₹12L–₹18L/yr",
    neetCutoff: "550+",
    seats: 250,
    exam: "NEET",
    slug: "dy-patil-medical-college-pune",
    highlight: "Best Private | Strong Placements",
    location: "Pimpri, Pune",
  },
  {
    rank: 4,
    name: "Bharati Vidyapeeth Medical College",
    type: "Deemed University",
    nirf: null,
    naac: "A",
    fees: "₹10L–₹14L/yr",
    neetCutoff: "540+",
    seats: 200,
    exam: "NEET",
    slug: "bharati-vidyapeeth-medical-college-pune",
    highlight: "Established 1989 | Strong Alumni",
    location: "Dhankawadi, Pune",
  },
  {
    rank: 5,
    name: "Seth GS Medical College (KEM Hospital)",
    type: "Government",
    nirf: null,
    naac: "A",
    fees: "₹80K–₹1.5L/yr",
    neetCutoff: "615+",
    seats: 180,
    exam: "NEET (MCC Quota)",
    slug: "seth-gs-medical-college-pune",
    highlight: "Government | 800-Bed Hospital",
    location: "Swargate, Pune",
  },
  {
    rank: 6,
    name: "Smt Kashibai Navale Medical College",
    type: "Private",
    nirf: null,
    naac: "A",
    fees: "₹8L–₹12L/yr",
    neetCutoff: "520+",
    seats: 150,
    exam: "NEET",
    slug: "sknmc-kashibai-navale-medical-college-pune",
    highlight: "Affordable Private | Good Infrastructure",
    location: "Narhe, Pune",
  },
  {
    rank: 7,
    name: "Maharashtra Institute of Medical Sciences (MIMS)",
    type: "Private",
    nirf: null,
    naac: "B++",
    fees: "₹9L–₹13L/yr",
    neetCutoff: "500+",
    seats: 100,
    exam: "NEET",
    slug: "mims-medical-college-pune",
    highlight: "Growing Campus | Modern Labs",
    location: "Loni Kalbhor, Pune",
  },
  {
    rank: 8,
    name: "Ruby Hall Clinic Medical College",
    type: "Private",
    nirf: null,
    naac: "B+",
    fees: "₹10L–₹15L/yr",
    neetCutoff: "490+",
    seats: 100,
    exam: "NEET",
    slug: "ruby-hall-clinic-medical-college-pune",
    highlight: "Top-Tier Hospital Training",
    location: "Wanowrie, Pune",
  },
  {
    rank: 9,
    name: "Dr. Vithalrao Vikhe Patil Foundation Medical College",
    type: "Private",
    nirf: null,
    naac: "A",
    fees: "₹7L–₹11L/yr",
    neetCutoff: "510+",
    seats: 150,
    exam: "NEET",
    slug: "dvvpf-medical-college-ahmednagar-pune",
    highlight: "Affordable | Rural Exposure",
    location: "Ahmednagar (near Pune)",
  },
  {
    rank: 10,
    name: "Symbiosis Medical College for Women (SMCW)",
    type: "Deemed University",
    nirf: null,
    naac: "A",
    fees: "₹13L–₹17L/yr",
    neetCutoff: "530+",
    seats: 100,
    exam: "NEET",
    slug: "smcw-symbiosis-medical-college-pune",
    highlight: "Women Only | Lavale Campus",
    location: "Lavale, Pune",
  },
]

const faqData = [
  {
    question: "Which is the best medical college in Pune in 2026?",
    answer: "AFMC (Armed Forces Medical College) is ranked #4 by NIRF nationally and is the best medical college in Pune with near-zero fees (₹50,000 total). For civilian government MBBS, BJ Medical College (NIRF #18) is the top choice with NEET cutoff 625+.",
  },
  {
    question: "What NEET score is required for MBBS in Pune?",
    answer: "AFMC requires 655+ NEET score plus an AFMC entrance exam. BJ Medical College requires 625+ for open category (state quota). Private deemed universities in Pune (DY Patil, Bharati Vidyapeeth) accept NEET scores from 500–550.",
  },
  {
    question: "What is the MBBS fee in Pune medical colleges 2026?",
    answer: "AFMC: ₹50,000 total; BJ Govt Medical: ₹60K–1.2L/year; Private deemed (DY Patil, Bharati Vidyapeeth): ₹10L–18L/year. SC/ST students at government colleges receive full fee waiver.",
  },
  {
    question: "Is AFMC better than BJ Medical College Pune?",
    answer: "AFMC has a higher NIRF rank (#4 vs BJ at #18) and near-zero fees, but requires a separate AFMC entrance test and a commitment to military service post-graduation. BJ Medical College has a larger intake, better state quota access, and no bond requirements.",
  },
  {
    question: "Which Pune medical college has the most seats?",
    answer: "Dr. DY Patil Medical College has the highest intake at 250 MBBS seats per year, followed by BJ Government Medical College (200 seats) and Bharati Vidyapeeth Medical College (200 seats).",
  },
]

export default function Top10MedicalCollegesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Medical Colleges Pune", url: "/medical-colleges-pune" },
    { name: "Top 10 Medical Colleges", url: "/top-10-medical-colleges-in-pune" },
  ])
  const faqSchema = generateFAQSchema(faqData)
  const itemListSchema = generateItemListSchema(
    colleges.map((c) => ({
      name: c.name,
      url: `/colleges/${c.slug}`,
      description: `${c.type} | NAAC ${c.naac}${c.nirf ? ` | NIRF #${c.nirf}` : ""} | Fees ${c.fees} | NEET ${c.neetCutoff}`,
    }))
  )

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0A1628] via-[#0D2040] to-[#1a1a2e] text-white py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <Link href="/medical-colleges-pune" className="hover:text-white">Medical Colleges</Link>
              <span>›</span>
              <span className="text-white">Top 10</span>
            </nav>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">NEET</span>
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">NIRF Ranked</span>
              <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">Updated 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
              Top 10 Medical Colleges in Pune 2026
            </h1>
            <p className="text-white/75 text-lg max-w-2xl">
              NIRF-ranked MBBS colleges in Pune — AFMC, BJ Medical, DY Patil and more. NEET cutoffs, fees, seats, and admission process compared.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-bold text-gray-700 w-10">#</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-700">College</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-700 hidden sm:table-cell">Type</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-700">NIRF</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-700">NEET Cutoff</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-700 hidden md:table-cell">Fees/yr</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-700 hidden lg:table-cell">Seats</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((c, i) => (
                  <tr key={c.rank} className={`border-b border-gray-50 hover:bg-orange-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    <td className="px-4 py-4">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${
                        c.rank <= 3 ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"
                      }`}>{c.rank}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Link href={`/colleges/${c.slug}`} className="font-bold text-gray-900 hover:text-orange-600 transition-colors block">
                        {c.name}
                      </Link>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" /> {c.location}
                      </div>
                      <span className="inline-block mt-1 text-[10px] font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                        {c.highlight}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                        c.type.includes("Government") ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-600"
                      }`}>{c.type}</span>
                    </td>
                    <td className="px-4 py-4">
                      {c.nirf ? (
                        <span className="font-bold text-orange-600">#{c.nirf}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                      <div className="text-xs text-gray-400 mt-0.5">NAAC {c.naac}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-bold text-gray-900">{c.neetCutoff}</span>
                      <div className="text-xs text-gray-400 mt-0.5">{c.exam}</div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-gray-700 font-medium">{c.fees}</td>
                    <td className="px-4 py-4 hidden lg:table-cell text-gray-700">{c.seats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cutoffs/neet/afmc-armed-forces-medical-college-pune" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
              View NEET Cutoffs 2026 →
            </Link>
            <Link href="/counselling" className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
              Free MBBS Counselling
            </Link>
          </div>

          {/* Key Insights */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: "🏆", title: "NIRF #4 Nationally", desc: "AFMC Pune is India's 4th ranked medical college — and among the most affordable anywhere in the country." },
              { icon: "💰", title: "Govt vs Private Cost", desc: "Government MBBS seats cost ₹60K–1.5L/year vs ₹10L–18L/year at private deemed universities in Pune." },
              { icon: "🎯", title: "NEET Score Range", desc: "Competitive range in Pune: 490–655. AFMC + BJ need 625+ while private colleges accept 490+." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <span className="text-2xl">{icon}</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-12">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.map((faq) => (
                <div key={faq.question} className="border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    {faq.question}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          <div className="mt-10 pt-8 border-t border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Related Guides</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Medical Colleges Pune", href: "/medical-colleges-pune" },
                { label: "NEET Cutoffs 2026", href: "/cutoffs" },
                { label: "Top 10 Engineering Colleges", href: "/top-10-engineering-colleges-in-pune" },
                { label: "Top 10 MBA Colleges", href: "/top-10-mba-colleges-in-pune" },
                { label: "Scholarships for Medical", href: "/scholarships" },
              ].map(({ label, href }) => (
                <Link key={href} href={href} className="text-sm text-orange-600 hover:text-orange-700 border border-orange-200 hover:border-orange-400 px-4 py-1.5 rounded-full transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
