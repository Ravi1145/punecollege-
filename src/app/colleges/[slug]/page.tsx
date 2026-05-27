import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { colleges, getCollegeBySlug } from "@/data/colleges"

export const revalidate = 300 // ISR — re-render every 5 min; on-demand revalidation via admin also busts this
import { getCollegeBySlug as getDBCollege, DBCollege, CollegeDetails } from "@/lib/db"
import CollegeProfile from "@/components/colleges/CollegeProfile"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateCollegeSchema, generateFAQSchema } from "@/lib/seo"
import type { College } from "@/types"

// ─── details normalisation helpers ────────────────────────────────────────────
// The admin form saves plain text; the structured CollegeDetails type expects
// arrays. These helpers bridge the gap at read-time.

/** Parse "Q: ...\nA: ...\n---" text → { q, a }[] */
function parseFaqString(raw: string): { q: string; a: string }[] {
  if (!raw?.trim()) return []
  return raw
    .split(/\n?---+\n?/)
    .map(block => {
      const q = block.match(/^Q:\s*(.+)/m)?.[1]?.trim()
      const a = block.match(/^A:\s*([\s\S]+)/m)?.[1]?.trim()
      return q && a ? { q, a } : null
    })
    .filter((x): x is { q: string; a: string } => x !== null)
}

/** Parse "Name: description" (one per line) → { name, description }[] */
function parseTextToFacilities(raw: string): CollegeDetails['facilities'] {
  if (!raw?.trim()) return []
  return raw
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(line => {
      const colonIdx = line.indexOf(':')
      if (colonIdx > 0 && colonIdx < 80) {
        return { name: line.slice(0, colonIdx).trim(), description: line.slice(colonIdx + 1).trim() }
      }
      // Fallback — whole line is the name
      return { name: line, description: '' }
    })
}

/** Parse "Name: eligibility — amount" (one per line) → { name, eligibility, amount }[] */
function parseTextToScholarships(raw: string): NonNullable<CollegeDetails['scholarships']> {
  if (!raw?.trim()) return []
  return raw
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(line => {
      const colonIdx = line.indexOf(':')
      if (colonIdx > 0 && colonIdx < 80) {
        const name = line.slice(0, colonIdx).trim()
        const rest = line.slice(colonIdx + 1).trim()
        // "eligibility — amount" or "eligibility - amount"
        const sep = rest.search(/\s[—–-]{1,2}\s/)
        if (sep > 0) {
          return { name, eligibility: rest.slice(0, sep).trim(), amount: rest.slice(sep).replace(/^[\s—–-]+/, '').trim() }
        }
        return { name, eligibility: rest, amount: '' }
      }
      return { name: line, eligibility: '', amount: '' }
    })
}

/** Parse "Name | Designation | Batch" (one per line) → { name, designation, batch }[] */
function parseTextToAlumni(raw: string): NonNullable<CollegeDetails['alumni']> {
  if (!raw?.trim()) return []
  return raw
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map(line => {
      const parts = line.split('|').map(p => p.trim())
      if (parts.length >= 2) {
        return { name: parts[0], designation: parts[1], batch: parts[2] ?? undefined }
      }
      // Try comma-separated
      const commas = line.split(',').map(p => p.trim())
      if (commas.length >= 2) {
        return { name: commas[0], designation: commas.slice(1).join(', '), batch: undefined }
      }
      return { name: line, designation: '', batch: undefined }
    })
}

/** Parse "Step 1: Title - description" (one per line) → admission_process array */
function parseAdmissionsProcess(raw: string): NonNullable<CollegeDetails['admission_process']> {
  if (!raw?.trim()) return []
  return raw
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
    .map((line, i) => {
      const stepMatch = line.match(/^(?:step\s+)?(\d+)[.:)\s]+(.+)/i)
      if (stepMatch) {
        const stepNum = parseInt(stepMatch[1])
        const rest = stepMatch[2]
        const colonIdx = rest.indexOf(':')
        if (colonIdx > 0 && colonIdx < 60) {
          return { step: stepNum, title: rest.slice(0, colonIdx).trim(), description: rest.slice(colonIdx + 1).trim() }
        }
        return { step: stepNum, title: rest.slice(0, 60), description: rest }
      }
      return { step: i + 1, title: line.slice(0, 60), description: line }
    })
}

/**
 * Transform the raw `details` JSONB (as saved by the admin form) into the
 * structured CollegeDetails shape that CollegeProfile expects.
 * Admin saves plain text; we parse it at read-time.
 */
function normalizeDetails(raw: CollegeDetails | undefined): CollegeDetails | undefined {
  if (!raw) return undefined
  const r = raw as Record<string, unknown>
  const out: CollegeDetails = { ...raw }

  // FAQs: "Q: ...\nA: ...\n---" string → { q, a }[]
  // Use Array.isArray check — string values have truthy .length which would fool !out.faqs?.length
  if (!Array.isArray(out.faqs) && typeof r.faqs === 'string') {
    const parsed = parseFaqString(r.faqs)
    if (parsed.length) out.faqs = parsed
  }

  // Facilities: facilities_detail "Name: desc\n..." → facilities []
  if (!Array.isArray(out.facilities) && typeof r.facilities_detail === 'string') {
    const parsed = parseTextToFacilities(r.facilities_detail as string)
    if (parsed?.length) out.facilities = parsed
  }

  // Scholarships: plain text → scholarships []
  if (!Array.isArray(out.scholarships) && typeof r.scholarships === 'string') {
    const parsed = parseTextToScholarships(r.scholarships as string)
    if (parsed.length) out.scholarships = parsed
  }

  // Alumni: "Name | Designation | Batch" plain text → alumni []
  if (!Array.isArray(out.alumni) && typeof r.alumni === 'string') {
    const parsed = parseTextToAlumni(r.alumni as string)
    if (parsed.length) out.alumni = parsed
  }

  // Admission process: admissions.process text → admission_process []
  const adm = r.admissions as Record<string, unknown> | undefined
  if (!out.admission_process?.length && typeof adm?.process === 'string') {
    const parsed = parseAdmissionsProcess(adm.process as string)
    if (parsed.length) out.admission_process = parsed
  }

  return out
}
// ─────────────────────────────────────────────────────────────────────────────

function mapDBToCollege(db: DBCollege): College {
  return {
    id:               db.id ?? 0,
    slug:             db.slug,
    name:             db.name,
    shortName:        db.short_name ?? db.name,
    type:             (db.type as College['type']) ?? 'Private',
    established:      db.established ?? 2000,
    affiliation:      db.affiliation ?? '',
    naac:             (db.naac_grade as College['naac']) ?? 'A',
    nirfRank:         db.nirf_rank ?? null,
    location:         db.city ? `${db.city}, Maharashtra` : 'Pune, Maharashtra',
    address:          db.address ?? db.city ?? 'Pune',
    courses:          db.courses ?? [],
    specializations:  db.specializations ?? [],
    feesRange:        { min: db.fees_min ?? 0, max: db.fees_max ?? 0 },
    avgPlacement:     db.avg_placement ?? 0,
    highestPlacement: db.highest_pkg ?? 0,
    topRecruiters:    db.top_recruiters ?? [],
    entranceExams:    db.entrance_exams ?? [],
    hostel:           db.hostel ?? false,
    rating:           db.rating ?? 0,
    reviewCount:      db.review_count ?? 0,
    reviews:          [],
    tags:             db.tags ?? [],
    description:      db.description ?? '',
    highlights:       db.highlights ?? [],
    website:          db.website ?? '',
    phone:            db.phone ?? '',
    email:            db.email ?? '',
    image:            db.image_url ?? undefined,
    logo:             db.logo_url ?? undefined,
    stream:           (db.stream as College['stream']) ?? 'Engineering',
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

// Generate static params: local static + Express backend published
export async function generateStaticParams() {
  const localSlugs = colleges.map((c) => ({ slug: c.slug }))
  const slugSet = new Set(localSlugs.map((s) => s.slug))

  // Add Express backend published college slugs
  try {
    const { getAllColleges } = await import('@/lib/db')
    const { colleges: dbColleges } = await getAllColleges({ status: 'published', limit: 500 })
    for (const c of dbColleges) {
      if (!slugSet.has(c.slug)) {
        localSlugs.push({ slug: c.slug })
        slugSet.add(c.slug)
      }
    }
  } catch { /* ignore — backend not running yet */ }

  return localSlugs
}

// Resolve college + details: Supabase published first, then local, then external API
async function resolveCollege(slug: string): Promise<{ college: College; details?: CollegeDetails } | null> {
  // 1. Try Supabase published colleges
  try {
    const dbCollege = await getDBCollege(slug)
    if (dbCollege && dbCollege.status === 'published') {
      // Merge top-level faqs into details, then normalise all admin-saved plain text
      const rawDetails: CollegeDetails | undefined = dbCollege.details
        ? { ...dbCollege.details, faqs: dbCollege.details.faqs ?? dbCollege.faqs }
        : dbCollege.faqs?.length
          ? { faqs: dbCollege.faqs }
          : undefined
      const details = normalizeDetails(rawDetails)
      return { college: mapDBToCollege(dbCollege), details }
    }
  } catch {
    // ignore DB errors, fall through
  }

  // 2. Try local static data
  const local = getCollegeBySlug(slug)
  if (local) return { college: local, details: local.details }

  return null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const resolved = await resolveCollege(slug)
  if (!resolved) return {}
  const { college } = resolved

  const nirfText   = college.nirfRank ? `, NIRF #${college.nirfRank}` : ""
  const feesMin    = college.feesRange.min > 0 ? `₹${(college.feesRange.min / 100000).toFixed(1)}L` : ""
  const feesMax    = college.feesRange.max > 0 ? `₹${(college.feesRange.max / 100000).toFixed(1)}L/yr` : ""
  const feesText   = feesMin && feesMax ? ` | Fees ${feesMin}–${feesMax}` : ""
  const placText   = college.avgPlacement > 0
    ? ` | Avg Pkg ₹${(college.avgPlacement / 100000).toFixed(1)} LPA`
    : ""
  const streamText = college.stream === "Engineering" ? " Engineering" :
                     college.stream === "MBA" ? " MBA" :
                     college.stream === "Medical" ? " Medical" :
                     college.stream === "Law" ? " Law" :
                     college.stream === "Architecture" ? " Architecture" : ""
  const exam1      = college.entranceExams[0] ?? "MHT-CET"
  const exam2      = college.entranceExams[1] ? ` / ${college.entranceExams[1]}` : ""

  return genMeta({
    title: `${college.name} 2026 | NAAC ${college.naac}${nirfText} | Fees, Cutoff & Admission`,
    description: `${college.name} (${college.shortName}) — ${college.type}${streamText} College, Pune. NAAC ${college.naac}${nirfText}${feesText}${placText}. Admission via ${exam1}${exam2}. Complete info on cutoffs, placements, scholarships & reviews.`,
    path: `/colleges/${slug}`,
    keywords: [
      college.name.toLowerCase(),
      `${college.name.toLowerCase()} pune`,
      college.shortName.toLowerCase(),
      `${college.shortName.toLowerCase()} admission 2026`,
      `${college.shortName.toLowerCase()} fees 2026`,
      `${college.shortName.toLowerCase()} cutoff 2026`,
      `${college.shortName.toLowerCase()} placements`,
      `${college.shortName.toLowerCase()} reviews`,
      `${college.shortName.toLowerCase()} ranking`,
      `${college.shortName.toLowerCase()} courses`,
      `${college.shortName.toLowerCase()} hostel`,
      `${college.shortName.toLowerCase()} scholarship`,
      `${college.name.toLowerCase()} fees`,
      `${college.name.toLowerCase()} cutoff`,
      `${college.name.toLowerCase()} admission process`,
      `best ${college.stream.toLowerCase()} colleges in pune`,
      `${college.type.toLowerCase()} ${college.stream.toLowerCase()} college pune`,
      "colleges in pune 2026",
      "pune college admission 2026",
      ...(college.entranceExams.map(e => `${e.toLowerCase()} colleges pune`)),
    ],
  })
}

export default async function CollegePage({ params }: Props) {
  const { slug } = await params
  const resolved = await resolveCollege(slug)
  if (!resolved) notFound()
  const { college, details } = resolved

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges", url: "/colleges" },
    { name: college.shortName, url: `/colleges/${slug}` },
  ])

  const collegeSchema = generateCollegeSchema({
    name: college.name,
    description: college.description,
    address: college.address,
    phone: college.phone,
    email: college.email,
    website: college.website,
    established: college.established,
    naac: college.naac,
    nirfRank: college.nirfRank,
    courses: college.courses,
    image: college.image,
    rating: college.rating,
    reviewCount: college.reviewCount,
    slug,
    reviews: college.reviews ?? [],
  })

  // Build FAQ schema from details.faqs (DB) or college.faqs (static) or auto-generated fallback
  const rawFaqs: { q: string; a: string }[] =
    (Array.isArray(details?.faqs) && details!.faqs.length > 0 ? details!.faqs : null) ??
    (Array.isArray((college as { faqs?: { q: string; a: string }[] }).faqs) ? (college as { faqs?: { q: string; a: string }[] }).faqs ?? [] : [])

  // Auto-generate FAQs if none exist — ensures every college page has FAQ rich results
  const faqsForSchema: { q: string; a: string }[] = rawFaqs.length > 0 ? rawFaqs : [
    {
      q: `What is the fee structure at ${college.name} in 2026?`,
      a: college.feesRange.min > 0
        ? `Annual fees at ${college.shortName} range from ₹${(college.feesRange.min / 100000).toFixed(1)}L to ₹${(college.feesRange.max / 100000).toFixed(1)}L per year depending on the programme.`
        : `Contact ${college.shortName} admissions office for the latest 2026 fee structure.`,
    },
    {
      q: `What entrance exam is required for ${college.shortName} admission?`,
      a: `${college.shortName} accepts ${college.entranceExams.length > 0 ? college.entranceExams.join(", ") : "relevant entrance exams"} for admission. Students must register on the Maharashtra CAP portal after exam results.`,
    },
    {
      q: `Is ${college.shortName} NAAC accredited?`,
      a: `Yes, ${college.shortName} holds NAAC ${college.naac} accreditation${college.nirfRank ? ` and is ranked #${college.nirfRank} in NIRF` : ""}. It is a ${college.type.toLowerCase()} institution in Pune, Maharashtra.`,
    },
    {
      q: `What are the placement statistics at ${college.shortName}?`,
      a: college.avgPlacement > 0
        ? `${college.shortName} average placement package is ₹${(college.avgPlacement / 100000).toFixed(1)} LPA. ${college.topRecruiters.length > 0 ? `Top recruiters include ${college.topRecruiters.slice(0, 4).join(", ")}.` : ""}`
        : `${college.shortName} has an active placement cell. Contact the college for the latest placement data.`,
    },
    {
      q: `Does ${college.shortName} offer hostel facilities?`,
      a: college.hostel
        ? `Yes, ${college.shortName} provides on-campus hostel accommodation for boys and girls with mess and Wi-Fi facilities.`
        : `${college.shortName} does not have an on-campus hostel. Private PG accommodation is available near the campus.`,
    },
  ]
  const faqSchema = generateFAQSchema(faqsForSchema.map((f) => ({ question: f.q, answer: f.a })))

  // Similar colleges — same stream, exclude current, pick up to 4
  const similarColleges = colleges
    .filter((c) => c.stream === college.stream && c.slug !== slug)
    .sort((a, b) => (b.nirfRank ? 1 : 0) - (a.nirfRank ? 1 : 0))
    .slice(0, 4)

  // Stream hub URL mapping
  const streamHubMap: Record<string, string> = {
    Engineering:  "/engineering-colleges-pune",
    MBA:          "/mba-colleges-pune",
    Medical:      "/medical-colleges-pune",
    Law:          "/law-colleges-pune",
    Design:       "/design-colleges-pune",
    Arts:         "/arts-colleges-pune",
    Science:      "/science-colleges-pune",
    Commerce:     "/commerce-colleges-pune",
    Pharmacy:     "/pharmacy-colleges-pune",
  }
  const streamHub = streamHubMap[college.stream] ?? "/colleges"

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="college-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="bg-surface min-h-screen">
        <CollegeProfile college={college} details={details} />

        {/* Similar Colleges — server-rendered for SEO link equity */}
        {similarColleges.length > 0 && (
          <section className="bg-white border-t py-10 px-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">
                  Similar {college.stream} Colleges in Pune
                </h2>
                <Link href={streamHub} className="text-sm text-orange-600 hover:text-orange-700 font-semibold">
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {similarColleges.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/colleges/${c.slug}`}
                    className="group bg-gray-50 hover:bg-orange-50 rounded-xl p-4 border border-gray-100 hover:border-orange-200 transition-all"
                  >
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 leading-snug line-clamp-2">
                      {c.shortName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{c.type}</p>
                    {c.naac && (
                      <span className="inline-block mt-2 text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                        NAAC {c.naac}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
