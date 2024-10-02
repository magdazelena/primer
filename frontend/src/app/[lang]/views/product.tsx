import { Product } from "@/types/product";
import { ImageSlider } from "../components/ImageSlider";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function ProductView({ data }: { data: Product }) {
  const { name, description, media, retailPrice, shortDescription } =
    data.attributes;
  return (
    <article className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 text-secondary">
      <div className="space-y-6 col-span-2">
        {media && <ImageSlider images={media.data} />}
      </div>

      <div className="space-y-6 ">
        <h1 className="leading-tight text-5xl font-bold ">{name}</h1>
        <div className="text-secondary">
          <div className="">{retailPrice.toFixed(2)}</div>
          <div>{shortDescription}</div>
        </div>
      </div>
      <div className="text-secondary col-span-12">
        <BlocksRenderer content={description} />
      </div>
    </article>
  );
}
