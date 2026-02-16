import { fetchAPI } from "../fetch-api";
import { PRODUCT_MEDIA_QUERY } from "../shared-params";
import { i18n } from "../../../i18n-config";

import type { Product } from "../../types/product";

export async function getProductBySlug(
  slug: string,
  locale?: string
): Promise<Product[]> {
  const path = `/products`;
  const urlParamsObject = {
    filters: { slug },
    locale: locale || i18n.defaultLocale,
    ...PRODUCT_MEDIA_QUERY,
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response.data;
}
