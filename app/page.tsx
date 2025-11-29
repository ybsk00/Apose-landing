"use client"

import { ConsultationForm } from "@/components/consultation-form"
import { GeminiChat } from "@/components/gemini-chat"
import {
  TrendingUp,
  Target,
  Zap,
  Lock,
  AlertCircle,
  Users,
  Megaphone,
  RepeatIcon,
  ShieldCheck,
  Clock,
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
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-background border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>병원 마케팅 혁신 솔루션</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-tight">
              LLM 기반 이중퍼널로
              <br />
              병원 마케팅 혁신
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground text-balance">
              홈페이지를 대체하는 AI 마케팅·유입 시스템
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border">
                <Lock className="w-5 h-5 text-primary" />
                <span className="font-semibold">의료법 100% 준수</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border">
                <TrendingUp className="w-5 h-5 text-accent" />
                <span className="font-semibold">매출 2배↑</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border">
                <Target className="w-5 h-5 text-primary" />
                <span className="font-semibold">환자 유입 자동화</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Quality Crisis Section */}
      <section className="py-32 md:py-40 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Hero Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
              {/* Left: Image */}
              <div className="order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/image.png"
                    alt="의료진이 태블릿으로 블로그 저품질 이슈를 확인하는 모습"
                    className="w-full h-auto"
                    width={600}
                    height={500}
                  />
                </div>
              </div>

              {/* Right: Title & Description */}
              <div className="order-1 lg:order-2 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
                  병원 블로그 마케팅,
                  <br />
                  <span className="text-red-600">'저품질 나락'</span>에 빠지셨나요?
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  의료법 때문에 강력한 카피를 사용하지 못하고, 블로그는 저품질의 늪에 빠져 효과를 보지 못하는 악순환을
                  끊어낼 새로운 해법을 제시합니다.
                </p>
              </div>
            </div>

            {/* AI Dual Funnel Section */}
            <div className="mb-24 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">AI 2중 퍼널: 광고와 의료 정보의 완벽한 분리</h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                우리의 독자적인 2중 퍼널은 '광고 영역'과 '의료 영역'을 명확히 분리하여 의료법 규제를 준수하면서도
                효과적으로 잠재 환자를 유입시키고 검증합니다.
              </p>
            </div>

            {/* Two Funnel Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-32">
              {/* Card 1: 광고 영역 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Megaphone className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-2xl font-bold">1단계: 광고 영역 (넓은 타겟)</h4>
                </div>
                <p className="text-slate-600 mb-6">
                  의료법에 저촉되지 않는 일반적인 건강, 라이프스타일 정보성 콘텐츠로 광범위한 잠재 고객 트래픽을
                  확보합니다. 이 단계에서는 민감한 의료 정보를 전혀 다루지 않습니다.
                </p>
                <div className="relative h-64 flex items-center justify-center bg-gradient-to-b from-cyan-500/20 to-cyan-500/5 rounded-xl">
                  <img
                    src="/abstract-teal-cyan-funnel-diagram-wide-top-narrow-.jpg"
                    alt="광고 영역 퍼널"
                    className="w-full h-full object-contain"
                    width={250}
                    height={250}
                  />
                </div>
              </div>

              {/* Card 2: 의료 영역 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="text-2xl font-bold">2단계: 의료 영역 (정보 제공)</h4>
                </div>
                <p className="text-slate-600 mb-6">
                  명확한 정보 취득 의사를 밝힌 사용자에게만 구체적인 시술, 치료법, 사례 등 전문적인 의료 정보를
                  제공합니다. 사용자의 자발적 선택을 통해 법적 리스크 없이 검증된 잠재 신환에게 다가갑니다.
                </p>
                <div className="relative h-64 flex items-center justify-center bg-gradient-to-b from-blue-500/20 to-blue-500/5 rounded-xl">
                  <img
                    src="/abstract-blue-funnel-diagram-narrow-inverted-cone-.jpg"
                    alt="의료 영역 퍼널"
                    className="w-full h-full object-contain"
                    width={250}
                    height={250}
                  />
                </div>
              </div>
            </div>

            {/* Bottom CTA Section */}
            <div className="bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                원장님은 진료에만 집중하세요. 마케팅은 AI가 합니다.
              </h3>
              <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
                AI가 상담과 분류를 자동으로 처리하고, 진짜 '신환 후보'만 선별하여 전달합니다. 마케팅은 시스템에 맡기고
                진료 효율을 극대화하세요.
              </p>

              {/* Feature Grid */}
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Feature 1 */}
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RepeatIcon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h5 className="text-xl font-bold mb-2">AI 자동 상담 및 분류</h5>
                  <p className="text-sm text-slate-600">
                    AI 챗봇이 24시간 문의에 응대하고, 문의 내용을 분석하여 잠재 환자를 자동으로 분류합니다.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h5 className="text-xl font-bold mb-2">신환 후보 자동 선별</h5>
                  <p className="text-sm text-slate-600">
                    단순 문의와 실제 치료가 필요한 환자를 AI가 구분하여, 병원에서는 핵심 잠재 고객에게만 집중할 수
                    있습니다.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h5 className="text-xl font-bold mb-2">원장님은 진료에만 집중</h5>
                  <p className="text-sm text-slate-600">
                    마케팅과 잠재 환자 필터링에 쏟던 시간을 절약하고, 오직 환자 진료와 치료에만 전념할 수 있는 환경을
                    만듭니다.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <RepeatIcon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h5 className="text-xl font-bold mb-2">자동화된 마케팅 시스템</h5>
                  <p className="text-sm text-slate-600">
                    한 번의 설정으로 콘텐츠 생성부터 잠재고객 분류까지, 마케팅 전 과정이 시스템에 의해 자동으로
                    운영됩니다.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-red-600" />
                  </div>
                  <h5 className="text-xl font-bold mb-2">의료법규 완벽 준수</h5>
                  <p className="text-sm text-slate-600">
                    시스템 자체가 의료 광고법 가이드라인을 기반으로 설계되어, 법적 문제 발생 가능성을 원천 차단합니다.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="bg-white rounded-xl p-6 shadow-md text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                  </div>
                  <h5 className="text-xl font-bold mb-2">안정적인 트래픽 증가</h5>
                  <p className="text-sm text-slate-600">
                    위험한 표현 없이도 안전하게 블로그 트래픽을 늘리고, 검증된 잠재 환자 유입을 지속적으로 확보합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Webtoon Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">병원 매출 이제 고민하지 마세요</h2>
              <p className="text-lg text-muted-foreground">AI 헬스케어로 시작해서 메디컬 AI로의 전환의 여정</p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-card border">
              <img
                src="/images/nano-banana.jpeg"
                alt="AI 헬스케어로 시작해서 메디컬 AI로의 전환의 여정 웹툰"
                className="w-full h-auto"
                width={1920}
                height={5480}
              />
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">솔루션 소개 영상</h2>
              <p className="text-lg text-muted-foreground">LLM 기반 이중퍼널 시스템을 영상으로 확인하세요</p>
            </div>

            <div
              className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-black"
              style={{ aspectRatio: "16/9" }}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/fnJzdvUiqn4"
                title="LLM 기반 이중퍼널 병원 마케팅 솔루션"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gemini Chat Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">AI 마케팅 상담소</h2>
            <p className="text-lg text-muted-foreground">궁금한 점이 있으신가요? AI에게 바로 물어보세요</p>
          </div>
          <GeminiChat />
        </div>
      </section>

      {/* 상담 신청 폼 */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">무료 컨설팅 및 데모 신청하기</h2>
            <p className="text-lg text-muted-foreground">빠르게 연락드리고 상담을 해드리도록 하겠습니다</p>
          </div>

          <ConsultationForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start gap-2 text-sm text-muted-foreground bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">본 서비스는 의료행위가 아니며, 치료 결정은 의료진 상담이 필수입니다.</p>
            </div>

            <div className="text-center space-y-2">
              <p className="font-semibold text-lg">주식회사 루미브리즈</p>
              <p className="text-sm text-muted-foreground">대표 유범석</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="mailto:lumibreeze00@gmail.com" className="text-primary hover:underline">
                  ✉ lumibreeze00@gmail.com
                </a>
                <a href="tel:010-8761-4598" className="text-primary hover:underline">
                  📞 010-8761-4598
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
