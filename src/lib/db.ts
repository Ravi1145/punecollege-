/**
 * db.ts — CollegePune database layer (Supabase / PostgreSQL)
 *
 * All functions are async. They use the service-role client so they
 * can be called only from server-side code (API routes, server actions).
 */
import { supabaseAdmin } from '@/lib/supabase'
import type { Lead, Enquiry, CounsellingBooking, AdminStats } from '@/types'

// ── HELPERS ───────────────────────────────────────────────────────

function daysAgoISO(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
}

function todayISO(): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

// ── LEAD FUNCTIONS ────────────────────────────────────────────────

/**
 * Insert a lead. Deduplicates by phone within 24 hours —
 * if the same phone submitted within 24 h, updates college/course interest
 * and returns the existing lead id instead of creating a duplicate.
 */
export async function insertLead(
  data: Omit<Lead, 'id' | 'created_at' | 'updated_at'>
): Promise<number> {
  // Check for existing lead from same phone in last 24 hours
  const { data: existing } = await supabaseAdmin
    .from('leads')
    .select('id')
    .eq('phone', data.phone)
    .gte('created_at', daysAgoISO(1))
    .limit(1)
    .maybeSingle()

  if (existing) {
    await supabaseAdmin
      .from('leads')
      .update({
        ...(data.college_interest ? { college_interest: data.college_interest } : {}),
        ...(data.course_interest  ? { course_interest:  data.course_interest  } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
    return existing.id as number
  }

  const { data: result, error } = await supabaseAdmin
    .from('leads')
    .insert({
      name:             data.name,
      phone:            data.phone,
      email:            data.email            ?? null,
      whatsapp:         data.whatsapp         ?? null,
      city:             data.city             ?? 'Pune',
      stream:           data.stream           ?? null,
      budget:           data.budget           ?? null,
      exam_type:        data.exam_type        ?? null,
      exam_score:       data.exam_score       ?? null,
      career_goal:      data.career_goal      ?? null,
      college_interest: data.college_interest ?? null,
      course_interest:  data.course_interest  ?? null,
      source:           data.source,
      utm_source:       data.utm_source       ?? null,
      utm_medium:       data.utm_medium       ?? null,
      page_url:         data.page_url         ?? null,
      status:           'new',
    })
    .select('id')
    .single()

  if (error) throw new Error(`insertLead failed: ${error.message}`)
  return result.id as number
}

export async function getAllLeads(filters?: {
  status?:    string
  source?:    string
  stream?:    string
  search?:    string
  page?:      number
  limit?:     number
}): Promise<{ leads: Lead[]; total: number; page: number; totalPages: number }> {
  const page   = filters?.page  ?? 1
  const limit  = filters?.limit ?? 50
  const offset = (page - 1) * limit

  let query = supabaseAdmin
    .from('leads')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.source) query = query.eq('source', filters.source)
  if (filters?.stream) query = query.eq('stream', filters.stream)
  if (filters?.search) {
    const s = filters.search
    query = query.or(`name.ilike.%${s}%,phone.ilike.%${s}%,email.ilike.%${s}%`)
  }

  const { data, count, error } = await query
  if (error) throw new Error(`getAllLeads failed: ${error.message}`)

  const total = count ?? 0
  return {
    leads:      (data ?? []) as Lead[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

export async function updateLeadStatus(
  id: number,
  status: string,
  notes?: string
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('leads')
    .update({
      status,
      ...(notes ? { notes } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) throw new Error(`updateLeadStatus failed: ${error.message}`)
}

export async function getLeadsStats(): Promise<AdminStats> {
  // Parallel count queries
  const [
    { count: totalLeads },
    { count: leadsToday },
    { count: leadsThisWeek },
    { count: newLeads },
    { count: contactedLeads },
    { count: convertedLeads },
    { data: allForAgg },
    { data: recentLeads },
  ] = await Promise.all([
    supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', todayISO()),
    supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', daysAgoISO(7)),
    supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'contacted'),
    supabaseAdmin.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'converted'),
    supabaseAdmin.from('leads').select('source, stream'),        // for groupBy
    supabaseAdmin.from('leads').select('created_at').gte('created_at', daysAgoISO(7)), // for daily trend
  ])

  // Group by source
  const sourceMap = new Map<string, number>()
  ;(allForAgg ?? []).forEach((r: { source: string }) => {
    sourceMap.set(r.source, (sourceMap.get(r.source) ?? 0) + 1)
  })
  const leadsBySource = Array.from(sourceMap.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)

  // Group by stream
  const streamMap = new Map<string, number>()
  ;(allForAgg ?? []).forEach((r: { stream: string | null }) => {
    if (r.stream) streamMap.set(r.stream, (streamMap.get(r.stream) ?? 0) + 1)
  })
  const leadsByStream = Array.from(streamMap.entries())
    .map(([stream, count]) => ({ stream, count }))
    .sort((a, b) => b.count - a.count)

  // Daily trend — last 7 days (fills zero days too)
  const dateMap = new Map<string, number>()
  ;(recentLeads ?? []).forEach((r: { created_at: string }) => {
    const date = r.created_at.split('T')[0]
    dateMap.set(date, (dateMap.get(date) ?? 0) + 1)
  })
  const dailyTrend = Array.from({ length: 7 }, (_, i) => {
    const d    = new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000)
    const date = d.toISOString().split('T')[0]
    return { date, count: dateMap.get(date) ?? 0 }
  })

  return {
    totalLeads:     totalLeads     ?? 0,
    leadsToday:     leadsToday     ?? 0,
    leadsThisWeek:  leadsThisWeek  ?? 0,
    newLeads:       newLeads       ?? 0,
    contactedLeads: contactedLeads ?? 0,
    convertedLeads: convertedLeads ?? 0,
    leadsBySource,
    leadsByStream,
    dailyTrend,
  }
}

export async function exportLeadsCSV(): Promise<string> {
  const { data: leads, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`exportLeadsCSV failed: ${error.message}`)

  const headers = [
    'ID', 'Name', 'Phone', 'Email', 'Stream', 'Budget', 'Exam Type',
    'Score', 'College Interest', 'Source', 'Status', 'City', 'Created At',
  ]
  const rows = (leads ?? []).map((l: Lead) => [
    l.id,
    `"${l.name}"`,
    l.phone,
    l.email         ?? '',
    l.stream        ?? '',
    l.budget        ?? '',
    l.exam_type     ?? '',
    l.exam_score    ?? '',
    l.college_interest ?? '',
    l.source,
    l.status        ?? 'new',
    l.city          ?? 'Pune',
    l.created_at    ?? '',
  ].join(','))

  return [headers.join(','), ...rows].join('\n')
}

// ── ENQUIRY FUNCTIONS ─────────────────────────────────────────────

export async function insertEnquiry(
  data: Omit<Enquiry, 'id' | 'created_at'>
): Promise<number> {
  const { data: result, error } = await supabaseAdmin
    .from('enquiries')
    .insert({
      lead_id:           data.lead_id          ?? null,
      name:              data.name,
      phone:             data.phone,
      email:             data.email            ?? null,
      college_name:      data.college_name,
      college_slug:      data.college_slug     ?? null,
      course:            data.course           ?? null,
      message:           data.message          ?? null,
      preferred_contact: data.preferred_contact ?? 'whatsapp',
      preferred_time:    data.preferred_time   ?? null,
      status:            'pending',
    })
    .select('id')
    .single()

  if (error) throw new Error(`insertEnquiry failed: ${error.message}`)
  return result.id as number
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  const { data, error } = await supabaseAdmin
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(`getAllEnquiries failed: ${error.message}`)
  return (data ?? []) as Enquiry[]
}

export async function updateEnquiryStatus(id: number, status: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('enquiries')
    .update({ status })
    .eq('id', id)

  if (error) throw new Error(`updateEnquiryStatus failed: ${error.message}`)
}

// ── COUNSELLING FUNCTIONS ─────────────────────────────────────────

export async function insertBooking(
  data: Omit<CounsellingBooking, 'id' | 'created_at'>
): Promise<number> {
  const { data: result, error } = await supabaseAdmin
    .from('counselling_bookings')
    .insert({
      lead_id:              data.lead_id             ?? null,
      name:                 data.name,
      phone:                data.phone,
      email:                data.email               ?? null,
      preferred_date:       data.preferred_date      ?? null,
      preferred_time:       data.preferred_time      ?? null,
      stream:               data.stream              ?? null,
      exam_score:           data.exam_score          ?? null,
      colleges_shortlisted: data.colleges_shortlisted ?? null,
      status:               'pending',
    })
    .select('id')
    .single()

  if (error) throw new Error(`insertBooking failed: ${error.message}`)
  return result.id as number
}

// ── COLLEGE TYPES ─────────────────────────────────────────────────

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
  /** FAQs stored either inside details JSON or as a top-level column */
  faqs?: { q: string; a: string }[]
}

// ── COLLEGE FUNCTIONS ─────────────────────────────────────────────

export async function getAllColleges(filters?: {
  status?: string
  city?: string
  stream?: string
  search?: string
  page?: number
  limit?: number
}): Promise<{ colleges: DBCollege[]; total: number; page: number; totalPages: number }> {
  const page   = filters?.page  ?? 1
  const limit  = filters?.limit ?? 25
  const offset = (page - 1) * limit

  let query = supabaseAdmin
    .from('colleges')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (filters?.status) query = query.eq('status', filters.status)
  if (filters?.city)   query = query.eq('city', filters.city)
  if (filters?.stream) query = query.eq('stream', filters.stream)
  if (filters?.search) {
    const s = filters.search
    query = query.or(`name.ilike.%${s}%,short_name.ilike.%${s}%,slug.ilike.%${s}%`)
  }

  const { data, count, error } = await query
  if (error) throw new Error(`getAllColleges failed: ${error.message}`)

  const total = count ?? 0
  return {
    colleges:   (data ?? []) as DBCollege[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

export async function getCollegeById(id: number): Promise<DBCollege | null> {
  const { data, error } = await supabaseAdmin
    .from('colleges')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(`getCollegeById failed: ${error.message}`)
  return data as DBCollege | null
}

export async function getCollegeBySlug(slug: string): Promise<DBCollege | null> {
  const { data, error } = await supabaseAdmin
    .from('colleges')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw new Error(`getCollegeBySlug failed: ${error.message}`)
  return data as DBCollege | null
}

export async function insertCollege(data: Omit<DBCollege, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  const { data: result, error } = await supabaseAdmin
    .from('colleges')
    .insert(data)
    .select('id')
    .single()

  if (error) throw new Error(`insertCollege failed: ${error.message}`)
  return result.id as number
}

export async function updateCollege(id: number, data: Partial<DBCollege>): Promise<void> {
  const { error } = await supabaseAdmin
    .from('colleges')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(`updateCollege failed: ${error.message}`)
}

export async function deleteCollege(id: number): Promise<void> {
  const { error } = await supabaseAdmin
    .from('colleges')
    .update({ status: 'archived', updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(`deleteCollege failed: ${error.message}`)
}

export async function getCollegesStats(): Promise<{
  total: number; published: number; draft: number; aiGenerated: number
}> {
  const [
    { count: total },
    { count: published },
    { count: draft },
    { count: aiGenerated },
  ] = await Promise.all([
    supabaseAdmin.from('colleges').select('*', { count: 'exact', head: true }),
    supabaseAdmin.from('colleges').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabaseAdmin.from('colleges').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabaseAdmin.from('colleges').select('*', { count: 'exact', head: true }).eq('ai_generated', true),
  ])
  return {
    total: total ?? 0,
    published: published ?? 0,
    draft: draft ?? 0,
    aiGenerated: aiGenerated ?? 0,
  }
}

// ── BLOG TYPES ────────────────────────────────────────────────────

export interface DBBlog {
  id?: number
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

// ── BLOG FUNCTIONS ────────────────────────────────────────────────

export async function getAllBlogs(filters?: {
  status?: string
  category?: string
  search?: string
  page?: number
  limit?: number
}): Promise<{ blogs: DBBlog[]; total: number; page: number; totalPages: number }> {
  const page   = filters?.page  ?? 1
  const limit  = filters?.limit ?? 20
  const offset = (page - 1) * limit

  let query = supabaseAdmin
    .from('blogs')
    .select('id,slug,title,excerpt,author,category,tags,read_time,status,ai_generated,published_at,created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (filters?.status)   query = query.eq('status', filters.status)
  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.search) {
    const s = filters.search
    query = query.or(`title.ilike.%${s}%,excerpt.ilike.%${s}%`)
  }

  const { data, count, error } = await query
  if (error) throw new Error(`getAllBlogs failed: ${error.message}`)

  const total = count ?? 0
  return {
    blogs:      (data ?? []) as DBBlog[],
    total,
    page,
    totalPages: Math.ceil(total / limit),
  }
}

export async function getBlogById(id: number): Promise<DBBlog | null> {
  const { data, error } = await supabaseAdmin
    .from('blogs')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(`getBlogById failed: ${error.message}`)
  return data as DBBlog | null
}

export async function getBlogBySlug(slug: string): Promise<DBBlog | null> {
  const { data, error } = await supabaseAdmin
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw new Error(`getBlogBySlug failed: ${error.message}`)
  return data as DBBlog | null
}

export async function insertBlog(data: Omit<DBBlog, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
  const { data: result, error } = await supabaseAdmin
    .from('blogs')
    .insert(data)
    .select('id')
    .single()

  if (error) throw new Error(`insertBlog failed: ${error.message}`)
  return result.id as number
}

export async function updateBlog(id: number, data: Partial<DBBlog>): Promise<void> {
  const { error } = await supabaseAdmin
    .from('blogs')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(`updateBlog failed: ${error.message}`)
}

export async function deleteBlog(id: number): Promise<void> {
  const { error } = await supabaseAdmin
    .from('blogs')
    .update({ status: 'archived', updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(`deleteBlog failed: ${error.message}`)
}

// ── CITY PAGE FUNCTIONS ───────────────────────────────────────────

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

export async function getCityPage(city: string, stream: string): Promise<DBCityPage | null> {
  const { data, error } = await supabaseAdmin
    .from('city_pages')
    .select('*')
    .eq('city', city.toLowerCase())
    .eq('stream', stream.toLowerCase())
    .maybeSingle()

  if (error) throw new Error(`getCityPage failed: ${error.message}`)
  return data as DBCityPage | null
}

export async function upsertCityPage(data: Omit<DBCityPage, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
  const { error } = await supabaseAdmin
    .from('city_pages')
    .upsert(data, { onConflict: 'city,stream' })

  if (error) throw new Error(`upsertCityPage failed: ${error.message}`)
}

// ── AI JOBS ───────────────────────────────────────────────────────

export async function logAIJob(type: string, input: object, output: object | null, tokensUsed?: number): Promise<void> {
  await supabaseAdmin.from('ai_jobs').insert({
    type,
    input,
    output,
    status: output ? 'completed' : 'failed',
    tokens_used: tokensUsed ?? null,
    completed_at: new Date().toISOString(),
  })
}
