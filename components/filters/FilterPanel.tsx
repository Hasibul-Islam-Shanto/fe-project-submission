"use client";

import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import FilterSection from "@/components/filters/FilterSection";

export type PriceRange = {
  min: number | null;
  max: number | null;
};

interface FilterPanelProps {
  priceRange: PriceRange;
  onPriceRangeChange: (range: PriceRange) => void;
}

const inputClassName =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-border-hover)]";

const FilterPanel = ({
  priceRange,
  onPriceRangeChange,
}: FilterPanelProps) => {
  const [minInput, setMinInput] = useState(priceRange.min?.toString() ?? "");
  const [maxInput, setMaxInput] = useState(priceRange.max?.toString() ?? "");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const min = minInput.trim() === "" ? null : Number(minInput);
      const max = maxInput.trim() === "" ? null : Number(maxInput);
      const parsedMin = min !== null && Number.isFinite(min) ? min : null;
      const parsedMax = max !== null && Number.isFinite(max) ? max : null;

      if (parsedMin === priceRange.min && parsedMax === priceRange.max) {
        return;
      }

      onPriceRangeChange({ min: parsedMin, max: parsedMax });
    }, 400);

    return () => window.clearTimeout(timer);
  }, [minInput, maxInput, onPriceRangeChange, priceRange.min, priceRange.max]);

  const handleClear = () => {
    setMinInput("");
    setMaxInput("");
    onPriceRangeChange({ min: null, max: null });
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
              className={inputClassName}
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
              className={inputClassName}
            />
          </label>
        </div>
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
