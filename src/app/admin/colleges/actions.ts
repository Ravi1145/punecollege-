'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { upsertCollege, deleteCollege } from '@/lib/supabase/queries-admin'

export async function createCollegeAction(formData: FormData) {
  const name        = formData.get('name') as string
  const slug        = formData.get('slug') as string
  const location    = formData.get('location') as string
  const type        = formData.get('type') as string
  const established = parseInt(formData.get('established') as string) || undefined

  if (!name || !slug) throw new Error('Name and slug are required')

  await upsertCollege({ name, slug, location, type, established, status: 'published' })
  revalidatePath('/admin/colleges')
  redirect('/admin/colleges')
}

export async function updateCollegeAction(id: string, formData: FormData) {
  const name        = formData.get('name') as string
  const slug        = formData.get('slug') as string
  const location    = formData.get('location') as string
  const type        = formData.get('type') as string
  const established = parseInt(formData.get('established') as string) || undefined

  await upsertCollege({ id, name, slug, location, type, established })
  revalidatePath('/admin/colleges')
  revalidatePath(`/colleges/${slug}`)
  redirect('/admin/colleges')
}

export async function deleteCollegeAction(id: string) {
  await deleteCollege(id)
  revalidatePath('/admin/colleges')
}
