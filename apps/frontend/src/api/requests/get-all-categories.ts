import { Category } from "../../types/article";
import { ProductCategory } from "../../types/product";
import { fetchAPI } from "../fetch-api";

interface AllCategories {
    productCategories: ProductCategory[];
    blogCategories: Category[]
}
export async function getCategories(lang: string): Promise<AllCategories> {
    const params = {
      populate: {
        children: {
          populate: "*",
        },
        parent: {
          populate: '*'
        }
      },
      locale: lang,
    };
  
    const productCategoriesRes = await fetchAPI(
      `/product-categories`,
      params,
    );
    const productCategories = productCategoriesRes.data;
  
    const blogCategoriesRes = await fetchAPI(`/categories`, params);
    const blogCategories = blogCategoriesRes.data;
  
    return { productCategories, blogCategories };
  }