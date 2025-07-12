import { getStrapiMedia } from "@/api/api-helpers";
import Image from "next/image";
import Link from "next/link";

import type { Card } from ".";

interface CardSmallProps {
  data: Card;
}

export const CardSmall = (props: CardSmallProps) => {
  const { title, link, coverImage } = props.data;
  const imgUrl = getStrapiMedia(coverImage.url);
  return (
    <div className="pb-10 max-w-[200px]">
      <Image
        src={imgUrl || ""}
        alt={coverImage.alternativeText || "card cover image"}
        width={300}
        height={300}
        className="mb-3 aspect-square object-cover"
      />

      <Link href={link.url} className="text-xl font-display">
        {title}
      </Link>
    </div>
  );
};
