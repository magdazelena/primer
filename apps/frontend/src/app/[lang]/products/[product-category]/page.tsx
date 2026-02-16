import { fetchPostsByCategory } from "@/api/categories-fetch";
import { PageHeader } from "@/components/PageHeader";

import { ProductList } from "../views/product-list";
import { Locale } from "i18n-config";

const ProductCategoryRoute = async (props: {
  params: Promise<{ lang: Locale; "product-category": string }>;
}) => {
  const params = await props.params;
  const filter = params["product-category"];
  const data = await fetchPostsByCategory(
    "/products",
    "/product-categories",
    filter,
    params.lang
  );
  //TODO: CREATE A COMPONENT FOR THIS
  if (!data || data.posts?.data?.length === 0)
    return <div>Not Posts In this category</div>;

  const { category, posts } = data;
  return (
    <div>
      <PageHeader heading={category?.name} text={category?.description} />
      <ProductList products={posts.data} />
    </div>
  );
};

export async function generateStaticParams() {
  if (process.env.SKIP_BUILD_FETCH === "true") {
    return [];
  }
  const { getProductCategorySlugs } = await import(
    "@/api/requests/get-category-slugs"
  );
  return getProductCategorySlugs();
}

export default ProductCategoryRoute;
