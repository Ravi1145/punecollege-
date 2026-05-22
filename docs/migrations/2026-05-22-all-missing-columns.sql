-- ============================================================
-- CollegePune — Add ALL missing columns
-- Run ONCE in:
-- https://supabase.com/dashboard/project/tfdcpljbozadshhmvhfk/sql/new
-- Safe to run multiple times (uses ADD COLUMN IF NOT EXISTS)
-- ============================================================

-- ── COLLEGES: extra fields ────────────────────────────────────
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS short_name      text;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS affiliation     text;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS stream          text;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS courses         text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS specializations text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS fees_min        integer DEFAULT 0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS fees_max        integer DEFAULT 0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS avg_placement   integer DEFAULT 0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS highest_pkg     integer DEFAULT 0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS top_recruiters  text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS entrance_exams  text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS hostel          boolean DEFAULT false;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS highlights      text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS tags            text[];
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS rating          numeric DEFAULT 0;
ALTER TABLE colleges ADD COLUMN IF NOT EXISTS review_count    integer DEFAULT 0;

-- ── LEADS: extra fields ───────────────────────────────────────
ALTER TABLE leads ADD COLUMN IF NOT EXISTS course_interest text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS budget          text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS exam_type       text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS exam_score      text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS career_goal     text;

-- ── Verify ────────────────────────────────────────────────────
SELECT
  column_name,
  data_type
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'colleges'
ORDER BY ordinal_position;
