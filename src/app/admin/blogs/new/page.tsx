'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { createBlogAction } from '../actions'

function slugify(s: string) {
  return s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const cls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

export default function NewBlogPage() {
  const slugRef = useRef<HTMLInputElement>(null)

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (slugRef.current && !slugRef.current.value) {
      slugRef.current.value = slugify(e.target.value)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/blogs" className="text-gray-400 hover:text-gray-600">←</Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">New Blog Post</h1>
          <p className="text-gray-500 text-sm mt-0.5">Write and publish a new article</p>
        </div>
      </div>

      <form action={createBlogAction} className="space-y-6">
        {/* Main */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input name="title" required onChange={handleTitleChange} className={cls}
              placeholder="e.g. Top Engineering Colleges in Pune 2026" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input name="slug" required ref={slugRef} className={`${cls} font-mono`}
              placeholder="auto-generated from title" />
            <p className="text-xs text-gray-400 mt-1">URL-friendly identifier. Auto-filled from title.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea name="excerpt" rows={2} className={cls}
              placeholder="Short summary shown in listings (1-2 sentences)" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Content * <span className="text-gray-400 font-normal">(Markdown supported)</span></label>
          <textarea name="content" required rows={24} className={`${cls} font-mono text-xs leading-relaxed`}
            placeholder="# Heading&#10;&#10;Write your blog post here in Markdown..." />
        </div>

        {/* Meta */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">Metadata</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select name="category" className={cls} defaultValue="general">
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
              <input name="read_time" type="number" min="1" max="60" className={cls} placeholder="e.g. 5" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input name="tags" className={cls} placeholder="pune, engineering, 2026 (comma separated)" />
            <p className="text-xs text-gray-400 mt-1">Comma-separated tags for search and filtering</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
            <input name="cover_url" type="url" className={cls} placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" className={cls} defaultValue="draft">
              <option value="draft">Draft — save for later</option>
              <option value="pending">Pending — submit for approval</option>
              <option value="published">Published — go live immediately</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            Save Blog Post
          </button>
          <Link href="/admin/blogs"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
