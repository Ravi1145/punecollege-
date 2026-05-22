import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getAllLeadsAdmin } from '@/lib/supabase/queries-admin'
import { createAdminClient } from '@/lib/supabase/admin'
import StatusBadge from '@/components/admin/StatusBadge'
import type { Lead } from '@/lib/supabase/types'

export const revalidate = 0

async function updateLeadStatusAction(id: string, status: string) {
  'use server'
  const admin = createAdminClient()
  await admin.from('leads').update({ status }).eq('id', id)
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user!.id).single()
  if (profile?.role !== 'super_admin') redirect('/admin')

  const { status } = await searchParams
  const leads = await getAllLeadsAdmin(status)

  const statusLabels: Record<string, string> = {
    new: 'New', contacted: 'Contacted', converted: 'Converted', lost: 'Lost',
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">{leads.length} total leads</p>
        </div>
        <a href="/api/admin/export-leads"
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700">
          ↓ Export CSV
        </a>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {['', 'new', 'contacted', 'converted'].map((s) => (
          <a key={s} href={s ? `/admin/leads?status=${s}` : '/admin/leads'}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              (status ?? '') === s
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}>
            {s ? statusLabels[s] : 'All'}
          </a>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No leads yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Name', 'Phone', 'Stream', 'College Interest', 'Status', 'Date', 'Action'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead: Lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-xs text-gray-400">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{lead.phone ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{lead.stream ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{lead.college_interest ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                        lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {statusLabels[lead.status] ?? lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-3">
                      {lead.status === 'new' && (
                        <form action={updateLeadStatusAction.bind(null, lead.id, 'contacted')}>
                          <button className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                            Mark Contacted
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
