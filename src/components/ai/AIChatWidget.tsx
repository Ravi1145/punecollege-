"use client"
import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Minimize2, Maximize2, Send, Sparkles, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const QUICK_QUESTIONS = [
  "Best BTech college in Pune?",
  "MBA fees at SIBM?",
  "Top placement colleges?",
  "COEP vs VIT Pune?",
]

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI Pune college counselor. Ask me anything about colleges, fees, placements, or admissions in Pune. 🎓",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, assistantMessage])

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.slice(1).map((m) => ({ role: m.role, content: m.content })),
          userMessage: messageText,
        }),
      })

      if (!response.ok) throw new Error("API error")

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        let accumulated = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value, { stream: true })
          accumulated += chunk
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id ? { ...m, content: accumulated } : m
            )
          )
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, content: "Sorry, I'm having trouble connecting. Please try again or call the college directly." }
            : m
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-20 right-4 sm:right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col transition-all duration-200",
            isMinimized ? "w-72 h-14" : "w-80 sm:w-96 h-[520px]"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">AI College Counselor</p>
                {!isMinimized && (
                  <p className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Online
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/60 hover:text-white p-1 rounded"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-2",
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                        message.role === "user"
                          ? "bg-orange-500"
                          : "bg-gradient-to-br from-[#0A1628] to-[#1E3A5F]"
                      )}
                    >
                      {message.role === "user" ? (
                        <User className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                        message.role === "user"
                          ? "bg-orange-500 text-white rounded-tr-sm"
                          : "bg-gray-100 text-gray-800 rounded-tl-sm"
                      )}
                    >
                      {message.content || (
                        <div className="flex items-center gap-1 py-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs bg-orange-50 text-orange-700 border border-orange-100 px-2.5 py-1 rounded-full hover:bg-orange-100 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 rounded-xl border border-gray-200 focus-within:border-orange-300 px-3 py-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about any Pune college..."
                    className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isLoading}
                    className="w-7 h-7 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-center text-xs text-gray-400 mt-2">
                  Powered by <span className="font-medium text-orange-500">Claude AI</span>
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => { setIsOpen(true); setIsMinimized(false) }}
        className={cn(
          "fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-200",
          isOpen && "hidden"
        )}
        aria-label="Open AI Chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </>
  )
}
