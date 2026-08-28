"use client";

import { useSyncExternalStore } from "react";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "@/components/cart/CartDrawer";
import { selectTotalItems, useCartStore } from "@/store/useCartStore";

const subscribe = () => () => {};

const CartButton = () => {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const items = useCartStore((state) => state.items);
  const isDrawerOpen = useCartStore((state) => state.isDrawerOpen);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const closeDrawer = useCartStore((state) => state.closeDrawer);

  const totalItems = selectTotalItems(items);

  return (
    <>
      <button
        type="button"
        onClick={openDrawer}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-all duration-200 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
        aria-label={`Shopping cart${mounted && totalItems > 0 ? `, ${totalItems} items` : ""}`}
      >
        <ShoppingCart className="h-[1.125rem] w-[1.125rem]" />
        {mounted && totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-[var(--color-brand)] px-1 text-[10px] font-bold text-white ring-2 ring-[var(--color-bg-primary)]">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </button>

      <CartDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default CartButton;
