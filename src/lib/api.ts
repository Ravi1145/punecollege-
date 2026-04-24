import type { College } from "@/types"

const API_BASE = "https://studycupsbackend-wb8p.onrender.com/api"

// ── Raw API types ────────────────────────────────────────────
export interface APICollege {
  _id: string
  id: number
  name: string
  location: string
  city: string
  state: string
  established_year: number
  stream: string
  college_type: string
  ranking: string | null
  rating: number
  reviewCount: number
  feesRange: { min: number; max: number } | null
  avg_fees: number | null
  package_highlights: { highest: string | null; average: string | null } | null
  logoUrl: string | null
  heroImage: string | null
  accreditation: string | null
}

export interface APIResponse {
  success: boolean
  page: number
  limit: number
  total: number
  colleges: APICollege[]
}

// ── Fetch all colleges from backend ─────────────────────────
export async function fetchCollegesFromAPI(): Promise<APICollege[]> {
  try {
    const res = await fetch(`${API_BASE}/colleges?all=true`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data: APIResponse = await res.json()
    return data.colleges || []
  } catch {
    return []
  }
}

// ── Helpers ──────────────────────────────────────────────────
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function extractNAAC(accreditation: string | null): College["naac"] {
  if (!accreditation) return "A"
  const match = accreditation.match(/Grade\s+(A\+\+|A\+|A|B\+\+|B\+)/i)
  if (match) {
    const g = match[1].toUpperCase()
    if (g === "A++" || g === "A+" || g === "A" || g === "B++" || g === "B+") {
      return g as College["naac"]
    }
  }
  return "A"
}

function extractNIRF(ranking: string | null): number | null {
  if (!ranking) return null
  const m = ranking.match(/\d+/)
  if (!m) return null
  const n = parseInt(m[0])
  // Sanity-check: ignore absurd "202" truncations with no trailing digit
  return n > 0 && n < 5000 ? n : null
}

function parseLPA(value: string | null): number {
  if (!value) return 0
  const num = parseFloat(value.replace(/[^0-9.]/g, ""))
  if (isNaN(num)) return 0
  if (value.toUpperCase().includes("CR")) return Math.round(num * 100 * 100000)
  return Math.round(num * 100000)
}

function mapStream(apiStream: string): College["stream"] {
  const s = (apiStream || "").toLowerCase().replace(/\s+/g, " ").trim()
  if (s.includes("mbbs") || s.includes("medical") || s.includes("bds") || s.includes("md")) return "Medical"
  if (s.includes("mba") || s.includes("pgdm")) return "MBA"
  if (s.includes("b.e") || s.includes("b.tech") || s.includes("btech") || s.includes("m.e") || s.includes("m.tech") || s.includes("engineering")) return "Engineering"
  if (s.includes("law") || s.includes("llb")) return "Law"
  if (s.includes("arch")) return "Architecture"
  return "Arts & Science"
}

function mapType(college_type: string): College["type"] {
  const t = college_type.toLowerCase()
  if (t.includes("government") || t.includes("state")) return "Government"
  if (t.includes("deemed")) return "Deemed"
  if (t.includes("autonomous")) return "Autonomous"
  return "Private"
}

function getShortName(name: string): string {
  // If already an acronym (all caps, <= 8 chars), use it
  const words = name.split(/\s+/)
  if (words.length === 1 && name === name.toUpperCase()) return name.slice(0, 8)
  // Build acronym from uppercase words
  const acronym = words
    .filter((w) => w.length > 2 || w === w.toUpperCase())
    .map((w) => w[0].toUpperCase())
    .join("")
  return acronym.length >= 2 ? acronym : name.split(" ")[0].slice(0, 8)
}

function mapStreamToExams(stream: string): string[] {
  const s = stream.toLowerCase()
  if (s.includes("mbbs")) return ["NEET-UG"]
  if (s.includes("mba") || s.includes("pgdm")) return ["CAT", "SNAP", "MAT", "CMAT"]
  if (s.includes("b.e") || s.includes("btech") || s.includes("b.tech")) return ["JEE Main", "MHT-CET"]
  return ["CUET"]
}

// ── Main mapper: APICollege → College ────────────────────────
export function mapAPICollege(c: APICollege, index: number): College {
  const naac = extractNAAC(c.accreditation)
  const nirf = extractNIRF(c.ranking)
  const stream = mapStream(c.stream)
  const type = mapType(c.college_type)
  const locationStr = [c.city, c.state].filter(Boolean).join(", ") || c.location || "India"
  const slug = generateSlug(c.name)
  const shortName = getShortName(c.name)
  const avgPlacement = parseLPA(c.package_highlights?.average ?? null)
  const highestPlacement = parseLPA(c.package_highlights?.highest ?? null)
  const feesRange = c.feesRange ?? { min: 0, max: 0 }

  return {
    id: c.id || index + 1000,
    slug,
    name: c.name,
    shortName,
    type,
    established: c.established_year || 2000,
    affiliation: c.state || "University",
    naac,
    nirfRank: nirf,
    location: locationStr,
    address: c.location || locationStr,
    courses: mapStreamToExams(c.stream).slice(0, 2),   // placeholder
    specializations: [],
    feesRange,
    avgPlacement,
    highestPlacement,
    topRecruiters: [],
    entranceExams: mapStreamToExams(c.stream),
    hostel: false,
    rating: c.rating || 3.5,
    reviewCount: c.reviewCount || 0,
    reviews: [],
    tags: [c.stream, c.college_type, c.city || "", c.state || ""].filter(Boolean),
    description: `${c.name} is a ${type} institution located in ${locationStr}, established in ${c.established_year || "NA"}. ${c.ranking ? `Ranked: ${c.ranking}.` : ""} ${c.accreditation ? `Accreditation: ${c.accreditation}.` : ""}`,
    highlights: [
      c.ranking ? `Ranked: ${c.ranking}` : "",
      c.accreditation ? `Accreditation: ${c.accreditation}` : "",
      c.package_highlights?.average ? `Avg placement: ${c.package_highlights.average}` : "",
      c.package_highlights?.highest ? `Highest package: ${c.package_highlights.highest}` : "",
    ].filter(Boolean),
    website: "",
    phone: "",
    email: "",
    stream,
    image: c.logoUrl ?? undefined,
  }
}
