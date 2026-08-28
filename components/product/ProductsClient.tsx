"use client";

import FilterPanel, { type PriceRange } from "@/components/filters/FilterPanel";
import SortDropdown, { type SortBy } from "@/components/filters/SortDropdown";
import { ProductGridSkeleton } from "@/components/product/ProductCardSkeleton";
import ProductCard from "@/components/product/ProductCard";
import ProductEmpty from "@/components/product/ProductEmpty";
import ProductFetchError from "@/components/product/ProductFetchError";
import Pagination from "@/components/ui/Pagination";
import { PRODUCTS_LIST_QUERY } from "@/lib/graphql/queries/productQuery";
import { getPricing } from "@/lib/pricing";
import type { GraphQLResponse } from "@/types/graphql";
import type { ProductListItem } from "@/types/productList";
import { normalizeProductListItem } from "@/utils/normalizeProduct";
import { SlidersHorizontal, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "urql";

interface ProductsClientProps {
  initialProducts: ProductListItem[];
  initialCount: number;
  initialPage: number;
  pageSize?: number;
}

function parseProductsListResult(data: unknown): {
  products: ProductListItem[];
  count: number;
} | null {
  const payload = (data as GraphQLResponse["data"])?.getProducts;

  if (!payload || payload.statusCode !== 200) {
    return null;
  }

  return {
    products: (payload.result?.products ?? []).map(normalizeProductListItem),
    count: payload.result?.count ?? 0,
  };
}

const ProductsClient = ({
  initialProducts,
  initialCount,
  initialPage,
  pageSize = 12,
}: ProductsClientProps) => {
  const [page, setPage] = useState(initialPage);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: null,
    max: null,
  });
  const [sortBy, setSortBy] = useState<SortBy>("none");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [queryResult] = useQuery({
    query: PRODUCTS_LIST_QUERY,
    variables: {
      skip: (page - 1) * pageSize,
      limit: pageSize,
      filter: null,
    },
    pause: !hasInteracted,
  });

  const { products, count, loadFailed } = useMemo(() => {
    if (!hasInteracted) {
      return {
        products: initialProducts,
        count: initialCount,
        loadFailed: false,
      };
    }

    const parsed = parseProductsListResult(queryResult.data);

    if (parsed) {
      return { ...parsed, loadFailed: false };
    }

    if (queryResult.fetching) {
      return {
        products: [] as ProductListItem[],
        count: initialCount,
        loadFailed: false,
      };
    }

    return {
      products: [] as ProductListItem[],
      count: 0,
      loadFailed: Boolean(queryResult.error) || queryResult.data != null,
    };
  }, [
    hasInteracted,
    initialCount,
    initialProducts,
    queryResult.data,
    queryResult.error,
    queryResult.fetching,
  ]);

  const displayedProducts = useMemo(() => {
    let result = products.filter((product) => {
      const { sellingPrice } = getPricing(product);

      if (priceRange.min !== null && sellingPrice < priceRange.min) {
        return false;
      }

      if (priceRange.max !== null && sellingPrice > priceRange.max) {
        return false;
      }

      return true;
    });

    if (sortBy === "price-asc") {
      result = [...result].sort(
        (a, b) => getPricing(a).sellingPrice - getPricing(b).sellingPrice,
      );
    } else if (sortBy === "price-desc") {
      result = [...result].sort(
        (a, b) => getPricing(b).sellingPrice - getPricing(a).sellingPrice,
      );
    }

    return result;
  }, [products, priceRange, sortBy]);

  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const hasClientSideFilters =
    priceRange.min !== null || priceRange.max !== null || sortBy !== "none";
  const isFetching = hasInteracted && queryResult.fetching;

  const handlePageChange = useCallback((nextPage: number) => {
    setHasInteracted(true);
    setPage(nextPage);
  }, []);

  const handlePriceRangeChange = useCallback((range: PriceRange) => {
    setPriceRange(range);
  }, []);

  const handleSortChange = useCallback((value: SortBy) => {
    setSortBy(value);
  }, []);

  const filterPanel = (
    <FilterPanel
      priceRange={priceRange}
      onPriceRangeChange={handlePriceRangeChange}
    />
  );

  return (
    <div className="flex gap-8">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24">
          {!mobileFiltersOpen && filterPanel}
        </div>
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
            <SortDropdown value={sortBy} onChange={handleSortChange} />
          </div>
        </div>

        {hasClientSideFilters && products.length > 0 && (
          <p className="mb-4 text-xs text-[var(--color-text-muted)]">
            Showing {displayedProducts.length} of {products.length} results on
            this page. Price and sort apply to the current page only.
          </p>
        )}

        {loadFailed ? (
          <ProductFetchError
            title="Couldn't load products"
            message="Something went wrong while updating the product list. Please try again."
          />
        ) : isFetching && displayedProducts.length === 0 ? (
          <ProductGridSkeleton
            count={pageSize}
            className="grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
          />
        ) : displayedProducts.length === 0 ? (
          <ProductEmpty
            title="No products found"
            message="We couldn't find any products matching your criteria. Try adjusting filters or check back later for new arrivals."
          />
        ) : (
          <div
            className={`grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 ${isFetching ? "opacity-70" : ""}`}
          >
            {displayedProducts.map((product, index) => (
              <ProductCard
                key={product.uid}
                product={product}
                animationDelay={index * 80}
                priority={index === 0 && page === 1}
              />
            ))}
          </div>
        )}

        <div className="mt-10">
          <Pagination
            currentPage={page}
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
            <FilterPanel
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsClient;
