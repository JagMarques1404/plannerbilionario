"use client"

import type * as React from "react"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Crown,
  Home,
  MessageCircle,
  Settings,
  TrendingUp,
  Trophy,
  Users,
  Target,
  Briefcase,
  Eye,
  ChevronRight,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

// Dados da sidebar com nova estrutura
const data = {
  user: {
    name: "Cristiano",
    email: "cristiano@julius.com",
    avatar: "/placeholder.svg?height=32&width=32",
    level: 42,
    xp: 8750,
    streak: 7,
  },
  teams: [
    {
      name: "Julius Invest",
      logo: Home,
      plan: "Educação Financeira",
    },
    {
      name: "Desafio Bilionário",
      logo: Crown,
      plan: "Gamificação",
    },
    {
      name: "Transparência Total",
      logo: Eye,
      plan: "100% Aberto",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      badge: "Início",
      items: [
        {
          title: "Visão Geral",
          url: "/dashboard",
        },
        {
          title: "Métricas",
          url: "/dashboard/metrics",
        },
        {
          title: "Relatórios",
          url: "/dashboard/reports",
        },
      ],
    },
    {
      title: "Julius Mentor",
      url: "/dashboard/julius",
      icon: MessageCircle,
      badge: "IA",
      items: [
        {
          title: "Chat com Julius",
          url: "/dashboard/julius",
        },
        {
          title: "Dicas Diárias",
          url: "/dashboard/julius/tips",
        },
        {
          title: "Biblioteca",
          url: "/dashboard/julius/library",
        },
      ],
    },
    {
      title: "Gamificação",
      url: "/dashboard/gamificacao",
      icon: Trophy,
      badge: "Novo",
      items: [
        {
          title: "Conquistas",
          url: "/dashboard/gamificacao",
        },
        {
          title: "Ranking",
          url: "/dashboard/ranking",
        },
        {
          title: "Missões",
          url: "/dashboard/missions",
        },
      ],
    },
    {
      title: "Investimentos",
      url: "/dashboard/investimentos",
      icon: TrendingUp,
      items: [
        {
          title: "Portfolio",
          url: "/dashboard/investimentos/portfolio",
        },
        {
          title: "Simulador",
          url: "/dashboard/simuladores",
        },
        {
          title: "Análises",
          url: "/dashboard/investimentos/analysis",
        },
      ],
    },
    {
      title: "Marketplace",
      url: "/dashboard/marketplace",
      icon: Briefcase,
      badge: "Premium",
      items: [
        {
          title: "Produtos",
          url: "/dashboard/marketplace",
        },
        {
          title: "Loja Premium",
          url: "/dashboard/loja-premium",
        },
        {
          title: "Histórico",
          url: "/dashboard/marketplace/history",
        },
      ],
    },
    {
      title: "Comunidade",
      url: "/dashboard/comunidade",
      icon: Users,
      items: [
        {
          title: "Feed Social",
          url: "/dashboard/feed-social",
        },
        {
          title: "Grupos",
          url: "/dashboard/groups",
        },
        {
          title: "Social Trading",
          url: "/dashboard/social-trading",
        },
      ],
    },
    {
      title: "Transparência",
      url: "/dashboard/transparencia",
      icon: Eye,
      items: [
        {
          title: "Roadmap Público",
          url: "/dashboard/transparencia",
        },
        {
          title: "Métricas Tempo Real",
          url: "/dashboard/transparencia/metrics",
        },
        {
          title: "Votação Comunidade",
          url: "/dashboard/transparencia/voting",
        },
      ],
    },
  ],
  quickActions: [
    {
      name: "Análise de Projeto",
      url: "/dashboard/analise-projeto",
      icon: BarChart3,
      description: "Veja o progresso do desenvolvimento",
    },
    {
      name: "Checklist Integração",
      url: "/dashboard/checklist-integracao",
      icon: Target,
      description: "Acompanhe as integrações",
    },
    {
      name: "Pendências Técnicas",
      url: "/dashboard/pendencias-tecnicas",
      icon: Settings,
      description: "Itens técnicos pendentes",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="bg-gray-100 border-r border-gray-200" {...props}>
      <SidebarHeader className="border-b border-gray-200 bg-white">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent className="bg-gray-100">
        <NavMain items={data.navMain} />

        {/* Seção de Ações Rápidas */}
        <div className="px-3 py-2">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ações Rápidas</h4>
          <SidebarMenu>
            {data.quickActions.map((action) => (
              <SidebarMenuItem key={action.name}>
                <SidebarMenuButton
                  asChild
                  className={`
                    julius-sidebar-hover
                    ${pathname === action.url ? "julius-sidebar-active" : ""}
                  `}
                >
                  <a href={action.url} className="flex items-center gap-3">
                    <action.icon className="h-4 w-4" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">{action.name}</div>
                      <div className="text-xs text-gray-500 truncate">{action.description}</div>
                    </div>
                    <ChevronRight className="h-3 w-3 text-gray-400" aria-hidden="true" />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 bg-white">
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
