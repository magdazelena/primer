import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia, formatDate } from "@/utils/api-helpers";
import { Article } from "@/types/article";

const ArticleThumbnail = ({ article }: { article: Article }) => {
  const imageUrl = getStrapiMedia(
    article.attributes.cover.data?.attributes.url
  );

  const category = article.attributes.category.data?.attributes;
  const creator = article.attributes.creator.data?.attributes;

  const avatarUrl = getStrapiMedia(creator?.avatar.data.attributes.url);

  return (
    <Link
      href={`/blog/${category?.slug}/${article.attributes.slug}`}
      key={article.id}
      className="
       group mr-3 mb-5 hover:no-underline focus:no-underline w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
    >
      {imageUrl && (
        <Image
          alt="presentation"
          width="240"
          height="240"
          className="object-cover w-full h-44 "
          src={imageUrl}
        />
      )}
      <div className="p-6 space-y-2 relative">
        {avatarUrl && (
          <Image
            alt="avatar"
            width="80"
            height="80"
            src={avatarUrl}
            className="rounded-full h-16 w-16 object-cover absolute -top-8 right-4"
          />
        )}

        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {article.attributes.title}
        </h3>

        <div className="flex justify-between items-center">
          <span className="text-xs text-accent">
            {formatDate(article.attributes.publishedAt)}
          </span>
          {creator && (
            <span className="text-xs text-accent">{creator.name}</span>
          )}
        </div>
        <p className="py-4">{article.attributes.description}</p>
      </div>
    </Link>
  );
};

export { ArticleThumbnail };
