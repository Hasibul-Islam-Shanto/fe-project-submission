import type { FetchOptions } from "@/lib/fetcher";
import { graphqlFetcher } from "@/lib/fetcher";
import { PRODUCTS_LIST_QUERY } from "@/lib/graphql/queries/productQuery";
import type { ProductFilterInput, ProductListItem } from "@/types/productList";
import { normalizeProductListItem } from "@/utils/normalizeProduct";
import { GraphQLResponse } from "@/types/graphql";

export async function fetchProductsList({
  skip,
  limit,
  filter = null,
  fetchOptions,
}: {
  skip: number;
  limit: number;
  filter?: ProductFilterInput | null;
  fetchOptions?: FetchOptions;
}): Promise<{ products: ProductListItem[]; count: number }> {
  const data = await graphqlFetcher<GraphQLResponse["data"]>(
    PRODUCTS_LIST_QUERY,
    { skip, limit, filter },
    fetchOptions,
  );

  const payload = data?.getProducts;

  if (!payload || payload.statusCode !== 200) {
    throw new Error(payload?.message ?? "Failed to fetch products list");
  }

  const products = (payload.result?.products ?? []).map(
    normalizeProductListItem,
  );

  return {
    products,
    count: payload.result?.count ?? 0,
  };
}
