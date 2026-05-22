import { getPendingApprovals } from '@/lib/supabase/queries-admin'
import { approveItemAction, rejectItemAction } from './actions'
import type { Review, QaQuestion } from '@/lib/supabase/types'

export const revalidate = 0

export default async function ApprovalsPage() {
  const { blogs, reviews, qa } = await getPendingApprovals()
  const total = blogs.length + reviews.length + qa.length

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Approvals Queue</h1>
      <p className="text-gray-500 text-sm mb-6">{total} items pending review</p>

      {total === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-10 text-center">
          <div className="text-4xl mb-3">✅</div>
          <div className="font-semibold text-green-800">All caught up! No pending approvals.</div>
        </div>
      )}

      {blogs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Blog Posts ({blogs.length})</h2>
          <div className="space-y-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-900">{blog.title}</div>
                  <div className="text-xs text-gray-400 font-mono mt-0.5">/blog/{blog.slug}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, 'blogs', blog.id)}>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">
                      ✓ Approve
                    </button>
                  </form>
                  <form action={rejectItemAction.bind(null, 'blogs', blog.id)}>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200">
                      ✗ Reject
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Reviews ({reviews.length})</h2>
          <div className="space-y-3">
            {reviews.map((review: Review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-yellow-600 mb-1">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)} by {review.author_name}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{review.body}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, 'reviews', review.id)}>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">✓</button>
                  </form>
                  <form action={rejectItemAction.bind(null, 'reviews', review.id)}>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200">✗</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {qa.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Q&A Questions ({qa.length})</h2>
          <div className="space-y-3">
            {qa.map((q: QaQuestion) => (
              <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="font-medium text-gray-900 line-clamp-2">{q.question}</div>
                <div className="flex gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, 'qa_questions', q.id)}>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">✓</button>
                  </form>
                  <form action={rejectItemAction.bind(null, 'qa_questions', q.id)}>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200">✗</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
