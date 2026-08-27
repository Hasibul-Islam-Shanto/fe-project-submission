import Link from "next/link";

const DEFAULT_MESSAGE =
  "Something went wrong on our end. Please check back later.";

interface ProductFetchErrorProps {
  title: string;
  message?: string;
  showHomeButton?: boolean;
  className?: string;
}

const ProductFetchError = ({
  title,
  message,
  showHomeButton = false,
  className = "",
}: ProductFetchErrorProps) => {
  return (
    <div
      className={`rounded-lg border border-dashed border-[var(--color-border)] px-4 py-8 text-center ${className}`}
    >
      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
        {title}
      </h3>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        {message ?? DEFAULT_MESSAGE}
      </p>

      {showHomeButton && (
        <Link
          href="/"
          className="mt-4 inline-flex rounded-xl border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-hover)]"
        >
          Back to home
        </Link>
      )}
    </div>
  );
};

export default ProductFetchError;
