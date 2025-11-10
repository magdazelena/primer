import { getCreatorBySlug } from "@/api/requests/get-creator-by-slug";
import { getSEOData } from "@/api/requests/getSEOData";

import { getCreatorsSlugList } from "../../../../api/requests/get-creators-list";
import { CreatorView } from "../views/creator";

import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const seoData = await getSEOData("/creators", params.slug);

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
  };
}

const CreatorRoute = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const { slug } = params;
  const data = await getCreatorBySlug(slug);
  if (data.length === 0) return <h2>no creators found</h2>;
  return <CreatorView creator={data[0]} />;
};

export async function generateStaticParams() {
  if (process.env.SKIP_BUILD_FETCH === "true") {
    return [];
  }
  return getCreatorsSlugList();
}

export default CreatorRoute;
