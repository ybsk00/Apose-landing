// Meta Conversions API helper functions

export async function hashSHA256(text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(text.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}

export interface MetaConversionEventData {
  eventName: string
  eventSourceUrl: string
  userAgent: string
  ipAddress?: string
  email?: string
  phone?: string
  fbp?: string
  fbc?: string
}

export async function sendMetaConversionEvent(data: MetaConversionEventData) {
  try {
    const response = await fetch("/api/meta-conversion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Meta Conversion API error: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("[v0] Meta Conversion API response:", result)
    return result
  } catch (error) {
    console.error("[v0] Meta Conversion API error:", error)
    throw error
  }
}

export function getMetaClickId(): string | null {
  if (typeof window === "undefined") return null
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get("fbclid")
}

export function getMetaBrowserId(): string | null {
  if (typeof window === "undefined") return null
  const cookies = document.cookie.split(";")
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=")
    if (name === "_fbp") {
      return value
    }
  }
  return null
}
