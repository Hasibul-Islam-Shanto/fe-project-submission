"use client";

import { ProductFetchError } from "@/components/ui";

const ProductsError = () => {
  return (
    <div className="mx-auto max-w-lg px-4 py-24">
      <ProductFetchError title="Products" showHomeButton />
    </div>
  );
};

export default ProductsError;
