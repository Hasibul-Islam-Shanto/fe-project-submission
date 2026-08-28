"use server";

import { queryProductList } from "@/lib/products/queryProductList";
import type {
  ProductListFilters,
  ProductListItem,
  ProductSort,
} from "@/types/productList";

export async function fetchProductListAction({
  skip,
  limit,
  filters,
  sort,
}: {
  skip: number;
  limit: number;
  filters: ProductListFilters;
  sort: ProductSort;
}): Promise<{ products: ProductListItem[]; count: number }> {
  return queryProductList({ skip, limit, filters, sort });
}
