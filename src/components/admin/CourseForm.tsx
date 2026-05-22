'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { upsertCourseAction } from '@/app/admin/courses/actions'

const COURSE_TYPES = ['UG', 'PG', 'Diploma', 'PhD', 'Certificate', 'Other']

interface College { id: string; name: string; short_name: string | null }
interface Course {
  id?: string
  college_id?: string
  course_name?: string
  specialization?: string | null
  course_type?: string | null
  duration?: string | null
  fees_per_year?: number | null
  total_fees?: number | null
  seats?: number | null
  eligibility?: string | null
  entrance_exam?: string | null
}

interface Props {
  colleges: College[]
  course?: Course           // present when editing
  defaultCollegeId?: string // pre-select college
}

export default function CourseForm({ colleges, course, defaultCollegeId }: Props) {
  const courseId = course?.id ?? null
  const action = upsertCourseAction.bind(null, courseId)
  const [state, formAction, pending] = useActionState(action, null)
  const router = useRouter()

  useEffect(() => {
    if ((state as { success?: boolean } | null)?.success) router.push('/admin/courses')
  }, [state, router])

  const field = (label: string, name: string, opts: {
    type?: string; placeholder?: string; defaultValue?: string | number | null; required?: boolean; hint?: string
  } = {}) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{opts.required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={opts.type ?? 'text'}
        name={name}
        defaultValue={opts.defaultValue ?? ''}
        placeholder={opts.placeholder}
        required={opts.required}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {opts.hint && <p className="text-xs text-gray-400 mt-1">{opts.hint}</p>}
    </div>
  )

  return (
    <form action={formAction} className="space-y-5">

      {/* College picker */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          College <span className="text-red-500">*</span>
        </label>
        <select
          name="college_id"
          defaultValue={course?.college_id ?? defaultCollegeId ?? ''}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">— Select College —</option>
          {colleges.map((c) => (
            <option key={c.id} value={c.id}>
              {c.short_name ?? c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Course name + type row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          {field('Course Name', 'course_name', {
            required: true,
            placeholder: 'e.g. B.Tech Computer Engineering',
            defaultValue: course?.course_name,
          })}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <select
            name="course_type"
            defaultValue={course?.course_type ?? 'UG'}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {COURSE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Specialization */}
      {field('Specialization / Branch', 'specialization', {
        placeholder: 'e.g. Artificial Intelligence & ML',
        defaultValue: course?.specialization,
        hint: 'Optional — specific branch or specialization within the course',
      })}

      {/* Duration + Seats row */}
      <div className="grid grid-cols-2 gap-4">
        {field('Duration', 'duration', {
          placeholder: '4 Years / 2 Years',
          defaultValue: course?.duration,
        })}
        {field('Total Seats', 'seats', {
          type: 'number', placeholder: '60',
          defaultValue: course?.seats ?? undefined,
        })}
      </div>

      {/* Fees row */}
      <div className="grid grid-cols-2 gap-4">
        {field('Fees Per Year (₹)', 'fees_per_year', {
          type: 'number', placeholder: '150000',
          defaultValue: course?.fees_per_year ?? undefined,
          hint: 'Annual tuition fee',
        })}
        {field('Total Course Fees (₹)', 'total_fees', {
          type: 'number', placeholder: '600000',
          defaultValue: course?.total_fees ?? undefined,
          hint: 'Auto-calculated if left blank',
        })}
      </div>

      {/* Eligibility */}
      {field('Eligibility', 'eligibility', {
        placeholder: '10+2 with PCM, min 50% marks',
        defaultValue: course?.eligibility,
      })}

      {/* Entrance Exam */}
      {field('Entrance Exam', 'entrance_exam', {
        placeholder: 'MHT-CET / JEE Main / Direct',
        defaultValue: course?.entrance_exam,
      })}

      {/* Error / Success */}
      {(state as { error?: string } | null)?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          ⚠ {(state as { error: string }).error}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {pending ? 'Saving…' : courseId ? 'Update Course' : 'Add Course'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
