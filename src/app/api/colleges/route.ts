import { NextRequest, NextResponse } from 'next/server'
import { getAllColleges, DBCollege } from '@/lib/db'
import type { College } from '@/types'

export const revalidate = 60 // revalidate every 60s

function mapDBToCollege(db: DBCollege, index: number): College {
  return {
    id:                db.id ?? index,
    slug:              db.slug,
    name:              db.name,
    shortName:         db.short_name ?? db.name,
    type:              (db.type as College['type']) ?? 'Private',
    established:       db.established ?? 2000,
    affiliation:       db.affiliation ?? '',
    naac:              (db.naac_grade as College['naac']) ?? 'A',
    nirfRank:          db.nirf_rank ?? null,
    location:          db.city ? `${db.city}, Maharashtra` : 'Pune, Maharashtra',
    address:           db.address ?? db.city ?? 'Pune',
    courses:           db.courses ?? [],
    specializations:   db.specializations ?? [],
    feesRange:         { min: db.fees_min ?? 0, max: db.fees_max ?? 0 },
    avgPlacement:      db.avg_placement ?? 0,
    highestPlacement:  db.highest_pkg ?? 0,
    topRecruiters:     db.top_recruiters ?? [],
    entranceExams:     db.entrance_exams ?? [],
    hostel:            db.hostel ?? false,
    rating:            db.rating ?? 0,
    reviewCount:       db.review_count ?? 0,
    reviews:           [],
    tags:              db.tags ?? [],
    description:       db.description ?? '',
    highlights:        db.highlights ?? [],
    website:           db.website ?? '',
    phone:             db.phone ?? '',
    email:             db.email ?? '',
    image:             db.image_url ?? undefined,
    stream:            (db.stream as College['stream']) ?? 'Engineering',
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const stream = searchParams.get('stream') ?? undefined
    const city   = searchParams.get('city') ?? undefined
    const limit  = Number(searchParams.get('limit') ?? '200')

    const { colleges } = await getAllColleges({ status: 'published', stream, city, limit })

    const mapped = colleges.map((c, i) => mapDBToCollege(c, i))

    return NextResponse.json(
      { colleges: mapped, total: mapped.length },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
    )
  } catch (err) {
    console.error('[GET /api/colleges]', err)
    return NextResponse.json({ colleges: [], total: 0 })
  }
}
