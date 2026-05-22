import Link from 'next/link'
import { getAllCollegesAdmin } from '@/lib/supabase/queries-admin'
import { deleteCollegeAction } from './actions'
import type { College } from '@/lib/supabase/types'

export const revalidate = 0

export default async function AdminCollegesPage() {
  const colleges = await getAllCollegesAdmin()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Colleges</h1>
          <p className="text-gray-500 text-sm mt-1">{colleges.length} total colleges</p>
        </div>
        <Link
          href="/admin/colleges/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
        >
          + Add College
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {colleges.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            No colleges yet.{' '}
            <Link href="/admin/colleges/new" className="text-blue-600 underline">Add the first one</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Name', 'Slug', 'Location', 'Type', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {colleges.map((college: College) => (
                  <tr key={college.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{college.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{college.slug}</td>
                    <td className="px-4 py-3 text-gray-600">{college.location ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{college.type ?? '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={`/admin/colleges/${college.id}`}
                          className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                          Edit
                        </Link>
                        <Link href={`/colleges/${college.slug}`} target="_blank"
                          className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                          View
                        </Link>
                        <form action={deleteCollegeAction.bind(null, college.id)}>
                          <button className="px-2.5 py-1 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                            Delete
                          </button>
                        </form>
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
