'use server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false
  const { data: profile } = await supabase.from('profiles').select('is_active').eq('id', user.id).single()
  return Boolean(profile?.is_active)
}

interface ImportResult {
  success: number
  failed: number
  errors: string[]
}

// Fields allowed for college upsert (blocks id/created_at/updated_at injection)
const COLLEGE_ALLOWED = new Set([
  'name', 'slug', 'short_name', 'type', 'established', 'affiliation', 'stream', 'status',
  'location', 'address', 'city', 'state', 'website', 'phone', 'email',
  'logo_url', 'cover_url', 'description',
  'naac_grade', 'nirf_rank', 'rating', 'review_count',
  'courses', 'specializations', 'entrance_exams',
  'fees_min', 'fees_max', 'avg_placement', 'highest_pkg', 'top_recruiters',
  'hostel', 'highlights', 'tags',
  'featured', 'featured_order', 'details',
])

// Fields allowed for blog upsert
const BLOG_ALLOWED = new Set([
  'title', 'slug', 'excerpt', 'content', 'category', 'tags',
  'cover_url', 'read_time', 'status', 'published_at', 'author_id',
])

function pick(obj: Record<string, unknown>, allowed: Set<string>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => allowed.has(k))
  )
}

function coerceCollege(raw: Record<string, unknown>): Record<string, unknown> {
  const c = pick(raw, COLLEGE_ALLOWED)

  // Coerce number fields
  for (const f of ['established', 'nirf_rank', 'rating', 'review_count',
                    'fees_min', 'fees_max', 'avg_placement', 'highest_pkg',
                    'featured_order']) {
    if (c[f] !== undefined && c[f] !== null) c[f] = Number(c[f])
  }

  // Coerce boolean fields
  for (const f of ['hostel', 'featured']) {
    if (c[f] !== undefined) c[f] = Boolean(c[f])
  }

  // Ensure array fields are arrays
  for (const f of ['courses', 'specializations', 'entrance_exams',
                    'top_recruiters', 'highlights', 'tags']) {
    if (c[f] !== undefined && !Array.isArray(c[f])) {
      c[f] = typeof c[f] === 'string'
        ? (c[f] as string).split(',').map((s: string) => s.trim()).filter(Boolean)
        : []
    }
  }

  // Default status
  if (!c.status) c.status = 'draft'

  return c
}

function coerceBlog(raw: Record<string, unknown>): Record<string, unknown> {
  const b = pick(raw, BLOG_ALLOWED)

  // Ensure tags is array
  if (b.tags !== undefined && !Array.isArray(b.tags)) {
    b.tags = typeof b.tags === 'string'
      ? (b.tags as string).split(',').map((s: string) => s.trim()).filter(Boolean)
      : []
  }

  // Coerce read_time
  if (b.read_time !== undefined && b.read_time !== null) b.read_time = Number(b.read_time)

  // Default status
  if (!b.status) b.status = 'draft'

  // Null out empty author_id
  if (b.author_id === '' || b.author_id === undefined) b.author_id = null

  return b
}

export async function importJSONAction(
  formData: FormData
): Promise<{ colleges?: ImportResult; blogs?: ImportResult; error?: string }> {
  const ok = await requireAdmin()
  if (!ok) return { error: 'Unauthorized — please log in as admin' }

  const admin = createAdminClient()
  const type = formData.get('type') as 'colleges' | 'blogs'
  const json = formData.get('json') as string

  if (!json?.trim()) return { error: 'No JSON provided' }
  if (type !== 'colleges' && type !== 'blogs') return { error: 'Invalid import type' }

  let items: unknown[]
  try {
    items = JSON.parse(json)
    if (!Array.isArray(items)) return { error: 'JSON must be an array [ { … }, { … } ]' }
    if (items.length === 0) return { error: 'Array is empty — nothing to import' }
    if (items.length > 500) return { error: 'Max 500 records per import' }
  } catch {
    return { error: 'Invalid JSON — paste a valid JSON array' }
  }

  const result: ImportResult = { success: 0, failed: 0, errors: [] }

  for (let i = 0; i < items.length; i++) {
    try {
      const raw = items[i] as Record<string, unknown>

      if (type === 'colleges') {
        if (!raw.name || !raw.slug) {
          result.failed++
          result.errors.push(`Row ${i + 1}: missing required fields "name" and "slug"`)
          continue
        }
        const row = coerceCollege(raw)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (admin.from('colleges') as any).upsert(row, { onConflict: 'slug' })
        if (error) {
          result.failed++
          result.errors.push(`Row ${i + 1} (${raw.slug}): ${error.message}`)
        } else {
          result.success++
        }
      } else {
        if (!raw.title || !raw.slug) {
          result.failed++
          result.errors.push(`Row ${i + 1}: missing required fields "title" and "slug"`)
          continue
        }
        const row = coerceBlog(raw)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (admin.from('blogs') as any).upsert(row, { onConflict: 'slug' })
        if (error) {
          result.failed++
          result.errors.push(`Row ${i + 1} (${raw.slug}): ${error.message}`)
        } else {
          result.success++
        }
      }
    } catch (err) {
      result.failed++
      result.errors.push(`Row ${i + 1}: ${String(err)}`)
    }
  }

  revalidatePath(`/admin/${type}`)
  if (type === 'colleges') revalidatePath('/colleges')
  if (type === 'blogs') revalidatePath('/blog')

  return { [type]: result }
}
