"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Sparkles, Building2, FileText, MapPin, Loader2,
  CheckCircle2, AlertCircle, ExternalLink, Save
} from "lucide-react"
import { slugify } from "@/lib/utils"

type Tab = "college" | "blog" | "city"

const STREAMS = ["Engineering", "MBA", "Medical", "Law", "Arts & Science", "Management", "Architecture", "Commerce"]
const CITIES  = ["Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Solapur", "Amravati", "Thane", "Navi Mumbai"]

export default function AIStudioPage() {
  const router  = useRouter()
  const [tab, setTab]           = useState<Tab>("college")
  const [loading, setLoading]   = useState(false)
  const [result, setResult]     = useState<Record<string, unknown> | null>(null)
  const [error, setError]       = useState("")
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [tokensUsed, setTokensUsed] = useState(0)

  // College form
  const [collegeName, setCollegeName] = useState("")
  const [collegeCity, setCollegeCity] = useState("Pune")
  const [collegeStream, setCollegeStream] = useState("Engineering")

  // Blog form
  const [blogTopic, setBlogTopic]   = useState("")
  const [blogKeyword, setBlogKeyword] = useState("")
  const [blogWords, setBlogWords]   = useState("1200")

  // City page form
  const [cityName, setCityName]     = useState("Nashik")
  const [cityStream, setCityStream] = useState("MBA")
  const [cityColleges, setCityColleges] = useState("")

  const getKey = () => {
    const k = localStorage.getItem("admin_key")
    if (!k) { router.replace("/admin/login"); return null }
    return k
  }

  const reset = () => { setResult(null); setError(""); setSaved(false); setTokensUsed(0) }

  // ── Generate College ──────────────────────────────────────────────
  const handleGenerateCollege = async () => {
    if (!collegeName.trim()) { setError("College name is required"); return }
    const key = getKey(); if (!key) return
    setLoading(true); reset()
    try {
      const res = await fetch("/api/admin/ai/generate-college", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify({ collegeName, city: collegeCity, stream: collegeStream }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setResult(json.college)
      setTokensUsed(json.tokensUsed || 0)
    } catch (e) { setError(String(e)) }
    finally { setLoading(false) }
  }

  const handleSaveCollege = async () => {
    if (!result) return
    const key = getKey(); if (!key) return
    setSaving(true)
    try {
      const res = await fetch("/api/admin/colleges", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify({ ...result, ai_generated: true, status: "draft" }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setSaved(true)
    } catch (e) { setError(String(e)) }
    finally { setSaving(false) }
  }

  // ── Generate Blog ─────────────────────────────────────────────────
  const handleGenerateBlog = async () => {
    if (!blogTopic.trim() || !blogKeyword.trim()) { setError("Topic and keyword are required"); return }
    const key = getKey(); if (!key) return
    setLoading(true); reset()
    try {
      const res = await fetch("/api/admin/ai/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify({ topic: blogTopic, keyword: blogKeyword, wordCount: Number(blogWords) }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setResult(json.blog)
      setTokensUsed(json.tokensUsed || 0)
    } catch (e) { setError(String(e)) }
    finally { setLoading(false) }
  }

  const handleSaveBlog = async () => {
    if (!result) return
    const key = getKey(); if (!key) return
    setSaving(true)
    try {
      const payload = { ...result, ai_generated: true, status: "draft" }
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setSaved(true)
    } catch (e) { setError(String(e)) }
    finally { setSaving(false) }
  }

  // ── Generate City Page ────────────────────────────────────────────
  const handleGenerateCityPage = async () => {
    if (!cityName || !cityStream) { setError("City and stream are required"); return }
    const key = getKey(); if (!key) return
    setLoading(true); reset()
    try {
      const topColleges = cityColleges.split(",").map(s => s.trim()).filter(Boolean)
      const res = await fetch("/api/admin/ai/generate-city-page", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify({ city: cityName, stream: cityStream, topColleges, save: true }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setResult(json.page)
      setTokensUsed(json.tokensUsed || 0)
      setSaved(true) // City pages auto-save
    } catch (e) { setError(String(e)) }
    finally { setLoading(false) }
  }

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-400 bg-white"
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1"

  const tabs: { id: Tab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: "college", icon: <Building2 className="w-4 h-4" />, label: "College Page", desc: "Generate full college data from name only" },
    { id: "blog",    icon: <FileText   className="w-4 h-4" />, label: "SEO Blog",    desc: "800-1500 word article with H2/H3 structure" },
    { id: "city",    icon: <MapPin     className="w-4 h-4" />, label: "City Page",   desc: "Programmatic city+stream landing page" },
  ]

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" /> AI Studio
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">One-click AI content generation. Review before publishing.</p>
      </div>

      {/* Tab selector */}
      <div className="grid grid-cols-3 gap-3">
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setTab(t.id); reset() }}
            className={`flex flex-col items-start gap-1 p-4 rounded-xl border text-left transition-all ${
              tab === t.id
                ? "border-purple-300 bg-purple-50 shadow-sm"
                : "border-gray-200 hover:border-purple-200 hover:bg-gray-50"
            }`}>
            <div className={`flex items-center gap-2 font-semibold text-sm ${tab === t.id ? "text-purple-700" : "text-gray-700"}`}>
              {t.icon} {t.label}
            </div>
            <p className="text-xs text-gray-500">{t.desc}</p>
          </button>
        ))}
      </div>

      {/* Input panel */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {tab === "college" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800">Generate College Data</h3>
            <div>
              <label className={labelCls}>College Name *</label>
              <input className={inputCls} value={collegeName} onChange={e => setCollegeName(e.target.value)}
                placeholder="e.g. Symbiosis Institute of Technology, Pune" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>City</label>
                <select className={inputCls} value={collegeCity} onChange={e => setCollegeCity(e.target.value)}>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Stream</label>
                <select className={inputCls} value={collegeStream} onChange={e => setCollegeStream(e.target.value)}>
                  {STREAMS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button onClick={handleGenerateCollege} disabled={loading}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition-colors">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? "Generating…" : "Generate College Page"}
            </button>
          </div>
        )}

        {tab === "blog" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800">Generate SEO Blog Article</h3>
            <div>
              <label className={labelCls}>Article Topic *</label>
              <input className={inputCls} value={blogTopic} onChange={e => setBlogTopic(e.target.value)}
                placeholder="Top MBA Colleges in Nashik 2025" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Target Keyword *</label>
                <input className={inputCls} value={blogKeyword} onChange={e => setBlogKeyword(e.target.value)}
                  placeholder="MBA colleges in Nashik" />
              </div>
              <div>
                <label className={labelCls}>Word Count</label>
                <select className={inputCls} value={blogWords} onChange={e => setBlogWords(e.target.value)}>
                  <option value="800">800 words (~$0.012)</option>
                  <option value="1200">1200 words (~$0.018)</option>
                  <option value="1500">1500 words (~$0.025)</option>
                </select>
              </div>
            </div>
            <button onClick={handleGenerateBlog} disabled={loading}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition-colors">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? "Writing article…" : "Generate Blog Article"}
            </button>
          </div>
        )}

        {tab === "city" && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800">Generate City Landing Page</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>City *</label>
                <select className={inputCls} value={cityName} onChange={e => setCityName(e.target.value)}>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Stream *</label>
                <select className={inputCls} value={cityStream} onChange={e => setCityStream(e.target.value)}>
                  {STREAMS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Top Colleges in this City (comma-separated, optional)</label>
              <input className={inputCls} value={cityColleges} onChange={e => setCityColleges(e.target.value)}
                placeholder="MIT WPU, Symbiosis, MAEER's MIT" />
            </div>
            <p className="text-xs text-gray-500">Page URL: <code className="bg-gray-100 px-1 rounded">/city/{cityName.toLowerCase()}/{cityStream.toLowerCase()}</code></p>
            <button onClick={handleGenerateCityPage} disabled={loading}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white rounded-lg px-6 py-2.5 text-sm font-medium transition-colors">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? "Generating…" : "Generate & Save City Page"}
            </button>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-100">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm font-semibold text-gray-800">Generated Successfully</span>
              {tokensUsed > 0 && (
                <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                  {tokensUsed.toLocaleString()} tokens
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {saved ? (
                <span className="flex items-center gap-1.5 text-green-700 text-sm font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Saved to database
                </span>
              ) : (
                <>
                  {tab === "college" && (
                    <>
                      <button onClick={handleSaveCollege} disabled={saving}
                        className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg px-3 py-1.5 text-xs font-medium transition-colors">
                        {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                        Save as Draft
                      </button>
                      <Link href="/admin/colleges/add"
                        className="flex items-center gap-1.5 border border-gray-200 text-gray-700 rounded-lg px-3 py-1.5 text-xs hover:bg-gray-50 transition-colors">
                        <ExternalLink className="w-3 h-3" /> Open Add Form
                      </Link>
                    </>
                  )}
                  {tab === "blog" && (
                    <button onClick={handleSaveBlog} disabled={saving}
                      className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg px-3 py-1.5 text-xs font-medium transition-colors">
                      {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                      Save as Draft
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="p-6">
            {tab === "college" && result && (
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {(["name","short_name","type","stream","city","naac_grade","nirf_rank","established","fees_min","fees_max","avg_placement","rating"] as string[]).map(k => (
                    <div key={k}>
                      <p className="text-xs text-gray-400 capitalize">{k.replace(/_/g," ")}</p>
                      <p className="font-medium text-gray-800 text-sm">{String((result as Record<string,unknown>)[k] ?? "—")}</p>
                    </div>
                  ))}
                </div>
                {Boolean(result.description) && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Description</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{String(result.description)}</p>
                  </div>
                )}
                {Array.isArray(result.highlights) && (result.highlights as unknown[]).length > 0 && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Highlights</p>
                    <ul className="list-disc list-inside space-y-0.5">
                      {(result.highlights as unknown[]).map((h,i) => <li key={i} className="text-sm text-gray-700">{String(h)}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {tab === "blog" && result && (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Title</p>
                  <p className="font-bold text-gray-900">{String(result.title ?? "")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Excerpt</p>
                  <p className="text-gray-700">{String(result.excerpt ?? "")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Meta Title</p>
                  <p className="text-gray-700">{String(result.meta_title ?? "")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Category / Read Time</p>
                  <p className="text-gray-700">{String(result.category ?? "")} · {String(result.read_time ?? "")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Body Preview (first 500 chars)</p>
                  <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 font-mono leading-relaxed whitespace-pre-wrap">
                    {String(result.body ?? "").slice(0, 500)}…
                  </div>
                </div>
              </div>
            )}
            {tab === "city" && result && (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-gray-400">Page Title</p>
                  <p className="font-bold text-gray-900">{String(result.title ?? "")}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">URL Slug</p>
                  <code className="text-purple-700 text-xs bg-purple-50 px-2 py-0.5 rounded">/city/{slugify(cityName)}/{slugify(cityStream)}</code>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Intro Preview</p>
                  <p className="text-gray-700 leading-relaxed">{String(result.intro ?? "").slice(0, 400)}…</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">FAQs Generated</p>
                  <p className="text-gray-700">{Array.isArray(result.faqs) ? result.faqs.length : 0} FAQs</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
