import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateCollegeListSchema } from "@/lib/seo"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "SPPU Affiliated Colleges in Pune 2026 | Savitribai Phule Pune University Colleges",
  description: "Complete list of Savitribai Phule Pune University (SPPU) affiliated colleges in Pune 2026. Engineering, MBA, Medical, Arts & Science colleges under SPPU. Fees, NAAC grades & admission details.",
  path: "/sppu-affiliated-colleges-pune",
  keywords: [
    "sppu affiliated colleges pune 2026", "savitribai phule pune university colleges",
    "pune university affiliated colleges list", "sppu engineering colleges pune",
    "sppu mba colleges pune", "sppu college list 2026", "pune university college admission",
    "sppu arts science colleges pune", "best sppu affiliated college pune",
  ],
})

const categories = [
  {
    stream: "Engineering",
    colleges: [
      { name: "COEP Technological University", slug: "coep-college-of-engineering-pune", nirf: 49, naac: "A+", note: "Autonomous — SPPU affiliated" },
      { name: "PICT Pune", slug: "pict-pune-institute-of-computer-technology", nirf: null, naac: "A", note: "Autonomous" },
      { name: "VIT Pune", slug: "vit-pune-vishwakarma-institute-of-technology", nirf: 101, naac: "A+", note: "Autonomous" },
      { name: "JSPM RSCOE", slug: "jspm-rscoe-rajarshi-shahu-college-of-engineering", nirf: null, naac: "A", note: "SPPU Affiliated" },
    ],
  },
  {
    stream: "MBA / Management",
    colleges: [
      { name: "PUMBA (Pune University MBA)", slug: "pumba-pune-university-mba", nirf: null, naac: "A", note: "University Dept." },
      { name: "Indira College of Engineering & Management", slug: "indira-college-of-engineering-management-pune", nirf: null, naac: "B++", note: "SPPU Affiliated" },
    ],
  },
  {
    stream: "Arts, Science & Commerce",
    colleges: [
      { name: "Fergusson College", slug: "fergusson-college-pune", nirf: null, naac: "A+", note: "Autonomous" },
      { name: "SP College", slug: "sp-college-pune", nirf: null, naac: "A+", note: "Autonomous" },
      { name: "Garware College of Commerce", slug: "garware-college-of-commerce-pune", nirf: null, naac: "A", note: "SPPU Affiliated" },
      { name: "Modern College Pune", slug: "modern-college-pune", nirf: null, naac: "A", note: "Autonomous" },
    ],
  },
]

const allColleges = categories.flatMap(c => c.colleges)

const faqs = [
  { question: "What is SPPU and which colleges are affiliated to it?", answer: "SPPU (Savitribai Phule Pune University), formerly Pune University, is the main university in Pune. It has 800+ affiliated colleges in Pune, Nashik, Ahmednagar, and Kolhapur districts. Top SPPU colleges in Pune: COEP (NIRF #49), VIT Pune (NIRF #101), PICT, Fergusson College, SP College, JSPM RSCOE." },
  { question: "Is COEP affiliated to SPPU?", answer: "COEP Technological University was formerly affiliated to SPPU but is now an autonomous deemed-to-be university (COEP-TU) under the Government of Maharashtra. Similarly, VIT Pune, PICT, and Fergusson College are 'autonomous' under SPPU, meaning they design their own curriculum but degrees are awarded by SPPU." },
  { question: "Which is the best SPPU affiliated college in Pune?", answer: "Among SPPU-affiliated/autonomous colleges, COEP (NIRF #49) is the best engineering college, PUMBA is the best for MBA, and Fergusson College is the best for Arts & Science. For BCom, Garware College is top-ranked. All these hold NAAC A or A+ accreditation." },
  { question: "How to apply for SPPU affiliated colleges in Pune 2026?", answer: "SPPU engineering college admissions are through MHT-CET CAP rounds via DTE Maharashtra (July 2026). For Arts/Science/Commerce, apply directly to the college (merit-based, June–July 2026). For MBA, MAH-MBA-CET or CAT scores are used (CAP counselling in September 2026). All applications are online." },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "Colleges", url: "/colleges" },
  { name: "SPPU Affiliated Colleges Pune", url: "/sppu-affiliated-colleges-pune" },
]

export default function SPPUAffiliatedColleges() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  const itemListSchema = generateCollegeListSchema(
    allColleges.map(c => ({ name: c.name, slug: c.slug })),
    "SPPU Affiliated Colleges in Pune 2026"
  )

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-[#0A1628] to-purple-900 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link><span>›</span>
              <span className="text-white">SPPU Affiliated Colleges</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">SPPU Affiliated Colleges in Pune 2026</h1>
            <p className="text-purple-100 text-lg max-w-3xl mb-5">
              Complete guide to Savitribai Phule Pune University (SPPU) affiliated and autonomous colleges in Pune for 2026 admissions — Engineering, MBA, Medical, Arts, Science and Commerce streams.
            </p>
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-3xl" data-speakable="true">
              <p className="text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">⚡ Quick Answer</p>
              <p className="text-white text-sm leading-relaxed">
                <strong>SPPU (Savitribai Phule Pune University)</strong> has 800+ affiliated colleges. Top autonomous colleges: <strong>COEP</strong> (Engineering, NIRF #49), <strong>Fergusson College</strong> (Arts/Science, NAAC A+), <strong>PUMBA</strong> (MBA). Admissions via MHT-CET CAP (Engineering) or merit-based (Arts/Commerce).
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
          {categories.map((cat) => (
            <section key={cat.stream} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                <h2 className="font-bold text-gray-800">{cat.stream} — SPPU Colleges</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {cat.colleges.map((c) => (
                  <div key={c.name} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50">
                    <div className="flex-1">
                      <Link href={`/colleges/${c.slug}`} className="font-semibold text-gray-900 hover:text-purple-700">{c.name}</Link>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">NAAC {c.naac}</span>
                        {c.nirf && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">NIRF #{c.nirf}</span>}
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c.note}</span>
                      </div>
                    </div>
                    <Link href={`/colleges/${c.slug}`} className="text-xs text-purple-600 hover:underline shrink-0">View →</Link>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">FAQs — SPPU Affiliated Colleges Pune</h2>
            <div className="space-y-3">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="border border-gray-100 rounded-xl p-4">
                  <summary className="font-semibold text-gray-800 cursor-pointer">{question}</summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Engineering Colleges Pune", href: "/engineering-colleges-pune" },
                { label: "Government Colleges Pune", href: "/government-colleges-pune" },
                { label: "MBA Colleges Pune", href: "/mba-colleges-pune" },
                { label: "MHT-CET Colleges Pune", href: "/mht-cet-colleges-pune" },
                { label: "All Colleges Pune", href: "/colleges" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-4 py-2 rounded-full border border-purple-200 text-purple-700 text-sm hover:bg-purple-50">{l.label}</Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
