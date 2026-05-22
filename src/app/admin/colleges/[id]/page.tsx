import { notFound } from 'next/navigation'
import { getCollegeByIdAdmin } from '@/lib/supabase/queries-admin'
import { updateCollegeAction } from '../actions'

export default async function EditCollegePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const college = await getCollegeByIdAdmin(id)
  if (!college) notFound()

  const updateAction = updateCollegeAction.bind(null, id)

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Edit College</h1>
      <form action={updateAction} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">College Name *</label>
          <input name="name" required defaultValue={college.name}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input name="slug" required defaultValue={college.slug}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input name="location" defaultValue={college.location ?? ''}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select name="type" defaultValue={college.type ?? ''}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select type</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Deemed">Deemed</option>
            <option value="Autonomous">Autonomous</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
          <input name="established" type="number" min="1800" max="2030"
            defaultValue={college.established ?? ''}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            Save Changes
          </button>
          <a href="/admin/colleges"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
