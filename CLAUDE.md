# CollegePune — Claude Project Instructions

## Project Overview

**CollegePune** is an AI-powered Pune college discovery portal.

- **Stack:** Next.js 16 (App Router), Tailwind CSS v4, Supabase (PostgreSQL), Claude AI
- **Location:** `D:\collegepune\college-pune`
- **Live URL:** https://collegepune.com
- **Database:** Supabase with tables: `colleges`, `blogs`, `leads`, `enquiries`

## Superpowers Skills Active

This project uses [Superpowers](https://github.com/obra/superpowers) skills. Skills are in `.claude/skills/`.

**IMPORTANT: Before any implementation task, invoke the relevant skill:**
- New features / bug fixes → `superpowers:test-driven-development`
- After completing work → `superpowers:requesting-code-review`
- When debugging → `superpowers:systematic-debugging`
- Planning large features → `superpowers:writing-plans` → `superpowers:executing-plans`
- Using git isolation → `superpowers:using-git-worktrees`

## Architecture Quick Reference

### Data Flow
- **Public pages** try Supabase DB first → fall back to `src/data/*.ts` static files
- **Admin API routes** at `/api/admin/*` — require `x-admin-key` header
- **ISR revalidation:** 300 seconds on all public pages

### Key Directories
```
src/
  app/
    (public pages)
    admin/          ← admin panel (client components)
    api/
      admin/        ← protected CRUD endpoints
      blogs/        ← public blog API
  components/
    colleges/       ← CollegeProfile.tsx, CollegeCard.tsx
    seo/            ← SEOPageTemplate.tsx
  data/             ← static fallback: colleges.ts, blogs.ts, exams.ts
  lib/
    db.ts           ← all Supabase queries
    seo.ts          ← metadata + schema.org helpers
```

### Database Schema (Supabase)
- `colleges`: id, name, slug, city, stream, type, naac_grade, nirf_rank, fees_per_year, placement_avg, details (JSONB)
- `blogs`: id, slug, title, excerpt, body, author, category, tags, status, published_at, read_time, meta_title, meta_desc, ai_generated
- `leads` / `enquiries`: contact form submissions

### College Details (JSONB)
The `details` column stores nested data:
```typescript
interface CollegeDetails {
  courses_fees?: CourseFee[]
  admission_process?: AdmissionStep[]
  cutoffs?: Cutoff[]
  placements?: { year: number; stats: PlacementStat[] }
  rankings?: Ranking[]
  scholarships?: Scholarship[]
  facilities?: Facility[]
  alumni?: Alumni[]
  hostel_info?: HostelInfo
  campus_area?: string
  total_students?: number
  faculty_count?: number
  student_faculty_ratio?: string
}
```

### Admin Auth
All `/api/admin/*` routes check: `req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD`

## Development Rules

1. **No production code without a failing test first** (TDD — see superpowers skill)
2. **TypeScript strict** — run `npx tsc --noEmit` after every change
3. **Static fallback pattern** — always try DB first, catch errors, fall back to static data
4. **ISR not SSR** — use `export const revalidate = N` not `cache: 'no-store'` on public pages
5. **Admin routes need auth** — every `/api/admin/*` handler must check the admin key

## Testing

```bash
npx tsc --noEmit          # TypeScript check
npm run build             # Full build check
npm run dev               # Dev server on localhost:3000
```

No test framework is currently configured. When adding tests, use **Jest + Testing Library** for components and **Vitest** for utility functions. Follow `superpowers:test-driven-development` workflow.

## Common Commands

```bash
npm run dev               # Start dev server
npm run build             # Production build
npx tsc --noEmit          # Type check only
```

## Environment Variables
```
NEXT_PUBLIC_BASE_URL=https://collegepune.com
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=...
ANTHROPIC_API_KEY=...
```
