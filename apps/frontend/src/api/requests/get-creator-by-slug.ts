import { fetchAPI } from "../fetch-api";
import { POPULATE_GENERIC } from "../shared-params";

export async function getCreatorBySlug(slug: string) {
    const path = `/creators`;
    const urlParamsObject = {
      filters: { slug },
      ...POPULATE_GENERIC
    };
    const response = await fetchAPI(path, urlParamsObject);
    return response.data;
  }