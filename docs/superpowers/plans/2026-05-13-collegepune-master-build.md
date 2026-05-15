# CollegePune Master Build (Phases 0–13) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring CollegePune.com to design score 85+/100, Lighthouse mobile 85+, zero broken links, beating Shiksha (88) & CollegeDunia (82).

**Architecture:** Next.js 16 App Router with static-first ISR, Supabase DB with static fallback, 7-touchpoint lead capture funnel, comprehensive JSON-LD schema on every page.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Supabase, next-pwa, Fuse.js, Recharts

---

## STATUS AUDIT (what's already done)

### ✅ DONE — Skip these
- Phase 0.1 — robots.ts comprehensive ✓
- Phase 0.2 — canonical `/` relative in layout.tsx ✓
- Phase 0.4 — next.config.ts image webp/avif optimized ✓
- Phase 1.2 — Plus Jakarta Sans + DM Sans fonts loaded ✓
- Phase 1.4 — CutoffChart, GatedCutoffChart, SearchModal (CMD+K), ExitPopup, LeadBar, WhatsAppCTA ✓
- Phase 3.1 — /api/leads POST with validation ✓
- Phase 3.4 — /api/colleges GET ✓
- Phase 3.6 — /api/admin/* protected routes ✓
- Phase 4.1 — Admin login, blogs, colleges, leads, enquiries panels ✓
- Phase 4.7 — Leads dashboard ✓
- Phase 5.2 — GatedCutoffChart lead gate ✓
- Phase 5.3 — WhatsAppCTA fixed bottom-right ✓
- Phase 5.4 — ExitPopup (desktop mouseleave + mobile popstate) ✓
- Phase 6 — Homepage 11 sections (Hero, Marquee, QuickExplore, Featured, Rankings, AI, Exams, Tools, Guides, Testimonials, FAQ, Blog) ✓
- Phase 7 — All 6 stream pages: engineering, mba, medical, arts, law, design ✓
- Phase 9 — /cutoffs/[exam]/[college] generates 16+ static pages ✓
- Phase 10 — /scholarships, /news, /qa, /ask, /blog all exist ✓
- Phase 11 — JSON-LD on all major pages, dynamic sitemap ✓
- Phase 12 — manifest.json exists in public ✓

---

## TODO TASKS

### Task 1: Phase 0.3 — Add AIT + DIAT college stubs
**Files:** Modify `src/data/colleges.ts`
- [ ] Add AIT (Army Institute of Technology) entry to colleges array
- [ ] Add DIAT (Defence Institute of Advanced Technology) entry
- [ ] Run `npx tsc --noEmit` to verify

### Task 2: Phase 1.1 — Design tokens file
**Files:** Create `src/styles/design-system.ts`
- [ ] Create design tokens with colors, fonts, spacing, radius, shadow

### Task 3: Phase 3.3 — /api/news GET route
**Files:** Create `src/app/api/news/route.ts`
- [ ] Fetch from Supabase news_cache (approved=true) with static fallback
- [ ] Return sorted by published_at, ISR revalidate 3600

### Task 4: Phase 5 — UTM tracking on all lead forms
**Files:** Modify `src/components/leads/LeadBar.tsx`, `InlineLeadForm.tsx`, `ExitPopup.tsx`
- [ ] Extract UTM params from URL searchParams in each lead component
- [ ] Include utm_source, utm_medium, utm_campaign, utm_content in POST /api/leads body

### Task 5: Phase 5 — ScholarshipSubscribe component
**Files:** Create `src/components/leads/ScholarshipSubscribe.tsx`
- [ ] Build banner with phone input → POST /api/leads { source: 'scholarship_alert' }
- [ ] Add to /scholarships page

### Task 6: Phase 5 — NewsAlert component
**Files:** Create `src/components/leads/NewsAlert.tsx`
- [ ] Build banner "Get MHT-CET merit list alert" → POST /api/leads { source: 'news_alert' }
- [ ] Add to /news and /cutoffs/[exam]/[college] pages

### Task 7: Phase 5 — CollegeFinder 5-step quiz
**Files:** Create `src/components/home/CollegeFinder.tsx`
- [ ] 5 steps: stream → budget → score → area → name+phone (gated)
- [ ] POST /api/leads + show matched colleges

### Task 8: Phase 6 — Cutoff Predictor Teaser on homepage
**Files:** Modify `src/app/page.tsx`
- [ ] Add "Know Your Chances in 30 Seconds" section between QuickExplore and FeaturedColleges

### Task 9: Phase 4 — Admin settings page
**Files:** Create `src/app/admin/settings/page.tsx`
- [ ] Form for WhatsApp number, lead email, announcement text/color, exit popup toggle
- [ ] Read/write via /api/admin/settings

### Task 10: Phase 4 — Admin news management page
**Files:** Create `src/app/admin/news/page.tsx`
- [ ] Show news_cache items, approve/reject toggle, manual add
- [ ] Add to admin sidebar nav

### Task 11: Phase 10 — /alumni/[slug] page
**Files:** Create `src/app/alumni/[slug]/page.tsx`, `src/app/alumni/page.tsx`
- [ ] Alumni profile page with static data
- [ ] Link from college profile pages

### Task 12: Phase 10 — 5 SEO blog articles
**Files:** Add to `src/data/blogs.ts`
- [ ] top-10-engineering-colleges-pune-2026-nirf-rankings
- [ ] mht-cet-cutoff-2026-pune-colleges-stream-wise  
- [ ] government-vs-private-college-fees-pune-2026
- [ ] scholarships-pune-students-2026-complete-guide
- [ ] placement-records-pune-engineering-2025

### Task 13: Phase 12 — next-pwa configuration
**Files:** Modify `next.config.ts`, `package.json`
- [ ] Install next-pwa, configure in next.config.ts
- [ ] Verify manifest.json icons exist

### Task 14: Phase 8 — fetch-logos.ts script
**Files:** Create `scripts/fetch-logos.ts`
- [ ] Script to fetch official logos + store in Supabase Storage
- [ ] Fallback to initials badge if 403/404

### Task 15: Final TypeScript check + build
- [ ] `npx tsc --noEmit`
- [ ] `npm run build`

---

## INFRA TASKS (require manual user action)

These cannot be executed by code — user must do them:

### Manual: Supabase Tables
Run the SQL from Phase 2.1 in Supabase SQL Editor to create:
- `testimonials`, `news_cache`, `alumni`, `qa_questions`, `qa_answers`, `admin_users`, `site_settings`
- Enable RLS policies from Phase 2.2

### Manual: Supabase Storage Buckets
Create in Supabase Dashboard → Storage:
- `college-assets` (public), `campus-images` (public), `avatars` (public)

### Manual: WhatsApp Integration
- Sign up for WATI or Interakt
- Add `WATI_API_KEY` to Supabase Secrets
- Deploy Edge Function: `supabase functions deploy send-whatsapp`

### Manual: Lighthouse Audit
After deployment: `npx lighthouse https://collegepune.com --output=html`
Target: Performance 85+, Accessibility 90+, SEO 95+

### Manual: Schema Validation
Visit https://validator.schema.org and test all page types.

### Manual: Google Search Console
Submit sitemap.xml to Google Search Console.
