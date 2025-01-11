import { Category } from "../../types/article";
import { ProductCategory } from "../../types/product";
import { fetchAPI } from "../fetch-api";

interface AllCategories {
    productCategories: ProductCategory[];
    blogCategories: Category[]
}
export async function getCategories(lang: string): Promise<AllCategories> {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  
    if (!token)
      throw new Error("The Strapi API Token environment variable is not set.");
    const options = { headers: { Authorization: `Bearer ${token}` } };
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
  
    // Fetch product categories from Strapi
    const productCategoriesRes = await fetchAPI(
      `/product-categories`,
      params,
      options
    );
    const productCategories = productCategoriesRes.data;
  
    // Fetch blog categories from Strapi
    const blogCategoriesRes = await fetchAPI(`/categories`, params, options);
    const blogCategories = blogCategoriesRes.data;
  
    return { productCategories, blogCategories };
  }