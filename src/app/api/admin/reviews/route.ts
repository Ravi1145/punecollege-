/**
 * Admin Reviews API
 * GET    /api/admin/reviews?status=pending&college_slug=...
 * PATCH  /api/admin/reviews   { id, status: 'approved'|'rejected' }
 * DELETE /api/admin/reviews?id=<uuid>
 */
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase'
import { isAuthorized, unauthorized } from '@/lib/admin-auth'

// GET — list reviews (default: pending, for moderation queue)
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()

  const { searchParams } = new URL(req.url)
  const status       = searchParams.get('status')       || 'pending'
  const college_slug = searchParams.get('college_slug') || undefined
  const page         = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit        = Math.min(50, parseInt(searchParams.get('limit') || '20'))
  const offset       = (page - 1) * limit

  let query = supabaseAdmin
    .from('college_reviews')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status !== 'all') query = query.eq('status', status)
  if (college_slug)     query = query.eq('college_slug', college_slug)

  const { data, count, error } = await query
  if (error) {
    console.error('[admin/reviews GET]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    reviews: data ?? [],
    total: count ?? 0,
    page,
    totalPages: Math.ceil((count ?? 0) / limit),
  })
}

// PATCH — approve or reject a review
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()

  try {
    const { id, status } = await req.json()
    if (!id)     return NextResponse.json({ error: 'id is required' }, { status: 400 })
    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'status must be approved or rejected' }, { status: 400 })
    }

    const { data: review, error: fetchErr } = await supabaseAdmin
      .from('college_reviews')
      .select('college_slug')
      .eq('id', id)
      .maybeSingle()

    if (fetchErr || !review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    const { error } = await supabaseAdmin
      .from('college_reviews')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Revalidate college page so updated rating shows immediately
    revalidatePath(`/colleges/${review.college_slug}`)

    return NextResponse.json({ success: true, message: `Review ${status}` })
  } catch (err) {
    console.error('[admin/reviews PATCH]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE — permanently remove a review
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) return unauthorized()

  try {
    const id = new URL(req.url).searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

    const { data: review } = await supabaseAdmin
      .from('college_reviews')
      .select('college_slug')
      .eq('id', id)
      .maybeSingle()

    const { error } = await supabaseAdmin
      .from('college_reviews')
      .delete()
      .eq('id', id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    if (review?.college_slug) revalidatePath(`/colleges/${review.college_slug}`)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/reviews DELETE]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
