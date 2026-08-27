import ProductDetailContent from "@/components/product/ProductDetailContent";
import { fetchProductByUid } from "@/lib/graphql/api/productDetail";
import { notFound } from "next/navigation";

interface ProductDetailPageProps {
  params: Promise<{ uid: string }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { uid } = await params;

  let product;
  try {
    product = await fetchProductByUid(uid);
  } catch {
    notFound();
  }

  return <ProductDetailContent product={product} />;
};

export default ProductDetailPage;
