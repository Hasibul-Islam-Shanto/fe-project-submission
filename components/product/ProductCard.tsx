import Image from "next/image";
import Link from "next/link";
import type { ProductListItem } from "@/types/productList";
import {
  formatCurrency,
  getDisplayPrice,
  getPrimaryVariant,
  isInStock,
} from "@/utils/productHelper";

interface ProductCardProps {
  product: ProductListItem;
  animationDelay?: number;
  priority?: boolean;
}

const ProductCard = ({
  product,
  animationDelay = 0,
  priority = false,
}: ProductCardProps) => {
  const variant = getPrimaryVariant(product);
  const { mrp, sellingPrice, discountPercent } = getDisplayPrice(variant);
  const hasDiscount = discountPercent !== null && sellingPrice < mrp;
  const badgeLabel = hasDiscount ? `${discountPercent}% OFF` : null;
  const outOfStock = !isInStock(variant);
  const imageUrl = product.images[0]?.url;

  return (
    <Link
      href={`/products/${product.uid}`}
      className="card-premium group block overflow-hidden animate-fade-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--color-bg-tertiary)] p-4 transition-transform duration-300 group-hover:scale-[1.02]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.enName}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-[var(--color-text-muted)]">
            No image
          </div>
        )}

        {outOfStock && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--color-bg-primary)]/90 px-2.5 py-1 text-xs font-semibold text-[var(--color-aurora-5)] ring-1 ring-[var(--color-aurora-5)]/40">
            Out of Stock
          </span>
        )}

        {hasDiscount && badgeLabel && (
          <span className="absolute right-3 top-3 rounded-full bg-[var(--color-aurora-4)]/20 px-2.5 py-1 text-xs font-semibold text-[var(--color-aurora-4)] ring-1 ring-[var(--color-aurora-4)]/40">
            {badgeLabel}
          </span>
        )}
      </div>

      <div className="space-y-2 p-4 transition-shadow duration-300 group-hover:ring-2 group-hover:ring-[var(--color-brand)]/30">
        <h2 className="line-clamp-2 text-sm font-medium leading-snug text-[var(--color-text-primary)]">
          {product.enName}
        </h2>

        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-bold text-[var(--color-text-primary)]">
            {formatCurrency(sellingPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-[var(--color-text-muted)] line-through">
              {formatCurrency(mrp)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
