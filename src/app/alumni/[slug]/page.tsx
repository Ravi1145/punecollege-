import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { CheckCircle, ArrowLeft, Briefcase, GraduationCap, Star } from "lucide-react"
import {
  generateMetadata as genMeta,
  generateBreadcrumbSchema,
} from "@/lib/seo"

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

const allAlumni = [
  {
    slug: "rahul-sharma-coep-2023",
    name: "Rahul Sharma",
    college: "COEP Pune",
    course: "B.Tech CSE",
    year: 2023,
    company: "Google",
    package: "₹32 LPA",
    bio: "Specialised in ML systems. Interned at Amazon before joining Google.",
    highlights: [
      "Won Smart India Hackathon 2022",
      "Published IEEE paper on NLP",
      "Captain of COEP Robotics Team",
    ],
  },
  {
    slug: "priya-desai-sibm-2022",
    name: "Priya Desai",
    college: "SIBM Pune",
    course: "MBA",
    year: 2022,
    company: "McKinsey & Co.",
    package: "₹28 LPA",
    bio: "Specialised in strategy consulting. Led SIBM's consulting club.",
    highlights: [
      "Gold Medal MBA Batch 2022",
      "CAT 99.2 percentile",
      "Published HBR case study",
    ],
  },
  {
    slug: "aditya-kulkarni-pict-2023",
    name: "Aditya Kulkarni",
    college: "PICT Pune",
    course: "B.Tech IT",
    year: 2023,
    company: "Microsoft",
    package: "₹25 LPA",
    bio: "Full-stack developer. Won multiple hackathons. Core team ACM PICT.",
    highlights: [
      "Best Final Year Project Award",
      "3x National Hackathon Winner",
      "Open source contributor (500+ GitHub stars)",
    ],
  },
  {
    slug: "sneha-patil-afmc-2021",
    name: "Sneha Patil",
    college: "AFMC Pune",
    course: "MBBS",
    year: 2021,
    company: "Army Medical Corps",
    package: "—",
    bio: "Served at forward military hospitals. Specialist in emergency medicine.",
    highlights: [
      "Gold Medal AFMC 2021",
      "Sena Medal for Gallantry",
      "TEDx speaker on rural healthcare",
    ],
  },
  {
    slug: "karan-mehta-vit-2023",
    name: "Karan Mehta",
    college: "VIT Pune",
    course: "B.Tech Mechanical",
    year: 2023,
    company: "Cummins India",
    package: "₹9.5 LPA",
    bio: "Design engineer at Cummins. Led VIT's Formula SAE team.",
    highlights: [
      "Formula SAE Team Captain",
      "Published ASME paper",
      "6 Sigma Green Belt",
    ],
  },
  {
    slug: "ananya-joshi-mit-wpu-2022",
    name: "Ananya Joshi",
    college: "MIT-WPU Pune",
    course: "B.Tech CSE",
    year: 2022,
    company: "Persistent Systems",
    package: "₹8 LPA",
    bio: "Cloud engineer at Persistent. Led MIT-WPU coding club.",
    highlights: [
      "AWS Certified Solutions Architect",
      "MIT-WPU Best Student Award 2022",
      "GSoC contributor",
    ],
  },
]

type AlumniEntry = (typeof allAlumni)[number]

function findAlumni(slug: string): AlumniEntry | undefined {
  return allAlumni.find((a) => a.slug === slug)
}

export async function generateStaticParams() {
  return allAlumni.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const alumni = findAlumni(slug)
  if (!alumni) return {}

  const { name, course, college } = alumni
  return genMeta({
    title: `${name} — ${course} at ${college} | CollegePune Alumni`,
    description: `${name} graduated from ${college} with ${course} (${alumni.year}). Now at ${alumni.company}. Read highlights and connect with verified Pune alumni.`,
    path: `/alumni/${slug}`,
    keywords: [
      `${college} alumni`,
      `${college} placement`,
      `${college} ${course}`,
      "pune college alumni",
    ],
  })
}

function Initials({ name, className = "" }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const palettes = [
    "bg-blue-500",
    "bg-violet-500",
    "bg-emerald-500",
    "bg-orange-500",
    "bg-rose-500",
    "bg-teal-500",
  ]
  const color = palettes[name.charCodeAt(0) % palettes.length]

  return (
    <div
      className={`${color} ${className} flex items-center justify-center font-extrabold text-white rounded-full shrink-0`}
    >
      {initials}
    </div>
  )
}

export default async function AlumniProfilePage({ params }: Props) {
  const { slug } = await params
  const alumni = findAlumni(slug)
  if (!alumni) notFound()

  const { name, college, course, year, company, package: pkg, bio, highlights } = alumni
  const firstName = name.split(" ")[0]

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Alumni", url: "/alumni" },
    { name: name, url: `/alumni/${slug}` },
  ])

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="bg-white min-h-screen">
        {/* ── Hero strip ──────────────────────────────────────────────────── */}
        <section className="bg-[#0A1628] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-xs text-blue-300 mb-8"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="opacity-40">/</span>
              <Link href="/alumni" className="hover:text-white transition-colors">
                Alumni
              </Link>
              <span className="opacity-40">/</span>
              <span className="text-white/70 truncate">{name}</span>
            </nav>

            {/* Profile row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Initials name={name} className="w-20 h-20 text-2xl" />

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">{name}</h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-blue-200">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 opacity-70" />
                    {course} &middot; {college} &middot; {year}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 opacity-70" />
                    {company}
                  </span>
                  {pkg !== "—" && (
                    <span className="bg-emerald-500/20 text-emerald-300 font-semibold px-2.5 py-0.5 rounded-full text-xs">
                      {pkg}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Content card ────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8">
            {/* Bio */}
            <div>
              <h2 className="text-base font-extrabold text-gray-900 mb-2 uppercase tracking-wide text-xs text-[#0A1628]">
                About
              </h2>
              <p className="text-gray-600 leading-relaxed">{bio}</p>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div>
                <h2 className="text-xs font-extrabold text-[#0A1628] uppercase tracking-wide mb-3">
                  Highlights
                </h2>
                <ul className="space-y-2">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Star className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" aria-hidden />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verified badge */}
            <div className="flex items-center gap-2 text-sm text-green-700 font-semibold">
              <CheckCircle className="w-4 h-4" />
              Verified CollegePune Alumni
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-[#0A1628] rounded-2xl p-6 sm:p-8 text-center text-white">
            <h2 className="text-lg sm:text-xl font-extrabold mb-2">
              Ask {firstName} a Question
            </h2>
            <p className="text-blue-300 text-sm mb-6">
              Get honest answers about admissions, placements, and campus life at {college} — free, within 48 hours.
            </p>
            <Link
              href={`/qa?college=${encodeURIComponent(college)}`}
              className="inline-flex items-center gap-2 bg-[var(--color-accent,#f97316)] hover:opacity-90 text-white font-bold px-7 py-3 rounded-xl text-sm transition-opacity"
            >
              Ask {firstName} a Question
            </Link>
          </div>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              href="/alumni"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0A1628] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              View all alumni
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
