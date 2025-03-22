import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia, formatDate } from "@/api/api-helpers";
import { Article } from "@/types/article";

const ArticleThumbnail = ({ article }: { article: Article }) => {
  const imageUrl = getStrapiMedia(
    article.coverImage.url
  );

  const category = article.category;
  const creator = article.creator;

  const avatarUrl = getStrapiMedia(creator?.avatar.url);

  return (
    <Link
      href={`/blog/${category?.slug}/${article.slug}`}
      key={article.id}
      className="
       group mb-5 mr-3 w-[300px] overflow-hidden rounded-2xl shadow-lg hover:no-underline focus:no-underline xl:min-w-[375px]"
    >
      {imageUrl && (
        <Image
          alt="presentation"
          width="240"
          height="240"
          className="h-44 w-full object-cover "
          src={imageUrl}
        />
      )}
      <div className="relative space-y-2 p-6">
        {avatarUrl && (
          <Image
            alt="avatar"
            width="80"
            height="80"
            src={avatarUrl}
            className="absolute -top-8 right-4 size-16 rounded-full object-cover"
          />
        )}

        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {article.title}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-xs text-accentDark">
            {formatDate(article.publishedAt)}
          </span>
          {creator && (
            <span className="text-xs text-accentDark">{creator.name}</span>
          )}
        </div>
        <p className="py-4">{article.description}</p>
      </div>
    </Link>
  );
};

export { ArticleThumbnail };
