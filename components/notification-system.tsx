"use client"

import { useApp } from "@/contexts/app-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

export function NotificationSystem() {
  const { notifications, markNotificationAsRead } = useApp()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.slice(0, 5).map((notification) => {
        const Icon = {
          success: CheckCircle,
          error: AlertCircle,
          warning: AlertTriangle,
          info: Info,
        }[notification.type]

        const colors = {
          success: "border-green-200 bg-green-50 text-green-800",
          error: "border-red-200 bg-red-50 text-red-800",
          warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
          info: "border-blue-200 bg-blue-50 text-blue-800",
        }[notification.type]

        return (
          <Card key={notification.id} className={`p-4 ${colors} animate-slide-up shadow-lg`}>
            <div className="flex items-start gap-3">
              <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm">{notification.title}</h4>
                <p className="text-sm opacity-90 mt-1">{notification.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {formatDistanceToNow(notification.timestamp, { addSuffix: true, locale: ptBR })}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-black/10"
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
