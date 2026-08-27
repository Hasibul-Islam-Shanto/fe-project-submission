import Link from "next/link";

interface ProductBreadcrumbProps {
  productName: string;
}

const ProductBreadcrumb = ({ productName }: ProductBreadcrumbProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8"
    >
      <ol className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
        <li>
          <Link
            href="/products"
            className="font-medium text-[var(--color-text-accent)] underline-offset-4 hover:text-[var(--color-aurora-2)] hover:underline"
          >
            Products
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li
          className="truncate font-medium text-[var(--color-text-secondary)]"
          aria-current="page"
        >
          {productName}
        </li>
      </ol>
    </nav>
  );
};

export default ProductBreadcrumb;
