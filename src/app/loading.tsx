export default function Loading() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
      <div className="animate-pulse rounded-lg bg-surface-2 mb-4 h-6 w-40" />
      <div className="animate-pulse rounded-lg bg-surface-2 mb-10 h-14 w-full max-w-xl" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-lg bg-surface-2 h-72 w-full" />
        ))}
      </div>
    </div>
  );
}
