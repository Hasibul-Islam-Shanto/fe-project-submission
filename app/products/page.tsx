import ProductsClient from "@/components/product/ProductsClient";
import { getProductListCapabilities } from "@/lib/graphql/productListCapabilities";
import {
  queryProductList,
  queryProductListCategories,
} from "@/lib/products/queryProductList";
import { DEFAULT_PRODUCT_LIST_FILTERS } from "@/types/productList";
import { redirect } from "next/navigation";

const PAGE_SIZE = 6;

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const [capabilities, categories, { products, count }] = await Promise.all([
    getProductListCapabilities(),
    queryProductListCategories(),
    queryProductList({
      skip,
      limit: PAGE_SIZE,
      filters: DEFAULT_PRODUCT_LIST_FILTERS,
      sort: "default",
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  if (count > 0 && currentPage > totalPages) {
    redirect(totalPages === 1 ? "/products" : `/products?page=${totalPages}`);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-2">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-aurora">Products</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Browse our latest electronics and appliances
        </p>
      </div>

      <ProductsClient
        initialProducts={products}
        initialCount={count}
        initialPage={currentPage}
        initialCategories={categories}
        supportsRatingSort={capabilities.extendedProductFields}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
};

export default ProductsPage;
