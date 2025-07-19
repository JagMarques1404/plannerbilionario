"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Shield, CheckCircle, AlertTriangle, Clock, Play, RefreshCw } from "lucide-react"

interface ComplianceCheck {
  id: string
  name: string
  description: string
  status: "passed" | "failed" | "pending" | "running"
  score: number
  lastCheck: string
  details: string[]
}

const initialChecks: ComplianceCheck[] = [
  {
    id: "kyc",
    name: "KYC (Know Your Customer)",
    description: "Verificação de identidade do cliente",
    status: "passed",
    score: 95,
    lastCheck: "2024-01-20T14:30:00",
    details: ["Documento válido", "Foto verificada", "Dados confirmados"],
  },
  {
    id: "aml",
    name: "AML (Anti-Money Laundering)",
    description: "Verificação anti-lavagem de dinheiro",
    status: "passed",
    score: 88,
    lastCheck: "2024-01-20T14:25:00",
    details: ["Origem dos fundos verificada", "Padrões normais de transação", "Sem alertas"],
  },
  {
    id: "pep",
    name: "PEP (Politically Exposed Person)",
    description: "Verificação de pessoa politicamente exposta",
    status: "pending",
    score: 0,
    lastCheck: "2024-01-19T10:00:00",
    details: ["Verificação pendente", "Aguardando base de dados"],
  },
  {
    id: "sanctions",
    name: "Lista de Sanções",
    description: "Verificação em listas de sanções internacionais",
    status: "passed",
    score: 100,
    lastCheck: "2024-01-20T14:20:00",
    details: ["Não encontrado em listas", "OFAC limpo", "UN limpo"],
  },
  {
    id: "risk-profile",
    name: "Perfil de Risco",
    description: "Avaliação do perfil de risco do investidor",
    status: "failed",
    score: 45,
    lastCheck: "2024-01-20T12:00:00",
    details: ["Risco alto detectado", "Transações suspeitas", "Revisão necessária"],
  },
]

export function ComplianceChecker() {
  const [checks, setChecks] = useState<ComplianceCheck[]>(initialChecks)
  const [isRunning, setIsRunning] = useState(false)

  const runCompliance = async () => {
    setIsRunning(true)

    // Simular execução das verificações
    for (let i = 0; i < checks.length; i++) {
      setTimeout(() => {
        setChecks((prev) => prev.map((check, index) => (index === i ? { ...check, status: "running" } : check)))
      }, i * 500)

      setTimeout(
        () => {
          setChecks((prev) =>
            prev.map((check, index) =>
              index === i
                ? {
                    ...check,
                    status: Math.random() > 0.3 ? "passed" : "failed",
                    score: Math.floor(Math.random() * 40) + 60,
                    lastCheck: new Date().toISOString(),
                  }
                : check,
            ),
          )
        },
        (i + 1) * 1000,
      )
    }

    setTimeout(
      () => {
        setIsRunning(false)
      },
      checks.length * 1000 + 500,
    )
  }

  const completeCheck = (checkId: string) => {
    setChecks((prev) =>
      prev.map((check) =>
        check.id === checkId
          ? {
              ...check,
              status: "passed",
              score: 90,
              lastCheck: new Date().toISOString(),
              details: ["Verificação manual completada", "Aprovado pelo sistema", "Conforme regulamentação"],
            }
          : check,
      ),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "running":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const overallScore = Math.round(checks.reduce((acc, check) => acc + check.score, 0) / checks.length)

  const passedChecks = checks.filter((check) => check.status === "passed").length
  const totalChecks = checks.length

  return (
    <Card className="card-premium border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-500" />
              Sistema de Compliance
            </CardTitle>
            <CardDescription>Verificações de conformidade e segurança</CardDescription>
          </div>
          <Button
            onClick={runCompliance}
            disabled={isRunning}
            className="bg-green-500 hover:bg-green-600 text-white rounded-xl"
          >
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Executando..." : "Executar Compliance"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Score Geral de Compliance</h3>
              <p className="text-sm text-gray-600">
                {passedChecks}/{totalChecks} verificações aprovadas
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{overallScore}%</div>
              <Badge
                className={
                  overallScore >= 80
                    ? "bg-green-500 text-white"
                    : overallScore >= 60
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                }
              >
                {overallScore >= 80 ? "Excelente" : overallScore >= 60 ? "Bom" : "Atenção"}
              </Badge>
            </div>
          </div>
          <Progress value={overallScore} className="h-3" />
        </div>

        {/* Individual Checks */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Verificações Individuais</h4>
          {checks.map((check) => (
            <div key={check.id} className="p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(check.status)}
                  <div>
                    <h5 className="font-semibold text-gray-900">{check.name}</h5>
                    <p className="text-sm text-gray-600">{check.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(check.status)}>
                    {check.status === "passed"
                      ? "Aprovado"
                      : check.status === "failed"
                        ? "Reprovado"
                        : check.status === "running"
                          ? "Executando"
                          : "Pendente"}
                  </Badge>
                  {check.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => completeCheck(check.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg"
                    >
                      Completar Verificação
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Score:</span>
                  <span className="font-medium">{check.score}%</span>
                </div>
                <Progress value={check.score} className="h-2" />
                <div className="text-xs text-gray-500">
                  Última verificação: {new Date(check.lastCheck).toLocaleString()}
                </div>
              </div>

              <div className="mt-3">
                <h6 className="text-sm font-medium text-gray-900 mb-2">Detalhes:</h6>
                <div className="space-y-1">
                  {check.details.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Summary */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <h4 className="font-semibold text-gray-900 mb-2">Resumo de Conformidade</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{passedChecks}</div>
              <div className="text-gray-600">Aprovadas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">{checks.filter((c) => c.status === "failed").length}</div>
              <div className="text-gray-600">Reprovadas</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">
                {checks.filter((c) => c.status === "pending").length}
              </div>
              <div className="text-gray-600">Pendentes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{overallScore}%</div>
              <div className="text-gray-600">Score Total</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
