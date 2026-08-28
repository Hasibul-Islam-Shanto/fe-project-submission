import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const CartEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-brand)]/10 ring-1 ring-[var(--color-brand)]/25">
        <ShoppingCart
          className="h-6 w-6 text-[var(--color-text-accent)]"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
        Your cart is empty
      </h3>
      <p className="mt-2 max-w-xs text-sm text-[var(--color-text-muted)]">
        Browse our products and add items to get started.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex rounded-xl bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
      >
        Browse products
      </Link>
    </div>
  );
};

export default CartEmpty;
