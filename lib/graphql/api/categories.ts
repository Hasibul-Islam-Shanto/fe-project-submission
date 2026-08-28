import type { FetchOptions } from "@/lib/fetcher";
import { graphqlFetcher } from "@/lib/fetcher";
import type { ProductListCapabilities } from "@/lib/graphql/productListCapabilities";
import { PRODUCT_CATEGORIES_QUERY } from "@/lib/graphql/queries/productQuery";
import type { ProductListCategory } from "@/types/productList";

interface CategoriesResponse {
  getCategories?: {
    message?: string;
    statusCode?: number;
    result?: {
      categories?: Array<{
        uid?: string | null;
        enName?: string | null;
      } | null>;
    };
  };
}

export async function fetchCategories(
  capabilities: ProductListCapabilities,
  fetchOptions?: FetchOptions,
): Promise<ProductListCategory[]> {
  if (!capabilities.categoriesQuery) {
    return [];
  }

  const data = await graphqlFetcher<CategoriesResponse>(
    PRODUCT_CATEGORIES_QUERY,
    undefined,
    fetchOptions,
  );

  const payload = data?.getCategories;

  if (!payload || payload.statusCode !== 200) {
    return [];
  }

  return (payload.result?.categories ?? [])
    .filter(
      (category): category is NonNullable<typeof category> => category != null,
    )
    .filter((category) => Boolean(category.uid))
    .map((category) => ({
      uid: category.uid ?? "",
      enName: category.enName ?? "",
    }));
}
