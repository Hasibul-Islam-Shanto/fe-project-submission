export const PRODUCT_CATEGORIES = [
  { id: "tv", label: "TVs & Displays" },
  { id: "refrigerator", label: "Refrigerators" },
  { id: "washing-machine", label: "Washing Machines" },
  { id: "ac", label: "Air Conditioners" },
  { id: "smartphone", label: "Smartphones" },
  { id: "laptop", label: "Laptops" },
  { id: "audio", label: "Audio & Headphones" },
  { id: "kitchen", label: "Kitchen Appliances" },
  { id: "printer", label: "Printers" },
] as const;

export const PRICE_RANGES = [
  { id: "under-20k", label: "Under ৳20,000", min: 0, max: 20000 },
  { id: "20k-50k", label: "৳20,000 – ৳50,000", min: 20000, max: 50000 },
  { id: "50k-100k", label: "৳50,000 – ৳100,000", min: 50000, max: 100000 },
  { id: "over-100k", label: "Over ৳100,000", min: 100000, max: null },
] as const;

export const AVAILABILITY_OPTIONS = [
  { id: "in-stock", label: "In Stock" },
  { id: "out-of-stock", label: "Out of Stock" },
] as const;

export const SORT_OPTIONS = [
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating-desc", label: "Rating: Highest First" },
  { id: "rating-asc", label: "Rating: Lowest First" },
] as const;

export type SortOptionId = (typeof SORT_OPTIONS)[number]["id"];
