import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"
import CoursesClient from "@/components/courses/CoursesClient"
import CourseRecommender from "@/components/courses/CourseRecommender"

export const metadata: Metadata = genMeta({
  title: "Courses in Pune 2026 — Engineering, MBA, MBBS, BCA & More",
  description:
    "Browse 500+ undergraduate and postgraduate courses offered by top Pune colleges. Compare fees, duration, average salary, and eligible colleges for B.Tech, MBA, MBBS, BCA, BBA and more.",
  path: "/courses",
  keywords: [
    "courses in pune",
    "engineering courses pune",
    "mba courses pune",
    "btech colleges pune",
    "bca colleges pune",
    "undergraduate courses pune",
    "postgraduate courses pune",
  ],
})

export default function CoursesPage() {
  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Courses in Pune 2026
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Explore 500+ undergraduate and postgraduate courses offered by top Pune colleges. Compare fees, duration, salary, and top colleges.
          </p>
        </div>
      </div>

      {/* AI Course Recommender */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎓</span>
              <div>
                <h2 className="font-extrabold text-white text-lg leading-tight">AI Course Recommender</h2>
                <p className="text-blue-200 text-xs">Tell us your interests and goals — get personalized course matches in seconds</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <CourseRecommender />
          </div>
        </div>
      </div>

      <CoursesClient />
    </div>
  )
}
