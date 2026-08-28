import type { ProductListFilters, ProductSort } from "@/types/productList";
import { DEFAULT_PRODUCT_LIST_FILTERS } from "@/types/productList";
import { isPriceRangeInvalid } from "@/utils/productFilters";

const AVAILABILITY_VALUES = new Set<ProductListFilters["availability"]>([
  "all",
  "in-stock",
  "out-of-stock",
]);

const SORT_VALUES = new Set<ProductSort>([
  "default",
  "price-asc",
  "price-desc",
]);

function getParam(
  searchParams: Record<string, string | string[] | undefined>,
  key: string,
): string | undefined {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function parseOptionalPrice(value: string | undefined): number | null {
  if (value == null || value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function parsePage(value: string | undefined): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }

  return Math.floor(parsed);
}

function parseAvailability(
  value: string | undefined,
): ProductListFilters["availability"] {
  if (
    value &&
    AVAILABILITY_VALUES.has(value as ProductListFilters["availability"])
  ) {
    return value as ProductListFilters["availability"];
  }

  return DEFAULT_PRODUCT_LIST_FILTERS.availability;
}

function parseSort(value: string | undefined): ProductSort {
  if (value && SORT_VALUES.has(value as ProductSort)) {
    return value as ProductSort;
  }

  return "default";
}

export function parseProductListSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): {
  filters: ProductListFilters;
  sort: ProductSort;
  page: number;
} {
  const minPrice = parseOptionalPrice(getParam(searchParams, "minPrice"));
  const maxPrice = parseOptionalPrice(getParam(searchParams, "maxPrice"));

  const filters: ProductListFilters = {
    minPrice,
    maxPrice,
    availability: parseAvailability(getParam(searchParams, "availability")),
  };

  if (isPriceRangeInvalid(filters)) {
    filters.minPrice = null;
    filters.maxPrice = null;
  }

  return {
    filters,
    sort: parseSort(getParam(searchParams, "sort")),
    page: parsePage(getParam(searchParams, "page")),
  };
}
