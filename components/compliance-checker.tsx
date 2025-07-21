"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, CheckCircle, XCircle, AlertTriangle, Search } from "lucide-react"

interface ComplianceResult {
  status: "approved" | "rejected" | "warning"
  score: number
  issues: string[]
  recommendations: string[]
}

export function ComplianceChecker() {
  const [loading, setLoading] = useState(false)
  const [investmentData, setInvestmentData] = useState({
    amount: "",
    type: "",
    riskLevel: "",
    duration: "",
  })
  const [result, setResult] = useState<ComplianceResult | null>(null)

  const checkCompliance = async () => {
    setLoading(true)

    // Simular verificação de compliance
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const amount = Number.parseFloat(investmentData.amount)
    const issues: string[] = []
    const recommendations: string[] = []
    let score = 100

    // Verificações de compliance
    if (amount > 50000) {
      issues.push("Valor acima do limite recomendado para perfil iniciante")
      score -= 20
    }

    if (investmentData.riskLevel === "alto" && amount > 20000) {
      issues.push("Investimento de alto risco com valor elevado")
      score -= 15
    }

    if (investmentData.type === "crypto" && amount > 10000) {
      issues.push("Criptomoedas requerem diversificação adicional")
      score -= 10
    }

    // Recomendações
    if (amount < 1000) {
      recommendations.push("Considere aumentar o valor para melhor diversificação")
    }

    if (investmentData.duration === "curto") {
      recommendations.push("Investimentos de longo prazo tendem a ter melhor performance")
    }

    recommendations.push("Mantenha sempre uma reserva de emergência")
    recommendations.push("Diversifique seus investimentos entre diferentes classes de ativos")

    const status: ComplianceResult["status"] = score >= 80 ? "approved" : score >= 60 ? "warning" : "rejected"

    setResult({
      status,
      score,
      issues,
      recommendations,
    })

    setLoading(false)
  }

  const getStatusIcon = (status: ComplianceResult["status"]) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />
    }
  }

  const getStatusColor = (status: ComplianceResult["status"]) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50 border-green-200"
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "rejected":
        return "text-red-600 bg-red-50 border-red-200"
    }
  }

  const getStatusText = (status: ComplianceResult["status"]) => {
    switch (status) {
      case "approved":
        return "Aprovado"
      case "warning":
        return "Atenção"
      case "rejected":
        return "Não Recomendado"
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-blue-600" />
          Verificador de Compliance
        </CardTitle>
        <p className="text-sm text-gray-600">Analise se seu investimento está alinhado com as melhores práticas</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor do Investimento (R$)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="10000"
              value={investmentData.amount}
              onChange={(e) => setInvestmentData((prev) => ({ ...prev, amount: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Investimento</Label>
            <select
              id="type"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={investmentData.type}
              onChange={(e) => setInvestmentData((prev) => ({ ...prev, type: e.target.value }))}
            >
              <option value="">Selecione...</option>
              <option value="stocks">Ações</option>
              <option value="real_estate">Fundos Imobiliários</option>
              <option value="crypto">Criptomoedas</option>
              <option value="bonds">Títulos</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="risk">Nível de Risco</Label>
            <select
              id="risk"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={investmentData.riskLevel}
              onChange={(e) => setInvestmentData((prev) => ({ ...prev, riskLevel: e.target.value }))}
            >
              <option value="">Selecione...</option>
              <option value="baixo">Baixo</option>
              <option value="medio">Médio</option>
              <option value="alto">Alto</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Prazo</Label>
            <select
              id="duration"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={investmentData.duration}
              onChange={(e) => setInvestmentData((prev) => ({ ...prev, duration: e.target.value }))}
            >
              <option value="">Selecione...</option>
              <option value="curto">Curto Prazo (&lt; 1 ano)</option>
              <option value="medio">Médio Prazo (1-5 anos)</option>
              <option value="longo">Longo Prazo (&gt; 5 anos)</option>
            </select>
          </div>
        </div>

        <Button
          onClick={checkCompliance}
          disabled={loading || !investmentData.amount || !investmentData.type}
          className="w-full"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analisando...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Verificar Compliance
            </>
          )}
        </Button>

        {result && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(result.status)}
                  <span className="font-semibold">{getStatusText(result.status)}</span>
                </div>
                <Badge variant="outline">Score: {result.score}/100</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    result.score >= 80 ? "bg-green-600" : result.score >= 60 ? "bg-yellow-600" : "bg-red-600"
                  }`}
                  style={{ width: `${result.score}%` }}
                ></div>
              </div>
            </div>

            {result.issues.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Pontos de Atenção:</strong>
                  <ul className="mt-2 space-y-1">
                    {result.issues.map((issue, index) => (
                      <li key={index} className="text-sm">
                        • {issue}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Recomendações:</h4>
              <ul className="space-y-1">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-blue-800">
                    • {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
