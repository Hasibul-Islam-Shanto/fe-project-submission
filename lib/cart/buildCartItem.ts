import type { CartItem } from "@/types/cart";
import type { Product, Variant } from "@/types/product";
import {
  getDisplayPrice,
  getVariantDisplayImages,
  getVariantOptionLabels,
} from "@/utils/productHelper";

function getVariantKey(variant: Variant, index: number): string {
  return variant.uid || variant.ebsItemCode || String(index);
}

export function buildCartItemId(
  productUid: string,
  variant: Variant,
  variantIndex: number,
): string {
  return `${productUid}:${getVariantKey(variant, variantIndex)}`;
}

export function buildCartItem(
  product: Product,
  variant: Variant,
  variantIndex: number,
): CartItem | null {
  if (product.variants.length === 0 || !variant) {
    return null;
  }

  const hasMultipleVariants = product.variants.length > 1;
  const variantLabel = hasMultipleVariants
    ? (getVariantOptionLabels(product, product.variants.length)[variantIndex] ??
      "")
    : "";

  const images = getVariantDisplayImages(variant, product);
  const { mrp, sellingPrice } = getDisplayPrice(variant);
  const variantKey = getVariantKey(variant, variantIndex);

  return {
    id: buildCartItemId(product.uid, variant, variantIndex),
    productUid: product.uid,
    variantUid: variantKey,
    productName: product.enName,
    variantLabel,
    hasMultipleVariants,
    imageUrl: images[0]?.url ?? "",
    sellingPrice,
    mrp,
    quantity: 1,
    maxQuantity: Math.max(0, variant.quantity),
  };
}
