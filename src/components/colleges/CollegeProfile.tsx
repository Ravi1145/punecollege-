"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  MapPin, Phone, Mail, Globe, Award, TrendingUp, Users, BookOpen,
  Star, ChevronRight, MessageSquare, Building2, CheckCircle2,
  GraduationCap, Landmark, Wifi, Home, Trophy, ChevronDown, ChevronUp,
  IndianRupee, Percent, Calendar, BarChart2, Layers
} from "lucide-react"
import { College } from "@/types"
import type { CollegeDetails } from "@/lib/db"
import { formatCurrency, formatFeesRange, getNaacColor, getTypeColor, cn } from "@/lib/utils"
import EnquiryForm from "@/components/leads/EnquiryForm"
import CounsellingBooking from "@/components/leads/CounsellingBooking"
import CompareButton from "@/components/ui/CompareButton"

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
  { id: "faqs",        label: "FAQs" },
]

function SectionCard({ title, icon: Icon, children }: { title: string; icon?: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-50">
        {Icon && <Icon className="w-4 h-4 text-orange-500 flex-shrink-0" />}
        <h2 className="font-bold text-gray-900 text-base">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
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

export default function CollegeProfile({ college, details }: CollegeProfileProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  const faqs = college.faqs ?? (college as unknown as { faqs?: { q: string; a: string }[] }).faqs ?? []

  return (
    <div>
      <EnquiryForm
        collegeName={college.name}
        collegeSlug={college.slug}
        courses={college.courses}
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />

      {/* ── Hero Header ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0">
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
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white flex-shrink-0 shadow-lg overflow-hidden">
              {college.image ? (
                <Image
                  src={college.image}
                  alt={`${college.name} logo`}
                  fill
                  sizes="80px"
                  className="object-contain p-1.5"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[#0A1628] font-extrabold text-lg">{college.shortName.slice(0, 3)}</span>
                </div>
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

            {/* CTA buttons - desktop */}
            <div className="hidden sm:flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={() => setEnquiryOpen(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                Enquire Now
              </button>
              {college.website && (
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors text-center"
                >
                  Official Website
                </a>
              )}
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
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
          <div className="flex gap-0 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
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
                {/* About */}
                <SectionCard title={`About ${college.name}`} icon={BookOpen}>
                  <p className="text-gray-600 leading-relaxed text-sm mb-4">{college.description}</p>
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
                {details?.courses_fees?.length ? (
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
                {details?.admission_process?.length ? (
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
                ) : (
                  <SectionCard title="Admission Process" icon={CheckCircle2}>
                    <p className="text-sm text-gray-500">Admission details are being updated. Please check the official website or contact us for the latest information.</p>
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
                {details?.cutoffs?.length ? (
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
                          {details.cutoffs.map((c, i) => (
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
                ) : (
                  <SectionCard title="Cutoffs" icon={Percent}>
                    <p className="text-sm text-gray-500">Cutoff data will be available after generating detailed college content via AI Studio.</p>
                  </SectionCard>
                )}
              </>
            )}

            {/* ── RANKINGS TAB ── */}
            {activeTab === "rankings" && (
              <>
                {details?.rankings?.length ? (
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
                ) : (
                  <SectionCard title="Rankings" icon={Trophy}>
                    {college.nirfRank && (
                      <div className="bg-orange-50 rounded-xl p-5 text-center">
                        <p className="text-4xl font-extrabold text-orange-600 mb-1">#{college.nirfRank}</p>
                        <p className="text-sm text-gray-600">NIRF Ranking 2025</p>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-4">Detailed ranking data will be available after generating content via AI Studio.</p>
                  </SectionCard>
                )}
              </>
            )}

            {/* ── SCHOLARSHIPS TAB ── */}
            {activeTab === "scholarships" && (
              <>
                {details?.scholarships?.length ? (
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
                  <SectionCard title="Scholarships" icon={Award}>
                    <p className="text-sm text-gray-500">Scholarship information will be available after generating detailed content via AI Studio.</p>
                  </SectionCard>
                )}
              </>
            )}

            {/* ── FACILITIES TAB ── */}
            {activeTab === "facilities" && (
              <>
                {details?.facilities?.length ? (
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

                {!details?.facilities?.length && !details?.hostel_info && (
                  <SectionCard title="Facilities" icon={Building2}>
                    <p className="text-sm text-gray-500">Facility details will be available after generating content via AI Studio.</p>
                  </SectionCard>
                )}
              </>
            )}

            {/* ── ALUMNI TAB ── */}
            {activeTab === "alumni" && (
              <>
                {details?.alumni?.length ? (
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

            {/* ── FAQs TAB ── */}
            {activeTab === "faqs" && (
              <SectionCard title="Frequently Asked Questions" icon={MessageSquare}>
                {faqs.length > 0 ? (
                  <div>
                    {faqs.map((faq, i) => (
                      <FAQItem key={i} q={faq.q} a={faq.a} />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">FAQ content will be available after generating content via AI Studio.</p>
                )}
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
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-1 text-sm">Free Admission Counseling</h3>
              <p className="text-orange-100 text-xs mb-3">Get expert guidance for {college.stream} admissions. 100% free.</p>
              <Link href="/counselling" className="block text-center bg-white text-orange-600 font-bold text-sm rounded-xl py-2.5 hover:bg-orange-50 transition-colors">
                Book Free Session
              </Link>
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
