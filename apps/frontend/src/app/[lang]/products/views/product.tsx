import { Product } from "@/types/product";
import { ImageSlider } from "@/components/ImageSlider";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { CreatorThumbnail } from "@/app/[lang]/creators/components/CreatorThumbnail";

export default function ProductView({data}: {data: Product} ) {
  const { name, description, media, retailPrice, shortDescription, creator } =
    data;
  return (
    <article className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 text-dark pb-10">
      <div className="space-y-6 col-span-12 lg:col-span-2">
        {media && <ImageSlider images={media} />}
      </div>

      <div className="space-y-6 ">
        <h1 className="leading-tight text-5xl font-bold ">{name}</h1>
        <div className="text-dark">
          <h4>{retailPrice.toFixed(2)}</h4>
          <div>{shortDescription}</div>
        </div>
      </div>
      <div className="text-dark col-span-12 rich-text">
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
