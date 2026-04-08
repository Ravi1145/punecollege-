import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { CheckCircle, TrendingUp, Award, BookOpen, Users, Star } from "lucide-react"

export const metadata: Metadata = genMeta({
  title: "Best MBA Colleges in Pune 2026 | Fees, SNAP/CAT Cutoff & Placements",
  description: "Top 10 MBA colleges in Pune 2026 with NIRF ranks, SNAP/CAT cutoffs, annual fees (₹4.2L–₹22L), and average placements (₹7–28 LPA). Compare SIBM Pune, MIT-SOM, BIMM, Indira Institute & more.",
  path: "/mba-colleges-pune",
  keywords: [
    "best mba college in pune",
    "best mba college in pune 2026",
    "top mba colleges pune 2026",
    "mba colleges pune fees",
    "sibm pune admission 2026",
    "snap 2026 cutoff pune",
    "cat colleges pune 2026",
    "mba placements pune",
    "mit som pune mba",
    "symbiosis mba pune 2026",
    "mba colleges pune with fees and placements",
    "pgdm colleges pune 2026",
  ],
})

const colleges = [
  { rank: 1, name: "SIBM Pune – Symbiosis Institute of Business Management", type: "Deemed", nirf: 13, naac: "A+", fees: "₹16L–₹22L total", placement: "₹28 LPA avg | ₹65 LPA highest", exam: "SNAP 2026 (60+ %ile)", slug: "sibm-pune-symbiosis-institute-of-business-management", highlight: "NIRF #13 | McKinsey, BCG Recruiters" },
  { rank: 2, name: "MIT School of Management (MIT-SOM)", type: "Autonomous", nirf: null, naac: "A+", fees: "₹7L–₹11L total", placement: "₹12 LPA avg | ₹32 LPA highest", exam: "CAT / MAT / CMAT", slug: "mit-som-school-of-management-pune", highlight: "Best Value | Strong Alumni" },
  { rank: 3, name: "Balaji Institute of Modern Management (BIMM)", type: "Autonomous", nirf: null, naac: "A", fees: "₹5L–₹7.5L total", placement: "₹8.5 LPA avg | ₹22 LPA highest", exam: "CAT / MAT / CMAT", slug: "bimm-balaji-institute-pune", highlight: "Best Budget MBA" },
  { rank: 4, name: "Indira Institute of Management Pune (IIMP)", type: "Autonomous", nirf: null, naac: "A", fees: "₹4.2L–₹6.5L total", placement: "₹7.2 LPA avg | ₹18 LPA highest", exam: "CAT / MAT / CMAT", slug: "indira-institute-of-management-pune", highlight: "Best ROI in Pune" },
  { rank: 5, name: "SCIT – Symbiosis Centre for Information Technology", type: "Deemed", nirf: null, naac: "A+", fees: "₹14L–₹18L total", placement: "₹18 LPA avg | ₹45 LPA highest", exam: "SNAP 2026 (50+ %ile)", slug: "symbiosis-centre-information-technology-pune", highlight: "Best for IT+MBA" },
  { rank: 6, name: "SCMHRD – Symbiosis Centre for Management & HRD", type: "Deemed", nirf: null, naac: "A+", fees: "₹12L–₹16L total", placement: "₹22 LPA avg | ₹55 LPA highest", exam: "SNAP 2026 (55+ %ile)", slug: "scmhrd-symbiosis-centre-management-hrd-pune", highlight: "Best for Operations/HR" },
  { rank: 7, name: "IIMM – Indian Institute of Materials Management", type: "Autonomous", nirf: null, naac: "B++", fees: "₹3.8L–₹5.5L total", placement: "₹6.5 LPA avg | ₹16 LPA highest", exam: "CAT / MAT / CMAT", slug: "iimm-pune-indian-institute-materials-management", highlight: "Specialization in Supply Chain" },
  { rank: 8, name: "Suryadatta Institute of Management", type: "Private", nirf: null, naac: "B+", fees: "₹2.8L–₹4.5L total", placement: "₹5.8 LPA avg | ₹14 LPA highest", exam: "MAT / CMAT / XAT", slug: "suryadatta-institute-management-pune", highlight: "Most Affordable Pune MBA" },
  { rank: 9, name: "BATU – Bharati Vidyapeeth Institute of Management", type: "Deemed", nirf: null, naac: "A", fees: "₹4L–₹6.8L total", placement: "₹6.8 LPA avg | ₹16 LPA highest", exam: "CAT / MAT / CMAT", slug: "bharati-vidyapeeth-institute-management-pune", highlight: "Part of Deemed University" },
  { rank: 10, name: "MAEER MIT College of Management", type: "Autonomous", nirf: null, naac: "A", fees: "₹4.5L–₹7L total", placement: "₹7.5 LPA avg | ₹20 LPA highest", exam: "CAT / MAT / CMAT", slug: "mit-college-of-management-pune", highlight: "MIT Group – Strong Placements" },
]

const faqs = [
  { question: "Which is the best MBA college in Pune in 2026?", answer: "SIBM Pune (Symbiosis Institute of Business Management) is the best MBA college in Pune in 2026 with NIRF Rank 13, NAAC A+, average placement of ₹28 LPA, and top recruiters like McKinsey, BCG, P&G, Deloitte. Admission is through SNAP 2026 with 60+ percentile required. Total fees: ₹16–22L." },
  { question: "What is the SNAP 2026 cutoff for SIBM Pune?", answer: "The expected SNAP 2026 cutoff for SIBM Pune is 60+ percentile. SNAP is conducted 3 times (December 6, 13, 20, 2026) — best score is considered. Application open August–November 2026. SIBM also accepts CAT scores for direct admission to some programs." },
  { question: "What are the fees for MBA colleges in Pune 2026?", answer: "MBA fees in Pune 2026 range from ₹2.8L (Suryadatta) to ₹22L (SIBM Pune) for the full program. SIBM Pune: ₹16–22L. SCMHRD: ₹12–16L. SCIT: ₹14–18L. MIT-SOM: ₹7–11L. BIMM: ₹5–7.5L. Indira Institute: ₹4.2–6.5L (best ROI). All Symbiosis institutes require SNAP score." },
  { question: "Can I get MBA in Pune with low SNAP score?", answer: "Yes. With SNAP score below 60 percentile, you can apply to MIT-SOM (no SNAP cutoff, accepts CAT/MAT/CMAT), BIMM (₹5–7.5L fees, ₹8.5 LPA avg placement), Indira Institute of Management (₹4.2–6.5L fees, best ROI), and IIMM Pune. MAT and CMAT scores are widely accepted by 7+ Pune MBA colleges." },
  { question: "Which Pune MBA college has the best placements in 2026?", answer: "SIBM Pune leads with ₹28 LPA average MBA placement. Top individual offers from McKinsey, BCG, Goldman Sachs reach ₹55–65 LPA. SCMHRD is second with ₹22 LPA avg. SCIT Pune is best for IT-MBA with ₹18 LPA avg. MIT-SOM offers ₹12 LPA avg at much lower fees (₹7–11L total) — best ROI after SIBM." },
  { question: "Is SIBM Pune better than IIM Nagpur for MBA?", answer: "SIBM Pune (NIRF 13) vs IIM Nagpur depends on goals. SIBM Pune has stronger industry connections in Pune-Mumbai corridor, better mass placements (₹28 LPA avg) but costs ₹16–22L. IIM Nagpur has IIM brand recognition but smaller batch. For Pune/Mumbai placement geography, SIBM is preferred by most recruiters." },
  { question: "What is the difference between CAT and SNAP for Pune MBA colleges?", answer: "CAT 2026 (November 23) is accepted by SIBM Pune, MIT-SOM, BIMM, Indira Institute, and most Pune MBA colleges. SNAP 2026 (December 6, 13, 20) is mandatory ONLY for Symbiosis group colleges (SIBM, SCMHRD, SCIT). For non-Symbiosis colleges like MIT-SOM, BIMM, Indira — CAT/MAT/CMAT is enough." },
  { question: "How to get admission in SIBM Pune 2026?", answer: "Step 1: Register for SNAP 2026 at snaptest.org (August 2026). Step 2: Appear for SNAP (Dec 6/13/20, 2026) — target 60+ percentile. Step 3: Apply to SIBM Pune separately (collegium.siu.edu.in). Step 4: Attend Written Ability Test (WAT) and Personal Interview (PI) in Jan–Feb 2027. Step 5: Accept admission offer. Fees: ₹16–22L total." },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "MBA Colleges in Pune", url: "/mba-colleges-pune" },
]

export default function MBACollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best MBA Colleges in Pune 2026",
    description: "List of top 10 MBA colleges in Pune ranked by NIRF, placements, fees, and SNAP/CAT cutoffs",
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
              <li className="text-gray-900 font-medium">MBA Colleges in Pune</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-medium px-4 py-2 rounded-full mb-4">
                <Award className="w-4 h-4" />
                Updated for 2026 Admissions
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Best MBA Colleges in Pune 2026
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Compare top MBA colleges in Pune by NIRF ranking, SNAP/CAT cutoff, total fees (₹4.2L–₹22L), average placements (₹7–28 LPA), and recruiter quality for 2026 admissions.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-4 h-4" /> NIRF &amp; NAAC Verified</span>
                <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-4 h-4" /> 2026 Fees &amp; Placements</span>
                <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-4 h-4" /> SNAP/CAT/MAT Cutoffs</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Answer Box — GEO/AIO optimized */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-xl p-5 sm:p-6">
            <h2 className="text-lg font-bold text-green-800 mb-2">Quick Answer: Best MBA College in Pune 2026</h2>
            <p className="text-green-900 text-sm leading-relaxed">
              <strong>SIBM Pune</strong> (NIRF Rank 13, NAAC A+) is the best MBA college in Pune in 2026 with ₹28 LPA average placement, recruiters McKinsey/BCG/P&amp;G, and 60+ SNAP percentile requirement. Total fees ₹16–22L.{" "}
              <strong>Best value:</strong> MIT-SOM (₹7–11L fees, ₹12 LPA avg). <strong>Best ROI:</strong> Indira Institute (₹4.2–6.5L fees, ₹7.2 LPA avg).
            </p>
          </div>
        </section>

        {/* Top 3 Detailed Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Top 3 MBA Colleges in Pune — Detailed Review</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {/* SIBM */}
            <div className="border-2 border-orange-200 rounded-2xl p-5 bg-orange-50">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">#1 Best MBA</span>
                <span className="text-xs text-gray-500">NIRF 13</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-3">SIBM Pune – Symbiosis Institute of Business Management</h3>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex gap-2"><TrendingUp className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /><span>Avg Placement: <strong>₹28 LPA</strong></span></li>
                <li className="flex gap-2"><Award className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /><span>NAAC Grade: <strong>A+</strong></span></li>
                <li className="flex gap-2"><BookOpen className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /><span>Total Fees: <strong>₹16L–₹22L</strong></span></li>
                <li className="flex gap-2"><Star className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /><span>Exam: <strong>SNAP 2026 (60+ %ile)</strong></span></li>
                <li className="flex gap-2"><Users className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" /><span>Recruiters: McKinsey, BCG, P&amp;G, Deloitte</span></li>
              </ul>
              <Link href="/colleges/sibm-pune-symbiosis-institute-of-business-management" className="mt-4 block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                View Full Profile →
              </Link>
            </div>
            {/* MIT-SOM */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">#2 Best Value</span>
                <span className="text-xs text-gray-500">NAAC A+</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-3">MIT School of Management (MIT-SOM)</h3>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex gap-2"><TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>Avg Placement: <strong>₹12 LPA</strong></span></li>
                <li className="flex gap-2"><Award className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>NAAC Grade: <strong>A+</strong></span></li>
                <li className="flex gap-2"><BookOpen className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>Total Fees: <strong>₹7L–₹11L</strong></span></li>
                <li className="flex gap-2"><Star className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>Exam: <strong>CAT / MAT / CMAT</strong></span></li>
                <li className="flex gap-2"><Users className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>Recruiters: TCS, Wipro, HDFC, Amazon</span></li>
              </ul>
              <Link href="/colleges/mit-som-school-of-management-pune" className="mt-4 block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                View Full Profile →
              </Link>
            </div>
            {/* Indira */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-white">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">#3 Best ROI</span>
                <span className="text-xs text-gray-500">NAAC A</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-3">Indira Institute of Management Pune</h3>
              <ul className="space-y-1.5 text-sm text-gray-700">
                <li className="flex gap-2"><TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Avg Placement: <strong>₹7.2 LPA</strong></span></li>
                <li className="flex gap-2"><Award className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>NAAC Grade: <strong>A</strong></span></li>
                <li className="flex gap-2"><BookOpen className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Total Fees: <strong>₹4.2L–₹6.5L</strong></span></li>
                <li className="flex gap-2"><Star className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Exam: <strong>CAT / MAT / CMAT</strong></span></li>
                <li className="flex gap-2"><Users className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /><span>Recruiters: ICICI, HDFC, Kotak, Reliance</span></li>
              </ul>
              <Link href="/colleges/indira-institute-of-management-pune" className="mt-4 block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                View Full Profile →
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">All MBA Colleges in Pune 2026 — Comparison Table</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold">#</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold">College</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold hidden sm:table-cell">Type</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">NIRF</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold hidden md:table-cell">NAAC</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold">Total Fees</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold hidden lg:table-cell">Avg Placement</th>
                  <th className="px-3 sm:px-4 py-3 text-left font-semibold hidden lg:table-cell">Entrance Exam</th>
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
                    <td className="px-3 sm:px-4 py-3 text-gray-600 hidden lg:table-cell text-xs">{c.placement}</td>
                    <td className="px-3 sm:px-4 py-3 text-gray-600 hidden lg:table-cell text-xs">{c.exam}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Admission Process */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">MBA Admission Process 2026 — Pune Colleges</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Entrance Exam", desc: "Appear for CAT 2026 (Nov 23) or SNAP 2026 (Dec 6/13/20) or MAT/CMAT 2026.", color: "bg-orange-50 border-orange-200" },
                { step: "2", title: "Apply to Colleges", desc: "Submit applications to shortlisted Pune colleges. SIBM needs SNAP; others accept CAT/MAT.", color: "bg-blue-50 border-blue-200" },
                { step: "3", title: "GD / WAT / PI", desc: "Attend Group Discussion, Written Ability Test, and Personal Interview in Jan–Feb 2027.", color: "bg-purple-50 border-purple-200" },
                { step: "4", title: "Merit List & Admission", desc: "Final selection based on exam score + GD/WAT/PI performance. Confirm by paying first-year fees.", color: "bg-green-50 border-green-200" },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className={`${color} border rounded-2xl p-5`}>
                  <div className="text-3xl font-extrabold text-gray-300 mb-2">{step}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exam Comparison */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">MBA Entrance Exams for Pune 2026 — Which Colleges Accept What?</h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Exam</th>
                  <th className="px-4 py-3 text-left font-semibold">Date 2026</th>
                  <th className="px-4 py-3 text-left font-semibold">Colleges Accepting in Pune</th>
                  <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Min Cutoff</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { exam: "CAT 2026", date: "Nov 23, 2026", colleges: "SIBM, MIT-SOM, BIMM, Indira Inst., IIMM, Suryadatta, MIT CoM", cutoff: "50–70 %ile" },
                  { exam: "SNAP 2026", date: "Dec 6, 13, 20, 2026", colleges: "SIBM Pune, SCMHRD, SCIT, all Symbiosis B-schools", cutoff: "50–60 %ile" },
                  { exam: "MAT 2026", date: "Feb/May/Sep/Dec", colleges: "MIT-SOM, BIMM, Indira Inst., IIMM, Suryadatta", cutoff: "600+ score" },
                  { exam: "CMAT 2026", date: "Mar 20, 2026", colleges: "MIT-SOM, BIMM, Indira Inst., IIMM, most Pune MBA", cutoff: "200+ score" },
                  { exam: "XAT 2026", date: "Jan 5, 2026", colleges: "Symbiosis colleges (partial), select Pune institutes", cutoff: "75+ %ile" },
                ].map((row, i) => (
                  <tr key={row.exam} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-semibold text-orange-600">{row.exam}</td>
                    <td className="px-4 py-3 text-gray-700">{row.date}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{row.colleges}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{row.cutoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">FAQs — MBA Colleges in Pune 2026</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{faq.question}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Find the Right MBA College for You</h2>
            <p className="text-orange-100 mb-6 text-sm sm:text-base">Use our free AI College Finder or talk to an expert counselor for personalised MBA college guidance.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/ai-finder" className="bg-white text-orange-600 font-bold px-8 py-3 rounded-2xl hover:bg-orange-50 transition-colors text-sm">
                Try AI MBA Finder
              </Link>
              <Link href="/counselling" className="bg-orange-700 text-white font-bold px-8 py-3 rounded-2xl hover:bg-orange-800 transition-colors text-sm">
                Free Counselling Session
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
