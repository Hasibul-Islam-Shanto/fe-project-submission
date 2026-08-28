import ProductsClient from "@/components/product/ProductsClient";
import { parseProductListSearchParams } from "@/lib/products/parseProductListSearchParams";
import { queryProductList } from "@/lib/products/queryProductList";
import { buildProductListUrl } from "@/utils/productListUrl";
import { redirect, RedirectType } from "next/navigation";

const PAGE_SIZE = 6;

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const params = await searchParams;
  const { filters, sort, page } = parseProductListSearchParams(params);

  const { count } = await queryProductList({
    skip: 0,
    limit: 1,
    filters,
    sort,
  });

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const effectivePage = count === 0 ? 1 : Math.min(page, totalPages);

  if (page !== effectivePage) {
    redirect(
      buildProductListUrl({ filters, sort, page: effectivePage }),
      RedirectType.replace,
    );
  }

  const { products } = await queryProductList({
    skip: (effectivePage - 1) * PAGE_SIZE,
    limit: PAGE_SIZE,
    filters,
    sort,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-2">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-aurora">Products</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Browse our latest electronics and appliances
        </p>
      </div>

      <ProductsClient
        products={products}
        count={count}
        page={effectivePage}
        filters={filters}
        sort={sort}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
};

export default ProductsPage;
