import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SocialTradingLoading() {
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header Skeleton */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Portfolio Overview Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="card-premium border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-5 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-1" />
              <Skeleton className="h-4 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-2 bg-white p-1 rounded-2xl shadow-lg">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-xl" />
          ))}
        </div>

        {/* Content Skeleton */}
        <Card className="card-premium border-0">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-16 h-16 rounded-full" />
                    <div>
                      <Skeleton className="h-6 w-32 mb-2" />
                      <Skeleton className="h-4 w-24 mb-2" />
                      <div className="flex space-x-4">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-16 rounded-xl" />
                    <Skeleton className="h-8 w-16 rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="text-center p-3 bg-white rounded-xl">
                      <Skeleton className="h-8 w-16 mx-auto mb-1" />
                      <Skeleton className="h-3 w-12 mx-auto" />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <div className="flex space-x-2">
                      {[...Array(3)].map((_, k) => (
                        <Skeleton key={k} className="h-6 w-16 rounded" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <div className="space-y-1">
                      {[...Array(3)].map((_, l) => (
                        <Skeleton key={l} className="h-3 w-32" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
