"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, Crown, TrendingUp, Target, Star } from "lucide-react"
import { useApp } from "@/contexts/app-context"

const gruposInfo = [
  {
    nome: "Iniciante",
    icon: "🥉",
    range: "R$ 0 - 10k",
    cor: "bg-amber-100 text-amber-800",
    usuarios: 2847,
    descricao: "Primeiros passos na jornada financeira",
    beneficios: ["Missões básicas", "Comunidade de apoio", "Conteúdo educativo"],
    proximoGrupo: "Construtor",
  },
  {
    nome: "Construtor",
    icon: "🥈",
    range: "R$ 10k - 50k",
    cor: "bg-gray-100 text-gray-800",
    usuarios: 1923,
    descricao: "Construindo uma base sólida",
    beneficios: ["Missões avançadas", "Calculadoras premium", "Webinars mensais"],
    proximoGrupo: "Acelerador",
  },
  {
    nome: "Acelerador",
    icon: "🥇",
    range: "R$ 50k - 200k",
    cor: "bg-yellow-100 text-yellow-800",
    usuarios: 856,
    descricao: "Acelerando o crescimento patrimonial",
    beneficios: ["Mentoria em grupo", "Análises de mercado", "Networking exclusivo"],
    proximoGrupo: "Investidor",
  },
  {
    nome: "Investidor",
    icon: "💎",
    range: "R$ 200k - 1M",
    cor: "bg-blue-100 text-blue-800",
    usuarios: 234,
    descricao: "Investidor experiente e estratégico",
    beneficios: ["Mentoria individual", "Oportunidades VIP", "Eventos exclusivos"],
    proximoGrupo: "Magnata",
  },
  {
    nome: "Magnata",
    icon: "👑",
    range: "R$ 1M - 10M",
    cor: "bg-purple-100 text-purple-800",
    usuarios: 45,
    descricao: "Elite dos investidores",
    beneficios: ["Acesso a fundos exclusivos", "Consultoria personalizada", "Rede de contatos premium"],
    proximoGrupo: "Titã",
  },
  {
    nome: "Titã",
    icon: "🏆",
    range: "R$ 10M+",
    cor: "bg-red-100 text-red-800",
    usuarios: 8,
    descricao: "O topo da pirâmide financeira",
    beneficios: ["Gestão patrimonial completa", "Oportunidades únicas", "Legado e filantropia"],
    proximoGrupo: null,
  },
]

export default function GroupsPage() {
  const { user } = useApp()

  if (!user) return null

  const grupoAtual = gruposInfo.find((g) => g.nome === user.grupo)
  const indexGrupoAtual = gruposInfo.findIndex((g) => g.nome === user.grupo)
  const proximoGrupo = indexGrupoAtual < gruposInfo.length - 1 ? gruposInfo[indexGrupoAtual + 1] : null

  const getProgressoProximoGrupo = () => {
    if (!proximoGrupo) return 100

    const ranges = {
      Construtor: { min: 10000, max: 50000 },
      Acelerador: { min: 50000, max: 200000 },
      Investidor: { min: 200000, max: 1000000 },
      Magnata: { min: 1000000, max: 10000000 },
      Titã: { min: 10000000, max: 100000000 },
    }

    const range = ranges[proximoGrupo.nome as keyof typeof ranges]
    if (!range) return 0

    return Math.min(((user.patrimonio - (range.min - 1)) / (range.min - (grupoAtual ? 0 : 0))) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a237e]">Grupos</h1>
          <p className="text-gray-600 mt-1">Descubra os grupos por patrimônio e veja como evoluir</p>
        </div>
        {grupoAtual && (
          <Card className="bg-gradient-to-r from-[#1a237e] to-[#3949ab] text-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1">{grupoAtual.icon}</div>
              <div className="font-bold">{grupoAtual.nome}</div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Progresso para o Próximo Grupo */}
      {proximoGrupo && (
        <Card className="bg-gradient-to-r from-[#ff5722] to-[#ff9800] text-white">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Próximo Objetivo: Grupo {proximoGrupo.nome}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Patrimônio atual: R$ {user.patrimonio.toLocaleString()}</span>
                <span>Meta: R$ {proximoGrupo.range.split(" - ")[0].replace("R$ ", "").replace("k", "000")}</span>
              </div>
              <Progress value={getProgressoProximoGrupo()} className="bg-white/20" />
              <p className="text-sm opacity-90">
                Faltam R${" "}
                {(
                  Number.parseInt(proximoGrupo.range.split(" - ")[0].replace("R$ ", "").replace("k", "000")) -
                  user.patrimonio
                ).toLocaleString()}{" "}
                para o próximo grupo
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Grupos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gruposInfo.map((grupo, index) => (
          <Card
            key={grupo.nome}
            className={`hover:shadow-xl transition-all duration-300 ${
              grupo.nome === user.grupo
                ? "ring-2 ring-[#ff5722] bg-orange-50"
                : index <= indexGrupoAtual
                  ? "opacity-60"
                  : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="text-4xl">{grupo.icon}</div>
                <Badge className={grupo.cor}>{grupo.usuarios.toLocaleString()} membros</Badge>
              </div>
              <CardTitle className="text-[#1a237e] flex items-center">
                {grupo.nome}
                {grupo.nome === user.grupo && <Badge className="ml-2 bg-[#ff5722] text-white">Seu Grupo</Badge>}
              </CardTitle>
              <CardDescription>
                <div className="font-medium text-lg">{grupo.range}</div>
                <div className="mt-1">{grupo.descricao}</div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-[#1a237e] mb-2">Benefícios:</h4>
                <ul className="space-y-1">
                  {grupo.beneficios.map((beneficio, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center">
                      <Star className="h-3 w-3 mr-2 text-[#ff5722]" />
                      {beneficio}
                    </li>
                  ))}
                </ul>
              </div>

              {grupo.nome === user.grupo ? (
                <Button className="w-full bg-[#ff5722] hover:bg-[#e64a19]">
                  <Crown className="h-4 w-4 mr-2" />
                  Seu Grupo Atual
                </Button>
              ) : index > indexGrupoAtual ? (
                <Button variant="outline" className="w-full bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Meta Futura
                </Button>
              ) : (
                <Button variant="secondary" className="w-full" disabled>
                  Grupo Anterior
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estatísticas dos Grupos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1a237e] flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Distribuição da Comunidade
          </CardTitle>
          <CardDescription>Veja como os membros estão distribuídos pelos grupos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gruposInfo.map((grupo) => (
              <div key={grupo.nome} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{grupo.icon}</span>
                  <div>
                    <span className="font-medium">{grupo.nome}</span>
                    <span className="text-sm text-gray-600 ml-2">{grupo.range}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#1a237e]">{grupo.usuarios.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">membros</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dicas para Evoluir */}
      <Card className="bg-gradient-to-r from-[#1a237e] to-[#3949ab] text-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Como Evoluir de Grupo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">💰 Aumente seu patrimônio</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Invista regularmente</li>
                <li>• Controle seus gastos</li>
                <li>• Busque fontes de renda extra</li>
                <li>• Reinvista os rendimentos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">🎯 Complete missões</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>• Missões dão XP e disciplina</li>
                <li>• Mantenha seu streak ativo</li>
                <li>• Participe da comunidade</li>
                <li>• Compartilhe suas conquistas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
