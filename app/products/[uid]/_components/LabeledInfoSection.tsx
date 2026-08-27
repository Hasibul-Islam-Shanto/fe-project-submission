import type { LabeledSection } from "@/types/product";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

interface LabeledInfoSectionProps {
  items: LabeledSection[];
}

const LabeledInfoSection = ({ items }: LabeledInfoSectionProps) => {
  const filtered = items.filter((item) => item.values.length > 0);

  if (filtered.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
        No information available
      </p>
    );
  }

  return (
    <dl className="space-y-4">
      {filtered.map((item) => (
        <div
          key={item.enLabel}
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4"
        >
          <dt className="mb-2 text-sm font-semibold text-[var(--color-text-accent)]">
            {item.enLabel}
          </dt>
          <dd className="space-y-1 text-sm text-[var(--color-text-secondary)]">
            {item.values.map((value, index) => (
              <div
                key={`${item.enLabel}-${index}`}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(value.enName),
                }}
              />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default LabeledInfoSection;
