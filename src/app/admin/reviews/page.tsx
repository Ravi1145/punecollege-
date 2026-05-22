import { createAdminClient } from '@/lib/supabase/admin'
import StatusBadge from '@/components/admin/StatusBadge'
import { approveItemAction, rejectItemAction } from '../approvals/actions'
import type { ContentStatus, Review } from '@/lib/supabase/types'

export const revalidate = 0

export default async function AdminReviewsPage() {
  const admin = createAdminClient()
  const { data: reviews } = await admin
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        Reviews ({reviews?.length ?? 0})
      </h1>
      <div className="space-y-3">
        {(reviews ?? []).map((review: Review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-yellow-500 font-bold">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </span>
                  <span className="text-sm text-gray-600">by {review.author_name}</span>
                  <StatusBadge status={review.status as ContentStatus} />
                </div>
                <p className="text-sm text-gray-700">{review.body}</p>
                {review.course && (
                  <p className="text-xs text-gray-400 mt-1">Course: {review.course} • Batch: {review.batch_year}</p>
                )}
              </div>
              {review.status === 'pending' && (
                <div className="flex gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, 'reviews', review.id)}>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">
                      ✓ Approve
                    </button>
                  </form>
                  <form action={rejectItemAction.bind(null, 'reviews', review.id)}>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200">
                      ✗ Reject
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
        {!reviews?.length && (
          <div className="text-center text-gray-400 py-12">No reviews yet.</div>
        )}
      </div>
    </div>
  )
}
