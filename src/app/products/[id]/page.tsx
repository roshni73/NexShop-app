import { notFound } from "next/navigation";
import { fetchProduct } from "@/lib/api";
import ProductDetail from "./ProductDetail";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProduct(params.id);
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}

export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }));
}
