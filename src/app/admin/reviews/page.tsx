import { createAdminClient } from '@/lib/supabase/admin'
import StatusBadge from '@/components/admin/StatusBadge'
import { approveItemAction, rejectItemAction } from '../approvals/actions'
import type { ContentStatus, Review } from '@/lib/supabase/types'

export const revalidate = 0

const statusFilter = ['all', 'pending', 'published', 'rejected'] as const

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const admin = createAdminClient()

  let query = admin
    .from('reviews')
    .select('*, colleges(name, slug)')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') query = query.eq('status', status)

  const { data: reviews } = await query

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Reviews</h1>
        <p className="text-gray-500 text-sm mt-1">{reviews?.length ?? 0} reviews</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
        {statusFilter.map((tab) => {
          const active = (status ?? 'all') === tab
          const href = tab === 'all' ? '/admin/reviews' : `/admin/reviews?status=${tab}`
          return (
            <a key={tab} href={href}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {tab}
            </a>
          )
        })}
      </div>

      <div className="space-y-3">
        {(reviews ?? []).map((review: Review & { colleges?: { name: string; slug: string } | null }) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Meta */}
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <span className="text-yellow-500 font-bold text-sm">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </span>
                  <span className="text-sm font-semibold text-gray-800">{review.author_name}</span>
                  {review.course && (
                    <span className="text-xs text-gray-500">· {review.course}{review.batch_year ? ` (${review.batch_year})` : ''}</span>
                  )}
                  {review.author_email && (
                    <span className="text-xs text-gray-400">{review.author_email}</span>
                  )}
                  <StatusBadge status={review.status as ContentStatus} />
                </div>

                {/* College */}
                {review.colleges && (
                  <div className="text-xs text-blue-600 mb-2">
                    📍 {review.colleges.name}
                  </div>
                )}

                {/* Body */}
                <p className="text-sm text-gray-700 leading-relaxed">{review.body}</p>

                {/* Pros & Cons */}
                {(review.pros || review.cons) && (
                  <div className="flex gap-6 mt-3">
                    {review.pros && (
                      <div>
                        <span className="text-xs font-semibold text-green-700">👍 Pros</span>
                        <p className="text-xs text-gray-600 mt-0.5">{review.pros}</p>
                      </div>
                    )}
                    {review.cons && (
                      <div>
                        <span className="text-xs font-semibold text-red-600">👎 Cons</span>
                        <p className="text-xs text-gray-600 mt-0.5">{review.cons}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="text-xs text-gray-400 mt-2">
                  {new Date(review.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>

              {/* Actions */}
              {review.status === 'pending' && (
                <div className="flex flex-col gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, 'reviews', review.id)}>
                    <button className="w-full px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors">
                      ✓ Approve
                    </button>
                  </form>
                  <form action={rejectItemAction.bind(null, 'reviews', review.id)}>
                    <button className="w-full px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors">
                      ✗ Reject
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
        {!reviews?.length && (
          <div className="text-center text-gray-400 py-12 bg-white rounded-xl border border-gray-200">
            No reviews yet.
          </div>
        )}
      </div>
    </div>
  )
}
