"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Brain,
  Target,
  Lightbulb,
  Rocket,
  BarChart3,
  Settings,
} from "lucide-react"

export default function AnaliseProjetoPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("geral")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 space-y-6">
      {/* Header da Análise */}
      <HeaderAnalise />

      {/* Resumo Executivo */}
      <ResumoExecutivo />

      {/* Análise Detalhada */}
      <AnaliseDetalhada />

      {/* Oportunidades Manus.IA */}
      <OportunidadesManusIA />

      {/* Roadmap Sugerido */}
      <RoadmapSugerido />
    </div>
  )
}

const HeaderAnalise = () => {
  return (
    <Card className="shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🔍 Análise Completa - Julius Investidor</h1>
            <p className="text-blue-100">Avaliação técnica e estratégica do projeto</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">45%</div>
            <div className="text-sm text-blue-100">Progresso Geral</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ResumoExecutivo = () => {
  const metricas = [
    {
      titulo: "Componentes Criados",
      valor: "47",
      subtitulo: "de ~80 planejados",
      cor: "text-green-600",
      icone: <CheckCircle className="h-5 w-5" />,
    },
    {
      titulo: "Tempo Estimado",
      valor: "320h",
      subtitulo: "40 dias úteis",
      cor: "text-blue-600",
      icone: <Clock className="h-5 w-5" />,
    },
    {
      titulo: "Oportunidades IA",
      valor: "12",
      subtitulo: "identificadas",
      cor: "text-purple-600",
      icone: <Brain className="h-5 w-5" />,
    },
    {
      titulo: "ROI Esperado",
      valor: "60%",
      subtitulo: "redução tempo dev",
      cor: "text-orange-600",
      icone: <TrendingUp className="h-5 w-5" />,
    },
  ]

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />📊 Resumo Executivo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metricas.map((metrica, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 text-center">
              <div className={`flex items-center justify-center mb-2 ${metrica.cor}`}>{metrica.icone}</div>
              <div className={`text-2xl font-bold ${metrica.cor}`}>{metrica.valor}</div>
              <div className="text-sm font-medium text-gray-800">{metrica.titulo}</div>
              <div className="text-xs text-gray-500">{metrica.subtitulo}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const AnaliseDetalhada = () => {
  const categorias = [
    {
      id: "frontend",
      nome: "🎨 Frontend & UX",
      progresso: 65,
      itens: [
        { nome: "Componentes UI", status: "completo", prioridade: "alta" },
        { nome: "Responsividade", status: "parcial", prioridade: "alta" },
        { nome: "Acessibilidade", status: "pendente", prioridade: "media" },
        { nome: "Animações", status: "parcial", prioridade: "baixa" },
      ],
    },
    {
      id: "backend",
      nome: "⚙️ Backend & APIs",
      progresso: 25,
      itens: [
        { nome: "Autenticação", status: "pendente", prioridade: "alta" },
        { nome: "APIs RESTful", status: "pendente", prioridade: "alta" },
        { nome: "Banco de Dados", status: "pendente", prioridade: "alta" },
        { nome: "Cache & Performance", status: "pendente", prioridade: "media" },
      ],
    },
    {
      id: "gamificacao",
      nome: "🎮 Gamificação",
      progresso: 70,
      itens: [
        { nome: "Sistema de Pontos", status: "completo", prioridade: "alta" },
        { nome: "Badges & Conquistas", status: "completo", prioridade: "alta" },
        { nome: "Ranking", status: "parcial", prioridade: "media" },
        { nome: "Missões Dinâmicas", status: "pendente", prioridade: "baixa" },
      ],
    },
    {
      id: "ia",
      nome: "🤖 IA & Personalização",
      progresso: 15,
      itens: [
        { nome: "Chatbot Educativo", status: "pendente", prioridade: "alta" },
        { nome: "Recomendações", status: "pendente", prioridade: "alta" },
        { nome: "Análise Comportamental", status: "pendente", prioridade: "media" },
        { nome: "Conteúdo Adaptativo", status: "pendente", prioridade: "media" },
      ],
    },
  ]

  const [categoriaAtiva, setCategoriaAtiva] = useState("frontend")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completo":
        return "bg-green-100 text-green-800"
      case "parcial":
        return "bg-yellow-100 text-yellow-800"
      case "pendente":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "border-red-200 bg-red-50"
      case "media":
        return "border-yellow-200 bg-yellow-50"
      case "baixa":
        return "border-green-200 bg-green-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />🎯 Análise Detalhada por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={categoriaAtiva} onValueChange={setCategoriaAtiva}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {categorias.map((categoria) => (
              <TabsTrigger key={categoria.id} value={categoria.id} className="text-sm">
                {categoria.nome}
              </TabsTrigger>
            ))}
          </TabsList>

          {categorias.map((categoria) => (
            <TabsContent key={categoria.id} value={categoria.id}>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{categoria.nome}</h3>
                  <div className="flex items-center gap-2">
                    <Progress value={categoria.progresso} className="w-32" />
                    <span className="text-sm font-medium">{categoria.progresso}%</span>
                  </div>
                </div>

                <div className="grid gap-3">
                  {categoria.itens.map((item, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getPrioridadeColor(item.prioridade)}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.nome}</span>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.prioridade}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

const OportunidadesManusIA = () => {
  const oportunidades = [
    {
      categoria: "🤖 IA Educativa",
      prioridade: "alta",
      impacto: "alto",
      tempo: "4-6 semanas",
      beneficios: ["Chatbot 24/7", "Personalização de conteúdo", "50% mais engajamento"],
      icone: <Brain className="h-6 w-6" />,
    },
    {
      categoria: "⚡ Automação Dev",
      prioridade: "alta",
      impacto: "alto",
      tempo: "2-3 semanas",
      beneficios: ["Testes automatizados", "CI/CD inteligente", "60% menos bugs"],
      icone: <Zap className="h-6 w-6" />,
    },
    {
      categoria: "📊 Analytics Preditivo",
      prioridade: "media",
      impacto: "alto",
      tempo: "3-4 semanas",
      beneficios: ["Prevenção de churn", "Insights automáticos", "80% precisão"],
      icone: <BarChart3 className="h-6 w-6" />,
    },
    {
      categoria: "🎮 Gamificação IA",
      prioridade: "media",
      impacto: "medio",
      tempo: "2-3 semanas",
      beneficios: ["Badges dinâmicos", "Missões personalizadas", "45% mais retenção"],
      icone: <Target className="h-6 w-6" />,
    },
  ]

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "border-red-500 bg-red-50"
      case "media":
        return "border-yellow-500 bg-yellow-50"
      case "baixa":
        return "border-green-500 bg-green-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="h-5 w-5" />🚀 Oportunidades de Colaboração Manus.IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {oportunidades.map((oportunidade, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${getPrioridadeColor(oportunidade.prioridade)}`}>
              <div className="flex items-start gap-3">
                <div className="text-blue-600">{oportunidade.icone}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 mb-2">{oportunidade.categoria}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={oportunidade.prioridade === "alta" ? "destructive" : "secondary"}>
                      {oportunidade.prioridade} prioridade
                    </Badge>
                    <Badge variant="outline">{oportunidade.impacto} impacto</Badge>
                    <Badge variant="outline">{oportunidade.tempo}</Badge>
                  </div>
                  <ul className="space-y-1">
                    {oportunidade.beneficios.map((beneficio, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {beneficio}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />💡 ROI Esperado da Colaboração
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">40-60%</div>
              <div className="text-gray-600">Redução tempo desenvolvimento</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50%</div>
              <div className="text-gray-600">Melhoria eficiência educativa</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">45%</div>
              <div className="text-gray-600">Aumento retenção usuários</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const RoadmapSugerido = () => {
  const fases = [
    {
      nome: "Fase 1: Fundação",
      duracao: "8 semanas",
      cor: "bg-red-500",
      itens: [
        "Backend robusto com automação de testes",
        "Frontend responsivo com otimização IA",
        "Segurança multicamadas com monitoramento",
        "Sistema de autenticação completo",
      ],
    },
    {
      nome: "Fase 2: Gamificação",
      duracao: "6 semanas",
      cor: "bg-orange-500",
      itens: [
        "Sistema de conquistas com IA personalizada",
        "Conteúdo educativo adaptativo",
        "Social trading com analytics inteligente",
        "Programa de fidelidade dinâmico",
      ],
    },
    {
      nome: "Fase 3: IA & Analytics",
      duracao: "4 semanas",
      cor: "bg-blue-500",
      itens: [
        "Chatbot educativo avançado",
        "Analytics preditivo completo",
        "Recomendações personalizadas",
        "Dashboard executivo automático",
      ],
    },
    {
      nome: "Fase 4: Otimização",
      duracao: "3 semanas",
      cor: "bg-green-500",
      itens: [
        "Performance automática",
        "Marketplace inteligente",
        "Compliance LGPD automático",
        "Monitoramento de ameaças",
      ],
    },
  ]

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />📅 Roadmap Sugerido para Colaboração
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {fases.map((fase, index) => (
            <div key={index} className="relative">
              {index < fases.length - 1 && <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200"></div>}
              <div className="flex items-start gap-4">
                <div
                  className={`w-8 h-8 ${fase.cor} rounded-full flex items-center justify-center text-white font-bold text-sm`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{fase.nome}</h3>
                    <Badge variant="outline">{fase.duracao}</Badge>
                  </div>
                  <ul className="space-y-1">
                    {fase.itens.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />🎯 Resultado Final Esperado
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Com a colaboração do Manus.IA, o Julius Investidor se tornará a plataforma mais avançada e personalizada de
            educação financeira gamificada do Brasil!
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-800">Primeira plataforma com IA educativa</Badge>
            <Badge className="bg-purple-100 text-purple-800">Gamificação adaptativa única</Badge>
            <Badge className="bg-green-100 text-green-800">Analytics preditivo avançado</Badge>
            <Badge className="bg-orange-100 text-orange-800">Automação completa de desenvolvimento</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
