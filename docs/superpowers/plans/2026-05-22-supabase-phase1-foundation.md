# Supabase Backend — Phase 1: Foundation (Schema + Auth + SDK)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install Supabase SDK, create all database tables + RLS policies via SQL, add auth middleware protecting /admin routes, and wire up the Supabase client utilities — without touching any existing frontend page.

**Architecture:** Supabase replaces the non-existent Express backend. The Next.js app uses `@supabase/ssr` for server components (cookies-based session) and `@supabase/supabase-js` browser client for client components. All 14 tables are created in one SQL migration. RLS policies enforce public-read-published-only, agent-insert-own, and super_admin-full-access. A middleware.ts protects /admin/* routes server-side.

**Tech Stack:** Next.js 16 App Router, @supabase/supabase-js ^2, @supabase/ssr ^0.5, TypeScript strict, existing Tailwind v4, Zod (already installed)

---

## Codebase Context (read before starting)

- Project root: `D:/collegepune/college-pune`
- Dev port: **5000** (not 3000) — `npm run dev` runs on port 5000
- TypeScript strict mode — run `npx tsc --noEmit` after every task
- No middleware.ts exists yet
- No Supabase installed yet
- Static data: `src/data/colleges.ts` (109 colleges), `blogs.ts`, `courses.ts`, `exams.ts`
- Current db.ts: `src/lib/db.ts` — stub functions, leads go to email only
- Lead types defined in `src/types/index.ts` — Lead, Enquiry, CounsellingBooking
- Existing env vars in `.env.local`: ANTHROPIC_API_KEY, SMTP_*, NEXT_PUBLIC_BASE_URL

## File Map

```
NEW FILES:
  src/lib/supabase/client.ts          ← browser Supabase client (singleton)
  src/lib/supabase/server.ts          ← server Supabase client (SSR cookies)
  src/lib/supabase/admin.ts           ← service-role client (server-only, bypasses RLS)
  src/lib/supabase/types.ts           ← generated DB types (hand-written for now)
  src/middleware.ts                   ← protects /admin/* routes
  supabase/migrations/001_schema.sql  ← all 14 tables
  supabase/migrations/002_rls.sql     ← all RLS policies
  supabase/migrations/003_seed.sql    ← insert super admin profile row
  supabase/sample-import.json         ← sample JSON for import feature (Phase 3)
  .env.local (ADD lines)              ← Supabase keys

UNMODIFIED (existing):
  src/lib/db.ts        ← NOT touched in Phase 1
  src/types/index.ts   ← NOT touched in Phase 1
  src/app/layout.tsx   ← NOT touched
  all page.tsx files   ← NOT touched
```

---

## Task 1: Install Supabase packages

**Files:**
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install packages**

```bash
cd "D:/collegepune/college-pune"
npm install @supabase/supabase-js@^2 @supabase/ssr@^0.5
```

- [ ] **Step 2: Verify install**

```bash
cat package.json | grep supabase
```

Expected output contains:
```
"@supabase/ssr": "^0.5
"@supabase/supabase-js": "^2
```

- [ ] **Step 3: TypeScript check (must stay clean)**

```bash
npx tsc --noEmit
```

Expected: no output (zero errors)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install @supabase/supabase-js and @supabase/ssr"
```

---

## Task 2: Add Supabase environment variables

**Files:**
- Modify: `.env.local`

- [ ] **Step 1: Add Supabase keys to .env.local**

Open `.env.local` and append these lines (get values from supabase.com → your project → Settings → API):

```env
# ── Supabase ─────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_SERVICE_ROLE_KEY
ADMIN_EMAIL=raviy@studycups.in
```

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` must NEVER be prefixed with NEXT_PUBLIC_ — it bypasses RLS and must stay server-side only.

- [ ] **Step 2: Add .env.example for teammates**

Create `D:/collegepune/college-pune/.env.example`:

```env
# ── Supabase ─────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
ADMIN_EMAIL=admin@yoursite.com

# ── Anthropic ────────────────────────────────────────────────────
ANTHROPIC_API_KEY=sk-ant-...

# ── Email ────────────────────────────────────────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=support@yoursite.com
SMTP_PASS=your_app_password

# ── App ──────────────────────────────────────────────────────────
NEXT_PUBLIC_BASE_URL=https://collegepune.com
NEXT_PUBLIC_SITE_URL=https://collegepune.com
NEXT_PUBLIC_WHATSAPP_NUMBER=917753831118
```

- [ ] **Step 3: Ensure .env.local is in .gitignore**

```bash
grep ".env.local" D:/collegepune/college-pune/.gitignore || echo ".env.local" >> D:/collegepune/college-pune/.gitignore
```

- [ ] **Step 4: Commit**

```bash
git add .env.example .gitignore
git commit -m "chore: add Supabase env vars template"
```

---

## Task 3: Create Supabase client utilities

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/admin.ts`

- [ ] **Step 1: Create browser client — `src/lib/supabase/client.ts`**

```typescript
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 2: Create server client — `src/lib/supabase/server.ts`**

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './types'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll called from Server Component — safe to ignore
          }
        },
      },
    }
  )
}
```

- [ ] **Step 3: Create service-role admin client — `src/lib/supabase/admin.ts`**

```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Service role client — bypasses RLS. Server-side ONLY. Never expose to browser.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase admin env vars')
  return createClient<Database>(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  })
}
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: errors about `Database` type not found — that's OK, we fix it in Task 4.

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase/
git commit -m "feat: add Supabase browser + server + admin clients"
```

---

## Task 4: Create Database type definitions

**Files:**
- Create: `src/lib/supabase/types.ts`

- [ ] **Step 1: Create type file — `src/lib/supabase/types.ts`**

```typescript
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type UserRole = 'super_admin' | 'agent'
export type ContentStatus = 'draft' | 'pending' | 'published' | 'rejected'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: UserRole
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      colleges: {
        Row: {
          id: string
          college_name: string
          slug: string
          short_description: string | null
          full_description: string | null
          logo_url: string | null
          cover_image_url: string | null
          gallery_images: string[] | null
          city: string | null
          state: string | null
          country: string
          address: string | null
          location_map_url: string | null
          college_type: string | null
          ownership: string | null
          approved_by: string | null
          naac_grade: string | null
          nirf_rank: number | null
          fees_min: number | null
          fees_max: number | null
          average_package: number | null
          highest_package: number | null
          courses_offered: string[] | null
          exams_accepted: string[] | null
          facilities: string[] | null
          scholarships: string | null
          admission_process: string | null
          eligibility: string | null
          brochure_url: string | null
          website: string | null
          phone: string | null
          email: string | null
          hostel: boolean
          rating: number | null
          review_count: number
          meta_title: string | null
          meta_description: string | null
          meta_keywords: string[] | null
          status: ContentStatus
          is_featured: boolean
          created_by: string | null
          approved_by_admin: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['colleges']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['colleges']['Insert']>
      }
      courses: {
        Row: {
          id: string
          course_name: string
          slug: string
          category: string | null
          duration: string | null
          eligibility: string | null
          fees_min: number | null
          fees_max: number | null
          description: string | null
          career_scope: string | null
          top_colleges: string[] | null
          entrance_exams: string[] | null
          avg_salary: number | null
          meta_title: string | null
          meta_description: string | null
          status: ContentStatus
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['courses']['Insert']>
      }
      exams: {
        Row: {
          id: string
          exam_name: string
          slug: string
          full_name: string | null
          conducted_by: string | null
          exam_date: string | null
          application_start_date: string | null
          application_end_date: string | null
          result_date: string | null
          eligibility: string | null
          syllabus: string | null
          pattern: string | null
          description: string | null
          official_website: string | null
          streams: string[] | null
          meta_title: string | null
          meta_description: string | null
          status: ContentStatus
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['exams']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['exams']['Insert']>
      }
      blogs: {
        Row: {
          id: string
          title: string
          slug: string
          featured_image_url: string | null
          category: string | null
          author: string
          content: string
          excerpt: string | null
          read_time: string | null
          tags: string[] | null
          meta_title: string | null
          meta_description: string | null
          status: ContentStatus
          published_at: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['blogs']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['blogs']['Insert']>
      }
      reviews: {
        Row: {
          id: string
          college_id: string | null
          college_slug: string
          student_name: string
          course: string | null
          year: number | null
          rating: number
          title: string | null
          review_body: string
          pros: string[] | null
          cons: string[] | null
          status: ContentStatus
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>
      }
      questions_answers: {
        Row: {
          id: string
          college_id: string | null
          college_slug: string | null
          question: string
          answer: string | null
          asked_by: string | null
          answered_by: string | null
          status: ContentStatus
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['questions_answers']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['questions_answers']['Insert']>
      }
      alumni: {
        Row: {
          id: string
          college_id: string | null
          college_slug: string
          name: string
          batch: string | null
          course: string | null
          current_company: string | null
          current_role: string | null
          review: string | null
          photo_url: string | null
          linkedin_url: string | null
          status: ContentStatus
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['alumni']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['alumni']['Insert']>
      }
      leads: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          city: string | null
          stream: string | null
          budget: string | null
          exam_type: string | null
          exam_score: string | null
          career_goal: string | null
          college_interest: string | null
          course_interest: string | null
          source: string
          page_url: string | null
          message: string | null
          status: string
          notes: string | null
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      hero_sections: {
        Row: {
          id: string
          page: string
          title: string | null
          subtitle: string | null
          button_text: string | null
          button_url: string | null
          background_image_url: string | null
          is_active: boolean
          updated_by: string | null
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['hero_sections']['Row'], 'updated_at'>
        Update: Partial<Database['public']['Tables']['hero_sections']['Insert']>
      }
      posters: {
        Row: {
          id: string
          title: string
          image_url: string
          link_url: string | null
          placement: string
          is_active: boolean
          sort_order: number
          created_by: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['posters']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['posters']['Insert']>
      }
      approval_history: {
        Row: {
          id: string
          content_type: string
          content_id: string
          submitted_by: string | null
          reviewed_by: string | null
          status: ContentStatus
          comment: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['approval_history']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['approval_history']['Insert']>
      }
      import_logs: {
        Row: {
          id: string
          content_type: string
          filename: string
          total_rows: number
          imported: number
          failed: number
          errors: Json | null
          imported_by: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['import_logs']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['import_logs']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      user_role: UserRole
      content_status: ContentStatus
    }
  }
}
```

- [ ] **Step 2: TypeScript check (must now be clean)**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 3: Commit**

```bash
git add src/lib/supabase/types.ts
git commit -m "feat: add Supabase database type definitions"
```

---

## Task 5: Create SQL schema migration

**Files:**
- Create: `supabase/migrations/001_schema.sql`

- [ ] **Step 1: Create the SQL file — `supabase/migrations/001_schema.sql`**

```sql
-- ============================================================
-- CollegePune — Supabase Schema Migration 001
-- Run this in Supabase SQL Editor (supabase.com → your project → SQL Editor)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── ENUMS ────────────────────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('super_admin', 'agent');
CREATE TYPE content_status AS ENUM ('draft', 'pending', 'published', 'rejected');

-- ── PROFILES (linked to auth.users) ──────────────────────────────
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'agent',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'agent')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── SLUG UTILITY FUNCTION ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION slugify(text)
RETURNS TEXT AS $$
  SELECT LOWER(REGEXP_REPLACE(REGEXP_REPLACE(TRIM($1), '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
$$ LANGUAGE SQL IMMUTABLE;

-- ── COLLEGES ──────────────────────────────────────────────────────
CREATE TABLE colleges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  full_description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  gallery_images TEXT[] DEFAULT '{}',
  city TEXT,
  state TEXT,
  country TEXT NOT NULL DEFAULT 'India',
  address TEXT,
  location_map_url TEXT,
  college_type TEXT,
  ownership TEXT,
  approved_by TEXT,
  naac_grade TEXT,
  nirf_rank INTEGER,
  fees_min BIGINT,
  fees_max BIGINT,
  average_package BIGINT,
  highest_package BIGINT,
  courses_offered TEXT[] DEFAULT '{}',
  exams_accepted TEXT[] DEFAULT '{}',
  facilities TEXT[] DEFAULT '{}',
  scholarships TEXT,
  admission_process TEXT,
  eligibility TEXT,
  brochure_url TEXT,
  website TEXT,
  phone TEXT,
  email TEXT,
  hostel BOOLEAN NOT NULL DEFAULT false,
  rating NUMERIC(3,2),
  review_count INTEGER NOT NULL DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[] DEFAULT '{}',
  status content_status NOT NULL DEFAULT 'pending',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  approved_by_admin UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_colleges_slug ON colleges(slug);
CREATE INDEX idx_colleges_status ON colleges(status);
CREATE INDEX idx_colleges_city ON colleges(city);
CREATE INDEX idx_colleges_is_featured ON colleges(is_featured);
CREATE INDEX idx_colleges_created_by ON colleges(created_by);

-- ── COURSES ───────────────────────────────────────────────────────
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT,
  duration TEXT,
  eligibility TEXT,
  fees_min BIGINT,
  fees_max BIGINT,
  description TEXT,
  career_scope TEXT,
  top_colleges TEXT[] DEFAULT '{}',
  entrance_exams TEXT[] DEFAULT '{}',
  avg_salary BIGINT,
  meta_title TEXT,
  meta_description TEXT,
  status content_status NOT NULL DEFAULT 'pending',
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_status ON courses(status);

-- ── EXAMS ─────────────────────────────────────────────────────────
CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  full_name TEXT,
  conducted_by TEXT,
  exam_date TEXT,
  application_start_date TEXT,
  application_end_date TEXT,
  result_date TEXT,
  eligibility TEXT,
  syllabus TEXT,
  pattern TEXT,
  description TEXT,
  official_website TEXT,
  streams TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  status content_status NOT NULL DEFAULT 'pending',
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_exams_slug ON exams(slug);
CREATE INDEX idx_exams_status ON exams(status);

-- ── BLOGS ─────────────────────────────────────────────────────────
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  featured_image_url TEXT,
  category TEXT,
  author TEXT NOT NULL DEFAULT 'CollegePune Editorial',
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  read_time TEXT,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  status content_status NOT NULL DEFAULT 'pending',
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_status ON blogs(status);
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_published_at ON blogs(published_at DESC);

-- ── REVIEWS ───────────────────────────────────────────────────────
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
  college_slug TEXT NOT NULL,
  student_name TEXT NOT NULL,
  course TEXT,
  year INTEGER,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  review_body TEXT NOT NULL,
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}',
  status content_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_college_slug ON reviews(college_slug);
CREATE INDEX idx_reviews_status ON reviews(status);

-- ── Q&A ───────────────────────────────────────────────────────────
CREATE TABLE questions_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
  college_slug TEXT,
  question TEXT NOT NULL,
  answer TEXT,
  asked_by TEXT,
  answered_by TEXT,
  status content_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_qa_college_slug ON questions_answers(college_slug);
CREATE INDEX idx_qa_status ON questions_answers(status);

-- ── ALUMNI ────────────────────────────────────────────────────────
CREATE TABLE alumni (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  college_id UUID REFERENCES colleges(id) ON DELETE SET NULL,
  college_slug TEXT NOT NULL,
  name TEXT NOT NULL,
  batch TEXT,
  course TEXT,
  current_company TEXT,
  current_role TEXT,
  review TEXT,
  photo_url TEXT,
  linkedin_url TEXT,
  status content_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_alumni_college_slug ON alumni(college_slug);
CREATE INDEX idx_alumni_status ON alumni(status);

-- ── LEADS ─────────────────────────────────────────────────────────
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT,
  stream TEXT,
  budget TEXT,
  exam_type TEXT,
  exam_score TEXT,
  career_goal TEXT,
  college_interest TEXT,
  course_interest TEXT,
  source TEXT NOT NULL DEFAULT 'unknown',
  page_url TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_phone ON leads(phone);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- ── HERO SECTIONS ─────────────────────────────────────────────────
CREATE TABLE hero_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  button_text TEXT,
  button_url TEXT,
  background_image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO hero_sections (page, title, subtitle, button_text, button_url)
VALUES ('home', 'Best Colleges in Pune 2026', 'Find the Right University', 'Find College', '/colleges');

-- ── POSTERS / BANNERS ─────────────────────────────────────────────
CREATE TABLE posters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  placement TEXT NOT NULL DEFAULT 'sidebar',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── APPROVAL HISTORY ──────────────────────────────────────────────
CREATE TABLE approval_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  submitted_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status content_status NOT NULL,
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_approval_content ON approval_history(content_type, content_id);

-- ── IMPORT LOGS ───────────────────────────────────────────────────
CREATE TABLE import_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type TEXT NOT NULL,
  filename TEXT NOT NULL,
  total_rows INTEGER NOT NULL DEFAULT 0,
  imported INTEGER NOT NULL DEFAULT 0,
  failed INTEGER NOT NULL DEFAULT 0,
  errors JSONB,
  imported_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── UPDATED_AT TRIGGER ────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_colleges_updated_at BEFORE UPDATE ON colleges FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON exams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

- [ ] **Step 2: Run in Supabase SQL Editor**

Go to `supabase.com` → your project → SQL Editor → paste the entire file → Run.

Expected: "Success. No rows returned."

- [ ] **Step 3: Verify tables exist**

In Supabase → Table Editor, confirm these tables exist:
`profiles`, `colleges`, `courses`, `exams`, `blogs`, `reviews`, `questions_answers`, `alumni`, `leads`, `hero_sections`, `posters`, `approval_history`, `import_logs`

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/001_schema.sql
git commit -m "feat: add Supabase SQL schema — 13 tables + triggers"
```

---

## Task 6: Create RLS policies

**Files:**
- Create: `supabase/migrations/002_rls.sql`

- [ ] **Step 1: Create RLS file — `supabase/migrations/002_rls.sql`**

```sql
-- ============================================================
-- CollegePune — RLS Policies Migration 002
-- Run AFTER 001_schema.sql in Supabase SQL Editor
-- ============================================================

-- Helper function: check if current user is super_admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'super_admin' AND is_active = true
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Helper function: check if current user is any admin (super_admin or agent)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND is_active = true
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ── PROFILES ─────────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_read_own" ON profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "profiles_super_admin_all" ON profiles
  FOR ALL USING (is_super_admin());

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (id = auth.uid())
  WITH CHECK (id = auth.uid() AND role = (SELECT role FROM profiles WHERE id = auth.uid()));

-- ── COLLEGES ─────────────────────────────────────────────────────
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;

-- Public: read only published colleges
CREATE POLICY "colleges_public_read" ON colleges
  FOR SELECT USING (status = 'published');

-- Agent: insert own + read own (all statuses)
CREATE POLICY "colleges_agent_insert" ON colleges
  FOR INSERT WITH CHECK (is_admin() AND created_by = auth.uid());

CREATE POLICY "colleges_agent_read_own" ON colleges
  FOR SELECT USING (is_admin() AND created_by = auth.uid());

-- Super admin: full access
CREATE POLICY "colleges_super_admin_all" ON colleges
  FOR ALL USING (is_super_admin());

-- ── COURSES ──────────────────────────────────────────────────────
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "courses_public_read" ON courses
  FOR SELECT USING (status = 'published');

CREATE POLICY "courses_agent_insert" ON courses
  FOR INSERT WITH CHECK (is_admin() AND created_by = auth.uid());

CREATE POLICY "courses_agent_read_own" ON courses
  FOR SELECT USING (is_admin() AND created_by = auth.uid());

CREATE POLICY "courses_super_admin_all" ON courses
  FOR ALL USING (is_super_admin());

-- ── EXAMS ────────────────────────────────────────────────────────
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "exams_public_read" ON exams
  FOR SELECT USING (status = 'published');

CREATE POLICY "exams_agent_insert" ON exams
  FOR INSERT WITH CHECK (is_admin() AND created_by = auth.uid());

CREATE POLICY "exams_agent_read_own" ON exams
  FOR SELECT USING (is_admin() AND created_by = auth.uid());

CREATE POLICY "exams_super_admin_all" ON exams
  FOR ALL USING (is_super_admin());

-- ── BLOGS ────────────────────────────────────────────────────────
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blogs_public_read" ON blogs
  FOR SELECT USING (status = 'published');

CREATE POLICY "blogs_agent_insert" ON blogs
  FOR INSERT WITH CHECK (is_admin() AND created_by = auth.uid());

CREATE POLICY "blogs_agent_read_own" ON blogs
  FOR SELECT USING (is_admin() AND created_by = auth.uid());

CREATE POLICY "blogs_super_admin_all" ON blogs
  FOR ALL USING (is_super_admin());

-- ── REVIEWS ──────────────────────────────────────────────────────
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public can read only approved reviews
CREATE POLICY "reviews_public_read" ON reviews
  FOR SELECT USING (status = 'published');

-- Anyone (even anon) can submit a review as pending
CREATE POLICY "reviews_public_insert" ON reviews
  FOR INSERT WITH CHECK (status = 'pending');

-- Super admin: full access
CREATE POLICY "reviews_super_admin_all" ON reviews
  FOR ALL USING (is_super_admin());

-- ── Q&A ──────────────────────────────────────────────────────────
ALTER TABLE questions_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "qa_public_read" ON questions_answers
  FOR SELECT USING (status = 'published');

CREATE POLICY "qa_public_insert" ON questions_answers
  FOR INSERT WITH CHECK (status = 'pending');

CREATE POLICY "qa_super_admin_all" ON questions_answers
  FOR ALL USING (is_super_admin());

-- ── ALUMNI ───────────────────────────────────────────────────────
ALTER TABLE alumni ENABLE ROW LEVEL SECURITY;

CREATE POLICY "alumni_public_read" ON alumni
  FOR SELECT USING (status = 'published');

CREATE POLICY "alumni_public_insert" ON alumni
  FOR INSERT WITH CHECK (status = 'pending');

CREATE POLICY "alumni_super_admin_all" ON alumni
  FOR ALL USING (is_super_admin());

-- ── LEADS ────────────────────────────────────────────────────────
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Anonymous users can insert leads (no auth required for lead forms)
CREATE POLICY "leads_public_insert" ON leads
  FOR INSERT WITH CHECK (true);

-- Agents see only leads assigned to them
CREATE POLICY "leads_agent_read_assigned" ON leads
  FOR SELECT USING (is_admin() AND assigned_to = auth.uid());

-- Super admin: full access
CREATE POLICY "leads_super_admin_all" ON leads
  FOR ALL USING (is_super_admin());

-- ── HERO SECTIONS ────────────────────────────────────────────────
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "hero_public_read" ON hero_sections
  FOR SELECT USING (is_active = true);

CREATE POLICY "hero_super_admin_all" ON hero_sections
  FOR ALL USING (is_super_admin());

-- ── POSTERS ──────────────────────────────────────────────────────
ALTER TABLE posters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "posters_public_read" ON posters
  FOR SELECT USING (is_active = true);

CREATE POLICY "posters_super_admin_all" ON posters
  FOR ALL USING (is_super_admin());

-- ── APPROVAL HISTORY ─────────────────────────────────────────────
ALTER TABLE approval_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "approval_admin_read" ON approval_history
  FOR SELECT USING (is_admin());

CREATE POLICY "approval_super_admin_all" ON approval_history
  FOR ALL USING (is_super_admin());

-- ── IMPORT LOGS ──────────────────────────────────────────────────
ALTER TABLE import_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "import_logs_super_admin_all" ON import_logs
  FOR ALL USING (is_super_admin());
```

- [ ] **Step 2: Run in Supabase SQL Editor**

Paste and run in Supabase SQL Editor.

Expected: "Success. No rows returned."

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/002_rls.sql
git commit -m "feat: add RLS policies — public/agent/super_admin access control"
```

---

## Task 7: Seed first super admin

**Files:**
- Create: `supabase/migrations/003_seed.sql`

- [ ] **Step 1: Create Supabase Auth user first**

In Supabase → Authentication → Users → click "Add user":
- Email: `raviy@studycups.in`
- Password: (set a strong password, you'll log in with this)
- Click "Add user"

Copy the UUID of the created user (shown in the Users table).

- [ ] **Step 2: Create seed SQL — `supabase/migrations/003_seed.sql`**

```sql
-- ============================================================
-- CollegePune — Seed Super Admin
-- Replace 'YOUR_USER_UUID' with the actual UUID from Supabase Auth
-- ============================================================

UPDATE profiles
SET role = 'super_admin', full_name = 'Ram Ravi Yadav'
WHERE email = 'raviy@studycups.in';

-- Verify
SELECT id, email, role FROM profiles WHERE email = 'raviy@studycups.in';
```

- [ ] **Step 3: Run in Supabase SQL Editor**

Run the UPDATE statement. Expected result: 1 row returned with `role = 'super_admin'`.

> Note: The `handle_new_user` trigger auto-created a profiles row when you added the auth user. This UPDATE simply promotes it to super_admin.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/003_seed.sql
git commit -m "chore: add seed SQL for super admin setup"
```

---

## Task 8: Create auth middleware

**Files:**
- Create: `src/middleware.ts`

- [ ] **Step 1: Create middleware — `src/middleware.ts`**

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/lib/supabase/types'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — required for SSR auth
  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Protect /admin/* routes
  if (pathname.startsWith('/admin')) {
    // Allow /admin/login always
    if (pathname === '/admin/login') {
      // If already logged in, redirect to dashboard
      if (user) {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return supabaseResponse
    }

    // Not logged in → redirect to login
    if (!user) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Check role — must be super_admin or agent
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_active')
      .eq('id', user.id)
      .single()

    if (!profile || !profile.is_active) {
      return NextResponse.redirect(new URL('/admin/login?error=inactive', request.url))
    }

    // Attach role to request headers for use in Server Components
    supabaseResponse.headers.set('x-user-role', profile.role)
    supabaseResponse.headers.set('x-user-id', user.id)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin/:path*',
    // Refresh session for all routes (required by @supabase/ssr)
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 3: Test — visit /admin without login**

Start dev server: `npm run dev`
Visit: `http://localhost:5000/admin`

Expected: redirect to `http://localhost:5000/admin/login`

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add middleware — protect /admin/* routes with Supabase auth"
```

---

## Task 9: Create admin login page

**Files:**
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/admin/login/actions.ts`

- [ ] **Step 1: Create server action — `src/app/admin/login/actions.ts`**

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    redirect('/admin/login?error=' + encodeURIComponent(error.message))
  }

  // Verify role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login?error=auth_failed')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_active')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.is_active) {
    await supabase.auth.signOut()
    redirect('/admin/login?error=Account+is+inactive')
  }

  redirect('/admin')
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
```

- [ ] **Step 2: Create login page — `src/app/admin/login/page.tsx`**

```typescript
import { loginAction } from './actions'

interface Props {
  searchParams: Promise<{ error?: string }>
}

export const metadata = { title: 'Admin Login — CollegePune' }

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-4">
            <span className="text-white font-extrabold text-2xl">CP</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">CollegePune Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to manage your portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6">
              {decodeURIComponent(error)}
            </div>
          )}

          <form action={loginAction} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="admin@collegepune.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          CollegePune Admin Panel — Authorized Access Only
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 4: Test login flow**

1. Visit `http://localhost:5000/admin/login`
2. Enter wrong password → should redirect back with error message
3. Enter correct credentials → should redirect to `/admin` (which redirects to `/admin/login` again since we haven't created `/admin/page.tsx` yet — that's Phase 3)

- [ ] **Step 5: Commit**

```bash
git add src/app/admin/
git commit -m "feat: add admin login page with Supabase server action auth"
```

---

## Task 10: Create Supabase Storage buckets

> This task is done in the Supabase dashboard, not in code.

- [ ] **Step 1: Create buckets in Supabase Storage**

Go to supabase.com → your project → Storage → New bucket:

| Bucket name | Public? | Purpose |
|---|---|---|
| `college-images` | ✅ Public | College logos, cover images, gallery |
| `blog-images` | ✅ Public | Blog featured images |
| `posters` | ✅ Public | Homepage banners/posters |
| `brochures` | ❌ Private | College brochure PDFs |

- [ ] **Step 2: Set storage RLS for each public bucket**

For each public bucket, go to Storage → Policies → Add policy:

```sql
-- Allow anyone to read from public buckets
CREATE POLICY "public_read_college_images" ON storage.objects
  FOR SELECT USING (bucket_id = 'college-images');

-- Allow authenticated admins to upload
CREATE POLICY "admin_upload_college_images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'college-images' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "admin_delete_college_images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'college-images' AND
    auth.role() = 'authenticated'
  );
```

Repeat for `blog-images` and `posters` buckets (change bucket_id value).

- [ ] **Step 3: Create storage helper — `src/lib/supabase/storage.ts`**

```typescript
import { createAdminClient } from './admin'

export type StorageBucket = 'college-images' | 'blog-images' | 'posters' | 'brochures'

export async function uploadFile(
  bucket: StorageBucket,
  path: string,
  file: File | Blob,
  contentType?: string
): Promise<string> {
  const supabase = createAdminClient()
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { contentType, upsert: true })
  if (error) throw new Error(`Upload failed: ${error.message}`)
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteFile(bucket: StorageBucket, path: string): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) throw new Error(`Delete failed: ${error.message}`)
}

export function getPublicUrl(bucket: StorageBucket, path: string): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${url}/storage/v1/object/public/${bucket}/${path}`
}
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase/storage.ts
git commit -m "feat: add Supabase Storage buckets + upload helper"
```

---

## Task 11: Final Phase 1 verification

- [ ] **Step 1: Full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 2: Build check**

```bash
npm run build
```

Expected: build completes, 0 errors. All existing pages still work.

- [ ] **Step 3: Verify all new files exist**

```bash
find src/lib/supabase src/middleware.ts src/app/admin supabase -type f | sort
```

Expected files:
```
src/lib/supabase/admin.ts
src/lib/supabase/client.ts
src/lib/supabase/server.ts
src/lib/supabase/storage.ts
src/lib/supabase/types.ts
src/middleware.ts
src/app/admin/login/page.tsx
src/app/admin/login/actions.ts
supabase/migrations/001_schema.sql
supabase/migrations/002_rls.sql
supabase/migrations/003_seed.sql
```

- [ ] **Step 4: Test the login redirect**

```
1. npm run dev
2. Visit http://localhost:5000/admin → redirects to /admin/login ✅
3. Visit http://localhost:5000/admin/login → shows login form ✅
4. Login with super admin credentials → redirects to /admin ✅
   (404 is expected for /admin page — admin dashboard is Phase 3)
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: Supabase Phase 1 complete — schema, RLS, auth, middleware, storage"
```

---

## What Phase 2 Builds (Data Layer)

Phase 2 plan: `docs/superpowers/plans/2026-05-22-supabase-phase2-data-layer.md`

Tasks in Phase 2:
- Migrate 109 colleges from static `src/data/colleges.ts` → Supabase
- Migrate blogs, courses, exams static data → Supabase
- Update `src/lib/db.ts` → replace stubs with real Supabase queries
- Update `/api/leads` → save to Supabase leads table (keep email as notification)
- Update `/api/reviews` → save to Supabase reviews as pending
- Update `/api/blogs`, `/api/colleges` → fetch from Supabase with static fallback
- Connect `getAllBlogs`, `getAllColleges` to Supabase

## What Phase 3 Builds (Admin Panel)

Phase 3 plan: `docs/superpowers/plans/2026-05-22-supabase-phase3-admin-panel.md`

Tasks in Phase 3:
- Admin layout (sidebar, topbar, responsive)
- Dashboard (stats cards, recent leads, pending approvals)
- Colleges CRUD (list + create/edit form + image upload)
- Blogs CRUD (rich text editor)
- Leads management (table + search + CSV export)
- Approvals queue (reviews, Q&A, alumni)
- Agents management (super admin only)
- Hero section editor
- Posters/banners management
- JSON import feature
