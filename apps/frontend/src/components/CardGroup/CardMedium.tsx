import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { Card } from ".";

const CardMedium = ({ data }: { data: Card }) => {
  const { title, link, coverImage } = data;
  const imgUrl = getStrapiMedia(coverImage.url);
  return (
    <div className="lg:mr-5 [&:nth-last-child(4n)]:mr-0 lg:max-w-[300px] pb-10">
      <Image
        src={imgUrl || ""}
        alt={coverImage.alternativeText || "card cover image"}
        width={400}
        height={400}
        className="aspect-square object-cover"
      />

      <div className="pt-5">
        <h3 className="font-bold text-xl font-display">{title}</h3>
        <p>
          <Link href={link.url}>{link.text}</Link>
        </p>
      </div>
    </div>
  );
};

export default CardMedium;
