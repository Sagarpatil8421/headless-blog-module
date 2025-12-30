export default function BlogDetailSkeleton() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <article className="prose lg:prose-xl mx-auto">
        <header>
          {/* Title Skeleton */}
          <div className="space-y-4 mb-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
          </div>

          {/* Meta Info Skeleton */}
          <div className="flex gap-4 items-center mb-6">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1 bg-gray-200" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Featured Image Skeleton */}
          <div className="mt-6 mb-6">
            <div className="w-full h-96 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Categories Skeleton */}
          <div className="flex gap-2 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-20 bg-gray-200 rounded text-xs animate-pulse"
              />
            ))}
          </div>
        </header>

        {/* Content Skeleton */}
        <section className="mt-8 space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}
