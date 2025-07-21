"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Filter, Search, TrendingUp, Users, Star, Target, Award, Flame, RotateCcw } from "lucide-react"

interface FilterState {
  search: string
  grupo: string
  patrimonioMin: number
  patrimonioMax: number
  crescimentoMin: number
  xpMin: number
  sortBy: string
  sortOrder: "asc" | "desc"
  showOnlyFriends: boolean
  showOnlyActive: boolean
  timeframe: string
  minStreak: number
  minAchievements: number
}

interface AdvancedRankingFiltersProps {
  onFiltersChange: (filters: FilterState) => void
  totalUsers: number
  filteredUsers: number
}

export function AdvancedRankingFilters({ onFiltersChange, totalUsers, filteredUsers }: AdvancedRankingFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    grupo: "todos",
    patrimonioMin: 0,
    patrimonioMax: 1000000,
    crescimentoMin: 0,
    xpMin: 0,
    sortBy: "posicao",
    sortOrder: "asc",
    showOnlyFriends: false,
    showOnlyActive: true,
    timeframe: "monthly",
    minStreak: 0,
    minAchievements: 0,
  })

  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)

    // Contar filtros ativos
    let count = 0
    if (updatedFilters.search) count++
    if (updatedFilters.grupo !== "todos") count++
    if (updatedFilters.patrimonioMin > 0) count++
    if (updatedFilters.patrimonioMax < 1000000) count++
    if (updatedFilters.crescimentoMin > 0) count++
    if (updatedFilters.xpMin > 0) count++
    if (updatedFilters.showOnlyFriends) count++
    if (!updatedFilters.showOnlyActive) count++
    if (updatedFilters.minStreak > 0) count++
    if (updatedFilters.minAchievements > 0) count++

    setActiveFiltersCount(count)
  }

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      grupo: "todos",
      patrimonioMin: 0,
      patrimonioMax: 1000000,
      crescimentoMin: 0,
      xpMin: 0,
      sortBy: "posicao",
      sortOrder: "asc",
      showOnlyFriends: false,
      showOnlyActive: true,
      timeframe: "monthly",
      minStreak: 0,
      minAchievements: 0,
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
    setActiveFiltersCount(0)
  }

  const grupos = [
    { value: "todos", label: "Todos os Grupos" },
    { value: "Bronze", label: "Bronze" },
    { value: "Prata", label: "Prata" },
    { value: "Ouro", label: "Ouro" },
    { value: "Platina", label: "Platina" },
    { value: "Diamante", label: "Diamante" },
    { value: "Titã", label: "Titã" },
  ]

  const sortOptions = [
    { value: "posicao", label: "Posição no Ranking" },
    { value: "patrimonio", label: "Patrimônio" },
    { value: "crescimento", label: "Crescimento %" },
    { value: "xp", label: "Experiência (XP)" },
    { value: "nome", label: "Nome (A-Z)" },
    { value: "streak", label: "Sequência de Dias" },
    { value: "achievements", label: "Conquistas" },
  ]

  const timeframes = [
    { value: "daily", label: "Hoje" },
    { value: "weekly", label: "Esta Semana" },
    { value: "monthly", label: "Este Mês" },
    { value: "quarterly", label: "Trimestre" },
    { value: "yearly", label: "Ano" },
    { value: "alltime", label: "Todos os Tempos" },
  ]

  return (
    <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Filtros Avançados
          </CardTitle>
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Badge className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-medium">
                {activeFiltersCount} filtro{activeFiltersCount !== 1 ? "s" : ""} ativo
                {activeFiltersCount !== 1 ? "s" : ""}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              {isExpanded ? "Ocultar" : "Expandir"}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Filtros Básicos - Sempre Visíveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Busca */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium text-gray-700">
              Buscar Usuário
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="search"
                placeholder="Nome do usuário..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="pl-10 text-base focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              />
            </div>
          </div>

          {/* Grupo */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Grupo</Label>
            <Select value={filters.grupo} onValueChange={(value) => updateFilters({ grupo: value })}>
              <SelectTrigger className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                <SelectValue placeholder="Selecionar grupo" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg rounded-xl border border-gray-100">
                {grupos.map((grupo) => (
                  <SelectItem key={grupo.value} value={grupo.value}>
                    {grupo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ordenação */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Ordenar Por</Label>
            <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
              <SelectTrigger className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg rounded-xl border border-gray-100">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Período */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Período</Label>
            <Select value={filters.timeframe} onValueChange={(value) => updateFilters({ timeframe: value })}>
              <SelectTrigger className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                <SelectValue placeholder="Selecionar período" />
              </SelectTrigger>
              <SelectContent className="bg-white shadow-lg rounded-xl border border-gray-100">
                {timeframes.map((timeframe) => (
                  <SelectItem key={timeframe.value} value={timeframe.value}>
                    {timeframe.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtros Avançados - Expansíveis */}
        {isExpanded && (
          <div className="space-y-6 pt-4 border-t border-gray-200">
            {/* Faixas de Valores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Patrimônio */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Faixa de Patrimônio
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>R$ {filters.patrimonioMin.toLocaleString()}</span>
                    <span>-</span>
                    <span>R$ {filters.patrimonioMax.toLocaleString()}</span>
                  </div>
                  <Slider
                    value={[filters.patrimonioMin, filters.patrimonioMax]}
                    onValueChange={([min, max]) => updateFilters({ patrimonioMin: min, patrimonioMax: max })}
                    max={1000000}
                    step={10000}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Crescimento */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-600" />
                  Crescimento Mínimo (%)
                </Label>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Mínimo: {filters.crescimentoMin}%</div>
                  <Slider
                    value={[filters.crescimentoMin]}
                    onValueChange={([value]) => updateFilters({ crescimentoMin: value })}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* XP Mínimo */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Award className="h-4 w-4 text-purple-600" />
                  XP Mínimo
                </Label>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Mínimo: {filters.xpMin.toLocaleString()} XP</div>
                  <Slider
                    value={[filters.xpMin]}
                    onValueChange={([value]) => updateFilters({ xpMin: value })}
                    max={50000}
                    step={500}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Streak Mínimo */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-600" />
                  Sequência Mínima (dias)
                </Label>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Mínimo: {filters.minStreak} dias</div>
                  <Slider
                    value={[filters.minStreak]}
                    onValueChange={([value]) => updateFilters({ minStreak: value })}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Switches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <Label className="text-base font-medium text-gray-800">Apenas Amigos</Label>
                    <p className="text-sm text-gray-600">Mostrar apenas usuários que você segue</p>
                  </div>
                </div>
                <Switch
                  checked={filters.showOnlyFriends}
                  onCheckedChange={(checked) => updateFilters({ showOnlyFriends: checked })}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-green-600" />
                  <div>
                    <Label className="text-base font-medium text-gray-800">Apenas Ativos</Label>
                    <p className="text-sm text-gray-600">Usuários ativos nos últimos 7 dias</p>
                  </div>
                </div>
                <Switch
                  checked={filters.showOnlyActive}
                  onCheckedChange={(checked) => updateFilters({ showOnlyActive: checked })}
                />
              </div>
            </div>

            {/* Ordem */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Label className="text-base font-medium text-gray-800">Ordem:</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant={filters.sortOrder === "asc" ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilters({ sortOrder: "asc" })}
                  className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Crescente
                </Button>
                <Button
                  variant={filters.sortOrder === "desc" ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateFilters({ sortOrder: "desc" })}
                  className="focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  Decrescente
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Resultados e Ações */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="text-base text-gray-800">
              <span className="font-semibold">{filteredUsers.toLocaleString()}</span> de{" "}
              <span className="font-semibold">{totalUsers.toLocaleString()}</span> usuários
            </div>
            {filteredUsers !== totalUsers && (
              <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                {Math.round((filteredUsers / totalUsers) * 100)}% dos usuários
              </Badge>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 bg-transparent"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
