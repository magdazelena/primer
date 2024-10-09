import Link from "next/link";
import Image from "next/image";
import { Card } from ".";
import { getStrapiMedia } from "../../utils/api-helpers";

const CardLarge = ({ data }: { data: Card }) => {
  const { title, link, lead, coverImage } = data;
  const imgUrl = getStrapiMedia(coverImage.data.attributes.url);
  return (
    <div>
      <Image
        src={imgUrl || ""}
        alt={coverImage.data.attributes.alternativeText || "card cover image"}
        width={600}
        height={300}
      />
      <div>
        <h3>{title}</h3>
        <p>{lead}</p>
        <p>
          <Link href={link.url}>{link.text}</Link>
        </p>
      </div>
    </div>
  );
};

export default CardLarge;
