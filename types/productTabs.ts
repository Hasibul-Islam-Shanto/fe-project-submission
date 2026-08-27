import type { LabeledSection } from "./product";

export type ProductTabId =
  "basic" | "detailed" | "terms" | "warranty" | "features";

export interface ProductTab {
  id: ProductTabId;
  label: string;
  sections: LabeledSection[];
}
