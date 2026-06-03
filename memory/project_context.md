# CollegePune — Full Project Context
> Auto-generated: 2026-06-03 | Root: `D:\collegepune\college-pune`

---

## Stack
| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.2.1 (App Router) |
| UI | React 19, Tailwind CSS v4 |
| Language | TypeScript (strict) |
| Database | Supabase (PostgreSQL) |
| AI | Anthropic Claude (`@anthropic-ai/sdk ^0.80.0`) |
| Email | Nodemailer (SMTP via Gmail) |
| Animation | Framer Motion |
| Charts | Recharts |
| Search | Fuse.js (client-side fuzzy) |
| Forms | Zod validation |
| PWA | `@ducanh2912/next-pwa` |
| Components | Radix UI (Accordion, Slider, Tabs) + Lucide icons |
| Hosting | Vercel |
| Live URL | https://collegepune.com |

---

## Directory Structure
```
D:\collegepune\college-pune\
├── src\
│   ├── app\              ← Next.js App Router pages + API routes
│   ├── components\       ← React components (grouped by domain)
│   ├── data\             ← Static TypeScript data files (fallback)
│   ├── lib\              ← Utilities, DB, SEO, AI helpers
│   └── types\            ← Shared TypeScript types
├── public\               ← Static assets
├── scripts\              ← One-off migration scripts
├── memory\               ← Project documentation (this file)
└── supabase\migrations\  ← SQL migration files
```

---

## Public Pages (73 routes)

### Home
| File | Route |
|------|-------|
| `src/app/page.tsx` | `/` |

### Engineering (12 pages)
| # | Route |
|---|-------|
| 1 | `/engineering-colleges-pune` |
| 2 | `/top-engineering-colleges-pune` |
| 3 | `/top-10-engineering-colleges-in-pune` |
| 4 | `/btech-colleges-pune` |
| 5 | `/computer-engineering-colleges-pune` |
| 6 | `/mechanical-engineering-colleges-pune` |
| 7 | `/engineering-colleges-pune-placement` |
| 8 | `/engineering-colleges-pune-scholarship` |
| 9 | `/low-fees-engineering-colleges-pune` |
| 10 | `/private-engineering-colleges-pune` |
| 11 | `/engineering-admission-pune-without-jee` |
| 12 | `/direct-admission-engineering-colleges-pune` |

### MBA / Management (10 pages)
| # | Route |
|---|-------|
| 13 | `/mba-colleges-pune` |
| 14 | `/best-mba-colleges-pune` |
| 15 | `/top-10-mba-colleges-in-pune` |
| 16 | `/pgdm-colleges-pune` |
| 17 | `/mba-colleges-pune-placement` |
| 18 | `/mba-colleges-pune-scholarship` |
| 19 | `/low-fees-mba-colleges-pune` |
| 20 | `/private-mba-colleges-pune` |
| 21 | `/mba-admission-pune-without-cat` |
| 22 | `/direct-admission-mba-colleges-pune` |

### Medical (4 pages)
| # | Route |
|---|-------|
| 23 | `/medical-colleges-pune` |
| 24 | `/top-10-medical-colleges-in-pune` |
| 25 | `/mbbs-colleges-pune` |
| 26 | `/neet-colleges-pune` |

### Other Streams (10 pages)
| # | Route |
|---|-------|
| 27 | `/arts-colleges-pune` |
| 28 | `/science-colleges-pune` |
| 29 | `/commerce-colleges-pune` |
| 30 | `/bcom-colleges-pune` |
| 31 | `/law-colleges-pune` |
| 32 | `/design-colleges-pune` |
| 33 | `/pharmacy-colleges-pune` |
| 34 | `/architecture-colleges-pune` |
| 35 | `/bca-colleges-pune` |
| 36 | `/bba-colleges-pune` |
| 37 | `/bsc-it-colleges-pune` |

### Location / Area (4 pages)
| # | Route |
|---|-------|
| 38 | `/colleges-hadapsar-pune` |
| 39 | `/colleges-kothrud-pune` |
| 40 | `/colleges-wakad-pune` |
| 41 | `/colleges-in-pune-with-hostel` |

### Rankings / NAAC / Fees (6 pages)
| # | Route |
|---|-------|
| 42 | `/naac-a-plus-colleges-pune` |
| 43 | `/top-placement-colleges-pune` |
| 44 | `/government-colleges-pune` |
| 45 | `/low-fee-colleges-pune` |
| 46 | `/colleges-pune-fees` |
| 47 | `/nirf-insights` |

### Entrance Exam Clusters (5 pages)
| # | Route |
|---|-------|
| 48 | `/mht-cet-colleges-pune` |
| 49 | `/jee-colleges-pune` |
| 50 | `/jee-main-colleges-pune` |
| 51 | `/cat-colleges-pune` |
| 52 | `/neet-cutoff-pune-colleges` |

### Affiliation / Special (1 page)
| # | Route |
|---|-------|
| 53 | `/sppu-affiliated-colleges-pune` |

### Comparison Pages (3 pages)
| # | Route |
|---|-------|
| 54 | `/coep-vs-pict-pune` |
| 55 | `/sibm-vs-scmhrd-pune` |
| 56 | `/pune-colleges-comparison-engineering-mba` |

### Tools & Calculators (8 pages)
| # | Route |
|---|-------|
| 57 | `/compare` |
| 58 | `/predictor` |
| 59 | `/roi-calculator` |
| 60 | `/pune-college-fees-calculator` |
| 61 | `/pune-college-placement-comparator` |
| 62 | `/pune-admission-deadline-tracker-2026` |
| 63 | `/ai-finder` |
| 64 | `/ai-counselor` |

### Content & Community (9 pages)
| # | Route |
|---|-------|
| 65 | `/blog` |
| 66 | `/news` |
| 67 | `/exams` |
| 68 | `/courses` |
| 69 | `/career-paths` |
| 70 | `/scholarships` |
| 71 | `/qa` |
| 72 | `/ask` |
| 73 | `/alumni` |

### Static / Legal (2 pages)
| # | Route |
|---|-------|
| 74 | `/privacy` |
| 75 | `/terms` |

---

## Dynamic Routes (expand to 400+ sitemap URLs)
| Route Pattern | Data Source | Example |
|--------------|-------------|---------|
| `/colleges/[slug]` | Supabase + static fallback | `/colleges/coep-college-of-engineering-pune` |
| `/blog/[slug]` | Supabase blogs table | `/blog/best-engineering-colleges-pune-2026` |
| `/exams/[slug]` | `src/data/exams.ts` | `/exams/mht-cet` |
| `/courses/[slug]` | `src/data/courses.ts` | `/courses/btech-computer-engineering-pune` |
| `/career-paths/[slug]` | `src/data/careerPaths.ts` | `/career-paths/software-engineer` |
| `/alumni/[slug]` | Static | `/alumni/rahul-sharma-coep-2023` |
| `/cutoffs/[exam]/[college]` | `src/data/cutoffs.ts` | `/cutoffs/mht-cet/coep-pune` |
| `/colleges-in-pune/[slug]` | `src/data/seoPages.ts` | `/colleges-in-pune/btech-colleges-pune` |
| `/city/[city]/[stream]` | Dynamic | `/city/pune/engineering` |

---

## Admin Pages (11 pages under `/admin`)
| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard |
| `/admin/login` | Auth (session cookie) |
| `/admin/colleges` | List / manage colleges |
| `/admin/colleges/new` | Add new college |
| `/admin/colleges/[id]` | Edit college + AI generate details |
| `/admin/blogs` | List / manage blogs |
| `/admin/blogs/new` | Create blog |
| `/admin/blogs/[id]` | Edit blog |
| `/admin/courses` | Manage courses |
| `/admin/courses/new` | Add course |
| `/admin/courses/[id]` | Edit course |
| `/admin/leads` | View & export leads |
| `/admin/reviews` | Moderate reviews |
| `/admin/qa` | Moderate Q&A |
| `/admin/hero` | Edit hero banners |
| `/admin/import` | Bulk import colleges (JSON/CSV) |
| `/admin/agents` | AI agent runner |
| `/admin/approvals` | Content approval queue |

---

## API Routes (28 endpoints)

### Public APIs
| Method | Route | Purpose |
|--------|-------|---------|
| GET | `/api/colleges` | List colleges (stream, search, limit filters) |
| GET | `/api/colleges/featured` | Featured colleges for homepage |
| GET | `/api/blogs` | List published blogs |
| GET | `/api/news` | News feed |
| GET | `/api/qa` | Q&A questions |
| POST | `/api/qa` | Submit question |
| GET | `/api/reviews` | College reviews |
| POST | `/api/reviews` | Submit review |
| GET | `/api/courses/recommend` | AI course recommendations |
| GET | `/api/scholarships/find` | Scholarship finder |
| POST | `/api/leads` | Capture lead (rate-limited 5/min per IP) |
| GET | `/api/leads/export` | Export leads CSV (public, used by admin) |
| PUT | `/api/leads/[id]` | Update lead status |
| POST | `/api/counselling` | Book free counselling |
| POST | `/api/enquiry` | General enquiry form |
| POST | `/api/alert-subscribe` | Subscribe to admission alerts |
| GET | `/api/ai-context` | AI context for LLM tools |
| GET | `/api/llm.txt` | LLM-readable site context |
| POST | `/api/revalidate` | ISR revalidation (header: x-revalidate-secret) |
| POST | `/api/indexnow` | Ping IndexNow for Bing/Yandex |

### AI APIs
| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/ai-chat` | Chat with AI counselor (Claude) |
| POST | `/api/ai-compare` | AI college comparison |
| POST | `/api/ai-recommend` | AI college recommendations |
| POST | `/api/counselor` | AI counselor session |

### Admin APIs (auth required)
| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/admin/colleges/[id]/generate` | AI-generate college details |
| POST | `/api/admin/colleges/[id]/logo` | Upload college logo |
| POST | `/api/admin/colleges/[id]/featured` | Toggle featured status |
| POST | `/api/admin/upload` | Upload image to Supabase Storage |
| POST | `/api/admin/export-leads` | Export leads (admin version) |
| POST | `/api/admin/logout` | Clear session cookie |
| GET  | `/api/og` | Open Graph image generation |

---

## Components

### Admin (`src/components/admin/`)
| File | Purpose |
|------|---------|
| `Sidebar.tsx` | Admin navigation sidebar |
| `PageHeader.tsx` | Admin page header with title + actions |
| `StatsCard.tsx` | Dashboard stats widget |
| `StatusBadge.tsx` | Pill badge for status values |
| `FormField.tsx` | Reusable labeled form input |
| `ImageUpload.tsx` | Drag-drop image uploader → Supabase Storage |
| `QuickLogoUpload.tsx` | College logo quick-upload widget |
| `GenerateDetailsButton.tsx` | Triggers AI detail generation for a college |
| `SyncButton.tsx` | Sync data from external source |
| `FeatureToggle.tsx` | Toggle featured flag on college |
| `DeleteButton.tsx` | Confirm-before-delete button |
| `CourseForm.tsx` | Course add/edit form |

### AI (`src/components/ai/`)
| File | Purpose |
|------|---------|
| `AIChatWidget.tsx` | Floating chat widget (Aarav AI counselor) |
| `AIComparison.tsx` | Side-by-side AI college comparison |
| `AICounselorClient.tsx` | Full-page AI counselor interface |
| `AIRecommender.tsx` | AI-powered college finder form |

### Blog (`src/components/blog/`)
| File | Purpose |
|------|---------|
| `ReadingProgress.tsx` | Top progress bar on blog posts |
| `ShareButtons.tsx` | Social share buttons |

### Colleges (`src/components/colleges/`)
| File | Purpose |
|------|---------|
| `CollegeCard.tsx` | Card used in listing pages |
| `CollegeFilters.tsx` | Stream/fee/type filter bar |
| `CollegeGrid.tsx` | Responsive grid of college cards |
| `CollegeProfile.tsx` | Full college detail page (tabs: Overview, Courses, Placements, etc.) |
| `ReviewSection.tsx` | Student reviews + submit form |

### Courses (`src/components/courses/`)
| File | Purpose |
|------|---------|
| `CourseCard.tsx` | Course listing card |
| `CourseFilters.tsx` | Filter bar for courses page |
| `CourseRecommender.tsx` | Quiz-based AI course recommender |
| `CoursesClient.tsx` | Client wrapper for courses listing |

### Home (`src/components/home/`)
| File | Purpose |
|------|---------|
| `HeroSection.tsx` | Homepage hero with search |
| `AdmissionPosterHero.tsx` | Alternate hero with admission poster |
| `FeaturedColleges.tsx` | Homepage featured colleges section |
| `FeaturedCourses.tsx` | Homepage course highlights |
| `CollegeMarquee.tsx` | Scrolling college logo marquee |
| `CollegeFinder.tsx` | Quick college finder widget |
| `RankingTables.tsx` | NIRF/NAAC ranking tables |
| `StatsCounter.tsx` | Animated site stats (colleges, students, etc.) |
| `BlogPreview.tsx` | Latest blog posts preview |
| `ExamCalendar.tsx` | Upcoming exam dates calendar |
| `FAQSection.tsx` | Homepage FAQ accordion |
| `TestimonialsSection.tsx` | Student testimonials carousel |
| `GuidesScrollSection.tsx` | Horizontal scrolling guides |
| `HomepageNewsSection.tsx` | Latest news widget |
| `QuickExploreSection.tsx` | Quick-access category grid |
| `AlumniQASection.tsx` | Alumni Q&A preview |

### Layout (`src/components/layout/`)
| File | Purpose |
|------|---------|
| `Header.tsx` | Fixed top nav with mega-menu (stream dropdowns, Tools, Explore) |
| `Footer.tsx` | Footer with college links, stream links, social |

### Leads (`src/components/leads/`)
| File | Purpose |
|------|---------|
| `InlineLeadForm.tsx` | Inline lead capture form (embeds in pages) |
| `CounsellingBooking.tsx` | Free counselling booking form |
| `EnquiryForm.tsx` | General enquiry form |
| `LeadBar.tsx` | Sticky bottom lead capture bar |
| `LeadWidgets.tsx` | Aggregated lead widget controller |
| `ExitPopup.tsx` | Exit-intent popup |
| `NewsAlert.tsx` | News/deadline alert subscription |
| `ScholarshipSubscribe.tsx` | Scholarship alert subscription |
| `WhatsAppCTA.tsx` | WhatsApp floating CTA button |

### SEO (`src/components/seo/`)
| File | Purpose |
|------|---------|
| `SEOPageTemplate.tsx` | Standard SEO landing page layout (college list + related links) |
| `SEOLandingPage.tsx` | Rich SEO landing page with sections, FAQs, schema |

### Tools (`src/components/tools/`)
| File | Purpose |
|------|---------|
| `FeesCalculator.tsx` | Total fees + EMI calculator |
| `PlacementComparator.tsx` | Placement salary comparison chart |

### Scholarships (`src/components/scholarships/`)
| File | Purpose |
|------|---------|
| `ScholarshipFinder.tsx` | AI-powered scholarship finder form |

### UI (`src/components/ui/`)
| File | Purpose |
|------|---------|
| `Badge.tsx` | Generic badge/pill component |
| `CollegeLogo.tsx` | College logo with fallback initials |
| `CompareButton.tsx` | Add-to-compare floating button |
| `CutoffChart.tsx` | Cutoff data bar chart |
| `FilterTabs.tsx` | Horizontal filter tab bar |
| `GatedCutoffChart.tsx` | Cutoff chart with lead-gate |
| `GatedCutoffChartClient.tsx` | Client wrapper for gated chart |
| `GoBackButton.tsx` | Browser back navigation |
| `SearchBar.tsx` | Simple search input |
| `SearchModal.tsx` | CMD+K search modal (college/course search) |
| `StarRating.tsx` | 5-star rating display |
| `WhatsAppButton.tsx` | WhatsApp CTA button |

---

## Data Files (`src/data/`)
| File | Contents | Size |
|------|----------|------|
| `colleges.ts` | All 104 colleges — static fallback + seed data | ~2500 lines |
| `blogs.ts` | Static blog posts (fallback when Supabase unavailable) | — |
| `exams.ts` | Entrance exam data (MHT-CET, JEE, NEET, CAT, etc.) | — |
| `courses.ts` | Course definitions with slugs | — |
| `careerPaths.ts` | Career path definitions | — |
| `cutoffs.ts` | Cutoff data per exam+college pair | — |
| `seoPages.ts` | SEO page definitions (slug, h1, description, category, filterKey) | — |
| `blogCalendar.ts` | Blog calendar / schedule data | — |

---

## Library (`src/lib/`)
| File | Purpose |
|------|---------|
| `db.ts` | All data-fetch functions — Supabase first, static fallback. Used by pages. |
| `seo.ts` | `generateMetadata()`, schema.org helpers (BreadcrumbList, CollegeSchema, FAQSchema, EducationalProgramSchema) |
| `anthropic.ts` | Anthropic Claude client + shared prompt helpers |
| `ai/prompts.ts` | All AI prompt templates (college gen, counselor, compare, recommend) |
| `supabase/client.ts` | Browser-side Supabase client |
| `supabase/server.ts` | Server-side Supabase client (SSR cookies) |
| `supabase/admin.ts` | Service-role Supabase client (admin + migration scripts) |
| `supabase/queries-admin.ts` | Admin DB query helpers |
| `supabase/types.ts` | Generated Supabase TypeScript types |
| `mailer.ts` | Nodemailer SMTP setup + send helpers |
| `ratelimit.ts` | IP-based rate limiter (5 req/min for lead form) |
| `validations.ts` | Zod schemas for form inputs |
| `utils.ts` | `cn()` (clsx + tailwind-merge), misc helpers |
| `csrf.ts` | CSRF token generation/validation |
| `indexnow.ts` | IndexNow ping helper (Bing/Yandex) |

---

## Supabase Tables
| Table | Purpose |
|-------|---------|
| `colleges` | All college records (name, slug, stream, NAAC, NIRF, fees, details JSONB, fts tsvector) |
| `college_courses` | Normalised course rows extracted from `details.courses_fees` JSONB |
| `blogs` | Blog posts (title, slug, content, status, published_at, author_id) |
| `leads` | Lead form submissions (name, email, phone, course_interest, budget, exam_type, career_goal) |
| `reviews` | Student reviews per college (rating, body, status) |
| `qa_questions` | Community questions (college_id, body, status) |
| `qa_answers` | Answers to questions (question_id, body, status) |
| `alumni` | Alumni profiles per college |
| `featured_items` | Featured colleges/blogs with section assignment |
| `hero_banners` | Homepage hero banner content |
| `exams` | Exam records |

### Key Indexes
- `idx_colleges_status`, `idx_colleges_stream`, `idx_colleges_naac`, `idx_colleges_nirf`
- `idx_colleges_fts` (GIN index on generated `fts tsvector` column)
- `idx_blogs_status_published`, `idx_reviews_college_status`, `idx_leads_status_created`

### Storage Bucket
- `college-images` — public bucket, 5MB limit, JPEG/PNG/WebP/GIF/SVG allowed

---

## Public Assets (`/public`)
| File | Purpose |
|------|---------|
| `logo.png` | Main site logo (used in Header + mobile nav) |
| `logo.svg` | SVG version of logo |
| `favicon.svg` | Browser tab favicon |
| `icon.svg` / `icon-192.png` / `icon-512.png` | PWA icons |
| `og-image.png` | Default Open Graph social share image |
| `hero-students.jpg` | Hero section background image |
| `manifest.json` | PWA manifest |
| `sw.js` | Service worker (next-pwa) |
| `llms.txt` | LLM-readable site summary (for AI crawlers) |
| `llms-full.txt` | Extended LLM context |
| `collegepune2026indexnow.txt` | IndexNow verification key |

---

## Scripts (`/scripts`)
| File | Purpose |
|------|---------|
| `run-migration.mjs` | Runs all Supabase DB migrations (indexes, triggers, FTS, backfill). Needs `SUPABASE_SERVICE_KEY` + optionally `SUPABASE_ACCESS_TOKEN` env vars. |

---

## Key Env Variables
```
NEXT_PUBLIC_BASE_URL=https://collegepune.com
NEXT_PUBLIC_SUPABASE_URL=https://tfdcpljbozadshhmvhfk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...          # used by sitemap + admin
SUPABASE_SERVICE_KEY=...               # used by migration script
SUPABASE_ACCESS_TOKEN=...              # Supabase Management API personal token
SUPABASE_PROJECT_REF=tfdcpljbozadshhmvhfk
ANTHROPIC_API_KEY=...
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
LEAD_EMAIL=...                         # where lead notifications are sent
REVALIDATE_SECRET=...                  # for /api/revalidate (header: x-revalidate-secret)
```

---

## SEO Setup
- **ISR**: `export const revalidate = 300` on all public pages (5-min cache)
- **Metadata**: Generated via `src/lib/seo.ts` → `generateMetadata()`
- **Schema.org**: BreadcrumbList, CollegeSchema (EducationalOrganization), FAQSchema, EducationalProgramSchema injected via `<Script>` tags
- **Sitemap**: `src/app/sitemap.ts` → `/sitemap.xml` — 400+ URLs
- **Robots**: `src/app/robots.ts` → `/robots.txt`
- **IndexNow**: Auto-pings Bing/Yandex on publish via `/api/indexnow`
- **OG images**: Dynamic `/api/og` + static `og-image.png`
- **Canonical URLs**: All pages have explicit canonical via metadata

---

## Security
- Admin auth: session cookie only (no API key headers)
- Lead form: rate-limited 5 req/min per IP (`src/lib/ratelimit.ts`)
- Revalidation: `x-revalidate-secret` header (not query param)
- Email HTML: escaped before sending to prevent injection
- CSRF: `src/lib/csrf.ts` for state-changing forms

---

## Development Commands
```bash
npm run dev          # Dev server → http://localhost:3000
npm run build        # Production build
npx tsc --noEmit     # TypeScript check (run after every change)
node scripts/run-migration.mjs   # Run DB migration
```

---

*Last updated: 2026-06-03*
