"use client"

import type React from "react"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { sendMetaConversionEvent, getMetaBrowserId, getMetaClickId } from "@/lib/meta-conversion"
import { CheckCircle2 } from "lucide-react"

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void
    fbq?: (command: string, eventName: string, params?: Record<string, unknown>) => void
  }
}

export function ConsultationForm() {
  const [formData, setFormData] = useState({
    privacyConsent: "",
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const createConsultation = useMutation(api.consultations.create)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.privacyConsent !== "yes") {
      alert("개인정보 제공에 동의해주셔야 신청이 가능합니다.")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await createConsultation({
        privacy_consent: true,
        company_name: formData.companyName,
        contact_name: formData.contactName,
        phone: formData.phone,
        email: formData.email,
      })

      console.log("[v0] Consultation submitted successfully")

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-16980195675",
          value: 1.0,
          currency: "KRW",
        })
        console.log("[v0] Google Ads conversion event sent")
      }

      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Consultation Request",
          content_category: "Hospital Marketing",
          value: 0,
          currency: "KRW",
        })
        console.log("[v0] Meta Pixel Lead event sent")
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
        console.log("[v0] Meta Conversions API Lead event sent")
      } catch (conversionError) {
        console.error("[v0] Meta Conversions API error:", conversionError)
      }

      window.location.href = "/consult/complete"
    } catch (error) {
      console.error("[v0] 제출 오류:", error)
      setSubmitStatus("error")
      setIsSubmitting(false)
    }
  }

  const handleFormClick = () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "InitiateCheckout", {
        content_name: "Consultation Form CTA",
        content_category: "Hospital Marketing",
      })
      console.log("[v0] Meta Pixel InitiateCheckout event sent")
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">상담 신청</h3>
        <p className="text-gray-400">빠르게 연락드리고 상담을 해드리도록 하겠습니다</p>
      </div>

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
                className="w-5 h-5 accent-blue-500 bg-white/10 border-white/20"
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
                className="w-5 h-5 accent-blue-500 bg-white/10 border-white/20"
              />
              <span className="text-gray-300 group-hover:text-white transition-colors">아니오</span>
            </label>
          </div>
        </div>

        {/* 상호 */}
        <div className="space-y-2">
          <label htmlFor="companyName" className="block text-base font-medium text-white">
            상호 <span className="text-red-400">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="병원명을 입력해주세요"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            required
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
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
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
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
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
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
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={handleFormClick}
          className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
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
    </div>
  )
}
