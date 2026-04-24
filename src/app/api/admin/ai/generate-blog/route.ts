import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { BLOG_GENERATION_SYSTEM, buildBlogPrompt } from '@/lib/ai/prompts'
import { logAIJob } from '@/lib/db'
import { slugify } from '@/lib/utils'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export async function POST(req: NextRequest) {
  try {
    const { topic, keyword, wordCount = 1200 } = await req.json()

    if (!topic?.trim() || !keyword?.trim()) {
      return NextResponse.json({ error: 'topic and keyword are required' }, { status: 400 })
    }

    const userPrompt = buildBlogPrompt(topic, keyword, wordCount)

    const message = await anthropic.messages.create({
      model:      'claude-sonnet-4-6',
      max_tokens: 4096,
      system:     BLOG_GENERATION_SYSTEM,
      messages:   [{ role: 'user', content: userPrompt }],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text : ''
    const tokensUsed = message.usage.input_tokens + message.usage.output_tokens

    const jsonStr = raw.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '').trim()
    const blogData = JSON.parse(jsonStr)

    // Auto-generate slug from title
    if (!blogData.slug) {
      blogData.slug = slugify(blogData.title || topic)
    }
    blogData.ai_generated = true
    blogData.status = 'draft'

    await logAIJob(
      'generate_blog',
      { topic, keyword, wordCount },
      { ...blogData, body: '[body omitted for log]' },
      tokensUsed
    )

    return NextResponse.json({ success: true, blog: blogData, tokensUsed })
  } catch (err) {
    const msg = String(err)
    if (msg.includes('JSON')) {
      return NextResponse.json({ error: 'AI returned invalid JSON. Try again.' }, { status: 422 })
    }
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
