"use client"
import { useState, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Upload, Link2, Eye, CheckCircle, AlertCircle, Loader2, Download } from "lucide-react"

type ImportType = "colleges" | "blogs"
type SourceType = "csv" | "sheets"

interface PreviewRow {
  [key: string]: string
}

const COLLEGE_TEMPLATE = `name,slug,short_name,type,stream,city,state,naac_grade,nirf_rank,fees_min,fees_max,avg_placement,highest_pkg,courses,entrance_exams,hostel,website,description,status
College of Engineering Pune,coep-pune,COEP,Government,Engineering,Pune,Maharashtra,A++,49,25000,50000,1200000,4500000,"B.Tech, M.Tech","JEE Main, MHT-CET",true,https://coep.org.in,"Premier engineering college in Pune",draft`

const BLOG_TEMPLATE = `title,slug,excerpt,category,author,tags,read_time,status
Best Engineering Colleges in Pune 2026,best-engineering-colleges-pune-2026,"Top engineering colleges with fees and placement data",Admissions,CollegePune,"engineering, pune, colleges",5 min read,draft`

export default function ImportPage() {
  const [importType, setImportType]   = useState<ImportType>("colleges")
  const [source, setSource]           = useState<SourceType>("csv")
  const [csvText, setCsvText]         = useState("")
  const [sheetsUrl, setSheetsUrl]     = useState("")
  const [preview, setPreview]         = useState<PreviewRow[] | null>(null)
  const [totalRows, setTotalRows]     = useState(0)
  const [loading, setLoading]         = useState(false)
  const [importing, setImporting]     = useState(false)
  const [result, setResult]           = useState<{ imported: number; errors: string[]; total: number } | null>(null)
  const [error, setError]             = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const adminKey = () => {
    if (typeof window !== "undefined") return localStorage.getItem("admin_key") ?? ""
    return ""
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setCsvText(ev.target?.result as string ?? "")
    reader.readAsText(file)
  }

  const handlePreview = async () => {
    setLoading(true); setError(""); setPreview(null); setResult(null)
    try {
      const res = await fetch("/api/admin/import?preview=1", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey() },
        body: JSON.stringify({ type: importType, source, csvText, sheetsUrl }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setPreview(json.rows)
      setTotalRows(json.total)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  const handleImport = async () => {
    setImporting(true); setError(""); setResult(null)
    try {
      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey() },
        body: JSON.stringify({ type: importType, source, csvText, sheetsUrl }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setResult(json)
      setPreview(null)
      setCsvText("")
      setSheetsUrl("")
    } catch (e) {
      setError(String(e))
    } finally {
      setImporting(false)
    }
  }

  const downloadTemplate = () => {
    const text = importType === "colleges" ? COLLEGE_TEMPLATE : BLOG_TEMPLATE
    const blob = new Blob([text], { type: "text/csv" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href = url
    a.download = `${importType}-template.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-400 bg-white"
  const tabCls   = (active: boolean) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${active ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`

  const hasInput = source === "csv" ? csvText.trim().length > 0 : sheetsUrl.trim().length > 0

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin" className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <h2 className="text-base font-bold text-gray-900">Import Data</h2>
          <p className="text-xs text-gray-500">Bulk import colleges or blog posts from CSV or Google Sheets</p>
        </div>
        <button
          onClick={downloadTemplate}
          className="flex items-center gap-1.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Download Template
        </button>
      </div>

      {error  && <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg border border-red-100 flex items-center gap-2"><AlertCircle className="w-4 h-4 flex-shrink-0" />{error}</div>}
      {result && (
        <div className={`text-sm px-4 py-3 rounded-lg border flex items-start gap-2 ${result.errors.length ? "bg-yellow-50 border-yellow-200 text-yellow-800" : "bg-green-50 border-green-200 text-green-800"}`}>
          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold">
              Imported {result.imported} of {result.total} {importType}
              {result.errors.length > 0 && ` — ${result.errors.length} skipped`}
            </p>
            {result.errors.length > 0 && (
              <ul className="mt-1 space-y-0.5 text-xs">
                {result.errors.slice(0, 5).map((e, i) => <li key={i}>{e}</li>)}
                {result.errors.length > 5 && <li>…and {result.errors.length - 5} more</li>}
              </ul>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">

        {/* Step 1 — Type */}
        <section>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Step 1 — Choose what to import</p>
          <div className="flex gap-2">
            <button className={tabCls(importType === "colleges")} onClick={() => setImportType("colleges")}>
              Colleges
            </button>
            <button className={tabCls(importType === "blogs")} onClick={() => setImportType("blogs")}>
              Blog Posts
            </button>
          </div>
        </section>

        {/* Step 2 — Source */}
        <section>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Step 2 — Choose data source</p>
          <div className="flex gap-2 mb-4">
            <button className={tabCls(source === "csv")} onClick={() => setSource("csv")}>
              <Upload className="w-3.5 h-3.5 inline mr-1.5" />Upload CSV
            </button>
            <button className={tabCls(source === "sheets")} onClick={() => setSource("sheets")}>
              <Link2 className="w-3.5 h-3.5 inline mr-1.5" />Google Sheets URL
            </button>
          </div>

          {source === "csv" ? (
            <div className="space-y-3">
              <div
                className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-orange-300 hover:bg-orange-50/30 transition-all"
                onClick={() => fileRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">Click to select a CSV file</p>
                <p className="text-xs text-gray-400 mt-1">or paste CSV text below</p>
                {csvText && <p className="text-xs text-green-600 font-semibold mt-2">✓ File loaded ({csvText.split('\n').length - 1} data rows)</p>}
              </div>
              <input ref={fileRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleFileChange} />
              <textarea
                className={inputCls + " font-mono text-xs"}
                rows={6}
                value={csvText}
                onChange={e => setCsvText(e.target.value)}
                placeholder={`Paste CSV text here, or use the template (download above)…\n\nRequired column for colleges: name\nRequired column for blogs: title`}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <input
                className={inputCls}
                type="url"
                value={sheetsUrl}
                onChange={e => setSheetsUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit"
              />
              <p className="text-xs text-gray-400">
                The sheet must be shared as <strong>Anyone with link can view</strong>.
                The first row must contain column headers matching the template.
              </p>
            </div>
          )}
        </section>

        {/* Step 3 — Preview & Import */}
        <section>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Step 3 — Preview & import</p>
          <div className="flex gap-3">
            <button
              onClick={handlePreview}
              disabled={loading || !hasInput}
              className="flex items-center gap-1.5 bg-[#0A1628] hover:bg-[#0d1f3c] disabled:opacity-50 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Eye className="w-3.5 h-3.5" />}
              Preview (first 10 rows)
            </button>
            <button
              onClick={handleImport}
              disabled={importing || !hasInput}
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {importing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              Import All
            </button>
          </div>
        </section>
      </div>

      {/* Preview table */}
      {preview && preview.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-900">
              Preview — showing first {preview.length} of {totalRows} rows
            </p>
            <button
              onClick={handleImport}
              disabled={importing}
              className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
            >
              {importing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
              Import All {totalRows} rows
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {Object.keys(preview[0]).slice(0, 8).map((col) => (
                    <th key={col} className="text-left px-4 py-2.5 text-gray-600 font-semibold whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                  {Object.keys(preview[0]).length > 8 && (
                    <th className="text-left px-4 py-2.5 text-gray-400 font-medium">+{Object.keys(preview[0]).length - 8} more</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    {Object.keys(preview[0]).slice(0, 8).map((col) => (
                      <td key={col} className="px-4 py-2.5 text-gray-700 whitespace-nowrap max-w-[160px] overflow-hidden text-ellipsis">
                        {row[col] || <span className="text-gray-300">—</span>}
                      </td>
                    ))}
                    {Object.keys(preview[0]).length > 8 && <td className="px-4 py-2.5 text-gray-400">…</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Column reference */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3">
          {importType === "colleges" ? "College" : "Blog"} CSV Column Reference
        </h3>
        {importType === "colleges" ? (
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-xs text-gray-600">
            {[
              ["name *", "College full name (required)"],
              ["slug", "URL slug — auto-generated if empty"],
              ["short_name", "Abbreviation e.g. COEP"],
              ["type", "Government / Private / Deemed / Autonomous"],
              ["stream", "Engineering / MBA / Medical / Law…"],
              ["city", "Pune (default)"],
              ["state", "Maharashtra (default)"],
              ["naac_grade", "A++ / A+ / A / B++ / B+ / B / C"],
              ["nirf_rank", "Numeric rank"],
              ["fees_min", "Annual fees min in ₹"],
              ["fees_max", "Annual fees max in ₹"],
              ["avg_placement", "Average package in ₹"],
              ["highest_pkg", "Highest package in ₹"],
              ["courses", "Comma-separated: B.Tech, M.Tech"],
              ["entrance_exams", "Comma-separated: JEE, MHT-CET"],
              ["hostel", "true / false"],
              ["rating", "0.0 – 5.0"],
              ["website", "https://…"],
              ["description", "Plain text description"],
              ["tags", "Comma-separated keywords"],
              ["status", "draft (default) / published"],
            ].map(([col, desc]) => (
              <div key={col} className="flex gap-2">
                <span className="font-mono font-semibold text-orange-700 flex-shrink-0 w-32">{col}</span>
                <span className="text-gray-500">{desc}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-xs text-gray-600">
            {[
              ["title *", "Blog post title (required)"],
              ["slug", "URL slug — auto-generated if empty"],
              ["excerpt", "Short summary (1-2 sentences)"],
              ["body", "Full HTML/Markdown content"],
              ["author", "Author name"],
              ["category", "Admissions / MHT-CET / MBA…"],
              ["tags", "Comma-separated tags"],
              ["read_time", "e.g. 5 min read"],
              ["status", "draft (default) / published"],
              ["meta_title", "SEO title"],
              ["meta_desc", "SEO description"],
              ["image_url", "Featured image URL"],
            ].map(([col, desc]) => (
              <div key={col} className="flex gap-2">
                <span className="font-mono font-semibold text-orange-700 flex-shrink-0 w-32">{col}</span>
                <span className="text-gray-500">{desc}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
