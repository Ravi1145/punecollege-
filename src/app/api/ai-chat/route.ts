import { NextRequest, NextResponse } from "next/server"
import { anthropic, COUNSELOR_SYSTEM_PROMPT } from "@/lib/anthropic"
import { rateLimit } from "@/lib/ratelimit"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  // Rate limit: 20 requests per minute per IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown"
  const { allowed } = rateLimit(ip, 20, 60_000)
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 })
  }

  try {
    const { messages, userMessage } = await req.json()

    if (!userMessage?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const apiMessages = [
      ...(messages || [])
        .filter((m: { role: string; content: string }) => m.content?.trim())
        .map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      { role: "user" as const, content: userMessage },
    ]

    const stream = await anthropic.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: COUNSELOR_SYSTEM_PROMPT,
      messages: apiMessages,
    })

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text))
          }
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("AI Chat error:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
