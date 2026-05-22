'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { upsertCollege, deleteCollege } from '@/lib/supabase/queries-admin'
import { createAdminClient } from '@/lib/supabase/admin'
import { colleges as staticColleges } from '@/data/colleges'
import type { ContentStatus } from '@/lib/supabase/types'

/** Parse a textarea (one item per line or comma-separated) into a string array */
function parseLines(raw: string | null): string[] | null {
  if (!raw || !raw.trim()) return null
  return raw
    .split(/[\n,]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function str(formData: FormData, key: string): string | null {
  return (formData.get(key) as string) || null
}

function num(formData: FormData, key: string): number | null {
  return parseInt(formData.get(key) as string) || null
}

function parseCollegeForm(formData: FormData) {
  // Build details jsonb with tab-level rich data
  const details: Record<string, unknown> = {
    admissions: {
      total_seats:       num(formData, 'admissions_total_seats'),
      process:           str(formData, 'admissions_process'),
      application_start: str(formData, 'admissions_app_start'),
      application_end:   str(formData, 'admissions_app_end'),
      categories:        str(formData, 'admissions_categories'),
      important_dates:   str(formData, 'admissions_important_dates'),
    },
    cutoffs:           str(formData, 'cutoffs'),
    rankings_extra:    str(formData, 'rankings_extra'),
    scholarships:      str(formData, 'scholarships'),
    facilities_detail: str(formData, 'facilities_detail'),
    faqs:              str(formData, 'faqs'),
  }

  return {
    name:           formData.get('name') as string,
    short_name:     str(formData, 'short_name'),
    slug:           formData.get('slug') as string,
    affiliation:    str(formData, 'affiliation'),
    stream:         str(formData, 'stream'),
    description:    str(formData, 'description'),
    city:           str(formData, 'city'),
    state:          str(formData, 'state'),
    location:       str(formData, 'location'),
    address:        str(formData, 'address'),
    type:           str(formData, 'type'),
    established:    num(formData, 'established'),
    naac_grade:     str(formData, 'naac_grade'),
    nirf_rank:      num(formData, 'nirf_rank'),
    website:        str(formData, 'website'),
    phone:          str(formData, 'phone'),
    email:          str(formData, 'email'),
    cover_url:      str(formData, 'cover_url'),
    logo_url:       str(formData, 'logo_url'),
    // Arrays
    courses:        parseLines(formData.get('courses') as string),
    specializations: parseLines(formData.get('specializations') as string),
    entrance_exams: parseLines(formData.get('entrance_exams') as string),
    top_recruiters: parseLines(formData.get('top_recruiters') as string),
    highlights:     parseLines(formData.get('highlights') as string),
    tags:           parseLines(formData.get('tags') as string),
    // Fees & placement
    fees_min:       num(formData, 'fees_min'),
    fees_max:       num(formData, 'fees_max'),
    avg_placement:  num(formData, 'avg_placement'),
    highest_pkg:    num(formData, 'highest_pkg'),
    // Facilities
    hostel:         formData.get('hostel') === 'on',
    // Status
    status:         ((formData.get('status') as string) || 'draft') as ContentStatus,
    // Rich structured data (stored in details jsonb)
    details,
  }
}

export async function createCollegeAction(formData: FormData) {
  const data = parseCollegeForm(formData)
  if (!data.name || !data.slug) throw new Error('Name and slug are required')
  await upsertCollege(data)
  revalidatePath('/admin/colleges')
  redirect('/admin/colleges')
}

export async function updateCollegeAction(id: string, formData: FormData) {
  const data = parseCollegeForm(formData)
  await upsertCollege({ id, ...data })
  revalidatePath('/admin/colleges')
  revalidatePath('/colleges')
  if (data.slug) {
    revalidatePath(`/colleges/${data.slug}`)
    // Also bust stream-specific listing pages
    revalidatePath(`/colleges`)
  }
  redirect(`/admin/colleges/${id}`)
}

export async function deleteCollegeAction(id: string) {
  await deleteCollege(id)
  revalidatePath('/admin/colleges')
}

export async function approveReviewAction(reviewId: string, collegeId: string) {
  const admin = createAdminClient()
  await admin.from('reviews').update({ status: 'published' }).eq('id', reviewId)
  revalidatePath(`/admin/colleges/${collegeId}`)
  revalidatePath('/admin/reviews')
  revalidatePath('/admin/approvals')
}

export async function rejectReviewAction(reviewId: string, collegeId: string) {
  const admin = createAdminClient()
  await admin.from('reviews').update({ status: 'rejected' }).eq('id', reviewId)
  revalidatePath(`/admin/colleges/${collegeId}`)
  revalidatePath('/admin/reviews')
  revalidatePath('/admin/approvals')
}

export async function deleteReviewAction(reviewId: string, collegeId: string) {
  const admin = createAdminClient()
  await admin.from('reviews').delete().eq('id', reviewId)
  revalidatePath(`/admin/colleges/${collegeId}`)
  revalidatePath('/admin/reviews')
}

/**
 * Sync all 105 static colleges into Supabase.
 * Uses UPSERT ON CONFLICT slug — safe to run multiple times.
 * Colleges already in DB are updated with latest static data.
 * Returns { success, failed, errors }.
 */
export async function syncStaticCollegesToDBAction(): Promise<{
  success: number
  failed: number
  errors: string[]
}> {
  const admin = createAdminClient()
  let success = 0
  let failed = 0
  const errors: string[] = []

  // First, probe which extra columns exist
  const { data: probeData, error: probeError } = await admin
    .from('colleges')
    .select('slug,short_name,stream,courses,fees_min,hostel,highlights,tags')
    .limit(1)
  const hasExtraColumns = !probeError

  for (const c of staticColleges) {
    try {
      // Base payload — always safe (columns that exist in original migration)
      const basePayload: Record<string, unknown> = {
        slug:        c.slug,
        name:        c.name,
        type:        c.type ?? null,
        established: c.established ?? null,
        naac_grade:  c.naac ?? null,
        nirf_rank:   c.nirfRank ?? null,
        city:        c.location ?? null,
        state:       'Maharashtra',
        address:     c.address ?? null,
        location:    c.location ?? null,
        description: c.description ?? null,
        website:     c.website ?? null,
        phone:       c.phone ?? null,
        email:       c.email ?? null,
        cover_url:   c.image ?? null,
        status:      'published' as ContentStatus,
        // Pack all rich data into details jsonb (always works)
        details: {
          ...(c.details ?? {}),
          // Store extras in details so nothing is lost even without migration
          short_name:      c.shortName ?? null,
          affiliation:     c.affiliation ?? null,
          stream:          c.stream ?? null,
          courses:         c.courses ?? [],
          specializations: c.specializations ?? [],
          fees_min:        c.feesRange?.min ?? 0,
          fees_max:        c.feesRange?.max ?? 0,
          avg_placement:   c.avgPlacement ?? 0,
          highest_pkg:     c.highestPlacement ?? 0,
          top_recruiters:  c.topRecruiters ?? [],
          entrance_exams:  c.entranceExams ?? [],
          hostel:          c.hostel ?? false,
          highlights:      c.highlights ?? [],
          tags:            c.tags ?? [],
          rating:          c.rating ?? 0,
          review_count:    c.reviewCount ?? 0,
        },
      }

      // If extra columns exist (migration has been run), also write to dedicated columns
      if (hasExtraColumns) {
        Object.assign(basePayload, {
          short_name:      c.shortName ?? null,
          affiliation:     c.affiliation ?? null,
          stream:          c.stream ?? null,
          courses:         c.courses ?? null,
          specializations: c.specializations ?? null,
          fees_min:        c.feesRange?.min ?? null,
          fees_max:        c.feesRange?.max ?? null,
          avg_placement:   c.avgPlacement ?? null,
          highest_pkg:     c.highestPlacement ?? null,
          top_recruiters:  c.topRecruiters ?? null,
          entrance_exams:  c.entranceExams ?? null,
          hostel:          c.hostel ?? false,
          highlights:      c.highlights ?? null,
          tags:            c.tags ?? null,
          rating:          c.rating ?? null,
          review_count:    c.reviewCount ?? null,
        })
      }

      const { error } = await admin
        .from('colleges')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .upsert(basePayload as any, { onConflict: 'slug' })
      if (error) {
        failed++
        errors.push(`${c.slug}: ${error.message}`)
      } else {
        success++
      }
    } catch (err) {
      failed++
      errors.push(`${c.slug}: ${String(err)}`)
    }
  }

  revalidatePath('/admin/colleges')
  revalidatePath('/colleges')
  return { success, failed, errors }
}
