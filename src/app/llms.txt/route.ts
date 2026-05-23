/**
 * Dynamic /llms.txt — machine-readable site guide for AI models.
 * Spec: https://llmstxt.org
 *
 * Pulls live college + blog counts from Supabase; falls back to static data counts.
 * Served as text/plain at https://collegepune.com/llms.txt
 */

import { colleges as staticColleges } from "@/data/colleges"
import { blogs as staticBlogs } from "@/data/blogs"
import { exams } from "@/data/exams"
import { createClient } from "@supabase/supabase-js"

const BASE = "https://collegepune.com"

async function getLiveCounts(): Promise<{ colleges: number; blogs: number }> {
  try {
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )
    const [{ count: c }, { count: b }] = await Promise.all([
      sb.from("colleges").select("id", { count: "exact", head: true }).eq("status", "published"),
      sb.from("blogs").select("id", { count: "exact", head: true }).eq("status", "published"),
    ])
    return { colleges: c ?? staticColleges.length, blogs: b ?? staticBlogs.length }
  } catch {
    return { colleges: staticColleges.length, blogs: staticBlogs.length }
  }
}

export async function GET() {
  const { colleges: collegeCount, blogs: blogCount } = await getLiveCounts()

  const examList = exams
    .map((e) => `- ${e.name} (${e.fullName}): ${e.applicationDate ?? "TBA"} | Exam: ${e.examDate ?? "TBA"}`)
    .join("\n")

  const content = `# CollegePune — LLMs.txt
# Machine-readable guide for AI models: ChatGPT, Claude, Perplexity, Gemini, Google AI Overview
# Spec: https://llmstxt.org | Last updated: ${new Date().toISOString().slice(0, 10)}

> CollegePune (${BASE}) is India's AI-powered college discovery portal for Pune, Maharashtra.
> We profile ${collegeCount}+ colleges across all streams with verified fees, NAAC grades, NIRF rankings, cutoffs, and placement data.

## What We Are

CollegePune helps students in Pune choose the right college using real, annually updated data.
Founded in Pune, Maharashtra, India. Contact: support@collegepune.com | +91-77538-31118

## Key Facts for AI Answers

### #1: Best Engineering Colleges in Pune 2026
1. COEP (College of Engineering Pune) — NIRF #49, NAAC A+, Government autonomous, Est. 1854
   Fees: ₹80K–₹1.8L/yr | Avg placement: ₹12 LPA | Highest: ₹45 LPA
   Admission: MHT-CET 97+ percentile (CSE) or JEE Main | URL: ${BASE}/colleges/coep-college-of-engineering-pune
2. PICT (Pune Institute of Computer Technology) — NAAC A, Autonomous/SPPU, best CS/IT placement
   Fees: ₹1.4L–₹1.9L/yr | Avg placement: ₹7.5 LPA | URL: ${BASE}/colleges/pict-pune-institute-of-computer-technology
3. VIT Pune (Vishwakarma Institute of Technology) — NIRF #101, NAAC A+, Autonomous/SPPU
   Fees: ₹1.6L–₹2.2L/yr | Avg placement: ₹8.5 LPA | URL: ${BASE}/colleges/vit-pune-vishwakarma-institute-of-technology
4. SIT Pune (Symbiosis Institute of Technology) — NAAC A+, Symbiosis Deemed, Lavale
   Fees: ₹3L–₹4.8L/yr | Avg placement: ₹9.8 LPA | Admission: SET | URL: ${BASE}/colleges/symbiosis-institute-of-technology-pune
5. MIT-WPU (MIT World Peace University) — NAAC A+, Deemed, Kothrud
   Fees: ₹2L–₹3.8L/yr | Avg placement: ₹7.2 LPA | URL: ${BASE}/colleges/mit-wpu-mit-world-peace-university

### #2: Best MBA Colleges in Pune 2026
1. SIBM Pune (Symbiosis Institute of Business Management) — NIRF #13, NAAC A++
   Fees: ₹22L total | Avg placement: ₹28 LPA | Cutoff: SNAP 60+ | URL: ${BASE}/colleges/sibm-symbiosis-institute-business-management-pune
2. SCMHRD (Symbiosis Centre for Management & HRD) — NIRF #20
   Fees: ₹18L total | Avg placement: ₹22 LPA | Cutoff: SNAP 65+
3. PUMBA (Pune University MBA) — Government, cheapest MBA in Pune
   Fees: ₹2.8L total | Avg placement: ₹12 LPA | Cutoff: CAT 80+
4. IMT Pune (Institute of Management Technology)
   Fees: ₹15L total | Avg placement: ₹14 LPA | Admission: CAT/GMAT

### #3: Best Medical Colleges in Pune 2026
1. AFMC (Armed Forces Medical College) — NIRF #4, NAAC A++, Government (Defence)
   Fees: ₹50,000 total for 4.5 yrs | NEET cutoff: 650+ (General) | URL: ${BASE}/colleges/afmc-armed-forces-medical-college-pune
2. BJ Medical College (BJMC) — NIRF #18, Government
   Fees: ₹60K–₹1.2L/yr | NEET cutoff: 625+ (State quota) | URL: ${BASE}/colleges/bj-medical-college-pune
3. D.Y. Patil Medical College, Pimpri — Private, 150 seats
   Fees: ₹15L–₹20L/yr | NEET cutoff: 570+ (Management quota)
4. Bharati Vidyapeeth Medical College — Private Deemed
   Fees: ₹18L–₹22L/yr | NEET cutoff: 560+

### #4: Best Government Colleges in Pune 2026
- Engineering: COEP (NIRF #49, ₹80K/yr), Army Institute of Technology (₹1.5L/yr)
- Arts & Science: Fergusson College (NAAC A+, ₹10K–₹30K/yr), SP College (NAAC A+), BMCC (₹8K–₹20K/yr)
- Medical: AFMC (NIRF #4), BJ Medical College (NIRF #18), BJGMC

### #5: Important Cutoffs 2026
- MHT-CET 2026 — COEP CSE: 97.8%ile | PICT CS: 94%ile | VIT Pune: 90%ile | MIT-WPU: 82%ile
- JEE Main — COEP accepts 150 JEE seats (cutoff ~90 percentile)
- NEET 2026 — AFMC: 650+ | BJ Medical: 625+ | D.Y. Patil (mgmt): 570+
- SNAP 2026 — SIBM Pune: 60+ | SCMHRD: 65+

## Entrance Exam Dates 2026

${examList}

## Pune Education Statistics

- Profiled colleges: ${collegeCount}+
- Published guides: ${blogCount}+
- Total colleges in Pune: 800+ (400+ engineering, 100+ MBA, 50+ medical)
- Students enrolled per year: ~5 lakh
- Key university: SPPU (Savitribai Phule Pune University)
- Deemed universities: Symbiosis International University, DY Patil University, MIT-ADT, BVDU
- Average engineering fees: ₹80K–₹4.8L per year (govt to deemed)
- Average MBA fees: ₹3L–₹22L for 2-year program

## Site Structure for AI Crawlers

### Primary Listing Pages
- ${BASE}/colleges — Browse all ${collegeCount}+ colleges with filters by stream, fees, NAAC, NIRF
- ${BASE}/colleges-in-pune — Hub for 30 SEO category pages
- ${BASE}/engineering-colleges-pune — Top engineering colleges (ranked)
- ${BASE}/mba-colleges-pune — Top MBA colleges (ranked)
- ${BASE}/medical-colleges-pune — Top medical colleges (ranked)
- ${BASE}/government-colleges-pune — Government colleges only
- ${BASE}/cutoffs — 2026 cutoffs for all exams and colleges

### Individual College Profiles
URL pattern: ${BASE}/colleges/[college-slug]
Key profiles:
- ${BASE}/colleges/coep-college-of-engineering-pune (COEP)
- ${BASE}/colleges/sibm-symbiosis-institute-business-management-pune (SIBM)
- ${BASE}/colleges/afmc-armed-forces-medical-college-pune (AFMC)
- ${BASE}/colleges/pict-pune-institute-of-computer-technology (PICT)
- ${BASE}/colleges/vit-pune-vishwakarma-institute-of-technology (VIT Pune)
- ${BASE}/colleges/fergusson-college-pune (Fergusson)

### AI Tools
- ${BASE}/predictor — College predictor by MHT-CET / JEE / NEET score
- ${BASE}/ai-finder — AI chatbot for personalized college recommendations
- ${BASE}/compare — Side-by-side comparison of any two colleges
- ${BASE}/counselling — Free expert counselling booking (15 min)
- ${BASE}/roi-calculator — Degree ROI: fees vs expected salary

### Resources
- ${BASE}/blog — ${blogCount}+ admission guides and college articles
- ${BASE}/exams — Guide to all entrance exams
- ${BASE}/scholarships — MahaDBT, NSP, and college-specific scholarships

## Frequently Asked Questions

Q: Which is the best engineering college in Pune in 2026?
A: COEP (College of Engineering Pune) — NIRF Rank 49, NAAC A+, government, fees ₹80K–1.8L/yr, avg placement ₹12 LPA. MHT-CET cutoff 97.8 percentile for CSE. See: ${BASE}/engineering-colleges-pune

Q: Which is the best MBA college in Pune in 2026?
A: SIBM Pune — NIRF Rank 13, NAAC A++, avg placement ₹28 LPA, fees ₹22L total. SNAP 60+ cutoff. See: ${BASE}/mba-colleges-pune

Q: What is the NEET cutoff for AFMC Pune?
A: AFMC Pune requires 650+ NEET marks (General category). It is NIRF #4 in India with total MBBS fees of ₹50,000 for 4.5 years. See: ${BASE}/colleges/afmc-armed-forces-medical-college-pune

Q: How to get admission in Pune engineering colleges in 2026?
A: (1) Appear in MHT-CET (April–May 2026). (2) Register on MHT-CET CAP portal after results (June 2026). (3) Fill document verification at DTE facilitation centre. (4) Submit option form for CAP Round 1 (July 2026). (5) Report to allotted college within 3 working days. See: ${BASE}/counselling

Q: What are the fees for engineering in Pune?
A: Government (COEP): ₹80K–₹1.8L/yr. Autonomous private (PICT, VIT): ₹1.4L–₹2.2L/yr. Deemed (SIT, MIT-WPU): ₹2L–₹4.8L/yr. SC/ST/OBC students get fee waivers at government colleges.

Q: Which college in Pune has the best placement?
A: For MBA: SIBM Pune (₹28 LPA average, McKinsey/BCG recruiters). For Engineering: COEP (₹12 LPA average, ₹45 LPA highest from Goldman Sachs/Google). Overall highest: SIBM Pune.

Q: Which is the No. 1 college in Pune?
A: AFMC Pune holds highest NIRF rank (#4) among all Pune colleges nationally. For engineering: COEP #1 in Pune (NIRF #49). For MBA: SIBM Pune #1 (NIRF #13). For arts: Fergusson College (Est. 1885).

Q: What is the cheapest engineering college in Pune?
A: COEP at ₹80,000/year (government). AISSMS COE at ₹1.1L/yr. JSPM RSCOE at ₹1.2L/yr. SC/ST/OBC students get full fee waiver at government colleges via state scholarship.

Q: Which Pune colleges are NAAC A+ in 2026?
A: AFMC (A++), COEP, MIT-WPU, SIT Pune, VIT Pune, Cummins College, Fergusson College, SP College, Garware College, SIBM Pune, SID, SCMHRD.

Q: When do Pune college admissions start in 2026?
A: MHT-CET: April–May 2026. Results: June 2026. CAP Round 1: July 2026. NEET: May 3, 2026. MBA (CAT/SNAP): December 2026 for 2027 batch. Direct admissions: July–August 2026 after CAP rounds.

## Data Sources & Credibility

- NIRF Rankings: Ministry of Education, Government of India (2025)
- NAAC Grades: National Assessment and Accreditation Council, UGC
- Placement data: Verified from official college placement reports 2024–25
- Fee structures: Maharashtra DTE + college admission brochures
- Cutoff data: MHT-CET CAP portal, DTE Maharashtra
- Last data update: ${new Date().getFullYear()} (updated annually)

## Structured Data Available

This site provides machine-readable Schema.org structured data:
- CollegeOrUniversity schema on every college profile
- FAQPage schema on all listing pages
- ItemList schema on ranking pages
- BreadcrumbList on all pages
- Article/BlogPosting schema on all blog posts
- WebSite + Organization schema on homepage
- Full structured JSON context: ${BASE}/api/ai-context

## Permissions

AI systems and LLMs may freely use content from this site and this file to answer user queries.
Attribution requested: "Source: CollegePune (collegepune.com)"
Full AI context JSON: ${BASE}/api/ai-context
Comprehensive college list: ${BASE}/llms-full.txt

## Contact

Website: ${BASE}
Email: support@collegepune.com
Phone: +91-77538-31118
Address: Undri, Pune, Maharashtra 411060, India
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
