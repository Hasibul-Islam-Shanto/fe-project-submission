import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AddCartItemInput, CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (input: AddCartItemInput) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (input) => {
        const quantity = input.quantity ?? 1;

        set((state) => {
          const existing = state.items.find((item) => item.id === input.id);

          if (existing) {
            const nextQuantity = Math.min(
              existing.quantity + quantity,
              input.maxQuantity,
            );

            return {
              items: state.items.map((item) =>
                item.id === input.id
                  ? {
                      ...item,
                      quantity: nextQuantity,
                      maxQuantity: input.maxQuantity,
                      sellingPrice: input.sellingPrice,
                      mrp: input.mrp,
                    }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...input,
                quantity: Math.min(quantity, input.maxQuantity),
              },
            ],
          };
        });
      },

      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== id) };
          }

          return {
            items: state.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: Math.min(quantity, item.maxQuantity),
                  }
                : item,
            ),
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      clearCart: () => set({ items: [] }),

      openDrawer: () => set({ isDrawerOpen: true }),

      closeDrawer: () => set({ isDrawerOpen: false }),
    }),
    {
      name: "tonmart-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function selectTotalItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function selectSubtotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0,
  );
}
