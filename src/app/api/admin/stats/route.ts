import { NextRequest, NextResponse } from 'next/server'
import { isAuthorized, unauthorized } from '@/lib/admin-auth'
import { getLeadsStats, getCollegesStats } from '@/lib/db'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()

  try {
    const [leadsStats, collegesStats, blogsResult, enquiriesResult] = await Promise.all([
      getLeadsStats(),
      getCollegesStats(),
      supabaseAdmin.from('blogs').select('status', { count: 'exact' }).neq('status', 'archived'),
      supabaseAdmin.from('enquiries').select('status', { count: 'exact' }),
    ])

    // Blog stats
    const blogsTotal = blogsResult.count ?? 0
    const blogsPublished = (blogsResult.data ?? []).filter((b: { status: string }) => b.status === 'published').length
    const blogsDraft = (blogsResult.data ?? []).filter((b: { status: string }) => b.status === 'draft').length

    // Enquiry stats
    const enquiriesTotal = enquiriesResult.count ?? 0
    const enquiriesPending = (enquiriesResult.data ?? []).filter((e: { status: string }) => e.status === 'pending').length

    return NextResponse.json({
      ...leadsStats,
      colleges: {
        total: collegesStats.total,
        published: collegesStats.published,
        draft: collegesStats.draft,
        aiGenerated: collegesStats.aiGenerated,
      },
      blogs: {
        total: blogsTotal,
        published: blogsPublished,
        draft: blogsDraft,
      },
      enquiries: {
        total: enquiriesTotal,
        pending: enquiriesPending,
      },
    })
  } catch (e) {
    console.error('[stats]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
