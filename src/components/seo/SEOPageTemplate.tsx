"use client"

import Link from "next/link"
import { ExternalLink, MapPin, Star, TrendingUp, BookOpen, Building2 } from "lucide-react"
import type { College } from "@/types"
import type { SEOPage } from "@/data/seoPages"

interface Props {
  page: SEOPage
  colleges: College[]
}

function formatFees(min: number, max: number): string {
  const fmt = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`
  return `${fmt(min)} – ${fmt(max)}`
}

function formatPkg(n: number): string {
  if (!n) return "N/A"
  return `₹${(n / 100000).toFixed(1)} LPA`
}

export default function SEOPageTemplate({ page, colleges }: Props) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <nav className="text-sm text-blue-200 mb-4 flex gap-1 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/colleges-in-pune" className="hover:text-white">Colleges in Pune</Link>
            <span>/</span>
            <span className="text-white">{page.h1}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{page.h1}</h1>
          <p className="text-blue-100 text-lg max-w-3xl">{page.description}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-blue-200">
            <span>{colleges.length} colleges listed</span>
            <span>·</span>
            <span>Updated April 2026</span>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      {colleges.length > 0 && (
        <section className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-700">{colleges.length}</div>
              <div className="text-sm text-gray-500">Colleges</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">
                {colleges.filter((c) => c.naac === "A+" || c.naac === "A++").length}
              </div>
              <div className="text-sm text-gray-500">NAAC A+ / A++</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">
                {colleges.filter((c) => c.hostel).length}
              </div>
              <div className="text-sm text-gray-500">With Hostel</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">
                {colleges.filter((c) => c.nirfRank).length}
              </div>
              <div className="text-sm text-gray-500">NIRF Ranked</div>
            </div>
          </div>
        </section>
      )}

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        {colleges.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Building2 className="mx-auto mb-4 text-gray-300" size={48} />
            <p className="text-lg">No colleges found for this filter yet.</p>
            <Link href="/colleges" className="mt-4 inline-block text-blue-600 underline">
              Browse all colleges
            </Link>
          </div>
        ) : (
          colleges.map((college, i) => (
            <CollegeCard key={college.id} college={college} rank={i + 1} />
          ))
        )}
      </div>

      {/* Related pages */}
      <section className="bg-white border-t mt-10 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Related Searches</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Engineering Colleges Pune", href: "/colleges-in-pune/engineering-colleges-pune" },
              { label: "MBA Colleges Pune", href: "/colleges-in-pune/mba-colleges-pune" },
              { label: "Government Colleges Pune", href: "/colleges-in-pune/government-colleges-pune" },
              { label: "NAAC A+ Colleges Pune", href: "/colleges-in-pune/naac-a-plus-colleges-pune" },
              { label: "Best Placements Pune", href: "/colleges-in-pune/top-placement-colleges-pune" },
              { label: "Low Fee Colleges Pune", href: "/colleges-in-pune/low-fee-colleges-pune" },
              { label: "MHT-CET Colleges Pune", href: "/colleges-in-pune/mht-cet-colleges-pune" },
              { label: "Medical Colleges Pune", href: "/colleges-in-pune/medical-colleges-pune" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-full border border-blue-200 text-blue-700 text-sm hover:bg-blue-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function CollegeCard({ college, rank }: { college: College; rank: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col md:flex-row gap-5">
      <div className="flex-shrink-0 flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
          {rank}
        </div>
        {college.image ? (
          <img
            src={college.image}
            alt={college.shortName}
            className="w-14 h-14 object-contain rounded-lg border bg-white p-1"
          />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center text-blue-700 font-bold text-lg">
            {college.shortName[0]}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <Link
              href={`/colleges/${college.slug}`}
              className="text-lg font-semibold text-gray-900 hover:text-blue-700 transition-colors"
            >
              {college.name}
            </Link>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
              <MapPin size={13} className="flex-shrink-0" />
              <span>{college.location}</span>
              {college.nirfRank && (
                <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  NIRF #{college.nirfRank}
                </span>
              )}
              {college.naac && (
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                  NAAC {college.naac}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
            <Star size={14} fill="currentColor" />
            <span>{college.rating?.toFixed(1) ?? "—"}</span>
            <span className="text-gray-400 font-normal">({college.reviewCount})</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <div className="text-xs text-gray-400 mb-0.5">Annual Fees</div>
            <div className="font-semibold text-gray-800">
              {formatFees(college.feesRange.min, college.feesRange.max)}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-0.5">Avg Package</div>
            <div className="font-semibold text-gray-800 flex items-center gap-1">
              <TrendingUp size={12} className="text-green-500" />
              {formatPkg(college.avgPlacement)}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-0.5">Type</div>
            <div className="font-semibold text-gray-800">{college.type}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-0.5">Est.</div>
            <div className="font-semibold text-gray-800">{college.established}</div>
          </div>
        </div>

        {college.courses && college.courses.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {college.courses.slice(0, 5).map((c) => (
              <span key={c} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {c}
              </span>
            ))}
            {college.courses.length > 5 && (
              <span className="text-xs text-gray-400">+{college.courses.length - 5} more</span>
            )}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/colleges/${college.slug}`}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Profile
          </Link>
          {college.website && (
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              Website <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
