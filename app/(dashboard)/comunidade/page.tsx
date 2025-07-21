"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  MessageCircle,
  Calendar,
  Trophy,
  Star,
  Search,
  Filter,
  Plus,
  UserPlus,
  Clock,
  BookOpen,
  Video,
  Coffee,
  Send,
  Heart,
} from "lucide-react"

interface Group {
  id: string
  name: string
  description: string
  category: string
  members: number
  maxMembers: number
  isPrivate: boolean
  tags: string[]
  createdBy: string
  createdAt: string
  lastActivity: string
}

interface Mentor {
  id: string
  name: string
  avatar: string
  specialty: string
  rating: number
  experience: string
  price: number
  available: boolean
  nextSlot: string
}

interface Event {
  id: string
  title: string
  type: "masterclass" | "workshop" | "networking"
  date: string
  time: string
  duration: string
  instructor: string
  participants: number
  maxParticipants: number
  price: number
  level: "iniciante" | "intermediario" | "avancado"
}

export default function ComunidadePage() {
  const [activeTab, setActiveTab] = useState("grupos")
  const [groups, setGroups] = useState<Group[]>([])
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("todos")

  useEffect(() => {
    // Simular carregamento de dados
    setGroups([
      {
        id: "1",
        name: "Investidores Iniciantes",
        description: "Grupo para quem está começando no mundo dos investimentos",
        category: "educacao",
        members: 245,
        maxMembers: 500,
        isPrivate: false,
        tags: ["iniciante", "educacao", "duvidas"],
        createdBy: "Admin Julius",
        createdAt: "2024-01-01",
        lastActivity: "2 horas atrás",
      },
      {
        id: "2",
        name: "Análise Técnica Avançada",
        description: "Discussões sobre análise técnica e estratégias de trading",
        category: "trading",
        members: 89,
        maxMembers: 150,
        isPrivate: true,
        tags: ["analise-tecnica", "trading", "avancado"],
        createdBy: "Carlos Trader",
        createdAt: "2024-01-10",
        lastActivity: "30 min atrás",
      },
      {
        id: "3",
        name: "Dividendos e FIIs",
        description: "Foco em investimentos que geram renda passiva",
        category: "renda-passiva",
        members: 156,
        maxMembers: 300,
        isPrivate: false,
        tags: ["dividendos", "fiis", "renda-passiva"],
        createdBy: "Ana Dividendos",
        createdAt: "2024-01-05",
        lastActivity: "1 hora atrás",
      },
    ])

    setMentors([
      {
        id: "1",
        name: "Dr. Roberto Financeiro",
        avatar: "/placeholder.svg?height=60&width=60",
        specialty: "Análise Fundamentalista",
        rating: 4.9,
        experience: "15 anos",
        price: 150,
        available: true,
        nextSlot: "Hoje às 14:00",
      },
      {
        id: "2",
        name: "Profª. Lucia Investimentos",
        avatar: "/placeholder.svg?height=60&width=60",
        specialty: "Planejamento Financeiro",
        rating: 4.8,
        experience: "12 anos",
        price: 120,
        available: true,
        nextSlot: "Amanhã às 10:00",
      },
      {
        id: "3",
        name: "João Trader",
        avatar: "/placeholder.svg?height=60&width=60",
        specialty: "Day Trade & Swing Trade",
        rating: 4.7,
        experience: "8 anos",
        price: 200,
        available: false,
        nextSlot: "Sexta às 16:00",
      },
    ])

    setEvents([
      {
        id: "1",
        title: "Masterclass: Dividendos que Pagam",
        type: "masterclass",
        date: "2024-01-25",
        time: "19:00",
        duration: "2h",
        instructor: "Carlos Dividendos",
        participants: 245,
        maxParticipants: 500,
        price: 0,
        level: "intermediario",
      },
      {
        id: "2",
        title: "Workshop: Análise Técnica na Prática",
        type: "workshop",
        date: "2024-01-27",
        time: "14:00",
        duration: "4h",
        instructor: "Ana Gráficos",
        participants: 89,
        maxParticipants: 100,
        price: 97,
        level: "avancado",
      },
      {
        id: "3",
        title: "Networking: Investidores Iniciantes",
        type: "networking",
        date: "2024-01-30",
        time: "18:00",
        duration: "1h30",
        instructor: "Comunidade Julius",
        participants: 156,
        maxParticipants: 200,
        price: 0,
        level: "iniciante",
      },
    ])
  }, [])

  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "todos" || group.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getEventTypeIcon = (type: Event["type"]) => {
    switch (type) {
      case "masterclass":
        return <Video className="h-4 w-4" />
      case "workshop":
        return <BookOpen className="h-4 w-4" />
      case "networking":
        return <Coffee className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Comunidade Julius</h1>
        <p className="text-gray-600">Conecte-se, aprenda e cresça junto com outros investidores</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="grupos" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Grupos
          </TabsTrigger>
          <TabsTrigger value="mentores" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Mentores
          </TabsTrigger>
          <TabsTrigger value="eventos" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Eventos
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Chat Global
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grupos" className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar grupos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todas as Categorias</SelectItem>
                    <SelectItem value="educacao">Educação</SelectItem>
                    <SelectItem value="trading">Trading</SelectItem>
                    <SelectItem value="renda-passiva">Renda Passiva</SelectItem>
                    <SelectItem value="iniciante">Iniciante</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Grupo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Grupos */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{group.name}</CardTitle>
                      <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                    </div>
                    {group.isPrivate && <Badge variant="secondary">Privado</Badge>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {group.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Membros</span>
                      <span>
                        {group.members}/{group.maxMembers}
                      </span>
                    </div>
                    <Progress value={(group.members / group.maxMembers) * 100} className="h-2" />
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Criado por {group.createdBy}</p>
                    <p>Última atividade: {group.lastActivity}</p>
                  </div>

                  <Button className="w-full">{group.isPrivate ? "Solicitar Entrada" : "Entrar no Grupo"}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentores" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Avatar className="h-16 w-16 mx-auto">
                      <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {mentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold text-lg">{mentor.name}</h3>
                      <p className="text-sm text-gray-600">{mentor.specialty}</p>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                        <span className="text-sm text-gray-500">({mentor.experience})</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Próximo horário:</span>
                        <span className="font-medium">{mentor.nextSlot}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Valor/hora:</span>
                        <span className="font-medium text-green-600">R$ {mentor.price}</span>
                      </div>
                    </div>

                    <Button className="w-full" disabled={!mentor.available}>
                      {mentor.available ? "Agendar Mentoria" : "Indisponível"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="eventos" className="space-y-6">
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        {getEventTypeIcon(event.type)}
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <p className="text-sm text-gray-600">com {event.instructor}</p>
                        </div>
                        <Badge
                          className={`capitalize ${
                            event.level === "iniciante"
                              ? "bg-green-100 text-green-800"
                              : event.level === "intermediario"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {event.level}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{new Date(event.date).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>
                            {event.time} ({event.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>
                            {event.participants}/{event.maxParticipants}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-green-600">
                            {event.price === 0 ? "Gratuito" : `R$ ${event.price}`}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Vagas ocupadas:</span>
                          <span>{Math.round((event.participants / event.maxParticipants) * 100)}%</span>
                        </div>
                        <Progress value={(event.participants / event.maxParticipants) * 100} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1">
                          {event.price === 0 ? "Inscrever-se Grátis" : `Inscrever-se - R$ ${event.price}`}
                        </Button>
                        <Button variant="outline" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat Global da Comunidade
                <Badge className="bg-green-100 text-green-800 ml-auto">
                  <Users className="h-3 w-3 mr-1" />
                  247 online
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                {/* Mensagens do chat */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">João Silva</span>
                      <Badge variant="outline" className="text-xs">
                        Nível 12
                      </Badge>
                      <span className="text-xs text-gray-500">14:32</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Pessoal, alguém pode me explicar a diferença entre P/L e P/VP? 🤔
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-100 text-green-800 text-xs">AC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Ana Costa</span>
                      <Badge variant="outline" className="text-xs">
                        Mentora
                      </Badge>
                      <span className="text-xs text-gray-500">14:35</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      @João Silva P/L é Preço/Lucro e P/VP é Preço/Valor Patrimonial. O P/L mostra quantos anos levaria
                      para recuperar o investimento com base no lucro atual da empresa! 📈
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-purple-100 text-purple-800 text-xs">MR</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Maria Rodrigues</span>
                      <Badge variant="outline" className="text-xs">
                        Nível 8
                      </Badge>
                      <span className="text-xs text-gray-500">14:37</span>
                    </div>
                    <p className="text-sm text-gray-700">Obrigada @Ana Costa! Muito esclarecedor! 🙏</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-100 text-gray-800 text-xs">VC</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex items-center gap-2">
                  <Input placeholder="Digite sua mensagem..." className="flex-1" />
                  <Button size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
