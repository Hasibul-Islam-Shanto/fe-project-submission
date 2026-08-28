import { getPricing } from "@/lib/pricing";
import type { ProductListCapabilities } from "@/lib/graphql/productListCapabilities";
import type {
  ProductListFilters,
  ProductListItem,
  ProductSort,
} from "@/types/productList";
import { getPrimaryVariant, isInStock } from "@/utils/productHelper";

function matchesPriceFilter(
  product: ProductListItem,
  filters: ProductListFilters,
): boolean {
  const { sellingPrice } = getPricing(product);

  if (filters.minPrice !== null && sellingPrice < filters.minPrice) {
    return false;
  }

  if (filters.maxPrice !== null && sellingPrice > filters.maxPrice) {
    return false;
  }

  return true;
}

function matchesAvailabilityFilter(
  product: ProductListItem,
  filters: ProductListFilters,
): boolean {
  if (filters.availability === "all") {
    return true;
  }

  const inStock = isInStock(getPrimaryVariant(product));

  if (filters.availability === "in-stock") {
    return inStock;
  }

  return !inStock;
}

function matchesCategoryFilter(
  product: ProductListItem,
  filters: ProductListFilters,
  capabilities: ProductListCapabilities,
): boolean {
  if (!filters.categoryUid || capabilities.categoryFilter) {
    return true;
  }

  return product.category?.uid === filters.categoryUid;
}

function sortProducts(
  products: ProductListItem[],
  sort: ProductSort,
): ProductListItem[] {
  if (sort === "default") {
    return products;
  }

  const sorted = [...products];

  if (sort === "price-asc") {
    return sorted.sort(
      (a, b) => getPricing(a).sellingPrice - getPricing(b).sellingPrice,
    );
  }

  if (sort === "price-desc") {
    return sorted.sort(
      (a, b) => getPricing(b).sellingPrice - getPricing(a).sellingPrice,
    );
  }

  if (sort === "rating-asc") {
    return sorted.sort(
      (a, b) => (a.rating?.average ?? 0) - (b.rating?.average ?? 0),
    );
  }

  if (sort === "rating-desc") {
    return sorted.sort(
      (a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0),
    );
  }

  return sorted;
}

export function applyProductListPipeline(
  products: ProductListItem[],
  {
    filters,
    sort,
    skip,
    limit,
    capabilities,
  }: {
    filters: ProductListFilters;
    sort: ProductSort;
    skip: number;
    limit: number;
    capabilities: ProductListCapabilities;
  },
): { products: ProductListItem[]; count: number } {
  const filtered = products.filter(
    (product) =>
      matchesPriceFilter(product, filters) &&
      matchesAvailabilityFilter(product, filters) &&
      matchesCategoryFilter(product, filters, capabilities),
  );

  const sorted = sortProducts(filtered, sort);
  const count = sorted.length;

  return {
    products: sorted.slice(skip, skip + limit),
    count,
  };
}
