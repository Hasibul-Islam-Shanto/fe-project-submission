import { ProductGridSkeleton } from "@/components/product/ProductCardSkeleton";

const pulse = "animate-pulse rounded bg-[var(--color-bg-tertiary)]";

const ProductsLoading = () => {
  return (
    <div
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-2"
      aria-busy="true"
      aria-label="Loading products"
    >
      <div className="mb-8 space-y-3">
        <div className={`h-9 w-48 ${pulse}`} />
        <div className={`h-5 w-72 ${pulse}`} />
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block" aria-hidden="true">
          <div className="sticky top-24">
            <div className="surface-card space-y-5 p-5">
              <div className="flex items-center gap-2">
                <div className={`h-4 w-4 rounded ${pulse}`} />
                <div className={`h-5 w-16 ${pulse}`} />
              </div>

              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="space-y-3 border-b border-[var(--color-border)] pb-5 last:border-b-0 last:pb-0"
                >
                  <div className={`h-4 w-24 ${pulse}`} />
                  <div className={`h-9 w-full ${pulse}`} />
                  <div className={`h-9 w-full ${pulse}`} />
                </div>
              ))}

              <div className={`h-10 w-full rounded-lg ${pulse}`} />
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div
            className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            aria-hidden="true"
          >
            <div className={`h-5 w-36 ${pulse}`} />
            <div className="flex items-center gap-3">
              <div className={`h-10 w-24 rounded-xl lg:hidden ${pulse}`} />
              <div className={`h-10 w-40 rounded-xl ${pulse}`} />
            </div>
          </div>

          <ProductGridSkeleton
            count={12}
            className="grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
          />

          <div
            className="mt-10 flex items-center justify-center gap-1"
            aria-hidden="true"
          >
            <div className={`h-9 w-9 rounded-full ${pulse}`} />
            <div className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={`h-8 w-8 rounded-full ${pulse}`} />
              ))}
            </div>
            <div className={`h-9 w-9 rounded-full ${pulse}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsLoading;
