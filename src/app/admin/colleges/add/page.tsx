"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Sparkles, Loader2 } from "lucide-react"
import { slugify } from "@/lib/utils"

const STREAMS = ["Engineering", "MBA", "Medical", "Law", "Arts & Science", "Management", "Architecture", "Commerce"]
const TYPES   = ["Government", "Private", "Deemed", "Autonomous"]
const NAAC    = ["A++", "A+", "A", "B++", "B+", "B", "C"]
const CITIES  = ["Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Solapur", "Amravati", "Thane", "Navi Mumbai"]

export default function AddCollegePage() {
  const router = useRouter()
  const [saving, setSaving]       = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError]         = useState("")
  const [success, setSuccess]     = useState("")

  const [form, setForm] = useState({
    name: "", slug: "", short_name: "", type: "Private", stream: "Engineering",
    city: "Pune", state: "Maharashtra", established: "", affiliation: "",
    naac_grade: "A+", nirf_rank: "", address: "", description: "",
    highlights: "", tags: "", fees_min: "", fees_max: "",
    avg_placement: "", highest_pkg: "", top_recruiters: "",
    entrance_exams: "", courses: "", specializations: "",
    hostel: false, rating: "4.0", website: "", phone: "", email: "",
    meta_title: "", meta_desc: "", seo_keywords: "", status: "draft",
  })

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const handleNameBlur = () => {
    if (form.name && !form.slug) {
      set("slug", slugify(form.name))
    }
  }

  // ── AI Auto-Fill ──────────────────────────────────────────────────
  const handleAIFill = async () => {
    if (!form.name.trim()) { setError("Enter the college name first"); return }
    const key = localStorage.getItem("admin_key")
    if (!key) return
    setGenerating(true); setError("")
    try {
      const res = await fetch("/api/admin/ai/generate-college", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify({ collegeName: form.name, city: form.city, stream: form.stream }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      const c = json.college
      setForm(f => ({
        ...f,
        slug:           c.slug         || slugify(c.name || f.name),
        short_name:     c.short_name   || f.short_name,
        type:           c.type         || f.type,
        established:    String(c.established || f.established),
        affiliation:    c.affiliation  || f.affiliation,
        naac_grade:     c.naac_grade   || f.naac_grade,
        nirf_rank:      String(c.nirf_rank ?? f.nirf_rank),
        address:        c.address      || f.address,
        description:    c.description  || f.description,
        highlights:     (c.highlights  || []).join("\n"),
        tags:           (c.tags        || []).join(", "),
        fees_min:       String(c.fees_min    || f.fees_min),
        fees_max:       String(c.fees_max    || f.fees_max),
        avg_placement:  String(c.avg_placement  || f.avg_placement),
        highest_pkg:    String(c.highest_pkg    || f.highest_pkg),
        top_recruiters: (c.top_recruiters || []).join(", "),
        entrance_exams: (c.entrance_exams || []).join(", "),
        courses:        (c.courses       || []).join(", "),
        specializations:(c.specializations || []).join(", "),
        hostel:         c.hostel ?? f.hostel,
        rating:         String(c.rating || f.rating),
        website:        c.website  || f.website,
        phone:          c.phone    || f.phone,
        email:          c.email    || f.email,
        meta_title:     c.meta_title || f.meta_title,
        meta_desc:      c.meta_desc  || f.meta_desc,
        seo_keywords:   (c.seo_keywords || []).join(", "),
      }))
      setSuccess(`AI filled ${json.tokensUsed?.toLocaleString() || 0} tokens used`)
    } catch (e) {
      setError(String(e))
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!form.name || !form.slug || !form.city) {
      setError("Name, slug, and city are required"); return
    }
    const key = localStorage.getItem("admin_key")
    if (!key) return
    setSaving(true); setError("")
    try {
      const payload = {
        ...form,
        established:    form.established    ? Number(form.established)    : null,
        nirf_rank:      form.nirf_rank      ? Number(form.nirf_rank)      : null,
        fees_min:       form.fees_min       ? Number(form.fees_min)       : null,
        fees_max:       form.fees_max       ? Number(form.fees_max)       : null,
        avg_placement:  form.avg_placement  ? Number(form.avg_placement)  : null,
        highest_pkg:    form.highest_pkg    ? Number(form.highest_pkg)    : null,
        rating:         form.rating         ? Number(form.rating)         : null,
        highlights:     form.highlights     ? form.highlights.split("\n").map(s => s.trim()).filter(Boolean) : [],
        tags:           form.tags           ? form.tags.split(",").map(s => s.trim()).filter(Boolean) : [],
        top_recruiters: form.top_recruiters ? form.top_recruiters.split(",").map(s => s.trim()).filter(Boolean) : [],
        entrance_exams: form.entrance_exams ? form.entrance_exams.split(",").map(s => s.trim()).filter(Boolean) : [],
        courses:        form.courses        ? form.courses.split(",").map(s => s.trim()).filter(Boolean) : [],
        specializations:form.specializations? form.specializations.split(",").map(s => s.trim()).filter(Boolean) : [],
        seo_keywords:   form.seo_keywords   ? form.seo_keywords.split(",").map(s => s.trim()).filter(Boolean) : [],
      }
      const res = await fetch("/api/admin/colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      router.push("/admin/colleges")
    } catch (e) {
      setError(String(e))
    } finally {
      setSaving(false)
    }
  }

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 bg-white"
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1"

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/colleges" className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <h2 className="text-base font-bold text-gray-900">Add College</h2>
          <p className="text-xs text-gray-500">Fill manually or use AI Auto-Fill</p>
        </div>
        <button
          onClick={handleAIFill}
          disabled={generating}
          className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          {generating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          AI Auto-Fill
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save
        </button>
      </div>

      {error   && <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg border border-red-100">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 text-sm px-4 py-2.5 rounded-lg border border-green-100">{success}</div>}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
        {/* Basic Info */}
        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>College Name *</label>
              <input className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} onBlur={handleNameBlur} placeholder="e.g. College of Engineering Pune" />
            </div>
            <div>
              <label className={labelCls}>Slug (URL) *</label>
              <input className={inputCls} value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="coep-pune" />
            </div>
            <div>
              <label className={labelCls}>Short Name</label>
              <input className={inputCls} value={form.short_name} onChange={e => set("short_name", e.target.value)} placeholder="COEP" />
            </div>
            <div>
              <label className={labelCls}>Established Year</label>
              <input className={inputCls} type="number" value={form.established} onChange={e => set("established", e.target.value)} placeholder="1985" />
            </div>
            <div>
              <label className={labelCls}>Type</label>
              <select className={inputCls} value={form.type} onChange={e => set("type", e.target.value)}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Stream</label>
              <select className={inputCls} value={form.stream} onChange={e => set("stream", e.target.value)}>
                {STREAMS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>City *</label>
              <select className={inputCls} value={form.city} onChange={e => set("city", e.target.value)}>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Affiliation</label>
              <input className={inputCls} value={form.affiliation} onChange={e => set("affiliation", e.target.value)} placeholder="University of Pune" />
            </div>
            <div>
              <label className={labelCls}>NAAC Grade</label>
              <select className={inputCls} value={form.naac_grade} onChange={e => set("naac_grade", e.target.value)}>
                {NAAC.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>NIRF Rank</label>
              <input className={inputCls} type="number" value={form.nirf_rank} onChange={e => set("nirf_rank", e.target.value)} placeholder="49" />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelCls}>Address</label>
            <input className={inputCls} value={form.address} onChange={e => set("address", e.target.value)} placeholder="Full postal address" />
          </div>
        </section>

        {/* Description */}
        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Description & Content</h3>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Description</label>
              <textarea className={inputCls} rows={5} value={form.description} onChange={e => set("description", e.target.value)} placeholder="200-word SEO description…" />
            </div>
            <div>
              <label className={labelCls}>Highlights (one per line)</label>
              <textarea className={inputCls} rows={4} value={form.highlights} onChange={e => set("highlights", e.target.value)} placeholder={"NAAC A+ Accredited\nTop placement 2025\n…"} />
            </div>
            <div>
              <label className={labelCls}>Tags (comma-separated)</label>
              <input className={inputCls} value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="NAAC A+, Top Engineering, Hostel" />
            </div>
          </div>
        </section>

        {/* Fees & Placements */}
        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Fees & Placements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={labelCls}>Min Fees (₹/year)</label>
              <input className={inputCls} type="number" value={form.fees_min} onChange={e => set("fees_min", e.target.value)} placeholder="80000" />
            </div>
            <div>
              <label className={labelCls}>Max Fees (₹/year)</label>
              <input className={inputCls} type="number" value={form.fees_max} onChange={e => set("fees_max", e.target.value)} placeholder="180000" />
            </div>
            <div>
              <label className={labelCls}>Avg Package (₹)</label>
              <input className={inputCls} type="number" value={form.avg_placement} onChange={e => set("avg_placement", e.target.value)} placeholder="1200000" />
            </div>
            <div>
              <label className={labelCls}>Highest Package (₹)</label>
              <input className={inputCls} type="number" value={form.highest_pkg} onChange={e => set("highest_pkg", e.target.value)} placeholder="4500000" />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelCls}>Top Recruiters (comma-separated)</label>
            <input className={inputCls} value={form.top_recruiters} onChange={e => set("top_recruiters", e.target.value)} placeholder="TCS, Infosys, Wipro, Amazon" />
          </div>
        </section>

        {/* Courses & Exams */}
        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Courses & Entrance Exams</h3>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Courses Offered (comma-separated)</label>
              <input className={inputCls} value={form.courses} onChange={e => set("courses", e.target.value)} placeholder="B.Tech, M.Tech, MBA" />
            </div>
            <div>
              <label className={labelCls}>Specializations (comma-separated)</label>
              <input className={inputCls} value={form.specializations} onChange={e => set("specializations", e.target.value)} placeholder="Computer Engineering, Mechanical Engineering" />
            </div>
            <div>
              <label className={labelCls}>Entrance Exams Accepted (comma-separated)</label>
              <input className={inputCls} value={form.entrance_exams} onChange={e => set("entrance_exams", e.target.value)} placeholder="MHT-CET, JEE Main, JEE Advanced" />
            </div>
          </div>
        </section>

        {/* Contact & Facilities */}
        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Contact & Facilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Website</label>
              <input className={inputCls} value={form.website} onChange={e => set("website", e.target.value)} placeholder="https://college.ac.in" />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input className={inputCls} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="020-XXXXXXXX" />
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input className={inputCls} value={form.email} onChange={e => set("email", e.target.value)} placeholder="info@college.ac.in" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className={labelCls}>Rating (0-5)</label>
              <input className={inputCls} type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => set("rating", e.target.value)} />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input type="checkbox" id="hostel" checked={form.hostel} onChange={e => set("hostel", e.target.checked)} className="w-4 h-4 accent-orange-500" />
              <label htmlFor="hostel" className="text-sm text-gray-700">Hostel Available</label>
            </div>
          </div>
        </section>

        {/* SEO */}
        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Meta Title (max 70 chars)</label>
              <input className={inputCls} value={form.meta_title} onChange={e => set("meta_title", e.target.value)} maxLength={70} placeholder="College Name — Fees, Placements 2025 | CollegePune" />
              <p className="text-xs text-gray-400 mt-1">{form.meta_title.length}/70</p>
            </div>
            <div>
              <label className={labelCls}>Meta Description (max 160 chars)</label>
              <textarea className={inputCls} rows={2} value={form.meta_desc} onChange={e => set("meta_desc", e.target.value)} maxLength={160} placeholder="160-char description…" />
              <p className="text-xs text-gray-400 mt-1">{form.meta_desc.length}/160</p>
            </div>
            <div>
              <label className={labelCls}>Focus Keywords (comma-separated)</label>
              <input className={inputCls} value={form.seo_keywords} onChange={e => set("seo_keywords", e.target.value)} placeholder="best engineering college pune, COEP admission" />
            </div>
          </div>
        </section>

        {/* Publish */}
        <section>
          <h3 className="text-sm font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Publish Settings</h3>
          <div>
            <label className={labelCls}>Status</label>
            <select className={inputCls + " max-w-xs"} value={form.status} onChange={e => set("status", e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </section>
      </div>

      <div className="flex gap-3 pb-8">
        <Link href="/admin/colleges" className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
          Cancel
        </Link>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg px-6 py-2 text-sm font-medium transition-colors">
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save College
        </button>
      </div>
    </div>
  )
}
