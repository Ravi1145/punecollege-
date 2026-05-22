-- ============================================================
-- CollegePune — Full Database Migration
-- Project: tfdcpljbozadshhmvhfk
-- Run this in: https://supabase.com/dashboard/project/tfdcpljbozadshhmvhfk/sql/new
-- ============================================================

-- ── 1. ENUMS ─────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE content_status AS ENUM ('draft', 'pending', 'published', 'rejected');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('super_admin', 'agent');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── 2. PROFILES (admin users) ────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text NOT NULL,
  full_name   text,
  role        user_role NOT NULL DEFAULT 'agent',
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- ── 3. COLLEGES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS colleges (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text NOT NULL UNIQUE,
  name         text NOT NULL,
  location     text,
  type         text,
  established  integer,
  description  text,
  logo_url     text,
  cover_url    text,
  website      text,
  phone        text,
  email        text,
  address      text,
  city         text DEFAULT 'Pune',
  state        text DEFAULT 'Maharashtra',
  naac_grade   text,
  nirf_rank    integer,
  status       content_status NOT NULL DEFAULT 'published',
  details      jsonb DEFAULT '{}',
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- ── 4. BLOGS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blogs (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text NOT NULL UNIQUE,
  title        text NOT NULL,
  excerpt      text,
  content      text,
  category     text,
  tags         text[],
  cover_url    text,
  image_url    text,
  author_id    uuid REFERENCES profiles(id) ON DELETE SET NULL,
  status       content_status NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  read_time    integer,
  views        integer NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- ── 5. LEADS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  email           text,
  phone           text,
  stream          text,
  college_interest text,
  message         text,
  source          text DEFAULT 'website',
  page_url        text,
  status          text NOT NULL DEFAULT 'new',
  assigned_to     uuid REFERENCES profiles(id) ON DELETE SET NULL,
  notes           text,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- ── 6. REVIEWS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id    uuid REFERENCES colleges(id) ON DELETE CASCADE,
  author_name   text NOT NULL,
  author_email  text,
  rating        integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  body          text NOT NULL,
  pros          text,
  cons          text,
  batch_year    integer,
  course        text,
  status        content_status NOT NULL DEFAULT 'pending',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- ── 7. Q&A ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS qa_questions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id    uuid REFERENCES colleges(id) ON DELETE CASCADE,
  author_name   text NOT NULL,
  author_email  text,
  question      text NOT NULL,
  status        content_status NOT NULL DEFAULT 'pending',
  views         integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS qa_answers (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id  uuid NOT NULL REFERENCES qa_questions(id) ON DELETE CASCADE,
  author_id    uuid REFERENCES profiles(id) ON DELETE SET NULL,
  author_name  text,
  body         text NOT NULL,
  is_official  boolean NOT NULL DEFAULT false,
  status       content_status NOT NULL DEFAULT 'published',
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

-- ── 8. ALUMNI ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alumni (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text NOT NULL UNIQUE,
  name            text NOT NULL,
  college_id      uuid REFERENCES colleges(id) ON DELETE SET NULL,
  college_name    text,
  graduation_year integer,
  course          text,
  job_role        text,
  company         text,
  photo_url       text,
  story           text,
  linkedin_url    text,
  package_lpa     numeric,
  status          content_status NOT NULL DEFAULT 'published',
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- ── 9. HERO BANNERS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hero_banners (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type        text NOT NULL CHECK (type IN ('hero','poster','banner')),
  title       text NOT NULL,
  subtitle    text,
  cta_text    text,
  cta_link    text,
  image_url   text,
  is_active   boolean NOT NULL DEFAULT true,
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- ── 10. FEATURED ITEMS ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS featured_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type   text NOT NULL CHECK (item_type IN ('college','blog','exam')),
  item_id     uuid NOT NULL,
  section     text NOT NULL,
  sort_order  integer NOT NULL DEFAULT 0,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ── 11. EXAMS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS exams (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug               text NOT NULL UNIQUE,
  name               text NOT NULL,
  full_name          text,
  category           text,
  conducting_body    text,
  exam_date          text,
  registration_start text,
  registration_end   text,
  official_website   text,
  description        text,
  eligibility        text,
  exam_pattern       jsonb DEFAULT '{}',
  status             content_status NOT NULL DEFAULT 'published',
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

-- ── 12. COLLEGE COURSES ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS college_courses (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id    uuid NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
  course_name   text NOT NULL,
  duration      text,
  fees_per_year integer,
  total_fees    integer,
  seats         integer,
  eligibility   text,
  entrance_exam text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ── 13. RLS — ENABLE ─────────────────────────────────────────
ALTER TABLE profiles       ENABLE ROW LEVEL SECURITY;
ALTER TABLE colleges       ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads          ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews        ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_questions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE qa_answers     ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni         ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_banners   ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams          ENABLE ROW LEVEL SECURITY;
ALTER TABLE college_courses ENABLE ROW LEVEL SECURITY;

-- ── 14. HELPER FUNCTIONS ─────────────────────────────────────
CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean
  LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role IN ('super_admin','agent') AND is_active = true
  );
$$;

CREATE OR REPLACE FUNCTION is_super_admin() RETURNS boolean
  LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
  );
$$;

-- ── 15. RLS POLICIES ─────────────────────────────────────────

-- profiles
DROP POLICY IF EXISTS "users read own profile"    ON profiles;
DROP POLICY IF EXISTS "super admin all profiles"  ON profiles;
CREATE POLICY "users read own profile"   ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "super admin all profiles" ON profiles FOR ALL    USING (is_super_admin());

-- colleges
DROP POLICY IF EXISTS "public read published colleges" ON colleges;
DROP POLICY IF EXISTS "admin read all colleges"        ON colleges;
DROP POLICY IF EXISTS "admin insert colleges"          ON colleges;
DROP POLICY IF EXISTS "admin update colleges"          ON colleges;
DROP POLICY IF EXISTS "super admin delete colleges"    ON colleges;
CREATE POLICY "public read published colleges" ON colleges FOR SELECT USING (status = 'published');
CREATE POLICY "admin read all colleges"        ON colleges FOR SELECT USING (is_admin());
CREATE POLICY "admin insert colleges"          ON colleges FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "admin update colleges"          ON colleges FOR UPDATE USING (is_admin());
CREATE POLICY "super admin delete colleges"    ON colleges FOR DELETE USING (is_super_admin());

-- blogs
DROP POLICY IF EXISTS "public read published blogs" ON blogs;
DROP POLICY IF EXISTS "admin read all blogs"        ON blogs;
DROP POLICY IF EXISTS "agent insert own blogs"      ON blogs;
DROP POLICY IF EXISTS "agent update own blogs"      ON blogs;
DROP POLICY IF EXISTS "super admin delete blogs"    ON blogs;
CREATE POLICY "public read published blogs" ON blogs FOR SELECT USING (status = 'published');
CREATE POLICY "admin read all blogs"        ON blogs FOR SELECT USING (is_admin());
CREATE POLICY "agent insert own blogs"      ON blogs FOR INSERT WITH CHECK (is_admin());
CREATE POLICY "agent update own blogs"      ON blogs FOR UPDATE USING (is_admin() AND (author_id = auth.uid() OR is_super_admin()));
CREATE POLICY "super admin delete blogs"    ON blogs FOR DELETE USING (is_super_admin());

-- leads
DROP POLICY IF EXISTS "public insert leads"      ON leads;
DROP POLICY IF EXISTS "admin read leads"         ON leads;
DROP POLICY IF EXISTS "admin update leads"       ON leads;
DROP POLICY IF EXISTS "super admin delete leads" ON leads;
CREATE POLICY "public insert leads"      ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "admin read leads"         ON leads FOR SELECT USING (is_admin());
CREATE POLICY "admin update leads"       ON leads FOR UPDATE USING (is_admin());
CREATE POLICY "super admin delete leads" ON leads FOR DELETE USING (is_super_admin());

-- reviews
DROP POLICY IF EXISTS "public insert reviews"      ON reviews;
DROP POLICY IF EXISTS "public read published reviews" ON reviews;
DROP POLICY IF EXISTS "admin read all reviews"     ON reviews;
DROP POLICY IF EXISTS "admin update reviews"       ON reviews;
DROP POLICY IF EXISTS "super admin delete reviews" ON reviews;
CREATE POLICY "public insert reviews"         ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "public read published reviews" ON reviews FOR SELECT USING (status = 'published');
CREATE POLICY "admin read all reviews"        ON reviews FOR SELECT USING (is_admin());
CREATE POLICY "admin update reviews"          ON reviews FOR UPDATE USING (is_admin());
CREATE POLICY "super admin delete reviews"    ON reviews FOR DELETE USING (is_super_admin());

-- qa_questions
DROP POLICY IF EXISTS "public insert qa"             ON qa_questions;
DROP POLICY IF EXISTS "public read published qa"     ON qa_questions;
DROP POLICY IF EXISTS "admin read all qa"            ON qa_questions;
DROP POLICY IF EXISTS "admin update qa"              ON qa_questions;
DROP POLICY IF EXISTS "super admin delete qa"        ON qa_questions;
CREATE POLICY "public insert qa"         ON qa_questions FOR INSERT WITH CHECK (true);
CREATE POLICY "public read published qa" ON qa_questions FOR SELECT USING (status = 'published');
CREATE POLICY "admin read all qa"        ON qa_questions FOR SELECT USING (is_admin());
CREATE POLICY "admin update qa"          ON qa_questions FOR UPDATE USING (is_admin());
CREATE POLICY "super admin delete qa"    ON qa_questions FOR DELETE USING (is_super_admin());

-- qa_answers
DROP POLICY IF EXISTS "public read published answers" ON qa_answers;
DROP POLICY IF EXISTS "admin all answers"             ON qa_answers;
CREATE POLICY "public read published answers" ON qa_answers FOR SELECT USING (status = 'published');
CREATE POLICY "admin all answers"             ON qa_answers FOR ALL    USING (is_admin());

-- alumni
DROP POLICY IF EXISTS "public read published alumni" ON alumni;
DROP POLICY IF EXISTS "admin all alumni"             ON alumni;
CREATE POLICY "public read published alumni" ON alumni FOR SELECT USING (status = 'published');
CREATE POLICY "admin all alumni"             ON alumni FOR ALL    USING (is_admin());

-- hero_banners
DROP POLICY IF EXISTS "public read active banners" ON hero_banners;
DROP POLICY IF EXISTS "super admin all banners"    ON hero_banners;
CREATE POLICY "public read active banners" ON hero_banners FOR SELECT USING (is_active = true);
CREATE POLICY "super admin all banners"    ON hero_banners FOR ALL    USING (is_super_admin());

-- featured_items
DROP POLICY IF EXISTS "public read active featured" ON featured_items;
DROP POLICY IF EXISTS "super admin all featured"    ON featured_items;
CREATE POLICY "public read active featured" ON featured_items FOR SELECT USING (is_active = true);
CREATE POLICY "super admin all featured"    ON featured_items FOR ALL    USING (is_super_admin());

-- exams
DROP POLICY IF EXISTS "public read published exams" ON exams;
DROP POLICY IF EXISTS "admin all exams"             ON exams;
CREATE POLICY "public read published exams" ON exams FOR SELECT USING (status = 'published');
CREATE POLICY "admin all exams"             ON exams FOR ALL    USING (is_admin());

-- college_courses
DROP POLICY IF EXISTS "public read college courses" ON college_courses;
DROP POLICY IF EXISTS "admin all college courses"   ON college_courses;
CREATE POLICY "public read college courses" ON college_courses FOR SELECT USING (true);
CREATE POLICY "admin all college courses"   ON college_courses FOR ALL    USING (is_admin());

-- ── 16. AUTO-PROFILE TRIGGER ─────────────────────────────────
CREATE OR REPLACE FUNCTION handle_new_user() RETURNS trigger
  LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── 17. CREATE SUPER ADMIN USER ──────────────────────────────
-- Creates admin user raviy@studycups.in / CollegePune@2026!
DO $$
DECLARE
  uid uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO uid FROM auth.users WHERE email = 'raviy@studycups.in';

  IF uid IS NULL THEN
    uid := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      aud, role,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, phone_change, phone_change_token,
      email_change_token_current, reauthentication_token,
      created_at, updated_at
    )
    VALUES (
      uid,
      '00000000-0000-0000-0000-000000000000',
      'raviy@studycups.in',
      crypt('CollegePune@2026!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Super Admin"}'::jsonb,
      'authenticated', 'authenticated',
      '', '', '', '', '', '', '', '',
      now(), now()
    );
  END IF;

  -- Upsert profile as super_admin
  INSERT INTO profiles (id, email, full_name, role, is_active)
  VALUES (uid, 'raviy@studycups.in', 'Super Admin', 'super_admin', true)
  ON CONFLICT (id) DO UPDATE SET role = 'super_admin', is_active = true;
END $$;

-- ── DONE ─────────────────────────────────────────────────────
SELECT 'Migration complete! Tables: ' || count(*)::text || ' created.'
FROM information_schema.tables
WHERE table_schema = 'public';
