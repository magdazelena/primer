import type { Metadata } from "next";
import ProductView from "../../views/product";
import { getSEOData } from "@/api/requests/getSEOData";
import { getProductBySlug } from "@/api/requests/get-product-by-slug";
import { getProductSlugAndCategoryList } from "@/api/requests/get-product-list";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const seoData = await getSEOData('/products',params.slug);

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
  };
}

export default async function ProductRoute(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const products = await getProductBySlug(slug);
  if (products.length === 0) return <h2>no post found</h2>;
  return <ProductView data={products[0]} />;
}

export async function generateStaticParams() {
  return (await getProductSlugAndCategoryList())
}
