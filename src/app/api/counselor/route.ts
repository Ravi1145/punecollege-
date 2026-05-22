import { NextRequest, NextResponse } from "next/server"
import { anthropic } from "@/lib/anthropic"

export const runtime = "nodejs"

const SYSTEM_PROMPT = `You are Aarav, an expert AI career counselor specializing in Pune colleges and Indian higher education. You help students make smart decisions about:
- Which college and course to choose based on their goals and scores
- Career paths in engineering, MBA, medical, law, design, and other streams
- Entrance exam strategy (JEE, MHT-CET, CAT, SNAP, NEET, CLAT)
- Scholarship opportunities and financial planning
- College comparisons (COEP, MIT-WPU, PICT, VIT Pune, Symbiosis, Fergusson, etc.)
- Industry trends and placement data for Pune colleges

Guidelines:
- Be warm, direct, and specific — give real advice, not generic platitudes
- Always ground answers in current 2026 data about Pune colleges
- When comparing colleges, use actual numbers (fees, placements, NIRF ranks)
- Keep responses concise (under 200 words) unless the question requires depth
- If a student seems confused or distressed, be empathetic before being analytical
- End each response with a specific, actionable follow-up question to deepen the conversation
- Never recommend a specific college without knowing the student's scores, budget, and goals`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    })

    const text = message.content[0].type === "text" ? message.content[0].text : ""
    return NextResponse.json({ reply: text })
  } catch (error) {
    console.error("Counselor error:", error)
    return NextResponse.json({ error: "Failed to get response" }, { status: 500 })
  }
}
