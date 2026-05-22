import { createAdminClient } from '@/lib/supabase/admin'
import StatusBadge from '@/components/admin/StatusBadge'
import { approveItemAction, rejectItemAction } from '../approvals/actions'
import type { ContentStatus, QaQuestion } from '@/lib/supabase/types'

export const revalidate = 0

export default async function AdminQAPage() {
  const admin = createAdminClient()
  const { data: questions } = await admin
    .from('qa_questions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        Q&A ({questions?.length ?? 0})
      </h1>
      <div className="space-y-3">
        {(questions ?? []).map((q: QaQuestion) => (
          <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">{q.question}</div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={q.status as ContentStatus} />
                  <span className="text-xs text-gray-400">by {q.author_name}</span>
                </div>
              </div>
              {q.status === 'pending' && (
                <div className="flex gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, 'qa_questions', q.id)}>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">
                      ✓ Approve
                    </button>
                  </form>
                  <form action={rejectItemAction.bind(null, 'qa_questions', q.id)}>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200">
                      ✗ Reject
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
        {!questions?.length && (
          <div className="text-center text-gray-400 py-12">No Q&A questions yet.</div>
        )}
      </div>
    </div>
  )
}
