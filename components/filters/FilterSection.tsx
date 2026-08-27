import type { ReactNode } from "react";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

const FilterSection = ({ title, children }: FilterSectionProps) => {
  return (
    <section className="border-b border-[var(--color-border)] pb-5 last:border-b-0 last:pb-0">
      <h3 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">
        {title}
      </h3>
      {children}
    </section>
  );
};

export default FilterSection;
