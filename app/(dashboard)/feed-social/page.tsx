"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  MessageCircle,
  Share2,
  Trophy,
  Users,
  Star,
  Send,
  Filter,
  Search,
  Gift,
  Calendar,
  BookOpen,
  Lightbulb,
} from "lucide-react"

interface Post {
  id: string
  user: {
    name: string
    avatar: string
    level: number
    badge: string
  }
  content: string
  type: "achievement" | "tip" | "question" | "celebration"
  timestamp: string
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  achievement?: {
    title: string
    description: string
    icon: React.ReactNode
    rarity: "common" | "rare" | "epic" | "legendary"
  }
}

interface Mentor {
  id: string
  name: string
  avatar: string
  specialty: string
  rating: number
  students: number
  experience: string
  price: number
  available: boolean
}

const SistemaApadrinhamento = () => {
  const [mentores] = useState<Mentor[]>([
    {
      id: "1",
      name: "Carlos Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "Ações e Dividendos",
      rating: 4.9,
      students: 156,
      experience: "15 anos",
      price: 150,
      available: true,
    },
    {
      id: "2",
      name: "Ana Costa",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "Fundos Imobiliários",
      rating: 4.8,
      students: 89,
      experience: "12 anos",
      price: 120,
      available: true,
    },
    {
      id: "3",
      name: "Roberto Lima",
      avatar: "/placeholder.svg?height=40&width=40",
      specialty: "Análise Técnica",
      rating: 4.7,
      students: 203,
      experience: "18 anos",
      price: 180,
      available: false,
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Mentores Disponíveis</h3>
        <Select>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por especialidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="acoes">Ações e Dividendos</SelectItem>
            <SelectItem value="fiis">Fundos Imobiliários</SelectItem>
            <SelectItem value="analise">Análise Técnica</SelectItem>
            <SelectItem value="renda-fixa">Renda Fixa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mentores.map((mentor) => (
          <Card key={mentor.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={mentor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{mentor.name}</h4>
                  <p className="text-sm text-muted-foreground">{mentor.specialty}</p>
                </div>
                {!mentor.available && <Badge variant="secondary">Ocupado</Badge>}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{mentor.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{mentor.students} alunos</span>
                </div>
              </div>

              <div className="text-sm">
                <p>
                  <strong>Experiência:</strong> {mentor.experience}
                </p>
                <p>
                  <strong>Sessão:</strong> R$ {mentor.price}/hora
                </p>
              </div>

              <Button
                className="w-full"
                disabled={!mentor.available}
                variant={mentor.available ? "default" : "secondary"}
              >
                {mentor.available ? "Agendar Mentoria" : "Indisponível"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function FeedSocialPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      user: {
        name: "Maria Santos",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 15,
        badge: "Investidora Expert",
      },
      content: "Acabei de completar minha primeira carteira diversificada! 🎉",
      type: "achievement",
      timestamp: "2 horas atrás",
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      achievement: {
        title: "Primeira Carteira",
        description: "Criou sua primeira carteira diversificada",
        icon: <Trophy className="h-6 w-6" />,
        rarity: "rare",
      },
    },
    {
      id: "2",
      user: {
        name: "João Silva",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 8,
        badge: "Aprendiz",
      },
      content: "Dica: Sempre diversifique seus investimentos. Não coloque todos os ovos na mesma cesta! 💡",
      type: "tip",
      timestamp: "4 horas atrás",
      likes: 45,
      comments: 12,
      shares: 18,
      isLiked: true,
    },
    {
      id: "3",
      user: {
        name: "Ana Costa",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 22,
        badge: "Mentora Gold",
      },
      content: "Alguém pode me explicar a diferença entre dividendos e JCP? 🤔",
      type: "question",
      timestamp: "6 horas atrás",
      likes: 12,
      comments: 25,
      shares: 5,
      isLiked: false,
    },
  ])

  const [newPost, setNewPost] = useState("")
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

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
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        user: {
          name: "Você",
          avatar: "/placeholder.svg?height=40&width=40",
          level: 10,
          badge: "Investidor",
        },
        content: newPost,
        type: "tip",
        timestamp: "Agora",
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
      }
      setPosts([post, ...posts])
      setNewPost("")
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesFilter = filter === "all" || post.type === filter
    const matchesSearch =
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800"
      case "rare":
        return "bg-blue-100 text-blue-800"
      case "epic":
        return "bg-purple-100 text-purple-800"
      case "legendary":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Trophy className="h-4 w-4" />
      case "tip":
        return <Lightbulb className="h-4 w-4" />
      case "question":
        return <MessageCircle className="h-4 w-4" />
      case "celebration":
        return <Gift className="h-4 w-4" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Feed Social Julius</h1>
        <p className="text-muted-foreground">
          Conecte-se com outros investidores, compartilhe conquistas e aprenda juntos
        </p>
      </div>

      <Tabs defaultValue="feed" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed">Feed Principal</TabsTrigger>
          <TabsTrigger value="mentoria">Sistema de Mentoria</TabsTrigger>
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          {/* Criar Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Compartilhar</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Compartilhe uma dica, conquista ou faça uma pergunta..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Badge variant="outline">💡 Dica</Badge>
                  <Badge variant="outline">🏆 Conquista</Badge>
                  <Badge variant="outline">❓ Pergunta</Badge>
                </div>
                <Button onClick={handleCreatePost} disabled={!newPost.trim()}>
                  Publicar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Filtros */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os posts</SelectItem>
                    <SelectItem value="achievement">Conquistas</SelectItem>
                    <SelectItem value="tip">Dicas</SelectItem>
                    <SelectItem value="question">Perguntas</SelectItem>
                    <SelectItem value="celebration">Celebrações</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {post.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold">{post.user.name}</h4>
                        <Badge variant="secondary">Nível {post.user.level}</Badge>
                        <Badge variant="outline">{post.user.badge}</Badge>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        {getTypeIcon(post.type)}
                        <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {post.achievement && (
                    <div className={`p-4 rounded-lg border-2 border-dashed ${getRarityColor(post.achievement.rarity)}`}>
                      <div className="flex items-center space-x-3">
                        {post.achievement.icon}
                        <div>
                          <h5 className="font-semibold">{post.achievement.title}</h5>
                          <p className="text-sm">{post.achievement.description}</p>
                        </div>
                        <Badge className={getRarityColor(post.achievement.rarity)}>{post.achievement.rarity}</Badge>
                      </div>
                    </div>
                  )}

                  <p className="text-sm leading-relaxed">{post.content}</p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={post.isLiked ? "text-red-500" : ""}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        {post.shares}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mentoria">
          <SistemaApadrinhamento />
        </TabsContent>

        <TabsContent value="eventos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Próximos Eventos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Masterclass: Análise Fundamentalista</h4>
                    <p className="text-sm text-muted-foreground">Hoje às 19:00 • Com Carlos Silva</p>
                  </div>
                  <Button size="sm">Participar</Button>
                </div>

                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Workshop: Fundos Imobiliários</h4>
                    <p className="text-sm text-muted-foreground">Amanhã às 14:00 • Com Ana Costa</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Inscrever-se
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
