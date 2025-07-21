"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  MessageCircle,
  Star,
  Calendar,
  Trophy,
  TrendingUp,
  Heart,
  Share2,
  MessageSquare,
  Video,
  BookOpen,
  Award,
  Target,
  Crown,
  Clock,
  Filter,
  Search,
  Plus,
  Send,
  Eye,
  Bookmark,
  UserPlus,
  Settings,
  Play,
  GraduationCapIcon as Graduation,
  CheckCircle,
  Lock,
  Unlock,
} from "lucide-react"
import { useApp } from "@/contexts/app-context"

interface Grupo {
  id: string
  nome: string
  descricao: string
  categoria: string
  membros: number
  maxMembros: number
  isPrivate: boolean
  nivel: string
  tags: string[]
  criador: string
  criadoEm: string
  ultimaAtividade: string
  performance: number
  patrimonio: number
  risco: "baixo" | "medio" | "alto"
  avatar: string
}

interface Mentor {
  id: string
  nome: string
  especialidade: string
  experiencia: number
  rating: number
  avaliacoes: number
  preco: number
  disponivel: boolean
  avatar: string
  badges: string[]
  descricao: string
  areas: string[]
  idiomas: string[]
  sessoes: number
  proximaDisponibilidade: string
}

interface Evento {
  id: string
  titulo: string
  tipo: "masterclass" | "webinar" | "workshop" | "networking"
  data: string
  duracao: number
  instrutor: string
  instrutorAvatar: string
  participantes: number
  maxParticipantes: number
  preco: number
  nivel: string
  categoria: string
  descricao: string
  topicos: string[]
  certificado: boolean
  gravacao: boolean
}

interface Atividade {
  id: string
  tipo: "conquista" | "nivel" | "badge" | "investimento" | "grupo" | "mentor"
  usuario: string
  usuarioAvatar: string
  titulo: string
  descricao: string
  timestamp: string
  valor?: number
  badge?: string
  nivel?: number
  grupo?: string
}

interface Competicao {
  id: string
  nome: string
  descricao: string
  tipo: "mensal" | "trimestral" | "anual"
  categoria: string
  inicio: string
  fim: string
  participantes: number
  premio: string
  status: "ativa" | "finalizada" | "em_breve"
  ranking: Array<{
    posicao: number
    usuario: string
    avatar: string
    performance: number
    patrimonio: number
  }>
}

const mockGrupos: Grupo[] = [
  {
    id: "1",
    nome: "Investidores Iniciantes",
    descricao: "Grupo para quem está começando no mundo dos investimentos",
    categoria: "Educação",
    membros: 1247,
    maxMembros: 2000,
    isPrivate: false,
    nivel: "Iniciante",
    tags: ["educação", "básico", "dúvidas", "apoio"],
    criador: "Ana Silva",
    criadoEm: "2024-01-15",
    ultimaAtividade: "2 min atrás",
    performance: 8.5,
    patrimonio: 125000,
    risco: "baixo",
    avatar: "/placeholder.svg?height=60&width=60&text=II",
  },
  {
    id: "2",
    nome: "Tech Investors",
    descricao: "Foco em investimentos em tecnologia e inovação",
    categoria: "Setorial",
    membros: 856,
    maxMembros: 1000,
    isPrivate: false,
    nivel: "Intermediário",
    tags: ["tecnologia", "growth", "inovação", "startups"],
    criador: "Carlos Tech",
    criadoEm: "2024-02-01",
    ultimaAtividade: "15 min atrás",
    performance: 15.7,
    patrimonio: 890000,
    risco: "alto",
    avatar: "/placeholder.svg?height=60&width=60&text=TI",
  },
  {
    id: "3",
    nome: "Dividendos Premium",
    descricao: "Estratégias avançadas para maximizar dividendos",
    categoria: "Estratégia",
    membros: 423,
    maxMembros: 500,
    isPrivate: true,
    nivel: "Avançado",
    tags: ["dividendos", "renda", "passiva", "premium"],
    criador: "Maria Dividendos",
    criadoEm: "2024-01-20",
    ultimaAtividade: "1 hora atrás",
    performance: 12.3,
    patrimonio: 2100000,
    risco: "medio",
    avatar: "/placeholder.svg?height=60&width=60&text=DP",
  },
]

const mockMentores: Mentor[] = [
  {
    id: "1",
    nome: "Roberto Silva",
    especialidade: "Análise Fundamentalista",
    experiencia: 15,
    rating: 4.9,
    avaliacoes: 234,
    preco: 150,
    disponivel: true,
    avatar: "/placeholder.svg?height=60&width=60&text=RS",
    badges: ["Top Mentor", "Especialista", "5 Anos+"],
    descricao: "Especialista em análise fundamentalista com mais de 15 anos de experiência no mercado financeiro.",
    areas: ["Ações", "FIIs", "Análise de Balanços", "Valuation"],
    idiomas: ["Português", "Inglês"],
    sessoes: 1247,
    proximaDisponibilidade: "Hoje às 14:00",
  },
  {
    id: "2",
    nome: "Ana Crypto",
    especialidade: "Criptomoedas e DeFi",
    experiencia: 8,
    rating: 4.8,
    avaliacoes: 189,
    preco: 200,
    disponivel: true,
    avatar: "/placeholder.svg?height=60&width=60&text=AC",
    badges: ["Crypto Expert", "DeFi Specialist", "Top Rated"],
    descricao: "Especialista em criptomoedas e finanças descentralizadas, com foco em estratégias inovadoras.",
    areas: ["Bitcoin", "Ethereum", "DeFi", "NFTs", "Staking"],
    idiomas: ["Português", "Inglês", "Espanhol"],
    sessoes: 892,
    proximaDisponibilidade: "Amanhã às 10:00",
  },
  {
    id: "3",
    nome: "Carlos Trader",
    especialidade: "Day Trade e Swing Trade",
    experiencia: 12,
    rating: 4.7,
    avaliacoes: 156,
    preco: 180,
    disponivel: false,
    avatar: "/placeholder.svg?height=60&width=60&text=CT",
    badges: ["Day Trader", "Risk Manager", "Mentor Premium"],
    descricao: "Trader profissional especializado em operações de curto prazo e gerenciamento de risco.",
    areas: ["Day Trade", "Swing Trade", "Análise Técnica", "Risk Management"],
    idiomas: ["Português"],
    sessoes: 678,
    proximaDisponibilidade: "Segunda às 09:00",
  },
]

const mockEventos: Evento[] = [
  {
    id: "1",
    titulo: "Masterclass: Análise Fundamentalista Avançada",
    tipo: "masterclass",
    data: "2024-02-15T19:00:00",
    duracao: 120,
    instrutor: "Roberto Silva",
    instrutorAvatar: "/placeholder.svg?height=40&width=40&text=RS",
    participantes: 89,
    maxParticipantes: 100,
    preco: 0,
    nivel: "Intermediário",
    categoria: "Análise",
    descricao:
      "Aprenda técnicas avançadas de análise fundamentalista para identificar as melhores oportunidades do mercado.",
    topicos: ["Análise de Balanços", "Valuation", "Múltiplos", "Projeções"],
    certificado: true,
    gravacao: true,
  },
  {
    id: "2",
    titulo: "Workshop: Construindo Carteira de Dividendos",
    tipo: "workshop",
    data: "2024-02-18T14:00:00",
    duracao: 180,
    instrutor: "Maria Dividendos",
    instrutorAvatar: "/placeholder.svg?height=40&width=40&text=MD",
    participantes: 45,
    maxParticipantes: 50,
    preco: 97,
    nivel: "Iniciante",
    categoria: "Estratégia",
    descricao: "Workshop prático para construir uma carteira focada em dividendos consistentes e crescentes.",
    topicos: ["Seleção de Ações", "Diversificação", "Reinvestimento", "Tributação"],
    certificado: true,
    gravacao: false,
  },
  {
    id: "3",
    titulo: "Networking: Encontro de Investidores Tech",
    tipo: "networking",
    data: "2024-02-20T18:30:00",
    duracao: 90,
    instrutor: "Carlos Tech",
    instrutorAvatar: "/placeholder.svg?height=40&width=40&text=CT",
    participantes: 67,
    maxParticipantes: 80,
    preco: 0,
    nivel: "Todos",
    categoria: "Networking",
    descricao: "Encontro para networking entre investidores interessados no setor de tecnologia.",
    topicos: ["Startups", "IPOs", "Venture Capital", "Tendências Tech"],
    certificado: false,
    gravacao: false,
  },
]

const mockAtividades: Atividade[] = [
  {
    id: "1",
    tipo: "conquista",
    usuario: "João Silva",
    usuarioAvatar: "/placeholder.svg?height=40&width=40&text=JS",
    titulo: "Conquistou o badge 'Primeiro Milhão'",
    descricao: "Atingiu R$ 1.000.000 em patrimônio total",
    timestamp: "2024-01-20T10:30:00",
    badge: "primeiro_milhao",
  },
  {
    id: "2",
    tipo: "nivel",
    usuario: "Ana Costa",
    usuarioAvatar: "/placeholder.svg?height=40&width=40&text=AC",
    titulo: "Subiu para o nível Diamante",
    descricao: "Alcançou 50.000 XP e desbloqueou benefícios premium",
    timestamp: "2024-01-20T09:15:00",
    nivel: 15,
  },
  {
    id: "3",
    tipo: "investimento",
    usuario: "Carlos Santos",
    usuarioAvatar: "/placeholder.svg?height=40&width=40&text=CS",
    titulo: "Realizou investimento de R$ 50.000",
    descricao: "Investiu em carteira diversificada de FIIs",
    timestamp: "2024-01-20T08:45:00",
    valor: 50000,
  },
]

const mockCompeticoes: Competicao[] = [
  {
    id: "1",
    nome: "Desafio Mensal - Janeiro 2024",
    descricao: "Competição de performance entre carteiras de investimento",
    tipo: "mensal",
    categoria: "Performance",
    inicio: "2024-01-01",
    fim: "2024-01-31",
    participantes: 1247,
    premio: "R$ 10.000 + Badge Exclusivo",
    status: "finalizada",
    ranking: [
      {
        posicao: 1,
        usuario: "Ana Investidora",
        avatar: "/placeholder.svg?height=40&width=40&text=AI",
        performance: 28.5,
        patrimonio: 850000,
      },
      {
        posicao: 2,
        usuario: "Carlos Trader",
        avatar: "/placeholder.svg?height=40&width=40&text=CT",
        performance: 24.7,
        patrimonio: 1200000,
      },
      {
        posicao: 3,
        usuario: "Maria Tech",
        avatar: "/placeholder.svg?height=40&width=40&text=MT",
        performance: 22.1,
        patrimonio: 950000,
      },
    ],
  },
  {
    id: "2",
    nome: "Liga dos Campeões - Q1 2024",
    descricao: "Competição trimestral entre os melhores investidores",
    tipo: "trimestral",
    categoria: "Elite",
    inicio: "2024-01-01",
    fim: "2024-03-31",
    participantes: 156,
    premio: "R$ 50.000 + Mentoria VIP",
    status: "ativa",
    ranking: [
      {
        posicao: 1,
        usuario: "Roberto Premium",
        avatar: "/placeholder.svg?height=40&width=40&text=RP",
        performance: 35.2,
        patrimonio: 2100000,
      },
      {
        posicao: 2,
        usuario: "Julia Elite",
        avatar: "/placeholder.svg?height=40&width=40&text=JE",
        performance: 31.8,
        patrimonio: 1850000,
      },
    ],
  },
]

export default function ComunidadePage() {
  const { user } = useApp()
  const [selectedTab, setSelectedTab] = useState("grupos")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [chatMessages, setChatMessages] = useState<
    Array<{
      id: string
      usuario: string
      avatar: string
      mensagem: string
      timestamp: string
    }>
  >([])
  const [newMessage, setNewMessage] = useState("")

  if (!user) return null

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      usuario: user.nome,
      avatar: user.avatar,
      mensagem: newMessage,
      timestamp: new Date().toISOString(),
    }

    setChatMessages((prev) => [...prev, message])
    setNewMessage("")
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Comunidade Julius</h1>
          <p className="text-gray-600 text-lg">Conecte-se, aprenda e cresça junto com outros investidores</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-500 text-white px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            2.847 membros online
          </Badge>
          <Button className="bg-[#1a237e] hover:bg-[#0d47a1]">
            <Plus className="h-4 w-4 mr-2" />
            Criar Grupo
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Grupos Ativos</p>
                <p className="text-3xl font-bold text-gray-900">127</p>
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
                <p className="text-sm font-medium text-gray-600">Mentores Disponíveis</p>
                <p className="text-3xl font-bold text-gray-900">45</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Graduation className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eventos Este Mês</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sua Reputação</p>
                <p className="text-3xl font-bold text-orange-600">4.8</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7 bg-white p-1 rounded-2xl shadow-lg">
          <TabsTrigger value="grupos" className="rounded-xl font-semibold">
            Grupos
          </TabsTrigger>
          <TabsTrigger value="mentores" className="rounded-xl font-semibold">
            Mentores
          </TabsTrigger>
          <TabsTrigger value="eventos" className="rounded-xl font-semibold">
            Eventos
          </TabsTrigger>
          <TabsTrigger value="feed" className="rounded-xl font-semibold">
            Feed Social
          </TabsTrigger>
          <TabsTrigger value="competicoes" className="rounded-xl font-semibold">
            Competições
          </TabsTrigger>
          <TabsTrigger value="avaliacoes" className="rounded-xl font-semibold">
            Avaliações
          </TabsTrigger>
          <TabsTrigger value="chat" className="rounded-xl font-semibold">
            Chat Global
          </TabsTrigger>
        </TabsList>

        {/* Grupos Colaborativos */}
        <TabsContent value="grupos" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar grupos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg bg-white"
              >
                <option value="todos">Todas as categorias</option>
                <option value="educacao">Educação</option>
                <option value="setorial">Setorial</option>
                <option value="estrategia">Estratégia</option>
              </select>
            </div>
            <Button className="bg-[#ff5722] hover:bg-[#e64a19]">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockGrupos.map((grupo) => (
              <Card key={grupo.id} className="card-premium border-0 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={grupo.avatar || "/placeholder.svg"} alt={grupo.nome} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold">
                        {grupo.nome.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-right">
                      <Badge
                        className={`${grupo.isPrivate ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                      >
                        {grupo.isPrivate ? <Lock className="h-3 w-3 mr-1" /> : <Unlock className="h-3 w-3 mr-1" />}
                        {grupo.isPrivate ? "Privado" : "Público"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900">{grupo.nome}</CardTitle>
                    <CardDescription className="text-gray-600 mt-2">{grupo.descricao}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Membros:</span>
                    <span className="font-medium">
                      {grupo.membros.toLocaleString()}/{grupo.maxMembros.toLocaleString()}
                    </span>
                  </div>

                  <Progress value={(grupo.membros / grupo.maxMembros) * 100} className="h-2" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">+{grupo.performance}%</div>
                      <div className="text-xs text-gray-600">Performance</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">R$ {(grupo.patrimonio / 1000).toFixed(0)}k</div>
                      <div className="text-xs text-gray-600">Patrimônio</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={
                          grupo.risco === "baixo"
                            ? "bg-green-100 text-green-800"
                            : grupo.risco === "medio"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {grupo.risco === "baixo"
                          ? "Baixo Risco"
                          : grupo.risco === "medio"
                            ? "Médio Risco"
                            : "Alto Risco"}
                      </Badge>
                      <Badge variant="outline">{grupo.nivel}</Badge>
                    </div>
                    <span className="text-gray-500">{grupo.ultimaAtividade}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {grupo.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-[#1a237e] hover:bg-[#0d47a1]">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Participar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Matching com Mentores */}
        <TabsContent value="mentores" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMentores.map((mentor) => (
              <Card key={mentor.id} className="card-premium border-0">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.nome} />
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-600 text-white text-lg font-bold">
                        {mentor.nome.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900">{mentor.nome}</CardTitle>
                      <CardDescription className="text-gray-600">{mentor.especialidade}</CardDescription>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(mentor.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {mentor.rating} ({mentor.avaliacoes} avaliações)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-700">{mentor.descricao}</p>

                  <div className="flex flex-wrap gap-1">
                    {mentor.badges.map((badge) => (
                      <Badge key={badge} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Experiência:</span>
                      <span className="font-medium">{mentor.experiencia} anos</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Sessões realizadas:</span>
                      <span className="font-medium">{mentor.sessoes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Preço por hora:</span>
                      <span className="font-medium text-green-600">R$ {mentor.preco}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Áreas de especialidade:</h4>
                    <div className="flex flex-wrap gap-1">
                      {mentor.areas.map((area) => (
                        <Badge key={area} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${mentor.disponivel ? "bg-green-500" : "bg-red-500"}`} />
                      <span className={mentor.disponivel ? "text-green-600" : "text-red-600"}>
                        {mentor.disponivel ? "Disponível" : "Ocupado"}
                      </span>
                    </div>
                    <span className="text-gray-500">{mentor.proximaDisponibilidade}</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-[#ff5722] hover:bg-[#e64a19]" disabled={!mentor.disponivel}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Sessão
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Eventos Virtuais e Masterclasses */}
        <TabsContent value="eventos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockEventos.map((evento) => (
              <Card key={evento.id} className="card-premium border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge
                      className={
                        evento.tipo === "masterclass"
                          ? "bg-purple-100 text-purple-800"
                          : evento.tipo === "workshop"
                            ? "bg-blue-100 text-blue-800"
                            : evento.tipo === "webinar"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                      }
                    >
                      {evento.tipo === "masterclass" && <BookOpen className="h-3 w-3 mr-1" />}
                      {evento.tipo === "workshop" && <Settings className="h-3 w-3 mr-1" />}
                      {evento.tipo === "webinar" && <Video className="h-3 w-3 mr-1" />}
                      {evento.tipo === "networking" && <Users className="h-3 w-3 mr-1" />}
                      {evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1)}
                    </Badge>
                    <div className="text-right">
                      {evento.preco > 0 ? (
                        <span className="text-lg font-bold text-green-600">R$ {evento.preco}</span>
                      ) : (
                        <Badge className="bg-green-500 text-white">GRATUITO</Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{evento.titulo}</CardTitle>
                  <CardDescription className="text-gray-600">{evento.descricao}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={evento.instrutorAvatar || "/placeholder.svg"} alt={evento.instrutor} />
                      <AvatarFallback>{evento.instrutor.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">{evento.instrutor}</div>
                      <div className="text-sm text-gray-600">Instrutor</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(evento.data).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{evento.duracao} min</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>
                        {evento.participantes}/{evento.maxParticipantes}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Target className="h-4 w-4 text-gray-400" />
                      <span>{evento.nivel}</span>
                    </div>
                  </div>

                  <Progress value={(evento.participantes / evento.maxParticipantes) * 100} className="h-2" />

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Tópicos abordados:</h4>
                    <div className="flex flex-wrap gap-1">
                      {evento.topicos.map((topico) => (
                        <Badge key={topico} variant="outline" className="text-xs">
                          {topico}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {evento.certificado && (
                        <div className="flex items-center space-x-1 text-sm text-green-600">
                          <Award className="h-4 w-4" />
                          <span>Certificado</span>
                        </div>
                      )}
                      {evento.gravacao && (
                        <div className="flex items-center space-x-1 text-sm text-blue-600">
                          <Video className="h-4 w-4" />
                          <span>Gravação</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-[#1a237e] hover:bg-[#0d47a1]">
                      <Calendar className="h-4 w-4 mr-2" />
                      Inscrever-se
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Feed Social com Conquistas */}
        <TabsContent value="feed" className="space-y-6">
          <div className="max-w-2xl mx-auto space-y-6">
            {mockAtividades.map((atividade) => (
              <Card key={atividade.id} className="card-premium border-0">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={atividade.usuarioAvatar || "/placeholder.svg"} alt={atividade.usuario} />
                      <AvatarFallback>{atividade.usuario.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-gray-900">{atividade.usuario}</span>
                        <Badge
                          className={
                            atividade.tipo === "conquista"
                              ? "bg-yellow-100 text-yellow-800"
                              : atividade.tipo === "nivel"
                                ? "bg-purple-100 text-purple-800"
                                : atividade.tipo === "investimento"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                          }
                        >
                          {atividade.tipo === "conquista" && <Trophy className="h-3 w-3 mr-1" />}
                          {atividade.tipo === "nivel" && <Crown className="h-3 w-3 mr-1" />}
                          {atividade.tipo === "investimento" && <TrendingUp className="h-3 w-3 mr-1" />}
                          {atividade.tipo.charAt(0).toUpperCase() + atividade.tipo.slice(1)}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(atividade.timestamp).toLocaleString("pt-BR")}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{atividade.titulo}</h3>
                      <p className="text-gray-600 mb-4">{atividade.descricao}</p>

                      {atividade.valor && (
                        <div className="bg-green-50 p-3 rounded-lg mb-4">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-5 w-5 text-green-600" />
                            <span className="font-semibold text-green-800">R$ {atividade.valor.toLocaleString()}</span>
                          </div>
                        </div>
                      )}

                      {atividade.badge && (
                        <div className="bg-yellow-50 p-3 rounded-lg mb-4">
                          <div className="flex items-center space-x-2">
                            <Trophy className="h-5 w-5 text-yellow-600" />
                            <span className="font-semibold text-yellow-800">
                              Badge: {atividade.badge.replace("_", " ").toUpperCase()}
                            </span>
                          </div>
                        </div>
                      )}

                      {atividade.nivel && (
                        <div className="bg-purple-50 p-3 rounded-lg mb-4">
                          <div className="flex items-center space-x-2">
                            <Crown className="h-5 w-5 text-purple-600" />
                            <span className="font-semibold text-purple-800">Nível {atividade.nivel} - Diamante</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                          <Heart className="h-4 w-4 mr-1" />
                          Curtir
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Comentar
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
                          <Share2 className="h-4 w-4 mr-1" />
                          Compartilhar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Competições entre Carteiras */}
        <TabsContent value="competicoes" className="space-y-6">
          <div className="space-y-6">
            {mockCompeticoes.map((competicao) => (
              <Card key={competicao.id} className="card-premium border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-gray-900">{competicao.nome}</CardTitle>
                      <CardDescription className="text-gray-600 mt-2">{competicao.descricao}</CardDescription>
                    </div>
                    <Badge
                      className={
                        competicao.status === "ativa"
                          ? "bg-green-100 text-green-800"
                          : competicao.status === "finalizada"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                      }
                    >
                      {competicao.status === "ativa" && <Play className="h-3 w-3 mr-1" />}
                      {competicao.status === "finalizada" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {competicao.status === "em_breve" && <Clock className="h-3 w-3 mr-1" />}
                      {competicao.status.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{competicao.participantes}</div>
                      <div className="text-sm text-gray-600">Participantes</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{competicao.tipo.toUpperCase()}</div>
                      <div className="text-sm text-gray-600">Duração</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{competicao.premio.split(" ")[1]}</div>
                      <div className="text-sm text-gray-600">Prêmio</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{competicao.categoria}</div>
                      <div className="text-sm text-gray-600">Categoria</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 Ranking Atual</h3>
                    <div className="space-y-3">
                      {competicao.ranking.map((participante) => (
                        <div
                          key={participante.posicao}
                          className="flex items-center justify-between p-4 bg-white rounded-lg border"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                                participante.posicao === 1
                                  ? "bg-yellow-500"
                                  : participante.posicao === 2
                                    ? "bg-gray-400"
                                    : participante.posicao === 3
                                      ? "bg-amber-600"
                                      : "bg-gray-300"
                              }`}
                            >
                              {participante.posicao}
                            </div>
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={participante.avatar || "/placeholder.svg"} alt={participante.usuario} />
                              <AvatarFallback>{participante.usuario.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-gray-900">{participante.usuario}</div>
                              <div className="text-sm text-gray-600">
                                R$ {(participante.patrimonio / 1000).toFixed(0)}k patrimônio
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">+{participante.performance}%</div>
                            <div className="text-sm text-gray-600">Performance</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Período: {new Date(competicao.inicio).toLocaleDateString("pt-BR")} -{" "}
                      {new Date(competicao.fim).toLocaleDateString("pt-BR")}
                    </div>
                    <Button className="bg-[#ff5722] hover:bg-[#e64a19]">
                      <Trophy className="h-4 w-4 mr-2" />
                      {competicao.status === "ativa" ? "Participar" : "Ver Detalhes"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Sistema de Avaliações */}
        <TabsContent value="avaliacoes" className="space-y-6">
          <Card className="card-premium border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Sistema de Avaliações</CardTitle>
              <CardDescription>Avalie e seja avaliado pela comunidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                  <div className="text-4xl font-bold text-green-600 mb-2">4.8</div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">Sua Avaliação Geral</div>
                  <div className="text-xs text-gray-500 mt-1">Baseado em 127 avaliações</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-4xl font-bold text-purple-600 mb-2">89</div>
                  <div className="text-sm text-gray-600">Avaliações Dadas</div>
                  <div className="text-xs text-gray-500 mt-1">Você é um avaliador ativo</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl">
                  <div className="text-4xl font-bold text-orange-600 mb-2">156</div>
                  <div className="text-sm text-gray-600">Avaliações Recebidas</div>
                  <div className="text-xs text-gray-500 mt-1">Membro bem avaliado</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Categorias de Avaliação</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Conhecimento Técnico</span>
                      <span className="text-green-600 font-bold">4.9</span>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Comunicação</span>
                      <span className="text-green-600 font-bold">4.7</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Confiabilidade</span>
                      <span className="text-green-600 font-bold">4.8</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Colaboração</span>
                      <span className="text-green-600 font-bold">4.6</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Avaliações Recentes</h3>

                <div className="space-y-4">
                  {[
                    {
                      avaliador: "Maria Silva",
                      avatar: "/placeholder.svg?height=40&width=40&text=MS",
                      rating: 5,
                      comentario: "Excelente mentor! Muito didático e paciente. Recomendo!",
                      data: "2024-01-18",
                      categoria: "Mentoria",
                    },
                    {
                      avaliador: "João Santos",
                      avatar: "/placeholder.svg?height=40&width=40&text=JS",
                      rating: 4,
                      comentario: "Ótimas dicas de investimento. Muito conhecimento técnico.",
                      data: "2024-01-15",
                      categoria: "Consultoria",
                    },
                    {
                      avaliador: "Ana Costa",
                      avatar: "/placeholder.svg?height=40&width=40&text=AC",
                      rating: 5,
                      comentario: "Participação muito ativa no grupo. Sempre ajuda os outros.",
                      data: "2024-01-12",
                      categoria: "Colaboração",
                    },
                  ].map((avaliacao, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={avaliacao.avatar || "/placeholder.svg"} alt={avaliacao.avaliador} />
                          <AvatarFallback>{avaliacao.avaliador.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">{avaliacao.avaliador}</span>
                              <Badge variant="outline" className="text-xs">
                                {avaliacao.categoria}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < avaliacao.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(avaliacao.data).toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm">{avaliacao.comentario}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chat Global */}
        <TabsContent value="chat" className="space-y-6">
          <Card className="card-premium border-0 h-[600px] flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900">Chat Global da Comunidade</CardTitle>
                  <CardDescription>Converse em tempo real com outros investidores</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">2.847 online</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-4">
              <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-lg">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Seja o primeiro a enviar uma mensagem!</p>
                  </div>
                ) : (
                  chatMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.usuario} />
                        <AvatarFallback className="text-xs">{message.usuario.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm text-gray-900">{message.usuario}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-2 rounded-lg">{message.mensagem}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} className="bg-[#1a237e] hover:bg-[#0d47a1]">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
