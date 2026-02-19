"use client"

import { useEffect } from "react"
import { ThreeBackground } from "@/components/three-background"
import { DualFunnelChatbot } from "@/components/chatbot/DualFunnelChatbot"
import { sendMetaConversionEvent, getMetaBrowserId, getMetaClickId } from "@/lib/meta-conversion"

export default function Home() {
  useEffect(() => {
    const sendViewContentEvent = async () => {
      try {
        await sendMetaConversionEvent({
          eventName: "ViewContent",
          eventSourceUrl: window.location.href,
          userAgent: navigator.userAgent,
          fbp: getMetaBrowserId() ?? undefined,
          fbc: getMetaClickId() ?? undefined,
        })
      } catch (error) {
        console.error("[dual-funnel] Meta ViewContent error:", error)
      }
    }

    sendViewContentEvent()
  }, [])

  return (
    <main className="min-h-screen font-sans relative">
      <ThreeBackground />
      <DualFunnelChatbot />
    </main>
  )
}
