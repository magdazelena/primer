import { getProductBySlug } from "@/api/requests/get-product-by-slug";
import { getProductSlugAndCategoryList } from "@/api/requests/get-product-list";
import { fetchProductsAndSeries } from "@/api/requests/get-products-by-series";
import { getSEOData } from "@/api/requests/getSEOData";

import { ProductView } from "../../views/product";
import { ProductList } from "../../views/product-list";

import type { Product } from "@/types/product";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const seoData = await getSEOData("/products", params.slug);

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
  };
}

const ProductRoute = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const params = await props.params;
  const { slug } = params;
  const products = await getProductBySlug(slug);
  if (products.length === 0) return <h2>no post found</h2>;
  const product = products[0];
  if (!product.series) {
    return <ProductView data={product} />;
  }
  const productsOfSeries = await getOtherProductsOfSeries(product);
  if (productsOfSeries.length === 0) return <ProductView data={product} />;
  return (
    <>
      <ProductView data={product} />
      <div className="container p-8 mx-auto space-y-6 sm:space-y-12">
        <h2 className="text-2xl font-bold">
          {productsOfSeries.length} more product
          {productsOfSeries.length > 1 ? "s" : ""} available in series{" "}
          {product.series?.name}:
        </h2>
        <ProductList products={productsOfSeries} />
      </div>
    </>
  );
};

export async function generateStaticParams() {
  return getProductSlugAndCategoryList();
}

async function getOtherProductsOfSeries(product: Product): Promise<Product[]> {
  const products = await fetchProductsAndSeries(product.series!.slug);
  return products.products.filter((p: Product) => p.id !== product.id);
}

export default ProductRoute;