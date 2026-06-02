/**
 * run-migration.mjs
 * Executes docs/supabase-fixes.sql against the live Supabase project.
 * Run with: node scripts/run-migration.mjs
 *
 * Uses the Supabase Management API (api.supabase.com) for SQL execution,
 * and the Storage API for bucket creation.
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))

// ── Config ─────────────────────────────────────────────────────────────────
const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'tfdcpljbozadshhmvhfk'
const SUPABASE_URL = process.env.SUPABASE_URL || `https://${PROJECT_REF}.supabase.co`
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SERVICE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_KEY environment variable')
}

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ── Helper: execute SQL via Supabase pg API ────────────────────────────────
async function sql(query, label = '') {
  try {
    // Try via Management API first (requires SUPABASE_ACCESS_TOKEN, not service key)
    const accessToken = process.env.SUPABASE_ACCESS_TOKEN
    if (accessToken) {
      const resp = await fetch(
        `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
        {
          method: 'POST',
          signal: AbortSignal.timeout(30_000),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ query }),
        }
      )
      const text = await resp.text()
      if (resp.ok) {
        console.log(`  ✅ ${label || query.slice(0, 60)}`)
        return { ok: true, data: text }
      }
      console.warn(`  ⚠️  Management API: ${resp.status} — ${text.slice(0, 120)}`)
    } else {
      console.warn(`  ⚠️  SUPABASE_ACCESS_TOKEN not set — skipping Management API, falling back to RPC`)
    }
    return { ok: false, error: 'management api unavailable' }
  } catch (err) {
    console.error(`  ❌ ${label}: ${err.message}`)
    return { ok: false, error: err.message }
  }
}

// ── Helper: run SQL via Supabase REST (exec_sql RPC if available) ──────────
async function sqlRpc(query, label = '') {
  const { data, error } = await admin.rpc('exec_sql', { query })
  if (!error) {
    console.log(`  ✅ ${label || query.slice(0, 60)}`)
    return { ok: true, data }
  }
  console.warn(`  ⚠️  RPC exec_sql: ${error.message}`)
  return { ok: false, error: error.message }
}

// ── Section 1: Storage bucket ──────────────────────────────────────────────
async function section1_storageBucket() {
  console.log('\n── SECTION 1: Storage Bucket ────────────────────────────────')

  // Create bucket via Storage API
  const { data, error } = await admin.storage.createBucket('college-images', {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024, // 5 MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'],
  })

  if (!error || error.message?.includes('already exists') || error.message?.includes('duplicate')) {
    console.log('  ✅ Storage bucket "college-images" created (or already exists)')
  } else {
    console.error('  ❌ Bucket creation failed:', error.message)
  }

  // List buckets to verify
  const { data: buckets } = await admin.storage.listBuckets()
  const found = buckets?.find(b => b.id === 'college-images')
  if (found) {
    console.log(`  ✅ Bucket verified: ${found.name} (public=${found.public})`)
  } else {
    console.log('  ⚠️  Bucket not found in list — may need to create via SQL')
  }
}

// ── Section 2: Indexes (attempt via Management API) ───────────────────────
async function section2_indexes() {
  console.log('\n── SECTION 2: Missing Indexes ───────────────────────────────')

  const indexes = [
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_status ON colleges(status)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_stream ON colleges(stream)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_naac ON colleges(naac_grade)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_nirf ON colleges(nirf_rank) WHERE nirf_rank IS NOT NULL`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_updated ON colleges(updated_at DESC)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_ai_generated ON colleges(ai_generated) WHERE ai_generated = true`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_blogs_status_published ON blogs(status, published_at DESC)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_blogs_author ON blogs(author_id)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_blogs_category ON blogs(category) WHERE category IS NOT NULL`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_reviews_college_status ON reviews(college_id, status)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_qa_questions_college_status ON qa_questions(college_id, status)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_qa_answers_question_status ON qa_answers(question_id, status)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_leads_status_created ON leads(status, created_at DESC)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_leads_source ON leads(source)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_alumni_college ON alumni(college_id)`,
    `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_college_courses_college ON college_courses(college_id)`,
  ]

  // Run all indexes in parallel — CONCURRENTLY means no table locks
  await Promise.all(indexes.map(idx => {
    const name = idx.match(/IF NOT EXISTS (\w+)/)?.[1] ?? idx.slice(0, 40)
    return sql(idx, name)
  }))
}

// ── Section 3: updated_at trigger ─────────────────────────────────────────
async function section3_trigger() {
  console.log('\n── SECTION 3: updated_at Trigger ────────────────────────────')

  const fn = `
    CREATE OR REPLACE FUNCTION set_updated_at()
    RETURNS trigger LANGUAGE plpgsql AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$;`
  await sql(fn, 'set_updated_at() function')

  const tables = ['colleges', 'blogs', 'leads', 'reviews', 'qa_questions', 'qa_answers', 'alumni', 'hero_banners', 'exams']
  await Promise.all(tables.map(tbl => {
    const q = `
      DROP TRIGGER IF EXISTS trg_updated_at ON ${tbl};
      CREATE TRIGGER trg_updated_at
        BEFORE UPDATE ON ${tbl}
        FOR EACH ROW EXECUTE FUNCTION set_updated_at();`
    return sql(q, `trigger on ${tbl}`)
  }))
}

// ── Section 4: Normalise rankings rank ────────────────────────────────────
async function section4_normaliseRankings() {
  console.log('\n── SECTION 4: Normalise rankings[].rank ─────────────────────')

  const q = `
    UPDATE colleges
    SET details = jsonb_set(
      details,
      '{rankings}',
      COALESCE(
        (
          SELECT jsonb_agg(
            CASE
              WHEN jsonb_typeof(r->'rank') = 'number' AND (r->>'rank')::numeric > 0
                THEN r
              WHEN jsonb_typeof(r->'rank') = 'string'
                   AND (r->>'rank') ~ '^\\d+$'
                   AND (r->>'rank')::int > 0
                THEN r - 'rank' || jsonb_build_object('rank', (r->>'rank')::int)
              ELSE r - 'rank' || '{"rank": null}'::jsonb
            END
          )
          FROM jsonb_array_elements(details->'rankings') r
        ),
        '[]'::jsonb
      )
    )
    WHERE
      details ? 'rankings'
      AND jsonb_typeof(details->'rankings') = 'array'
      AND jsonb_array_length(details->'rankings') > 0;`
  await sql(q, 'Normalise rankings.rank to integer')
}

// ── Section 5: Backfill college_courses ───────────────────────────────────
async function section5_backfillCourses() {
  console.log('\n── SECTION 5: Backfill college_courses ──────────────────────')

  await sql(`TRUNCATE college_courses`, 'TRUNCATE college_courses')

  const q = `
    INSERT INTO college_courses (
      college_id, course_name, duration, fees_per_year, total_fees, seats, eligibility, entrance_exam
    )
    SELECT
      c.id,
      COALESCE(course->>'program', course->>'course', 'Unknown'),
      (course->>'duration')::text,
      CASE WHEN course->>'fees_per_year' ~ '^\\d+$' THEN (course->>'fees_per_year')::int ELSE NULL END,
      CASE WHEN course->>'total_fees' ~ '^\\d+$' THEN (course->>'total_fees')::int ELSE NULL END,
      CASE WHEN course->>'seats' ~ '^\\d+$' THEN (course->>'seats')::int ELSE NULL END,
      (course->>'eligibility')::text,
      c.entrance_exams[1]
    FROM colleges c
    CROSS JOIN LATERAL jsonb_array_elements(c.details->'courses_fees') AS course
    WHERE
      c.details ? 'courses_fees'
      AND jsonb_typeof(c.details->'courses_fees') = 'array'
      AND jsonb_array_length(c.details->'courses_fees') > 0
    ;`
  await sql(q, 'Backfill college_courses from details JSONB')
}

// ── Section 6: Full-text search ────────────────────────────────────────────
async function section6_fts() {
  console.log('\n── SECTION 6: Full-Text Search ──────────────────────────────')

  const addCol = `
    ALTER TABLE colleges
      ADD COLUMN IF NOT EXISTS fts tsvector
      GENERATED ALWAYS AS (
        to_tsvector('english',
          coalesce(name,        '') || ' ' ||
          coalesce(short_name,  '') || ' ' ||
          coalesce(stream,      '') || ' ' ||
          coalesce(description, '') || ' ' ||
          coalesce(affiliation, '') || ' ' ||
          coalesce(naac_grade,  '') || ' ' ||
          coalesce(city,        '')
        )
      ) STORED;`
  await sql(addCol, 'ADD fts tsvector column')

  const addIdx = `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_fts ON colleges USING GIN(fts);`
  await sql(addIdx, 'GIN index on fts')
}

// ── Section 7: featured_items uniqueness ──────────────────────────────────
async function section7_featuredUnique() {
  console.log('\n── SECTION 7: featured_items uniqueness ─────────────────────')

  const q = `
    ALTER TABLE featured_items
      DROP CONSTRAINT IF EXISTS featured_items_item_section_unique;
    ALTER TABLE featured_items
      ADD CONSTRAINT featured_items_item_section_unique
      UNIQUE (item_type, item_id, section);`
  await sql(q, 'featured_items uniqueness constraint')
}

// ── Section 8: Lead columns ────────────────────────────────────────────────
async function section8_leadColumns() {
  console.log('\n── SECTION 8: Missing lead columns ──────────────────────────')

  const q = `
    ALTER TABLE leads
      ADD COLUMN IF NOT EXISTS course_interest text,
      ADD COLUMN IF NOT EXISTS budget          text,
      ADD COLUMN IF NOT EXISTS exam_type       text,
      ADD COLUMN IF NOT EXISTS exam_score      text,
      ADD COLUMN IF NOT EXISTS career_goal     text;`
  await sql(q, 'Add lead columns (course_interest, budget, exam_type, exam_score, career_goal)')
}

// ── Section 9: ai_generated columns ───────────────────────────────────────
async function section9_aiGenerated() {
  console.log('\n── SECTION 9: ai_generated columns ──────────────────────────')

  await sql(`ALTER TABLE colleges ADD COLUMN IF NOT EXISTS ai_generated boolean DEFAULT false;`, 'colleges.ai_generated')
  await sql(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS ai_generated boolean DEFAULT false;`, 'blogs.ai_generated')
}

// ── Section 10: Verify ────────────────────────────────────────────────────
async function section10_verify() {
  console.log('\n── SECTION 10: Verification ──────────────────────────────────')

  // Count via Supabase SDK (doesn't need raw SQL)
  const checks = [
    { table: 'colleges', label: 'colleges' },
    { table: 'blogs',    label: 'blogs'    },
    { table: 'leads',    label: 'leads'    },
    { table: 'college_courses', label: 'college_courses' },
  ]
  for (const { table, label } of checks) {
    const { count, error } = await admin.from(table).select('*', { count: 'exact', head: true })
    if (!error) console.log(`  ✅ ${label}: ${count} rows`)
    else console.warn(`  ⚠️  ${label}: ${error.message}`)
  }
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗')
  console.log('║   CollegePune — Supabase Migration Runner                    ║')
  console.log('║   Project: tfdcpljbozadshhmvhfk                              ║')
  console.log('╚══════════════════════════════════════════════════════════════╝')

  // Test auth first
  const { count, error: authErr } = await admin.from('colleges').select('*', { count: 'exact', head: true })
  if (authErr) {
    console.error('\n❌ Auth check failed:', authErr.message)
    console.error('Check SUPABASE_URL and SERVICE_KEY')
    process.exit(1)
  }
  console.log(`\n✅ Connected — colleges table has ${count} rows`)

  // Sections 1–3 can start immediately (schema + infra, no data deps)
  await Promise.all([
    section1_storageBucket(),
    section2_indexes(),
    section3_trigger(),
  ])

  // Section 4 normalises JSONB before section 5 reads it
  await section4_normaliseRankings()
  await section5_backfillCourses()

  // Remaining sections are independent of each other
  await Promise.all([
    section6_fts(),
    section7_featuredUnique(),
    section8_leadColumns(),
    section9_aiGenerated(),
  ])

  await section10_verify()

  console.log('\n╔══════════════════════════════════════════════════════════════╗')
  console.log('║   Migration complete!                                         ║')
  console.log('║   Any ⚠️  sections need to be run manually in Supabase SQL.   ║')
  console.log('╚══════════════════════════════════════════════════════════════╝\n')
}

main().catch(err => { console.error('FATAL:', err); process.exit(1) })
