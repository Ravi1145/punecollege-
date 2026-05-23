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
      // Merge top-level faqs into details so CollegeProfile and FAQ schema can find them
      const details: CollegeDetails | undefined = dbCollege.details
        ? { ...dbCollege.details, faqs: dbCollege.details.faqs ?? dbCollege.faqs }
        : dbCollege.faqs?.length
          ? { faqs: dbCollege.faqs }
          : undefined
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

  const nirfText  = college.nirfRank ? `, NIRF #${college.nirfRank}` : ""
  const feesMin   = college.feesRange.min > 0 ? `₹${(college.feesRange.min / 100000).toFixed(1)}L` : ""
  const feesMax   = college.feesRange.max > 0 ? `₹${(college.feesRange.max / 100000).toFixed(1)}L/yr` : ""
  const feesText  = feesMin && feesMax ? ` | Fees ${feesMin}–${feesMax}` : ""
  const placText  = college.avgPlacement > 0
    ? ` | ₹${(college.avgPlacement / 100000).toFixed(1)}L avg pkg`
    : ""

  return genMeta({
    title: `${college.name} Admission 2026 | NAAC ${college.naac}${nirfText} | Fees & Cutoff`,
    description: `${college.name} (${college.shortName}) admission 2026 — ${college.type} college in Pune. NAAC ${college.naac}${nirfText}${feesText}${placText}. Entrance: ${college.entranceExams.slice(0, 2).join(", ") || "MHT-CET"}. Compare fees, cutoffs & reviews — free.`,
    path: `/colleges/${slug}`,
    keywords: [
      college.name.toLowerCase(),
      college.shortName.toLowerCase(),
      `${college.shortName.toLowerCase()} admission 2026`,
      `${college.shortName.toLowerCase()} fees`,
      `${college.shortName.toLowerCase()} placements`,
      `${college.shortName.toLowerCase()} cutoff 2026`,
      `${college.shortName.toLowerCase()} reviews`,
      `${college.name.toLowerCase()} pune`,
      "colleges in pune",
      "pune college admission 2026",
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

  // Build FAQ schema from details.faqs (DB) or college.faqs (static)
  const rawFaqs = Array.isArray(details?.faqs) ? details!.faqs :
                  Array.isArray((college as any).faqs) ? (college as any).faqs :
                  []
  const faqSchema = rawFaqs.length > 0
    ? generateFAQSchema(rawFaqs.map((f: { q: string; a: string }) => ({ question: f.q, answer: f.a })))
    : null

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
      {faqSchema && (
        <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
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
