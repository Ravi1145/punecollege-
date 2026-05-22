import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import CourseForm from '@/components/admin/CourseForm'

export default async function NewCoursePage({
  searchParams,
}: {
  searchParams: Promise<{ college?: string }>
}) {
  const { college } = await searchParams
  const admin = createAdminClient()

  const { data: colleges } = await admin
    .from('colleges')
    .select('id, name, short_name')
    .eq('status', 'published')
    .order('name')

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/courses" className="text-gray-400 hover:text-gray-600 transition-colors">
          ← Courses
        </Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-extrabold text-gray-900">Add Course</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <CourseForm
          colleges={colleges ?? []}
          defaultCollegeId={college}
        />
      </div>
    </div>
  )
}
