-- ============================================================
-- CollegePune — Database Fixes & Performance Migration
-- Project: tfdcpljbozadshhmvhfk
-- Generated: 2026-05-27
-- Run in: https://supabase.com/dashboard/project/tfdcpljbozadshhmvhfk/sql/new
-- Run each section separately if you prefer incremental application.
-- ============================================================


-- ── SECTION 1: Storage Bucket ────────────────────────────────────────────────
-- Creates the college-images bucket for logo and cover image uploads.
-- After running this, upload images via Admin → Colleges → Logo/Cover buttons.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'college-images',
  'college-images',
  true,
  5242880,  -- 5 MB max per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS policies
DROP POLICY IF EXISTS "Public read college images"  ON storage.objects;
DROP POLICY IF EXISTS "Admin upload college images" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete college images" ON storage.objects;

CREATE POLICY "Public read college images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'college-images');

CREATE POLICY "Admin upload college images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'college-images' AND is_admin());

CREATE POLICY "Admin update college images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'college-images' AND is_admin());

CREATE POLICY "Admin delete college images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'college-images' AND is_admin());


-- ── SECTION 2: Missing Indexes ───────────────────────────────────────────────
-- PostgreSQL does NOT auto-index FK columns or filtered columns.
-- These 15 indexes fix full-table-scan queries on every page load and RLS check.

-- colleges
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_status
  ON colleges(status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_stream
  ON colleges(stream);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_naac
  ON colleges(naac_grade);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_nirf
  ON colleges(nirf_rank) WHERE nirf_rank IS NOT NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_updated
  ON colleges(updated_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_ai_generated
  ON colleges(ai_generated) WHERE ai_generated = true;

-- blogs
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_blogs_status_published
  ON blogs(status, published_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_blogs_author
  ON blogs(author_id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_blogs_category
  ON blogs(category) WHERE category IS NOT NULL;

-- reviews
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_reviews_college_status
  ON reviews(college_id, status);

-- qa
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_qa_questions_college_status
  ON qa_questions(college_id, status);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_qa_answers_question_status
  ON qa_answers(question_id, status);

-- leads
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_leads_status_created
  ON leads(status, created_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_leads_source
  ON leads(source);

-- alumni
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_alumni_college
  ON alumni(college_id);

-- college_courses
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_college_courses_college
  ON college_courses(college_id);


-- ── SECTION 3: Auto-update updated_at trigger ────────────────────────────────
-- Without this trigger, updated_at stays at its original INSERT value forever.

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DO $$
DECLARE tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'colleges', 'blogs', 'leads', 'reviews',
    'qa_questions', 'qa_answers', 'alumni', 'hero_banners', 'exams'
  ]
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_updated_at ON %I;
       CREATE TRIGGER trg_updated_at
         BEFORE UPDATE ON %I
         FOR EACH ROW EXECUTE FUNCTION set_updated_at();',
      tbl, tbl
    );
  END LOOP;
END $$;


-- ── SECTION 4: Normalise details.rankings[].rank to integer ─────────────────
-- Fixes mixed string/integer "rank" values across 104 colleges.
-- Converts "49" → 49, "Not ranked"/0/"null" → null.

UPDATE colleges
SET details = jsonb_set(
  details,
  '{rankings}',
  COALESCE(
    (
      SELECT jsonb_agg(
        CASE
          -- Already a valid integer
          WHEN jsonb_typeof(r->'rank') = 'number' AND (r->>'rank')::numeric > 0
            THEN r
          -- String that is a positive integer
          WHEN jsonb_typeof(r->'rank') = 'string'
               AND (r->>'rank') ~ '^\d+$'
               AND (r->>'rank')::int > 0
            THEN r - 'rank' || jsonb_build_object('rank', (r->>'rank')::int)
          -- Zero, null, "Not ranked", empty string
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
  AND jsonb_array_length(details->'rankings') > 0;


-- ── SECTION 5: Backfill college_courses table from details JSONB ─────────────
-- Normalises course data from the details blob into the relational table.
-- This enables SQL queries like: SELECT * FROM college_courses WHERE entrance_exam = 'JEE'

TRUNCATE college_courses;  -- Start fresh (table was empty)

INSERT INTO college_courses (
  college_id,
  course_name,
  duration,
  fees_per_year,
  total_fees,
  seats,
  eligibility,
  entrance_exam
)
SELECT
  c.id                                    AS college_id,
  COALESCE(
    course->>'program',
    course->>'course',
    'Unknown'
  )                                       AS course_name,
  (course->>'duration')::text             AS duration,
  CASE WHEN course->>'fees_per_year' ~ '^\d+$'
       THEN (course->>'fees_per_year')::int
       ELSE NULL END                      AS fees_per_year,
  CASE WHEN course->>'total_fees' ~ '^\d+$'
       THEN (course->>'total_fees')::int
       ELSE NULL END                      AS total_fees,
  CASE WHEN course->>'seats' ~ '^\d+$'
       THEN (course->>'seats')::int
       ELSE NULL END                      AS seats,
  (course->>'eligibility')::text          AS eligibility,
  c.entrance_exams[1]                     AS entrance_exam
FROM colleges c
CROSS JOIN LATERAL jsonb_array_elements(c.details->'courses_fees') AS course
WHERE
  c.details ? 'courses_fees'
  AND jsonb_typeof(c.details->'courses_fees') = 'array'
  AND jsonb_array_length(c.details->'courses_fees') > 0
ON CONFLICT DO NOTHING;

-- Verify backfill
SELECT COUNT(*) AS courses_backfilled FROM college_courses;


-- ── SECTION 6: Full-Text Search on colleges ──────────────────────────────────
-- Adds a GIN-indexed tsvector column for fast full-text search.
-- Replaces the slow ilike '%term%' pattern used in getAllColleges().
-- After adding this, update getAllColleges() to use .textSearch('fts', term)

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
  ) STORED;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_colleges_fts
  ON colleges USING GIN(fts);


-- ── SECTION 7: Fix featured_items uniqueness ─────────────────────────────────
-- Prevents duplicate featured items for the same college/blog/exam in a section.

ALTER TABLE featured_items
  DROP CONSTRAINT IF EXISTS featured_items_item_section_unique;

ALTER TABLE featured_items
  ADD CONSTRAINT featured_items_item_section_unique
  UNIQUE (item_type, item_id, section);


-- ── SECTION 8: Add missing columns to leads table ───────────────────────────
-- The TypeScript types reference fields that may not exist in the live schema.
-- These are safe to run even if columns already exist (IF NOT EXISTS).

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS course_interest text,
  ADD COLUMN IF NOT EXISTS budget          text,
  ADD COLUMN IF NOT EXISTS exam_type       text,
  ADD COLUMN IF NOT EXISTS exam_score      text,
  ADD COLUMN IF NOT EXISTS career_goal     text;


-- ── SECTION 9: Add ai_generated column to colleges if missing ────────────────
ALTER TABLE colleges
  ADD COLUMN IF NOT EXISTS ai_generated boolean DEFAULT false;

ALTER TABLE blogs
  ADD COLUMN IF NOT EXISTS ai_generated boolean DEFAULT false;


-- ── SECTION 10: Verify everything ────────────────────────────────────────────

SELECT
  schemaname,
  tablename,
  indexname
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('colleges','blogs','leads','reviews','qa_questions','qa_answers','alumni','college_courses')
ORDER BY tablename, indexname;

SELECT
  bucket_id,
  name,
  count(*) as objects
FROM storage.objects
GROUP BY bucket_id, name;

SELECT
  table_name,
  COUNT(*) as column_count
FROM information_schema.columns
WHERE table_schema = 'public'
GROUP BY table_name
ORDER BY table_name;
