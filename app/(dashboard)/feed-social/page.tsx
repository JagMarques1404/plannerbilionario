"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Users,
  Calendar,
  Trophy,
  Star,
  Filter,
  Search,
  Plus,
  UserPlus,
  Clock,
  Target,
  Award,
  Zap,
  BookOpen,
  Video,
  Coffee,
} from "lucide-react"

interface Post {
  id: string
  author: {
    name: string
    avatar: string
    level: number
    badge: string
  }
  content: string
  type: "conquista" | "investimento" | "dica" | "pergunta"
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  tags: string[]
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

export default function FeedSocialPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [posts, setPosts] = useState<Post[]>([])
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [newPost, setNewPost] = useState("")
  const [postType, setPostType] = useState<Post["type"]>("dica")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("todos")

  useEffect(() => {
    // Simular carregamento de dados
    setPosts([
      {
        id: "1",
        author: {
          name: "Ana Silva",
          avatar: "/placeholder.svg?height=40&width=40",
          level: 15,
          badge: "Investidora Expert",
        },
        content:
          "Acabei de completar minha primeira carteira diversificada! 🎉 Consegui alocar 60% em ações, 30% em FIIs e 10% em renda fixa. O segredo foi estudar muito e começar aos poucos.",
        type: "conquista",
        timestamp: "2 horas atrás",
        likes: 24,
        comments: 8,
        shares: 3,
        isLiked: false,
        tags: ["diversificacao", "iniciante", "conquista"],
      },
      {
        id: "2",
        author: {
          name: "Carlos Mendes",
          avatar: "/placeholder.svg?height=40&width=40",
          level: 22,
          badge: "Trader Pro",
        },
        content:
          'Dica rápida: Sempre façam análise fundamentalista antes de investir em uma ação. Olhem o P/L, ROE e endividamento da empresa. Não invistam apenas por "dicas" de terceiros!',
        type: "dica",
        timestamp: "4 horas atrás",
        likes: 45,
        comments: 12,
        shares: 18,
        isLiked: true,
        tags: ["analise", "acoes", "fundamentalista"],
      },
      {
        id: "3",
        author: {
          name: "Marina Costa",
          avatar: "/placeholder.svg?height=40&width=40",
          level: 8,
          badge: "Aprendiz",
        },
        content:
          "Pessoal, tenho R$ 1.000 para começar a investir. Vocês recomendam começar com Tesouro Direto ou já partir para ações? Estou bem perdida! 😅",
        type: "pergunta",
        timestamp: "6 horas atrás",
        likes: 12,
        comments: 23,
        shares: 2,
        isLiked: false,
        tags: ["iniciante", "tesouro", "duvida"],
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

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const handleCreatePost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: "Você",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 10,
        badge: "Membro",
      },
      content: newPost,
      type: postType,
      timestamp: "Agora",
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      tags: [],
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "todos" || post.type === filterType
    return matchesSearch && matchesFilter
  })

  const getTypeIcon = (type: Post["type"]) => {
    switch (type) {
      case "conquista":
        return <Trophy className="h-4 w-4" />
      case "investimento":
        return <TrendingUp className="h-4 w-4" />
      case "dica":
        return <Zap className="h-4 w-4" />
      case "pergunta":
        return <MessageCircle className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: Post["type"]) => {
    switch (type) {
      case "conquista":
        return "bg-yellow-100 text-yellow-800"
      case "investimento":
        return "bg-green-100 text-green-800"
      case "dica":
        return "bg-blue-100 text-blue-800"
      case "pergunta":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Feed Social Julius</h1>
        <p className="text-gray-600">Conecte-se com outros investidores, compartilhe conquistas e aprenda junto!</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Feed
          </TabsTrigger>
          <TabsTrigger value="mentores" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Mentores
          </TabsTrigger>
          <TabsTrigger value="eventos" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Eventos
          </TabsTrigger>
          <TabsTrigger value="competicoes" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Competições
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          {/* Criar Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Compartilhar com a Comunidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="Compartilhe uma conquista, dica ou faça uma pergunta..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex items-center justify-between">
                    <Select value={postType} onValueChange={(value: Post["type"]) => setPostType(value)}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conquista">🏆 Conquista</SelectItem>
                        <SelectItem value="investimento">📈 Investimento</SelectItem>
                        <SelectItem value="dica">💡 Dica</SelectItem>
                        <SelectItem value="pergunta">❓ Pergunta</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                      Publicar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filtros */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os Posts</SelectItem>
                    <SelectItem value="conquista">Conquistas</SelectItem>
                    <SelectItem value="investimento">Investimentos</SelectItem>
                    <SelectItem value="dica">Dicas</SelectItem>
                    <SelectItem value="pergunta">Perguntas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {post.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{post.author.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              Nível {post.author.level}
                            </Badge>
                            <Badge className={`text-xs ${getTypeColor(post.type)}`}>
                              {getTypeIcon(post.type)}
                              <span className="ml-1 capitalize">{post.type}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            {post.author.badge} • {post.timestamp}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed">{post.content}</p>

                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-6 pt-2 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-2 ${post.isLiked ? "text-red-500" : "text-gray-500"}`}
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? "fill-current" : ""}`} />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-500">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-500">
                          <Share2 className="h-4 w-4" />
                          {post.shares}
                        </Button>
                      </div>
                    </div>
                  </div>
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
                          <Target className="h-4 w-4 text-gray-400" />
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

        <TabsContent value="competicoes" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <Trophy className="h-5 w-5" />
                  Desafio do Mês
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Maior Rentabilidade em Janeiro</h3>
                  <p className="text-sm text-gray-600">Quem conseguir a maior rentabilidade percentual ganha!</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso:</span>
                    <span>23 dias restantes</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Prêmios:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>1º lugar: R$ 1.000 + Badge Ouro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-gray-400" />
                      <span>2º lugar: R$ 500 + Badge Prata</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-orange-500" />
                      <span>3º lugar: R$ 250 + Badge Bronze</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Participar do Desafio</Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Users className="h-5 w-5" />
                  Liga dos Investidores
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Temporada 2024 - Q1</h3>
                  <p className="text-sm text-gray-600">Competição por pontos baseada em missões e performance</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-yellow-800">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Carlos Trader</p>
                        <p className="text-xs text-gray-500">2,450 pontos</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Ouro</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-800">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Ana Investidora</p>
                        <p className="text-xs text-gray-500">2,180 pontos</p>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Prata</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-800">3</span>
                      </div>
                      <div>
                        <p className="font-medium">João Dividendos</p>
                        <p className="text-xs text-gray-500">1,950 pontos</p>
                      </div>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800">Bronze</Badge>
                  </div>
                </div>

                <Button className="w-full bg-transparent" variant="outline">
                  Ver Ranking Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
