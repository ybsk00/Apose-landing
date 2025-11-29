"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw, LogOut } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase"
import { AdminLogin } from "@/components/admin-login"

interface Consultation {
  id: string
  privacy_consent: boolean
  company_name: string
  contact_name: string
  phone: string
  email: string
  created_at: string
}

export default function AdminPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      console.log("[v0] Auth check:", session)
      setIsAuthenticated(!!session)
      setIsCheckingAuth(false)
    }

    checkAuth()
  }, [])

  const fetchConsultations = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createBrowserClient()

      const { data, error: supabaseError } = await supabase
        .from("consultations")
        .select("*")
        .order("created_at", { ascending: false })

      if (supabaseError) {
        throw supabaseError
      }

      console.log("[v0] Fetched consultations:", data)
      setConsultations(data || [])
    } catch (err) {
      console.error("[v0] 데이터 조회 오류:", err)
      setError(err instanceof Error ? err.message : "데이터를 불러오는 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchConsultations()
    }
  }, [isAuthenticated])

  const handleLogout = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    setConsultations([])
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <div className="text-muted-foreground">인증 상태 확인 중...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl">상담 신청 내역</CardTitle>
                <CardDescription className="mt-2">접수된 상담 신청을 확인하고 관리할 수 있습니다</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleLogout} variant="outline" size="icon" title="로그아웃">
                  <LogOut className="w-4 h-4" />
                </Button>
                <Button onClick={fetchConsultations} disabled={isLoading} variant="outline" size="icon">
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error && <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">{error}</div>}

            {isLoading ? (
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
                      <TableRow key={consultation.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{consultation.company_name}</TableCell>
                        <TableCell>{consultation.contact_name}</TableCell>
                        <TableCell>{consultation.phone}</TableCell>
                        <TableCell>{consultation.email}</TableCell>
                        <TableCell>
                          {consultation.privacy_consent ? (
                            <Badge variant="default" className="bg-green-600">
                              동의
                            </Badge>
                          ) : (
                            <Badge variant="destructive">미동의</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{formatDate(consultation.created_at)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="mt-6 text-sm text-muted-foreground">총 {consultations.length}건의 상담 신청</div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
