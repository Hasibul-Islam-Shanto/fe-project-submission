"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import ProductFilters from "@/components/filters/ProductFilters";
import ProductSort from "@/components/filters/ProductSort";

interface ProductToolbarProps {
  totalCount: number;
}

const ProductToolbar = ({ totalCount }: ProductToolbarProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Showing{" "}
          <span className="font-semibold text-[var(--color-text-primary)]">
            {totalCount}
          </span>{" "}
          products
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 text-[var(--color-text-accent)]" />
            Filters
          </button>
          <ProductSort />
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filter overlay"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-[var(--color-bg-primary)]/70 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 shadow-[var(--glass-shadow)]">
            <ProductFilters
              showClose
              onClose={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductToolbar;
