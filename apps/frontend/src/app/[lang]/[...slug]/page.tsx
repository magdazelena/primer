import { Metadata } from "next";
import { getPageBySlug } from "@/utils/get-page-by-slug";
import { FALLBACK_SEO } from "@/utils/constants";
import componentResolver from "@/utils/component-resolver";

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const page = await getPageBySlug(params.slug, params.lang);

  if (!page.data[0].attributes?.seo) return FALLBACK_SEO;
  const metadata = page.data[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function PageRoute(props: Props) {
  const params = await props.params;
  const page = await getPageBySlug(params.slug, params.lang);
  if (page.data.length === 0) return null;
  const contentSections = page.data[0].attributes.contentSections;
  return contentSections.map((section: any, index: number) =>
    componentResolver(section, index)
  );
}
