"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp, X } from "lucide-react"

const STREAMS = ["Engineering", "MBA", "Medical", "Law", "Arts & Science", "Management", "Architecture", "Commerce"]
const TYPES   = ["Government", "Private", "Deemed", "Autonomous"]
const NAAC    = ["A++", "A+", "A", "B++", "B+", "B", "C"]
const CITIES  = ["Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Solapur", "Amravati", "Thane", "Navi Mumbai"]

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 bg-white"
const labelCls = "block text-xs font-semibold text-gray-600 mb-1"

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="p-6 space-y-4">{children}</div>}
    </div>
  )
}

// ── Chip input — add/remove individual items ─────────────────────────
function ChipsInput({ label, value, onChange, placeholder }: {
  label: string
  value: string[]
  onChange: (v: string[]) => void
  placeholder?: string
}) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const add = () => {
    const trimmed = input.trim()
    if (!trimmed || value.includes(trimmed)) { setInput(""); return }
    onChange([...value, trimmed])
    setInput("")
    inputRef.current?.focus()
  }

  const remove = (i: number) => onChange(value.filter((_, j) => j !== i))

  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="min-h-[44px] flex flex-wrap gap-1.5 p-2 border border-gray-200 rounded-lg bg-white focus-within:border-orange-400 transition-colors">
        {value.map((v, i) => (
          <span key={i} className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 text-xs font-medium px-2 py-1 rounded-full">
            {v}
            <button type="button" onClick={() => remove(i)} className="text-orange-400 hover:text-orange-700 ml-0.5">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          className="flex-1 min-w-[120px] text-sm outline-none bg-transparent px-1 placeholder:text-gray-400"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add() } if (e.key === "Backspace" && !input && value.length) { remove(value.length - 1) } }}
          placeholder={value.length === 0 ? (placeholder ?? "Type and press Enter…") : "Add more…"}
        />
      </div>
      <p className="text-[10px] text-gray-400 mt-1">Press Enter or comma to add. Backspace removes last item.</p>
    </div>
  )
}

export default function EditCollegePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [form, setForm]       = useState<Record<string, string | boolean>>({})
  const [details, setDetails] = useState<Record<string, unknown>>({})
  // Chip arrays — stored separately for easy add/remove
  const [courses,        setCourses]        = useState<string[]>([])
  const [specializations,setSpecializations]= useState<string[]>([])
  const [entranceExams,  setEntranceExams]  = useState<string[]>([])
  const [topRecruiters,  setTopRecruiters]  = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState("")
  const [activeTab, setActiveTab] = useState<"basic" | "details">("basic")

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))
  const setDetail = (k: string, v: unknown) => setDetails(d => ({ ...d, [k]: v }))

  useEffect(() => {
    const load = async () => {
      const key = localStorage.getItem("admin_key")
      if (!key) { router.replace("/admin/login"); return }
      try {
        const res = await fetch(`/api/admin/colleges/${id}`, { headers: { "x-admin-key": key } })
        if (!res.ok) { setError("College not found"); setLoading(false); return }
        const { college: c } = await res.json()
        setForm({
          ...c,
          highlights:   (c.highlights   || []).join("\n"),
          tags:         (c.tags         || []).join(", "),
          seo_keywords: (c.seo_keywords || []).join(", "),
          established:  String(c.established || ""),
          nirf_rank:    String(c.nirf_rank   ?? ""),
          fees_min:     String(c.fees_min    || ""),
          fees_max:     String(c.fees_max    || ""),
          avg_placement:String(c.avg_placement || ""),
          highest_pkg:  String(c.highest_pkg   || ""),
          rating:       String(c.rating        || "4.0"),
          review_count: String(c.review_count  || "0"),
        })
        // Chip arrays
        setCourses(c.courses || [])
        setSpecializations(c.specializations || [])
        setEntranceExams(c.entrance_exams || [])
        setTopRecruiters(c.top_recruiters || [])
        if (c.details) setDetails(c.details)
      } catch { setError("Failed to load college") }
      finally { setLoading(false) }
    }
    load()
  }, [id, router])

  const handleSave = async () => {
    const key = localStorage.getItem("admin_key")
    if (!key) return
    setSaving(true); setError("")
    try {
      const arr   = (v: string) => String(v || "").split(",").map(s => s.trim()).filter(Boolean)
      const lines = (v: string) => String(v || "").split("\n").map(s => s.trim()).filter(Boolean)
      const payload = {
        ...form,
        established:     form.established  ? Number(form.established)  : null,
        nirf_rank:       form.nirf_rank    ? Number(form.nirf_rank)    : null,
        fees_min:        form.fees_min     ? Number(form.fees_min)     : null,
        fees_max:        form.fees_max     ? Number(form.fees_max)     : null,
        avg_placement:   form.avg_placement? Number(form.avg_placement): null,
        highest_pkg:     form.highest_pkg  ? Number(form.highest_pkg)  : null,
        rating:          form.rating       ? Number(form.rating)       : null,
        review_count:    form.review_count ? Number(form.review_count) : 0,
        highlights:      lines(form.highlights as string),
        tags:            arr(form.tags as string),
        seo_keywords:    arr(form.seo_keywords as string),
        // chip arrays
        courses,
        specializations,
        entrance_exams:  entranceExams,
        top_recruiters:  topRecruiters,
        details:         Object.keys(details).length > 0 ? details : null,
      }
      const res = await fetch(`/api/admin/colleges/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-admin-key": key },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      router.push("/admin/colleges")
    } catch (e) { setError(String(e)) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="flex items-center justify-center h-48 text-gray-400 text-sm"><Loader2 className="w-5 h-5 animate-spin mr-2" />Loading…</div>

  return (
    <div className="max-w-4xl space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/colleges" className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <h2 className="text-base font-bold text-gray-900">Edit College</h2>
          <p className="text-xs text-gray-500">{form.name as string}</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save Changes
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg border border-red-100">{error}</div>}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {(["basic", "details"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
            {tab === "basic" ? "Basic Info" : "Profile Details"}
          </button>
        ))}
      </div>

      {/* ── BASIC TAB ── */}
      {activeTab === "basic" && (
        <>
          <Section title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelCls}>College Name *</label>
                <input className={inputCls} value={String(form.name||"")} onChange={e=>set("name",e.target.value)} /></div>
              <div><label className={labelCls}>Slug *</label>
                <input className={inputCls} value={String(form.slug||"")} onChange={e=>set("slug",e.target.value)} /></div>
              <div><label className={labelCls}>Short Name</label>
                <input className={inputCls} value={String(form.short_name||"")} onChange={e=>set("short_name",e.target.value)} /></div>
              <div><label className={labelCls}>Established</label>
                <input className={inputCls} type="number" value={String(form.established||"")} onChange={e=>set("established",e.target.value)} /></div>
              <div><label className={labelCls}>Type</label>
                <select className={inputCls} value={String(form.type||"Private")} onChange={e=>set("type",e.target.value)}>
                  {TYPES.map(t=><option key={t}>{t}</option>)}</select></div>
              <div><label className={labelCls}>Stream</label>
                <select className={inputCls} value={String(form.stream||"Engineering")} onChange={e=>set("stream",e.target.value)}>
                  {STREAMS.map(s=><option key={s}>{s}</option>)}</select></div>
              <div><label className={labelCls}>City *</label>
                <select className={inputCls} value={String(form.city||"Pune")} onChange={e=>set("city",e.target.value)}>
                  {CITIES.map(c=><option key={c}>{c}</option>)}</select></div>
              <div><label className={labelCls}>NAAC Grade</label>
                <select className={inputCls} value={String(form.naac_grade||"A+")} onChange={e=>set("naac_grade",e.target.value)}>
                  {NAAC.map(g=><option key={g}>{g}</option>)}</select></div>
              <div><label className={labelCls}>NIRF Rank</label>
                <input className={inputCls} type="number" value={String(form.nirf_rank||"")} onChange={e=>set("nirf_rank",e.target.value)} /></div>
              <div><label className={labelCls}>Affiliation</label>
                <input className={inputCls} value={String(form.affiliation||"")} onChange={e=>set("affiliation",e.target.value)} /></div>
            </div>
            <div><label className={labelCls}>Address</label>
              <input className={inputCls} value={String(form.address||"")} onChange={e=>set("address",e.target.value)} /></div>
            <div><label className={labelCls}>Image URL</label>
              <input className={inputCls} value={String(form.image_url||"")} onChange={e=>set("image_url",e.target.value)} placeholder="https://..." /></div>
          </Section>

          <Section title="Content">
            <div><label className={labelCls}>Description</label>
              <textarea className={inputCls} rows={5} value={String(form.description||"")} onChange={e=>set("description",e.target.value)} /></div>
            <div><label className={labelCls}>Highlights (one per line)</label>
              <textarea className={inputCls} rows={4} value={String(form.highlights||"")} onChange={e=>set("highlights",e.target.value)} /></div>
            <div><label className={labelCls}>Tags (comma-separated)</label>
              <input className={inputCls} value={String(form.tags||"")} onChange={e=>set("tags",e.target.value)} /></div>
          </Section>

          <Section title="Fees & Placements">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><label className={labelCls}>Min Fees (₹)</label>
                <input className={inputCls} type="number" value={String(form.fees_min||"")} onChange={e=>set("fees_min",e.target.value)} /></div>
              <div><label className={labelCls}>Max Fees (₹)</label>
                <input className={inputCls} type="number" value={String(form.fees_max||"")} onChange={e=>set("fees_max",e.target.value)} /></div>
              <div><label className={labelCls}>Avg Package (₹)</label>
                <input className={inputCls} type="number" value={String(form.avg_placement||"")} onChange={e=>set("avg_placement",e.target.value)} /></div>
              <div><label className={labelCls}>Highest Package (₹)</label>
                <input className={inputCls} type="number" value={String(form.highest_pkg||"")} onChange={e=>set("highest_pkg",e.target.value)} /></div>
            </div>
            <ChipsInput
              label="Top Recruiters"
              value={topRecruiters}
              onChange={setTopRecruiters}
              placeholder="e.g. TCS, Infosys, Google…"
            />
          </Section>

          <Section title="Courses & Exams">
            <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-2 text-xs text-blue-700">
              <strong>Tip:</strong> Type a course name and press <kbd className="bg-white border border-blue-200 rounded px-1">Enter</kbd> or <kbd className="bg-white border border-blue-200 rounded px-1">,</kbd> to add. Click <strong>✕</strong> to remove. These chips appear as badges on the college profile.
            </div>
            <ChipsInput
              label="Courses Offered"
              value={courses}
              onChange={setCourses}
              placeholder="e.g. B.Tech, M.Tech, MBA…"
            />
            <ChipsInput
              label="Specializations / Branches"
              value={specializations}
              onChange={setSpecializations}
              placeholder="e.g. Computer Engineering, MBA Finance…"
            />
            <ChipsInput
              label="Entrance Exams Accepted"
              value={entranceExams}
              onChange={setEntranceExams}
              placeholder="e.g. JEE Main, MHT-CET, NEET…"
            />
          </Section>

          <Section title="Contact">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className={labelCls}>Website</label>
                <input className={inputCls} value={String(form.website||"")} onChange={e=>set("website",e.target.value)} /></div>
              <div><label className={labelCls}>Phone</label>
                <input className={inputCls} value={String(form.phone||"")} onChange={e=>set("phone",e.target.value)} /></div>
              <div><label className={labelCls}>Email</label>
                <input className={inputCls} value={String(form.email||"")} onChange={e=>set("email",e.target.value)} /></div>
            </div>
            <div><label className={labelCls}>Logo / Image URL</label>
              <input className={inputCls} value={String(form.image_url||"")} onChange={e=>set("image_url",e.target.value)} placeholder="https://cdn.example.com/logo.png" /></div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className={labelCls}>Rating (0–5)</label>
                <input className={inputCls} type="number" step="0.1" min="0" max="5" value={String(form.rating||"4.0")} onChange={e=>set("rating",e.target.value)} /></div>
              <div><label className={labelCls}>Review Count</label>
                <input className={inputCls} type="number" min="0" value={String(form.review_count||"0")} onChange={e=>set("review_count",e.target.value)} /></div>
              <div className="flex items-center gap-2 pt-5">
                <input type="checkbox" id="hostel" checked={!!form.hostel} onChange={e=>set("hostel",e.target.checked)} className="w-4 h-4 accent-orange-500" />
                <label htmlFor="hostel" className="text-sm text-gray-700">Hostel Available</label>
              </div>
            </div>
          </Section>

          <Section title="SEO" defaultOpen={false}>
            <div><label className={labelCls}>Meta Title</label>
              <input className={inputCls} value={String(form.meta_title||"")} onChange={e=>set("meta_title",e.target.value)} maxLength={70} />
              <p className="text-xs text-gray-400 mt-1">{String(form.meta_title||"").length}/70</p></div>
            <div><label className={labelCls}>Meta Description</label>
              <textarea className={inputCls} rows={2} value={String(form.meta_desc||"")} onChange={e=>set("meta_desc",e.target.value)} maxLength={160} />
              <p className="text-xs text-gray-400 mt-1">{String(form.meta_desc||"").length}/160</p></div>
            <div><label className={labelCls}>Focus Keywords (comma-separated)</label>
              <input className={inputCls} value={String(form.seo_keywords||"")} onChange={e=>set("seo_keywords",e.target.value)} /></div>
          </Section>

          <Section title="Publish">
            <div className="max-w-xs">
              <label className={labelCls}>Status</label>
              <select className={inputCls} value={String(form.status||"draft")} onChange={e=>set("status",e.target.value)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </Section>
        </>
      )}

      {/* ── DETAILS TAB (maps to CollegeProfile tabs) ── */}
      {activeTab === "details" && (
        <>
          {/* Courses & Fees */}
          <DetailsCourseFees details={details} setDetail={setDetail} />
          {/* Admission Process */}
          <DetailsAdmission details={details} setDetail={setDetail} />
          {/* Cutoffs */}
          <DetailsCutoffs details={details} setDetail={setDetail} />
          {/* Placements */}
          <DetailsPlacements details={details} setDetail={setDetail} />
          {/* Rankings */}
          <DetailsRankings details={details} setDetail={setDetail} />
          {/* Scholarships */}
          <DetailsScholarships details={details} setDetail={setDetail} />
          {/* Facilities */}
          <DetailsFacilities details={details} setDetail={setDetail} />
          {/* Alumni */}
          <DetailsAlumni details={details} setDetail={setDetail} />
          {/* Hostel */}
          <DetailsHostel details={details} setDetail={setDetail} />
          {/* Campus Stats */}
          <DetailsCampus details={details} setDetail={setDetail} />
        </>
      )}

      <div className="flex gap-3 pb-8">
        <Link href="/admin/colleges" className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">Cancel</Link>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg px-6 py-2 text-sm font-medium transition-colors">
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save Changes
        </button>
      </div>
    </div>
  )
}

// ── Detail sub-components ─────────────────────────────────────────

type DetailProps = { details: Record<string, unknown>; setDetail: (k: string, v: unknown) => void }

function DetailsCourseFees({ details, setDetail }: DetailProps) {
  type CourseFee = { program: string; duration: string; eligibility: string; selection: string; fees_per_year: number; total_fees: number; seats?: number }
  const rows: CourseFee[] = (details.courses_fees as CourseFee[]) || []
  const add = () => setDetail("courses_fees", [...rows, { program: "", duration: "4 Years", eligibility: "", selection: "", fees_per_year: 0, total_fees: 0 }])
  const del = (i: number) => setDetail("courses_fees", rows.filter((_, j) => j !== i))
  const upd = (i: number, k: keyof CourseFee, v: string | number) => {
    const next = rows.map((r, j) => j === i ? { ...r, [k]: v } : r)
    setDetail("courses_fees", next)
  }
  return (
    <Section title="Courses & Fees (Profile Tab)">
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Program</label><input className={inputCls} value={r.program} onChange={e => upd(i, "program", e.target.value)} placeholder="B.Tech CSE" /></div>
            <div><label className={labelCls}>Duration</label><input className={inputCls} value={r.duration} onChange={e => upd(i, "duration", e.target.value)} placeholder="4 Years" /></div>
            <div><label className={labelCls}>Eligibility</label><input className={inputCls} value={r.eligibility} onChange={e => upd(i, "eligibility", e.target.value)} placeholder="12th PCM 45%" /></div>
            <div><label className={labelCls}>Selection</label><input className={inputCls} value={r.selection} onChange={e => upd(i, "selection", e.target.value)} placeholder="MHT-CET CAP" /></div>
            <div><label className={labelCls}>Fees/Year (₹)</label><input className={inputCls} type="number" value={r.fees_per_year} onChange={e => upd(i, "fees_per_year", Number(e.target.value))} /></div>
            <div><label className={labelCls}>Total Fees (₹)</label><input className={inputCls} type="number" value={r.total_fees} onChange={e => upd(i, "total_fees", Number(e.target.value))} /></div>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 font-medium">
          <Plus className="w-4 h-4" /> Add Program
        </button>
      </div>
    </Section>
  )
}

function DetailsAdmission({ details, setDetail }: DetailProps) {
  type Step = { step: number; title: string; description: string }
  const rows: Step[] = (details.admission_process as Step[]) || []
  const add = () => setDetail("admission_process", [...rows, { step: rows.length + 1, title: "", description: "" }])
  const del = (i: number) => setDetail("admission_process", rows.filter((_, j) => j !== i).map((r, j) => ({ ...r, step: j + 1 })))
  const upd = (i: number, k: keyof Step, v: string) => setDetail("admission_process", rows.map((r, j) => j === i ? { ...r, [k]: v } : r))
  return (
    <Section title="Admission Process (Profile Tab)" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="flex gap-3 items-start p-3 bg-gray-50 rounded-lg">
            <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">{r.step}</div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <input className={inputCls} value={r.title} onChange={e => upd(i, "title", e.target.value)} placeholder="Step title" />
              <input className={inputCls} value={r.description} onChange={e => upd(i, "description", e.target.value)} placeholder="Step description" />
            </div>
            <button type="button" onClick={() => del(i)} className="text-red-400 hover:text-red-600 mt-1"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium"><Plus className="w-4 h-4" /> Add Step</button>
      </div>
    </Section>
  )
}

function DetailsCutoffs({ details, setDetail }: DetailProps) {
  type Cutoff = { program: string; exam: string; year: string; general?: string; obc?: string; sc?: string; st?: string }
  const rows: Cutoff[] = (details.cutoffs as Cutoff[]) || []
  const add = () => setDetail("cutoffs", [...rows, { program: "", exam: "MHT-CET", year: "2025", general: "", obc: "", sc: "", st: "" }])
  const del = (i: number) => setDetail("cutoffs", rows.filter((_, j) => j !== i))
  const upd = (i: number, k: keyof Cutoff, v: string) => setDetail("cutoffs", rows.map((r, j) => j === i ? { ...r, [k]: v } : r))
  return (
    <Section title="Cutoffs (Profile Tab)" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Program</label><input className={inputCls} value={r.program} onChange={e => upd(i, "program", e.target.value)} /></div>
            <div><label className={labelCls}>Exam</label><input className={inputCls} value={r.exam} onChange={e => upd(i, "exam", e.target.value)} /></div>
            <div><label className={labelCls}>Year</label><input className={inputCls} value={r.year} onChange={e => upd(i, "year", e.target.value)} /></div>
            <div><label className={labelCls}>General</label><input className={inputCls} value={r.general||""} onChange={e => upd(i, "general", e.target.value)} placeholder="97.8%" /></div>
            <div><label className={labelCls}>OBC</label><input className={inputCls} value={r.obc||""} onChange={e => upd(i, "obc", e.target.value)} /></div>
            <div><label className={labelCls}>SC</label><input className={inputCls} value={r.sc||""} onChange={e => upd(i, "sc", e.target.value)} /></div>
            <div><label className={labelCls}>ST</label><input className={inputCls} value={r.st||""} onChange={e => upd(i, "st", e.target.value)} /></div>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium"><Plus className="w-4 h-4" /> Add Cutoff Row</button>
      </div>
    </Section>
  )
}

function DetailsPlacements({ details, setDetail }: DetailProps) {
  type Stat = { program: string; avg_package: number; highest_package: number; placement_pct?: number; companies_visited?: number }
  type Placement = { year: string; stats: Stat[] }
  const p: Placement = (details.placements as Placement) || { year: "2025", stats: [] }
  const addStat = () => setDetail("placements", { ...p, stats: [...p.stats, { program: "", avg_package: 0, highest_package: 0 }] })
  const delStat = (i: number) => setDetail("placements", { ...p, stats: p.stats.filter((_, j) => j !== i) })
  const updStat = (i: number, k: keyof Stat, v: string | number) =>
    setDetail("placements", { ...p, stats: p.stats.map((s, j) => j === i ? { ...s, [k]: v } : s) })
  return (
    <Section title="Placements (Profile Tab)" defaultOpen={false}>
      <div><label className={labelCls}>Placement Year</label>
        <input className={inputCls + " max-w-xs"} value={p.year} onChange={e => setDetail("placements", { ...p, year: e.target.value })} placeholder="2025" /></div>
      <div className="space-y-3 mt-2">
        {p.stats.map((s, i) => (
          <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => delStat(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Program</label><input className={inputCls} value={s.program} onChange={e => updStat(i, "program", e.target.value)} /></div>
            <div><label className={labelCls}>Avg Package (₹)</label><input className={inputCls} type="number" value={s.avg_package} onChange={e => updStat(i, "avg_package", Number(e.target.value))} /></div>
            <div><label className={labelCls}>Highest Package (₹)</label><input className={inputCls} type="number" value={s.highest_package} onChange={e => updStat(i, "highest_package", Number(e.target.value))} /></div>
            <div><label className={labelCls}>Placed %</label><input className={inputCls} type="number" value={s.placement_pct||""} onChange={e => updStat(i, "placement_pct", Number(e.target.value))} /></div>
            <div><label className={labelCls}>Companies</label><input className={inputCls} type="number" value={s.companies_visited||""} onChange={e => updStat(i, "companies_visited", Number(e.target.value))} /></div>
          </div>
        ))}
        <button type="button" onClick={addStat} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium"><Plus className="w-4 h-4" /> Add Program Stats</button>
      </div>
    </Section>
  )
}

function DetailsRankings({ details, setDetail }: DetailProps) {
  type Ranking = { agency: string; category: string; rank: number | null; grade?: string; year: string }
  const rows: Ranking[] = (details.rankings as Ranking[]) || []
  const add = () => setDetail("rankings", [...rows, { agency: "NIRF", category: "Engineering", rank: null, grade: "", year: "2025" }])
  const del = (i: number) => setDetail("rankings", rows.filter((_, j) => j !== i))
  const upd = (i: number, k: keyof Ranking, v: string | number | null) => setDetail("rankings", rows.map((r, j) => j === i ? { ...r, [k]: v } : r))
  return (
    <Section title="Rankings & Accreditations (Profile Tab)" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Agency</label><input className={inputCls} value={r.agency} onChange={e => upd(i, "agency", e.target.value)} /></div>
            <div><label className={labelCls}>Category</label><input className={inputCls} value={r.category} onChange={e => upd(i, "category", e.target.value)} /></div>
            <div><label className={labelCls}>Rank</label><input className={inputCls} type="number" value={r.rank ?? ""} onChange={e => upd(i, "rank", e.target.value ? Number(e.target.value) : null)} /></div>
            <div><label className={labelCls}>Grade (e.g. A+)</label><input className={inputCls} value={r.grade||""} onChange={e => upd(i, "grade", e.target.value)} /></div>
            <div><label className={labelCls}>Year</label><input className={inputCls} value={r.year} onChange={e => upd(i, "year", e.target.value)} /></div>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium"><Plus className="w-4 h-4" /> Add Ranking</button>
      </div>
    </Section>
  )
}

function DetailsScholarships({ details, setDetail }: DetailProps) {
  type Scholarship = { name: string; eligibility: string; amount: string; provider?: string }
  const rows: Scholarship[] = (details.scholarships as Scholarship[]) || []
  const add = () => setDetail("scholarships", [...rows, { name: "", eligibility: "", amount: "", provider: "" }])
  const del = (i: number) => setDetail("scholarships", rows.filter((_, j) => j !== i))
  const upd = (i: number, k: keyof Scholarship, v: string) => setDetail("scholarships", rows.map((r, j) => j === i ? { ...r, [k]: v } : r))
  return (
    <Section title="Scholarships (Profile Tab)" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Scholarship Name</label><input className={inputCls} value={r.name} onChange={e => upd(i, "name", e.target.value)} /></div>
            <div><label className={labelCls}>Amount</label><input className={inputCls} value={r.amount} onChange={e => upd(i, "amount", e.target.value)} placeholder="Full tuition / ₹50,000" /></div>
            <div><label className={labelCls}>Eligibility</label><input className={inputCls} value={r.eligibility} onChange={e => upd(i, "eligibility", e.target.value)} /></div>
            <div><label className={labelCls}>Provider</label><input className={inputCls} value={r.provider||""} onChange={e => upd(i, "provider", e.target.value)} /></div>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium"><Plus className="w-4 h-4" /> Add Scholarship</button>
      </div>
    </Section>
  )
}

function DetailsFacilities({ details, setDetail }: DetailProps) {
  type Facility = { name: string; description: string }
  const rows: Facility[] = (details.facilities as Facility[]) || []
  const add = () => setDetail("facilities", [...rows, { name: "", description: "" }])
  const del = (i: number) => setDetail("facilities", rows.filter((_, j) => j !== i))
  const upd = (i: number, k: keyof Facility, v: string) => setDetail("facilities", rows.map((r, j) => j === i ? { ...r, [k]: v } : r))
  return (
    <Section title="Campus Facilities (Profile Tab)" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Facility</label><input className={inputCls} value={r.name} onChange={e => upd(i, "name", e.target.value)} placeholder="Library, Lab, Sports…" /></div>
            <div><label className={labelCls}>Description</label><input className={inputCls} value={r.description} onChange={e => upd(i, "description", e.target.value)} /></div>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium"><Plus className="w-4 h-4" /> Add Facility</button>
      </div>
    </Section>
  )
}

function DetailsAlumni({ details, setDetail }: DetailProps) {
  type Alumni = { name: string; designation: string; batch?: string }
  const rows: Alumni[] = (details.alumni as Alumni[]) || []
  const add = () => setDetail("alumni", [...rows, { name: "", designation: "", batch: "" }])
  const del = (i: number) => setDetail("alumni", rows.filter((_, j) => j !== i))
  const upd = (i: number, k: keyof Alumni, v: string) => setDetail("alumni", rows.map((r, j) => j === i ? { ...r, [k]: v } : r))
  return (
    <Section title="Notable Alumni (Profile Tab)" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Name</label><input className={inputCls} value={r.name} onChange={e => upd(i, "name", e.target.value)} /></div>
            <div><label className={labelCls}>Designation</label><input className={inputCls} value={r.designation} onChange={e => upd(i, "designation", e.target.value)} /></div>
            <div><label className={labelCls}>Batch Year</label><input className={inputCls} value={r.batch||""} onChange={e => upd(i, "batch", e.target.value)} placeholder="2010" /></div>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium"><Plus className="w-4 h-4" /> Add Alumni</button>
      </div>
    </Section>
  )
}

function DetailsHostel({ details, setDetail }: DetailProps) {
  type HostelInfo = { available: boolean; boys_hostels?: number; girls_hostels?: number; total_capacity?: number; fees_per_year?: number; facilities?: string[]; notes?: string }
  const h: HostelInfo = (details.hostel_info as HostelInfo) || { available: false }
  const upd = (k: keyof HostelInfo, v: unknown) => setDetail("hostel_info", { ...h, [k]: v })
  return (
    <Section title="Hostel Info (Profile Tab)" defaultOpen={false}>
      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" id="hostel_avail" checked={!!h.available} onChange={e => upd("available", e.target.checked)} className="w-4 h-4 accent-orange-500" />
        <label htmlFor="hostel_avail" className="text-sm text-gray-700">Hostel Available</label>
      </div>
      {h.available && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><label className={labelCls}>Boys Hostels</label><input className={inputCls} type="number" value={h.boys_hostels||""} onChange={e => upd("boys_hostels", Number(e.target.value))} /></div>
          <div><label className={labelCls}>Girls Hostels</label><input className={inputCls} type="number" value={h.girls_hostels||""} onChange={e => upd("girls_hostels", Number(e.target.value))} /></div>
          <div><label className={labelCls}>Total Capacity</label><input className={inputCls} type="number" value={h.total_capacity||""} onChange={e => upd("total_capacity", Number(e.target.value))} /></div>
          <div><label className={labelCls}>Fees/Year (₹)</label><input className={inputCls} type="number" value={h.fees_per_year||""} onChange={e => upd("fees_per_year", Number(e.target.value))} /></div>
          <div className="col-span-2"><label className={labelCls}>Facilities (comma-separated)</label>
            <input className={inputCls} value={(h.facilities||[]).join(", ")} onChange={e => upd("facilities", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} placeholder="WiFi, AC, Mess, Gym" /></div>
          <div className="col-span-3"><label className={labelCls}>Notes</label><input className={inputCls} value={h.notes||""} onChange={e => upd("notes", e.target.value)} /></div>
        </div>
      )}
    </Section>
  )
}

function DetailsCampus({ details, setDetail }: DetailProps) {
  return (
    <Section title="Campus Stats (Profile Tab)" defaultOpen={false}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div><label className={labelCls}>Campus Area</label><input className={inputCls} value={String(details.campus_area||"")} onChange={e => setDetail("campus_area", e.target.value)} placeholder="25 acres" /></div>
        <div><label className={labelCls}>Total Students</label><input className={inputCls} type="number" value={String(details.total_students||"")} onChange={e => setDetail("total_students", Number(e.target.value))} /></div>
        <div><label className={labelCls}>Faculty Count</label><input className={inputCls} type="number" value={String(details.faculty_count||"")} onChange={e => setDetail("faculty_count", Number(e.target.value))} /></div>
        <div><label className={labelCls}>Student:Faculty Ratio</label><input className={inputCls} value={String(details.student_faculty_ratio||"")} onChange={e => setDetail("student_faculty_ratio", e.target.value)} placeholder="15:1" /></div>
      </div>
    </Section>
  )
}
