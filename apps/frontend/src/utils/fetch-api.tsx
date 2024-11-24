import qs from "qs";
import { getStrapiURL } from "./api-helpers";
import { i18n, Locale } from "../../i18n-config";

export interface URLParamsObject {
  populate?: unknown;
  sort?: {
    [key: string]: string;
  };
  filters?: unknown;
  pagination?: {
    start: number;
    limit: number;
  }
  locale?: string;
}
export async function fetchAPI(
  path: string,
  urlParamsObject: URLParamsObject = {
    locale: i18n.defaultLocale,
  },
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    if (!urlParamsObject.locale || !i18n.locales.includes(urlParamsObject.locale as Locale))
      urlParamsObject.locale = i18n.defaultLocale;
    console.log("qs", urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`
    );
  }
}
