import { fetchAPI } from "../fetch-api";
import { i18n } from "../../../i18n-config";

/**
 * Fetches all product series slugs for static generation
 * Fetches for all locales and returns unique slugs
 * @returns Array of product series slugs (matching route segment [product-series])
 */
export async function getProductSeriesSlugs(): Promise<
  Array<{ "product-series": string }>
> {
  const allSlugs = new Set<string>();

  // Fetch series for all locales to get all possible slugs
  // Handle 404s gracefully - if a locale doesn't have data, skip it
  for (const locale of i18n.locales) {
    try {
      const response = await fetchAPI("/product-seria", {
        locale,
      });

      // fetchAPI returns empty array on error, so check if we have data
      if (response.data && response.data.length > 0) {
        response.data.forEach((series: { slug: string }) => {
          if (series.slug) {
            allSlugs.add(series.slug);
          }
        });
      }
    } catch (error) {
      // Silently skip locales that don't have data
      continue;
    }
  }

  return Array.from(allSlugs).map((slug) => ({
    "product-series": slug,
  }));
}
