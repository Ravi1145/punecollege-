-- CollegePune — Supabase Initial Migration
-- Run this in: Supabase Dashboard → SQL Editor → New query

-- ── LEADS TABLE ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT,
  whatsapp    TEXT,
  city        TEXT DEFAULT 'Pune',
  stream      TEXT,
  budget      TEXT,
  exam_type   TEXT,
  exam_score  TEXT,
  career_goal TEXT,
  college_interest  TEXT,
  course_interest   TEXT,
  source      TEXT NOT NULL,
  utm_source  TEXT,
  utm_medium  TEXT,
  page_url    TEXT,
  status      TEXT DEFAULT 'new',   -- new | contacted | converted | lost
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── ENQUIRIES TABLE ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enquiries (
  id               BIGSERIAL PRIMARY KEY,
  lead_id          BIGINT REFERENCES leads(id),
  name             TEXT NOT NULL,
  phone            TEXT NOT NULL,
  email            TEXT,
  college_name     TEXT NOT NULL,
  college_slug     TEXT,
  course           TEXT,
  message          TEXT,
  preferred_contact TEXT DEFAULT 'whatsapp',  -- whatsapp | call | email
  preferred_time   TEXT,                       -- morning | afternoon | evening
  status           TEXT DEFAULT 'pending',     -- pending | replied | closed
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── COUNSELLING BOOKINGS TABLE ────────────────────────────────────
CREATE TABLE IF NOT EXISTS counselling_bookings (
  id                   BIGSERIAL PRIMARY KEY,
  lead_id              BIGINT REFERENCES leads(id),
  name                 TEXT NOT NULL,
  phone                TEXT NOT NULL,
  email                TEXT,
  preferred_date       TEXT,
  preferred_time       TEXT,
  stream               TEXT,
  exam_score           TEXT,
  colleges_shortlisted TEXT,
  status               TEXT DEFAULT 'pending',  -- pending | confirmed | completed | cancelled
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- ── INDEXES ───────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_leads_phone   ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_status  ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source  ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);

-- ── AUTO-UPDATE updated_at ────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS leads_updated_at ON leads;
CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────
-- All server-side operations use the service_role key (bypasses RLS).
-- Enable RLS for safety; public INSERT is allowed for form submissions.

ALTER TABLE leads               ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries           ENABLE ROW LEVEL SECURITY;
ALTER TABLE counselling_bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public lead-capture forms)
CREATE POLICY "public_insert_leads"
  ON leads FOR INSERT WITH CHECK (true);

CREATE POLICY "public_insert_enquiries"
  ON enquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "public_insert_bookings"
  ON counselling_bookings FOR INSERT WITH CHECK (true);

-- Reading / updating is admin-only (done via service_role key → bypasses RLS)
