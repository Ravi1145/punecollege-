import { createAdminClient } from './admin'
import type { College, Blog, Lead, Review, QaQuestion, Profile } from './types'
import { colleges as staticColleges } from '@/data/colleges'

// --- COLLEGES ---
export async function getAllCollegesAdmin(): Promise<College[]> {
  const admin = createAdminClient()
  const { data, error } = await admin.from('colleges').select('*').order('name')

  const dbColleges: College[] = (error ? [] : data ?? []) as College[]
  const dbSlugs = new Set(dbColleges.map((c) => c.slug))

  // Merge static colleges that are not yet in Supabase
  const staticOnly: College[] = staticColleges
    .filter((c) => !dbSlugs.has(c.slug))
    .map((c) => ({
      id:           String(c.id),
      slug:         c.slug,
      name:         c.name,
      short_name:   c.shortName ?? null,
      type:         c.type ?? null,
      established:  c.established ?? null,
      affiliation:  c.affiliation ?? null,
      naac_grade:   c.naac ?? null,
      nirf_rank:    c.nirfRank ?? null,
      location:     c.location ?? null,
      city:         c.location ?? null,
      state:        'Maharashtra',
      address:      c.address ?? null,
      description:  c.description ?? null,
      stream:       c.stream ?? null,
      courses:      c.courses ?? null,
      specializations: c.specializations ?? null,
      fees_min:     c.feesRange?.min ?? null,
      fees_max:     c.feesRange?.max ?? null,
      avg_placement: c.avgPlacement ?? null,
      highest_pkg:  c.highestPlacement ?? null,
      top_recruiters: c.topRecruiters ?? null,
      entrance_exams: c.entranceExams ?? null,
      hostel:       c.hostel ?? false,
      highlights:   c.highlights ?? null,
      tags:         c.tags ?? null,
      rating:       c.rating ?? null,
      review_count: c.reviewCount ?? null,
      website:      c.website ?? null,
      phone:        c.phone ?? null,
      email:        c.email ?? null,
      cover_url:    c.image ?? null,
      logo_url:     null,
      status:         'published' as const,
      featured:       false,
      featured_order: null,
      details:        (c.details ?? {}) as Record<string, unknown>,
      created_at:     new Date().toISOString(),
      updated_at:     new Date().toISOString(),
    }))

  // Combine: DB rows first (they're authoritative), then static-only
  return [...dbColleges, ...staticOnly].sort((a, b) => a.name.localeCompare(b.name))
}

export async function getCollegeByIdAdmin(id: string): Promise<College | null> {
  const admin = createAdminClient()
  const { data } = await admin.from('colleges').select('*').eq('id', id).single()
  return data
}

export async function upsertCollege(college: Partial<College> & { id?: string }) {
  const admin = createAdminClient()

  if (college.id) {
    // UPDATE existing record by primary key
    const { id, ...payload } = college
    const { data, error } = await admin
      .from('colleges')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .update(payload as any)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data as College
  }

  // INSERT new record (conflict on slug → update, handles duplicates gracefully)
  const { data, error } = await admin
    .from('colleges')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .upsert(college as any, { onConflict: 'slug' })
    .select()
    .single()
  if (error) throw error
  return data as College
}

export async function deleteCollege(id: string) {
  const admin = createAdminClient()
  const { error } = await admin.from('colleges').delete().eq('id', id)
  if (error) throw error
}

// --- BLOGS ---
export async function getAllBlogsAdmin(status?: string): Promise<Blog[]> {
  const admin = createAdminClient()
  let query = admin
    .from('blogs')
    .select('id, title, slug, status, created_at, author_id, category')
    .order('created_at', { ascending: false })
  if (status) query = query.eq('status', status as Blog['status'])
  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as Blog[]
}

export async function getBlogByIdAdmin(id: string): Promise<Blog | null> {
  const admin = createAdminClient()
  const { data } = await admin.from('blogs').select('*').eq('id', id).single()
  return data
}

export async function upsertBlog(blog: Partial<Blog> & { id?: string }) {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('blogs')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .upsert(blog as any, { onConflict: 'slug' })
    .select()
    .single()
  if (error) throw error
  return data as Blog
}

export async function deleteBlog(id: string) {
  const admin = createAdminClient()
  const { error } = await admin.from('blogs').delete().eq('id', id)
  if (error) throw error
}

// --- LEADS ---
export async function getAllLeadsAdmin(status?: string): Promise<Lead[]> {
  const admin = createAdminClient()
  let query = admin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  if (status) query = query.eq('status', status)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

// --- APPROVALS ---
export async function getPendingApprovals() {
  const admin = createAdminClient()
  const [blogs, reviews, qa] = await Promise.all([
    admin
      .from('blogs')
      .select('id, title, slug, created_at, author_id')
      .eq('status', 'pending'),
    admin.from('reviews').select('*').eq('status', 'pending'),
    admin.from('qa_questions').select('*').eq('status', 'pending'),
  ])
  return {
    blogs: (blogs.data ?? []) as Pick<Blog, 'id' | 'title' | 'slug' | 'created_at' | 'author_id'>[],
    reviews: (reviews.data ?? []) as Review[],
    qa: (qa.data ?? []) as QaQuestion[],
  }
}

export async function approveContent(
  table: 'blogs' | 'reviews' | 'qa_questions',
  id: string
) {
  const admin = createAdminClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin.from(table) as any).update({ status: 'published' }).eq('id', id)
  if (error) throw error
}

export async function rejectContent(
  table: 'blogs' | 'reviews' | 'qa_questions',
  id: string
) {
  const admin = createAdminClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin.from(table) as any).update({ status: 'rejected' }).eq('id', id)
  if (error) throw error
}

// --- PROFILES (agents) ---
export async function getAgentProfiles(): Promise<Profile[]> {
  const admin = createAdminClient()
  const { data, error } = await admin.from('profiles').select('*').order('created_at')
  if (error) throw error
  return data ?? []
}

export async function toggleAgentActive(id: string, is_active: boolean) {
  const admin = createAdminClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (admin.from('profiles') as any).update({ is_active }).eq('id', id)
  if (error) throw error
}
