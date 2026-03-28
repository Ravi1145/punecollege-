"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, GraduationCap, ChevronDown, Sparkles, PhoneCall } from "lucide-react"
import { cn } from "@/lib/utils"
import SearchBar from "@/components/ui/SearchBar"

interface NavLink {
  label: string
  href: string
  highlight?: boolean
  children?: { label: string; href: string }[]
}

const navLinks: NavLink[] = [
  {
    label: "Colleges",
    href: "/colleges",
    children: [
      { label: "All Colleges in Pune", href: "/colleges" },
      { label: "Engineering Colleges", href: "/colleges?stream=Engineering" },
      { label: "MBA Colleges", href: "/colleges?stream=MBA" },
      { label: "Medical Colleges", href: "/colleges?stream=Medical" },
      { label: "Arts & Science Colleges", href: "/colleges?stream=Arts+%26+Science" },
    ],
  },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "B.Tech / BE", href: "/courses/btech-computer-engineering-pune" },
      { label: "MBA", href: "/courses/mba-pune-master-business-administration" },
      { label: "MBBS", href: "/courses/mbbs-pune-bachelor-medicine-surgery" },
      { label: "BCA", href: "/courses/bca-bachelor-computer-applications-pune" },
      { label: "All Courses", href: "/courses" },
    ],
  },
  { label: "Exams", href: "/exams" },
  { label: "Compare", href: "/compare" },
  { label: "Blog", href: "/blog" },
  { label: "Free Counselling", href: "/counselling", highlight: true },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100"
          : "bg-[#0A1628]"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={cn("text-lg font-bold", isScrolled ? "text-[#0A1628]" : "text-white")}>
                College<span className="text-orange-500">Pune</span>
              </span>
              <span className={cn("text-[10px]", isScrolled ? "text-gray-500" : "text-gray-400")}>
                AI-Powered Discovery
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    link.highlight
                      ? "bg-green-500 hover:bg-green-600 text-white font-semibold"
                      : isScrolled
                        ? "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                        : "text-gray-300 hover:text-white hover:bg-white/10",
                    !link.highlight && pathname === link.href && (isScrolled ? "text-orange-600 bg-orange-50" : "text-white bg-white/10")
                  )}
                >
                  {link.highlight && <PhoneCall className="w-3.5 h-3.5" />}
                  {link.label}
                  {link.children && <ChevronDown className="w-3 h-3" />}
                </Link>
                {link.children && openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/ai-finder"
              className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              AI Finder
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "lg:hidden p-2 rounded-lg",
                isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search bar (visible on scroll) */}
        {isScrolled && (
          <div className="hidden lg:block pb-3">
            <SearchBar size="sm" className="max-w-md" />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-3">
            <SearchBar size="sm" />
          </div>
          <nav className="px-4 pb-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 justify-between px-3 py-2.5 font-medium rounded-lg transition-colors",
                    link.highlight
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "text-gray-800 hover:bg-orange-50 hover:text-orange-600"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {link.highlight && <PhoneCall className="w-4 h-4" />}
                    {link.label}
                  </span>
                </Link>
                {link.children && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/ai-finder"
              className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl mt-3 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              Try AI College Finder
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
