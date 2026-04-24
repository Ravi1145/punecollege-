import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { exams } from "@/data/exams"
import { colleges } from "@/data/colleges"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { Calendar, Clock, Globe, Users, BookOpen, GraduationCap, ArrowRight } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return exams.map(e => ({ slug: e.name.toLowerCase().replace(/\s+/g, "-") }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const exam = exams.find(e => e.name.toLowerCase().replace(/\s+/g, "-") === slug)
  if (!exam) return {}
  return genMeta({
    title: `${exam.name} 2026 — Dates, Eligibility & Colleges | CollegePune`,
    description: `${exam.fullName} (${exam.name}) 2026: Application date ${exam.applicationDate}, Exam date ${exam.examDate}. Eligibility, syllabus overview, and top Maharashtra colleges accepting ${exam.name}.`,
    path: `/exams/${slug}`,
  })
}

export default async function ExamDetailPage({ params }: Props) {
  const { slug } = await params
  const exam = exams.find(e => e.name.toLowerCase().replace(/\s+/g, "-") === slug)
  if (!exam) notFound()

  // Colleges accepting this exam
  const acceptingColleges = colleges
    .filter(c => c.entranceExams?.some(ex => ex.toLowerCase().includes(exam.name.toLowerCase())))
    .slice(0, 8)

  const faqs = [
    { question: `What is ${exam.name}?`, answer: exam.description },
    { question: `What are the eligibility criteria for ${exam.name}?`, answer: exam.eligibility },
    { question: `When is the ${exam.name} 2026 exam date?`, answer: `The ${exam.name} 2026 exam is scheduled for ${exam.examDate}. Applications open ${exam.applicationDate}.` },
    { question: `Who conducts ${exam.name}?`, answer: `${exam.name} (${exam.fullName}) is conducted by ${exam.conductedBy}.` },
    { question: `Which Pune colleges accept ${exam.name} scores?`, answer: `Top Pune colleges accepting ${exam.name}: ${acceptingColleges.map(c => c.name).join(", ")}.` },
  ]

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Exams", url: "/exams" },
    { name: exam.name, url: `/exams/${slug}` },
  ]

  const levelColor = {
    National: "bg-blue-100 text-blue-700",
    State:    "bg-green-100 text-green-700",
    University:"bg-orange-100 text-orange-700",
  }[exam.level] ?? "bg-gray-100 text-gray-700"

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-[#0A1628] text-white">
          <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-blue-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/exams" className="hover:text-white transition-colors">Exams</Link>
              <span>/</span>
              <span className="text-white">{exam.name}</span>
            </nav>

            <div className="flex flex-wrap items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${levelColor}`}>
                    {exam.level} Level
                  </span>
                  {exam.streams.map(s => (
                    <span key={s} className="px-2.5 py-1 bg-white/10 rounded-full text-xs text-blue-200">{s}</span>
                  ))}
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold mb-2">{exam.name} 2026</h1>
                <p className="text-blue-200 text-base">{exam.fullName}</p>
                <p className="text-xs text-blue-300 mt-1">Conducted by: {exam.conductedBy}</p>
              </div>
              <a
                href={exam.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
              >
                <Globe className="w-4 h-4" />
                Official Website
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-orange-500" /> About {exam.name}
                </h2>
                <p className="text-gray-700 leading-relaxed">{exam.description}</p>
              </section>

              {/* Eligibility */}
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-orange-500" /> Eligibility Criteria
                </h2>
                <p className="text-gray-700 leading-relaxed">{exam.eligibility}</p>
              </section>

              {/* Accepting Colleges */}
              {acceptingColleges.length > 0 && (
                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-500" />
                    Pune Colleges Accepting {exam.name}
                  </h2>
                  <div className="space-y-3">
                    {acceptingColleges.map(c => (
                      <Link
                        key={c.slug}
                        href={`/colleges/${c.slug}`}
                        className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50 transition-all group"
                      >
                        <div>
                          <p className="font-semibold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">{c.name}</p>
                          <p className="text-xs text-gray-500">{c.type} · {c.location} · NAAC {c.naac}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-semibold text-gray-700">
                            ₹{(c.feesRange.min / 100000).toFixed(1)}L – {(c.feesRange.max / 100000).toFixed(1)}L/yr
                          </p>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 transition-colors ml-auto mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/colleges?exam=${exam.name}`}
                    className="mt-4 flex items-center gap-1 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
                  >
                    View all colleges accepting {exam.name} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </section>
              )}

              {/* FAQs */}
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
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
              {/* Key Dates */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-500" /> Key Dates 2026
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Application Period</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{exam.applicationDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Exam Date</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{exam.examDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Result Date</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{exam.resultDate}</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Need Admission Help?</h3>
                <p className="text-orange-100 text-sm mb-4">
                  Get free counseling for {exam.name} admissions in Pune from our expert team.
                </p>
                <Link
                  href="/counselling"
                  className="block text-center bg-white text-orange-600 font-bold text-sm rounded-xl py-2.5 hover:bg-orange-50 transition-colors"
                >
                  Book Free Counselling
                </Link>
              </div>

              {/* Other Exams */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" /> Other Exams
                </h3>
                <div className="space-y-2">
                  {exams.filter(e => e.name !== exam.name).slice(0, 5).map(e => (
                    <Link
                      key={e.name}
                      href={`/exams/${e.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 hover:text-orange-500 transition-colors group"
                    >
                      <div>
                        <span className="text-sm font-semibold text-gray-800 group-hover:text-orange-500 transition-colors">{e.name}</span>
                        <p className="text-xs text-gray-400">{e.level}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-orange-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
