'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

async function assertAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { data: profile } = await supabase.from('profiles').select('is_active').eq('id', user.id).single()
  if (!profile?.is_active) throw new Error('Forbidden')
}

function str(fd: FormData, key: string): string | null {
  return (fd.get(key) as string || '').trim() || null
}
function num(fd: FormData, key: string): number | null {
  const v = (fd.get(key) as string || '').trim()
  const n = Number(v)
  return v && !isNaN(n) ? n : null
}

export async function upsertCourseAction(
  courseId: string | null,
  _prev: unknown,
  formData: FormData
) {
  try { await assertAuth() } catch { return { error: 'Unauthorized' } }
  const admin = createAdminClient()

  const payload = {
    college_id:    str(formData, 'college_id')!,
    course_name:   str(formData, 'course_name')!,
    specialization: str(formData, 'specialization'),
    course_type:   str(formData, 'course_type') ?? 'UG',
    duration:      str(formData, 'duration'),
    fees_per_year: num(formData, 'fees_per_year'),
    total_fees:    num(formData, 'total_fees'),
    seats:         num(formData, 'seats'),
    eligibility:   str(formData, 'eligibility'),
    entrance_exam: str(formData, 'entrance_exam'),
    updated_at:    new Date().toISOString(),
  }

  if (!payload.college_id || !payload.course_name) {
    return { error: 'College and Course Name are required.' }
  }

  let error
  if (courseId) {
    ;({ error } = await admin.from('college_courses').update(payload).eq('id', courseId))
  } else {
    ;({ error } = await admin.from('college_courses').insert(payload))
  }

  if (error) return { error: error.message }

  revalidatePath('/admin/courses')
  revalidatePath(`/colleges/${payload.college_id}`)
  return { success: true }
}

export async function deleteCourseAction(courseId: string) {
  try { await assertAuth() } catch { return { error: 'Unauthorized' } }
  const admin = createAdminClient()
  const { error } = await admin.from('college_courses').delete().eq('id', courseId)
  if (error) return { error: error.message }
  revalidatePath('/admin/courses')
  return { success: true }
}
