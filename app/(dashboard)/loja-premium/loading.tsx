"use client"

import { SkeletonProdutosList } from "@/components/loading-skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/loading-skeleton"

export default function LojaPremiumLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Tabs Skeleton */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>

      {/* Filters Skeleton */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Skeleton className="h-10 flex-1" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid Skeleton */}
      <SkeletonProdutosList />
    </div>
  )
}
