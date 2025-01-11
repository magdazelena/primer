import { fetchAPI } from "../fetch-api";

export const getProductList = async (start: number, limit: number) => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
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
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return { data: responseData.data, meta: responseData.meta }
}