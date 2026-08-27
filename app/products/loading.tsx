import { ProductGridSkeleton } from "@/components/product/ProductCardSkeleton";

const ProductsLoading = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 space-y-3">
        <div className="h-9 w-48 animate-pulse rounded-lg bg-[var(--color-bg-tertiary)]" />
        <div className="h-5 w-72 animate-pulse rounded bg-[var(--color-bg-tertiary)]" />
      </div>
      <ProductGridSkeleton
        count={12}
        className="grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
      />
    </div>
  );
};

export default ProductsLoading;
