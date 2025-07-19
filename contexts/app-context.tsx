"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  name: string
  email: string
  patrimonio: number
  meta12meses: number
  dificuldadePrincipal: string
  xp: number
  nivel: number
  streak: number
  grupo: string
  posicaoRanking: number
  badges: string[]
  missoesConcluidas: string[]
  ultimoLogin: string
}

export interface Mission {
  id: string
  titulo: string
  descricao: string
  categoria: "diaria" | "semanal" | "mensal"
  xp: number
  progresso: number
  meta: number
  concluida: boolean
  prazo?: string
}

export interface RankingUser {
  id: string
  name: string
  xp: number
  patrimonio: number
  crescimento: number
  grupo: string
  posicao: number
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  missions: Mission[]
  setMissions: (missions: Mission[]) => void
  ranking: RankingUser[]
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: any) => Promise<boolean>
  logout: () => void
  completeMission: (missionId: string) => void
  updatePatrimonio: (novoPatrimonio: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Dados mockados
const mockUsers: RankingUser[] = [
  { id: "1", name: "Ana Silva", xp: 2500, patrimonio: 45000, crescimento: 15.2, grupo: "Construtor", posicao: 1 },
  { id: "2", name: "Carlos Santos", xp: 2300, patrimonio: 42000, crescimento: 12.8, grupo: "Construtor", posicao: 2 },
  { id: "3", name: "Maria Oliveira", xp: 2100, patrimonio: 38000, crescimento: 18.5, grupo: "Construtor", posicao: 3 },
  { id: "4", name: "João Pereira", xp: 1900, patrimonio: 35000, crescimento: 10.2, grupo: "Construtor", posicao: 4 },
  { id: "5", name: "Fernanda Costa", xp: 1800, patrimonio: 32000, crescimento: 22.1, grupo: "Construtor", posicao: 5 },
]

const mockMissions: Mission[] = [
  {
    id: "1",
    titulo: "Registre seus gastos por 7 dias",
    descricao: "Anote todos os seus gastos durante uma semana completa",
    categoria: "semanal",
    xp: 100,
    progresso: 3,
    meta: 7,
    concluida: false,
    prazo: "2024-01-28",
  },
  {
    id: "2",
    titulo: "Invista R$ 100 este mês",
    descricao: "Faça um investimento de pelo menos R$ 100",
    categoria: "mensal",
    xp: 300,
    progresso: 0,
    meta: 1,
    concluida: false,
    prazo: "2024-01-31",
  },
  {
    id: "3",
    titulo: "Leia um livro sobre finanças",
    descricao: "Complete a leitura de um livro de educação financeira",
    categoria: "mensal",
    xp: 200,
    progresso: 0,
    meta: 1,
    concluida: false,
  },
  {
    id: "4",
    titulo: "Check-in diário",
    descricao: "Acesse a plataforma e registre seu progresso",
    categoria: "diaria",
    xp: 50,
    progresso: 1,
    meta: 1,
    concluida: true,
  },
  {
    id: "5",
    titulo: "Indique 3 amigos",
    descricao: "Convide 3 pessoas para participar do desafio",
    categoria: "mensal",
    xp: 500,
    progresso: 1,
    meta: 3,
    concluida: false,
  },
]

const getGrupoByPatrimonio = (patrimonio: number): string => {
  if (patrimonio < 10000) return "Iniciante"
  if (patrimonio < 50000) return "Construtor"
  if (patrimonio < 200000) return "Acelerador"
  if (patrimonio < 1000000) return "Investidor"
  if (patrimonio < 10000000) return "Magnata"
  return "Titã"
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [missions, setMissions] = useState<Mission[]>(mockMissions)
  const [ranking] = useState<RankingUser[]>(mockUsers)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem("desafio-bilionario-user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de login
    if (email && password) {
      const userData: User = {
        id: "1",
        name: "João Silva",
        email,
        patrimonio: 25000,
        meta12meses: 50000,
        dificuldadePrincipal: "Controlar gastos",
        xp: 1250,
        nivel: 5,
        streak: 7,
        grupo: getGrupoByPatrimonio(25000),
        posicaoRanking: 15,
        badges: ["Primeiro Login", "Streak 7 dias", "Investidor Iniciante"],
        missoesConcluidas: ["4"],
        ultimoLogin: new Date().toISOString(),
      }
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem("desafio-bilionario-user", JSON.stringify(userData))
      return true
    }
    return false
  }

  const register = async (userData: any): Promise<boolean> => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      patrimonio: userData.patrimonio,
      meta12meses: userData.meta12meses,
      dificuldadePrincipal: userData.dificuldadePrincipal,
      xp: 0,
      nivel: 1,
      streak: 0,
      grupo: getGrupoByPatrimonio(userData.patrimonio),
      posicaoRanking: 999,
      badges: ["Bem-vindo"],
      missoesConcluidas: [],
      ultimoLogin: new Date().toISOString(),
    }
    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("desafio-bilionario-user", JSON.stringify(newUser))
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("desafio-bilionario-user")
  }

  const completeMission = (missionId: string) => {
    setMissions((prev) =>
      prev.map((mission) =>
        mission.id === missionId ? { ...mission, concluida: true, progresso: mission.meta } : mission,
      ),
    )

    if (user) {
      const mission = missions.find((m) => m.id === missionId)
      if (mission) {
        const updatedUser = {
          ...user,
          xp: user.xp + mission.xp,
          missoesConcluidas: [...user.missoesConcluidas, missionId],
        }
        setUser(updatedUser)
        localStorage.setItem("desafio-bilionario-user", JSON.stringify(updatedUser))
      }
    }
  }

  const updatePatrimonio = (novoPatrimonio: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        patrimonio: novoPatrimonio,
        grupo: getGrupoByPatrimonio(novoPatrimonio),
      }
      setUser(updatedUser)
      localStorage.setItem("desafio-bilionario-user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        missions,
        setMissions,
        ranking,
        isAuthenticated,
        login,
        register,
        logout,
        completeMission,
        updatePatrimonio,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
