import { fetchAPI } from "../fetch-api";
import { CREATOR_QUERY } from "../shared-params/creator";

const fetchSeries = async (series: string) => {
  const path = `/product-seria`;
  const urlParamsObject = {
    filters: { slug: series },
    populate: {
      coverImage: { fields: ["url"] },
      media: {
        populate: "*",
      },
      category: { fields: ["name", "slug"] },
      creator: CREATOR_QUERY,
    },
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response.data[0];
};

const fetchProductsBySeries = async (series: string) => {
  const path = `/products`;
  const urlParamsObject = {
    filters: { series: { slug: series } },
    populate: {
      coverImage: { fields: ["url"] },
      media: {
        populate: "*",
      },
      category: { fields: ["name", "slug"] },
      series: { fields: ["name", "slug"] },
      creator: CREATOR_QUERY,
    },
  };
  const response = await fetchAPI(path, urlParamsObject);
  return response.data;
};

const fetchProductsAndSeries = async (series: string) => {
  const productSeries = await fetchSeries(series);
  const products = await fetchProductsBySeries(series);
  return { productSeries, products };
};

export default fetchProductsAndSeries;
