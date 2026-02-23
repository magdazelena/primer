import { getStrapiMedia } from "@/api/api-helpers";
import Image from "next/image";
import Link from "next/link";

import type { Creator } from "@/types/creator";

const CreatorThumbnail = ({ creator }: { creator: Creator }) => {
  const { avatar, name, slug, lead } = creator;
  const authorImgUrl = getStrapiMedia(avatar.url);
  return (
    <Link href={`/creators/${slug}`} className="block thumbnail-link p-2">
      <div className="grid grid-cols-4 gap-2">
        {authorImgUrl && (
          <div className="relative aspect-box aspect-1-1 overflow-hidden rounded-xl col-span-1">
            <Image
              src={authorImgUrl}
              alt="article cover image"
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="pt-5 lg:pt-0 col-span-3">
          <span className="label primary text-xs">Creator</span>
          <h5 className="text-lg font-bold text-dark pb-2">{name}</h5>
          <p>{lead}</p>
        </div>
      </div>
    </Link>
  );
};

export { CreatorThumbnail };
