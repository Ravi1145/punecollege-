import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { anthropic } from '@/lib/anthropic'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase
    .from('profiles').select('role, is_active').eq('id', user.id).single()
  if (!profile?.is_active) return null
  return profile
}

/** Builds a Claude prompt from the college's existing DB fields */
function buildPrompt(college: Record<string, unknown>): string {
  const courses  = (college.courses  as string[] | null) ?? []
  const exams    = (college.entrance_exams as string[] | null) ?? []
  const recrts   = (college.top_recruiters as string[] | null) ?? []
  const highs    = (college.highlights as string[] | null) ?? []

  const feesMin  = college.fees_min  ? `₹${Math.round((college.fees_min  as number) / 1000)}K` : 'Not specified'
  const feesMax  = college.fees_max  ? `₹${Math.round((college.fees_max  as number) / 1000)}K` : 'Not specified'
  const avgPkg   = college.avg_placement ? `₹${((college.avg_placement as number) / 100000).toFixed(1)}L` : 'Not specified'
  const hiPkg    = college.highest_pkg  ? `₹${((college.highest_pkg  as number) / 100000).toFixed(1)}L` : 'Not specified'

  return `You are an expert content writer for an Indian education portal. Generate accurate, detailed college profile data for "${college.name}" located in Pune, Maharashtra.

COLLEGE DATA:
- Name: ${college.name}
- Short Name: ${college.short_name ?? college.name}
- Type: ${college.type ?? 'Private'}
- Stream: ${college.stream ?? 'Engineering'}
- Established: ${college.established ?? 'Not specified'}
- Affiliation: ${college.affiliation ?? 'Savitribai Phule Pune University'}
- NAAC Grade: ${college.naac_grade ?? 'Not graded'}
- NIRF Rank: ${college.nirf_rank ?? 'Not ranked'}
- Courses: ${courses.join(', ') || 'Not specified'}
- Entrance Exams: ${exams.join(', ') || 'MHT-CET, JEE Main'}
- Annual Fees: ${feesMin} to ${feesMax}
- Avg Placement Package: ${avgPkg}
- Highest Package: ${hiPkg}
- Top Recruiters: ${recrts.join(', ') || 'TCS, Infosys, Wipro, Cognizant'}
- Hostel: ${college.hostel ? 'Available (separate for boys & girls)' : 'Not available on campus'}
- Highlights: ${highs.join('; ') || 'Not specified'}
- Description: ${college.description ?? ''}

Generate a JSON object (no markdown, no code block, raw JSON only) with this exact structure:

{
  "courses_fees": [
    {
      "course": "Course full name",
      "duration": "4 years",
      "eligibility": "10+2 PCM, minimum 50% marks",
      "selection": "MHT-CET / JEE Main merit + CAP counselling",
      "fees_per_year": 120000
    }
  ],
  "admission_process": [
    { "step": 1, "title": "Step title", "description": "Detailed step description mentioning the college and relevant exam" }
  ],
  "placements": {
    "avg_package": "${avgPkg}",
    "highest_package": "${hiPkg}",
    "placement_rate": "85%",
    "companies_visited": ${Math.max(recrts.length, 40)},
    "sector_wise": [
      { "sector": "IT & Software", "percentage": 55 },
      { "sector": "Core Engineering", "percentage": 20 },
      { "sector": "Management & Consulting", "percentage": 15 },
      { "sector": "Others", "percentage": 10 }
    ]
  },
  "scholarships": [
    { "name": "Scholarship name", "eligibility": "Who can apply", "amount": "Benefit amount/percentage", "provider": "Providing organisation" }
  ],
  "facilities": [
    { "name": "Facility name", "description": "1-2 sentence description" }
  ],
  "faqs": [
    { "q": "Question?", "a": "Answer." }
  ],
  "hostel_info": {
    "available": ${college.hostel ? 'true' : 'false'},
    "boys": ${college.hostel ? '"On-campus hostel for boys with 24-hour security and meals"' : '"No on-campus hostel; PG accommodations available nearby"'},
    "girls": ${college.hostel ? '"Separate on-campus hostel for girls with warden and CCTV"' : '"No on-campus hostel; ladies PG accommodations available nearby"'},
    "monthly_cost": ${college.hostel ? '"₹8,000 – ₹12,000 per month including meals"' : 'null'}
  },
  "cutoffs": [
    { "year": 2024, "exam": "MHT-CET", "branch": "Course name", "general": "Percentile/rank", "obc": "Percentile/rank", "sc": "Percentile/rank", "st": "Percentile/rank" }
  ],
  "rankings": [
    { "agency": "NIRF", "year": 2024, "rank": "${college.nirf_rank ?? 'Not ranked'}", "category": "${college.stream ?? 'Engineering'}" }
  ]
}

RULES:
1. courses_fees: Include ALL courses listed (${courses.length > 0 ? courses.slice(0, 8).join(', ') : 'list all typical courses for this stream'}). Fees must be realistic for a ${college.type ?? 'Private'} college in Pune.
2. admission_process: 5 steps, stream-specific, mentioning actual entrance exams (${exams.join(', ') || 'MHT-CET'}) and Maharashtra CAP counselling process.
3. placements: Use the provided package data. sector_wise percentages must sum to 100.
4. scholarships: Include 3-5 real Maharashtra government scholarships (EBC, OBC Non-Creamy Layer, SC/ST, Minority, CSSS) plus any college-merit scholarship.
5. facilities: 6-8 facilities appropriate for a ${college.stream ?? 'Engineering'} college; include hostel only if hostel=true.
6. faqs: 6 FAQs covering fees, entrance exam, admission process, hostel, placements, and NAAC grade.
7. cutoffs: Include realistic 2024 and 2023 cutoffs for top 2-3 courses. For percentile-based (MHT-CET): General 92-99, OBC 88-97, SC 78-90. For rank-based (JEE): General top 50K, OBC top 70K.
8. rankings: Include all relevant rankings (NIRF, Outlook, India Today, Times, QS if applicable for this tier of college).
9. Return ONLY the raw JSON object. No explanations, no markdown, no code fences.`
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const profile = await requireAdmin()
  if (!profile || profile.role !== 'super_admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json().catch(() => ({}))
    const overwrite: boolean = Boolean((body as Record<string, unknown>).overwrite)

    const admin = createAdminClient()

    // Fetch college from DB
    const { data: college, error: fetchError } = await admin
      .from('colleges')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 })
    }

    // Check if details already exist (unless overwrite requested)
    if (!overwrite) {
      const det = college.details as Record<string, unknown> | undefined
      const hasDetails =
        det &&
        Array.isArray(det.courses_fees) &&
        (det.courses_fees as unknown[]).length > 0 &&
        Array.isArray(det.faqs) &&
        (det.faqs as unknown[]).length > 0
      if (hasDetails) {
        return NextResponse.json(
          { error: 'Details already exist. Pass overwrite=true to regenerate.' },
          { status: 409 }
        )
      }
    }

    // Build prompt and call Claude
    const prompt = buildPrompt(college as Record<string, unknown>)

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    })

    // Extract text from response
    const raw = message.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('')
      .trim()

    // Strip any accidental markdown code fences
    const cleaned = raw
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim()

    // Parse the JSON
    let details: Record<string, unknown>
    try {
      details = JSON.parse(cleaned) as Record<string, unknown>
    } catch {
      console.error('[generate] Claude returned invalid JSON:', cleaned.slice(0, 500))
      return NextResponse.json(
        { error: 'AI returned invalid JSON. Try again.', raw: cleaned.slice(0, 300) },
        { status: 500 }
      )
    }

    // Merge with any existing details (keep manual edits, fill missing)
    const existingDetails = (college.details ?? {}) as Record<string, unknown>
    const merged: Record<string, unknown> = { ...details, ...existingDetails }
    // Always use AI-generated values for the core arrays if they were empty
    for (const key of ['courses_fees', 'admission_process', 'placements', 'scholarships', 'facilities', 'faqs', 'hostel_info', 'cutoffs', 'rankings']) {
      const existing = existingDetails[key]
      const isEmpty =
        existing === undefined ||
        existing === null ||
        (Array.isArray(existing) && (existing as unknown[]).length === 0) ||
        (typeof existing === 'object' && !Array.isArray(existing) && Object.keys(existing as Record<string, unknown>).length === 0)
      if (isEmpty) {
        merged[key] = details[key]
      }
    }

    // Write back to Supabase
    const { error: updateError } = await admin
      .from('colleges')
      .update({ details: merged, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Revalidate the public college page
    revalidatePath(`/colleges/${college.slug}`)
    revalidatePath('/colleges')

    return NextResponse.json({
      ok: true,
      slug: college.slug,
      sections_generated: Object.keys(details),
      usage: message.usage,
    })
  } catch (err) {
    console.error('[POST /api/admin/colleges/[id]/generate]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
