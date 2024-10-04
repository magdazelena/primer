import { Creator } from "@/types/creator";
import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const CreatorView = ({ creator }: { creator: Creator }) => {
  const { avatar, name, bio } = creator.attributes;
  const imageUrl = getStrapiMedia(avatar.data?.attributes.url);
  return (
    <article className="grid grid-cols-3 text-secondary">
      <div className="col-span-12 lg:col-span-2">
        <h1 className="leading-tight text-5xl font-bold ">{name}</h1>

        <div className="text-secondary max-w-[1000px] rich-text">
          <BlocksRenderer content={bio} />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-1 ">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="article cover image"
            width={400}
            height={400}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
      </div>
    </article>
  );
};

export { CreatorView };
