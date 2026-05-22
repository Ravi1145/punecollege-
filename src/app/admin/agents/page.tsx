import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getAgentProfiles } from '@/lib/supabase/queries-admin'
import { inviteAgentAction, toggleAgentActiveAction } from './actions'
import type { Profile } from '@/lib/supabase/types'

export const revalidate = 0

export default async function AdminAgentsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user!.id).single()
  if (profile?.role !== 'super_admin') redirect('/admin')

  const agents = await getAgentProfiles()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Agent Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">{agents.length} total users</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Name / Email', 'Role', 'Status', 'Joined', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agents.map((agent: Profile) => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{agent.full_name || '—'}</div>
                  <div className="text-xs text-gray-500">{agent.email}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                    agent.role === 'super_admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {agent.role.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                    agent.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {agent.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {new Date(agent.created_at).toLocaleDateString('en-IN')}
                </td>
                <td className="px-4 py-3">
                  {agent.role !== 'super_admin' && (
                    <form action={toggleAgentActiveAction.bind(null, agent.id, !agent.is_active)}>
                      <button className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                        agent.is_active
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}>
                        {agent.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {agents.length === 0 && (
          <div className="p-12 text-center text-gray-400">No agents yet.</div>
        )}
      </div>

      {/* Invite new agent */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-md">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Invite New Agent</h2>
        <form action={inviteAgentAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input name="full_name" required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input name="email" type="email" required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <p className="text-xs text-gray-500">
            A new agent account will be created. Share their credentials separately — they can reset their password via Supabase.
          </p>
          <button type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            Create Agent Account
          </button>
        </form>
      </div>
    </div>
  )
}
