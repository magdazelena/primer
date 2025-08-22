import { getPageBySlug } from "@/api/requests/get-page-by-slug";
import { componentResolver } from "@/utils/component-resolver";
import { FALLBACK_SEO } from "@/utils/constants";

import type { Metadata } from "next";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const page = await getPageBySlug(params.slug, params.lang);

  if (!page.data[0]?.seo) return FALLBACK_SEO;
  const metadata = page.data[0].seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export const PageRoute = async (props: Props) => {
  const params = await props.params;
  const page = await getPageBySlug(params.slug, params.lang);
  if (page.data.length === 0) return null;
  const contentSections = page.data[0].contentSections;
  if (!contentSections || contentSections.length === 0) return null;
  return contentSections.map((section: unknown, index: number) =>
    componentResolver(section, index),
  );
};

export default PageRoute;
