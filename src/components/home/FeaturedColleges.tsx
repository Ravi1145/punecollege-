import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedColleges, getTopEngineeringColleges } from "@/data/colleges"
import CollegeCard from "@/components/colleges/CollegeCard"

export default function FeaturedColleges() {
  const featured = [...getFeaturedColleges(), ...getTopEngineeringColleges()].slice(0, 8)

  return (
    <section className="py-16 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Colleges in Pune
            </h2>
            <p className="text-gray-500 mt-2">NIRF ranked and top-rated colleges across all streams</p>
          </div>
          <Link
            href="/colleges"
            className="hidden sm:flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featured.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            View All Colleges <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
