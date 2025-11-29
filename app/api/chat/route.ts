import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json()
        const apiKey = process.env.GEMINI_API_KEY

        if (!apiKey) {
            return NextResponse.json(
                { error: "Gemini API key is not configured" },
                { status: 500 }
            )
        }

        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        })

        // System instruction can be added here or prepended to the message if the model supports it directly or via prompt engineering.
        // For now, we'll just send the user message as is, or we could add a system prompt to the history if it was a fresh chat.
        // Since we are using startChat, we rely on the history.

        // Note: Gemini 2.0 might support system instructions in a specific way, but for now standard usage is fine.
        // If we wanted to enforce a persona, we could prepend it to the first message or use the systemInstruction property if available in the SDK version.
        // The user said "counseling prompt will be given later", so we keep it simple.

        const result = await chat.sendMessage(message)
        const response = await result.response
        const text = response.text()

        return NextResponse.json({ text })
    } catch (error) {
        console.error("Gemini API Error:", error)
        return NextResponse.json(
            { error: "Failed to process the request" },
            { status: 500 }
        )
    }
}
