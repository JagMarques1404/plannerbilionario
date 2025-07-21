"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    badge?: string
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Navegação Principal
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`
                    julius-sidebar-hover
                    ${pathname === item.url ? "julius-sidebar-active" : ""}
                  `}
                >
                  {item.icon && <item.icon className="h-4 w-4" aria-hidden="true" />}
                  <span className="font-medium">{item.title}</span>
                  {item.badge && (
                    <Badge
                      className={`
                        ml-auto text-xs
                        ${item.badge === "Novo" ? "bg-green-100 text-green-800" : ""}
                        ${item.badge === "IA" ? "bg-blue-100 text-blue-800" : ""}
                        ${item.badge === "Premium" ? "bg-yellow-400 text-black" : ""}
                        ${item.badge === "Início" ? "bg-orange-100 text-orange-800" : ""}
                      `}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        className={`
                          julius-sidebar-hover
                          ${pathname === subItem.url ? "julius-sidebar-active" : ""}
                        `}
                      >
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
