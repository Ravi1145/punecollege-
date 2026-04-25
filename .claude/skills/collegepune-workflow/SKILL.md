---
name: collegepune-workflow
description: Use for any CollegePune-specific development task — adding colleges, blogs, admin features, SEO pages, or DB schema changes
---

# CollegePune Development Workflow

## Stack Cheatsheet

| Layer | Tech | Notes |
|-------|------|-------|
| Framework | Next.js 16 App Router | Server components by default |
| Styling | Tailwind CSS v4 | No config file needed |
| Database | Supabase (PostgreSQL) | Admin client in `src/lib/db.ts` |
| AI | Claude via Anthropic SDK | `/api/admin/ai/*` routes |
| Auth | Single admin key | `process.env.ADMIN_PASSWORD` |

## Before Writing Any Code

1. Check `src/lib/db.ts` for existing DB functions — don't duplicate
2. Check `src/data/` for static fallback files — new DB features need a static fallback
3. Run `npx tsc --noEmit` after every file change

## Pattern: Public Page (Server Component)

```tsx
export const revalidate = 300  // ISR — always set this

async function fetchData() {
  try {
    const result = await getFromDB()          // try DB first
    if (result) return result
  } catch { /* fall through */ }
  return staticFallback                        // always fall back
}

export default async function Page() {
  const data = await fetchData()
  return <div>{/* render */}</div>
}
```

## Pattern: Admin API Route

```ts
import { NextRequest, NextResponse } from 'next/server'

function auth(req: NextRequest) {
  return req.headers.get('x-admin-key') === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // ... handler
}
```

## Pattern: Admin Client Page

```tsx
"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    const key = localStorage.getItem("admin_key")
    if (!key) router.replace("/admin/login")
  }, [router])

  const apiCall = async (url: string, options = {}) => {
    const key = localStorage.getItem("admin_key")
    return fetch(url, { headers: { "x-admin-key": key! }, ...options })
  }
  // ...
}
```

## Adding a New College Feature

1. Add DB function to `src/lib/db.ts`
2. Add API route at `src/app/api/admin/[resource]/route.ts`
3. Update admin UI in `src/app/admin/[resource]/page.tsx`
4. Update public page in `src/app/colleges/[slug]/page.tsx` if needed
5. Add static fallback data if DB call can fail
6. Run TypeScript check

## CollegeDetails JSONB Fields

All stored in the `details` column as JSON. Access via:
```ts
const details = college.details as CollegeDetails
```

Sub-arrays: `courses_fees`, `admission_process`, `cutoffs`, `rankings`, `scholarships`, `facilities`, `alumni`
Sub-objects: `placements`, `hostel_info`
Scalars: `campus_area`, `total_students`, `faculty_count`, `student_faculty_ratio`

## SEO Checklist (for every new page)

- [ ] `export async function generateMetadata()` returns title + description
- [ ] JSON-LD schema script tag in page body
- [ ] `export const revalidate = N` set
- [ ] Page added to `src/app/sitemap.ts`
- [ ] Breadcrumb nav included

## TypeScript Check Command

```bash
npx tsc --noEmit
```

Zero errors required before committing.
