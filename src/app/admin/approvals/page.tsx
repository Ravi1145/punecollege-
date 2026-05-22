import Link from 'next/link'
import { getPendingApprovals } from '@/lib/supabase/queries-admin'
import { approveItemAction, rejectItemAction } from './actions'
import type { Review, QaQuestion } from '@/lib/supabase/types'

export const revalidate = 0

function ApproveRejectButtons({ table, id }: { table: 'blogs' | 'reviews' | 'qa_questions'; id: string }) {
  return (
    <div className="flex gap-2 shrink-0">
      <form action={approveItemAction.bind(null, table, id)}>
        <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors">
          ✓ Approve
        </button>
      </form>
      <form action={rejectItemAction.bind(null, table, id)}>
        <button className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors">
          ✗ Reject
        </button>
      </form>
    </div>
  )
}

export default async function ApprovalsPage() {
  const { blogs, reviews, qa } = await getPendingApprovals()
  const total = blogs.length + reviews.length + qa.length

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Approvals Queue</h1>
        <p className="text-gray-500 text-sm mt-1">
          {total === 0 ? 'All caught up!' : `${total} item${total !== 1 ? 's' : ''} awaiting review`}
        </p>
      </div>

      {total === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-12 text-center">
          <div className="text-5xl mb-3">✅</div>
          <div className="font-semibold text-green-800 text-lg">Nothing pending!</div>
          <p className="text-green-600 text-sm mt-1">Check back later when users submit content.</p>
        </div>
      )}

      {/* Blogs */}
      {blogs.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-base font-bold text-gray-800">📝 Blog Posts</h2>
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">{blogs.length}</span>
          </div>
          <div className="space-y-2">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-gray-300 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">{blog.title}</div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-400 font-mono">/blog/{blog.slug}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(blog.created_at).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/admin/blogs/${blog.id}`} target="_blank"
                    className="text-xs text-blue-600 hover:underline shrink-0">Preview</Link>
                  <ApproveRejectButtons table="blogs" id={blog.id} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-base font-bold text-gray-800">⭐ Reviews</h2>
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">{reviews.length}</span>
          </div>
          <div className="space-y-2">
            {reviews.map((review: Review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-yellow-500 text-sm">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
                      <span className="text-sm font-medium text-gray-700">by {review.author_name}</span>
                      {review.course && (
                        <span className="text-xs text-gray-400">· {review.course}{review.batch_year ? ` (${review.batch_year})` : ''}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{review.body}</p>
                    {review.pros && <p className="text-xs text-green-600 mt-1">👍 {review.pros}</p>}
                    {review.cons && <p className="text-xs text-red-500 mt-0.5">👎 {review.cons}</p>}
                  </div>
                  <ApproveRejectButtons table="reviews" id={review.id} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Q&A */}
      {qa.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-base font-bold text-gray-800">❓ Q&amp;A Questions</h2>
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">{qa.length}</span>
          </div>
          <div className="space-y-2">
            {qa.map((q: QaQuestion) => (
              <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4 hover:border-gray-300 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 line-clamp-2">{q.question}</div>
                  <div className="text-xs text-gray-400 mt-0.5">by {q.author_name} · {new Date(q.created_at).toLocaleDateString('en-IN')}</div>
                </div>
                <ApproveRejectButtons table="qa_questions" id={q.id} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
