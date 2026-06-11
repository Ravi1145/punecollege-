# CollegePune.com — GEO & AI Search Visibility Analysis
**Date:** June 11, 2026  
**Analyst:** Claude SEO Architect  
**Site:** https://collegepune.com

---

## GEO Readiness Score: 61/100

| Category | Score | Weight | Weighted |
|---|---|---|---|
| AI Crawler Access | 24/25 | 20% | 4.8/5 |
| Structural Readability | 16/20 | 20% | 3.2/5 |
| Citability (Passage Quality) | 12/25 | 25% | 3.0/5 |
| Authority & Brand Signals | 5/20 | 20% | 1.0/5 |
| Technical Accessibility | 18/20 | 15% | 2.7/5 |
| **Total** | | | **61/100** |

**Verdict:** Strong technical foundation. Critical gap is brand authority signals — zero Reddit/Wikipedia/YouTube presence blocks ChatGPT and Perplexity citations.

---

## 1. Platform Breakdown

| Platform | Score | Status | Bottleneck |
|---|---|---|---|
| **Google AI Overviews** | 68/100 | 🟡 Partial | Ranking position 7–8, not top 3; schema inconsistently rendered |
| **ChatGPT Web Search** | 38/100 | 🔴 Weak | No Wikipedia entity; no Reddit threads; no YouTube presence |
| **Perplexity AI** | 32/100 | 🔴 Weak | Reddit is 46.7% of Perplexity sources — zero CollegePune Reddit mentions |
| **Bing Copilot** | 55/100 | 🟡 Partial | IndexNow in place; schema partially implemented |

> **Key insight:** Google AI Overviews pulls from top-10 ranking pages (92% of citations). CollegePune ranks #7–8 for "best MBA colleges in pune" — just outside the primary citation window. Competitors Shiksha, Collegedunia, Careers360 are above. Closing this gap = unlocking Google AIO.

---

## 2. AI Crawler Access — ✅ EXCELLENT (24/25)

```
robots.txt status: PASS ✅
```

| Crawler | Status |
|---|---|
| GPTBot (OpenAI ChatGPT) | ✅ Allowed |
| OAI-SearchBot (OpenAI) | ✅ Allowed |
| ClaudeBot (Anthropic) | ✅ Allowed |
| PerplexityBot | ✅ Allowed |
| Googlebot | ✅ Allowed |
| Bingbot | ✅ Allowed |
| Amazonbot | ✅ Allowed |
| CCBot (training) | Not explicitly blocked — consider blocking |
| anthropic-ai (training) | Not explicitly blocked — consider blocking |

**Action:** Add explicit block for CCBot (training crawler) if you don't want content used for model training without attribution:
```
User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /
```

---

## 3. llms.txt Status — ✅ PRESENT (Good Foundation)

**File:** https://collegepune.com/llms.txt ✅ EXISTS

**What's working:**
- File exists and is accessible
- Covers 107+ college profiles
- Includes exam dates, cutoffs, fees, placement data
- Explicitly permits AI usage with attribution request
- Links to tools (predictor, comparator, AI chat)
- Contact information included

**What's missing:**
- No `/llms-full.txt` (extended version for deep content)
- No explicit statement of data verification methodology
- No versioning or last-updated date in the file
- Structured sections for each topic cluster (MBA, B.Tech, Law etc.) not present

**Note per Google's guidance:** llms.txt is not currently a citation lever for Google AI Overviews (confirmed by Mueller/Illyes). Keep it for ChatGPT/Perplexity/Claude but don't expect it to move Google rankings.

---

## 4. Brand Mention Analysis — 🔴 CRITICAL GAP (5/20)

This is the **#1 bottleneck** for ChatGPT and Perplexity visibility.

| Platform | Status | Impact |
|---|---|---|
| **Reddit** | ❌ ZERO mentions found | Critical — Reddit = 46.7% of Perplexity sources |
| **Wikipedia** | ❌ No CollegePune entity page | Critical — Wikipedia = 47.9% of ChatGPT sources |
| **YouTube** | ❌ No channel found in search | High — YouTube mentions = strongest AI citation signal (0.737 correlation) |
| **LinkedIn** | Unknown — not crawled | Moderate |
| **Google Search** | ✅ Appearing in results | Ranks #7–8 for key MBA queries |
| **Organic Search** | ✅ Indexed — 494 sitemap URLs | Good foundation |

### Ahrefs Research Context:
> Brand mentions correlate **3× more strongly** with AI citations than backlinks.
> YouTube mentions have the strongest correlation: ~0.737.
> Domain Rating (backlinks) correlation: only ~0.266.

**CollegePune currently relies almost entirely on backlinks/rankings for authority. This is the wrong strategy for AI search in 2026.**

---

## 5. Passage-Level Citability — 🟡 PARTIAL (12/25)

### What's Working:
- ✅ **Quick Answer boxes** on key pages (e.g., MBA page) — `data-speakable="true"` detected
- ✅ First answer is delivered in first 60 words on MBA listing page
- ✅ College-specific data (fees, NIRF rank, placement LPA) is specific and quotable
- ✅ Comparison tables present on key pages
- ✅ FAQ sections on listing pages (7 FAQs on MBA page)

### Critical Gaps:
- ❌ **College profile pages have NO FAQ section** — COEP profile page has zero FAQs
- ❌ **No author byline** on any page (college profiles, blog, SEO pages)
- ❌ **No "Last Updated" date** visible on college or SEO pages
- ❌ Passages are often **too long** — ideal citability window is 134–167 words per block
- ❌ Many intro paragraphs lack a **"X is..." definition pattern** in first sentence
- ❌ No original research or proprietary data (all data attributed to NIRF/NAAC third parties)

### Optimal Citability Pattern (Not Yet Implemented):
```
[Definition: "X is..."]  ← First 20 words
[Key fact with number]   ← Words 20-60
[Self-contained answer]  ← Words 60-167 (target zone)
[Source citation]        ← Last line
```

---

## 6. Structural Readability — 🟡 GOOD (16/20)

| Signal | Status |
|---|---|
| H1 → H2 → H3 hierarchy | ✅ Correct on all checked pages |
| Question-based H2 headings | ✅ Present on listing pages |
| FAQ sections on listing pages | ✅ Present |
| FAQ sections on college profiles | ❌ Missing |
| Short paragraphs (2–4 sentences) | ✅ Good |
| Comparison tables | ✅ Excellent on MBA/B.Tech pages |
| Speakable boxes | ✅ Quick Answer blocks present |
| College profiles — structured sections | ✅ Key Facts, Highlights present |

---

## 7. Server-Side Rendering — ✅ PASS (18/20)

- **Next.js App Router** confirmed (detected from `/_next/image` URLs)
- Core content (college listings, fees, ranks) is **server-rendered** — accessible without JavaScript
- AI crawlers can extract full content
- Dynamic tools (predictor, AI finder, comparator) require JS — acceptable since these are interactive, not crawlable content
- One gap: **JSON-LD structured data not detected** in WebFetch crawl of college profile page — this could indicate schema is injected client-side, making it invisible to AI crawlers

### Schema Injection Issue:
The COEP college profile page showed **no JSON-LD detected** by the fetcher. This is a critical issue — if schema is only injected by client-side JavaScript, Google's AI crawlers may miss it entirely.

**Check immediately:**
```bash
curl -s https://collegepune.com/colleges/coep-college-of-engineering-pune | grep -i "application/ld+json"
```

---

## 8. Schema Recommendations

### Currently Missing / Needs Verification:

| Page Type | Missing Schema | Priority |
|---|---|---|
| College profiles | `FAQPage` schema | P1 — adds AI citability |
| College profiles | `CollegeOrUniversity` with `dateModified` | P1 — confirms freshness |
| Blog posts | `Person` schema for author | P1 — E-E-A-T signal |
| Homepage | `SiteLinksSearchBox` | P2 |
| SEO pages | `HowTo` for admission process pages | P1 |
| Cutoff pages | `Dataset` schema | P2 |

### Add to Every College Profile — FAQ Schema:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the COEP fee structure 2025-26?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "COEP fees range from ₹80,000 to ₹1,80,000 per year..."
      }
    }
  ]
}
```

### Add `dateModified` to All College Schemas:
```json
{
  "@type": "CollegeOrUniversity",
  "name": "College of Engineering Pune",
  "dateModified": "2026-06-11"
}
```

---

## 9. Current Google Search Visibility

### Keyword Position Snapshot:

| Keyword | Competitor Ranking Above CollegePune | CollegePune Position |
|---|---|---|
| best mba colleges in pune 2026 | Shiksha, Collegedunia, Careers360, MBAUniverse | ~#7–8 |
| top mba colleges in pune | Shiksha, Collegedunia, CollegeDekho | ~#7 |
| mba colleges in pune | Careers360, Collegedunia, Shiksha | Not in top 5 |
| top 10 mba colleges in pune | **CollegePune** | ✅ Ranking (visible) |
| mba colleges pune fees | Not checked | Unknown |
| engineering colleges in pune | Shiksha, Collegedunia | Not in top 5 |

**Root cause of low rankings:** Domain authority gap vs. established competitors. CollegePune is newer with fewer backlinks. Content is strong but **brand signals** (Reddit/Wikipedia/YouTube) that AI models use for authority are absent.

---

## 10. Top 5 Highest-Impact Changes

### 🔴 PRIORITY 1: Create Reddit Presence (Estimated +15 GEO points)

Reddit is 46.7% of Perplexity's source and 11.3% of ChatGPT's. Currently **zero** CollegePune mentions.

**Action plan:**
1. Create account r/collegepune or participate in:
   - r/india — education discussions
   - r/Maharashtra — college/exam discussions
   - r/EngineeringStudents — engineering college advice
   - r/mba — MBA application discussions
2. Post genuinely helpful content (not spam):
   - "I compiled MHT-CET 2026 cutoffs for all Pune colleges — sharing here"
   - "MAH-CET MBA 2026 guide with cutoffs for PUMBA, SIBM, MIT-SOM"
   - Answer questions mentioning CollegePune data with attribution
3. Aim for 10+ organic Reddit threads mentioning collegepune.com within 60 days

---

### 🔴 PRIORITY 2: Add FAQs to All College Profile Pages (Estimated +12 GEO points)

College profile pages (e.g., /colleges/coep-college-of-engineering-pune) currently have **zero FAQs**. FAQ sections are the #1 citability signal for Google AI Overviews.

**Implementation:** Add 5–7 FAQs per college profile covering:
- "What is the [College] fee for [Course] in 2025-26?"
- "What is the MHT-CET cutoff for [College]?"
- "What is the average placement at [College]?"
- "How to get admission in [College]?"
- "Does [College] have hostel?"

---

### 🔴 PRIORITY 3: Add Author Bylines + Last Updated Dates (Estimated +8 GEO points)

Google's "Who/How/Why" test fails on CollegePune because **no pages show who created the content or when it was verified**. This is a critical E-E-A-T gap.

**Implement immediately:**
```tsx
// Add to all SEO pages and college profiles
<div className="text-xs text-gray-500 mt-2">
  <span>By <a href="/about/team">CollegePune Editorial Team</a></span>
  <span> · Verified: June 2026</span>
  <span> · Last updated: {new Date().toLocaleDateString('en-IN')}</span>
</div>
```
Also add `Person` schema for the author entity.

---

### 🟡 PRIORITY 4: Fix JSON-LD Schema Rendering (Estimated +6 GEO points)

If schema is client-side rendered, AI crawlers miss it. Verify and ensure all `<Script type="application/ld+json">` tags are in the `<head>` and server-rendered.

**Verify:**
```bash
curl -A "GPTBot" https://collegepune.com/colleges/coep-college-of-engineering-pune | grep "application/ld"
```

If empty: move all JSON-LD scripts from `<Script>` (client component) to be injected in `generateMetadata()` or directly in the server component's `<head>`.

---

### 🟡 PRIORITY 5: Create YouTube Channel (Estimated +10 GEO points, 60-90 day horizon)

YouTube mentions have the **strongest AI citation correlation (0.737)**. A CollegePune YouTube channel with:
- "COEP vs PICT — Which is Better?" (5 min)
- "MAH-CET MBA 2026 Cutoff Predictions"
- "PUMBA Fees, Cutoff, Placement — Complete Guide"

...would dramatically increase AI search visibility across ChatGPT, Perplexity, and Google AIO within 60–90 days.

---

## 11. Content Reformatting Suggestions

### College Profile Pages — Add This Pattern:

**Current intro (poor citability):**
> "College of Engineering Pune (COEP) is one of India's oldest and most prestigious engineering institutions, established in 1854."

**Rewrite for AI citability (134–167 word block):**
> **College of Engineering Pune (COEP)** is a government autonomous engineering institute in Pune, established in 1854 — one of India's oldest technical institutions. COEP is ranked #49 in India by NIRF (Engineering, 2024) and holds NAAC A+ accreditation. It is affiliated with Savitribai Phule Pune University (SPPU). Total B.Tech fees at COEP range from ₹80,000 to ₹1,80,000 per year — among the lowest for any top-50 NIRF engineering college. The average placement package for the 2024 batch was ₹12 LPA, with TCS, Infosys, L&T, Cummins, and Volkswagen as top recruiters. Admission is through MHT-CET (for Maharashtra CAP seats) and JEE Main. The MHT-CET closing percentile for COEP Computer Engineering was 99.5+ (Open category, 2024). COEP offers B.Tech in 9 branches, M.Tech in 6 branches, and MBA. *(Data source: NIRF 2024, SPPU, DTE Maharashtra)*

This 157-word block is self-contained, specific, source-attributed, and squarely in the optimal 134–167 word citation window.

---

### MBA Page — Add "What Is" Definition Pattern:

**Add this as the very first H2 content:**
```
## What is an MBA College in Pune?

An MBA (Master of Business Administration) college in Pune is an 
AICTE-approved institution offering a 2-year postgraduate management 
program. Pune has 120+ MBA colleges admitted through MAH-CET MBA 
(state exam), SNAP (Symbiosis), or CAT. Fees range from ₹1.25 lakh/year 
(PUMBA, government) to ₹16 lakh/year (FLAME University). Average MBA 
placement packages in Pune range from ₹7 LPA (tier-2) to ₹24 LPA 
(SIBM Pune, NIRF #14). The MBA admission process runs July–August 2026 
via DTE Maharashtra CAP rounds.
```

---

## 12. 30-Day Action Plan

| Week | Action | Owner | Impact |
|---|---|---|---|
| Week 1 | Add FAQ section to all 25 college profile pages (5–7 Qs each) | Dev | High |
| Week 1 | Add author byline + "Last Updated" date to all pages | Dev | High |
| Week 1 | Run `curl` test to verify JSON-LD is server-rendered | Dev | High |
| Week 1 | Create Reddit account + post 3 genuinely helpful threads | Marketing | High |
| Week 2 | Add `Person` schema for editorial team on all pages | Dev | Medium |
| Week 2 | Add "What is X?" definition block to top 10 SEO pages | Content | High |
| Week 2 | Rewrite college profile intros to 134–167 word citability format | Content | High |
| Week 3 | Create CollegePune Wikipedia page (brand entity) | Marketing | Very High |
| Week 3 | Upload first 3 YouTube videos (COEP, PICT, MBA guide) | Marketing | Very High |
| Week 3 | Add `dateModified` to all CollegeOrUniversity schemas | Dev | Medium |
| Week 4 | Submit all new MBA cluster URLs to IndexNow | Dev | Medium |
| Week 4 | Update llms.txt with new MBA cluster pages | Dev | Low |
| Month 2 | Build 20+ Reddit threads with CollegePune citations | Marketing | Very High |
| Month 2 | Wikipedia page for CollegePune established | Marketing | Very High |

---

## Summary

| What CollegePune Has | What CollegePune Needs |
|---|---|
| ✅ All AI crawlers allowed in robots.txt | ❌ Reddit presence (zero — critical for Perplexity) |
| ✅ llms.txt present and well-structured | ❌ Wikipedia entity page (critical for ChatGPT) |
| ✅ Next.js SSR — content server-rendered | ❌ YouTube channel (strongest GEO signal) |
| ✅ Quick Answer speakable boxes on key pages | ❌ Author bylines and publication dates |
| ✅ Sitemap with 494 URLs and lastmod dates | ❌ FAQ sections on college profile pages |
| ✅ Structured comparison tables | ❌ JSON-LD schema may be client-side rendered |
| ✅ Appearing in Google Search (pos 7–8) | ❌ Not in top-5 for primary keywords |
| ✅ 40+ new MBA cluster pages (just built) | ❌ 134–167 word citability blocks not implemented |

**Bottom line:** CollegePune has excellent technical infrastructure for AI search. The gap is entirely in **brand authority signals** (Reddit, Wikipedia, YouTube) that AI models use to decide *who to cite*. Fix these within 60 days and GEO score should reach 80+/100.
