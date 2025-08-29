import { notFound } from "next/navigation";
import { fetchProduct } from "@/lib/api";
import ProductDetail from "./ProductDetail";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const product = await fetchProduct(params.id);
    return <ProductDetail product={product} />;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  // Generate static paths for the first 20 products
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }));
}
