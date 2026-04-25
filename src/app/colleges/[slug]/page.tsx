import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { colleges, getCollegeBySlug } from "@/data/colleges"
import { fetchCollegesFromAPI, mapAPICollege, generateSlug } from "@/lib/api"
import { getCollegeBySlug as getDBCollege, DBCollege, CollegeDetails } from "@/lib/db"
import CollegeProfile from "@/components/colleges/CollegeProfile"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateCollegeSchema } from "@/lib/seo"
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
    stream:           (db.stream as College['stream']) ?? 'Engineering',
  }
}

interface Props {
  params: Promise<{ slug: string }>
}

// Generate static params: Supabase published + local + external API
export async function generateStaticParams() {
  const localSlugs = colleges.map((c) => ({ slug: c.slug }))
  const slugSet = new Set(localSlugs.map((s) => s.slug))

  // Add Supabase published slugs
  try {
    const { getAllColleges } = await import('@/lib/db')
    const { colleges: dbColleges } = await getAllColleges({ status: 'published', limit: 500 })
    for (const c of dbColleges) {
      if (!slugSet.has(c.slug)) {
        localSlugs.push({ slug: c.slug })
        slugSet.add(c.slug)
      }
    }
  } catch { /* ignore */ }

  // Add external API slugs
  try {
    const apiRaw = await fetchCollegesFromAPI()
    for (const c of apiRaw) {
      const slug = generateSlug(c.name)
      if (!slugSet.has(slug)) {
        localSlugs.push({ slug })
        slugSet.add(slug)
      }
    }
  } catch { /* ignore */ }

  return localSlugs
}

// Resolve college + details: Supabase published first, then local, then external API
async function resolveCollege(slug: string): Promise<{ college: College; details?: CollegeDetails } | null> {
  // 1. Try Supabase published colleges
  try {
    const dbCollege = await getDBCollege(slug)
    if (dbCollege && dbCollege.status === 'published') {
      return { college: mapDBToCollege(dbCollege), details: dbCollege.details }
    }
  } catch {
    // ignore DB errors, fall through
  }

  // 2. Try local hardcoded data
  const local = getCollegeBySlug(slug)
  if (local) return { college: local, details: local.details }

  // 3. Try external API
  try {
    const apiRaw = await fetchCollegesFromAPI()
    const match = apiRaw.find((c) => generateSlug(c.name) === slug)
    if (match) return { college: mapAPICollege(match, 0) }
  } catch {
    // ignore
  }
  return null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const resolved = await resolveCollege(slug)
  if (!resolved) return {}
  const { college } = resolved

  return genMeta({
    title: `${college.name} — Fees, Placements, Cutoff 2026`,
    description: `${college.name} (${college.shortName}) — ${college.type} college in ${college.location}. NAAC ${college.naac}${college.nirfRank ? `, NIRF Rank ${college.nirfRank}` : ""}. Annual fees: ₹${(college.feesRange.min / 100000).toFixed(1)}L–${(college.feesRange.max / 100000).toFixed(1)}L. Avg placement: ₹${(college.avgPlacement / 100000).toFixed(1)}L PA. ${college.description.slice(0, 100)}`,
    path: `/colleges/${slug}`,
    keywords: [
      college.name.toLowerCase(),
      college.shortName.toLowerCase(),
      `${college.shortName.toLowerCase()} fees`,
      `${college.shortName.toLowerCase()} placements`,
      `${college.shortName.toLowerCase()} admission`,
      "colleges in pune",
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
  })

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="college-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collegeSchema) }} />
      <div className="bg-[#F8FAFC] min-h-screen">
        <CollegeProfile college={college} details={details} />
      </div>
    </>
  )
}
