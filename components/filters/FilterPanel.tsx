"use client";

import { SlidersHorizontal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import FilterSection from "@/components/filters/FilterSection";
import type { ProductListFilters } from "@/types/productList";
import { DEFAULT_PRODUCT_LIST_FILTERS } from "@/types/productList";
import { isPriceRangeInvalid } from "@/utils/productFilters";

const PRICE_DEBOUNCE_MS = 600;

interface FilterPanelProps {
  filters: ProductListFilters;
  onFiltersChange: (filters: ProductListFilters) => void;
}

const inputClassName =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-border-hover)]";

const selectClassName =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-border-hover)]";

function parsePriceInput(value: string): number | null {
  if (value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

const FilterPanel = ({ filters, onFiltersChange }: FilterPanelProps) => {
  const [minInput, setMinInput] = useState(filters.minPrice?.toString() ?? "");
  const [maxInput, setMaxInput] = useState(filters.maxPrice?.toString() ?? "");
  const filtersRef = useRef(filters);

  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const parsedDraftMin = parsePriceInput(minInput);
  const parsedDraftMax = parsePriceInput(maxInput);
  const priceRangeInvalid = isPriceRangeInvalid({
    ...filters,
    minPrice: parsedDraftMin,
    maxPrice: parsedDraftMax,
  });

  const commitPriceFilters = useCallback(
    (minPrice: number | null, maxPrice: number | null) => {
      if (isPriceRangeInvalid({ ...filtersRef.current, minPrice, maxPrice })) {
        return;
      }

      const current = filtersRef.current;

      if (minPrice === current.minPrice && maxPrice === current.maxPrice) {
        return;
      }

      onFiltersChange({
        ...current,
        minPrice,
        maxPrice,
      });
    },
    [onFiltersChange],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      commitPriceFilters(parsedDraftMin, parsedDraftMax);
    }, PRICE_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [minInput, maxInput, parsedDraftMin, parsedDraftMax, commitPriceFilters]);

  const handlePriceBlur = () => {
    commitPriceFilters(parsedDraftMin, parsedDraftMax);
  };

  const handleClear = () => {
    setMinInput("");
    setMaxInput("");
    onFiltersChange({ ...DEFAULT_PRODUCT_LIST_FILTERS });
  };

  return (
    <div className="surface-card p-5">
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-[var(--color-text-accent)]" />
        <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
          Filters
        </h2>
      </div>

      <FilterSection title="Price Range">
        <div className="grid grid-cols-2 gap-2">
          <label className="space-y-1">
            <span className="text-xs text-[var(--color-text-muted)]">Min</span>
            <input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="0"
              value={minInput}
              onChange={(event) => setMinInput(event.target.value)}
              onBlur={handlePriceBlur}
              className={inputClassName}
              aria-invalid={priceRangeInvalid}
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs text-[var(--color-text-muted)]">Max</span>
            <input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="Any"
              value={maxInput}
              onChange={(event) => setMaxInput(event.target.value)}
              onBlur={handlePriceBlur}
              className={inputClassName}
              aria-invalid={priceRangeInvalid}
            />
          </label>
        </div>
        {priceRangeInvalid && (
          <p className="mt-2 text-xs text-[var(--color-aurora-5)]">
            Minimum price cannot exceed maximum price.
          </p>
        )}
      </FilterSection>

      <FilterSection title="Availability">
        <label className="block space-y-1">
          <span className="sr-only">Availability</span>
          <select
            value={filters.availability}
            onChange={(event) =>
              onFiltersChange({
                ...filters,
                availability: event.target
                  .value as ProductListFilters["availability"],
              })
            }
            className={selectClassName}
          >
            <option value="all">All products</option>
            <option value="in-stock">In stock</option>
            <option value="out-of-stock">Out of stock</option>
          </select>
        </label>
      </FilterSection>

      <button
        type="button"
        onClick={handleClear}
        className="mt-5 text-sm font-medium text-[var(--color-text-accent)] underline-offset-4 hover:underline"
      >
        Clear filters
      </button>
    </div>
  );
};

export default FilterPanel;
