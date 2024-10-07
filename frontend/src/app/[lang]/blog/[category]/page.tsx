import PageHeader from "@/components/PageHeader";
import BlogList from "@/app/[lang]/views/article-list";
import { fetchPostsByCategory } from "@/app/[lang]/utils/categories-fetch";

export default async function CategoryRoute({
  params,
}: {
  params: { category: string };
}) {
  const filter = params.category;
  const data = await fetchPostsByCategory("/articles", "/categories", filter);

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
      <BlogList data={posts.data} />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
