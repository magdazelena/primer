import Link from "next/link";
import Image from "next/image";
import { Card } from ".";
import { getStrapiMedia } from "@/utils/api-helpers";

const CardSmall = ({ data }: { data: Partial<Card> }) => {
  const { title, link, coverImage } = data;
  const imgUrl = getStrapiMedia(coverImage?.data.attributes.url || "");
  return (
    <div>
      <Image
        src={imgUrl || ""}
        alt={coverImage?.data.attributes.alternativeText || "card cover image"}
        width={300}
        height={300}
      />
      <h3>
        <Link href={link?.url || ""}>{title}</Link>
      </h3>
    </div>
  );
};

export default CardSmall;
