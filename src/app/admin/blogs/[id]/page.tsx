"use client"
import { useState, useEffect, useCallback } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Sparkles, Loader2, Trash2, ExternalLink } from "lucide-react"
import { slugify } from "@/lib/utils"

const CATEGORIES = ["Admission Tips", "Exam Updates", "College Reviews", "Career Guides", "Scholarship News"]

export default function EditBlogPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const [loading, setLoading]       = useState(true)
  const [saving, setSaving]         = useState(false)
  const [deleting, setDeleting]     = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError]           = useState("")

  const [aiTopic, setAiTopic]     = useState("")
  const [aiKeyword, setAiKeyword] = useState("")
  const [aiWords, setAiWords]     = useState("1200")

  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", body: "", author: "CollegePune Team",
    category: "Admission Tips", tags: "", read_time: "6 min read",
    status: "draft", meta_title: "", meta_desc: "",
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const fetchBlog = useCallback(async () => {
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    setLoading(true); setError("")
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { headers: { "x-admin-key": key } })
      if (res.status === 401) { router.replace("/admin/login"); return }
      if (res.status === 404) { setError("Blog post not found"); return }
      if (!res.ok) throw new Error(await res.text())
      const { blog } = await res.json()
      setForm({
        title:      blog.title      ?? "",
        slug:       blog.slug       ?? "",
        excerpt:    blog.excerpt    ?? "",
        body:       blog.body       ?? "",
        author:     blog.author     ?? "CollegePune Team",
        category:   blog.category   ?? "Admission Tips",
        tags:       Array.isArray(blog.tags) ? blog.tags.join(", ") : (blog.tags ?? ""),
        read_time:  blog.read_time  ?? "6 min read",
        status:     blog.status     ?? "draft",
        meta_title: blog.meta_title ?? "",
        meta_desc:  blog.meta_desc  ?? "",
      })
      setAiTopic(blog.title ?? "")
    } catch (e) { setError(String(e)) }
    finally { setLoading(false) }
  }, [id, router])

  useEffect(() => { fetchBlog() }, [fetchBlog])

  const handleAIGenerate = async () => {
    if (!aiTopic.trim() || !aiKeyword.trim()) { setError("Enter topic and keyword first"); return }
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    setGenerating(true); setError("")
    try {
      const res = await fetch("/api/admin/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify({ topic: aiTopic, keyword: aiKeyword, wordCount: Number(aiWords) }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      const b = json.blog
      setForm(f => ({
        ...f,
        title:      b.title      || f.title,
        slug:       b.slug       || slugify(b.title || f.title),
        excerpt:    b.excerpt    || f.excerpt,
        body:       b.body       || f.body,
        category:   b.category   || f.category,
        tags:       (b.tags || []).join(", "),
        read_time:  b.read_time  || f.read_time,
        meta_title: b.meta_title || f.meta_title,
        meta_desc:  b.meta_desc  || f.meta_desc,
      }))
    } catch (e) { setError(String(e)) }
    finally { setGenerating(false) }
  }

  const handleSave = async () => {
    if (!form.title || !form.slug) { setError("Title and slug are required"); return }
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    setSaving(true); setError("")
    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(",").map(s => s.trim()).filter(Boolean) : [],
      }
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      router.push("/admin/blogs")
    } catch (e) { setError(String(e)) }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!confirm(`Delete "${form.title}"? This cannot be undone.`)) return
    const key = localStorage.getItem("admin_key")
    if (!key) { router.replace("/admin/login"); return }
    setDeleting(true)
    try {
      await fetch(`/api/admin/blogs/${id}`, { method: "DELETE", headers: { "x-admin-key": key } })
      router.push("/admin/blogs")
    } catch (e) { setError(String(e)); setDeleting(false) }
  }

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 bg-white"
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1"

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
        <span className="ml-2 text-sm text-gray-500">Loading post…</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/blogs" className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <h2 className="text-base font-bold text-gray-900">Edit Blog Post</h2>
          <p className="text-xs text-gray-500">ID: {id} · {form.status}</p>
        </div>
        <div className="flex items-center gap-2">
          {form.slug && (
            <Link href={`/blog/${form.slug}`} target="_blank"
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-orange-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors">
              <ExternalLink className="w-3.5 h-3.5" />
              Preview
            </Link>
          )}
          <button onClick={handleDelete} disabled={deleting}
            className="flex items-center gap-1.5 border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-60 rounded-lg px-3 py-2 text-sm font-medium transition-colors">
            {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
            Delete
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save
          </button>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg border border-red-100">{error}</div>}

      {/* AI Regeneration Panel */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold text-purple-900">AI Regenerate Content</span>
          <span className="text-xs text-purple-500 ml-auto">Will overwrite current content</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-purple-700 mb-1">Topic</label>
            <input className={inputCls} value={aiTopic} onChange={e => setAiTopic(e.target.value)}
              placeholder="Top MBA Colleges in Nashik" />
          </div>
          <div>
            <label className="block text-xs font-medium text-purple-700 mb-1">Target Keyword</label>
            <input className={inputCls} value={aiKeyword} onChange={e => setAiKeyword(e.target.value)}
              placeholder="MBA colleges Nashik" />
          </div>
          <div>
            <label className="block text-xs font-medium text-purple-700 mb-1">Word Count</label>
            <select className={inputCls} value={aiWords} onChange={e => setAiWords(e.target.value)}>
              <option value="800">800 words</option>
              <option value="1200">1200 words</option>
              <option value="1500">1500 words</option>
            </select>
          </div>
        </div>
        <button onClick={handleAIGenerate} disabled={generating}
          className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
          {generating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {generating ? "Regenerating…" : "Regenerate Article"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Post Details</h3>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Title *</label>
              <input className={inputCls} value={form.title} onChange={e => set("title", e.target.value)}
                placeholder="Top 10 MBA Colleges in Nashik 2025" />
            </div>
            <div>
              <label className={labelCls}>Slug *</label>
              <div className="flex gap-2">
                <input className={inputCls} value={form.slug} onChange={e => set("slug", e.target.value)}
                  placeholder="top-10-mba-colleges-nashik-2025" />
                <button onClick={() => set("slug", slugify(form.title))}
                  className="shrink-0 text-xs border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors whitespace-nowrap">
                  From title
                </button>
              </div>
            </div>
            <div>
              <label className={labelCls}>Excerpt (2 sentences)</label>
              <textarea className={inputCls} rows={2} value={form.excerpt} onChange={e => set("excerpt", e.target.value)}
                placeholder="Short summary shown on listing pages…" />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Article Body</h3>
          <div>
            <label className={labelCls}>Body (HTML or plain text)</label>
            <textarea className={inputCls + " font-mono text-xs"} rows={22} value={form.body} onChange={e => set("body", e.target.value)}
              placeholder="<h2>Introduction</h2><p>…</p>" />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Metadata</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category</label>
              <select className={inputCls} value={form.category} onChange={e => set("category", e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Author</label>
              <input className={inputCls} value={form.author} onChange={e => set("author", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Tags (comma-separated)</label>
              <input className={inputCls} value={form.tags} onChange={e => set("tags", e.target.value)}
                placeholder="MBA, Nashik, admissions 2025" />
            </div>
            <div>
              <label className={labelCls}>Read Time</label>
              <input className={inputCls} value={form.read_time} onChange={e => set("read_time", e.target.value)}
                placeholder="6 min read" />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">SEO</h3>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Meta Title</label>
              <input className={inputCls} value={form.meta_title} onChange={e => set("meta_title", e.target.value)} maxLength={70} />
              <p className="text-xs text-gray-400 mt-1">{form.meta_title.length}/70</p>
            </div>
            <div>
              <label className={labelCls}>Meta Description</label>
              <textarea className={inputCls} rows={2} value={form.meta_desc} onChange={e => set("meta_desc", e.target.value)} maxLength={160} />
              <p className="text-xs text-gray-400 mt-1">{form.meta_desc.length}/160</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Publish</h3>
          <div className="max-w-xs">
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={e => set("status", e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </section>
      </div>

      <div className="flex gap-3 pb-8">
        <Link href="/admin/blogs" className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">Cancel</Link>
        <button onClick={handleDelete} disabled={deleting}
          className="flex items-center gap-1.5 border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-60 rounded-lg px-4 py-2 text-sm font-medium transition-colors">
          {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
          Delete Post
        </button>
        <button onClick={handleSave} disabled={saving}
          className="ml-auto flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg px-6 py-2 text-sm font-medium transition-colors">
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save Post
        </button>
      </div>
    </div>
  )
}
