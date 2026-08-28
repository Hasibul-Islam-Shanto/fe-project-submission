import { fetchCategories } from "@/lib/graphql/api/categories";
import { fetchProductsList } from "@/lib/graphql/api/productsList";
import { getProductListCapabilities } from "@/lib/graphql/productListCapabilities";
import { applyProductListPipeline } from "@/lib/products/applyProductListPipeline";
import type {
  ProductListFilters,
  ProductListItem,
  ProductSort,
} from "@/types/productList";
import { DEFAULT_PRODUCT_LIST_FILTERS } from "@/types/productList";
import {
  buildProductFilter,
  buildProductSort,
  needsFullPipeline,
} from "@/utils/productFilters";

export async function queryProductList({
  skip,
  limit,
  filters = DEFAULT_PRODUCT_LIST_FILTERS,
  sort = "default",
}: {
  skip: number;
  limit: number;
  filters?: ProductListFilters;
  sort?: ProductSort;
}): Promise<{ products: ProductListItem[]; count: number }> {
  const capabilities = await getProductListCapabilities();
  const apiFilter = buildProductFilter(filters, capabilities);
  const apiSort = buildProductSort(sort, capabilities);

  if (!needsFullPipeline(filters, sort, capabilities)) {
    return fetchProductsList({
      skip,
      limit,
      filter: apiFilter,
      sort: apiSort,
      capabilities,
    });
  }

  const countResult = await fetchProductsList({
    skip: 0,
    limit: 1,
    filter: apiFilter,
    sort: apiSort,
    capabilities,
  });

  const totalCount = countResult.count;

  if (totalCount === 0) {
    return { products: [], count: 0 };
  }

  const { products: allProducts } = await fetchProductsList({
    skip: 0,
    limit: totalCount,
    filter: apiFilter,
    sort: apiSort,
    capabilities,
  });

  return applyProductListPipeline(allProducts, {
    filters,
    sort,
    skip,
    limit,
    capabilities,
  });
}

export async function queryProductListCategories() {
  const capabilities = await getProductListCapabilities();
  return fetchCategories(capabilities);
}
