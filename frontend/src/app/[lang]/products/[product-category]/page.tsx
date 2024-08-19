import PageHeader from "@/app/[lang]/components/PageHeader";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import List from "@/app/[lang]/views/product-list";
import { ProductCategory } from "../../../../types/product";

async function fetchPostsByCategory(filter: string) {
  const parentCategory = await fetchAllChildCategories(filter);
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/products`;
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
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return { category: parentCategory?.parent, posts: responseData };
  } catch (error) {
    console.error(error);
  }
}

export default async function ProductCategoryRoute({
  params,
}: {
  params: { "product-category": string };
}) {
  const filter = params["product-category"];
  const data = await fetchPostsByCategory(filter);

  //TODO: CREATE A COMPONENT FOR THIS
  if (!data || data.posts.data.length === 0)
    return <div>Not Posts In this category</div>;

  const { category, posts } = data;
  return (
    <div>
      <PageHeader
        heading={category.attributes.name}
        text={category.attributes.description}
      />
      <List data={posts.data} />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}

async function fetchAllChildCategories(slug: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/product-categories`;
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
  const slugs = [category.attributes.slug];

  if (
    category.attributes.children &&
    category.attributes.children.data.length > 0
  ) {
    category.attributes.children.data.forEach((child) => {
      slugs.push(...collectAllSlugs(child));
    });
  }

  return slugs;
};
