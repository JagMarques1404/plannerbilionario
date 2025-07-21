"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Circle,
  Clock,
  Users,
  Target,
  TrendingUp,
  AlertTriangle,
  Star,
  Zap,
  Shield,
  Sparkles,
} from "lucide-react"
import { calculateProgress, calculateCategoryProgress, formatTimeEstimate, getPriorityColor } from "@/lib/utils"

interface ChecklistItem {
  id: string
  name: string
  completed: boolean
  priority: "alta" | "media" | "baixa"
  timeEstimate: number
  timeInvested: number
  responsible: string
  description?: string
}

interface ChecklistCategory {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  items: ChecklistItem[]
  color: string
}

const initialChecklist: ChecklistCategory[] = [
  {
    id: "guia-interativo",
    name: "🎯 Guia Interativo",
    icon: Target,
    color: "from-blue-500 to-cyan-500",
    items: [
      {
        id: "tutorial-popup",
        name: "Tutorial Pop-up",
        completed: false,
        priority: "alta",
        timeEstimate: 8,
        timeInvested: 0,
        responsible: "Frontend",
        description: "Sistema de tutoriais contextuais",
      },
      {
        id: "dicas-rapidas",
        name: "Dicas Rápidas",
        completed: false,
        priority: "media",
        timeEstimate: 4,
        timeInvested: 0,
        responsible: "UX/UI",
        description: "Tooltips e dicas inteligentes",
      },
      {
        id: "onboarding-gamificado",
        name: "Onboarding Gamificado",
        completed: false,
        priority: "alta",
        timeEstimate: 16,
        timeInvested: 0,
        responsible: "Frontend",
        description: "Processo de integração gamificado",
      },
      {
        id: "configuracao-usuario",
        name: "Configuração do Usuário",
        completed: false,
        priority: "media",
        timeEstimate: 6,
        timeInvested: 0,
        responsible: "Backend",
        description: "Personalização de preferências",
      },
      {
        id: "sistema-ajuda",
        name: "Sistema de Ajuda",
        completed: false,
        priority: "baixa",
        timeEstimate: 12,
        timeInvested: 0,
        responsible: "Frontend",
        description: "Central de ajuda integrada",
      },
    ],
  },
  {
    id: "carteira-social",
    name: "🤝 Carteira Social",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    items: [
      {
        id: "criacao-clubes",
        name: "Criação de Clubes",
        completed: false,
        priority: "alta",
        timeEstimate: 20,
        timeInvested: 0,
        responsible: "Backend",
        description: "Sistema de criação e gestão de clubes",
      },
      {
        id: "participacao-clubes",
        name: "Participação em Clubes",
        completed: false,
        priority: "alta",
        timeEstimate: 16,
        timeInvested: 0,
        responsible: "Frontend",
        description: "Interface para participar de clubes",
      },
      {
        id: "ranking-clubes",
        name: "Ranking de Clubes",
        completed: false,
        priority: "media",
        timeEstimate: 8,
        timeInvested: 0,
        responsible: "Backend",
        description: "Sistema de classificação de clubes",
      },
      {
        id: "sistema-indicacao",
        name: "Sistema de Indicação",
        completed: false,
        priority: "media",
        timeEstimate: 12,
        timeInvested: 0,
        responsible: "Backend",
        description: "Programa de referência e indicações",
      },
    ],
  },
  {
    id: "simulador-premios",
    name: "💰 Simulador Prêmios",
    icon: TrendingUp,
    color: "from-yellow-500 to-orange-500",
    items: [
      {
        id: "calculadora-roi",
        name: "Calculadora ROI",
        completed: true,
        priority: "alta",
        timeEstimate: 12,
        timeInvested: 12,
        responsible: "Frontend",
        description: "Calculadora de retorno sobre investimento",
      },
      {
        id: "simulador-premiacao-real",
        name: "Simulador Premiação Real",
        completed: false,
        priority: "alta",
        timeEstimate: 16,
        timeInvested: 4,
        responsible: "Backend",
        description: "Simulação de premiações baseada em dados reais",
      },
      {
        id: "cenarios-crescimento",
        name: "Cenários de Crescimento",
        completed: false,
        priority: "media",
        timeEstimate: 10,
        timeInvested: 0,
        responsible: "Data Science",
        description: "Projeções de crescimento patrimonial",
      },
      {
        id: "comparativo-investimentos",
        name: "Comparativo de Investimentos",
        completed: false,
        priority: "media",
        timeEstimate: 8,
        timeInvested: 0,
        responsible: "Frontend",
        description: "Comparação entre diferentes investimentos",
      },
    ],
  },
  {
    id: "transparencia",
    name: "🔍 Transparência",
    icon: Shield,
    color: "from-purple-500 to-pink-500",
    items: [
      {
        id: "dashboard-token",
        name: "Dashboard de Tokens",
        completed: false,
        priority: "alta",
        timeEstimate: 14,
        timeInvested: 0,
        responsible: "Frontend",
        description: "Painel de controle de tokens",
      },
      {
        id: "distribuicao-receitas",
        name: "Distribuição de Receitas",
        completed: false,
        priority: "alta",
        timeEstimate: 12,
        timeInvested: 0,
        responsible: "Backend",
        description: "Sistema de distribuição transparente",
      },
      {
        id: "maiores-holders",
        name: "Maiores Holders",
        completed: false,
        priority: "media",
        timeEstimate: 6,
        timeInvested: 0,
        responsible: "Frontend",
        description: "Ranking dos maiores detentores",
      },
      {
        id: "evolucao-joias",
        name: "Evolução das Joias",
        completed: false,
        priority: "baixa",
        timeEstimate: 8,
        timeInvested: 0,
        responsible: "Frontend",
        description: "Histórico de evolução das joias",
      },
    ],
  },
  {
    id: "social-feed",
    name: "📱 Social Feed",
    icon: Sparkles,
    color: "from-pink-500 to-rose-500",
    items: [
      {
        id: "feed-conquistas",
        name: "Feed de Conquistas",
        completed: false,
        priority: "alta",
        timeEstimate: 18,
        timeInvested: 0,
        responsible: "Frontend",
        description: "Timeline de conquistas dos usuários",
      },
      {
        id: "sistema-apadrinhamento",
        name: "Sistema de Apadrinhamento",
        completed: false,
        priority: "media",
        timeEstimate: 16,
        timeInvested: 0,
        responsible: "Backend",
        description: "Mentoria entre usuários",
      },
      {
        id: "celebracoes",
        name: "Celebrações",
        completed: true,
        priority: "media",
        timeEstimate: 10,
        timeInvested: 10,
        responsible: "Frontend",
        description: "Sistema de celebrações e conquistas",
      },
      {
        id: "notificacoes",
        name: "Notificações",
        completed: true,
        priority: "alta",
        timeEstimate: 12,
        timeInvested: 12,
        responsible: "Backend",
        description: "Sistema de notificações em tempo real",
      },
    ],
  },
  {
    id: "monetizacao",
    name: "💳 Monetização",
    icon: Zap,
    color: "from-indigo-500 to-purple-500",
    items: [
      {
        id: "produtos-premium",
        name: "Produtos Premium",
        completed: false,
        priority: "alta",
        timeEstimate: 24,
        timeInvested: 0,
        responsible: "Full Stack",
        description: "Loja de produtos premium",
      },
      {
        id: "quizzes-patrocinados",
        name: "Quizzes Patrocinados",
        completed: false,
        priority: "media",
        timeEstimate: 14,
        timeInvested: 0,
        responsible: "Backend",
        description: "Sistema de quizzes com patrocínio",
      },
      {
        id: "sistema-afiliados",
        name: "Sistema de Afiliados",
        completed: false,
        priority: "media",
        timeEstimate: 20,
        timeInvested: 0,
        responsible: "Backend",
        description: "Programa de afiliados",
      },
      {
        id: "programa-fidelidade",
        name: "Programa de Fidelidade",
        completed: false,
        priority: "baixa",
        timeEstimate: 16,
        timeInvested: 0,
        responsible: "Backend",
        description: "Sistema de pontos e recompensas",
      },
    ],
  },
  {
    id: "feedback-visual",
    name: "✨ Feedback Visual",
    icon: Star,
    color: "from-cyan-500 to-blue-500",
    items: [
      {
        id: "microinteracoes",
        name: "Microinterações",
        completed: true,
        priority: "media",
        timeEstimate: 16,
        timeInvested: 16,
        responsible: "Frontend",
        description: "Animações e feedback visual",
      },
      {
        id: "celebracoes-animadas",
        name: "Celebrações Animadas",
        completed: true,
        priority: "media",
        timeEstimate: 12,
        timeInvested: 12,
        responsible: "Frontend",
        description: "Animações para conquistas",
      },
      {
        id: "loading-states",
        name: "Loading States",
        completed: true,
        priority: "alta",
        timeEstimate: 8,
        timeInvested: 8,
        responsible: "Frontend",
        description: "Estados de carregamento elegantes",
      },
      {
        id: "responsividade",
        name: "Responsividade",
        completed: true,
        priority: "alta",
        timeEstimate: 20,
        timeInvested: 20,
        responsible: "Frontend",
        description: "Adaptação para todos os dispositivos",
      },
    ],
  },
  {
    id: "integracao-geral",
    name: "🔧 Integração Geral",
    icon: AlertTriangle,
    color: "from-red-500 to-pink-500",
    items: [
      {
        id: "navegacao-fluida",
        name: "Navegação Fluida",
        completed: false,
        priority: "alta",
        timeEstimate: 10,
        timeInvested: 0,
        responsible: "Frontend",
        description: "Transições suaves entre páginas",
      },
      {
        id: "sincronizacao-dados",
        name: "Sincronização de Dados",
        completed: false,
        priority: "alta",
        timeEstimate: 16,
        timeInvested: 0,
        responsible: "Backend",
        description: "Sincronização em tempo real",
      },
      {
        id: "performance-otimizada",
        name: "Performance Otimizada",
        completed: false,
        priority: "media",
        timeEstimate: 12,
        timeInvested: 0,
        responsible: "DevOps",
        description: "Otimização de performance",
      },
      {
        id: "seguranca-dados",
        name: "Segurança de Dados",
        completed: false,
        priority: "alta",
        timeEstimate: 18,
        timeInvested: 0,
        responsible: "Backend",
        description: "Implementação de segurança robusta",
      },
    ],
  },
]

export function ChecklistIntegracao() {
  const [checklist, setChecklist] = useState<ChecklistCategory[]>(initialChecklist)

  const toggleItem = (categoryId: string, itemId: string) => {
    setChecklist((prev) =>
      prev.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item,
              ),
            }
          : category,
      ),
    )
  }

  const overallProgress = calculateProgress(
    checklist.reduce(
      (acc, category) => ({
        ...acc,
        [category.id]: category.items.reduce(
          (itemAcc, item) => ({
            ...itemAcc,
            [item.id]: item.completed,
          }),
          {},
        ),
      }),
      {},
    ),
  )

  const totalTimeEstimate = checklist.reduce(
    (acc, category) => acc + category.items.reduce((itemAcc, item) => itemAcc + item.timeEstimate, 0),
    0,
  )

  const totalTimeInvested = checklist.reduce(
    (acc, category) => acc + category.items.reduce((itemAcc, item) => itemAcc + item.timeInvested, 0),
    0,
  )

  const completedItems = checklist.reduce(
    (acc, category) => acc + category.items.filter((item) => item.completed).length,
    0,
  )

  const totalItems = checklist.reduce((acc, category) => acc + category.items.length, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">✅ Checklist de Integração</h1>
            <p className="text-blue-100">Acompanhe o progresso de desenvolvimento do projeto</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{overallProgress}%</div>
            <div className="text-blue-100">Completo</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">
              {completedItems}/{totalItems}
            </div>
            <div className="text-sm text-blue-100">Itens Concluídos</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{formatTimeEstimate(totalTimeInvested)}</div>
            <div className="text-sm text-blue-100">Tempo Investido</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{formatTimeEstimate(totalTimeEstimate - totalTimeInvested)}</div>
            <div className="text-sm text-blue-100">Tempo Restante</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{checklist.length}</div>
            <div className="text-sm text-blue-100">Categorias</div>
          </div>
        </div>

        <div className="mt-4">
          <Progress value={overallProgress} className="h-3 bg-white/20" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {checklist.map((category) => {
          const categoryProgress = calculateCategoryProgress(
            category.items.reduce((acc, item) => ({ ...acc, [item.id]: item.completed }), {}),
          )

          const categoryTimeEstimate = category.items.reduce((acc, item) => acc + item.timeEstimate, 0)
          const categoryTimeInvested = category.items.reduce((acc, item) => acc + item.timeInvested, 0)

          return (
            <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className={`bg-gradient-to-r ${category.color} text-white`}>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5" />
                    {category.name}
                  </CardTitle>
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    {categoryProgress}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>{formatTimeEstimate(categoryTimeInvested)} investido</span>
                  <span>{formatTimeEstimate(categoryTimeEstimate)} total</span>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div key={item.id} className="group">
                      <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto"
                          onClick={() => toggleItem(category.id, item.id)}
                        >
                          {item.completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5 text-gray-400" />
                          )}
                        </Button>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4
                              className={`font-medium ${item.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                            >
                              {item.name}
                            </h4>
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </Badge>
                          </div>

                          {item.description && <p className="text-sm text-gray-600 mb-2">{item.description}</p>}

                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatTimeEstimate(item.timeEstimate)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {item.responsible}
                              </span>
                            </div>
                            {item.timeInvested > 0 && (
                              <span className="text-green-600 font-medium">
                                {formatTimeEstimate(item.timeInvested)} investido
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progresso da Categoria</span>
                    <span>{categoryProgress}%</span>
                  </div>
                  <Progress value={categoryProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
