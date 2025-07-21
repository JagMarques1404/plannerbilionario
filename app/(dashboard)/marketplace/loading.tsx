import { ProductCardSkeleton } from "@/components/loading-skeleton"

export default function MarketplaceLoading() {
  return (
    <div className="min-h-screen bg-yellow-100">
      {/* Header mobile */}
      <header className="bg-white shadow-sm p-4 md:hidden">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="p-4 md:ml-64 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Page header skeleton */}
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 mb-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>

              {/* Filters skeleton */}
              <div className="flex flex-wrap gap-4">
                <div className="h-10 bg-gray-200 rounded w-32"></div>
                <div className="h-10 bg-gray-200 rounded w-40"></div>
                <div className="h-10 bg-gray-200 rounded w-28"></div>
              </div>
            </div>
          </div>

          {/* Products grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
