"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu, X, GraduationCap, ChevronDown, Sparkles, PhoneCall,
  Search, Calculator, BarChart3, BookOpen, Award, Compass,
  Building2, Microscope, Scale, Palette, TrendingUp, Star
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Mega-menu data ────────────────────────────────────────────
const streams = [
  {
    label: "Engineering",
    href: "/colleges?stream=Engineering",
    icon: "⚙️",
    colleges: [
      { name: "COEP — Govt. Engineering", href: "/colleges/coep-college-of-engineering-pune" },
      { name: "VIT Pune", href: "/colleges/vit-pune-vishwakarma-institute-of-technology" },
      { name: "PICT", href: "/colleges/pict-pune-institute-of-computer-technology" },
      { name: "Engineering Colleges Guide 2026 →", href: "/engineering-colleges-pune" },
      { name: "All Engineering Colleges →", href: "/colleges?stream=Engineering" },
    ],
    courses: [
      { name: "B.Tech Computer Engineering", href: "/courses/btech-computer-engineering-pune" },
      { name: "B.Tech Mechanical", href: "/courses/btech-mechanical-engineering-pune" },
      { name: "All Engineering Courses →", href: "/courses" },
    ],
    exams: [
      { name: "MHT-CET", href: "/exams/mht-cet" },
      { name: "JEE Main", href: "/exams/jee-main" },
      { name: "JEE Advanced", href: "/exams/jee-advanced" },
    ],
  },
  {
    label: "MBA",
    href: "/colleges?stream=MBA",
    icon: "💼",
    colleges: [
      { name: "SIBM Pune", href: "/colleges/sibm-symbiosis-institute-business-management-pune" },
      { name: "MIT-SOM Pune", href: "/colleges/mit-school-of-management-pune" },
      { name: "MBA Colleges Guide 2026 →", href: "/mba-colleges-pune" },
      { name: "All MBA Colleges →", href: "/colleges?stream=MBA" },
    ],
    courses: [
      { name: "MBA — Master of Business Administration", href: "/courses/mba-pune-master-business-administration" },
      { name: "All Management Courses →", href: "/courses" },
    ],
    exams: [
      { name: "CAT", href: "/exams/cat" },
      { name: "SNAP", href: "/exams/snap" },
      { name: "MAT", href: "/exams/mat" },
      { name: "CMAT", href: "/exams/cmat" },
      { name: "XAT", href: "/exams/xat" },
    ],
  },
  {
    label: "Medical",
    href: "/colleges?stream=Medical",
    icon: "🏥",
    colleges: [
      { name: "BJ Medical College", href: "/colleges/bj-medical-college-pune" },
      { name: "Medical Colleges Guide 2026 →", href: "/medical-colleges-pune" },
      { name: "All Medical Colleges →", href: "/colleges?stream=Medical" },
    ],
    courses: [
      { name: "MBBS", href: "/courses/mbbs-pune-bachelor-medicine-surgery" },
      { name: "All Medical Courses →", href: "/courses" },
    ],
    exams: [
      { name: "NEET", href: "/exams/neet" },
    ],
  },
  {
    label: "Arts & Science",
    href: "/colleges?stream=Arts+%26+Science",
    icon: "🎓",
    colleges: [
      { name: "All Arts & Science Colleges →", href: "/colleges?stream=Arts+%26+Science" },
    ],
    courses: [
      { name: "BCA", href: "/courses/bca-bachelor-computer-applications-pune" },
      { name: "All Science Courses →", href: "/courses" },
    ],
    exams: [
      { name: "MHT-CET", href: "/exams/mht-cet" },
      { name: "All Exams →", href: "/exams" },
    ],
  },
  {
    label: "Law",
    href: "/colleges?stream=Law",
    icon: "⚖️",
    colleges: [
      { name: "All Law Colleges →", href: "/colleges?stream=Law" },
    ],
    courses: [
      { name: "LLB — Bachelor of Laws", href: "/courses" },
      { name: "BA LLB (5-year)", href: "/courses" },
    ],
    exams: [
      { name: "CLAT", href: "/exams" },
      { name: "MH-CET Law", href: "/exams" },
    ],
  },
  {
    label: "Design",
    href: "/colleges",
    icon: "🎨",
    colleges: [
      { name: "All Design Colleges →", href: "/colleges" },
    ],
    courses: [
      { name: "B.Des — Bachelor of Design", href: "/courses" },
      { name: "B.Arch", href: "/courses" },
    ],
    exams: [
      { name: "NATA", href: "/exams" },
      { name: "NID DAT", href: "/exams" },
    ],
  },
]

const tools = [
  { label: "College Predictor", href: "/predictor", icon: GraduationCap, desc: "Find colleges by your score", color: "text-orange-600 bg-orange-50" },
  { label: "Compare Colleges", href: "/compare", icon: BarChart3, desc: "Side-by-side comparison", color: "text-blue-600 bg-blue-50" },
  { label: "ROI Calculator", href: "/roi-calculator", icon: Calculator, desc: "Calculate education returns", color: "text-green-600 bg-green-50" },
  { label: "NIRF Insights", href: "/nirf-insights", icon: Award, desc: "Official rankings & data", color: "text-purple-600 bg-purple-50" },
  { label: "AI College Finder", href: "/ai-finder", icon: Sparkles, desc: "AI-powered matching", color: "text-pink-600 bg-pink-50" },
  { label: "Free Counselling", href: "/counselling", icon: PhoneCall, desc: "Talk to an expert", color: "text-teal-600 bg-teal-50" },
]

const explore = [
  { label: "Blog & Guides", href: "/blog", icon: BookOpen },
  { label: "Entrance Exams", href: "/exams", icon: Compass },
  { label: "All Courses", href: "/courses", icon: Star },
  { label: "All Colleges", href: "/colleges", icon: Building2 },
]

// ── Component ─────────────────────────────────────────────────
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const openDropdown = (id: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setActiveDropdown(id)
  }
  const closeDropdown = () => {
    timerRef.current = setTimeout(() => setActiveDropdown(null), 120)
  }
  const keepDropdown = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled ? "shadow-md" : ""
      )}>
        {/* ── Top bar ── */}
        <div className="bg-[#0A1628]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="leading-none">
                <span className="text-lg font-extrabold text-white">College<span className="text-orange-400">Pune</span></span>
                <p className="text-[10px] text-gray-400 -mt-0.5 hidden sm:block">AI-Powered Discovery</p>
              </div>
            </Link>

            {/* Search bar — desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <form action="/colleges" method="get">
                  <input
                    name="search"
                    type="text"
                    placeholder="Search colleges, courses, exams..."
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm rounded-xl pl-9 pr-4 py-2 outline-none focus:bg-white/20 focus:border-white/40 transition-all"
                  />
                </form>
              </div>
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-2">
              <button
                className="md:hidden text-white/70 hover:text-white p-1"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/ai-finder"
                className="hidden sm:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden lg:inline">AI Finder</span>
              </Link>
              <Link
                href="/counselling"
                className="hidden md:flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span className="hidden lg:inline">Free Counselling</span>
              </Link>
              <button
                className="lg:hidden text-white p-1.5 rounded-lg hover:bg-white/10"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden bg-[#0A1628] border-t border-white/10 px-4 pb-3">
            <form action="/colleges" method="get">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  name="search"
                  type="text"
                  autoFocus
                  placeholder="Search colleges, courses..."
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm rounded-xl pl-9 pr-4 py-2 outline-none"
                />
              </div>
            </form>
          </div>
        )}

        {/* ── Nav bar (desktop) ── */}
        <nav className="hidden lg:block bg-white border-b border-gray-200" ref={dropdownRef}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-0.5 h-10">

              {/* Stream tabs */}
              {streams.map((stream) => (
                <div
                  key={stream.label}
                  onMouseEnter={() => openDropdown(stream.label)}
                  onMouseLeave={closeDropdown}
                  className="relative h-full flex items-center"
                >
                  <button className={cn(
                    "h-full px-3.5 text-sm font-medium flex items-center gap-1 transition-colors border-b-2",
                    activeDropdown === stream.label
                      ? "text-orange-600 border-orange-500"
                      : "text-gray-700 hover:text-orange-600 border-transparent"
                  )}>
                    <span>{stream.icon}</span>
                    {stream.label}
                    <ChevronDown className={cn("w-3 h-3 transition-transform", activeDropdown === stream.label && "rotate-180")} />
                  </button>

                  {/* Stream mega panel */}
                  {activeDropdown === stream.label && (
                    <div
                      onMouseEnter={keepDropdown}
                      onMouseLeave={closeDropdown}
                      className="absolute top-full left-0 mt-0 w-[560px] bg-white rounded-b-2xl shadow-2xl border border-gray-100 border-t-2 border-t-orange-500 z-50 p-5"
                    >
                      <div className="grid grid-cols-3 gap-6">
                        {/* Colleges */}
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                            <Building2 className="w-3 h-3" /> Top Colleges
                          </p>
                          <ul className="space-y-1.5">
                            {stream.colleges.map((c, i) => (
                              <li key={`${stream.label}-col-${i}`}>
                                <Link href={c.href} className="text-sm text-gray-700 hover:text-orange-600 transition-colors block py-0.5">
                                  {c.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Courses */}
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                            <BookOpen className="w-3 h-3" /> Courses
                          </p>
                          <ul className="space-y-1.5">
                            {stream.courses.map((c, i) => (
                              <li key={`${stream.label}-course-${i}`}>
                                <Link href={c.href} className="text-sm text-gray-700 hover:text-orange-600 transition-colors block py-0.5">
                                  {c.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Exams */}
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                            <Compass className="w-3 h-3" /> Entrance Exams
                          </p>
                          <ul className="space-y-1.5">
                            {stream.exams.map((e) => (
                              <li key={e.name}>
                                <Link href={e.href} className="text-sm text-gray-700 hover:text-orange-600 transition-colors block py-0.5">
                                  {e.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link href="/predictor" className="mt-3 block text-xs bg-orange-50 text-orange-700 font-semibold px-3 py-2 rounded-lg hover:bg-orange-100 transition-colors">
                            🎯 Predict your college →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Separator */}
              <div className="w-px h-5 bg-gray-200 mx-1" />

              {/* Tools dropdown */}
              <div
                onMouseEnter={() => openDropdown("tools")}
                onMouseLeave={closeDropdown}
                className="relative h-full flex items-center"
              >
                <button className={cn(
                  "h-full px-3.5 text-sm font-medium flex items-center gap-1 transition-colors border-b-2",
                  activeDropdown === "tools"
                    ? "text-orange-600 border-orange-500"
                    : "text-gray-700 hover:text-orange-600 border-transparent"
                )}>
                  <TrendingUp className="w-3.5 h-3.5" />
                  Tools
                  <ChevronDown className={cn("w-3 h-3 transition-transform", activeDropdown === "tools" && "rotate-180")} />
                </button>
                {activeDropdown === "tools" && (
                  <div
                    onMouseEnter={keepDropdown}
                    onMouseLeave={closeDropdown}
                    className="absolute top-full left-0 mt-0 w-[440px] bg-white rounded-b-2xl shadow-2xl border border-gray-100 border-t-2 border-t-orange-500 z-50 p-4"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {tools.map((t) => (
                        <Link
                          key={t.href}
                          href={t.href}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                        >
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", t.color)}>
                            <t.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{t.label}</p>
                            <p className="text-xs text-gray-400">{t.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Explore dropdown */}
              <div
                onMouseEnter={() => openDropdown("explore")}
                onMouseLeave={closeDropdown}
                className="relative h-full flex items-center"
              >
                <button className={cn(
                  "h-full px-3.5 text-sm font-medium flex items-center gap-1 transition-colors border-b-2",
                  activeDropdown === "explore"
                    ? "text-orange-600 border-orange-500"
                    : "text-gray-700 hover:text-orange-600 border-transparent"
                )}>
                  <Compass className="w-3.5 h-3.5" />
                  Explore
                  <ChevronDown className={cn("w-3 h-3 transition-transform", activeDropdown === "explore" && "rotate-180")} />
                </button>
                {activeDropdown === "explore" && (
                  <div
                    onMouseEnter={keepDropdown}
                    onMouseLeave={closeDropdown}
                    className="absolute top-full left-0 mt-0 w-52 bg-white rounded-b-2xl shadow-2xl border border-gray-100 border-t-2 border-t-orange-500 z-50 py-2"
                  >
                    {explore.map((e) => (
                      <Link
                        key={`desktop-explore-${e.href}`}
                        href={e.href}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <e.icon className="w-4 h-4 text-gray-400" />
                        {e.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile slide-over ───────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-[320px] max-w-full bg-white flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#0A1628]">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-white text-lg">College<span className="text-orange-400">Pune</span></span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="p-3 bg-gray-50 border-b">
              <form action="/colleges" method="get">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input name="search" type="text" placeholder="Search colleges, courses..." className="w-full bg-white border border-gray-200 text-sm rounded-lg pl-9 pr-3 py-2 outline-none" />
                </div>
              </form>
            </div>

            {/* Nav items — scrollable */}
            <div className="flex-1 overflow-y-auto">
              {/* Stream accordion */}
              {streams.map((stream) => (
                <div key={stream.label} className="border-b border-gray-100">
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === stream.label ? null : stream.label)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2">{stream.icon} {stream.label}</span>
                    <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", mobileExpanded === stream.label && "rotate-180")} />
                  </button>
                  {mobileExpanded === stream.label && (
                    <div className="bg-gray-50 px-4 pb-3 space-y-3">
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Colleges</p>
                        {stream.colleges.map((c, i) => (
                          <Link key={`mob-${stream.label}-col-${i}`} href={c.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-gray-700 hover:text-orange-600">
                            {c.name}
                          </Link>
                        ))}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Courses</p>
                        {stream.courses.map((c) => (
                          <Link key={c.name} href={c.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-gray-700 hover:text-orange-600">
                            {c.name}
                          </Link>
                        ))}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Exams</p>
                        {stream.exams.map((e) => (
                          <Link key={e.name} href={e.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-sm text-gray-700 hover:text-orange-600">
                            {e.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Tools section */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === "tools" ? null : "tools")}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4" /> Tools</span>
                  <ChevronDown className={cn("w-4 h-4 text-gray-400 transition-transform", mobileExpanded === "tools" && "rotate-180")} />
                </button>
                {mobileExpanded === "tools" && (
                  <div className="bg-gray-50 px-4 pb-3">
                    {tools.map((t) => (
                      <Link key={t.href} href={t.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 py-2 text-sm text-gray-700 hover:text-orange-600">
                        <t.icon className="w-4 h-4 text-gray-400" />
                        {t.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Explore */}
              <div>
                {explore.map((e) => (
                  <Link key={`mobile-explore-${e.href}`} href={e.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-orange-600 border-b border-gray-100">
                    <e.icon className="w-4 h-4 text-gray-400" />
                    {e.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom CTAs */}
            <div className="p-3 border-t bg-gray-50 grid grid-cols-2 gap-2">
              <Link href="/ai-finder" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-1.5 bg-orange-500 text-white text-sm font-bold py-2.5 rounded-xl">
                <Sparkles className="w-4 h-4" /> AI Finder
              </Link>
              <Link href="/counselling" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-1.5 bg-green-500 text-white text-sm font-bold py-2.5 rounded-xl">
                <PhoneCall className="w-4 h-4" /> Counselling
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
