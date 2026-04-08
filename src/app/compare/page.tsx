import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"
import AIComparison from "@/components/ai/AIComparison"

export const metadata: Metadata = genMeta({
  title: "Compare Colleges in Pune — AI Comparison Tool 2026",
  description: "Compare any two Pune colleges side-by-side using our AI comparison tool. Analyze academics, fees, placements, campus, and faculty to make the right college choice.",
  path: "/compare",
  keywords: ["compare colleges pune", "college comparison pune", "coep vs pict", "sibm vs mit-som"],
})

export default function ComparePage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Compare Colleges in Pune
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Select any two Pune colleges and let our AI provide a detailed comparison across academics, placements, fees, campus life, faculty, and industry connections.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AIComparison />
      </div>
    </div>
  )
}
