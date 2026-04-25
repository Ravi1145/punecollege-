const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "collegepune2026indexnow"
const HOST = BASE_URL.replace(/^https?:\/\//, "")

const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
]

/**
 * Fire-and-forget ping to IndexNow (Bing → Google → Yandex).
 * Pass one or more full URLs to notify search engines immediately.
 */
export async function pingIndexNow(urls: string[]): Promise<void> {
  if (!urls.length) return
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }
  await Promise.allSettled(
    ENDPOINTS.map((endpoint) =>
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      }).catch(() => {/* ignore network errors */})
    )
  )
}
