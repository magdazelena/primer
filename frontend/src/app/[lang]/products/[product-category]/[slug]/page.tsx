import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import type { Metadata } from "next";
import ProductView from "@/app/[lang]/views/product";

async function getProductBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/products`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      coverImage: { fields: ["url"] },
      productCategory: { fields: ["name"] },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/products`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo: { populate: "*" } },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const meta = await getMetaData(params.slug);
  const metadata = meta[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function ProductRoute({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await getProductBySlug(slug);
  if (data.data.length === 0) return <h2>no post found</h2>;
  return <ProductView data={data.data[0]} />;
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/products`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const productResponse = await fetchAPI(
    path,
    {
      populate: ["productCategory"],
    },
    options
  );

  return productResponse.data.map(
    (product: {
      attributes: {
        name: string;
        productCategory: {
          slug: string;
        };
      };
    }) => ({
      slug: product.attributes.name,
      productCategory: product.attributes.name,
    })
  );
}
