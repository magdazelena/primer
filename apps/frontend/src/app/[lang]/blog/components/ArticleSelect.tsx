import { Article, Category } from "@/types/article";
import { CategoryThumbnail } from "@/app/[lang]/creators/components/CategoryThumbnail";
import { findParentCategory } from "@/utils/find-parent-category";
import { ArticleCarousel } from "./ArticleCarousel";

export default function ArticleSelect({
  categories,
  articles,
  params,
}: {
  categories: Category[];
  articles: Article[];
  params: {
    slug: string;
    category: string;
  };
}) {
  const parentCategory = findParentCategory(categories, params["category"]);
  return (
    <div className="col-span-12 p-4 min-h-[365px] relative">
      <h4 className="text-xl font-semibold">Browse By Category</h4>

      <div>
        <div className="flex flex-wrap py-6">
          {categories.map((category: Category) => {
            if (category.articles.length === 0) return null;
            return (
              <CategoryThumbnail
                key={category.id}
                categoryName={category.name}
                categorySlug={category.slug}
                selected={params["category"]}
                basePath="/blog"
              />
            );
          })}
          <CategoryThumbnail
            categoryName={`${
              parentCategory ? parentCategory.name : "All posts"
            }`}
            categorySlug={`${
              parentCategory ? parentCategory.slug : ""
            }`}
            selected="filter"
            basePath="/blog"
          />
        </div>

        {articles.length > 0 && <ArticleCarousel articles={articles} />}
      </div>
    </div>
  );
}
