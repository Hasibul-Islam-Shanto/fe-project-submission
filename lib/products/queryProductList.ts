import { applyProductListPipeline } from "@/lib/products/applyProductListPipeline";
import { getProductCatalog } from "@/lib/products/getProductCatalog";
import type {
  ProductListFilters,
  ProductListItem,
  ProductSort,
} from "@/types/productList";
import { DEFAULT_PRODUCT_LIST_FILTERS } from "@/types/productList";

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
  const catalog = await getProductCatalog();

  return applyProductListPipeline(catalog, {
    filters,
    sort,
    skip,
    limit,
  });
}
