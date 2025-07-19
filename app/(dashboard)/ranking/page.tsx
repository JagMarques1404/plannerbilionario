"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react"
import { useApp } from "@/contexts/app-context"

const gruposData = {
  Iniciante: { icon: "🥉", cor: "bg-amber-100 text-amber-800", usuarios: 2847 },
  Construtor: { icon: "🥈", cor: "bg-gray-100 text-gray-800", usuarios: 1923 },
  Acelerador: { icon: "🥇", cor: "bg-yellow-100 text-yellow-800", usuarios: 856 },
  Investidor: { icon: "💎", cor: "bg-blue-100 text-blue-800", usuarios: 234 },
  Magnata: { icon: "👑", cor: "bg-purple-100 text-purple-800", usuarios: 45 },
  Titã: { icon: "🏆", cor: "bg-red-100 text-red-800", usuarios: 8 },
}

export default function RankingPage() {
  const { ranking, user } = useApp()
  const [selectedGroup, setSelectedGroup] = useState(user?.grupo || "Construtor")

  const rankingFiltrado = ranking.filter((u) => u.grupo === selectedGroup)
  const meuRanking = ranking.find((u) => u.id === user?.id)

  const getPosicaoIcon = (posicao: number) => {
    switch (posicao) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-gray-500 font-bold">#{posicao}</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a237e]">Ranking</h1>
          <p className="text-gray-600 mt-1">Veja sua posição e compete com outros membros</p>
        </div>
        {meuRanking && (
          <Card className="bg-gradient-to-r from-[#1a237e] to-[#3949ab] text-white">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold">#{meuRanking.posicao}</div>
                <p className="text-sm opacity-90">Sua posição</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Estatísticas dos Grupos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(gruposData).map(([grupo, data]) => (
          <Card
            key={grupo}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedGroup === grupo ? "ring-2 ring-[#ff5722]" : ""
            }`}
            onClick={() => setSelectedGroup(grupo)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">{data.icon}</div>
              <h3 className="font-bold text-sm text-[#1a237e]">{grupo}</h3>
              <p className="text-xs text-gray-600">{data.usuarios} membros</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ranking do Grupo Selecionado */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#1a237e] flex items-center">
                {gruposData[selectedGroup as keyof typeof gruposData]?.icon}
                <span className="ml-2">Ranking - Grupo {selectedGroup}</span>
              </CardTitle>
              <CardDescription>Baseado no crescimento percentual do patrimônio</CardDescription>
            </div>
            <Badge className={gruposData[selectedGroup as keyof typeof gruposData]?.cor}>
              {gruposData[selectedGroup as keyof typeof gruposData]?.usuarios} membros
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rankingFiltrado.map((usuario, index) => (
              <div
                key={usuario.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${
                  usuario.id === user?.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10 h-10">{getPosicaoIcon(usuario.posicao)}</div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#1a237e] rounded-full flex items-center justify-center text-white font-bold">
                      {usuario.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1a237e]">
                        {usuario.name}
                        {usuario.id === user?.id && <Badge className="ml-2 bg-blue-100 text-blue-800">Você</Badge>}
                      </h4>
                      <p className="text-sm text-gray-600">R$ {usuario.patrimonio.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="text-lg font-bold text-green-600">+{usuario.crescimento.toFixed(1)}%</div>
                      <p className="text-xs text-gray-500">Crescimento</p>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#ff5722]">{usuario.xp.toLocaleString()}</div>
                      <p className="text-xs text-gray-500">XP</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Geral */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1a237e] flex items-center">
            <Crown className="h-5 w-5 mr-2" />
            Hall da Fama - Top 3 Geral
          </CardTitle>
          <CardDescription>Os maiores crescimentos percentuais de todos os grupos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { nome: "Maria Santos", grupo: "Iniciante", crescimento: 45.2, xp: 3200, patrimonio: 8500 },
              { nome: "João Silva", grupo: "Construtor", crescimento: 38.7, xp: 2800, patrimonio: 35000 },
              { nome: "Ana Costa", grupo: "Acelerador", crescimento: 32.1, xp: 2500, patrimonio: 180000 },
            ].map((usuario, index) => (
              <Card
                key={index}
                className={`text-center ${
                  index === 0
                    ? "bg-gradient-to-b from-yellow-50 to-yellow-100 border-yellow-300"
                    : index === 1
                      ? "bg-gradient-to-b from-gray-50 to-gray-100 border-gray-300"
                      : "bg-gradient-to-b from-amber-50 to-amber-100 border-amber-300"
                }`}
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-2">{index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}</div>
                  <h3 className="font-bold text-[#1a237e] mb-1">{usuario.nome}</h3>
                  <Badge className="mb-3">Grupo {usuario.grupo}</Badge>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">+{usuario.crescimento}%</div>
                    <div className="text-sm text-gray-600">{usuario.xp.toLocaleString()} XP</div>
                    <div className="text-xs text-gray-500">R$ {usuario.patrimonio.toLocaleString()}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dicas para Subir no Ranking */}
      <Card className="bg-gradient-to-r from-[#ff5722] to-[#ff9800] text-white">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Dicas para Subir no Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">💡 Complete missões diariamente</h4>
              <p className="text-sm opacity-90">Missões dão XP e ajudam você a manter disciplina financeira</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📈 Foque no crescimento percentual</h4>
              <p className="text-sm opacity-90">O ranking é baseado em %, não no valor absoluto do patrimônio</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🔥 Mantenha seu streak</h4>
              <p className="text-sm opacity-90">Streaks longos dão bônus de XP e mostram consistência</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">👥 Participe da comunidade</h4>
              <p className="text-sm opacity-90">Interaja com outros membros e compartilhe suas conquistas</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
