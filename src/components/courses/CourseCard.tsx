import Link from "next/link"
import { Clock, TrendingUp, BookOpen, IndianRupee, GraduationCap } from "lucide-react"
import { Course } from "@/types"
import { formatFeesRange, formatCurrency } from "@/lib/utils"

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const levelColors: Record<string, string> = {
    UG: "bg-blue-100 text-blue-700",
    PG: "bg-purple-100 text-purple-700",
    Diploma: "bg-green-100 text-green-700",
    PhD: "bg-orange-100 text-orange-700",
  }

  return (
    <Link href={`/courses/${course.slug}`} className="block group">
      <article className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelColors[course.level]}`}>
              {course.level}
            </span>
          </div>
          <h3 className="text-white font-bold text-base leading-tight group-hover:text-orange-300 transition-colors">
            {course.name}
          </h3>
          <p className="text-gray-400 text-sm mt-1 line-clamp-1">{course.stream}</p>
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">{course.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">Duration</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{course.duration}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">Avg Salary</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{formatCurrency(course.avgSalary)}</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center gap-1 mb-2">
              <IndianRupee className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">Annual Fees</span>
            </div>
            <p className="text-sm font-semibold text-gray-800">
              {formatFeesRange(course.avgFees.min, course.avgFees.max)}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-medium mb-2">Entrance Exams</p>
            <div className="flex flex-wrap gap-1">
              {course.entranceExams.slice(0, 3).map((exam) => (
                <span key={exam} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                  {exam}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
