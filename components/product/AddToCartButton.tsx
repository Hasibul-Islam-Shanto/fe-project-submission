"use client";

import { useOptimistic, useState, useTransition } from "react";
import type { AddCartItemInput } from "@/types/cart";
import { useCartStore } from "@/store/useCartStore";

interface AddToCartButtonProps {
  item: AddCartItemInput;
}

const AddToCartButton = ({ item }: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const actualQuantity = useCartStore(
    (state) =>
      state.items.find((cartItem) => cartItem.id === item.id)?.quantity ?? 0,
  );

  const [optimisticQuantity, incrementOptimisticQuantity] = useOptimistic(
    actualQuantity,
    (currentQuantity, amount: number) => currentQuantity + amount,
  );
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const outOfStock = item.maxQuantity <= 0;
  const maximumReached = optimisticQuantity >= item.maxQuantity;
  const isDisabled = outOfStock || maximumReached || isPending;

  const handleAddToCart = () => {
    if (outOfStock || maximumReached || isPending) return;

    setError(null);

    startTransition(async () => {
      incrementOptimisticQuantity(1);

      try {
        await new Promise((resolve) => window.setTimeout(resolve, 300));

        if (process.env.NEXT_PUBLIC_CART_MOCK_FAIL === "true") {
          throw new Error("Mock cart failure");
        }

        addItem(item);
      } catch {
        setError("Unable to add this item. Please try again.");
      }
    });
  };

  const getButtonLabel = () => {
    if (outOfStock) return "Out of Stock";
    if (isPending) return "Adding...";
    if (maximumReached) return "Maximum Added";
    if (optimisticQuantity > 0) {
      return optimisticQuantity === 1
        ? "Added"
        : `Added (${optimisticQuantity})`;
    }
    return "Add to Cart";
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isDisabled}
        className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
          isDisabled
            ? "cursor-not-allowed border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
            : "bg-[var(--color-brand)] text-white hover:brightness-110 hover:shadow-[0_0_24px_rgba(99,102,241,0.35)]"
        }`}
      >
        {getButtonLabel()}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-xs text-[var(--color-aurora-5)]">
          {error}
        </p>
      )}
    </div>
  );
};

export default AddToCartButton;
