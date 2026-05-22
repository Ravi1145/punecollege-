/**
 * Generates INSERT SQL for all static colleges.
 * Run: node --input-type=module < scripts/gen-sync-sql.mjs
 */
import { readFileSync } from 'fs'
import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// Read and eval the colleges data (strip TS types first)
const src = readFileSync(path.join(root, 'src/data/colleges.ts'), 'utf8')
  .replace(/import\s.*?from\s+['"][^'"]+['"]/g, '')   // remove imports
  .replace(/:\s*College\[\]/g, '')                      // remove type annotation
  .replace(/:\s*College\b/g, '')                        // remove College type refs
  .replace(/^\s*\/\/.*/gm, '')                          // remove comments

// Extract the array via JSON-ish parsing — evaluate safely
let colleges
try {
  // Replace TypeScript-specific syntax
  const cleaned = src
    .replace(/export const colleges\s*=\s*/, 'colleges = ')
    .replace(/\bfalse\b/g, 'false')
    .replace(/\btrue\b/g, 'true')
  eval(`var colleges; ${cleaned}`)
} catch (e) {
  console.error('Parse error:', e.message)
  process.exit(1)
}

function esc(v) {
  if (v === null || v === undefined) return 'NULL'
  return `'${String(v).replace(/'/g, "''")}'`
}

function arr(v) {
  if (!v || !Array.isArray(v) || v.length === 0) return 'NULL'
  const items = v.map(s => `"${String(s).replace(/"/g, '\\"')}"`)
  return `'{${items.join(',')}}'`
}

function num(v) {
  if (v === null || v === undefined || isNaN(Number(v))) return 'NULL'
  return Number(v)
}

const rows = colleges.map(c => {
  return `(
  ${esc(c.slug)}, ${esc(c.name)}, ${esc(c.shortName)}, ${esc(c.type)},
  ${num(c.established)}, ${esc(c.affiliation)}, ${esc(c.naac)}, ${num(c.nirfRank)},
  ${esc(c.location)}, 'Maharashtra', ${esc(c.address)}, ${esc(c.location)},
  ${esc(c.description)}, ${esc(c.stream)},
  ${arr(c.courses)}, ${arr(c.specializations)},
  ${num(c.feesRange?.min)}, ${num(c.feesRange?.max)},
  ${num(c.avgPlacement)}, ${num(c.highestPlacement)},
  ${arr(c.topRecruiters)}, ${arr(c.entranceExams)},
  ${c.hostel ? 'true' : 'false'},
  ${arr(c.highlights)}, ${arr(c.tags)},
  ${num(c.rating)}, ${num(c.reviewCount)},
  ${esc(c.website)}, ${esc(c.phone)}, ${esc(c.email)}, ${esc(c.image)},
  'published'
)`
})

const sql = `
INSERT INTO colleges (
  slug, name, short_name, type,
  established, affiliation, naac_grade, nirf_rank,
  city, state, address, location,
  description, stream,
  courses, specializations,
  fees_min, fees_max,
  avg_placement, highest_pkg,
  top_recruiters, entrance_exams,
  hostel,
  highlights, tags,
  rating, review_count,
  website, phone, email, cover_url,
  status
) VALUES
${rows.join(',\n')}
ON CONFLICT (slug) DO UPDATE SET
  name           = EXCLUDED.name,
  short_name     = EXCLUDED.short_name,
  type           = EXCLUDED.type,
  established    = EXCLUDED.established,
  affiliation    = EXCLUDED.affiliation,
  naac_grade     = EXCLUDED.naac_grade,
  nirf_rank      = EXCLUDED.nirf_rank,
  city           = EXCLUDED.city,
  state          = EXCLUDED.state,
  address        = EXCLUDED.address,
  location       = EXCLUDED.location,
  description    = EXCLUDED.description,
  stream         = EXCLUDED.stream,
  courses        = EXCLUDED.courses,
  specializations = EXCLUDED.specializations,
  fees_min       = EXCLUDED.fees_min,
  fees_max       = EXCLUDED.fees_max,
  avg_placement  = EXCLUDED.avg_placement,
  highest_pkg    = EXCLUDED.highest_pkg,
  top_recruiters = EXCLUDED.top_recruiters,
  entrance_exams = EXCLUDED.entrance_exams,
  hostel         = EXCLUDED.hostel,
  highlights     = EXCLUDED.highlights,
  tags           = EXCLUDED.tags,
  rating         = EXCLUDED.rating,
  review_count   = EXCLUDED.review_count,
  website        = EXCLUDED.website,
  phone          = EXCLUDED.phone,
  email          = EXCLUDED.email,
  cover_url      = EXCLUDED.cover_url,
  status         = EXCLUDED.status,
  updated_at     = now();
`

process.stdout.write(sql)
