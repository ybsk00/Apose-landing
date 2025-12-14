"use client"

import { ConsultationForm } from "@/components/consultation-form"
import { ThreeBackground } from "@/components/three-background"
import {
  MessageSquare,
  Bell,
  Calendar,
  BarChart3,
  Shield,
  Clock,
  TrendingUp,
  Users,
  HeartHandshake,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Search,
  Brain,
  Building2,
  Megaphone,
  Scale,
  UserX,
  Globe,
  FileCheck,
  Phone,
} from "lucide-react"
import { useEffect } from "react"
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
        console.log("[v0] Meta Conversions API ViewContent event sent")
      } catch (error) {
        console.error("[v0] Meta Conversions API ViewContent error:", error)
      }
    }

    sendViewContentEvent()
  }, [])

  return (
    <main className="min-h-screen font-sans relative">
      {/* 3D 배경 */}
      <ThreeBackground />

      {/* ===== 1. Hero Section ===== */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* 배지 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass-card-static rounded-full">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">AI 시대, 병원 마케팅의 새로운 패러다임</span>
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight break-keep">
            <span className="text-white text-glow-pulse">원장님, 환자들이 병원을 찾는 방식이</span>
            <br />
            <span className="text-hero-animate">완전히 바뀌었습니다</span>
          </h1>

          {/* 과거 vs 현재 비교 */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12 mb-12">
            {/* 과거 */}
            <div className="glass-card p-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-sm">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-gray-400 font-medium">과거</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                '강남 허리디스크' 같은<br />
                <span className="text-white font-semibold">키워드 검색</span>으로 병원을 찾았습니다.
              </p>
            </div>

            {/* 현재 */}
            <div className="glass-card-gradient p-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className="icon-container-sm bg-gradient-to-br from-blue-500/30 to-cyan-500/30">
                  <Brain className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-cyan-400 font-medium">현재</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                '일주일 전부터 허리가 아픈데...'<br />
                <span className="text-gradient font-semibold">AI에게 직접 질문</span>합니다.
              </p>
            </div>
          </div>

          {/* 핵심 메시지 */}
          <div className="glass-card-static p-6 max-w-3xl mx-auto mb-10">
            <div className="space-y-3 text-left md:text-center">
              <p className="flex items-start md:items-center gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5 md:mt-0" />
                <span>구글의 'AI Overviews'나 새로운 검색 방식은 AI가 직접 정보를 종합해 답을 제시합니다.</span>
              </p>
              <p className="flex items-start md:items-center gap-3 text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5 md:mt-0" />
                <span>이로 인해 단순히 병원을 알리던 블로그 글의 영향력은 급격히 줄어들고 있습니다.</span>
              </p>
            </div>
          </div>

          {/* CTA 버튼 */}
          <a
            href="#consultation-form"
            className="btn-primary inline-flex items-center gap-2 text-lg"
          >
            무료 상담 신청하기
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* ===== 2. 문제 인식 섹션 ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              기존 방식의 한계:
              <br className="md:hidden" />
              <span className="text-red-400"> 비용은 오르고, 환자는 떠나갑니다</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 광고비 상승 */}
            <div className="glass-card p-8">
              <div className="icon-container mb-6">
                <TrendingUp className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">광고비는 상승, 효과는 하락</h3>
              <p className="text-gray-400 leading-relaxed">
                키워드 광고 비용은 계속 오르지만, 실제 병원 방문으로 이어지는 경우는 줄고 있습니다.
              </p>
            </div>

            {/* 규제 강화 */}
            <div className="glass-card p-8">
              <div className="icon-container mb-6">
                <Scale className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">강화된 규제, 커지는 위험</h3>
              <p className="text-gray-400 leading-relaxed">
                2024년부터 블로그의 치료 후기 등도 의료광고 심의 대상에 포함되어, 글 하나 잘못 올리면 법적인 문제가 생길 수 있습니다.
              </p>
            </div>

            {/* 환자 관리 */}
            <div className="glass-card p-8">
              <div className="icon-container mb-6">
                <UserX className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">한 번 온 환자 관리의 어려움</h3>
              <p className="text-gray-400 leading-relaxed">
                바쁜 진료 환경 속에서 환자 한 분 한 분을 챙기기 어려워, 치료가 중단되거나 재방문으로 이어지지 않는 경우가 많습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. 블로그 마케팅 변화 섹션 ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              더 이상 <span className="text-red-400">'블로그'</span>가 정답이 아닌 이유
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* 과거 */}
            <div className="glass-card p-8">
              <h3 className="text-lg font-bold text-gray-400 mb-4">과거</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                과거에는 키워드만 잘 맞추면 통하는 <span className="text-white font-semibold">'상위노출 공식'</span>이 있었습니다.
              </p>
            </div>

            {/* 현재 */}
            <div className="glass-card-gradient p-8">
              <h3 className="text-lg font-bold text-cyan-400 mb-4">현재</h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                하지만, 이제 네이버와 구글의 평가 기준이 <span className="text-gradient font-semibold">AI 기반으로 완전히 바뀌</span>었습니다.
              </p>
              <p className="text-red-400 mt-4 font-medium">
                과거의 방식은 통하지 않을 뿐만 아니라, 오히려 위험합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 4. 웹사이트 신뢰 자산 섹션 ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card-static p-10 md:p-16">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 break-keep">
              역설적으로, <span className="text-white font-bold">블로그를 살리려면</span>
              <br className="hidden md:block" />
              <span className="text-gradient font-bold">블로그 밖의 자산이 필수</span>가 되었습니다.
            </p>

            <div className="space-y-6 text-left md:text-center max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <Globe className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
                <p className="text-gray-400">
                  <span className="text-white">자사 웹사이트의 품질과 신뢰 설계</span>가 블로그 노출의 전제 조건이 되는 시대입니다.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FileCheck className="w-6 h-6 text-cyan-400 shrink-0 mt-1" />
                <p className="text-gray-400">
                  블로그는 '대량 발행'이 아니라 <span className="text-white">'브랜드 기록 자산'</span>으로 재정의되어야 합니다.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="w-6 h-6 text-purple-400 shrink-0 mt-1" />
                <p className="text-gray-400">
                  웹사이트는 <span className="text-white">'AI가 신뢰를 판정할 수 있게'</span> 구조화하는 쪽으로 재정의되어야 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. 솔루션 제안 섹션 ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="section-title mb-6">
            이제 우리 병원 홈페이지가
            <br />
            <span className="text-gradient">직접 환자와 대화해야 합니다</span>
          </h2>

          <div className="glass-card-static p-8 max-w-3xl mx-auto mb-16">
            <div className="space-y-4">
              <p className="flex items-start gap-3 text-gray-300 text-lg">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <span className="text-left">환자들이 AI에게 질문하듯, 우리 병원 홈페이지가 가장 정확하고 신뢰할 수 있는 답변을 주는 '소통의 중심'이 되어야 합니다.</span>
              </p>
              <p className="flex items-start gap-3 text-gray-300 text-lg">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <span className="text-left">블로그 같은 외부 채널이 아닌, 병원이 직접 관리하는 공간에서 환자와의 첫 만남이 시작됩니다.</span>
              </p>
            </div>
          </div>

          {/* AI 비서 소개 */}
          <div className="glass-card-gradient p-10 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
              그래서 만들었습니다: 우리 병원만을 위한 <span className="text-gradient">'AI 비서'</span>
            </h3>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              {/* 첫 번째 임무 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="icon-container">
                    <Megaphone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h4 className="text-xl font-bold text-cyan-400">첫 번째 임무: 신규 환자 발굴</h4>
                </div>
                <p className="text-gray-400">
                  24시간 쉬지 않고 잠재 환자와 상담하며, 자연스럽게 예약까지 이끌어냅니다.
                </p>
              </div>

              {/* 두 번째 임무 */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="icon-container">
                    <HeartHandshake className="w-6 h-6 text-rose-400" />
                  </div>
                  <h4 className="text-xl font-bold text-rose-400">두 번째 임무: 기존 환자 관리</h4>
                </div>
                <p className="text-gray-400">
                  한 번 오신 환자를 알아서 챙겨, 잊지 않고 다시 방문하게 만듭니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. AI 비서 기능 상세 (신규 환자) ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider">첫째</span>
            <h2 className="section-title mt-2">
              AI 비서가 <span className="text-gradient">24시간 깨어있는 상담원</span>처럼
              <br />
              신규 환자를 만듭니다
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 채팅 시연 */}
            <div className="glass-card p-6 md:p-8">
              <div className="space-y-4">
                {/* AI 메시지 */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                    <p className="text-gray-300">어디가 불편하신가요? 간단히 알려주세요.</p>
                  </div>
                </div>

                {/* 사용자 메시지 */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 rounded-2xl rounded-tr-sm p-4 max-w-[80%]">
                    <p className="text-white">일주일 전부터 허리가 뻐근하고 아파요.</p>
                  </div>
                </div>

                {/* AI 응답 */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                    <p className="text-gray-300">그러시군요. 통증의 정도나 다른 증상이 있다면 더 자세히 알 수 있을까요? 저희가 더 잘 맞는 상담을 도와드릴 수 있습니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 설명 */}
            <div className="space-y-8">
              <div>
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  환자의 증상을 듣고 궁금증을 풀어주며,
                  <br />
                  <span className="text-white font-semibold">병원 방문이 필요함을 자연스럽게</span> 안내합니다.
                </p>
              </div>

              {/* 안전 기능 */}
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="icon-container shrink-0">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-green-400 mb-2">안전 최우선</h4>
                    <p className="text-gray-400">
                      대화 중 심한 흉통, 호흡곤란 등 응급 신호(레드플래그)가 감지되면, 즉시 119나 응급실 안내를 최우선으로 표시합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 7. AI 비서 기능 상세 (기존 환자) ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-rose-400 font-bold text-sm uppercase tracking-wider">둘째</span>
            <h2 className="section-title mt-2">
              AI 비서가 기존 환자분들을 알아서 챙겨
              <br />
              <span className="text-gradient">다시 오게</span> 합니다
            </h2>
          </div>

          {/* 프로세스 플로우 */}
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Building2, title: "첫 방문 및 치료", color: "text-blue-400" },
              { icon: Bell, title: "자동 알림 예약", color: "text-cyan-400", subtitle: "치료 후 4주 경과" },
              { icon: Phone, title: "맞춤 알림 발송", color: "text-green-400" },
              { icon: Users, title: "재방문 유도", color: "text-rose-400" },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 text-center relative">
                <div className="icon-container mx-auto mb-4">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h4 className="font-bold text-white mb-1">{item.title}</h4>
                {item.subtitle && (
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                )}
                {i < 3 && (
                  <ArrowRight className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-600 z-10" />
                )}
              </div>
            ))}
          </div>

          {/* 혜택 리스트 */}
          <div className="glass-card-static p-8 max-w-3xl mx-auto">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <p className="text-gray-300">
                  <span className="text-white font-semibold">잊지 않도록:</span> 예약 하루 전, 방문 시간을 알려줘 '노쇼'를 방지합니다.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <p className="text-gray-300">
                  <span className="text-white font-semibold">꾸준한 관리를 위해:</span> 치료가 끝난 후, 다음 내원이 필요한 시점(예: 4주, 8주 후)에 맞춰 자동으로 알림을 보냅니다.
                </p>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-1" />
                <p className="text-gray-300">
                  직원들이 일일이 전화하지 않아도, 시스템이 알아서 환자의 치료 여정을 관리합니다.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 8. 알아서 챙겨주는 시스템 ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              <span className="text-gradient">'알아서 챙겨주는'</span> 시스템이
              <br />
              병원 매출을 올립니다
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* 카카오톡 알림 예시 */}
            <div className="glass-card p-6">
              <div className="bg-[#FEE500] rounded-2xl p-4 text-black max-w-xs mx-auto">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-[#3C1E1E] rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-[#FEE500]" />
                  </div>
                  <span className="font-bold text-sm">[XX병원]</span>
                </div>
                <div className="bg-white rounded-xl p-4">
                  <p className="font-bold mb-2">[XX병원] 다음 치료 예약 안내</p>
                  <p className="text-sm text-gray-600 mb-4">
                    김OO님, 꾸준한 관리가 중요합니다.
                    <br />
                    다음 허리 치료 시점(4주 후)을 잊지 마세요!
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    아래 버튼을 눌러 편한 시간을 선택해 바로 예약하실 수 있습니다.
                  </p>
                  <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold">
                    [편한 시간으로 예약하기]
                  </button>
                </div>
              </div>
            </div>

            {/* 혜택 */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold mb-1">환자는 존중받고 있다는 느낌을 받고,</p>
                  <p className="text-gray-400">병원은 꾸준한 재방문으로 안정적인 성장을 이룹니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0 mt-1" />
                <div>
                  <p className="text-white font-semibold mb-1">전화 응대와 같은 단순 반복 업무가 줄어,</p>
                  <p className="text-gray-400">직원들은 환자 케어에 더 집중할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. 대시보드 섹션 ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              원장님과 직원분들은
              <br />
              <span className="text-gradient">모든 상황을 한눈에</span> 파악합니다
            </h2>
          </div>

          {/* 대시보드 카드 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Calendar, label: "오늘 예약 현황", value: "24명", color: "text-blue-400" },
              { icon: MessageSquare, label: "신규 문의 접수", value: "12건", color: "text-cyan-400" },
              { icon: Bell, label: "자동 알림 발송", value: "42건", color: "text-green-400" },
              { icon: BarChart3, label: "노쇼율", value: "6%", color: "text-rose-400" },
            ].map((item, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                <p className="text-sm text-gray-400 mb-2">{item.label}</p>
                <p className="text-3xl font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 max-w-2xl mx-auto">
            복잡한 프로그램이 아닙니다. 누가, 언제, 어떻게 우리 병원과 소통하고 예약했는지 가장 중요한 정보만 쉽고 명확하게 보여드립니다.
          </p>
        </div>
      </section>

      {/* ===== 10. 혜택 섹션 ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              그래서, 우리 병원에
              <br />
              <span className="text-gradient">무엇이 좋아지나요?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "신규 환자 유입 증가",
                desc: "24시간 AI 상담으로 홈페이지 방문자의 예약 전환율이 올라갑니다.",
                color: "text-cyan-400",
              },
              {
                icon: Users,
                title: "기존 환자 매출 상승",
                desc: "자동 관리 시스템으로 환자의 치료 이탈을 막고 재방문율을 극대화합니다.",
                color: "text-green-400",
              },
              {
                icon: HeartHandshake,
                title: "직원 업무 부담 감소",
                desc: "단순 예약 안내와 리마인드 전화를 자동화하여 핵심 업무에 집중할 수 있습니다.",
                color: "text-rose-400",
              },
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 text-center">
                <div className="icon-container mx-auto mb-6">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. 의료법 준수 섹션 ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-6">
            가장 중요한 원칙:
            <br />
            <span className="text-green-400">의료법을 철저히 준수합니다</span>
          </h2>

          <div className="glass-card-gradient p-12 mb-12">
            <div className="icon-container mx-auto mb-6 w-20 h-20">
              <Shield className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              AI는 절대 '진단'을 내리지 않습니다.
            </h3>
            <div className="space-y-4 text-left max-w-2xl mx-auto">
              <p className="text-gray-300">
                AI의 역할은 환자의 정보를 듣고, 필요한 '정보 안내'와 '의료진 상담 권유'에 한정됩니다. "확진", "처방" 등 의료법에 위배되는 표현은 절대 사용하지 않도록 설계되었습니다.
              </p>
              <div className="glass-card-static p-4 mt-6">
                <p className="text-gray-400 text-sm">
                  <span className="text-amber-400 font-bold">고지문 항상 노출:</span> '본 서비스는 의학적 진단/처방이 아닌 정보 제공을 목적으로 하며, 최종 확인은 의료진 상담이 필요합니다.' 라는 문구가 항상 노출됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 12. 도입 과정 섹션 ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              도입 과정은 <span className="text-gradient">4주면 충분</span>합니다.
              <br />
              복잡한 과정은 저희가 맡겠습니다.
            </h2>
          </div>

          {/* 타임라인 */}
          <div className="relative">
            {/* 연결선 */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 -translate-y-1/2 z-0" />

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  week: "1주차",
                  title: "기본 시스템 설치 및 병원 홈페이지 연동",
                  icon: Clock,
                  color: "from-blue-500 to-blue-600",
                },
                {
                  week: "2-3주차",
                  title: "예약 및 자동 알림 기능 맞춤 설정",
                  icon: Calendar,
                  color: "from-cyan-500 to-cyan-600",
                },
                {
                  week: "4주차",
                  title: "최종 점검 및 사용법 교육 후 정식 오픈",
                  icon: CheckCircle2,
                  color: "from-green-500 to-green-600",
                },
              ].map((item, i) => (
                <div key={i} className="glass-card p-8 text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">{item.week}</span>
                  <h4 className="text-lg font-bold text-white mt-2">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card-static p-8 mt-12 text-center max-w-3xl mx-auto">
            <p className="text-gray-300 text-lg leading-relaxed">
              저희 전문가가 모든 기술적인 과정을 책임지고 진행합니다.
              <br />
              <span className="text-white font-semibold">원장님과 직원분들은 복잡한 과정 없이, 완성된 시스템을 바로 사용하시기만 하면 됩니다.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ===== 13. CTA 섹션 ===== */}
      <section className="section-container py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-6">
            병원의 성공적인 변화,
            <br />
            <span className="text-gradient">지금 시작하셔야 합니다</span>
          </h2>

          <div className="glass-card-static p-8 mb-12 max-w-2xl mx-auto text-left">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              환자들이 병원을 찾는 방식은 이미 바뀌었습니다.
              <br />
              더 이상 과거의 방식에 머무를 시간이 없습니다.
            </p>
            <p className="text-white text-lg leading-relaxed">
              저희 AI 비서가 어떻게 원장님 병원의 성장을 도울 수 있는지, 직접 눈으로 확인하실 수 있도록 <span className="text-gradient font-bold">간단한 시연과 맞춤 상담</span>을 제공해 드리고 싶습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 14. 상담 폼 섹션 ===== */}
      <section id="consultation-form" className="section-container py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">무료 시연 및 맞춤 상담 신청</h2>
            <p className="section-subtitle">
              지금 신청하시면 <span className="text-gradient font-bold">병원 맞춤형 진단 리포트</span>를 무료로 제공해드립니다.
            </p>
          </div>

          <div className="glass-card-gradient p-8 md:p-10">
            <ConsultationForm />
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* 경고 메시지 */}
          <div className="inline-flex items-start gap-3 text-sm text-amber-400/90 bg-amber-950/30 border border-amber-900/50 rounded-lg p-4 text-left">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="leading-relaxed">본 서비스는 의료행위가 아니며, 치료 결정은 의료진 상담이 필수입니다.</p>
          </div>

          {/* 회사 정보 */}
          <div className="space-y-2">
            <p className="font-bold text-lg text-white">주식회사 루미브리즈</p>
            <p className="text-sm text-gray-500">대표 유범석</p>
            <p className="text-sm text-gray-500">경기도 하남시 미사강변서로 22, 에코큐브지식산업센터 1005호</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm pt-2">
              <a href="mailto:lumibreeze00@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                ✉ lumibreeze00@gmail.com
              </a>
              <a href="tel:010-8761-4598" className="text-gray-400 hover:text-white transition-colors">
                📞 010-8761-4598
              </a>
            </div>
          </div>

          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} LumiBreeze. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
