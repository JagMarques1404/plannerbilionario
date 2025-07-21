"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-slide-up border-2 border-red-200 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">Something went wrong!</CardTitle>
          <CardDescription>We encountered an unexpected error</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-700">{error.message || "An unexpected error occurred"}</p>
          </div>

          <div className="flex space-x-3">
            <Button onClick={reset} className="flex-1 bg-blue-900 hover:bg-blue-800 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={() => (window.location.href = "/login")}
              variant="outline"
              className="flex-1 border-gray-300"
            >
              Go to Login
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              If this problem persists, please refresh the page or try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
