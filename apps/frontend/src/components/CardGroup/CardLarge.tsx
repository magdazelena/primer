import Link from "next/link";
import Image from "next/image";
import { Card } from ".";
import { getStrapiMedia } from "@/api/api-helpers";

const CardLarge = ({ data }: { data: Card }) => {
  const { title, link, lead, coverImage } = data;
  const imgUrl = getStrapiMedia(coverImage.url);
  return (
    <div className="mb-10 mr-5 even:mr-0 lg:max-w-[50vw]">
      <Image
        src={imgUrl || ""}
        alt={coverImage.alternativeText || "card cover image"}
        width={600}
        height={300}
        className="aspect-[3/2] object-cover"
      />
      <div className="pt-5">
        <h3 className="font-display text-2xl font-bold">{title}</h3>
        {lead && <p className="py-2">{lead}</p>}
        <p>
          <Link href={link.url}>{link.text}</Link>
        </p>
      </div>
    </div>
  );
};

export default CardLarge;
