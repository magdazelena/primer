import { Product } from "../../types/product";
import { fetchAPI } from "../fetch-api";
import { CREATOR_QUERY } from "../shared-params";

export async function getProductBySlug(slug: string): Promise<Product[]> {
    const path = `/products`;
    const urlParamsObject = {
      filters: { slug },
      populate: {
        coverImage: { fields: ["url"] },
        media: {
          populate: "*",
        },
        category: { fields: ["name", "slug"] },
        creator: CREATOR_QUERY,
        series: { fields: ["name", "slug"] },
      },
    };
    const response = await fetchAPI(path, urlParamsObject);
    return response.data;
  }