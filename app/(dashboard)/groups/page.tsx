"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Search, Plus, Crown, TrendingUp, MessageCircle, Lock, Globe, UserPlus, Settings } from "lucide-react"
import { GroupCardSkeleton } from "@/components/loading-skeleton"

interface Group {
  id: string
  name: string
  description: string
  category: "beginner" | "intermediate" | "advanced" | "sector" | "strategy"
  privacy: "public" | "private"
  memberCount: number
  maxMembers: number
  isJoined: boolean
  isOwner: boolean
  avatar: string
  createdAt: string
  lastActivity: string
  performance: number
  tags: string[]
  owner: {
    name: string
    avatar: string
  }
  topMembers: Array<{
    name: string
    avatar: string
    performance: number
  }>
}

const mockGroups: Group[] = [
  {
    id: "1",
    name: "Investidores Iniciantes",
    description:
      "Grupo para quem está começando no mundo dos investimentos. Compartilhamos dicas básicas e estratégias seguras.",
    category: "beginner",
    privacy: "public",
    memberCount: 1247,
    maxMembers: 2000,
    isJoined: true,
    isOwner: false,
    avatar: "/placeholder.svg?height=60&width=60",
    createdAt: "2024-01-15",
    lastActivity: "2 horas atrás",
    performance: 8.5,
    tags: ["Iniciante", "Educação", "Renda Fixa"],
    owner: {
      name: "Maria Silva",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    topMembers: [
      { name: "João", avatar: "/placeholder.svg?height=32&width=32", performance: 12.3 },
      { name: "Ana", avatar: "/placeholder.svg?height=32&width=32", performance: 10.8 },
      { name: "Pedro", avatar: "/placeholder.svg?height=32&width=32", performance: 9.7 },
    ],
  },
  {
    id: "2",
    name: "Tech Stocks Brasil",
    description: "Focado em ações de tecnologia brasileiras e internacionais. Análises técnicas e fundamentalistas.",
    category: "sector",
    privacy: "public",
    memberCount: 856,
    maxMembers: 1000,
    isJoined: false,
    isOwner: false,
    avatar: "/placeholder.svg?height=60&width=60",
    createdAt: "2024-02-01",
    lastActivity: "30 minutos atrás",
    performance: 15.2,
    tags: ["Tecnologia", "Growth", "Internacional"],
    owner: {
      name: "Carlos Tech",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    topMembers: [
      { name: "Lucas", avatar: "/placeholder.svg?height=32&width=32", performance: 18.5 },
      { name: "Fernanda", avatar: "/placeholder.svg?height=32&width=32", performance: 16.2 },
      { name: "Roberto", avatar: "/placeholder.svg?height=32&width=32", performance: 14.8 },
    ],
  },
  {
    id: "3",
    name: "Dividendos Premium",
    description: "Estratégias avançadas para maximizar renda passiva através de dividendos. Grupo exclusivo.",
    category: "strategy",
    privacy: "private",
    memberCount: 234,
    maxMembers: 300,
    isJoined: false,
    isOwner: false,
    avatar: "/placeholder.svg?height=60&width=60",
    createdAt: "2024-01-20",
    lastActivity: "1 hora atrás",
    performance: 11.8,
    tags: ["Dividendos", "Premium", "Renda Passiva"],
    owner: {
      name: "Ana Dividendos",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    topMembers: [
      { name: "Miguel", avatar: "/placeholder.svg?height=32&width=32", performance: 13.2 },
      { name: "Sofia", avatar: "/placeholder.svg?height=32&width=32", performance: 12.1 },
      { name: "Diego", avatar: "/placeholder.svg?height=32&width=32", performance: 11.9 },
    ],
  },
  {
    id: "4",
    name: "Meu Grupo VIP",
    description: "Grupo privado que criei para compartilhar minhas melhores estratégias com investidores selecionados.",
    category: "advanced",
    privacy: "private",
    memberCount: 45,
    maxMembers: 50,
    isJoined: true,
    isOwner: true,
    avatar: "/placeholder.svg?height=60&width=60",
    createdAt: "2024-02-10",
    lastActivity: "15 minutos atrás",
    performance: 22.1,
    tags: ["VIP", "Estratégias Avançadas", "Exclusivo"],
    owner: {
      name: "Você",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    topMembers: [
      { name: "Ricardo", avatar: "/placeholder.svg?height=32&width=32", performance: 25.3 },
      { name: "Juliana", avatar: "/placeholder.svg?height=32&width=32", performance: 23.8 },
      { name: "Marcos", avatar: "/placeholder.svg?height=32&width=32", performance: 21.5 },
    ],
  },
]

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Simular carregamento
    setTimeout(() => {
      setGroups(mockGroups)
      setLoading(false)
    }, 1500)
  }, [])

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "joined") return matchesSearch && group.isJoined
    if (activeTab === "owned") return matchesSearch && group.isOwner
    if (activeTab === "public") return matchesSearch && group.privacy === "public"

    return matchesSearch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-blue-100 text-blue-800"
      case "advanced":
        return "bg-purple-100 text-purple-800"
      case "sector":
        return "bg-orange-100 text-orange-800"
      case "strategy":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "beginner":
        return "Iniciante"
      case "intermediate":
        return "Intermediário"
      case "advanced":
        return "Avançado"
      case "sector":
        return "Setor"
      case "strategy":
        return "Estratégia"
      default:
        return category
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-80 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <GroupCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="text-2xl">👥</div>
            <h1 className="text-2xl font-bold text-gray-900">Grupos</h1>
          </div>
          <p className="text-base text-gray-600">Conecte-se com outros investidores e compartilhe estratégias</p>
        </div>
        <Button className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-3">
          <Plus className="h-4 w-4 mr-2" />
          Criar Grupo
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar grupos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base border-gray-300 focus:border-orange-400 focus:ring-orange-400"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm rounded-lg p-1">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Todos
          </TabsTrigger>
          <TabsTrigger value="joined" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Meus Grupos
          </TabsTrigger>
          <TabsTrigger value="owned" className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Criados por Mim
          </TabsTrigger>
          <TabsTrigger value="public" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Públicos
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className={`bg-white shadow-lg rounded-xl border transition-all hover:shadow-xl ${
                  group.isJoined ? "border-orange-200 bg-orange-50" : "border-gray-100"
                }`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                        <AvatarFallback className="bg-orange-100 text-orange-600 font-semibold">
                          {group.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          {group.name}
                          {group.privacy === "private" && <Lock className="h-4 w-4 text-gray-400" />}
                          {group.isOwner && <Crown className="h-4 w-4 text-yellow-500" />}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(group.category)}>{getCategoryLabel(group.category)}</Badge>
                          {group.performance > 0 && (
                            <div className="flex items-center gap-1 text-sm text-green-600">
                              <TrendingUp className="h-3 w-3" />+{group.performance}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-base text-gray-600 line-clamp-2">{group.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {group.memberCount}/{group.maxMembers}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {group.lastActivity}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {group.topMembers.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="h-8 w-8 border-2 border-white">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                            {member.name[0]}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">+{group.memberCount - 3} membros</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {group.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-300 text-gray-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={group.owner.avatar || "/placeholder.svg"} alt={group.owner.name} />
                        <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                          {group.owner.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span>por {group.owner.name}</span>
                    </div>

                    {group.isOwner ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Gerenciar
                      </Button>
                    ) : group.isJoined ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Entrar
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-orange-400 hover:bg-orange-500 text-white font-medium">
                        <UserPlus className="h-4 w-4 mr-1" />
                        {group.privacy === "private" ? "Solicitar" : "Participar"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum grupo encontrado</h3>
                <p className="text-base text-gray-600 mb-6">Tente ajustar seus filtros ou criar um novo grupo</p>
                <Button className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-3">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Novo Grupo
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
