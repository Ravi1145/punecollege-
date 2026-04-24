-- CollegePune — Migration 002: Colleges, Blogs, City Pages, AI Jobs
-- Run in: Supabase Dashboard → SQL Editor → New query

-- ── COLLEGES TABLE ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS colleges (
  id             BIGSERIAL PRIMARY KEY,
  slug           TEXT UNIQUE NOT NULL,
  name           TEXT NOT NULL,
  short_name     TEXT,
  type           TEXT CHECK (type IN ('Government','Private','Deemed','Autonomous')),
  established    INTEGER,
  affiliation    TEXT,
  naac_grade     TEXT CHECK (naac_grade IN ('A++','A+','A','B++','B+','B','C')),
  nirf_rank      INTEGER,
  city           TEXT NOT NULL DEFAULT 'Pune',
  state          TEXT DEFAULT 'Maharashtra',
  address        TEXT,
  description    TEXT,
  highlights     TEXT[],
  tags           TEXT[],
  fees_min       INTEGER,
  fees_max       INTEGER,
  avg_placement  INTEGER,
  highest_pkg    INTEGER,
  top_recruiters TEXT[],
  entrance_exams TEXT[],
  hostel         BOOLEAN DEFAULT false,
  rating         NUMERIC(2,1) DEFAULT 0,
  review_count   INTEGER DEFAULT 0,
  website        TEXT,
  phone          TEXT,
  email          TEXT,
  stream         TEXT,
  image_url      TEXT,
  courses        TEXT[],
  specializations TEXT[],
  faqs           JSONB DEFAULT '[]'::JSONB,
  status         TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  ai_generated   BOOLEAN DEFAULT false,
  meta_title     TEXT,
  meta_desc      TEXT,
  seo_keywords   TEXT[],
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── BLOGS TABLE ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blogs (
  id           BIGSERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  body         TEXT,
  author       TEXT DEFAULT 'CollegePune Team',
  category     TEXT,
  tags         TEXT[],
  read_time    TEXT,
  status       TEXT DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  ai_generated BOOLEAN DEFAULT false,
  meta_title   TEXT,
  meta_desc    TEXT,
  image_url    TEXT,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── CITY PAGES TABLE ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS city_pages (
  id           BIGSERIAL PRIMARY KEY,
  city         TEXT NOT NULL,
  stream       TEXT NOT NULL,
  slug         TEXT UNIQUE NOT NULL,      -- e.g. pune-mba
  title        TEXT,
  intro        TEXT,
  faqs         JSONB DEFAULT '[]'::JSONB,
  cta_text     TEXT,
  status       TEXT DEFAULT 'draft' CHECK (status IN ('draft','published')),
  ai_generated BOOLEAN DEFAULT false,
  meta_title   TEXT,
  meta_desc    TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(city, stream)
);

-- ── AI JOBS TABLE ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ai_jobs (
  id           BIGSERIAL PRIMARY KEY,
  type         TEXT NOT NULL,            -- generate_college | generate_blog | generate_city_page
  input        JSONB NOT NULL,
  output       JSONB,
  status       TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','completed','failed')),
  error        TEXT,
  tokens_used  INTEGER,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ── INDEXES ───────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_colleges_slug    ON colleges(slug);
CREATE INDEX IF NOT EXISTS idx_colleges_status  ON colleges(status);
CREATE INDEX IF NOT EXISTS idx_colleges_city    ON colleges(city);
CREATE INDEX IF NOT EXISTS idx_colleges_stream  ON colleges(stream);
CREATE INDEX IF NOT EXISTS idx_colleges_created ON colleges(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_blogs_slug       ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status     ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_created    ON blogs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_city_pages_city_stream ON city_pages(city, stream);
CREATE INDEX IF NOT EXISTS idx_ai_jobs_status         ON ai_jobs(status);

-- ── AUTO-UPDATE updated_at ────────────────────────────────────────
DROP TRIGGER IF EXISTS colleges_updated_at ON colleges;
CREATE TRIGGER colleges_updated_at
  BEFORE UPDATE ON colleges
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS blogs_updated_at ON blogs;
CREATE TRIGGER blogs_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS city_pages_updated_at ON city_pages;
CREATE TRIGGER city_pages_updated_at
  BEFORE UPDATE ON city_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────
ALTER TABLE colleges   ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs      ENABLE ROW LEVEL SECURITY;
ALTER TABLE city_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_jobs    ENABLE ROW LEVEL SECURITY;

-- Public can read published colleges and blogs
CREATE POLICY "public_read_colleges"
  ON colleges FOR SELECT USING (status = 'published');

CREATE POLICY "public_read_blogs"
  ON blogs FOR SELECT USING (status = 'published');

CREATE POLICY "public_read_city_pages"
  ON city_pages FOR SELECT USING (status = 'published');

-- Service role (admin) can do everything — handled via service_role key (bypasses RLS)
