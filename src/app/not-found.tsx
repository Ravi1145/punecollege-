import Link from "next/link"
import type { Metadata } from "next"
import { Home, Search, GraduationCap, BookOpen, PhoneCall } from "lucide-react"
import GoBackButton from "@/components/ui/GoBackButton"

export const metadata: Metadata = {
  title: "Page Not Found — CollegePune",
  description: "Sorry, the page you are looking for doesn't exist. Find the best colleges in Pune — engineering, MBA, medical, and more.",
  robots: { index: false, follow: true },
}

const QUICK_LINKS = [
  { icon: "⚙️", label: "Engineering Colleges Pune", href: "/engineering-colleges-pune" },
  { icon: "💼", label: "MBA Colleges Pune", href: "/mba-colleges-pune" },
  { icon: "🏥", label: "Medical Colleges Pune", href: "/medical-colleges-pune" },
  { icon: "🎓", label: "Top 10 Engineering Colleges", href: "/top-10-engineering-colleges-in-pune" },
  { icon: "🏆", label: "Top 10 MBA Colleges", href: "/top-10-mba-colleges-in-pune" },
  { icon: "🔮", label: "AI College Finder", href: "/ai-finder" },
]

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F8FAFC" }}>
      {/* Hero */}
      <div
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)" }}
      >
        {/* 404 number */}
        <div
          className="text-center font-extrabold leading-none mb-4 select-none"
          style={{
            fontSize: "clamp(5rem, 20vw, 10rem)",
            background: "linear-gradient(135deg, rgba(255,106,0,0.15) 0%, rgba(255,106,0,0.05) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "rgba(255,106,0,0.25)",
          }}
        >
          404
        </div>

        {/* Message */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Oops! Page Not Found
        </h1>
        <p className="text-blue-200 text-base max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back to finding the right college in Pune!
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 font-bold text-white px-7 py-3.5 rounded-xl text-sm transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(90deg,#FF6A00,#FF9A00)",
              boxShadow: "0 4px 18px rgba(255,106,0,0.40)",
            }}
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/colleges"
            className="inline-flex items-center justify-center gap-2 font-semibold text-white px-7 py-3.5 rounded-xl text-sm transition-all active:scale-95"
            style={{ border: "1px solid rgba(255,255,255,0.30)", backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <Search className="w-4 h-4" />
            Browse All Colleges
          </Link>
        </div>

        {/* Search box */}
        <form action="/colleges" method="get" className="max-w-sm mx-auto mt-6">
          <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-lg">
            <Search className="ml-3 w-4 h-4 text-gray-400 shrink-0" />
            <input
              name="search"
              type="text"
              placeholder="Search colleges, e.g. COEP, PICT…"
              className="flex-1 px-3 py-3 text-gray-900 text-sm outline-none bg-transparent placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="shrink-0 font-bold text-white text-sm px-4 py-3 transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#FF6A00" }}
            >
              Go
            </button>
          </div>
        </form>
      </div>

      {/* Quick links */}
      <div className="max-w-4xl mx-auto px-4 py-12 w-full">
        <h2 className="text-lg font-bold text-gray-900 mb-5 text-center">
          Popular Pages on CollegePune
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {QUICK_LINKS.map(({ icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-orange-200 hover:shadow-md transition-all group"
            >
              <span className="text-xl shrink-0">{icon}</span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>

        {/* Help section */}
        <div
          className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ background: "linear-gradient(135deg, #0A1628, #1E3A5F)" }}
        >
          <div className="text-white text-center sm:text-left">
            <p className="font-bold text-lg flex items-center gap-2 justify-center sm:justify-start">
              <GraduationCap className="w-5 h-5 text-orange-400" />
              Still can&apos;t find what you need?
            </p>
            <p className="text-blue-200 text-sm mt-1">
              Our expert counsellors can help you find the right college for your career.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/ai-finder"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              AI College Finder
            </Link>
            <Link
              href="/counselling"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              Free Counselling
            </Link>
          </div>
        </div>

        {/* Go back link */}
        <div className="text-center mt-6">
          <GoBackButton />
        </div>

        {/* SEO text for bots */}
        <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-100">
          <p className="text-xs text-blue-600 flex items-start gap-2">
            <BookOpen className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              <strong>Looking for colleges in Pune?</strong> CollegePune covers 100+ engineering, MBA, medical, arts, and design colleges in Pune with 2026 fees, placements, NAAC grades, and admission details. Visit our{" "}
              <Link href="/colleges" className="underline font-semibold">colleges directory</Link> or use the{" "}
              <Link href="/ai-finder" className="underline font-semibold">AI finder</Link> to get matched instantly.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
