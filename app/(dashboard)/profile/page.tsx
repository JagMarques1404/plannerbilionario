"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Trophy, Target, Settings, Edit, Save, X } from "lucide-react"
import { useApp } from "@/contexts/app-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const patrimonioHistorico = [
  { mes: "Jan", valor: 15000 },
  { mes: "Fev", valor: 16500 },
  { mes: "Mar", valor: 18000 },
  { mes: "Abr", valor: 19200 },
  { mes: "Mai", valor: 20800 },
  { mes: "Jun", valor: 22000 },
  { mes: "Jul", valor: 23500 },
  { mes: "Ago", valor: 25000 },
]

export default function ProfilePage() {
  const { user, updatePatrimonio } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    patrimonio: user?.patrimonio || 0,
    meta12meses: user?.meta12meses || 0,
  })

  if (!user) return null

  const handleSave = () => {
    updatePatrimonio(editData.patrimonio)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      patrimonio: user.patrimonio,
      meta12meses: user.meta12meses,
    })
    setIsEditing(false)
  }

  const progressoMeta = (user.patrimonio / user.meta12meses) * 100
  const crescimentoTotal = ((user.patrimonio - 15000) / 15000) * 100 // Assumindo valor inicial de R$ 15k

  const badges = [
    { nome: "Bem-vindo", descricao: "Primeiro login na plataforma", icon: "🎉" },
    { nome: "Streak 7 dias", descricao: "Acessou por 7 dias consecutivos", icon: "🔥" },
    { nome: "Investidor Iniciante", descricao: "Completou primeira missão de investimento", icon: "💰" },
    { nome: "Disciplinado", descricao: "Registrou gastos por 30 dias", icon: "📊" },
    { nome: "Construtor", descricao: "Alcançou o grupo Construtor", icon: "🏗️" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a237e]">Meu Perfil</h1>
          <p className="text-gray-600 mt-1">Acompanhe seu progresso e gerencie suas informações</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-16 bg-[#1a237e] rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="progress">Progresso</TabsTrigger>
          <TabsTrigger value="badges">Conquistas</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a237e] flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informações Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Nome</Label>
                  <p className="text-lg font-semibold text-[#1a237e]">{user.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">E-mail</Label>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Grupo Atual</Label>
                  <Badge className="bg-[#ff5722] text-white text-lg px-3 py-1">{user.grupo}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Membro desde</Label>
                  <p className="text-lg">Janeiro 2024</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a237e] flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Situação Financeira
                  {!isEditing && (
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="ml-auto">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="patrimonio">Patrimônio Atual</Label>
                      <Input
                        id="patrimonio"
                        type="number"
                        value={editData.patrimonio}
                        onChange={(e) => setEditData((prev) => ({ ...prev, patrimonio: Number(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="meta">Meta 12 meses</Label>
                      <Input
                        id="meta"
                        type="number"
                        value={editData.meta12meses}
                        onChange={(e) => setEditData((prev) => ({ ...prev, meta12meses: Number(e.target.value) }))}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        <Save className="h-4 w-4 mr-2" />
                        Salvar
                      </Button>
                      <Button onClick={handleCancel} variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Patrimônio Atual</Label>
                      <p className="text-2xl font-bold text-green-600">R$ {user.patrimonio.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Meta 12 meses</Label>
                      <p className="text-2xl font-bold text-[#ff5722]">R$ {user.meta12meses.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Progresso da Meta</Label>
                      <Progress value={progressoMeta} className="mt-2" />
                      <p className="text-sm text-gray-600 mt-1">{progressoMeta.toFixed(1)}% da meta alcançada</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Principal Dificuldade</Label>
                      <p className="text-lg capitalize">{user.dificuldadePrincipal.replace("-", " ")}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-[#ff5722]">{user.xp.toLocaleString()}</div>
                <p className="text-sm text-gray-600">Total XP</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">{user.nivel}</div>
                <p className="text-sm text-gray-600">Nível Atual</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-500">{user.streak}</div>
                <p className="text-sm text-gray-600">Streak (dias)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600">#{user.posicaoRanking}</div>
                <p className="text-sm text-gray-600">Posição Ranking</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1a237e]">Evolução Patrimonial</CardTitle>
              <CardDescription>Histórico dos últimos 8 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={patrimonioHistorico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString()}`, "Patrimônio"]} />
                  <Line
                    type="monotone"
                    dataKey="valor"
                    stroke="#ff5722"
                    strokeWidth={3}
                    dot={{ fill: "#ff5722", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a237e]">Crescimento Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">+{crescimentoTotal.toFixed(1)}%</div>
                  <p className="text-gray-600">Desde o início da jornada</p>
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      🎉 Parabéns! Você já cresceu mais que 78% dos usuários da plataforma!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a237e]">Próximo Objetivo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Alcançar R$ 30.000</p>
                    <Progress value={83} className="mt-2" />
                    <p className="text-sm text-gray-600 mt-1">Faltam R$ 5.000</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      💡 Com seu ritmo atual, você deve alcançar essa meta em 2-3 meses!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1a237e] flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Suas Conquistas
              </CardTitle>
              <CardDescription>Badges desbloqueadas ao longo da sua jornada</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {badges.map((badge, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 text-center">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <h3 className="font-bold text-[#1a237e] mb-1">{badge.nome}</h3>
                      <p className="text-sm text-gray-600">{badge.descricao}</p>
                      <Badge className="mt-2 bg-green-100 text-green-800">Desbloqueado</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#1a237e]">Próximas Conquistas</CardTitle>
              <CardDescription>Badges que você pode desbloquear em breve</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center opacity-60">
                  <div className="text-4xl mb-2">🎯</div>
                  <h3 className="font-bold text-gray-600 mb-1">Meta Alcançada</h3>
                  <p className="text-sm text-gray-500">Alcance sua meta de 12 meses</p>
                  <Progress value={83} className="mt-2" />
                </div>
                <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center opacity-60">
                  <div className="text-4xl mb-2">👑</div>
                  <h3 className="font-bold text-gray-600 mb-1">Acelerador</h3>
                  <p className="text-sm text-gray-500">Alcance o grupo Acelerador</p>
                  <Progress value={50} className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#1a237e] flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Configurações da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Notificações</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Missões diárias</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Atualizações do ranking</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Novos badges desbloqueados</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">Privacidade</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Mostrar meu nome no ranking</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Permitir que outros vejam meu progresso</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="destructive">Excluir Conta</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
