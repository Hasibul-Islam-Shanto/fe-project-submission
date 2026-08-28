import type { FetchOptions } from "@/lib/fetcher";
import { graphqlFetcher } from "@/lib/fetcher";
import type { ProductListCapabilities } from "@/lib/graphql/productListCapabilities";
import {
  PRODUCTS_LIST_EXTENDED_QUERY,
  PRODUCTS_LIST_QUERY,
} from "@/lib/graphql/queries/productQuery";
import type {
  ProductFilterInput,
  ProductListItem,
  ProductStockSort,
} from "@/types/productList";
import { normalizeProductListItem } from "@/utils/normalizeProduct";
import { GraphQLResponse } from "@/types/graphql";

function resolveProductsListQuery(capabilities: ProductListCapabilities) {
  if (capabilities.extendedProductFields) {
    return PRODUCTS_LIST_EXTENDED_QUERY;
  }

  return PRODUCTS_LIST_QUERY;
}

export async function fetchProductsList({
  skip,
  limit,
  filter = null,
  sort = null,
  capabilities,
  fetchOptions,
}: {
  skip: number;
  limit: number;
  filter?: ProductFilterInput | null;
  sort?: ProductStockSort | null;
  capabilities: ProductListCapabilities;
  fetchOptions?: FetchOptions;
}): Promise<{ products: ProductListItem[]; count: number }> {
  const query = resolveProductsListQuery(capabilities);
  const variables: Record<string, unknown> = { skip, limit, filter };

  if (capabilities.extendedProductFields && sort) {
    variables.sort = sort;
  }

  const data = await graphqlFetcher<GraphQLResponse["data"]>(
    query,
    variables,
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
