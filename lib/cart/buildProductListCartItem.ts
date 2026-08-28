import { buildCartItemId } from "@/lib/cart/buildCartItem";
import type { AddCartItemInput } from "@/types/cart";
import type { Variant } from "@/types/product";
import type { ProductListItem, ProductListVariant } from "@/types/productList";
import { getDefaultVariantIndex, getDisplayPrice } from "@/utils/productHelper";

export function buildProductListCartItem(
  product: ProductListItem,
  variant: ProductListVariant,
): AddCartItemInput | null {
  if (product.variants.length === 0 || !variant) {
    return null;
  }

  const variantIndex = getDefaultVariantIndex(product.variants);
  const { mrp, sellingPrice } = getDisplayPrice(variant);
  const variantKey = variant.uid || variant.ebsItemCode || String(variantIndex);

  return {
    id: buildCartItemId(product.uid, variant as Variant, variantIndex),
    productUid: product.uid,
    variantUid: variantKey,
    productName: product.enName,
    variantLabel: "",
    hasMultipleVariants: product.variants.length > 1,
    imageUrl: product.images[0]?.url ?? "",
    sellingPrice,
    mrp,
    maxQuantity: Math.max(0, variant.quantity),
  };
}
