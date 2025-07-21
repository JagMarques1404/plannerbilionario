"use client"

import { useState, useEffect, useCallback } from "react"

interface TutorialEtapa {
  id: string
  titulo: string
  conteudo: string
  elemento?: string
  posicao?: "top" | "bottom" | "left" | "right"
  acao?: "click" | "hover" | "scroll"
  video?: string
  gif?: string
  dica?: string
}

interface TutorialConfig {
  pagina: string
  versao: string
  etapas: TutorialEtapa[]
  obrigatorio?: boolean
  condicoes?: string[]
}

export const useTutorialInteligente = () => {
  const [tutorialAtivo, setTutorialAtivo] = useState(false)
  const [etapaAtual, setEtapaAtual] = useState(0)
  const [tutoriaisVistos, setTutoriaisVistos] = useState<Set<string>>(new Set())
  const [tutorialConfig, setTutorialConfig] = useState<TutorialConfig | null>(null)
  const [elementoDestacado, setElementoDestacado] = useState<string | null>(null)

  // Carregar tutoriais vistos do localStorage
  useEffect(() => {
    const tutoriaisStorage = localStorage.getItem("tutoriais_vistos")
    if (tutoriaisStorage) {
      try {
        const tutoriais = JSON.parse(tutoriaisStorage)
        setTutoriaisVistos(new Set(tutoriais))
      } catch (error) {
        console.error("Erro ao carregar tutoriais:", error)
      }
    }
  }, [])

  const iniciarTutorial = useCallback(
    (config: TutorialConfig) => {
      const chaveUnica = `${config.pagina}_${config.versao}`

      // Verificar se já foi visto (exceto se for obrigatório)
      if (!config.obrigatorio && tutoriaisVistos.has(chaveUnica)) {
        return false
      }

      // Verificar condições se existirem
      if (config.condicoes) {
        const condicoesSatisfeitas = config.condicoes.every((condicao) => {
          // Implementar lógica de condições aqui
          return true
        })

        if (!condicoesSatisfeitas) {
          return false
        }
      }

      setTutorialConfig(config)
      setTutorialAtivo(true)
      setEtapaAtual(0)

      // Destacar primeiro elemento se existir
      if (config.etapas[0]?.elemento) {
        setElementoDestacado(config.etapas[0].elemento)
      }

      return true
    },
    [tutoriaisVistos],
  )

  const proximaEtapa = useCallback(() => {
    if (!tutorialConfig) return

    const proximaEtapaIndex = etapaAtual + 1

    if (proximaEtapaIndex >= tutorialConfig.etapas.length) {
      finalizarTutorial()
      return
    }

    setEtapaAtual(proximaEtapaIndex)

    // Destacar próximo elemento
    const proximaEtapa = tutorialConfig.etapas[proximaEtapaIndex]
    if (proximaEtapa?.elemento) {
      setElementoDestacado(proximaEtapa.elemento)
    } else {
      setElementoDestacado(null)
    }
  }, [etapaAtual, tutorialConfig])

  const etapaAnterior = useCallback(() => {
    if (etapaAtual > 0) {
      const etapaAnteriorIndex = etapaAtual - 1
      setEtapaAtual(etapaAnteriorIndex)

      // Destacar elemento anterior
      const etapaAnterior = tutorialConfig?.etapas[etapaAnteriorIndex]
      if (etapaAnterior?.elemento) {
        setElementoDestacado(etapaAnterior.elemento)
      } else {
        setElementoDestacado(null)
      }
    }
  }, [etapaAtual, tutorialConfig])

  const pularTutorial = useCallback(() => {
    if (tutorialConfig) {
      const chaveUnica = `${tutorialConfig.pagina}_${tutorialConfig.versao}`
      marcarComoVisto(chaveUnica)
    }
    finalizarTutorial()
  }, [tutorialConfig])

  const finalizarTutorial = useCallback(() => {
    if (tutorialConfig) {
      const chaveUnica = `${tutorialConfig.pagina}_${tutorialConfig.versao}`
      marcarComoVisto(chaveUnica)
    }

    setTutorialAtivo(false)
    setEtapaAtual(0)
    setTutorialConfig(null)
    setElementoDestacado(null)
  }, [tutorialConfig])

  const marcarComoVisto = useCallback(
    (chave: string) => {
      const novosTutoriais = new Set([...tutoriaisVistos, chave])
      setTutoriaisVistos(novosTutoriais)
      localStorage.setItem("tutoriais_vistos", JSON.stringify([...novosTutoriais]))
    },
    [tutoriaisVistos],
  )

  const reiniciarTutorial = useCallback(
    (pagina: string) => {
      const chavePattern = new RegExp(`^${pagina}_`)
      const tutoriaisFiltrados = new Set([...tutoriaisVistos].filter((t) => !chavePattern.test(t)))
      setTutoriaisVistos(tutoriaisFiltrados)
      localStorage.setItem("tutoriais_vistos", JSON.stringify([...tutoriaisFiltrados]))
    },
    [tutoriaisVistos],
  )

  const jaVisto = useCallback(
    (pagina: string, versao: string) => {
      const chaveUnica = `${pagina}_${versao}`
      return tutoriaisVistos.has(chaveUnica)
    },
    [tutoriaisVistos],
  )

  return {
    // Estado
    tutorialAtivo,
    etapaAtual,
    tutorialConfig,
    elementoDestacado,

    // Ações
    iniciarTutorial,
    proximaEtapa,
    etapaAnterior,
    pularTutorial,
    finalizarTutorial,
    reiniciarTutorial,

    // Utilitários
    jaVisto,
    totalEtapas: tutorialConfig?.etapas.length || 0,
    etapaAtualData: tutorialConfig?.etapas[etapaAtual] || null,
    progresso: tutorialConfig ? ((etapaAtual + 1) / tutorialConfig.etapas.length) * 100 : 0,
  }
}
