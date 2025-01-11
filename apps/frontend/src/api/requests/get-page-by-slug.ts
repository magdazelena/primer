import {fetchAPI} from "@/api/fetch-api";

export async function getPageBySlug(slug: string, lang: string, parameters = {}) {

    const path = `/pages`;
    const urlParamsObject = {
      populate: parameters,
      filters: {slug}, locale: lang};
    let result;
    try {
      result =  await fetchAPI(path, urlParamsObject);
    } catch (error) {
        console.error(error);
        result = {}
    }
    return result;
}