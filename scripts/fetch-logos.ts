/**
 * scripts/fetch-logos.ts
 *
 * Batch-fetches college favicons via Google's favicon service and uploads each
 * one to Supabase Storage under the `college-assets` bucket at `logos/<slug>.png`.
 *
 * Usage:
 *   npx tsx scripts/fetch-logos.ts
 *
 * Prerequisites:
 *   SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY
 *   must be set in .env.local (or the environment).
 *
 * No sharp or native image dependency required.
 */

// Load .env.local if dotenv is available — optional, fail silently otherwise
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("dotenv/config")
} catch {
  // dotenv not installed — env vars must be set externally
}

import { createClient } from "@supabase/supabase-js"
import { colleges } from "../src/data/colleges"

// ─── Config ────────────────────────────────────────────────────────────────

const BUCKET  = "college-assets"
const PREFIX  = "logos"
const DELAY   = 200 // ms between requests

// ─── Supabase ──────────────────────────────────────────────────────────────

const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "✗ Missing env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
  )
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// ─── Helpers ───────────────────────────────────────────────────────────────

function faviconUrl(website: string): string {
  try {
    const { hostname } = new URL(website)
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
  } catch {
    return ""
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const withWebsite = colleges.filter((c) => Boolean(c.website))

  console.log(`fetch-logos — ${withWebsite.length} colleges with a website\n`)

  for (const college of withWebsite) {
    const { slug, website } = college
    const url = faviconUrl(website)

    if (!url) {
      console.log(`✗ ${slug}: could not build favicon URL`)
      await sleep(DELAY)
      continue
    }

    try {
      const res = await fetch(url)
      if (!res.ok) {
        console.log(`✗ ${slug}: HTTP ${res.status}`)
        await sleep(DELAY)
        continue
      }

      const buffer = Buffer.from(await res.arrayBuffer())

      // Skip empty / placeholder images (Google returns a 1×1 PNG for unknown domains)
      if (buffer.length < 200) {
        console.log(`✗ ${slug}: image too small (${buffer.length}B), skipped`)
        await sleep(DELAY)
        continue
      }

      const storagePath = `${PREFIX}/${slug}.png`
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, buffer, {
          contentType: "image/png",
          upsert: true,
        })

      if (error) {
        console.log(`✗ ${slug}: ${error.message}`)
      } else {
        console.log(`✓ ${slug}`)
      }
    } catch (err) {
      console.log(`✗ ${slug}: ${(err as Error).message}`)
    }

    await sleep(DELAY)
  }

  console.log("\nDone.")
}

main().catch((err) => {
  console.error("Fatal:", err)
  process.exit(1)
})
