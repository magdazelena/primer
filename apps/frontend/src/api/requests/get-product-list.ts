import { fetchAPI } from "../fetch-api";

export const getProductList = async (start: number, limit: number) => {
    const path = `/products`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      populate: {
        coverImage: { fields: ["url"] },
        category: { populate: "*" },
      },
      pagination: {
        start,
        limit,
      },
    };
    const responseData = await fetchAPI(path, urlParamsObject);
    return { data: responseData.data, meta: responseData.meta }
}