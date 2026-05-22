'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { upsertBlog, deleteBlog, approveContent, rejectContent } from '@/lib/supabase/queries-admin'
import type { ContentStatus } from '@/lib/supabase/types'

function parseBlogForm(formData: FormData) {
  const tagsRaw = formData.get('tags') as string
  const tags = tagsRaw
    ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
    : null

  return {
    title:     formData.get('title') as string,
    slug:      formData.get('slug') as string,
    content:   (formData.get('content') as string) || null,
    excerpt:   (formData.get('excerpt') as string) || null,
    category:  (formData.get('category') as string) || null,
    cover_url: (formData.get('cover_url') as string) || null,
    read_time: parseInt(formData.get('read_time') as string) || null,
    tags,
    status:    ((formData.get('status') as string) || 'draft') as ContentStatus,
  }
}

export async function createBlogAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const data = parseBlogForm(formData)
  if (!data.title || !data.slug) throw new Error('Title and slug are required')

  await upsertBlog({ ...data, author_id: user.id })
  revalidatePath('/admin/blogs')
  redirect('/admin/blogs')
}

export async function updateBlogAction(id: string, formData: FormData) {
  const data = parseBlogForm(formData)
  await upsertBlog({ id, ...data })
  revalidatePath('/admin/blogs')
  revalidatePath(`/blog/${data.slug}`)
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
