import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"
import AIRecommender from "@/components/ai/AIRecommender"
import AIChatWidget from "@/components/ai/AIChatWidget"
import { Sparkles, Brain, MessageCircle, Users } from "lucide-react"

export const metadata: Metadata = genMeta({
  title: "AI College Finder Pune — Find Your Perfect College in Minutes",
  description: "Use our AI-powered college finder to discover the best matching college in Pune. Tell us your stream, budget, exam score and preferences — our AI analyzes 25+ colleges instantly.",
  path: "/ai-finder",
  keywords: ["ai college finder pune", "college recommendation pune", "best college for me pune"],
})

export default function AIFinderPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 text-sm font-medium px-4 py-2 rounded-full mb-5">
            <Sparkles className="w-4 h-4" />
            Powered by Claude AI
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">
            AI College Finder for Pune
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Stop second-guessing. Tell our AI your stream, budget, exam score, and career goals — get personalized college recommendations with match scores in seconds.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Brain, title: "Smart Analysis", desc: "AI analyzes 25+ colleges against your profile" },
              { icon: Sparkles, title: "Match Score", desc: "Get % match score for each recommended college" },
              { icon: MessageCircle, title: "AI Counselor", desc: "Chat with our AI for personalized advice" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/10 rounded-2xl p-4 text-left">
                <Icon className="w-6 h-6 text-orange-400 mb-2" />
                <p className="text-white font-semibold text-sm">{title}</p>
                <p className="text-gray-400 text-xs mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommender */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AIRecommender />
      </div>

      {/* Chat Section */}
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageCircle className="w-10 h-10 text-orange-400 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white mb-2">Need More Help?</h2>
          <p className="text-gray-400 mb-6">
            Our AI counselor is available 24/7 to answer specific questions about any Pune college — fees, cutoffs, hostel, placements, and more.
          </p>
          <p className="text-orange-300 font-medium">
            💬 Click the chat bubble in the bottom-right corner to start chatting with our AI counselor
          </p>
        </div>
      </div>
    </div>
  )
}
