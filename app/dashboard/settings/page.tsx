"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Settings,
  ArrowLeft,
  User,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Download,
  Trash2,
  Camera,
  Save,
  Crown,
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "João Silva",
    email: "joao@empresa.com",
    phone: "+55 11 99999-9999",
    company: "Minha Empresa",
    position: "Desenvolvedor",
    bio: "Desenvolvedor full-stack com 5 anos de experiência",
  })

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "pt-BR",
    timezone: "America/Sao_Paulo",
    emailDigest: true,
    marketingEmails: false,
  })

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceUpdate = (field: string, value: boolean | string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
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
                  <Settings className="h-6 w-6" />
                  <span>Configurações</span>
                </h1>
                <p className="text-gray-600">Gerencie sua conta e preferências</p>
              </div>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <nav className="space-y-2">
                  <a
                    href="#profile"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-700"
                  >
                    <User className="h-4 w-4" />
                    <span>Perfil</span>
                  </a>
                  <a href="#preferences" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                    <Palette className="h-4 w-4" />
                    <span>Preferências</span>
                  </a>
                  <a
                    href="#notifications"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50"
                  >
                    <Bell className="h-4 w-4" />
                    <span>Notificações</span>
                  </a>
                  <a href="#security" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                    <Shield className="h-4 w-4" />
                    <span>Segurança</span>
                  </a>
                  <a href="#billing" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50">
                    <CreditCard className="h-4 w-4" />
                    <span>Cobrança</span>
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Section */}
            <Card id="profile">
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
                <CardDescription>Atualize suas informações pessoais e profissionais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg">JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Alterar Foto
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG ou GIF. Máximo 2MB.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileUpdate("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileUpdate("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => handleProfileUpdate("company", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Cargo</Label>
                    <Input
                      id="position"
                      value={profile.position}
                      onChange={(e) => handleProfileUpdate("position", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biografia</Label>
                  <textarea
                    id="bio"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={profile.bio}
                    onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preferences Section */}
            <Card id="preferences">
              <CardHeader>
                <CardTitle>Preferências</CardTitle>
                <CardDescription>Personalize sua experiência na plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Modo Escuro</div>
                    <div className="text-xs text-gray-500">Ativar tema escuro da interface</div>
                  </div>
                  <Switch
                    checked={preferences.darkMode}
                    onCheckedChange={(value) => handlePreferenceUpdate("darkMode", value)}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <select
                      id="language"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={preferences.language}
                      onChange={(e) => handlePreferenceUpdate("language", e.target.value)}
                    >
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                      <option value="es-ES">Español</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Fuso Horário</Label>
                    <select
                      id="timezone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={preferences.timezone}
                      onChange={(e) => handlePreferenceUpdate("timezone", e.target.value)}
                    >
                      <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                      <option value="America/New_York">New York (GMT-5)</option>
                      <option value="Europe/London">London (GMT+0)</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Resumo por Email</div>
                    <div className="text-xs text-gray-500">Receber resumo semanal das atividades</div>
                  </div>
                  <Switch
                    checked={preferences.emailDigest}
                    onCheckedChange={(value) => handlePreferenceUpdate("emailDigest", value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm font-medium">Emails de Marketing</div>
                    <div className="text-xs text-gray-500">Receber novidades e promoções</div>
                  </div>
                  <Switch
                    checked={preferences.marketingEmails}
                    onCheckedChange={(value) => handlePreferenceUpdate("marketingEmails", value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Billing Section */}
            <Card id="billing">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Cobrança e Planos</span>
                </CardTitle>
                <CardDescription>Gerencie sua assinatura e métodos de pagamento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Plan */}
                <div className="p-4 border rounded-lg bg-blue-50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Crown className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Plano Atual: Premium (Temporário)</span>
                    </div>
                    <Badge className="bg-blue-600">Ativo</Badge>
                  </div>
                  <p className="text-sm text-blue-700 mb-4">
                    Você tem acesso completo aos recursos premium enquanto configuramos os meios de pagamento.
                  </p>
                  <div className="flex space-x-2">
                    <Link href="/pricing">
                      <Button size="sm">Ver Planos</Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      Histórico de Cobrança
                    </Button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h4 className="font-medium mb-3">Métodos de Pagamento</h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-yellow-50 border-yellow-200">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">Em Desenvolvimento</span>
                      </div>
                      <p className="text-xs text-yellow-700 mt-1">
                        Métodos de pagamento serão disponibilizados em breve
                      </p>
                    </div>
                  </div>
                </div>

                {/* Usage Stats */}
                <div>
                  <h4 className="font-medium mb-3">Uso Atual</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">4</div>
                      <div className="text-xs text-gray-500">Projetos</div>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">3</div>
                      <div className="text-xs text-gray-500">Membros da Equipe</div>
                    </div>
                    <div className="p-3 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">2.4GB</div>
                      <div className="text-xs text-gray-500">Armazenamento</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-700">Zona de Perigo</CardTitle>
                <CardDescription>Ações irreversíveis para sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                  <div>
                    <div className="font-medium text-red-700">Exportar Dados</div>
                    <div className="text-sm text-gray-600">Baixar todos os seus dados em formato JSON</div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                  <div>
                    <div className="font-medium text-red-700">Excluir Conta</div>
                    <div className="text-sm text-gray-600">Remover permanentemente sua conta e todos os dados</div>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
