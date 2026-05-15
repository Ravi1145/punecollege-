-- ============================================================
-- CollegePune — Performance Indexes for Admin Panel + Public APIs
-- Run AFTER 20260512_complete_schema.sql
-- Safe to re-run: all use IF NOT EXISTS
-- ============================================================

-- ── COLLEGES — composite indexes for filtered admin list ──────────

-- Admin list default (excludes archived): status != 'archived', ordered by created_at
CREATE INDEX IF NOT EXISTS idx_colleges_active_created
  ON public.colleges (created_at DESC)
  WHERE status != 'archived';

-- Admin stats queries
CREATE INDEX IF NOT EXISTS idx_colleges_published
  ON public.colleges (status) WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_colleges_draft
  ON public.colleges (status) WHERE status = 'draft';

-- Public API: published + stream filter
CREATE INDEX IF NOT EXISTS idx_colleges_pub_stream
  ON public.colleges (stream, created_at DESC)
  WHERE status = 'published';

-- Public API: published + city filter
CREATE INDEX IF NOT EXISTS idx_colleges_pub_city
  ON public.colleges (city, created_at DESC)
  WHERE status = 'published';

-- ── BLOGS — composite indexes ────────────────────────────────────

-- Admin list default (excludes archived)
CREATE INDEX IF NOT EXISTS idx_blogs_active_created
  ON public.blogs (created_at DESC)
  WHERE status != 'archived';

-- Public blog listing: published, ordered by published_at
CREATE INDEX IF NOT EXISTS idx_blogs_pub_category
  ON public.blogs (category, published_at DESC)
  WHERE status = 'published';

-- Public blog detail: slug lookup (already covered by unique constraint, but explicit)
CREATE INDEX IF NOT EXISTS idx_blogs_slug_status
  ON public.blogs (slug, status);

-- ── LEADS — admin panel queries ───────────────────────────────────

-- Lead deduplication (phone + recent)
CREATE INDEX IF NOT EXISTS idx_leads_phone_recent
  ON public.leads (phone, created_at DESC);

-- Admin filter by stream + status
CREATE INDEX IF NOT EXISTS idx_leads_stream_status
  ON public.leads (stream, status, created_at DESC);

-- ── COLLEGE REVIEWS — college page queries ────────────────────────

-- Approved reviews for a specific college (most common public query)
CREATE INDEX IF NOT EXISTS idx_reviews_approved_college
  ON public.college_reviews (college_slug, created_at DESC)
  WHERE status = 'approved';

-- Admin moderation queue (pending reviews)
CREATE INDEX IF NOT EXISTS idx_reviews_pending
  ON public.college_reviews (created_at DESC)
  WHERE status = 'pending';

-- ── VERIFY ────────────────────────────────────────────────────────
SELECT
  indexname,
  tablename,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('colleges','blogs','leads','college_reviews')
ORDER BY tablename, indexname;
