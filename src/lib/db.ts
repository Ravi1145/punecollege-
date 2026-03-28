import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import type { Lead, Enquiry, CounsellingBooking, AdminStats } from '@/types'

const DB_PATH = path.join(process.cwd(), 'data', 'leads.db')

let db: Database.Database

function getDb(): Database.Database {
  if (!db) {
    // Ensure the data/ directory exists before opening the DB
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    initializeTables(db)
  }
  return db
}

function initializeTables(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      whatsapp TEXT,
      city TEXT DEFAULT 'Pune',
      stream TEXT,
      budget TEXT,
      exam_type TEXT,
      exam_score TEXT,
      career_goal TEXT,
      college_interest TEXT,
      course_interest TEXT,
      source TEXT NOT NULL,
      utm_source TEXT,
      utm_medium TEXT,
      page_url TEXT,
      status TEXT DEFAULT 'new',
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id INTEGER REFERENCES leads(id),
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      college_name TEXT NOT NULL,
      college_slug TEXT,
      course TEXT,
      message TEXT,
      preferred_contact TEXT DEFAULT 'whatsapp',
      preferred_time TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS counselling_bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id INTEGER REFERENCES leads(id),
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      preferred_date TEXT,
      preferred_time TEXT,
      stream TEXT,
      exam_score TEXT,
      colleges_shortlisted TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
    CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
    CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
    CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
  `)
}

// ── LEAD FUNCTIONS ────────────────────

export function insertLead(data: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): number {
  const database = getDb()

  // Prevent duplicate leads from same phone within 24 hours
  const existing = database.prepare(`
    SELECT id FROM leads
    WHERE phone = ? AND created_at > datetime('now', '-24 hours')
    LIMIT 1
  `).get(data.phone) as { id: number } | undefined

  if (existing) {
    database.prepare(`
      UPDATE leads SET
        college_interest = COALESCE(?, college_interest),
        course_interest = COALESCE(?, course_interest),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(data.college_interest ?? null, data.course_interest ?? null, existing.id)
    return existing.id
  }

  const result = database.prepare(`
    INSERT INTO leads
    (name, phone, email, whatsapp, city, stream, budget, exam_type,
     exam_score, career_goal, college_interest, course_interest,
     source, utm_source, utm_medium, page_url, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
  `).run(
    data.name,
    data.phone,
    data.email ?? null,
    data.whatsapp ?? null,
    data.city ?? 'Pune',
    data.stream ?? null,
    data.budget ?? null,
    data.exam_type ?? null,
    data.exam_score ?? null,
    data.career_goal ?? null,
    data.college_interest ?? null,
    data.course_interest ?? null,
    data.source,
    data.utm_source ?? null,
    data.utm_medium ?? null,
    data.page_url ?? null,
  )
  return result.lastInsertRowid as number
}

export function getAllLeads(filters?: {
  status?: string
  source?: string
  stream?: string
  search?: string
  page?: number
  limit?: number
}): { leads: Lead[]; total: number; page: number; totalPages: number } {
  const database = getDb()
  const page = filters?.page ?? 1
  const limit = filters?.limit ?? 50
  const offset = (page - 1) * limit

  let where = 'WHERE 1=1'
  const params: unknown[] = []

  if (filters?.status) { where += ' AND status = ?'; params.push(filters.status) }
  if (filters?.source) { where += ' AND source = ?'; params.push(filters.source) }
  if (filters?.stream) { where += ' AND stream = ?'; params.push(filters.stream) }
  if (filters?.search) {
    where += ' AND (name LIKE ? OR phone LIKE ? OR email LIKE ?)'
    params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`)
  }

  const countRow = database.prepare(`SELECT COUNT(*) as count FROM leads ${where}`).get(...params) as { count: number }
  const total = countRow.count

  const leads = database.prepare(`
    SELECT * FROM leads ${where}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `).all(...params, limit, offset) as Lead[]

  return { leads, total, page, totalPages: Math.ceil(total / limit) }
}

export function updateLeadStatus(id: number, status: string, notes?: string): void {
  getDb().prepare(`
    UPDATE leads SET status = ?, notes = COALESCE(?, notes),
    updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(status, notes ?? null, id)
}

export function getLeadsStats(): AdminStats {
  const database = getDb()

  const totalLeads = (database.prepare('SELECT COUNT(*) as c FROM leads').get() as { c: number }).c
  const leadsToday = (database.prepare(`SELECT COUNT(*) as c FROM leads WHERE date(created_at) = date('now')`).get() as { c: number }).c
  const leadsThisWeek = (database.prepare(`SELECT COUNT(*) as c FROM leads WHERE created_at > datetime('now', '-7 days')`).get() as { c: number }).c
  const newLeads = (database.prepare(`SELECT COUNT(*) as c FROM leads WHERE status = 'new'`).get() as { c: number }).c
  const contactedLeads = (database.prepare(`SELECT COUNT(*) as c FROM leads WHERE status = 'contacted'`).get() as { c: number }).c
  const convertedLeads = (database.prepare(`SELECT COUNT(*) as c FROM leads WHERE status = 'converted'`).get() as { c: number }).c

  const leadsBySource = database.prepare(`
    SELECT source, COUNT(*) as count FROM leads GROUP BY source ORDER BY count DESC
  `).all() as { source: string; count: number }[]

  const leadsByStream = database.prepare(`
    SELECT stream, COUNT(*) as count FROM leads
    WHERE stream IS NOT NULL GROUP BY stream ORDER BY count DESC
  `).all() as { stream: string; count: number }[]

  const dailyTrend = database.prepare(`
    SELECT date(created_at) as date, COUNT(*) as count
    FROM leads WHERE created_at > datetime('now', '-7 days')
    GROUP BY date(created_at) ORDER BY date ASC
  `).all() as { date: string; count: number }[]

  return {
    totalLeads, leadsToday, leadsThisWeek, newLeads,
    contactedLeads, convertedLeads, leadsBySource,
    leadsByStream, dailyTrend,
  }
}

export function exportLeadsCSV(): string {
  const database = getDb()
  const leads = database.prepare('SELECT * FROM leads ORDER BY created_at DESC').all() as Lead[]

  const headers = ['ID', 'Name', 'Phone', 'Email', 'Stream', 'Budget', 'Exam Type',
    'Score', 'College Interest', 'Source', 'Status', 'City', 'Created At']
  const rows = leads.map(l => [
    l.id, `"${l.name}"`, l.phone, l.email ?? '', l.stream ?? '',
    l.budget ?? '', l.exam_type ?? '', l.exam_score ?? '',
    l.college_interest ?? '', l.source, l.status ?? 'new',
    l.city ?? 'Pune', l.created_at ?? '',
  ].join(','))

  return [headers.join(','), ...rows].join('\n')
}

// ── ENQUIRY FUNCTIONS ─────────────────

export function insertEnquiry(data: Omit<Enquiry, 'id' | 'created_at'>): number {
  const database = getDb()
  const result = database.prepare(`
    INSERT INTO enquiries
    (lead_id, name, phone, email, college_name, college_slug,
     course, message, preferred_contact, preferred_time, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `).run(
    data.lead_id ?? null,
    data.name,
    data.phone,
    data.email ?? null,
    data.college_name,
    data.college_slug ?? null,
    data.course ?? null,
    data.message ?? null,
    data.preferred_contact ?? 'whatsapp',
    data.preferred_time ?? null,
  )
  return result.lastInsertRowid as number
}

export function getAllEnquiries(): Enquiry[] {
  return getDb().prepare(
    'SELECT * FROM enquiries ORDER BY created_at DESC'
  ).all() as Enquiry[]
}

export function updateEnquiryStatus(id: number, status: string): void {
  getDb().prepare('UPDATE enquiries SET status = ? WHERE id = ?').run(status, id)
}

// ── COUNSELLING FUNCTIONS ─────────────

export function insertBooking(
  data: Omit<CounsellingBooking, 'id' | 'created_at'>
): number {
  const database = getDb()
  const result = database.prepare(`
    INSERT INTO counselling_bookings
    (lead_id, name, phone, email, preferred_date, preferred_time,
     stream, exam_score, colleges_shortlisted, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `).run(
    data.lead_id ?? null,
    data.name,
    data.phone,
    data.email ?? null,
    data.preferred_date ?? null,
    data.preferred_time ?? null,
    data.stream ?? null,
    data.exam_score ?? null,
    data.colleges_shortlisted ?? null,
  )
  return result.lastInsertRowid as number
}

export default getDb
