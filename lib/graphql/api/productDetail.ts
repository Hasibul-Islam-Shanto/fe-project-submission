import type { FetchOptions } from "@/lib/fetcher";
import { graphqlFetcher } from "@/lib/fetcher";
import type { Product } from "@/types/product";
import { normalizeProduct } from "@/utils/normalizeProduct";
import { PRODUCT_DETAIL_QUERY } from "../queries/productQuery";
import { GraphQLResponse } from "@/types/graphql";

export class ProductNotFoundError extends Error {
  constructor(uid: string) {
    super(`Product not found: ${uid}`);
    this.name = "ProductNotFoundError";
  }
}

export async function fetchProductByUid(
  uid: string,
  fetchOptions?: FetchOptions,
): Promise<Product> {
  const data = await graphqlFetcher<GraphQLResponse["data"]>(
    PRODUCT_DETAIL_QUERY,
    { uid },
    fetchOptions,
  );

  const payload = data?.getProducts;

  if (!payload || payload.statusCode !== 200) {
    throw new Error(payload?.message ?? "Failed to fetch product");
  }

  const product = payload.result?.products?.[0];

  if (!product) {
    throw new ProductNotFoundError(uid);
  }

  return normalizeProduct(product);
}
