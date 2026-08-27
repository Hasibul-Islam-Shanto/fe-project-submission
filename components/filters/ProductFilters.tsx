"use client";

import { SlidersHorizontal, X } from "lucide-react";
import AvailabilityFilter from "@/components/filters/AvailabilityFilter";
import CategoryFilter from "@/components/filters/CategoryFilter";
import PriceFilter from "@/components/filters/PriceFilter";

interface ProductFiltersProps {
  onClose?: () => void;
  showClose?: boolean;
}

const ProductFilters = ({
  onClose,
  showClose = false,
}: ProductFiltersProps) => {
  return (
    <div className="surface-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[var(--color-text-accent)]" />
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            Filters
          </h2>
        </div>
        {showClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-5">
        <PriceFilter />
        <CategoryFilter />
        <AvailabilityFilter />
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-lg border border-[var(--color-border)] py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
      >
        Clear all filters
      </button>
    </div>
  );
};

export default ProductFilters;
