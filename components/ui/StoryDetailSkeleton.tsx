import { Skeleton } from "./Skeleton"

export function StoryDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            {/* Cover Image Skeleton */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <Skeleton className="aspect-[16/9] w-full" />
            </div>

            {/* Story Header Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>

              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-5/6 mb-6" />

              <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>

            {/* Story Content Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            {/* Author Card Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>

            {/* Quick Actions Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
