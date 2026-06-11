import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "Colleges in Hinjewadi Pune 2025-26 | IT Park Engineering & MBA Colleges",
  description: "List of colleges in Hinjewadi Pune. Engineering, MBA, BCA and IT colleges near Hinjewadi IT Park. Fees, admission process and courses for 2025-26.",
  path: "/colleges-hinjewadi-pune",
  keywords: ["colleges in hinjewadi pune", "hinjewadi pune colleges", "engineering colleges hinjewadi", "mba colleges hinjewadi pune", "college near hinjewadi it park"],
})

export const revalidate = 300

const areaColleges = [
  { name: "MIT World Peace University (MIT-WPU)", distance: "2 km from Hinjewadi Phase 1", courses: "B.Tech, MBA, MCA, BBA", naac: "A+", slug: "mit-wpu-mit-world-peace-university" },
  { name: "Indira College of Engineering and Management", distance: "3 km from Hinjewadi", courses: "B.Tech, MBA", naac: "A", slug: "coep-college-of-engineering-pune" },
  { name: "Symbiosis Institute of Technology (SIT)", distance: "5 km via Lavale", courses: "B.Tech, M.Tech", naac: "A+", slug: "symbiosis-institute-of-technology-pune" },
  { name: "JSPM's Rajarshi Shahu College of Engineering", distance: "4 km from Hinjewadi", courses: "B.Tech, MBA, MCA", naac: "A", slug: "jspm-rajarshi-shahu-college-engineering-pune" },
  { name: "Pimpri Chinchwad College of Engineering (PCCOE)", distance: "8 km from Hinjewadi", courses: "B.Tech, M.Tech, MBA", naac: "A+", slug: "pccoe-pimpri-chinchwad-college-of-engineering" },
]

const faqs = [
  { question: "Which colleges are near Hinjewadi IT Park Pune?", answer: "MIT World Peace University (MIT-WPU) in Kothrud is the closest major engineering college to Hinjewadi IT Park (2 km). Other nearby colleges include Indira College of Engineering (Parandwadi, 3 km), JSPM RSCOE (4 km), and SIT Lavale (5 km). Hinjewadi is part of Pimpri Chinchwad, so PCCOE is also within 8 km." },
  { question: "Is there any college inside Hinjewadi IT Park?", answer: "There are no degree colleges inside Hinjewadi IT Park itself, but several training institutes and upskilling centers operate within the park. The nearest full-fledged engineering college is MIT-WPU Kothrud at about 2 km from Hinjewadi Phase 1." },
  { question: "Why should I study near Hinjewadi Pune?", answer: "Hinjewadi is Pune's largest IT park housing Infosys, Wipro, TCS, Cognizant, Accenture, Capgemini, and 200+ companies. Engineering and MBA students near Hinjewadi get easy access to industrial visits, internships, and campus placements at top MNCs." },
  { question: "What are the best engineering colleges near Hinjewadi?", answer: "Best engineering colleges near Hinjewadi Pune: MIT-WPU Kothrud (NAAC A+, 2 km), SIT Lavale (NAAC A+, 5 km), JSPM RSCOE Wagholi (NAAC A, 4 km), and PCCOE Akurdi (NAAC A+, 8 km)." },
]

export default function CollegesHinjewadiPune() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges in Hinjewadi Pune", url: "/colleges-hinjewadi-pune" },
  ])
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Colleges in Hinjewadi Pune 2025",
    description: "List of engineering, MBA and IT colleges near Hinjewadi IT Park, Pune",
    numberOfItems: areaColleges.length,
    itemListElement: areaColleges.map((c, i) => ({
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
      <Script id="list-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <div className="bg-surface min-h-screen">
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <Link href="/" className="hover:text-white">Home</Link><span>›</span>
              <Link href="/colleges" className="hover:text-white">Colleges</Link><span>›</span>
              <span className="text-white">Hinjewadi Pune</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Colleges in Hinjewadi Pune 2025-26</h1>
            <p className="text-gray-300 max-w-2xl">Engineering, MBA, and IT colleges near Hinjewadi IT Park — placement advantage from India&apos;s largest IT hub.</p>
            <div className="grid grid-cols-3 gap-4 mt-6 max-w-lg">
              {[{ v: "5+", l: "Nearby Colleges" }, { v: "500+", l: "IT Companies Nearby" }, { v: "₹80K–3.8L", l: "Annual Fees" }].map(s => (
                <div key={s.l} className="text-center">
                  <p className="text-2xl font-bold text-white">{s.v}</p>
                  <p className="text-xs text-gray-400">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

          {/* Area Info */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h2 className="font-bold text-blue-900 mb-2">Why Hinjewadi is Ideal for Engineering Students</h2>
            <p className="text-sm text-blue-800 leading-relaxed">
              Hinjewadi IT Park is Pune&apos;s largest technology park with 500+ companies including Infosys, Wipro, TCS, Cognizant, Accenture and 200+ startups. Engineering and MBA students from nearby colleges benefit from direct campus placements, internships, live projects, and industry guest lectures. The Hinjewadi-Wakad-Balewadi belt is developing rapidly with new metro connectivity (Pune Metro Line 3).
            </p>
          </div>

          {/* Colleges */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Colleges Near Hinjewadi IT Park, Pune</h2>
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
                    <Link href={`/colleges/${col.slug}`} className="hidden md:block shrink-0 text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50">View →</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Links */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Courses Near Hinjewadi Pune</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {[
                { label: "B.Tech near Hinjewadi", href: "/btech-colleges-pune" },
                { label: "MBA near Hinjewadi", href: "/mba-colleges-pune" },
                { label: "MCA near Hinjewadi", href: "/mca-colleges-pune" },
                { label: "BCA near Hinjewadi", href: "/bca-colleges-pune" },
                { label: "BBA near Hinjewadi", href: "/bba-colleges-pune" },
                { label: "M.Tech near Hinjewadi", href: "/mtech-colleges-pune" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors border border-gray-100">
                  <span>🎓</span>{l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">FAQs — Colleges Near Hinjewadi Pune</h2>
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

          {/* Other Areas */}
          <div className="bg-white rounded-xl shadow p-5 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Colleges by Area in Pune</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {[
                { label: "Kothrud", href: "/colleges-kothrud-pune" },
                { label: "Wakad", href: "/colleges-wakad-pune" },
                { label: "Hadapsar", href: "/colleges-hadapsar-pune" },
                { label: "Viman Nagar", href: "/colleges-viman-nagar-pune" },
                { label: "Kharadi", href: "/colleges-kharadi-pune" },
                { label: "Aundh", href: "/colleges-aundh-pune" },
                { label: "Baner", href: "/colleges-baner-pune" },
                { label: "Shivajinagar", href: "/colleges-in-pune" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-white mb-2">Need Help Choosing a College Near Hinjewadi?</h2>
            <p className="text-gray-300 text-sm mb-4">Get free Pune college counselling — find the best fit for your career goals.</p>
            <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors inline-block">
              Free Counselling →
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
