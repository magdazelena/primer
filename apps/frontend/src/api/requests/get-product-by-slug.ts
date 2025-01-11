import { Product } from "../../types/product";
import { fetchAPI } from "../fetch-api";
import { CREATOR_QUERY } from "../shared-params";

export async function getProductBySlug(slug: string): Promise<Product[]> {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/products`;
    const urlParamsObject = {
      filters: { slug },
      populate: {
        coverImage: { fields: ["url"] },
        media: {
          populate: "*",
        },
        category: { fields: ["name", "slug"] },
        creator: CREATOR_QUERY
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    return response.data;
  }