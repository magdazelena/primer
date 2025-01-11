import Link from "next/link";
import Image from "next/image";
import { Card } from ".";
import { getStrapiMedia } from "@/api/api-helpers";

const CardSmall = ({ data }: { data: Card }) => {
  const { title, link, coverImage } = data;
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

export default CardSmall;
