"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase"
import { sendMetaConversionEvent, getMetaBrowserId, getMetaClickId } from "@/lib/meta-conversion"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.privacyConsent !== "yes") {
      alert("개인정보 제공에 동의해주셔야 신청이 가능합니다.")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const supabase = createClient()

      const { error } = await supabase.from("consultations").insert([
        {
          privacy_consent: true,
          company_name: formData.companyName,
          contact_name: formData.contactName,
          phone: formData.phone,
          email: formData.email,
        },
      ])

      if (error) {
        console.error("[v0] Supabase insert error:", error)
        throw error
      }

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
          fbp: getMetaBrowserId(),
          fbc: getMetaClickId(),
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
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-2">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl md:text-3xl">상담 신청</CardTitle>
        <CardDescription className="text-base">빠르게 연락드리고 상담을 해드리도록 하겠습니다</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 개인정보 제공 동의 */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              개인정보 제공에 동의합니까? <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={formData.privacyConsent}
              onValueChange={(value) => setFormData({ ...formData, privacyConsent: value })}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="consent-yes" />
                <Label htmlFor="consent-yes" className="font-normal cursor-pointer">
                  예
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="consent-no" />
                <Label htmlFor="consent-no" className="font-normal cursor-pointer">
                  아니오
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* 상호 */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-base">
              상호 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="companyName"
              type="text"
              placeholder="회사명을 입력해주세요"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* 성명 */}
          <div className="space-y-2">
            <Label htmlFor="contactName" className="text-base">
              성명 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contactName"
              type="text"
              placeholder="담당자 성함을 입력해주세요"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* 전화번호 */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base">
              전화번호 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* 이메일 */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">
              이메일 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            className="w-full text-base h-12 font-semibold"
            disabled={isSubmitting}
            onClick={handleFormClick}
          >
            {isSubmitting ? "제출 중..." : "상담 신청하기"}
          </Button>

          {submitStatus === "error" && (
            <p className="text-center text-destructive font-medium bg-destructive/10 p-4 rounded-lg">
              제출 중 오류가 발생했습니다. 다시 시도해주세요.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
