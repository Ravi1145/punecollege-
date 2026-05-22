import { createAdminClient } from '@/lib/supabase/admin'
import { upsertHeroAction, deleteHeroAction, toggleHeroBannerActive } from './actions'
import type { HeroBanner } from '@/lib/supabase/types'

export const revalidate = 0

export default async function AdminHeroPage() {
  const admin = createAdminClient()
  const { data: banners } = await admin
    .from('hero_banners')
    .select('*')
    .order('sort_order')

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Hero & Banners</h1>

      {/* Existing banners */}
      {(banners ?? []).length > 0 && (
        <div className="space-y-3 mb-8">
          {(banners ?? []).map((banner: HeroBanner) => (
            <div key={banner.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      banner.type === 'hero' ? 'bg-blue-100 text-blue-700' :
                      banner.type === 'poster' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>{banner.type}</span>
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      banner.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>{banner.is_active ? 'Active' : 'Inactive'}</span>
                    <span className="text-xs text-gray-400">order: {banner.sort_order}</span>
                  </div>
                  <div className="font-semibold text-gray-900">{banner.title}</div>
                  {banner.subtitle && <div className="text-sm text-gray-500">{banner.subtitle}</div>}
                  {banner.cta_link && <div className="text-xs text-blue-500 font-mono mt-1">{banner.cta_link}</div>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <form action={toggleHeroBannerActive.bind(null, banner.id, !banner.is_active)}>
                    <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      {banner.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </form>
                  <form action={deleteHeroAction.bind(null, banner.id)}>
                    <button className="px-3 py-1.5 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add new banner */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Banner</h2>
        <form action={upsertHeroAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select name="type" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="hero">Hero (Main homepage banner)</option>
                <option value="poster">Poster (Mid-page)</option>
                <option value="banner">Banner (Sidebar)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <input name="sort_order" type="number" defaultValue="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input name="title" required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input name="subtitle"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
              <input name="cta_text" placeholder="Explore Colleges"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
              <input name="cta_link" placeholder="/colleges"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input name="image_url" placeholder="https://..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center gap-2">
            <input name="is_active" type="checkbox" defaultChecked id="is_active_new"
              className="rounded border-gray-300" />
            <label htmlFor="is_active_new" className="text-sm text-gray-700">Active (visible on site immediately)</label>
          </div>
          <button type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            Add Banner
          </button>
        </form>
      </div>
    </div>
  )
}
