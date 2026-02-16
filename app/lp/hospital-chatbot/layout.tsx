import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "병원 전용 AI 챗봇 | 30일 무료 체험 - LumiBreeze",
  description:
    "할루시네이션 제로, 의료법 준수, 우리 병원 DB 기반 RAG 챗봇. 24시간 환자 응대, 예약 전환율 47% 향상.",
  robots: "noindex, nofollow",
}

export default function HospitalChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
