"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { sendMetaConversionEvent, getMetaBrowserId, getMetaClickId } from "@/lib/meta-conversion"
import {
    chatScript,
    costBranchMessages,
    TYPING_SPEED,
    MESSAGE_DELAY,
    TYPING_INDICATOR_DELAY,
    type ScriptMessage,
    type Speaker,
} from "@/lib/chatScriptFunnel"
import {
    Zap,
    BookOpen,
    ChevronDown,
    CheckCircle2,
    Stethoscope,
    BriefcaseBusiness,
} from "lucide-react"

declare global {
    interface Window {
        gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void
        fbq?: (command: string, eventName: string, params?: Record<string, unknown>) => void
    }
}

// =============================================
// 아바타 컴포넌트
// =============================================
function Avatar({ speaker }: { speaker: Speaker }) {
    const isHospital = speaker === 'hospital'

    return (
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 shrink-0 ${isHospital
            ? 'border-amber-400/50 bg-gradient-to-br from-amber-500/30 to-orange-500/30 shadow-lg shadow-amber-500/20'
            : 'border-cyan-400/50 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 shadow-lg shadow-cyan-500/20'
            }`}>
            {isHospital
                ? <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
                : <BriefcaseBusiness className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
            }
        </div>
    )
}

// =============================================
// 메시지 말풍선
// =============================================
function ChatBubble({
    speaker,
    displayedText,
}: {
    speaker: Speaker
    displayedText: string
}) {
    const isHospital = speaker === 'hospital'

    return (
        <div className={`flex gap-3 ${isHospital ? 'flex-row' : 'flex-row-reverse'} animate-fade-in`}>
            <Avatar speaker={speaker} />
            <div className={`max-w-[80%] md:max-w-[75%] ${isHospital ? 'items-start' : 'items-end'}`}>
                <span className={`text-xs font-medium mb-1 block ${isHospital ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {isHospital ? '병원장' : '마케팅전문가'}
                </span>
                <div className={`px-4 py-3 rounded-2xl ${isHospital
                    ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-tl-sm'
                    : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-tr-sm'
                    }`}>
                    <p className="text-white leading-relaxed whitespace-pre-line text-sm md:text-base">
                        {displayedText}
                    </p>
                </div>
            </div>
        </div>
    )
}

// =============================================
// 타이핑 인디케이터
// =============================================
function TypingIndicator({ speaker }: { speaker: Speaker }) {
    const isHospital = speaker === 'hospital'

    return (
        <div className={`flex gap-3 ${isHospital ? 'flex-row' : 'flex-row-reverse'} animate-fade-in`}>
            <Avatar speaker={speaker} />
            <div className={`px-4 py-3 rounded-2xl ${isHospital
                ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30'
                : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30'
                }`}>
                <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    )
}

// =============================================
// 선택지 버튼
// =============================================
function ChoiceButtons({
    choices,
    onSelect,
}: {
    choices: { label: string; nextMessageId: number }[]
    onSelect: (choice: { label: string; nextMessageId: number }) => void
}) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 justify-center my-4 animate-fade-in">
            {choices.map((choice, idx) => (
                <button
                    key={idx}
                    onClick={() => onSelect(choice)}
                    className="px-6 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:border-white/30 transition-all hover:-translate-y-0.5 shadow-lg text-sm md:text-base"
                >
                    {choice.label}
                </button>
            ))}
        </div>
    )
}

// =============================================
// CTA 버튼
// =============================================
function ConsultationCTA({ onAccept }: { onAccept: () => void }) {
    return (
        <div className="mt-6 animate-fade-in">
            <div className="glass-card p-6 text-center max-w-md mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">
                    데모시연과 상담을 원하십니까?
                </h3>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onAccept}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25"
                    >
                        상담 받아볼게요
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all border border-white/20"
                    >
                        아니오
                    </button>
                </div>
            </div>
        </div>
    )
}

// =============================================
// 상담 신청 폼
// =============================================
function InlineConsultForm() {
    const [formData, setFormData] = useState({
        privacyConsent: "",
        hospitalName: "",
        contactName: "",
        phone: "",
        email: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "error">("idle")
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

            if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "conversion", {
                    send_to: "AW-16980195675",
                    value: 1.0,
                    currency: "KRW",
                })
            }

            if (typeof window !== "undefined" && window.fbq) {
                window.fbq("track", "Lead", {
                    content_name: "Hospital Chatbot Lead",
                    content_category: "Hospital AI Chatbot",
                    value: 0,
                    currency: "KRW",
                })
            }

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
                console.error("[dual-funnel] Meta Conversions API error:", conversionError)
            }

            window.location.href = "/consult/complete"
        } catch (error) {
            console.error("[dual-funnel] 제출 오류:", error)
            setSubmitStatus("error")
            setIsSubmitting(false)
        }
    }

    const handleFormClick = () => {
        if (typeof window !== "undefined" && window.fbq) {
            window.fbq("track", "InitiateCheckout", {
                content_name: "Dual Funnel Chatbot Form CTA",
                content_category: "Hospital AI Chatbot",
            })
        }
    }

    return (
        <div className="mt-6 animate-fade-in">
            <div className="glass-card-static p-6 max-w-xl mx-auto">
                <div className="text-center mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">무료 상담 신청</h3>
                    <p className="text-gray-400 text-sm">24시간 내 담당자가 연락드립니다</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* 개인정보 동의 */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-white">
                            개인정보 제공에 동의합니까? <span className="text-red-400">*</span>
                        </label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="privacyConsentInline"
                                    value="yes"
                                    checked={formData.privacyConsent === "yes"}
                                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.value })}
                                    className="w-5 h-5 accent-teal-500"
                                />
                                <span className="text-gray-300 group-hover:text-white transition-colors">예</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="privacyConsentInline"
                                    value="no"
                                    checked={formData.privacyConsent === "no"}
                                    onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.value })}
                                    className="w-5 h-5 accent-teal-500"
                                />
                                <span className="text-gray-300 group-hover:text-white transition-colors">아니오</span>
                            </label>
                        </div>
                    </div>

                    {/* 상호 */}
                    <div className="space-y-1">
                        <label htmlFor="hospitalNameInline" className="block text-sm font-medium text-white">
                            상호 <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="hospitalNameInline"
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
                    <div className="space-y-1">
                        <label htmlFor="contactNameInline" className="block text-sm font-medium text-white">
                            성명 <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="contactNameInline"
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
                    <div className="space-y-1">
                        <label htmlFor="phoneInline" className="block text-sm font-medium text-white">
                            전화번호 <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="phoneInline"
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
                    <div className="space-y-1">
                        <label htmlFor="emailInline" className="block text-sm font-medium text-white">
                            이메일 <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="emailInline"
                            type="email"
                            placeholder="example@hospital.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all disabled:opacity-50"
                        />
                    </div>

                    {/* 제출 */}
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
                            <p className="text-center text-red-400 font-medium text-sm">
                                제출 중 오류가 발생했습니다. 다시 시도해주세요.
                            </p>
                        </div>
                    )}
                </form>

                <div className="mt-4 space-y-1 text-center">
                    <p className="text-xs text-gray-500">* 입력하신 정보는 상담 목적으로만 사용됩니다</p>
                </div>
            </div>
        </div>
    )
}

// =============================================
// 속도 조절 버튼
// =============================================
function SpeedControl({
    speed,
    onSpeedChange,
    onShowAll,
}: {
    speed: 'normal' | 'fast'
    onSpeedChange: () => void
    onShowAll: () => void
}) {
    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
            <button
                onClick={onSpeedChange}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md border transition-all ${speed === 'fast'
                    ? 'bg-yellow-500/20 border-yellow-400/50 text-yellow-300'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
            >
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">{speed === 'normal' ? '2배속' : '일반'}</span>
            </button>
            <button
                onClick={onShowAll}
                className="flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
            >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">전체보기</span>
            </button>
        </div>
    )
}

// =============================================
// 새 메시지 알림 버튼
// =============================================
function NewMessageButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-cyan-500/80 border border-cyan-400/50 text-white shadow-lg shadow-cyan-500/25 animate-bounce z-50"
        >
            <ChevronDown className="w-4 h-4" />
            <span className="text-sm font-medium">새 메시지</span>
        </button>
    )
}

// =============================================
// 표시 아이템 타입
// =============================================
interface DisplayItem {
    id: string
    speaker: Speaker
    text: string
    fullText: string
}

// =============================================
// 스크립트를 선형 순서로 구성하는 헬퍼
// =============================================
function buildLinearScript(): ScriptMessage[] {
    // 기본 흐름: 1 → 2(선택지) → 3 → 4 → 5 → 6 → 7(선택지) → 8 → 9 → 10 → 11(선택지) → 13 → 14 → 15 → 16 → 17 → 18 → 19
    // 비용 분기는 선택지에서 동적으로 처리
    const mainFlow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19]
    return mainFlow
        .map(id => chatScript.find(m => m.id === id))
        .filter((m): m is ScriptMessage => m !== undefined)
}

// =============================================
// 메인 컴포넌트
// =============================================
export function DualFunnelChatbot() {
    const linearScript = useRef(buildLinearScript()).current

    const [displayItems, setDisplayItems] = useState<DisplayItem[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showTypingIndicator, setShowTypingIndicator] = useState(false)
    const [waitingForChoice, setWaitingForChoice] = useState(false)
    const [currentChoices, setCurrentChoices] = useState<{ label: string; nextMessageId: number }[] | null>(null)
    const [showCTA, setShowCTA] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [speed, setSpeed] = useState<'normal' | 'fast'>('normal')
    const [isScrollLocked, setIsScrollLocked] = useState(false)
    const [showNewMessageButton, setShowNewMessageButton] = useState(false)
    const [scriptComplete, setScriptComplete] = useState(false)

    const chatContainerRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const isAnimatingRef = useRef(false)
    const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // 자동 스크롤
    const scrollToBottom = useCallback(() => {
        if (!isScrollLocked && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [isScrollLocked])

    // 스크롤 잠금/해제 타이머
    const pauseAndResetTimer = useCallback(() => {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
        resumeTimerRef.current = setTimeout(() => {
            setIsScrollLocked(false)
            setShowNewMessageButton(false)
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 2000)
    }, [])

    // 스크롤 이벤트
    const handleScroll = useCallback(() => {
        if (!chatContainerRef.current) return
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 100

        if (!isAtBottom) {
            setIsScrollLocked(true)
            setShowNewMessageButton(true)
            pauseAndResetTimer()
        } else if (isAtBottom && isScrollLocked) {
            if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
            setIsScrollLocked(false)
            setShowNewMessageButton(false)
        }
    }, [isScrollLocked, pauseAndResetTimer])

    // 새 메시지 버튼 클릭
    const handleNewMessageClick = useCallback(() => {
        setIsScrollLocked(false)
        setShowNewMessageButton(false)
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    // 전체보기
    const handleShowAll = useCallback(() => {
        isAnimatingRef.current = false
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current)
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)

        const allItems: DisplayItem[] = linearScript.map((msg, idx) => ({
            id: `msg-${idx}`,
            speaker: msg.speaker,
            text: msg.text,
            fullText: msg.text,
        }))
        setDisplayItems(allItems)
        setCurrentIndex(linearScript.length)
        setShowTypingIndicator(false)
        setWaitingForChoice(false)
        setCurrentChoices(null)
        setScriptComplete(true)
        setShowCTA(true)
    }, [linearScript])

    // 속도 토글
    const handleSpeedChange = useCallback(() => {
        setSpeed(prev => prev === 'normal' ? 'fast' : 'normal')
    }, [])

    // 선택지 선택 처리
    const handleChoiceSelect = useCallback((choice: { label: string; nextMessageId: number }) => {
        setWaitingForChoice(false)
        setCurrentChoices(null)

        // 선택한 텍스트를 병원장 메시지로 표시하는 대신, 다음 메시지로 진행
        // (스크립트의 다음 메시지가 이미 병원장의 해당 대사를 포함)

        // 비용 분기 처리
        if (choice.nextMessageId === 12) {
            // 비용 문의 선택: 비용 관련 대화 삽입 후 RAG 챗봇 소개로 합류
            const costMsg = costBranchMessages[0]
            const hospitalCostMsg: DisplayItem = {
                id: `msg-cost-hospital`,
                speaker: 'hospital',
                text: choice.label,
                fullText: choice.label,
            }
            const expertCostMsg: DisplayItem = {
                id: `msg-cost-expert`,
                speaker: costMsg.speaker,
                text: costMsg.text,
                fullText: costMsg.text,
            }

            setDisplayItems(prev => [...prev, hospitalCostMsg, expertCostMsg])

            // RAG 챗봇 소개 파트(id 11)의 인덱스 찾기
            const ragStartIdx = linearScript.findIndex(m => m.id === 11)
            if (ragStartIdx !== -1) {
                setCurrentIndex(ragStartIdx)
            }
            return
        }

        // 일반 선택: 다음 메시지로 진행
        setCurrentIndex(prev => prev + 1)
    }, [linearScript])

    // 타이핑 애니메이션
    useEffect(() => {
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current)
            typingIntervalRef.current = null
        }
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
            typingTimeoutRef.current = null
        }

        if (currentIndex >= linearScript.length || waitingForChoice) {
            if (currentIndex >= linearScript.length && !scriptComplete) {
                setScriptComplete(true)
                setShowCTA(true)
            }
            return
        }

        isAnimatingRef.current = true
        const currentMessage = linearScript[currentIndex]
        const itemId = `msg-${currentIndex}`

        const startTyping = (startIdx: number) => {
            let charIdx = startIdx
            typingIntervalRef.current = setInterval(() => {
                if (!isAnimatingRef.current) {
                    if (typingIntervalRef.current) {
                        clearInterval(typingIntervalRef.current)
                        typingIntervalRef.current = null
                    }
                    return
                }

                if (charIdx < currentMessage.text.length) {
                    charIdx++
                    const sliceEnd = charIdx
                    setDisplayItems(prev => {
                        const newItems = [...prev]
                        const targetIdx = newItems.findIndex(item => item.id === itemId)
                        if (targetIdx !== -1) {
                            newItems[targetIdx] = {
                                ...newItems[targetIdx],
                                text: currentMessage.text.slice(0, sliceEnd),
                            }
                        }
                        return newItems
                    })
                } else {
                    if (typingIntervalRef.current) {
                        clearInterval(typingIntervalRef.current)
                        typingIntervalRef.current = null
                    }

                    // 선택지가 있는 메시지면 대기
                    if (currentMessage.choices) {
                        typingTimeoutRef.current = setTimeout(() => {
                            setWaitingForChoice(true)
                            setCurrentChoices(currentMessage.choices!)
                        }, MESSAGE_DELAY[speed] / 2)
                    } else {
                        typingTimeoutRef.current = setTimeout(() => {
                            if (!isAnimatingRef.current) return
                            setCurrentIndex(prev => prev + 1)
                        }, MESSAGE_DELAY[speed])
                    }
                }
            }, TYPING_SPEED[speed])
        }

        // 새 메시지 추가 및 타이핑 시작
        setDisplayItems(prev => {
            const existingIdx = prev.findIndex(item => item.id === itemId)
            if (existingIdx !== -1) {
                const charIndex = prev[existingIdx].text.length
                setTimeout(() => startTyping(charIndex), 0)
                return prev
            } else {
                setShowTypingIndicator(true)
                typingTimeoutRef.current = setTimeout(() => {
                    if (!isAnimatingRef.current) return
                    setShowTypingIndicator(false)
                    setDisplayItems(prevItems => {
                        if (prevItems.some(item => item.id === itemId)) return prevItems
                        return [...prevItems, {
                            id: itemId,
                            speaker: currentMessage.speaker,
                            text: currentMessage.text.slice(0, 1),
                            fullText: currentMessage.text,
                        }]
                    })
                    startTyping(1)
                }, TYPING_INDICATOR_DELAY)
                return prev
            }
        })

        return () => {
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current)
                typingIntervalRef.current = null
            }
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
                typingTimeoutRef.current = null
            }
        }
    }, [currentIndex, speed, waitingForChoice, linearScript, scriptComplete])

    // 메시지 추가 시 스크롤
    useEffect(() => {
        scrollToBottom()
    }, [displayItems, showCTA, showForm, waitingForChoice, scrollToBottom])

    // CTA 수락
    const handleAcceptConsultation = () => {
        setShowForm(true)
        setTimeout(scrollToBottom, 100)
    }

    const isPlaying = !scriptComplete && !waitingForChoice

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* 헤더 */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-black/20 border-b border-white/10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 flex items-center justify-center">
                            <BriefcaseBusiness className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-white">병원 마케팅 상담</h1>
                            <span className="text-xs text-teal-400">마케팅전문가 상담 중</span>
                        </div>
                    </div>
                    <span className="text-xs text-gray-500">by LumiBreeze</span>
                </div>
            </header>

            {/* 채팅 영역 */}
            <div
                ref={chatContainerRef}
                onScroll={handleScroll}
                onMouseEnter={pauseAndResetTimer}
                onMouseMove={pauseAndResetTimer}
                className="flex-1 overflow-y-auto px-4 py-6"
            >
                <div className="max-w-2xl mx-auto space-y-4">
                    {/* 메시지 */}
                    {displayItems.map((item) => (
                        <ChatBubble
                            key={item.id}
                            speaker={item.speaker}
                            displayedText={item.text}
                        />
                    ))}

                    {/* 타이핑 인디케이터 */}
                    {showTypingIndicator && currentIndex < linearScript.length && (
                        <TypingIndicator speaker={linearScript[currentIndex].speaker} />
                    )}

                    {/* 선택지 버튼 */}
                    {waitingForChoice && currentChoices && (
                        <ChoiceButtons choices={currentChoices} onSelect={handleChoiceSelect} />
                    )}

                    {/* CTA */}
                    {showCTA && !showForm && (
                        <ConsultationCTA onAccept={handleAcceptConsultation} />
                    )}

                    {/* 상담 폼 */}
                    {showForm && <InlineConsultForm />}

                    {/* 스크롤 앵커 */}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* 속도 조절 (재생 중일 때만) */}
            {isPlaying && (
                <SpeedControl
                    speed={speed}
                    onSpeedChange={handleSpeedChange}
                    onShowAll={handleShowAll}
                />
            )}

            {/* 새 메시지 버튼 */}
            {showNewMessageButton && (
                <NewMessageButton onClick={handleNewMessageClick} />
            )}

            {/* 푸터 */}
            <footer className="py-4 px-4 border-t border-white/10 text-center">
                <p className="text-xs text-gray-500">
                    본 서비스는 의료행위가 아니며, 치료 결정은 의료진 상담이 필수입니다.
                </p>
                <p className="text-xs text-gray-600 mt-1">
                    &copy; {new Date().getFullYear()} LumiBreeze. All rights reserved.
                </p>
            </footer>
        </div>
    )
}
