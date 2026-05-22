import { createAdminClient } from '@/lib/supabase/admin'
import { upsertHeroAction, deleteHeroAction, toggleHeroBannerActive } from './actions'
import DeleteButton from '@/components/admin/DeleteButton'
import type { HeroBanner } from '@/lib/supabase/types'

export const revalidate = 0

const cls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

const typeColor: Record<string, string> = {
  hero:   'bg-blue-100 text-blue-700',
  poster: 'bg-purple-100 text-purple-700',
  banner: 'bg-orange-100 text-orange-700',
}

export default async function AdminHeroPage() {
  const admin = createAdminClient()
  const { data: banners } = await admin
    .from('hero_banners')
    .select('*')
    .order('sort_order')

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">Hero & Banners</h1>
        <p className="text-gray-500 text-sm mt-1">{(banners ?? []).length} banner{(banners?.length ?? 0) !== 1 ? 's' : ''} configured</p>
      </div>

      {/* Existing banners */}
      {(banners ?? []).length > 0 && (
        <div className="space-y-3 mb-8">
          {(banners ?? []).map((banner: HeroBanner) => (
            <details key={banner.id} className="bg-white border border-gray-200 rounded-xl group">
              <summary className="px-5 py-4 cursor-pointer list-none flex items-center justify-between gap-4 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${typeColor[banner.type] ?? 'bg-gray-100 text-gray-600'}`}>
                    {banner.type}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${banner.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {banner.is_active ? '● Active' : '○ Inactive'}
                  </span>
                  <span className="font-semibold text-gray-900 truncate">{banner.title}</span>
                  {banner.subtitle && <span className="text-sm text-gray-400 truncate hidden md:block">{banner.subtitle}</span>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <form action={toggleHeroBannerActive.bind(null, banner.id, !banner.is_active)}>
                    <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      {banner.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                  </form>
                  <DeleteButton action={deleteHeroAction.bind(null, banner.id)} label="Delete" />
                  <span className="text-gray-400 text-xs group-open:rotate-180 transition-transform">▼</span>
                </div>
              </summary>

              {/* Inline edit form */}
              <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Edit Banner</h3>
                <form action={upsertHeroAction} className="space-y-3">
                  <input type="hidden" name="id" value={banner.id} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                      <select name="type" defaultValue={banner.type} className={cls}>
                        <option value="hero">Hero</option>
                        <option value="poster">Poster</option>
                        <option value="banner">Banner</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Sort Order</label>
                      <input name="sort_order" type="number" defaultValue={banner.sort_order} className={cls} />
                    </div>
                    <div className="flex items-end pb-1">
                      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                        <input name="is_active" type="checkbox" defaultChecked={banner.is_active}
                          className="rounded border-gray-300" />
                        Active
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                    <input name="title" required defaultValue={banner.title} className={cls} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
                    <input name="subtitle" defaultValue={banner.subtitle ?? ''} className={cls} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">CTA Text</label>
                      <input name="cta_text" defaultValue={banner.cta_text ?? ''} placeholder="Explore Colleges" className={cls} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">CTA Link</label>
                      <input name="cta_link" defaultValue={banner.cta_link ?? ''} placeholder="/colleges" className={cls} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                    <input name="image_url" type="url" defaultValue={banner.image_url ?? ''} placeholder="https://..." className={cls} />
                  </div>
                  <button type="submit"
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
                    Save Changes
                  </button>
                </form>
              </div>
            </details>
          ))}
        </div>
      )}

      {/* Add new banner */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">+ Add New Banner</h2>
        <form action={upsertHeroAction} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select name="type" className={cls}>
                <option value="hero">Hero (Main homepage)</option>
                <option value="poster">Poster (Mid-page)</option>
                <option value="banner">Banner (Sidebar)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <input name="sort_order" type="number" defaultValue="0" className={cls} />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input name="is_active" type="checkbox" defaultChecked id="new_is_active" className="rounded border-gray-300" />
                Active immediately
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input name="title" required placeholder="Discover Top Colleges in Pune" className={cls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input name="subtitle" placeholder="AI-powered college discovery..." className={cls} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
              <input name="cta_text" placeholder="Explore Colleges" className={cls} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
              <input name="cta_link" placeholder="/colleges" className={cls} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input name="image_url" type="url" placeholder="https://..." className={cls} />
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
