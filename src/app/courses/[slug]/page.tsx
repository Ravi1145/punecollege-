import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { courses, getCourseBySlug } from "@/data/courses"
import { colleges } from "@/data/colleges"
import { generateMetadata as genMeta } from "@/lib/seo"
import { formatFeesRange, formatCurrency } from "@/lib/utils"
import { Clock, TrendingUp, BookOpen, ChevronRight, GraduationCap, Briefcase } from "lucide-react"
import CollegeCard from "@/components/colleges/CollegeCard"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = getCourseBySlug(slug)
  if (!course) return {}
  return genMeta({
    title: `${course.fullName} in Pune 2025 — Fees, Top Colleges & Salary`,
    description: `${course.fullName} in Pune: ${course.duration} ${course.level} program. Fees: ${formatFeesRange(course.avgFees.min, course.avgFees.max)}. Average salary: ${formatCurrency(course.avgSalary)}. Top colleges: ${course.topColleges.slice(0, 3).join(", ")}.`,
    path: `/courses/${slug}`,
    keywords: [`${course.name} in pune`, `${course.fullName.toLowerCase()}`, `${course.name.toLowerCase()} colleges pune`, "courses in pune"],
  })
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params
  const course = getCourseBySlug(slug)
  if (!course) notFound()

  const topColleges = colleges.filter((c) =>
    course.topColleges.some((tc) => c.shortName.toLowerCase().includes(tc.toLowerCase()) || tc.toLowerCase().includes(c.shortName.toLowerCase()))
  ).slice(0, 3)

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/courses" className="hover:text-orange-600">Courses</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{course.name} in Pune</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Hero */}
            <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] rounded-2xl p-7 text-white">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{course.fullName}</h1>
                  <p className="text-gray-400 mt-1">{course.stream} · {course.level} · {course.duration}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
                {[
                  { label: "Duration", value: course.duration },
                  { label: "Avg Annual Fees", value: formatFeesRange(course.avgFees.min, course.avgFees.max) },
                  { label: "Avg Starting Salary", value: formatCurrency(course.avgSalary) },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/10 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">{label}</p>
                    <p className="text-sm font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About {course.name} in Pune</h2>
              <p className="text-gray-600 leading-relaxed">{course.description}</p>
            </section>

            {/* Eligibility */}
            <section className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Eligibility Criteria</h2>
              <p className="text-gray-600 text-sm">{course.eligibility}</p>
            </section>

            {/* Entrance Exams */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Entrance Exams</h2>
              <div className="flex flex-wrap gap-2">
                {course.entranceExams.map((exam) => (
                  <Link key={exam} href="/exams" className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                    {exam}
                  </Link>
                ))}
              </div>
            </section>

            {/* Career Options */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Career Options After {course.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {course.careerOptions.map((career) => (
                  <div key={career} className="bg-white border border-gray-100 rounded-xl p-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{career}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Subjects */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Key Subjects</h2>
              <div className="flex flex-wrap gap-2">
                {course.subjects.map((subject) => (
                  <span key={subject} className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-lg">
                    {subject}
                  </span>
                ))}
              </div>
            </section>

            {/* Top Colleges */}
            {topColleges.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Top Colleges Offering {course.name} in Pune</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topColleges.map((college) => (
                    <CollegeCard key={college.id} college={college} />
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/colleges" className="text-orange-600 hover:text-orange-700 font-semibold text-sm">
                    View all colleges offering {course.name} →
                  </Link>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3">
                {[
                  { label: "Level", value: course.level },
                  { label: "Duration", value: course.duration },
                  { label: "Stream", value: course.stream },
                  { label: "Annual Fees", value: formatFeesRange(course.avgFees.min, course.avgFees.max) },
                  { label: "Avg Starting Salary", value: formatCurrency(course.avgSalary) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-2">
                    <span className="text-sm text-gray-500">{label}</span>
                    <span className="text-sm font-semibold text-gray-800 text-right">{value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-3">
                <Link
                  href="/ai-finder"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-center text-sm transition-colors block"
                >
                  Find Best Colleges with AI
                </Link>
                <Link
                  href="/colleges"
                  className="w-full bg-[#0A1628] hover:bg-[#1E3A5F] text-white font-semibold py-3 rounded-xl text-center text-sm transition-colors block"
                >
                  Browse All Pune Colleges
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
