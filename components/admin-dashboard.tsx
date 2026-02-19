"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const consultations = useQuery(api.consultations.get) ?? []
  const hospitalLeads = useQuery(api.hospitalChatbotLeads.get) ?? []
  const isLoadingConsultations = consultations === undefined
  const isLoadingLeads = hospitalLeads === undefined

  const [activeTab, setActiveTab] = useState<"leads" | "consultations">("leads")

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">관리자 대시보드</h1>
          <Button onClick={onLogout} variant="outline" size="sm" className="gap-2">
            <LogOut className="w-4 h-4" />
            로그아웃
          </Button>
        </div>

        {/* 탭 */}
        <div className="flex gap-2">
          <Button
            variant={activeTab === "leads" ? "default" : "outline"}
            onClick={() => setActiveTab("leads")}
          >
            랜딩페이지 리드 ({hospitalLeads.length})
          </Button>
          <Button
            variant={activeTab === "consultations" ? "default" : "outline"}
            onClick={() => setActiveTab("consultations")}
          >
            상담 신청 ({consultations.length})
          </Button>
        </div>

        {/* 랜딩페이지 리드 */}
        {activeTab === "leads" && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>랜딩페이지 상담 리드</CardTitle>
              <CardDescription>대화형 랜딩페이지를 통해 접수된 상담 신청 내역</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingLeads ? (
                <div className="text-center py-12 text-muted-foreground">데이터를 불러오는 중...</div>
              ) : hospitalLeads.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">아직 접수된 리드가 없습니다.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>번호</TableHead>
                        <TableHead>병원명</TableHead>
                        <TableHead>성명</TableHead>
                        <TableHead>전화번호</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>개인정보 동의</TableHead>
                        <TableHead>신청일시</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hospitalLeads.map((lead, index) => (
                        <TableRow key={lead._id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{lead.hospital_name}</TableCell>
                          <TableCell>{lead.contact_name}</TableCell>
                          <TableCell>{lead.phone}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>
                            {lead.privacy_consent ? (
                              <Badge variant="default" className="bg-green-600">동의</Badge>
                            ) : (
                              <Badge variant="destructive">미동의</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(lead._creationTime)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              <div className="mt-6 text-sm text-muted-foreground">총 {hospitalLeads.length}건</div>
            </CardContent>
          </Card>
        )}

        {/* 상담 신청 */}
        {activeTab === "consultations" && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>상담 신청 내역</CardTitle>
              <CardDescription>기존 채팅봇을 통해 접수된 상담 신청 내역</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingConsultations ? (
                <div className="text-center py-12 text-muted-foreground">데이터를 불러오는 중...</div>
              ) : consultations.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">아직 접수된 상담 신청이 없습니다.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>번호</TableHead>
                        <TableHead>상호</TableHead>
                        <TableHead>성명</TableHead>
                        <TableHead>전화번호</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>개인정보 동의</TableHead>
                        <TableHead>신청일시</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consultations.map((consultation, index) => (
                        <TableRow key={consultation._id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{consultation.company_name}</TableCell>
                          <TableCell>{consultation.contact_name}</TableCell>
                          <TableCell>{consultation.phone}</TableCell>
                          <TableCell>{consultation.email}</TableCell>
                          <TableCell>
                            {consultation.privacy_consent ? (
                              <Badge variant="default" className="bg-green-600">동의</Badge>
                            ) : (
                              <Badge variant="destructive">미동의</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{formatDate(consultation._creationTime)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              <div className="mt-6 text-sm text-muted-foreground">총 {consultations.length}건</div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
