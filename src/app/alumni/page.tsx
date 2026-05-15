import { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta } from "@/lib/seo"
import { CheckCircle, GraduationCap } from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = genMeta({
  title: "Pune College Alumni Network 2026 | Ask Graduates Directly | CollegePune",
  description: "Connect with verified alumni from COEP, SIBM, AFMC, PICT, VIT Pune and 20+ colleges. Get honest answers about placements, hostel, campus life and admission from real graduates.",
  path: "/alumni",
  keywords: [
    "pune college alumni", "coep alumni", "sibm pune alumni",
    "ask alumni pune college", "college alumni network pune",
    "pune engineering alumni", "mba alumni pune",
  ],
})

const featuredAlumni = [
  { slug: "rahul-sharma-coep-2023", name: "Rahul Sharma", college: "COEP Pune", course: "B.Tech CSE", year: 2023, company: "Google", package: "₹32 LPA", avatar: null },
  { slug: "priya-desai-sibm-2022",  name: "Priya Desai",  college: "SIBM Pune", course: "MBA", year: 2022, company: "McKinsey & Co.", package: "₹28 LPA", avatar: null },
  { slug: "aditya-kulkarni-pict-2023", name: "Aditya Kulkarni", college: "PICT Pune", course: "B.Tech IT", year: 2023, company: "Microsoft", package: "₹25 LPA", avatar: null },
  { slug: "sneha-patil-afmc-2021",  name: "Sneha Patil",  college: "AFMC Pune", course: "MBBS", year: 2021, company: "Army Medical Corps", package: "—", avatar: null },
  { slug: "karan-mehta-vit-2023",   name: "Karan Mehta",  college: "VIT Pune", course: "B.Tech Mechanical", year: 2023, company: "Cummins India", package: "₹9.5 LPA", avatar: null },
  { slug: "ananya-joshi-mit-wpu-2022", name: "Ananya Joshi", college: "MIT-WPU Pune", course: "B.Tech CSE", year: 2022, company: "Persistent Systems", package: "₹8 LPA", avatar: null },
]

function Initials({ name, className = "" }: { name: string; className?: string }) {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
  const colors   = ["bg-blue-100 text-blue-700", "bg-purple-100 text-purple-700", "bg-green-100 text-green-700", "bg-orange-100 text-orange-700"]
  const color    = colors[name.charCodeAt(0) % colors.length]
  return (
    <div className={`${color} ${className} flex items-center justify-center font-bold rounded-full text-sm`}>
      {initials}
    </div>
  )
}

export default function AlumniPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 text-sm px-4 py-1.5 rounded-full mb-4">
            <CheckCircle className="w-4 h-4" /> Verified Alumni Network
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">Real Questions. Real Answers.</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Connect with verified graduates from COEP, SIBM, AFMC, PICT, VIT Pune and 20+ colleges. Get honest answers before you decide.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm">
            <span className="bg-white/10 px-4 py-2 rounded-full">500+ verified alumni</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">25+ colleges</span>
            <span className="bg-white/10 px-4 py-2 rounded-full">Answers within 48h</span>
          </div>
        </div>
      </section>

      {/* Featured Alumni Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Alumni</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredAlumni.map((a) => (
            <Link key={a.slug} href={`/alumni/${a.slug}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Initials name={a.name} className="w-12 h-12 text-base" />
                <div>
                  <p className="font-bold text-gray-900 text-sm">{a.name}</p>
                  <p className="text-xs text-gray-500">{a.college} · {a.year}</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a.course}</span>
                {a.package !== "—" && <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">{a.package}</span>}
              </div>
              <p className="text-xs text-gray-500">Now at: <strong className="text-gray-800">{a.company}</strong></p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <GraduationCap className="w-10 h-10 text-orange-500 mx-auto mb-3" />
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">Have questions about a Pune college?</h2>
          <p className="text-gray-500 text-sm mb-5">Browse Q&amp;A from real students or ask your own question.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/qa" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-colors">
              Browse All Q&amp;A
            </Link>
            <Link href="/ask" className="bg-white border border-gray-200 hover:border-orange-300 text-gray-700 font-semibold px-6 py-3 rounded-2xl text-sm transition-colors">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
