import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { colleges } from "@/data/colleges"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { getCityPage } from "@/lib/db"
import { MapPin, GraduationCap, ArrowRight, Star, Building } from "lucide-react"

const VALID_CITIES  = ["pune", "mumbai", "nagpur", "nashik", "aurangabad", "kolhapur", "solapur", "amravati", "thane", "navi-mumbai"]
const VALID_STREAMS = ["engineering", "mba", "medical", "law", "arts-science", "management", "architecture", "commerce"]

const STREAM_LABELS: Record<string, string> = {
  engineering:   "Engineering",
  mba:           "MBA",
  medical:       "Medical",
  law:           "Law",
  "arts-science": "Arts & Science",
  management:    "Management",
  architecture:  "Architecture",
  commerce:      "Commerce",
}

interface Props {
  params: Promise<{ city: string; stream: string }>
}

export async function generateStaticParams() {
  const params: { city: string; stream: string }[] = []
  // Pre-generate Pune pages at build time
  for (const stream of VALID_STREAMS) {
    params.push({ city: "pune", stream })
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, stream } = await params
  const cityLabel   = city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, " ")
  const streamLabel = STREAM_LABELS[stream] ?? stream
  return genMeta({
    title: `Best ${streamLabel} Colleges in ${cityLabel} 2026 — Fees, Cutoff & Admissions | CollegePune`,
    description: `Explore top ${streamLabel} colleges in ${cityLabel}, Maharashtra. Compare fees, NAAC grades, placements and get free counseling. Updated 2026.`,
    path: `/city/${city}/${stream}`,
  })
}

export default async function CityStreamPage({ params }: Props) {
  const { city, stream } = await params

  if (!VALID_CITIES.includes(city) || !VALID_STREAMS.includes(stream)) {
    notFound()
  }

  const cityLabel   = city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, " ")
  const streamLabel = STREAM_LABELS[stream] ?? stream

  // Get AI-generated page content from DB (if exists)
  let pageContent: {
    title?: string; intro?: string;
    faqs?: { q: string; a: string }[]
    cta_text?: string
    meta_title?: string; meta_desc?: string
  } | null = null

  try {
    pageContent = await getCityPage(city, stream.replace(/-/g, " "))
  } catch {
    // Fall through to default content if DB not connected
  }

  // Filter colleges from hardcoded data for this city/stream
  const cityColleges = colleges
    .filter(c =>
      c.location?.toLowerCase().includes(cityLabel.toLowerCase()) &&
      (stream === "mba"         ? c.stream === "MBA"         :
       stream === "medical"     ? c.stream === "Medical"     :
       stream === "engineering" ? c.stream === "Engineering" :
       stream === "law"         ? c.stream === "Law"         :
       stream === "architecture"? c.stream === "Architecture":
       true)
    )
    .slice(0, 12)

  const defaultFaqs: { question: string; answer: string }[] = [
    { question: `Which is the best ${streamLabel} college in ${cityLabel}?`, answer: `${cityColleges[0]?.name ?? cityLabel} is among the top ${streamLabel} colleges in ${cityLabel}. Top institutions are ranked by NAAC grade, NIRF ranking, and placement statistics.` },
    { question: `What is the fee range for ${streamLabel} in ${cityLabel}?`, answer: `${streamLabel} college fees in ${cityLabel} range from ₹80,000 to ₹3,00,000 per year depending on whether it is a government or private institution.` },
    { question: `What entrance exams are required for ${streamLabel} in ${cityLabel}?`, answer: stream === "engineering" ? "MHT-CET and JEE Main are the primary entrance exams for engineering colleges in Maharashtra." : stream === "mba" ? "CAT, SNAP, MAT, CMAT, and XAT scores are accepted by MBA colleges." : stream === "medical" ? "NEET is mandatory for all medical colleges in India." : "Entrance requirements vary by college and course." },
    { question: `Is hostel facility available in ${cityLabel} ${streamLabel} colleges?`, answer: `Most ${streamLabel} colleges in ${cityLabel} offer hostel facilities for outstation students. Hostel fees typically range from ₹60,000 to ₹1,20,000 per year.` },
    { question: `What is the placement scenario for ${streamLabel} colleges in ${cityLabel}?`, answer: `${streamLabel} colleges in ${cityLabel} have strong industry connections. Average placement packages range from ₹5 LPA to ₹15 LPA depending on the college and specialization.` },
  ]

  const faqs: { question: string; answer: string }[] = pageContent?.faqs?.length
    ? pageContent.faqs.map(f => ({ question: f.q, answer: f.a }))
    : defaultFaqs

  const breadcrumbs = [
    { name: "Home",   url: "/" },
    { name: "Colleges", url: "/colleges" },
    { name: `${streamLabel} in ${cityLabel}`, url: `/city/${city}/${stream}` },
  ]

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-[#0A1628] text-white">
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
            <nav className="flex items-center gap-2 text-xs text-blue-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link>
              <span>/</span>
              <span className="text-white">{streamLabel} in {cityLabel}</span>
            </nav>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">{cityLabel}, Maharashtra</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-3">
              Best {streamLabel} Colleges in {cityLabel} 2026
            </h1>
            <p className="text-blue-200 text-base max-w-2xl">
              {pageContent?.intro?.slice(0, 200) ??
                `Explore top ${streamLabel} colleges in ${cityLabel} with fees, NAAC grades, placements, and admission details. Compare colleges and get free counseling.`}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              {/* Intro */}
              {pageContent?.intro && (
                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-3">
                    About {streamLabel} Colleges in {cityLabel}
                  </h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                    {pageContent.intro}
                  </div>
                </section>
              )}

              {/* College List */}
              <section>
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building className="w-4 h-4 text-orange-500" />
                  Top {streamLabel} Colleges in {cityLabel}
                </h2>

                {cityColleges.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                    <p className="text-gray-500 text-sm">
                      We're adding {streamLabel} colleges in {cityLabel} soon.{" "}
                      <Link href="/colleges" className="text-orange-500 hover:underline">
                        Browse all colleges
                      </Link>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cityColleges.map((college, index) => (
                      <Link
                        key={college.slug}
                        href={`/colleges/${college.slug}`}
                        className="block bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-orange-200 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                              {college.naac && (
                                <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded">
                                  NAAC {college.naac}
                                </span>
                              )}
                              {college.type && (
                                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded capitalize">
                                  {college.type}
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-gray-900 text-base group-hover:text-orange-600 transition-colors">
                              {college.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">{college.location}</p>

                            <div className="flex items-center gap-4 mt-2.5">
                              {college.feesRange && (
                                <div>
                                  <p className="text-[10px] text-gray-400 uppercase font-medium">Annual Fees</p>
                                  <p className="text-sm font-semibold text-gray-800">
                                    ₹{(college.feesRange.min / 100000).toFixed(1)}L – ₹{(college.feesRange.max / 100000).toFixed(1)}L
                                  </p>
                                </div>
                              )}
                              {college.avgPlacement > 0 && (
                                <div>
                                  <p className="text-[10px] text-gray-400 uppercase font-medium">Avg Package</p>
                                  <p className="text-sm font-semibold text-gray-800">
                                    ₹{(college.avgPlacement / 100000).toFixed(1)} LPA
                                  </p>
                                </div>
                              )}
                              {college.rating > 0 && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                  <span className="text-sm font-semibold text-gray-800">{college.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>

              {/* FAQs */}
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-orange-500" />
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{faq.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-gray-500">Colleges Listed</span>
                    <span className="text-sm font-bold text-gray-900">{cityColleges.length}+</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-gray-500">City</span>
                    <span className="text-sm font-bold text-gray-900">{cityLabel}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-gray-500">Stream</span>
                    <span className="text-sm font-bold text-gray-900">{streamLabel}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-gray-500">State</span>
                    <span className="text-sm font-bold text-gray-900">Maharashtra</span>
                  </div>
                </div>
              </div>

              {/* Lead Capture CTA */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Free Admission Counseling</h3>
                <p className="text-orange-100 text-sm mb-4">
                  {pageContent?.cta_text ?? `Get personalized guidance for ${streamLabel} admissions in ${cityLabel}.`}
                </p>
                <Link
                  href="/counselling"
                  className="block text-center bg-white text-orange-600 font-bold text-sm rounded-xl py-2.5 hover:bg-orange-50 transition-colors"
                >
                  Book Free Counselling
                </Link>
              </div>

              {/* Explore other cities */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-3">Other Cities</h3>
                <div className="space-y-1.5">
                  {["pune", "mumbai", "nagpur", "nashik", "aurangabad"]
                    .filter(c => c !== city)
                    .map(c => (
                      <Link
                        key={c}
                        href={`/city/${c}/${stream}`}
                        className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:text-orange-500 transition-colors group text-sm"
                      >
                        <span className="text-gray-700 group-hover:text-orange-500 capitalize">{c.replace(/-/g, " ")}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-orange-400" />
                      </Link>
                    ))
                  }
                </div>
              </div>

              {/* Explore other streams */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-3">Other Streams in {cityLabel}</h3>
                <div className="space-y-1.5">
                  {Object.entries(STREAM_LABELS)
                    .filter(([s]) => s !== stream)
                    .slice(0, 5)
                    .map(([s, label]) => (
                      <Link
                        key={s}
                        href={`/city/${city}/${s}`}
                        className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:text-orange-500 transition-colors group text-sm"
                      >
                        <span className="text-gray-700 group-hover:text-orange-500">{label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-orange-400" />
                      </Link>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
