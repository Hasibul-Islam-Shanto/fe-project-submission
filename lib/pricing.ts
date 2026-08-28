import type { ProductListItem } from "@/types/productList";
import { getDisplayPrice, getPrimaryVariant } from "@/utils/productHelper";

export function getPricing(product: ProductListItem): {
  sellingPrice: number;
  mrp: number;
} {
  const variant = getPrimaryVariant(product);
  const { sellingPrice, mrp } = getDisplayPrice(variant);

  return { sellingPrice, mrp };
}
