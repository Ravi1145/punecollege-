import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getBlogByIdAdmin } from '@/lib/supabase/queries-admin'
import { updateBlogAction } from '../actions'

const cls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const blog = await getBlogByIdAdmin(id)
  if (!blog) notFound()

  const updateAction = updateBlogAction.bind(null, id)

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blogs" className="text-gray-400 hover:text-gray-600">←</Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Edit Blog Post</h1>
          <p className="text-gray-500 text-sm mt-0.5">{blog.title}</p>
        </div>
      </div>

      <form action={updateAction} className="space-y-6">
        {/* Main */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input name="title" required defaultValue={blog.title} className={cls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input name="slug" required defaultValue={blog.slug} className={`${cls} font-mono`} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea name="excerpt" rows={2} defaultValue={blog.excerpt ?? ''} className={cls} />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Content * <span className="text-gray-400 font-normal">(Markdown supported)</span>
          </label>
          <textarea name="content" required rows={24} defaultValue={blog.content ?? ''}
            className={`${cls} font-mono text-xs leading-relaxed`} />
        </div>

        {/* Meta */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Metadata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="category" defaultValue={blog.category ?? 'general'} className={cls}>
                <option value="engineering">Engineering</option>
                <option value="mba">MBA</option>
                <option value="medical">Medical</option>
                <option value="admission">Admission</option>
                <option value="scholarships">Scholarships</option>
                <option value="careers">Careers</option>
                <option value="general">General</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Read Time (minutes)</label>
              <input name="read_time" type="number" min="1" max="60" className={cls}
                defaultValue={blog.read_time ?? ''} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input name="tags" className={cls} defaultValue={(blog.tags ?? []).join(', ')}
              placeholder="pune, engineering, 2026 (comma separated)" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
            <input name="cover_url" type="url" className={cls} defaultValue={blog.cover_url ?? ''} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" defaultValue={blog.status} className={cls}>
              <option value="draft">Draft</option>
              <option value="pending">Pending Review</option>
              <option value="published">Published</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            Save Changes
          </button>
          <Link href="/admin/blogs"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50">
            Cancel
          </Link>
          <Link href={`/blog/${blog.slug}`} target="_blank"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 ml-auto">
            View Post →
          </Link>
        </div>
      </form>
    </div>
  )
}
