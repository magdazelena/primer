import { Article } from "@/types/article";
import { Product } from "@/types/product";
import { ArticleCarousel } from "@/app/[lang]/blog/components/ArticleCarousel";
import { ProductCarousel } from "@/app/[lang]/products/components/ProductCarousel";
import { fetchAPI } from "@/utils/fetch-api";

async function fetchCreationsData(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const filters = filter
      ? {
          filters: {
            creator: {
              slug: filter,
            },
          },
        }
      : {};
    const articlesResponse = await fetchAPI(
      "/articles",
      {
        populate: {
          cover: { fields: ["url"] },
          category: { fields: ["slug"] },
          creator: {
            populate: {
              avatar: {
                fields: ["name", "alternativeText", "caption", "url"],
              },
              name: {
                populate: true,
              },
            },
          },
        },
        pagination: {
          limit: 4,
        },

        sort: ["publishedAt:desc"],
        ...filters,
      },
      options
    );
    const productsResponse = await fetchAPI(
      "/products",
      {
        populate: {
          coverImage: { fields: ["url"] },
        },
        pagination: {
          limit: 4,
        },

        sort: ["publishedAt"],
        ...filters,
      },
      options
    );
    return {
      articles: articlesResponse.data,
      products: productsResponse.data,
    };
  } catch (error) {
    console.error(error);
  }
}
interface Data {
  products: Product[];
  articles: Article[];
}
export default async function LayoutRoute({
  params,
  children,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const { articles, products } = (await fetchCreationsData(
    params.slug
  )) as Data;

  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div>{children}</div>
      {articles.length > 0 && <ArticleCarousel articles={articles} />}
      {products.length > 0 && <ProductCarousel products={products} />}
    </section>
  );
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/creators`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const creatorsResponse = await fetchAPI(
    path,
    {
      populate: { fields: ["slug"] },
    },
    options
  );

  const staticParams = creatorsResponse.data.map(
    (creator: {
      attributes: {
        slug: string;
      };
    }) => ({
      slug: creator.attributes.slug,
    })
  );
  return staticParams;
}
