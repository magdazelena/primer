import { ProductCategory } from "@/types/product";
import { fetchAPI } from "./fetch-api";

async function fetchAllChildCategories(path: string, slug: string) {
  try {
    const params = {
      filters: { slug },
      populate: {
        children: {
          populate: "children", // Recursively populate children categories
        },
      },
    };

    const responseData = await fetchAPI(path, params);
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
    category.children.length > 0
  ) {
    category.children.forEach((child) => {
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
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        category: {
          slug: { $in: parentCategory?.childrenCategories },
        },
      },
      populate: {
        coverImage: { fields: ["url"] },
        category: {
          populate: "*",
        },
        creator: {
          populate: "*",
        },
      },
    };
    const responseData = await fetchAPI(path, urlParamsObject);
    return { category: parentCategory?.parent, posts: responseData };
  } catch (error) {
    console.error(error);
  }
}
