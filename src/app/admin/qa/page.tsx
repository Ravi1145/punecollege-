import { createAdminClient } from '@/lib/supabase/admin'
import StatusBadge from '@/components/admin/StatusBadge'
import { approveItemAction, rejectItemAction } from '../approvals/actions'
import type { ContentStatus, QaQuestion } from '@/lib/supabase/types'

export const revalidate = 0

const statusFilter = ['all', 'pending', 'published', 'rejected'] as const

export default async function AdminQAPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const admin = createAdminClient()

  let query = admin
    .from('qa_questions')
    .select('*, colleges(name, slug)')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') query = query.eq('status', status)

  const { data: questions } = await query

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Q&amp;A Questions</h1>
        <p className="text-gray-500 text-sm mt-1">{questions?.length ?? 0} questions</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
        {statusFilter.map((tab) => {
          const active = (status ?? 'all') === tab
          const href = tab === 'all' ? '/admin/qa' : `/admin/qa?status=${tab}`
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
        {(questions ?? []).map((q: QaQuestion & { colleges?: { name: string; slug: string } | null }) => (
          <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">❓</span>
                  <StatusBadge status={q.status as ContentStatus} />
                  <span className="text-xs text-gray-500">by {q.author_name}</span>
                  {q.author_email && <span className="text-xs text-gray-400">{q.author_email}</span>}
                  {q.views > 0 && <span className="text-xs text-gray-400">{q.views} views</span>}
                </div>

                {q.colleges && (
                  <div className="text-xs text-blue-600 mb-2">📍 {q.colleges.name}</div>
                )}

                <p className="text-sm font-medium text-gray-800 leading-relaxed">{q.question}</p>

                <div className="text-xs text-gray-400 mt-2">
                  {new Date(q.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>

              {q.status === 'pending' && (
                <div className="flex flex-col gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, 'qa_questions', q.id)}>
                    <button className="w-full px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition-colors">
                      ✓ Approve
                    </button>
                  </form>
                  <form action={rejectItemAction.bind(null, 'qa_questions', q.id)}>
                    <button className="w-full px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-semibold rounded-lg hover:bg-red-100 transition-colors">
                      ✗ Reject
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
        {!questions?.length && (
          <div className="text-center text-gray-400 py-12 bg-white rounded-xl border border-gray-200">
            No questions yet.
          </div>
        )}
      </div>
    </div>
  )
}
