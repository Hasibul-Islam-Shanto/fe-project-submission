import { ProductGridSkeleton } from "../product/ProductCardSkeleton";

const FeaturedProductsFallback = () => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 space-y-3">
          <div className="h-4 w-24 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
          <div className="h-9 w-56 animate-pulse rounded-lg bg-[var(--color-bg-tertiary)]" />
          <div className="h-5 w-72 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
        </div>
        <ProductGridSkeleton
          count={6}
          className="grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
        />
      </div>
    </section>
  );
};

export default FeaturedProductsFallback;
