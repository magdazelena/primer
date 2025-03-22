import Link from "next/link";
import Image from "next/image";
import { Creator } from "@/types/creator";
import { getStrapiMedia } from "@/api/api-helpers";

const CreatorThumbnailListItem = ({ creator }: { creator: Creator }) => {
  const { avatar, name, slug } = creator;
  const imageUrl = getStrapiMedia(avatar.url);

  return (
    <Link
      href={`/creators/${slug}`}
      key={creator.id}
      className="
           group col-span-12 mb-5 w-[300px] overflow-hidden rounded-2xl shadow-lg hover:no-underline focus:no-underline sm:col-span-1 lg:mr-3 xl:min-w-[375px]"
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
        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {name}
        </h3>
      </div>
    </Link>
  );
};
export { CreatorThumbnailListItem };
