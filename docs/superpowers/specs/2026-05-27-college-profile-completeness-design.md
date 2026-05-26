# College Profile Completeness — Design Spec
**Date:** 2026-05-27
**Project:** CollegePune (https://collegepune.com)
**Goal:** Make every college profile tab show real content — no empty states, no "generate via AI Studio" placeholders visible to users.

---

## Context

CollegePune has 35 static colleges in `src/data/colleges.ts` and 100+ colleges as Supabase rows. Only 5–10 DB colleges have their `details` JSONB populated via admin. The rest show empty tabs. This makes the product feel broken for ~90% of college profile pages.

The `College` type and static data already contain rich top-level fields (`feesRange`, `avgPlacement`, `topRecruiters`, `courses`, `entranceExams`, `highlights`, etc.) that can populate every tab — they are just not being used when `details` is empty.

---

## Approach: Three Phases, Each Independently Shippable

### Phase 1 — Profile Fallback Layer
**Fixes empty tabs today. Zero DB changes required.**

### Phase 2 — Static-to-Supabase Migration Script
**Permanently migrates all 35 static colleges into Supabase with full `details`.**

### Phase 3 — Admin AI Generation Button
**Fills empty DB-only colleges with AI-generated structured content in one click.**

---

## Phase 1: Profile Fallback Layer

### Problem
`CollegeProfile.tsx` renders a "generate via AI Studio" placeholder when `details.X` is absent. The `college` prop already carries enough data to populate most tabs.

### Rule
Every tab uses a two-tier strategy:
1. **Structured data** — render from `details.*` arrays (existing behaviour)
2. **Derived fallback** — render from `college.*` top-level fields when `details.*` is absent
3. **Hide** — if both are absent and no fallback applies, remove the tab from the tab bar entirely (not rendered empty)

No tab ever shows placeholder text to a real user.

### Tab-by-Tab Fallback Map

| Tab | Structured source | Fallback from `college.*` | Hide if |
|-----|------------------|--------------------------|---------|
| Overview | `details.campus_area`, `details.total_students`, `details.faculty_count` | `college.highlights[]`, `college.description`, `college.hostel`, `college.tags[]` | Description is empty AND no highlights |
| Courses & Fees | `details.courses_fees[]` | Build display rows: one per item in `college.courses[]`, fees from `college.feesRange.min/max`, seats unknown | `college.courses[]` is empty |
| Admission | `details.admission_process[]` | `college.entranceExams[]` + standard 5-step process text built for this stream | Never hidden — every college has an admission process |
| Placement | `details.placements` | `college.avgPlacement`, `college.highestPlacement`, `college.topRecruiters[]` | `avgPlacement === 0` AND `topRecruiters` empty |
| Cutoffs | `details.cutoffs[]` | Plain-text fallback: "Cutoff data for [college] will be updated after 2026 results" with `college.entranceExams[]` listed | Never hidden |
| Scholarships | `details.scholarships[]` | Standard Maharashtra government schemes (EBC, OBC, SC/ST, Minority) shown as generic cards with apply links | Never hidden |
| Facilities | `details.facilities[]` | Derive from `college.hostel` (hostel card), stream-based defaults (library, labs, sports) | Never hidden |
| Alumni | `details.alumni[]` | Hide tab — no fabrication | `details.alumni` empty or absent |
| FAQ | `details.faqs[]` | Auto-build 3 FAQs from college name + fees + entrance exams | Never hidden |
| Gallery | (image URLs) | Hide tab | No images uploaded |

### Files Changed
- `src/components/colleges/CollegeProfile.tsx` — add fallback rendering logic per tab
- `src/app/colleges/[slug]/page.tsx` — no changes needed (already passes `college` + `details`)

### What Does NOT Change
- Tab UI design, layout, or component interfaces
- Admin panel
- Any API routes
- Static college data files

---

## Phase 2: Static-to-Supabase Migration Script

### Problem
35 static colleges exist only in `colleges.ts`. Supabase has empty shells or nothing for them. Admin can't edit them. ISR revalidation doesn't work.

### Script Location
`scripts/migrate-static-colleges.ts`

### Execution
```bash
npx ts-node scripts/migrate-static-colleges.ts
```

### Script Behaviour

**Input:** All 35 colleges from `src/data/colleges.ts`

**For each college, builds a complete Supabase row:**

Top-level fields mapped directly:
```
name, slug, short_name, type, stream, established, affiliation,
naac_grade, nirf_rank, city, address, description, highlights,
tags, fees_min, fees_max, avg_placement, highest_pkg,
top_recruiters, entrance_exams, courses, specializations,
hostel, rating, review_count, website, phone, email,
cover_url (← college.image), logo_url (← college.logo),
status = 'published'
```

`details` JSONB constructed from:
- `courses_fees[]` — one row per `college.courses[]` item, fees from `feesRange`, seats null
- `admission_process[]` — from `college.details.admission_process[]` if exists, else null (Phase 1 fallback handles display)
- `cutoffs[]` — from `college.details.cutoffs[]` if exists, else null
- `placements` — object built from `avgPlacement`, `highestPlacement`, `topRecruiters`
- `scholarships[]` — from `college.details.scholarships[]` if exists, else null
- `facilities[]` — from `college.details.facilities[]` if exists, else null
- `alumni[]` — from `college.details.alumni[]` if exists, else null
- `faqs[]` — from `college.faqs[]` or `college.details.faqs[]` if exists, else null
- `rankings[]` — from `college.details.rankings[]` if exists, else null
- `hostel_info` — from `college.details.hostel_info` if exists, else null
- `campus_area`, `total_students`, `faculty_count` — from `college.details.*` if exists

**Upsert strategy:**
- Conflict key: `slug`
- If row exists AND `details` is already populated (non-null): **skip `details` field** — never overwrite manually entered admin data
- If row exists AND `details` is null: write the constructed `details`
- All other top-level fields: always update (keep in sync with static data)

**Output:**
```
✓ Migrated: 35 colleges
✓ Details written: 28 colleges  
✓ Details skipped (already populated): 7 colleges
✓ Errors: 0
```

**Safety:** Script is idempotent — safe to run multiple times.

### Dependencies
- `src/data/colleges.ts` — read source
- `src/lib/supabase/admin.ts` — write client
- `dotenv` — load `.env.local` for Supabase credentials

### After Script Runs
- All 35 colleges are fully Supabase-backed
- Phase 1 fallbacks for these 35 become redundant (structured `details` now present)
- Admin can edit all fields via existing panel
- `revalidatePath` works correctly on all 35

---

## Phase 3: Admin AI Generation Button

### Problem
DB-only colleges added via admin have empty `details`. Manual entry takes hours per college.

### UI Change (minimal)

In `src/app/admin/colleges/[id]/page.tsx`, add one section below the existing form:

```
┌─────────────────────────────────────────────────────┐
│  ✦ AI Content Generation                            │
│  Auto-fill cutoffs, FAQs, scholarships, facilities  │
│  and admission process using AI.                    │
│                                                     │
│  [ Generate All Content ]  ← button                │
│                                                     │
│  Generated content is saved and visible in preview. │
│  Review before publishing.                          │
└─────────────────────────────────────────────────────┘
```

Button states: idle → loading spinner → success toast / error toast.

### New API Route
`POST /api/admin/colleges/[id]/generate`

### Route Behaviour

**Auth:** Supabase session check (same pattern as existing admin routes). Returns 401 if not authenticated.

**Rate limit:** One generation per college per 10 minutes (checked via `updated_at` on `details`). Returns 429 if too soon.

**Steps:**
1. Fetch college row from Supabase by `id` — get `name`, `stream`, `type`, `city`, `naac_grade`, `fees_min`, `fees_max`, `avg_placement`, `highest_pkg`, `courses[]`, `entrance_exams[]`, `website`, `affiliation`
2. Build a structured prompt requesting JSON output with exact field names matching `CollegeDetails` type
3. Call Claude API (`claude-haiku-4-5-20251001` — fast, cheap ~₹1–2 per college)
4. Parse and validate JSON response — check required keys exist, arrays are arrays
5. Merge into existing `details`: **only write fields that are currently null/empty** in DB
6. Save merged `details` to Supabase
7. Call `revalidatePath('/colleges/[slug]')`
8. Return `{ success: true, fieldsGenerated: ['courses_fees', 'cutoffs', 'faqs', ...] }`

**Fields generated by AI:**
- `courses_fees[]` — one row per course with realistic fees, duration, seats, eligibility
- `admission_process[]` — 5 steps specific to stream + entrance exams
- `cutoffs[]` — year-wise (2024, 2023) cutoff ranges for top 3 courses by category
- `scholarships[]` — government schemes + any college-specific ones
- `facilities[]` — 6–8 facilities appropriate to stream and college type
- `faqs[]` — 6 FAQs covering fees, cutoffs, hostel, placements, admission process

**Fields NOT generated (never fabricated):**
- `alumni[]` — real people, must be entered manually
- `placements.stats` — real statistics, must come from admin
- `rankings[]` — real rankings, must come from admin

**Cost:** ~₹1–2 per college using Haiku. 50 colleges = ~₹50–100 total.

### Files Changed
- `src/app/admin/colleges/[id]/page.tsx` — add generation UI section
- `src/app/api/admin/colleges/[id]/generate/route.ts` — new file

---

## Implementation Order

```
Phase 1 (Day 1)
  → Update CollegeProfile.tsx with fallback logic
  → TypeScript check
  → Manual test: open 3 different college profiles, confirm no empty tabs

Phase 2 (Day 2)
  → Write scripts/migrate-static-colleges.ts
  → Dry-run with console.log only (no DB writes)
  → Review output, confirm data looks correct
  → Run with DB writes
  → Verify 5 colleges in admin panel show full data
  → Verify college profile pages show structured tab data

Phase 3 (Day 3-4)
  → Build /api/admin/colleges/[id]/generate route
  → Add UI button to admin edit page
  → Test on one empty DB college
  → Review generated content quality
  → Run for remaining empty colleges
```

---

## Success Criteria

- [ ] Zero college profile tabs show "generate via AI Studio" placeholder to users
- [ ] All 35 static colleges are present in Supabase with `details` populated
- [ ] Every college profile page has at least Overview, Courses, Admission, Placement, and Scholarships tabs with real content
- [ ] Admin "Generate Content" button works end-to-end on a new empty college
- [ ] `npx tsc --noEmit` passes with zero errors after all changes
- [ ] No existing UI design is modified

---

## Files Created/Modified Summary

| File | Phase | Action |
|------|-------|--------|
| `src/components/colleges/CollegeProfile.tsx` | 1 | Modify — add fallback rendering |
| `scripts/migrate-static-colleges.ts` | 2 | Create — migration script |
| `src/app/api/admin/colleges/[id]/generate/route.ts` | 3 | Create — AI generation API |
| `src/app/admin/colleges/[id]/page.tsx` | 3 | Modify — add generation UI |
