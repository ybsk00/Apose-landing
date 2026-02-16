"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { sendMetaConversionEvent, getMetaBrowserId, getMetaClickId } from "@/lib/meta-conversion"
import {
  ShieldCheck,
  Scale,
  Database,
  Clock,
  CalendarCheck,
  FileText,
  Brain,
  Rocket,
  ChevronDown,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight,
  X,
  AlertTriangle,
} from "lucide-react"

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void
    fbq?: (command: string, eventName: string, params?: Record<string, unknown>) => void
  }
}

// --- 폼으로 스크롤 ---
function scrollToForm() {
  const formEl = document.getElementById("cta-form")
  if (formEl) {
    formEl.scrollIntoView({ behavior: "smooth", block: "center" })
  }
}

// =============================================
// 섹션 0: 스티키 탑 바
// =============================================
function StickyTopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 md:px-8 bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-white/5">
      <span className="text-sm font-semibold text-white/80 tracking-wide select-none">
        LumiBreeze
      </span>
      <button
        onClick={scrollToForm}
        className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-teal-500 to-cyan-400 text-white hover:from-teal-400 hover:to-cyan-300 transition-all shadow-lg shadow-teal-500/20"
      >
        무료 체험 신청
      </button>
    </header>
  )
}

// =============================================
// 섹션 1: Hero
// =============================================
function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        {/* 태그라인 */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
          <span className="text-teal-400 text-sm font-medium">병원 전용 AI 챗봇</span>
        </div>

        {/* 헤드라인 */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6" style={{ wordBreak: "keep-all" }}>
          환자가 질문하면{" "}
          <br className="hidden md:block" />
          <span className="text-gradient-animate">AI가 우리 병원 정보로만</span>{" "}
          <br className="hidden md:block" />
          답변합니다
        </h1>

        {/* 서브카피 */}
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto" style={{ wordBreak: "keep-all" }}>
          일반 ChatGPT는 우리 병원을 모릅니다.
          <br />
          진료과목, 의료진, 진료시간, 시술 가격 —
          <br />
          병원 DB 기반 챗봇이 24시간 정확하게 안내합니다.
        </p>

        {/* CTA 버튼 */}
        <button
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 text-white hover:from-teal-400 hover:to-cyan-300 transition-all shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5"
        >
          30일 무료 체험 신청하기
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* 신뢰 마이크로카피 */}
        <p className="mt-4 text-sm text-gray-500">
          설치비 0원 · 5분 세팅 · 30일 무료
        </p>
      </div>
    </section>
  )
}

// =============================================
// 섹션 2: 문제 제기
// =============================================
const problems = [
  {
    icon: Phone,
    title: "진료시간 문의가 하루 30건 이상",
    desc: "야간·주말에도 전화가 울리지만, 받을 수 없어 환자를 놓치고 있습니다.",
  },
  {
    icon: MessageCircle,
    title: "블로그 챗봇은 엉뚱한 답변",
    desc: "일반 AI 챗봇은 우리 병원 정보가 없어서 잘못된 진료과목, 없는 의료진을 안내합니다.",
  },
  {
    icon: AlertTriangle,
    title: "의료법 위반 우려",
    desc: "AI가 효능·효과를 언급하면 의료광고 심의 위반. 과태료 리스크가 있습니다.",
  },
]

function ProblemSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12" style={{ wordBreak: "keep-all" }}>
          이런 상황, 겪고 계시지 않나요?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div key={i} className="glass-card p-6 md:p-8">
              <div className="icon-container mb-4">
                <p.icon className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ wordBreak: "keep-all" }}>
                {p.title}
              </h3>
              <p className="text-gray-400 leading-relaxed" style={{ wordBreak: "keep-all" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================
// 섹션 3: 솔루션
// =============================================
const solutions = [
  {
    icon: ShieldCheck,
    title: "할루시네이션 제로",
    desc: "우리 병원 DB에 있는 정보만 답변합니다. 없는 정보는 \"확인 후 안내드리겠습니다\"로 응답합니다.",
  },
  {
    icon: Scale,
    title: "의료법 100% 준수",
    desc: "효능·효과 표현, 비교 광고, 치료 보장 표현을 자동으로 필터링합니다. 의료광고 심의 위반 리스크 제로.",
  },
  {
    icon: Database,
    title: "우리 병원 전용 DB",
    desc: "진료과목, 의료진, 진료시간, 시술 항목, 가격, 위치, 주차 정보까지. 병원 맞춤 지식 DB를 구축합니다.",
  },
  {
    icon: Clock,
    title: "24시간 환자 응대",
    desc: "야간·주말·공휴일에도 환자 문의에 즉시 응답합니다. 평균 응답 시간 3초.",
  },
  {
    icon: CalendarCheck,
    title: "문의를 예약으로 전환",
    desc: "증상 안내 → 적합 진료과 추천 → 예약 유도까지 자동으로 진행합니다.",
  },
]

function SolutionSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4" style={{ wordBreak: "keep-all" }}>
          병원 전용 AI 챗봇은 다릅니다
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto" style={{ wordBreak: "keep-all" }}>
          우리 병원 데이터만 학습한 AI가 환자에게 정확한 정보를 안내합니다
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <div key={i} className="glass-card p-6 md:p-8">
              <div className="icon-container mb-4">
                <s.icon className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ wordBreak: "keep-all" }}>
                {s.title}
              </h3>
              <p className="text-gray-400 leading-relaxed" style={{ wordBreak: "keep-all" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 중간 CTA */}
        <div className="text-center mt-12">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 text-white hover:from-teal-400 hover:to-cyan-300 transition-all shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5"
          >
            무료 데모 신청하기
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

// =============================================
// 섹션 4: 성과 지표
// =============================================
const stats = [
  { value: "93%", label: "자동 응답률", desc: "환자 문의를 AI가 자동 처리" },
  { value: "3초", label: "평균 응답 시간", desc: "환자 대기 시간 제로" },
  { value: "47%↑", label: "예약 전환율 향상", desc: "문의 → 예약 전환율 증가" },
  { value: "2주", label: "구축 완료 기간", desc: "상담부터 운영 시작까지" },
]

function StatsSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12" style={{ wordBreak: "keep-all" }}>
          도입 병원의 실제 성과
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="glass-card-static p-6 text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-gradient-animate mb-2">
                {s.value}
              </div>
              <div className="text-white font-semibold mb-1">{s.label}</div>
              <div className="text-sm text-gray-500">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================
// 섹션 5: 도입 전/후 비교
// =============================================
const comparisons = [
  {
    before: "진료시간 문의에 직원이 직접 응대",
    after: "AI가 24시간 자동 응답",
  },
  {
    before: "일반 챗봇이 엉뚱한 병원 정보 안내",
    after: "우리 병원 DB 기반 정확한 답변",
  },
  {
    before: "의료법 위반 우려로 AI 도입 망설임",
    after: "의료광고 필터 적용, 합법적 운영",
  },
  {
    before: "야간/주말 문의 → 환자 이탈",
    after: "24시간 응대 → 예약 전환",
  },
  {
    before: "홈페이지 방문자 → 그냥 이탈",
    after: "챗봇 상담 → 예약 완료",
  },
]

function ComparisonSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12" style={{ wordBreak: "keep-all" }}>
          도입 전 vs 도입 후
        </h2>
        <div className="space-y-4">
          {comparisons.map((c, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* 도입 전 */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/15">
                <X className="w-5 h-5 text-red-400 shrink-0" />
                <span className="text-gray-300" style={{ wordBreak: "keep-all" }}>{c.before}</span>
              </div>
              {/* 도입 후 */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-teal-500/5 border border-teal-500/15">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                <span className="text-white font-medium" style={{ wordBreak: "keep-all" }}>{c.after}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================
// 섹션 6: 구축 프로세스
// =============================================
const steps = [
  {
    icon: FileText,
    step: "Step 1",
    title: "병원 정보 입력",
    desc: "진료과목, 의료진, 진료시간, 시술/가격 정보를 입력합니다.",
  },
  {
    icon: Brain,
    step: "Step 2",
    title: "AI 학습 자동 완료",
    desc: "입력된 정보를 자동으로 학습하고 지식 DB를 구축합니다.",
  },
  {
    icon: Rocket,
    step: "Step 3",
    title: "홈페이지에 챗봇 설치",
    desc: "1줄 코드만 삽입하면 바로 운영이 시작됩니다.",
  },
]

function ProcessSection() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12" style={{ wordBreak: "keep-all" }}>
          5분이면 세팅 완료
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="glass-card p-6 md:p-8 text-center relative">
              {/* 연결선 (데스크톱) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-teal-500/50 to-transparent" />
              )}
              <div className="text-xs font-semibold text-teal-400 mb-3 tracking-widest uppercase">
                {s.step}
              </div>
              <div className="icon-container mx-auto mb-4">
                <s.icon className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ wordBreak: "keep-all" }}>
                {s.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed" style={{ wordBreak: "keep-all" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================
// 섹션 7: 챗봇 데모 미리보기
// =============================================
const demoMessages = [
  { role: "patient" as const, text: "피부과 진료시간이 어떻게 되나요?" },
  {
    role: "bot" as const,
    text: "피부과 진료시간 안내드립니다.\n\n• 평일: 오전 9시 ~ 오후 6시\n• 토요일: 오전 9시 ~ 오후 1시\n• 일요일/공휴일: 휴진\n\n예약을 도와드릴까요?",
  },
  { role: "patient" as const, text: "네, 이번 주 토요일 오전에 예약하고 싶어요" },
  {
    role: "bot" as const,
    text: "토요일 오전 예약 가능한 시간은\n10:00, 10:30, 11:00입니다.\n원하시는 시간을 선택해 주세요.",
  },
]

function ChatDemoSection() {
  const [visibleMessages, setVisibleMessages] = useState(0)

  useEffect(() => {
    if (visibleMessages >= demoMessages.length) return
    const timer = setTimeout(() => {
      setVisibleMessages((prev) => prev + 1)
    }, 1200)
    return () => clearTimeout(timer)
  }, [visibleMessages])

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12" style={{ wordBreak: "keep-all" }}>
          실제 챗봇 대화를 확인하세요
        </h2>

        {/* 챗봇 UI 목업 */}
        <div className="glass-card-static p-4 md:p-6">
          {/* 챗봇 헤더 */}
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">AI 상담 챗봇</div>
              <div className="text-xs text-teal-400">온라인</div>
            </div>
          </div>

          {/* 메시지 영역 */}
          <div className="space-y-4 min-h-[300px]">
            {demoMessages.slice(0, visibleMessages).map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "patient" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "patient"
                      ? "bg-teal-500/20 text-white rounded-br-md"
                      : "bg-white/5 text-gray-200 rounded-bl-md"
                  }`}
                  style={{ wordBreak: "keep-all" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {visibleMessages < demoMessages.length && (
              <div className="flex justify-start">
                <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button
            onClick={scrollToForm}
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 text-white hover:from-teal-400 hover:to-cyan-300 transition-all shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5"
          >
            우리 병원에도 적용하기
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

// =============================================
// 섹션 8: FAQ
// =============================================
const faqs = [
  {
    q: "우리 병원에 맞게 설정할 수 있나요?",
    a: "네, 병원별로 독립된 지식 DB를 구축합니다. 진료과목, 의료진 정보, 시술 항목, 가격, 진료시간 등을 병원에 맞게 설정할 수 있습니다.",
  },
  {
    q: "환자가 AI라는 걸 알면 거부감이 있지 않을까요?",
    a: "실제 도입 병원에서 환자의 89%가 'AI 응답에 만족한다'고 답했습니다. 정확하고 빠른 응답이 핵심입니다.",
  },
  {
    q: "의료법 위반 문제는 없나요?",
    a: "의료광고 심의 가이드라인에 맞춰 효능/효과 표현, 비교 광고, 치료 보장 표현을 자동 필터링합니다. 병원 DB에 입력된 사실 정보만 응답하므로 위반 리스크가 없습니다.",
  },
  {
    q: "비용은 얼마인가요?",
    a: "30일 무료 체험 후, 월 이용료로 운영됩니다. 병원 규모와 기능에 따라 맞춤 견적을 제공합니다. 무료 체험을 신청하시면 상세 안내드립니다.",
  },
]

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12" style={{ wordBreak: "keep-all" }}>
          자주 묻는 질문
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card-static overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-medium pr-4" style={{ wordBreak: "keep-all" }}>
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-5 text-gray-400 leading-relaxed" style={{ wordBreak: "keep-all" }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================
// 섹션 9: CTA 폼
// =============================================
function CTAFormSection() {
  const [formData, setFormData] = useState({
    privacyConsent: "",
    hospitalName: "",
    contactName: "",
    phone: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const createLead = useMutation(api.hospitalChatbotLeads.create)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.privacyConsent !== "yes") {
      alert("개인정보 제공에 동의해주셔야 신청이 가능합니다.")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await createLead({
        privacy_consent: true,
        hospital_name: formData.hospitalName,
        contact_name: formData.contactName,
        phone: formData.phone,
        email: formData.email,
      })

      // Google Ads 전환
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-16980195675",
          value: 1.0,
          currency: "KRW",
        })
      }

      // Meta Pixel Lead
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Hospital Chatbot Lead",
          content_category: "Hospital AI Chatbot",
          value: 0,
          currency: "KRW",
        })
      }

      // Meta Conversions API Lead
      try {
        await sendMetaConversionEvent({
          eventName: "Lead",
          eventSourceUrl: window.location.href,
          userAgent: navigator.userAgent,
          email: formData.email,
          phone: formData.phone,
          fbp: getMetaBrowserId() ?? undefined,
          fbc: getMetaClickId() ?? undefined,
        })
      } catch (conversionError) {
        console.error("[hospital-chatbot] Meta Conversions API error:", conversionError)
      }

      window.location.href = "/consult/complete"
    } catch (error) {
      console.error("[hospital-chatbot] 제출 오류:", error)
      setSubmitStatus("error")
      setIsSubmitting(false)
    }
  }

  const handleFormClick = () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_name: "Hospital Chatbot Form CTA",
        content_category: "Hospital AI Chatbot",
      })
    }
  }

  return (
    <section id="cta-form" className="py-16 md:py-24 px-4">
      <div className="max-w-xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ wordBreak: "keep-all" }}>
            30일 무료 체험 신청
          </h2>
          <p className="text-gray-400" style={{ wordBreak: "keep-all" }}>
            설치비 0원, 5분 세팅, 30일 무료 체험.
            <br />
            지금 신청하시면 24시간 내 세팅을 도와드립니다.
          </p>
        </div>

        <div className="glass-card-static p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 개인정보 제공 동의 */}
            <div className="space-y-3">
              <label className="block text-base font-semibold text-white">
                개인정보 제공에 동의합니까? <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="privacyConsent"
                    value="yes"
                    checked={formData.privacyConsent === "yes"}
                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.value })}
                    className="w-5 h-5 accent-teal-500 bg-white/10 border-white/20"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">예</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="privacyConsent"
                    value="no"
                    checked={formData.privacyConsent === "no"}
                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.value })}
                    className="w-5 h-5 accent-teal-500 bg-white/10 border-white/20"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors">아니오</span>
                </label>
              </div>
            </div>

            {/* 상호 */}
            <div className="space-y-2">
              <label htmlFor="hospitalName" className="block text-base font-medium text-white">
                상호 <span className="text-red-400">*</span>
              </label>
              <input
                id="hospitalName"
                type="text"
                placeholder="병원명을 입력해주세요"
                value={formData.hospitalName}
                onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all disabled:opacity-50"
              />
            </div>

            {/* 성명 */}
            <div className="space-y-2">
              <label htmlFor="contactName" className="block text-base font-medium text-white">
                성명 <span className="text-red-400">*</span>
              </label>
              <input
                id="contactName"
                type="text"
                placeholder="담당자 성함을 입력해주세요"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all disabled:opacity-50"
              />
            </div>

            {/* 전화번호 */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-base font-medium text-white">
                전화번호 <span className="text-red-400">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="010-0000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all disabled:opacity-50"
              />
            </div>

            {/* 이메일 */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-base font-medium text-white">
                이메일 <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@hospital.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all disabled:opacity-50"
              />
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleFormClick}
              className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-teal-500 to-cyan-400 hover:from-teal-400 hover:to-cyan-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/25"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  제출 중...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  상담 신청하기
                </span>
              )}
            </button>

            {submitStatus === "error" && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-center text-red-400 font-medium">
                  제출 중 오류가 발생했습니다. 다시 시도해주세요.
                </p>
              </div>
            )}
          </form>

          {/* 폼 하단 신뢰 문구 */}
          <div className="mt-6 space-y-1.5 text-center">
            <p className="text-xs text-gray-500">* 입력하신 정보는 상담 목적으로만 사용됩니다</p>
            <p className="text-xs text-gray-500">* 24시간 내 담당자가 연락드립니다</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// =============================================
// 섹션 10: 하단 회사 정보
// =============================================
function FooterSection() {
  return (
    <footer className="py-8 px-4 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-gray-500 leading-relaxed">
          주식회사 루미브리즈 | 대표 유범석 | lumibeeze00@gmail.com
          <br />
          경기도 하남시 미사강변서로 22, 에코큐브 지식산업센터 1005호
        </p>
      </div>
    </footer>
  )
}

// =============================================
// 모바일 하단 플로팅 CTA
// =============================================
function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 md:hidden bg-[#0a0f1a]/90 backdrop-blur-xl border-t border-white/5">
      <button
        onClick={scrollToForm}
        className="w-full py-3.5 rounded-xl font-bold text-base text-white bg-gradient-to-r from-teal-500 to-cyan-400 shadow-lg shadow-teal-500/25"
      >
        무료 신청
      </button>
    </div>
  )
}

// =============================================
// 메인 컴포넌트
// =============================================
export function HospitalChatbotLanding() {
  return (
    <div className="relative z-10">
      <StickyTopBar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <StatsSection />
      <ComparisonSection />
      <ProcessSection />
      <ChatDemoSection />
      <FAQSection />
      <CTAFormSection />
      <FooterSection />
      <FloatingCTA />
    </div>
  )
}
