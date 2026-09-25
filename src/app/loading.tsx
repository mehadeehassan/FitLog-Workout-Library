export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      {/* Header Skeleton */}
      <div className="mb-4 h-6 w-40 animate-pulse rounded-lg bg-surface-2" />

      {/* Search / Title Skeleton */}
      <div className="mb-10 h-14 w-full max-w-xl animate-pulse rounded-lg bg-surface-2" />

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-xl border border-surface-2 bg-white"
          >
            {/* Image Skeleton */}
            <div className="h-52 w-full animate-pulse bg-surface-2" />

            {/* Content */}
            <div className="space-y-4 p-5">
              {/* Title */}
              <div className="h-6 w-3/4 animate-pulse rounded-md bg-surface-2" />

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-surface-2" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-surface-2" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-surface-2" />
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between pt-2">
                <div className="h-4 w-20 animate-pulse rounded bg-surface-2" />
                <div className="h-9 w-24 animate-pulse rounded-lg bg-surface-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}