import { Creator } from "@/types/creator";
import { getStrapiMedia } from "@/api/api-helpers";
import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

const CreatorView = ({ creator }: { creator: Creator }) => {
  const { avatar, name, bio, lead, email } = creator;
  const imageUrl = getStrapiMedia(avatar.url);
  return (
    <article className="grid grid-cols-3 lg:gap-20 text-dark">
      <div className="col-span-12 lg:col-span-2 ">
        <h1 className="leading-tight text-5xl font-bold ">{name}</h1>
        <p className="text-lg italic py-5">{lead}</p>
        <hr className="mb-5 h-[2px] bg-dark" />
        <div className="text-dark max-w-[1000px] rich-text">
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
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
      </div>
    </article>
  );
};

export { CreatorView };
