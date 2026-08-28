"use client";

import FilterPanel from "@/components/filters/FilterPanel";
import SortDropdown from "@/components/filters/SortDropdown";
import { ProductGridSkeleton } from "@/components/product/ProductCardSkeleton";
import ProductCard from "@/components/product/ProductCard";
import ProductEmpty from "@/components/product/ProductEmpty";
import ProductFetchError from "@/components/product/ProductFetchError";
import Pagination from "@/components/ui/Pagination";
import type {
  ProductListCategory,
  ProductListFilters,
  ProductListItem,
  ProductSort,
} from "@/types/productList";
import { DEFAULT_PRODUCT_LIST_FILTERS } from "@/types/productList";
import { isPriceRangeInvalid } from "@/utils/productFilters";
import { SlidersHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchProductListAction } from "@/app/products/actions";

interface ProductsClientProps {
  initialProducts: ProductListItem[];
  initialCount: number;
  initialPage: number;
  initialCategories: ProductListCategory[];
  supportsRatingSort: boolean;
  pageSize?: number;
}

const ProductsClient = ({
  initialProducts,
  initialCount,
  initialPage,
  initialCategories,
  supportsRatingSort,
  pageSize = 12,
}: ProductsClientProps) => {
  const [page, setPage] = useState(initialPage);
  const [filters, setFilters] = useState<ProductListFilters>(
    DEFAULT_PRODUCT_LIST_FILTERS,
  );
  const [sortBy, setSortBy] = useState<ProductSort>("default");
  const [products, setProducts] = useState(initialProducts);
  const [count, setCount] = useState(initialCount);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const effectivePage = Math.min(page, totalPages);

  useEffect(() => {
    if (!hasInteracted) {
      return;
    }

    let cancelled = false;

    const loadProducts = async () => {
      setIsFetching(true);
      setLoadFailed(false);

      try {
        const result = await fetchProductListAction({
          skip: (effectivePage - 1) * pageSize,
          limit: pageSize,
          filters,
          sort: sortBy,
        });

        if (cancelled) {
          return;
        }

        setProducts(result.products);
        setCount(result.count);
      } catch {
        if (!cancelled) {
          setLoadFailed(true);
        }
      } finally {
        if (!cancelled) {
          setIsFetching(false);
        }
      }
    };

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, [hasInteracted, effectivePage, pageSize, filters, sortBy]);

  const handlePageChange = useCallback((nextPage: number) => {
    setHasInteracted(true);
    setPage(nextPage);
  }, []);

  const handleFiltersChange = useCallback((nextFilters: ProductListFilters) => {
    if (isPriceRangeInvalid(nextFilters)) {
      return;
    }

    setHasInteracted(true);
    setPage(1);
    setFilters(nextFilters);
  }, []);

  const handleSortChange = useCallback((nextSort: ProductSort) => {
    setHasInteracted(true);
    setPage(1);
    setSortBy(nextSort);
  }, []);

  const filterPanel = useMemo(
    () => (
      <FilterPanel
        filters={filters}
        categories={initialCategories}
        onFiltersChange={handleFiltersChange}
      />
    ),
    [filters, initialCategories, handleFiltersChange],
  );

  return (
    <div className="flex gap-8">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24">{!mobileFiltersOpen && filterPanel}</div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Showing{" "}
            <span className="font-semibold text-[var(--color-text-primary)]">
              {count}
            </span>{" "}
            products
            {isFetching && (
              <span className="ml-2 text-[var(--color-text-muted)]">
                (Updating…)
              </span>
            )}
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 text-[var(--color-text-accent)]" />
              Filters
            </button>
            <SortDropdown
              value={sortBy}
              supportsRatingSort={supportsRatingSort}
              onChange={handleSortChange}
            />
          </div>
        </div>

        {loadFailed ? (
          <ProductFetchError
            title="Couldn't load products"
            message="Something went wrong while updating the product list. Please try again."
          />
        ) : isFetching && products.length === 0 ? (
          <ProductGridSkeleton
            count={pageSize}
            className="grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
          />
        ) : products.length === 0 ? (
          <ProductEmpty
            title="No products found"
            message="We couldn't find any products matching your criteria. Try adjusting filters or check back later for new arrivals."
          />
        ) : (
          <div
            className={`grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 ${isFetching ? "opacity-70" : ""}`}
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.uid}
                product={product}
                animationDelay={index * 80}
                priority={index === 0 && effectivePage === 1}
              />
            ))}
          </div>
        )}

        <div className="mt-10">
          <Pagination
            currentPage={effectivePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filter overlay"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-[var(--color-bg-primary)]/70 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 shadow-[var(--glass-shadow)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {filterPanel}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsClient;
