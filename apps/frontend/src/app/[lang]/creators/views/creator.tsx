import { Creator } from "@/types/creator";
import { getStrapiMedia } from "@/api/api-helpers";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const CreatorView = ({ creator }: { creator: Creator }) => {
  const { avatar, name, bio, lead, email } = creator;
  const imageUrl = getStrapiMedia(avatar.url);
  return (
    <article className="grid grid-cols-3 text-dark lg:gap-20">
      <div className="col-span-12 lg:col-span-2 ">
        <h1 className="text-5xl font-bold leading-tight ">{name}</h1>
        <p className="py-5 text-lg italic">{lead}</p>
        <hr className="mb-5 h-[2px] bg-dark" />
        <div className="rich-text max-w-[1000px] text-dark">
          <BlocksRenderer content={bio} />
          {email && (
            <>
              Write to me: <a href={`mailto:${email}`}>{email}</a>
            </>
          )}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-1 ">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="article cover image"
            width={400}
            height={400}
            className="h-96 w-full rounded-lg object-cover"
          />
        )}
      </div>
    </article>
  );
};

export { CreatorView };
