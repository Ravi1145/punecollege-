import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized, unauthorized, safeInt } from '@/lib/admin-auth'
import { insertCollege, insertBlog } from '@/lib/db'
import { slugify } from '@/lib/utils'

// ── helpers ──────────────────────────────────────────────────────────

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').filter(Boolean)
  if (lines.length < 2) return []

  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'))
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const vals = parseCSVLine(lines[i])
    if (vals.every((v) => !v.trim())) continue // skip blank rows
    const row: Record<string, string> = {}
    headers.forEach((h, idx) => {
      row[h] = (vals[idx] ?? '').trim()
    })
    rows.push(row)
  }
  return rows
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      result.push(cur); cur = ''
    } else {
      cur += ch
    }
  }
  result.push(cur)
  return result
}

function num(v: string | undefined): number | undefined {
  if (!v || !v.trim()) return undefined
  const n = Number(v.trim().replace(/,/g, ''))
  return isNaN(n) ? undefined : n
}

function arr(v: string | undefined): string[] {
  if (!v || !v.trim()) return []
  return v.split(/[,;|]/).map((s) => s.trim()).filter(Boolean)
}

function bool(v: string | undefined): boolean {
  return ['true', 'yes', '1', 'y'].includes((v ?? '').toLowerCase())
}

// ── row → DBCollege mapper ────────────────────────────────────────────

function rowToCollege(row: Record<string, string>) {
  const name = row['name'] || row['college_name'] || ''
  if (!name) return null
  const slug = row['slug'] || slugify(name)
  const city = row['city'] || 'Pune'

  return {
    name,
    slug,
    short_name:      row['short_name'] || row['shortname'] || '',
    type:            row['type'] || 'Private',
    stream:          row['stream'] || 'Engineering',
    city,
    state:           row['state'] || 'Maharashtra',
    address:         row['address'] || '',
    affiliation:     row['affiliation'] || '',
    naac_grade:      row['naac_grade'] || row['naac'] || '',
    nirf_rank:       num(row['nirf_rank'] || row['nirf']),
    established:     num(row['established'] || row['year']),
    description:     row['description'] || '',
    highlights:      arr(row['highlights']),
    tags:            arr(row['tags']),
    fees_min:        num(row['fees_min'] || row['min_fees']),
    fees_max:        num(row['fees_max'] || row['max_fees']),
    avg_placement:   num(row['avg_placement'] || row['placement_avg']),
    highest_pkg:     num(row['highest_pkg'] || row['highest_package']),
    top_recruiters:  arr(row['top_recruiters'] || row['recruiters']),
    entrance_exams:  arr(row['entrance_exams'] || row['exams']),
    courses:         arr(row['courses']),
    specializations: arr(row['specializations']),
    hostel:          bool(row['hostel']),
    rating:          num(row['rating']) ?? 4.0 as number,
    review_count:    num(row['review_count']) ?? 0 as number,
    website:         row['website'] || '',
    phone:           row['phone'] || '',
    email:           row['email'] || '',
    image_url:       row['image_url'] || row['image'] || '',
    meta_title:      row['meta_title'] || '',
    meta_desc:       row['meta_desc'] || '',
    seo_keywords:    arr(row['seo_keywords'] || row['keywords']),
    status:          row['status'] || 'draft',
  }
}

// ── row → DBBlog mapper ───────────────────────────────────────────────

function rowToBlog(row: Record<string, string>) {
  const title = row['title'] || ''
  if (!title) return null
  const slug = row['slug'] || slugify(title)

  return {
    title,
    slug,
    excerpt:    row['excerpt'] || row['summary'] || '',
    body:       row['body'] || row['content'] || '',
    author:     row['author'] || 'CollegePune',
    category:   row['category'] || 'General',
    tags:       arr(row['tags']),
    read_time:  row['read_time'] || row['readtime'] || '5 min read',
    status:     row['status'] || 'draft',
    meta_title: row['meta_title'] || '',
    meta_desc:  row['meta_desc'] || '',
    image_url:  row['image_url'] || row['image'] || '',
    published_at: row['published_at'] || (row['status'] === 'published' ? new Date().toISOString() : undefined),
  }
}

// ── Google Sheets URL → CSV export URL ───────────────────────────────

function toGSheetsCSVUrl(url: string): string | null {
  // Matches: https://docs.google.com/spreadsheets/d/{ID}/edit...
  const match = url.match(/\/spreadsheets\/d\/([^/]+)/)
  if (!match) return null
  const gid = url.match(/[#&]gid=(\d+)/)?.[1] ?? '0'
  return `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv&gid=${gid}`
}

// ── POST handler ──────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()

  try {
    const body = await req.json() as {
      type: 'colleges' | 'blogs'
      source: 'csv' | 'sheets'
      csvText?: string
      sheetsUrl?: string
    }

    const { type, source } = body
    if (!['colleges', 'blogs'].includes(type)) {
      return NextResponse.json({ error: 'type must be colleges or blogs' }, { status: 400 })
    }

    // ── Resolve CSV text ──
    let csvText = ''
    if (source === 'sheets') {
      const csvUrl = toGSheetsCSVUrl(body.sheetsUrl ?? '')
      if (!csvUrl) {
        return NextResponse.json({ error: 'Invalid Google Sheets URL' }, { status: 400 })
      }
      const fetched = await fetch(csvUrl)
      if (!fetched.ok) {
        return NextResponse.json({ error: 'Could not fetch Google Sheet. Make sure it is shared publicly (Anyone with link can view).' }, { status: 400 })
      }
      csvText = await fetched.text()
    } else {
      csvText = body.csvText ?? ''
    }

    if (!csvText.trim()) {
      return NextResponse.json({ error: 'No CSV data provided' }, { status: 400 })
    }

    const rows = parseCSV(csvText)
    if (rows.length === 0) {
      return NextResponse.json({ error: 'CSV contains no data rows' }, { status: 400 })
    }

    // ── Preview mode: just return parsed rows without saving ──
    const preview = req.nextUrl.searchParams.get('preview') === '1'
    if (preview) {
      return NextResponse.json({ rows: rows.slice(0, 10), total: rows.length })
    }

    // ── Insert rows ──
    let imported = 0
    const errors: string[] = []

    for (const row of rows) {
      try {
        if (type === 'colleges') {
          const college = rowToCollege(row)
          if (!college) { errors.push(`Row skipped — missing name`); continue }
          await insertCollege(college)
        } else {
          const blog = rowToBlog(row)
          if (!blog) { errors.push(`Row skipped — missing title`); continue }
          await insertBlog(blog)
        }
        imported++
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        errors.push(msg)
      }
    }

    return NextResponse.json({ imported, errors, total: rows.length })
  } catch (e) {
    console.error('[import]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
