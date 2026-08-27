import type { Variant } from "@/types/product";
import {
  formatCurrency,
  getDisplayPrice,
  isInStock,
} from "@/utils/productHelper";

interface PriceDisplayProps {
  variant: Variant;
}

const PriceDisplay = ({ variant }: PriceDisplayProps) => {
  const { mrp, sellingPrice, discountPercent } = getDisplayPrice(variant);
  const hasDiscount = discountPercent !== null && sellingPrice < mrp;
  const badgeLabel = hasDiscount ? `${discountPercent}% OFF` : null;
  const inStock = isInStock(variant);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="text-3xl font-bold text-[var(--color-text-primary)]">
          {formatCurrency(sellingPrice)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-[var(--color-text-muted)] line-through">
              {formatCurrency(mrp)}
            </span>
            {badgeLabel && (
              <span className="rounded-full bg-[var(--color-aurora-4)]/20 px-2.5 py-1 text-xs font-semibold text-[var(--color-aurora-4)] ring-1 ring-[var(--color-aurora-4)]/40">
                {badgeLabel}
              </span>
            )}
          </>
        )}
      </div>

      <p
        className={`text-sm font-medium ${
          inStock
            ? "text-[var(--color-aurora-4)]"
            : "text-[var(--color-aurora-5)]"
        }`}
      >
        {inStock ? `In Stock (${variant.quantity} available)` : "Out of Stock"}
      </p>
    </div>
  );
};

export default PriceDisplay;
