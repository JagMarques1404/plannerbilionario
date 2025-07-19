"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, CheckCircle, AlertTriangle, XCircle, RefreshCw } from "lucide-react"

const complianceChecks = [
  {
    id: "kyc",
    name: "KYC - Conheça seu Cliente",
    status: "approved",
    description: "Verificação de identidade aprovada",
    lastCheck: "2024-01-15",
  },
  {
    id: "aml",
    name: "AML - Anti-Lavagem de Dinheiro",
    status: "approved",
    description: "Análise de transações aprovada",
    lastCheck: "2024-01-15",
  },
  {
    id: "pep",
    name: "PEP - Pessoa Politicamente Exposta",
    status: "clear",
    description: "Não identificado como PEP",
    lastCheck: "2024-01-15",
  },
  {
    id: "sanctions",
    name: "Lista de Sanções",
    status: "clear",
    description: "Não consta em listas restritivas",
    lastCheck: "2024-01-15",
  },
  {
    id: "risk_assessment",
    name: "Avaliação de Risco",
    status: "low",
    description: "Perfil de risco baixo",
    lastCheck: "2024-01-15",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
    case "clear":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "low":
      return <CheckCircle className="h-4 w-4 text-blue-600" />
    case "pending":
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    case "rejected":
      return <XCircle className="h-4 w-4 text-red-600" />
    default:
      return <AlertTriangle className="h-4 w-4 text-gray-600" />
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "approved":
      return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
    case "clear":
      return <Badge className="bg-blue-100 text-blue-800">Liberado</Badge>
    case "low":
      return <Badge className="bg-blue-100 text-blue-800">Baixo</Badge>
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
    case "rejected":
      return <Badge className="bg-red-100 text-red-800">Rejeitado</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800">Desconhecido</Badge>
  }
}

export function ComplianceChecker() {
  return (
    <Card className="card-premium border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-gray-900 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-500" />
              Status de Compliance
            </CardTitle>
            <CardDescription>Verificações de segurança e conformidade</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {complianceChecks.map((check) => (
          <div
            key={check.id}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(check.status)}
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">{check.name}</h4>
                <p className="text-gray-600 text-xs">{check.description}</p>
                <p className="text-gray-500 text-xs mt-1">
                  Última verificação: {new Date(check.lastCheck).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
            <div className="text-right">{getStatusBadge(check.status)}</div>
          </div>
        ))}

        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-800">Compliance Aprovado</span>
          </div>
          <p className="text-sm text-green-700">
            Todas as verificações de compliance foram aprovadas. Sua conta está em conformidade com as regulamentações.
          </p>
          <p className="text-xs text-green-600 mt-2 opacity-75">*Sistema simulado para demonstração</p>
        </div>
      </CardContent>
    </Card>
  )
}
