import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { blogs as staticBlogs, getBlogBySlug as getStaticBlog } from "@/data/blogs"
import { getBlogBySlug as getDBBlog, getAllBlogs } from "@/lib/db"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { Clock, Calendar, ChevronRight, Tag, ArrowRight, BookOpen, Phone, GraduationCap, Star } from "lucide-react"
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

// ── Category badge colours (orange accent only — no rainbow) ──────────────────
const CAT_BADGE: Record<string, string> = {
  "Engineering":   "bg-orange-100 text-orange-700",
  "MBA":           "bg-orange-100 text-orange-700",
  "Medical":       "bg-orange-100 text-orange-700",
  "Exams":         "bg-orange-100 text-orange-700",
  "Student Life":  "bg-orange-100 text-orange-700",
  "Fees & Finance":"bg-orange-100 text-orange-700",
}
function badgeCls(cat: string) {
  return CAT_BADGE[cat] ?? "bg-gray-100 text-gray-600"
}

// ── Featured colleges for sidebar ────────────────────────────────────────────
const FEATURED_COLLEGES = [
  { name: "COEP Pune",       slug: "coep-college-of-engineering-pune", naac: "A++", stream: "Engineering" },
  { name: "PICT Pune",       slug: "pict-pune-college-of-engineering", naac: "A+",  stream: "Engineering" },
  { name: "SIBM Pune",       slug: "sibm-symbiosis-institute-business-management-pune", naac: "A+", stream: "MBA" },
  { name: "VIT Pune",        slug: "vit-vishwakarma-institute-technology-pune", naac: "A+", stream: "Engineering" },
  { name: "AFMC Pune",       slug: "afmc-armed-forces-medical-college-pune", naac: "A+", stream: "Medical" },
  { name: "MIT-WPU",         slug: "mit-world-peace-university-pune", naac: "A+",  stream: "Engineering" },
]

// ── Extract H2/H3 headings for TOC ───────────────────────────────────────────
function extractTOC(html: string): { id: string; text: string }[] {
  const matches = [...html.matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/gi)]
  return matches.slice(0, 8).map((m, i) => ({
    id: `section-${i + 1}`,
    text: m[1].replace(/<[^>]*>/g, "").trim(),
  }))
}

function injectHeadingIds(html: string): string {
  let counter = 0
  return html.replace(/<h([23])([^>]*)>/gi, (_m, level, attrs) => {
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

  // Related posts — same category first, then cross-category fallback
  let related: Post[] = []
  try {
    const { blogs: dbBlogs } = await getAllBlogs({ status: "published", category: post.category, limit: 5 })
    related = dbBlogs
      .filter((b) => b.slug !== slug).slice(0, 3)
      .map((b) => ({
        id: b.id ?? b.slug, slug: b.slug, title: b.title,
        excerpt: b.excerpt ?? "", body: "", author: b.author ?? "CollegePune",
        published_at: b.published_at, read_time: b.read_time,
        category: b.category ?? "General", tags: b.tags ?? [],
      }))
  } catch { /* ignore */ }

  if (related.length === 0)
    related = staticBlogs
      .filter((b) => b.slug !== slug && b.category === post.category)
      .slice(0, 3).map((b) => ({ ...b, body: b.body ?? "" }))

  if (related.length < 3) {
    const more = staticBlogs
      .filter((b) => b.slug !== slug && !related.find((r) => r.slug === b.slug))
      .slice(0, 3 - related.length)
      .map((b) => ({ ...b, body: b.body ?? "" }))
    related = [...related, ...more]
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title.slice(0, 60), url: `/blog/${slug}` },
  ])

  const rawDate = post.published_at ?? post.date ?? new Date().toISOString()
  const isoDate = (() => { try { return new Date(rawDate).toISOString() } catch { return new Date().toISOString() } })()
  const wordCount = post.body.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length

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

  const isHTML  = post.body.trimStart().startsWith("<")
  const processedBody = isHTML ? injectHeadingIds(post.body) : post.body
  const toc = isHTML ? extractTOC(post.body) : []
  const pageUrl = `${BASE_URL}/blog/${slug}`

  return (
    <div className="bg-[#F5F6FA] min-h-screen">
      <ReadingProgress />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="blog-schema"       type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />

      {/* ── Breadcrumb ──────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center gap-1 text-sm text-gray-500 flex-wrap">
            <Link href="/"     className="hover:text-orange-500 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
            <Link href="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
            <Link href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="text-orange-500 hover:underline font-medium">{post.category}</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
            <span className="text-gray-800 truncate max-w-[180px] sm:max-w-sm text-xs">
              {post.title.slice(0, 55)}{post.title.length > 55 ? "…" : ""}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Article Hero — clean dark navy ──────────────────────── */}
      <div className="bg-[#0A1628] py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock className="w-3.5 h-3.5" /> {readTime}
              </span>
              {dateStr && (
                <span className="flex items-center gap-1 text-gray-400 text-sm">
                  <Calendar className="w-3.5 h-3.5" /> {dateStr}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-5">
              {post.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white font-extrabold">
                {(post.author ?? "C")[0]}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">{post.author ?? "CollegePune"}</p>
                <p className="text-gray-400 text-xs">CollegePune Editorial</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">

          {/* ══ LEFT — Article ══════════════════════════════════════ */}
          <main className="min-w-0">
            <article className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">

              {/* Excerpt lead */}
              <div className="bg-red-50 border-b border-red-100 px-6 py-5">
                <p className="text-sm font-semibold text-red-700 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Inline TOC — shown only on mobile/tablet (sidebar handles desktop) */}
              {toc.length >= 3 && (
                <div className="lg:hidden border-b border-gray-100 px-6 py-5 bg-gray-50">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    Table of Contents
                  </p>
                  <ol className="space-y-1.5">
                    {toc.map((h, i) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="flex items-start gap-2 text-sm text-orange-600 hover:underline leading-snug"
                        >
                          <span className="text-gray-400 font-mono text-xs mt-0.5 shrink-0">{i + 1}.</span>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Body */}
              <div className="px-6 sm:px-8 py-8">
                <div className="prose prose-gray max-w-none
                  prose-headings:font-extrabold prose-headings:text-gray-900
                  prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-2
                  prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-[15px]
                  prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-gray-900
                  prose-ul:text-gray-700 prose-li:text-[15px]
                  prose-table:text-sm prose-table:border-collapse
                  prose-blockquote:border-l-4 prose-blockquote:border-orange-400 prose-blockquote:bg-orange-50 prose-blockquote:not-italic prose-blockquote:py-1 prose-blockquote:rounded-r-lg">
                  {isHTML ? (
                    <div dangerouslySetInnerHTML={{ __html: processedBody }} />
                  ) : (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">{post.body}</p>
                  )}
                </div>
              </div>

              {/* Share */}
              <div className="px-6 sm:px-8 pb-6 border-t border-gray-100 pt-5">
                <ShareButtons url={pageUrl} title={post.title} />
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="px-6 sm:px-8 pb-8 border-t border-gray-100 pt-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/colleges?search=${encodeURIComponent(tag)}`}
                        className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-orange-50 hover:text-orange-700 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                      >
                        <Tag className="w-3 h-3" /> {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author card */}
              <div className="mx-6 sm:mx-8 mb-8 bg-gray-50 rounded-xl p-5 flex items-start gap-4 border border-gray-100">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shrink-0">
                  {(post.author ?? "C")[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{post.author ?? "CollegePune"}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">CollegePune Editorial Team</p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    Expert in Pune college admissions, entrance exam guidance, and higher education in Maharashtra.
                    Helping students make informed decisions since 2020.
                  </p>
                </div>
              </div>
            </article>

            {/* Related articles */}
            {related.length > 0 && (
              <section className="mt-8">
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <h2 className="text-lg font-extrabold text-gray-900">Related Articles</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((r) => {
                    const rDate = r.published_at
                      ? new Date(r.published_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                      : (r.date ?? "")
                    return (
                      <Link key={r.id} href={`/blog/${r.slug}`} className="group">
                        <article className="bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all h-full flex flex-col overflow-hidden">
                          {/* Thin top bar */}
                          <div className="h-1 bg-orange-400" />
                          <div className="p-4 flex-1 flex flex-col">
                            <span className={`self-start text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2 ${badgeCls(r.category)}`}>
                              {r.category}
                            </span>
                            <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug flex-1">
                              {r.title}
                            </h3>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                              {rDate && <span className="text-[11px] text-gray-400">{rDate}</span>}
                              <ArrowRight className="w-3.5 h-3.5 text-orange-400 group-hover:translate-x-1 transition-transform ml-auto" />
                            </div>
                          </div>
                        </article>
                      </Link>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Internal links grid */}
            <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-wide">Explore Colleges in Pune</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: "Engineering Colleges", href: "/engineering-colleges-pune" },
                  { label: "Top MBA Colleges",     href: "/mba-colleges-pune"         },
                  { label: "Medical Colleges",     href: "/medical-colleges-pune"     },
                  { label: "Government Colleges",  href: "/government-colleges-pune"  },
                  { label: "All Colleges",         href: "/colleges"                  },
                  { label: "MHT-CET Colleges",    href: "/mht-cet-colleges-pune"     },
                  { label: "Cutoffs 2026",         href: "/cutoffs"                   },
                  { label: "Free Counselling",     href: "/counselling"               },
                ].map(({ label, href }) => (
                  <Link key={href} href={href}
                    className="text-sm text-orange-600 hover:text-orange-700 hover:underline font-medium leading-snug py-1">
                    {label} →
                  </Link>
                ))}
              </div>
            </div>
          </main>

          {/* ══ RIGHT — Sticky Sidebar ══════════════════════════════ */}
          <aside className="space-y-5 lg:sticky lg:top-6">

            {/* ① Get Free Counselling — dark navy, Collegedunia-style */}
            <div className="bg-[#0A1628] rounded-xl overflow-hidden shadow-md">
              <div className="p-5 text-center border-b border-white/10">
                <GraduationCap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <p className="text-white font-bold text-base">Get Started!</p>
                <p className="text-gray-400 text-xs mt-1">What are you waiting for?<br />Discover Your Education Journey</p>
              </div>
              <div className="p-4 space-y-3">
                <Link href="/counselling"
                  className="flex items-center justify-center gap-2 w-full border border-white/30 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-white/10 transition-colors">
                  <Phone className="w-4 h-4" /> Enquiry Now
                </Link>
                <Link href="/counselling"
                  className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2.5 rounded-lg transition-colors">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* ② Table of Contents — desktop only */}
            {toc.length >= 3 && (
              <div className="hidden lg:block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="bg-[#1E3A5F] px-4 py-3">
                  <p className="text-white text-sm font-bold">Table of Contents</p>
                </div>
                <nav className="divide-y divide-gray-100">
                  {toc.map((h, i) => (
                    <a key={h.id} href={`#${h.id}`}
                      className="flex items-start gap-2.5 px-4 py-2.5 text-sm text-orange-600 hover:bg-orange-50 transition-colors leading-snug group">
                      <span className="text-gray-400 text-xs font-mono mt-0.5 shrink-0 group-hover:text-orange-400">{i + 1}.</span>
                      <span className="hover:underline line-clamp-2">{h.text}</span>
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* ③ Top Colleges in Pune */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="bg-[#1E3A5F] px-4 py-3 flex items-center justify-between">
                <p className="text-white text-sm font-bold">Top Colleges in Pune</p>
                <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
              </div>
              <ul className="divide-y divide-gray-100">
                {FEATURED_COLLEGES.map((c, i) => (
                  <li key={c.slug}>
                    <Link href={`/colleges/${c.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group">
                      <span className="text-xs font-bold text-gray-400 w-5 shrink-0">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors truncate">
                          {c.name}
                        </p>
                        <p className="text-[11px] text-gray-400">{c.stream} · NAAC {c.naac}</p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-gray-50 border-t border-gray-100">
                <Link href="/colleges"
                  className="text-xs text-orange-500 hover:text-orange-600 font-semibold hover:underline flex items-center gap-1">
                  View All Colleges <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* ④ College Predictor */}
            <div className="bg-[#0A1628] rounded-xl overflow-hidden shadow-md">
              <div className="px-5 pt-5 pb-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">College Predictor</p>
                    <p className="text-gray-400 text-xs mt-0.5">Know Your Odds Of Admission</p>
                  </div>
                </div>
                <Link href="/predictor"
                  className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2.5 rounded-lg transition-colors">
                  Search Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* ⑤ Write a Review */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="px-5 py-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-[#1E3A5F] rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-xl">✍️</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Write A Review!</p>
                  <p className="text-xs text-gray-500 mt-0.5">Help students choose the right college</p>
                </div>
              </div>
              <div className="px-5 pb-4">
                <Link href="/colleges"
                  className="flex items-center justify-center gap-2 w-full border border-[#1E3A5F] text-[#1E3A5F] hover:bg-[#1E3A5F] hover:text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                  Review Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  )
}
