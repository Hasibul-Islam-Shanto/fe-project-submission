"use client";

import { useState } from "react";
import { AVAILABILITY_OPTIONS } from "@/lib/filters/constants";
import FilterSection from "@/components/filters/FilterSection";

const AvailabilityFilter = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <FilterSection title="Availability">
      <div className="flex flex-wrap gap-2">
        {AVAILABILITY_OPTIONS.map((option) => {
          const isActive = selected.includes(option.id);
          const isInStock = option.id === "in-stock";

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggle(option.id)}
              aria-pressed={isActive}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? isInStock
                    ? "border-[var(--color-aurora-4)]/50 bg-[var(--color-aurora-4)]/15 text-[var(--color-aurora-4)]"
                    : "border-[var(--color-aurora-5)]/50 bg-[var(--color-aurora-5)]/15 text-[var(--color-aurora-5)]"
                  : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </FilterSection>
  );
};

export default AvailabilityFilter;
