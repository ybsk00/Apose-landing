"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Message {
  role: "user" | "model"
  content: string
}

export function GeminiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "안녕하세요! 병원 마케팅과 관련하여 궁금한 점이 있으신가요? 무엇이든 물어보세요.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [turnCount, setTurnCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages])

  // Check turn count for modal trigger
  useEffect(() => {
    if ([3, 5, 8, 10].includes(turnCount)) {
      setShowModal(true)
    }
  }, [turnCount])

  const handleConsultationClick = () => {
    setShowModal(false)
    const formElement = document.getElementById("consultation-form")
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    // Increment turn count on user message
    setTurnCount(prev => prev + 1)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(1).map(m => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.content }]
          }))
        }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      let responseText = data.text

      // Check for cost inquiry flag
      if (responseText.includes("[COST_INQUIRY]")) {
        responseText = responseText.replace("[COST_INQUIRY]", "").trim()
        setTimeout(() => {
          setShowModal(true)
        }, 2000)
      }

      setMessages((prev) => [...prev, { role: "model", content: responseText }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto shadow-xl border-primary/20">
        <CardHeader className="bg-primary/5 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle>24시간 마케팅 상담</CardTitle>
              <CardDescription>혁신적인 병원마케팅 방법에 대해서 궁금하신 점이 있으신가요? 무엇이든지 물어보세요</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-3 max-w-[80%]",
                    message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    {message.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 mr-auto max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-2 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">답변을 생성하고 있습니다...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t bg-background/50 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              placeholder="궁금한 내용을 입력하세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span className="sr-only">전송</span>
            </Button>
          </form>
        </CardFooter>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>전문가와 상담해보세요</DialogTitle>
            <DialogDescription>
              더 상세한 상담과 맞춤형 솔루션 제안을 위해 상담 신청을 권장드립니다.
              전문 컨설턴트가 빠르게 연락드리겠습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={handleConsultationClick} className="w-full sm:w-auto">
              상담 신청하러 가기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
