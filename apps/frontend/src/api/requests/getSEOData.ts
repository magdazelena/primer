import { fetchAPI } from "../fetch-api";

interface SEOdata {
    shareImage: Object,
    metaTitle: string,
    metaDescription: string
}

export async function getSEOData(path: string, slug: string): Promise<SEOdata> {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const urlParamsObject = {
      filters: { slug },
      populate: { seo: {
        populate: {
          shareImage: {
            populate: "*",
          },
        },
      }, },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const response = await fetchAPI(path, urlParamsObject, options);
    const data = response.data;
    console.log(response)
    if (!data || data.length === 0) throw new Error('Error fetching SEO data, double check the syntax');
    return data[0];
  }