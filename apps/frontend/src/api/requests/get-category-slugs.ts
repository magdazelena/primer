import { fetchAPI } from "../fetch-api";
import { i18n } from "../../../i18n-config";

/**
 * Fetches all product category slugs for static generation
 * Fetches for all locales and returns unique slugs
 * @returns Array of category slugs (matching route segment [product-category])
 */
export async function getProductCategorySlugs(): Promise<
  Array<{ "product-category": string }>
> {
  const allSlugs = new Set<string>();

  // Fetch categories for all locales to get all possible slugs
  // Handle 404s gracefully - if a locale doesn't have data, skip it
  for (const locale of i18n.locales) {
    try {
      const response = await fetchAPI("/product-categories", {
        locale,
      });

      // fetchAPI returns empty array on error, so check if we have data
      if (response.data && response.data.length > 0) {
        response.data.forEach((category: { slug: string }) => {
          if (category.slug) {
            allSlugs.add(category.slug);
          }
        });
      }
    } catch (error) {
      // Silently skip locales that don't have data
      continue;
    }
  }

  return Array.from(allSlugs).map((slug) => ({
    "product-category": slug,
  }));
}

/**
 * Fetches all blog category slugs for static generation
 * Fetches for all locales and returns unique slugs
 * @returns Array of category slugs (matching route segment [category])
 */
export async function getBlogCategorySlugs(): Promise<
  Array<{ category: string }>
> {
  const allSlugs = new Set<string>();

  // Fetch categories for all locales to get all possible slugs
  // Handle 404s gracefully - if a locale doesn't have data, skip it
  for (const locale of i18n.locales) {
    try {
      const response = await fetchAPI("/categories", {
        locale,
      });

      // fetchAPI returns empty array on error, so check if we have data
      if (response.data && response.data.length > 0) {
        response.data.forEach((category: { slug: string }) => {
          if (category.slug) {
            allSlugs.add(category.slug);
          }
        });
      }
    } catch (error) {
      // Silently skip locales that don't have data
      continue;
    }
  }

  return Array.from(allSlugs).map((slug) => ({
    category: slug,
  }));
}
