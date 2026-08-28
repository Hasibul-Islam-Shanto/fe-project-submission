import type { ProductListFilters, ProductSort } from "@/types/productList";
import { DEFAULT_PRODUCT_LIST_FILTERS } from "@/types/productList";

export function buildProductListUrl({
  filters,
  sort,
  page,
}: {
  filters: ProductListFilters;
  sort: ProductSort;
  page: number;
}): string {
  const params = new URLSearchParams();

  if (filters.minPrice !== null) {
    params.set("minPrice", String(filters.minPrice));
  }

  if (filters.maxPrice !== null) {
    params.set("maxPrice", String(filters.maxPrice));
  }

  if (filters.availability !== DEFAULT_PRODUCT_LIST_FILTERS.availability) {
    params.set("availability", filters.availability);
  }

  if (sort !== "default") {
    params.set("sort", sort);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}
