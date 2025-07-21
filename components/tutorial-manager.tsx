"use client"

import type React from "react"
import { useEffect } from "react"
import { useTutorialInteligente } from "@/hooks/use-tutorial-inteligente"
import { TutorialPopup } from "./tutorial-popup"

interface TutorialManagerProps {
  pagina: string
  autoStart?: boolean
}

// Configurações de tutoriais para cada página
const tutoriaisConfig = {
  dashboard: {
    pagina: "dashboard",
    versao: "1.0",
    etapas: [
      {
        id: "welcome",
        titulo: "🎉 Bem-vindo ao Julius Investidor!",
        conteudo:
          "Vamos fazer um tour rápido pelas principais funcionalidades da plataforma. Este tutorial vai te ajudar a aproveitar ao máximo sua experiência!",
        video: "intro.mp4",
        dica: "Você pode rever este tutorial a qualquer momento clicando no ícone de ajuda.",
      },
      {
        id: "patrimonio",
        titulo: "💰 Seu Patrimônio Virtual",
        conteudo:
          "Aqui você acompanha seu patrimônio simulado. Todas as suas decisões de investimento são refletidas neste valor em tempo real.",
        elemento: "[data-tutorial='patrimonio']",
        posicao: "bottom",
        dica: "O patrimônio é atualizado automaticamente com base nas suas operações e performance do mercado.",
      },
      {
        id: "performance",
        titulo: "📈 Performance e Ranking",
        conteudo: "Acompanhe sua performance comparada a outros investidores e veja sua posição no ranking geral.",
        elemento: "[data-tutorial='performance']",
        posicao: "left",
        acao: "hover",
      },
      {
        id: "acoes-rapidas",
        titulo: "⚡ Ações Rápidas",
        conteudo:
          "Use estes botões para acessar rapidamente as funcionalidades mais importantes: investir, analisar e configurar.",
        elemento: "[data-tutorial='acoes-rapidas']",
        posicao: "top",
        acao: "click",
      },
    ],
  },

  gamificacao: {
    pagina: "gamificacao",
    versao: "1.0",
    etapas: [
      {
        id: "sistema-xp",
        titulo: "🎮 Sistema de XP",
        conteudo: "Ganhe experiência (XP) realizando investimentos, completando missões e participando da comunidade.",
        elemento: "[data-tutorial='xp']",
        posicao: "bottom",
      },
      {
        id: "badges",
        titulo: "🏆 Badges e Conquistas",
        conteudo: "Desbloqueie badges especiais atingindo marcos importantes na sua jornada de investimentos.",
        elemento: "[data-tutorial='badges']",
        posicao: "right",
        dica: "Alguns badges são raros e só podem ser obtidos em eventos especiais!",
      },
      {
        id: "missoes",
        titulo: "🎯 Missões Diárias",
        conteudo: "Complete missões diárias para ganhar XP extra e recompensas especiais.",
        elemento: "[data-tutorial='missoes']",
        posicao: "left",
        acao: "click",
      },
    ],
  },

  marketplace: {
    pagina: "marketplace",
    versao: "1.0",
    etapas: [
      {
        id: "nfts-investimento",
        titulo: "💎 NFTs de Investimento",
        conteudo:
          "Explore nossa coleção exclusiva de NFTs que representam diferentes estratégias e conquistas de investimento.",
        gif: "nfts-demo.gif",
      },
      {
        id: "comprar-vender",
        titulo: "🛒 Comprar e Vender",
        conteudo: "Use seus tokens Julius para comprar NFTs ou venda suas peças para outros investidores.",
        elemento: "[data-tutorial='marketplace-actions']",
        posicao: "bottom",
        acao: "click",
      },
    ],
  },

  "social-trading": {
    pagina: "social-trading",
    versao: "1.0",
    etapas: [
      {
        id: "carteiras-colaborativas",
        titulo: "🤝 Carteiras Colaborativas",
        conteudo:
          "Participe de carteiras gerenciadas em grupo ou crie a sua própria para outros investidores seguirem.",
        elemento: "[data-tutorial='carteiras']",
        posicao: "right",
      },
      {
        id: "copy-trading",
        titulo: "📋 Copy Trading",
        conteudo: "Copie automaticamente as operações dos melhores investidores da plataforma.",
        elemento: "[data-tutorial='copy-trading']",
        posicao: "bottom",
        dica: "Você pode definir limites de risco para o copy trading nas configurações.",
      },
    ],
  },
}

export const TutorialManager: React.FC<TutorialManagerProps> = ({ pagina, autoStart = true }) => {
  const {
    tutorialAtivo,
    etapaAtual,
    tutorialConfig,
    elementoDestacado,
    proximaEtapa,
    etapaAnterior,
    pularTutorial,
    finalizarTutorial,
    iniciarTutorial,
    totalEtapas,
    etapaAtualData,
    progresso,
  } = useTutorialInteligente()

  // Auto-iniciar tutorial se for a primeira vez
  useEffect(() => {
    if (autoStart && tutoriaisConfig[pagina]) {
      const config = tutoriaisConfig[pagina]
      setTimeout(() => {
        iniciarTutorial(config)
      }, 1000) // Delay para garantir que a página carregou
    }
  }, [pagina, autoStart, iniciarTutorial])

  // Destacar elemento atual
  useEffect(() => {
    if (elementoDestacado) {
      const elemento = document.querySelector(elementoDestacado)
      if (elemento) {
        // Adicionar classe de destaque
        elemento.classList.add("tutorial-highlight")

        // Scroll suave para o elemento
        elemento.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })

        // Remover destaque quando tutorial terminar
        return () => {
          elemento.classList.remove("tutorial-highlight")
        }
      }
    }
  }, [elementoDestacado])

  if (!tutorialAtivo || !etapaAtualData) {
    return null
  }

  return (
    <>
      <TutorialPopup
        titulo={etapaAtualData.titulo}
        conteudo={etapaAtualData.conteudo}
        etapaAtual={etapaAtual}
        totalEtapas={totalEtapas}
        progresso={progresso}
        video={etapaAtualData.video}
        gif={etapaAtualData.gif}
        dica={etapaAtualData.dica}
        acao={etapaAtualData.acao}
        onProximo={proximaEtapa}
        onAnterior={etapaAnterior}
        onPular={pularTutorial}
        onFechar={finalizarTutorial}
        podeVoltar={etapaAtual > 0}
        ultimaEtapa={etapaAtual === totalEtapas - 1}
      />

      {/* Overlay de destaque */}
      {elementoDestacado && (
        <style jsx global>{`
          .tutorial-highlight {
            position: relative;
            z-index: 1000;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 
                        0 0 0 8px rgba(59, 130, 246, 0.2);
            border-radius: 8px;
            animation: tutorial-pulse 2s infinite;
          }
          
          @keyframes tutorial-pulse {
            0%, 100% { 
              box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 
                          0 0 0 8px rgba(59, 130, 246, 0.2);
            }
            50% { 
              box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.7), 
                          0 0 0 12px rgba(59, 130, 246, 0.3);
            }
          }
        `}</style>
      )}
    </>
  )
}
