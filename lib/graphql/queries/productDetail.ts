import { GRAPHQL_ENDPOINT } from "@/lib/env";
import type { Product } from "@/types/product";
import { normalizeProduct } from "@/utils/normalizeProduct";

export const PRODUCT_DETAIL_QUERY = `
  query ProductDetail($uid: String!) {
    getProducts(
      pagination: { skip: 0, limit: 1 }
      filter: { uid: $uid }
    ) {
      message
      statusCode
      result {
        products {
          uid
          enName
          images {
            url
          }
          productAttributes {
            enLabel
            values {
              enName
            }
          }
          detailedDescriptions {
            enLabel
            values {
              enName
            }
          }
          deliveries {
            enLabel
            values {
              enName
            }
          }
          serviceAndDeliveries {
            enLabel
            values {
              enName
            }
          }
          priceAndStocks {
            enLabel
            values {
              enName
            }
          }
          variants {
            uid
            mrpPrice
            ebsItemCode
            posItemCode
            quantity
            images {
              url
            }
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
        products: Product[];
      };
    };
  };
  errors?: { message: string }[];
}

export async function fetchProductByUid(uid: string): Promise<Product> {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: PRODUCT_DETAIL_QUERY,
      variables: { uid },
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
    throw new Error(payload?.message ?? "Failed to fetch product");
  }

  const product = payload.result?.products?.[0];

  if (!product) {
    throw new Error(`Product not found: ${uid}`);
  }

  return normalizeProduct(product);
}
