import Link from 'next/link'
import { getAllBlogsAdmin } from '@/lib/supabase/queries-admin'
import StatusBadge from '@/components/admin/StatusBadge'
import { deleteBlogAction, approveBlogAction, rejectBlogAction } from './actions'
import type { Blog, ContentStatus } from '@/lib/supabase/types'

export const revalidate = 0

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const blogs = await getAllBlogsAdmin(status)

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Blogs</h1>
          <p className="text-gray-500 text-sm mt-1">{blogs.length} posts</p>
        </div>
        <Link href="/admin/blogs/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
          + New Blog
        </Link>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['', 'draft', 'pending', 'published', 'rejected'].map((s) => (
          <Link key={s} href={s ? `/admin/blogs?status=${s}` : '/admin/blogs'}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              (status ?? '') === s
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
            {s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All'}
          </Link>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {blogs.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No blog posts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Title', 'Status', 'Category', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog: Blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="max-w-xs truncate font-medium text-gray-900">{blog.title}</div>
                      <div className="text-xs text-gray-400 font-mono">{blog.slug}</div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={blog.status as ContentStatus} />
                    </td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{blog.category ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(blog.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        <Link href={`/admin/blogs/${blog.id}`}
                          className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                          Edit
                        </Link>
                        {blog.status === 'pending' && (
                          <>
                            <form action={approveBlogAction.bind(null, blog.id)} className="inline">
                              <button className="px-2.5 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                                ✓ Approve
                              </button>
                            </form>
                            <form action={rejectBlogAction.bind(null, blog.id)} className="inline">
                              <button className="px-2.5 py-1 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                                ✗ Reject
                              </button>
                            </form>
                          </>
                        )}
                        <form action={deleteBlogAction.bind(null, blog.id)} className="inline">
                          <button className="px-2.5 py-1 text-xs bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200">
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
