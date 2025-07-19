"use client"
import {
  Home,
  Target,
  Trophy,
  Users,
  User,
  Settings,
  LogOut,
  Crown,
  Coins,
  ShoppingBag,
  Calendar,
  Zap,
} from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useApp } from "@/contexts/app-context"
import { useRouter, usePathname } from "next/navigation"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    badge: null,
  },
  {
    title: "Missões",
    url: "/missions",
    icon: Target,
    badge: "3",
  },
  {
    title: "Ranking",
    url: "/ranking",
    icon: Trophy,
    badge: null,
  },
  {
    title: "Marketplace",
    url: "/marketplace",
    icon: ShoppingBag,
    badge: "NEW",
  },
  {
    title: "Networking",
    url: "/networking",
    icon: Users,
    badge: "5",
  },
  {
    title: "Eventos",
    url: "/events",
    icon: Calendar,
    badge: null,
  },
]

const bottomMenuItems = [
  {
    title: "Perfil",
    url: "/profile",
    icon: User,
  },
  {
    title: "Configurações",
    url: "/settings",
    icon: Settings,
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

  if (!user) return null

  const nextLevelXP = (user.nivel + 1) * 1000
  const currentLevelXP = user.nivel * 1000
  const progressToNextLevel = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">DESAFIO BILIONÁRIO</span>
        </div>

        {/* User Profile Card */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-4 text-white">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="font-bold text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs opacity-90">{user.grupo}</p>
            </div>
            {user.isVip && <Badge className="bg-yellow-500 text-black text-xs px-2 py-1">VIP</Badge>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Nível {user.nivel}</span>
              <span>{user.xp.toLocaleString()} XP</span>
            </div>
            <Progress value={progressToNextLevel} className="h-1 bg-white/20" />
            <div className="text-xs opacity-75">{(nextLevelXP - user.xp).toLocaleString()} XP para próximo nível</div>
          </div>
        </div>

        {/* Billion Tokens */}
        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Coins className="h-5 w-5" />
              <span className="font-semibold">{user.billionTokens.toLocaleString()}</span>
            </div>
            <Button size="sm" variant="secondary" className="text-xs bg-white/20 hover:bg-white/30 border-0">
              <Zap className="h-3 w-3 mr-1" />
              Comprar
            </Button>
          </div>
          <div className="text-xs opacity-90 mt-1">$BILLION Tokens</div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-semibold text-xs uppercase tracking-wider mb-2">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="w-full rounded-xl hover:bg-gray-50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-purple-600 data-[active=true]:text-white"
                  >
                    <a href={item.url} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge
                          className={`text-xs ${
                            item.badge === "NEW" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-gray-500 font-semibold text-xs uppercase tracking-wider mb-2">
            Conta
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="w-full rounded-xl hover:bg-gray-50 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-purple-600 data-[active=true]:text-white"
                  >
                    <a href={item.url} className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 text-sm mb-3">Estatísticas Rápidas</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Streak</span>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-red-500">{user.streak}</span>
                <span className="text-red-500">🔥</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Ranking</span>
              <span className="font-semibold text-yellow-600">#{user.posicaoRanking}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Badges</span>
              <span className="font-semibold text-purple-600">{user.badges.length}</span>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors bg-transparent"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
