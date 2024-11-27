import ArticleSelect from "../../components/ArticleSelect";
import { fetchAPI } from "@/utils/fetch-api";
import { Article, Category } from "@/types/article";

async function fetchSideMenuData(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const categoriesResponse = await fetchAPI(
      "/categories",
      { populate: "*" },
      options
    );
    const selectedFilter = filter
      ? {
          filters: {
            category: {
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
        ...selectedFilter,
      },
      options
    );

    return {
      articles: articlesResponse.data,
      categories: categoriesResponse.data,
    };
  } catch (error) {
    console.error(error);
  }
}

interface Data {
  articles: Article[];
  categories: Category[];
}

export default async function LayoutRoute(
  props: {
    children: React.ReactNode;
    params: Promise<{
      slug: string;
      category: string;
    }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  const { category } = params;
  const { categories, articles } = (await fetchSideMenuData(category)) as Data;
  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
        <div className="col-span-12">{children}</div>

        <ArticleSelect
          categories={categories}
          articles={articles}
          params={params}
        />
      </div>
    </section>
  );
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
      attributes: {
        slug: string;
        category: {
          slug: string;
        };
      };
    }) => ({ slug: article.attributes.slug, category: article.attributes.slug })
  );
}
