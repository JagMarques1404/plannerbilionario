"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Crown,
  ArrowLeft,
  Lock,
  Key,
  Database,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [autoBackup, setAutoBackup] = useState(true)
  const [encryptionEnabled, setEncryptionEnabled] = useState(true)

  const securityScore = 85

  const securityFeatures = [
    {
      title: "Autenticação de Dois Fatores",
      description: "Proteção adicional para sua conta",
      enabled: twoFactorEnabled,
      toggle: setTwoFactorEnabled,
      icon: Key,
    },
    {
      title: "Backup Automático",
      description: "Backup diário dos seus dados",
      enabled: autoBackup,
      toggle: setAutoBackup,
      icon: Database,
    },
    {
      title: "Criptografia Avançada",
      description: "Dados protegidos com AES-256",
      enabled: encryptionEnabled,
      toggle: setEncryptionEnabled,
      icon: Lock,
    },
  ]

  const recentActivity = [
    {
      action: "Login bem-sucedido",
      location: "São Paulo, Brasil",
      time: "2 horas atrás",
      status: "success",
    },
    {
      action: "Backup realizado",
      location: "Servidor automático",
      time: "6 horas atrás",
      status: "success",
    },
    {
      action: "Tentativa de login falhada",
      location: "IP desconhecido",
      time: "1 dia atrás",
      status: "warning",
    },
  ]

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
                  <Shield className="h-6 w-6" />
                  <span>Segurança Avançada</span>
                </h1>
                <p className="text-gray-600">Proteção e monitoramento de segurança</p>
              </div>
            </div>
            <Badge className="bg-purple-600">
              <Crown className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Premium Notice */}
        <Card className="mb-8 border-purple-200 bg-purple-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-purple-800">Recurso Premium Ativo</span>
            </div>
            <p className="text-purple-700">
              Proteção avançada com criptografia, backup automático e monitoramento em tempo real.
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Security Score */}
            <Card>
              <CardHeader>
                <CardTitle>Pontuação de Segurança</CardTitle>
                <CardDescription>Avaliação geral da segurança da sua conta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl font-bold text-green-600">{securityScore}%</div>
                  <div className="flex-1">
                    <Progress value={securityScore} className="mb-2" />
                    <p className="text-sm text-gray-600">Excelente nível de segurança</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">Autenticação</div>
                    <div className="text-xs text-gray-500">Ativa</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <Lock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">Criptografia</div>
                    <div className="text-xs text-gray-500">AES-256</div>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <Database className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-medium">Backup</div>
                    <div className="text-xs text-gray-500">Diário</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card>
              <CardHeader>
                <CardTitle>Recursos de Segurança</CardTitle>
                <CardDescription>Configure suas preferências de segurança</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <feature.icon className="h-6 w-6 text-gray-600" />
                      <div>
                        <div className="font-medium">{feature.title}</div>
                        <div className="text-sm text-gray-500">{feature.description}</div>
                      </div>
                    </div>
                    <Switch checked={feature.enabled} onCheckedChange={feature.toggle} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Security Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Atividade de Segurança</CardTitle>
                <CardDescription>Monitoramento de ações recentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          activity.status === "success" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-gray-500">{activity.location}</div>
                      </div>
                      <div className="text-sm text-gray-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Backup Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Status do Backup</span>
                </CardTitle>
                <CardDescription>Último backup e próximo agendado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Último backup</span>
                  <span className="text-sm font-medium">Hoje, 03:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Próximo backup</span>
                  <span className="text-sm font-medium">Amanhã, 03:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tamanho dos dados</span>
                  <span className="text-sm font-medium">2.4 GB</span>
                </div>
                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Backup
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Backup Manual
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Alertas de Segurança</span>
                </CardTitle>
                <CardDescription>Notificações importantes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Sistema Seguro</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">Nenhuma ameaça detectada</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Proteção Ativa</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">Monitoramento 24/7 ativo</p>
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
                  <Key className="h-4 w-4 mr-2" />
                  Alterar Senha
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  Configurar 2FA
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Dados
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
