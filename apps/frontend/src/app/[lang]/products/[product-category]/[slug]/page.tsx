import { fetchAPI } from "@/utils/fetch-api";
import type { Metadata } from "next";
import ProductView from "../../views/product";
import { FALLBACK_SEO } from "@/utils/constants";
import { ProductParams } from "@/types/product";
import { mockProductParams } from "@/mocks/data";

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
  let response;
  try {
    response = await fetchAPI(path, urlParamsObject, options);
  } catch (_error) {
    response = []
  }
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
  if (meta.length === 0) return FALLBACK_SEO;
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

export async function generateStaticParams(): Promise<ProductParams[]> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/products`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  let productParams: ProductParams[];
  try {
    const productResponse = await fetchAPI(
      path,
      {
        populate: { category: { fields: ["slug"] } },
      },
      options
    );
    productParams = productResponse.data.map(
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
  
  } catch (error) {
    console.error("Error fetching product params", error);
    productParams = [mockProductParams];
  }
  return productParams;
}
