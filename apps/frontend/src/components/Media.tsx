import { getStrapiMedia } from "@/api/api-helpers";
import Image from "next/image";

interface MediaProps {
  file: {
    id: string;
    url: string;
    name: string;
    alternativeText: string;
  };
}

export default function Media({ data }: { data: MediaProps }) {
  const imgUrl = getStrapiMedia(data.file.url);
  return (
    <div className="xl:h-112 2xl:h-128 mt-8 flex h-72 items-center justify-center sm:h-80 lg:mt-0 lg:h-96">
      <Image
        src={imgUrl || ""}
        alt={data.file.alternativeText || "none provided"}
        className="size-full overflow-hidden rounded-lg object-cover"
        width={400}
        height={400}
      />
    </div>
  );
}
