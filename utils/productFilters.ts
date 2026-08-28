import type { ProductListFilters } from "@/types/productList";

export function isPriceRangeInvalid(filters: ProductListFilters): boolean {
  return (
    filters.minPrice !== null &&
    filters.maxPrice !== null &&
    filters.minPrice > filters.maxPrice
  );
}
