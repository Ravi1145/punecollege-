import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { btechColleges } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"

export const metadata: Metadata = genMeta({
  title: "BTech Colleges in Pune with Fees 2026 | Course-wise Fee Structure",
  description: "BTech college fees in Pune 2026. Course-wise fee structure for all top engineering colleges — COEP (₹80K/yr), PICT (₹1.4L), VIT Pune (₹1.6L), SIT (₹3.6L). Compare total 4-year costs.",
  path: "/btech-colleges-in-pune-with-fees",
  keywords: [
    "btech colleges in pune with fees", "btech fees pune 2026", "engineering college fees pune",
    "btech college fees structure pune", "btech fees comparison pune", "cheapest btech college pune",
  ],
})
export const revalidate = 300

const faqs = [
  { question: "What is the BTech fee in Pune 2026?", answer: "BTech fees in Pune 2026: Government colleges (COEP): ₹80,000–1,80,000/year. Autonomous SPPU colleges (PICT, VIT Pune, PCCOE): ₹1,35,000–2,20,000/year. Deemed universities (MIT-WPU): ₹2L–3.8L/year. Premium deemed (SIT Pune): ₹3.6L–4.8L/year. Total 4-year BTech: ₹3.2L (COEP) to ₹19.2L (SIT Pune)." },
  { question: "Which is the cheapest BTech college in Pune?", answer: "COEP (College of Engineering Pune) is the cheapest quality BTech college at ₹80,000–1,80,000/year (total ₹3.2L–7.2L for 4 years). For mid-tier affordable colleges: DYPCOE (₹1.05L–1.55L/yr), AISSMS COE (₹1.1L–1.55L/yr), and PCCOE (₹1.35L–1.85L/yr) are the most affordable autonomous colleges." },
  { question: "Is BTech fee at COEP Pune really that low?", answer: "Yes. COEP is a government engineering college established in 1854. The Maharashtra government subsidizes tuition. COEP charges ₹80,000–1,80,000/year depending on the programme (government seat, MHT-CET CAP). This is one of the lowest fees among top-50 NIRF engineering colleges in India — making COEP extraordinary value." },
  { question: "What is the total 4-year BTech fee at Pune colleges?", answer: "Total 4-year BTech fees: COEP ₹3.2L–7.2L, PICT ₹5.6L–7.6L, VIT Pune ₹6.4L–8.8L, PCCOE ₹5.4L–7.4L, MIT-WPU ₹8L–15.2L, SIT Pune ₹14.4L–19.2L. These exclude hostel (₹60K–1.2L/yr), exam fees (₹2K–4K/semester), and other charges." },
  { question: "Are BTech fees at Pune deemed universities worth it?", answer: "MIT-WPU (₹2L–3.8L/yr) and SIT Pune (₹3.6L–4.8L/yr) charge 3–5× more than COEP but offer better infrastructure, newer branches (AI/ML, Data Science), and strong brand recognition for private sector placements. The premium is justified if you're targeting ₹8–12 LPA packages and can't get into COEP/PICT via MHT-CET." },
]

export default function BTechFeesPage() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
    { name: "BTech Fees", url: "/btech-colleges-in-pune-with-fees" },
  ])

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1.5">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/btech-colleges-in-pune" className="hover:text-white">BTech Colleges Pune</Link><span>›</span>
              <span className="text-white">Fees</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">BTech Colleges in Pune with Fees 2026</h1>
            <p className="text-blue-100 mb-5">Complete fee structure for all top BTech colleges in Pune — annual fees, total 4-year cost, hostel and scholarship options.</p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-3xl" data-speakable="true">
              <p className="text-green-300 text-xs font-bold uppercase mb-1">⚡ Quick Answer</p>
              <p className="text-white text-sm">
                BTech fees in Pune range from <strong>₹80,000/year (COEP — government)</strong> to <strong>₹4.8L/year (SIT Pune — deemed)</strong>.
                PICT and VIT Pune charge ₹1.4L–2.2L/year. Total 4-year cost: ₹3.2L (COEP) to ₹19.2L (SIT Pune).
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">

          {/* Fee Comparison Table */}
          <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">BTech Fee Structure — Pune 2026 (All Colleges)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left text-gray-600">
                    <th className="px-4 py-3 font-semibold">College</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Annual Fees</th>
                    <th className="px-4 py-3 font-semibold">Total 4-Year</th>
                    <th className="px-4 py-3 font-semibold">Hostel</th>
                    <th className="px-4 py-3 font-semibold">NAAC</th>
                  </tr>
                </thead>
                <tbody>
                  {btechColleges.map((c, i) => (
                    <tr key={c.shortName} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-3 font-medium">
                        <Link href={`/colleges/${c.slug}/fees`} className="text-blue-700 hover:underline">{c.shortName}</Link>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{c.type}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">₹{(c.feesPerYear.min / 100000).toFixed(1)}L–{(c.feesPerYear.max / 100000).toFixed(1)}L</td>
                      <td className="px-4 py-3 font-semibold text-blue-700">₹{(c.feesTotal.min / 100000).toFixed(1)}L–{(c.feesTotal.max / 100000).toFixed(1)}L</td>
                      <td className="px-4 py-3">{c.hostel ? <span className="text-green-600">✓ Available</span> : <span className="text-gray-400">—</span>}</td>
                      <td className="px-4 py-3"><span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">{c.naac}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Additional Charges */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Additional BTech Charges (Beyond Tuition)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {[
                { item: "Admission / Registration Fee", amount: "₹5,000–₹15,000 (one-time)" },
                { item: "University Exam Fee (per semester)", amount: "₹2,000–₹4,000" },
                { item: "Library Fee (annual)", amount: "₹1,500–₹3,000" },
                { item: "Laboratory / Practical Fee", amount: "₹4,000–₹10,000/yr" },
                { item: "Hostel (if opted)", amount: "₹60,000–₹1,20,000/yr" },
                { item: "Transport (optional)", amount: "₹15,000–₹30,000/yr" },
                { item: "Caution Deposit (refundable)", amount: "₹5,000–₹10,000" },
                { item: "Development / Infrastructure Fee", amount: "₹5,000–₹25,000/yr" },
              ].map(r => (
                <div key={r.item} className="flex justify-between p-2.5 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{r.item}</span>
                  <span className="font-semibold text-gray-900 ml-4 text-right">{r.amount}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Scholarship Note */}
          <section className="bg-green-50 rounded-2xl border border-green-100 p-5">
            <h2 className="font-bold text-green-900 mb-2">💡 Scholarships to Reduce BTech Fees</h2>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• <strong>MahaDBT Scholarship</strong> — Full fee waiver for SC/ST/OBC/EBC students (family income &lt; ₹8L)</li>
              <li>• <strong>EBC Freeship</strong> — Open category students with family income &lt; ₹8L: full tuition waiver</li>
              <li>• <strong>AICTE Pragati Scholarship (Girls)</strong> — ₹50,000/yr for girl students, income &lt; ₹8L</li>
              <li>• <strong>SBI/Bank of Maharashtra Education Loan</strong> — up to ₹20L at 8–9% p.a.</li>
            </ul>
            <Link href="/engineering-colleges-pune-scholarship" className="mt-3 inline-block text-sm font-semibold text-green-800 underline underline-offset-2">
              View All Engineering Scholarships in Pune →
            </Link>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-5">FAQs — BTech Fees in Pune 2026</h2>
            <div className="space-y-0 divide-y divide-gray-100">
              {faqs.map((faq, i) => (
                <details key={faq.question} className="group py-4" open={i === 0}>
                  <summary className="cursor-pointer flex items-start justify-between gap-4 list-none">
                    <h3 className="text-sm font-semibold text-gray-800">{faq.question}</h3>
                    <span className="text-gray-400 shrink-0 text-xs mt-0.5">▾</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">Related Pages</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "BTech Under 5 Lakh", href: "/btech-colleges-in-pune-under-5-lakh" },
                { label: "BTech Under 10 Lakh", href: "/btech-colleges-in-pune-under-10-lakh" },
                { label: "Engineering Scholarships", href: "/engineering-colleges-pune-scholarship" },
                { label: "Low Fees Engineering Pune", href: "/low-fees-engineering-colleges-pune" },
                { label: "Best BTech Colleges", href: "/best-btech-colleges-in-pune" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">{l.label}</Link>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Need Help Comparing BTech Fees in Pune?</h2>
            <p className="text-gray-300 mb-5 text-sm">Free counselling to find the best college in your budget and MHT-CET score range.</p>
            <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg inline-block">Free Counselling →</Link>
          </section>
        </div>
      </div>
    </>
  )
}
