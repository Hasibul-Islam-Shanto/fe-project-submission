export interface ProductListFilters {
  minPrice: number | null;
  maxPrice: number | null;
  availability: "all" | "in-stock" | "out-of-stock";
}

export type ProductSort = "default" | "price-asc" | "price-desc";

export interface ProductFilterInput {
  isActive?: boolean;
  uid?: string;
  posItemCode?: string;
}

export interface ProductListItem {
  uid: string;
  enName: string;
  images: { url: string }[];
  variants: ProductListVariant[];
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
  availability: "all",
};
