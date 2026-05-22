/**
 * db.ts — CollegePune data layer (no backend required)
 *
 * Read operations → static data files in src/data/
 * Write operations (leads / enquiries / bookings) → email via nodemailer
 */

import { colleges as staticColleges } from '@/data/colleges'
import { blogs as staticBlogs } from '@/data/blogs'
import { sendLeadEmail } from '@/lib/mailer'

// ── RE-EXPORTS (keep types available to the rest of the codebase) ─────────────
export type { Lead, Enquiry, CounsellingBooking, AdminStats } from '@/types'

// ── LEAD TYPES ────────────────────────────────────────────────────────────────
import type { Lead, Enquiry, CounsellingBooking, AdminStats } from '@/types'

// ── SIMPLE ID COUNTER (in-memory; resets on each cold start, which is fine) ──
let _idCounter = Date.now()
function nextId() { return ++_idCounter }

// ── LEAD FUNCTIONS ────────────────────────────────────────────────────────────

export async function insertLead(
  data: Omit<Lead, 'id' | 'created_at' | 'updated_at'>
): Promise<number> {
  try {
    await sendLeadEmail({ ...data })
  } catch (err) {
    console.error('[insertLead] email failed:', err)
  }
  return nextId()
}

export async function getAllLeads(_filters?: {
  status?: string; source?: string; stream?: string
  search?: string; page?: number; limit?: number
}): Promise<{ leads: Lead[]; total: number; page: number; totalPages: number }> {
  return { leads: [], total: 0, page: 1, totalPages: 0 }
}

export async function updateLeadStatus(_id?: number, _status?: string, _notes?: string): Promise<void> { /* no-op */ }

export async function getLeadsStats(): Promise<AdminStats> {
  return {
    totalLeads: 0, leadsToday: 0, leadsThisWeek: 0,
    newLeads: 0, contactedLeads: 0, convertedLeads: 0,
    leadsBySource: [], leadsByStream: [], dailyTrend: [],
  }
}

export async function exportLeadsCSV(): Promise<string> {
  return 'name,phone,email,source\n'
}

// ── ENQUIRY FUNCTIONS ─────────────────────────────────────────────────────────

export async function insertEnquiry(
  data: Omit<Enquiry, 'id' | 'created_at'>
): Promise<number> {
  try {
    await sendLeadEmail({ type: 'Enquiry', ...data })
  } catch (err) {
    console.error('[insertEnquiry] email failed:', err)
  }
  return nextId()
}

export async function getAllEnquiries(): Promise<Enquiry[]> {
  return []
}

export async function updateEnquiryStatus(): Promise<void> { /* no-op */ }

// ── COUNSELLING FUNCTIONS ─────────────────────────────────────────────────────

export async function insertBooking(
  data: Omit<CounsellingBooking, 'id' | 'created_at'>
): Promise<number> {
  try {
    await sendLeadEmail({ type: 'Counselling Booking', ...data })
  } catch (err) {
    console.error('[insertBooking] email failed:', err)
  }
  return nextId()
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
  const paginated = list.slice(start, start + limit)

  return { colleges: paginated, total, page, totalPages: Math.ceil(total / limit) }
}

export async function getCollegeById(id: number): Promise<DBCollege | null> {
  const c = staticColleges.find(c => c.id === id)
  if (!c) return null
  const { colleges } = await getAllColleges()
  return colleges.find(x => x.id === id) ?? null
}

export async function getCollegeBySlug(slug: string): Promise<DBCollege | null> {
  const { colleges } = await getAllColleges()
  return colleges.find(c => c.slug === slug) ?? null
}

export async function insertCollege(): Promise<number> { return nextId() }
export async function updateCollege(): Promise<void> { /* no-op */ }
export async function deleteCollege(): Promise<void> { /* no-op */ }

export async function getCollegesStats(): Promise<{
  total: number; published: number; draft: number; aiGenerated: number
}> {
  return { total: staticColleges.length, published: staticColleges.length, draft: 0, aiGenerated: 0 }
}

// ── BLOG TYPES ────────────────────────────────────────────────────────────────

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

// ── BLOG FUNCTIONS ────────────────────────────────────────────────────────────

export async function getAllBlogs(filters?: {
  status?: string
  excludeArchived?: boolean
  category?: string
  search?: string
  page?: number
  limit?: number
}): Promise<{ blogs: DBBlog[]; total: number; page: number; totalPages: number }> {
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
  const paginated = list.slice(start, start + limit)

  return { blogs: paginated, total, page, totalPages: Math.ceil(total / limit) }
}

export async function getBlogById(id: number): Promise<DBBlog | null> {
  const { blogs } = await getAllBlogs()
  return blogs.find(b => b.id === id) ?? null
}

export async function getBlogBySlug(slug: string): Promise<DBBlog | null> {
  const { blogs } = await getAllBlogs()
  return blogs.find(b => b.slug === slug) ?? null
}

export async function insertBlog(): Promise<number> { return nextId() }
export async function updateBlog(): Promise<void> { /* no-op */ }
export async function deleteBlog(): Promise<void> { /* no-op */ }

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
