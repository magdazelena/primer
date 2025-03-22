import { Product } from "@/types/product";
import { ImageSlider } from "@/components/ImageSlider";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { CreatorThumbnail } from "@/app/[lang]/creators/components/CreatorThumbnail";

export default function ProductView({data}: {data: Product} ) {
  const { name, description, media, retailPrice, shortDescription, creator } =
    data;
  return (
    <article className="grid grid-cols-1 gap-2 pb-10 text-dark lg:grid-cols-3 lg:gap-4">
      <div className="col-span-12 space-y-6 lg:col-span-2">
        {media && <ImageSlider images={media} />}
      </div>

      <div className="space-y-6 ">
        <h1 className="text-5xl font-bold leading-tight ">{name}</h1>
        <div className="text-dark">
          <h4>{retailPrice.toFixed(2)}</h4>
          <div>{shortDescription}</div>
        </div>
      </div>
      <div className="rich-text col-span-12 text-dark">
        <hr />
        <div className="lg:px-10 ">
          <BlocksRenderer content={description} />
        </div>
      </div>
      <div className="col-span-12">
        {creator && <CreatorThumbnail creator={creator} />}
      </div>
    </article>
  );
}
