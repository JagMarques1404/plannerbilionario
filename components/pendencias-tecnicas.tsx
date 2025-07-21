"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, Clock, Users, Server, Monitor, Shield, Settings, Calendar } from "lucide-react"
import { calculateCategoryProgress, formatTimeEstimate, getPriorityColor } from "@/lib/utils"

interface PendenciaItem {
  id: string
  name: string
  description: string
  completed: boolean
  priority: "alta" | "media" | "baixa"
  impact: "alto" | "medio" | "baixo"
  timeEstimate: number
  deadline?: string
  responsible: string
  dependencies?: string[]
}

interface PendenciaCategory {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  items: PendenciaItem[]
  color: string
}

const initialPendencias: PendenciaCategory[] = [
  {
    id: "backend",
    name: "🏗️ Backend",
    icon: Server,
    color: "from-blue-600 to-blue-800",
    items: [
      {
        id: "auth-supabase",
        name: "Implementar autenticação robusta com Supabase",
        description: "Configurar sistema de autenticação completo com JWT, refresh tokens e middleware de segurança",
        completed: false,
        priority: "alta",
        impact: "alto",
        timeEstimate: 16,
        deadline: "2024-02-15",
        responsible: "Backend Team",
        dependencies: ["Configuração Supabase", "Middleware de segurança"],
      },
      {
        id: "cron-jobs",
        name: "Configurar CRON jobs para renovação automática",
        description: "Implementar tarefas automatizadas para renovação de tokens, limpeza de dados e relatórios",
        completed: false,
        priority: "alta",
        impact: "medio",
        timeEstimate: 12,
        deadline: "2024-02-20",
        responsible: "DevOps Team",
        dependencies: ["Infraestrutura de produção"],
      },
      {
        id: "optimize-queries",
        name: "Otimizar queries do banco de dados",
        description: "Análise e otimização de consultas SQL, criação de índices e melhoria de performance",
        completed: false,
        priority: "media",
        impact: "alto",
        timeEstimate: 20,
        deadline: "2024-03-01",
        responsible: "Backend Team",
        dependencies: ["Análise de performance", "Profiling de queries"],
      },
      {
        id: "redis-cache",
        name: "Implementar cache Redis para performance",
        description: "Configurar sistema de cache distribuído para melhorar tempo de resposta das APIs",
        completed: false,
        priority: "media",
        impact: "medio",
        timeEstimate: 14,
        deadline: "2024-02-25",
        responsible: "Backend Team",
        dependencies: ["Infraestrutura Redis", "Estratégia de cache"],
      },
      {
        id: "api-versioning",
        name: "Implementar versionamento de API",
        description: "Sistema de versionamento para manter compatibilidade e facilitar atualizações",
        completed: false,
        priority: "baixa",
        impact: "medio",
        timeEstimate: 8,
        responsible: "Backend Team",
      },
    ],
  },
  {
    id: "frontend",
    name: "💻 Frontend",
    icon: Monitor,
    color: "from-green-600 to-green-800",
    items: [
      {
        id: "lazy-loading",
        name: "Implementar lazy loading para componentes pesados",
        description: "Carregamento sob demanda de componentes para melhorar performance inicial",
        completed: true,
        priority: "alta",
        impact: "alto",
        timeEstimate: 10,
        responsible: "Frontend Team",
      },
      {
        id: "code-splitting",
        name: "Otimizar bundle size com code splitting",
        description: "Divisão do código em chunks menores para carregamento mais eficiente",
        completed: false,
        priority: "alta",
        impact: "alto",
        timeEstimate: 12,
        deadline: "2024-02-18",
        responsible: "Frontend Team",
        dependencies: ["Análise de bundle", "Webpack config"],
      },
      {
        id: "service-worker",
        name: "Adicionar service worker para PWA",
        description: "Implementar PWA com cache offline e notificações push",
        completed: false,
        priority: "media",
        impact: "medio",
        timeEstimate: 16,
        deadline: "2024-03-10",
        responsible: "Frontend Team",
        dependencies: ["Estratégia de cache", "Manifest PWA"],
      },
      {
        id: "skeleton-loading",
        name: "Implementar skeleton loading states",
        description: "Estados de carregamento elegantes para melhor UX",
        completed: true,
        priority: "media",
        impact: "baixo",
        timeEstimate: 8,
        responsible: "Frontend Team",
      },
      {
        id: "error-boundaries",
        name: "Implementar Error Boundaries",
        description: "Tratamento de erros em componentes React para melhor estabilidade",
        completed: false,
        priority: "media",
        impact: "medio",
        timeEstimate: 6,
        deadline: "2024-02-22",
        responsible: "Frontend Team",
      },
    ],
  },
  {
    id: "seguranca",
    name: "🔒 Segurança",
    icon: Shield,
    color: "from-red-600 to-red-800",
    items: [
      {
        id: "rate-limiting",
        name: "Implementar rate limiting nas APIs",
        description: "Proteção contra ataques DDoS e uso abusivo das APIs",
        completed: false,
        priority: "alta",
        impact: "alto",
        timeEstimate: 8,
        deadline: "2024-02-12",
        responsible: "Backend Team",
        dependencies: ["Middleware de rate limiting", "Configuração Redis"],
      },
      {
        id: "input-validation",
        name: "Adicionar validação de entrada robusta",
        description: "Validação e sanitização de todos os inputs para prevenir ataques",
        completed: false,
        priority: "alta",
        impact: "alto",
        timeEstimate: 12,
        deadline: "2024-02-16",
        responsible: "Backend Team",
        dependencies: ["Schema de validação", "Sanitização de dados"],
      },
      {
        id: "https-csp",
        name: "Configurar HTTPS e CSP headers",
        description: "Implementar HTTPS obrigatório e Content Security Policy",
        completed: false,
        priority: "alta",
        impact: "alto",
        timeEstimate: 6,
        deadline: "2024-02-10",
        responsible: "DevOps Team",
        dependencies: ["Certificado SSL", "Configuração de headers"],
      },
      {
        id: "security-audit",
        name: "Implementar auditoria de segurança",
        description: "Sistema de logs de segurança e monitoramento de atividades suspeitas",
        completed: false,
        priority: "media",
        impact: "medio",
        timeEstimate: 14,
        deadline: "2024-03-05",
        responsible: "Security Team",
        dependencies: ["Sistema de logs", "Alertas de segurança"],
      },
      {
        id: "data-encryption",
        name: "Criptografia de dados sensíveis",
        description: "Implementar criptografia para dados pessoais e financeiros",
        completed: false,
        priority: "alta",
        impact: "alto",
        timeEstimate: 10,
        deadline: "2024-02-20",
        responsible: "Backend Team",
      },
    ],
  },
  {
    id: "producao",
    name: "🚀 Produção",
    icon: Settings,
    color: "from-purple-600 to-purple-800",
    items: [
      {
        id: "monitoring-sentry",
        name: "Configurar monitoramento com Sentry",
        description: "Sistema de monitoramento de erros e performance em produção",
        completed: false,
        priority: "alta",
        impact: "alto",
        timeEstimate: 8,
        deadline: "2024-02-14",
        responsible: "DevOps Team",
        dependencies: ["Conta Sentry", "Configuração de alertas"],
      },
      {
        id: "analytics",
        name: "Implementar analytics detalhado",
        description: "Sistema de analytics para acompanhar uso e comportamento dos usuários",
        completed: false,
        priority: "media",
        impact: "medio",
        timeEstimate: 12,
        deadline: "2024-02-28",
        responsible: "Data Team",
        dependencies: ["Google Analytics", "Custom events"],
      },
      {
        id: "backup-automatico",
        name: "Configurar backup automático do banco",
        description: "Sistema de backup automatizado com retenção e recuperação",
        completed: false,
        priority: "alta",
        impact: "alto",
        timeEstimate: 10,
        deadline: "2024-02-18",
        responsible: "DevOps Team",
        dependencies: ["Estratégia de backup", "Testes de recuperação"],
      },
      {
        id: "staging-environment",
        name: "Preparar ambiente de staging",
        description: "Ambiente de homologação idêntico à produção para testes",
        completed: false,
        priority: "media",
        impact: "medio",
        timeEstimate: 16,
        deadline: "2024-03-01",
        responsible: "DevOps Team",
        dependencies: ["Infraestrutura", "Pipeline CI/CD"],
      },
      {
        id: "load-testing",
        name: "Implementar testes de carga",
        description: "Testes automatizados de performance e capacidade do sistema",
        completed: false,
        priority: "media",
        impact: "alto",
        timeEstimate: 12,
        deadline: "2024-03-15",
        responsible: "QA Team",
      },
    ],
  },
]

export function PendenciasTecnicas() {
  const [pendencias, setPendencias] = useState<PendenciaCategory[]>(initialPendencias)

  const toggleItem = (categoryId: string, itemId: string) => {
    setPendencias((prev) =>
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

  const getImpactColor = (impact: "alto" | "medio" | "baixo") => {
    switch (impact) {
      case "alto":
        return "bg-red-100 text-red-800 border-red-200"
      case "medio":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "baixo":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const isOverdue = (deadline?: string) => {
    if (!deadline) return false
    return new Date(deadline) < new Date()
  }

  const getDaysUntilDeadline = (deadline?: string) => {
    if (!deadline) return null
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return days
  }

  const overallStats = pendencias.reduce(
    (acc, category) => {
      const completed = category.items.filter((item) => item.completed).length
      const total = category.items.length
      const overdue = category.items.filter((item) => !item.completed && isOverdue(item.deadline)).length
      const highPriority = category.items.filter((item) => !item.completed && item.priority === "alta").length

      return {
        completed: acc.completed + completed,
        total: acc.total + total,
        overdue: acc.overdue + overdue,
        highPriority: acc.highPriority + highPriority,
      }
    },
    { completed: 0, total: 0, overdue: 0, highPriority: 0 },
  )

  const overallProgress = Math.round((overallStats.completed / overallStats.total) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🔧 Pendências Técnicas</h1>
            <p className="text-red-100">Acompanhe as tarefas críticas para produção</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{overallProgress}%</div>
            <div className="text-red-100">Concluído</div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">
              {overallStats.completed}/{overallStats.total}
            </div>
            <div className="text-sm text-red-100">Tarefas Concluídas</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-300">{overallStats.highPriority}</div>
            <div className="text-sm text-red-100">Alta Prioridade</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-300">{overallStats.overdue}</div>
            <div className="text-sm text-red-100">Em Atraso</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{pendencias.length}</div>
            <div className="text-sm text-red-100">Categorias</div>
          </div>
        </div>

        <div className="mt-4">
          <Progress value={overallProgress} className="h-3 bg-white/20" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {pendencias.map((category) => {
          const categoryProgress = calculateCategoryProgress(
            category.items.reduce((acc, item) => ({ ...acc, [item.id]: item.completed }), {}),
          )

          const categoryOverdue = category.items.filter((item) => !item.completed && isOverdue(item.deadline)).length
          const categoryHighPriority = category.items.filter(
            (item) => !item.completed && item.priority === "alta",
          ).length

          return (
            <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className={`bg-gradient-to-r ${category.color} text-white`}>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="h-5 w-5" />
                    {category.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {categoryOverdue > 0 && (
                      <Badge variant="destructive" className="bg-red-500">
                        {categoryOverdue} atrasadas
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {categoryProgress}%
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>
                    {category.items.filter((item) => item.completed).length} de {category.items.length} concluídas
                  </span>
                  {categoryHighPriority > 0 && (
                    <span className="text-yellow-300">{categoryHighPriority} alta prioridade</span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="space-y-4">
                  {category.items.map((item) => {
                    const daysUntilDeadline = getDaysUntilDeadline(item.deadline)
                    const overdue = isOverdue(item.deadline)

                    return (
                      <div
                        key={item.id}
                        className={`group border rounded-lg p-4 transition-colors ${
                          overdue ? "border-red-200 bg-red-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-0 h-auto mt-1"
                            onClick={() => toggleItem(category.id, item.id)}
                          >
                            {item.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400" />
                            )}
                          </Button>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <h4
                                className={`font-semibold ${item.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                              >
                                {item.name}
                              </h4>
                              <div className="flex items-center gap-2 ml-2">
                                <Badge variant="outline" className={`text-xs ${getPriorityColor(item.priority)}`}>
                                  {item.priority}
                                </Badge>
                                <Badge variant="outline" className={`text-xs ${getImpactColor(item.impact)}`}>
                                  {item.impact} impacto
                                </Badge>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-3">{item.description}</p>

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
                                {item.deadline && (
                                  <span
                                    className={`flex items-center gap-1 ${
                                      overdue
                                        ? "text-red-600 font-medium"
                                        : daysUntilDeadline && daysUntilDeadline <= 3
                                          ? "text-yellow-600 font-medium"
                                          : ""
                                    }`}
                                  >
                                    <Calendar className="h-3 w-3" />
                                    {overdue
                                      ? "Atrasado"
                                      : daysUntilDeadline === 0
                                        ? "Hoje"
                                        : daysUntilDeadline === 1
                                          ? "Amanhã"
                                          : daysUntilDeadline && daysUntilDeadline > 0
                                            ? `${daysUntilDeadline} dias`
                                            : new Date(item.deadline).toLocaleDateString("pt-BR")}
                                  </span>
                                )}
                              </div>
                            </div>

                            {item.dependencies && item.dependencies.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-1">Dependências:</p>
                                <div className="flex flex-wrap gap-1">
                                  {item.dependencies.map((dep, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {dep}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
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
