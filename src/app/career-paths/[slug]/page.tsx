import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { generateMetadata as genMeta } from "@/lib/seo"
import { careerPaths, getCareerPath } from "@/data/careerPaths"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return careerPaths.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const path = getCareerPath(slug)
  if (!path) return {}
  return genMeta({
    title: `${path.title} Career Path 2026 — Salary, Roadmap & Pune Colleges`,
    description: `Complete ${path.title} career guide: entry salary ₹${path.avgSalaryEntry}L → senior ₹${path.avgSalarySenior}L PA. Step-by-step roadmap, top recruiters, required courses, and best Pune colleges. Free career guidance.`,
    path: `/career-paths/${slug}`,
    keywords: [`${path.title.toLowerCase()} career path`, `${path.title.toLowerCase()} salary india`, `${path.title.toLowerCase()} courses pune`, `career in ${path.title.toLowerCase()}`],
  })
}

export const revalidate = 3600

function SalaryBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`${color} rounded-2xl p-4 text-center`}>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-extrabold text-lg">{value}</p>
    </div>
  )
}

export default async function CareerPathDetailPage({ params }: Props) {
  const { slug } = await params
  const path = getCareerPath(slug)
  if (!path) notFound()

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1A2E4A] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-blue-300 mb-4 flex gap-1 items-center flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <Link href="/career-paths" className="hover:text-white">Career Paths</Link>
            <span>›</span>
            <span className="text-white">{path.title}</span>
          </nav>
          <div className="flex items-start gap-4">
            <span className="text-4xl sm:text-5xl">{path.icon}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">{path.title} — Career Path</h1>
              <p className="text-gray-300 text-base max-w-2xl">{path.tagline}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${path.growth === "Very High" ? "bg-green-500/20 text-green-300" : "bg-blue-500/20 text-blue-300"}`}>
                  {path.growth} growth
                </span>
                <span className="text-xs bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full font-semibold">{path.demand} demand</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Salary overview */}
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">💰 Salary Journey</h2>
          <div className="grid grid-cols-3 gap-4">
            <SalaryBadge label="Entry Level" value={`₹${path.avgSalaryEntry}L PA`} color="bg-green-50" />
            <SalaryBadge label="5 Years" value={`₹${path.avgSalaryMid}L PA`} color="bg-blue-50" />
            <SalaryBadge label="Senior (10yr+)" value={`₹${path.avgSalarySenior}L PA`} color="bg-purple-50" />
          </div>
        </div>

        {/* Career Roadmap */}
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-4">🗺️ Step-by-Step Roadmap</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-orange-100"></div>
            <div className="space-y-4">
              {path.roadmap.map((step, idx) => (
                <div key={idx} className="relative pl-10">
                  <div className="absolute left-2.5 top-3 w-3 h-3 bg-orange-500 rounded-full border-2 border-white shadow"></div>
                  <div className="bg-white rounded-2xl border border-gray-100 p-4">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">{step.year}</span>
                      <h3 className="font-extrabold text-gray-900 text-sm">{step.milestone}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two column: roles + recruiters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-extrabold text-gray-900 mb-3">🎯 Top Job Roles</h2>
            <div className="space-y-2">
              {path.topRoles.map(role => (
                <div key={role} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0"></span>
                  {role}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-extrabold text-gray-900 mb-3">🏢 Top Recruiters</h2>
            <div className="flex flex-wrap gap-2">
              {path.topRecruiters.map(r => (
                <span key={r} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{r}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Key skills */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-extrabold text-gray-900 mb-3">🛠️ Key Skills You Need</h2>
          <div className="flex flex-wrap gap-2">
            {path.keySkills.map(skill => (
              <span key={skill} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-xl font-medium">{skill}</span>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-extrabold text-gray-900 mb-4">📚 Relevant Courses</h2>
          <div className="space-y-3">
            {path.courses.map(course => (
              <div key={course.name} className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${course.level === "UG" ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`}>
                  {course.level}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{course.name}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{course.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pune Colleges */}
        {path.puneColeges.length > 0 && (
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">🏛️ Best Pune Colleges for {path.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {path.puneColeges.map(college => (
                <Link key={college.slug} href={`/colleges/${college.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md p-4 transition-all group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-sm group-hover:text-orange-600 transition-colors">{college.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Avg Package: <span className="font-semibold text-green-700">₹{(college.avgPlacement / 100000).toFixed(1)}L PA</span></p>
                    </div>
                    <span className="text-orange-500 text-sm group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <h2 className="font-extrabold text-gray-900 mb-3">🏆 Recommended Certifications</h2>
          <div className="flex flex-wrap gap-2">
            {path.certifications.map(cert => (
              <span key={cert} className="text-xs bg-white border border-amber-200 text-amber-800 px-3 py-1.5 rounded-xl font-medium">{cert}</span>
            ))}
          </div>
        </div>

        {/* Day in life */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-extrabold text-gray-900 mb-2">☀️ A Day in the Life</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{path.dayInLife}</p>
        </div>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-green-50 rounded-2xl border border-green-100 p-5">
            <h2 className="font-extrabold text-gray-900 mb-3">✅ Why Choose {path.title}</h2>
            <div className="space-y-2">
              {path.pros.map(pro => (
                <div key={pro} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-green-500 shrink-0">✓</span>{pro}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-red-50 rounded-2xl border border-red-100 p-5">
            <h2 className="font-extrabold text-gray-900 mb-3">⚠️ Challenges to Know</h2>
            <div className="space-y-2">
              {path.cons.map(con => (
                <div key={con} className="flex gap-2 text-sm text-gray-700">
                  <span className="text-red-400 shrink-0">!</span>{con}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related paths */}
        {path.relatedPaths.length > 0 && (
          <div>
            <h2 className="font-extrabold text-gray-900 mb-3">🔗 Related Career Paths</h2>
            <div className="flex flex-wrap gap-3">
              {path.relatedPaths.map(relSlug => {
                const rel = getCareerPath(relSlug)
                if (!rel) return null
                return (
                  <Link key={relSlug} href={`/career-paths/${relSlug}`}
                    className="flex items-center gap-2 bg-white border border-gray-200 hover:border-orange-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors">
                    <span>{rel.icon}</span>{rel.title}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-extrabold text-white text-lg mb-1">Ready to pursue {path.title}?</h2>
            <p className="text-orange-100 text-sm">Chat with Aarav to find the best Pune college for your profile, scores, and budget.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/ai-counselor"
              className="bg-white text-orange-600 font-bold px-5 py-3 rounded-xl text-sm hover:bg-orange-50 transition-colors">
              Ask Aarav →
            </Link>
            <Link href="/scholarships"
              className="bg-white/20 text-white font-bold px-5 py-3 rounded-xl text-sm hover:bg-white/30 transition-colors border border-white/30">
              Find Scholarships
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
