import { APIResponse } from "../../types/api";
import { fetchAPI } from "../fetch-api";
import { ARTICLE_BASE_QUERY } from "../shared-params";

export async function getArticlesList(start: number, limit: number): Promise<APIResponse> {
    const path = `/articles`;
    const urlParamsObject = {
        sort: { createdAt: "desc" },
        ...ARTICLE_BASE_QUERY,
        pagination: {
            start: start,
            limit: limit,
        },
    };
    const responseData = await fetchAPI(path, urlParamsObject);
    return { ...responseData }
}
export async function getArticlesSlugAndCategoryList(): Promise<Array<{slug: string, category: string}>> {
  const path = `/articles`;
  const articleResponse = await fetchAPI(
    path,
    {
      populate: ["category"],
    },
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