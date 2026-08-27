export interface ProductFilterInput {
  [key: string]: unknown;
}

export interface ProductListItem {
  uid: string;
  enName: string;
  images: { url: string }[];
  variants: ProductListVariant[];
}

export interface ProductListVariant {
  mrpPrice: number;
  quantity: number;
  discount: {
    amount: number;
    value: number;
    type: "PERCENTAGE" | "FLAT";
  } | null;
}
