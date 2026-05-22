/**
 * Run: npx tsx scripts/sync-colleges.ts
 * Syncs all static colleges to Supabase
 */
import { createClient } from '@supabase/supabase-js'
import { colleges } from '../src/data/colleges'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://tfdcpljbozadshhmvhfk.supabase.co'
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || ''

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false }
})

async function main() {
  let success = 0, failed = 0
  const errors: string[] = []

  for (const c of colleges) {
    const payload = {
      slug:            c.slug,
      name:            c.name,
      short_name:      c.shortName ?? null,
      type:            c.type ?? null,
      established:     c.established ?? null,
      affiliation:     c.affiliation ?? null,
      naac_grade:      c.naac ?? null,
      nirf_rank:       c.nirfRank ?? null,
      city:            c.location ?? null,
      state:           'Maharashtra',
      address:         c.address ?? null,
      location:        c.location ?? null,
      description:     c.description ?? null,
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
      website:         c.website ?? null,
      phone:           c.phone ?? null,
      email:           c.email ?? null,
      cover_url:       c.image ?? null,
      status:          'published' as const,
      details:         (c.details ?? {}) as Record<string, unknown>,
    }

    const { error } = await admin
      .from('colleges')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .upsert(payload as any, { onConflict: 'slug' })

    if (error) {
      failed++
      errors.push(`${c.slug}: ${error.message}`)
      process.stdout.write(`✗ ${c.name}: ${error.message}\n`)
    } else {
      success++
      process.stdout.write(`✓ ${c.name}\n`)
    }
  }

  console.log(`\n✅ Done: ${success} synced, ${failed} failed`)
  if (errors.length) console.log('Errors:\n' + errors.join('\n'))
}

main().catch(console.error)
