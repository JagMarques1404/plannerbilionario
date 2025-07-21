"use client"

import { Loader2, AlertCircle, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"

// Spinner de loading reutilizável
export const LoadingSpinner = ({
  size = "default",
  text = "Carregando...",
}: {
  size?: "sm" | "default" | "lg"
  text?: string
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-orange-400 mb-3`} />
      <p className="text-base text-gray-600 font-medium">{text}</p>
    </div>
  )
}

// Estado de loading para páginas inteiras
export const PageLoading = ({ title = "Carregando página..." }: { title?: string }) => (
  <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 text-center max-w-md w-full mx-4">
      <Loader2 className="h-12 w-12 animate-spin text-orange-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-base text-gray-600">Aguarde um momento...</p>
    </div>
  </div>
)

// Estado de loading para cards
export const CardLoading = ({ text = "Carregando..." }: { text?: string }) => (
  <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
    <div className="flex flex-col items-center justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-orange-400 mb-3" />
      <p className="text-base text-gray-600">{text}</p>
    </div>
  </div>
)

// Estado vazio
export const EmptyState = ({
  title = "Nenhum item encontrado",
  description = "Não há dados para exibir no momento.",
  action,
  actionText = "Tentar novamente",
}: {
  title?: string
  description?: string
  action?: () => void
  actionText?: string
}) => (
  <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <AlertCircle className="h-8 w-8 text-gray-400" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-base text-gray-600 mb-6">{description}</p>
    {action && (
      <Button
        onClick={action}
        className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-2 rounded-lg transition-colors"
      >
        {actionText}
      </Button>
    )}
  </div>
)

// Estado de erro
export const ErrorState = ({
  title = "Ops! Algo deu errado",
  description = "Ocorreu um erro inesperado. Tente novamente.",
  onRetry,
  retryText = "Tentar novamente",
}: {
  title?: string
  description?: string
  onRetry?: () => void
  retryText?: string
}) => (
  <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100 text-center">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <AlertCircle className="h-8 w-8 text-red-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-base text-gray-600 mb-6">{description}</p>
    {onRetry && (
      <Button
        onClick={onRetry}
        className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-2 rounded-lg transition-colors"
      >
        {retryText}
      </Button>
    )}
  </div>
)

// Estado de conexão
export const ConnectionState = ({
  isOnline = true,
  onRetry,
}: {
  isOnline?: boolean
  onRetry?: () => void
}) => (
  <div
    className={`bg-white shadow-lg rounded-xl p-6 border border-gray-100 text-center ${!isOnline ? "border-red-200" : "border-green-200"}`}
  >
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${!isOnline ? "bg-red-100" : "bg-green-100"}`}
    >
      {isOnline ? <Wifi className="h-6 w-6 text-green-600" /> : <WifiOff className="h-6 w-6 text-red-600" />}
    </div>
    <h4 className="text-lg font-semibold text-gray-800 mb-2">{isOnline ? "Conectado" : "Sem conexão"}</h4>
    <p className="text-base text-gray-600 mb-4">
      {isOnline ? "Sua conexão está funcionando normalmente." : "Verifique sua conexão com a internet."}
    </p>
    {!isOnline && onRetry && (
      <Button
        onClick={onRetry}
        className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-2 rounded-lg transition-colors"
      >
        Tentar reconectar
      </Button>
    )}
  </div>
)

// Loading para listas
export const ListLoading = ({
  count = 3,
  itemHeight = "h-16",
}: {
  count?: number
  itemHeight?: string
}) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="bg-white shadow-lg rounded-xl p-4 border border-gray-100">
        <div className="animate-pulse flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    ))}
  </div>
)

// Loading para tabelas
export const TableLoading = ({
  rows = 5,
  columns = 4,
}: {
  rows?: number
  columns?: number
}) => (
  <div className="bg-white shadow-lg rounded-xl border border-gray-100 overflow-hidden">
    <div className="animate-pulse">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="px-6 py-4 border-b border-gray-100 last:border-b-0">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)
