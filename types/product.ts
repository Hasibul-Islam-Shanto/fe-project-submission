export interface Product {
  uid: string;
  enName: string;
  images: { url: string }[];
  productAttributes: LabeledSection[];
  detailedDescriptions: LabeledSection[];
  deliveries: LabeledSection[];
  serviceAndDeliveries: LabeledSection[];
  priceAndStocks: LabeledSection[];
  variants: Variant[];
}

export interface LabeledSection {
  enLabel: string;
  values: { enName: string }[];
}

export interface Variant {
  uid: string;
  mrpPrice: number;
  ebsItemCode: string;
  posItemCode: string;
  quantity: number;
  images: { url: string }[];
  discount: {
    amount: number;
    value: number;
    type: "PERCENTAGE" | "FLAT" | "NOT_AVAILABLE";
  } | null;
}
