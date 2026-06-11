'use server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/server-auth'

export async function upsertHeroAction(formData: FormData) {
  await requireAdmin()
  const admin = createAdminClient()
  const id         = formData.get('id') as string | null
  const type       = formData.get('type') as string
  const title      = formData.get('title') as string
  const subtitle   = formData.get('subtitle') as string
  const cta_text   = formData.get('cta_text') as string
  const cta_link   = formData.get('cta_link') as string
  const image_url  = formData.get('image_url') as string
  const is_active  = formData.get('is_active') === 'on' || formData.get('is_active') === 'true'
  const sort_order = parseInt(formData.get('sort_order') as string) || 0

  const payload = { type, title, subtitle: subtitle || null, cta_text: cta_text || null, cta_link: cta_link || null, image_url: image_url || null, is_active, sort_order }

  if (id) {
    const { error } = await admin.from('hero_banners').update(payload).eq('id', id)
    if (error) throw error
  } else {
    const { error } = await admin.from('hero_banners').insert(payload)
    if (error) throw error
  }

  revalidatePath('/admin/hero')
  revalidatePath('/')
}

export async function deleteHeroAction(id: string) {
  await requireAdmin()
  const admin = createAdminClient()
  const { error } = await admin.from('hero_banners').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/hero')
  revalidatePath('/')
}

export async function toggleHeroBannerActive(id: string, is_active: boolean) {
  await requireAdmin()
  const admin = createAdminClient()
  const { error } = await admin.from('hero_banners').update({ is_active }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/hero')
  revalidatePath('/')
}
