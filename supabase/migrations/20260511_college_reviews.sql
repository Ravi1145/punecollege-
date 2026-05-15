-- CollegePune: Student Reviews Table
-- Run this once in Supabase SQL Editor → https://supabase.com/dashboard/project/lnmttqtpxqmlynhddenc/sql

CREATE TABLE IF NOT EXISTS public.college_reviews (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_slug   text NOT NULL,
  college_name   text NOT NULL DEFAULT '',
  student_name   text NOT NULL,
  course         text NOT NULL DEFAULT '',
  year           text NOT NULL DEFAULT '',        -- e.g. "2023", "2024-25"
  rating         smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title          text NOT NULL DEFAULT '',
  body           text NOT NULL,
  pros           text[] NOT NULL DEFAULT '{}',
  cons           text[] NOT NULL DEFAULT '{}',
  status         text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

-- Index for fast lookup by college + status
CREATE INDEX IF NOT EXISTS idx_college_reviews_slug_status
  ON public.college_reviews (college_slug, status);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_college_reviews_updated_at ON public.college_reviews;
CREATE TRIGGER update_college_reviews_updated_at
  BEFORE UPDATE ON public.college_reviews
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- RLS: anyone can read approved reviews, only service role can insert/update
ALTER TABLE public.college_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "approved_reviews_public_read" ON public.college_reviews;
CREATE POLICY "approved_reviews_public_read"
  ON public.college_reviews FOR SELECT
  USING (status = 'approved');

-- Anon users can insert (submit reviews)
DROP POLICY IF EXISTS "anyone_can_submit_review" ON public.college_reviews;
CREATE POLICY "anyone_can_submit_review"
  ON public.college_reviews FOR INSERT
  WITH CHECK (status = 'pending');

-- Seed a few sample approved reviews for COEP so the UI isn't empty
INSERT INTO public.college_reviews (college_slug, college_name, student_name, course, year, rating, title, body, pros, cons, status)
VALUES
  ('coep-college-of-engineering-pune', 'COEP Technological University', 'Rahul Deshmukh', 'B.Tech Computer Engineering', '2024', 5, 'Best government engineering college in Pune', 'COEP has an amazing campus, great faculty, and strong placement record. The alumni network is incredible and helped me land my dream job at a product company.', ARRAY['Excellent faculty', 'Strong placements', 'Great alumni network', 'Affordable fees'], ARRAY['Very competitive entrance', 'Infrastructure needs upgrade in some buildings'], 'approved'),
  ('coep-college-of-engineering-pune', 'COEP Technological University', 'Priya Kulkarni', 'B.Tech Mechanical Engineering', '2023', 4, 'Heritage college with modern opportunities', 'Being a COEP student is a matter of pride. The culture, technical clubs, and industry exposure are top notch. MHT-CET cutoff is high but worth it.', ARRAY['Historic campus', 'Technical clubs', 'Industry connections', 'Pune location'], ARRAY['Hostel seats limited', 'Some labs are old'], 'approved'),
  ('sibm-symbiosis-institute-business-management-pune', 'SIBM Pune – Symbiosis Institute of Business Management', 'Ananya Shah', 'MBA (Marketing)', '2024', 5, 'Best MBA college in Pune, hands down', 'SIBM placement record speaks for itself. McKinsey, BCG, Goldman Sachs on campus — the peer quality and faculty push you to excel every day.', ARRAY['Top placement 65 LPA', 'Peer quality very high', 'Strong brand', 'International exposure'], ARRAY['Very expensive', 'SNAP cutoff is high', 'Intense workload'], 'approved'),
  ('mit-wpu-mit-world-peace-university', 'MIT World Peace University (MIT-WPU)', 'Siddharth Joshi', 'B.Tech AI & Data Science', '2025', 4, 'Great infrastructure and modern programs', 'MIT-WPU has excellent labs, active placement cell, and modern curriculum. The AI/DS program is top-notch with industry collaborations. Campus life is vibrant.', ARRAY['Modern infrastructure', 'Good placements', 'Industry projects', 'Active cultural events'], ARRAY['Fees are high', 'Traffic near campus', 'Some faculty inconsistency'], 'approved')
ON CONFLICT DO NOTHING;
