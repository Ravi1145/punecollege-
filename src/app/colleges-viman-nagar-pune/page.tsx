import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "Colleges in Viman Nagar Pune 2025-26 | Engineering, MBA & IT Colleges",
  description: "Colleges in Viman Nagar Pune — engineering, MBA, BBA and IT colleges near Viman Nagar and Nagar Road. Fees, courses and admission 2025-26.",
  path: "/colleges-viman-nagar-pune",
  keywords: ["colleges in viman nagar pune", "viman nagar pune colleges", "college near viman nagar", "engineering college viman nagar pune", "mba college viman nagar"],
})

export const revalidate = 300

const areaColleges = [
  { name: "Army Institute of Technology (AIT)", distance: "3 km from Viman Nagar", courses: "B.Tech, MBA", naac: "A", slug: "army-institute-of-technology-pune" },
  { name: "MAEER's MIT College of Engineering (MITCOE)", distance: "5 km via Nagar Road", courses: "B.Tech, M.Tech, MBA", naac: "A+", slug: "mit-wpu-mit-world-peace-university" },
  { name: "Symbiosis International University", distance: "4 km (Senapati Bapat Rd)", courses: "BBA, MBA, Law, Design", naac: "A++", slug: "symbiosis-institute-of-business-management-sibm" },
  { name: "Zeal College of Engineering", distance: "6 km from Viman Nagar", courses: "B.Tech", naac: "A", slug: "coep-college-of-engineering-pune" },
]

const faqs = [
  { question: "Which colleges are in Viman Nagar Pune?", answer: "Viman Nagar is in East Pune. Nearby colleges include Army Institute of Technology (AIT Dighi, 3 km), Symbiosis Lavale (4 km), MITCOE Kothrud (5 km). Viman Nagar itself is primarily a commercial and residential area with no major college campus inside, but excellent connectivity to East Pune IT corridors." },
  { question: "Is there any engineering college in Viman Nagar Pune?", answer: "Army Institute of Technology (AIT) in Dighi is the closest prestigious engineering college to Viman Nagar at about 3 km. MITCOE and Zeal College are also accessible within 5–6 km. For MBA, Symbiosis Lavale campus is the most prominent in the area." },
  { question: "What is the advantage of studying near Viman Nagar Pune?", answer: "Viman Nagar is close to Kharadi IT Park and Nagar Road industrial corridor. Students enjoy easy connectivity to Pune airport, EON IT Park (Kharadi), and East Pune IT companies. The area has excellent public transport and student housing options." },
]

export default function CollegesVimanNagarPune() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges in Viman Nagar Pune", url: "/colleges-viman-nagar-pune" },
  ])

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-surface min-h-screen">
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link><span>›</span>
              <span className="text-white">Viman Nagar Pune</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Colleges in Viman Nagar Pune 2025-26</h1>
            <p className="text-gray-300 max-w-2xl">Engineering, MBA, and management colleges near Viman Nagar — ideal for East Pune students with access to Kharadi IT Park.</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h2 className="font-bold text-blue-900 mb-2">Viman Nagar — Location Advantage</h2>
            <p className="text-sm text-blue-800 leading-relaxed">Viman Nagar is located in East Pune, close to Pune International Airport, EON IT Park (Kharadi), and Nagar Road industrial corridor. Students in this area have excellent connectivity to IT companies in Kharadi, Viman Nagar, and Hadapsar for internships and placements.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Colleges Near Viman Nagar, Pune</h2>
            <div className="space-y-4">
              {areaColleges.map((col, i) => (
                <div key={col.name} className="bg-white rounded-xl shadow p-5 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                    <div className="flex-1">
                      <Link href={`/colleges/${col.slug}`} className="font-bold text-gray-900 hover:text-blue-700">{col.name}</Link>
                      <div className="flex flex-wrap gap-2 mt-1.5 text-xs">
                        <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">NAAC {col.naac}</span>
                        <span className="bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full">{col.courses}</span>
                        <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">📍 {col.distance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">FAQs — Colleges Near Viman Nagar</h2>
            <div className="space-y-3">
              {faqs.map(faq => (
                <details key={faq.question} className="group border-b border-gray-100 pb-3 last:border-0">
                  <summary className="cursor-pointer font-medium text-gray-800 text-sm flex justify-between items-center">
                    {faq.question}
                    <span className="text-gray-400 group-open:rotate-180 shrink-0 ml-2">▾</span>
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Explore Other Pune Areas</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                { label: "Hinjewadi", href: "/colleges-hinjewadi-pune" },
                { label: "Kothrud", href: "/colleges-kothrud-pune" },
                { label: "Wakad", href: "/colleges-wakad-pune" },
                { label: "Hadapsar", href: "/colleges-hadapsar-pune" },
                { label: "Kharadi", href: "/colleges-kharadi-pune" },
                { label: "Aundh", href: "/colleges-aundh-pune" },
                { label: "Baner", href: "/colleges-baner-pune" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Need Help Finding a College?</h2>
            <p className="text-gray-300 text-sm mb-4">Free Pune college counselling — personalised in 15 minutes.</p>
            <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors inline-block">Free Counselling →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
