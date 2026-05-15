/**
 * lib/indexnow.ts
 *
 * Helper to ping IndexNow (Bing → Google, Yandex, etc.) when new content is
 * published. Call pingIndexNow() from admin API routes after creating or
 * publishing a blog post, college page, or cutoff entry.
 *
 * IndexNow key file must exist at: /public/<INDEXNOW_KEY>.txt
 * The existing file at /public/collegepune2026indexnow.txt already satisfies this.
 */

const BASE_URL     = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "collegepune2026indexnow"

const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
]

/**
 * Notify IndexNow of one or more URLs.
 * Silently swallows errors — crawl pings are best-effort and must never break
 * the primary API response.
 *
 * @param urls  Absolute URLs to submit. Falls back to sitemap if empty.
 */
export async function pingIndexNow(urls: string[] = []): Promise<void> {
  try {
    const urlList = urls.length > 0 ? urls : [`${BASE_URL}/sitemap.xml`]

    const payload = {
      host:        BASE_URL.replace(/^https?:\/\//, ""),
      key:         INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }

    await Promise.allSettled(
      ENDPOINTS.map((ep) =>
        fetch(ep, {
          method:  "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body:    JSON.stringify(payload),
        })
      )
    )
  } catch {
    // intentionally silent — never break primary flow
  }
}

/**
 * Build a canonical college URL from slug.
 */
export function collegeUrl(slug: string) {
  return `${BASE_URL}/colleges/${slug}`
}

/**
 * Build a canonical blog URL from slug.
 */
export function blogUrl(slug: string) {
  return `${BASE_URL}/blog/${slug}`
}
