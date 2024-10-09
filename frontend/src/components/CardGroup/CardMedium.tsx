import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/utils/api-helpers";
import { Card } from ".";

const CardMedium = ({ data }: { data: Card }) => {
  const { title, link, coverImage } = data;
  const imgUrl = getStrapiMedia(coverImage.data.attributes.url);
  return (
    <div className="mr-5 last:mr-0 lg:max-w-[300px]">
      <div className="aspect-square text-center overflow-hidden">
        <Image
          src={imgUrl || ""}
          alt={coverImage.data.attributes.alternativeText || "card cover image"}
          width={400}
          height={400}
          className="min-h-full"
        />
      </div>

      <div className="pt-5">
        <h3 className="font-bold text-xl">{title}</h3>
        <p>
          <Link href={link.url}>{link.text}</Link>
        </p>
      </div>
    </div>
  );
};

export default CardMedium;
