import Link from "next/link"
import { TrendingUp, IndianRupee } from "lucide-react"
import { Course } from "@/types"
import { formatFeesRange, formatCurrency } from "@/lib/utils"

const COURSE_BANNER = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=75"

const levelColors: Record<string, string> = {
  UG:      "bg-blue-500 text-white",
  PG:      "bg-purple-500 text-white",
  Diploma: "bg-green-500 text-white",
  PhD:     "bg-orange-500 text-white",
}

const streamEmoji: Record<string, string> = {
  Engineering:  "⚙️",
  Management:   "💼",
  Medical:      "🩺",
  Law:          "⚖️",
  Architecture: "🏛️",
  Commerce:     "📊",
  Arts:         "🎨",
  Science:      "🔬",
}

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`} className="block group h-full">
      <article className="bg-white rounded-2xl border border-gray-100 hover:border-orange-400 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">

        {/* ── Header with image background ── */}
        <div
          className="relative p-4 pb-3 overflow-hidden"
          style={{
            backgroundImage: `url(${COURSE_BANNER})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/90 via-[#0A1628]/85 to-[#0A1628]/92" />

          {/* Level badge top-right */}
          <span className={`absolute top-3 right-3 z-20 text-xs font-bold px-2.5 py-0.5 rounded-full ${levelColors[course.level] ?? "bg-gray-500 text-white"}`}>
            {course.level}
          </span>

          {/* Icon + name row */}
          <div className="relative z-10 flex items-start gap-3 pr-10">
            {/* Emoji icon badge */}
            <div className="shrink-0 w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center">
              <span className="text-2xl">{streamEmoji[course.stream] ?? "📚"}</span>
            </div>

            {/* Name + full name */}
            <div className="flex-1 min-w-0 pt-0.5">
              <h3
                className="text-white font-bold text-base leading-snug group-hover:text-orange-300 transition-colors"
                style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
              >
                {course.name}
              </h3>
              <p
                className="text-xs text-white/90 mt-1 line-clamp-1"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
              >
                {course.fullName}
              </p>
            </div>
          </div>

          {/* Badge row */}
          <div className="relative z-10 flex flex-wrap gap-1.5 mt-3">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-orange-500 text-white">
              {course.stream}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-white/20 text-white border border-white/30">
              {course.duration}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-4 flex flex-col flex-1 gap-3 bg-white">

          {/* Fees + Salary */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-orange-50 border border-orange-100 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1 mb-1">
                <IndianRupee className="w-3 h-3 text-orange-400 shrink-0" />
                <span className="text-[9px] text-orange-500 font-semibold uppercase tracking-wider">Annual Fees</span>
              </div>
              <p className="text-xs font-bold text-gray-900 leading-tight">
                {formatFeesRange(course.avgFees.min, course.avgFees.max)}
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-blue-400 shrink-0" />
                <span className="text-[9px] text-blue-500 font-semibold uppercase tracking-wider">Avg Salary</span>
              </div>
              <p className="text-xs font-bold text-gray-900 leading-tight">
                {formatCurrency(course.avgSalary)}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{course.description}</p>

          {/* Entrance exam tags */}
          <div className="flex flex-wrap gap-1.5">
            {course.entranceExams.slice(0, 3).map((exam) => (
              <span key={exam} className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full font-medium">
                {exam}
              </span>
            ))}
            {course.entranceExams.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full font-medium">
                +{course.entranceExams.length - 3} More
              </span>
            )}
          </div>

          {/* Top colleges */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 mt-auto">
            <span className="text-xs text-gray-400 font-medium w-full">Top Colleges:</span>
            {course.topColleges.slice(0, 3).map((col) => (
              <span key={col} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                {col}
              </span>
            ))}
            {course.topColleges.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                +{course.topColleges.length - 3}
              </span>
            )}
          </div>

        </div>
      </article>
    </Link>
  )
}
