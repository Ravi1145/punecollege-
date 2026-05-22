# Supabase Phase 3 — Admin Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full premium admin panel at `/admin` with Super Admin and Agent roles — covering Colleges CRUD, Blogs CRUD, Leads table, Approval Queue, Reviews/Q&A moderation, JSON import, Hero/Banner management, and Agent management.

**Architecture:** Next.js App Router server components for admin pages with server actions for mutations. Each admin module is a dedicated page under `/admin/<module>`. Shared layout wraps all pages with sidebar nav, role-based menu items, and session guard. Data flows through admin Supabase client (service role, bypasses RLS).

**Tech Stack:** Next.js 16 App Router, `@supabase/ssr` (server client + admin client), TypeScript strict, Tailwind CSS v4, `@supabase/supabase-js` service role client for all mutations.

**Prerequisites:** Phase 1 (foundation) and Phase 2 (data layer) must be complete. `.env.local` must have all Supabase keys. `src/lib/supabase/` clients must exist.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/app/admin/layout.tsx` | Create | Sidebar layout, session guard, role-based nav |
| `src/app/admin/page.tsx` | Create | Dashboard — stats cards (colleges, blogs, leads, pending approvals) |
| `src/app/admin/colleges/page.tsx` | Create | Colleges list with search/filter |
| `src/app/admin/colleges/new/page.tsx` | Create | New college form |
| `src/app/admin/colleges/[id]/page.tsx` | Create | Edit college form |
| `src/app/admin/colleges/actions.ts` | Create | Server actions: createCollege, updateCollege, deleteCollege |
| `src/app/admin/blogs/page.tsx` | Create | Blog list with status filter (draft/pending/published/rejected) |
| `src/app/admin/blogs/new/page.tsx` | Create | New blog form (rich textarea) |
| `src/app/admin/blogs/[id]/page.tsx` | Create | Edit blog form |
| `src/app/admin/blogs/actions.ts` | Create | Server actions: createBlog, updateBlog, deleteBlog, approveBlog, rejectBlog |
| `src/app/admin/leads/page.tsx` | Create | Leads table with search, status filter, CSV export |
| `src/app/admin/leads/actions.ts` | Create | Server actions: updateLeadStatus, exportLeads |
| `src/app/admin/approvals/page.tsx` | Create | Pending queue (blogs + reviews + Q&A) |
| `src/app/admin/approvals/actions.ts` | Create | Server actions: approve, reject with optional note |
| `src/app/admin/reviews/page.tsx` | Create | All reviews list with approve/reject |
| `src/app/admin/qa/page.tsx` | Create | All Q&A list with approve/reject |
| `src/app/admin/hero/page.tsx` | Create | Hero/poster/banner management |
| `src/app/admin/hero/actions.ts` | Create | Server actions: upsertHero, uploadImage |
| `src/app/admin/import/page.tsx` | Create | JSON import tool (colleges/blogs paste/upload) |
| `src/app/admin/import/actions.ts` | Create | Server action: importJSON |
| `src/app/admin/agents/page.tsx` | Create | Agent accounts list (Super Admin only) |
| `src/app/admin/agents/actions.ts` | Create | Server actions: inviteAgent, toggleAgentActive |
| `src/components/admin/Sidebar.tsx` | Create | Navigation sidebar with role-aware links |
| `src/components/admin/StatsCard.tsx` | Create | Dashboard stat card component |
| `src/components/admin/DataTable.tsx` | Create | Generic sortable/paginated table |
| `src/components/admin/StatusBadge.tsx` | Create | Badge for content_status enum |
| `src/components/admin/ApprovalButtons.tsx` | Create | Approve/Reject button pair with confirmation |
| `src/components/admin/ImageUpload.tsx` | Create | File input with Supabase Storage upload |
| `src/lib/supabase/queries-admin.ts` | Create | Admin-specific queries (all statuses, agent-scoped) |

---

## Task 1: Admin Layout + Sidebar + Dashboard Scaffold

**Files:**
- Create: `src/components/admin/Sidebar.tsx`
- Create: `src/components/admin/StatsCard.tsx`
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`

- [ ] **Step 1: Create Sidebar component**

```tsx
// src/components/admin/Sidebar.tsx
import Link from "next/link"
import { usePathname } from "next/navigation"

const superAdminLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/colleges", label: "Colleges", icon: "🏫" },
  { href: "/admin/blogs", label: "Blogs", icon: "📝" },
  { href: "/admin/leads", label: "Leads", icon: "👥" },
  { href: "/admin/approvals", label: "Approvals", icon: "✅" },
  { href: "/admin/reviews", label: "Reviews", icon: "⭐" },
  { href: "/admin/qa", label: "Q&A", icon: "❓" },
  { href: "/admin/hero", label: "Hero & Banners", icon: "🖼️" },
  { href: "/admin/import", label: "JSON Import", icon: "📥" },
  { href: "/admin/agents", label: "Agents", icon: "👤" },
]

const agentLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/colleges", label: "Colleges", icon: "🏫" },
  { href: "/admin/blogs", label: "Blogs", icon: "📝" },
  { href: "/admin/approvals", label: "My Submissions", icon: "✅" },
]

interface SidebarProps {
  role: "super_admin" | "agent"
  userEmail: string
}

export default function Sidebar({ role, userEmail }: SidebarProps) {
  const links = role === "super_admin" ? superAdminLinks : agentLinks

  return (
    <aside className="w-64 min-h-screen bg-[#0A1628] flex flex-col">
      <div className="px-6 py-5 border-b border-white/10">
        <div className="text-white font-extrabold text-lg">CollegePune</div>
        <div className="text-blue-300 text-xs mt-0.5">Admin Panel</div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors text-sm"
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="px-6 py-4 border-t border-white/10">
        <div className="text-gray-400 text-xs truncate">{userEmail}</div>
        <div className="text-blue-400 text-xs capitalize mt-0.5">{role.replace("_", " ")}</div>
        <form action="/api/admin/logout" method="POST">
          <button className="mt-2 text-xs text-red-400 hover:text-red-300">Sign out</button>
        </form>
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Create StatsCard component**

```tsx
// src/components/admin/StatsCard.tsx
interface StatsCardProps {
  label: string
  value: number | string
  icon: string
  trend?: string
  color?: string
}

export default function StatsCard({ label, value, icon, trend, color = "blue" }: StatsCardProps) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    red: "bg-red-50 text-red-600 border-red-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  }

  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
        {trend && <span className="text-xs font-medium opacity-70">{trend}</span>}
      </div>
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-sm font-medium mt-1 opacity-80">{label}</div>
    </div>
  )
}
```

- [ ] **Step 3: Create admin layout**

```tsx
// src/app/admin/layout.tsx
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import Sidebar from "@/components/admin/Sidebar"
import { createClient } from "@/lib/supabase/server"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/admin/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, is_active, full_name")
    .eq("id", user.id)
    .single()

  if (!profile || !profile.is_active) redirect("/admin/login")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={profile.role as "super_admin" | "agent"} userEmail={user.email ?? ""} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
```

- [ ] **Step 4: Create dashboard page**

```tsx
// src/app/admin/page.tsx
import { createAdminClient } from "@/lib/supabase/admin"
import { createClient } from "@/lib/supabase/server"
import StatsCard from "@/components/admin/StatsCard"
import Link from "next/link"

export const revalidate = 60

export default async function AdminDashboard() {
  const admin = createAdminClient()
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user!.id).single()

  const [
    { count: collegesCount },
    { count: blogsCount },
    { count: leadsCount },
    { count: pendingCount },
    { count: reviewsCount },
  ] = await Promise.all([
    admin.from("colleges").select("*", { count: "exact", head: true }),
    admin.from("blogs").select("*", { count: "exact", head: true }).eq("status", "published"),
    admin.from("leads").select("*", { count: "exact", head: true }),
    admin.from("blogs").select("*", { count: "exact", head: true }).eq("status", "pending"),
    admin.from("reviews").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ])

  const isSuperAdmin = profile?.role === "super_admin"

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Published Colleges" value={collegesCount ?? 0} icon="🏫" color="blue" />
        <StatsCard label="Published Blogs" value={blogsCount ?? 0} icon="📝" color="green" />
        {isSuperAdmin && <StatsCard label="Total Leads" value={leadsCount ?? 0} icon="👥" color="purple" />}
        <StatsCard label="Pending Approvals" value={(pendingCount ?? 0) + (reviewsCount ?? 0)} icon="⏳" color="orange" />
      </div>

      {((pendingCount ?? 0) + (reviewsCount ?? 0)) > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
          <div className="font-semibold text-orange-800 mb-1">
            ⚠️ {(pendingCount ?? 0) + (reviewsCount ?? 0)} items awaiting approval
          </div>
          <Link href="/admin/approvals" className="text-orange-700 text-sm underline">
            Go to Approvals Queue →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: "/admin/colleges", label: "Manage Colleges", icon: "🏫", desc: "Add, edit, or remove college listings" },
          { href: "/admin/blogs", label: "Manage Blogs", icon: "📝", desc: "Write and publish blog articles" },
          { href: "/admin/approvals", label: "Approvals Queue", icon: "✅", desc: "Review pending submissions" },
          ...(isSuperAdmin ? [
            { href: "/admin/leads", label: "View Leads", icon: "👥", desc: "Student enquiries and contact forms" },
            { href: "/admin/import", label: "JSON Import", icon: "📥", desc: "Bulk import colleges or blogs" },
            { href: "/admin/agents", label: "Manage Agents", icon: "👤", desc: "Add or deactivate agent accounts" },
          ] : []),
        ].map((item) => (
          <Link key={item.href} href={item.href}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-semibold text-gray-900 text-sm">{item.label}</div>
            <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: TypeScript check**

```bash
cd D:\collegepune\college-pune && npx tsc --noEmit
```

Expected: No errors related to admin layout/dashboard files.

- [ ] **Step 6: Commit**

```bash
git add src/app/admin/layout.tsx src/app/admin/page.tsx src/components/admin/Sidebar.tsx src/components/admin/StatsCard.tsx
git commit -m "feat: admin layout, sidebar, and dashboard scaffold"
```

---

## Task 2: Shared Admin Components

**Files:**
- Create: `src/components/admin/DataTable.tsx`
- Create: `src/components/admin/StatusBadge.tsx`
- Create: `src/components/admin/ApprovalButtons.tsx`

- [ ] **Step 1: Create StatusBadge**

```tsx
// src/components/admin/StatusBadge.tsx
type Status = "draft" | "pending" | "published" | "rejected"

const styles: Record<Status, string> = {
  draft: "bg-gray-100 text-gray-600",
  pending: "bg-yellow-100 text-yellow-700",
  published: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
}

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status]}`}>
      {status}
    </span>
  )
}
```

- [ ] **Step 2: Create DataTable**

```tsx
// src/components/admin/DataTable.tsx
interface Column<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  emptyMessage?: string
}

export default function DataTable<T extends { id: string | number }>({
  columns, rows, emptyMessage = "No records found.",
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-400">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="px-4 py-3 text-left font-semibold text-gray-600 text-xs uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-gray-700">
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[String(col.key)] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create ApprovalButtons**

```tsx
// src/components/admin/ApprovalButtons.tsx
"use client"

interface ApprovalButtonsProps {
  id: string
  type: "blog" | "review" | "qa_question"
  approveAction: (id: string) => Promise<void>
  rejectAction: (id: string) => Promise<void>
}

export default function ApprovalButtons({ id, type, approveAction, rejectAction }: ApprovalButtonsProps) {
  return (
    <div className="flex gap-2">
      <form action={async () => { "use server"; await approveAction(id) }}>
        <button
          type="submit"
          className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
        >
          ✓ Approve
        </button>
      </form>
      <form action={async () => { "use server"; await rejectAction(id) }}>
        <button
          type="submit"
          className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200 transition-colors"
        >
          ✗ Reject
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 4: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No new errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/admin/DataTable.tsx src/components/admin/StatusBadge.tsx src/components/admin/ApprovalButtons.tsx
git commit -m "feat: shared admin components — DataTable, StatusBadge, ApprovalButtons"
```

---

## Task 3: Colleges CRUD

**Files:**
- Create: `src/lib/supabase/queries-admin.ts`
- Create: `src/app/admin/colleges/actions.ts`
- Create: `src/app/admin/colleges/page.tsx`
- Create: `src/app/admin/colleges/new/page.tsx`
- Create: `src/app/admin/colleges/[id]/page.tsx`

- [ ] **Step 1: Create admin queries helper**

```typescript
// src/lib/supabase/queries-admin.ts
import { createAdminClient } from "./admin"
import type { College, Blog, Lead, Review, QaQuestion, Profile } from "./types"

const admin = createAdminClient()

// --- COLLEGES ---
export async function getAllCollegesAdmin(): Promise<College[]> {
  const { data, error } = await admin.from("colleges").select("*").order("name")
  if (error) throw error
  return data ?? []
}

export async function getCollegeByIdAdmin(id: string): Promise<College | null> {
  const { data } = await admin.from("colleges").select("*").eq("id", id).single()
  return data
}

export async function upsertCollege(college: Partial<College> & { id?: string }) {
  const { data, error } = await admin.from("colleges").upsert(college).select().single()
  if (error) throw error
  return data
}

export async function deleteCollege(id: string) {
  const { error } = await admin.from("colleges").delete().eq("id", id)
  if (error) throw error
}

// --- BLOGS ---
export async function getAllBlogsAdmin(status?: string): Promise<Blog[]> {
  let query = admin.from("blogs").select("id, title, slug, status, created_at, author_id").order("created_at", { ascending: false })
  if (status) query = query.eq("status", status)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getBlogByIdAdmin(id: string): Promise<Blog | null> {
  const { data } = await admin.from("blogs").select("*").eq("id", id).single()
  return data
}

export async function upsertBlog(blog: Partial<Blog> & { id?: string }) {
  const { data, error } = await admin.from("blogs").upsert(blog).select().single()
  if (error) throw error
  return data
}

export async function deleteBlog(id: string) {
  const { error } = await admin.from("blogs").delete().eq("id", id)
  if (error) throw error
}

// --- LEADS ---
export async function getAllLeadsAdmin(status?: string): Promise<Lead[]> {
  let query = admin.from("leads").select("*").order("created_at", { ascending: false })
  if (status) query = query.eq("status", status)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

// --- REVIEWS + Q&A ---
export async function getPendingApprovals() {
  const [blogs, reviews, qa] = await Promise.all([
    admin.from("blogs").select("id, title, slug, created_at, author_id").eq("status", "pending"),
    admin.from("reviews").select("*").eq("status", "pending"),
    admin.from("qa_questions").select("*").eq("status", "pending"),
  ])
  return {
    blogs: blogs.data ?? [],
    reviews: reviews.data ?? [],
    qa: qa.data ?? [],
  }
}

export async function approveContent(table: "blogs" | "reviews" | "qa_questions", id: string) {
  const { error } = await admin.from(table).update({ status: "published" }).eq("id", id)
  if (error) throw error
}

export async function rejectContent(table: "blogs" | "reviews" | "qa_questions", id: string) {
  const { error } = await admin.from(table).update({ status: "rejected" }).eq("id", id)
  if (error) throw error
}

// --- PROFILES (agents) ---
export async function getAgentProfiles(): Promise<Profile[]> {
  const { data, error } = await admin.from("profiles").select("*").order("created_at")
  if (error) throw error
  return data ?? []
}

export async function toggleAgentActive(id: string, is_active: boolean) {
  const { error } = await admin.from("profiles").update({ is_active }).eq("id", id)
  if (error) throw error
}
```

- [ ] **Step 2: Create college server actions**

```typescript
// src/app/admin/colleges/actions.ts
"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { upsertCollege, deleteCollege } from "@/lib/supabase/queries-admin"

export async function createCollegeAction(formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const location = formData.get("location") as string
  const type = formData.get("type") as string
  const established = parseInt(formData.get("established") as string) || null

  if (!name || !slug) throw new Error("Name and slug are required")

  await upsertCollege({ name, slug, location, type, established, status: "published" })
  revalidatePath("/admin/colleges")
  redirect("/admin/colleges")
}

export async function updateCollegeAction(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const location = formData.get("location") as string
  const type = formData.get("type") as string
  const established = parseInt(formData.get("established") as string) || null

  await upsertCollege({ id, name, slug, location, type, established })
  revalidatePath("/admin/colleges")
  revalidatePath(`/colleges/${slug}`)
  redirect("/admin/colleges")
}

export async function deleteCollegeAction(id: string) {
  await deleteCollege(id)
  revalidatePath("/admin/colleges")
}
```

- [ ] **Step 3: Create colleges list page**

```tsx
// src/app/admin/colleges/page.tsx
import Link from "next/link"
import { getAllCollegesAdmin } from "@/lib/supabase/queries-admin"
import DataTable from "@/components/admin/DataTable"
import { deleteCollegeAction } from "./actions"

export const revalidate = 0

export default async function AdminCollegesPage() {
  const colleges = await getAllCollegesAdmin()

  const columns = [
    { key: "name", label: "Name" },
    { key: "slug", label: "Slug" },
    { key: "location", label: "Location" },
    { key: "type", label: "Type" },
    {
      key: "actions",
      label: "Actions",
      render: (row: (typeof colleges)[0]) => (
        <div className="flex gap-2">
          <Link href={`/admin/colleges/${row.id}`}
            className="px-3 py-1.5 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
            Edit
          </Link>
          <Link href={`/colleges/${row.slug}`} target="_blank"
            className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
            View
          </Link>
          <form action={deleteCollegeAction.bind(null, row.id)}>
            <button className="px-3 py-1.5 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
              Delete
            </button>
          </form>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Colleges</h1>
          <p className="text-gray-500 text-sm mt-1">{colleges.length} total colleges</p>
        </div>
        <Link href="/admin/colleges/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
          + Add College
        </Link>
      </div>
      <DataTable columns={columns} rows={colleges} emptyMessage="No colleges yet. Add the first one." />
    </div>
  )
}
```

- [ ] **Step 4: Create new college form page**

```tsx
// src/app/admin/colleges/new/page.tsx
import { createCollegeAction } from "../actions"

export default function NewCollegePage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Add New College</h1>
      <form action={createCollegeAction} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">College Name *</label>
          <input name="name" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug * (e.g. coep-pune)</label>
          <input name="slug" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input name="location" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select name="type" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select type</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Deemed">Deemed</option>
            <option value="Autonomous">Autonomous</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
          <input name="established" type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            Create College
          </button>
          <a href="/admin/colleges" className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
```

- [ ] **Step 5: Create edit college form page**

```tsx
// src/app/admin/colleges/[id]/page.tsx
import { notFound } from "next/navigation"
import { getCollegeByIdAdmin } from "@/lib/supabase/queries-admin"
import { updateCollegeAction } from "../actions"

export default async function EditCollegePage({ params }: { params: { id: string } }) {
  const college = await getCollegeByIdAdmin(params.id)
  if (!college) notFound()

  const updateAction = updateCollegeAction.bind(null, params.id)

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Edit College</h1>
      <form action={updateAction} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">College Name *</label>
          <input name="name" required defaultValue={college.name}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input name="slug" required defaultValue={college.slug}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input name="location" defaultValue={college.location ?? ""}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select name="type" defaultValue={college.type ?? ""}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select type</option>
            <option value="Government">Government</option>
            <option value="Private">Private</option>
            <option value="Deemed">Deemed</option>
            <option value="Autonomous">Autonomous</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
          <input name="established" type="number" defaultValue={college.established ?? ""}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            Save Changes
          </button>
          <a href="/admin/colleges" className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
```

- [ ] **Step 6: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No new errors.

- [ ] **Step 7: Commit**

```bash
git add src/lib/supabase/queries-admin.ts src/app/admin/colleges/
git commit -m "feat: admin colleges CRUD pages and server actions"
```

---

## Task 4: Blogs CRUD + Approval Actions

**Files:**
- Create: `src/app/admin/blogs/actions.ts`
- Create: `src/app/admin/blogs/page.tsx`
- Create: `src/app/admin/blogs/new/page.tsx`
- Create: `src/app/admin/blogs/[id]/page.tsx`

- [ ] **Step 1: Create blog server actions**

```typescript
// src/app/admin/blogs/actions.ts
"use server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { upsertBlog, deleteBlog, approveContent, rejectContent } from "@/lib/supabase/queries-admin"

export async function createBlogAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const category = formData.get("category") as string
  const status = (formData.get("status") as string) || "draft"

  if (!title || !slug || !content) throw new Error("Title, slug, and content are required")

  await upsertBlog({ title, slug, content, excerpt, category, status, author_id: user.id })
  revalidatePath("/admin/blogs")
  redirect("/admin/blogs")
}

export async function updateBlogAction(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const excerpt = formData.get("excerpt") as string
  const category = formData.get("category") as string
  const status = formData.get("status") as string

  await upsertBlog({ id, title, slug, content, excerpt, category, status })
  revalidatePath("/admin/blogs")
  revalidatePath(`/blog/${slug}`)
  redirect("/admin/blogs")
}

export async function deleteBlogAction(id: string) {
  await deleteBlog(id)
  revalidatePath("/admin/blogs")
}

export async function approveBlogAction(id: string) {
  await approveContent("blogs", id)
  revalidatePath("/admin/blogs")
  revalidatePath("/admin/approvals")
  revalidatePath("/blog")
}

export async function rejectBlogAction(id: string) {
  await rejectContent("blogs", id)
  revalidatePath("/admin/blogs")
  revalidatePath("/admin/approvals")
}
```

- [ ] **Step 2: Create blogs list page**

```tsx
// src/app/admin/blogs/page.tsx
import Link from "next/link"
import { getAllBlogsAdmin } from "@/lib/supabase/queries-admin"
import DataTable from "@/components/admin/DataTable"
import StatusBadge from "@/components/admin/StatusBadge"
import { deleteBlogAction, approveBlogAction, rejectBlogAction } from "./actions"

export const revalidate = 0

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const status = searchParams.status
  const blogs = await getAllBlogsAdmin(status)

  const columns = [
    { key: "title", label: "Title", render: (row: (typeof blogs)[0]) => (
      <div className="max-w-xs truncate font-medium text-gray-900">{row.title}</div>
    )},
    { key: "slug", label: "Slug", render: (row: (typeof blogs)[0]) => (
      <span className="font-mono text-xs text-gray-500">{row.slug}</span>
    )},
    { key: "status", label: "Status", render: (row: (typeof blogs)[0]) => (
      <StatusBadge status={row.status as "draft" | "pending" | "published" | "rejected"} />
    )},
    { key: "created_at", label: "Date", render: (row: (typeof blogs)[0]) => (
      <span className="text-xs text-gray-500">{new Date(row.created_at).toLocaleDateString("en-IN")}</span>
    )},
    {
      key: "actions",
      label: "Actions",
      render: (row: (typeof blogs)[0]) => (
        <div className="flex gap-1.5 flex-wrap">
          <Link href={`/admin/blogs/${row.id}`} className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">Edit</Link>
          {row.status === "pending" && (
            <>
              <form action={approveBlogAction.bind(null, row.id)} className="inline">
                <button className="px-2.5 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200">✓ Approve</button>
              </form>
              <form action={rejectBlogAction.bind(null, row.id)} className="inline">
                <button className="px-2.5 py-1 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200">✗ Reject</button>
              </form>
            </>
          )}
          <form action={deleteBlogAction.bind(null, row.id)} className="inline">
            <button className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">Delete</button>
          </form>
        </div>
      ),
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Blogs</h1>
          <p className="text-gray-500 text-sm mt-1">{blogs.length} posts</p>
        </div>
        <Link href="/admin/blogs/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
          + New Blog
        </Link>
      </div>

      <div className="flex gap-2 mb-4">
        {["", "draft", "pending", "published", "rejected"].map((s) => (
          <Link key={s} href={s ? `/admin/blogs?status=${s}` : "/admin/blogs"}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              (status ?? "") === s ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {s || "All"}
          </Link>
        ))}
      </div>

      <DataTable columns={columns} rows={blogs} emptyMessage="No blog posts found." />
    </div>
  )
}
```

- [ ] **Step 3: Create new blog form**

```tsx
// src/app/admin/blogs/new/page.tsx
import { createBlogAction } from "../actions"

export default function NewBlogPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">New Blog Post</h1>
      <form action={createBlogAction} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input name="title" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug * (e.g. top-engineering-colleges-pune-2026)</label>
          <input name="slug" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <textarea name="excerpt" rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="engineering">Engineering</option>
            <option value="mba">MBA</option>
            <option value="medical">Medical</option>
            <option value="admission">Admission</option>
            <option value="scholarships">Scholarships</option>
            <option value="careers">Careers</option>
            <option value="general">General</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content * (Markdown supported)</label>
          <textarea name="content" required rows={20}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="status" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="draft">Draft</option>
            <option value="pending">Submit for Approval</option>
            <option value="published">Published (Super Admin only)</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            Save Blog Post
          </button>
          <a href="/admin/blogs" className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
```

- [ ] **Step 4: Create edit blog form**

```tsx
// src/app/admin/blogs/[id]/page.tsx
import { notFound } from "next/navigation"
import { getBlogByIdAdmin } from "@/lib/supabase/queries-admin"
import { updateBlogAction } from "../actions"

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlogByIdAdmin(params.id)
  if (!blog) notFound()

  const updateAction = updateBlogAction.bind(null, params.id)

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Edit Blog Post</h1>
      <form action={updateAction} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input name="title" required defaultValue={blog.title}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input name="slug" required defaultValue={blog.slug}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <textarea name="excerpt" rows={2} defaultValue={blog.excerpt ?? ""}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" defaultValue={blog.category ?? "general"}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="engineering">Engineering</option>
            <option value="mba">MBA</option>
            <option value="medical">Medical</option>
            <option value="admission">Admission</option>
            <option value="scholarships">Scholarships</option>
            <option value="careers">Careers</option>
            <option value="general">General</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content * (Markdown supported)</label>
          <textarea name="content" required rows={20} defaultValue={blog.content ?? ""}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="status" defaultValue={blog.status}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="draft">Draft</option>
            <option value="pending">Pending Review</option>
            <option value="published">Published</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            Save Changes
          </button>
          <a href="/admin/blogs" className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50">
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
```

- [ ] **Step 5: TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No new errors.

- [ ] **Step 6: Commit**

```bash
git add src/app/admin/blogs/
git commit -m "feat: admin blogs CRUD with approve/reject actions"
```

---

## Task 5: Leads Table (Super Admin Only)

**Files:**
- Create: `src/app/admin/leads/actions.ts`
- Create: `src/app/admin/leads/page.tsx`

- [ ] **Step 1: Create leads server actions**

```typescript
// src/app/admin/leads/actions.ts
"use server"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function updateLeadStatusAction(id: string, status: string) {
  const admin = createAdminClient()
  const { error } = await admin.from("leads").update({ status }).eq("id", id)
  if (error) throw error
  revalidatePath("/admin/leads")
}

export async function exportLeadsCSVAction(): Promise<string> {
  const admin = createAdminClient()
  const { data: leads, error } = await admin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  if (!leads || leads.length === 0) return ""

  const headers = ["id", "name", "email", "phone", "stream", "college_interest", "message", "status", "created_at"]
  const rows = leads.map((l) =>
    headers.map((h) => JSON.stringify(String((l as Record<string, unknown>)[h] ?? ""))).join(",")
  )
  return [headers.join(","), ...rows].join("\n")
}
```

- [ ] **Step 2: Create leads page**

```tsx
// src/app/admin/leads/page.tsx
import { getAllLeadsAdmin } from "@/lib/supabase/queries-admin"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import StatusBadge from "@/components/admin/StatusBadge"
import DataTable from "@/components/admin/DataTable"
import { updateLeadStatusAction } from "./actions"
import type { Lead } from "@/lib/supabase/types"

export const revalidate = 0

export default async function AdminLeadsPage({ searchParams }: { searchParams: { status?: string } }) {
  // Super admin guard
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user!.id).single()
  if (profile?.role !== "super_admin") redirect("/admin")

  const leads = await getAllLeadsAdmin(searchParams.status)

  const columns = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "stream", label: "Stream" },
    { key: "college_interest", label: "College" },
    {
      key: "status",
      label: "Status",
      render: (row: Lead) => <StatusBadge status={(row.status ?? "pending") as "draft" | "pending" | "published" | "rejected"} />,
    },
    {
      key: "created_at",
      label: "Date",
      render: (row: Lead) => <span className="text-xs text-gray-500">{new Date(row.created_at).toLocaleDateString("en-IN")}</span>,
    },
    {
      key: "actions",
      label: "Actions",
      render: (row: Lead) => (
        <form action={updateLeadStatusAction.bind(null, row.id, "contacted")}>
          <button className="px-2.5 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">Mark Contacted</button>
        </form>
      ),
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">{leads.length} total leads</p>
        </div>
        <a href="/api/admin/export-leads"
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700">
          ↓ Export CSV
        </a>
      </div>

      <div className="flex gap-2 mb-4">
        {["", "new", "contacted", "converted"].map((s) => (
          <a key={s} href={s ? `/admin/leads?status=${s}` : "/admin/leads"}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
              (searchParams.status ?? "") === s ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}>
            {s || "All"}
          </a>
        ))}
      </div>

      <DataTable columns={columns} rows={leads} emptyMessage="No leads yet." />
    </div>
  )
}
```

- [ ] **Step 3: Add CSV export API route**

```typescript
// src/app/api/admin/export-leads/route.ts
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "super_admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const admin = createAdminClient()
  const { data: leads } = await admin.from("leads").select("*").order("created_at", { ascending: false })
  if (!leads || leads.length === 0) return new NextResponse("No leads", { status: 200 })

  const headers = ["id", "name", "email", "phone", "stream", "college_interest", "message", "status", "created_at"]
  const rows = leads.map((l) =>
    headers.map((h) => JSON.stringify(String((l as Record<string, unknown>)[h] ?? ""))).join(",")
  )
  const csv = [headers.join(","), ...rows].join("\n")

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  })
}
```

- [ ] **Step 4: TypeScript check + commit**

```bash
npx tsc --noEmit
git add src/app/admin/leads/ src/app/api/admin/export-leads/
git commit -m "feat: admin leads table with CSV export"
```

---

## Task 6: Approvals Queue + Reviews + Q&A

**Files:**
- Create: `src/app/admin/approvals/page.tsx`
- Create: `src/app/admin/approvals/actions.ts`
- Create: `src/app/admin/reviews/page.tsx`
- Create: `src/app/admin/qa/page.tsx`

- [ ] **Step 1: Create approvals server actions**

```typescript
// src/app/admin/approvals/actions.ts
"use server"
import { revalidatePath } from "next/cache"
import { approveContent, rejectContent } from "@/lib/supabase/queries-admin"

export async function approveItemAction(table: "blogs" | "reviews" | "qa_questions", id: string) {
  await approveContent(table, id)
  revalidatePath("/admin/approvals")
  revalidatePath("/admin/blogs")
  revalidatePath("/admin/reviews")
  revalidatePath("/admin/qa")
}

export async function rejectItemAction(table: "blogs" | "reviews" | "qa_questions", id: string) {
  await rejectContent(table, id)
  revalidatePath("/admin/approvals")
  revalidatePath("/admin/blogs")
  revalidatePath("/admin/reviews")
  revalidatePath("/admin/qa")
}
```

- [ ] **Step 2: Create approvals queue page**

```tsx
// src/app/admin/approvals/page.tsx
import { getPendingApprovals } from "@/lib/supabase/queries-admin"
import { approveItemAction, rejectItemAction } from "./actions"

export const revalidate = 0

export default async function ApprovalsPage() {
  const { blogs, reviews, qa } = await getPendingApprovals()
  const total = blogs.length + reviews.length + qa.length

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Approvals Queue</h1>
      <p className="text-gray-500 text-sm mb-6">{total} items pending review</p>

      {total === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center text-green-700">
          ✅ All caught up! No pending approvals.
        </div>
      )}

      {blogs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Blog Posts ({blogs.length})</h2>
          <div className="space-y-3">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-900">{blog.title}</div>
                  <div className="text-xs text-gray-500 font-mono mt-0.5">/blog/{blog.slug}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, "blogs", blog.id)}>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">✓ Approve</button>
                  </form>
                  <form action={rejectItemAction.bind(null, "blogs", blog.id)}>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200">✗ Reject</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {reviews.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Reviews ({reviews.length})</h2>
          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-gray-900">Rating: {review.rating}/5</div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{review.body}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, "reviews", review.id)}>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">✓ Approve</button>
                  </form>
                  <form action={rejectItemAction.bind(null, "reviews", review.id)}>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200">✗ Reject</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {qa.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Q&A Questions ({qa.length})</h2>
          <div className="space-y-3">
            {qa.map((q) => (
              <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4">
                <div className="font-medium text-gray-900 line-clamp-2">{q.question}</div>
                <div className="flex gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, "qa_questions", q.id)}>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">✓ Approve</button>
                  </form>
                  <form action={rejectItemAction.bind(null, "qa_questions", q.id)}>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200">✗ Reject</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create reviews moderation page**

```tsx
// src/app/admin/reviews/page.tsx
import { createAdminClient } from "@/lib/supabase/admin"
import StatusBadge from "@/components/admin/StatusBadge"
import { approveItemAction, rejectItemAction } from "../approvals/actions"

export const revalidate = 0

export default async function AdminReviewsPage() {
  const admin = createAdminClient()
  const { data: reviews } = await admin
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Reviews ({reviews?.length ?? 0})</h1>
      <div className="space-y-3">
        {(reviews ?? []).map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-gray-900">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                  <StatusBadge status={review.status as "draft" | "pending" | "published" | "rejected"} />
                </div>
                <p className="text-sm text-gray-700">{review.body}</p>
              </div>
              {review.status === "pending" && (
                <div className="flex gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, "reviews", review.id)}>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">✓ Approve</button>
                  </form>
                  <form action={rejectItemAction.bind(null, "reviews", review.id)}>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200">✗ Reject</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
        {!reviews?.length && (
          <div className="text-center text-gray-400 py-12">No reviews yet.</div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create Q&A moderation page**

```tsx
// src/app/admin/qa/page.tsx
import { createAdminClient } from "@/lib/supabase/admin"
import StatusBadge from "@/components/admin/StatusBadge"
import { approveItemAction, rejectItemAction } from "../approvals/actions"

export const revalidate = 0

export default async function AdminQAPage() {
  const admin = createAdminClient()
  const { data: questions } = await admin
    .from("qa_questions")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Q&A ({questions?.length ?? 0})</h1>
      <div className="space-y-3">
        {(questions ?? []).map((q) => (
          <div key={q.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="font-semibold text-gray-900 mb-1">{q.question}</div>
                <StatusBadge status={q.status as "draft" | "pending" | "published" | "rejected"} />
              </div>
              {q.status === "pending" && (
                <div className="flex gap-2 shrink-0">
                  <form action={approveItemAction.bind(null, "qa_questions", q.id)}>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700">✓ Approve</button>
                  </form>
                  <form action={rejectItemAction.bind(null, "qa_questions", q.id)}>
                    <button className="px-3 py-1.5 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200">✗ Reject</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
        {!questions?.length && (
          <div className="text-center text-gray-400 py-12">No Q&A questions yet.</div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: TypeScript check + commit**

```bash
npx tsc --noEmit
git add src/app/admin/approvals/ src/app/admin/reviews/ src/app/admin/qa/
git commit -m "feat: approvals queue, reviews moderation, Q&A moderation"
```

---

## Task 7: Hero / Banner Management

**Files:**
- Create: `src/components/admin/ImageUpload.tsx`
- Create: `src/app/admin/hero/actions.ts`
- Create: `src/app/admin/hero/page.tsx`

- [ ] **Step 1: Create ImageUpload component**

```tsx
// src/components/admin/ImageUpload.tsx
"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface ImageUploadProps {
  bucket: "hero-images" | "college-images" | "blog-images"
  onUpload: (url: string) => void
  currentUrl?: string
}

export default function ImageUpload({ bucket, onUpload, currentUrl }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentUrl)
  const supabase = createClient()

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const ext = file.name.split(".").pop()
      const fileName = `${Date.now()}.${ext}`
      const { data, error } = await supabase.storage.from(bucket).upload(fileName, file)
      if (error) throw error

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(data.path)
      setPreview(publicUrl)
      onUpload(publicUrl)
    } catch (err) {
      console.error("Upload failed:", err)
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {preview && (
        <div className="mb-3">
          <img src={preview} alt="Preview" className="w-full max-h-48 object-cover rounded-lg border border-gray-200" />
        </div>
      )}
      <label className={`flex items-center gap-2 px-4 py-2.5 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
        uploading ? "border-blue-300 bg-blue-50 text-blue-500" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-500"
      }`}>
        <span>{uploading ? "⏳ Uploading..." : "📁 Choose image"}</span>
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="hidden" />
      </label>
    </div>
  )
}
```

- [ ] **Step 2: Create hero server actions**

```typescript
// src/app/admin/hero/actions.ts
"use server"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function upsertHeroAction(formData: FormData) {
  const admin = createAdminClient()
  const id = formData.get("id") as string | null
  const type = formData.get("type") as string
  const title = formData.get("title") as string
  const subtitle = formData.get("subtitle") as string
  const cta_text = formData.get("cta_text") as string
  const cta_link = formData.get("cta_link") as string
  const image_url = formData.get("image_url") as string
  const is_active = formData.get("is_active") === "true"
  const sort_order = parseInt(formData.get("sort_order") as string) || 0

  const payload = { type, title, subtitle, cta_text, cta_link, image_url, is_active, sort_order }

  if (id) {
    const { error } = await admin.from("hero_banners").update(payload).eq("id", id)
    if (error) throw error
  } else {
    const { error } = await admin.from("hero_banners").insert(payload)
    if (error) throw error
  }

  revalidatePath("/admin/hero")
  revalidatePath("/")
}

export async function deleteHeroAction(id: string) {
  const admin = createAdminClient()
  const { error } = await admin.from("hero_banners").delete().eq("id", id)
  if (error) throw error
  revalidatePath("/admin/hero")
  revalidatePath("/")
}

export async function toggleHeroActive(id: string, is_active: boolean) {
  const admin = createAdminClient()
  const { error } = await admin.from("hero_banners").update({ is_active }).eq("id", id)
  if (error) throw error
  revalidatePath("/admin/hero")
  revalidatePath("/")
}
```

- [ ] **Step 3: Create hero management page**

```tsx
// src/app/admin/hero/page.tsx
"use client" // needs ImageUpload which is a client component
import { useState } from "react"

// Note: This page is a client component due to ImageUpload. Fetch data via API.
// For simplicity, use a hybrid: server component wrapper + client form section.
```

Replace the above with the full hybrid approach:

```tsx
// src/app/admin/hero/page.tsx
import { createAdminClient } from "@/lib/supabase/admin"
import { upsertHeroAction, deleteHeroAction, toggleHeroActive } from "./actions"

export const revalidate = 0

export default async function AdminHeroPage() {
  const admin = createAdminClient()
  const { data: banners } = await admin
    .from("hero_banners")
    .select("*")
    .order("sort_order")

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Hero & Banners</h1>

      {/* Existing banners */}
      <div className="space-y-4 mb-8">
        {(banners ?? []).map((banner) => (
          <div key={banner.id} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                    banner.type === "hero" ? "bg-blue-100 text-blue-700" :
                    banner.type === "poster" ? "bg-purple-100 text-purple-700" :
                    "bg-orange-100 text-orange-700"
                  }`}>{banner.type}</span>
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                    banner.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}>{banner.is_active ? "Active" : "Inactive"}</span>
                </div>
                <div className="font-semibold text-gray-900">{banner.title}</div>
                {banner.subtitle && <div className="text-sm text-gray-500">{banner.subtitle}</div>}
                {banner.image_url && (
                  <img src={banner.image_url} alt={banner.title} className="mt-2 h-16 object-cover rounded" />
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <form action={toggleHeroActive.bind(null, banner.id, !banner.is_active)}>
                  <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    {banner.is_active ? "Deactivate" : "Activate"}
                  </button>
                </form>
                <form action={deleteHeroAction.bind(null, banner.id)}>
                  <button className="px-3 py-1.5 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200">Delete</button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {!banners?.length && (
          <div className="text-center text-gray-400 py-8">No banners yet.</div>
        )}
      </div>

      {/* Add new banner */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Add New Banner</h2>
        <form action={upsertHeroAction} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select name="type" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option value="hero">Hero (Homepage main banner)</option>
                <option value="poster">Poster (Mid-page)</option>
                <option value="banner">Banner (Sidebar/footer)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <input name="sort_order" type="number" defaultValue="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input name="title" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <input name="subtitle" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
              <input name="cta_text" placeholder="Explore Colleges" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
              <input name="cta_link" placeholder="/colleges" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input name="image_url" placeholder="https://..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
            <p className="text-xs text-gray-500 mt-1">Paste an image URL or use the Storage bucket to upload images.</p>
          </div>
          <div className="flex items-center gap-2">
            <input name="is_active" type="hidden" value="true" />
            <input type="checkbox" id="is_active" onChange={(e) => {
              const hiddenInput = e.target.form?.elements.namedItem("is_active") as HTMLInputElement
              if (hiddenInput) hiddenInput.value = String(e.target.checked)
            }} defaultChecked className="rounded border-gray-300" />
            <label htmlFor="is_active" className="text-sm text-gray-700">Active (visible on site)</label>
          </div>
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            Add Banner
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: TypeScript check + commit**

```bash
npx tsc --noEmit
git add src/app/admin/hero/ src/components/admin/ImageUpload.tsx
git commit -m "feat: hero/banner management with image upload"
```

---

## Task 8: JSON Import Tool

**Files:**
- Create: `src/app/admin/import/actions.ts`
- Create: `src/app/admin/import/page.tsx`

- [ ] **Step 1: Create import server action**

```typescript
// src/app/admin/import/actions.ts
"use server"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

interface ImportResult {
  success: number
  failed: number
  errors: string[]
}

export async function importJSONAction(formData: FormData): Promise<{ colleges?: ImportResult; blogs?: ImportResult; error?: string }> {
  const admin = createAdminClient()
  const type = formData.get("type") as "colleges" | "blogs"
  const json = formData.get("json") as string

  if (!json) return { error: "No JSON provided" }

  let items: unknown[]
  try {
    items = JSON.parse(json)
    if (!Array.isArray(items)) return { error: "JSON must be an array of objects" }
  } catch {
    return { error: "Invalid JSON format" }
  }

  const result: ImportResult = { success: 0, failed: 0, errors: [] }

  for (const item of items) {
    try {
      if (type === "colleges") {
        const c = item as Record<string, unknown>
        if (!c.name || !c.slug) { result.failed++; result.errors.push(`Missing name/slug: ${JSON.stringify(c).slice(0, 60)}`); continue }
        const { error } = await admin.from("colleges").upsert({ ...c }, { onConflict: "slug" })
        if (error) { result.failed++; result.errors.push(`${c.slug}: ${error.message}`) }
        else result.success++
      } else if (type === "blogs") {
        const b = item as Record<string, unknown>
        if (!b.title || !b.slug) { result.failed++; result.errors.push(`Missing title/slug: ${JSON.stringify(b).slice(0, 60)}`); continue }
        const { error } = await admin.from("blogs").upsert({ ...b, status: b.status ?? "draft" }, { onConflict: "slug" })
        if (error) { result.failed++; result.errors.push(`${b.slug}: ${error.message}`) }
        else result.success++
      }
    } catch (err) {
      result.failed++
      result.errors.push(String(err))
    }
  }

  revalidatePath(`/admin/${type}`)
  return { [type]: result }
}
```

- [ ] **Step 2: Create import page**

```tsx
// src/app/admin/import/page.tsx
"use client"
import { useState } from "react"
import { importJSONAction } from "./actions"

export default function ImportPage() {
  const [result, setResult] = useState<{ success?: number; failed?: number; errors?: string[]; error?: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    const formData = new FormData(e.currentTarget)
    const res = await importJSONAction(formData)
    const data = (res.colleges ?? res.blogs) as { success: number; failed: number; errors: string[] } | undefined
    if (res.error) {
      setResult({ error: res.error })
    } else if (data) {
      setResult({ success: data.success, failed: data.failed, errors: data.errors })
    }
    setLoading(false)
  }

  const sampleCollegeJSON = JSON.stringify([
    { name: "Sample College Pune", slug: "sample-college-pune", location: "Pune", type: "Private", established: 2000, status: "published" }
  ], null, 2)

  const sampleBlogJSON = JSON.stringify([
    { title: "Top Engineering Colleges in Pune 2026", slug: "top-engineering-colleges-pune-2026", excerpt: "A guide to...", content: "## Introduction\n\nContent here...", category: "engineering", status: "published" }
  ], null, 2)

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">JSON Import</h1>
      <p className="text-gray-500 text-sm mb-6">Bulk import colleges or blog posts by pasting a JSON array below. Uses upsert — existing records (matched by slug) will be updated.</p>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Import Type</label>
          <select name="type" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option value="colleges">Colleges</option>
            <option value="blogs">Blog Posts</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">JSON Array</label>
          <textarea name="json" rows={18} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Paste JSON array here...\n\nExample:\n${sampleCollegeJSON}`} />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">Sample College fields:</p>
          <pre className="text-xs text-gray-600 overflow-x-auto">{sampleCollegeJSON}</pre>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-gray-700 mb-2">Sample Blog fields:</p>
          <pre className="text-xs text-gray-600 overflow-x-auto">{sampleBlogJSON}</pre>
        </div>

        <button type="submit" disabled={loading}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50">
          {loading ? "⏳ Importing..." : "📥 Import JSON"}
        </button>
      </form>

      {result && (
        <div className={`mt-4 rounded-xl p-4 border ${result.error ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
          {result.error ? (
            <p className="text-red-700 font-medium">{result.error}</p>
          ) : (
            <>
              <p className="font-semibold text-green-800">
                ✅ Import complete — {result.success} succeeded, {result.failed} failed
              </p>
              {result.errors && result.errors.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-red-700 mb-1">Errors:</p>
                  <ul className="text-xs text-red-600 space-y-0.5">
                    {result.errors.map((e, i) => <li key={i}>• {e}</li>)}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: TypeScript check + commit**

```bash
npx tsc --noEmit
git add src/app/admin/import/
git commit -m "feat: JSON import tool for colleges and blogs"
```

---

## Task 9: Agent Management (Super Admin Only)

**Files:**
- Create: `src/app/admin/agents/actions.ts`
- Create: `src/app/admin/agents/page.tsx`

- [ ] **Step 1: Create agents server actions**

```typescript
// src/app/admin/agents/actions.ts
"use server"
import { createAdminClient } from "@/lib/supabase/admin"
import { toggleAgentActive } from "@/lib/supabase/queries-admin"
import { revalidatePath } from "next/cache"

export async function inviteAgentAction(formData: FormData) {
  const admin = createAdminClient()
  const email = formData.get("email") as string
  const full_name = formData.get("full_name") as string

  if (!email) throw new Error("Email is required")

  // Create auth user with a temp password (they'll reset via email)
  const tempPassword = Math.random().toString(36).slice(-12) + "Aa1!"
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { full_name },
  })
  if (error) throw new Error(error.message)

  // Insert profile with agent role
  const { error: profileError } = await admin.from("profiles").insert({
    id: data.user.id,
    email,
    full_name,
    role: "agent",
    is_active: true,
  })
  if (profileError) throw new Error(profileError.message)

  revalidatePath("/admin/agents")
}

export async function toggleAgentActiveAction(id: string, is_active: boolean) {
  await toggleAgentActive(id, is_active)
  revalidatePath("/admin/agents")
}
```

- [ ] **Step 2: Create agents page**

```tsx
// src/app/admin/agents/page.tsx
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getAgentProfiles } from "@/lib/supabase/queries-admin"
import { inviteAgentAction, toggleAgentActiveAction } from "./actions"

export const revalidate = 0

export default async function AdminAgentsPage() {
  // Super admin guard
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user!.id).single()
  if (profile?.role !== "super_admin") redirect("/admin")

  const agents = await getAgentProfiles()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Agent Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">{agents.length} total users</p>
        </div>
      </div>

      {/* Agents list */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name / Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{agent.full_name || "—"}</div>
                  <div className="text-xs text-gray-500">{agent.email}</div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                    agent.role === "super_admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                  }`}>{agent.role.replace("_", " ")}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                    agent.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  }`}>{agent.is_active ? "Active" : "Inactive"}</span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {new Date(agent.created_at).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3">
                  {agent.role !== "super_admin" && (
                    <form action={toggleAgentActiveAction.bind(null, agent.id, !agent.is_active)}>
                      <button className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                        agent.is_active
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}>{agent.is_active ? "Deactivate" : "Activate"}</button>
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
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Invite New Agent</h2>
        <form action={inviteAgentAction} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input name="full_name" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input name="email" type="email" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <p className="text-xs text-gray-500">
            A new agent account will be created with a temporary password. Send the agent their credentials separately.
          </p>
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
            Create Agent Account
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: TypeScript check + commit**

```bash
npx tsc --noEmit
git add src/app/admin/agents/
git commit -m "feat: agent management — list, invite, toggle active"
```

---

## Task 10: Logout API Route + Final Polish

**Files:**
- Create: `src/app/api/admin/logout/route.ts`
- Verify: `src/app/admin/login/page.tsx` exists (from Phase 1)

- [ ] **Step 1: Create logout route**

```typescript
// src/app/api/admin/logout/route.ts
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function POST() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}
```

- [ ] **Step 2: Verify login page exists from Phase 1**

```bash
ls D:\collegepune\college-pune\src\app\admin\login\
```

Expected: `page.tsx` and `actions.ts` exist (created in Phase 1). If missing, they need to be created — see Phase 1 plan Task 9.

- [ ] **Step 3: Add active link highlighting to Sidebar**

The Sidebar component currently doesn't highlight the active route. Add `usePathname` hook:

```tsx
// Update src/components/admin/Sidebar.tsx — add this to each Link:
// className={`... ${pathname === link.href || pathname.startsWith(link.href + "/") ? "bg-white/20 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"}`}
```

Since `Sidebar` is already a server component, convert to a client component for `usePathname`:

```tsx
// src/components/admin/Sidebar.tsx — add "use client" at top and import usePathname
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
// ... rest stays the same, add to each Link:
const pathname = usePathname()
// in Link className: replace hover className with conditional:
// pathname === link.href ? "bg-white/20 text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"
```

Full updated Sidebar — just the `nav` section map:

```tsx
<nav className="flex-1 px-3 py-4 space-y-1">
  {links.map((link) => {
    const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href))
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
          isActive ? "bg-white/20 text-white font-medium" : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`}
      >
        <span>{link.icon}</span>
        <span>{link.label}</span>
      </Link>
    )
  })}
</nav>
```

- [ ] **Step 4: Full TypeScript check**

```bash
npx tsc --noEmit
```

Expected: Zero TypeScript errors across all admin files.

- [ ] **Step 5: Full build check**

```bash
npm run build
```

Expected: Build succeeds. Admin pages are statically analyzed without errors.

- [ ] **Step 6: Final commit**

```bash
git add src/app/api/admin/logout/ src/components/admin/Sidebar.tsx
git commit -m "feat: admin logout route and active sidebar highlighting"
```

---

## Task 11: Supabase `hero_banners` Table SQL

This table must exist in Supabase before the hero management page works. If Phase 1 SQL did not include it, apply this migration.

**Files:**
- Create: `src/db/migrations/004_hero_banners.sql` (apply to Supabase SQL editor)

- [ ] **Step 1: Check if hero_banners table exists**

In Supabase SQL Editor, run:

```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'hero_banners';
```

If no row returned, proceed to Step 2. Otherwise skip to Step 3.

- [ ] **Step 2: Create hero_banners table**

```sql
-- src/db/migrations/004_hero_banners.sql
CREATE TABLE IF NOT EXISTS hero_banners (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type          TEXT NOT NULL CHECK (type IN ('hero', 'poster', 'banner')),
  title         TEXT NOT NULL,
  subtitle      TEXT,
  cta_text      TEXT,
  cta_link      TEXT,
  image_url     TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_hero_banners_type ON hero_banners(type);
CREATE INDEX idx_hero_banners_active ON hero_banners(is_active);

-- RLS
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;

-- Public can read active banners
CREATE POLICY "public read active banners"
  ON hero_banners FOR SELECT
  USING (is_active = true);

-- Super admin can do everything
CREATE POLICY "super admin all hero_banners"
  ON hero_banners FOR ALL
  USING (is_super_admin())
  WITH CHECK (is_super_admin());
```

- [ ] **Step 3: Save migration file and commit**

```bash
git add src/db/migrations/004_hero_banners.sql
git commit -m "feat: hero_banners table migration"
```

---

## Self-Review Checklist

**Spec coverage:**
- ✅ Super Admin + Agent roles — middleware + layout guard + per-page role checks
- ✅ Dashboard — stats cards + pending alert + quick links
- ✅ Colleges CRUD — list, new, edit, delete + server actions
- ✅ Blogs CRUD — list (with status filter), new, edit, delete, approve, reject
- ✅ Leads table — list, status filter, mark contacted, CSV export
- ✅ Approvals queue — pending blogs + reviews + Q&A in one place
- ✅ Reviews moderation — all reviews, approve/reject
- ✅ Q&A moderation — all questions, approve/reject
- ✅ Hero/Banner management — list, add (type/title/cta/image), toggle active, delete
- ✅ JSON import tool — colleges + blogs with error reporting
- ✅ Agent management — list all, invite new, toggle active/inactive
- ✅ Logout — POST /api/admin/logout

**Placeholder scan:** No TBD, TODO, or "implement later" in any code block.

**Type consistency:** All server actions use `createAdminClient()`. All page-level data fetches use `createAdminClient()`. Session checks use `createClient()` (SSR). All `queries-admin.ts` functions are called consistently across action files.
