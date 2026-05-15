-- ============================================================
-- CollegePune — Complete Database Schema
-- Run once in: https://supabase.com/dashboard/project/lnmttqtpxqmlynhddenc/sql
-- Safe to re-run: all statements use IF NOT EXISTS / OR REPLACE
-- ============================================================

-- ── 0. HELPERS ──────────────────────────────────────────────────────

-- Auto-update updated_at trigger function (shared across all tables)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ── 1. COLLEGES ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.colleges (
  id               serial       PRIMARY KEY,
  slug             text         NOT NULL UNIQUE,
  name             text         NOT NULL,
  short_name       text,
  type             text,                           -- Government, Private, Deemed, Autonomous
  established      integer,
  affiliation      text,
  naac_grade       text,
  nirf_rank        integer,
  city             text         NOT NULL DEFAULT 'Pune',
  state            text         DEFAULT 'Maharashtra',
  address          text,
  description      text,
  highlights       text[]       DEFAULT '{}',
  tags             text[]       DEFAULT '{}',
  fees_min         integer,
  fees_max         integer,
  avg_placement    integer,
  highest_pkg      integer,
  top_recruiters   text[]       DEFAULT '{}',
  entrance_exams   text[]       DEFAULT '{}',
  courses          text[]       DEFAULT '{}',
  specializations  text[]       DEFAULT '{}',
  hostel           boolean      DEFAULT false,
  rating           numeric(3,1) DEFAULT 4.0,
  review_count     integer      DEFAULT 0,
  website          text,
  phone            text,
  email            text,
  stream           text,                           -- Engineering, MBA, Medical, Law, etc.
  image_url        text,
  faqs             jsonb        DEFAULT '[]',
  details          jsonb        DEFAULT '{}',      -- courses_fees, placements, rankings, …
  status           text         NOT NULL DEFAULT 'draft'
                   CHECK (status IN ('draft', 'published', 'archived')),
  ai_generated     boolean      DEFAULT false,
  meta_title       text,
  meta_desc        text,
  seo_keywords     text[]       DEFAULT '{}',
  created_at       timestamptz  NOT NULL DEFAULT now(),
  updated_at       timestamptz  NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS colleges_updated_at ON public.colleges;
CREATE TRIGGER colleges_updated_at
  BEFORE UPDATE ON public.colleges
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_colleges_slug        ON public.colleges (slug);
CREATE INDEX IF NOT EXISTS idx_colleges_status      ON public.colleges (status);
CREATE INDEX IF NOT EXISTS idx_colleges_stream      ON public.colleges (stream);
CREATE INDEX IF NOT EXISTS idx_colleges_city        ON public.colleges (city);
CREATE INDEX IF NOT EXISTS idx_colleges_status_city ON public.colleges (status, city);
CREATE INDEX IF NOT EXISTS idx_colleges_nirf        ON public.colleges (nirf_rank) WHERE nirf_rank IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_colleges_search      ON public.colleges USING gin(to_tsvector('english', coalesce(name,'') || ' ' || coalesce(short_name,'') || ' ' || coalesce(stream,'')));

-- RLS
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "colleges_public_read"   ON public.colleges;
DROP POLICY IF EXISTS "colleges_service_write" ON public.colleges;

CREATE POLICY "colleges_public_read"
  ON public.colleges FOR SELECT
  USING (status = 'published');

CREATE POLICY "colleges_service_write"
  ON public.colleges FOR ALL
  USING (auth.role() = 'service_role');

-- ── 2. BLOGS ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.blogs (
  id           serial      PRIMARY KEY,
  slug         text        NOT NULL UNIQUE,
  title        text        NOT NULL,
  excerpt      text,
  body         text,
  author       text        DEFAULT 'CollegePune',
  category     text        DEFAULT 'General',
  tags         text[]      DEFAULT '{}',
  read_time    text        DEFAULT '5 min read',
  status       text        NOT NULL DEFAULT 'draft'
               CHECK (status IN ('draft', 'published', 'archived')),
  ai_generated boolean     DEFAULT false,
  meta_title   text,
  meta_desc    text,
  image_url    text,
  published_at timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS blogs_updated_at ON public.blogs;
CREATE TRIGGER blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-set published_at when status becomes published
CREATE OR REPLACE FUNCTION public.blogs_set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blogs_auto_published_at ON public.blogs;
CREATE TRIGGER blogs_auto_published_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.blogs_set_published_at();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug        ON public.blogs (slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status      ON public.blogs (status);
CREATE INDEX IF NOT EXISTS idx_blogs_category    ON public.blogs (category);
CREATE INDEX IF NOT EXISTS idx_blogs_published   ON public.blogs (published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_blogs_search      ON public.blogs USING gin(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(excerpt,'')));

-- RLS
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blogs_public_read"   ON public.blogs;
DROP POLICY IF EXISTS "blogs_service_write" ON public.blogs;

CREATE POLICY "blogs_public_read"
  ON public.blogs FOR SELECT
  USING (status = 'published');

CREATE POLICY "blogs_service_write"
  ON public.blogs FOR ALL
  USING (auth.role() = 'service_role');

-- ── 3. LEADS ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.leads (
  id               serial      PRIMARY KEY,
  name             text        NOT NULL,
  phone            text        NOT NULL,
  email            text,
  whatsapp         text,
  city             text        DEFAULT 'Pune',
  stream           text,
  budget           text,
  exam_type        text,
  exam_score       text,
  career_goal      text,
  college_interest text,
  course_interest  text,
  source           text        NOT NULL DEFAULT 'enquiry_form',
  utm_source       text,
  utm_medium       text,
  page_url         text,
  status           text        NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
  notes            text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS leads_updated_at ON public.leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_phone      ON public.leads (phone);
CREATE INDEX IF NOT EXISTS idx_leads_status     ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_source     ON public.leads (source);
CREATE INDEX IF NOT EXISTS idx_leads_stream     ON public.leads (stream);
CREATE INDEX IF NOT EXISTS idx_leads_created    ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_dedup      ON public.leads (phone, created_at DESC);

-- RLS — leads are private, only service role can access
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "leads_service_only" ON public.leads;
CREATE POLICY "leads_service_only"
  ON public.leads FOR ALL
  USING (auth.role() = 'service_role');

-- Anon can INSERT (submit a lead form)
DROP POLICY IF EXISTS "leads_anon_insert" ON public.leads;
CREATE POLICY "leads_anon_insert"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- ── 4. ENQUIRIES ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.enquiries (
  id                serial      PRIMARY KEY,
  lead_id           integer     REFERENCES public.leads(id) ON DELETE SET NULL,
  name              text        NOT NULL,
  phone             text        NOT NULL,
  email             text,
  college_name      text        NOT NULL,
  college_slug      text,
  course            text,
  message           text,
  preferred_contact text        DEFAULT 'whatsapp'
                    CHECK (preferred_contact IN ('whatsapp', 'call', 'email')),
  preferred_time    text        CHECK (preferred_time IN ('morning', 'afternoon', 'evening')),
  status            text        NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'contacted', 'resolved')),
  created_at        timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_enquiries_college_slug ON public.enquiries (college_slug);
CREATE INDEX IF NOT EXISTS idx_enquiries_status       ON public.enquiries (status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created      ON public.enquiries (created_at DESC);

-- RLS
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "enquiries_service_only" ON public.enquiries;
CREATE POLICY "enquiries_service_only"
  ON public.enquiries FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "enquiries_anon_insert" ON public.enquiries;
CREATE POLICY "enquiries_anon_insert"
  ON public.enquiries FOR INSERT
  WITH CHECK (true);

-- ── 5. COUNSELLING BOOKINGS ─────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.counselling_bookings (
  id                    serial      PRIMARY KEY,
  lead_id               integer     REFERENCES public.leads(id) ON DELETE SET NULL,
  name                  text        NOT NULL,
  phone                 text        NOT NULL,
  email                 text,
  preferred_date        text,
  preferred_time        text        CHECK (preferred_time IN ('morning', 'afternoon', 'evening')),
  stream                text,
  exam_score            text,
  colleges_shortlisted  text,
  status                text        NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bookings_status  ON public.counselling_bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON public.counselling_bookings (created_at DESC);

ALTER TABLE public.counselling_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "bookings_service_only" ON public.counselling_bookings;
CREATE POLICY "bookings_service_only"
  ON public.counselling_bookings FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "bookings_anon_insert" ON public.counselling_bookings;
CREATE POLICY "bookings_anon_insert"
  ON public.counselling_bookings FOR INSERT
  WITH CHECK (true);

-- ── 6. COLLEGE REVIEWS ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.college_reviews (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  college_slug text        NOT NULL,
  college_name text        NOT NULL DEFAULT '',
  student_name text        NOT NULL,
  course       text        NOT NULL DEFAULT '',
  year         text        NOT NULL DEFAULT '',
  rating       smallint    NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title        text        NOT NULL DEFAULT '',
  body         text        NOT NULL,
  pros         text[]      NOT NULL DEFAULT '{}',
  cons         text[]      NOT NULL DEFAULT '{}',
  status       text        NOT NULL DEFAULT 'pending'
               CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS college_reviews_updated_at ON public.college_reviews;
CREATE TRIGGER college_reviews_updated_at
  BEFORE UPDATE ON public.college_reviews
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_reviews_slug_status ON public.college_reviews (college_slug, status);
CREATE INDEX IF NOT EXISTS idx_reviews_status      ON public.college_reviews (status);

ALTER TABLE public.college_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "reviews_public_read"   ON public.college_reviews;
DROP POLICY IF EXISTS "reviews_anon_insert"   ON public.college_reviews;
DROP POLICY IF EXISTS "reviews_service_write" ON public.college_reviews;

CREATE POLICY "reviews_public_read"
  ON public.college_reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "reviews_anon_insert"
  ON public.college_reviews FOR INSERT
  WITH CHECK (status = 'pending');

CREATE POLICY "reviews_service_write"
  ON public.college_reviews FOR ALL
  USING (auth.role() = 'service_role');

-- ── 7. AI JOBS (usage log) ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.ai_jobs (
  id           serial      PRIMARY KEY,
  type         text        NOT NULL,             -- 'generate_college', 'generate_blog', etc.
  input        jsonb,
  output       jsonb,
  status       text        DEFAULT 'completed'
               CHECK (status IN ('pending', 'completed', 'failed')),
  tokens_used  integer,
  completed_at timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_jobs_type    ON public.ai_jobs (type);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_created ON public.ai_jobs (created_at DESC);

ALTER TABLE public.ai_jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ai_jobs_service_only" ON public.ai_jobs;
CREATE POLICY "ai_jobs_service_only"
  ON public.ai_jobs FOR ALL
  USING (auth.role() = 'service_role');

-- ── 8. CITY PAGES (SEO) ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.city_pages (
  id           serial      PRIMARY KEY,
  city         text        NOT NULL,
  stream       text        NOT NULL,
  slug         text        NOT NULL UNIQUE,
  title        text,
  intro        text,
  faqs         jsonb       DEFAULT '[]',
  cta_text     text,
  status       text        NOT NULL DEFAULT 'published'
               CHECK (status IN ('draft', 'published', 'archived')),
  ai_generated boolean     DEFAULT false,
  meta_title   text,
  meta_desc    text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (city, stream)
);

DROP TRIGGER IF EXISTS city_pages_updated_at ON public.city_pages;
CREATE TRIGGER city_pages_updated_at
  BEFORE UPDATE ON public.city_pages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_city_pages_city_stream ON public.city_pages (city, stream);

ALTER TABLE public.city_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "city_pages_public_read"   ON public.city_pages;
DROP POLICY IF EXISTS "city_pages_service_write" ON public.city_pages;

CREATE POLICY "city_pages_public_read"
  ON public.city_pages FOR SELECT
  USING (status = 'published');

CREATE POLICY "city_pages_service_write"
  ON public.city_pages FOR ALL
  USING (auth.role() = 'service_role');

-- ── 9. SEED DATA ────────────────────────────────────────────────────

-- Seed approved reviews so college pages aren't empty on first load
INSERT INTO public.college_reviews
  (college_slug, college_name, student_name, course, year, rating, title, body, pros, cons, status)
VALUES
  ('coep-college-of-engineering-pune',
   'COEP Technological University',
   'Rahul Deshmukh', 'B.Tech Computer Engineering', '2024', 5,
   'Best government engineering college in Pune',
   'COEP has an amazing campus, great faculty, and strong placement record. The alumni network is incredible and helped me land my dream job at a product company.',
   ARRAY['Excellent faculty','Strong placements','Great alumni network','Affordable fees'],
   ARRAY['Very competitive entrance','Infrastructure needs upgrade in some buildings'],
   'approved'),

  ('coep-college-of-engineering-pune',
   'COEP Technological University',
   'Priya Kulkarni', 'B.Tech Mechanical Engineering', '2023', 4,
   'Heritage college with modern opportunities',
   'Being a COEP student is a matter of pride. The culture, technical clubs, and industry exposure are top notch. MHT-CET cutoff is high but worth it.',
   ARRAY['Historic campus','Technical clubs','Industry connections','Pune location'],
   ARRAY['Hostel seats limited','Some labs are old'],
   'approved'),

  ('sibm-symbiosis-institute-business-management-pune',
   'SIBM Pune – Symbiosis Institute of Business Management',
   'Ananya Shah', 'MBA (Marketing)', '2024', 5,
   'Best MBA college in Pune, hands down',
   'SIBM placement record speaks for itself. McKinsey, BCG, Goldman Sachs on campus — the peer quality and faculty push you to excel every day.',
   ARRAY['Top placement 65 LPA','Peer quality very high','Strong brand','International exposure'],
   ARRAY['Very expensive','SNAP cutoff is high','Intense workload'],
   'approved'),

  ('mit-wpu-mit-world-peace-university',
   'MIT World Peace University (MIT-WPU)',
   'Siddharth Joshi', 'B.Tech AI & Data Science', '2025', 4,
   'Great infrastructure and modern programs',
   'MIT-WPU has excellent labs, active placement cell, and modern curriculum. The AI/DS program is top-notch with industry collaborations. Campus life is vibrant.',
   ARRAY['Modern infrastructure','Good placements','Industry projects','Active cultural events'],
   ARRAY['Fees are high','Traffic near campus','Some faculty inconsistency'],
   'approved'),

  ('pict-pune-institute-of-computer-technology',
   'PICT – Pune Institute of Computer Technology',
   'Akash Patil', 'B.Tech Computer Engineering', '2024', 5,
   'Best private autonomous college for CS in Pune',
   'PICT is a CS-focused college with outstanding placement stats. Microsoft, Amazon, Goldman Sachs all visit on-campus. The coding culture here is unmatched.',
   ARRAY['Top-tier placements','Strong CS culture','Autonomous curriculum','Excellent faculty'],
   ARRAY['Only CS/IT streams','No hostel on campus','High MHT-CET cutoff'],
   'approved'),

  ('vit-pune-vishwakarma-institute-of-technology',
   'VIT Pune – Vishwakarma Institute of Technology',
   'Neha Sharma', 'B.Tech Electronics Engineering', '2024', 4,
   'Solid autonomous college with good placements',
   'VIT Pune offers a great mix of academics and extracurricular activities. The placement record is strong and the faculty is supportive. Good infrastructure too.',
   ARRAY['Autonomous curriculum','Good placement cell','Active college events','Central Pune location'],
   ARRAY['Medium-sized campus','Fees on the higher side','Traffic on Bibwewadi road'],
   'approved'),

  ('pumba-pune-university-mba',
   'PUMBA – Department of Management Sciences (Savitribai Phule Pune University)',
   'Sneha Kulkarni', 'MBA Finance', '2023', 4,
   'Best government MBA at affordable fees',
   'PUMBA offers an MBA from Pune University at government fees (₹1.2L total). CAT/MAH-CET cutoff is high but the ROI is outstanding. Faculty has great industry experience.',
   ARRAY['Extremely affordable fees','University campus experience','Strong alumni network','Good ROI'],
   ARRAY['Limited seats (120)','Infrastructure could be better','Less brand recognition than SIBM/SCMHRD'],
   'approved')
ON CONFLICT DO NOTHING;

-- ── 10. VERIFY ──────────────────────────────────────────────────────

-- Run this SELECT at the end to confirm all tables were created:
SELECT
  table_name,
  (SELECT count(*) FROM information_schema.columns c WHERE c.table_name = t.table_name AND c.table_schema = 'public') AS col_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN ('colleges','blogs','leads','enquiries','counselling_bookings','college_reviews','ai_jobs','city_pages')
ORDER BY table_name;
