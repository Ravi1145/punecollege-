import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { colleges } from "@/data/colleges"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateHowToSchema } from "@/lib/seo"

export function generateStaticParams() {
  return colleges.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const col = colleges.find(c => c.slug === slug)
  if (!col) return {}
  return genMeta({
    title: `${col.name} Admission 2025-26 | Process, Eligibility & Dates`,
    description: `${col.name} admission 2025-26: Eligibility criteria, application process, important dates, and direct admission options for ${col.courses.join(", ")}. Via ${col.entranceExams.join(", ")}.`,
    path: `/colleges/${slug}/admission`,
    keywords: [`${col.shortName} admission`, `${col.name} admission 2025`, `${col.shortName} application form`, `${col.shortName} eligibility`, `how to get admission in ${col.shortName}`],
  })
}

export const revalidate = 3600

export default async function CollegeAdmission({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const col = colleges.find(c => c.slug === slug)
  if (!col) notFound()

  const steps = col.entranceExams.includes("MHT-CET") ? [
    { step: 1, title: "Appear in MHT-CET / JEE Main", description: `Register and appear for MHT-CET (for state seats) or JEE Main (for management quota). MHT-CET is conducted in April–May each year. Score determines your eligibility for ${col.name}.` },
    { step: 2, title: "Register on DTE Maharashtra Portal", description: "After MHT-CET results, register on the official DTE Maharashtra CAP (Centralized Admission Process) portal. Upload documents: marksheets, caste certificate, domicile, income certificate." },
    { step: 3, title: "Fill College Preferences", description: `Add ${col.name} as your preferred college in the online option form. You can add up to 300 college-branch combinations in order of preference.` },
    { step: 4, title: "Attend CAP Rounds", description: `Seat allotment is done in 3 CAP rounds. If you get ${col.name} in your round, pay the seat acceptance fee (typically ₹15,000–₹25,000) to confirm the seat.` },
    { step: 5, title: "Report to College", description: `Visit ${col.name} with original documents for document verification. Pay the remaining semester fees and complete the admission formalities. Classes typically begin in late July/early August.` },
  ] : [
    { step: 1, title: "Check Eligibility", description: `Ensure you meet the minimum eligibility: 10+2/equivalent with required subjects and minimum 50% marks (45% for reserved categories). Check ${col.name}'s specific requirements.` },
    { step: 2, title: "Apply Online", description: `Visit the official ${col.name} website and fill the online application form. Upload required documents and pay the application fee (₹500–₹2,000).` },
    { step: 3, title: "Entrance Test / GD-PI", description: `Appear for the college's own entrance test or submit ${col.entranceExams.join("/")} scores. Top MBA colleges also conduct GD (Group Discussion) and PI (Personal Interview).` },
    { step: 4, title: "Merit/Selection List", description: `${col.name} releases a merit list based on entrance scores, academic performance, and GD-PI. Check the list on the official website.` },
    { step: 5, title: "Fee Payment & Enrollment", description: `Selected candidates must pay the first semester fees within the stipulated date. Submit original certificates for verification and complete enrollment formalities.` },
  ]

  const faqs = [
    { question: `What is the admission process for ${col.name}?`, answer: `Admission to ${col.name} is primarily through ${col.entranceExams.join(", ")}. For engineering branches, admission is via DTE Maharashtra's CAP (Centralized Admission Process) based on MHT-CET percentile. Management quota seats may be available through direct admission.` },
    { question: `What is the eligibility criteria for ${col.name}?`, answer: `For B.Tech at ${col.name}: 10+2 with Physics, Chemistry, Mathematics (PCM) with minimum 50% aggregate (45% for reserved categories). For MBA: Bachelor's degree with minimum 50% marks. Entrance exam qualification is mandatory.` },
    { question: `Does ${col.name} offer direct admission?`, answer: `${col.name} offers limited seats under management quota for direct admission without MHT-CET. These seats are available at a higher fee. Contact the admissions office directly for management quota availability.` },
    { question: `When does ${col.name} start the admission process for 2025-26?`, answer: `${col.name} begins the admission process after MHT-CET results (July 2025). The CAP process runs July–August 2025. Direct admission enquiries can be made from April onwards.` },
  ]

  const howToSchema = generateHowToSchema(`Get Admission in ${col.name} 2025`, steps)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges", url: "/colleges" },
    { name: col.name, url: `/colleges/${col.slug}` },
    { name: "Admission", url: `/colleges/${col.slug}/admission` },
  ])

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />

      <div className="bg-surface min-h-screen">
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-3">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link><span>›</span>
              <Link href={`/colleges/${col.slug}`} className="hover:text-white">{col.shortName}</Link><span>›</span>
              <span className="text-white">Admission</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white mb-2">{col.name} Admission 2025-26</h1>
            <p className="text-gray-300 text-sm">Process, eligibility, important dates & direct admission options</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Sub-nav */}
          <div className="flex gap-2 flex-wrap text-sm">
            {["Overview", "Fees", "Placements", "Cutoff", "Admission", "Scholarship"].map(tab => (
              <Link key={tab} href={tab === "Overview" ? `/colleges/${col.slug}` : `/colleges/${col.slug}/${tab.toLowerCase()}`}
                className={`px-4 py-2 rounded-full border transition-colors ${tab === "Admission" ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"}`}>
                {tab}
              </Link>
            ))}
          </div>

          {/* Eligibility */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Eligibility Criteria 2025-26</h2>
            <div className="space-y-3">
              {col.courses.map(course => (
                <div key={course} className="flex gap-4 p-3 bg-gray-50 rounded-lg text-sm">
                  <span className="font-semibold text-blue-700 min-w-[60px]">{course}</span>
                  <span className="text-gray-700">
                    {course === "B.Tech" ? "10+2 with PCM, min 50% aggregate (45% reserved). MHT-CET / JEE Main qualification." :
                     course === "M.Tech" ? "B.Tech/BE in relevant branch, min 50%. GATE score preferred." :
                     course === "MBA" ? "Any bachelor's degree, min 50%. MAH-CET MBA / CAT / CMAT score required." :
                     course === "MCA" ? "BCA/BSc (CS/IT)/B.Tech, min 50%. MAH-MCA-CET score required." :
                     course === "PhD" ? "Master's degree in relevant field, min 55%. Entrance test + interview." :
                     `Bachelor's in relevant stream, min 50%. Entrance exam as applicable.`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-step process */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Step-by-Step Admission Process</h2>
            <div className="space-y-4">
              {steps.map(s => (
                <div key={s.step} className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">{s.step}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">{s.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Dates */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Important Dates 2025-26</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-left">
                    <th className="px-4 py-2 font-semibold">Event</th>
                    <th className="px-4 py-2 font-semibold">Expected Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { event: "MHT-CET 2025 Exam", date: "April–May 2025" },
                    { event: "MHT-CET Result", date: "June–July 2025" },
                    { event: "CAP Round 1 Registration", date: "July 2025" },
                    { event: "CAP Round 1 Allotment", date: "Late July 2025" },
                    { event: "CAP Round 2 Allotment", date: "August 2025" },
                    { event: "Direct Admission / Spot Admission", date: "August 2025" },
                    { event: "Classes Begin", date: "August 2025" },
                  ].map((r, i) => (
                    <tr key={r.event} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                      <td className="px-4 py-2.5 text-gray-700">{r.event}</td>
                      <td className="px-4 py-2.5 font-semibold text-blue-700">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">FAQs — {col.shortName} Admission 2025</h2>
            <div className="space-y-3">
              {faqs.map(faq => (
                <details key={faq.question} className="group border-b border-gray-100 pb-3 last:border-0">
                  <summary className="cursor-pointer font-medium text-gray-800 text-sm flex justify-between items-center">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2">▾</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Need Help Getting Into {col.shortName}?</h2>
            <p className="text-gray-300 text-sm mb-4">Our counsellors know the exact admission process. Get free guidance today.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
                Free Counselling
              </Link>
              <Link href={`/colleges/${col.slug}/cutoff`} className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
                View Cutoffs →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
