"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Play, RotateCcw, CheckCircle, Sparkles } from "lucide-react"
import { useTutorialInteligente } from "@/hooks/use-tutorial-inteligente"

interface TutorialTriggerProps {
  pagina: string
  versao?: string
  variante?: "button" | "badge" | "icon"
  texto?: string
  className?: string
}

export const TutorialTrigger: React.FC<TutorialTriggerProps> = ({
  pagina,
  versao = "1.0",
  variante = "button",
  texto,
  className = "",
}) => {
  const { iniciarTutorial, jaVisto, reiniciarTutorial } = useTutorialInteligente()

  const foiVisto = jaVisto(pagina, versao)

  const handleClick = () => {
    if (foiVisto) {
      reiniciarTutorial(pagina)
    }

    // Aqui você precisaria ter acesso às configurações do tutorial
    // Por simplicidade, vamos assumir que existe uma função global
    const config = getTutorialConfig(pagina, versao)
    if (config) {
      iniciarTutorial(config)
    }
  }

  if (variante === "icon") {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className={`text-blue-500 hover:text-blue-700 ${className}`}
        title={foiVisto ? "Rever tutorial" : "Iniciar tutorial"}
      >
        {foiVisto ? <RotateCcw className="h-4 w-4" /> : <HelpCircle className="h-4 w-4" />}
      </Button>
    )
  }

  if (variante === "badge") {
    return (
      <Badge
        variant={foiVisto ? "secondary" : "default"}
        className={`cursor-pointer hover:opacity-80 ${className}`}
        onClick={handleClick}
      >
        {foiVisto ? (
          <>
            <CheckCircle className="h-3 w-3 mr-1" />
            Tutorial Concluído
          </>
        ) : (
          <>
            <Sparkles className="h-3 w-3 mr-1" />
            Novo Tutorial
          </>
        )}
      </Badge>
    )
  }

  return (
    <Button variant={foiVisto ? "outline" : "default"} size="sm" onClick={handleClick} className={className}>
      {foiVisto ? (
        <>
          <RotateCcw className="h-4 w-4 mr-2" />
          {texto || "Rever Tutorial"}
        </>
      ) : (
        <>
          <Play className="h-4 w-4 mr-2" />
          {texto || "Iniciar Tutorial"}
        </>
      )}
    </Button>
  )
}

// Função auxiliar para obter configuração do tutorial
// Esta seria implementada baseada na sua estrutura de dados
function getTutorialConfig(pagina: string, versao: string) {
  // Implementação simplificada
  const configs = {
    dashboard: {
      pagina: "dashboard",
      versao: "1.0",
      etapas: [
        {
          id: "welcome",
          titulo: "Bem-vindo!",
          conteudo: "Este é o seu dashboard principal.",
        },
      ],
    },
  }

  return configs[pagina]
}
