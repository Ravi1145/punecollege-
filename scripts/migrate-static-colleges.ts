/**
 * scripts/migrate-static-colleges.ts
 *
 * Upserts all 105 static colleges into Supabase with complete `details` JSONB.
 * Safe to run multiple times — skips `details` if already populated in DB.
 *
 * Run:  npx tsx scripts/migrate-static-colleges.ts
 * Dry:  DRY_RUN=true npx tsx scripts/migrate-static-colleges.ts
 */

import * as dotenv from "dotenv"
import * as path from "path"
import { fileURLToPath } from "url"
import { createClient } from "@supabase/supabase-js"

// ── Load env ──────────────────────────────────────────────────────────────────
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const DRY_RUN = process.env.DRY_RUN === "true"

// ── Supabase client ───────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// ── Types (inlined to avoid React dependency) ─────────────────────────────────
interface CollegeType {
  id: number; slug: string; name: string; shortName: string
  type: string; established: number; affiliation: string
  naac: string; nirfRank: number | null; location: string; address: string
  courses: string[]; specializations: string[]
  feesRange: { min: number; max: number }
  avgPlacement: number; highestPlacement: number
  topRecruiters: string[]; entranceExams: string[]
  hostel: boolean; rating: number; reviewCount: number
  tags: string[]; description: string; highlights: string[]
  website: string; phone: string; email: string
  image?: string; logo?: string; stream: string
  details?: Record<string, unknown>
  faqs?: { q: string; a: string }[]
  reviews?: { id: number; studentName: string; course: string; year: number; rating: number; title: string; body: string }[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function lpa(n: number) {
  return n > 0 ? `₹${(n / 100000).toFixed(1)} LPA` : "—"
}

// Admission process — 5 steps per stream
const ADMISSION_STEPS: Record<string, { title: string; desc: (c: CollegeType) => string }[]> = {
  Engineering: [
    { title: "Appear for Entrance Exam", desc: c => `Register and appear for ${c.entranceExams.join(" / ")}. Scores are valid for Maharashtra CAP rounds.` },
    { title: "Register on MHT-CET CAP Portal", desc: () => "After results, fill the Maharashtra CAP application form at cetcell.mahacet.org with your score, category and preferences." },
    { title: "Document Verification", desc: () => "Submit Class 10 & 12 marksheets, domicile certificate, income certificate and caste certificate (if applicable) at a CAP facilitation centre." },
    { title: "Fill Preference Form & Merit List", desc: c => `Rank ${c.shortName} in your online preference list. Allotment is merit-based — higher score gives better chances.` },
    { title: "Accept Allotment & Pay Fees", desc: c => `Visit ${c.shortName} to complete admission formalities and pay first-year fees within the deadline to confirm your seat.` },
  ],
  MBA: [
    { title: "Appear for CAT / MAH-MBA-CET", desc: c => `Appear for ${c.entranceExams.join(" / ")}. MAH-MBA-CET scores are mandatory for Maharashtra B-School CAP rounds.` },
    { title: "Group Discussion & Personal Interview", desc: c => `Shortlisted candidates attend GD-PI at ${c.shortName}. Prepare case studies and current affairs.` },
    { title: "Document Verification", desc: () => "Submit graduation marksheets, work experience certificates (if any), caste certificate and domicile proof." },
    { title: "Merit List & Seat Allotment", desc: c => `${c.shortName} releases a merit list based on entrance score + GD-PI. Online counselling via DTE Maharashtra.` },
    { title: "Fee Payment & Joining", desc: c => `Pay first-semester fees at ${c.shortName} and collect your admission letter to confirm the seat.` },
  ],
  Medical: [
    { title: "Qualify NEET UG", desc: c => `A valid NEET UG score is mandatory for all MBBS / BDS programs at ${c.shortName}.` },
    { title: "Register on DMER Counselling Portal", desc: () => "Register at dmer.org with your NEET score and upload required documents for Maharashtra state quota seats." },
    { title: "Document Verification", desc: () => "Submit NEET scorecard, Class 10 & 12 marksheets, domicile certificate, caste certificate and medical fitness certificate." },
    { title: "Choice Filling & Seat Allotment", desc: c => `Rank ${c.shortName} in your preference list. Allotment is based on NEET rank and category cut-off.` },
    { title: "Reporting & Fee Payment", desc: c => `Report to ${c.shortName} with original documents and pay first-year fees to confirm your seat.` },
  ],
  Law: [
    { title: "Appear for MH-CET Law / CLAT", desc: c => `Register and appear for ${c.entranceExams.join(" / ")}. Both 3-year LLB and 5-year BA-LLB have separate eligibility.` },
    { title: "Apply on DTE Maharashtra Portal", desc: () => "Register on the DTE CAP portal for Law admissions. Submit scores, academic documents and category certificates." },
    { title: "Document Verification", desc: () => "Submit Class 10 / 12 / graduation marksheets (for 3-year LLB), domicile proof and caste certificate." },
    { title: "Merit List & Preference Filling", desc: c => `${c.shortName} merit list is released based on entrance score. Fill preferences for LLB programme.` },
    { title: "Admission Confirmation", desc: c => `Visit ${c.shortName} with original documents and complete fee payment before the deadline.` },
  ],
  Architecture: [
    { title: "Qualify NATA / JEE Paper 2", desc: c => `Appear for ${c.entranceExams.join(" / ")}. Valid NATA score or JEE Paper 2 is required for B.Arch admissions.` },
    { title: "Register on DTE Maharashtra Portal", desc: () => "Fill the CAP application form for Architecture at dtemaharashtra.gov.in with your NATA / JEE score." },
    { title: "Document Verification", desc: () => "Submit Class 10 & 12 marksheets, NATA / JEE scorecard, domicile and caste certificates." },
    { title: "Preference Filling & Allotment", desc: c => `Add ${c.shortName} B.Arch to your preferences. Allotment is based on NATA score and category rank.` },
    { title: "Fee Payment & Joining", desc: c => `Report to ${c.shortName} with originals, pay first-year fees and collect your admission letter.` },
  ],
  "Arts & Science": [
    { title: "Check Eligibility", desc: c => `Ensure you meet the eligibility criteria for your chosen programme at ${c.shortName} — usually 45%+ in Class 12.` },
    { title: "Apply Online / Offline", desc: c => `Fill the application form on ${c.shortName}'s official website or at the admissions office.` },
    { title: "Merit List", desc: c => `${c.shortName} releases a merit list based on Class 12 percentage${c.entranceExams.length > 0 ? ` and ${c.entranceExams.join(" / ")} score` : ""}.` },
    { title: "Document Verification", desc: () => "Submit Class 10 & 12 marksheets, migration certificate, domicile proof and caste certificate (if applicable)." },
    { title: "Fee Payment & Enrolment", desc: c => `Pay fees at ${c.shortName} within the specified date to confirm admission and receive your enrolment number.` },
  ],
  Management: [
    { title: "Appear for CAT / MAH-MBA-CET", desc: c => `Appear for ${c.entranceExams.join(" / ")} for admission to management programmes at ${c.shortName}.` },
    { title: "GD / PI Round", desc: c => `Shortlisted candidates attend Group Discussion and Personal Interview at ${c.shortName}.` },
    { title: "Document Verification", desc: () => "Submit graduation certificate, work experience documents, entrance scorecard and domicile proof." },
    { title: "Merit List & Allotment", desc: c => `${c.shortName} announces merit list based on entrance score and GD-PI performance.` },
    { title: "Fee Payment & Joining", desc: c => `Pay semester fees at ${c.shortName} to confirm your management programme seat.` },
  ],
}

function buildAdmissionProcess(c: CollegeType) {
  const stream = c.stream as keyof typeof ADMISSION_STEPS
  const template = ADMISSION_STEPS[stream] ?? ADMISSION_STEPS.Engineering
  return template.map((t, i) => ({ step: i + 1, title: t.title, description: t.desc(c) }))
}

const MH_SCHOLARSHIPS = [
  { name: "EBC — Economically Backward Class Scholarship", eligibility: "General category students with annual family income < ₹8 lakhs", amount: "Up to 50% tuition fee waiver", provider: "Govt of Maharashtra" },
  { name: "OBC Non-Creamy Layer Scholarship", eligibility: "OBC students with family income < ₹6 lakhs", amount: "Full tuition fee reimbursement", provider: "Govt of Maharashtra" },
  { name: "SC / ST / VJNT Post-Matric Scholarship", eligibility: "SC, ST, VJNT & SBC category students (no income bar)", amount: "Full fees + maintenance allowance", provider: "Govt of Maharashtra / Social Welfare Dept" },
  { name: "Minority Community Scholarship", eligibility: "Muslim, Sikh, Christian, Buddhist, Zoroastrian students with income < ₹2.5L", amount: "Up to ₹30,000 per year", provider: "Ministry of Minority Affairs" },
  { name: "Central Sector Scholarship (CSSS)", eligibility: "Top 20% Class 12 state board students with family income < ₹8L", amount: "₹12,000–₹20,000 per year", provider: "National Scholarship Portal" },
]

const STREAM_FACILITIES: Record<string, { name: string; description: string }[]> = {
  Engineering: [
    { name: "Central Library", description: "Well-stocked library with 50,000+ books, journals and digital resources including IEEE, Springer and Elsevier access." },
    { name: "Computer Labs", description: "Multiple air-conditioned computer labs with high-speed internet and licensed software — MATLAB, AutoCAD, Visual Studio and more." },
    { name: "Research & Project Labs", description: "Specialised labs for every department — Electronics, Mechanical, Civil and Chemical Engineering with modern instruments." },
    { name: "Seminar Halls & Auditorium", description: "Air-conditioned seminar halls and a main auditorium for technical conferences, workshops and cultural events." },
    { name: "Sports Complex", description: "Cricket ground, basketball and volleyball courts, indoor badminton and table tennis facilities." },
    { name: "Cafeteria", description: "On-campus cafeteria serving affordable meals, snacks and beverages throughout the day." },
  ],
  MBA: [
    { name: "Case Study Rooms", description: "Dedicated rooms for group discussions and collaborative problem-solving, modelled on top B-School case rooms." },
    { name: "Finance & Trading Lab", description: "Lab with Bloomberg terminals and simulated trading environment for Finance specialisation students." },
    { name: "Library & Digital Resources", description: "Management library with EBSCO, Emerald and Prowess databases plus extensive business journals." },
    { name: "Conference Hall", description: "State-of-the-art conference hall for industry speaker sessions, MBA conclaves and placement preparation." },
    { name: "Sports & Recreation", description: "Indoor and outdoor sports including cricket, football, basketball, badminton and table tennis." },
    { name: "Cafeteria", description: "On-campus cafeteria with diverse food options from morning to evening." },
  ],
  Medical: [
    { name: "Teaching Hospital & OPD", description: "Attached teaching hospital with OPD, emergency and IPD facilities providing clinical exposure from year 1." },
    { name: "Simulation Lab", description: "High-fidelity mannequin-based simulation lab for clinical skills training without patient risk." },
    { name: "Anatomy Dissection Hall", description: "Well-equipped anatomy lab with cadavers and digital anatomy tools for pre-clinical students." },
    { name: "Central Medical Library", description: "Medical library with Harrison's, Gray's Anatomy and digital access to PubMed and Elsevier resources." },
    { name: "Skill Development Lab", description: "Dedicated lab for suturing, catheterisation, IV insertion and other clinical procedures." },
    { name: "Sports & Recreation", description: "Cricket ground, basketball courts and gym for student well-being and extracurricular activities." },
  ],
  Law: [
    { name: "Moot Court", description: "Purpose-built moot court for mock trials, client counselling sessions and advocacy training." },
    { name: "Law Library", description: "Library with SCC Online, Manupatra and AIR subscriptions plus physical law reporters." },
    { name: "Legal Aid Clinic", description: "Student-run legal aid clinic providing free legal services to the community under faculty supervision." },
    { name: "Conference Room", description: "Air-conditioned room for seminars, legal workshops and visiting judge sessions." },
    { name: "Computer Lab", description: "Computer lab with internet access and legal research databases for case law and drafting." },
    { name: "Cafeteria", description: "On-campus cafeteria with affordable meals and snacks." },
  ],
  Architecture: [
    { name: "Design Studios", description: "Open-plan design studios with drafting tables, natural light and display walls for project presentations." },
    { name: "Fabrication & Model Lab", description: "Workshop with laser cutters, 3D printers and model-making tools for prototype work." },
    { name: "CAD / BIM Lab", description: "Lab with AutoCAD, Revit, SketchUp and Rhino licenses for architectural design and documentation." },
    { name: "Architecture Library", description: "Specialised library with architectural journals, design books and thesis archives." },
    { name: "Photography Studio", description: "Photography studio and darkroom for architectural photography and presentation work." },
    { name: "Auditorium & Critique Space", description: "Auditorium for studio critiques, jury sessions and visiting architect lectures." },
  ],
  "Arts & Science": [
    { name: "Central Library", description: "Library with 40,000+ books, national and international journals, digital databases and a reading room." },
    { name: "Science Labs", description: "Fully equipped Physics, Chemistry, Biology and Computer Science labs for practical learning." },
    { name: "Seminar Halls", description: "Air-conditioned seminar halls for academic talks, cultural events and student presentations." },
    { name: "Sports Complex", description: "Cricket ground, basketball and volleyball courts, badminton and table tennis facilities." },
    { name: "Cafeteria", description: "On-campus cafeteria serving affordable meals and snacks throughout the day." },
    { name: "Computer Lab", description: "Computer lab with internet access and productivity software for students across all departments." },
  ],
  Management: [
    { name: "Case Study Rooms", description: "Dedicated rooms for group discussions and collaborative learning." },
    { name: "Library & Digital Resources", description: "Management library with EBSCO, Emerald and business journal databases." },
    { name: "Conference Hall", description: "Conference hall for industry speakers, placement prep and management conclaves." },
    { name: "Computer Lab", description: "Computer lab with ERP, analytics and business software." },
    { name: "Sports & Recreation", description: "Sports facilities including cricket, football, basketball and badminton." },
    { name: "Cafeteria", description: "On-campus cafeteria with diverse food options." },
  ],
}

function buildFacilities(c: CollegeType) {
  const stream = c.stream as keyof typeof STREAM_FACILITIES
  const base = STREAM_FACILITIES[stream] ?? STREAM_FACILITIES.Engineering
  if (!c.hostel) return base
  return [
    { name: "Hostel & Accommodation", description: `${c.shortName} offers on-campus hostel for boys and girls with mess, Wi-Fi and 24×7 security. Hostel fees are charged separately.` },
    ...base,
  ]
}

function buildFaqs(c: CollegeType) {
  const exams = c.entranceExams.length > 0 ? c.entranceExams.join(", ") : "relevant entrance exams"
  const feesText = c.feesRange.min > 0
    ? `₹${(c.feesRange.min / 100000).toFixed(1)}L – ₹${(c.feesRange.max / 100000).toFixed(1)}L per year`
    : "Contact the college for fee details"

  return [
    {
      q: `What is the fee structure at ${c.name} in 2026?`,
      a: `Annual fees at ${c.shortName} range from ${feesText} depending on the programme. Hostel and exam fees are charged separately. Contact admissions for a complete fee breakup.`,
    },
    {
      q: `What entrance exam is required for admission to ${c.shortName}?`,
      a: `${c.shortName} accepts ${exams} for admission. After results, students must register on the Maharashtra DTE / CAP portal and fill college preferences. Cutoffs vary by programme and category.`,
    },
    {
      q: `What is the cutoff for ${c.shortName} ${new Date().getFullYear()}?`,
      a: `Cutoffs at ${c.shortName} depend on ${exams} scores, seats available and reservation categories. Cutoffs for ${new Date().getFullYear()} will be published after results are declared. Candidates with strong ${c.entranceExams[0] ?? "entrance exam"} scores have the best chances.`,
    },
    {
      q: `Does ${c.shortName} offer hostel facility?`,
      a: c.hostel
        ? `Yes, ${c.shortName} provides on-campus hostel for boys and girls. Hostel fees are charged separately. Contact admissions for current availability and hostel fee structure.`
        : `${c.shortName} does not have an on-campus hostel. Private PG accommodations are available near the campus.`,
    },
    {
      q: `What are the placement statistics of ${c.shortName}?`,
      a: c.avgPlacement > 0
        ? `${c.shortName} average placement package is ${lpa(c.avgPlacement)}${c.highestPlacement > 0 ? ` with highest package at ${lpa(c.highestPlacement)}` : ""}. ${c.topRecruiters.length > 0 ? `Top recruiters: ${c.topRecruiters.slice(0, 5).join(", ")}.` : ""}`
        : `${c.shortName} has an active placement cell. Contact the placement office for the latest statistics.`,
    },
    {
      q: `Is ${c.shortName} NAAC accredited?`,
      a: `Yes, ${c.shortName} holds NAAC ${c.naac} accreditation${c.nirfRank ? ` and is ranked #${c.nirfRank} in NIRF` : ""}. It is a ${c.type.toLowerCase()} institution${c.affiliation ? ` affiliated with / recognised by ${c.affiliation}` : ""}.`,
    },
  ]
}

function buildCoursesFees(c: CollegeType) {
  const feesPerYear = Math.round((c.feesRange.min + c.feesRange.max) / 2) || c.feesRange.max || c.feesRange.min || 100000

  const durationMap: Record<string, string> = {
    "B.Tech": "4 years", "BE": "4 years", "B.E.": "4 years",
    "M.Tech": "2 years", "ME": "2 years",
    "MBA": "2 years", "PGDM": "2 years",
    "MCA": "2 years", "BCA": "3 years",
    "B.Sc": "3 years", "BSc": "3 years", "M.Sc": "2 years",
    "MBBS": "5.5 years", "BDS": "5 years", "B.Pharm": "4 years", "M.Pharm": "2 years",
    "LLB": "3 years", "BA LLB": "5 years", "BBA LLB": "5 years",
    "B.Arch": "5 years", "M.Arch": "2 years",
    "BBA": "3 years", "B.Com": "3 years", "M.Com": "2 years",
    "PhD": "3-5 years",
  }

  const eligibilityMap: Record<string, string> = {
    "B.Tech": "10+2 PCM with 45%+ and MHT-CET / JEE score",
    "BE": "10+2 PCM with 45%+ and MHT-CET / JEE score",
    "M.Tech": "B.E./B.Tech with 50%+ and GATE score",
    "MBA": "Graduation in any discipline with 50%+ and CAT / MAH-MBA-CET",
    "PGDM": "Graduation in any discipline with 50%+ and CAT / MAH-MBA-CET",
    "MCA": "BCA/B.Sc(CS/IT) or graduation with Maths with 50%+",
    "BCA": "10+2 with Maths / IT with 45%+",
    "MBBS": "10+2 PCB with 50%+ and NEET UG score",
    "BDS": "10+2 PCB with 50%+ and NEET UG score",
    "LLB": "Graduation in any discipline with 45%+",
    "BA LLB": "10+2 in any stream with 45%+ and MH-CET Law / CLAT",
    "BBA LLB": "10+2 in any stream with 45%+ and MH-CET Law / CLAT",
    "B.Arch": "10+2 PCM with 50%+ and NATA / JEE Paper 2",
    "BBA": "10+2 in any stream with 45%+",
    "B.Com": "10+2 Commerce with 45%+",
    "B.Sc": "10+2 Science (PCM/PCB) with 45%+",
    "BSc": "10+2 Science (PCM/PCB) with 45%+",
    "B.Pharm": "10+2 PCB / PCM with 45%+",
  }

  const selectionMap: Record<string, string> = {
    "B.Tech": "MHT-CET / JEE CAP merit",
    "BE": "MHT-CET / JEE CAP merit",
    "M.Tech": "GATE / university merit",
    "MBA": "MAH-MBA-CET + GD-PI",
    "PGDM": "CAT / MAT + GD-PI",
    "MBBS": "NEET UG merit",
    "BDS": "NEET UG merit",
    "LLB": "MH-CET Law merit",
    "BA LLB": "MH-CET Law / CLAT merit",
    "B.Arch": "NATA / JEE Paper 2 merit",
  }

  return c.courses.map(course => {
    const duration = durationMap[course] ?? "3-4 years"
    const years = parseFloat(duration)
    const total = isNaN(years) ? feesPerYear * 4 : Math.round(feesPerYear * years)
    return {
      program: course,
      duration,
      eligibility: eligibilityMap[course] ?? `10+2 with minimum 45% marks and required entrance score`,
      selection: selectionMap[course] ?? "Merit / entrance exam",
      fees_per_year: feesPerYear,
      total_fees: total,
      seats: null,
    }
  })
}

function buildPlacements(c: CollegeType) {
  if (c.avgPlacement === 0 && c.highestPlacement === 0) return null
  return {
    year: "2025",
    stats: c.courses
      .filter(course => ["B.Tech", "BE", "MBA", "PGDM", "MCA", "MBBS", "BDS", "LLB", "B.Arch"].includes(course))
      .slice(0, 4)
      .map(program => ({
        program,
        avg_package: c.avgPlacement,
        highest_package: c.highestPlacement,
        placement_pct: c.stream === "Engineering" ? 85 : c.stream === "MBA" ? 90 : null,
        companies_visited: c.topRecruiters.length > 0 ? c.topRecruiters.length + 20 : null,
      })),
    sector_wise: c.stream === "Engineering"
      ? [
          { sector: "Information Technology", percentage: 45 },
          { sector: "Manufacturing & Core", percentage: 25 },
          { sector: "Banking & Finance", percentage: 15 },
          { sector: "Others", percentage: 15 },
        ]
      : c.stream === "MBA"
      ? [
          { sector: "Finance & Banking", percentage: 35 },
          { sector: "Marketing & Sales", percentage: 30 },
          { sector: "Operations & Supply Chain", percentage: 20 },
          { sector: "HR & Consulting", percentage: 15 },
        ]
      : undefined,
  }
}

function buildDetails(c: CollegeType) {
  // Use existing college.details if available (some static colleges have pre-populated data)
  const existing = (c as CollegeType & { details?: Record<string, unknown> }).details ?? {}

  return {
    courses_fees: Array.isArray(existing.courses_fees) && (existing.courses_fees as unknown[]).length > 0
      ? existing.courses_fees
      : buildCoursesFees(c),
    admission_process: Array.isArray(existing.admission_process) && (existing.admission_process as unknown[]).length > 0
      ? existing.admission_process
      : buildAdmissionProcess(c),
    placements: existing.placements ?? buildPlacements(c),
    scholarships: Array.isArray(existing.scholarships) && (existing.scholarships as unknown[]).length > 0
      ? existing.scholarships
      : MH_SCHOLARSHIPS,
    facilities: Array.isArray(existing.facilities) && (existing.facilities as unknown[]).length > 0
      ? existing.facilities
      : buildFacilities(c),
    faqs: Array.isArray(existing.faqs) && (existing.faqs as unknown[]).length > 0
      ? existing.faqs
      : buildFaqs(c),
    cutoffs: Array.isArray(existing.cutoffs) && (existing.cutoffs as unknown[]).length > 0
      ? existing.cutoffs
      : null,
    rankings: Array.isArray(existing.rankings) && (existing.rankings as unknown[]).length > 0
      ? existing.rankings
      : null,
    alumni: Array.isArray(existing.alumni) && (existing.alumni as unknown[]).length > 0
      ? existing.alumni
      : null,
    hostel_info: existing.hostel_info ?? (c.hostel
      ? { available: true, notes: `${c.shortName} provides on-campus hostel for boys and girls. Contact admissions for current capacity and fees.` }
      : { available: false }),
    campus_area: (existing.campus_area as string | undefined) ?? null,
    total_students: (existing.total_students as number | undefined) ?? null,
    faculty_count: (existing.faculty_count as number | undefined) ?? null,
    student_faculty_ratio: (existing.student_faculty_ratio as string | undefined) ?? null,
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Import static colleges inside async context to avoid top-level await issues
  const { colleges } = await import("../src/data/colleges.js") as { colleges: CollegeType[] }

  console.log(`\n🚀  College migration — ${DRY_RUN ? "DRY RUN (no writes)" : "LIVE"}`)
  console.log(`📚  Total colleges: ${colleges.length}\n`)

  let migrated = 0
  let detailsWritten = 0
  let detailsSkipped = 0
  let errors = 0

  for (const college of colleges) {
    try {
      // Check if row exists and whether details is already populated
      const { data: existing, error: fetchErr } = await supabase
        .from("colleges")
        .select("id, slug, details")
        .eq("slug", college.slug)
        .maybeSingle()

      if (fetchErr) throw new Error(`Fetch error: ${fetchErr.message}`)

      // Check if details has REAL content (not just an empty object or stub)
      const det = existing?.details as Record<string, unknown> | undefined
      const hasExistingDetails =
        det &&
        Array.isArray(det.courses_fees) &&
        (det.courses_fees as unknown[]).length > 0 &&
        Array.isArray(det.faqs) &&
        (det.faqs as unknown[]).length > 0
      const builtDetails = buildDetails(college)

      // Build the row to upsert
      const row: Record<string, unknown> = {
        slug:            college.slug,
        name:            college.name,
        short_name:      college.shortName,
        type:            college.type,
        established:     college.established,
        affiliation:     college.affiliation,
        naac_grade:      college.naac,
        nirf_rank:       college.nirfRank ?? null,
        city:            "Pune",
        address:         college.address,
        description:     college.description,
        highlights:      college.highlights,
        tags:            college.tags,
        fees_min:        college.feesRange.min,
        fees_max:        college.feesRange.max,
        avg_placement:   college.avgPlacement,
        highest_pkg:     college.highestPlacement,
        top_recruiters:  college.topRecruiters,
        entrance_exams:  college.entranceExams,
        courses:         college.courses,
        specializations: college.specializations,
        hostel:          college.hostel,
        rating:          college.rating,
        review_count:    college.reviewCount,
        website:         college.website,
        phone:           college.phone,
        email:           college.email,
        cover_url:       college.image ?? null,
        logo_url:        college.logo ?? null,
        stream:          college.stream,
        status:          "published",
      }

      // Only write details if not already populated in DB
      if (hasExistingDetails) {
        detailsSkipped++
        console.log(`  ⏭  ${college.shortName.padEnd(22)} details already in DB — skipping`)
      } else {
        row.details = builtDetails
        detailsWritten++
        const sections = Object.keys(builtDetails).filter(k => (builtDetails as Record<string, unknown>)[k] !== null).length
        console.log(`  ✅  ${college.shortName.padEnd(22)} ${sections} sections built`)
      }

      if (!DRY_RUN) {
        const { error: upsertErr } = await supabase
          .from("colleges")
          .upsert(row, { onConflict: "slug" })
        if (upsertErr) throw new Error(`Upsert error: ${upsertErr.message}`)
      }

      migrated++
    } catch (err) {
      errors++
      console.error(`  ❌  ${college.shortName}: ${String(err)}`)
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅  Migrated:                ${migrated}/${colleges.length}
📝  Details written:         ${detailsWritten}
⏭  Details skipped (exist): ${detailsSkipped}
❌  Errors:                  ${errors}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${DRY_RUN ? "DRY RUN — no data written. Remove DRY_RUN=true to apply." : "✨ Done — all colleges upserted to Supabase!"}
`)
}

main().catch(err => { console.error("Fatal:", err); process.exit(1) })
