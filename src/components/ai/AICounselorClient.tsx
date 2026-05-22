"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface Message {
  role: "user" | "assistant"
  content: string
}

const LEAD_GATE_AFTER = 3

export default function AICounselorClient({ starterQuestions }: { starterQuestions: string[] }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Aarav, your AI career counselor for Pune colleges 👋\n\nI can help you with:\n• College selection based on your scores & budget\n• Entrance exam strategy (JEE, MHT-CET, CAT, NEET)\n• Career path planning and industry trends\n• Scholarship eligibility\n• Honest college comparisons\n\nWhat's on your mind? Tell me your situation and I'll give you straight-up advice.",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showLeadGate, setShowLeadGate] = useState(false)
  const [userMessageCount, setUserMessageCount] = useState(0)
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [leadName, setLeadName] = useState("")
  const [leadPhone, setLeadPhone] = useState("")
  const [leadSubmitting, setLeadSubmitting] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  // Listen for starter question clicks (from parent page)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest("[data-question]")
      if (btn) {
        const q = btn.getAttribute("data-question")
        if (q) sendMessage(q)
      }
    }
    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, userMessageCount])

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim()
    if (!content || loading) return

    // Check lead gate
    if (userMessageCount >= LEAD_GATE_AFTER && !leadSubmitted) {
      setInput("")
      setShowLeadGate(true)
      return
    }

    setInput("")
    setLoading(true)
    const newMessages: Message[] = [...messages, { role: "user", content }]
    setMessages(newMessages)
    setUserMessageCount(c => c + 1)

    try {
      const res = await fetch("/api/counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      if (data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }])
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again in a moment." }])
    } finally {
      setLoading(false)
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadName || !leadPhone) return
    setLeadSubmitting(true)
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: leadName, phone: leadPhone, source: "ai_counselor", context: "AI Career Counselor" }),
      })
    } catch { /* silent */ }
    setLeadSubmitted(true)
    setShowLeadGate(false)
    setLeadSubmitting(false)
    setMessages(prev => [...prev, {
      role: "assistant",
      content: `Thanks ${leadName}! I've noted your contact details. Our team will also follow up with personalized college advice.\n\nNow, what else would you like to know? You can continue chatting — I'm here to help!`,
    }])
  }

  const formatMessage = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1A3A5F] px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-base">🤖</div>
        <div className="flex-1">
          <p className="font-extrabold text-white text-sm">Aarav — AI Career Counselor</p>
          <p className="text-[11px] text-blue-300">Powered by Claude AI · Pune college specialist</p>
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      {/* Messages */}
      <div className="h-[420px] overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-xs shrink-0 mt-0.5">🤖</div>
            )}
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-orange-500 text-white rounded-tr-sm"
                : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm"
            }`}>
              {formatMessage(msg.content)}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-xs shrink-0">🤖</div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}

        {/* Lead gate overlay */}
        {showLeadGate && (
          <div className="bg-white border-2 border-orange-200 rounded-2xl p-5 shadow-lg">
            <div className="text-center mb-4">
              <span className="text-3xl">🎯</span>
              <h3 className="font-extrabold text-gray-900 mt-2">Loving the advice?</h3>
              <p className="text-xs text-gray-500 mt-1">Enter your details to continue chatting + get a free callback from our counsellors</p>
            </div>
            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <input type="text" placeholder="Your Name" value={leadName} onChange={e => setLeadName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <input type="tel" placeholder="WhatsApp / Phone Number" value={leadPhone} onChange={e => setLeadPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" required />
              <button type="submit" disabled={leadSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50">
                {leadSubmitting ? "Saving…" : "Continue Chatting →"}
              </button>
              <button type="button" onClick={() => { setShowLeadGate(false); setLeadSubmitted(true) }}
                className="w-full text-xs text-gray-400 hover:text-gray-600 py-1">
                Skip for now
              </button>
            </form>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-3 bg-white">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder="Ask about Pune colleges, courses, exams, career paths…"
            rows={1}
            className="flex-1 resize-none border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 max-h-28"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="shrink-0 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-200 text-white rounded-xl p-2.5 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 text-center mt-2">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  )
}
