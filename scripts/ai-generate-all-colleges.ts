/**
 * Phase 3 — AI-generate rich details for all colleges in Supabase
 * Usage:
 *   npx tsx scripts/ai-generate-all-colleges.ts            # live run
 *   DRY_RUN=true npx tsx scripts/ai-generate-all-colleges.ts
 *   OVERWRITE=true npx tsx scripts/ai-generate-all-colleges.ts  # regenerate existing
 *   SLUG=coep-pune npx tsx scripts/ai-generate-all-colleges.ts  # single college
 */
import * as dotenv from "dotenv"
import * as path from "path"
import { fileURLToPath } from "url"
import { createClient } from "@supabase/supabase-js"
import Anthropic from "@anthropic-ai/sdk"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, "../.env.local") })

const DRY_RUN   = process.env.DRY_RUN === "true"
const OVERWRITE  = process.env.OVERWRITE === "true"
const ONLY_SLUG  = process.env.SLUG ?? ""
const CONCURRENCY = 2
const DELAY_MS   = 2500
const MODEL      = "claude-haiku-4-5-20251001"
const MAX_RETRIES = 4

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

// ─── Types ────────────────────────────────────────────────────────────────────
interface CollegeRow {
  id: string
  slug: string
  name: string
  short_name: string | null
  type: string | null
  stream: string | null
  established: number | null
  affiliation: string | null
  naac_grade: string | null
  nirf_rank: number | null
  courses: string[] | null
  entrance_exams: string[] | null
  fees_min: number | null
  fees_max: number | null
  avg_placement: number | null
  highest_pkg: number | null
  top_recruiters: string[] | null
  hostel: boolean
  highlights: string[] | null
  description: string | null
  details: Record<string, unknown> | null
}

type Result = {
  ok: boolean
  slug: string
  skipped?: boolean
  error?: string
  inputTokens?: number
  outputTokens?: number
}

// ─── Prompt builder ────────────────────────────────────────────────────────────
function buildPrompt(c: CollegeRow): string {
  const courses = c.courses ?? []
  const exams   = c.entrance_exams ?? []
  const recrts  = c.top_recruiters ?? []
  const highs   = c.highlights ?? []

  const feesMin = c.fees_min  ? `₹${Math.round(c.fees_min  / 1000)}K` : "Not specified"
  const feesMax = c.fees_max  ? `₹${Math.round(c.fees_max  / 1000)}K` : "Not specified"
  const avgPkg  = c.avg_placement ? `₹${(c.avg_placement / 100000).toFixed(1)}L` : "Not specified"
  const hiPkg   = c.highest_pkg   ? `₹${(c.highest_pkg   / 100000).toFixed(1)}L` : "Not specified"

  return `You are an expert content writer for an Indian education portal. Generate accurate, detailed college profile data for "${c.name}" in Pune, Maharashtra.

COLLEGE:
- Name: ${c.name} (Short: ${c.short_name ?? c.name})
- Type: ${c.type ?? "Private"} | Stream: ${c.stream ?? "Engineering"}
- Established: ${c.established ?? "N/A"} | Affiliation: ${c.affiliation ?? "Savitribai Phule Pune University"}
- NAAC: ${c.naac_grade ?? "Not graded"} | NIRF Rank: ${c.nirf_rank ?? "Not ranked"}
- Courses: ${courses.join(", ") || "Typical courses for this stream"}
- Exams: ${exams.join(", ") || "MHT-CET, JEE Main"}
- Fees: ${feesMin} – ${feesMax} per year | Avg Package: ${avgPkg} | Highest: ${hiPkg}
- Recruiters: ${recrts.join(", ") || "TCS, Infosys, Wipro, Cognizant"}
- Hostel: ${c.hostel ? "Yes (boys & girls separate)" : "No"}
- Highlights: ${highs.join("; ") || "N/A"}

Return ONLY a raw JSON object (no markdown, no code fences). Use this exact structure:

{
  "courses_fees": [
    {"course":"Full course name","duration":"4 years","eligibility":"12th PCM 50%+","selection":"MHT-CET CAP counselling","fees_per_year":120000}
  ],
  "admission_process": [
    {"step":1,"title":"Step title","description":"Detailed step for ${c.short_name ?? c.name}"}
  ],
  "placements": {
    "avg_package":"${avgPkg}","highest_package":"${hiPkg}","placement_rate":"85%",
    "companies_visited":${Math.max(recrts.length, 40)},
    "sector_wise":[
      {"sector":"IT & Software","percentage":55},
      {"sector":"Core Engineering","percentage":20},
      {"sector":"Management & Consulting","percentage":15},
      {"sector":"Others","percentage":10}
    ]
  },
  "scholarships": [
    {"name":"Scholarship","eligibility":"Who qualifies","amount":"Benefit","provider":"Organisation"}
  ],
  "facilities": [
    {"name":"Facility","description":"1-2 sentences"}
  ],
  "faqs": [
    {"q":"Question?","a":"Answer."}
  ],
  "hostel_info": {
    "available":${c.hostel},
    "boys":"${c.hostel ? "On-campus boys hostel with 24/7 security and mess" : "No hostel; PG options nearby"}",
    "girls":"${c.hostel ? "Separate girls hostel with warden and CCTV" : "No hostel; ladies PG options nearby"}",
    "monthly_cost":${c.hostel ? '"₹8,000–₹12,000 including meals"' : "null"}
  },
  "cutoffs": [
    {"year":2024,"exam":"MHT-CET","branch":"Course name","general":"98.5 percentile","obc":"96.2 percentile","sc":"88.0 percentile","st":"82.0 percentile"}
  ],
  "rankings": [
    {"agency":"NIRF","year":2024,"rank":"${c.nirf_rank ?? "Not ranked"}","category":"${c.stream ?? "Engineering"}"}
  ]
}

RULES:
1. courses_fees — all courses listed above; fees realistic for ${c.type ?? "Private"} Pune college (${feesMin}–${feesMax}/yr).
2. admission_process — exactly 5 steps, mention ${exams.join("/") || "MHT-CET"} and Maharashtra CAP counselling.
3. placements — sector_wise percentages MUST sum to exactly 100.
4. scholarships — include EBC, OBC Non-Creamy Layer, SC/ST Post-Matric, Minority, CSSS (Govt of Maharashtra) + college merit scholarship.
5. facilities — 6–8 items for ${c.stream ?? "Engineering"} college${c.hostel ? "; include hostel facility" : ""}.
6. faqs — exactly 6: fees, entrance exam, admission process, hostel availability, placements, NAAC/accreditation.
7. cutoffs — 2024 AND 2023 data for top 2–3 courses; MHT-CET percentile range: General 92–99, OBC 88–97, SC 78–90.
8. rankings — NIRF (if available) + 2–3 others (Outlook, India Today, Times Higher Ed as appropriate).
9. Return ONLY the raw JSON. No explanations, no markdown.`
}

// ─── Claude call with exponential-backoff retry ────────────────────────────────
async function callClaude(c: CollegeRow): Promise<{ details: Record<string, unknown>; inputTokens: number; outputTokens: number }> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      const wait = 6000 * Math.pow(2, attempt - 1)  // 6s, 12s, 24s
      console.log(`    ↻ retry ${attempt}/${MAX_RETRIES - 1} for ${c.slug} (wait ${wait / 1000}s)…`)
      await new Promise((r) => setTimeout(r, wait))
    }

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      messages: [{ role: "user", content: buildPrompt(c) }],
    })

    const raw = message.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("")
      .trim()

    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim()

    const details = JSON.parse(cleaned) as Record<string, unknown>
    return { details, inputTokens: message.usage.input_tokens, outputTokens: message.usage.output_tokens }
  }
  throw new Error(`All ${MAX_RETRIES} retries exhausted`)
}

// ─── Generate details for one college ─────────────────────────────────────────
async function generateOne(c: CollegeRow): Promise<Result> {
  // Skip check
  if (!OVERWRITE) {
    const det = c.details as Record<string, unknown> | undefined
    const has =
      det &&
      Array.isArray(det.courses_fees) &&
      (det.courses_fees as unknown[]).length > 0 &&
      Array.isArray(det.faqs) &&
      (det.faqs as unknown[]).length > 0
    if (has) return { ok: true, slug: c.slug, skipped: true }
  }

  if (DRY_RUN) {
    console.log(`  [DRY RUN] would generate: ${c.name}`)
    return { ok: true, slug: c.slug }
  }

  try {
    const { details, inputTokens, outputTokens } = await callClaude(c)

    // Merge: keep non-empty existing manual edits, fill gaps with AI
    const existing = (c.details ?? {}) as Record<string, unknown>
    const merged: Record<string, unknown> = { ...details }
    for (const key of Object.keys(existing)) {
      const val = existing[key]
      const isEmpty =
        val === undefined || val === null ||
        (Array.isArray(val) && val.length === 0) ||
        (typeof val === "object" && !Array.isArray(val) && Object.keys(val as Record<string, unknown>).length === 0)
      if (!isEmpty) merged[key] = val
    }

    const { error: updateError } = await supabase
      .from("colleges")
      .update({ details: merged, updated_at: new Date().toISOString() })
      .eq("id", c.id)

    if (updateError) return { ok: false, slug: c.slug, error: updateError.message }

    return { ok: true, slug: c.slug, inputTokens, outputTokens }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { ok: false, slug: c.slug, error: msg.slice(0, 120) }
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🤖  AI College Details Generator`)
  console.log(`    Model:     ${MODEL}`)
  console.log(`    Mode:      ${DRY_RUN ? "DRY RUN" : "LIVE"}`)
  console.log(`    Overwrite: ${OVERWRITE}`)
  if (ONLY_SLUG) console.log(`    College:   ${ONLY_SLUG}`)
  console.log()

  // Fetch from Supabase
  const baseQuery = supabase.from("colleges").select("*").order("name")
  const { data: colleges, error } = ONLY_SLUG
    ? await baseQuery.eq("slug", ONLY_SLUG)
    : await baseQuery

  if (error || !colleges) { console.error("❌ DB fetch failed:", error?.message); process.exit(1) }
  console.log(`📋  ${colleges.length} college(s) fetched\n`)

  const rows = colleges as CollegeRow[]
  const stats = { ok: 0, skipped: 0, errors: 0, inputTokens: 0, outputTokens: 0 }

  for (let i = 0; i < rows.length; i += CONCURRENCY) {
    const batch = rows.slice(i, i + CONCURRENCY)
    const results = await Promise.all(batch.map(generateOne))

    for (const r of results) {
      if (r.skipped) {
        console.log(`⏭   ${r.slug}`)
        stats.skipped++
      } else if (r.ok) {
        const tok = r.inputTokens ? ` [↑${r.inputTokens} ↓${r.outputTokens}]` : ""
        console.log(`✅  ${r.slug}${tok}`)
        stats.ok++
        stats.inputTokens  += r.inputTokens  ?? 0
        stats.outputTokens += r.outputTokens ?? 0
      } else {
        console.log(`❌  ${r.slug} — ${r.error}`)
        stats.errors++
      }
    }

    if (i + CONCURRENCY < rows.length) await new Promise((r) => setTimeout(r, DELAY_MS))
  }

  const costUSD = (stats.inputTokens / 1_000_000 * 0.80) + (stats.outputTokens / 1_000_000 * 4.00)
  const costINR = costUSD * 84

  console.log(`\n${"─".repeat(52)}`)
  console.log(`✅  Generated:  ${stats.ok}`)
  console.log(`⏭   Skipped:    ${stats.skipped}`)
  console.log(`❌  Errors:     ${stats.errors}`)
  if (!DRY_RUN && stats.inputTokens > 0) {
    console.log(`🔤  Tokens:     ${stats.inputTokens.toLocaleString()} in / ${stats.outputTokens.toLocaleString()} out`)
    console.log(`💰  Cost:       ~$${costUSD.toFixed(3)} (~₹${Math.round(costINR)})`)
  }
  console.log(`✨  Done!\n`)
}

main()
