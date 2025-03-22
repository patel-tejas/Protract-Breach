"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Send, User, Bot, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AIChatProps {
  userProfile: {
    investmentCapital: string
    riskTolerance: string
    timeHorizon: string
    investmentGoals: string
  }
}

export default function AIChat({ userProfile }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hello! I'm your AI investment advisor. Based on your profile (Investment: $${userProfile.investmentCapital}, Risk: ${userProfile.riskTolerance}, Time Horizon: ${userProfile.timeHorizon}), how can I help with your investment goals today?`,
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      generateAIResponse(input, userProfile)
    }, 1000)
  }

  const generateAIResponse = (query: string, profile: AIChatProps["userProfile"]) => {
    let response = ""

    // Simple rule-based responses based on user query and profile
    if (query.toLowerCase().includes("stock") || query.toLowerCase().includes("stocks")) {
      if (profile.riskTolerance === "High") {
        response =
          "Based on your high risk tolerance, you might consider growth stocks in sectors like technology or emerging markets. Companies like Tesla, NVIDIA, or Amazon could be suitable, but remember to diversify your portfolio."
      } else if (profile.riskTolerance === "Medium") {
        response =
          "With your medium risk tolerance, a balanced approach to stocks would be appropriate. Consider blue-chip stocks like Microsoft, Apple, or Johnson & Johnson, combined with some dividend-paying stocks for income."
      } else {
        response =
          "Given your low risk tolerance, focus on stable, dividend-paying stocks in sectors like utilities, consumer staples, or healthcare. Companies like Procter & Gamble, Coca-Cola, or Verizon could be suitable."
      }
    } else if (query.toLowerCase().includes("bond") || query.toLowerCase().includes("bonds")) {
      if (profile.timeHorizon === "2 years") {
        response =
          "For a 2-year horizon, consider short-term bonds or bond ETFs to minimize interest rate risk. Treasury bonds or high-quality corporate bonds could be appropriate."
      } else {
        response =
          "For your shorter time horizon, focus on very short-term bonds or even money market funds to preserve capital while earning some interest."
      }
    } else if (query.toLowerCase().includes("crypto") || query.toLowerCase().includes("bitcoin")) {
      if (profile.riskTolerance === "High") {
        response =
          "Cryptocurrency can be highly volatile. With your high risk tolerance, you might allocate a small portion (5-10%) of your portfolio to established cryptocurrencies like Bitcoin or Ethereum, but be prepared for significant price swings."
      } else {
        response =
          "Given your risk profile, cryptocurrency might be too volatile. If you're still interested, consider only a very small allocation (1-2% of your portfolio) to established cryptocurrencies."
      }
    } else if (query.toLowerCase().includes("etf") || query.toLowerCase().includes("fund")) {
      response = "ETFs are excellent for diversification. Based on your profile, you might consider "
      if (profile.riskTolerance === "High") {
        response += "sector-specific ETFs in technology, healthcare, or emerging markets like VGT, XLV, or VWO."
      } else if (profile.riskTolerance === "Medium") {
        response += "broad market ETFs like VOO (S&P 500), VTI (Total US Market), or a balanced ETF like AOR."
      } else {
        response += "bond-heavy ETFs like BND, conservative allocation ETFs like AOK, or dividend ETFs like VYM."
      }
    } else if (query.toLowerCase().includes("diversif")) {
      response = `Diversification is crucial for managing risk. With your ${profile.riskTolerance.toLowerCase()} risk tolerance and ${profile.timeHorizon} time horizon, I'd recommend a portfolio with `
      if (profile.riskTolerance === "High") {
        response += "70-80% stocks, 10-20% bonds, and perhaps 5-10% in alternative investments."
      } else if (profile.riskTolerance === "Medium") {
        response += "50-60% stocks, 30-40% bonds, and 5-10% in cash or cash equivalents."
      } else {
        response += "30-40% stocks, 50-60% bonds, and 10-20% in cash or cash equivalents."
      }
    } else {
      response = `Based on your investment profile ($${profile.investmentCapital} capital, ${profile.riskTolerance.toLowerCase()} risk tolerance, ${profile.timeHorizon} time horizon), I'd recommend a diversified portfolio aligned with your ${profile.investmentGoals.toLowerCase()} goals. Would you like specific recommendations for stocks, bonds, ETFs, or other investment vehicles?`
    }

    setMessages((prev) => [...prev, { role: "assistant", content: response }])
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 mx-2 ${
                    message.role === "user" ? "bg-primary" : "bg-fintech-black-800"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <Card
                  className={`${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-fintech-black-900"
                  }`}
                >
                  <CardContent className="p-3">
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex flex-row">
                <div className="flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 mx-2 bg-fintech-black-800">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <Card className="bg-fintech-black-900">
                  <CardContent className="p-3">
                    <div className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-fintech-black-800">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about investment strategies..."
            className="flex-1 rounded-md border border-fintech-black-800 bg-fintech-black-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

