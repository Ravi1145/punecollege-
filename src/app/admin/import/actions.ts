'use server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

interface ImportResult {
  success: number
  failed: number
  errors: string[]
}

export async function importJSONAction(
  formData: FormData
): Promise<{ colleges?: ImportResult; blogs?: ImportResult; error?: string }> {
  const admin = createAdminClient()
  const type = formData.get('type') as 'colleges' | 'blogs'
  const json = formData.get('json') as string

  if (!json) return { error: 'No JSON provided' }

  let items: unknown[]
  try {
    items = JSON.parse(json)
    if (!Array.isArray(items)) return { error: 'JSON must be an array of objects' }
  } catch {
    return { error: 'Invalid JSON format — paste a valid JSON array' }
  }

  const result: ImportResult = { success: 0, failed: 0, errors: [] }

  for (const item of items) {
    try {
      const c = item as Record<string, unknown>
      if (type === 'colleges') {
        if (!c.name || !c.slug) {
          result.failed++
          result.errors.push(`Row missing name/slug: ${JSON.stringify(c).slice(0, 60)}`)
          continue
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (admin.from('colleges') as any).upsert(c, { onConflict: 'slug' })
        if (error) { result.failed++; result.errors.push(`${c.slug}: ${error.message}`) }
        else result.success++
      } else {
        if (!c.title || !c.slug) {
          result.failed++
          result.errors.push(`Row missing title/slug: ${JSON.stringify(c).slice(0, 60)}`)
          continue
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { error } = await (admin.from('blogs') as any).upsert(
          { ...c, status: c.status ?? 'draft' },
          { onConflict: 'slug' }
        )
        if (error) { result.failed++; result.errors.push(`${c.slug}: ${error.message}`) }
        else result.success++
      }
    } catch (err) {
      result.failed++
      result.errors.push(String(err))
    }
  }

  revalidatePath(`/admin/${type}`)
  return { [type]: result }
}
