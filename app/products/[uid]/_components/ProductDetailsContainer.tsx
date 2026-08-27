"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { buildProductTabs } from "@/utils/buildProductTab";
import {
  getDefaultVariantIndex,
  getVariantDisplayImages,
  isInStock,
} from "@/utils/productHelper";
import LabeledInfoSection from "./LabeledInfoSection";
import ImageGallery from "./ImageGallery";
import PriceDisplay from "./PriceDisplay";
import VariantSelector from "./VariantSelector";
import TabsContainer from "./TabsContainer";

interface ProductDetailsContainerProps {
  product: Product;
}

const ProductDetailsContainer = ({ product }: ProductDetailsContainerProps) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(() =>
    getDefaultVariantIndex(product.variants),
  );
  const selectedVariant =
    product.variants[selectedVariantIndex] ?? product.variants[0];

  if (!selectedVariant) return null;

  const outOfStock = !isInStock(selectedVariant);
  const displayImages = getVariantDisplayImages(selectedVariant, product);

  const tabs = buildProductTabs(product).map((tab) => ({
    id: tab.id,
    label: tab.label,
    content: <LabeledInfoSection items={tab.sections} />,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <ImageGallery
          key={selectedVariant.uid || selectedVariantIndex}
          images={displayImages}
          productName={product.enName}
        />

        <div className="animate-fade-in space-y-6">
          <h1 className="text-2xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-3xl">
            {product.enName}
          </h1>

          <PriceDisplay variant={selectedVariant} />

          <VariantSelector
            product={product}
            variants={product.variants}
            selectedIndex={selectedVariantIndex}
            onSelect={setSelectedVariantIndex}
          />

          <button
            type="button"
            disabled={outOfStock}
            className={`w-full rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200 sm:w-auto ${
              outOfStock
                ? "cursor-not-allowed border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]"
                : "bg-[var(--color-brand)] text-white hover:brightness-110 hover:shadow-[0_0_24px_rgba(99,102,241,0.35)]"
            }`}
          >
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>

      <div className="mt-12">
        <TabsContainer tabs={tabs} />
      </div>
    </div>
  );
};

export default ProductDetailsContainer;
