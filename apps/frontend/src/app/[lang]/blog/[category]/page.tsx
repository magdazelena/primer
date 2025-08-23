import { fetchPostsByCategory } from "@/api/categories-fetch";
import { PageHeader } from "@/components/PageHeader";

import { PostList } from "../views/article-list";

export const CategoryRoute = async (props: {
  params: Promise<{ category: string }>;
}) => {
  const params = await props.params;
  const filter = params.category;
  const data = await fetchPostsByCategory("/articles", "/categories", filter);

  //TODO: CREATE A COMPONENT FOR THIS
  if (!data || data.posts.data.length === 0)
    return <div>Not Posts In this category</div>;

  const { category, posts } = data;

  return (
    <div>
      <PageHeader heading={category.name} text={category.description} />
      <PostList data={posts.data} />
    </div>
  );
};

export async function generateStaticParams() {
  return [];
}

export default CategoryRoute;
