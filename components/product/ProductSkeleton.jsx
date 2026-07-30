export default function ProductSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="aspect-[4/3] shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-1/3 rounded shimmer" />
        <div className="h-4 w-4/5 rounded shimmer" />
        <div className="h-4 w-3/5 rounded shimmer" />
        <div className="h-6 w-1/3 rounded shimmer mt-2" />
        <div className="h-10 w-full rounded-full shimmer mt-3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => <ProductSkeleton key={i} />)}
    </div>
  );
}
