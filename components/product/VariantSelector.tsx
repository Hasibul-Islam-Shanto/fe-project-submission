"use client";

import type { Product, Variant } from "@/types/product";
import {
  formatCurrency,
  getVariantOptionLabels,
  isInStock,
} from "@/utils/productHelper";

interface VariantSelectorProps {
  product: Product;
  variants: Variant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const VariantSelector = ({
  product,
  variants,
  selectedIndex,
  onSelect,
}: VariantSelectorProps) => {
  if (variants.length <= 1) return null;

  const labels = getVariantOptionLabels(product, variants.length);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-[var(--color-text-secondary)]">
        Select variant
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant, index) => {
          const isSelected = index === selectedIndex;
          const outOfStock = !isInStock(variant);

          return (
            <button
              key={variant.uid || variant.ebsItemCode || index}
              type="button"
              onClick={() => onSelect(index)}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-all duration-200 ${
                isSelected
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 ring-2 ring-[var(--color-brand)]/30"
                  : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-hover)]"
              }`}
            >
              <span className="block font-medium text-[var(--color-text-primary)]">
                {labels[index]}
              </span>
              <span className="block text-xs text-[var(--color-text-muted)]">
                {formatCurrency(variant.mrpPrice)}
              </span>
              <span
                className={`text-xs ${
                  outOfStock
                    ? "text-[var(--color-aurora-5)]"
                    : "text-[var(--color-aurora-4)]"
                }`}
              >
                {outOfStock ? "Out of stock" : `${variant.quantity} in stock`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VariantSelector;
