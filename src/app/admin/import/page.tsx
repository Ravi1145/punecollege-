'use client'
import { useState } from 'react'
import { importJSONAction } from './actions'

export default function ImportPage() {
  const [result, setResult] = useState<{
    success?: number
    failed?: number
    errors?: string[]
    error?: string
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const sampleCollege = JSON.stringify([
    {
      name: 'Sample College Pune',
      slug: 'sample-college-pune',
      location: 'Shivajinagar, Pune',
      type: 'Private',
      established: 2000,
      status: 'published',
    },
  ], null, 2)

  const sampleBlog = JSON.stringify([
    {
      title: 'Top Engineering Colleges in Pune 2026',
      slug: 'top-engineering-colleges-pune-2026',
      excerpt: 'A complete guide...',
      content: '## Introduction\n\nContent here...',
      category: 'engineering',
      status: 'published',
    },
  ], null, 2)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const formData = new FormData(e.currentTarget)
      const res = await importJSONAction(formData)
      const data = (res.colleges ?? res.blogs) as {
        success: number
        failed: number
        errors: string[]
      } | undefined
      if (res.error) {
        setResult({ error: res.error })
      } else if (data) {
        setResult({ success: data.success, failed: data.failed, errors: data.errors })
      }
    } catch (err) {
      setResult({ error: String(err) })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">JSON Import</h1>
      <p className="text-gray-500 text-sm mb-6">
        Bulk import colleges or blog posts by pasting a JSON array. Uses upsert — matched by slug.
      </p>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Import Type</label>
          <select name="type" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="colleges">Colleges</option>
            <option value="blogs">Blog Posts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">JSON Array *</label>
          <textarea
            name="json"
            rows={16}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`[\n  { "name": "...", "slug": "..." }\n]`}
          />
        </div>

        <details className="border border-gray-200 rounded-lg overflow-hidden">
          <summary className="px-4 py-2 bg-gray-50 cursor-pointer text-sm font-medium text-gray-700">
            📋 Sample College JSON
          </summary>
          <pre className="px-4 py-3 text-xs text-gray-600 overflow-x-auto bg-white">{sampleCollege}</pre>
        </details>

        <details className="border border-gray-200 rounded-lg overflow-hidden">
          <summary className="px-4 py-2 bg-gray-50 cursor-pointer text-sm font-medium text-gray-700">
            📋 Sample Blog JSON
          </summary>
          <pre className="px-4 py-3 text-xs text-gray-600 overflow-x-auto bg-white">{sampleBlog}</pre>
        </details>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? '⏳ Importing...' : '📥 Import JSON'}
        </button>
      </form>

      {result && (
        <div className={`mt-4 rounded-xl p-4 border ${
          result.error ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
        }`}>
          {result.error ? (
            <p className="text-red-700 font-medium">❌ {result.error}</p>
          ) : (
            <>
              <p className="font-semibold text-green-800">
                ✅ Import complete — {result.success} succeeded, {result.failed} failed
              </p>
              {result.errors && result.errors.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-semibold text-red-700 mb-1">Errors:</p>
                  <ul className="text-xs text-red-600 space-y-0.5">
                    {result.errors.map((e, i) => (
                      <li key={i}>• {e}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
