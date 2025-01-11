import { fetchAPI } from "@/utils/fetch-api";
import Post from "../../views/post";
import type { Metadata } from "next";

async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      coverImage: { fields: ["url"] },
      creator: { populate: "*" },
      category: { fields: ["name"] },
      blocks: {
        on: {
          'sections.rich-text': {
            populate: '*'
          }
        }
      },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo: {
      populate: {
        shareImage: {
          populate: "*",
        },
      },
    }, },
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
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articleResponse = await fetchAPI(
    path,
    {
      populate: ["category"],
    },
    options
  );

  return articleResponse.data.map(
    (article: {
        slug: string;
        category: {
          slug: string;
        };

    }) => ({ slug: article.slug, category: article.slug })
  );
}
