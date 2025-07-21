"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SandboxHeader } from "@/components/sandbox-header"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Gerar breadcrumbs baseado na rota
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs = []

    for (let i = 0; i < paths.length; i++) {
      const path = "/" + paths.slice(0, i + 1).join("/")
      const name = paths[i].charAt(0).toUpperCase() + paths[i].slice(1).replace("-", " ")

      breadcrumbs.push({
        name,
        path,
        isLast: i === paths.length - 1,
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <div className="min-h-screen-safe bg-yellow-100">
      <SandboxHeader />

      <div className="pt-24">
        {" "}
        {/* Espaço para header fixo */}
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            {/* Header da Página com Breadcrumbs */}
            <header className="flex h-16 shrink-0 items-center gap-2 bg-white border-b border-gray-200 px-4">
              <SidebarTrigger className="-ml-1 julius-focus" />
              <Separator orientation="vertical" className="mr-2 h-4" />

              {/* Breadcrumbs */}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard" className="julius-focus">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbs.length > 1 && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      {breadcrumbs.slice(1).map((crumb, index) => (
                        <React.Fragment key={crumb.path}>
                          <BreadcrumbItem>
                            {crumb.isLast ? (
                              <BreadcrumbPage className="font-medium">{crumb.name}</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink href={crumb.path} className="julius-focus">
                                {crumb.name}
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {!crumb.isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </header>

            {/* Conteúdo Principal */}
            <main
              id="main-content"
              className="flex-1 bg-yellow-100 p-4 md:p-6"
              role="main"
              aria-label="Conteúdo principal"
            >
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  )
}
