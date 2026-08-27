"use client";

import { useState } from "react";
import { PRICE_RANGES } from "@/lib/filters/constants";
import FilterSection from "@/components/filters/FilterSection";

const PriceFilter = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <FilterSection title="Price">
      <div className="flex flex-col gap-2">
        {PRICE_RANGES.map((range) => {
          const isActive = selected.includes(range.id);
          return (
            <button
              key={range.id}
              type="button"
              onClick={() => toggle(range.id)}
              aria-pressed={isActive}
              className={`rounded-lg border px-3 py-2 text-left text-sm transition-all duration-200 ${
                isActive
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-[var(--color-text-primary)] ring-1 ring-[var(--color-brand)]/30"
                  : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              {range.label}
            </button>
          );
        })}
      </div>
    </FilterSection>
  );
};

export default PriceFilter;
