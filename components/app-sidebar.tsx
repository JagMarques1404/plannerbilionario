"use client"

import { Home, Target, Trophy, Users, User, LogOut, Crown } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useApp } from "@/contexts/app-context"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
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
    title: "Grupos",
    url: "/groups",
    icon: Users,
  },
  {
    title: "Perfil",
    url: "/profile",
    icon: User,
  },
]

export function AppSidebar() {
  const { user, logout } = useApp()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Crown className="h-6 w-6 text-[#ff5722]" />
          <span className="font-bold text-[#1a237e] text-lg">DESAFIO BILIONÁRIO</span>
        </div>
        {user && (
          <div className="mt-3 p-3 bg-gradient-to-r from-[#1a237e] to-[#3949ab] rounded-lg text-white">
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs opacity-90">{user.grupo}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs">XP: {user.xp}</span>
              <span className="text-xs">Nível {user.nivel}</span>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} className="w-full">
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <Button onClick={handleLogout} variant="outline" className="w-full flex items-center space-x-2 bg-transparent">
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
