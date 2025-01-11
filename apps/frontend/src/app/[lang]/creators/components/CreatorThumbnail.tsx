import { Creator } from "@/types/creator";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import Link from "next/link";

const CreatorThumbnail = ({ creator }: { creator: Creator }) => {
  const { avatar, name, slug, lead } = creator;
  const authorImgUrl = getStrapiMedia(avatar.data.url);
  return (
    <div className="flex flex-wrap justify-end lg:justify-start items-center bg-accentDarkDark/30 p-10">
      {authorImgUrl && (
        <Image
          src={authorImgUrl}
          alt="article cover image"
          width={200}
          height={200}
          className="w-24 h-24 border rounded-full bg-accentDarkDark/50 border-accentDarkDark"
        />
      )}
      <div className="pt-5 lg:pt-0 lg:pl-5 lg:border-l-[2px] lg:border-l-dark lg:ml-5">
        <h5 className="text-lg font-bold text-dark pb-5">{name}</h5>
        <p>{lead}</p>
        <Link href={`/creators/${slug}`}>Find out more about {name} here.</Link>
      </div>
    </div>
  );
};

export { CreatorThumbnail };
