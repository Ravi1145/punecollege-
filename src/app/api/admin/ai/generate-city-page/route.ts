import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { CITY_PAGE_SYSTEM, buildCityPagePrompt } from '@/lib/ai/prompts'
import { logAIJob, upsertCityPage } from '@/lib/db'
import { slugify } from '@/lib/utils'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { city, stream, topColleges = [], save = false } = await req.json()

    if (!city?.trim() || !stream?.trim()) {
      return NextResponse.json({ error: 'city and stream are required' }, { status: 400 })
    }

    const userPrompt = buildCityPagePrompt(city, stream, topColleges)

    const message = await anthropic.messages.create({
      model:      'claude-sonnet-4-6',
      max_tokens: 2048,
      system:     CITY_PAGE_SYSTEM,
      messages:   [{ role: 'user', content: userPrompt }],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text : ''
    const tokensUsed = message.usage.input_tokens + message.usage.output_tokens

    const jsonStr = raw.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
    const pageData = JSON.parse(jsonStr)

    const slug = `${slugify(city)}-${slugify(stream)}`

    // Optionally persist to city_pages table
    if (save) {
      await upsertCityPage({
        city:        city.toLowerCase(),
        stream:      stream.toLowerCase(),
        slug,
        title:       pageData.title,
        intro:       pageData.intro,
        faqs:        pageData.faqs,
        cta_text:    pageData.cta_text,
        meta_title:  pageData.meta_title,
        meta_desc:   pageData.meta_desc,
        status:      'published',
        ai_generated: true,
      })
    }

    await logAIJob(
      'generate_city_page',
      { city, stream, topColleges },
      { slug, title: pageData.title },
      tokensUsed
    )

    return NextResponse.json({ success: true, page: { ...pageData, slug }, tokensUsed })
  } catch (err) {
    const msg = String(err)
    if (msg.includes('JSON')) {
      return NextResponse.json({ error: 'AI returned invalid JSON. Try again.' }, { status: 422 })
    }
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
