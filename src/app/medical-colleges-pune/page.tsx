import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle, TrendingUp, Award, BookOpen, Users, AlertCircle } from "lucide-react"

export const metadata: Metadata = genMeta({
  title: "Best Medical Colleges in Pune 2026 | NEET Cutoff, Fees & MBBS Seats",
  description: "Top medical colleges in Pune 2026 with NEET cutoffs, NIRF ranks, annual fees (₹50K–₹15L), and MBBS/BDS seat count. Compare AFMC (NIRF #4), BJ Medical College (NIRF #18), DY Patil & Bharati Vidyapeeth.",
  path: "/medical-colleges-pune",
  keywords: [
    "best medical college in pune",
    "medical colleges in pune 2026",
    "neet cutoff pune medical colleges",
    "afmc pune admission 2026",
    "bj medical college pune 2026",
    "mbbs colleges pune fees",
    "neet 2026 pune",
    "government medical college pune",
    "dy patil medical college pune",
    "bharati vidyapeeth medical college pune",
    "mbbs fees pune 2026",
    "top medical colleges pune neet score",
  ],
})

const colleges = [
  { rank: 1, name: "AFMC – Armed Forces Medical College", type: "Government (Defence)", nirf: 4, naac: "A++", fees: "₹50,000 (total 4.5 yrs)", seats: 130, neet: "650+", slug: "afmc-armed-forces-medical-college-pune", highlight: "NIRF #4 | Nearly Free | Best in India" },
  { rank: 2, name: "BJ Medical College (BJMC)", type: "Government", nirf: 18, naac: "A+", fees: "₹60K–₹1.2L/yr", seats: 250, neet: "625+ (Open)", slug: "bj-medical-college-pune", highlight: "NIRF #18 | Best Govt for State Quota" },
  { rank: 3, name: "D.Y. Patil Medical College, Pune", type: "Deemed", nirf: null, naac: "A", fees: "₹11L–₹15L/yr", seats: 150, neet: "500–550 (Mgmt)", slug: "dy-patil-medical-college-pune", highlight: "Most Seats | Management Quota Available" },
  { rank: 4, name: "Bharati Vidyapeeth Medical College", type: "Deemed", nirf: null, naac: "A", fees: "₹8.5L–₹12L/yr", seats: 150, neet: "490–540 (Mgmt)", slug: "bharati-vidyapeeth-medical-college-pune", highlight: "Affordable Deemed | Good Facilities" },
  { rank: 5, name: "Dr. D.Y. Patil Medical College, Pimpri", type: "Deemed", nirf: null, naac: "A", fees: "₹10L–₹14L/yr", seats: 150, neet: "510–560 (Mgmt)", slug: "dy-patil-medical-college-pimpri-pune", highlight: "Large Hospital Attached" },
  { rank: 6, name: "Deenanath Mangeshkar Hospital & Research Centre", type: "Private", nirf: null, naac: "B+", fees: "₹7L–₹10L/yr", seats: 100, neet: "480–530 (Mgmt)", slug: "deenanath-mangeshkar-medical-college-pune", highlight: "Prestigious Hospital Brand" },
  { rank: 7, name: "Smt. Kashibai Navale Medical College & GH", type: "Private", nirf: null, naac: "B+", fees: "₹7.5L–₹11L/yr", seats: 150, neet: "470–520 (Mgmt)", slug: "smt-kashibai-navale-medical-college-pune", highlight: "Modern Infrastructure" },
  { rank: 8, name: "Pune Dental College & Hospital", type: "Government", nirf: null, naac: "A", fees: "₹1.5L–₹2.5L/yr", seats: 60, neet: "500+ for BDS", slug: "pune-dental-college-pune", highlight: "Best Govt Dental – BDS" },
]

const faqs = [
  { question: "Which is the best medical college in Pune?", answer: "AFMC (Armed Forces Medical College) is the best medical college in Pune with NIRF Rank 4, NAAC A++ grade, and near-zero fees (₹50,000 total for 4.5 years MBBS). It requires 650+ NEET score + AFMC entrance test + SSB interview. BJ Medical College (NIRF #18) is the best accessible government option at 625+ NEET for open category students." },
  { question: "What NEET score is required for AFMC Pune?", answer: "AFMC requires 650+ NEET 2026 score (out of 720) along with a separate AFMC screening test and SSB (Service Selection Board) interview. It has 130 MBBS seats. Fees are nearly free — just ₹50,000 for the entire 4.5-year course. Candidates must be unmarried Indian nationals aged 17–24." },
  { question: "What is the NEET cutoff for BJ Medical College Pune 2026?", answer: "BJ Medical College (BJMC) Pune's expected NEET 2026 cutoff for open category (state quota) is 625–640 marks. For OBC: 595–610 marks. For SC/ST: 500–530 marks. Government quota seats are filled through Maharashtra State CET Cell (NEET CAP) process. BJ Medical College has 250 MBBS seats and fees of ₹60K–1.2L/yr." },
  { question: "What is the fee for MBBS at DY Patil Medical College Pune?", answer: "D.Y. Patil Medical College Pune charges ₹11L–₹15L per year for MBBS (management quota). For NRI quota, fees can be ₹25–35L per year. State quota seats (through NEET state merit) have fee capped at ₹2–3L/yr. Management quota at DY Patil requires 500–550 NEET score." },
  { question: "How to get MBBS admission in Pune government college?", answer: "Step 1: Score 625+ in NEET 2026 (May 3, 2026). Step 2: Register on Maharashtra CET Cell MBBS CAP portal (June–July 2026). Step 3: Submit documents at Facilitation Centre. Step 4: Select BJ Medical College in preference during CAP Round 1 (July 2026). AFMC is separate — apply at afmc.nic.in with separate test and SSB." },
  { question: "Which is better — DY Patil Medical College or Bharati Vidyapeeth Medical College?", answer: "DY Patil Medical College Pune has more seats (150), fees ₹11–15L/yr, and is attached to a large 1,400-bed hospital. Bharati Vidyapeeth Medical College has lower fees (₹8.5–12L/yr) and 150 seats attached to Bharati Vidyapeeth Hospital. For management quota MBBS, Bharati Vidyapeeth offers better value. DY Patil has a larger hospital and more OPD exposure." },
  { question: "Is there any dental college in Pune for NEET?", answer: "Yes. Top dental (BDS) colleges in Pune include: Govt Dental College & Hospital (lowest fees, 500+ NEET), Bharati Vidyapeeth Dental College, DY Patil Dental College, Sinhgad Dental College. BDS in government dental college costs ₹1.5–2.5L/yr. Management quota BDS at private college: ₹4–8L/yr. NEET is mandatory for all BDS admissions." },
  { question: "What is the process for NEET 2026 admission to Pune medical colleges?", answer: "NEET 2026 is scheduled for May 3, 2026. Results expected June 2026. For Maharashtra government colleges (BJ Medical): register on Maharashtra CET Cell portal, fill CAP application, select college preferences, attend merit round. For AFMC: separate application at afmc.nic.in. For private management quota (DY Patil, Bharati Vidyapeeth): direct apply to colleges after NEET score declaration." },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "Medical Colleges in Pune", url: "/medical-colleges-pune" },
]

export default function MedicalCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Medical Colleges in Pune 2026",
    description: "List of top medical colleges in Pune ranked by NIRF, NEET cutoff, fees, and facilities",
    numberOfItems: colleges.length,
    itemListElement: colleges.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `https://collegepune.com/colleges/${c.slug}`,
    })),
  }

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <main className="bg-white min-h-screen">
        {/* Breadcrumb */}
        <nav className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
              <li><Link href="/" className="hover:text-orange-600">Home</Link></li>
              <li>/</li>
              <li><Link href="/colleges" className="hover:text-orange-600">Colleges</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">Medical Colleges in Pune</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-300 text-sm font-medium px-4 py-2 rounded-full mb-4">
                <Award className="w-4 h-4" />
                NEET 2026 — Updated Cutoffs
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Best Medical Colleges in Pune 2026
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Compare AFMC (NIRF #4), BJ Medical College (NIRF #18), DY Patil, and Bharati Vidyapeeth by NEET cutoff, annual fees (₹50K–₹15L/yr), MBBS seats, and hospital attachment quality.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-4 h-4" /> NEET 2026 Cutoffs</span>
                <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-4 h-4" /> NIRF &amp; NAAC Verified</span>
                <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-4 h-4" /> Govt &amp; Private Options</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer Box */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-5 sm:p-6">
            <h2 className="text-lg font-bold text-green-800 mb-2">Quick Answer: Best Medical College in Pune 2026</h2>
            <p className="text-green-900 text-sm leading-relaxed">
              <strong>AFMC Pune</strong> (NIRF Rank 4, NAAC A++) is the best medical college in Pune — nearly free education (₹50,000 total) but requires 650+ NEET + separate test + SSB.{" "}
              <strong>Best govt option:</strong> BJ Medical College (NIRF #18) — 625+ NEET, ₹60K–1.2L/yr fees.{" "}
              <strong>Best private:</strong> DY Patil Medical College — 500+ NEET (mgmt quota), ₹11–15L/yr.
            </p>
          </div>
        </section>

        {/* NEET Alert */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-semibold text-sm">NEET 2026 Important Dates</p>
              <p className="text-red-700 text-sm">Application: Feb 10 – Mar 10, 2026 &nbsp;|&nbsp; Exam: May 3, 2026 &nbsp;|&nbsp; Results: June 2026 &nbsp;|&nbsp; Counselling: July–August 2026</p>
            </div>
          </div>
        </section>

        {/* Top 3 College Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Top 3 Medical Colleges in Pune — Detailed Comparison</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {/* AFMC */}
            <div className="border-2 border-orange-200 rounded-2xl p-5 bg-orange-50">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">#1 Best Medical</span>
                <span className="text-xs text-gray-500">NIRF 4</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-3">AFMC – Armed Forces Medical College</h3>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex gap-2"><Award className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /><span>NAAC: <strong>A++ (Best in India)</strong></span></li>
                <li className="flex gap-2"><BookOpen className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /><span>Fees: <strong>₹50,000 total (entire course)</strong></span></li>
                <li className="flex gap-2"><TrendingUp className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /><span>NEET Cutoff: <strong>650+ marks</strong></span></li>
                <li className="flex gap-2"><Users className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /><span>MBBS Seats: <strong>130</strong></span></li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /><span>Also needs: AFMC test + SSB interview</span></li>
              </ul>
              <Link href="/colleges/afmc-armed-forces-medical-college-pune" className="mt-4 block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                View Full Profile →
              </Link>
            </div>
            {/* BJMC */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">#2 Best Govt</span>
                <span className="text-xs text-gray-500">NIRF 18</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-3">BJ Medical College (BJMC) Pune</h3>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex gap-2"><Award className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>NAAC: <strong>A+</strong></span></li>
                <li className="flex gap-2"><BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>Fees: <strong>₹60K–₹1.2L/year</strong></span></li>
                <li className="flex gap-2"><TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>NEET Cutoff: <strong>625+ (Open, State Quota)</strong></span></li>
                <li className="flex gap-2"><Users className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>MBBS Seats: <strong>250</strong></span></li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>Admission: Maharashtra NEET CAP process</span></li>
              </ul>
              <Link href="/colleges/bj-medical-college-pune" className="mt-4 block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                View Full Profile →
              </Link>
            </div>
            {/* DY Patil */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">#3 Best Private</span>
                <span className="text-xs text-gray-500">NAAC A</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-3">D.Y. Patil Medical College, Pune</h3>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex gap-2"><Award className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>NAAC: <strong>A</strong></span></li>
                <li className="flex gap-2"><BookOpen className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Fees: <strong>₹11L–₹15L/year (Mgmt)</strong></span></li>
                <li className="flex gap-2"><TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>NEET Cutoff: <strong>500–550 (Mgmt Quota)</strong></span></li>
                <li className="flex gap-2"><Users className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>MBBS Seats: <strong>150</strong></span></li>
                <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Hospital: 1,400 bed teaching hospital</span></li>
              </ul>
              <Link href="/colleges/dy-patil-medical-college-pune" className="mt-4 block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                View Full Profile →
              </Link>
            </div>
          </div>
        </section>

        {/* Full Comparison Table */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">All Medical Colleges in Pune 2026 — NEET Cutoff & Fees</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold">#</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold">College</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold hidden sm:table-cell">Type</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">NIRF</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">NAAC</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold">Fees/Year</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold hidden lg:table-cell">MBBS Seats</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold hidden lg:table-cell">NEET Cutoff</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((c, i) => (
                  <tr key={c.rank} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-3 sm:px-4 py-3 font-bold text-orange-600">{c.rank}</td>
                    <td className="px-3 sm:px-4 py-3">
                      <Link href={`/colleges/${c.slug}`} className="font-semibold text-gray-900 hover:text-orange-600 transition-colors text-xs sm:text-sm">
                        {c.name}
                      </Link>
                      <div className="text-xs text-orange-600 font-medium mt-0.5">{c.highlight}</div>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-gray-600 hidden sm:table-cell text-xs">{c.type}</td>
                    <td className="px-3 sm:px-4 py-3 text-gray-600 hidden md:table-cell">{c.nirf ? `#${c.nirf}` : "—"}</td>
                    <td className="px-3 sm:px-4 py-3 hidden md:table-cell">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.naac === "A++" ? "bg-purple-100 text-purple-700" : c.naac === "A+" ? "bg-green-100 text-green-700" : c.naac === "A" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {c.naac}
                      </span>
                    </td>
                    <td className="px-3 sm:px-4 py-3 text-gray-700 font-medium text-xs sm:text-sm">{c.fees}</td>
                    <td className="px-3 sm:px-4 py-3 text-gray-600 hidden lg:table-cell">{c.seats}</td>
                    <td className="px-3 sm:px-4 py-3 text-gray-600 hidden lg:table-cell text-xs font-semibold text-red-600">{c.neet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Govt vs Private Comparison */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Government vs Private Medical College in Pune — Which is Better?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-bold text-blue-900 text-lg mb-4">Government Medical Colleges (AFMC, BJMC)</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>Extremely low fees — ₹50K (AFMC) to ₹1.2L/yr (BJMC)</span></li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>NIRF ranked #4 (AFMC) and #18 (BJMC) — nationally recognized</span></li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>Large government hospital exposure — 500–1,000 bed hospitals</span></li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>Strong alumni network in government and private hospitals</span></li>
                  <li className="flex gap-2 text-red-700"><AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>Very high NEET cutoff — 625–650+ marks required</span></li>
                </ul>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                <h3 className="font-bold text-orange-900 text-lg mb-4">Private Medical Colleges (DY Patil, Bharati Vidyapeeth)</h3>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>More accessible — 490–560 NEET score for management quota</span></li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>Modern infrastructure and new simulation labs</span></li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>Large private hospitals — good OPD and surgical exposure</span></li>
                  <li className="flex gap-2"><CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>State quota seats also available at regulated fees</span></li>
                  <li className="flex gap-2 text-red-700"><AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /><span>High fees — ₹8.5L–₹15L/year for management quota</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">FAQs — Medical Colleges in Pune 2026</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-red-600 to-orange-500 py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Need Help with NEET 2026 &amp; Medical Admission?</h2>
            <p className="text-red-100 mb-6 text-sm sm:text-base">Talk to our free medical admission counselor for NEET score analysis and college selection for Pune 2026.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/predictor" className="bg-white text-red-600 font-bold px-8 py-3 rounded-2xl hover:bg-red-50 transition-colors text-sm">
                NEET College Predictor
              </Link>
              <Link href="/counselling" className="bg-red-800 text-white font-bold px-8 py-3 rounded-2xl hover:bg-red-900 transition-colors text-sm">
                Free Medical Counselling
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
