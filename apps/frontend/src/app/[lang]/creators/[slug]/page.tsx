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
  return response.data;
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

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const meta = await getMetaData(params.slug);
  const metadata = meta[0].seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function CreatorRoute(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const { slug } = params;
  const data = await getCreatorBySlug(slug);
  if (data.length === 0) return <h2>no creators found</h2>;
  return <CreatorView creator={data[0]} />;
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
  return creatorResponse.map(
    (creator: {
        slug: string;

    }) => ({
      slug: creator.slug,
    })
  );
}
