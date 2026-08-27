import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProductEmpty from "@/components/product/ProductEmpty";
import ProductFetchError from "@/components/product/ProductFetchError";
import { fetchProductsList } from "@/lib/graphql/queries/productsList";
import type { ProductListItem } from "@/types/productList";

const FeaturedProductsSection = async () => {
  let products: ProductListItem[] | null = null;
  let fetchError: string | null = null;

  try {
    const result = await fetchProductsList({ skip: 0, limit: 6 });
    products = result.products;
  } catch (error) {
    fetchError =
      error instanceof Error
        ? error.message
        : "Something went wrong while fetching featured products.";
  }

  if (fetchError) {
    return <ProductFetchError title="Featured Products" message={fetchError} />;
  }

  if (!products || products.length === 0) {
    return (
      <ProductEmpty
        title="No featured products"
        message="We don't have any featured picks at the moment. New items are added regularly."
        showBrowseLink
      />
    );
  }

  return <FeaturedProducts products={products} />;
};

export default FeaturedProductsSection;
