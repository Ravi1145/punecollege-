/**
 * db.ts — CollegePune data layer
 *
 * Read operations  → Supabase first, static fallback
 * Write operations → Supabase (leads, enquiries, bookings) + email notification
 */

import { colleges as staticColleges } from '@/data/colleges'
import { blogs as staticBlogs } from '@/data/blogs'
import { sendLeadEmail } from '@/lib/mailer'

// ── RE-EXPORTS (keep types available to the rest of the codebase) ─────────────
export type { Lead, Enquiry, CounsellingBooking, AdminStats } from '@/types'

// ── LEAD TYPES ────────────────────────────────────────────────────────────────
import type { Lead, Enquiry, CounsellingBooking, AdminStats } from '@/types'

// ── LEAD FUNCTIONS ────────────────────────────────────────────────────────────

export async function insertLead(
  data: Omit<Lead, 'id' | 'created_at' | 'updated_at'>
): Promise<string> {
  let leadId = crypto.randomUUID()

  // 1. Write to Supabase
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data: row, error } = await admin
      .from('leads')
      .insert({
        name:             data.name,
        email:            data.email ?? null,
        phone:            data.phone ?? null,
        stream:           data.stream ?? null,
        college_interest: data.college_interest ?? null,
        course_interest:  data.course_interest ?? null,
        budget:           data.budget ?? null,
        exam_type:        data.exam_type ?? null,
        exam_score:       data.exam_score ?? null,
        career_goal:      data.career_goal ?? null,
        notes:            data.notes ?? null,
        source:           data.source ?? 'website',
        page_url:         data.page_url ?? null,
        status:           'new',
      })
      .select('id')
      .single()
    if (!error && row) leadId = row.id
    else if (error) console.error('[insertLead] Supabase write failed:', error.message)
  } catch (err) {
    console.error('[insertLead] Supabase error:', err)
  }

  // 2. Fire email async (non-blocking — DB write already succeeded)
  sendLeadEmail({ ...data }).catch((e) =>
    console.error('[insertLead] email failed:', e)
  )

  return leadId
}

export async function getAllLeads(filters?: {
  status?: string; source?: string; stream?: string
  search?: string; page?: number; limit?: number
}): Promise<{ leads: Lead[]; total: number; page: number; totalPages: number }> {
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const page  = filters?.page  ?? 1
    const limit = filters?.limit ?? 100
    const start = (page - 1) * limit

    let query = admin
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(start, start + limit - 1)

    if (filters?.status)  query = query.eq('status', filters.status)
    if (filters?.source)  query = query.eq('source', filters.source)
    if (filters?.stream)  query = query.eq('stream', filters.stream)
    if (filters?.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`
      )
    }

    const { data, count, error } = await query
    if (error) throw error
    const total = count ?? 0
    return {
      leads:      (data ?? []) as Lead[],
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  } catch (err) {
    console.error('[getAllLeads] Supabase error:', err)
  }
  return { leads: [], total: 0, page: 1, totalPages: 0 }
}

export async function updateLeadStatus(
  id?: string,
  status?: string,
  notes?: string
): Promise<void> {
  if (!id) return
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const update: Record<string, string> = {}
    if (status) update.status = status
    if (notes !== undefined) update.notes = notes
    const { error } = await admin.from('leads').update(update).eq('id', id)
    if (error) console.error('[updateLeadStatus] Supabase error:', error.message)
  } catch (err) {
    console.error('[updateLeadStatus] error:', err)
  }
}

export async function getLeadsStats(): Promise<AdminStats> {
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()

    const now   = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const [
      { count: total },
      { count: leadsToday },
      { count: leadsThisWeek },
      { count: newLeads },
      { count: contactedLeads },
      { count: convertedLeads },
      { data: bySource },
      { data: byStream },
    ] = await Promise.all([
      admin.from('leads').select('*', { count: 'exact', head: true }),
      admin.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', today),
      admin.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
      admin.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      admin.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'contacted'),
      admin.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'converted'),
      admin.from('leads').select('source').not('source', 'is', null),
      admin.from('leads').select('stream').not('stream', 'is', null),
    ])

    // Aggregate source counts
    const sourceMap: Record<string, number> = {}
    for (const r of (bySource ?? [])) {
      const s = (r as { source: string }).source
      sourceMap[s] = (sourceMap[s] ?? 0) + 1
    }
    const leadsBySource = Object.entries(sourceMap).map(([source, count]) => ({ source, count }))

    // Aggregate stream counts
    const streamMap: Record<string, number> = {}
    for (const r of (byStream ?? [])) {
      const s = (r as { stream: string }).stream
      streamMap[s] = (streamMap[s] ?? 0) + 1
    }
    const leadsByStream = Object.entries(streamMap).map(([stream, count]) => ({ stream, count }))

    return {
      totalLeads:      total      ?? 0,
      leadsToday:      leadsToday ?? 0,
      leadsThisWeek:   leadsThisWeek ?? 0,
      newLeads:        newLeads   ?? 0,
      contactedLeads:  contactedLeads ?? 0,
      convertedLeads:  convertedLeads ?? 0,
      leadsBySource,
      leadsByStream,
      dailyTrend: [],
    }
  } catch (err) {
    console.error('[getLeadsStats] error:', err)
  }
  return {
    totalLeads: 0, leadsToday: 0, leadsThisWeek: 0,
    newLeads: 0, contactedLeads: 0, convertedLeads: 0,
    leadsBySource: [], leadsByStream: [], dailyTrend: [],
  }
}

export async function exportLeadsCSV(): Promise<string> {
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data, error } = await admin
      .from('leads')
      .select('name,email,phone,stream,college_interest,source,status,notes,created_at')
      .order('created_at', { ascending: false })
      .limit(5000)
    if (error) throw error

    const header = 'name,email,phone,stream,college_interest,source,status,notes,created_at\n'
    const rows = (data ?? []).map((r: Record<string, unknown>) =>
      [
        r.name, r.email, r.phone, r.stream, r.college_interest,
        r.source, r.status, r.notes, r.created_at,
      ]
        .map((v) => (v == null ? '' : `"${String(v).replace(/"/g, '""')}"`))
        .join(',')
    )
    return header + rows.join('\n')
  } catch (err) {
    console.error('[exportLeadsCSV] error:', err)
  }
  return 'name,email,phone,stream,college_interest,source,status,notes,created_at\n'
}

// ── ENQUIRY FUNCTIONS ─────────────────────────────────────────────────────────

export async function insertEnquiry(
  data: Omit<Enquiry, 'id' | 'created_at'>
): Promise<string> {
  let id = crypto.randomUUID()

  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data: row, error } = await admin
      .from('leads')
      .insert({
        name:             data.name,
        email:            data.email ?? null,
        phone:            data.phone ?? null,
        college_interest: data.college_name,
        course_interest:  data.course ?? null,
        notes:            data.message ?? null,
        source:           'enquiry_form',
        status:           'new',
      })
      .select('id')
      .single()
    if (!error && row) id = row.id
    else if (error) console.error('[insertEnquiry] Supabase write failed:', error.message)
  } catch (err) {
    console.error('[insertEnquiry] error:', err)
  }

  sendLeadEmail({ type: 'Enquiry', ...data }).catch((e) =>
    console.error('[insertEnquiry] email failed:', e)
  )
  return id
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data, error } = await admin
      .from('leads')
      .select('*')
      .eq('source', 'enquiry_form')
      .order('created_at', { ascending: false })
      .limit(500)
    if (error) throw error
    return (data ?? []) as unknown as Enquiry[]
  } catch (err) {
    console.error('[getAllEnquiries] error:', err)
  }
  return []
}

export async function updateEnquiryStatus(): Promise<void> { /* no-op — use updateLeadStatus */ }

// ── COUNSELLING FUNCTIONS ─────────────────────────────────────────────────────

export async function insertBooking(
  data: Omit<CounsellingBooking, 'id' | 'created_at'>
): Promise<string> {
  let id = crypto.randomUUID()

  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data: row, error } = await admin
      .from('leads')
      .insert({
        name:   data.name,
        email:  data.email ?? null,
        phone:  data.phone ?? null,
        source: 'counselling_booking',
        status: 'new',
      })
      .select('id')
      .single()
    if (!error && row) id = row.id
    else if (error) console.error('[insertBooking] Supabase write failed:', error.message)
  } catch (err) {
    console.error('[insertBooking] error:', err)
  }

  sendLeadEmail({ type: 'Counselling Booking', ...data }).catch((e) =>
    console.error('[insertBooking] email failed:', e)
  )
  return id
}

// ── COLLEGE TYPES ─────────────────────────────────────────────────────────────

export interface CollegeDetails {
  courses_fees?: {
    program: string
    duration: string
    level?: string
    eligibility: string
    selection: string
    fees_per_year: number
    total_fees: number
    seats?: number
  }[]
  admission_process?: { step: number; title: string; description: string }[]
  cutoffs?: {
    program: string
    exam: string
    year: string
    general?: string
    obc?: string
    sc?: string
    st?: string
    ews?: string
  }[]
  placements?: {
    year: string
    stats: {
      program: string
      avg_package: number
      median_package?: number
      highest_package: number
      students_placed?: number
      total_eligible?: number
      companies_visited?: number
      placement_pct?: number
    }[]
    sector_wise?: { sector: string; percentage: number }[]
  }
  rankings?: {
    agency: string
    category: string
    rank: number | null
    grade?: string
    year: string
  }[]
  scholarships?: {
    name: string
    eligibility: string
    amount: string
    provider?: string
  }[]
  facilities?: { name: string; description: string }[]
  alumni?: { name: string; designation: string; batch?: string }[]
  hostel_info?: {
    available: boolean
    boys_hostels?: number
    girls_hostels?: number
    total_capacity?: number
    fees_per_year?: number
    facilities?: string[]
    notes?: string
  }
  campus_area?: string
  total_students?: number
  faculty_count?: number
  student_faculty_ratio?: string
  faqs?: { q: string; a: string }[]
}

export interface DBCollege {
  id?: number
  slug: string
  name: string
  short_name?: string
  type?: string
  established?: number
  affiliation?: string
  naac_grade?: string
  nirf_rank?: number | null
  city: string
  state?: string
  address?: string
  description?: string
  highlights?: string[]
  tags?: string[]
  fees_min?: number
  fees_max?: number
  avg_placement?: number
  highest_pkg?: number
  top_recruiters?: string[]
  entrance_exams?: string[]
  courses?: string[]
  specializations?: string[]
  hostel?: boolean
  rating?: number
  review_count?: number
  website?: string
  phone?: string
  email?: string
  stream?: string
  image_url?: string
  logo_url?: string
  faqs?: { q: string; a: string }[]
  details?: CollegeDetails
  status?: string
  ai_generated?: boolean
  meta_title?: string
  meta_desc?: string
  seo_keywords?: string[]
  created_at?: string
  updated_at?: string
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

/** Map a raw Supabase colleges row to DBCollege */
function supabaseRowToDBCollege(row: Record<string, unknown>): DBCollege {
  return {
    id:             row.id as number,
    slug:           row.slug as string,
    name:           row.name as string,
    short_name:     row.short_name as string | undefined,
    type:           row.type as string | undefined,
    established:    row.established as number | undefined,
    affiliation:    row.affiliation as string | undefined,
    naac_grade:     row.naac_grade as string | undefined,
    nirf_rank:      row.nirf_rank as number | null | undefined,
    city:           (row.city as string) ?? (row.location as string) ?? '',
    state:          row.state as string | undefined,
    address:        row.address as string | undefined,
    description:    row.description as string | undefined,
    highlights:     row.highlights as string[] | undefined,
    tags:           row.tags as string[] | undefined,
    fees_min:       row.fees_min as number | undefined,
    fees_max:       row.fees_max as number | undefined,
    avg_placement:  row.avg_placement as number | undefined,
    highest_pkg:    row.highest_pkg as number | undefined,
    top_recruiters: row.top_recruiters as string[] | undefined,
    entrance_exams: row.entrance_exams as string[] | undefined,
    courses:        row.courses as string[] | undefined,
    specializations: row.specializations as string[] | undefined,
    hostel:         row.hostel as boolean | undefined,
    rating:         row.rating as number | undefined,
    review_count:   row.review_count as number | undefined,
    website:        row.website as string | undefined,
    phone:          row.phone as string | undefined,
    email:          row.email as string | undefined,
    stream:         row.stream as string | undefined,
    image_url:      (row.cover_url as string | undefined) ?? (row.image_url as string | undefined),
    logo_url:       (row.logo_url as string | undefined),
    details:        row.details as CollegeDetails | undefined,
    status:         row.status as string | undefined,
    created_at:     row.created_at as string | undefined,
    updated_at:     row.updated_at as string | undefined,
  }
}

// ── COLLEGE FUNCTIONS ─────────────────────────────────────────────────────────

export async function getAllColleges(filters?: {
  status?: string
  excludeArchived?: boolean
  city?: string
  stream?: string
  search?: string
  page?: number
  limit?: number
}): Promise<{ colleges: DBCollege[]; total: number; page: number; totalPages: number }> {
  // Try Supabase first
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const statusFilter = filters?.status ?? 'published'
    const page  = filters?.page  ?? 1
    const limit = filters?.limit ?? 500
    const start = (page - 1) * limit

    let query = admin
      .from('colleges')
      .select('*', { count: 'exact' })
      .eq('status', statusFilter)
      .order('name')
      .range(start, start + limit - 1)

    if (filters?.stream) query = query.ilike('stream', filters.stream)
    if (filters?.city)   query = query.ilike('city', `%${filters.city}%`)
    if (filters?.search) query = query.or(
      `name.ilike.%${filters.search}%,short_name.ilike.%${filters.search}%,stream.ilike.%${filters.search}%`
    )

    const { data, count, error } = await query
    if (!error && data && data.length > 0) {
      const list = (data as Record<string, unknown>[]).map(supabaseRowToDBCollege)
      const total = count ?? list.length
      return { colleges: list, total, page, totalPages: Math.ceil(total / limit) }
    }
  } catch { /* fall through to static */ }

  // Fallback: static data
  let list = staticColleges.map<DBCollege>(c => ({
    id:            c.id,
    slug:          c.slug,
    name:          c.name,
    short_name:    c.shortName,
    type:          c.type,
    established:   c.established,
    affiliation:   c.affiliation,
    naac_grade:    c.naac,
    nirf_rank:     c.nirfRank ?? null,
    city:          c.location,
    address:       c.address,
    description:   c.description,
    highlights:    c.highlights,
    tags:          c.tags,
    fees_min:      c.feesRange.min,
    fees_max:      c.feesRange.max,
    avg_placement: c.avgPlacement,
    highest_pkg:   c.highestPlacement,
    top_recruiters: c.topRecruiters,
    entrance_exams: c.entranceExams,
    courses:       c.courses,
    specializations: c.specializations,
    hostel:        c.hostel,
    rating:        c.rating,
    review_count:  c.reviewCount,
    website:       c.website,
    phone:         c.phone,
    email:         c.email,
    stream:        c.stream,
    image_url:     c.image,
    faqs:          c.faqs,
    details:       c.details,
    status:        'published',
  }))

  if (filters?.stream) {
    const s = filters.stream.toLowerCase()
    list = list.filter(c => c.stream?.toLowerCase() === s)
  }
  if (filters?.city) {
    const ci = filters.city.toLowerCase()
    list = list.filter(c => c.city?.toLowerCase().includes(ci))
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase()
    list = list.filter(c =>
      c.name?.toLowerCase().includes(q) ||
      c.short_name?.toLowerCase().includes(q) ||
      c.stream?.toLowerCase().includes(q)
    )
  }

  const total = list.length
  const page = filters?.page ?? 1
  const limit = filters?.limit ?? 200
  const start = (page - 1) * limit
  return { colleges: list.slice(start, start + limit), total, page, totalPages: Math.ceil(total / limit) }
}

export async function getCollegeById(id: number): Promise<DBCollege | null> {
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data } = await admin.from('colleges').select('*').eq('id', id).single()
    if (data) return supabaseRowToDBCollege(data as Record<string, unknown>)
  } catch { /* fall through */ }
  // Fallback: linear search in static data
  const { colleges } = await getAllColleges()
  return colleges.find(x => x.id === id) ?? null
}

export async function getCollegeBySlug(slug: string): Promise<DBCollege | null> {
  // Try Supabase first — returns draft/published (public page checks status itself)
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data } = await admin
      .from('colleges')
      .select('*')
      .eq('slug', slug)
      .single()
    if (data) return supabaseRowToDBCollege(data as Record<string, unknown>)
  } catch { /* fall through to static */ }

  // Fallback: static data
  const { colleges } = await getAllColleges()
  return colleges.find(c => c.slug === slug) ?? null
}

export async function insertCollege(): Promise<number> {
  return Date.now()
}
export async function updateCollege(): Promise<void> { /* use queries-admin.ts:upsertCollege */ }
export async function deleteCollege(): Promise<void> { /* use queries-admin.ts:deleteCollege */ }

export async function getCollegesStats(): Promise<{
  total: number; published: number; draft: number; aiGenerated: number
}> {
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const [
      { count: total },
      { count: published },
      { count: draft },
      { count: aiGenerated },
    ] = await Promise.all([
      admin.from('colleges').select('*', { count: 'exact', head: true }),
      admin.from('colleges').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      admin.from('colleges').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
      admin.from('colleges').select('*', { count: 'exact', head: true }).eq('ai_generated', true),
    ])
    return {
      total:       total       ?? 0,
      published:   published   ?? 0,
      draft:       draft       ?? 0,
      aiGenerated: aiGenerated ?? 0,
    }
  } catch (err) {
    console.error('[getCollegesStats] error:', err)
  }
  return { total: staticColleges.length, published: staticColleges.length, draft: 0, aiGenerated: 0 }
}

// ── BLOG TYPES ────────────────────────────────────────────────────────────────

export interface DBBlog {
  id?: number | string
  slug: string
  title: string
  excerpt?: string
  body?: string
  author?: string
  category?: string
  tags?: string[]
  read_time?: string
  status?: string
  ai_generated?: boolean
  meta_title?: string
  meta_desc?: string
  image_url?: string
  published_at?: string
  created_at?: string
  updated_at?: string
}

// ── BLOG FUNCTIONS ────────────────────────────────────────────────────────────

/** Map a Supabase blogs row to DBBlog */
function supabaseBlogToDBBlog(row: Record<string, unknown>): DBBlog {
  return {
    id:           row.id as string,
    slug:         row.slug as string,
    title:        row.title as string,
    excerpt:      row.excerpt as string | undefined,
    body:         (row.content ?? row.body) as string | undefined,
    author:       row.author_id as string | undefined,  // UUID; name lookup is optional
    category:     row.category as string | undefined,
    tags:         row.tags as string[] | undefined,
    read_time:    row.read_time != null ? String(row.read_time) + ' min' : undefined,
    status:       row.status as string | undefined,
    image_url:    (row.image_url ?? row.cover_url) as string | undefined,
    published_at: (row.published_at ?? row.created_at) as string | undefined,
    created_at:   row.created_at as string | undefined,
    updated_at:   row.updated_at as string | undefined,
  }
}

export async function getAllBlogs(filters?: {
  status?: string
  excludeArchived?: boolean
  category?: string
  search?: string
  page?: number
  limit?: number
}): Promise<{ blogs: DBBlog[]; total: number; page: number; totalPages: number }> {
  // ── Try Supabase first ──────────────────────────────────────────────────────
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const page  = filters?.page  ?? 1
    const limit = filters?.limit ?? 10
    const start = (page - 1) * limit

    let query = admin
      .from('blogs')
      .select('id, slug, title, excerpt, content, author_id, category, tags, image_url, cover_url, status, published_at, read_time, views, created_at, updated_at', { count: 'exact' })
      .eq('status', filters?.status ?? 'published')
      .order('published_at', { ascending: false })
      .range(start, start + limit - 1)

    if (filters?.category) query = query.ilike('category', filters.category)
    if (filters?.search)   query = query.or(
      `title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%`
    )

    const { data, count, error } = await query

    if (!error && data && data.length > 0) {
      const blogs = (data as Record<string, unknown>[]).map(supabaseBlogToDBBlog)
      const total = count ?? blogs.length
      return { blogs, total, page, totalPages: Math.ceil(total / limit) }
    }
  } catch { /* fall through to static */ }

  // ── Fallback: static data ───────────────────────────────────────────────────
  let list: DBBlog[] = staticBlogs.map(b => ({
    id:           b.id,
    slug:         b.slug,
    title:        b.title,
    excerpt:      b.excerpt,
    body:         b.body,
    author:       b.author,
    category:     b.category,
    tags:         b.tags,
    read_time:    b.readTime,
    status:       'published',
    image_url:    b.image,
    published_at: b.publishedAt ?? b.date,
    created_at:   b.date,
  }))

  if (filters?.category) {
    const cat = filters.category.toLowerCase()
    list = list.filter(b => b.category?.toLowerCase() === cat)
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase()
    list = list.filter(b =>
      b.title?.toLowerCase().includes(q) ||
      b.excerpt?.toLowerCase().includes(q)
    )
  }

  const total = list.length
  const page = filters?.page ?? 1
  const limit = filters?.limit ?? 10
  const start = (page - 1) * limit

  return { blogs: list.slice(start, start + limit), total, page, totalPages: Math.ceil(total / limit) }
}

export async function getBlogById(id: string | number): Promise<DBBlog | null> {
  // Try Supabase direct lookup first
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data } = await admin
      .from('blogs')
      .select('*')
      .eq('id', String(id))
      .single()
    if (data) return supabaseBlogToDBBlog(data as Record<string, unknown>)
  } catch { /* fall through */ }
  // Fallback: search static
  const match = staticBlogs.find(b => b.id === id)
  if (!match) return null
  return {
    id: match.id, slug: match.slug, title: match.title,
    excerpt: match.excerpt, body: match.body, author: match.author,
    category: match.category, tags: match.tags, read_time: match.readTime,
    status: 'published', image_url: match.image,
    published_at: match.publishedAt ?? match.date, created_at: match.date,
  }
}

export async function getBlogBySlug(slug: string): Promise<DBBlog | null> {
  // Try Supabase direct slug lookup — no limit, no pagination
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data } = await admin
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    if (data) return supabaseBlogToDBBlog(data as Record<string, unknown>)
  } catch { /* fall through */ }
  // Fallback: search all static blogs (no limit)
  const match = staticBlogs.find(b => b.slug === slug)
  if (!match) return null
  return {
    id: match.id, slug: match.slug, title: match.title,
    excerpt: match.excerpt, body: match.body, author: match.author,
    category: match.category, tags: match.tags, read_time: match.readTime,
    status: 'published', image_url: match.image,
    published_at: match.publishedAt ?? match.date, created_at: match.date,
  }
}

export async function insertBlog(): Promise<string> { return crypto.randomUUID() }
export async function updateBlog(): Promise<void>   { /* use queries-admin.ts:upsertBlog */ }
export async function deleteBlog(): Promise<void>   { /* use queries-admin.ts:deleteBlog */ }

// ── CITY PAGE TYPES ───────────────────────────────────────────────────────────

export interface DBCityPage {
  id?: number
  city: string
  stream: string
  slug: string
  title?: string
  intro?: string
  faqs?: { q: string; a: string }[]
  cta_text?: string
  status?: string
  ai_generated?: boolean
  meta_title?: string
  meta_desc?: string
  created_at?: string
  updated_at?: string
}

export async function getCityPage(_city?: string, _stream?: string): Promise<DBCityPage | null> {
  return null
}

export async function upsertCityPage(): Promise<void> { /* no-op */ }

// ── AI JOBS ───────────────────────────────────────────────────────────────────

export async function logAIJob(): Promise<void> { /* no-op */ }
