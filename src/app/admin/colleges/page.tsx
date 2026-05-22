import Link from 'next/link'
import { getAllCollegesAdmin } from '@/lib/supabase/queries-admin'
import { deleteCollegeAction, syncStaticCollegesToDBAction } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'
import SyncButton from '@/components/admin/SyncButton'
import QuickLogoUpload from '@/components/admin/QuickLogoUpload'
import FeatureToggle from '@/components/admin/FeatureToggle'
import type { College } from '@/lib/supabase/types'

export const revalidate = 0

const STATUS_TABS = ['all', 'featured', 'published', 'draft', 'pending', 'rejected'] as const

const statusColor: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  draft:     'bg-gray-100 text-gray-600',
  pending:   'bg-yellow-100 text-yellow-700',
  rejected:  'bg-red-100 text-red-700',
  featured:  'bg-amber-100 text-amber-700',
}

export default async function AdminCollegesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const filter = status && status !== 'all' ? status : undefined
  const allColleges = await getAllCollegesAdmin()
  const colleges = filter === 'featured'
    ? allColleges.filter((c) => c.featured)
    : filter
      ? allColleges.filter((c) => c.status === filter)
      : allColleges

  // Detect static-only colleges (id is a small integer string, not a UUID)
  const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  const staticSlugs = new Set(
    allColleges.filter((c) => !uuidRe.test(String(c.id))).map((c) => c.slug)
  )
  const staticCount = staticSlugs.size

  const counts = {
    all:       allColleges.length,
    featured:  allColleges.filter((c) => c.featured).length,
    published: allColleges.filter((c) => c.status === 'published').length,
    draft:     allColleges.filter((c) => c.status === 'draft').length,
    pending:   allColleges.filter((c) => c.status === 'pending').length,
    rejected:  allColleges.filter((c) => c.status === 'rejected').length,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Colleges</h1>
          <p className="text-gray-500 text-sm mt-1">
            {allColleges.length} total
            {staticCount > 0 && (
              <span className="ml-2 text-orange-600 font-medium">
                · {staticCount} static (not yet in DB)
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {staticCount > 0 && (
            <SyncButton
              action={syncStaticCollegesToDBAction}
              label={`⬆ Sync ${staticCount} to DB`}
              confirmMsg={`This will import all ${staticCount} static colleges into Supabase so you can edit them. Safe to run multiple times. Continue?`}
            />
          )}
          <Link href="/admin/colleges/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            + Add College
          </Link>
        </div>
      </div>

      {/* Featured info banner */}
      {counts.featured > 0 && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
          <span className="text-lg">⭐</span>
          <p className="text-sm text-amber-800">
            <strong>{counts.featured} college{counts.featured > 1 ? 's' : ''}</strong> currently featured on the homepage.
            Click the <span className="font-semibold">Featured</span> button on any college to add or remove it.
          </p>
        </div>
      )}

      {/* Sync banner */}
      {staticCount > 0 && (
        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-orange-800">
            <span className="text-lg">⚠️</span>
            <span>
              <strong>{staticCount} colleges</strong> are from static data and not yet saved in the database.
              Click <strong>&quot;Sync to DB&quot;</strong> above to make them fully editable.
            </span>
          </div>
        </div>
      )}

      {/* Status Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
        {STATUS_TABS.map((tab) => {
          const active = (status ?? 'all') === tab
          return (
            <Link key={tab} href={tab === 'all' ? '/admin/colleges' : `/admin/colleges?status=${tab}`}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}>
              {tab} <span className="ml-1 text-gray-400">({counts[tab]})</span>
            </Link>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {colleges.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            No colleges found.{' '}
            <Link href="/admin/colleges/new" className="text-blue-600 underline">Add one →</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['Logo', 'Name', 'Stream', 'City', 'NAAC', 'Featured', 'Status', 'Source', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {colleges.map((college: College) => {
                  const isStatic = staticSlugs.has(college.slug)
                  return (
                    <tr key={college.id} className={`hover:bg-gray-50 transition-colors ${isStatic ? 'bg-orange-50/40' : ''}`}>
                      {/* Logo column */}
                      <td className="px-4 py-3">
                        {isStatic ? (
                          <div className="w-8 h-8 rounded-lg border border-dashed border-gray-200 flex items-center justify-center">
                            <span className="text-[9px] font-bold text-gray-300">
                              {(college.short_name ?? college.name).slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                        ) : (
                          <QuickLogoUpload
                            collegeId={college.id}
                            collegeName={college.short_name ?? college.name}
                            currentLogo={college.logo_url}
                          />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{college.name}</div>
                        <div className="text-xs text-gray-400 font-mono">{college.slug}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{college.stream ?? college.type ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs">{college.city ?? college.location ?? '—'}</td>
                      <td className="px-4 py-3 text-gray-600 text-xs font-semibold">{college.naac_grade ?? '—'}</td>
                      <td className="px-4 py-3">
                        {isStatic ? (
                          <span className="text-xs text-gray-300">—</span>
                        ) : (
                          <FeatureToggle
                            collegeId={college.id}
                            collegeName={college.short_name ?? college.name}
                            featured={college.featured ?? false}
                          />
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[college.status] ?? 'bg-gray-100 text-gray-600'}`}>
                          {college.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {isStatic ? (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                            Static
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            DB
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {isStatic ? (
                            <span className="px-2.5 py-1 text-xs bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed"
                              title="Sync to DB first to enable editing">
                              Edit
                            </span>
                          ) : (
                            <Link href={`/admin/colleges/${college.id}`}
                              className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                              Edit
                            </Link>
                          )}
                          <Link href={`/colleges/${college.slug}`} target="_blank"
                            className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                            View
                          </Link>
                          {!isStatic && (
                            <DeleteButton action={deleteCollegeAction.bind(null, college.id)} />
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
