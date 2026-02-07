import { fetchAPI } from "../fetch-api";

interface SEOdata {
  shareImage: object;
  metaTitle: string;
  metaDescription: string;
}

export async function getSEOData(path: string, slug: string): Promise<SEOdata> {
  const urlParamsObject = {
    filters: { slug },
    populate: {
      seo: {
        populate: {
          shareImage: {
            populate: "*",
          },
        },
      },
    },
  };
  const response = await fetchAPI(path, urlParamsObject);
  const data = response.data;
  if (!data || data.length === 0)
    throw new Error("Error fetching SEO data, double check the syntax");
  return data[0]?.seo;
}
