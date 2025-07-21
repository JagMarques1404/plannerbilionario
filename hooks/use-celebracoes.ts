"use client"

import { useState } from "react"

export interface CelebracaoData {
  tipo: "level_up" | "badge" | "streak" | "missao" | "quiz" | "compra" | "generica"
  dados: any
  timestamp: number
}

export const useCelebracoes = () => {
  const [celebracaoAtiva, setCelebracaoAtiva] = useState<CelebracaoData | null>(null)

  const celebrar = (tipo: CelebracaoData["tipo"], dados: any = {}) => {
    setCelebracaoAtiva({
      tipo,
      dados,
      timestamp: Date.now(),
    })

    // Auto-remover após animação
    setTimeout(() => {
      setCelebracaoAtiva(null)
    }, 4000)
  }

  return {
    celebracaoAtiva,
    celebrar,
    limparCelebracao: () => setCelebracaoAtiva(null),
  }
}
