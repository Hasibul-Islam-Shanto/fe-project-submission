import type {
  ProductFilterInput,
  ProductListFilters,
  ProductSort,
  ProductStockSort,
} from "@/types/productList";
import type { ProductListCapabilities } from "@/lib/graphql/productListCapabilities";

export function isPriceRangeInvalid(filters: ProductListFilters): boolean {
  return (
    filters.minPrice !== null &&
    filters.maxPrice !== null &&
    filters.minPrice > filters.maxPrice
  );
}

export function hasActiveClientSideFilters(
  filters: ProductListFilters,
): boolean {
  return (
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.availability !== "all"
  );
}

export function needsFullPipeline(
  filters: ProductListFilters,
  sort: ProductSort,
  capabilities: ProductListCapabilities,
): boolean {
  if (hasActiveClientSideFilters(filters)) {
    return true;
  }

  if (filters.categoryUid && !capabilities.categoryFilter) {
    return true;
  }

  if (sort === "rating-asc" || sort === "rating-desc") {
    return true;
  }

  if (sort !== "default" && !capabilities.serverSort) {
    return true;
  }

  if (filters.categoryUid) {
    return true;
  }

  return sort !== "default";
}

export function buildProductFilter(
  filters: ProductListFilters,
  capabilities: ProductListCapabilities,
): ProductFilterInput | null {
  const filter: ProductFilterInput = {};

  if (capabilities.categoryFilter && filters.categoryUid) {
    filter.categoryUid = filters.categoryUid;
  }

  return Object.keys(filter).length > 0 ? filter : null;
}

export function buildProductSort(
  sort: ProductSort,
  capabilities: ProductListCapabilities,
): ProductStockSort | null {
  if (!capabilities.serverSort) {
    return null;
  }

  switch (sort) {
    case "price-asc":
      return "PRICE_LOW_TO_HIGH";
    case "price-desc":
      return "PRICE_HIGH_TO_LOW";
    default:
      return null;
  }
}
