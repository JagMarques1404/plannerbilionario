"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Crown, ArrowLeft, Plus, Mail, Shield, Edit, Trash2, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function TeamPage() {
  const [inviteEmail, setInviteEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const user = JSON.parse(userData)
    if (user.plan !== "premium" && user.plan !== "enterprise") {
      router.push("/pricing")
      return
    }
  }, [router])

  const teamMembers = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@empresa.com",
      role: "Admin",
      status: "Ativo",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: "15 Jan 2024",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@empresa.com",
      role: "Editor",
      status: "Ativo",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: "22 Jan 2024",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@empresa.com",
      role: "Visualizador",
      status: "Pendente",
      avatar: "/placeholder.svg?height=40&width=40",
      joinedAt: "28 Jan 2024",
    },
  ]

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (inviteEmail) {
      // Simular envio de convite
      alert(`Convite enviado para ${inviteEmail}`)
      setInviteEmail("")
    }
  }

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
                <h1 className="text-2xl font-bold flex items-center space-x-2">
                  <Users className="h-6 w-6" />
                  <span>Colaboração em Equipe</span>
                </h1>
                <p className="text-gray-600">Gerencie membros e permissões da equipe</p>
              </div>
            </div>
            <Badge className="bg-green-600">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Premium Notice */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Recurso Premium Ativo</span>
            </div>
            <p className="text-green-700">
              Seu plano premium está ativo. Colabore com sua equipe, defina permissões e trabalhe em conjunto em tempo
              real.
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Team Members */}
          <div className="lg:col-span-2 space-y-6">
            {/* Team Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral da Equipe</CardTitle>
                <CardDescription>Estatísticas e informações da equipe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-gray-600">Membros Ativos</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">1</div>
                    <div className="text-sm text-gray-600">Convites Pendentes</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-600">Projetos Compartilhados</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Members List */}
            <Card>
              <CardHeader>
                <CardTitle>Membros da Equipe</CardTitle>
                <CardDescription>Gerencie membros e suas permissões</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                          <div className="text-xs text-gray-400">Entrou em {member.joinedAt}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={member.status === "Ativo" ? "default" : "secondary"}>{member.status}</Badge>
                        <Badge variant="outline">{member.role}</Badge>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Níveis de Permissão</CardTitle>
                <CardDescription>Entenda os diferentes níveis de acesso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Shield className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Admin</div>
                      <div className="text-sm text-gray-600">
                        Acesso completo: pode gerenciar equipe, projetos e configurações
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Editor</div>
                      <div className="text-sm text-gray-600">
                        Pode criar e editar projetos, mas não gerenciar equipe
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Visualizador</div>
                      <div className="text-sm text-gray-600">Apenas visualização de projetos e relatórios</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Invite Member */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5" />
                  <span>Convidar Membro</span>
                </CardTitle>
                <CardDescription>Adicione novos membros à sua equipe</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInvite} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email do convidado</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Nível de permissão</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="viewer">Visualizador</option>
                      <option value="editor">Editor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <Button type="submit" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Convite
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Team Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade da Equipe</CardTitle>
                <CardDescription>Últimas ações dos membros</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">João editou "Projeto Website"</p>
                    <p className="text-xs text-gray-500">2 horas atrás</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Maria criou novo relatório</p>
                    <p className="text-xs text-gray-500">4 horas atrás</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Pedro aceitou convite</p>
                    <p className="text-xs text-gray-500">1 dia atrás</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Projeto em Equipe
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Ver Todos os Membros
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  Configurar Permissões
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
