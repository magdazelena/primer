import { fetchAPI } from "../fetch-api";
import { lookupCategoryTree, CATEGORY_THREE_QUERY } from "../shared-params";

import type { Product, ProductCategory } from "../../types/product";

export async function fetchSideMenuData(filter: string): Promise<Data> {
  const categoriesResponse = await fetchAPI("/product-categories", {
    populate: "*",
  });
  const filters = filter ? lookupCategoryTree(filter) : {};
  const productsResponse = await fetchAPI("/products", {
    populate: {
      coverImage: { fields: ["url"] },
      ...CATEGORY_THREE_QUERY,
    },
    filters: { ...filters },
  });
  return {
    products: productsResponse.data,
    categories: categoriesResponse.data,
  };
}

interface Data {
  products: Product[];
  categories: ProductCategory[];
}
