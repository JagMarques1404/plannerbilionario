"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ToastData {
  id: string
  type: "success" | "info" | "warning" | "error"
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastNotificationProps {
  toast: ToastData
  onClose: (id: string) => void
}

export const ToastNotification = ({ toast, onClose }: ToastNotificationProps) => {
  const [progress, setProgress] = useState(100)
  const duration = toast.duration || 5000

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - 100 / (duration / 100)
        if (newProgress <= 0) {
          onClose(toast.id)
          return 0
        }
        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [toast.id, duration, onClose])

  const getToastStyles = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-500 text-white"
      case "error":
        return "bg-red-500 text-white"
      case "warning":
        return "bg-yellow-400 text-black"
      case "info":
      default:
        return "bg-blue-600 text-white"
    }
  }

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="h-5 w-5" aria-hidden="true" />
      case "error":
        return <XCircle className="h-5 w-5" aria-hidden="true" />
      case "warning":
        return <AlertTriangle className="h-5 w-5" aria-hidden="true" />
      case "info":
      default:
        return <Info className="h-5 w-5" aria-hidden="true" />
    }
  }

  return (
    <div
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50
        ${getToastStyles()}
        rounded-lg shadow-lg max-w-md w-full mx-4
        animate-slide-up overflow-hidden
      `}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm">{toast.title}</h4>
            <p className="text-sm opacity-90 mt-1">{toast.message}</p>
            {toast.action && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toast.action.onClick}
                className="mt-2 p-0 h-auto text-current hover:text-current hover:bg-white/20"
              >
                {toast.action.label}
              </Button>
            )}
          </div>
          <button
            onClick={() => onClose(toast.id)}
            className="flex-shrink-0 text-current hover:opacity-70 transition-opacity julius-focus"
            aria-label="Fechar notificação"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="h-1 bg-black bg-opacity-20">
        <div
          className="h-full bg-white bg-opacity-30 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

// Hook para gerenciar toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const addToast = (toast: Omit<ToastData, "id">) => {
    const newToast: ToastData = {
      ...toast,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    }

    setToasts((prev) => [...prev, newToast])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const clearToasts = () => {
    setToasts([])
  }

  // Funções de conveniência
  const success = (title: string, message: string, options?: Partial<ToastData>) => {
    addToast({ type: "success", title, message, ...options })
  }

  const error = (title: string, message: string, options?: Partial<ToastData>) => {
    addToast({ type: "error", title, message, ...options })
  }

  const warning = (title: string, message: string, options?: Partial<ToastData>) => {
    addToast({ type: "warning", title, message, ...options })
  }

  const info = (title: string, message: string, options?: Partial<ToastData>) => {
    addToast({ type: "info", title, message, ...options })
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
  }
}

// Container de Toasts
export const ToastContainer = () => {
  const { toasts, removeToast } = useToast()

  return (
    <>
      {toasts.map((toast) => (
        <ToastNotification key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </>
  )
}
