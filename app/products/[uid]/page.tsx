import {
  fetchProductByUid,
  ProductNotFoundError,
} from "@/lib/graphql/api/productDetail";
import type { Product } from "@/types/product";
import { notFound } from "next/navigation";
import ProductBreadcrumb from "./_components/ProductBreadcrumb";
import ProductDetailsContainer from "./_components/ProductDetailsContainer";

interface ProductDetailPageProps {
  params: Promise<{ uid: string }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { uid } = await params;
  let product: Product;

  try {
    product = await fetchProductByUid(uid);
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      notFound();
    }

    throw error;
  }

  return (
    <>
      <ProductBreadcrumb productName={product.enName} />
      <ProductDetailsContainer product={product} />
    </>
  );
};

export default ProductDetailPage;
