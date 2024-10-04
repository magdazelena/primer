import { Creator } from "@/types/creator";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";
import Link from "next/link";

const CreatorThumbnail = ({ creator }: { creator: Creator }) => {
  const { avatar, name, slug, lead } = creator.attributes;
  const authorImgUrl = getStrapiMedia(avatar.data.attributes.url);
  return (
    <div className="flex items-center ">
      {authorImgUrl && (
        <Image
          src={authorImgUrl}
          alt="article cover image"
          width={200}
          height={200}
          className="w-14 h-14 border rounded-full bg-accent2/50 border-accent2"
        />
      )}
      <div className="pl-5">
        <h5 className="text-lg bold text-secondary pb-5">{name}</h5>
        <p>{lead}</p>
        <Link href={`/creators/${slug}`}>Find out more about {name} here.</Link>
      </div>
    </div>
  );
};

export { CreatorThumbnail };
