"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Trophy, Users, ShoppingBag, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Ranking",
    href: "/dashboard/ranking",
    icon: Trophy,
  },
  {
    name: "Social",
    href: "/dashboard/social-trading",
    icon: Users,
  },
  {
    name: "Marketplace",
    href: "/dashboard/marketplace",
    icon: ShoppingBag,
  },
  {
    name: "Perfil",
    href: "/dashboard/profile",
    icon: User,
  },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 text-xs transition-colors",
                isActive ? "text-orange-600 bg-orange-50" : "text-gray-600 hover:text-orange-600",
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-orange-600")} />
              <span className={cn("font-medium", isActive && "text-orange-600")}>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
