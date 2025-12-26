"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { chatMessages, TYPING_SPEED, MESSAGE_DELAY, type ChatMessage } from "@/lib/chatScript"
import { ConsultationForm } from "@/components/consultation-form"
import { Zap, BookOpen, ChevronDown } from "lucide-react"

// 개별 메시지 컴포넌트
function ChatMessageBubble({
    message,
    displayedText
}: {
    message: ChatMessage
    displayedText: string
}) {
    const isHospital = message.speaker === 'hospital'

    return (
        <div className={`flex gap-3 ${isHospital ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* 아바타 */}
            <div className="shrink-0">
                <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${isHospital
                    ? 'border-amber-400/50 shadow-lg shadow-amber-500/20'
                    : 'border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                    }`}>
                    <Image
                        src={isHospital ? '/의사.png' : '/회사.png'}
                        alt={isHospital ? '병원장' : '우리 회사'}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* 말풍선 */}
            <div className={`max-w-[75%] ${isHospital ? 'items-start' : 'items-end'}`}>
                <span className={`text-xs font-medium mb-1 block ${isHospital ? 'text-amber-400' : 'text-cyan-400'
                    }`}>
                    {isHospital ? '병원장' : '루미브리즈'}
                </span>
                <div className={`px-4 py-3 rounded-2xl ${isHospital
                    ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-tl-sm'
                    : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-tr-sm'
                    }`}>
                    <p className="text-white leading-relaxed whitespace-pre-line">
                        {displayedText}
                    </p>
                </div>
            </div>
        </div>
    )
}

// 타이핑 인디케이터
function TypingIndicator({ speaker }: { speaker: 'hospital' | 'company' }) {
    const isHospital = speaker === 'hospital'

    return (
        <div className={`flex gap-3 ${isHospital ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className="shrink-0">
                <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${isHospital
                    ? 'border-amber-400/50'
                    : 'border-cyan-400/50'
                    }`}>
                    <Image
                        src={isHospital ? '/의사.png' : '/회사.png'}
                        alt={isHospital ? '병원장' : '우리 회사'}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
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

// 상담 CTA 컴포넌트
function ConsultationCTA({ onAccept }: { onAccept: () => void }) {
    return (
        <div className="mt-8">
            <div className="glass-card p-6 text-center max-w-md mx-auto">
                <h3 className="text-xl font-bold text-white mb-4">
                    데모시연과 상담을 원하십니까?
                </h3>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onAccept}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25"
                    >
                        예
                    </button>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-8 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all border border-white/20"
                    >
                        아니오
                    </button>
                </div>
            </div>
        </div>
    )
}

// 속도 조절 버튼
function SpeedControl({
    speed,
    onSpeedChange,
    onShowAll
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
                <span className="text-sm font-medium">{speed === 'normal' ? '2배속 보기' : '일반 속도'}</span>
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

// 새 메시지 버튼 (읽는 중 잠금)
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

// 표시할 메시지 타입 (완료된 메시지 + 현재 타이핑 중인 텍스트)
interface DisplayItem {
    id: string
    message: ChatMessage
    text: string
}

// 메인 채팅봇 랜딩 컴포넌트
export function ChatBotLanding() {
    // 화면에 표시할 모든 메시지 (완료 + 진행중)
    const [displayItems, setDisplayItems] = useState<DisplayItem[]>([])
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
    const [showTypingIndicator, setShowTypingIndicator] = useState(false)
    const [showCTA, setShowCTA] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [speed, setSpeed] = useState<'normal' | 'fast'>('normal')
    const [isScrollLocked, setIsScrollLocked] = useState(false)
    const [showNewMessageButton, setShowNewMessageButton] = useState(false)

    const chatContainerRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const isAnimatingRef = useRef(false)

    // 자동 스크롤
    const scrollToBottom = useCallback(() => {
        if (!isScrollLocked && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [isScrollLocked])

    // 스크롤 이벤트 핸들러 (읽는 중 잠금)
    const handleScroll = useCallback(() => {
        if (!chatContainerRef.current) return

        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 100

        if (!isAtBottom && !isScrollLocked) {
            setIsScrollLocked(true)
            setShowNewMessageButton(true)
        } else if (isAtBottom && isScrollLocked) {
            setIsScrollLocked(false)
            setShowNewMessageButton(false)
        }
    }, [isScrollLocked])

    // 새 메시지 버튼 클릭
    const handleNewMessageClick = useCallback(() => {
        setIsScrollLocked(false)
        setShowNewMessageButton(false)
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [])

    // 전체보기 클릭
    const handleShowAll = useCallback(() => {
        isAnimatingRef.current = false
        const allItems: DisplayItem[] = chatMessages.map(msg => ({
            id: `msg-${msg.id}`,
            message: msg,
            text: msg.text
        }))
        setDisplayItems(allItems)
        setCurrentMessageIndex(chatMessages.length)
        setShowTypingIndicator(false)
        setShowCTA(true)
    }, [])

    // 속도 토글
    const handleSpeedChange = useCallback(() => {
        setSpeed(prev => prev === 'normal' ? 'fast' : 'normal')
    }, [])

    // 타이핑 애니메이션
    useEffect(() => {
        if (currentMessageIndex >= chatMessages.length) {
            setShowCTA(true)
            return
        }

        isAnimatingRef.current = true
        const currentMessage = chatMessages[currentMessageIndex]
        const itemId = `msg-${currentMessage.id}`

        // 타이핑 인디케이터 표시
        setShowTypingIndicator(true)

        const indicatorTimeout = setTimeout(() => {
            if (!isAnimatingRef.current) return
            setShowTypingIndicator(false)

            // 새 메시지 아이템 추가 (빈 텍스트로 시작)
            setDisplayItems(prev => [...prev, { id: itemId, message: currentMessage, text: '' }])

            let charIndex = 0
            const typingInterval = setInterval(() => {
                if (!isAnimatingRef.current) {
                    clearInterval(typingInterval)
                    return
                }

                if (charIndex < currentMessage.text.length) {
                    charIndex++
                    // 기존 아이템의 텍스트 업데이트 (덮어쓰기)
                    setDisplayItems(prev => {
                        const newItems = [...prev]
                        const lastIdx = newItems.length - 1
                        if (lastIdx >= 0 && newItems[lastIdx].id === itemId) {
                            newItems[lastIdx] = {
                                ...newItems[lastIdx],
                                text: currentMessage.text.slice(0, charIndex)
                            }
                        }
                        return newItems
                    })
                } else {
                    clearInterval(typingInterval)

                    // 다음 메시지로 이동
                    const nextTimeout = setTimeout(() => {
                        if (!isAnimatingRef.current) return
                        setCurrentMessageIndex(prev => prev + 1)
                    }, MESSAGE_DELAY[speed])

                    return () => clearTimeout(nextTimeout)
                }
            }, TYPING_SPEED[speed])

            return () => clearInterval(typingInterval)
        }, 500)

        return () => {
            clearTimeout(indicatorTimeout)
        }
    }, [currentMessageIndex, speed])

    // 메시지 추가 시 스크롤
    useEffect(() => {
        scrollToBottom()
    }, [displayItems, scrollToBottom])

    // 상담 폼 표시
    const handleAcceptConsultation = () => {
        setShowForm(true)
        setTimeout(scrollToBottom, 100)
    }

    return (
        <div className="relative min-h-screen flex flex-col">
            {/* 헤더 */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-black/20 border-b border-white/10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-lg font-bold text-white">AI 병원 마케팅 상담</h1>
                    <span className="text-xs text-gray-400">by 루미브리즈</span>
                </div>
            </header>

            {/* 채팅 영역 */}
            <div
                ref={chatContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-4 py-6"
            >
                <div className="max-w-2xl mx-auto space-y-4">
                    {/* 모든 메시지 (완료 + 타이핑 중) */}
                    {displayItems.map((item) => (
                        <ChatMessageBubble
                            key={item.id}
                            message={item.message}
                            displayedText={item.text}
                        />
                    ))}

                    {/* 타이핑 인디케이터 */}
                    {showTypingIndicator && currentMessageIndex < chatMessages.length && (
                        <TypingIndicator speaker={chatMessages[currentMessageIndex].speaker} />
                    )}

                    {/* CTA */}
                    {showCTA && !showForm && (
                        <ConsultationCTA onAccept={handleAcceptConsultation} />
                    )}

                    {/* 상담 폼 */}
                    {showForm && (
                        <div className="mt-8">
                            <div className="glass-card p-6">
                                <ConsultationForm />
                            </div>
                        </div>
                    )}

                    {/* 스크롤 앵커 */}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* 속도 조절 버튼 */}
            {!showCTA && (
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
                    © {new Date().getFullYear()} LumiBreeze. All rights reserved.
                </p>
            </footer>
        </div>
    )
}
