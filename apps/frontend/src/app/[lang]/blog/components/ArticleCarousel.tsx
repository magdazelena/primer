import { ArticleThumbnail } from "./ArticleThumbnail";

import type { Article } from "@/types/article";

const ArticleCarousel = ({ articles, title }: { articles: Article[], title?: string }) => {
  return (
    <div className="space-y-2">
      <h4 className="text-lg font-semibold">
        {title || "Posts You May Like"}
      </h4>
      <div className="flex flex-wrap">
        {articles.map((article: Article) => {
          return <ArticleThumbnail key={article.id} article={article} />;
        })}
      </div>
    </div>
  );
};

export { ArticleCarousel };
