import { fetchAPI } from "@/utils/fetch-api";
import type { Metadata } from "next";
import ProductView from "../../views/product";

async function getProductBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/products`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      coverImage: { fields: ["url"] },
      media: "*",
      category: { fields: ["name", "slug"] },
      creator: {
        populate: {
          avatar: {
            fields: ["name", "alternativeText", "caption", "url"],
          },
          name: {
            populate: true,
          },
          slug: {
            populate: true,
          },
          lead: {
            populate: true,
          },
        },
      },
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
    populate: { seo: "*"},
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
      populate: { category: { fields: ["slug"] } },
    },
    options
  );
  return productResponse.data.map(
    (product: {
      attributes: {
        slug: string;
        category: {
          data: {
            attributes: {
              slug: string;
            };
          };
        };
      };
    }) => ({
      slug: product.attributes.slug,
      productCategory: product.attributes.category.data.attributes.slug,
    })
  );
}
