import type { LabeledSection, Product, Variant } from "../types/product";
import type { ProductListItem, ProductListVariant } from "../types/productList";

function asArray<T>(value: T[] | null | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

export function normalizeImages(
  raw: Array<{ url?: string | null } | null> | null | undefined,
): { url: string }[] {
  return asArray(raw)
    .filter((image): image is NonNullable<typeof image> => image != null)
    .map((image) => ({ url: image.url ?? "" }))
    .filter((image) => image.url !== "");
}

function normalizeSectionValues(
  raw: Array<{ enName?: string | null } | null> | null | undefined,
): { enName: string }[] {
  return asArray(raw)
    .filter((value): value is NonNullable<typeof value> => value != null)
    .map((value) => ({ enName: value.enName ?? "" }));
}

export function normalizeSections(
  raw:
    | Array<{ enLabel?: string | null; values?: unknown } | null>
    | null
    | undefined,
): LabeledSection[] {
  return asArray(raw)
    .filter(
      (section): section is NonNullable<typeof section> => section != null,
    )
    .map((section) => ({
      enLabel: section.enLabel ?? "",
      values: normalizeSectionValues(
        section.values as
          Array<{ enName?: string | null } | null> | null | undefined,
      ),
    }));
}

function normalizeMrpPrice(raw: unknown): number {
  const mrpPrice = typeof raw === "number" && Number.isFinite(raw) ? raw : 0;
  return Math.max(0, mrpPrice);
}

function normalizeVariant(raw: unknown): Variant {
  const variant = (raw ?? {}) as Partial<Variant> & {
    images?: Array<{ url?: string | null } | null> | null;
  };
  const mrpPrice = normalizeMrpPrice(variant.mrpPrice);

  return {
    uid: variant.uid ?? "",
    mrpPrice,
    ebsItemCode: variant.ebsItemCode ?? "",
    posItemCode: variant.posItemCode ?? "",
    quantity: variant.quantity ?? 0,
    images: normalizeImages(variant.images),
    discount: mrpPrice > 0 ? (variant.discount ?? null) : null,
  };
}

function normalizeListVariant(raw: unknown): ProductListVariant {
  const variant = (raw ?? {}) as Partial<ProductListVariant>;
  const mrpPrice = normalizeMrpPrice(variant.mrpPrice);

  return {
    mrpPrice,
    quantity: variant.quantity ?? 0,
    discount: mrpPrice > 0 ? (variant.discount ?? null) : null,
  };
}

export function normalizeProduct(raw: unknown): Product {
  const product = (raw ?? {}) as Partial<Product> & {
    images?: Array<{ url?: string | null } | null> | null;
    productAttributes?: unknown;
    detailedDescriptions?: unknown;
    deliveries?: unknown;
    serviceAndDeliveries?: unknown;
    priceAndStocks?: unknown;
    variants?: unknown[] | null;
  };

  return {
    uid: product.uid ?? "",
    enName: product.enName ?? "",
    images: normalizeImages(product.images),
    productAttributes: normalizeSections(product.productAttributes),
    detailedDescriptions: normalizeSections(product.detailedDescriptions),
    deliveries: normalizeSections(product.deliveries),
    serviceAndDeliveries: normalizeSections(product.serviceAndDeliveries),
    priceAndStocks: normalizeSections(product.priceAndStocks),
    variants: asArray(product.variants)
      .filter((variant) => variant != null)
      .map(normalizeVariant),
  };
}

export function normalizeProductListItem(raw: unknown): ProductListItem {
  const product = (raw ?? {}) as Partial<ProductListItem> & {
    images?: Array<{ url?: string | null } | null> | null;
    variants?: unknown[] | null;
  };

  return {
    uid: product.uid ?? "",
    enName: product.enName ?? "",
    images: normalizeImages(product.images),
    variants: asArray(product.variants)
      .filter((variant) => variant != null)
      .map(normalizeListVariant),
  };
}
