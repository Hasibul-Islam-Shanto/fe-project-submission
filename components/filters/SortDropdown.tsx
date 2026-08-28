"use client";

import { ArrowDownUp, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ProductSort } from "@/types/productList";

const SORT_OPTIONS = [
  { value: "default" as const, label: "Default" },
  { value: "price-asc" as const, label: "Price: Low to High" },
  { value: "price-desc" as const, label: "Price: High to Low" },
];

interface SortDropdownProps {
  value: ProductSort;
  onChange: (value: ProductSort) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    SORT_OPTIONS.find((option) => option.value === value)?.label ?? "Default";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)]"
      >
        <ArrowDownUp className="h-4 w-4 text-[var(--color-text-accent)]" />
        <span className="hidden sm:inline">{selectedLabel}</span>
        <span className="sm:hidden">Sort</span>
        <ChevronDown
          className={`h-4 w-4 text-[var(--color-text-muted)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label="Sort products"
          className="absolute right-0 z-20 mt-2 min-w-[220px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-1 shadow-[var(--glass-shadow)]"
        >
          {SORT_OPTIONS.map((option) => {
            const isActive = value === option.value;

            return (
              <li key={option.value} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-[var(--color-brand)]/10 font-medium text-[var(--color-text-accent)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
