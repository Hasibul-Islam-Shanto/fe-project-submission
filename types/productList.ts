export interface ProductFilterInput {
  isActive?: boolean | null;
  uid?: string;
  posItemCode?: string;
  [key: string]: unknown;
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
