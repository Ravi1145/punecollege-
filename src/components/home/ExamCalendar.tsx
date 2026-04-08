import Link from "next/link"
import { Calendar, ArrowRight, ExternalLink } from "lucide-react"
import { exams } from "@/data/exams"
import { cn } from "@/lib/utils"

const levelColors: Record<string, string> = {
  National: "bg-blue-100 text-blue-700",
  State: "bg-green-100 text-green-700",
  University: "bg-purple-100 text-purple-700",
}

export default function ExamCalendar() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-full mb-3">
              <Calendar className="w-4 h-4" />
              Upcoming Exams
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Entrance Exam Calendar 2026
            </h2>
            <p className="text-gray-500 mt-1">Key dates for engineering, MBA, and medical entrance exams</p>
          </div>
          <Link href="/exams" className="hidden sm:flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Exam</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Level</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Application Date</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Exam Date</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">For</th>
                <th className="px-3 sm:px-5 py-3 sm:py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {exams.slice(0, 8).map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 sm:px-5 py-3">
                    <p className="font-bold text-gray-900 text-sm">{exam.name}</p>
                    <p className="text-xs text-gray-500 hidden sm:block">{exam.conductedBy.split(" ").slice(0, 3).join(" ")}</p>
                  </td>
                  <td className="px-3 sm:px-5 py-3 hidden sm:table-cell">
                    <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", levelColors[exam.level])}>
                      {exam.level}
                    </span>
                  </td>
                  <td className="px-3 sm:px-5 py-3 text-sm text-gray-600 hidden md:table-cell">
                    {exam.applicationDate}
                  </td>
                  <td className="px-3 sm:px-5 py-3">
                    <span className="text-sm font-semibold text-gray-900">{exam.examDate}</span>
                  </td>
                  <td className="px-3 sm:px-5 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {exam.streams.slice(0, 2).map((s) => (
                        <span key={s} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-3 sm:px-5 py-3 text-center">
                    <a
                      href={exam.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                    >
                      Register <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-5 sm:hidden">
          <Link href="/exams" className="inline-flex items-center gap-2 text-orange-600 font-semibold">
            View All Exams <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
