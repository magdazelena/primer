import { fetchAPI } from "../fetch-api";
import {
  lookupCategoryTree,
  PRODUCT_WITH_CATEGORY_TREE_QUERY,
  POPULATE_GENERIC,
} from "../shared-params";

import type { Product, ProductCategory } from "../../types/product";

export async function fetchSideMenuData(filter: string): Promise<Data> {
  const categoriesResponse = await fetchAPI("/product-categories", {
    ...POPULATE_GENERIC,
  });
  const filters = filter ? lookupCategoryTree(filter) : {};
  const productsResponse = await fetchAPI("/products", {
    ...PRODUCT_WITH_CATEGORY_TREE_QUERY,
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
