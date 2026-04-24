import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { COLLEGE_GENERATION_SYSTEM, buildCollegePrompt } from '@/lib/ai/prompts'
import { logAIJob } from '@/lib/db'
import { slugify } from '@/lib/utils'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { collegeName, city = 'Pune', stream = 'Engineering' } = await req.json()

    if (!collegeName?.trim()) {
      return NextResponse.json({ error: 'collegeName is required' }, { status: 400 })
    }

    const userPrompt = buildCollegePrompt(collegeName, city, stream)

    const message = await anthropic.messages.create({
      model:      'claude-sonnet-4-6',
      max_tokens: 4096,
      system:     COLLEGE_GENERATION_SYSTEM,
      messages:   [{ role: 'user', content: userPrompt }],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text : ''
    const tokensUsed = message.usage.input_tokens + message.usage.output_tokens

    // Parse JSON — strip any accidental markdown fences
    const jsonStr = raw.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
    const collegeData = JSON.parse(jsonStr)

    // Auto-generate slug from name if not provided
    if (!collegeData.slug) {
      collegeData.slug = slugify(collegeData.name || collegeName)
    }
    collegeData.ai_generated = true
    collegeData.status = 'draft'

    await logAIJob(
      'generate_college',
      { collegeName, city, stream },
      collegeData,
      tokensUsed
    )

    return NextResponse.json({ success: true, college: collegeData, tokensUsed })
  } catch (err) {
    const msg = String(err)
    if (msg.includes('JSON')) {
      return NextResponse.json({ error: 'AI returned invalid JSON. Try again.' }, { status: 422 })
    }
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
