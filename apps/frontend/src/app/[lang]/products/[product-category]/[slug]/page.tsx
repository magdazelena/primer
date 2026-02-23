import { getProductBySlug } from "@/api/requests/get-product-by-slug";
import { getProductSlugAndCategoryList } from "@/api/requests/get-product-list";
import { fetchProductsAndSeries } from "@/api/requests/get-products-by-series";
import { getSEOData } from "@/api/requests/getSEOData";
import { fetchSideMenuData } from "@/api/requests/get-side-menu-data";

import { getCategoryBreadcrumbTrail } from "@/utils/get-category-breadcrumb-trail";

import { ProductView } from "../../views/product";
import { ProductList } from "../../views/product-list";

import type { Product } from "@/types/product";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug: string; "product-category": string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const seoData = await getSEOData("/products", params.slug, params.lang);

  if (!seoData) {
    return {
      title: "Product",
      description: "",
    };
  }

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
  };
}

const ProductRoute = async (props: {
  params: Promise<{ lang: string; slug: string; "product-category": string }>;
}) => {
  const params = await props.params;
  const { slug, lang } = params;
  const products = await getProductBySlug(slug, lang);

  if (products.length === 0 || products[0] === undefined)
    return <h2>no post found</h2>;
  const product = products[0];

  const { categories } = await fetchSideMenuData(params["product-category"]);
  const categoryTrail = getCategoryBreadcrumbTrail(
    categories,
    params["product-category"],
    product.category?.name,
  );
  const breadcrumbTrail = [{ name: "Products", slug: "" }, ...categoryTrail];

  if (!product.series) {
    return <ProductView data={product} breadcrumbTrail={breadcrumbTrail} />;
  }
  const productsOfSeries = await getOtherProductsOfSeries(product);
  if (productsOfSeries.length === 0) {
    return <ProductView data={product} breadcrumbTrail={breadcrumbTrail} />;
  }
  return (
    <>
      <ProductView data={product} breadcrumbTrail={breadcrumbTrail} />
      <div className="container mx-auto space-y-6 sm:space-y-12">
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
  if (process.env.SKIP_BUILD_FETCH === "true") {
    return [];
  }
  return getProductSlugAndCategoryList();
}

async function getOtherProductsOfSeries(product: Product): Promise<Product[]> {
  const products = await fetchProductsAndSeries(product.series!.slug);
  return products.products.filter((p: Product) => p.id !== product.id);
}

export default ProductRoute;
