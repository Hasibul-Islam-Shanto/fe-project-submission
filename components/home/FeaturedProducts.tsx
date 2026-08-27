import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import type { ProductListItem } from "@/types/productList";

interface FeaturedProductsProps {
  products: ProductListItem[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--color-text-accent)]">
              Popular picks
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-2 max-w-lg text-[var(--color-text-secondary)]">
              Hand-picked bestsellers from our latest collection.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-text-accent)] transition-colors hover:text-[var(--color-aurora-2)]"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.uid}
              product={product}
              animationDelay={index * 80}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
