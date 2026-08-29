import { fetchProductsList } from "@/lib/graphql/api/productsList";
import type { ProductListItem } from "@/types/productList";
import { cache } from "react";

const CATALOG_TTL_MS = 5 * 60 * 1000;
const CATALOG_REVALIDATE_SECONDS = CATALOG_TTL_MS / 1000;
const API_PAGE_LIMIT = 30;

let catalogCache: { products: ProductListItem[]; fetchedAt: number } | null =
  null;

export const getProductCatalog = cache(async (): Promise<ProductListItem[]> => {
  if (catalogCache && Date.now() - catalogCache.fetchedAt < CATALOG_TTL_MS) {
    return catalogCache.products;
  }

  const { products } = await fetchProductsList({
    skip: 0,
    limit: API_PAGE_LIMIT,
    filter: { isActive: true },
    fetchOptions: {
      cache: "force-cache",
      revalidate: CATALOG_REVALIDATE_SECONDS,
    },
  });

  catalogCache = { products, fetchedAt: Date.now() };
  return products;
});
