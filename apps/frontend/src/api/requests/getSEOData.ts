import { fetchAPI } from "../fetch-api";
import { i18n } from "../../../i18n-config";

import type { Locale } from "../../../i18n-config";

interface SEOdata {
  shareImage: object;
  metaTitle: string;
  metaDescription: string;
}

export async function getSEOData(
  path: string,
  slug: string,
  locale?: string
): Promise<SEOdata | null> {
  const urlParamsObject = {
    filters: { slug },
    locale: locale || i18n.defaultLocale,
    populate: {
      seo: {
        populate: {
          shareImage: {
            populate: "*",
          },
        },
      },
    },
  };
  const response = await fetchAPI(path, urlParamsObject);
  const data = response.data;
  if (!data || data.length === 0 || !data[0]?.seo) {
    return null;
  }
  return data[0].seo;
}
