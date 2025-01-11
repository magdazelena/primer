import PageHeader from "@/components/PageHeader";
import List from "../views/product-list";
import { fetchPostsByCategory } from "@//utils/categories-fetch";

export default async function ProductCategoryRoute(
  props: {
    params: Promise<{ "product-category": string }>;
  }
) {
  const params = await props.params;
  const filter = params["product-category"];
  const data = await fetchPostsByCategory(
    "/products",
    "/product-categories",
    filter
  );

  //TODO: CREATE A COMPONENT FOR THIS
  if (!data || data.posts.data.length === 0)
    return <div>Not Posts In this category</div>;

  const { category, posts } = data;
  return (
    <div>
      <PageHeader
        heading={category.name}
        text={category.description}
      />
      <List data={posts.data} />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
