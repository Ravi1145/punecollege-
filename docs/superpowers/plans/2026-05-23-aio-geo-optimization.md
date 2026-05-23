# AIO + GEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make collegepune.com fully discoverable and citable by AI models — ChatGPT, Claude, Perplexity, Google AI Overviews, Gemini, and future LLM-powered search engines.

**Architecture:** Seven targeted changes across four layers: (1) crawler access via robots.ts, (2) machine-readable content via llms.txt route + llms-full.txt, (3) structured data upgrades in seo.ts + page files, (4) AI context API endpoint + layout meta tags.

**Tech Stack:** Next.js 16 App Router, TypeScript, Schema.org JSON-LD, llms.txt spec

---

### Task 1: Expand AI crawler access in robots.ts

**Files:**
- Modify: `src/app/robots.ts`

- [ ] Add all major AI crawlers (CCBot, Bytespider, cohere-ai, Applebot, Amazonbot, DuckAssistBot, Meta-ExternalAgent, Googlebot-Extended, YouBot, NaverBot)
- [ ] Run `npx tsc --noEmit` — expect no errors
- [ ] Commit

### Task 2: Upgrade static llms.txt to dynamic Next.js route

**Files:**
- Create: `src/app/llms.txt/route.ts`
- Keep: `public/llms.txt` (fallback if route fails)

- [ ] Create route that returns comprehensive AI-readable text with live college count from Supabase
- [ ] Run `npm run build` — expect `/llms.txt` as dynamic route
- [ ] Commit

### Task 3: Create llms-full.txt with complete college data

**Files:**
- Create: `public/llms-full.txt`

- [ ] Write comprehensive 400+ line file with all colleges, all FAQs, all exam dates, all cutoffs
- [ ] Commit

### Task 4: Upgrade Organization + WebSite schemas with speakable + knowsAbout

**Files:**
- Modify: `src/lib/seo.ts` — `generateOrganizationSchema()`, `generateWebSiteSchema()`

- [ ] Add `knowsAbout` array with 15+ education topics
- [ ] Add `speakable` with cssSelector for voice/AI extraction
- [ ] Add `award`, `slogan`, `foundingDate`, more `sameAs` links
- [ ] Run `npx tsc --noEmit`
- [ ] Commit

### Task 5: Add ItemList schema to government + medical pages

**Files:**
- Modify: `src/app/government-colleges-pune/page.tsx`
- Modify: `src/app/top-10-medical-colleges-in-pune/page.tsx`

- [ ] Build itemListSchema with college slugs + URLs in each page
- [ ] Inject via `<Script>` tag
- [ ] Run `npx tsc --noEmit`
- [ ] Commit

### Task 6: Create /api/ai-context JSON endpoint

**Files:**
- Create: `src/app/api/ai-context/route.ts`

- [ ] Returns structured JSON: site info, top colleges by stream, exam dates, stats
- [ ] No auth required — public endpoint for AI crawlers
- [ ] Run `npm run build` — expect route to appear
- [ ] Commit

### Task 7: Add AI-friendly meta tags to root layout

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] Add subject, topic, classification, coverage, abstract, audience meta tags
- [ ] Add `<link rel="alternate" type="application/json" href="/api/ai-context">`
- [ ] Add `<link rel="alternate" type="text/plain" href="/llms.txt">`
- [ ] Run `npx tsc --noEmit`
- [ ] Commit
