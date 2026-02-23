import { CreatorThumbnail } from "@/app/[lang]/creators/components/CreatorThumbnail";

import { ProductDescription } from "./Product/ProductDescription";
import { ProductMedia } from "./Product/ProductMedia";
import { ProductSide } from "./Product/ProductSide";

import type { Product } from "@/types/product";
import type { BreadcrumbItem } from "@/utils/get-category-breadcrumb-trail";

export const ProductView = ({
  data,
  breadcrumbTrail,
}: {
  data: Product;
  breadcrumbTrail?: BreadcrumbItem[];
}) => {
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
          breadcrumbTrail={breadcrumbTrail}
        />
        {creator && <CreatorThumbnail creator={creator} />}
      </div>
      <ProductDescription description={description} />
    </article>
  );
};
