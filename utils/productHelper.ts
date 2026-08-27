import type { Product, Variant } from "../types/product";
import type { ProductListVariant } from "../types/productList";

const EMPTY_VARIANT: Variant = {
  uid: "",
  mrpPrice: 0,
  ebsItemCode: "",
  posItemCode: "",
  quantity: 0,
  images: [],
  discount: null,
};

export function getPrimaryVariant(product: {
  variants: Array<Variant | ProductListVariant>;
}): Variant | ProductListVariant {
  return (
    product.variants[getDefaultVariantIndex(product.variants)] ?? EMPTY_VARIANT
  );
}

export function getDefaultVariantIndex(
  variants: Array<Variant | ProductListVariant>,
): number {
  const inStockIndex = variants.findIndex((variant) => variant.quantity > 0);
  return inStockIndex >= 0 ? inStockIndex : 0;
}

export function getVariantOptionLabels(
  product: Product,
  variantCount: number,
): string[] {
  const colorSection = product.productAttributes.find(
    (section) => section.enLabel.trim().toLowerCase() === "color",
  );
  const raw = colorSection?.values[0]?.enName?.trim();

  if (raw) {
    const labels = raw
      .split(",")
      .map((label) => label.trim())
      .filter(Boolean);
    if (labels.length === variantCount) return labels;
  }

  return Array.from(
    { length: variantCount },
    (_, index) => `Option ${index + 1}`,
  );
}

export function getVariantDisplayImages(
  variant: Variant,
  product: Pick<Product, "images">,
): { url: string }[] {
  if (variant.images.length > 0) return variant.images;
  return product.images;
}

export function isInStock(variant: Variant | ProductListVariant): boolean {
  return variant.quantity > 0;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);
}

function isValidDiscountPercent(value: number): boolean {
  return Number.isFinite(value) && value > 0 && value <= 100;
}

function resolveDiscountPercent(raw: number, derived: number): number | null {
  if (isValidDiscountPercent(raw)) return raw;
  if (isValidDiscountPercent(derived)) return derived;
  return null;
}

export function getDisplayPrice(variant: Variant | ProductListVariant): {
  mrp: number;
  sellingPrice: number;
  discountPercent: number | null;
} {
  const mrp = Math.max(0, variant.mrpPrice);

  if (
    mrp <= 0 ||
    !variant.discount ||
    variant.discount.type === "NOT_AVAILABLE" ||
    variant.discount.amount <= 0
  ) {
    return { mrp, sellingPrice: mrp, discountPercent: null };
  }

  const sellingPrice = Math.max(0, mrp - variant.discount.amount);

  if (sellingPrice >= mrp) {
    return { mrp, sellingPrice: mrp, discountPercent: null };
  }

  const derivedPercent = Math.round(((mrp - sellingPrice) / mrp) * 100);
  const rawPercent =
    variant.discount.type === "PERCENTAGE"
      ? variant.discount.value
      : Math.round((variant.discount.amount / mrp) * 100);

  const discountPercent = resolveDiscountPercent(rawPercent, derivedPercent);

  return { mrp, sellingPrice, discountPercent };
}
