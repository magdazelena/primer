import { fetchAPI } from "../fetch-api";
import { ARTICLE_RICH_QUERY } from "../shared-params";
import { i18n } from "../../../i18n-config";

export async function getPostBySlug(slug: string, locale?: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    locale: locale || i18n.defaultLocale,
    ...ARTICLE_RICH_QUERY,
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}
