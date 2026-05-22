'use client'
import { useState, useRef } from 'react'
import { importJSONAction } from './actions'

/* ─── Full-field college template (all 11 tabs) ─────────────────── */
const COLLEGE_TEMPLATE = [
  {
    // ══════════════════════════════════════════════
    // REQUIRED
    // ══════════════════════════════════════════════
    name: "College of Engineering Pune",
    slug: "coep-pune",

    // ══════════════════════════════════════════════
    // OVERVIEW — basic identity
    // ══════════════════════════════════════════════
    short_name: "COEP",
    type: "Government",           // Government | Private | Deemed | Autonomous
    established: 1854,
    affiliation: "Savitribai Phule Pune University",
    stream: "Engineering",        // Engineering | MBA | Medical | Arts | Science | Commerce | Law | Design | Other
    description: "COEP Technological University, established in 1854, is one of India's premier engineering institutions ranked in NIRF Top 50.",
    status: "published",          // draft | pending | published | rejected

    // Location
    location: "Shivajinagar, Pune",
    address: "Wellesley Road, Shivajinagar",
    city: "Pune",
    state: "Maharashtra",

    // Contact
    website: "https://coep.org.in",
    phone: "+91-20-25507000",
    email: "info@coep.org.in",

    // Media
    logo_url: "https://example.com/logos/coep.png",
    cover_url: "https://example.com/covers/coep.jpg",

    // Rankings
    naac_grade: "A++",
    nirf_rank: 49,
    rating: 4.5,
    review_count: 320,

    // Courses & entrance
    courses: ["BTech", "MTech", "MBA", "PhD"],
    specializations: ["Computer Engineering", "Mechanical", "Civil", "Electronics"],
    entrance_exams: ["MHT-CET", "JEE Main", "GATE"],

    // Fees & placements (summary numbers)
    fees_min: 80000,              // ₹/yr integer
    fees_max: 180000,
    avg_placement: 800000,        // ₹/yr integer
    highest_pkg: 4500000,
    top_recruiters: ["TCS", "Infosys", "ISRO", "L&T", "Persistent"],

    // Amenities
    hostel: true,
    highlights: ["NIRF Top 50", "NBA Accredited", "100% Placement"],
    tags: ["government", "engineering", "nirf-ranked", "naac-a++"],

    // Featured on homepage
    featured: true,
    featured_order: 1,

    // ══════════════════════════════════════════════
    // DETAILS — powers all 11 profile tabs
    // ══════════════════════════════════════════════
    details: {

      // ── Overview extras ────────────────────────
      campus_area: "30 acres",
      total_students: 4800,
      faculty_count: 320,
      student_faculty_ratio: "1:15",

      // ── TAB: Courses & Fees ────────────────────
      courses_fees: [
        {
          program: "BTech Computer Engineering",
          level: "UG",
          duration: "4 Years",
          eligibility: "HSC + MHT-CET / JEE Main",
          selection: "MHT-CET CAP Round",
          seats: 120,
          fees_per_year: 96000,
          total_fees: 384000,
        },
        {
          program: "BTech Mechanical Engineering",
          level: "UG",
          duration: "4 Years",
          eligibility: "HSC + MHT-CET / JEE Main",
          selection: "MHT-CET CAP Round",
          seats: 90,
          fees_per_year: 96000,
          total_fees: 384000,
        },
        {
          program: "MTech Computer Engineering",
          level: "PG",
          duration: "2 Years",
          eligibility: "BTech + GATE",
          selection: "GATE Score / CAP",
          seats: 24,
          fees_per_year: 110000,
          total_fees: 220000,
        },
        {
          program: "MBA",
          level: "PG",
          duration: "2 Years",
          eligibility: "Graduation + MAH-MBA-CET / CAT",
          selection: "MAH-MBA-CET CAP Round",
          seats: 60,
          fees_per_year: 150000,
          total_fees: 300000,
        },
      ],

      // ── TAB: Admissions ────────────────────────
      admission_process: [
        { step: 1, title: "Entrance Exam", description: "Appear for MHT-CET 2026 (May) or JEE Main 2026 (Jan/Apr). Register at cetcell.mahacet.org." },
        { step: 2, title: "Merit List & Document Verification", description: "MHT-CET / JEE percentile merit list released. Verify documents at facilitation centre." },
        { step: 3, title: "CAP Round 1 — Online Preference Form", description: "Fill college preferences at cap.mahacet.org. COEP is usually in the top 5 choices for CS/Mech." },
        { step: 4, title: "Seat Allotment", description: "Provisional allotment letter issued. Accept seat and pay confirmation fees online." },
        { step: 5, title: "Reporting to College", description: "Report to COEP with original documents for verification within the stipulated date." },
      ],

      // ── TAB: Placements ────────────────────────
      placements: {
        year: "2025",
        stats: [
          {
            program: "BTech Computer Engineering",
            avg_package: 1200000,
            median_package: 1000000,
            highest_package: 4500000,
            students_placed: 115,
            total_eligible: 120,
            companies_visited: 85,
            placement_pct: 96,
          },
          {
            program: "BTech Mechanical Engineering",
            avg_package: 700000,
            median_package: 650000,
            highest_package: 2200000,
            students_placed: 80,
            total_eligible: 90,
            companies_visited: 55,
            placement_pct: 89,
          },
          {
            program: "MBA",
            avg_package: 950000,
            median_package: 900000,
            highest_package: 2000000,
            students_placed: 57,
            total_eligible: 60,
            companies_visited: 40,
            placement_pct: 95,
          },
        ],
        sector_wise: [
          { sector: "IT & Software", percentage: 52 },
          { sector: "Core Engineering", percentage: 22 },
          { sector: "BFSI", percentage: 12 },
          { sector: "Consulting", percentage: 8 },
          { sector: "Others", percentage: 6 },
        ],
      },

      // ── TAB: Cutoffs ───────────────────────────
      cutoffs: [
        { program: "BTech Computer Engineering", exam: "MHT-CET", year: "2025", general: "99.8 percentile", obc: "99.5 percentile", sc: "97 percentile", st: "92 percentile", ews: "99.6 percentile" },
        { program: "BTech Mechanical Engineering", exam: "MHT-CET", year: "2025", general: "98.5 percentile", obc: "97 percentile", sc: "94 percentile", st: "88 percentile", ews: "98 percentile" },
        { program: "BTech Computer Engineering", exam: "JEE Main", year: "2025", general: "98 percentile", obc: "97 percentile", sc: "93 percentile", st: "88 percentile" },
        { program: "MBA", exam: "MAH-MBA-CET", year: "2025", general: "98 percentile", obc: "95 percentile", sc: "90 percentile", st: "85 percentile" },
      ],

      // ── TAB: Rankings ──────────────────────────
      rankings: [
        { agency: "NIRF", category: "Engineering", rank: 49, year: "2025" },
        { agency: "NIRF", category: "Overall", rank: 76, year: "2025" },
        { agency: "NAAC", category: "Accreditation", rank: null, grade: "A++", year: "2023" },
        { agency: "QS Asia", category: "Engineering", rank: 251, year: "2025" },
        { agency: "India Today", category: "Engineering", rank: 18, year: "2025" },
      ],

      // ── TAB: Scholarships ──────────────────────
      scholarships: [
        { name: "Government of Maharashtra Scholarship", eligibility: "Family income < ₹8L/yr, Min 60% in HSC", amount: "Full tuition waiver", provider: "Govt of Maharashtra" },
        { name: "EBC Scholarship (Economically Backward Class)", eligibility: "Income 8–25L/yr, HSC 50%+", amount: "₹50,000/yr", provider: "MahaDBT" },
        { name: "SC/ST Government Scholarship", eligibility: "SC/ST category students", amount: "Full fees + maintenance", provider: "Social Justice Dept, Maharashtra" },
        { name: "COEP Merit Scholarship", eligibility: "Top 5% of class, Min 8.5 CGPA", amount: "₹30,000/yr", provider: "COEP Alumni Foundation" },
        { name: "National Scholarship Portal (NSP)", eligibility: "Family income < ₹6L/yr", amount: "Up to ₹50,000/yr", provider: "Ministry of Education" },
      ],

      // ── TAB: Facilities ────────────────────────
      facilities: [
        { name: "Central Library", description: "1.2 lakh books, 200+ journals, 24/7 digital access, 500-seat reading hall with Wi-Fi." },
        { name: "Computing Labs", description: "45 fully equipped labs with latest software — MATLAB, AutoCAD, SolidWorks, AWS, Azure." },
        { name: "Sports Complex", description: "Cricket ground, football field, basketball/volleyball courts, gymnasium, and swimming pool." },
        { name: "Auditorium", description: "2,500-seat state-of-the-art air-conditioned auditorium for cultural and academic events." },
        { name: "Health Centre", description: "On-campus medical facility with MBBS doctor, ambulance, and first aid 24×7." },
        { name: "Cafeteria", description: "Three cafeterias serving hygienic vegetarian and non-vegetarian food at subsidised rates." },
        { name: "Innovation Lab (TBI)", description: "Technology Business Incubator with funding support for student startups — 20+ active startups." },
        { name: "Internet & Wi-Fi", description: "1 Gbps campus-wide Wi-Fi with 24/7 connectivity across all blocks and hostels." },
      ],

      // ── TAB: Facilities — Hostel info ──────────
      hostel_info: {
        available: true,
        boys_hostels: 5,
        girls_hostels: 3,
        total_capacity: 2400,
        fees_per_year: 72000,
        facilities: ["Wi-Fi", "Mess", "Gym", "24/7 Security", "Laundry", "Common Room", "Indoor Games", "Hot Water"],
        notes: "Hostel allotment is based on distance from hometown. Priority given to outstation students.",
      },

      // ── TAB: Alumni ────────────────────────────
      alumni: [
        { name: "Nandan Nilekani", designation: "Co-Founder, Infosys & Architect of Aadhaar", batch: "1978" },
        { name: "Raghunath Mashelkar", designation: "Former Director General, CSIR", batch: "1966" },
        { name: "Mohnish Pabrai", designation: "Founder, Pabrai Investment Funds", batch: "1983" },
        { name: "Sanjay Bakshi", designation: "Professor & Value Investor", batch: "1988" },
      ],

      // ── TAB: FAQs ──────────────────────────────
      faqs: [
        { q: "What is the MHT-CET cutoff for COEP Computer Engineering 2026?", a: "The MHT-CET 2025 cutoff for COEP BTech Computer Engineering (General category) was approximately 99.8 percentile. For OBC it was 99.5 percentile, SC was 97 percentile." },
        { q: "What is the annual fee for BTech at COEP Pune?", a: "The annual tuition fee for BTech at COEP is approximately ₹96,000 per year. Total 4-year cost is around ₹3.84 lakhs. Hostel fee is additional ₹72,000/year." },
        { q: "Does COEP have hostel facility?", a: "Yes, COEP has separate hostel facilities for boys (5 hostels) and girls (3 hostels) with a total capacity of 2,400 students. Hostel fees are approximately ₹72,000/year including mess charges." },
        { q: "What is the average placement package at COEP?", a: "The average placement package at COEP for BTech Computer Engineering is ₹12 LPA (2025 batch). Highest package was ₹45 LPA. Top recruiters include TCS, Infosys, ISRO, L&T, and Persistent Systems." },
        { q: "Is COEP a government college?", a: "Yes, COEP Technological University is an autonomous government-aided institution established in 1854. It is affiliated with Savitribai Phule Pune University and accredited NAAC A++." },
        { q: "How to get direct admission in COEP?", a: "COEP does not offer direct admissions. All seats are filled through the Maharashtra CAP (Centralised Admission Process) based on MHT-CET or JEE Main scores. NRI/Management quota is also available for a small number of seats." },
      ],
    },
  },
]

/* ─── Full-field blog template ───────────────────────────────────── */
const BLOG_TEMPLATE = [
  {
    title: "Top Engineering Colleges in Pune 2026 | Fees, NIRF & Placements",
    slug: "top-engineering-colleges-pune-2026",
    excerpt: "Complete guide to the best engineering colleges in Pune for 2026 admissions. Compare fees, NIRF ranks, MHT-CET cutoffs and placement records.",
    content: "## Introduction\n\nPune is home to some of India's finest engineering colleges...\n\n## Top 10 Engineering Colleges\n\n### 1. COEP Technological University\n\nEstablished in 1854...\n\n## How to Choose the Right College\n\n...\n\n## Conclusion\n\nChoose wisely!",
    category: "engineering",      // engineering | mba | medical | arts | science | admission | career | scholarship
    tags: ["engineering", "pune", "mht-cet", "2026", "nirf"],
    cover_url: "https://example.com/blog/engineering-colleges-pune.jpg",
    read_time: 8,
    status: "published",          // draft | pending | published | rejected
    published_at: "2026-05-23T10:00:00+05:30",
    author_id: null,              // UUID from profiles table, or null for "Editorial Team"
  },
]

/* ─── Field reference tables ─────────────────────────────────────── */
const COLLEGE_FIELDS = [
  // Top-level
  { field: "name",            type: "string",   req: true,  note: "Full official college name" },
  { field: "slug",            type: "string",   req: true,  note: "Unique URL id e.g. coep-pune" },
  { field: "short_name",      type: "string",   req: false, note: "Abbreviation shown in tables" },
  { field: "type",            type: "string",   req: false, note: "Government | Private | Deemed | Autonomous" },
  { field: "established",     type: "number",   req: false, note: "Year as integer e.g. 1854" },
  { field: "affiliation",     type: "string",   req: false, note: "University name" },
  { field: "stream",          type: "string",   req: false, note: "Engineering | MBA | Medical | Arts …" },
  { field: "description",     type: "string",   req: false, note: "About paragraph (plain text)" },
  { field: "status",          type: "string",   req: false, note: "draft | pending | published | rejected" },
  { field: "location",        type: "string",   req: false, note: "Area, City (display text)" },
  { field: "address",         type: "string",   req: false, note: "Full street address" },
  { field: "city",            type: "string",   req: false, note: "e.g. Pune" },
  { field: "state",           type: "string",   req: false, note: "e.g. Maharashtra" },
  { field: "website",         type: "string",   req: false, note: "Full URL with https://" },
  { field: "phone",           type: "string",   req: false, note: "+91-20-XXXXXXXX" },
  { field: "email",           type: "string",   req: false, note: "Official contact email" },
  { field: "logo_url",        type: "string",   req: false, note: "Public URL for logo image" },
  { field: "cover_url",       type: "string",   req: false, note: "Public URL for cover image" },
  { field: "naac_grade",      type: "string",   req: false, note: "A++ | A+ | A | B++ | B+ | B" },
  { field: "nirf_rank",       type: "number",   req: false, note: "National NIRF rank integer" },
  { field: "rating",          type: "number",   req: false, note: "0–5 decimal e.g. 4.5" },
  { field: "review_count",    type: "number",   req: false, note: "Total reviews count" },
  { field: "courses",         type: "array",    req: false, note: '["BTech","MTech","MBA"]' },
  { field: "specializations", type: "array",    req: false, note: '["Computer Engg","Mech"]' },
  { field: "entrance_exams",  type: "array",    req: false, note: '["MHT-CET","JEE Main"]' },
  { field: "fees_min",        type: "number",   req: false, note: "₹/yr integer (no commas)" },
  { field: "fees_max",        type: "number",   req: false, note: "₹/yr integer" },
  { field: "avg_placement",   type: "number",   req: false, note: "₹/yr integer e.g. 800000" },
  { field: "highest_pkg",     type: "number",   req: false, note: "₹/yr integer" },
  { field: "top_recruiters",  type: "array",    req: false, note: '["TCS","Infosys"]' },
  { field: "hostel",          type: "boolean",  req: false, note: "true | false" },
  { field: "highlights",      type: "array",    req: false, note: '["NIRF Top 50","NBA"]' },
  { field: "tags",            type: "array",    req: false, note: '["government","nirf-ranked"]' },
  { field: "featured",        type: "boolean",  req: false, note: "Show on homepage" },
  { field: "featured_order",  type: "number",   req: false, note: "Sort order if featured" },
  // details sub-fields
  { field: "details.campus_area",          type: "string",   req: false, note: "e.g. \"30 acres\"" },
  { field: "details.total_students",       type: "number",   req: false, note: "Integer" },
  { field: "details.faculty_count",        type: "number",   req: false, note: "Integer" },
  { field: "details.student_faculty_ratio",type: "string",   req: false, note: "e.g. \"1:15\"" },
  { field: "details.courses_fees",         type: "array",    req: false, note: "→ Courses & Fees tab" },
  { field: "details.admission_process",    type: "array",    req: false, note: "→ Admissions tab" },
  { field: "details.placements",           type: "object",   req: false, note: "→ Placements tab" },
  { field: "details.cutoffs",              type: "array",    req: false, note: "→ Cutoffs tab" },
  { field: "details.rankings",             type: "array",    req: false, note: "→ Rankings tab" },
  { field: "details.scholarships",         type: "array",    req: false, note: "→ Scholarships tab" },
  { field: "details.facilities",           type: "array",    req: false, note: "→ Facilities tab" },
  { field: "details.hostel_info",          type: "object",   req: false, note: "→ Facilities/Hostel tab" },
  { field: "details.alumni",               type: "array",    req: false, note: "→ Alumni tab" },
  { field: "details.faqs",                 type: "array",    req: false, note: "→ FAQs tab [{q,a}]" },
]

const BLOG_FIELDS = [
  { field: "title",        type: "string",      req: true,  note: "Full SEO title" },
  { field: "slug",         type: "string",      req: true,  note: "URL slug e.g. top-colleges-pune-2026" },
  { field: "excerpt",      type: "string",      req: false, note: "150–200 char card summary" },
  { field: "content",      type: "string",      req: false, note: "Markdown body (## headings, **bold**)" },
  { field: "category",     type: "string",      req: false, note: "engineering | mba | medical | admission …" },
  { field: "tags",         type: "array",       req: false, note: '["pune","mht-cet","2026"]' },
  { field: "cover_url",    type: "string",      req: false, note: "Public image URL" },
  { field: "read_time",    type: "number",      req: false, note: "Estimated minutes to read" },
  { field: "status",       type: "string",      req: false, note: "draft | pending | published | rejected" },
  { field: "published_at", type: "string",      req: false, note: "ISO 8601 e.g. 2026-05-23T10:00:00+05:30" },
  { field: "author_id",    type: "string|null", req: false, note: "UUID from profiles, or null" },
]

type ImportType = 'colleges' | 'blogs'

export default function ImportPage() {
  const [activeType, setActiveType] = useState<ImportType>('colleges')
  const [jsonText, setJsonText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success?: number; failed?: number; errors?: string[]; error?: string
  } | null>(null)
  const [copied, setCopied] = useState<'colleges' | 'blogs' | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const template = activeType === 'colleges' ? COLLEGE_TEMPLATE : BLOG_TEMPLATE
  const templateStr = JSON.stringify(template, null, 2)

  function copyTemplate() {
    navigator.clipboard.writeText(templateStr)
    setCopied(activeType)
    setTimeout(() => setCopied(null), 2000)
  }

  function loadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setJsonText(ev.target?.result as string)
    reader.readAsText(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!jsonText.trim()) return
    setLoading(true)
    setResult(null)
    try {
      const fd = new FormData()
      fd.set('type', activeType)
      fd.set('json', jsonText)
      const res = await importJSONAction(fd)
      const data = (res.colleges ?? res.blogs) as {
        success: number; failed: number; errors: string[]
      } | undefined
      if (res.error) setResult({ error: res.error })
      else if (data) setResult({ success: data.success, failed: data.failed, errors: data.errors })
    } catch (err) {
      setResult({ error: String(err) })
    } finally {
      setLoading(false)
    }
  }

  const fields = activeType === 'colleges' ? COLLEGE_FIELDS : BLOG_FIELDS

  // live JSON validation
  let jsonStatus: { valid: boolean; count?: number; msg: string } = { valid: false, msg: '' }
  if (jsonText.trim()) {
    try {
      const parsed = JSON.parse(jsonText)
      if (!Array.isArray(parsed)) jsonStatus = { valid: false, msg: '⚠ Must be a JSON array [ … ]' }
      else jsonStatus = { valid: true, count: parsed.length, msg: `✓ Valid JSON — ${parsed.length} record${parsed.length !== 1 ? 's' : ''} detected` }
    } catch {
      jsonStatus = { valid: false, msg: '⚠ Invalid JSON syntax' }
    }
  }

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">JSON Import</h1>
        <p className="text-gray-500 text-sm mt-1">
          Bulk import colleges (all 11 tabs) or blog posts. Upsert by{' '}
          <code className="bg-gray-100 px-1 rounded text-xs font-mono">slug</code> — existing records are updated, new ones are created.
        </p>
      </div>

      {/* Type tabs */}
      <div className="flex gap-2">
        {(['colleges', 'blogs'] as ImportType[]).map((t) => (
          <button
            key={t}
            onClick={() => { setActiveType(t); setResult(null); setJsonText('') }}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeType === t
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t === 'colleges' ? '🏫 Colleges' : '📝 Blog Posts'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Left: input ── */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* File upload */}
          <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center bg-white">
            <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={loadFile} />
            <button type="button" onClick={() => fileRef.current?.click()}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              📁 Upload .json file
            </button>
            <span className="text-gray-400 text-sm"> or paste below</span>
          </div>

          {/* Textarea */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">JSON Array *</label>
              {jsonText && (
                <button type="button" onClick={() => { setJsonText(''); setResult(null) }}
                  className="text-xs text-gray-400 hover:text-red-500">✕ Clear</button>
              )}
            </div>
            <textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              rows={22}
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              placeholder={`[\n  {\n    "name": "...",\n    "slug": "..."\n  }\n]`}
            />
            {jsonText && (
              <p className={`text-xs mt-1 ${jsonStatus.valid ? 'text-green-600' : 'text-red-500'}`}>
                {jsonStatus.msg}
              </p>
            )}
          </div>

          <button type="submit" disabled={loading || !jsonText.trim() || !jsonStatus.valid}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors">
            {loading ? '⏳ Importing…' : `📥 Import ${activeType === 'colleges' ? 'Colleges' : 'Blog Posts'}`}
          </button>

          {/* Result */}
          {result && (
            <div className={`rounded-xl p-4 border ${
              result.error ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
            }`}>
              {result.error ? (
                <p className="text-red-700 font-medium text-sm">❌ {result.error}</p>
              ) : (
                <>
                  <p className="font-semibold text-green-800 text-sm">
                    ✅ {result.success} imported · {result.failed} failed
                  </p>
                  {result.errors && result.errors.length > 0 && (
                    <ul className="mt-2 space-y-0.5 max-h-40 overflow-y-auto">
                      {result.errors.map((e, i) => (
                        <li key={i} className="text-xs text-red-600">• {e}</li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          )}
        </form>

        {/* ── Right: template + field ref ── */}
        <div className="space-y-4">

          {/* Template preview */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-semibold text-gray-700">
                📋 Full {activeType === 'colleges' ? 'College (all 11 tabs)' : 'Blog'} Template
              </span>
              <div className="flex gap-2">
                <button type="button" onClick={copyTemplate}
                  className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium">
                  {copied === activeType ? '✓ Copied!' : '📋 Copy'}
                </button>
                <button type="button" onClick={() => setJsonText(templateStr)}
                  className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium">
                  ← Load
                </button>
              </div>
            </div>
            <pre className="px-4 py-3 text-xs text-gray-600 overflow-x-auto max-h-72 overflow-y-auto bg-white font-mono leading-relaxed">
              {templateStr}
            </pre>
          </div>

          {/* Field reference */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">
                📖 Field Reference — {activeType === 'colleges' ? 'Colleges' : 'Blog Posts'}
              </span>
              <span className="text-xs text-gray-400">{fields.length} fields</span>
            </div>
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600 whitespace-nowrap">Field</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">Type</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-600">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {fields.map((f) => (
                    <tr key={f.field} className={`hover:bg-gray-50 ${f.field.startsWith('details.') ? 'bg-blue-50/40' : ''}`}>
                      <td className="px-3 py-1.5 font-mono text-blue-700 whitespace-nowrap">
                        {f.field}
                        {f.req && <span className="ml-1 text-red-500">*</span>}
                      </td>
                      <td className="px-3 py-1.5 text-gray-500 whitespace-nowrap">{f.type}</td>
                      <td className="px-3 py-1.5 text-gray-600">{f.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-4 py-2 text-xs text-gray-400 border-t border-gray-100">
              <span className="text-red-500">*</span> required · <span className="inline-block w-3 h-3 bg-blue-50 border border-blue-100 rounded align-middle mr-1" />highlighted rows = inside <code className="font-mono">details</code> object
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
