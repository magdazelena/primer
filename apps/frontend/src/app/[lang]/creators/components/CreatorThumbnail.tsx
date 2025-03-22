import { Creator } from "@/types/creator";
import { getStrapiMedia } from "@/api/api-helpers";
import Image from "next/image";
import Link from "next/link";

const CreatorThumbnail = ({ creator }: { creator: Creator }) => {
  const { avatar, name, slug, lead } = creator;
  const authorImgUrl = getStrapiMedia(avatar.url);
  return (
    <div className="bg-accentDarkDark/30 flex flex-wrap items-center justify-end p-10 lg:justify-start">
      {authorImgUrl && (
        <Image
          src={authorImgUrl}
          alt="article cover image"
          width={200}
          height={200}
          className="bg-accentDarkDark/50 border-accentDarkDark size-24 rounded-full border"
        />
      )}
      <div className="pt-5 lg:ml-5 lg:border-l-2 lg:border-l-dark lg:pl-5 lg:pt-0">
        <h5 className="pb-5 text-lg font-bold text-dark">{name}</h5>
        <p>{lead}</p>
        <Link href={`/creators/${slug}`}>Find out more about {name} here.</Link>
      </div>
    </div>
  );
};

export { CreatorThumbnail };
