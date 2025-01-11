import { Product, ProductCategory } from "../../types/product";
import { fetchAPI } from "../fetch-api";
import { lookupCategoryTree, CATEGORY_THREE_QUERY } from "../shared-params";

export async function fetchSideMenuData(filter: string): Promise<Data> {
  
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const categoriesResponse = await fetchAPI(
      "/product-categories",
      { populate: "*" },
      options
    );
    const filters = filter
      ? lookupCategoryTree(filter)
      : {};
    const productsResponse = await fetchAPI(
      "/products",
      {
        populate: {
          coverImage: { fields: ["url"] },
          ...CATEGORY_THREE_QUERY
        },
        filters: { ...filters },
      },
      options
    );
    return {
      products: productsResponse.data,
      categories: categoriesResponse.data,
    };
  
}

interface Data {
  products: Product[];
  categories: ProductCategory[];
}