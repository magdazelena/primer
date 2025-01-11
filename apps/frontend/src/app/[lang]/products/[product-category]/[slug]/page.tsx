import { fetchAPI } from "@/api/fetch-api";
import type { Metadata } from "next";
import ProductView from "../../views/product";
import { Product } from "@/types/product";
import { getSEOData } from "@/api/requests/getSEOData";
import { CREATOR_QUERY } from "@/api/shared-params";

async function getProductBySlug(slug: string): Promise<Product[]> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/products`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      coverImage: { fields: ["url"] },
      media: {
        populate: "*",
      },
      category: { fields: ["name", "slug"] },
      creator: CREATOR_QUERY
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}


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
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/products`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const productResponse = await fetchAPI(
    path,
    {
      populate: { category: { fields: ["slug"] } },
    },
    options
  );
  return productResponse.data.map(
    (product: {
      slug: string;
      category: {
        slug: string;
      };
    }) => ({
      slug: product.slug,
      productCategory: product.category.slug,
    })
  );
}
