import { formatDate, getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import componentResolver from "@/utils/component-resolver";
import { Article } from "@/types/article";
import { CreatorThumbnail } from "@/app/[lang]/creators/components/CreatorThumbnail";

export default function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, creator } = data;
  const author = creator.data?;
  const imageUrl = getStrapiMedia(cover.data?.url);
  const authorImgUrl = getStrapiMedia(
    creator.data?.avatar.data.url
  );

  return (
    <article className="space-y-8 text-dark">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
      )}
      <div className="space-y-6">
        <p className="text-lg italic">{description}</p>
        <hr />
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-accentDarkDark">
          <div className="flex items-center md:space-x-2">
            {authorImgUrl && (
              <Image
                src={authorImgUrl}
                alt="article cover image"
                width={400}
                height={400}
                className="w-14 h-14 border rounded-full bg-accentDarkDark/50 border-accentDarkDark"
              />
            )}
            <p className="text-md text-dark">
              {author && author.name} • {formatDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="text-dark max-w-[1000px] pb-5">
        {data.blocks &&
          data.blocks.map((section: any, index: number) =>
            componentResolver(section, index)
          )}
      </div>
      <div className="col-span-12">
        {creator?.data && <CreatorThumbnail creator={creator.data} />}
      </div>
    </article>
  );
}
