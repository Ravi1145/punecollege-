# Supabase Backend — Phase 2: Data Layer (API Routes + Data Migration)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all stub functions in `src/lib/db.ts` with real Supabase queries, connect every existing API route to Supabase, and migrate all static data (109 colleges, blogs, courses, exams) into the database — without breaking any existing frontend page.

**Architecture:** `src/lib/db.ts` is the single data layer. It's updated to call Supabase first and fall back to static files on error. All existing API routes (`/api/leads`, `/api/reviews`, `/api/blogs`, `/api/colleges`) are updated to use the new db.ts functions. A one-time migration script populates the DB from static TypeScript files.

**Tech Stack:** Next.js 16 App Router, @supabase/supabase-js (already installed in Phase 1), existing Zod schemas, existing static data files as fallback

**Prerequisite:** Phase 1 must be complete (Supabase SDK installed, schema created, RLS applied, .env.local has keys).

---

## File Map

```
MODIFY:
  src/lib/db.ts                          ← replace stubs with Supabase queries
  src/app/api/leads/route.ts             ← save to Supabase + keep email
  src/app/api/leads/[id]/route.ts        ← update/delete via Supabase
  src/app/api/leads/export/route.ts      ← CSV export from Supabase
  src/app/api/reviews/route.ts           ← save reviews as pending in Supabase
  src/app/api/blogs/route.ts             ← fetch from Supabase with fallback
  src/app/api/colleges/route.ts          ← fetch from Supabase with fallback

CREATE:
  src/lib/supabase/queries.ts            ← reusable typed query helpers
  scripts/migrate-to-supabase.ts         ← one-time migration script
  supabase/sample-import.json            ← sample JSON for import feature

UNMODIFIED:
  src/data/*.ts                          ← kept as fallback, not deleted
  src/types/index.ts                     ← not touched
  All page.tsx files                     ← not touched
```

---

## Task 1: Create reusable Supabase query helpers

**Files:**
- Create: `src/lib/supabase/queries.ts`

- [ ] **Step 1: Create — `src/lib/supabase/queries.ts`**

```typescript
import { createClient } from './server'
import type { Database } from './types'

type College = Database['public']['Tables']['colleges']['Row']
type Blog = Database['public']['Tables']['blogs']['Row']
type Lead = Database['public']['Tables']['leads']['Row']
type Review = Database['public']['Tables']['reviews']['Row']

// ── COLLEGES ─────────────────────────────────────────────────────

export async function getPublishedColleges(filters?: {
  stream?: string
  search?: string
  city?: string
  limit?: number
  offset?: number
}): Promise<College[]> {
  const supabase = await createClient()
  let query = supabase
    .from('colleges')
    .select('*')
    .eq('status', 'published')
    .order('is_featured', { ascending: false })
    .order('rating', { ascending: false })

  if (filters?.search) {
    query = query.ilike('college_name', `%${filters.search}%`)
  }
  if (filters?.city) {
    query = query.ilike('city', `%${filters.city}%`)
  }
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }
  if (filters?.offset) {
    query = query.range(filters.offset, (filters.offset + (filters.limit ?? 20)) - 1)
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getCollegeBySlug(slug: string): Promise<College | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (error) return null
  return data
}

export async function getFeaturedColleges(limit = 6): Promise<College[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('colleges')
    .select('id, college_name, slug, logo_url, cover_image_url, city, state, naac_grade, nirf_rank, average_package, rating, college_type')
    .eq('status', 'published')
    .eq('is_featured', true)
    .limit(limit)
  return data ?? []
}

// ── BLOGS ─────────────────────────────────────────────────────────

export async function getPublishedBlogs(filters?: {
  category?: string
  search?: string
  page?: number
  limit?: number
}): Promise<{ blogs: Blog[]; total: number }> {
  const supabase = await createClient()
  const page = filters?.page ?? 1
  const limit = filters?.limit ?? 10
  const offset = (page - 1) * limit

  let query = supabase
    .from('blogs')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.search) query = query.ilike('title', `%${filters.search}%`)

  const { data, count, error } = await query
  if (error) throw error
  return { blogs: data ?? [], total: count ?? 0 }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data
}

// ── REVIEWS ──────────────────────────────────────────────────────

export async function getPublishedReviews(collegeSlug: string): Promise<Review[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('reviews')
    .select('*')
    .eq('college_slug', collegeSlug)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function insertReview(review: {
  college_slug: string
  student_name: string
  course?: string
  year?: number
  rating: number
  title?: string
  review_body: string
  pros?: string[]
  cons?: string[]
}): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('reviews')
    .insert({ ...review, status: 'pending' })
  if (error) throw error
}

// ── LEADS ─────────────────────────────────────────────────────────

export async function insertLeadToDb(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<string> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('leads')
    .insert({ ...lead, status: 'new' })
    .select('id')
    .single()
  if (error) throw error
  return data.id
}

export async function getLeadsFromDb(filters?: {
  status?: string
  source?: string
  search?: string
  page?: number
  limit?: number
}): Promise<{ leads: Lead[]; total: number }> {
  const supabase = await createClient()
  const page = filters?.page ?? 1
  const limit = filters?.limit ?? 50
  const offset = (page - 1) * limit

  let query = supabase
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.source) query = query.eq('source', filters.source)
  if (filters?.search) {
    query = query.or(`name.ilike.%${filters.search}%,phone.ilike.%${filters.search}%,email.ilike.%${filters.search}%`)
  }

  const { data, count, error } = await query
  if (error) throw error
  return { leads: data ?? [], total: count ?? 0 }
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 3: Commit**

```bash
git add src/lib/supabase/queries.ts
git commit -m "feat: add reusable Supabase query helpers"
```

---

## Task 2: Update db.ts — replace stubs with Supabase

**Files:**
- Modify: `src/lib/db.ts`

The goal: keep the same exported function signatures (so nothing else breaks), but now they call Supabase.

- [ ] **Step 1: Update `insertLead` to save to Supabase**

In `src/lib/db.ts`, replace the `insertLead` function:

```typescript
export async function insertLead(
  data: Omit<Lead, 'id' | 'created_at' | 'updated_at'>
): Promise<number> {
  // Always try to send email notification
  try {
    await sendLeadEmail({ ...data })
  } catch (err) {
    console.error('[insertLead] email failed:', err)
  }

  // Save to Supabase
  try {
    const { insertLeadToDb } = await import('./supabase/queries')
    const id = await insertLeadToDb({
      name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      city: data.city ?? null,
      stream: data.stream ?? null,
      budget: data.budget ?? null,
      exam_type: data.exam_type ?? null,
      exam_score: data.exam_score ?? null,
      career_goal: data.career_goal ?? null,
      college_interest: data.college_interest ?? null,
      course_interest: data.course_interest ?? null,
      source: data.source ?? 'unknown',
      page_url: (data as Record<string, unknown>).page_url as string ?? null,
      message: null,
      status: 'new',
      notes: null,
      assigned_to: null,
    })
    // Return a numeric representation of UUID for backwards compatibility
    return parseInt(id.replace(/-/g, '').slice(0, 8), 16)
  } catch (err) {
    console.error('[insertLead] Supabase save failed:', err)
    return Date.now() // fallback ID
  }
}
```

- [ ] **Step 2: Update `getAllLeads` to fetch from Supabase**

Replace the `getAllLeads` function:

```typescript
export async function getAllLeads(filters?: {
  status?: string; source?: string; stream?: string
  search?: string; page?: number; limit?: number
}): Promise<{ leads: Lead[]; total: number; page: number; totalPages: number }> {
  try {
    const { getLeadsFromDb } = await import('./supabase/queries')
    const page = filters?.page ?? 1
    const limit = filters?.limit ?? 50
    const { leads: dbLeads, total } = await getLeadsFromDb({
      status: filters?.status,
      source: filters?.source,
      search: filters?.search,
      page,
      limit,
    })

    // Map Supabase lead shape to existing Lead type
    const leads: Lead[] = dbLeads.map(l => ({
      id: parseInt(l.id.replace(/-/g, '').slice(0, 8), 16),
      name: l.name,
      phone: l.phone,
      email: l.email ?? undefined,
      city: l.city ?? undefined,
      stream: l.stream as Lead['stream'],
      budget: l.budget ?? undefined,
      exam_type: l.exam_type ?? undefined,
      exam_score: l.exam_score ?? undefined,
      career_goal: l.career_goal ?? undefined,
      college_interest: l.college_interest ?? undefined,
      course_interest: l.course_interest ?? undefined,
      source: l.source as Lead['source'],
      status: l.status as Lead['status'],
      notes: l.notes ?? undefined,
      created_at: l.created_at,
      updated_at: l.updated_at,
    }))

    return { leads, total, page, totalPages: Math.ceil(total / limit) }
  } catch (err) {
    console.error('[getAllLeads] Supabase error:', err)
    return { leads: [], total: 0, page: 1, totalPages: 0 }
  }
}
```

- [ ] **Step 3: Update `getAllBlogs` to fetch from Supabase with static fallback**

Replace the stub `getAllBlogs` function (or add it if not present):

```typescript
export async function getAllBlogs(filters?: {
  status?: string
  category?: string
  search?: string
  page?: number
  limit?: number
}): Promise<{ blogs: BlogPost[]; total: number; page: number; totalPages: number }> {
  try {
    const { getPublishedBlogs } = await import('./supabase/queries')
    const page = filters?.page ?? 1
    const limit = filters?.limit ?? 10
    const { blogs: dbBlogs, total } = await getPublishedBlogs({
      category: filters?.category,
      search: filters?.search,
      page,
      limit,
    })

    const blogs: BlogPost[] = dbBlogs.map(b => ({
      id: parseInt(b.id.replace(/-/g, '').slice(0, 8), 16),
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt ?? '',
      body: b.content,
      author: b.author,
      date: b.published_at ?? b.created_at,
      publishedAt: b.published_at ?? b.created_at,
      readTime: b.read_time ?? '5 min',
      category: b.category ?? 'General',
      tags: b.tags ?? [],
      image: b.featured_image_url ?? undefined,
    }))

    return { blogs, total, page, totalPages: Math.ceil(total / limit) }
  } catch {
    // Fallback to static data
    const filtered = staticBlogs.filter(b =>
      !filters?.category || b.category === filters.category
    )
    const page = filters?.page ?? 1
    const limit = filters?.limit ?? 10
    const total = filtered.length
    const start = (page - 1) * limit
    return {
      blogs: filtered.slice(start, start + limit),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }
}
```

- [ ] **Step 4: Add `getBlogBySlug` to db.ts**

```typescript
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { getBlogBySlug: getFromDb } = await import('./supabase/queries')
    const b = await getFromDb(slug)
    if (!b) throw new Error('not found')
    return {
      id: parseInt(b.id.replace(/-/g, '').slice(0, 8), 16),
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt ?? '',
      body: b.content,
      author: b.author,
      date: b.published_at ?? b.created_at,
      publishedAt: b.published_at ?? b.created_at,
      readTime: b.read_time ?? '5 min',
      category: b.category ?? 'General',
      tags: b.tags ?? [],
      image: b.featured_image_url ?? undefined,
    }
  } catch {
    return staticBlogs.find(b => b.slug === slug) ?? null
  }
}
```

- [ ] **Step 5: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 6: Commit**

```bash
git add src/lib/db.ts
git commit -m "feat: connect db.ts to Supabase — leads, blogs with static fallback"
```

---

## Task 3: Update reviews API route

**Files:**
- Modify: `src/app/api/reviews/route.ts`

- [ ] **Step 1: Replace reviews route — `src/app/api/reviews/route.ts`**

```typescript
import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export const runtime = "nodejs"

// GET — fetch published reviews for a college
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("college_slug")
  if (!slug) return NextResponse.json({ error: "college_slug required" }, { status: 400 })

  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("college_slug", slug)
      .eq("status", "published")
      .order("created_at", { ascending: false })

    if (error) throw error

    const avg = data && data.length > 0
      ? data.reduce((sum, r) => sum + r.rating, 0) / data.length
      : 0

    return NextResponse.json(
      { reviews: data ?? [], total: data?.length ?? 0, avg: Math.round(avg * 10) / 10 },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } }
    )
  } catch (err) {
    console.error("Reviews GET error:", err)
    return NextResponse.json({ reviews: [], total: 0, avg: 0 })
  }
}

// POST — submit a new review (saves as pending, needs admin approval)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { college_slug, student_name, rating, review_body, course, year, title, pros, cons } = body

    if (!college_slug || !student_name || !rating || !review_body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1–5" }, { status: 400 })
    }
    if (student_name.length < 2 || review_body.length < 30) {
      return NextResponse.json({ error: "Name too short or review too brief (min 30 chars)" }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { error } = await supabase.from("reviews").insert({
      college_slug,
      student_name: student_name.trim(),
      rating: Number(rating),
      review_body: review_body.trim(),
      course: course?.trim() ?? null,
      year: year ? Number(year) : null,
      title: title?.trim() ?? null,
      pros: Array.isArray(pros) ? pros : [],
      cons: Array.isArray(cons) ? cons : [],
      status: "pending",
    })

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: "Review submitted! It will appear after moderation (1–2 business days).",
    })
  } catch (err) {
    console.error("Review POST error:", err)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
```

- [ ] **Step 2: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 3: Commit**

```bash
git add src/app/api/reviews/route.ts
git commit -m "feat: connect reviews API to Supabase — pending moderation flow"
```

---

## Task 4: Update leads export route

**Files:**
- Modify: `src/app/api/leads/export/route.ts`

- [ ] **Step 1: Replace export route**

```typescript
import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export const runtime = "nodejs"

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get("x-admin-key")
  if (adminKey !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5000)

  if (error || !data) {
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }

  const headers = ["id", "name", "phone", "email", "city", "stream", "budget", "source", "college_interest", "course_interest", "career_goal", "status", "created_at"]
  const csv = [
    headers.join(","),
    ...data.map(row =>
      headers.map(h => {
        const val = (row as Record<string, unknown>)[h]
        if (val == null) return ""
        const str = String(val)
        return str.includes(",") || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str
      }).join(",")
    ),
  ].join("\n")

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().split("T")[0]}.csv"`,
    },
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/leads/export/route.ts
git commit -m "feat: leads CSV export from Supabase"
```

---

## Task 5: Create the data migration script

**Files:**
- Create: `scripts/migrate-to-supabase.ts`

This is a **one-time script** — run it once to copy your 109 static colleges + blogs + courses + exams into Supabase.

- [ ] **Step 1: Create migration script — `scripts/migrate-to-supabase.ts`**

```typescript
/**
 * One-time migration: static data files → Supabase
 * Run: npx ts-node --project tsconfig.scripts.json scripts/migrate-to-supabase.ts
 *
 * Or paste into a Next.js API route and call it once from /api/admin/run-migration
 */

import { createClient } from '@supabase/supabase-js'
import type { Database } from '../src/lib/supabase/types'

// Load env manually since this runs outside Next.js
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient<Database>(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ── Migrate colleges ──────────────────────────────────────────────
async function migrateColleges() {
  const { colleges } = await import('../src/data/colleges')
  console.log(`Migrating ${colleges.length} colleges...`)

  let success = 0, failed = 0
  for (const college of colleges) {
    try {
      const { error } = await supabase.from('colleges').upsert({
        college_name: college.name,
        slug: college.slug,
        short_description: college.description?.slice(0, 300) ?? null,
        full_description: college.description ?? null,
        city: college.location?.split(',')[0]?.trim() ?? null,
        state: 'Maharashtra',
        country: 'India',
        address: college.address ?? null,
        college_type: college.type ?? null,
        naac_grade: college.naac ?? null,
        nirf_rank: college.nirfRank ?? null,
        fees_min: college.feesRange?.min ?? null,
        fees_max: college.feesRange?.max ?? null,
        average_package: college.avgPlacement ?? null,
        highest_package: college.highestPlacement ?? null,
        courses_offered: college.courses ?? [],
        exams_accepted: college.entranceExams ?? [],
        facilities: [],
        hostel: college.hostel ?? false,
        rating: college.rating ?? null,
        review_count: college.reviewCount ?? 0,
        website: college.website ?? null,
        phone: college.phone ?? null,
        email: college.email ?? null,
        meta_title: `${college.name} — Admission, Fees, Courses, Placements 2026`,
        meta_description: college.description?.slice(0, 160) ?? null,
        status: 'published',
        is_featured: (college.rating ?? 0) >= 4.2,
      }, { onConflict: 'slug' })

      if (error) { console.error(`  ✗ ${college.name}: ${error.message}`); failed++ }
      else { console.log(`  ✓ ${college.name}`); success++ }
    } catch (e) {
      console.error(`  ✗ ${college.name}: unexpected error`, e)
      failed++
    }
  }
  console.log(`Colleges: ${success} migrated, ${failed} failed\n`)
}

// ── Migrate blogs ─────────────────────────────────────────────────
async function migrateBlogs() {
  const { blogs } = await import('../src/data/blogs')
  console.log(`Migrating ${blogs.length} blogs...`)

  let success = 0, failed = 0
  for (const blog of blogs) {
    try {
      const { error } = await supabase.from('blogs').upsert({
        title: blog.title,
        slug: blog.slug,
        content: blog.body,
        excerpt: blog.excerpt ?? null,
        author: blog.author,
        category: blog.category ?? null,
        tags: blog.tags ?? [],
        read_time: blog.readTime ?? null,
        featured_image_url: blog.image ?? null,
        meta_title: blog.title,
        meta_description: blog.excerpt?.slice(0, 160) ?? null,
        status: 'published',
        published_at: blog.date ? new Date(blog.date).toISOString() : new Date().toISOString(),
      }, { onConflict: 'slug' })

      if (error) { console.error(`  ✗ ${blog.title}: ${error.message}`); failed++ }
      else { console.log(`  ✓ ${blog.title}`); success++ }
    } catch (e) {
      console.error(`  ✗ ${blog.title}`, e)
      failed++
    }
  }
  console.log(`Blogs: ${success} migrated, ${failed} failed\n`)
}

// ── Migrate courses ───────────────────────────────────────────────
async function migrateCourses() {
  const { courses } = await import('../src/data/courses')
  console.log(`Migrating ${courses.length} courses...`)

  let success = 0, failed = 0
  for (const course of courses) {
    try {
      const { error } = await supabase.from('courses').upsert({
        course_name: course.name,
        slug: course.slug,
        category: course.stream ?? null,
        duration: course.duration ?? null,
        eligibility: course.eligibility ?? null,
        fees_min: course.avgFees?.min ?? null,
        fees_max: course.avgFees?.max ?? null,
        description: course.description ?? null,
        career_scope: course.careerOptions?.join(', ') ?? null,
        top_colleges: course.topColleges ?? [],
        entrance_exams: course.entranceExams ?? [],
        avg_salary: course.avgSalary ?? null,
        status: 'published',
      }, { onConflict: 'slug' })

      if (error) { console.error(`  ✗ ${course.name}: ${error.message}`); failed++ }
      else { console.log(`  ✓ ${course.name}`); success++ }
    } catch (e) {
      console.error(`  ✗ ${course.name}`, e)
      failed++
    }
  }
  console.log(`Courses: ${success} migrated, ${failed} failed\n`)
}

// ── Migrate exams ─────────────────────────────────────────────────
async function migrateExams() {
  const { exams } = await import('../src/data/exams')
  console.log(`Migrating ${exams.length} exams...`)

  let success = 0, failed = 0
  for (const exam of exams) {
    try {
      const slug = exam.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
      const { error } = await supabase.from('exams').upsert({
        exam_name: exam.name,
        slug,
        full_name: exam.fullName ?? null,
        conducted_by: exam.conductedBy ?? null,
        exam_date: exam.examDate ?? null,
        application_start_date: exam.applicationDate ?? null,
        result_date: exam.resultDate ?? null,
        eligibility: exam.eligibility ?? null,
        description: exam.description ?? null,
        official_website: exam.website ?? null,
        streams: exam.streams ?? [],
        status: 'published',
      }, { onConflict: 'slug' })

      if (error) { console.error(`  ✗ ${exam.name}: ${error.message}`); failed++ }
      else { console.log(`  ✓ ${exam.name}`); success++ }
    } catch (e) {
      console.error(`  ✗ ${exam.name}`, e)
      failed++
    }
  }
  console.log(`Exams: ${success} migrated, ${failed} failed\n`)
}

// ── MAIN ──────────────────────────────────────────────────────────
async function main() {
  console.log('=== CollegePune → Supabase Migration ===\n')
  if (!SUPABASE_URL || !SERVICE_KEY) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env')
  }

  await migrateColleges()
  await migrateBlogs()
  await migrateCourses()
  await migrateExams()

  console.log('=== Migration Complete ===')
}

main().catch(console.error)
```

- [ ] **Step 2: Create a one-time API route trigger (easier than ts-node setup)**

Create `src/app/api/admin/migrate/route.ts` — protected, run-once endpoint:

```typescript
import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { colleges } from "@/data/colleges"
import { blogs } from "@/data/blogs"

export const runtime = "nodejs"

// ONE-TIME MIGRATION ENDPOINT — delete this file after running once
// Call: GET /api/admin/migrate?key=YOUR_ADMIN_PASSWORD

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key")
  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createAdminClient()
  const results = { colleges: { success: 0, failed: 0 }, blogs: { success: 0, failed: 0 } }

  // Migrate colleges
  for (const college of colleges) {
    const { error } = await supabase.from("colleges").upsert({
      college_name: college.name,
      slug: college.slug,
      short_description: college.description?.slice(0, 300) ?? null,
      full_description: college.description ?? null,
      city: college.location?.split(",")[0]?.trim() ?? "Pune",
      state: "Maharashtra",
      country: "India",
      address: college.address ?? null,
      college_type: college.type ?? null,
      naac_grade: college.naac ?? null,
      nirf_rank: college.nirfRank ?? null,
      fees_min: college.feesRange?.min ?? null,
      fees_max: college.feesRange?.max ?? null,
      average_package: college.avgPlacement ?? null,
      highest_package: college.highestPlacement ?? null,
      courses_offered: college.courses ?? [],
      exams_accepted: college.entranceExams ?? [],
      hostel: college.hostel ?? false,
      rating: college.rating ?? null,
      review_count: college.reviewCount ?? 0,
      website: college.website ?? null,
      phone: college.phone ?? null,
      email: college.email ?? null,
      meta_title: `${college.name} — Fees, Courses, Placements 2026`,
      meta_description: college.description?.slice(0, 155) ?? null,
      status: "published",
      is_featured: (college.rating ?? 0) >= 4.2,
    }, { onConflict: "slug" })
    if (error) results.colleges.failed++
    else results.colleges.success++
  }

  // Migrate blogs
  for (const blog of blogs) {
    const { error } = await supabase.from("blogs").upsert({
      title: blog.title,
      slug: blog.slug,
      content: blog.body,
      excerpt: blog.excerpt ?? null,
      author: blog.author,
      category: blog.category ?? null,
      tags: blog.tags ?? [],
      read_time: blog.readTime ?? null,
      meta_title: blog.title,
      meta_description: blog.excerpt?.slice(0, 160) ?? null,
      status: "published",
      published_at: blog.date ? new Date(blog.date).toISOString() : new Date().toISOString(),
    }, { onConflict: "slug" })
    if (error) results.blogs.failed++
    else results.blogs.success++
  }

  return NextResponse.json({ success: true, results })
}
```

- [ ] **Step 3: Run the migration**

With `npm run dev` running, visit:
```
http://localhost:5000/api/admin/migrate?key=YOUR_ADMIN_PASSWORD_FROM_ENV
```

Expected response:
```json
{
  "success": true,
  "results": {
    "colleges": { "success": 109, "failed": 0 },
    "blogs": { "success": 12, "failed": 0 }
  }
}
```

- [ ] **Step 4: Verify in Supabase Table Editor**

Supabase → Table Editor → colleges → should show 109 rows with `status = 'published'`

- [ ] **Step 5: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 6: Commit**

```bash
git add scripts/ src/app/api/admin/migrate/
git commit -m "feat: data migration script — 109 colleges + blogs to Supabase"
```

---

## Task 6: Create sample JSON import file

**Files:**
- Create: `supabase/sample-import.json`

- [ ] **Step 1: Create — `supabase/sample-import.json`**

```json
[
  {
    "college_name": "Doon Business School",
    "city": "Dehradun",
    "state": "Uttarakhand",
    "country": "India",
    "short_description": "Top MBA college in Dehradun with AICTE approval",
    "full_description": "Doon Business School (DBS) is one of the premier management institutions in the Himalayan foothills of Dehradun. Established in 2009, DBS offers MBA, BBA, and PGDM programs with strong industry connections.",
    "college_type": "Private",
    "ownership": "Private",
    "approved_by": "AICTE",
    "naac_grade": "B++",
    "fees_min": 500000,
    "fees_max": 900000,
    "average_package": 600000,
    "highest_package": 2400000,
    "courses_offered": ["MBA", "BBA", "PGDM"],
    "exams_accepted": ["CAT", "MAT", "CMAT"],
    "facilities": ["Hostel", "Library", "WiFi", "Placement Cell", "Sports Ground"],
    "hostel": true,
    "admission_process": "Apply online, attend GD/PI round, final merit list based on entrance score + interview",
    "eligibility": "Graduation with minimum 50% marks from recognized university",
    "website": "https://www.doonbusiness.com",
    "meta_title": "Doon Business School Dehradun — MBA Admission 2026",
    "meta_description": "Check fees, admission process, placement records, and courses at Doon Business School Dehradun.",
    "is_featured": false,
    "status": "pending"
  },
  {
    "college_name": "Graphic Era University",
    "city": "Dehradun",
    "state": "Uttarakhand",
    "country": "India",
    "short_description": "NAAC A+ university offering engineering, management, and science programs",
    "full_description": "Graphic Era University is a leading private university in Uttarakhand with NAAC A+ accreditation. It offers 200+ programs across engineering, management, science, and humanities.",
    "college_type": "Private",
    "ownership": "Private",
    "approved_by": "UGC",
    "naac_grade": "A+",
    "fees_min": 120000,
    "fees_max": 350000,
    "average_package": 550000,
    "highest_package": 1800000,
    "courses_offered": ["B.Tech", "MBA", "MCA", "BSc", "BCA"],
    "exams_accepted": ["JEE Main", "MHT-CET", "CAT", "CUET"],
    "facilities": ["Hostel", "Library", "Labs", "Sports Complex", "Cafeteria"],
    "hostel": true,
    "meta_title": "Graphic Era University Dehradun — Admission 2026",
    "meta_description": "Explore programs, fees, placements, and admission process at Graphic Era University.",
    "is_featured": false,
    "status": "pending"
  }
]
```

- [ ] **Step 2: Commit**

```bash
git add supabase/sample-import.json
git commit -m "chore: add sample JSON import template"
```

---

## Task 7: Final Phase 2 verification

- [ ] **Step 1: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: no output

- [ ] **Step 2: Build check**

```bash
npm run build
```

Expected: build completes, 0 errors, all existing pages still render.

- [ ] **Step 3: Smoke test — verify live data**

```bash
# 1. Leads API still works
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"9876543210","source":"enquiry_form"}'
# Expected: {"success":true,"leadId":...}

# 2. Check Supabase — go to Table Editor → leads → 1 row should appear

# 3. Reviews API works
curl "http://localhost:5000/api/reviews?college_slug=coep-college-of-engineering-pune"
# Expected: {"reviews":[],"total":0,"avg":0} (none in DB yet)

# 4. Blogs API works (fetches from Supabase after migration)
curl "http://localhost:5000/api/blogs?limit=3"
# Expected: {"blogs":[...],"total":12,...}
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: Supabase Phase 2 complete — data layer connected, migration done"
```
