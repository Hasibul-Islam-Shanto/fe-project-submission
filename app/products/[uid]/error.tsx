"use client";

import { ProductFetchError } from "@/components/product";

const ProductDetailError = () => {
  return (
    <div className="mx-auto max-w-lg px-4 py-24">
      <ProductFetchError title="Product details" showHomeButton />
    </div>
  );
};

export default ProductDetailError;
