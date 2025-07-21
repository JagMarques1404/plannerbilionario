"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, RotateCcw } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function SandboxHeader() {
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleReset = async () => {
    setIsResetting(true)
    // Simular reset
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsResetting(false)
    setShowResetDialog(false)
    // Aqui você faria o reset real dos dados
    window.location.reload()
  }

  return (
    <>
      {/* Skip Link para Acessibilidade */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        {/* Banner de Aviso Sandbox */}
        <div className="bg-orange-400 text-white py-2 px-4">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            <span>MODO SANDBOX - VALORES FICTÍCIOS PARA APRENDIZADO</span>
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>

        {/* Header Principal */}
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo e Título */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <h1 className="julius-text-h2">Julius Invest</h1>
            </div>
            <Badge className="julius-badge-sandbox">Sandbox</Badge>
          </div>

          {/* Ações do Header */}
          <div className="flex items-center gap-3">
            {/* Badge Status Online */}
            <div className="hidden md:flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true"></div>
              <span className="text-sm text-gray-600">Sistema Online</span>
            </div>

            {/* Botão Reset */}
            <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="bg-red-500 hover:bg-red-600 text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label="Resetar dados do sandbox"
                >
                  <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="julius-card max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="julius-text-h3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden="true" />
                    Confirmar Reset
                  </AlertDialogTitle>
                  <AlertDialogDescription className="julius-text-body">
                    Esta ação irá resetar todos os dados do sandbox para os valores iniciais. Seu progresso, conquistas
                    e configurações serão perdidos.
                    <br />
                    <br />
                    <strong>Esta ação não pode ser desfeita.</strong>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="julius-btn-outline" disabled={isResetting}>
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleReset}
                    disabled={isResetting}
                    className="bg-red-500 hover:bg-red-600 text-white focus:ring-2 focus:ring-red-500"
                  >
                    {isResetting ? (
                      <>
                        <div
                          className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                          aria-hidden="true"
                        ></div>
                        Resetando...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
                        Confirmar Reset
                      </>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      {/* Badge Sandbox Flutuante (sempre visível) */}
      <div className="fixed top-20 right-4 z-40">
        <Badge className="julius-badge-sandbox shadow-lg animate-gentle-bounce">🎓 Modo Educativo</Badge>
      </div>
    </>
  )
}
