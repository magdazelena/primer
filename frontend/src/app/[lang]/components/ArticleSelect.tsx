import Link from "next/link";
import { ArticleBase, Category } from "@/types/article";
import { CategoryThumbnail } from "./CategoryThumbnail";
import { findParentCategory } from "../utils/find-parent-category";

export default function ArticleSelect({
  categories,
  articles,
  params,
}: {
  categories: Category[];
  articles: ArticleBase[];
  params: {
    slug: string;
    category: string;
  };
}) {
  const parentCategory = findParentCategory(categories, params["category"]);
  return (
    <div className="p-4 min-h-[365px] relative">
      <h4 className="text-xl font-semibold">Browse By Category</h4>

      <div>
        <div className="flex flex-wrap py-6 space-x-2 border-gray-400">
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

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Other Posts You May Like</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {articles.map((article: ArticleBase) => {
              return (
                <li>
                  <Link
                    rel="noopener noreferrer"
                    href={`/blog/${params.category}/${article.attributes.slug}`}
                    className={`${
                      params.slug === article.attributes.slug && "link-active"
                    }  `}
                  >
                    {article.attributes.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
