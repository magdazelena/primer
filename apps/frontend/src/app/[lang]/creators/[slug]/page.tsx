import { fetchAPI } from "@/utils/fetch-api";
import type { Metadata } from "next";
import { CreatorView } from "../views/creator";

async function getCreatorBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/creators`;
  const urlParamsObject = {
    filters: { slug },
    populate: "*",
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/creators`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo:  "*"  },
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

export default async function CreatorRoute({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await getCreatorBySlug(slug);
  if (data.data.length === 0) return <h2>no creators found</h2>;
  return <CreatorView creator={data.data[0]} />;
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/creators`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const creatorResponse = await fetchAPI(
    path,
    {
      populate: "*",
    },
    options
  );
  return creatorResponse.data.map(
    (creator: {
      attributes: {
        slug: string;
      };
    }) => ({
      slug: creator.attributes.slug,
    })
  );
}
