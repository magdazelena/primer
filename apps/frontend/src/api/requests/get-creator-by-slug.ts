import { fetchAPI } from "../fetch-api";
import { POPULATE_GENERIC } from "../shared-params";
import { i18n } from "../../../i18n-config";

export async function getCreatorBySlug(slug: string, locale?: string) {
  const path = `/creators`;
  const urlParamsObject = {
    filters: { slug },
    locale: locale || i18n.defaultLocale,
    ...POPULATE_GENERIC,
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response.data;
}
