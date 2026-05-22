import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { deleteCourseAction } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'
import type { CollegeCourse } from '@/lib/supabase/types'

export const revalidate = 0

const LEVEL_COLOR: Record<string, string> = {
  UG:          'bg-blue-100 text-blue-700',
  PG:          'bg-purple-100 text-purple-700',
  Diploma:     'bg-yellow-100 text-yellow-700',
  PhD:         'bg-red-100 text-red-700',
  Certificate: 'bg-green-100 text-green-700',
  Other:       'bg-gray-100 text-gray-600',
}

function fmt(n: number | null) {
  if (!n) return '—'
  return `₹${(n / 100000).toFixed(1)}L`
}

export default async function AdminCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ college?: string; type?: string; q?: string }>
}) {
  const { college: collegeFilter, type: typeFilter, q } = await searchParams
  const admin = createAdminClient()

  // Fetch all published colleges for filter dropdown
  const { data: colleges } = await admin
    .from('colleges')
    .select('id, name, short_name')
    .eq('status', 'published')
    .order('name')

  // Build courses query
  let query = admin
    .from('college_courses')
    .select('*, colleges(id, name, short_name, slug)')
    .order('course_name')

  if (collegeFilter) query = query.eq('college_id', collegeFilter)
  if (typeFilter)    query = query.eq('course_type', typeFilter)
  if (q)             query = query.ilike('course_name', `%${q}%`)

  const { data: courses, error } = await query

  const courseList = (courses ?? []) as (CollegeCourse & {
    colleges: { id: string; name: string; short_name: string | null; slug: string } | null
  })[]

  // Stats
  const total   = courseList.length
  const ugCount = courseList.filter((c) => c.course_type === 'UG').length
  const pgCount = courseList.filter((c) => c.course_type === 'PG').length

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm mt-1">
            {total} courses · {ugCount} UG · {pgCount} PG
          </p>
        </div>
        <Link
          href="/admin/courses/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
        >
          + Add Course
        </Link>
      </div>

      {/* Filters */}
      <form method="GET" className="flex flex-wrap gap-3 mb-5">
        {/* Search */}
        <input
          name="q"
          defaultValue={q}
          placeholder="Search course name…"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-56"
        />

        {/* College filter */}
        <select
          name="college"
          defaultValue={collegeFilter ?? ''}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Colleges</option>
          {(colleges ?? []).map((c) => (
            <option key={c.id} value={c.id}>
              {c.short_name ?? c.name}
            </option>
          ))}
        </select>

        {/* Level filter */}
        <select
          name="type"
          defaultValue={typeFilter ?? ''}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Levels</option>
          {['UG', 'PG', 'Diploma', 'PhD', 'Certificate', 'Other'].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-900">
          Filter
        </button>
        {(collegeFilter || typeFilter || q) && (
          <Link href="/admin/courses" className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200">
            Clear
          </Link>
        )}
      </form>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {courseList.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            No courses found.{' '}
            <Link href="/admin/courses/new" className="text-blue-600 underline">Add one →</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Course Name', 'College', 'Level', 'Duration', 'Seats', 'Fees/yr', 'Entrance', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courseList.map((course) => (
                  <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{course.course_name}</div>
                      {course.specialization && (
                        <div className="text-xs text-gray-400 mt-0.5">{course.specialization}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {course.colleges ? (
                        <Link
                          href={`/admin/courses?college=${course.colleges.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {course.colleges.short_name ?? course.colleges.name}
                        </Link>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${LEVEL_COLOR[course.course_type ?? 'Other'] ?? LEVEL_COLOR.Other}`}>
                        {course.course_type ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{course.duration ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{course.seats ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs whitespace-nowrap">{fmt(course.fees_per_year)}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{course.entrance_exam ?? '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/courses/${course.id}`}
                          className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                        >
                          Edit
                        </Link>
                        {course.colleges && (
                          <Link
                            href={`/colleges/${course.colleges.slug}`}
                            target="_blank"
                            className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                          >
                            View
                          </Link>
                        )}
                        <DeleteButton action={async () => { await deleteCourseAction(course.id) }} />
                      </div>
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
