import { GRAPHQL_ENDPOINT } from "@/lib/env";
import type { ProductFilterInput, ProductListItem } from "@/types/productList";
import { normalizeProductListItem } from "@/utils/normalizeProduct";

export const PRODUCTS_LIST_QUERY = `
  query ProductsList($skip: Int!, $limit: Int!, $filter: ProductFilterInput) {
    getProducts(
      pagination: { skip: $skip, limit: $limit }
      filter: $filter
    ) {
      message
      statusCode
      result {
        count
        products {
          uid
          enName
          images {
            url
          }
          variants {
            mrpPrice
            quantity
            discount {
              amount
              value
              type
            }
          }
        }
      }
    }
  }
`;

interface GraphQLResponse {
  data?: {
    getProducts?: {
      message?: string;
      statusCode?: number;
      result?: {
        count: number;
        products: ProductListItem[];
      };
    };
  };
  errors?: { message: string }[];
}

export async function fetchProductsList({
  skip,
  limit,
  filter = null,
}: {
  skip: number;
  limit: number;
  filter?: ProductFilterInput | null;
}): Promise<{ products: ProductListItem[]; count: number }> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: PRODUCTS_LIST_QUERY,
      variables: { skip, limit, filter },
    }),
    cache: "no-store",
  });

  if (response.status !== 200) {
    throw new Error(
      `GraphQL request failed with status ${response.status}: ${response.statusText}`,
    );
  }

  const json = (await response.json()) as GraphQLResponse;

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GraphQL error");
  }

  const payload = json.data?.getProducts;

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
