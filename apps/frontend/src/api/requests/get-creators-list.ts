import { fetchAPI } from "../fetch-api";
import { POPULATE_GENERIC } from "../shared-params";

import type { APIResponse } from "../../types/api";

export const getCreatorsList = async (
  start: number,
  limit: number,
): Promise<APIResponse> => {
  const path = `/creators`;
  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: {
      avatar: { fields: ["url"] },
    },
    pagination: {
      start,
      limit,
    },
  };
  const responseData = await fetchAPI(path, urlParamsObject);

  return { ...responseData };
};

export async function getCreatorsSlugList() {
  const path = `/creators`;
  const allSlugs = new Set<string>();

  // Fetch creators for all locales to get all possible slugs
  // Handle 404s gracefully - if a locale doesn't have data, skip it
  const { i18n } = await import("../../../i18n-config");
  for (const locale of i18n.locales) {
    try {
      const creatorResponse = await fetchAPI(path, {
        locale,
        ...POPULATE_GENERIC,
      });
      
      // fetchAPI returns empty array on error, so check if we have data
      if (creatorResponse.data && creatorResponse.data.length > 0) {
        creatorResponse.data.forEach((creator: { slug: string }) => {
          if (creator.slug) {
            allSlugs.add(creator.slug);
          }
        });
      }
    } catch (error) {
      // Silently skip locales that don't have data
      continue;
    }
  }

  return Array.from(allSlugs).map((slug) => ({
    slug,
  }));
}
