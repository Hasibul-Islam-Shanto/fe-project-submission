const ProductCardSkeleton = () => {
  return (
    <div className="card-premium overflow-hidden">
      <div className="aspect-square animate-pulse bg-[var(--color-bg-tertiary)]" />
      <div className="space-y-3 p-4">
        <div className="h-4 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
        <div className="h-6 w-1/2 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
      </div>
    </div>
  );
};

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

const ProductGridSkeleton = ({
  count = 8,
  className = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
}: ProductGridSkeletonProps) => {
  return (
    <div className={`grid gap-4 md:gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export { ProductGridSkeleton };
