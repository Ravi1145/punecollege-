"use client"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Loader2, Plus, Trash2, ChevronDown, ChevronUp, X, FileUp, Link2, CheckCircle } from "lucide-react"
import { slugify } from "@/lib/utils"

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
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
        <h3 className="text-sm font-bold text-gray-800">{title}</h3>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="p-6 space-y-4">{children}</div>}
    </div>
  )
}

function ChipsInput({ label, value, onChange, placeholder }: {
  label: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string
}) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const add = () => {
    const t = input.trim()
    if (!t || value.includes(t)) { setInput(""); return }
    onChange([...value, t]); setInput(""); inputRef.current?.focus()
  }
  const remove = (i: number) => onChange(value.filter((_, j) => j !== i))
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <div className="min-h-[44px] flex flex-wrap gap-1.5 p-2 border border-gray-200 rounded-lg bg-white focus-within:border-orange-400 transition-colors">
        {value.map((v, i) => (
          <span key={i} className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-200 text-xs font-medium px-2 py-1 rounded-full">
            {v}
            <button type="button" onClick={() => remove(i)} className="text-orange-400 hover:text-orange-700"><X className="w-3 h-3" /></button>
          </span>
        ))}
        <input ref={inputRef} className="flex-1 min-w-[120px] text-sm outline-none bg-transparent px-1 placeholder:text-gray-400"
          value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add() } if (e.key === "Backspace" && !input && value.length) remove(value.length - 1) }}
          placeholder={value.length === 0 ? (placeholder ?? "Type and press Enter…") : "Add more…"} />
      </div>
      <p className="text-[10px] text-gray-400 mt-1">Press Enter or comma to add. Click ✕ to remove.</p>
    </div>
  )
}

// ── Detail sub-components ─────────────────────────────────────────────
type DetailProps = { details: Record<string, unknown>; setDetail: (k: string, v: unknown) => void }

function DetailsCourseFees({ details, setDetail }: DetailProps) {
  type CourseFee = { program: string; duration: string; eligibility: string; selection: string; fees_per_year: number; total_fees: number; seats?: number }
  const rows: CourseFee[] = (details.courses_fees as CourseFee[]) || []
  const add = () => setDetail("courses_fees", [...rows, { program: "", duration: "4 Years", eligibility: "", selection: "", fees_per_year: 0, total_fees: 0 }])
  const del = (i: number) => setDetail("courses_fees", rows.filter((_, j) => j !== i))
  const upd = (i: number, k: keyof CourseFee, v: string | number) => setDetail("courses_fees", rows.map((r, j) => j === i ? { ...r, [k]: v } : r))
  return (
    <Section title="Courses & Fees" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Program</label><input className={inputCls} value={r.program} onChange={e => upd(i, "program", e.target.value)} placeholder="B.Tech CSE" /></div>
            <div><label className={labelCls}>Duration</label><input className={inputCls} value={r.duration} onChange={e => upd(i, "duration", e.target.value)} placeholder="4 Years" /></div>
            <div><label className={labelCls}>Seats</label><input className={inputCls} type="number" value={r.seats ?? ""} onChange={e => upd(i, "seats", Number(e.target.value))} placeholder="60" /></div>
            <div><label className={labelCls}>Eligibility</label><input className={inputCls} value={r.eligibility} onChange={e => upd(i, "eligibility", e.target.value)} placeholder="12th PCM 45%" /></div>
            <div><label className={labelCls}>Selection</label><input className={inputCls} value={r.selection} onChange={e => upd(i, "selection", e.target.value)} placeholder="MHT-CET CAP" /></div>
            <div><label className={labelCls}>Fees/Year (₹)</label><input className={inputCls} type="number" value={r.fees_per_year} onChange={e => upd(i, "fees_per_year", Number(e.target.value))} /></div>
            <div><label className={labelCls}>Total Fees (₹)</label><input className={inputCls} type="number" value={r.total_fees} onChange={e => upd(i, "total_fees", Number(e.target.value))} /></div>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 font-medium"><Plus className="w-4 h-4" /> Add Program</button>
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
    <Section title="Admission Process" defaultOpen={false}>
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
  type Cutoff = { program: string; exam: string; year: string; general?: string; obc?: string; sc?: string; st?: string; ews?: string }
  const rows: Cutoff[] = (details.cutoffs as Cutoff[]) || []
  const add = () => setDetail("cutoffs", [...rows, { program: "", exam: "MHT-CET", year: "2025", general: "", obc: "", sc: "", st: "", ews: "" }])
  const del = (i: number) => setDetail("cutoffs", rows.filter((_, j) => j !== i))
  const upd = (i: number, k: keyof Cutoff, v: string) => setDetail("cutoffs", rows.map((r, j) => j === i ? { ...r, [k]: v } : r))
  return (
    <Section title="Cutoffs" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Program</label><input className={inputCls} value={r.program} onChange={e => upd(i, "program", e.target.value)} placeholder="B.Tech CSE" /></div>
            <div><label className={labelCls}>Exam</label><input className={inputCls} value={r.exam} onChange={e => upd(i, "exam", e.target.value)} /></div>
            <div><label className={labelCls}>Year</label><input className={inputCls} value={r.year} onChange={e => upd(i, "year", e.target.value)} /></div>
            <div><label className={labelCls}>General</label><input className={inputCls} value={r.general || ""} onChange={e => upd(i, "general", e.target.value)} placeholder="97.8%" /></div>
            <div><label className={labelCls}>OBC</label><input className={inputCls} value={r.obc || ""} onChange={e => upd(i, "obc", e.target.value)} /></div>
            <div><label className={labelCls}>SC</label><input className={inputCls} value={r.sc || ""} onChange={e => upd(i, "sc", e.target.value)} /></div>
            <div><label className={labelCls}>ST</label><input className={inputCls} value={r.st || ""} onChange={e => upd(i, "st", e.target.value)} /></div>
            <div><label className={labelCls}>EWS</label><input className={inputCls} value={r.ews || ""} onChange={e => upd(i, "ews", e.target.value)} /></div>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium"><Plus className="w-4 h-4" /> Add Cutoff Row</button>
      </div>
    </Section>
  )
}

function DetailsPlacements({ details, setDetail }: DetailProps) {
  type Stat = { program: string; avg_package: number; highest_package: number; placement_pct?: number; companies_visited?: number }
  type SectorStat = { sector: string; percentage: number }
  type Placement = { year: string; stats: Stat[]; sector_wise?: SectorStat[] }
  const p: Placement = (details.placements as Placement) || { year: "2025", stats: [], sector_wise: [] }
  const addStat = () => setDetail("placements", { ...p, stats: [...p.stats, { program: "", avg_package: 0, highest_package: 0 }] })
  const delStat = (i: number) => setDetail("placements", { ...p, stats: p.stats.filter((_, j) => j !== i) })
  const updStat = (i: number, k: keyof Stat, v: string | number) =>
    setDetail("placements", { ...p, stats: p.stats.map((s, j) => j === i ? { ...s, [k]: v } : s) })
  const sectors = p.sector_wise || []
  const addSector = () => setDetail("placements", { ...p, sector_wise: [...sectors, { sector: "", percentage: 0 }] })
  const delSector = (i: number) => setDetail("placements", { ...p, sector_wise: sectors.filter((_, j) => j !== i) })
  const updSector = (i: number, k: keyof SectorStat, v: string | number) =>
    setDetail("placements", { ...p, sector_wise: sectors.map((s, j) => j === i ? { ...s, [k]: v } : s) })
  return (
    <Section title="Placements" defaultOpen={false}>
      <div>
        <label className={labelCls}>Placement Year</label>
        <input className={inputCls + " max-w-xs"} value={p.year} onChange={e => setDetail("placements", { ...p, year: e.target.value })} placeholder="2025" />
      </div>
      <p className="text-xs font-semibold text-gray-700 mt-2">Program-wise Stats</p>
      <div className="space-y-3">
        {p.stats.map((s, i) => (
          <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => delStat(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Program</label><input className={inputCls} value={s.program} onChange={e => updStat(i, "program", e.target.value)} placeholder="B.Tech" /></div>
            <div><label className={labelCls}>Avg Package (₹)</label><input className={inputCls} type="number" value={s.avg_package} onChange={e => updStat(i, "avg_package", Number(e.target.value))} /></div>
            <div><label className={labelCls}>Highest Package (₹)</label><input className={inputCls} type="number" value={s.highest_package} onChange={e => updStat(i, "highest_package", Number(e.target.value))} /></div>
            <div><label className={labelCls}>Placed %</label><input className={inputCls} type="number" value={s.placement_pct || ""} onChange={e => updStat(i, "placement_pct", Number(e.target.value))} /></div>
            <div><label className={labelCls}>Companies Visited</label><input className={inputCls} type="number" value={s.companies_visited || ""} onChange={e => updStat(i, "companies_visited", Number(e.target.value))} /></div>
          </div>
        ))}
        <button type="button" onClick={addStat} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium"><Plus className="w-4 h-4" /> Add Program</button>
      </div>
      <p className="text-xs font-semibold text-gray-700 mt-4">Sector-wise Breakdown</p>
      <div className="space-y-2">
        {sectors.map((s, i) => (
          <div key={i} className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg">
            <input className={inputCls} value={s.sector} onChange={e => updSector(i, "sector", e.target.value)} placeholder="IT & Software" />
            <input className={inputCls + " max-w-[100px]"} type="number" value={s.percentage} onChange={e => updSector(i, "percentage", Number(e.target.value))} placeholder="%" />
            <span className="text-sm text-gray-500">%</span>
            <button type="button" onClick={() => delSector(i)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>
        ))}
        <button type="button" onClick={addSector} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium"><Plus className="w-4 h-4" /> Add Sector</button>
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
    <Section title="Rankings & Accreditations" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Agency</label><input className={inputCls} value={r.agency} onChange={e => upd(i, "agency", e.target.value)} placeholder="NIRF, NAAC…" /></div>
            <div><label className={labelCls}>Category</label><input className={inputCls} value={r.category} onChange={e => upd(i, "category", e.target.value)} placeholder="Engineering" /></div>
            <div><label className={labelCls}>Rank</label><input className={inputCls} type="number" value={r.rank ?? ""} onChange={e => upd(i, "rank", e.target.value ? Number(e.target.value) : null)} /></div>
            <div><label className={labelCls}>Grade (e.g. A+)</label><input className={inputCls} value={r.grade || ""} onChange={e => upd(i, "grade", e.target.value)} /></div>
            <div><label className={labelCls}>Year</label><input className={inputCls} value={r.year} onChange={e => upd(i, "year", e.target.value)} placeholder="2025" /></div>
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
    <Section title="Scholarships" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Scholarship Name</label><input className={inputCls} value={r.name} onChange={e => upd(i, "name", e.target.value)} /></div>
            <div><label className={labelCls}>Amount</label><input className={inputCls} value={r.amount} onChange={e => upd(i, "amount", e.target.value)} placeholder="Full tuition / ₹50,000" /></div>
            <div><label className={labelCls}>Eligibility</label><input className={inputCls} value={r.eligibility} onChange={e => upd(i, "eligibility", e.target.value)} /></div>
            <div><label className={labelCls}>Provider</label><input className={inputCls} value={r.provider || ""} onChange={e => upd(i, "provider", e.target.value)} /></div>
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
    <Section title="Campus Facilities" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Facility Name</label><input className={inputCls} value={r.name} onChange={e => upd(i, "name", e.target.value)} placeholder="Library, Lab, Sports…" /></div>
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
    <Section title="Notable Alumni" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-lg relative">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Name</label><input className={inputCls} value={r.name} onChange={e => upd(i, "name", e.target.value)} /></div>
            <div><label className={labelCls}>Designation</label><input className={inputCls} value={r.designation} onChange={e => upd(i, "designation", e.target.value)} /></div>
            <div><label className={labelCls}>Batch Year</label><input className={inputCls} value={r.batch || ""} onChange={e => upd(i, "batch", e.target.value)} placeholder="2010" /></div>
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
    <Section title="Hostel Info" defaultOpen={false}>
      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" id="hostel_avail" checked={!!h.available} onChange={e => upd("available", e.target.checked)} className="w-4 h-4 accent-orange-500" />
        <label htmlFor="hostel_avail" className="text-sm text-gray-700">Hostel Available</label>
      </div>
      {h.available && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><label className={labelCls}>Boys Hostels</label><input className={inputCls} type="number" value={h.boys_hostels || ""} onChange={e => upd("boys_hostels", Number(e.target.value))} /></div>
          <div><label className={labelCls}>Girls Hostels</label><input className={inputCls} type="number" value={h.girls_hostels || ""} onChange={e => upd("girls_hostels", Number(e.target.value))} /></div>
          <div><label className={labelCls}>Total Capacity</label><input className={inputCls} type="number" value={h.total_capacity || ""} onChange={e => upd("total_capacity", Number(e.target.value))} /></div>
          <div><label className={labelCls}>Fees/Year (₹)</label><input className={inputCls} type="number" value={h.fees_per_year || ""} onChange={e => upd("fees_per_year", Number(e.target.value))} /></div>
          <div className="col-span-2">
            <label className={labelCls}>Facilities (comma-separated)</label>
            <input className={inputCls} value={(h.facilities || []).join(", ")} onChange={e => upd("facilities", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} placeholder="WiFi, AC, Mess, Gym" />
          </div>
          <div className="col-span-3">
            <label className={labelCls}>Notes</label>
            <input className={inputCls} value={h.notes || ""} onChange={e => upd("notes", e.target.value)} />
          </div>
        </div>
      )}
    </Section>
  )
}

function DetailsCampus({ details, setDetail }: DetailProps) {
  return (
    <Section title="Campus Stats" defaultOpen={false}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div><label className={labelCls}>Campus Area</label><input className={inputCls} value={String(details.campus_area || "")} onChange={e => setDetail("campus_area", e.target.value)} placeholder="25 acres" /></div>
        <div><label className={labelCls}>Total Students</label><input className={inputCls} type="number" value={String(details.total_students || "")} onChange={e => setDetail("total_students", Number(e.target.value))} /></div>
        <div><label className={labelCls}>Faculty Count</label><input className={inputCls} type="number" value={String(details.faculty_count || "")} onChange={e => setDetail("faculty_count", Number(e.target.value))} /></div>
        <div><label className={labelCls}>Student:Faculty Ratio</label><input className={inputCls} value={String(details.student_faculty_ratio || "")} onChange={e => setDetail("student_faculty_ratio", e.target.value)} placeholder="15:1" /></div>
      </div>
    </Section>
  )
}

function DetailsFaqs({ details, setDetail }: DetailProps) {
  type Faq = { q: string; a: string }
  const rows: Faq[] = (details.faqs as Faq[]) || []
  const add = () => setDetail("faqs", [...rows, { q: "", a: "" }])
  const del = (i: number) => setDetail("faqs", rows.filter((_, j) => j !== i))
  const upd = (i: number, k: keyof Faq, v: string) => setDetail("faqs", rows.map((r, j) => j === i ? { ...r, [k]: v } : r))
  return (
    <Section title="FAQs" defaultOpen={false}>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg relative space-y-2">
            <button type="button" onClick={() => del(i)} className="absolute top-2 right-2 text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
            <div><label className={labelCls}>Question</label><input className={inputCls} value={r.q} onChange={e => upd(i, "q", e.target.value)} placeholder="What is the NEET cutoff for…" /></div>
            <div><label className={labelCls}>Answer</label><textarea className={inputCls} rows={3} value={r.a} onChange={e => upd(i, "a", e.target.value)} placeholder="Detailed answer…" /></div>
          </div>
        ))}
        <button type="button" onClick={add} className="flex items-center gap-1.5 text-sm text-orange-600 font-medium"><Plus className="w-4 h-4" /> Add FAQ</button>
      </div>
    </Section>
  )
}

// ── Import Section ────────────────────────────────────────────────────
function convertSheetsUrl(url: string): string {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)
  if (!match) return url
  const id = match[1]
  const gidMatch = url.match(/[?&]gid=(\d+)/)
  const gid = gidMatch ? gidMatch[1] : "0"
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let cur = ""
  let inQ = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') { inQ = !inQ }
    else if (ch === "," && !inQ) { result.push(cur); cur = "" }
    else { cur += ch }
  }
  result.push(cur)
  return result.map(s => s.trim())
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormState = Record<string, any>
type FillFn = {
  setForm: React.Dispatch<React.SetStateAction<FormState>>
  setCourses: (v: string[]) => void
  setSpecializations: (v: string[]) => void
  setEntranceExams: (v: string[]) => void
  setTopRecruiters: (v: string[]) => void
  setDetails: React.Dispatch<React.SetStateAction<Record<string, unknown>>>
}

function fillFromData(data: Record<string, unknown>, fns: FillFn) {
  const str = (v: unknown) => v != null ? String(v) : ""
  const arr = (v: unknown): string[] => Array.isArray(v) ? v as string[] : typeof v === "string" ? v.split(",").map(s => s.trim()).filter(Boolean) : []

  fns.setForm((f: FormState) => ({
    ...f,
    name:        str(data.name        || data.college_name),
    slug:        str(data.slug)        || (data.name ? slugify(String(data.name)) : f.slug),
    short_name:  str(data.short_name  || data.shortName),
    type:        str(data.type)        || f.type,
    stream:      str(data.stream)     || f.stream,
    city:        str(data.city)       || f.city,
    state:       str(data.state)      || f.state,
    established: str(data.established),
    affiliation: str(data.affiliation),
    naac_grade:  str(data.naac_grade  || data.naac) || f.naac_grade,
    nirf_rank:   str(data.nirf_rank   || data.nirfRank),
    address:     str(data.address),
    description: str(data.description),
    highlights:  Array.isArray(data.highlights) ? (data.highlights as string[]).join("\n") : str(data.highlights),
    tags:        Array.isArray(data.tags) ? (data.tags as string[]).join(", ") : str(data.tags),
    fees_min:    str(data.fees_min    || (data.feesRange as Record<string,unknown>)?.min),
    fees_max:    str(data.fees_max    || (data.feesRange as Record<string,unknown>)?.max),
    avg_placement: str(data.avg_placement || data.avgPlacement),
    highest_pkg: str(data.highest_pkg  || data.highestPlacement),
    hostel:      Boolean(data.hostel),
    rating:      str(data.rating)     || f.rating,
    review_count: str(data.review_count || data.reviewCount) || f.review_count,
    website:     str(data.website),
    phone:       str(data.phone),
    email:       str(data.email),
    image_url:   str(data.image_url   || data.image),
    meta_title:  str(data.meta_title),
    meta_desc:   str(data.meta_desc),
    seo_keywords: Array.isArray(data.seo_keywords) ? (data.seo_keywords as string[]).join(", ") : str(data.seo_keywords),
    status:      str(data.status)     || f.status,
  }))

  fns.setCourses(arr(data.courses))
  fns.setSpecializations(arr(data.specializations))
  fns.setEntranceExams(arr(data.entrance_exams || data.entranceExams))
  fns.setTopRecruiters(arr(data.top_recruiters || data.topRecruiters))

  if (data.details && typeof data.details === "object") {
    const det = data.details as Record<string, unknown>
    if (data.faqs) det.faqs = data.faqs
    fns.setDetails(det)
  } else if (data.faqs) {
    fns.setDetails({ faqs: data.faqs })
  }
}

interface ImportSectionProps extends FillFn {
  onFilled: () => void
}

function ImportSection({ onFilled, ...fns }: ImportSectionProps) {
  const [source, setSource]     = useState<"file" | "sheets">("file")
  const [sheetsUrl, setSheetsUrl] = useState("")
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState("")
  const [err, setErr]           = useState("")
  const fileRef = useRef<HTMLInputElement>(null)
  const adminKey = () => typeof window !== "undefined" ? localStorage.getItem("admin_key") ?? "" : ""

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setErr(""); setSuccess("")
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string
        if (file.name.endsWith(".json")) {
          const parsed = JSON.parse(text)
          const data = Array.isArray(parsed) ? parsed[0] : parsed
          fillFromData(data, fns)
          setSuccess("✓ JSON loaded — form filled. Review and save.")
          onFilled()
        } else {
          // CSV
          const lines = text.trim().split("\n").filter(Boolean)
          if (lines.length < 2) { setErr("CSV needs a header row + at least one data row"); return }
          const headers = parseCSVLine(lines[0])
          const values  = parseCSVLine(lines[1])
          const obj: Record<string, unknown> = {}
          headers.forEach((h, i) => { obj[h.trim()] = values[i] ?? "" })
          fillFromData(obj, fns)
          setSuccess("✓ CSV loaded — form filled. Review and save.")
          onFilled()
        }
      } catch (e) { setErr("Parse error: " + String(e)) }
    }
    reader.readAsText(file)
  }

  const handleSheets = async () => {
    if (!sheetsUrl.trim()) { setErr("Paste a Google Sheets URL first"); return }
    setLoading(true); setErr(""); setSuccess("")
    try {
      const csvUrl = convertSheetsUrl(sheetsUrl.trim())
      const res = await fetch("/api/admin/import?preview=1", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey() },
        body: JSON.stringify({ type: "colleges", source: "sheets", sheetsUrl: csvUrl }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      const rows = json.rows as Record<string, unknown>[]
      if (!rows?.length) throw new Error("No data rows found in the sheet")
      fillFromData(rows[0], fns)
      setSuccess(`✓ Sheet loaded (${json.total} rows found, filled from row 1). Review and save.`)
      onFilled()
    } catch (e) { setErr(String(e)) }
    finally { setLoading(false) }
  }

  return (
    <div className="bg-white rounded-xl border border-orange-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 bg-orange-50 border-b border-orange-100">
        <FileUp className="w-4 h-4 text-orange-500" />
        <h3 className="text-sm font-bold text-gray-800">Import Data (Auto-fill Form)</h3>
        <span className="ml-auto text-xs text-orange-600 font-medium">Optional — or fill manually below</span>
      </div>
      <div className="p-6 space-y-4">
        {/* Source toggle */}
        <div className="flex gap-2">
          {(["file", "sheets"] as const).map(s => (
            <button key={s} type="button" onClick={() => setSource(s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${source === s ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {s === "file" ? <FileUp className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
              {s === "file" ? "Upload File" : "Google Sheets"}
            </button>
          ))}
        </div>

        {source === "file" && (
          <div>
            <p className="text-xs text-gray-500 mb-2">Upload a <strong>JSON</strong> (single college object) or <strong>CSV</strong> (header row + 1 data row). All fields will auto-fill.</p>
            <input ref={fileRef} type="file" accept=".json,.csv" onChange={handleFile} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-600 hover:border-orange-300 hover:text-orange-600 transition-colors w-full justify-center">
              <FileUp className="w-4 h-4" />
              Click to choose JSON or CSV file
            </button>
          </div>
        )}

        {source === "sheets" && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500">Paste your Google Sheets URL. Sheet must be shared as <strong>"Anyone with link can view"</strong>. Row 1 = headers, Row 2 = college data.</p>
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400"
                value={sheetsUrl}
                onChange={e => setSheetsUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
              />
              <button type="button" onClick={handleSheets} disabled={loading}
                className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Link2 className="w-4 h-4" />}
                Load Sheet
              </button>
            </div>
          </div>
        )}

        {err     && <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg"><AlertCircle className="w-4 h-4 flex-shrink-0" />{err}</div>}
        {success && <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg"><CheckCircle className="w-4 h-4 flex-shrink-0" />{success}</div>}
      </div>
    </div>
  )
}

// Add missing import for AlertCircle
const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

// ── Main Page ─────────────────────────────────────────────────────────
export default function AddCollegePage() {
  const router = useRouter()
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState("")
  const [activeTab, setActiveTab] = useState<"basic" | "details">("basic")

  const [courses,         setCourses]         = useState<string[]>([])
  const [specializations, setSpecializations] = useState<string[]>([])
  const [entranceExams,   setEntranceExams]   = useState<string[]>([])
  const [topRecruiters,   setTopRecruiters]   = useState<string[]>([])
  const [details, setDetails] = useState<Record<string, unknown>>({})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [form, setForm] = useState<Record<string, any>>({
    name: "", slug: "", short_name: "", type: "Private", stream: "Engineering",
    city: "Pune", state: "Maharashtra", established: "", affiliation: "",
    naac_grade: "A+", nirf_rank: "", address: "", description: "",
    highlights: "", tags: "",
    fees_min: "", fees_max: "", avg_placement: "", highest_pkg: "",
    hostel: false, rating: "4.0", review_count: "0",
    website: "", phone: "", email: "", image_url: "",
    meta_title: "", meta_desc: "", seo_keywords: "", status: "draft",
  })

  const set = (k: string, v: unknown) => setForm((f: FormState) => ({ ...f, [k]: v }))
  const setDetail = (k: string, v: unknown) => setDetails(d => ({ ...d, [k]: v }))

  const handleNameBlur = () => {
    if (form.name && !form.slug) set("slug", slugify(form.name))
  }

  const handleSave = async () => {
    if (!form.name || !form.slug || !form.city) {
      setError("Name, slug, and city are required"); return
    }
    const key = localStorage.getItem("admin_key")
    if (!key) return
    setSaving(true); setError("")
    try {
      // Extract FAQs from details to save at top level
      const { faqs, ...detailsWithoutFaqs } = details as Record<string, unknown> & { faqs?: unknown }
      const payload = {
        ...form,
        established:   form.established   ? Number(form.established)   : null,
        nirf_rank:     form.nirf_rank     ? Number(form.nirf_rank)     : null,
        fees_min:      form.fees_min      ? Number(form.fees_min)      : null,
        fees_max:      form.fees_max      ? Number(form.fees_max)      : null,
        avg_placement: form.avg_placement ? Number(form.avg_placement) : null,
        highest_pkg:   form.highest_pkg   ? Number(form.highest_pkg)   : null,
        rating:        form.rating        ? Number(form.rating)        : null,
        review_count:  form.review_count  ? Number(form.review_count)  : 0,
        highlights:    form.highlights    ? String(form.highlights).split("\n").map((s: string) => s.trim()).filter(Boolean) : [],
        tags:          form.tags          ? String(form.tags).split(",").map((s: string) => s.trim()).filter(Boolean) : [],
        seo_keywords:  form.seo_keywords  ? String(form.seo_keywords).split(",").map((s: string) => s.trim()).filter(Boolean) : [],
        courses,
        specializations,
        entrance_exams: entranceExams,
        top_recruiters: topRecruiters,
        details: Object.keys(detailsWithoutFaqs).length > 0 ? detailsWithoutFaqs : null,
        faqs: faqs ?? null,
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

  return (
    <div className="max-w-4xl space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/colleges" className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <h2 className="text-base font-bold text-gray-900">Add College</h2>
          <p className="text-xs text-gray-500">Fill Basic Info first, then add Profile Details for full tab data</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg border border-red-100">{error}</div>}

      {/* Import section */}
      <ImportSection
        setForm={setForm}
        setCourses={setCourses}
        setSpecializations={setSpecializations}
        setEntranceExams={setEntranceExams}
        setTopRecruiters={setTopRecruiters}
        setDetails={setDetails}
        onFilled={() => setActiveTab("basic")}
      />

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
                <input className={inputCls} value={form.name} onChange={e => set("name", e.target.value)} onBlur={handleNameBlur} placeholder="e.g. College of Engineering Pune" /></div>
              <div><label className={labelCls}>Slug (URL) *</label>
                <input className={inputCls} value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="coep-pune" /></div>
              <div><label className={labelCls}>Short Name</label>
                <input className={inputCls} value={form.short_name} onChange={e => set("short_name", e.target.value)} placeholder="COEP" /></div>
              <div><label className={labelCls}>Established Year</label>
                <input className={inputCls} type="number" value={form.established} onChange={e => set("established", e.target.value)} placeholder="1985" /></div>
              <div><label className={labelCls}>Type</label>
                <select className={inputCls} value={form.type} onChange={e => set("type", e.target.value)}>
                  {TYPES.map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label className={labelCls}>Stream</label>
                <select className={inputCls} value={form.stream} onChange={e => set("stream", e.target.value)}>
                  {STREAMS.map(s => <option key={s}>{s}</option>)}</select></div>
              <div><label className={labelCls}>City *</label>
                <select className={inputCls} value={form.city} onChange={e => set("city", e.target.value)}>
                  {CITIES.map(c => <option key={c}>{c}</option>)}</select></div>
              <div><label className={labelCls}>Affiliation</label>
                <input className={inputCls} value={form.affiliation} onChange={e => set("affiliation", e.target.value)} placeholder="University of Pune" /></div>
              <div><label className={labelCls}>NAAC Grade</label>
                <select className={inputCls} value={form.naac_grade} onChange={e => set("naac_grade", e.target.value)}>
                  {NAAC.map(g => <option key={g}>{g}</option>)}</select></div>
              <div><label className={labelCls}>NIRF Rank</label>
                <input className={inputCls} type="number" value={form.nirf_rank} onChange={e => set("nirf_rank", e.target.value)} placeholder="49" /></div>
            </div>
            <div><label className={labelCls}>Address</label>
              <input className={inputCls} value={form.address} onChange={e => set("address", e.target.value)} placeholder="Full postal address" /></div>
          </Section>

          <Section title="Description & Content">
            <div><label className={labelCls}>Description</label>
              <textarea className={inputCls} rows={5} value={form.description} onChange={e => set("description", e.target.value)} placeholder="200-word SEO description…" /></div>
            <div><label className={labelCls}>Highlights (one per line)</label>
              <textarea className={inputCls} rows={4} value={form.highlights} onChange={e => set("highlights", e.target.value)} placeholder={"NAAC A+ Accredited\nTop placement 2025\n…"} /></div>
            <div><label className={labelCls}>Tags (comma-separated)</label>
              <input className={inputCls} value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="NAAC A+, Top Engineering, Hostel" /></div>
          </Section>

          <Section title="Fees & Placements">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div><label className={labelCls}>Min Fees (₹/year)</label>
                <input className={inputCls} type="number" value={form.fees_min} onChange={e => set("fees_min", e.target.value)} placeholder="80000" /></div>
              <div><label className={labelCls}>Max Fees (₹/year)</label>
                <input className={inputCls} type="number" value={form.fees_max} onChange={e => set("fees_max", e.target.value)} placeholder="180000" /></div>
              <div><label className={labelCls}>Avg Package (₹)</label>
                <input className={inputCls} type="number" value={form.avg_placement} onChange={e => set("avg_placement", e.target.value)} placeholder="1200000" /></div>
              <div><label className={labelCls}>Highest Package (₹)</label>
                <input className={inputCls} type="number" value={form.highest_pkg} onChange={e => set("highest_pkg", e.target.value)} placeholder="4500000" /></div>
            </div>
            <ChipsInput label="Top Recruiters" value={topRecruiters} onChange={setTopRecruiters} placeholder="e.g. TCS, Infosys, Amazon…" />
          </Section>

          <Section title="Courses & Entrance Exams">
            <ChipsInput label="Courses Offered" value={courses} onChange={setCourses} placeholder="e.g. B.Tech, M.Tech, MBA…" />
            <ChipsInput label="Specializations / Branches" value={specializations} onChange={setSpecializations} placeholder="e.g. Computer Engineering, Finance…" />
            <ChipsInput label="Entrance Exams Accepted" value={entranceExams} onChange={setEntranceExams} placeholder="e.g. MHT-CET, JEE Main, NEET…" />
          </Section>

          <Section title="Contact & Facilities">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><label className={labelCls}>Website</label>
                <input className={inputCls} value={form.website} onChange={e => set("website", e.target.value)} placeholder="https://college.ac.in" /></div>
              <div><label className={labelCls}>Phone</label>
                <input className={inputCls} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="020-XXXXXXXX" /></div>
              <div><label className={labelCls}>Email</label>
                <input className={inputCls} value={form.email} onChange={e => set("email", e.target.value)} placeholder="info@college.ac.in" /></div>
            </div>
            <div><label className={labelCls}>Logo / Image URL</label>
              <input className={inputCls} value={form.image_url} onChange={e => set("image_url", e.target.value)} placeholder="https://cdn.example.com/college-logo.png" /></div>
            <div className="grid grid-cols-3 gap-4">
              <div><label className={labelCls}>Rating (0-5)</label>
                <input className={inputCls} type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => set("rating", e.target.value)} /></div>
              <div><label className={labelCls}>Review Count</label>
                <input className={inputCls} type="number" min="0" value={form.review_count} onChange={e => set("review_count", e.target.value)} /></div>
              <div className="flex items-center gap-2 pt-5">
                <input type="checkbox" id="hostel" checked={form.hostel} onChange={e => set("hostel", e.target.checked)} className="w-4 h-4 accent-orange-500" />
                <label htmlFor="hostel" className="text-sm text-gray-700">Hostel Available</label>
              </div>
            </div>
          </Section>

          <Section title="SEO Settings" defaultOpen={false}>
            <div><label className={labelCls}>Meta Title (max 70 chars)</label>
              <input className={inputCls} value={form.meta_title} onChange={e => set("meta_title", e.target.value)} maxLength={70} placeholder="College Name — Fees, Placements 2025 | CollegePune" />
              <p className="text-xs text-gray-400 mt-1">{form.meta_title.length}/70</p></div>
            <div><label className={labelCls}>Meta Description (max 160 chars)</label>
              <textarea className={inputCls} rows={2} value={form.meta_desc} onChange={e => set("meta_desc", e.target.value)} maxLength={160} placeholder="160-char description…" />
              <p className="text-xs text-gray-400 mt-1">{form.meta_desc.length}/160</p></div>
            <div><label className={labelCls}>Focus Keywords (comma-separated)</label>
              <input className={inputCls} value={form.seo_keywords} onChange={e => set("seo_keywords", e.target.value)} placeholder="best engineering college pune, COEP admission" /></div>
          </Section>

          <Section title="Publish">
            <div className="max-w-xs"><label className={labelCls}>Status</label>
              <select className={inputCls} value={form.status} onChange={e => set("status", e.target.value)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </Section>
        </>
      )}

      {/* ── DETAILS TAB ── */}
      {activeTab === "details" && (
        <>
          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-xs text-blue-700">
            These sections power the profile tabs shown on the college page (Courses, Admission, Cutoffs, Placements, Rankings, etc.)
          </div>
          <DetailsCampus details={details} setDetail={setDetail} />
          <DetailsCourseFees details={details} setDetail={setDetail} />
          <DetailsAdmission details={details} setDetail={setDetail} />
          <DetailsCutoffs details={details} setDetail={setDetail} />
          <DetailsPlacements details={details} setDetail={setDetail} />
          <DetailsRankings details={details} setDetail={setDetail} />
          <DetailsScholarships details={details} setDetail={setDetail} />
          <DetailsFacilities details={details} setDetail={setDetail} />
          <DetailsAlumni details={details} setDetail={setDetail} />
          <DetailsHostel details={details} setDetail={setDetail} />
          <DetailsFaqs details={details} setDetail={setDetail} />
        </>
      )}

      <div className="flex gap-3 pb-8">
        <Link href="/admin/colleges" className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">Cancel</Link>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white rounded-lg px-6 py-2 text-sm font-medium transition-colors">
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save College
        </button>
      </div>
    </div>
  )
}
