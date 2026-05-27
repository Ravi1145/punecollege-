import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { blogs as staticBlogs, getBlogBySlug as getStaticBlog } from "@/data/blogs"
import { getBlogBySlug as getDBBlog, getAllBlogs } from "@/lib/db"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { Clock, Calendar, ChevronRight, Tag, ArrowRight, BookOpen } from "lucide-react"
import ReadingProgress from "@/components/blog/ReadingProgress"
import ShareButtons from "@/components/blog/ShareButtons"

export const revalidate = 300

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = new Set(staticBlogs.map((b) => b.slug))
  try {
    const { blogs: dbBlogs } = await getAllBlogs({ status: "published", limit: 200 })
    dbBlogs.forEach((b) => slugs.add(b.slug))
  } catch { /* ignore */ }
  return Array.from(slugs).map((slug) => ({ slug }))
}

interface Post {
  id: number | string
  slug: string
  title: string
  excerpt: string
  body: string
  author: string
  date?: string
  published_at?: string
  readTime?: string
  read_time?: string
  category: string
  tags: string[]
  meta_title?: string
  meta_desc?: string
}

async function resolvePost(slug: string): Promise<Post | null> {
  try {
    const db = await getDBBlog(slug)
    if (db && db.status === "published" && db.title && db.title.trim().length >= 10) {
      return {
        id: db.id ?? slug, slug: db.slug, title: db.title,
        excerpt: db.excerpt ?? "", body: db.body ?? "",
        author: db.author ?? "CollegePune",
        published_at: db.published_at, read_time: db.read_time,
        category: db.category ?? "General", tags: db.tags ?? [],
        meta_title: db.meta_title, meta_desc: db.meta_desc,
      }
    }
  } catch { /* fall through */ }

  const s = getStaticBlog(slug)
  if (s) {
    return {
      id: s.id, slug: s.slug, title: s.title, excerpt: s.excerpt,
      body: s.body, author: s.author, date: s.date, readTime: s.readTime,
      category: s.category, tags: s.tags,
    }
  }
  return null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await resolvePost(slug)
  if (!post) return {}
  return genMeta({
    title: post.meta_title || post.title,
    description: post.meta_desc || post.excerpt,
    path: `/blog/${slug}`,
    keywords: post.tags,
  })
}

// ── Category visual config ────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<string, { gradient: string; light: string; text: string; icon: string; badgeBg: string }> = {
  "Engineering":   { gradient: "from-blue-600 to-indigo-700",   light: "bg-blue-50",   text: "text-blue-700",   icon: "⚙️", badgeBg: "bg-blue-100 text-blue-700"   },
  "MBA":           { gradient: "from-purple-600 to-violet-700", light: "bg-purple-50", text: "text-purple-700", icon: "📊", badgeBg: "bg-purple-100 text-purple-700" },
  "Medical":       { gradient: "from-red-500 to-rose-700",      light: "bg-red-50",    text: "text-red-700",    icon: "🏥", badgeBg: "bg-red-100 text-red-700"       },
  "Exams":         { gradient: "from-orange-500 to-amber-600",  light: "bg-orange-50", text: "text-orange-700", icon: "📝", badgeBg: "bg-orange-100 text-orange-700" },
  "Student Life":  { gradient: "from-green-500 to-emerald-700", light: "bg-green-50",  text: "text-green-700",  icon: "🎓", badgeBg: "bg-green-100 text-green-700"   },
  "Fees & Finance":{ gradient: "from-yellow-500 to-orange-500", light: "bg-yellow-50", text: "text-yellow-700", icon: "💰", badgeBg: "bg-yellow-100 text-yellow-700" },
}
function getCat(category: string) {
  return CATEGORY_CONFIG[category] ?? {
    gradient: "from-gray-600 to-slate-700", light: "bg-gray-50", text: "text-gray-700",
    icon: "📖", badgeBg: "bg-gray-100 text-gray-700",
  }
}

// ── Extract H2 headings from HTML for Table of Contents ──────────────────────
function extractTOC(html: string): { id: string; text: string }[] {
  const matches = [...html.matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/gi)]
  return matches.slice(0, 8).map((m, i) => {
    const text = m[1].replace(/<[^>]*>/g, "").trim()
    return { id: `section-${i + 1}`, text }
  })
}

// ── Inject IDs into headings for anchor links ──────────────────────────────────
function injectHeadingIds(html: string): string {
  let counter = 0
  return html.replace(/<h([23])([^>]*)>/gi, (_match, level, attrs) => {
    counter++
    return `<h${level}${attrs} id="section-${counter}">`
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await resolvePost(slug)
  if (!post) notFound()

  const dateStr = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : (post.date ?? "")
  const readTime = post.read_time ?? post.readTime ?? "5 min read"

  // Related posts
  let related: Post[] = []
  try {
    const { blogs: dbBlogs } = await getAllBlogs({ status: "published", category: post.category, limit: 5 })
    related = dbBlogs
      .filter((b) => b.slug !== slug)
      .slice(0, 3)
      .map((b) => ({
        id: b.id ?? b.slug, slug: b.slug, title: b.title,
        excerpt: b.excerpt ?? "", body: "", author: b.author ?? "CollegePune",
        published_at: b.published_at, read_time: b.read_time,
        category: b.category ?? "General", tags: b.tags ?? [],
      }))
  } catch { /* ignore */ }

  if (related.length === 0) {
    related = staticBlogs
      .filter((b) => b.slug !== slug && b.category === post.category)
      .slice(0, 3)
      .map((b) => ({ ...b, body: b.body ?? "" }))
  }
  // If still no same-category, pick from other categories
  if (related.length < 3) {
    const others = staticBlogs
      .filter((b) => b.slug !== slug && !related.find((r) => r.slug === b.slug))
      .slice(0, 3 - related.length)
      .map((b) => ({ ...b, body: b.body ?? "" }))
    related = [...related, ...others]
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title.slice(0, 60), url: `/blog/${slug}` },
  ])

  const rawDate = post.published_at ?? post.date ?? new Date().toISOString()
  const isoDate = (() => {
    try { return new Date(rawDate).toISOString() } catch { return new Date().toISOString() }
  })()

  const wordCount = post.body.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length
  const estimatedReadTime = Math.max(3, Math.ceil(wordCount / 200))

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": ["Article", "BlogPosting"],
    "@id": `${BASE_URL}/blog/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${slug}` },
    headline: post.title.slice(0, 110),
    description: post.excerpt,
    author: { "@type": "Person", name: post.author, url: `${BASE_URL}/blog` },
    publisher: {
      "@type": "Organization", name: "CollegePune", url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png`, width: 200, height: 60 },
    },
    datePublished: isoDate, dateModified: isoDate,
    url: `${BASE_URL}/blog/${slug}`,
    image: { "@type": "ImageObject", url: `${BASE_URL}/og-image.png`, width: 1200, height: 630 },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-IN",
    wordCount,
    isPartOf: { "@type": "Blog", "@id": `${BASE_URL}/blog`, name: "CollegePune Blog" },
  }

  const isHTML = post.body.trimStart().startsWith("<")
  const processedBody = isHTML ? injectHeadingIds(post.body) : post.body
  const toc = isHTML ? extractTOC(post.body) : []
  const cat = getCat(post.category)
  const pageUrl = `${BASE_URL}/blog/${slug}`

  return (
    <div className="bg-gray-50 min-h-screen">
      <ReadingProgress />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="blog-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />

      {/* ── Breadcrumb ──────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <Link href="/blog" className="hover:text-orange-600 transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <Link href={`/blog?category=${encodeURIComponent(post.category)}`}
              className={`${cat.text} hover:underline font-medium`}>{post.category}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-gray-800 truncate max-w-[200px] sm:max-w-xs">
              {post.title.slice(0, 50)}{post.title.length > 50 ? "…" : ""}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Article Hero Banner ──────────────────────────────── */}
      <div className={`bg-gradient-to-br ${cat.gradient} py-12 px-4 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-4 right-8 text-[140px] leading-none">{cat.icon}</div>
          <div className="absolute bottom-0 left-1/4 text-[80px] leading-none rotate-12">{cat.icon}</div>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Link
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="bg-white/20 hover:bg-white/30 backdrop-blur text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest transition-colors"
            >
              {post.category}
            </Link>
            <div className="flex items-center gap-1.5 text-white/70 text-sm">
              <Clock className="w-3.5 h-3.5" />
              {readTime || `${estimatedReadTime} min read`}
            </div>
            {dateStr && (
              <div className="flex items-center gap-1.5 text-white/70 text-sm">
                <Calendar className="w-3.5 h-3.5" />
                {dateStr}
              </div>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-6 max-w-3xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white font-extrabold text-lg">
              {(post.author ?? "C")[0]}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{post.author ?? "CollegePune"}</p>
              <p className="text-white/60 text-xs">CollegePune Editorial</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content Layout ───────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10 items-start">

          {/* ── Article body ─────────────────────────────────── */}
          <main className="flex-1 min-w-0">
            <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              {/* Excerpt / lead */}
              <div className={`${cat.light} border-b border-gray-100 px-8 py-6`}>
                <p className={`text-base font-medium ${cat.text} leading-relaxed`}>
                  {post.excerpt}
                </p>
              </div>

              {/* Body */}
              <div className="px-6 sm:px-8 py-8">
                <div
                  className={`
                    prose prose-gray max-w-none
                    prose-headings:font-extrabold prose-headings:text-gray-900
                    prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                    prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-[15px]
                    prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900
                    prose-ul:text-gray-700 prose-li:text-[15px]
                    prose-table:text-sm
                    prose-blockquote:border-orange-400 prose-blockquote:bg-orange-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:not-italic
                  `}
                >
                  {isHTML ? (
                    <div dangerouslySetInnerHTML={{ __html: processedBody }} />
                  ) : (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">{post.body}</p>
                  )}
                </div>
              </div>

              {/* ── Tags ─────────────────────────────────────── */}
              {post.tags.length > 0 && (
                <div className="px-8 pb-8">
                  <div className="pt-6 border-t border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/colleges?search=${encodeURIComponent(tag)}`}
                          className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-orange-50 hover:text-orange-700 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Share ────────────────────────────────────── */}
              <div className="px-8 pb-8">
                <div className="pt-4 border-t border-gray-100">
                  <ShareButtons url={pageUrl} title={post.title} />
                </div>
              </div>

              {/* ── Author card ──────────────────────────────── */}
              <div className="mx-8 mb-8 bg-gray-50 rounded-2xl p-6 flex items-start gap-4 border border-gray-100">
                <div className={`w-14 h-14 ${cat.light} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <span className={`text-2xl font-extrabold ${cat.text}`}>{(post.author ?? "C")[0]}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{post.author ?? "CollegePune"}</p>
                  <p className="text-xs text-gray-500 mt-0.5">CollegePune Editorial Team</p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    Expert in Pune college admissions, entrance exam guidance, and higher education in Maharashtra.
                    Helping students make informed decisions since 2020.
                  </p>
                </div>
              </div>
            </article>

            {/* ── Related posts ──────────────────────────────── */}
            {related.length > 0 && (
              <section className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <h2 className="text-xl font-extrabold text-gray-900">Related Articles</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {related.map((r) => {
                    const rc = getCat(r.category)
                    const rDate = r.published_at
                      ? new Date(r.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                      : (r.date ?? "")
                    return (
                      <Link key={r.id} href={`/blog/${r.slug}`} className="group">
                        <article className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all h-full flex flex-col">
                          {/* Mini banner */}
                          <div className={`bg-gradient-to-br ${rc.gradient} px-4 py-5 flex items-center justify-between`}>
                            <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                              {r.category}
                            </span>
                            <span className="text-3xl opacity-80">{rc.icon}</span>
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                              {r.title}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-2 flex-1 leading-relaxed">
                              {r.excerpt}
                            </p>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                              {rDate && <span className="text-[11px] text-gray-400">{rDate}</span>}
                              <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform ml-auto" />
                            </div>
                          </div>
                        </article>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* ── Contextual Links ────────────────────────────── */}
            <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 mb-4">Explore Colleges in Pune</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Engineering Colleges", href: "/engineering-colleges-pune", icon: "⚙️" },
                  { label: "Top MBA Colleges",     href: "/mba-colleges-pune",         icon: "📊" },
                  { label: "Medical Colleges",     href: "/medical-colleges-pune",     icon: "🏥" },
                  { label: "Govt Colleges",        href: "/government-colleges-pune",  icon: "🏛️" },
                  { label: "All Colleges",         href: "/colleges",                  icon: "🏫" },
                  { label: "MHT-CET Colleges",    href: "/mht-cet-colleges-pune",     icon: "📝" },
                  { label: "Cutoffs 2026",         href: "/cutoffs",                   icon: "📊" },
                  { label: "Free Counselling",     href: "/counselling",               icon: "🎯" },
                ].map(({ label, href, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-3 py-2.5 rounded-xl transition-colors border border-transparent hover:border-orange-100 font-medium"
                  >
                    <span>{icon}</span>
                    <span className="line-clamp-1">{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── CTA banner ─────────────────────────────────── */}
            <div className="mt-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="text-4xl">🎓</div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-white">Need Help With Admission?</h3>
                <p className="text-orange-100 text-sm mt-0.5">Get free expert guidance from our Pune counsellors — no charge, no commitment.</p>
              </div>
              <Link href="/counselling"
                className="shrink-0 bg-white text-orange-600 font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-orange-50 transition-colors whitespace-nowrap shadow-sm">
                Book Free Session →
              </Link>
            </div>
          </main>

          {/* ── Sidebar (Table of Contents) ──────────────────── */}
          {toc.length >= 3 && (
            <aside className="hidden xl:block w-64 shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                  In this article
                </p>
                <nav className="space-y-1">
                  {toc.map((h, i) => (
                    <a
                      key={h.id}
                      href={`#${h.id}`}
                      className="flex items-start gap-2 text-sm text-gray-600 hover:text-orange-600 py-1.5 px-2 rounded-lg hover:bg-orange-50 transition-colors leading-snug group"
                    >
                      <span className={`shrink-0 w-5 h-5 rounded-full ${cat.light} ${cat.text} flex items-center justify-center text-[10px] font-bold mt-0.5`}>
                        {i + 1}
                      </span>
                      <span className="line-clamp-2">{h.text}</span>
                    </a>
                  ))}
                </nav>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <Link
                    href="/blog"
                    className="flex items-center gap-2 text-xs text-gray-500 hover:text-orange-600 transition-colors font-medium"
                  >
                    <ArrowRight className="w-3 h-3 rotate-180" /> All Articles
                  </Link>
                </div>
              </div>

              {/* Quick admission box */}
              <div className={`mt-5 bg-gradient-to-br ${cat.gradient} rounded-2xl p-5 text-center`}>
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="text-white font-bold text-sm mb-1">Need Admission Help?</p>
                <p className="text-white/70 text-xs mb-4 leading-relaxed">Free counselling from Pune experts</p>
                <Link href="/counselling"
                  className="block bg-white text-gray-900 font-bold text-xs px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors">
                  Get Free Guidance →
                </Link>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}
