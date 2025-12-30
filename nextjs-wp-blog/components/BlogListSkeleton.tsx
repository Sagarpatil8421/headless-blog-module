export default function BlogListSkeleton() {
  return (
    <>
      {/* Category Filter Skeleton */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-20 rounded-full bg-gray-200 animate-pulse"
          />
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Featured Image Placeholder */}
            <div className="relative w-full h-48 bg-gray-200 animate-pulse" />

            <div className="flex flex-col flex-grow p-4">
              {/* Title Skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
              </div>

              {/* Excerpt Skeleton */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              </div>

              {/* Categories Skeleton */}
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Footer Skeleton */}
              <div className="mt-auto pt-3 border-t border-gray-200 flex justify-between items-center">
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
