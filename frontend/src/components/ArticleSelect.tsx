import { Article, Category } from "@/types/article";
import { CategoryThumbnail } from "./CategoryThumbnail";
import { findParentCategory } from "../app/[lang]/utils/find-parent-category";
import { ArticleThumbnail } from "./ArticleThumbnail";
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
            if (category.attributes.articles.data.length === 0) return null;
            return (
              <CategoryThumbnail
                key={category.id}
                categoryName={category.attributes.name}
                categorySlug={category.attributes.slug}
                selected={params["category"]}
                basePath="/blog"
              />
            );
          })}
          <CategoryThumbnail
            categoryName={`${
              parentCategory ? parentCategory.attributes.name : "All posts"
            }`}
            categorySlug={`${
              parentCategory ? parentCategory.attributes.slug : ""
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
