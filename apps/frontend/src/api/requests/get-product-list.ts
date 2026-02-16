import { fetchAPI } from "../fetch-api";

import type { APIResponse } from "../../types/api";

export const getProductList = async (
  start: number,
  limit: number,
): Promise<APIResponse> => {
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
  return { data: responseData.data, meta: responseData.meta };
};

export async function getProductSlugAndCategoryList(): Promise<
  Array<{ slug: string; productCategory: string }>
> {
  const path = `/products`;
  const productResponse = await fetchAPI(path, {
    populate: { category: { fields: ["slug"] } },
  });
  return productResponse.data.map(
    (product: {
      slug: string;
      category: {
        slug: string;
      };
    }) => ({
      slug: product.slug,
      productCategory: product.category.slug,
    }),
  );
}
