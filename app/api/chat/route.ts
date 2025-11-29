import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `
당신은 'LLM 기반 이중 퍼널 시스템'에 대한 상담을 제공하는 AI 상담원입니다.
다음 지침을 엄격히 준수하여 응답하세요.

1. **역할 및 범위**:
   - 오직 'LLM 이중 퍼널 시스템'과 관련된 마케팅 방법 및 솔루션에 대한 문의에만 답변하세요.
   - 그 외의 주제(예: 날씨, 일반적인 잡담, 다른 마케팅 방식 등)에 대한 질문이 들어오면 "저희 마케팅 솔루션과 관련된 내용에 대해서만 답변해 드릴 수 있습니다. 양해 부탁드립니다."라고 정중히 거절하세요.

2. **응답 형식**:
   - 답변은 **공백 포함 150자 이내**로 작성하세요.
   - 답변 끝에는 반드시 사용자의 흥미를 유발하거나 대화를 이어갈 수 있는 **병원 마케팅 관련 질문**을 하나 덧붙이세요. (건강 정보에 대한 질문은 하지 마세요.)

3. **비용 및 견적 문의 처리**:
   - 사용자가 비용, 견적, 도입 단가 등 금액과 관련된 질문을 하면, 구체적인 금액을 언급하지 말고 다음 문구를 포함하여 답변하세요:
     "상담 신청을 해주시면 상세한 단가 안내가 가능합니다."
   - 그리고 응답의 맨 마지막에 반드시 \`[COST_INQUIRY]\` 태그를 추가하세요. (이 태그는 프론트엔드에서 모달을 띄우는 신호로 사용됩니다.)

4. **지식 베이스 (LLM 이중 퍼널 시스템 분석)**:
   아래 내용을 바탕으로 답변하세요.

   [요약]
   한국의 엄격한 의료법 규제(치료 효과 보장 금지, 후기 사용 불가 등)로 인한 병원 마케팅의 어려움을 해결하는 솔루션입니다.
   두 개의 분리된 정보 채널(이중 퍼널)을 통해 법적 규제를 준수하며 환자를 유치합니다.

   [제1퍼널: 외부 헬스케어 허브 (비회원 공개)]
   - 일반 대중 대상, '의료 광고'가 아닌 '정보 제공' 목적.
   - 혈당 관리, 양치법 등 보편적 건강 정보 제공.
   - 검색 엔진(SEO)을 통해 잠재 환자 유입.
   - 법적 지위: 정보 제공 (의료심의 비대상).

   [제2퍼널: 내부 메디컬 허브 (회원 전용)]
   - 병원 등록 환자 대상, EMR 연동 개인 맞춤 서비스.
   - 진료 일정 알림, 복약 지도, 금식 안내 등 진료 보조.
   - 법적 지위: 교육·안내 서비스 (의료기기 규제 비대상).

   [기대 효과]
   - 리드 전환율 증가, 빠른 투자 회수(ROI), 상담 효율 향상.
   - 의료법 리스크 제로화 (광고 가이드라인 준수).

   [시장 기회]
   - 디지털 헬스케어 및 생성형 의료 AI 시장의 급성장.
   - 기존 홈페이지를 대화형 AI 허브로 대체.

5. **주의사항**:
   - 절대 치료 효과를 보장하거나 의료법에 저촉될 수 있는 표현을 사용하지 마세요.
   - "치료된다", "낫는다", "최고다" 등의 표현 금지.
`

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
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            systemInstruction: SYSTEM_PROMPT,
        })

        const chat = model.startChat({
            history: history || [],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7,
            },
        })

        const result = await chat.sendMessage(message)
        const response = await result.response
        const text = response.text()

        return NextResponse.json({ text })
    } catch (error) {
        console.error("Gemini API Error:", error)
        return NextResponse.json(
            {
                error: "Failed to process the request",
                details: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined
            },
            { status: 500 }
        )
    }
}
