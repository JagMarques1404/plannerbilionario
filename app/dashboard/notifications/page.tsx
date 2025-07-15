"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  ArrowLeft,
  Check,
  X,
  Mail,
  MessageSquare,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Settings,
  Trash2,
} from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [projectUpdates, setProjectUpdates] = useState(true)
  const [teamActivity, setTeamActivity] = useState(false)

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Projeto concluído",
      message: "O projeto 'Website Redesign' foi marcado como concluído",
      time: "2 horas atrás",
      read: false,
      avatar: "/placeholder.svg?height=40&width=40",
      user: "João Silva",
    },
    {
      id: 2,
      type: "info",
      title: "Nova mensagem",
      message: "Você recebeu uma nova mensagem de Maria Santos",
      time: "4 horas atrás",
      read: false,
      avatar: "/placeholder.svg?height=40&width=40",
      user: "Maria Santos",
    },
    {
      id: 3,
      type: "warning",
      title: "Prazo próximo",
      message: "O projeto 'App Mobile' tem prazo em 3 dias",
      time: "6 horas atrás",
      read: true,
      avatar: null,
      user: "Sistema",
    },
    {
      id: 4,
      type: "info",
      title: "Backup realizado",
      message: "Backup automático dos seus dados foi concluído com sucesso",
      time: "1 dia atrás",
      read: true,
      avatar: null,
      user: "Sistema",
    },
    {
      id: 5,
      type: "error",
      title: "Falha na sincronização",
      message: "Erro ao sincronizar dados com o servidor. Tentando novamente...",
      time: "2 dias atrás",
      read: true,
      avatar: null,
      user: "Sistema",
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <X className="h-5 w-5 text-red-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

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
                  <Bell className="h-6 w-6" />
                  <span>Notificações</span>
                  {unreadCount > 0 && <Badge className="bg-red-600 text-white">{unreadCount}</Badge>}
                </h1>
                <p className="text-gray-600">Gerencie suas notificações e preferências</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Check className="h-4 w-4 mr-2" />
                Marcar todas como lidas
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Notifications List */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notificações Recentes</CardTitle>
                <CardDescription>Suas últimas atualizações e alertas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors ${
                      !notification.read ? "bg-blue-50 border-blue-200" : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {notification.avatar ? (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={notification.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{notification.user[0]}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{notification.user}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-6">
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
                <CardDescription>Personalize suas preferências de notificação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Notificações por Email</div>
                    <div className="text-xs text-gray-500">Receber notificações no seu email</div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Notificações Push</div>
                    <div className="text-xs text-gray-500">Notificações no navegador</div>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Atualizações de Projeto</div>
                    <div className="text-xs text-gray-500">Mudanças nos seus projetos</div>
                  </div>
                  <Switch checked={projectUpdates} onCheckedChange={setProjectUpdates} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Atividade da Equipe</div>
                    <div className="text-xs text-gray-500">Ações dos membros da equipe</div>
                  </div>
                  <Switch checked={teamActivity} onCheckedChange={setTeamActivity} />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Não lidas</span>
                  <Badge variant="destructive">{unreadCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total hoje</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Esta semana</span>
                  <Badge variant="outline">12</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Configurar Email
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Centro de Mensagens
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Testar Notificação
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
