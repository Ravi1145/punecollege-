import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAllLeadsAdmin } from '@/lib/supabase/queries-admin'
import type { Lead } from '@/lib/supabase/types'

export const revalidate = 0

async function updateLeadStatusAction(id: string, nextStatus: string) {
  'use server'
  const admin = createAdminClient()
  await admin.from('leads').update({ status: nextStatus }).eq('id', id)
}

async function saveLeadNotesAction(id: string, formData: FormData) {
  'use server'
  const notes = formData.get('notes') as string
  const admin = createAdminClient()
  await admin.from('leads').update({ notes }).eq('id', id)
}

const STATUS_TABS = [
  { value: '', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'converted', label: 'Converted' },
  { value: 'lost', label: 'Lost' },
]

const STATUS_NEXT: Record<string, string> = {
  new: 'contacted',
  contacted: 'converted',
  converted: 'new',
  lost: 'new',
}

const statusStyle: Record<string, string> = {
  new:       'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  converted: 'bg-green-100 text-green-700',
  lost:      'bg-gray-100 text-gray-500',
}

const sourceLabel: Record<string, string> = {
  enquiry_form: 'Enquiry',
  college_page: 'College',
  exit_popup:   'Exit Popup',
  ai_gate:      'AI',
  predictor:    'Predictor',
  shortlist:    'Shortlist',
  counselling:  'Counselling',
  lead_magnet:  'Lead Magnet',
  inline_form:  'Inline',
  news_alert:   'Alert',
  lead_bar:     'Top Bar',
  website:      'Website',
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; expand?: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user!.id).single()
  if (profile?.role !== 'super_admin') redirect('/admin')

  const { status, q, expand } = await searchParams
  let leads = await getAllLeadsAdmin(status || undefined)

  if (q) {
    const query = q.toLowerCase()
    leads = leads.filter((l) =>
      l.name.toLowerCase().includes(query) ||
      (l.phone ?? '').includes(query) ||
      (l.email ?? '').toLowerCase().includes(query) ||
      (l.stream ?? '').toLowerCase().includes(query) ||
      (l.college_interest ?? '').toLowerCase().includes(query) ||
      (l.source ?? '').toLowerCase().includes(query)
    )
  }

  const counts = {
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">
            {leads.length} leads{q ? ` matching "${q}"` : ''}
            {' · '}
            <span className="text-blue-600 font-medium">{counts.new} new</span>
            {' · '}
            <span className="text-yellow-600 font-medium">{counts.contacted} contacted</span>
            {' · '}
            <span className="text-green-600 font-medium">{counts.converted} converted</span>
          </p>
        </div>
        <a href="/api/admin/export-leads"
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700">
          ↓ Export CSV
        </a>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <form method="GET" className="flex-1 min-w-[200px] max-w-sm">
          {status && <input type="hidden" name="status" value={status} />}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input name="q" defaultValue={q ?? ''} placeholder="Search name, phone, stream, source..."
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </form>
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          {STATUS_TABS.map((tab) => {
            const active = (status ?? '') === tab.value
            const href = tab.value
              ? `/admin/leads?status=${tab.value}${q ? `&q=${q}` : ''}`
              : `/admin/leads${q ? `?q=${q}` : ''}`
            return (
              <Link key={tab.value} href={href}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}>
                {tab.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-12 text-center text-gray-400">No leads found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['#', 'Lead', 'Contact', 'Interest', 'Source', 'Notes', 'Status', 'Date'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead: Lead, idx: number) => (
                  <>
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      {/* # */}
                      <td className="px-4 py-3 text-xs text-gray-400 font-mono w-10 whitespace-nowrap">
                        {leads.length - idx}
                      </td>

                      {/* Name / Email */}
                      <td className="px-4 py-3">
                        <Link href={`/admin/leads?${new URLSearchParams({ ...(status ? { status } : {}), ...(q ? { q } : {}), expand: expand === lead.id ? '' : lead.id }).toString()}`}
                          className="font-medium text-gray-900 hover:text-blue-600">
                          {lead.name}
                        </Link>
                        {lead.email && <div className="text-xs text-gray-400">{lead.email}</div>}
                        {lead.stream && <div className="text-xs text-blue-500">{lead.stream}</div>}
                      </td>

                      {/* Phone */}
                      <td className="px-4 py-3">
                        {lead.phone ? (
                          <a href={`tel:${lead.phone}`} className="font-mono text-xs text-blue-600 hover:underline whitespace-nowrap">
                            {lead.phone}
                          </a>
                        ) : <span className="text-gray-400">—</span>}
                      </td>

                      {/* Interest */}
                      <td className="px-4 py-3 text-xs text-gray-600 max-w-[160px]">
                        {lead.college_interest && <div className="truncate font-medium">{lead.college_interest}</div>}
                        {lead.course_interest && <div className="truncate text-gray-400">{lead.course_interest}</div>}
                        {!lead.college_interest && !lead.course_interest && <span className="text-gray-300">—</span>}
                      </td>

                      {/* Source */}
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                          {sourceLabel[lead.source ?? ''] ?? lead.source ?? '—'}
                        </span>
                      </td>

                      {/* Notes */}
                      <td className="px-4 py-3">
                        <form action={saveLeadNotesAction.bind(null, lead.id)} className="flex gap-1">
                          <input name="notes" defaultValue={lead.notes ?? ''} placeholder="Add note..."
                            className="w-28 text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400" />
                          <button type="submit" className="text-xs text-blue-600 hover:text-blue-800 font-medium">✓</button>
                        </form>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <form action={updateLeadStatusAction.bind(null, lead.id, STATUS_NEXT[lead.status] ?? 'new')}>
                          <button type="submit"
                            className={`px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity ${statusStyle[lead.status] ?? 'bg-gray-100 text-gray-600'}`}
                            title={`Click to change to ${STATUS_NEXT[lead.status] ?? 'new'}`}>
                            {lead.status}
                          </button>
                        </form>
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleDateString('en-IN')}
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {expand === lead.id && (
                      <tr key={`${lead.id}-detail`} className="bg-blue-50 border-b border-blue-100">
                        <td colSpan={8} className="px-5 py-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                            {lead.exam_type && (
                              <div><span className="text-gray-500 block">Exam</span><span className="font-medium">{lead.exam_type}</span></div>
                            )}
                            {lead.exam_score && (
                              <div><span className="text-gray-500 block">Score</span><span className="font-medium">{lead.exam_score}</span></div>
                            )}
                            {lead.budget && (
                              <div><span className="text-gray-500 block">Budget</span><span className="font-medium">{lead.budget}</span></div>
                            )}
                            {lead.career_goal && (
                              <div><span className="text-gray-500 block">Goal</span><span className="font-medium">{lead.career_goal}</span></div>
                            )}
                            {lead.message && (
                              <div className="col-span-2"><span className="text-gray-500 block">Message</span><span className="font-medium">{lead.message}</span></div>
                            )}
                            {lead.page_url && (
                              <div className="col-span-2"><span className="text-gray-500 block">Page</span>
                                <span className="font-mono text-gray-600 truncate block max-w-xs">{lead.page_url}</span>
                              </div>
                            )}
                            {lead.notes && (
                              <div className="col-span-2"><span className="text-gray-500 block">Notes</span><span className="font-medium text-blue-700">{lead.notes}</span></div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
