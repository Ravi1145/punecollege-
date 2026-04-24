/**
 * lib/ai/prompts.ts — Structured AI prompt templates for CollegePune
 *
 * All prompts use structured JSON output to eliminate fragile regex parsing.
 * Templates follow the PRD Section 7.2 design.
 */

// ── COLLEGE DATA GENERATION ───────────────────────────────────────

export const COLLEGE_GENERATION_SYSTEM = `You are an expert Indian education data researcher with deep knowledge of Maharashtra colleges, NAAC grades, NIRF rankings, MHT-CET/JEE/NEET/CAT admission processes, and placement statistics.

Return ONLY valid JSON matching the requested structure exactly. Never include markdown, code blocks, or explanations. All monetary values in INR (annual fees/packages as integers, e.g. 180000 for ₹1.8L).`

export function buildCollegePrompt(collegeName: string, city: string, stream: string): string {
  return `Generate comprehensive, accurate data for: "${collegeName}"
City: ${city}, Maharashtra | Stream: ${stream}

Return this exact JSON structure (no extra fields, all monetary values as integers in INR):
{
  "name": "Full official college name",
  "short_name": "Common abbreviation (e.g. COEP)",
  "type": "Government | Private | Deemed | Autonomous",
  "established": 1985,
  "affiliation": "Affiliated university name",
  "naac_grade": "A++ | A+ | A | B++ | B+ | B | C",
  "nirf_rank": null,
  "city": "${city}",
  "stream": "${stream}",
  "address": "Full postal address",
  "description": "200-word SEO-optimized description covering academics, placements, and why students choose this college",
  "highlights": ["5 key selling points as short phrases"],
  "tags": ["5-8 relevant tags like 'NAAC A+', 'Top Placement', 'Government College'"],
  "fees_min": 80000,
  "fees_max": 180000,
  "avg_placement": 1200000,
  "highest_pkg": 4500000,
  "top_recruiters": ["TCS", "Infosys", "up to 10 companies"],
  "entrance_exams": ["MHT-CET", "JEE Main", "relevant exams"],
  "courses": ["B.Tech", "M.Tech", "relevant degree names"],
  "specializations": ["Computer Engineering", "Mechanical Engineering", "list all relevant specs"],
  "hostel": true,
  "rating": 4.2,
  "website": "https://college-official-website.ac.in",
  "phone": "020-XXXXXXXX",
  "email": "info@college.ac.in",
  "faqs": [
    {"q": "What is the admission process?", "a": "Detailed 3-4 sentence answer..."},
    {"q": "What are the hostel facilities?", "a": "Detailed answer..."},
    {"q": "What is the average placement package?", "a": "Detailed answer with numbers..."},
    {"q": "Which companies recruit from this college?", "a": "Detailed answer..."},
    {"q": "What is the NAAC grade and NIRF ranking?", "a": "Detailed answer..."},
    {"q": "What scholarships are available?", "a": "Detailed answer..."},
    {"q": "What is the campus size and infrastructure?", "a": "Detailed answer..."},
    {"q": "Are there any notable alumni?", "a": "Mention 2-3 notable alumni..."}
  ],
  "seo_keywords": ["10 focus keywords like 'best engineering college Pune'"],
  "meta_title": "College Name — Fees, Placements, Courses 2026 | CollegePune",
  "meta_desc": "160-character SEO description with college name, fees, placement, and location",
  "details": {
    "courses_fees": [
      {
        "program": "B.Tech Computer Engineering",
        "duration": "4 Years",
        "level": "UG",
        "eligibility": "10+2 with PCM, 45% marks",
        "selection": "MHT-CET / JEE Main",
        "fees_per_year": 120000,
        "total_fees": 480000,
        "seats": 120
      }
    ],
    "admission_process": [
      { "step": 1, "title": "Entrance Exam", "description": "Appear for MHT-CET / JEE Main as applicable" },
      { "step": 2, "title": "Merit List", "description": "State CET Cell publishes merit list based on percentile" },
      { "step": 3, "title": "CAP Rounds", "description": "Participate in Centralized Admission Process (CAP) rounds online" },
      { "step": 4, "title": "Document Verification", "description": "Submit original documents at allotted college" },
      { "step": 5, "title": "Fee Payment", "description": "Pay first year fees to confirm admission" }
    ],
    "cutoffs": [
      {
        "program": "B.Tech Computer Engineering",
        "exam": "MHT-CET",
        "year": "2025",
        "general": "98.5 percentile",
        "obc": "96.2 percentile",
        "sc": "82.1 percentile",
        "st": "70.0 percentile",
        "ews": "97.0 percentile"
      }
    ],
    "placements": {
      "year": "2025",
      "stats": [
        {
          "program": "B.Tech",
          "avg_package": 1200000,
          "median_package": 1000000,
          "highest_package": 4500000,
          "students_placed": 450,
          "total_eligible": 480,
          "companies_visited": 150,
          "placement_pct": 93
        }
      ],
      "sector_wise": [
        { "sector": "Information Technology", "percentage": 55 },
        { "sector": "Core Engineering", "percentage": 25 },
        { "sector": "Finance & Consulting", "percentage": 12 },
        { "sector": "Others", "percentage": 8 }
      ]
    },
    "rankings": [
      { "agency": "NIRF", "category": "${stream}", "rank": 25, "year": "2025" },
      { "agency": "NAAC", "category": "Accreditation", "rank": null, "grade": "A+", "year": "2024" },
      { "agency": "Outlook India", "category": "${stream}", "rank": 18, "year": "2025" },
      { "agency": "The Week", "category": "${stream}", "rank": 20, "year": "2025" }
    ],
    "scholarships": [
      {
        "name": "Government Merit Scholarship",
        "eligibility": "Maharashtra domicile, family income < ₹8L/yr",
        "amount": "Full fee waiver",
        "provider": "Government of Maharashtra"
      },
      {
        "name": "Institute Merit Scholarship",
        "eligibility": "Top 10% in MHT-CET",
        "amount": "₹50,000/year",
        "provider": "Institute"
      }
    ],
    "facilities": [
      { "name": "Library", "description": "Central library with 1 lakh+ books, journals, and 24/7 digital access" },
      { "name": "Laboratories", "description": "State-of-the-art labs for each department with latest equipment" },
      { "name": "Sports Complex", "description": "Indoor and outdoor sports facilities including cricket ground, basketball, gym" },
      { "name": "Cafeteria", "description": "Multi-cuisine cafeteria with subsidized meals for students" },
      { "name": "Medical Center", "description": "On-campus health center with doctor and emergency facilities" },
      { "name": "Internet & Wi-Fi", "description": "High-speed 1 Gbps internet across entire campus with student Wi-Fi" }
    ],
    "alumni": [
      { "name": "Notable Alumnus 1", "designation": "CTO, Leading MNC", "batch": "2005" },
      { "name": "Notable Alumnus 2", "designation": "IAS Officer / Entrepreneur / relevant", "batch": "2010" }
    ],
    "hostel_info": {
      "available": true,
      "boys_hostels": 3,
      "girls_hostels": 2,
      "total_capacity": 1500,
      "fees_per_year": 80000,
      "facilities": ["24/7 Security", "Wi-Fi", "Mess", "Laundry", "Common Room", "Indoor Games"],
      "notes": "Allotment on merit-cum-availability basis. Outstation students given priority."
    },
    "campus_area": "150 acres",
    "total_students": 4500,
    "faculty_count": 280,
    "student_faculty_ratio": "16:1"
  }
}`
}

// ── SEO BLOG GENERATION ───────────────────────────────────────────

export const BLOG_GENERATION_SYSTEM = `You are an expert education content writer specializing in Maharashtra college admissions, Indian engineering and MBA colleges, and student counseling. You write clear, factual, SEO-optimized articles for students and parents.

Return ONLY valid JSON. Never include markdown code blocks. Write in a helpful, authoritative tone.`

export function buildBlogPrompt(topic: string, keyword: string, wordCount = 1200): string {
  return `Write a complete SEO blog article on: "${topic}"
Target keyword: "${keyword}" | Target length: ~${wordCount} words

Return this exact JSON:
{
  "title": "Compelling title with the target keyword",
  "excerpt": "2-sentence summary (150 chars max)",
  "body": "Full HTML article with proper <h2>, <h3>, <p>, <ul>, <ol> tags. Include: intro paragraph, 4-6 H2 sections, a FAQ section with 5 Q&As, and a conclusion with CTA to contact CollegePune counselors.",
  "category": "Admission Tips | Exam Updates | College Reviews | Career Guides | Scholarship News",
  "tags": ["5-7 relevant tags"],
  "read_time": "6 min read",
  "meta_title": "Title for SEO (max 70 chars with keyword)",
  "meta_desc": "Meta description (max 160 chars with keyword and CTA)"
}`
}

// ── CITY PAGE GENERATION ──────────────────────────────────────────

export const CITY_PAGE_SYSTEM = `You are a Maharashtra education expert who creates informative, SEO-optimized city landing pages for college discovery. Content must be unique per city-stream combination, factually accurate, and helpful for students.

Return ONLY valid JSON. No markdown or extra text.`

export function buildCityPagePrompt(city: string, stream: string, topColleges: string[]): string {
  return `Generate content for a landing page: "${stream} Colleges in ${city}, Maharashtra"

Top colleges in this city for ${stream}: ${topColleges.join(', ')}

Return this exact JSON:
{
  "title": "${stream} Colleges in ${city} — Fees, Rankings & Admissions 2025",
  "intro": "3-paragraph intro (300 words) covering: why ${city} for ${stream}, key stats (colleges count, avg fees, placements), admission season overview. Mention specific colleges by name.",
  "faqs": [
    {"q": "Which is the best ${stream} college in ${city}?", "a": "Detailed answer mentioning top 3 colleges with reasons..."},
    {"q": "What is the fee range for ${stream} in ${city}?", "a": "Accurate fee range with examples..."},
    {"q": "What entrance exams are required for ${stream} in ${city}?", "a": "List relevant exams with brief details..."},
    {"q": "Is hostel facility available in ${city} ${stream} colleges?", "a": "Detailed answer..."},
    {"q": "What is the admission process for ${stream} colleges in ${city}?", "a": "Step-by-step process..."}
  ],
  "cta_text": "Get free personalized counseling for ${stream} admissions in ${city}",
  "meta_title": "Best ${stream} Colleges in ${city} 2025 — Fees, Cutoff & Admissions | CollegePune",
  "meta_desc": "Explore top ${stream} colleges in ${city} with fees, placements, NAAC grades and admission details. Compare and get free counseling. Updated 2025."
}`
}

// ── FAQ GENERATION ────────────────────────────────────────────────

export function buildFAQPrompt(collegeName: string, stream: string): string {
  return `Generate 10 comprehensive FAQs for: "${collegeName}" (${stream} college in Maharashtra)

Return JSON array:
[
  {"q": "Question?", "a": "Detailed, factual answer in 2-3 sentences."},
  ... (10 total)
]

Cover: admission process, fees, entrance exams, placements, hostel, ranking, scholarship, notable alumni, campus facilities, course duration.`
}
