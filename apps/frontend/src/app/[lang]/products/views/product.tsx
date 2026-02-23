import { CreatorThumbnail } from "@/app/[lang]/creators/components/CreatorThumbnail";

import { ProductDescription } from "./Product/ProductDescription";
import { ProductMedia } from "./Product/ProductMedia";
import { ProductSide } from "./Product/ProductSide";

import type { Product } from "@/types/product";

export const ProductView = ({ data }: { data: Product }) => {
  const { name, description, media, retailPrice, shortDescription, creator } =
    data;
  return (
    <article className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 text-dark pb-10">
      <ProductMedia media={media} />
      <div className="space-y-6 col-span-12 lg:col-span-1">
        <ProductSide
          name={name}
          retailPrice={retailPrice}
          shortDescription={shortDescription}
        />
        {creator && <CreatorThumbnail creator={creator} />}
      </div>
      <ProductDescription description={description} />
    </article>
  );
};
