"use client"
import Link from "next/link"
import { Sparkles, BookOpen, Award, Shield, Star, Users } from "lucide-react"
import SearchBar from "@/components/ui/SearchBar"

const QUICK_FILTERS = [
  { label: "B.Tech", href: "/colleges?stream=Engineering" },
  { label: "MBA", href: "/colleges?stream=MBA" },
  { label: "MBBS", href: "/colleges?stream=Medical" },
  { label: "BBA", href: "/courses/bba-bachelor-business-administration-pune" },
  { label: "Law", href: "/courses/llb-law-pune-bachelor-legislative-law" },
  { label: "B.Arch", href: "/courses/barch-bachelor-architecture-pune" },
  { label: "B.Sc", href: "/courses/bsc-computer-science-pune" },
  { label: "Arts & Commerce", href: "/colleges?stream=Arts+%26+Science" },
]

const TRUST_BADGES = [
  { icon: Award, text: "NAAC Verified Data" },
  { icon: Shield, text: "Accurate Fee Info" },
  { icon: Star, text: "50K+ Student Reviews" },
  { icon: Users, text: "Free Counseling" },
]

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0A1628] via-[#0d1f3c] to-[#1E3A5F] min-h-[92vh] flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-medium px-4 py-2 rounded-full mb-6 animate-pulse-slow">
            <Sparkles className="w-4 h-4" />
            India&apos;s First AI-Powered Pune College Portal
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
            Find the Best Colleges in Pune
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              — AI-Powered Discovery
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Compare 500+ courses, real fees, placement stats and student reviews for top engineering, MBA, medical and arts colleges in Pune. Let our AI find your perfect match.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <SearchBar
              size="lg"
              placeholder="Search colleges like COEP, SIBM, AFMC, VIT Pune..."
              className="shadow-2xl"
            />
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {QUICK_FILTERS.map((filter) => (
              <Link
                key={filter.label}
                href={filter.href}
                className="bg-white/10 hover:bg-orange-500 border border-white/20 hover:border-orange-500 text-white text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
              >
                {filter.label}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-14">
            <Link
              href="/ai-finder"
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-4 rounded-2xl text-base transition-all hover:scale-105 shadow-lg shadow-orange-500/30 w-full sm:w-auto"
            >
              <Sparkles className="w-5 h-5" />
              Try AI College Finder
            </Link>
            <Link
              href="/colleges"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-4 rounded-2xl text-base transition-all w-full sm:w-auto"
            >
              <BookOpen className="w-5 h-5" />
              Browse 25+ Colleges
            </Link>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-10">
            {[
              { value: "25+", label: "Verified Colleges" },
              { value: "500+", label: "Courses Listed" },
              { value: "50K+", label: "Student Reviews" },
              { value: "₹0", label: "Free to Use" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-4">
                <p className="text-3xl font-extrabold text-orange-400 mb-1">{value}</p>
                <p className="text-sm text-gray-400">{label}</p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {TRUST_BADGES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-gray-400 text-sm">
                <Icon className="w-4 h-4 text-green-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
