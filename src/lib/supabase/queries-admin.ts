import { createAdminClient } from './admin'
import type { College, Blog, Lead, Review, QaQuestion, Profile } from './types'

// --- COLLEGES ---
export async function getAllCollegesAdmin(): Promise<College[]> {
  const admin = createAdminClient()
  const { data, error } = await admin.from('colleges').select('*').order('name')
  if (error) throw error
  return data ?? []
}

export async function getCollegeByIdAdmin(id: string): Promise<College | null> {
  const admin = createAdminClient()
  const { data } = await admin.from('colleges').select('*').eq('id', id).single()
  return data
}

export async function upsertCollege(college: Partial<College> & { id?: string }) {
  const admin = createAdminClient()
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
