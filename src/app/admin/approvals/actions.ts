'use server'
import { revalidatePath } from 'next/cache'
import { approveContent, rejectContent } from '@/lib/supabase/queries-admin'

export async function approveItemAction(
  table: 'blogs' | 'reviews' | 'qa_questions',
  id: string
) {
  await approveContent(table, id)
  revalidatePath('/admin/approvals')
  revalidatePath('/admin/blogs')
  revalidatePath('/admin/reviews')
  revalidatePath('/admin/qa')
}

export async function rejectItemAction(
  table: 'blogs' | 'reviews' | 'qa_questions',
  id: string
) {
  await rejectContent(table, id)
  revalidatePath('/admin/approvals')
  revalidatePath('/admin/blogs')
  revalidatePath('/admin/reviews')
  revalidatePath('/admin/qa')
}
