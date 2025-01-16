import Post from "../../views/post";
import type { Metadata } from "next";
import { getSEOData } from "@/api/requests/getSEOData";
import { getArticlesSlugAndCategoryList } from "@/api/requests/get-articles-list";
import { getPostBySlug } from "@/api/requests/get-post-by-slug";





export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const seoData = await getSEOData('/articles', params.slug);
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
  };
}

export default async function PostRoute(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const { slug } = params;
  const data = await getPostBySlug(slug);
  console.log(data)
  if (data.length === 0) return <h2>no post found</h2>;
  return <Post data={data[0]} />;
}

export async function generateStaticParams() {
  return (await getArticlesSlugAndCategoryList())
}
