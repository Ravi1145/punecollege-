import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Supabase env vars missing. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local\n' +
    '   Get them from: https://supabase.com → Your project → Settings → API'
  )
}

/**
 * Public client (anon key) — safe to use in browser / client components.
 * Respects Row Level Security policies.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Admin client (service role key) — server-side ONLY (API routes, server actions).
 * Bypasses RLS — never expose to the browser.
 */
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey ?? supabaseAnonKey, // fallback to anon if service key missing
  { auth: { autoRefreshToken: false, persistSession: false } }
)
