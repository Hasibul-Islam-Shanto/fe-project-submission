export interface ProductListFilters {
  minPrice: number | null;
  maxPrice: number | null;
  categoryUid: string | null;
  availability: "all" | "in-stock" | "out-of-stock";
}

export type ProductSort =
  "default" | "price-asc" | "price-desc" | "rating-asc" | "rating-desc";

export interface ProductFilterInput {
  isActive?: boolean;
  uid?: string;
  posItemCode?: string;
  categoryUid?: string;
}

export type ProductStockSort = "PRICE_LOW_TO_HIGH" | "PRICE_HIGH_TO_LOW";

export interface ProductListCategory {
  uid: string;
  enName: string;
}

export interface ProductListRating {
  average: number;
}

export interface ProductListItem {
  uid: string;
  enName: string;
  images: { url: string }[];
  variants: ProductListVariant[];
  category?: ProductListCategory | null;
  rating?: ProductListRating | null;
}

export interface ProductListVariant {
  uid: string;
  ebsItemCode: string;
  mrpPrice: number;
  quantity: number;
  discount: {
    amount: number;
    value: number;
    type: "PERCENTAGE" | "FLAT" | "NOT_AVAILABLE";
  } | null;
}

export const DEFAULT_PRODUCT_LIST_FILTERS: ProductListFilters = {
  minPrice: null,
  maxPrice: null,
  categoryUid: null,
  availability: "all",
};
