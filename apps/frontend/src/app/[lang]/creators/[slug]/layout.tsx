import { Article } from "@/types/article";
import { Product } from "@/types/product";
import { ArticleCarousel } from "@/app/[lang]/blog/components/ArticleCarousel";
import { ProductCarousel } from "@/app/[lang]/products/components/ProductCarousel";
import { fetchAPI } from "@/api/fetch-api";

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
          start: 0,
          limit: 4,
        },

        sort: {"publishedAt":"desc"},
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
          start: 0,
          limit: 4,
        },

        sort: {"publishedAt": "desc"},
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
export default async function LayoutRoute(
  props: {
    children: React.ReactNode;
    params: Promise<{
      slug: string;
    }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

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
        slug: string;
  
    }) => ({
      slug: creator.slug,
    })
  );
  return staticParams;
}
