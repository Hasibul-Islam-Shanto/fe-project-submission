export interface CartItem {
  id: string;
  productUid: string;
  variantUid: string;
  productName: string;
  variantLabel: string;
  hasMultipleVariants: boolean;
  imageUrl: string;
  sellingPrice: number;
  mrp: number;
  quantity: number;
  maxQuantity: number;
}

export type AddCartItemInput = Omit<CartItem, "quantity"> & {
  quantity?: number;
};
