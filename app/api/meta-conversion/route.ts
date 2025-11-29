import { type NextRequest, NextResponse } from "next/server"
import { hashSHA256 } from "@/lib/meta-conversion"

const META_PIXEL_ID = process.env.META_PIXEL_ID || "24138350019134425"
const META_API_TOKEN = process.env.META_CONVERSION_API_TOKEN
const META_API_VERSION = "v18.0"

export async function POST(request: NextRequest) {
  try {
    if (!META_API_TOKEN) {
      console.error("[v0] META_CONVERSION_API_TOKEN is not set")
      return NextResponse.json({ error: "Meta API token not configured" }, { status: 500 })
    }

    const body = await request.json()
    const { eventName, eventSourceUrl, userAgent, ipAddress, email, phone, fbp, fbc } = body

    // Generate event_id for deduplication
    const eventId = `${Date.now()}-${Math.random().toString(36).substring(7)}`
    const eventTime = Math.floor(Date.now() / 1000)

    // Hash user data
    const userData: Record<string, unknown> = {
      client_user_agent: userAgent,
    }

    if (ipAddress) {
      userData.client_ip_address = ipAddress
    }

    if (email) {
      userData.em = [await hashSHA256(email)]
    }

    if (phone) {
      // Remove all non-numeric characters
      const cleanPhone = phone.replace(/\D/g, "")
      userData.ph = [await hashSHA256(cleanPhone)]
    }

    if (fbp) {
      userData.fbp = fbp
    }

    if (fbc) {
      userData.fbc = fbc
    }

    // Prepare payload
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: eventTime,
          event_id: eventId,
          action_source: "website",
          event_source_url: eventSourceUrl,
          user_data: userData,
        },
      ],
    }

    console.log("[v0] Sending Meta Conversion API event:", eventName)

    // Send to Meta Conversions API
    const metaResponse = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${META_API_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    )

    const metaResult = await metaResponse.json()

    if (!metaResponse.ok) {
      console.error("[v0] Meta API error:", metaResult)
      return NextResponse.json({ error: "Meta API request failed", details: metaResult }, { status: 500 })
    }

    console.log("[v0] Meta Conversion API success:", metaResult)

    return NextResponse.json({
      success: true,
      eventId,
      metaResponse: metaResult,
    })
  } catch (error) {
    console.error("[v0] Meta Conversion API error:", error)
    return NextResponse.json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
