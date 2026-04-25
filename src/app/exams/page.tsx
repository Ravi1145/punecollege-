import { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { exams } from "@/data/exams"
import { Calendar, ExternalLink, Clock, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export const metadata: Metadata = genMeta({
  title: "Entrance Exam Calendar 2026 — MHT-CET, JEE, NEET, CAT for Pune Colleges",
  description: "Complete entrance exam schedule 2026 for Pune college admissions. Dates for MHT-CET, JEE Main, NEET, CAT, SNAP, MAT and more. Registration deadlines, eligibility, and official websites.",
  path: "/exams",
  keywords: ["mht-cet 2026", "jee main 2026 pune", "neet 2026", "cat 2026", "snap 2026", "entrance exams pune"],
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"

const levelColors: Record<string, string> = {
  National: "bg-blue-100 text-blue-700",
  State: "bg-green-100 text-green-700",
  University: "bg-purple-100 text-purple-700",
}

// Parse "Apr 20 – May 15, 2026" → ISO date (returns start date)
function parseExamDate(dateStr: string): string | undefined {
  if (!dateStr) return undefined
  const match = dateStr.match(/(\w+ \d+(?:–\d+)?,? \d{4})/)
  if (!match) return undefined
  const clean = match[1].replace(/–\d+/, "").trim()
  const d = new Date(clean)
  return isNaN(d.getTime()) ? undefined : d.toISOString().split("T")[0]
}

export default function ExamsPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Entrance Exams", url: `${BASE_URL}/exams` },
  ])

  // Schema.org Event array for each exam
  const eventListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Entrance Exam Calendar 2026 — Pune Colleges",
    description: "Complete list of entrance exams for Pune college admissions in 2026",
    numberOfItems: exams.length,
    itemListElement: exams.map((exam, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@context": "https://schema.org",
        "@type": "Event",
        name: `${exam.name} 2026 — ${exam.fullName}`,
        description: exam.description,
        url: exam.website,
        organizer: {
          "@type": "Organization",
          name: exam.conductedBy,
        },
        startDate: parseExamDate(exam.examDate) ?? "2026-01-01",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: exam.level === "State" ? "Maharashtra" : "India",
          address: { "@type": "PostalAddress", addressCountry: "IN" },
        },
        audience: {
          "@type": "Audience",
          audienceType: "Students applying to colleges in Pune",
        },
      },
    })),
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Script id="exams-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="exams-events" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListSchema) }} />

      <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Entrance Exam Calendar 2026
          </h1>
          <p className="text-gray-300 max-w-2xl">
            All important entrance exam dates for engineering, MBA, medical, and other courses in Pune colleges.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {exams.map((exam) => (
            <article key={exam.id} className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-gray-900">{exam.name}</h2>
                    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", levelColors[exam.level])}>
                      {exam.level}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{exam.fullName}</p>
                </div>
                <a
                  href={exam.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                >
                  Apply <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{exam.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Application
                  </p>
                  <p className="text-xs font-semibold text-gray-800">{exam.applicationDate}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-3">
                  <p className="text-xs text-orange-600 mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Exam Date
                  </p>
                  <p className="text-xs font-semibold text-gray-800">{exam.examDate}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-3">
                  <p className="text-xs text-green-600 mb-1">Result</p>
                  <p className="text-xs font-semibold text-gray-800">{exam.resultDate}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1.5">For Programs:</p>
                <div className="flex flex-wrap gap-1">
                  {exam.streams.map((s) => (
                    <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  <span className="font-medium text-gray-700">Eligibility:</span> {exam.eligibility}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-7 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Not sure which exam to appear for?</h2>
          <p className="text-gray-400 mb-5">Let our AI analyze your profile and tell you which exams to focus on for your dream Pune college.</p>
          <Link
            href="/ai-finder"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Get AI Guidance
          </Link>
        </div>
      </div>
    </div>
  )
}
