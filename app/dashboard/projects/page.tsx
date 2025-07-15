"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  FolderPlus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  ArrowLeft,
  Star,
  Clock,
  CheckCircle,
  Play,
  Archive,
} from "lucide-react"
import Link from "next/link"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Redesign completo do site corporativo",
      status: "Em Progresso",
      progress: 75,
      priority: "Alta",
      dueDate: "2024-02-15",
      team: [
        { name: "João", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Maria", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Pedro", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: { completed: 12, total: 16 },
      budget: "R$ 15.000",
      client: "Empresa ABC",
    },
    {
      id: 2,
      name: "App Mobile",
      description: "Desenvolvimento do aplicativo iOS/Android",
      status: "Planejamento",
      progress: 25,
      priority: "Média",
      dueDate: "2024-03-30",
      team: [
        { name: "Ana", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Carlos", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: { completed: 3, total: 20 },
      budget: "R$ 45.000",
      client: "Startup XYZ",
    },
    {
      id: 3,
      name: "Sistema CRM",
      description: "Implementação de sistema de gestão de clientes",
      status: "Concluído",
      progress: 100,
      priority: "Alta",
      dueDate: "2024-01-20",
      team: [
        { name: "Roberto", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Lucia", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Fernando", avatar: "/placeholder.svg?height=32&width=32" },
        { name: "Carla", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      tasks: { completed: 25, total: 25 },
      budget: "R$ 30.000",
      client: "Indústria DEF",
    },
    {
      id: 4,
      name: "E-commerce Platform",
      description: "Plataforma de vendas online com integração de pagamentos",
      status: "Pausado",
      progress: 40,
      priority: "Baixa",
      dueDate: "2024-04-15",
      team: [{ name: "Marcos", avatar: "/placeholder.svg?height=32&width=32" }],
      tasks: { completed: 8, total: 18 },
      budget: "R$ 25.000",
      client: "Loja GHI",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Progresso":
        return "bg-blue-100 text-blue-800"
      case "Planejamento":
        return "bg-yellow-100 text-yellow-800"
      case "Concluído":
        return "bg-green-100 text-green-800"
      case "Pausado":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "text-red-600"
      case "Média":
        return "text-yellow-600"
      case "Baixa":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Projetos</h1>
                <p className="text-gray-600">Gerencie todos os seus projetos em um só lugar</p>
              </div>
            </div>
            <Button>
              <FolderPlus className="h-4 w-4 mr-2" />
              Novo Projeto
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Projetos</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
                <FolderPlus className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Em Progresso</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <Play className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Concluídos</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Orçamento Total</p>
                  <p className="text-2xl font-bold">R$ 115k</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar projetos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">Todos os Status</option>
                  <option value="Em Progresso">Em Progresso</option>
                  <option value="Planejamento">Planejamento</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Pausado">Pausado</option>
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                  <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority} Prioridade
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progresso</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>

                {/* Tasks */}
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                    {project.tasks.completed}/{project.tasks.total} tarefas
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(project.dueDate).toLocaleDateString("pt-BR")}
                  </span>
                </div>

                {/* Team */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((member, index) => (
                        <Avatar key={index} className="h-6 w-6 border-2 border-white">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{member.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-600">+{project.team.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{project.budget}</div>
                    <div className="text-xs text-gray-500">{project.client}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" className="flex-1">
                    Ver Detalhes
                  </Button>
                  <Button size="sm" variant="outline">
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Archive className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FolderPlus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum projeto encontrado</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Tente ajustar os filtros de busca"
                  : "Comece criando seu primeiro projeto"}
              </p>
              <Button>
                <FolderPlus className="h-4 w-4 mr-2" />
                Criar Novo Projeto
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
