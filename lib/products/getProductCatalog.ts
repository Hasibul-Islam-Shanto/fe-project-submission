import { fetchProductsList } from "@/lib/graphql/api/productsList";
import type { ProductListItem } from "@/types/productList";

const CATALOG_TTL_MS = 5 * 60 * 1000;
const MAX_CATALOG_SIZE = 1000;

let cache: { products: ProductListItem[]; fetchedAt: number } | null = null;

export async function getProductCatalog(): Promise<ProductListItem[]> {
  if (cache && Date.now() - cache.fetchedAt < CATALOG_TTL_MS) {
    return cache.products;
  }

  const { count } = await fetchProductsList({
    skip: 0,
    limit: 1,
    filter: { isActive: true },
  });

  const { products } = await fetchProductsList({
    skip: 0,
    limit: Math.min(count, MAX_CATALOG_SIZE),
    filter: { isActive: true },
  });

  cache = { products, fetchedAt: Date.now() };
  return products;
}
