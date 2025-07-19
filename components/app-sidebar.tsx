"use client"

import type * as React from "react"
import {
  GalleryVerticalEnd,
  SquareTerminal,
  Trophy,
  Users,
  Wallet,
  Target,
  Store,
  UserCircle,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Julius Investidor",
    email: "julius@bilionario.com",
    avatar: "/placeholder.svg?height=32&width=32&text=JI",
  },
  teams: [
    {
      name: "DESAFIO BILIONÁRIO",
      logo: GalleryVerticalEnd,
      plan: "Sandbox Mode",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Missões",
      url: "/missions",
      icon: Target,
    },
    {
      title: "Ranking",
      url: "/ranking",
      icon: Trophy,
    },
    {
      title: "Marketplace",
      url: "/marketplace",
      icon: Store,
    },
    {
      title: "Social Trading",
      url: "/social-trading",
      icon: Users,
    },
    {
      title: "Integrações",
      url: "/integrations",
      icon: Zap,
    },
    {
      title: "Grupos",
      url: "/groups",
      icon: Users,
    },
    {
      title: "Perfil",
      url: "/profile",
      icon: UserCircle,
    },
  ],
  projects: [
    {
      name: "APIs Financeiras",
      url: "/integrations#apis",
      icon: BarChart3,
    },
    {
      name: "Conexões Bancárias",
      url: "/integrations#banking",
      icon: Wallet,
    },
    {
      name: "Compliance",
      url: "/integrations#compliance",
      icon: Shield,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
