"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { TutorialManager } from "@/components/tutorial-manager"
import { DicaRapida } from "@/components/dica-rapida"
import {
  Users,
  Plus,
  Lock,
  Unlock,
  TrendingUp,
  Crown,
  Eye,
  UserPlus,
  Share2,
  Settings,
  Trophy,
  DollarSign,
  BarChart3,
  Filter,
  Search,
  Handshake,
  Sparkles,
  X,
} from "lucide-react"
import { useApp } from "@/contexts/app-context"

interface Membro {
  id: string
  nome: string
  avatar: string
  contribuicao: number
  performance: number
  dataEntrada: string
  nivel: string
  badges: string[]
  ativo: boolean
}

interface ClubeInvestimento {
  id: string
  nome: string
  descricao: string
  membros: Membro[]
  patrimonio: number
  performance: number
  estrategia: string
  privacidade: "publico" | "privado"
  maxMembros: number
  taxaEntrada: number
  taxaPerformance: number
  criador: string
  dataCreacao: string
  categoria: string
  risco: "baixo" | "medio" | "alto"
  avatar: string
  tags: string[]
  regras: string[]
  objetivos: string[]
  historico: Array<{
    data: string
    evento: string
    valor?: number
    membro?: string
  }>
}

const mockClubes: ClubeInvestimento[] = [
  {
    id: "1",
    nome: "Investidores Alpha",
    descricao: "Clube focado em estratégias de crescimento agressivo com análise fundamentalista rigorosa",
    membros: [
      {
        id: "1",
        nome: "Ana Silva",
        avatar: "/placeholder.svg?height=40&width=40&text=AS",
        contribuicao: 50000,
        performance: 23.5,
        dataEntrada: "2024-01-15",
        nivel: "Diamante",
        badges: ["Top Performer", "Analista"],
        ativo: true,
      },
      {
        id: "2",
        nome: "Carlos Santos",
        avatar: "/placeholder.svg?height=40&width=40&text=CS",
        contribuicao: 75000,
        performance: 18.7,
        dataEntrada: "2024-01-20",
        nivel: "Ouro",
        badges: ["Consistente"],
        ativo: true,
      },
    ],
    patrimonio: 847500,
    performance: 47.8,
    estrategia: "Growth Investing",
    privacidade: "publico",
    maxMembros: 15,
    taxaEntrada: 5000,
    taxaPerformance: 15,
    criador: "Ana Silva",
    dataCreacao: "2024-01-15",
    categoria: "Agressivo",
    risco: "alto",
    avatar: "/placeholder.svg?height=60&width=60&text=IA",
    tags: ["growth", "tech", "análise", "agressivo"],
    regras: [
      "Investimento mínimo de R$ 5.000",
      "Decisões tomadas por votação",
      "Análise fundamentalista obrigatória",
      "Reuniões semanais",
    ],
    objetivos: ["Superar IBOV em 20% ao ano", "Diversificar em 5 setores", "Manter risco controlado"],
    historico: [
      {
        data: "2024-01-25",
        evento: "Investimento em PETR4",
        valor: 25000,
        membro: "Ana Silva",
      },
      {
        data: "2024-01-22",
        evento: "Carlos Santos entrou no clube",
        membro: "Carlos Santos",
      },
    ],
  },
  {
    id: "2",
    nome: "Renda Fixa Pro",
    descricao: "Estratégias conservadoras focadas em renda fixa e dividendos consistentes",
    membros: [
      {
        id: "3",
        nome: "Maria Costa",
        avatar: "/placeholder.svg?height=40&width=40&text=MC",
        contribuicao: 30000,
        performance: 12.3,
        dataEntrada: "2024-02-01",
        nivel: "Prata",
        badges: ["Conservador"],
        ativo: true,
      },
    ],
    patrimonio: 234000,
    performance: 23.4,
    estrategia: "Renda Fixa + Dividendos",
    privacidade: "publico",
    maxMembros: 20,
    taxaEntrada: 2000,
    taxaPerformance: 10,
    criador: "Maria Costa",
    dataCreacao: "2024-02-01",
    categoria: "Conservador",
    risco: "baixo",
    avatar: "/placeholder.svg?height=60&width=60&text=RF",
    tags: ["renda fixa", "dividendos", "conservador", "estável"],
    regras: ["Foco em renda fixa", "Máximo 30% em ações", "Reuniões mensais"],
    objetivos: ["Superar CDI em 3% ao ano", "Renda mensal consistente", "Baixa volatilidade"],
    historico: [],
  },
  {
    id: "3",
    nome: "Crypto Believers",
    descricao: "Clube especializado em criptomoedas e ativos digitais com foco em inovação",
    membros: [
      {
        id: "4",
        nome: "João Crypto",
        avatar: "/placeholder.svg?height=40&width=40&text=JC",
        contribuicao: 15000,
        performance: 45.2,
        dataEntrada: "2024-01-10",
        nivel: "Platina",
        badges: ["Crypto Expert", "Early Adopter"],
        ativo: true,
      },
    ],
    patrimonio: 189000,
    performance: 18.9,
    estrategia: "Crypto & DeFi",
    privacidade: "privado",
    maxMembros: 10,
    taxaEntrada: 10000,
    taxaPerformance: 20,
    criador: "João Crypto",
    dataCreacao: "2024-01-10",
    categoria: "Especulativo",
    risco: "alto",
    avatar: "/placeholder.svg?height=60&width=60&text=CB",
    tags: ["crypto", "defi", "bitcoin", "ethereum"],
    regras: ["Apenas criptomoedas", "Conhecimento técnico obrigatório", "Alto risco aceito"],
    objetivos: ["Superar Bitcoin em performance", "Explorar DeFi", "Diversificar em altcoins"],
    historico: [],
  },
]

const mockRankings = {
  performance: [
    { nome: "Investidores Alpha", performance: 47.8, membros: 12, patrimonio: 847500 },
    { nome: "Renda Fixa Pro", performance: 23.4, membros: 8, patrimonio: 234000 },
    { nome: "Crypto Believers", performance: 18.9, membros: 15, patrimonio: 189000 },
  ],
  patrimonio: [
    { nome: "Mega Investidores", patrimonio: 2847500, membros: 25, performance: 15.2 },
    { nome: "Elite Financeira", patrimonio: 1923400, membros: 18, performance: 22.1 },
    { nome: "Bilionários Jr", patrimonio: 1456700, membros: 22, performance: 18.7 },
  ],
  membros: [
    { nome: "Comunidade Unida", membros: 47, performance: 12.3, patrimonio: 567000 },
    { nome: "Rede de Investidores", membros: 38, performance: 15.7, patrimonio: 789000 },
    { nome: "Família Financeira", membros: 31, performance: 9.8, patrimonio: 345000 },
  ],
}

export default function CarteirasSociaisPage() {
  const { user } = useApp()
  const [selectedTab, setSelectedTab] = useState("explorar")
  const [clubes, setClubes] = useState<ClubeInvestimento[]>(mockClubes)
  const [meusClubes, setMeusClubes] = useState<ClubeInvestimento[]>([mockClubes[0]])
  const [modalCriarClube, setModalCriarClube] = useState(false)
  const [modalDetalhes, setModalDetalhes] = useState<string | null>(null)
  const [tipoRanking, setTipoRanking] = useState("performance")
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroCategoria, setFiltroCategoria] = useState("todos")
  const [filtroRisco, setFiltroRisco] = useState("todos")

  if (!user) return null

  const clubesFiltrados = clubes.filter((clube) => {
    const matchSearch =
      clube.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clube.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategoria = filtroCategoria === "todos" || clube.categoria.toLowerCase() === filtroCategoria
    const matchRisco = filtroRisco === "todos" || clube.risco === filtroRisco

    return matchSearch && matchCategoria && matchRisco
  })

  const ClubeCard = ({ clube, isMembro = false }: { clube: ClubeInvestimento; isMembro?: boolean }) => (
    <Card className="card-premium border-0 hover:shadow-xl transition-all duration-300" data-tutorial="clube-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Avatar className="h-16 w-16">
            <AvatarImage src={clube.avatar || "/placeholder.svg"} alt={clube.nome} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold">
              {clube.nome.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="text-right space-y-1">
            <Badge
              className={`${clube.privacidade === "privado" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
            >
              {clube.privacidade === "privado" ? (
                <Lock className="h-3 w-3 mr-1" />
              ) : (
                <Unlock className="h-3 w-3 mr-1" />
              )}
              {clube.privacidade === "privado" ? "Privado" : "Público"}
            </Badge>
            <Badge
              className={
                clube.risco === "baixo"
                  ? "bg-green-100 text-green-800"
                  : clube.risco === "medio"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
              }
            >
              {clube.risco === "baixo" ? "Baixo Risco" : clube.risco === "medio" ? "Médio Risco" : "Alto Risco"}
            </Badge>
          </div>
        </div>
        <div>
          <CardTitle className="text-xl text-gray-900">{clube.nome}</CardTitle>
          <CardDescription className="text-gray-600 mt-2">{clube.descricao}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">+{clube.performance}%</div>
            <div className="text-xs text-gray-600">Performance</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">R$ {(clube.patrimonio / 1000).toFixed(0)}k</div>
            <div className="text-xs text-gray-600">Patrimônio</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Membros:</span>
            <span className="font-medium">
              {clube.membros.length}/{clube.maxMembros}
            </span>
          </div>
          <Progress value={(clube.membros.length / clube.maxMembros) * 100} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Estratégia:</span>
            <span className="font-medium">{clube.estrategia}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxa de Entrada:</span>
            <span className="font-medium text-orange-600">R$ {clube.taxaEntrada.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxa Performance:</span>
            <span className="font-medium text-purple-600">{clube.taxaPerformance}%</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {clube.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="flex space-x-2">
          {isMembro ? (
            <>
              <Button className="flex-1 bg-[#1a237e] hover:bg-[#0d47a1]">
                <BarChart3 className="h-4 w-4 mr-2" />
                Acessar Clube
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button className="flex-1 bg-[#ff5722] hover:bg-[#e64a19]" onClick={() => setModalDetalhes(clube.id)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Participar
              </Button>
              <Button variant="outline" size="sm" onClick={() => setModalDetalhes(clube.id)}>
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const RankingClubes = () => (
    <Card className="card-premium border-0">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-900 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
          Ranking de Clubes
        </CardTitle>
        <CardDescription>Os clubes com melhor performance da plataforma</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex space-x-2">
          {Object.keys(mockRankings).map((tipo) => (
            <Button
              key={tipo}
              variant={tipoRanking === tipo ? "default" : "outline"}
              size="sm"
              onClick={() => setTipoRanking(tipo)}
              className={tipoRanking === tipo ? "bg-[#1a237e] hover:bg-[#0d47a1]" : ""}
            >
              {tipo === "performance" && <TrendingUp className="h-4 w-4 mr-1" />}
              {tipo === "patrimonio" && <DollarSign className="h-4 w-4 mr-1" />}
              {tipo === "membros" && <Users className="h-4 w-4 mr-1" />}
              {tipo === "performance" && "Performance"}
              {tipo === "patrimonio" && "Patrimônio"}
              {tipo === "membros" && "Membros"}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {mockRankings[tipoRanking].map((clube, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                      : index === 1
                        ? "bg-gradient-to-r from-gray-400 to-gray-600"
                        : index === 2
                          ? "bg-gradient-to-r from-amber-600 to-amber-800"
                          : "bg-gradient-to-r from-blue-400 to-blue-600"
                  }`}
                >
                  {index === 0 && <Crown className="h-4 w-4" />}
                  {index !== 0 && `#${index + 1}`}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{clube.nome}</h4>
                  <p className="text-sm text-gray-600">{clube.membros} membros</p>
                </div>
              </div>
              <div className="text-right">
                {tipoRanking === "performance" && (
                  <div>
                    <span className="text-lg font-bold text-green-600">+{clube.performance}%</span>
                    <div className="text-xs text-gray-500">Performance</div>
                  </div>
                )}
                {tipoRanking === "patrimonio" && (
                  <div>
                    <span className="text-lg font-bold text-blue-600">R$ {(clube.patrimonio / 1000).toFixed(0)}k</span>
                    <div className="text-xs text-gray-500">Patrimônio</div>
                  </div>
                )}
                {tipoRanking === "membros" && (
                  <div>
                    <span className="text-lg font-bold text-purple-600">{clube.membros}</span>
                    <div className="text-xs text-gray-500">Pessoas</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const ModalCriarClube = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-gray-900">🚀 Criar Novo Clube</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setModalCriarClube(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Configure seu clube de investimento colaborativo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Clube</label>
              <Input placeholder="Ex: Investidores Tech" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
              <select className="w-full p-2 border rounded-lg">
                <option>Conservador</option>
                <option>Moderado</option>
                <option>Agressivo</option>
                <option>Especulativo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <Textarea placeholder="Descreva a estratégia e objetivos do clube..." rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Máx. Membros</label>
              <Input type="number" placeholder="20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Taxa Entrada (R$)</label>
              <Input type="number" placeholder="5000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Taxa Performance (%)</label>
              <Input type="number" placeholder="15" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Privacidade</label>
              <select className="w-full p-2 border rounded-lg">
                <option value="publico">Público</option>
                <option value="privado">Privado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nível de Risco</label>
              <select className="w-full p-2 border rounded-lg">
                <option value="baixo">Baixo</option>
                <option value="medio">Médio</option>
                <option value="alto">Alto</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estratégia de Investimento</label>
            <Textarea placeholder="Descreva a estratégia detalhada..." rows={2} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (separadas por vírgula)</label>
            <Input placeholder="growth, tech, dividendos, conservador" />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setModalCriarClube(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#ff5722] hover:bg-[#e64a19]">
              <Sparkles className="h-4 w-4 mr-2" />
              Criar Clube
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <TutorialManager pagina="carteiras-sociais" />

      {/* Header */}
      <div className="flex items-center justify-between" data-tutorial="header">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
            <Handshake className="h-10 w-10 mr-3 text-blue-600" />
            Carteiras Sociais
          </h1>
          <p className="text-gray-600 text-lg">Invista em grupo e multiplique seus resultados</p>
          <DicaRapida
            titulo="Carteiras Colaborativas"
            conteudo="Participe de clubes de investimento onde as decisões são tomadas em grupo, compartilhando conhecimento e dividindo riscos."
            categoria="basico"
            icone="🤝"
            id="carteiras-sociais-intro"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-500 text-white px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            1.247 investidores ativos
          </Badge>
          <Button
            className="bg-[#1a237e] hover:bg-[#0d47a1]"
            onClick={() => setModalCriarClube(true)}
            data-tutorial="criar-clube"
          >
            <Plus className="h-4 w-4 mr-2" />
            Criar Clube
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6" data-tutorial="stats">
        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clubes Ativos</p>
                <p className="text-3xl font-bold text-gray-900">127</p>
                <p className="text-xs text-green-600 mt-1">+12 este mês</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patrimônio Total</p>
                <p className="text-3xl font-bold text-gray-900">R$ 12.4M</p>
                <p className="text-xs text-green-600 mt-1">+18.7% este mês</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Performance Média</p>
                <p className="text-3xl font-bold text-gray-900">+24.3%</p>
                <p className="text-xs text-green-600 mt-1">Acima do IBOV</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Seus Clubes</p>
                <p className="text-3xl font-bold text-gray-900">{meusClubes.length}</p>
                <p className="text-xs text-blue-600 mt-1">Participando</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Crown className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="explorar" className="rounded-xl font-semibold">
            🔍 Explorar Clubes
          </TabsTrigger>
          <TabsTrigger value="meus-clubes" className="rounded-xl font-semibold">
            👥 Meus Clubes
          </TabsTrigger>
          <TabsTrigger value="ranking" className="rounded-xl font-semibold">
            🏆 Ranking
          </TabsTrigger>
          <TabsTrigger value="criar" className="rounded-xl font-semibold">
            ➕ Criar Clube
          </TabsTrigger>
        </TabsList>

        {/* Explorar Clubes */}
        <TabsContent value="explorar" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar clubes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white"
              >
                <option value="todos">Todas as categorias</option>
                <option value="conservador">Conservador</option>
                <option value="moderado">Moderado</option>
                <option value="agressivo">Agressivo</option>
                <option value="especulativo">Especulativo</option>
              </select>
              <select
                value={filtroRisco}
                onChange={(e) => setFiltroRisco(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white"
              >
                <option value="todos">Todos os riscos</option>
                <option value="baixo">Baixo Risco</option>
                <option value="medio">Médio Risco</option>
                <option value="alto">Alto Risco</option>
              </select>
            </div>
            <Button className="bg-[#ff5722] hover:bg-[#e64a19]">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubesFiltrados.map((clube) => (
              <ClubeCard key={clube.id} clube={clube} />
            ))}
          </div>

          <DicaRapida
            titulo="Como Escolher um Clube"
            conteudo="Analise a performance histórica, estratégia de investimento, perfil de risco e experiência dos membros antes de participar."
            categoria="intermediario"
            icone="🎯"
            id="escolher-clube"
          />
        </TabsContent>

        {/* Meus Clubes */}
        <TabsContent value="meus-clubes" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Seus Clubes de Investimento</h2>
            <Button className="bg-[#1a237e] hover:bg-[#0d47a1]">
              <Plus className="h-4 w-4 mr-2" />
              Participar de Novo Clube
            </Button>
          </div>

          {meusClubes.length === 0 ? (
            <Card className="card-premium border-0 text-center py-12">
              <CardContent>
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum clube ainda</h3>
                <p className="text-gray-600 mb-6">
                  Participe de clubes de investimento para potencializar seus resultados
                </p>
                <Button className="bg-[#ff5722] hover:bg-[#e64a19]">
                  <Search className="h-4 w-4 mr-2" />
                  Explorar Clubes
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meusClubes.map((clube) => (
                <ClubeCard key={clube.id} clube={clube} isMembro={true} />
              ))}
            </div>
          )}

          <DicaRapida
            titulo="Gestão de Clubes"
            conteudo="Como membro, você pode votar nas decisões de investimento, propor novas estratégias e acompanhar a performance em tempo real."
            categoria="avancado"
            icone="⚙️"
            id="gestao-clubes"
          />
        </TabsContent>

        {/* Ranking */}
        <TabsContent value="ranking" className="space-y-6">
          <RankingClubes />

          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">📊 Estatísticas Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">R$ 847.5k</div>
                  <div className="text-sm text-gray-600">Maior Patrimônio</div>
                  <div className="text-xs text-gray-500 mt-1">Investidores Alpha</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">+47.8%</div>
                  <div className="text-sm text-gray-600">Melhor Performance</div>
                  <div className="text-xs text-gray-500 mt-1">Últimos 12 meses</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">47</div>
                  <div className="text-sm text-gray-600">Mais Membros</div>
                  <div className="text-xs text-gray-500 mt-1">Comunidade Unida</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Criar Clube */}
        <TabsContent value="criar" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 flex items-center">
                <Sparkles className="h-6 w-6 mr-2 text-orange-500" />
                Criar Seu Clube de Investimento
              </CardTitle>
              <CardDescription>Configure seu clube e comece a investir colaborativamente</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Clube</label>
                  <Input placeholder="Ex: Investidores Tech" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Conservador</option>
                    <option>Moderado</option>
                    <option>Agressivo</option>
                    <option>Especulativo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
                <Textarea placeholder="Descreva a estratégia e objetivos do clube..." rows={3} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Máx. Membros</label>
                  <Input type="number" placeholder="20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taxa Entrada (R$)</label>
                  <Input type="number" placeholder="5000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taxa Performance (%)</label>
                  <Input type="number" placeholder="15" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-[#ff5722] hover:bg-[#e64a19]">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Criar Clube
                </Button>
              </div>
            </CardContent>
          </Card>

          <DicaRapida
            titulo="Dicas para Criar um Clube"
            conteudo="Defina uma estratégia clara, estabeleça regras transparentes e comece com um grupo pequeno de investidores alinhados."
            categoria="pro"
            icone="💡"
            id="criar-clube-dicas"
          />
        </TabsContent>
      </Tabs>

      {/* Modais */}
      {modalCriarClube && <ModalCriarClube />}

      {modalDetalhes && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-900">Detalhes do Clube</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setModalDetalhes(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Conteúdo do modal de detalhes seria implementado aqui */}
              <p className="text-gray-600">Detalhes completos do clube selecionado...</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
