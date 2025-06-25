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
  const creatorResponse = await fetchAPI(path, POPULATE_GENERIC);
  return creatorResponse.data.map((creator: { slug: string }) => ({
    slug: creator.slug,
  }));
}
