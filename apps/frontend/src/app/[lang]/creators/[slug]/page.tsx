import { fetchAPI } from "@/utils/fetch-api";
import type { Metadata } from "next";
import { CreatorView } from "../views/creator";
import { CreatorParams } from "@/types/creator";
import { mockCreatorParams } from "@/mocks/data";

async function getCreatorBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/creators`;
  const urlParamsObject = {
    filters: { slug },
    populate: "*",
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  let response; 
  try {
    response = await fetchAPI(path, urlParamsObject, options);
  } catch(_e){
    response = [];
  } 
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/creators`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo: { populate: "*" } },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  let response; 
  try {
    response = await fetchAPI(path, urlParamsObject, options);
  } catch(_e){
    response.data = [];
  } 
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

export async function generateStaticParams(): Promise<CreatorParams[]> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/creators`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  let creatorParams: CreatorParams[];
  try {
    const creatorResponse = await fetchAPI(
      path,
      {
        populate: "*",
      },
      options
    );
    creatorParams = creatorResponse.data.map(
      (creator: {
        attributes: {
          slug: string;
        };
      }) => ({
        slug: creator.attributes.slug,
      })
    );
  } catch (error) {
    console.error(error);
    creatorParams = [mockCreatorParams];
  }
  return creatorParams;
}
