import { Article, Category } from "../../types/article";
import { fetchAPI } from "../fetch-api";
import { ARTICLE_BASE_QUERY, CREATOR_QUERY, POPULATE_GENERIC } from "../shared-params";

export async function fetchArticlesSideMenuData(filter: string): Promise<{
    articles: Article[];
    categories: Category[];
  }> {


    const categoriesResponse = await fetchAPI(
      "/categories",
      POPULATE_GENERIC,
    );
    const selectedFilter = filter
      ? {
          category: {
            slug: filter,
          },
        }
      : {};
    const articlesResponse = await fetchAPI(
      "/articles",
      {
        populate: {
          ...ARTICLE_BASE_QUERY.populate,
          creator: CREATOR_QUERY
        },
        ...selectedFilter,
      },
    );

    return {
      articles: articlesResponse.data,
      categories: categoriesResponse.data,
    };

}
