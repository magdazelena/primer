import { fetchAPI } from "../fetch-api";
import {
  ARTICLE_BASE_QUERY,
  CREATOR_QUERY,
  POPULATE_GENERIC,
} from "../shared-params";

import type { Article, Category } from "../../types/article";

export async function fetchArticlesSideMenuData(filter: string): Promise<{
  articles: Article[];
  categories: Category[];
}> {
  const categoriesResponse = await fetchAPI("/categories", POPULATE_GENERIC);
  const filters = filter
    ? {
        category: {
          slug: filter,
        },
      }
    : {};
  const articlesResponse = await fetchAPI("/articles", {
    populate: {
      ...ARTICLE_BASE_QUERY.populate,
      creator: CREATOR_QUERY,
    },
    filters,
  });

  return {
    articles: articlesResponse.data,
    categories: categoriesResponse.data,
  };
}
