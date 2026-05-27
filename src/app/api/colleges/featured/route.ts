import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { colleges as staticColleges } from '@/data/colleges'
import type { College } from '@/types'

export const revalidate = 60  // re-check every 60s

function mapRow(db: Record<string, unknown>): College {
  return {
    id:               (db.id as number) ?? 0,
    slug:             db.slug as string,
    name:             db.name as string,
    shortName:        (db.short_name as string) ?? (db.name as string),
    type:             ((db.type as College['type']) ?? 'Private'),
    established:      (db.established as number) ?? 2000,
    affiliation:      (db.affiliation as string) ?? '',
    naac:             ((db.naac_grade as College['naac']) ?? 'A'),
    nirfRank:         (db.nirf_rank as number | null) ?? null,
    location:         (db.city as string) ? `${db.city}, Maharashtra` : 'Pune, Maharashtra',
    address:          (db.address as string) ?? 'Pune',
    stream:           ((db.stream as College['stream']) ?? 'Engineering'),
    courses:          (db.courses as string[]) ?? [],
    specializations:  (db.specializations as string[]) ?? [],
    feesRange:        { min: (db.fees_min as number) ?? 0, max: (db.fees_max as number) ?? 0 },
    avgPlacement:     (db.avg_placement as number) ?? 0,
    highestPlacement: (db.highest_pkg as number) ?? 0,
    topRecruiters:    (db.top_recruiters as string[]) ?? [],
    entranceExams:    (db.entrance_exams as string[]) ?? [],
    hostel:           (db.hostel as boolean) ?? false,
    rating:           (db.rating as number) ?? 0,
    reviewCount:      (db.review_count as number) ?? 0,
    reviews:          [],
    tags:             (db.tags as string[]) ?? [],
    description:      (db.description as string) ?? '',
    highlights:       (db.highlights as string[]) ?? [],
    website:          (db.website as string) ?? '',
    phone:            (db.phone as string) ?? '',
    email:            (db.email as string) ?? '',
    image:            (db.cover_url as string | undefined) ?? (db.image_url as string | undefined) ?? undefined,
    logo:             (db.logo_url as string | undefined) ?? undefined,
  }
}

export async function GET() {
  try {
    const admin = createAdminClient()

    // Fetch ALL published colleges — featured ones sort first so they get the badge
    const { data, error } = await admin
      .from('colleges')
      .select('*')
      .eq('status', 'published')
      .order('featured', { ascending: false })           // featured=true first
      .order('featured_order', { ascending: true, nullsFirst: false })
      .order('rating', { ascending: false })
      .limit(60)

    if (error || !data || data.length === 0) {
      // Fallback: static colleges sorted by NIRF rank
      const fallback = [...staticColleges]
        .sort((a, b) => (a.nirfRank ?? 999) - (b.nirfRank ?? 999))
        .slice(0, 12)
      return NextResponse.json(
        { colleges: fallback, featuredSlugs: [], total: fallback.length, source: 'static' },
        { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
      )
    }

    const mapped = (data as Record<string, unknown>[]).map(mapRow)

    // Track which slugs are featured so the UI can badge them
    const featuredSlugs = (data as Record<string, unknown>[])
      .filter(r => r.featured === true)
      .map(r => r.slug as string)

    // If DB has fewer than 12, pad with static colleges not already in the list
    let colleges = mapped
    if (mapped.length < 12) {
      const dbSlugs = new Set(mapped.map(c => c.slug))
      const fill = staticColleges
        .filter(c => !dbSlugs.has(c.slug))
        .slice(0, 12 - mapped.length)
      colleges = [...mapped, ...fill]
    }

    return NextResponse.json(
      { colleges, featuredSlugs, total: colleges.length, source: 'db' },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
    )
  } catch (err) {
    console.error('[GET /api/colleges/featured]', err)
    // Fallback on any error
    const fallback = [...staticColleges]
      .sort((a, b) => (a.nirfRank ?? 999) - (b.nirfRank ?? 999))
      .slice(0, 12)
    return NextResponse.json(
      { colleges: fallback, featuredSlugs: [], total: fallback.length, source: 'static' },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
    )
  }
}
