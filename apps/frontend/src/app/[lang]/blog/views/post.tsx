import { formatDate, getStrapiMedia } from "@/api/api-helpers";
import Image from "next/image";
import componentResolver from "@/utils/component-resolver";
import { Article } from "@/types/article";
import { CreatorThumbnail } from "@/app/[lang]/creators/components/CreatorThumbnail";

export default function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, coverImage, creator } = data;

  const imageUrl = getStrapiMedia(coverImage.url);
  const creatorImgUrl = getStrapiMedia(
    creator.avatar.url
  );

  return (
    <article className="space-y-8 text-dark">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          className="h-96 w-full rounded-lg object-cover"
        />
      )}
      <div className="space-y-6">
        <p className="text-lg italic">{description}</p>
        <hr />
        <h1 className="text-5xl font-bold leading-tight ">{title}</h1>
        <div className="text-accentDarkDark flex w-full flex-col items-start justify-between md:flex-row md:items-center">
          <div className="flex items-center md:space-x-2">
            {creatorImgUrl && (
              <Image
                src={creatorImgUrl}
                alt="article cover image"
                width={400}
                height={400}
                className="bg-accentDarkDark/50 border-accentDarkDark size-14 rounded-full border"
              />
            )}
            <p className="text-md text-dark">
              {creator && creator.name} • {formatDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] pb-5 text-dark">
        {data.blocks &&
          data.blocks.map((section: any, index: number) =>
            componentResolver(section, index)
          )}
      </div>
      <div className="col-span-12">
        {creator && <CreatorThumbnail creator={creator} />}
      </div>
    </article>
  );
}
