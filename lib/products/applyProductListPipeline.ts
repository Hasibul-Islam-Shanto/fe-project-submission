import { getPricing } from "@/lib/pricing";
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

  return sorted;
}

export function applyProductListPipeline(
  products: ProductListItem[],
  {
    filters,
    sort,
    skip,
    limit,
  }: {
    filters: ProductListFilters;
    sort: ProductSort;
    skip: number;
    limit: number;
  },
): { products: ProductListItem[]; count: number } {
  const filtered = products.filter(
    (product) =>
      matchesPriceFilter(product, filters) &&
      matchesAvailabilityFilter(product, filters),
  );

  const sorted = sortProducts(filtered, sort);
  const count = sorted.length;

  return {
    products: sorted.slice(skip, skip + limit),
    count,
  };
}
