import { getArticlesSlugAndCategoryList } from "@/api/requests/get-articles-list";
import { fetchArticlesSideMenuData } from "@/api/requests/get-articles-side-menu-data";

import { ArticleSelect } from "../../components/ArticleSelect";

export const LayoutRoute = async (props: {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
    category: string;
  }>;
}) => {
  const params = await props.params;

  const { children } = props;

  const { category } = params;
  const { categories, articles } = await fetchArticlesSideMenuData(category);

  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-4">
        <div className="col-span-12">{children}</div>

        <ArticleSelect
          categories={categories}
          articles={articles}
          params={params}
        />
      </div>
    </section>
  );
};

export async function generateStaticParams() {
  return getArticlesSlugAndCategoryList();
}
