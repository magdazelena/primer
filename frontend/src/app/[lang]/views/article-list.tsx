import { Article } from "@/types/article";
import { ArticleThumbnail } from "../../../components/ArticleThumbnail";

export default function PostList({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleThumbnail key={article.id} article={article} />
        ))}
      </div>
      {children && children}
    </section>
  );
}
