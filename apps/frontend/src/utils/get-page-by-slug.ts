import {fetchAPI} from "@/api/fetch-api";

export async function getPageBySlug(slug: string, lang: string, parameters = {}) {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

    const path = `/pages`;
    const urlParamsObject = {
      populate: parameters,
      filters: {slug}, locale: lang};
    const options = {headers: {Authorization: `Bearer ${token}`}};
    let result;
    try {
      result =  await fetchAPI(path, urlParamsObject, options);
    } catch (error) {
        console.error(error);
        result = {}
    }
    return result;
}