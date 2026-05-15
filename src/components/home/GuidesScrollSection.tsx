import Link from "next/link"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import { getAllBlogs } from "@/lib/db"
import { blogs as staticBlogs } from "@/data/blogs"

export const revalidate = 300

// ── Category badge colors ─────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, { bg: string; text: string; bar: string }> = {
  Engineering:    { bg: "bg-blue-50",    text: "text-blue-700",   bar: "from-blue-400 to-blue-600" },
  MBA:            { bg: "bg-orange-50",  text: "text-orange-700", bar: "from-orange-400 to-orange-600" },
  Exams:          { bg: "bg-purple-50",  text: "text-purple-700", bar: "from-purple-400 to-purple-600" },
  Medical:        { bg: "bg-red-50",     text: "text-red-700",    bar: "from-red-400 to-red-600" },
  Placements:     { bg: "bg-green-50",   text: "text-green-700",  bar: "from-green-400 to-green-600" },
  Scholarships:   { bg: "bg-teal-50",    text: "text-teal-700",   bar: "from-teal-400 to-teal-600" },
  Careers:        { bg: "bg-indigo-50",  text: "text-indigo-700", bar: "from-indigo-400 to-indigo-600" },
  "Fees & Finance": { bg: "bg-amber-50", text: "text-amber-700",  bar: "from-amber-400 to-amber-600" },
  "Student Life": { bg: "bg-pink-50",    text: "text-pink-700",   bar: "from-pink-400 to-pink-600" },
  Rankings:       { bg: "bg-cyan-50",    text: "text-cyan-700",   bar: "from-cyan-400 to-cyan-600" },
}

const DEFAULT_COLOR = { bg: "bg-gray-50", text: "text-gray-700", bar: "from-gray-400 to-gray-600" }

// ── Normalise static & DB blog to a unified shape ─────────────────────────
interface GuideCard {
  slug: string
  title: string
  excerpt: string
  author: string
  readTime: string
  category: string
  date: string
}

function normaliseStatic(b: typeof staticBlogs[0]): GuideCard {
  return {
    slug:     b.slug,
    title:    b.title,
    excerpt:  b.excerpt ?? "",
    author:   b.author ?? "CollegePune",
    readTime: b.readTime ?? "5 min",
    category: b.category ?? "Guide",
    date:     b.date ?? b.publishedAt ?? "",
  }
}

// ── Fetch: Supabase first, static fallback ────────────────────────────────
async function fetchGuides(): Promise<GuideCard[]> {
  try {
    const { blogs: dbBlogs } = await getAllBlogs({ status: "published", limit: 12 })
    if (dbBlogs && dbBlogs.length > 0) {
      return dbBlogs.map(b => ({
        slug:     b.slug,
        title:    b.title,
        excerpt:  b.excerpt ?? "",
        author:   b.author ?? "CollegePune",
        readTime: b.read_time ?? "5 min",
        category: b.category ?? "Guide",
        date:     b.published_at ?? b.created_at ?? "",
      }))
    }
  } catch {
    // fall through to static
  }
  return staticBlogs.map(normaliseStatic)
}

// ── Single guide card ─────────────────────────────────────────────────────
function GuideCard({ guide }: { guide: GuideCard }) {
  const colors = CATEGORY_COLORS[guide.category] ?? DEFAULT_COLOR
  const initial = guide.author[0]?.toUpperCase() ?? "C"

  return (
    <Link
      href={`/blog/${guide.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 overflow-hidden w-72 shrink-0"
    >
      {/* Top colour bar */}
      <div className={`h-1.5 bg-gradient-to-r ${colors.bar}`} />

      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Category + read time */}
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
            {guide.category}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-400 ml-auto">
            <Clock className="w-3 h-3" />
            {guide.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-accent transition-colors line-clamp-2 flex-1">
          {guide.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
          {guide.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-extrabold shrink-0"
              style={{ backgroundColor: "var(--color-navy)" }}
            >
              {initial}
            </div>
            <span className="text-[10px] text-gray-500 truncate max-w-[110px]">{guide.author}</span>
          </div>
          <span className="text-[10px] font-semibold text-accent group-hover:opacity-80 transition-opacity whitespace-nowrap">
            Read →
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Main section ──────────────────────────────────────────────────────────
export default async function GuidesScrollSection() {
  const guides = await fetchGuides()

  // Need at least 4 for a seamless loop; duplicate if fewer
  const looped = guides.length > 0
    ? [...guides, ...guides]   // doubled for seamless CSS loop
    : []

  return (
    <section className="py-10 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #0A1628, #1E3A5F)" }}
            >
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">
                College Guides &amp; Insights
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Expert advice on admissions, fees, placements &amp; career planning
              </p>
            </div>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-accent hover:opacity-80 transition-opacity"
          >
            All Articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Full-width scroll track (no container padding) */}
      <div className="relative overflow-hidden guides-pause-on-hover">
        {/* Left + right fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
        />

        {/* Scrolling row */}
        <div className="animate-guides-scroll flex gap-4 py-2" style={{ paddingLeft: "1rem" }}>
          {looped.map((guide, i) => (
            <GuideCard key={`${guide.slug}-${i}`} guide={guide} />
          ))}
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="mt-4 sm:hidden text-center">
        <Link href="/blog" className="text-xs font-semibold text-accent">
          View all guides →
        </Link>
      </div>
    </section>
  )
}
