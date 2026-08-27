"use client";

import { useState } from "react";
import { PRODUCT_CATEGORIES } from "@/lib/filters/constants";
import FilterSection from "@/components/filters/FilterSection";

const CategoryFilter = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <FilterSection title="Category">
      <div className="flex flex-col gap-2">
        {PRODUCT_CATEGORIES.map((category) => {
          const isActive = selected.includes(category.id);
          return (
            <label
              key={category.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${
                isActive
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10"
                  : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-hover)]"
              }`}
            >
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => toggle(category.id)}
                className="h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-brand)]"
              />
              <span
                className={
                  isActive
                    ? "font-medium text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)]"
                }
              >
                {category.label}
              </span>
            </label>
          );
        })}
      </div>
    </FilterSection>
  );
};

export default CategoryFilter;
