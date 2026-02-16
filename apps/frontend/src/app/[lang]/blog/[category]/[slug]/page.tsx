import { getArticlesSlugAndCategoryList } from "@/api/requests/get-articles-list";
import { getPostBySlug } from "@/api/requests/get-post-by-slug";
import { getSEOData } from "@/api/requests/getSEOData";

import { Post } from "../../views/post";

import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug: string; category: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const seoData = await getSEOData("/articles", params.slug, params.lang);
  
  if (!seoData) {
    return {
      title: "Article",
      description: "",
    };
  }

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
  };
}

export const PostRoute = async (props: {
  params: Promise<{ lang: string; slug: string; category: string }>;
}) => {
  const params = await props.params;
  const { slug, lang } = params;
  const data = await getPostBySlug(slug, lang);
  if (data.length === 0) return <h2>no post found</h2>;
  return <Post data={data[0]} />;
};

export async function generateStaticParams() {
  if (process.env.SKIP_BUILD_FETCH === "true") {
    return [];
  }
  return getArticlesSlugAndCategoryList();
}

export default PostRoute;
