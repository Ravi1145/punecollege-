import { Metadata } from "next"
import { Suspense } from "react"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import Script from "next/script"
import CollegeGrid from "@/components/colleges/CollegeGrid"

export const metadata: Metadata = genMeta({
  title: "All Colleges in Pune 2025 — Fees, Rankings & Reviews",
  description: "Browse and compare all 25+ colleges in Pune. Filter by stream (Engineering, MBA, Medical), fees, NAAC grade, and location. Find government, private & deemed colleges with real placement data.",
  path: "/colleges",
  keywords: ["colleges in pune", "engineering colleges pune", "mba colleges pune", "medical colleges pune", "pune university colleges list", "colleges in pune with fees"],
})

export default function CollegesPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges in Pune", url: "/colleges" },
  ])

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="bg-[#F8FAFC] min-h-screen">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              All Colleges in Pune 2025
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Discover and compare 25+ top engineering, MBA, medical and arts colleges in Pune. Real fees, placements, and NAAC data.
            </p>
          </div>
        </div>

        <Suspense fallback={<div className="flex items-center justify-center h-64 text-gray-500">Loading colleges...</div>}>
          <CollegeGrid />
        </Suspense>
      </div>
    </>
  )
}
