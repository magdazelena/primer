import Link from "next/link";
import Image from "next/image";
import { Card } from ".";
import { getStrapiMedia } from "../../utils/api-helpers";

const CardLarge = ({ data }: { data: Card }) => {
  const { title, link, lead, coverImage } = data;
  const imgUrl = getStrapiMedia(coverImage.data.attributes.url);
  return (
    <div className="mr-5 even:mr-0 lg:max-w-[50vw] mb-10">
      <Image
        src={imgUrl || ""}
        alt={coverImage.data.attributes.alternativeText || "card cover image"}
        width={600}
        height={300}
        className="aspect-[3/2] object-cover"
      />
      <div className="pt-5">
        <h3 className="font-bold text-2xl">{title}</h3>
        {lead && <p className="py-2">{lead}</p>}
        <p>
          <Link href={link.url}>{link.text}</Link>
        </p>
      </div>
    </div>
  );
};

export default CardLarge;
