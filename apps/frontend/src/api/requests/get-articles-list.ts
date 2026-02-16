import { fetchAPI } from "../fetch-api";
import { ARTICLE_BASE_QUERY } from "../shared-params";

import type { APIResponse } from "../../types/api";

export async function getArticlesList(
  start: number,
  limit: number
): Promise<APIResponse> {
  const path = `/articles`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    ...ARTICLE_BASE_QUERY,
    pagination: {
      start,
      limit,
    },
  };
  const responseData = await fetchAPI(path, urlParamsObject);
  return { ...responseData };
}

export async function getArticlesSlugAndCategoryList(): Promise<
  Array<{ slug: string; category: string }>
> {
  const path = `/articles`;
  const allParams = new Map<string, { slug: string; category: string }>();

  // Fetch articles for all locales to get all possible slugs
  // Handle 404s gracefully - if a locale doesn't have data, skip it
  const { i18n } = await import("../../../i18n-config");
  for (const locale of i18n.locales) {
    try {
      const articleResponse = await fetchAPI(path, {
        locale,
        populate: ["category"],
      });

      // fetchAPI returns empty array on error, so check if we have data
      if (articleResponse.data && articleResponse.data.length > 0) {
        articleResponse.data.forEach(
          (article: {
            slug: string;
            category: {
              slug: string;
            };
          }) => {
            // Use slug as key to avoid duplicates across locales
            if (article.slug && article.category?.slug) {
              allParams.set(article.slug, {
                slug: article.slug,
                category: article.category.slug,
              });
            }
          }
        );
      }
    } catch (error) {
      // Silently skip locales that don't have data
      continue;
    }
  }

  return Array.from(allParams.values());
}
