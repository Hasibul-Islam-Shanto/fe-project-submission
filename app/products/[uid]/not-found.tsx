import Link from "next/link";

const ProductNotFound = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
        Product not found
      </h1>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        The product you are looking for does not exist.
      </p>
      <Link
        href="/products"
        className="mt-6 text-sm font-medium text-[var(--color-text-accent)] underline underline-offset-4 hover:text-[var(--color-aurora-2)]"
      >
        Back to products
      </Link>
    </div>
  );
};

export default ProductNotFound;
