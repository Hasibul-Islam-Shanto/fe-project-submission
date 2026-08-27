import Link from "next/link";
import { PackageOpen } from "lucide-react";

const DEFAULT_MESSAGE =
  "There are no products to show right now. Please check back later.";

interface ProductEmptyProps {
  title: string;
  message?: string;
  showBrowseLink?: boolean;
  className?: string;
}

const ProductEmpty = ({
  title,
  message,
  showBrowseLink = false,
  className = "",
}: ProductEmptyProps) => {
  return (
    <div
      className={`rounded-lg border border-dashed border-[var(--color-border)] px-6 py-10 text-center sm:px-8 sm:py-12 ${className}`}
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand)]/10 ring-1 ring-[var(--color-brand)]/25">
        <PackageOpen
          className="h-6 w-6 text-[var(--color-text-accent)]"
          aria-hidden="true"
        />
      </div>

      <h3 className="text-base font-semibold text-[var(--color-text-primary)] sm:text-lg">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[var(--color-text-muted)]">
        {message ?? DEFAULT_MESSAGE}
      </p>

      {showBrowseLink && (
        <Link
          href="/products"
          className="mt-5 inline-flex rounded-xl bg-[var(--color-brand)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110"
        >
          Browse products
        </Link>
      )}
    </div>
  );
};

export default ProductEmpty;
