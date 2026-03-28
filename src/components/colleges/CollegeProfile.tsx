"use client"
import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, Globe, Building2, Award, TrendingUp, Users, BookOpen, Star, ChevronRight, Calendar, MessageSquare } from "lucide-react"
import { College } from "@/types"
import Badge from "@/components/ui/Badge"
import StarRating from "@/components/ui/StarRating"
import CompareButton from "@/components/ui/CompareButton"
import { formatCurrency, formatFees, formatFeesRange, getNaacColor, getTypeColor, cn } from "@/lib/utils"
import EnquiryForm from "@/components/leads/EnquiryForm"
import InlineLeadForm from "@/components/leads/InlineLeadForm"
import CounsellingBooking from "@/components/leads/CounsellingBooking"

interface CollegeProfileProps {
  college: College
}

export default function CollegeProfile({ college }: CollegeProfileProps) {
  const [enquiryOpen, setEnquiryOpen] = useState(false)

  return (
    <div>
    <EnquiryForm
      collegeName={college.name}
      collegeSlug={college.slug}
      courses={college.courses}
      isOpen={enquiryOpen}
      onClose={() => setEnquiryOpen(false)}
    />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/colleges" className="hover:text-orange-600 transition-colors">Colleges</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate">{college.shortName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Card */}
          <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] rounded-2xl p-7 text-white">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {college.shortName.slice(0, 3)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-1">{college.name}</h1>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{college.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className={cn("text-xs px-3 py-1 rounded-full font-semibold", getNaacColor(college.naac))}>
                NAAC {college.naac}
              </span>
              <span className={cn("text-xs px-3 py-1 rounded-full", getTypeColor(college.type))}>
                {college.type}
              </span>
              {college.nirfRank && (
                <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-800 font-semibold">
                  NIRF Rank #{college.nirfRank}
                </span>
              )}
              {college.hostel && (
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-800">
                  Hostel Available
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Established", value: college.established.toString(), icon: Calendar },
                { label: "Annual Fees", value: formatFeesRange(college.feesRange.min, college.feesRange.max), icon: TrendingUp },
                { label: "Avg Package", value: formatCurrency(college.avgPlacement), icon: TrendingUp },
                { label: "Highest Pkg", value: formatCurrency(college.highestPlacement), icon: Award },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white/10 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">{label}</p>
                  <p className="text-sm font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">About {college.name}</h2>
            <p className="text-gray-600 leading-relaxed mb-5">{college.description}</p>
            <div className="bg-orange-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Key Highlights</h3>
              <ul className="space-y-2">
                {college.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Courses */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Courses Offered</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {college.courses.map((course) => (
                <div key={course} className="bg-white border border-gray-100 rounded-xl p-3 hover:border-orange-200 transition-colors">
                  <BookOpen className="w-4 h-4 text-orange-500 mb-2" />
                  <p className="text-sm font-semibold text-gray-800">{course}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{college.affiliation}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Specializations */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Specializations</h2>
            <div className="flex flex-wrap gap-2">
              {college.specializations.map((spec) => (
                <span key={spec} className="bg-blue-50 text-blue-700 text-sm px-3 py-1.5 rounded-full border border-blue-100">
                  {spec}
                </span>
              ))}
            </div>
          </section>

          {/* Placements */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Placement Statistics 2024</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
              {[
                { label: "Average Package", value: formatCurrency(college.avgPlacement) },
                { label: "Highest Package", value: formatCurrency(college.highestPlacement) },
                { label: "Top Recruiting Sectors", value: "IT, Finance, Manufacturing" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className="text-base font-bold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Top Recruiters</h3>
              <div className="flex flex-wrap gap-2">
                {college.topRecruiters.map((recruiter) => (
                  <span key={recruiter} className="bg-white border border-gray-200 text-sm text-gray-700 px-3 py-1.5 rounded-lg">
                    {recruiter}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Entrance Exams */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Entrance Exams Accepted</h2>
            <div className="flex flex-wrap gap-2">
              {college.entranceExams.map((exam) => (
                <Link
                  key={exam}
                  href="/exams"
                  className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  {exam}
                </Link>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Student Reviews</h2>
              <div className="flex items-center gap-2">
                <StarRating rating={college.rating} reviewCount={college.reviewCount} size="sm" />
              </div>
            </div>
            <div className="space-y-4">
              {college.reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{review.studentName}</p>
                      <p className="text-sm text-gray-500">{review.course} · Batch {review.year}</p>
                    </div>
                    <StarRating rating={review.rating} size="sm" showCount={false} />
                  </div>
                  <p className="text-sm font-medium text-gray-800 mb-2">{review.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">{review.body}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-green-700 mb-1.5">Pros</p>
                      <ul className="space-y-1">
                        {review.pros.map((pro, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                            <span className="text-green-500">+</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-red-600 mb-1.5">Cons</p>
                      <ul className="space-y-1">
                        {review.cons.map((con, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-center gap-1">
                            <span className="text-red-400">-</span> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Inline Lead Form after reviews */}
          <InlineLeadForm context={`Interested in ${college.name}`} />
        </div>

        {/* Sidebar */}
        <div className="space-y-5 lg:col-span-1">
          {/* Quick Info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-20">
            <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-3">
              {[
                { label: "Affiliation", value: college.affiliation },
                { label: "Type", value: college.type },
                { label: "NAAC Grade", value: `NAAC ${college.naac}` },
                { label: "Established", value: college.established.toString() },
                { label: "Annual Fees", value: formatFeesRange(college.feesRange.min, college.feesRange.max) },
                { label: "Avg Placement", value: formatCurrency(college.avgPlacement) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-2">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-semibold text-gray-800 text-right">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => setEnquiryOpen(true)}
                className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Enquire Now — Free
              </button>
              <a
                href={college.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
              >
                <Globe className="w-4 h-4" />
                Official Website
              </a>
              <Link
                href="/ai-finder"
                className="flex items-center justify-center gap-2 w-full bg-[#0A1628] hover:bg-[#1E3A5F] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Apply via AI Finder
              </Link>
              <CompareButton collegeSlug={college.slug} collegeName={college.shortName} />
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{college.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="truncate">{college.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CounsellingBooking />
    </div>
  )
}
