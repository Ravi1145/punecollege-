import { GraduationCap, BookOpen, Users, Star, Building2, TrendingUp } from "lucide-react"

const stats = [
  { icon: Building2, value: "25+", label: "Verified Colleges", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: BookOpen, value: "500+", label: "Courses Listed", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: Users, value: "50K+", label: "Student Reviews", color: "text-green-600", bg: "bg-green-50" },
  { icon: Star, value: "4.5★", label: "Avg Rating", color: "text-yellow-600", bg: "bg-yellow-50" },
  { icon: TrendingUp, value: "₹28L", label: "Highest Avg Package", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: GraduationCap, value: "100%", label: "Free to Use", color: "text-teal-600", bg: "bg-teal-50" },
]

export default function StatsCounter() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map(({ icon: Icon, value, label, color, bg }) => (
            <div key={label} className="text-center">
              <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
