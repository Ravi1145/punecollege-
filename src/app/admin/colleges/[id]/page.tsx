import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCollegeByIdAdmin } from '@/lib/supabase/queries-admin'
import { createAdminClient } from '@/lib/supabase/admin'
import { InputField, SelectField, TextareaField } from '@/components/admin/FormField'
import ImageUpload from '@/components/admin/ImageUpload'
import { updateCollegeAction, approveReviewAction, rejectReviewAction, deleteReviewAction } from '../actions'
import type { Review } from '@/lib/supabase/types'

/** Join array to newline-separated text for textarea defaultValue */
function arr(v: string[] | null | undefined) {
  return (v ?? []).join('\n')
}
/** Join array to comma-separated text */
function csv(v: string[] | null | undefined) {
  return (v ?? []).join(', ')
}

const reviewStatusColor: Record<string, string> = {
  pending:   'bg-yellow-100 text-yellow-700 border border-yellow-200',
  published: 'bg-green-100 text-green-700 border border-green-200',
  rejected:  'bg-red-100 text-red-600 border border-red-200',
}

export default async function EditCollegePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const college = await getCollegeByIdAdmin(id)
  if (!college) notFound()

  const admin = createAdminClient()

  // Fetch reviews + courses for this college
  const [{ data: reviews }, { data: coursesData }] = await Promise.all([
    admin.from('reviews').select('*').eq('college_id', id).order('created_at', { ascending: false }),
    admin.from('college_courses').select('*').eq('college_id', id).order('course_name'),
  ])

  const reviewStats = {
    total:     reviews?.length ?? 0,
    pending:   reviews?.filter(r => r.status === 'pending').length ?? 0,
    published: reviews?.filter(r => r.status === 'published').length ?? 0,
  }

  const updateAction = updateCollegeAction.bind(null, id)

  return (
    <div className="max-w-3xl">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/colleges" className="text-gray-400 hover:text-gray-600 text-lg">←</Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold text-gray-900 truncate">{college.name}</h1>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-gray-400 text-xs font-mono">{college.slug}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              college.status === 'published' ? 'bg-green-100 text-green-700' :
              college.status === 'draft' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-700'
            }`}>{college.status}</span>
            <Link href={`/colleges/${college.slug}`} target="_blank"
              className="text-xs text-blue-600 hover:underline">View page →</Link>
          </div>
        </div>
      </div>

      <form action={updateAction} className="space-y-6">

        {/* ── Basic Info ─────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="College Name *" name="name" required defaultValue={college.name} />
            <InputField label="Short Name" name="short_name" defaultValue={college.short_name ?? ''} placeholder="COEP" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Slug *" name="slug" required defaultValue={college.slug} className="font-mono"
              hint="Changing slug will break existing links" />
            <InputField label="Affiliation" name="affiliation" defaultValue={college.affiliation ?? ''} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField label="Type" name="type" defaultValue={college.type ?? ''}>
              <option value="">Select type</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
              <option value="Deemed">Deemed</option>
              <option value="Autonomous">Autonomous</option>
              <option value="Central University">Central University</option>
              <option value="State University">State University</option>
            </SelectField>
            <SelectField label="Stream" name="stream" defaultValue={college.stream ?? ''}>
              <option value="">Select stream</option>
              <option value="Engineering">Engineering</option>
              <option value="MBA">MBA / Management</option>
              <option value="Medical">Medical / MBBS</option>
              <option value="Law">Law</option>
              <option value="Architecture">Architecture</option>
              <option value="Science">Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Arts">Arts & Humanities</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Agriculture">Agriculture</option>
            </SelectField>
            <InputField label="Established Year" name="established" type="number" min="1800" max="2030"
              defaultValue={college.established ?? ''} />
          </div>
          <TextareaField label="Description" name="description" rows={4} defaultValue={college.description ?? ''} />
          <SelectField label="Status" name="status" defaultValue={college.status}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </SelectField>
        </section>

        {/* ── Location ───────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="City" name="city" defaultValue={college.city ?? 'Pune'} />
            <InputField label="State" name="state" defaultValue={college.state ?? 'Maharashtra'} />
          </div>
          <InputField label="Location (short label)" name="location" defaultValue={college.location ?? ''} />
          <TextareaField label="Full Address" name="address" rows={2} defaultValue={college.address ?? ''} />
        </section>

        {/* ── Rankings ───────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Rankings & Accreditation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField label="NAAC Grade" name="naac_grade" defaultValue={college.naac_grade ?? ''}>
              <option value="">Not Accredited / Unknown</option>
              <option value="A++">A++ (Highest)</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B++">B++</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </SelectField>
            <InputField label="NIRF Rank" name="nirf_rank" type="number" min="1"
              defaultValue={college.nirf_rank ?? ''} />
          </div>
        </section>

        {/* ── Courses & Academics ────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Courses & Academics</h2>
          <TextareaField label="Courses Offered" name="courses" rows={5}
            defaultValue={arr(college.courses)}
            hint="One course per line (e.g. B.Tech Computer Engineering)" />
          <TextareaField label="Specializations" name="specializations" rows={3}
            defaultValue={arr(college.specializations)}
            hint="One specialization per line" />
          <InputField label="Entrance Exams Accepted" name="entrance_exams"
            defaultValue={csv(college.entrance_exams)}
            hint="Comma-separated: JEE Main, MHT-CET, GATE" />
        </section>

        {/* ── Fees & Placements ──────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Fees & Placements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Fees Min (₹/year)" name="fees_min" type="number" min="0"
              defaultValue={college.fees_min ?? ''} hint="Annual fee in rupees" />
            <InputField label="Fees Max (₹/year)" name="fees_max" type="number" min="0"
              defaultValue={college.fees_max ?? ''} hint="Annual fee in rupees" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Avg Package (₹/year)" name="avg_placement" type="number" min="0"
              defaultValue={college.avg_placement ?? ''} hint="Average CTC in rupees" />
            <InputField label="Highest Package (₹/year)" name="highest_pkg" type="number" min="0"
              defaultValue={college.highest_pkg ?? ''} hint="Highest CTC in rupees" />
          </div>
          <TextareaField label="Top Recruiters" name="top_recruiters" rows={3}
            defaultValue={csv(college.top_recruiters)}
            hint="Comma-separated company names" />
        </section>

        {/* ── Admissions ─────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Admissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Total Seats" name="admissions_total_seats" type="number" min="0"
              defaultValue={(college.details as Record<string, Record<string,unknown>>)?.admissions?.total_seats as number ?? ''}
              placeholder="120" hint="Total approved intake" />
            <InputField label="Application Open Date" name="admissions_app_start" type="date"
              defaultValue={(college.details as Record<string, Record<string,unknown>>)?.admissions?.application_start as string ?? ''} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Application Close Date" name="admissions_app_end" type="date"
              defaultValue={(college.details as Record<string, Record<string,unknown>>)?.admissions?.application_end as string ?? ''} />
            <InputField label="Category Breakdown" name="admissions_categories"
              defaultValue={(college.details as Record<string, Record<string,unknown>>)?.admissions?.categories as string ?? ''}
              placeholder="Gen: 60, OBC: 27, SC: 13, ST: 6, EWS: 6" hint="Seat distribution by category" />
          </div>
          <TextareaField label="Admission Process" name="admissions_process" rows={4}
            defaultValue={(college.details as Record<string, Record<string,unknown>>)?.admissions?.process as string ?? ''}
            placeholder="Describe step-by-step admission procedure — eligibility, entrance exams, merit list, counselling rounds..." />
          <TextareaField label="Important Dates" name="admissions_important_dates" rows={3}
            defaultValue={(college.details as Record<string, Record<string,unknown>>)?.admissions?.important_dates as string ?? ''}
            placeholder="MHT-CET Registration: Jan 15 - Mar 31&#10;Merit List: June 10&#10;Round 1 Allotment: July 5"
            hint="One date event per line" />
        </section>

        {/* ── Cutoffs ─────────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Cutoffs</h2>
          <TextareaField label="Year-wise Cutoffs" name="cutoffs" rows={8}
            defaultValue={(college.details as Record<string, unknown>)?.cutoffs as string ?? ''}
            placeholder="2024 MHT-CET — Computer Engg:&#10;  General: 98.5 percentile&#10;  OBC: 96.2 percentile&#10;  SC: 88.0 percentile&#10;&#10;2023 MHT-CET — Computer Engg:&#10;  General: 97.8 percentile&#10;  OBC: 95.0 percentile"
            hint="Enter cutoffs in any format — year, branch, category-wise percentile/rank" />
        </section>

        {/* ── Extended Rankings ────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Additional Rankings</h2>
          <TextareaField label="Other Rankings & Recognition" name="rankings_extra" rows={5}
            defaultValue={(college.details as Record<string, unknown>)?.rankings_extra as string ?? ''}
            placeholder="Outlook India 2024: #12 Engineering in Pune&#10;India Today 2024: #8 Tech Colleges Maharashtra&#10;Times Higher Ed: Top 200 Asia&#10;QS India: Rank Band 151-200&#10;NBA Accredited: 6 Programs"
            hint="One ranking per line — agency, year, rank/band" />
        </section>

        {/* ── Scholarships ────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Scholarships</h2>
          <TextareaField label="Available Scholarships" name="scholarships" rows={6}
            defaultValue={(college.details as Record<string, unknown>)?.scholarships as string ?? ''}
            placeholder="Merit Scholarship: Top 10 students in each branch — 50% tuition fee waiver&#10;EBC Scholarship: For students with family income < ₹1 lakh/year — full fee waiver&#10;SC/ST Scholarship: Government of Maharashtra — full tuition + stipend&#10;OBC Non-Creamy Layer: 50% fee concession"
            hint="One scholarship per line — name, eligibility, benefit" />
        </section>

        {/* ── Facilities & Highlights ────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Facilities & Highlights</h2>
          <div className="flex items-center gap-3 py-1">
            <input type="checkbox" name="hostel" id="hostel_edit" defaultChecked={college.hostel}
              className="w-4 h-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="hostel_edit" className="text-sm font-medium text-gray-700">Hostel Available</label>
          </div>
          <TextareaField label="Detailed Facilities" name="facilities_detail" rows={6}
            defaultValue={(college.details as Record<string, unknown>)?.facilities_detail as string ?? ''}
            placeholder="Central Library (1 lakh+ books, 24/7 access)&#10;Computer Labs (500 systems, high-speed internet)&#10;Sports Complex (cricket ground, basketball, badminton)&#10;Indoor Gymnasium&#10;Cafeteria & Food Court&#10;Wi-Fi Campus (100 Mbps)&#10;Medical Centre (resident doctor)&#10;Innovation & Entrepreneurship Cell"
            hint="One facility per line — name and brief description" />
          <TextareaField label="Key Highlights" name="highlights" rows={5}
            defaultValue={arr(college.highlights)}
            hint="One highlight per line — shown as bullet points on college page" />
          <InputField label="Tags" name="tags"
            defaultValue={csv(college.tags)}
            hint="Comma-separated tags for search and filtering" />
        </section>

        {/* ── FAQs ────────────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">FAQs</h2>
          <TextareaField label="Frequently Asked Questions" name="faqs" rows={10}
            defaultValue={(college.details as Record<string, unknown>)?.faqs as string ?? ''}
            placeholder="Q: What is the fee structure for B.Tech Computer Engineering?&#10;A: The annual fee is approximately ₹1.2 lakh for government quota and ₹2.5 lakh for management quota.&#10;---&#10;Q: Is hostel mandatory for first year students?&#10;A: Hostel is optional but recommended for outstation students. Separate hostels for boys and girls are available.&#10;---&#10;Q: What entrance exams are accepted?&#10;A: MHT-CET for Maharashtra students; JEE Main for all-India quota seats."
            hint="Format: Q: question text (newline) A: answer text (newline) --- (separator)" />
        </section>

        {/* ── Contact & Links ────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Contact & Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Official Website" name="website" type="url" defaultValue={college.website ?? ''} />
            <InputField label="Phone" name="phone" type="tel" defaultValue={college.phone ?? ''} />
          </div>
          <InputField label="Email" name="email" type="email" defaultValue={college.email ?? ''} />
        </section>

        {/* ── Media ──────────────────────────────────────────── */}
        <section className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
          <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2">Media</h2>
          <ImageUpload
            label="Cover Image"
            name="cover_url"
            defaultValue={college.cover_url ?? ''}
            folder="covers"
            aspectClass="h-40 w-full"
            hint="Banner shown on the college page — 1200×630 px recommended (JPG, PNG, WebP)"
          />
          <ImageUpload
            label="College Logo"
            name="logo_url"
            defaultValue={college.logo_url ?? ''}
            folder="logos"
            aspectClass="h-20"
            hint="Square logo — 200×200 px recommended (PNG, SVG, WebP)"
          />
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <button type="submit"
            className="px-8 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
          <Link href="/admin/colleges"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
        </div>
      </form>

      {/* ── Reviews Section ────────────────────────────────────── */}
      <div className="mt-10 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">College Reviews</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {reviewStats.total} total ·{' '}
              <span className="text-yellow-600 font-medium">{reviewStats.pending} pending</span> ·{' '}
              <span className="text-green-600 font-medium">{reviewStats.published} published</span>
            </p>
          </div>
          <Link href="/admin/reviews" className="text-xs text-blue-600 hover:underline">All reviews →</Link>
        </div>

        {reviewStats.total === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-400">
            No reviews yet for this college.
          </div>
        ) : (
          <div className="space-y-3">
            {(reviews ?? []).map((review: Review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Header row */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-yellow-500 font-bold">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">{review.author_name}</span>
                      {review.course && (
                        <span className="text-xs text-gray-500">
                          · {review.course}{review.batch_year ? ` (${review.batch_year})` : ''}
                        </span>
                      )}
                      {review.author_email && (
                        <span className="text-xs text-gray-400">{review.author_email}</span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${reviewStatusColor[review.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {review.status}
                      </span>
                    </div>

                    {/* Body */}
                    <p className="text-sm text-gray-700 leading-relaxed">{review.body}</p>

                    {/* Pros / Cons */}
                    {(review.pros || review.cons) && (
                      <div className="flex gap-6 mt-3">
                        {review.pros && (
                          <div>
                            <span className="text-xs font-semibold text-green-700">👍 Pros</span>
                            <p className="text-xs text-gray-600 mt-0.5">{review.pros}</p>
                          </div>
                        )}
                        {review.cons && (
                          <div>
                            <span className="text-xs font-semibold text-red-600">👎 Cons</span>
                            <p className="text-xs text-gray-600 mt-0.5">{review.cons}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2 shrink-0">
                    {review.status !== 'published' && (
                      <form action={approveReviewAction.bind(null, review.id, id)}>
                        <button className="w-full px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors">
                          ✓ Approve
                        </button>
                      </form>
                    )}
                    {review.status !== 'rejected' && (
                      <form action={rejectReviewAction.bind(null, review.id, id)}>
                        <button className="w-full px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors">
                          ✗ Reject
                        </button>
                      </form>
                    )}
                    <form action={deleteReviewAction.bind(null, review.id, id)}>
                      <button className="w-full px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors">
                        🗑 Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Courses Section ─────────────────────────────────────── */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">Courses Offered</h2>
            <p className="text-gray-500 text-sm">{coursesData?.length ?? 0} courses</p>
          </div>
          <Link
            href={`/admin/courses/new?college=${id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
          >
            + Add Course
          </Link>
        </div>

        {!coursesData || coursesData.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400">
            No courses added yet.{' '}
            <Link href={`/admin/courses/new?college=${id}`} className="text-blue-600 underline">
              Add first course →
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Course', 'Level', 'Duration', 'Seats', 'Fees/yr', 'Exam', ''].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {coursesData.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{c.course_name}</div>
                      {c.specialization && <div className="text-xs text-gray-400">{c.specialization}</div>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {c.course_type ?? 'UG'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{c.duration ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{c.seats ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">
                      {c.fees_per_year ? `₹${(c.fees_per_year / 100000).toFixed(1)}L` : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{c.entrance_exam ?? '—'}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/courses/${c.id}`}
                        className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
