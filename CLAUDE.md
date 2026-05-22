# CollegePune — Claude Project Instructions

## Project Overview

**CollegePune** is an AI-powered Pune college discovery portal.

- **Stack:** Next.js 16 (App Router), Tailwind CSS v4, Claude AI (no separate backend)
- **Location:** `D:\collegepune\college-pune`
- **Live URL:** https://collegepune.com
- **Data:** Static files in `src/data/` — no Express backend required

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
- **Public pages** read directly from `src/data/*.ts` static files
- **Lead capture** (forms) → sends email via nodemailer (SMTP)
- **ISR revalidation:** 300 seconds on all public pages

### Key Directories
```
src/
  app/
    (public pages)
    api/
      blogs/        ← public blog API (proxies to Express backend)
      colleges/     ← public colleges API (proxies to Express backend)
      leads/        ← lead capture (proxies to Express backend)
  components/
    colleges/       ← CollegeProfile.tsx, CollegeCard.tsx
    seo/            ← SEOPageTemplate.tsx
  data/             ← static fallback: colleges.ts, blogs.ts, exams.ts
  lib/
    db.ts           ← all data calls via fetch() → Express backend
    seo.ts          ← metadata + schema.org helpers
```

## Development Rules

1. **No production code without a failing test first** (TDD — see superpowers skill)
2. **TypeScript strict** — run `npx tsc --noEmit` after every change
3. **Static fallback pattern** — always try Express backend first, catch errors, fall back to static data
4. **ISR not SSR** — use `export const revalidate = N` not `cache: 'no-store'` on public pages

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
ANTHROPIC_API_KEY=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
LEAD_EMAIL=...        # Where lead notification emails are sent (defaults to SMTP_USER)
```
