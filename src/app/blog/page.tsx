import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { getAllBlogs } from "@/lib/db"
import { blogs as staticBlogs } from "@/data/blogs"
import { Clock, ArrowRight, BookOpen, TrendingUp, Search } from "lucide-react"

export const revalidate = 300

export const metadata: Metadata = genMeta({
  title: "Pune College Blog 2026 | Admission Guides & Tips | CollegePune",
  description:
    "Expert articles on Pune college admissions 2026 — MHT-CET prep, MBA fees, NEET cutoffs, SNAP strategy & career planning. Latest guides from CollegePune experts.",
  path: "/blog",
  keywords: ["pune college guides", "mht-cet preparation", "mba admission pune", "best colleges pune blog"],
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"

interface Post {
  id: number | string
  slug: string
  title: string
  excerpt: string
  author: string
  date?: string
  published_at?: string
  readTime?: string
  read_time?: string
  category: string
  tags: string[]
}

function isValidPost(p: { title: string; slug: string }): boolean {
  return p.title.trim().length >= 10 && p.slug.length >= 5
}

async function fetchPosts(): Promise<Post[]> {
  try {
    const result = await getAllBlogs({ status: "published", limit: 50 })
    if (result.blogs && result.blogs.length > 0) {
      return (result.blogs as Post[]).filter(isValidPost)
    }
  } catch {
    // fall through to static
  }
  return staticBlogs as Post[]
}

// ── Category visual config ────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<string, { gradient: string; lightBg: string; textColor: string; icon: string; badge: string }> = {
  "Engineering":   { gradient: "from-blue-600 to-indigo-700",    lightBg: "bg-blue-50",   textColor: "text-blue-700",   icon: "⚙️", badge: "bg-blue-100 text-blue-700"   },
  "MBA":           { gradient: "from-purple-600 to-violet-700",  lightBg: "bg-purple-50", textColor: "text-purple-700", icon: "📊", badge: "bg-purple-100 text-purple-700" },
  "Medical":       { gradient: "from-red-500 to-rose-700",       lightBg: "bg-red-50",    textColor: "text-red-700",    icon: "🏥", badge: "bg-red-100 text-red-700"       },
  "Exams":         { gradient: "from-orange-500 to-amber-600",   lightBg: "bg-orange-50", textColor: "text-orange-700", icon: "📝", badge: "bg-orange-100 text-orange-700" },
  "Student Life":  { gradient: "from-green-500 to-emerald-700",  lightBg: "bg-green-50",  textColor: "text-green-700",  icon: "🎓", badge: "bg-green-100 text-green-700"   },
  "Fees & Finance":{ gradient: "from-yellow-500 to-orange-500",  lightBg: "bg-yellow-50", textColor: "text-yellow-700", icon: "💰", badge: "bg-yellow-100 text-yellow-700" },
  "Law":           { gradient: "from-teal-600 to-cyan-700",      lightBg: "bg-teal-50",   textColor: "text-teal-700",   icon: "⚖️", badge: "bg-teal-100 text-teal-700"     },
  "Architecture":  { gradient: "from-pink-500 to-rose-600",      lightBg: "bg-pink-50",   textColor: "text-pink-700",   icon: "🏛️", badge: "bg-pink-100 text-pink-700"     },
}

function getCat(category: string) {
  return CATEGORY_CONFIG[category] ?? {
    gradient: "from-gray-600 to-slate-700",
    lightBg: "bg-gray-50",
    textColor: "text-gray-700",
    icon: "📖",
    badge: "bg-gray-100 text-gray-700",
  }
}

function formatDate(post: Post): string {
  const raw = post.published_at ?? post.date ?? ""
  if (!raw) return ""
  try {
    return new Date(raw).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  } catch {
    return raw
  }
}

const CATEGORIES = ["All", "Engineering", "MBA", "Medical", "Exams", "Student Life", "Fees & Finance"]

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>
}) {
  const { category: catFilter, q } = await searchParams
  const allPosts = await fetchPosts()

  // Filter
  let posts = allPosts
  if (catFilter && catFilter !== "All") {
    posts = posts.filter((p) => p.category === catFilter)
  }
  if (q) {
    const lq = q.toLowerCase()
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(lq) ||
        p.excerpt.toLowerCase().includes(lq) ||
        p.category.toLowerCase().includes(lq)
    )
  }

  const featured = posts[0]
  const rest = posts.slice(1)

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
  ])

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CollegePune Blog",
    description: "Expert guides on Pune college admissions, MHT-CET, MBA, NEET and career planning.",
    url: `${BASE_URL}/blog`,
    publisher: { "@type": "Organization", name: "CollegePune", url: BASE_URL },
    blogPost: allPosts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${post.slug}`,
      author: { "@type": "Person", name: post.author ?? "CollegePune" },
      datePublished: post.published_at ?? post.date ?? new Date().toISOString(),
      articleSection: post.category,
    })),
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Script id="blog-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="blog-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />

      {/* ── Page Header ──────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-orange-500" />
                <span className="text-orange-500 text-sm font-semibold uppercase tracking-widest">College Insights</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                Guides, Tips & Expert Advice
              </h1>
              <p className="text-gray-500 mt-2 max-w-xl">
                Everything you need for Pune college admissions — entrance exams, fees, placements, scholarships and more.
              </p>
            </div>
            {/* Search */}
            <form method="GET" className="w-full md:w-72">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="q"
                  defaultValue={q ?? ""}
                  placeholder="Search articles…"
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
                />
                {catFilter && catFilter !== "All" && (
                  <input type="hidden" name="category" value={catFilter} />
                )}
              </div>
            </form>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const isActive = !catFilter && cat === "All" ? true : catFilter === cat
              const href = cat === "All"
                ? `/blog${q ? `?q=${q}` : ""}`
                : `/blog?category=${encodeURIComponent(cat)}${q ? `&q=${q}` : ""}`
              return (
                <Link
                  key={cat}
                  href={href}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                    isActive
                      ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                      : "bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {cat}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {posts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p className="text-lg font-medium">No articles found</p>
            <Link href="/blog" className="text-sm text-orange-500 hover:underline mt-2 inline-block">Clear filters →</Link>
          </div>
        )}

        {/* ── Featured Hero Post ──────────────────────────────── */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block mb-10">
            <article className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${getCat(featured.category).gradient} shadow-lg`}>
              {/* Background illustration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-6 right-10 text-[120px] leading-none select-none">
                  {getCat(featured.category).icon}
                </div>
                <div className="absolute bottom-4 left-1/3 text-[80px] leading-none select-none rotate-12 opacity-50">
                  {getCat(featured.category).icon}
                </div>
              </div>

              <div className="relative grid md:grid-cols-5 gap-0">
                {/* Text content */}
                <div className="md:col-span-3 p-8 sm:p-10 flex flex-col justify-between min-h-[280px]">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {featured.category}
                      </span>
                      <span className="text-white/70 text-xs flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Featured
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-3 group-hover:text-white/90 transition-colors line-clamp-3">
                      {featured.title}
                    </h2>
                    <p className="text-white/75 text-sm leading-relaxed line-clamp-2">
                      {featured.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {(featured.author ?? "C")[0]}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{featured.author ?? "CollegePune"}</p>
                        <p className="text-white/60 text-xs">{formatDate(featured)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-full">
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Visual panel */}
                <div className="hidden md:flex md:col-span-2 items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-[100px] leading-none mb-4 drop-shadow-lg">
                      {getCat(featured.category).icon}
                    </div>
                    <div className="flex items-center gap-2 text-white/80 justify-center text-sm">
                      <Clock className="w-4 h-4" />
                      {featured.read_time ?? featured.readTime ?? "5 min read"}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* ── Posts Grid ─────────────────────────────────────── */}
        {rest.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                {catFilter && catFilter !== "All" ? `${catFilter} Articles` : "All Articles"}
                <span className="ml-2 text-sm font-normal text-gray-400">({posts.length} articles)</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => {
                const cat = getCat(post.category)
                const dateStr = formatDate(post)
                const readTime = post.read_time ?? post.readTime ?? "5 min read"
                return (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-200 flex flex-col h-full">
                      {/* Cover visual */}
                      <div className={`bg-gradient-to-br ${cat.gradient} p-6 flex items-center justify-between`} style={{ minHeight: "120px" }}>
                        <div>
                          <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                            {post.category}
                          </span>
                        </div>
                        <div className="text-5xl opacity-80 group-hover:scale-110 transition-transform">
                          {cat.icon}
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {readTime}
                          </div>
                          {dateStr && <span className="text-gray-300 text-xs">·</span>}
                          {dateStr && <span className="text-xs text-gray-400">{dateStr}</span>}
                        </div>

                        <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 flex-1 leading-relaxed mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full ${cat.lightBg} flex items-center justify-center`}>
                              <span className={`text-xs font-bold ${cat.textColor}`}>
                                {(post.author ?? "C")[0]}
                              </span>
                            </div>
                            <span className="text-xs text-gray-600 font-medium">{post.author ?? "CollegePune"}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                )
              })}
            </div>
          </>
        )}

        {/* ── Newsletter / CTA banner ────────────────────────── */}
        <div className="mt-14 bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="text-4xl">📬</div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-extrabold text-white mb-1">Get Admission Alerts in Your Inbox</h3>
            <p className="text-gray-300 text-sm">Cutoff updates, scholarship deadlines, and expert guides delivered free.</p>
          </div>
          <Link
            href="/counselling"
            className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
          >
            Free Counselling →
          </Link>
        </div>

        {/* ── Explore links ─────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Best Engineering Colleges", href: "/engineering-colleges-pune", icon: "⚙️" },
            { label: "Top MBA Colleges",          href: "/mba-colleges-pune",         icon: "📊" },
            { label: "Medical Colleges",          href: "/medical-colleges-pune",     icon: "🏥" },
            { label: "Free Counselling",          href: "/counselling",               icon: "🎯" },
          ].map(({ label, href, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 bg-white border border-gray-100 hover:border-orange-200 hover:shadow-sm rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:text-orange-600 transition-all"
            >
              <span>{icon}</span>
              <span className="line-clamp-1">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
