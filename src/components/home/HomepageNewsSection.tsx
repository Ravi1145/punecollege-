"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight, Clock, ChevronRight, Flame, Newspaper } from "lucide-react"

// ── Static article data ────────────────────────────────────────────────────
const ARTICLES = [
  {
    slug:     "best-btech-colleges-pune-2026",
    title:    "Top 10 Best BTech Colleges in Pune 2026: Rankings, Fees & Placements",
    author:   "CollegePune Editorial",
    date:     "15 Jan, 2026",
    readTime: "8 min",
    category: "Engineering",
  },
  {
    slug:     "mba-colleges-pune-fees-placements-2026",
    title:    "Best MBA Colleges in Pune 2026: Fees, SNAP/CAT Cutoff & Placements",
    author:   "MBA Expert Team",
    date:     "20 Jan, 2026",
    readTime: "10 min",
    category: "MBA",
  },
  {
    slug:     "mht-cet-2026-preparation-strategy",
    title:    "MHT-CET 2026: Complete Preparation Strategy, Syllabus & Scoring Tips",
    author:   "Academic Expert",
    date:     "1 Feb, 2026",
    readTime: "12 min",
    category: "Exams",
  },
  {
    slug:     "top-10-engineering-colleges-pune-2026-nirf-rankings",
    title:    "Pune Engineering Colleges NIRF Rankings 2026 — Full List with Fees",
    author:   "Rankings Desk",
    date:     "5 Feb, 2026",
    readTime: "7 min",
    category: "Rankings",
  },
  {
    slug:     "government-vs-private-college-fees-pune-2026",
    title:    "Government vs Private College Fees in Pune 2026 — Worth the Cost?",
    author:   "Finance Expert",
    date:     "10 Feb, 2026",
    readTime: "9 min",
    category: "Fees",
  },
]

// ── Sidebar news items ────────────────────────────────────────────────────
const POPULAR_NEWS = [
  { title: "MHT-CET 2026 Result Date Announced — Check Scorecard Now", date: "15 May, 2026" },
  { title: "COEP Pune Admission 2026 Open — Direct Admission Process", date: "14 May, 2026" },
  { title: "SNAP 2026 Registration Starts August 1 — SIBM, SCMHRD", date: "13 May, 2026" },
  { title: "MahaDBT Scholarship 2026: Apply Before June 30 Deadline", date: "12 May, 2026" },
  { title: "JEE Advanced 2026 Cutoff for Pune Colleges Released", date: "11 May, 2026" },
  { title: "NEET UG 2026: AFMC Pune Seat Matrix & Cutoff Prediction", date: "10 May, 2026" },
  { title: "MIT-WPU Launches New AI & Robotics B.Tech Programme 2026", date: "9 May, 2026" },
  { title: "VIT Pune Placement 2026: 100% Placement with ₹8.5 LPA Avg", date: "8 May, 2026" },
  { title: "Symbiosis CAT 2026 Cutoff: SIBM Pune Expects 97 Percentile", date: "7 May, 2026" },
  { title: "PICT Pune Admissions 2026: Fee Structure & Seats Announced", date: "6 May, 2026" },
]

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700",
  MBA:         "bg-orange-100 text-orange-700",
  Exams:       "bg-purple-100 text-purple-700",
  Rankings:    "bg-green-100 text-green-700",
  Fees:        "bg-amber-100 text-amber-700",
}

// ── Initials avatar ───────────────────────────────────────────────────────
function Avatar({ title, size = "md" }: { title: string; size?: "sm" | "md" }) {
  const letter = title[0].toUpperCase()
  const palette = ["bg-blue-600","bg-orange-500","bg-purple-600","bg-green-600","bg-rose-500","bg-teal-600"]
  const color = palette[title.charCodeAt(0) % palette.length]
  const cls = size === "sm"
    ? `${color} w-10 h-9 rounded-lg flex items-center justify-center text-white font-extrabold text-sm shrink-0`
    : `${color} w-12 h-10 rounded-lg flex items-center justify-center text-white font-extrabold text-base shrink-0`
  return <div className={cls}>{letter}</div>
}

export default function HomepageNewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-10 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "linear-gradient(135deg, #0A1628, #1E3A5F)" }}>
              <Newspaper className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">
                Trending Education Insights
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Latest guides, rankings &amp; admission news from Pune</p>
            </div>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-accent hover:opacity-80 transition-opacity"
          >
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Main grid: content + right column (fixed width) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 items-start">

          {/* ── Left: article list ──────────────────────────────────────── */}
          <div className="flex flex-col">
            <div className="divide-y divide-gray-100">
              {ARTICLES.map((article, i) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex items-start gap-3 py-3.5 hover:bg-orange-50/40 -mx-2 px-2 rounded-xl transition-colors"
                >
                  {/* Index badge */}
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold mt-0.5"
                    style={i === 0
                      ? { backgroundColor: "var(--color-accent)", color: "#fff" }
                      : { backgroundColor: "#F1F5F9", color: "#64748B" }
                    }
                  >
                    {i + 1}
                  </span>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] ?? "bg-gray-100 text-gray-600"}`}>
                        {article.category}
                      </span>
                      {i === 0 && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold text-orange-600">
                          <Flame className="w-2.5 h-2.5" /> Trending
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-400">
                      <span className="font-medium text-gray-500">{article.author}</span>
                      <span>·</span>
                      <span>{article.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" /> {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <Avatar title={article.title} size="md" />
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/blog"
              className="mt-4 w-full flex items-center justify-center gap-2 font-bold text-xs py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:border-accent hover:text-accent transition-all"
            >
              View All News &amp; Updates <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* ── Right: auto-scrolling popular news ─────────────────────── */}
          <div>
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">

              {/* Header */}
              <div
                className="px-3 py-2.5 flex items-center justify-between shrink-0"
                style={{ background: "linear-gradient(90deg, #0A1628 0%, #1E3A5F 100%)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="font-bold text-xs text-white tracking-wide">Popular News</span>
                </div>
                <Link href="/news" className="text-[11px] text-blue-300 hover:text-white transition-colors font-medium">
                  See all →
                </Link>
              </div>

              {/* Scroll container */}
              <div className="overflow-hidden relative h-80">
                {/* Fade overlays */}
                <div className="absolute top-0 left-0 right-0 h-5 z-10 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, white, transparent)" }} />
                <div className="absolute bottom-0 left-0 right-0 h-5 z-10 pointer-events-none"
                  style={{ background: "linear-gradient(to top, white, transparent)" }} />

                {/* Scrolling content */}
                <div
                  ref={scrollRef}
                  className="animate-news-scroll"
                  style={{ paddingTop: 6 }}
                  onMouseEnter={() => { if (scrollRef.current) scrollRef.current.style.animationPlayState = "paused" }}
                  onMouseLeave={() => { if (scrollRef.current) scrollRef.current.style.animationPlayState = "running" }}
                >
                  {[...POPULAR_NEWS, ...POPULAR_NEWS].map((news, i) => (
                    <Link
                      key={i}
                      href="/news"
                      className="group flex items-start gap-2.5 px-3 py-2.5 hover:bg-orange-50 transition-colors border-b border-gray-50"
                    >
                      <Avatar title={news.title} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                          {news.title}
                        </p>
                        <p className="text-[10px] text-accent mt-1 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" /> {news.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile view-all */}
        <div className="mt-3 sm:hidden text-center">
          <Link href="/blog" className="text-xs font-semibold text-accent">
            View all articles →
          </Link>
        </div>

      </div>
    </section>
  )
}
