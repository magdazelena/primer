import qs from "qs";

import { i18n } from "../../i18n-config";

import { getStrapiURL } from "./api-helpers";

import type { Locale } from "../../i18n-config";

export interface URLParamsObject {
  populate?: unknown;
  sort?: {
    [key: string]: string;
  };
  filters?: unknown;
  pagination?: {
    start: number;
    limit: number;
  };
  locale?: string;
}
export async function fetchAPI(
  path: string,
  urlParamsObject: URLParamsObject = {
    locale: i18n.defaultLocale,
  },
  options = {}
) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    if (
      !urlParamsObject.locale ||
      !i18n.locales.includes(urlParamsObject.locale as Locale)
    )
      urlParamsObject.locale = i18n.defaultLocale;
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    if (!data.data) {
      console.error("No data found in the response.", data);
      return { data: [], meta: { pagination: { total: 0 } } };
    }
    return data;
  } catch (error) {
    console.error("Error fetching data from the API.", error);
    return { data: [], meta: { pagination: { total: 0 } } };
  }
}
