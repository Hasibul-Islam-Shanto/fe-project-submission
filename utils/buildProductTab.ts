import type { LabeledSection } from "../types/product";
import type { Product } from "../types/product";
import type { ProductTab } from "../types/productTabs";

function filterSections(sections: LabeledSection[]): LabeledSection[] {
  return sections
    .map((section) => ({
      ...section,
      values: section.values.filter((value) => value.enName.trim() !== ""),
    }))
    .filter((section) => section.values.length > 0);
}

export function buildProductTabs(product: Product): ProductTab[] {
  const tabs: ProductTab[] = [
    {
      id: "basic",
      label: "Basic Information",
      sections: filterSections(product.productAttributes),
    },
    {
      id: "detailed",
      label: "Detailed Information",
      sections: filterSections(product.detailedDescriptions),
    },
    {
      id: "terms",
      label: "Terms & Conditions",
      sections: filterSections(product.deliveries),
    },
    {
      id: "warranty",
      label: "Warranty Information",
      sections: filterSections(product.serviceAndDeliveries),
    },
    {
      id: "features",
      label: "Special Features",
      sections: filterSections(product.priceAndStocks),
    },
  ];

  return tabs.filter((tab) => tab.sections.length > 0);
}
