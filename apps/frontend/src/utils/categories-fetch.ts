import { ProductCategory } from "@/types/product";
import { fetchAPI } from "./fetch-api";

async function fetchAllChildCategories(path: string, slug: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const params = {
      filters: { slug },
      populate: {
        children: {
          populate: "children", // Recursively populate children categories
        },
      },
    };

    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, params, options);
    const category = responseData.data[0];
    const childrenCategories = collectAllSlugs(category);
    return {
      parent: category,
      childrenCategories,
    };
  } catch (error) {
    console.error(error);
  }
}
const collectAllSlugs = (category: ProductCategory) => {
  const slugs = [category.slug];

  if (
    category.children &&
    category.children.data.length > 0
  ) {
    category.children.data.forEach((child) => {
      slugs.push(...collectAllSlugs(child));
    });
  }

  return slugs;
};
export async function fetchPostsByCategory(
  path: string,
  categoryPath: string,
  filter: string
) {
  const parentCategory = await fetchAllChildCategories(categoryPath, filter);
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        category: {
          slug: { $in: parentCategory?.childrenCategories },
        },
      },
      populate: {
        coverImage: { fields: ["url"] },
        cover: { fields: ["url"] },
        category: {
          populate: "*",
        },
        creator: {
          populate: "*",
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return { category: parentCategory?.parent, posts: responseData };
  } catch (error) {
    console.error(error);
  }
}
