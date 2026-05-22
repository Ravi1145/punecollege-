'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { upsertBlog, deleteBlog, approveContent, rejectContent } from '@/lib/supabase/queries-admin'

export async function createBlogAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title    = formData.get('title') as string
  const slug     = formData.get('slug') as string
  const content  = formData.get('content') as string
  const excerpt  = formData.get('excerpt') as string
  const category = formData.get('category') as string
  const status   = (formData.get('status') as string) || 'draft'

  if (!title || !slug || !content) throw new Error('Title, slug, and content are required')

  await upsertBlog({ title, slug, content, excerpt, category, status: status as 'draft' | 'pending' | 'published' | 'rejected', author_id: user.id })
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

export async function updateBlogAction(id: string, formData: FormData) {
  const title    = formData.get('title') as string
  const slug     = formData.get('slug') as string
  const content  = formData.get('content') as string
  const excerpt  = formData.get('excerpt') as string
  const category = formData.get('category') as string
  const status   = formData.get('status') as string

  await upsertBlog({ id, title, slug, content, excerpt, category, status: status as 'draft' | 'pending' | 'published' | 'rejected' })
  revalidatePath('/admin/blogs')
  revalidatePath(`/blog/${slug}`)
  redirect('/admin/blogs')
}

export async function deleteBlogAction(id: string) {
  await deleteBlog(id)
  revalidatePath('/admin/blogs')
}

export async function approveBlogAction(id: string) {
  await approveContent('blogs', id)
  revalidatePath('/admin/blogs')
  revalidatePath('/admin/approvals')
  revalidatePath('/blog')
}

export async function rejectBlogAction(id: string) {
  await rejectContent('blogs', id)
  revalidatePath('/admin/blogs')
  revalidatePath('/admin/approvals')
}
