"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { Check, Loader2, X } from "lucide-react";
import CartEmpty from "@/components/cart/CartEmpty";
import CartItem from "@/components/cart/CartItem";
import {
  selectSubtotal,
  selectTotalItems,
  useCartStore,
} from "@/store/useCartStore";
import { formatCurrency } from "@/utils/productHelper";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

type CheckoutStatus = "idle" | "loading" | "success";

const subscribe = () => () => {};
const DRAWER_TRANSITION_MS = 300;
const CHECKOUT_LOADING_MS = 1500;
const CHECKOUT_SUCCESS_MS = 1200;

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const router = useRouter();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>("idle");
  const checkoutTimersRef = useRef<number[]>([]);

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = selectTotalItems(items);
  const subtotal = selectSubtotal(items);
  const isCheckingOut = checkoutStatus !== "idle";

  const clearCheckoutTimers = () => {
    checkoutTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    checkoutTimersRef.current = [];
  };

  useEffect(() => {
    return () => clearCheckoutTimers();
  }, []);

  useEffect(() => {
    if (isOpen) return;

    clearCheckoutTimers();
    const frame = requestAnimationFrame(() => setCheckoutStatus("idle"));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const openFrame = requestAnimationFrame(() => {
        setShouldRender(true);
        requestAnimationFrame(() => setIsVisible(true));
      });
      return () => cancelAnimationFrame(openFrame);
    }

    const closeFrame = requestAnimationFrame(() => setIsVisible(false));
    const timer = window.setTimeout(
      () => setShouldRender(false),
      DRAWER_TRANSITION_MS,
    );

    return () => {
      cancelAnimationFrame(closeFrame);
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!shouldRender) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isCheckingOut) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [shouldRender, onClose, isCheckingOut]);

  const handleCheckout = () => {
    if (checkoutStatus !== "idle" || items.length === 0) return;

    setCheckoutStatus("loading");

    const loadingTimer = window.setTimeout(() => {
      setCheckoutStatus("success");

      const successTimer = window.setTimeout(() => {
        clearCart();
        onClose();
        router.push("/products");
        setCheckoutStatus("idle");
      }, CHECKOUT_SUCCESS_MS);

      checkoutTimersRef.current.push(successTimer);
    }, CHECKOUT_LOADING_MS);

    checkoutTimersRef.current.push(loadingTimer);
  };

  if (!shouldRender || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close cart overlay"
        onClick={() => {
          if (!isCheckingOut) onClose();
        }}
        className={`absolute inset-0 bg-[var(--color-bg-primary)]/70 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isCheckingOut ? "cursor-default" : ""}`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-dvh w-full max-w-md flex-col border-l border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-[var(--glass-shadow)] transition-transform duration-300 ease-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              Your Cart
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isCheckingOut}
            aria-label="Close cart"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <CartEmpty />
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id}>
                  <CartItem item={item} />
                </li>
              ))}
            </ul>
          )}

          {isCheckingOut && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-secondary)]/95 px-6 text-center backdrop-blur-sm">
              {checkoutStatus === "loading" ? (
                <>
                  <Loader2 className="h-10 w-10 animate-spin text-[var(--color-brand)]" />
                  <p className="mt-4 text-sm font-medium text-[var(--color-text-secondary)]">
                    Processing checkout...
                  </p>
                </>
              ) : (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-aurora-4)]/20 ring-2 ring-[var(--color-aurora-4)]/40">
                    <Check className="h-8 w-8 text-[var(--color-aurora-4)]" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-[var(--color-text-primary)]">
                    Checkout complete!
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                    Redirecting to products...
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="shrink-0 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-5 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-[var(--color-text-secondary)]">
                Subtotal
              </span>
              <span className="text-lg font-bold text-[var(--color-text-primary)]">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={clearCart}
                disabled={isCheckingOut}
                className="flex-1 rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Clear cart
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-brand)] px-4 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_0_24px_rgba(99,102,241,0.35)] disabled:cursor-not-allowed disabled:opacity-90"
              >
                {checkoutStatus === "loading" && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                )}
                {checkoutStatus === "success" && (
                  <>
                    <Check className="h-4 w-4" />
                    Complete!
                  </>
                )}
                {checkoutStatus === "idle" && "Checkout"}
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>,
    document.body,
  );
};

export default CartDrawer;
