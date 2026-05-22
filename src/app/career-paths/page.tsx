import { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta } from "@/lib/seo"
import { careerPaths } from "@/data/careerPaths"

export const metadata: Metadata = genMeta({
  title: "Career Path Mapper — Explore Careers After Pune College 2026",
  description: "Explore 8+ career paths available after Pune college. See salary growth, required courses, top recruiters, roadmaps, and Pune colleges that get you there. Free career guidance.",
  path: "/career-paths",
  keywords: [
    "career paths after engineering pune",
    "career options after mba pune",
    "salary after b.tech pune",
    "career guidance pune students 2026",
    "software engineering career path",
    "mba career options pune",
    "medical career path india",
  ],
})

export const revalidate = 3600

const CATEGORIES = [
  { key: "tech", label: "🖥️ Technology", color: "blue" },
  { key: "management", label: "📊 Management", color: "purple" },
  { key: "medical", label: "⚕️ Medical", color: "green" },
  { key: "law", label: "⚖️ Law", color: "yellow" },
  { key: "creative", label: "🎨 Creative", color: "pink" },
  { key: "finance", label: "💰 Finance", color: "emerald" },
]

function formatLPA(lpa: number) {
  return `₹${lpa}L`
}

export default function CareerPathsPage() {
  const grouped = CATEGORIES.map(cat => ({
    ...cat,
    paths: careerPaths.filter(p => p.category === cat.key),
  })).filter(g => g.paths.length > 0)

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1A2E4A] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-blue-300 mb-4 flex gap-1 items-center">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>›</span>
            <span className="text-white">Career Paths</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Career Path Mapper
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-5">
            Explore every career you can build after Pune college. See real salary data, step-by-step roadmaps, required courses, and exactly which Pune colleges get you there.
          </p>
          <div className="flex flex-wrap gap-3">
            {[`${careerPaths.length}+ career paths`, "Real salary data", "Year-by-year roadmaps", "Pune college match"].map(tag => (
              <span key={tag} className="bg-white/10 text-white text-xs px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* Quick category nav */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <a key={cat.key} href={`#${cat.key}`}
              className="text-xs font-semibold bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 text-gray-700 px-4 py-2 rounded-xl transition-colors">
              {cat.label}
            </a>
          ))}
        </div>

        {/* Grouped career cards */}
        {grouped.map(group => (
          <section key={group.key} id={group.key}>
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">{group.label} Careers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.paths.map(path => (
                <Link key={path.slug} href={`/career-paths/${path.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all p-5 group">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">{path.icon}</span>
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-base group-hover:text-orange-600 transition-colors">{path.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{path.tagline}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-green-50 rounded-xl py-2">
                      <p className="text-[10px] text-gray-500">Entry</p>
                      <p className="font-extrabold text-green-700 text-sm">{formatLPA(path.avgSalaryEntry)} PA</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl py-2">
                      <p className="text-[10px] text-gray-500">5 Years</p>
                      <p className="font-extrabold text-blue-700 text-sm">{formatLPA(path.avgSalaryMid)} PA</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl py-2">
                      <p className="text-[10px] text-gray-500">Senior</p>
                      <p className="font-extrabold text-purple-700 text-sm">{formatLPA(path.avgSalarySenior)} PA</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${path.growth === "Very High" ? "bg-green-100 text-green-700" : path.growth === "High" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
                        {path.growth} growth
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${path.demand === "Very High" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"}`}>
                        {path.demand} demand
                      </span>
                    </div>
                    <span className="text-xs text-orange-500 font-bold group-hover:translate-x-1 transition-transform">
                      Explore →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* AI Counselor CTA */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1A3A5F] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
          <div className="text-4xl">🤖</div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-extrabold text-white text-lg mb-1">Not sure which career is right for you?</h2>
            <p className="text-gray-300 text-sm">Chat with Aarav, our AI counselor, to get personalized guidance based on your scores, interests, and goals.</p>
          </div>
          <Link href="/ai-counselor"
            className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
            Chat with Aarav →
          </Link>
        </div>

      </div>
    </div>
  )
}
