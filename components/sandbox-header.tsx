"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RotateCcw } from "lucide-react"
import { useApp } from "@/contexts/app-context"

export function SandboxHeader() {
  const { resetAccount, user } = useApp()

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge className="sandbox-badge text-white px-4 py-2 text-sm font-bold">
              <AlertTriangle className="h-4 w-4 mr-2" />
              MODO SANDBOX – Valores Fictícios
            </Badge>
            <div className="hidden md:flex items-center text-sm text-gray-600">
              <span>Todos os dados são simulados para demonstração</span>
            </div>
          </div>

          {user && (
            <Button
              onClick={resetAccount}
              variant="outline"
              size="sm"
              className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Minha Conta
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
