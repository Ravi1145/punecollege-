# Admin Panel Full Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild all admin pages into a complete, polished, production-ready frontend connected to Supabase.

**Architecture:** Next.js 16 App Router server components + server actions. All data via `createAdminClient()` (service role). Shared UI primitives in `src/components/admin/`. Each page is self-contained — no global state.

**Tech Stack:** Next.js 16, Tailwind CSS v4, Supabase (service role), Server Actions, TypeScript

---

### Task 1: Shared Admin UI Primitives
**Files:**
- Modify: `src/components/admin/StatusBadge.tsx`
- Create: `src/components/admin/AdminTable.tsx`
- Create: `src/components/admin/FormField.tsx`
- Create: `src/components/admin/PageHeader.tsx`
- Create: `src/components/admin/DeleteButton.tsx`

### Task 2: Dashboard — live stats + recent leads
**Files:** Modify `src/app/admin/page.tsx`

### Task 3: Colleges — full form (all DB fields) + rich list
**Files:** 
- Modify `src/app/admin/colleges/page.tsx`
- Modify `src/app/admin/colleges/new/page.tsx`
- Modify `src/app/admin/colleges/[id]/page.tsx`
- Modify `src/app/admin/colleges/actions.ts`

### Task 4: Blogs — full form + markdown textarea + auto-slug
**Files:**
- Modify `src/app/admin/blogs/new/page.tsx`
- Modify `src/app/admin/blogs/[id]/page.tsx`
- Modify `src/app/admin/blogs/actions.ts`

### Task 5: Leads — search + status update + notes + CSV export
**Files:** Modify `src/app/admin/leads/page.tsx`

### Task 6: Approvals + Reviews + Q&A — polished moderation UI
**Files:**
- Modify `src/app/admin/approvals/page.tsx`
- Modify `src/app/admin/reviews/page.tsx`
- Modify `src/app/admin/qa/page.tsx`

### Task 7: Hero/Banners — full management UI
**Files:** Modify `src/app/admin/hero/page.tsx`

### Task 8: Agents — invite + toggle + list
**Files:**
- Modify `src/app/admin/agents/page.tsx`
- Modify `src/app/admin/agents/actions.ts`

### Task 9: Export leads CSV route fix
**Files:** Modify `src/app/api/admin/export-leads/route.ts`
