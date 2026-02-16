import { fetchAPI } from "../fetch-api";
import { PRODUCT_CATEGORY_LIST_QUERY } from "../shared-params";

import type { APIResponse } from "../../types/api";

export const getProductList = async (
  start: number,
  limit: number,
): Promise<APIResponse> => {
  const path = `/products`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    ...PRODUCT_CATEGORY_LIST_QUERY,
    pagination: {
      start,
      limit,
    },
  };
  const responseData = await fetchAPI(path, urlParamsObject);
  return { data: responseData.data, meta: responseData.meta };
};

export async function getProductSlugAndCategoryList(): Promise<
  Array<{ slug: string; productCategory: string }>
> {
  const path = `/products`;
  const allParams = new Map<string, { slug: string; productCategory: string }>();

  // Fetch products for all locales to get all possible slugs
  // Handle 404s gracefully - if a locale doesn't have data, skip it
  const { i18n } = await import("../../../i18n-config");
  for (const locale of i18n.locales) {
    try {
      const productResponse = await fetchAPI(path, {
        locale,
        populate: { category: { fields: ["slug"] } },
      });
      
      // fetchAPI returns empty array on error, so check if we have data
      if (productResponse.data && productResponse.data.length > 0) {
        productResponse.data.forEach(
          (product: {
            slug: string;
            category: {
              slug: string;
            };
          }) => {
            // Use slug as key to avoid duplicates across locales
            if (product.slug && product.category?.slug) {
              allParams.set(product.slug, {
                slug: product.slug,
                productCategory: product.category.slug,
              });
            }
          }
        );
      }
    } catch (error) {
      if (process.env.DEBUG === "true") {
        console.error("Error fetching product slug and category list", error);
      }
      continue;
    }
  }

  return Array.from(allParams.values());
}
