import { Building2 } from "lucide-react"
import { colleges as staticColleges } from "@/data/colleges"
import CollegeMarqueeCard from "./CollegeMarqueeCard"

interface MarqueeCollege { slug: string; name: string; shortName: string; logo?: string }

async function getMarqueeColleges(): Promise<MarqueeCollege[]> {
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data } = await admin
      .from('colleges')
      .select('slug, name, short_name, logo_url, cover_url')
      .eq('status', 'published')
      .order('featured_order', { ascending: true })
      .limit(20)
    if (data && data.length > 0) {
      return (data as { slug: string; name: string; short_name: string | null; logo_url: string | null; cover_url: string | null }[]).map(c => ({
        slug:      c.slug,
        name:      c.name,
        shortName: c.short_name ?? c.name,
        // Only use logo_url — never fall back to cover_url (banner photos break in 44×44px)
        logo:      c.logo_url ?? undefined,
      }))
    }
  } catch { /* fall through to static */ }

  // Static fallback — only use actual logos, never cover/banner images
  return staticColleges.slice(0, 20).map((c) => ({
    slug:      c.slug,
    name:      c.name,
    shortName: c.shortName,
    logo:      c.logo ?? undefined,  // c.image is a cover photo, not a logo
  }))
}

export default async function CollegeMarquee() {
  const COLLEGES = await getMarqueeColleges()
  // Triple for seamless infinite loop
  const ITEMS = [...COLLEGES, ...COLLEGES, ...COLLEGES]

  return (
    <section className="bg-white py-8 border-b border-gray-100">
      {/* Section title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center gap-3 justify-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200 max-w-[80px]" />
          <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" />
            Top Colleges in Pune
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200 max-w-[80px]" />
        </div>
      </div>

      {/* Marquee wrapper */}
      <div className="relative overflow-hidden">
        {/* Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="group flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {ITEMS.map((c, i) => (
            <CollegeMarqueeCard key={`${c.slug}-${i}`} college={c} />
          ))}
        </div>
      </div>
    </section>
  )
}

