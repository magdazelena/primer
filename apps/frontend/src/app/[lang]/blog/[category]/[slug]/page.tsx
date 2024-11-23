import { fetchAPI } from "@/utils/fetch-api";
import Post from "../../views/post";
import type { Metadata } from "next";
import { ArticleParams } from "@/types/article";
import { mockArticleParams } from "@/mocks/data";
import { FALLBACK_SEO } from "@/utils/constants";

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      cover: { fields: ["url"] },
      creator: { populate: "*" },
      category: { fields: ["name"] },
      blocks: {
        populate: {
          __component: "*",
          files: "*",
          file: "*",
          url: "*",
          body: "*",
          title: "*",
          author: "*",
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
  const path = `/articles`;
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
  if (meta.length === 0 ) return FALLBACK_SEO;
  const metadata = meta[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function PostRoute({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await getPostBySlug(slug);
  if (data.data.length === 0) return <h2>no post found</h2>;
  return <Post data={data.data[0]} />;
}

export async function generateStaticParams(): Promise<ArticleParams[]> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  let articleParams: ArticleParams[];
  try {
    const articleResponse = await fetchAPI(
      path,
      {
        populate: ["category"],
      },
      options
    );
  
    articleParams = articleResponse.data.map(
      (article: {
        attributes: {
          slug: string;
          category: {
            slug: string;
          };
        };
      }) => ({ slug: article.attributes.slug, category: article.attributes.slug })
    );
  } catch (error) {
    console.error('Error fetching articles', error);
    articleParams = [mockArticleParams]
  }
  return articleParams;
}
