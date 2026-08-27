import ProductCard from "@/components/product/ProductCard";
import ProductEmpty from "@/components/product/ProductEmpty";
import { ProductFilters, ProductToolbar } from "@/components/filters";
import Pagination from "@/components/ui/Pagination";
import { fetchProductsList } from "@/lib/graphql/queries/productsList";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const PAGE_SIZE = 12;

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, Number(pageParam) || 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const { products, count } = await fetchProductsList({
    skip,
    limit: PAGE_SIZE,
  });

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  if (count > 0 && currentPage > totalPages) {
    redirect(totalPages === 1 ? "/products" : `/products?page=${totalPages}`);
  }

  const safePage = currentPage;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-aurora">Products</h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Browse our latest electronics and appliances
        </p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <ProductFilters />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <ProductToolbar totalCount={count} />

          {products.length === 0 ? (
            <ProductEmpty
              title="No products found"
              message="We couldn't find any products matching your criteria. Try adjusting filters or check back later for new arrivals."
            />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
              {products.map((product, index) => (
                <ProductCard
                  key={product.uid}
                  product={product}
                  animationDelay={index * 80}
                  priority={index === 0}
                />
              ))}
            </div>
          )}

          <div className="mt-10">
            <Suspense fallback={null}>
              <Pagination currentPage={safePage} totalPages={totalPages} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
