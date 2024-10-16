import PageHeader from "@/components/PageHeader";
import List from "../views/product-list";
import { fetchPostsByCategory } from "@//utils/categories-fetch";

export default async function ProductCategoryRoute({
  params,
}: {
  params: { "product-category": string };
}) {
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
