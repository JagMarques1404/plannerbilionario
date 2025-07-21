"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  Brain,
  Zap,
  Target,
  TrendingUp,
  Bot,
  Globe,
  BarChart3,
  Lightbulb,
  Rocket,
  Award,
} from "lucide-react"

interface AnaliseItem {
  id: string
  categoria: string
  titulo: string
  status: "completo" | "parcial" | "pendente" | "critico"
  prioridade: "alta" | "media" | "baixa"
  complexidade: "baixa" | "media" | "alta"
  tempoEstimado: number
  impactoUsuario: "alto" | "medio" | "baixo"
  colaboracaoManus: {
    pode: boolean
    tipo: "automacao" | "ia" | "integracao" | "otimizacao" | "analise"
    descricao: string
    beneficio: string
  }
  detalhes: string
  dependencias?: string[]
}

export default function AnaliseCompleta() {
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todos")
  const [filtroManus, setFiltroManus] = useState<boolean>(false)

  const analiseCompleta: AnaliseItem[] = [
    // BACKEND & INFRAESTRUTURA
    {
      id: "auth-sistema",
      categoria: "Backend",
      titulo: "Sistema de Autenticação Robusto",
      status: "parcial",
      prioridade: "alta",
      complexidade: "alta",
      tempoEstimado: 16,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "automacao",
        descricao: "Automação de testes de segurança, geração de tokens JWT, middleware de autenticação",
        beneficio: "Redução de 60% no tempo de desenvolvimento e testes automatizados de segurança",
      },
      detalhes: "Implementação completa com Supabase, JWT, refresh tokens, middleware de segurança, roles e permissões",
      dependencias: ["Configuração Supabase", "Middleware de segurança"],
    },
    {
      id: "api-performance",
      categoria: "Backend",
      titulo: "Otimização de Performance das APIs",
      status: "pendente",
      prioridade: "alta",
      complexidade: "alta",
      tempoEstimado: 24,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "analise",
        descricao: "Análise automática de queries SQL, identificação de gargalos, sugestões de otimização",
        beneficio: "Melhoria de 40% na performance e identificação automática de problemas",
      },
      detalhes: "Cache Redis, otimização de queries, índices de banco, rate limiting, compressão de dados",
      dependencias: ["Análise de performance", "Infraestrutura Redis"],
    },
    {
      id: "microservicos",
      categoria: "Backend",
      titulo: "Arquitetura de Microserviços",
      status: "pendente",
      prioridade: "media",
      complexidade: "alta",
      tempoEstimado: 40,
      impactoUsuario: "medio",
      colaboracaoManus: {
        pode: true,
        tipo: "automacao",
        descricao: "Geração automática de APIs, documentação Swagger, testes de integração",
        beneficio: "Aceleração de 50% no desenvolvimento de APIs e documentação automática",
      },
      detalhes: "Separação de serviços, API Gateway, comunicação entre serviços, monitoramento distribuído",
    },

    // FRONTEND & UX
    {
      id: "interface-responsiva",
      categoria: "Frontend",
      titulo: "Interface Totalmente Responsiva",
      status: "parcial",
      prioridade: "alta",
      complexidade: "media",
      tempoEstimado: 20,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "automacao",
        descricao: "Geração automática de breakpoints, testes de responsividade, otimização de imagens",
        beneficio: "Redução de 70% no tempo de testes em diferentes dispositivos",
      },
      detalhes: "Adaptação perfeita para mobile, tablet, desktop, PWA, touch gestures",
      dependencias: ["Design system", "Componentes base"],
    },
    {
      id: "animacoes-avancadas",
      categoria: "Frontend",
      titulo: "Sistema de Animações e Microinterações",
      status: "parcial",
      prioridade: "media",
      complexidade: "media",
      tempoEstimado: 16,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "ia",
        descricao: "IA para gerar animações contextuais baseadas no comportamento do usuário",
        beneficio: "Experiência personalizada e engajamento 30% maior",
      },
      detalhes: "Framer Motion, animações de loading, transições de página, feedback visual",
    },
    {
      id: "acessibilidade",
      categoria: "Frontend",
      titulo: "Acessibilidade Completa (WCAG 2.1)",
      status: "pendente",
      prioridade: "alta",
      complexidade: "media",
      tempoEstimado: 18,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "automacao",
        descricao: "Auditoria automática de acessibilidade, geração de ARIA labels, testes automatizados",
        beneficio: "Conformidade automática com padrões e redução de 80% em testes manuais",
      },
      detalhes: "ARIA labels, navegação por teclado, contraste, screen readers, foco visual",
    },

    // GAMIFICAÇÃO & ENGAJAMENTO
    {
      id: "sistema-conquistas",
      categoria: "Gamificação",
      titulo: "Sistema Avançado de Conquistas",
      status: "parcial",
      prioridade: "alta",
      complexidade: "alta",
      tempoEstimado: 32,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "ia",
        descricao: "IA para criar conquistas dinâmicas baseadas no comportamento individual do usuário",
        beneficio: "Engajamento personalizado e retenção 45% maior",
      },
      detalhes: "Badges dinâmicos, níveis adaptativos, recompensas personalizadas, progressão inteligente",
      dependencias: ["Sistema de usuários", "Analytics comportamental"],
    },
    {
      id: "ia-recomendacoes",
      categoria: "Gamificação",
      titulo: "Sistema de Recomendações Inteligentes",
      status: "pendente",
      prioridade: "alta",
      complexidade: "alta",
      tempoEstimado: 28,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "ia",
        descricao: "Machine Learning para recomendações personalizadas de investimentos e conteúdo educativo",
        beneficio: "Personalização avançada e conversão 60% maior",
      },
      detalhes: "ML para sugestões de investimento, conteúdo personalizado, análise de perfil de risco",
    },
    {
      id: "social-trading",
      categoria: "Gamificação",
      titulo: "Plataforma de Social Trading",
      status: "parcial",
      prioridade: "media",
      complexidade: "alta",
      tempoEstimado: 36,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "ia",
        descricao: "IA para análise de performance de traders, detecção de padrões, alertas inteligentes",
        beneficio: "Insights automáticos e decisões de investimento 40% mais assertivas",
      },
      detalhes: "Copy trading, ranking de traders, análise de performance, comunidade de investidores",
    },

    // EDUCAÇÃO & CONTEÚDO
    {
      id: "conteudo-adaptativo",
      categoria: "Educação",
      titulo: "Sistema de Conteúdo Educativo Adaptativo",
      status: "pendente",
      prioridade: "alta",
      complexidade: "alta",
      tempoEstimado: 30,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "ia",
        descricao: "IA para adaptar conteúdo ao nível de conhecimento, gerar quizzes personalizados",
        beneficio: "Aprendizado 50% mais eficiente e retenção de conhecimento otimizada",
      },
      detalhes: "Trilhas de aprendizado personalizadas, quizzes adaptativos, simuladores interativos",
    },
    {
      id: "chatbot-educativo",
      categoria: "Educação",
      titulo: "Assistente Virtual Educativo",
      status: "pendente",
      prioridade: "media",
      complexidade: "alta",
      tempoEstimado: 24,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "ia",
        descricao: "Chatbot inteligente para dúvidas sobre investimentos, explicações personalizadas",
        beneficio: "Suporte 24/7 e redução de 70% no tempo de resposta a dúvidas",
      },
      detalhes: "NLP para entender dúvidas, base de conhecimento dinâmica, respostas contextuais",
    },

    // ANALYTICS & INTELIGÊNCIA
    {
      id: "analytics-avancado",
      categoria: "Analytics",
      titulo: "Sistema de Analytics Comportamental",
      status: "pendente",
      prioridade: "alta",
      complexidade: "alta",
      tempoEstimado: 22,
      impactoUsuario: "medio",
      colaboracaoManus: {
        pode: true,
        tipo: "analise",
        descricao: "IA para análise preditiva de comportamento, identificação de padrões de churn",
        beneficio: "Insights automáticos e prevenção de churn com 80% de precisão",
      },
      detalhes: "Tracking avançado, heatmaps, análise de jornada, predição de comportamento",
    },
    {
      id: "dashboard-executivo",
      categoria: "Analytics",
      titulo: "Dashboard Executivo Inteligente",
      status: "pendente",
      prioridade: "media",
      complexidade: "media",
      tempoEstimado: 16,
      impactoUsuario: "medio",
      colaboracaoManus: {
        pode: true,
        tipo: "automacao",
        descricao: "Geração automática de relatórios, alertas inteligentes, visualizações dinâmicas",
        beneficio: "Relatórios automáticos e insights em tempo real",
      },
      detalhes: "KPIs em tempo real, alertas automáticos, relatórios personalizados, previsões",
    },

    // SEGURANÇA & COMPLIANCE
    {
      id: "seguranca-avancada",
      categoria: "Segurança",
      titulo: "Sistema de Segurança Multicamadas",
      status: "parcial",
      prioridade: "alta",
      complexidade: "alta",
      tempoEstimado: 26,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "automacao",
        descricao: "Monitoramento automático de ameaças, detecção de anomalias, resposta automática",
        beneficio: "Proteção 24/7 e resposta automática a ameaças em tempo real",
      },
      detalhes: "WAF, DDoS protection, monitoramento de ameaças, auditoria automática",
    },
    {
      id: "compliance-lgpd",
      categoria: "Segurança",
      titulo: "Conformidade LGPD Completa",
      status: "pendente",
      prioridade: "alta",
      complexidade: "media",
      tempoEstimado: 14,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "automacao",
        descricao: "Auditoria automática de conformidade, geração de relatórios, gestão de consentimentos",
        beneficio: "Conformidade automática e redução de riscos legais",
      },
      detalhes: "Gestão de consentimentos, anonimização de dados, relatórios de conformidade",
    },

    // MONETIZAÇÃO & BUSINESS
    {
      id: "marketplace-premium",
      categoria: "Monetização",
      titulo: "Marketplace de Produtos Premium",
      status: "parcial",
      prioridade: "alta",
      complexidade: "media",
      tempoEstimado: 28,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "ia",
        descricao: "IA para recomendações de produtos, pricing dinâmico, análise de demanda",
        beneficio: "Conversão 35% maior e otimização automática de preços",
      },
      detalhes: "Loja integrada, pagamentos, gestão de produtos, sistema de afiliados",
    },
    {
      id: "programa-fidelidade",
      categoria: "Monetização",
      titulo: "Programa de Fidelidade Inteligente",
      status: "pendente",
      prioridade: "media",
      complexidade: "media",
      tempoEstimado: 20,
      impactoUsuario: "alto",
      colaboracaoManus: {
        pode: true,
        tipo: "ia",
        descricao: "IA para personalizar recompensas, prever comportamento de compra, otimizar ofertas",
        beneficio: "Retenção 40% maior e lifetime value otimizado",
      },
      detalhes: "Pontos dinâmicos, recompensas personalizadas, tiers de fidelidade, cashback inteligente",
    },

    // INFRAESTRUTURA & DEVOPS
    {
      id: "ci-cd-avancado",
      categoria: "DevOps",
      titulo: "Pipeline CI/CD Avançado",
      status: "parcial",
      prioridade: "alta",
      complexidade: "alta",
      tempoEstimado: 18,
      impactoUsuario: "baixo",
      colaboracaoManus: {
        pode: true,
        tipo: "automacao",
        descricao: "Automação completa de testes, deploy inteligente, rollback automático",
        beneficio: "Deploy 90% mais rápido e zero downtime",
      },
      detalhes: "Testes automatizados, deploy blue-green, monitoramento de saúde, rollback automático",
    },
    {
      id: "monitoramento-ia",
      categoria: "DevOps",
      titulo: "Monitoramento Inteligente com IA",
      status: "pendente",
      prioridade: "media",
      complexidade: "alta",
      tempoEstimado: 16,
      impactoUsuario: "baixo",
      colaboracaoManus: {
        pode: true,
        tipo: "ia",
        descricao: "IA para predição de falhas, otimização automática de recursos, alertas inteligentes",
        beneficio: "Prevenção de 95% das falhas e otimização automática de custos",
      },
      detalhes: "Predição de falhas, auto-scaling inteligente, otimização de custos, alertas contextuais",
    },
  ]

  const estatisticas = {
    total: analiseCompleta.length,
    completo: analiseCompleta.filter((item) => item.status === "completo").length,
    parcial: analiseCompleta.filter((item) => item.status === "parcial").length,
    pendente: analiseCompleta.filter((item) => item.status === "pendente").length,
    critico: analiseCompleta.filter((item) => item.status === "critico").length,
    manusColaboracao: analiseCompleta.filter((item) => item.colaboracaoManus.pode).length,
    tempoTotal: analiseCompleta.reduce((acc, item) => acc + item.tempoEstimado, 0),
  }

  const progressoGeral = Math.round(((estatisticas.completo + estatisticas.parcial * 0.5) / estatisticas.total) * 100)

  const categorias = [...new Set(analiseCompleta.map((item) => item.categoria))]

  const itensFiltrados = analiseCompleta.filter((item) => {
    const filtroCategoriaPassa = filtroCategoria === "todos" || item.categoria === filtroCategoria
    const filtroManusPassa = !filtroManus || item.colaboracaoManus.pode
    return filtroCategoriaPassa && filtroManusPassa
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completo":
        return "bg-green-100 text-green-800"
      case "parcial":
        return "bg-yellow-100 text-yellow-800"
      case "pendente":
        return "bg-gray-100 text-gray-800"
      case "critico":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completo":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "parcial":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "pendente":
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
      case "critico":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getTipoManusIcon = (tipo: string) => {
    switch (tipo) {
      case "automacao":
        return <Zap className="h-4 w-4" />
      case "ia":
        return <Brain className="h-4 w-4" />
      case "integracao":
        return <Globe className="h-4 w-4" />
      case "otimizacao":
        return <TrendingUp className="h-4 w-4" />
      case "analise":
        return <BarChart3 className="h-4 w-4" />
      default:
        return <Bot className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header com Estatísticas */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">🔍 Análise Completa do Projeto</h1>
            <p className="text-purple-100">Avaliação detalhada e oportunidades de colaboração com Manus.IA</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{progressoGeral}%</div>
            <div className="text-purple-100">Progresso Geral</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{estatisticas.total}</div>
            <div className="text-sm text-purple-100">Total de Itens</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-300">{estatisticas.completo}</div>
            <div className="text-sm text-purple-100">Completos</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-300">{estatisticas.parcial}</div>
            <div className="text-sm text-purple-100">Parciais</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-300">{estatisticas.pendente}</div>
            <div className="text-sm text-purple-100">Pendentes</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-300">{estatisticas.manusColaboracao}</div>
            <div className="text-sm text-purple-100">Manus.IA</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">{Math.round(estatisticas.tempoTotal / 8)}</div>
            <div className="text-sm text-purple-100">Dias Estimados</div>
          </div>
        </div>

        <div className="mt-4">
          <Progress value={progressoGeral} className="h-3 bg-white/20" />
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Filtros de Análise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Categoria:</label>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="todos">Todas</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="filtro-manus"
                checked={filtroManus}
                onChange={(e) => setFiltroManus(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="filtro-manus" className="text-sm font-medium">
                Apenas com colaboração Manus.IA
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Análise */}
      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="manus">Colaboração Manus.IA</TabsTrigger>
          <TabsTrigger value="prioridades">Prioridades</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {itensFiltrados.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{item.titulo}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.categoria}
                        </Badge>
                        <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          {item.status}
                        </Badge>
                        <Badge
                          variant={
                            item.prioridade === "alta"
                              ? "destructive"
                              : item.prioridade === "media"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {item.prioridade} prioridade
                        </Badge>
                      </div>
                    </div>
                    {item.colaboracaoManus.pode && (
                      <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        <Bot className="h-3 w-3" />
                        Manus.IA
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{item.detalhes}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div>
                      <span className="font-medium">Complexidade:</span>
                      <Badge
                        variant="outline"
                        className={`ml-2 ${
                          item.complexidade === "alta"
                            ? "text-red-600"
                            : item.complexidade === "media"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      >
                        {item.complexidade}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-medium">Impacto:</span>
                      <Badge
                        variant="outline"
                        className={`ml-2 ${
                          item.impactoUsuario === "alto"
                            ? "text-green-600"
                            : item.impactoUsuario === "medio"
                              ? "text-yellow-600"
                              : "text-gray-600"
                        }`}
                      >
                        {item.impactoUsuario}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.tempoEstimado}h estimadas
                    </span>
                    {item.dependencias && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {item.dependencias.length} dependências
                      </span>
                    )}
                  </div>

                  {item.colaboracaoManus.pode && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        {getTipoManusIcon(item.colaboracaoManus.tipo)}
                        <span className="font-medium text-blue-800 text-sm">
                          Colaboração Manus.IA - {item.colaboracaoManus.tipo}
                        </span>
                      </div>
                      <p className="text-xs text-blue-700 mb-2">{item.colaboracaoManus.descricao}</p>
                      <p className="text-xs text-green-700 font-medium">
                        💡 Benefício: {item.colaboracaoManus.beneficio}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manus" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-blue-600" />
                Oportunidades de Colaboração com Manus.IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {["automacao", "ia", "analise", "otimizacao", "integracao"].map((tipo) => {
                  const count = analiseCompleta.filter((item) => item.colaboracaoManus.tipo === tipo).length
                  return (
                    <div key={tipo} className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">{getTipoManusIcon(tipo)}</div>
                      <div className="text-2xl font-bold text-blue-600">{count}</div>
                      <div className="text-sm text-blue-700 capitalize">{tipo}</div>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-4">
                {analiseCompleta
                  .filter((item) => item.colaboracaoManus.pode)
                  .map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{item.titulo}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {item.categoria}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800 text-xs">
                            {getTipoManusIcon(item.colaboracaoManus.tipo)}
                            {item.colaboracaoManus.tipo}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.colaboracaoManus.descricao}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Lightbulb className="h-4 w-4 text-yellow-500" />
                        <span className="text-green-700 font-medium">{item.colaboracaoManus.beneficio}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prioridades" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["alta", "media", "baixa"].map((prioridade) => {
              const itens = analiseCompleta.filter((item) => item.prioridade === prioridade)
              return (
                <Card key={prioridade}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 capitalize">
                      {prioridade === "alta" ? (
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      ) : prioridade === "media" ? (
                        <Clock className="h-5 w-5 text-yellow-600" />
                      ) : (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      )}
                      Prioridade {prioridade}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {itens.map((item) => (
                        <div key={item.id} className="p-3 border rounded-lg">
                          <h5 className="font-medium text-sm mb-1">{item.titulo}</h5>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{item.categoria}</span>
                            <span>{item.tempoEstimado}h</span>
                          </div>
                          {item.colaboracaoManus.pode && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-blue-600">
                              <Bot className="h-3 w-3" />
                              Manus.IA pode colaborar
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Roadmap de Desenvolvimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {["Fase 1: Fundação", "Fase 2: Gamificação", "Fase 3: IA & Analytics", "Fase 4: Otimização"].map(
                  (fase, index) => {
                    const itensFase = analiseCompleta.filter((item) => {
                      if (index === 0) return ["Backend", "Frontend", "Segurança"].includes(item.categoria)
                      if (index === 1) return ["Gamificação", "Educação"].includes(item.categoria)
                      if (index === 2) return ["Analytics", "IA"].includes(item.categoria)
                      return ["DevOps", "Monetização"].includes(item.categoria)
                    })

                    const tempoFase = itensFase.reduce((acc, item) => acc + item.tempoEstimado, 0)
                    const completosFase = itensFase.filter((item) => item.status === "completo").length
                    const progressoFase = Math.round((completosFase / itensFase.length) * 100)

                    return (
                      <div key={fase} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{fase}</h3>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">{Math.round(tempoFase / 8)} dias</Badge>
                            <Badge className="bg-blue-100 text-blue-800">{progressoFase}%</Badge>
                          </div>
                        </div>
                        <Progress value={progressoFase} className="mb-4" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {itensFase.slice(0, 6).map((item) => (
                            <div key={item.id} className="flex items-center gap-2 text-sm">
                              {getStatusIcon(item.status)}
                              <span className={item.status === "completo" ? "line-through text-gray-500" : ""}>
                                {item.titulo}
                              </span>
                              {item.colaboracaoManus.pode && <Bot className="h-3 w-3 text-blue-600" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  },
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Resumo Executivo */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Award className="h-5 w-5" />
            Resumo Executivo & Recomendações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-3">🎯 Pontos Fortes</h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Sistema de gamificação bem estruturado</li>
                <li>• Interface responsiva em desenvolvimento</li>
                <li>• Arquitetura escalável planejada</li>
                <li>• Foco em experiência do usuário</li>
                <li>• Transparência como diferencial</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">🚀 Oportunidades Manus.IA</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• IA para personalização de conteúdo educativo</li>
                <li>• Automação de testes e deploy</li>
                <li>• Analytics preditivo de comportamento</li>
                <li>• Chatbot educativo inteligente</li>
                <li>• Otimização automática de performance</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
            <h4 className="font-semibold text-gray-800 mb-2">💡 Recomendação Principal</h4>
            <p className="text-sm text-gray-700">
              Priorizar a colaboração com Manus.IA nas áreas de <strong>IA educativa</strong> e{" "}
              <strong>automação de desenvolvimento</strong> pode acelerar o projeto em 40-60% e criar diferenciais
              competitivos únicos no mercado de educação financeira gamificada.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
