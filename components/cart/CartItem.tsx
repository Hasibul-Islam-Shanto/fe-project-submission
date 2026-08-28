"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types/cart";
import { formatCurrency } from "@/utils/productHelper";
import { useCartStore } from "@/store/useCartStore";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const atMax = item.quantity >= item.maxQuantity;

  return (
    <div className="flex gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-3">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--color-bg-tertiary)]">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.productName}
            fill
            sizes="80px"
            className="object-contain p-1"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[var(--color-text-muted)]">
            No image
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
              {item.productName}
            </p>
            {item.hasMultipleVariants && item.variantLabel && (
              <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                {item.variantLabel}
              </p>
            )}
            <p className="mt-1 text-sm font-semibold text-[var(--color-text-accent)]">
              {formatCurrency(item.sellingPrice)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.productName} from cart`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-aurora-5)]"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>

          <span className="min-w-[2rem] text-center text-sm font-medium text-[var(--color-text-primary)]">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={atMax}
            aria-label="Increase quantity"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
