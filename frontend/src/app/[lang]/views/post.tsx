import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";
import componentResolver from "../utils/component-resolver";
import { Article } from "@/types/article";

export default function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, authorsBio } =
    data.attributes;
  const author = authorsBio.data?.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  const authorImgUrl = getStrapiMedia(
    authorsBio.data?.attributes.avatar.data.attributes.url
  );

  return (
    <article className="space-y-8 text-secondary">
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
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-accent2">
          <div className="flex items-center md:space-x-2">
            {authorImgUrl && (
              <Image
                src={authorImgUrl}
                alt="article cover image"
                width={400}
                height={400}
                className="w-14 h-14 border rounded-full bg-accent2/50 border-accent2"
              />
            )}
            <p className="text-md text-secondary">
              {author && author.name} • {formatDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="text-secondary max-w-[1000px]">
        <p>{description}</p>

        {data.attributes.blocks &&
          data.attributes.blocks.map((section: any, index: number) =>
            componentResolver(section, index)
          )}
      </div>
    </article>
  );
}
