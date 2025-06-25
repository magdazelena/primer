import { fetchAPI } from "../fetch-api";
import { ARTICLE_RICH_QUERY } from "../shared-params";

export async function getPostBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    ...ARTICLE_RICH_QUERY,
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}
