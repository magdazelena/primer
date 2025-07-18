import { getStrapiMedia } from "@/api/api-helpers";
import Image from "next/image";
import Link from "next/link";

import type { Creator } from "@/types/creator";

const CreatorThumbnailListItem = ({ creator }: { creator: Creator }) => {
  const { avatar, name, slug } = creator;
  const imageUrl = getStrapiMedia(avatar.url);

  return (
    <Link
      href={`/creators/${slug}`}
      key={creator.id}
      className="
           group col-span-12 sm:col-span-1 lg:mr-3 mb-5 hover:no-underline focus:no-underline w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
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
        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {name}
        </h3>
      </div>
    </Link>
  );
};
export { CreatorThumbnailListItem };
