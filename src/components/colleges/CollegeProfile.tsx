"use client"
import { useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  MapPin, Phone, Mail, Globe, Award, TrendingUp, Users, BookOpen,
  Star, ChevronRight, MessageSquare, Building2, CheckCircle2,
  GraduationCap, Landmark, Wifi, Home, Trophy, ChevronDown, ChevronUp,
  IndianRupee, Percent, Calendar, BarChart2, Layers
} from "lucide-react"
import { College } from "@/types"
import type { CollegeDetails } from "@/lib/db"
import { formatCurrency, formatFeesRange, getNaacColor, getTypeColor, cn } from "@/lib/utils"
import CompareButton from "@/components/ui/CompareButton"

// Heavy below-fold components — loaded only when needed
const EnquiryForm = dynamic(() => import("@/components/leads/EnquiryForm"), { ssr: false })
const CounsellingBooking = dynamic(() => import("@/components/leads/CounsellingBooking"), { ssr: false })
const ReviewSection = dynamic(() => import("@/components/colleges/ReviewSection"), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="space-y-3">
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
        <div className="h-3 bg-gray-100 rounded w-4/6" />
      </div>
    </div>
  ),
})

interface CollegeProfileProps {
  college: College
  details?: CollegeDetails
}

const TABS = [
  { id: "overview",    label: "Overview" },
  { id: "courses",     label: "Courses & Fees" },
  { id: "admissions",  label: "Admissions" },
  { id: "placements",  label: "Placements" },
  { id: "cutoffs",     label: "Cutoffs" },
  { id: "rankings",    label: "Rankings" },
  { id: "scholarships",label: "Scholarships" },
  { id: "facilities",  label: "Facilities" },
  { id: "alumni",      label: "Alumni" },
  { id: "reviews",     label: "Reviews" },
  { id: "faqs",        label: "FAQs" },
]

function SectionCard({ title, icon: Icon, children }: { title: string; icon?: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-50">
        {Icon && <Icon className="w-4 h-4 text-orange-500 flex-shrink-0" />}
        <h2 className="font-bold text-gray-900 text-sm sm:text-base">{title}</h2>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  )
}

function TableRow({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <tr className={cn("border-b border-gray-50 last:border-0", highlight && "bg-orange-50/50")}>
      <td className="py-3 pr-4 text-sm text-gray-500 font-medium w-2/5">{label}</td>
      <td className="py-3 text-sm text-gray-900 font-semibold">{value}</td>
    </tr>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm font-semibold text-gray-900">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />}
      </button>
      {open && <p className="text-sm text-gray-600 leading-relaxed pb-4">{a}</p>}
    </div>
  )
}

// ── Phase-1 fallback helpers ─────────────────────────────────────────────────

const ADMISSION_STEPS: Record<string, { title: string; desc: (c: College) => string }[]> = {
  Engineering: [
    { title: "Appear for Entrance Exam", desc: c => `Register and appear for ${c.entranceExams.join(" / ")}. Scores are valid for Maharashtra CAP rounds.` },
    { title: "Register on MHT-CET CAP Portal", desc: () => "After results, fill the Maharashtra CAP application form at cetcell.mahacet.org with your score, category and preferences." },
    { title: "Document Verification", desc: () => "Submit Class 10 & 12 marksheets, domicile certificate, income certificate and caste certificate (if applicable) at a CAP facilitation centre." },
    { title: "Fill Preference Form", desc: c => `Rank ${c.shortName} in your online preference list. Allotment is merit-based — the higher your score, the better your chances.` },
    { title: "Accept Allotment & Pay Fees", desc: c => `Visit ${c.shortName} to complete admission formalities and pay first-year fees within the deadline to confirm your seat.` },
  ],
  MBA: [
    { title: "Appear for CAT / MAH-MBA-CET", desc: c => `Appear for ${c.entranceExams.join(" / ")}. MAH-MBA-CET scores are mandatory for Maharashtra B-School CAP rounds.` },
    { title: "Group Discussion & Personal Interview", desc: c => `Shortlisted candidates are called for GD-PI at ${c.shortName}. Prepare case studies and current affairs.` },
    { title: "Document Verification", desc: () => "Submit graduation marksheets, work experience certificates (if any), caste certificate and domicile proof." },
    { title: "Merit List & Seat Allotment", desc: c => `${c.shortName} releases a merit list based on entrance score + GD-PI performance. Online counselling via DTE Maharashtra.` },
    { title: "Fee Payment & Joining", desc: c => `Pay the first-semester fees at ${c.shortName} and collect your admission letter to confirm the seat.` },
  ],
  Medical: [
    { title: "Qualify NEET UG", desc: c => `A valid NEET UG score is mandatory for all MBBS / BDS programs at ${c.shortName}.` },
    { title: "Register on DMER Counselling Portal", desc: () => "Register at dmer.org with your NEET score and upload required documents for Maharashtra state quota seats." },
    { title: "Document Verification", desc: () => "Submit NEET scorecard, Class 10 & 12 marksheets, domicile certificate, caste certificate and medical fitness certificate." },
    { title: "Choice Filling & Seat Allotment", desc: c => `Rank ${c.shortName} in your preference list. Allotment is based on NEET rank and category cut-off.` },
    { title: "Reporting & Fee Payment", desc: c => `Report to ${c.shortName} with original documents and pay first-year fees to confirm your MBBS / BDS seat.` },
  ],
  Law: [
    { title: "Appear for MH-CET Law / CLAT", desc: c => `Register and appear for ${c.entranceExams.join(" / ")}. Both 3-year LLB and 5-year BA-LLB have separate eligibility.` },
    { title: "Apply on DTE Maharashtra Portal", desc: () => "Register on the DTE CAP portal for Law admissions. Submit scores, academic documents and category certificates." },
    { title: "Document Verification", desc: () => "Submit Class 10 / 12 / graduation marksheets (for 3-year LLB), domicile proof and caste certificate." },
    { title: "Merit List & Preference Filling", desc: c => `${c.shortName} merit list is released based on entrance score. Fill preferences for your preferred LLB programme.` },
    { title: "Admission Confirmation", desc: c => `Visit ${c.shortName} with original documents and complete fee payment before the deadline.` },
  ],
  Architecture: [
    { title: "Qualify NATA / JEE Paper 2", desc: c => `Appear for ${c.entranceExams.join(" / ")}. A valid NATA score or JEE Paper 2 is required for B.Arch admissions.` },
    { title: "Register on DTE Maharashtra Portal", desc: () => "Fill the CAP application form for Architecture at dtemaharashtra.gov.in with your NATA / JEE score." },
    { title: "Document Verification", desc: () => "Submit Class 10 & 12 marksheets, NATA / JEE scorecard, domicile and caste certificates." },
    { title: "Preference Filling & Allotment", desc: c => `Add ${c.shortName} B.Arch to your preferences. Allotment is based on NATA score and category rank.` },
    { title: "Fee Payment & Joining", desc: c => `Report to ${c.shortName} with originals, pay first-year fees and collect your admission letter.` },
  ],
  "Arts & Science": [
    { title: "Check Eligibility", desc: c => `Ensure you meet the eligibility criteria for your chosen programme at ${c.shortName} — usually 45%+ in Class 12 from a recognised board.` },
    { title: "Apply Online / Offline", desc: c => `Fill the application form on ${c.shortName}'s official website or visit the admissions office. Pay the application fee.` },
    { title: "Merit List", desc: c => `${c.shortName} releases a merit list based on Class 12 percentage${c.entranceExams.length > 0 ? ` and ${c.entranceExams.join(" / ")} score` : ""}.` },
    { title: "Document Verification", desc: () => "Submit Class 10 & 12 marksheets, migration certificate, domicile proof and caste certificate (if applicable)." },
    { title: "Fee Payment & Enrolment", desc: c => `Pay fees at ${c.shortName} within the specified date to confirm admission and receive your enrolment number.` },
  ],
  Management: [
    { title: "Appear for CAT / MAH-MBA-CET", desc: c => `Appear for ${c.entranceExams.join(" / ")} for admission to management programmes at ${c.shortName}.` },
    { title: "GD / PI Round", desc: c => `Shortlisted candidates attend Group Discussion and Personal Interview at ${c.shortName}.` },
    { title: "Document Verification", desc: () => "Submit graduation certificate, work experience documents, entrance scorecard and domicile proof." },
    { title: "Merit List & Allotment", desc: c => `${c.shortName} announces its merit list based on entrance score and GD-PI performance.` },
    { title: "Fee Payment & Joining", desc: c => `Pay the semester fees at ${c.shortName} to confirm your management programme seat.` },
  ],
}

function buildAdmissionProcess(college: College) {
  const stream = college.stream as keyof typeof ADMISSION_STEPS
  const template = ADMISSION_STEPS[stream] ?? ADMISSION_STEPS.Engineering
  return template.map((t, i) => ({ step: i + 1, title: t.title, description: t.desc(college) }))
}

const MH_SCHOLARSHIPS = [
  { name: "EBC — Economically Backward Class Scholarship", eligibility: "General category students with annual family income < ₹8 lakhs", amount: "Up to 50% tuition fee waiver", provider: "Govt of Maharashtra" },
  { name: "OBC Non-Creamy Layer Scholarship", eligibility: "OBC students with family income < ₹6 lakhs", amount: "Full tuition fee reimbursement", provider: "Govt of Maharashtra" },
  { name: "SC / ST / VJNT Post-Matric Scholarship", eligibility: "SC, ST, VJNT & SBC category students (no income bar)", amount: "Full fees + maintenance allowance", provider: "Govt of Maharashtra / Social Welfare Dept" },
  { name: "Minority Community Scholarship", eligibility: "Muslim, Sikh, Christian, Buddhist, Zoroastrian students with income < ₹2.5L", amount: "Up to ₹30,000 per year", provider: "Ministry of Minority Affairs" },
  { name: "Central Sector Scholarship (CSSS)", eligibility: "Top 20% students in Class 12 state board with family income < ₹8L", amount: "₹12,000–₹20,000 per year", provider: "National Scholarship Portal (NSP)" },
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
    { name: "Case Study Rooms", description: "Dedicated rooms designed for group discussions and collaborative problem-solving, modelled on top B-School case rooms." },
    { name: "Finance & Trading Lab", description: "Lab equipped with Bloomberg terminals and simulated trading environment for Finance specialisation students." },
    { name: "Library & Digital Resources", description: "Management library with EBSCO, Emerald and Prowess databases, plus an extensive collection of business journals." },
    { name: "Conference Hall", description: "State-of-the-art conference hall for industry speaker sessions, MBA conclaves and placement preparation." },
    { name: "Sports & Recreation", description: "Indoor and outdoor sports including cricket, football, basketball, badminton and table tennis." },
    { name: "Cafeteria", description: "On-campus cafeteria with diverse food options from morning to evening." },
  ],
  Medical: [
    { name: "Teaching Hospital & OPD", description: "Attached teaching hospital providing clinical exposure from year 1, with emergency, IPD and OPD facilities." },
    { name: "Simulation Lab", description: "High-fidelity mannequin-based simulation lab for clinical skills training without patient risk." },
    { name: "Anatomy Dissection Hall", description: "Well-equipped anatomy lab with cadavers and digital anatomy tools for pre-clinical students." },
    { name: "Central Medical Library", description: "Medical library with Harrison's, Gray's Anatomy, and digital access to PubMed and Elsevier resources." },
    { name: "Skill Development Lab", description: "Dedicated skills lab for suturing, catheterisation, IV insertion and other clinical procedures." },
    { name: "Sports & Recreation", description: "Cricket ground, basketball courts and gym for student well-being and extracurricular activities." },
  ],
  Law: [
    { name: "Moot Court", description: "Purpose-built moot court room for mock trials, client counselling sessions and advocacy training." },
    { name: "Law Library", description: "Comprehensive library with SCC Online, Manupatra and AIR subscriptions plus physical law reporters and journals." },
    { name: "Legal Aid Clinic", description: "Student-run legal aid clinic providing free legal services to the community under faculty supervision." },
    { name: "Conference Room", description: "Air-conditioned room for seminars, legal workshops and visiting judge / advocate sessions." },
    { name: "Computer Lab", description: "Computer lab with internet access and legal research databases for case law research and drafting." },
    { name: "Cafeteria", description: "On-campus cafeteria with affordable meals and snacks." },
  ],
  Architecture: [
    { name: "Design Studios", description: "Large open-plan design studios with drafting tables, natural light and display walls for project presentations and jury reviews." },
    { name: "Fabrication & Model Lab", description: "Workshop with laser cutters, 3D printers and traditional model-making tools for prototype and scale model work." },
    { name: "CAD / BIM Lab", description: "Dedicated lab with AutoCAD, Revit, SketchUp and Rhino licenses for architectural design and documentation." },
    { name: "Architecture Library", description: "Specialised library with architectural journals (AR, Domus), design books and thesis archives." },
    { name: "Photography Studio", description: "Photography studio and darkroom for architectural photography and presentation work." },
    { name: "Auditorium & Critique Space", description: "Auditorium for studio critiques, jury sessions and visiting architect lectures." },
  ],
  "Arts & Science": [
    { name: "Central Library", description: "Library with 40,000+ books, national and international journals, digital databases and a dedicated reading room." },
    { name: "Science Labs", description: "Fully equipped Physics, Chemistry, Biology and Computer Science labs for practical learning." },
    { name: "Seminar Halls", description: "Air-conditioned seminar halls for academic talks, cultural events and student presentations." },
    { name: "Sports Complex", description: "Cricket ground, basketball and volleyball courts, badminton and table tennis facilities." },
    { name: "Cafeteria", description: "On-campus cafeteria serving affordable meals and snacks throughout the day." },
    { name: "Computer Lab", description: "Computer lab with internet access and productivity software for students across all departments." },
  ],
  Management: [
    { name: "Case Study Rooms", description: "Dedicated rooms for group discussions and collaborative learning, modelled on top B-School case rooms." },
    { name: "Library & Digital Resources", description: "Management library with EBSCO, Emerald and business journal databases." },
    { name: "Conference Hall", description: "Conference hall for industry speaker sessions, placement preparation and management conclaves." },
    { name: "Computer Lab", description: "Computer lab with ERP, analytics and business software for management students." },
    { name: "Sports & Recreation", description: "Sports facilities including cricket, football, basketball and badminton." },
    { name: "Cafeteria", description: "On-campus cafeteria with diverse food options." },
  ],
}

function getFacilitiesFallback(college: College) {
  const stream = college.stream as keyof typeof STREAM_FACILITIES
  const base = STREAM_FACILITIES[stream] ?? STREAM_FACILITIES.Engineering
  if (!college.hostel) return base
  return [
    { name: "Hostel & Accommodation", description: `${college.shortName} offers on-campus hostel for boys and girls with mess, Wi-Fi and 24×7 security. Hostel fees are charged separately.` },
    ...base,
  ]
}

function buildFaqFallback(college: College): { q: string; a: string }[] {
  const exams = college.entranceExams.length > 0 ? college.entranceExams.join(", ") : "relevant entrance exams"
  const feesText = college.feesRange.min > 0
    ? `₹${(college.feesRange.min / 100000).toFixed(1)}L – ₹${(college.feesRange.max / 100000).toFixed(1)}L per year`
    : "Contact the college for the latest fee schedule"
  const affil = college.affiliation || "Savitribai Phule Pune University"

  return [
    {
      q: `What is the fee structure at ${college.name} in 2026?`,
      a: `Annual fees at ${college.shortName} range from ${feesText} depending on the programme. The fee covers tuition and development charges. Hostel fees, exam fees and other charges are billed separately. Contact the admissions office for the complete fee breakup.`,
    },
    {
      q: `What entrance exam is required for admission to ${college.shortName}?`,
      a: `${college.shortName} accepts ${exams} for admission. After results are declared, students must register on the Maharashtra DTE / CAP portal and fill their college preferences. Cutoffs vary by programme and reservation category.`,
    },
    {
      q: `What is the cutoff for ${college.shortName} ${new Date().getFullYear()}?`,
      a: `Cutoffs at ${college.shortName} depend on ${exams} scores, the number of applicants and category reservation. Cutoffs for ${new Date().getFullYear()} will be published after exam results are declared. Based on previous years, candidates with strong ${college.entranceExams[0] ?? "entrance exam"} scores have the best chances.`,
    },
    {
      q: `Does ${college.shortName} have hostel facility?`,
      a: college.hostel
        ? `Yes, ${college.shortName} provides on-campus hostel accommodation for boys and girls. Hostel fees are charged separately from tuition. Contact the admissions office for current hostel availability and fee structure.`
        : `${college.shortName} does not have an on-campus hostel. However, several private PG accommodations and student hostels are available within 2 km of the campus. The college can help you find suitable accommodation.`,
    },
    {
      q: `What are the placement statistics of ${college.shortName}?`,
      a: college.avgPlacement > 0
        ? `${college.shortName} has an active placement cell. The average package is ${formatCurrency(college.avgPlacement)} LPA${college.highestPlacement > 0 ? ` with the highest package at ${formatCurrency(college.highestPlacement)} LPA` : ""}. ${college.topRecruiters.length > 0 ? `Top recruiters include ${college.topRecruiters.slice(0, 5).join(", ")}.` : ""}`
        : `${college.shortName} has an active placement cell that facilitates campus recruitment every year. Contact the placement office for the latest statistics.`,
    },
    {
      q: `Is ${college.shortName} affiliated to ${affil}?`,
      a: `${college.shortName} is a ${college.type.toLowerCase()} institute${college.affiliation ? ` affiliated to / recognised by ${college.affiliation}` : ` affiliated to ${affil}`}. It holds NAAC ${college.naac} accreditation${college.nirfRank ? ` and is ranked #${college.nirfRank} in NIRF` : ""}. Degrees awarded by ${college.shortName} are recognised by UGC and applicable regulatory bodies.`,
    },
  ]
}
// ─────────────────────────────────────────────────────────────────────────────

export default function CollegeProfile({ college, details }: CollegeProfileProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)

  // FAQs: prefer details.faqs (DB), then college.faqs (static), then auto-generated
  const faqs: { q: string; a: string }[] =
    (Array.isArray(details?.faqs) && details.faqs.length > 0 ? details.faqs : null) ??
    (college as unknown as { faqs?: { q: string; a: string }[] }).faqs ??
    buildFaqFallback(college)

  // Dynamic tabs — hide Alumni when no data (never fabricate real people)
  const visibleTabs = TABS.filter(tab => {
    if (tab.id === "alumni") return Array.isArray(details?.alumni) && details.alumni.length > 0
    return true
  })

  return (
    <div>
      {/* Enquiry modal — only mounted after first open (saves initial JS) */}
      {enquiryOpen && (
        <EnquiryForm
          collegeName={college.name}
          collegeSlug={college.slug}
          courses={college.courses}
          isOpen={enquiryOpen}
          onClose={() => setEnquiryOpen(false)}
        />
      )}

      {/* ── Hero Header ─────────────────────────────────────────── */}
      <div
        className="text-white relative"
        style={{
          backgroundImage: `url('/college-default-banner.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/90 to-[#1E3A5F]/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-blue-300 mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/colleges" className="hover:text-white transition-colors">Colleges</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{college.shortName}</span>
          </nav>

          <div className="flex items-start gap-5 mb-5">
            {/* Logo */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/20 backdrop-blur flex-shrink-0 flex items-center justify-center shadow-lg overflow-hidden">
              {college.logo && !logoError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={college.logo}
                  alt={`${college.shortName} logo`}
                  className="w-full h-full object-contain p-1"
                  onError={() => setLogoError(true)}
                />
              ) : college.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={college.image}
                  alt={`${college.shortName} campus`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-extrabold text-xs sm:text-sm leading-tight text-center px-1">
                  {college.shortName}
                </span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-3xl font-extrabold mb-1 leading-tight">{college.name}</h1>
              <div className="flex items-center gap-1.5 text-blue-300 text-sm mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{college.address}</span>
              </div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {college.naac && (
                  <span className={cn("text-xs px-2.5 py-1 rounded-full font-bold", getNaacColor(college.naac))}>
                    NAAC {college.naac}
                  </span>
                )}
                <span className={cn("text-xs px-2.5 py-1 rounded-full", getTypeColor(college.type))}>
                  {college.type}
                </span>
                {college.established && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-blue-200">
                    Estd. {college.established}
                  </span>
                )}
                {college.nirfRank && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-orange-500 text-white font-bold">
                    NIRF #{college.nirfRank}
                  </span>
                )}
                {college.courses.length > 0 && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-blue-200">
                    {college.courses.length} Courses
                  </span>
                )}
                {college.hostel && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/20 text-green-300">
                    Hostel Available
                  </span>
                )}
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={() => setEnquiryOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-colors whitespace-nowrap"
              >
                Enquire Now
              </button>
              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-colors text-center hidden sm:block"
                >
                  Official Website
                </a>
              )}
            </div>
          </div>

          {/* Quick Stats Bar — data-speakable enables AI Overview to extract fee/placement facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5" data-speakable="true">
            {[
              { label: "Annual Fees", value: formatFeesRange(college.feesRange.min, college.feesRange.max), icon: IndianRupee },
              { label: "Avg Package", value: formatCurrency(college.avgPlacement), icon: TrendingUp },
              { label: "Highest Package", value: formatCurrency(college.highestPlacement), icon: Award },
              { label: "Rating", value: `${college.rating}/5 ⭐`, icon: Star },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white/10 rounded-xl p-3">
                <p className="text-xs text-blue-300 mb-0.5">{label}</p>
                <p className="text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Tab Bar */}
          <div className="flex gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0 border-t border-white/10 mt-2">
            {visibleTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-shrink-0 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-orange-400 text-orange-400"
                    : "border-transparent text-blue-300 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === "overview" && (
              <>
                {/* About — data-speakable enables Google AI Overview extraction */}
                <SectionCard title={`About ${college.name}`} icon={BookOpen}>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4" data-speakable="true">{college.description}</p>
                  {college.highlights.length > 0 && (
                    <div className="bg-orange-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 text-sm mb-3">Key Highlights</h3>
                      <ul className="space-y-2">
                        {college.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </SectionCard>

                {/* Highlights Table */}
                <SectionCard title={`${college.shortName} Highlights`} icon={Layers}>
                  <table className="w-full">
                    <tbody>
                      <TableRow label="Established" value={college.established} />
                      <TableRow label="Type" value={college.type} />
                      <TableRow label="Location" value={college.address} />
                      <TableRow label="Affiliation" value={college.affiliation} />
                      <TableRow label="NAAC Grade" value={<span className="font-bold text-blue-700">NAAC {college.naac}</span>} highlight />
                      {college.nirfRank && <TableRow label="NIRF Rank" value={`#${college.nirfRank}`} highlight />}
                      {details?.campus_area && <TableRow label="Campus Area" value={details.campus_area} />}
                      {details?.total_students && <TableRow label="Total Students" value={details.total_students.toLocaleString()} />}
                      {details?.faculty_count && <TableRow label="Faculty" value={details.faculty_count.toLocaleString()} />}
                      {details?.student_faculty_ratio && <TableRow label="Student:Faculty Ratio" value={details.student_faculty_ratio} />}
                      <TableRow label="Courses Offered" value={college.courses.join(", ")} />
                      <TableRow label="Entrance Exams" value={college.entranceExams.join(", ")} />
                      <TableRow label="Hostel" value={college.hostel ? "Available" : "Not Available"} />
                      {college.website && <TableRow label="Official Website" value={<a href={college.website} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline text-xs">{college.website}</a>} />}
                    </tbody>
                  </table>
                </SectionCard>

                {/* Specializations */}
                {college.specializations.length > 0 && (
                  <SectionCard title="Specializations Offered" icon={GraduationCap}>
                    <div className="flex flex-wrap gap-2">
                      {college.specializations.map(s => (
                        <span key={s} className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full border border-blue-100 font-medium">{s}</span>
                      ))}
                    </div>
                  </SectionCard>
                )}

                {/* Top Recruiters */}
                {college.topRecruiters.length > 0 && (
                  <SectionCard title="Top Recruiters" icon={Trophy}>
                    <div className="flex flex-wrap gap-2">
                      {college.topRecruiters.map(r => (
                        <span key={r} className="bg-gray-50 border border-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-lg">{r}</span>
                      ))}
                    </div>
                  </SectionCard>
                )}

                {/* Entrance Exams */}
                {college.entranceExams.length > 0 && (
                  <SectionCard title="Entrance Exams Accepted" icon={GraduationCap}>
                    <div className="flex flex-wrap gap-2">
                      {college.entranceExams.map(e => (
                        <Link key={e} href="/exams" className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">{e}</Link>
                      ))}
                    </div>
                  </SectionCard>
                )}

                {/* GEO Content Block — AI-readable direct answers */}
                <section className="geo-content bg-blue-50 rounded-2xl border border-blue-100 p-6 text-sm text-gray-700 leading-relaxed space-y-3">
                  <h2 className="font-bold text-gray-900 text-base">
                    {college.name} — Key Facts for 2026
                  </h2>
                  <p>
                    <strong>{college.name}</strong> ({college.shortName}) is a {college.type.toLowerCase()} college
                    located in {college.location}, established in {college.established}.
                    {college.naac && ` It holds NAAC ${college.naac} accreditation`}
                    {college.nirfRank ? ` and is ranked #${college.nirfRank} in NIRF 2025.` : '.'}
                  </p>
                  <p>
                    <strong>Fees:</strong> Annual fees at {college.shortName} range from{' '}
                    ₹{(college.feesRange.min / 100000).toFixed(1)}L to ₹{(college.feesRange.max / 100000).toFixed(1)}L per year
                    depending on the program.{' '}
                    <strong>Placements:</strong> The average placement package is{' '}
                    ₹{(college.avgPlacement / 100000).toFixed(1)} LPA with the highest package reaching{' '}
                    ₹{(college.highestPlacement / 100000).toFixed(1)} LPA.
                  </p>
                  {college.entranceExams.length > 0 && (
                    <p>
                      <strong>Admission:</strong> {college.shortName} accepts{' '}
                      {college.entranceExams.join(', ')} for admission.
                      Candidates must score the required cutoff in these exams to be eligible.
                    </p>
                  )}
                  {college.topRecruiters.length > 0 && (
                    <p>
                      <strong>Top Recruiters:</strong>{' '}
                      {college.topRecruiters.slice(0, 6).join(', ')}{college.topRecruiters.length > 6 ? ' and more.' : '.'}
                    </p>
                  )}
                  {college.hostel && (
                    <p>
                      <strong>Hostel:</strong> {college.shortName} offers on-campus hostel facility for boys and girls.
                    </p>
                  )}
                  <p className="text-xs text-gray-400 pt-1">
                    Source: collegepune.com · Data verified April 2026
                  </p>
                </section>
              </>
            )}

            {/* ── COURSES & FEES TAB ── */}
            {activeTab === "courses" && (
              <>
                {Array.isArray(details?.courses_fees) && details.courses_fees.length > 0 ? (
                  <SectionCard title="Courses & Fees 2026" icon={IndianRupee}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Program</th>
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Duration</th>
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Eligibility</th>
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Selection</th>
                            <th className="text-right py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Fees</th>
                          </tr>
                        </thead>
                        <tbody>
                          {details.courses_fees.map((c, i) => (
                            <tr key={i} className="border-t border-gray-100 hover:bg-orange-50/30 transition-colors">
                              <td className="py-3 px-3 font-semibold text-gray-900">{c.program}</td>
                              <td className="py-3 px-3 text-gray-600">{c.duration}</td>
                              <td className="py-3 px-3 text-gray-600 text-xs">{c.eligibility}</td>
                              <td className="py-3 px-3 text-gray-600 text-xs">{c.selection}</td>
                              <td className="py-3 px-3 text-right">
                                <div className="font-bold text-gray-900">{formatCurrency(c.total_fees)}</div>
                                <div className="text-xs text-gray-400">{formatCurrency(c.fees_per_year)}/yr</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </SectionCard>
                ) : (
                  <SectionCard title="Courses Offered" icon={BookOpen}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {college.courses.map(c => (
                        <div key={c} className="border border-gray-100 rounded-xl p-4 hover:border-orange-200 transition-colors">
                          <BookOpen className="w-4 h-4 text-orange-500 mb-2" />
                          <p className="text-sm font-semibold text-gray-900">{c}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Fees: {formatFeesRange(college.feesRange.min, college.feesRange.max)} / year
                          </p>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                )}
              </>
            )}

            {/* ── ADMISSIONS TAB ── */}
            {activeTab === "admissions" && (
              <>
                {Array.isArray(details?.admission_process) && details.admission_process.length > 0 ? (
                  <SectionCard title="Admission Process 2026" icon={CheckCircle2}>
                    <div className="space-y-4">
                      {details.admission_process.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.step}
                          </div>
                          <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                            <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                            <p className="text-sm text-gray-600 mt-0.5">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                ) : (details as Record<string, unknown>)?.admissions ? (
                  // Admin saved admissions data — render key fields
                  <SectionCard title="Admission Process" icon={CheckCircle2}>
                    {(() => {
                      const adm = (details as Record<string, unknown>).admissions as Record<string, unknown>
                      return (
                        <div className="space-y-4">
                          {Boolean(adm.total_seats) && (
                            <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4">
                              <Users className="w-5 h-5 text-blue-600 flex-shrink-0" />
                              <div>
                                <p className="text-xs text-gray-500 font-medium">Total Seats</p>
                                <p className="text-lg font-bold text-blue-700">{String(adm.total_seats)}</p>
                              </div>
                              {Boolean(adm.categories) && (
                                <p className="text-xs text-gray-600 ml-2">{String(adm.categories)}</p>
                              )}
                            </div>
                          )}
                          {Boolean(adm.process) && (
                            <div>
                              <h3 className="text-sm font-semibold text-gray-800 mb-2">Admission Process</h3>
                              <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans bg-gray-50 rounded-xl p-4">
                                {String(adm.process)}
                              </pre>
                            </div>
                          )}
                          {Boolean(adm.important_dates) && (
                            <div>
                              <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-orange-500" /> Important Dates
                              </h3>
                              <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans bg-orange-50 rounded-xl p-4">
                                {String(adm.important_dates)}
                              </pre>
                            </div>
                          )}
                          {Boolean(adm.application_start) && (
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-50 rounded-xl p-3">
                                <p className="text-xs text-gray-500">Application Opens</p>
                                <p className="text-sm font-semibold text-gray-900">{String(adm.application_start)}</p>
                              </div>
                              {Boolean(adm.application_end) && (
                                <div className="bg-gray-50 rounded-xl p-3">
                                  <p className="text-xs text-gray-500">Application Closes</p>
                                  <p className="text-sm font-semibold text-gray-900">{String(adm.application_end)}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    })()}
                  </SectionCard>
                ) : (
                  <SectionCard title={`Admission Process ${college.shortName} 2026`} icon={CheckCircle2}>
                    <div className="space-y-4">
                      {buildAdmissionProcess(college).map((step) => (
                        <div key={step.step} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.step}
                          </div>
                          <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
                            <p className="font-semibold text-gray-900 text-sm">{step.title}</p>
                            <p className="text-sm text-gray-600 mt-0.5">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                )}

                {/* Entrance Exams */}
                <SectionCard title="Entrance Exams Accepted" icon={GraduationCap}>
                  <div className="flex flex-wrap gap-2">
                    {college.entranceExams.map(e => (
                      <Link key={e} href="/exams" className="bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">{e}</Link>
                    ))}
                  </div>
                </SectionCard>
              </>
            )}

            {/* ── PLACEMENTS TAB ── */}
            {activeTab === "placements" && (
              <>
                {details?.placements ? (
                  <>
                    <SectionCard title={`Placement Statistics ${details.placements.year}`} icon={TrendingUp}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Program</th>
                              <th className="text-right py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Avg Package</th>
                              <th className="text-right py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Highest Pkg</th>
                              <th className="text-right py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Placed%</th>
                              <th className="text-right py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Companies</th>
                            </tr>
                          </thead>
                          <tbody>
                            {details.placements.stats.map((s, i) => (
                              <tr key={i} className="border-t border-gray-100">
                                <td className="py-3 px-3 font-semibold text-gray-900">{s.program}</td>
                                <td className="py-3 px-3 text-right font-bold text-green-700">{formatCurrency(s.avg_package)}</td>
                                <td className="py-3 px-3 text-right font-bold text-orange-600">{formatCurrency(s.highest_package)}</td>
                                <td className="py-3 px-3 text-right">{s.placement_pct ? `${s.placement_pct}%` : "—"}</td>
                                <td className="py-3 px-3 text-right">{s.companies_visited ?? "—"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </SectionCard>

                    {details.placements.sector_wise?.length ? (
                      <SectionCard title="Placement by Sector" icon={BarChart2}>
                        <div className="space-y-3">
                          {details.placements.sector_wise.map((s, i) => (
                            <div key={i}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-700 font-medium">{s.sector}</span>
                                <span className="font-bold text-gray-900">{s.percentage}%</span>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${s.percentage}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </SectionCard>
                    ) : null}
                  </>
                ) : (
                  <SectionCard title="Placement Statistics" icon={TrendingUp}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                      {[
                        { label: "Average Package", value: formatCurrency(college.avgPlacement), color: "text-green-700" },
                        { label: "Highest Package", value: formatCurrency(college.highestPlacement), color: "text-orange-600" },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                          <p className="text-xs text-gray-500 mb-1">{label}</p>
                          <p className={cn("text-base font-bold", color)}>{value}</p>
                        </div>
                      ))}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-3 text-sm">Top Recruiters</h3>
                    <div className="flex flex-wrap gap-2">
                      {college.topRecruiters.map(r => (
                        <span key={r} className="bg-white border border-gray-200 text-sm text-gray-700 px-3 py-1.5 rounded-lg">{r}</span>
                      ))}
                    </div>
                  </SectionCard>
                )}
              </>
            )}

            {/* ── CUTOFFS TAB ── */}
            {activeTab === "cutoffs" && (
              <>
                {(() => {
                  // Normalise: accept both typed CollegeDetails.cutoffs and raw JSONB arrays
                  const rawCutoffs = (details as Record<string, unknown> | undefined)?.cutoffs
                  const cutoffRows: { program: string; exam: string; year?: string; general?: string; obc?: string; sc?: string; st?: string; ews?: string }[] =
                    Array.isArray(rawCutoffs) && rawCutoffs.length > 0
                      ? (rawCutoffs as Record<string, unknown>[]).map(r => ({
                          program: String(r.program ?? r.branch ?? r.course ?? "—"),
                          exam:    String(r.exam ?? r.entrance ?? "—"),
                          year:    r.year ? String(r.year) : undefined,
                          general: r.general != null ? String(r.general) : undefined,
                          obc:     r.obc != null ? String(r.obc) : undefined,
                          sc:      r.sc != null ? String(r.sc) : undefined,
                          st:      r.st != null ? String(r.st) : undefined,
                          ews:     r.ews != null ? String(r.ews) : undefined,
                        }))
                      : []

                  if (cutoffRows.length > 0) return (
                  <SectionCard title="Cutoffs 2025" icon={Percent}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Program</th>
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Exam</th>
                            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">General</th>
                            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">OBC</th>
                            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">SC</th>
                            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">ST</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cutoffRows.map((c, i) => (
                            <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-3 px-3 font-semibold text-gray-900">{c.program}</td>
                              <td className="py-3 px-3 text-gray-600">{c.exam}</td>
                              <td className="py-3 px-3 text-center font-medium text-blue-700">{c.general ?? "—"}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{c.obc ?? "—"}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{c.sc ?? "—"}</td>
                              <td className="py-3 px-3 text-center text-gray-700">{c.st ?? "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </SectionCard>
                  )

                  if (typeof rawCutoffs === 'string' && rawCutoffs.trim()) return (
                  <SectionCard title="Cutoffs" icon={Percent}>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">
                      {rawCutoffs}
                    </pre>
                  </SectionCard>
                  )

                  return (
                  <SectionCard title={`${college.shortName} Cutoffs ${new Date().getFullYear()}`} icon={Percent}>
                    <div className="space-y-4">
                      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                        <p className="text-sm font-semibold text-amber-800 mb-1">2026 Cutoffs — Updated After Results</p>
                        <p className="text-sm text-amber-700">
                          Cutoff data for {college.name} will be updated once{" "}
                          {college.entranceExams.length > 0 ? college.entranceExams.join(" / ") : "entrance exam"}{" "}
                          results are declared. Cutoffs depend on the number of applicants, seats available and category reservation.
                        </p>
                      </div>
                      {college.entranceExams.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-gray-800 mb-2">Entrance Exams Accepted at {college.shortName}</p>
                          <div className="flex flex-wrap gap-2">
                            {college.entranceExams.map(e => (
                              <Link key={e} href="/exams" className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">{e}</Link>
                            ))}
                          </div>
                        </div>
                      )}
                      <p className="text-xs text-gray-400">
                        Based on previous years, candidates with strong {college.entranceExams[0] ?? "entrance exam"} scores across all categories have the best chance of securing admission to {college.shortName}.
                      </p>
                    </div>
                  </SectionCard>
                  )
                })()}
              </>
            )}

            {/* ── RANKINGS TAB ── */}
            {activeTab === "rankings" && (
              <>
                {Array.isArray(details?.rankings) && details.rankings.length > 0 ? (
                  <SectionCard title="Rankings & Accreditations 2025" icon={Trophy}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Agency</th>
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rank / Grade</th>
                            <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Year</th>
                          </tr>
                        </thead>
                        <tbody>
                          {details.rankings.map((r, i) => (
                            <tr key={i} className="border-t border-gray-100">
                              <td className="py-3 px-3 font-semibold text-gray-900">{r.agency}</td>
                              <td className="py-3 px-3 text-gray-600">{r.category}</td>
                              <td className="py-3 px-3 text-center">
                                <span className="bg-orange-100 text-orange-700 font-bold text-xs px-2 py-0.5 rounded-full">
                                  {r.grade ?? (r.rank ? `#${r.rank}` : "—")}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-center text-gray-500">{r.year}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </SectionCard>
                ) : (details as Record<string, unknown>)?.rankings_extra ? (
                  // Admin saved plain-text rankings
                  <SectionCard title="Rankings & Recognition" icon={Trophy}>
                    {college.nirfRank && (
                      <div className="bg-orange-50 rounded-xl p-4 text-center mb-4">
                        <p className="text-3xl font-extrabold text-orange-600">#{college.nirfRank}</p>
                        <p className="text-sm text-gray-600">NIRF Ranking 2025</p>
                      </div>
                    )}
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed font-sans">
                      {String((details as Record<string, unknown>).rankings_extra)}
                    </pre>
                  </SectionCard>
                ) : (
                  <SectionCard title={`${college.shortName} Rankings & Accreditation`} icon={Trophy}>
                    <div className="space-y-4">
                      {college.nirfRank && (
                        <div className="bg-orange-50 rounded-xl p-5 text-center">
                          <p className="text-4xl font-extrabold text-orange-600 mb-1">#{college.nirfRank}</p>
                          <p className="text-sm text-gray-600 font-medium">NIRF Ranking 2025</p>
                          <p className="text-xs text-gray-400 mt-1">National Institutional Ranking Framework, Ministry of Education, Govt of India</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                          <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider mb-1">NAAC Accreditation</p>
                          <p className="text-2xl font-extrabold text-blue-700">{college.naac}</p>
                          <p className="text-xs text-gray-500 mt-1">National Assessment and Accreditation Council</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Institution Type</p>
                          <p className="text-lg font-bold text-gray-800">{college.type}</p>
                          <p className="text-xs text-gray-500 mt-1">{college.affiliation || "SPPU Affiliated"}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        Detailed ranking data from agencies like QS India, India Today, The Week and Outlook will be added shortly. For the latest rankings, visit nirf.org and naac.gov.in.
                      </p>
                    </div>
                  </SectionCard>
                )}
              </>
            )}

            {/* ── SCHOLARSHIPS TAB ── */}
            {activeTab === "scholarships" && (
              <>
                {Array.isArray(details?.scholarships) && details.scholarships.length > 0 ? (
                  <SectionCard title="Scholarships Available" icon={Award}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Scholarship</th>
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Eligibility</th>
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">By</th>
                          </tr>
                        </thead>
                        <tbody>
                          {details.scholarships.map((s, i) => (
                            <tr key={i} className="border-t border-gray-100">
                              <td className="py-3 px-3 font-semibold text-gray-900">{s.name}</td>
                              <td className="py-3 px-3 text-gray-600 text-xs">{s.eligibility}</td>
                              <td className="py-3 px-3 font-bold text-green-700">{s.amount}</td>
                              <td className="py-3 px-3 text-gray-500 text-xs">{s.provider ?? "—"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </SectionCard>
                ) : (
                  <SectionCard title={`Scholarships Available at ${college.shortName}`} icon={Award}>
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">Students at {college.shortName} can apply for the following government scholarships. Applications open on the National Scholarship Portal (scholarships.gov.in) every year.</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Scholarship</th>
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Eligibility</th>
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</th>
                            <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">By</th>
                          </tr>
                        </thead>
                        <tbody>
                          {MH_SCHOLARSHIPS.map((s, i) => (
                            <tr key={i} className="border-t border-gray-100 hover:bg-green-50/30 transition-colors">
                              <td className="py-3 px-3 font-semibold text-gray-900">{s.name}</td>
                              <td className="py-3 px-3 text-gray-600 text-xs">{s.eligibility}</td>
                              <td className="py-3 px-3 font-bold text-green-700">{s.amount}</td>
                              <td className="py-3 px-3 text-gray-500 text-xs">{s.provider}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Apply via scholarships.gov.in · Deadlines are usually September–November each year</p>
                  </SectionCard>
                )}
              </>
            )}

            {/* ── FACILITIES TAB ── */}
            {activeTab === "facilities" && (
              <>
                {Array.isArray(details?.facilities) && details.facilities.length > 0 ? (
                  <SectionCard title="Campus Facilities" icon={Building2}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {details.facilities.map((f, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-4">
                          <p className="font-semibold text-gray-900 text-sm mb-1">{f.name}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                ) : null}

                {details?.hostel_info && (
                  <SectionCard title="Hostel & Accommodation" icon={Home}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                      {details.hostel_info.boys_hostels && <div className="bg-blue-50 rounded-xl p-3 text-center"><p className="text-2xl font-bold text-blue-700">{details.hostel_info.boys_hostels}</p><p className="text-xs text-gray-500">Boys Hostels</p></div>}
                      {details.hostel_info.girls_hostels && <div className="bg-pink-50 rounded-xl p-3 text-center"><p className="text-2xl font-bold text-pink-600">{details.hostel_info.girls_hostels}</p><p className="text-xs text-gray-500">Girls Hostels</p></div>}
                      {details.hostel_info.total_capacity && <div className="bg-green-50 rounded-xl p-3 text-center"><p className="text-2xl font-bold text-green-700">{details.hostel_info.total_capacity.toLocaleString()}</p><p className="text-xs text-gray-500">Total Capacity</p></div>}
                    </div>
                    {details.hostel_info.fees_per_year && <p className="text-sm text-gray-700 mb-3"><span className="font-semibold">Hostel Fees:</span> {formatCurrency(details.hostel_info.fees_per_year)} / year</p>}
                    {details.hostel_info.facilities?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {details.hostel_info.facilities.map(f => (
                          <span key={f} className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">{f}</span>
                        ))}
                      </div>
                    ) : null}
                    {details.hostel_info.notes && <p className="text-xs text-gray-500 mt-3 italic">{details.hostel_info.notes}</p>}
                  </SectionCard>
                )}

                {!Array.isArray(details?.facilities) && (
                  <SectionCard title={`${college.shortName} Campus Facilities`} icon={Building2}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {getFacilitiesFallback(college).map((f, i) => (
                        <div key={i} className="border border-gray-100 rounded-xl p-4 hover:border-orange-200 transition-colors">
                          <p className="font-semibold text-gray-900 text-sm mb-1">{f.name}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{f.description}</p>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                )}
              </>
            )}

            {/* ── ALUMNI TAB ── */}
            {activeTab === "alumni" && (
              <>
                {Array.isArray(details?.alumni) && details.alumni.length > 0 ? (
                  <SectionCard title="Notable Alumni" icon={Users}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {details.alumni.map((a, i) => (
                        <div key={i} className="flex items-center gap-3 border border-gray-100 rounded-xl p-4">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-600 font-bold text-sm">{a.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{a.name}</p>
                            <p className="text-xs text-gray-500">{a.designation}</p>
                            {a.batch && <p className="text-xs text-gray-400">Batch {a.batch}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionCard>
                ) : (
                  <SectionCard title="Notable Alumni" icon={Users}>
                    <p className="text-sm text-gray-500">Alumni information will be available after generating content via AI Studio.</p>
                  </SectionCard>
                )}
              </>
            )}

            {/* ── REVIEWS TAB ── */}
            {activeTab === "reviews" && (
              <ReviewSection
                collegeSlug={college.slug}
                collegeName={college.name}
                staticReviews={
                  (college as unknown as { reviews?: { id: number; studentName: string; course: string; year: string; rating: number; title: string; body: string; pros: string[]; cons: string[] }[] }).reviews ?? []
                }
                staticRating={college.rating}
              />
            )}

            {/* ── FAQs TAB ── */}
            {activeTab === "faqs" && (
              <SectionCard title={`${college.shortName} — Frequently Asked Questions`} icon={MessageSquare}>
                <div>
                  {faqs.map((faq, i) => (
                    <FAQItem key={i} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </SectionCard>
            )}

          </div>

          {/* ── Sticky Sidebar ─────────────────────────────────── */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>
              <table className="w-full">
                <tbody>
                  <TableRow label="NAAC Grade" value={<span className="font-bold text-blue-700">NAAC {college.naac}</span>} />
                  {college.nirfRank && <TableRow label="NIRF Rank" value={`#${college.nirfRank}`} />}
                  <TableRow label="Type" value={college.type} />
                  <TableRow label="Established" value={college.established} />
                  <TableRow label="Annual Fees" value={formatFeesRange(college.feesRange.min, college.feesRange.max)} />
                  <TableRow label="Avg Package" value={formatCurrency(college.avgPlacement)} />
                  {details?.total_students && <TableRow label="Students" value={details.total_students.toLocaleString()} />}
                </tbody>
              </table>

              <div className="mt-5 space-y-2.5">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Enquire Now — Free
                </button>
                {college.website && (
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    Official Website
                  </a>
                )}
                <CompareButton collegeSlug={college.slug} collegeName={college.shortName} />
              </div>

              {(college.phone || college.email) && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  {college.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span>{college.phone}</span>
                    </div>
                  )}
                  {college.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate">{college.email}</span>
                    </div>
                  )}
                </div>
              )}

              {/* CTA Card */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-4 text-white">
                  <h3 className="font-bold mb-1 text-sm">Free Admission Counseling</h3>
                  <p className="text-orange-100 text-xs mb-3">
                    {college.stream === "Engineering"
                      ? `MHT-CET / JEE guidance for ${college.shortName ?? college.name}. 100% free.`
                      : college.stream === "Medical"
                      ? `NEET counselling for ${college.shortName ?? college.name}. 100% free.`
                      : college.stream === "MBA"
                      ? `CAT / MAH-MBA-CET guidance for ${college.shortName ?? college.name}. 100% free.`
                      : college.stream === "Law"
                      ? `MH-CET Law / CLAT guidance for ${college.shortName ?? college.name}. 100% free.`
                      : college.stream === "Architecture"
                      ? `NATA / JEE Paper 2 guidance for ${college.shortName ?? college.name}. 100% free.`
                      : `Get expert guidance for ${college.shortName ?? college.name} admissions. 100% free.`}
                  </p>
                  <Link href="/counselling" className="block text-center bg-white text-orange-600 font-bold text-sm rounded-xl py-2.5 hover:bg-orange-50 transition-colors">
                    Book Free Session
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Searches */}
      <section className="border-t bg-white py-10 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-base font-semibold text-gray-700 mb-4">Related Searches</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: `Best ${college.stream} Colleges in Pune`, href: `/colleges-in-pune/${college.stream.toLowerCase().replace(/[^a-z]/g, '-')}-colleges-pune` },
              { label: `${college.type} Colleges in Pune`, href: `/colleges-in-pune/${college.type.toLowerCase()}-colleges-pune` },
              { label: "Colleges with Best Placements Pune", href: "/colleges-in-pune/top-placement-colleges-pune" },
              { label: "NAAC A+ Colleges Pune", href: "/colleges-in-pune/naac-a-plus-colleges-pune" },
              { label: `Compare ${college.shortName}`, href: "/compare" },
              { label: "Free Admission Counselling", href: "/counselling" },
              ...(college.entranceExams[0] ? [{ label: `${college.entranceExams[0]} Colleges Pune`, href: `/colleges-in-pune/${college.entranceExams[0].toLowerCase().replace(/[^a-z]/g, '-')}-colleges-pune` }] : []),
              { label: "Low Fee Colleges Pune", href: "/colleges-in-pune/low-fee-colleges-pune" },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 hover:border-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CounsellingBooking />
    </div>
  )
}
