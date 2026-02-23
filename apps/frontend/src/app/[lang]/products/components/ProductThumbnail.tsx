import { getStrapiMedia } from "@/api/api-helpers";
import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";

const ProductThumbnail = ({ product }: { product: Product }) => {
  const imageUrl = getStrapiMedia(product.coverImage?.url);

  const category = product.category;

  return (
    <Link
      href={`/products/${category?.slug}/${product.slug}`}
      key={product.id}
      className="group hover:no-underline focus:no-underline rounded-lg overflow-hidden thumbnail-link p-2 relative"
      data-testid="product-card"
    >
      <div className="aspect-box aspect-1-1">
        {imageUrl && (
          <Image
            alt="presentation"
            fill
            className="object-cover"
            src={imageUrl}
          />
        )}
      </div>
      {category?.name && (
        <span className="label primary text-xs absolute top-4 right-4">
          {category.name}
        </span>
      )}
      <div className="pt-6 space-y-2 relative text-dark">
        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {product.name}
        </h3>
        {product.creator?.name && (
          <h4 className="text-sm">{product.creator?.name}</h4>
        )}
        <div className="flex justify-between items-center">
          <h4 className="font-bold">{product.retailPrice.toFixed(2)}</h4>
        </div>
        <p>{product.shortDescription}</p>
      </div>
    </Link>
  );
};

export { ProductThumbnail };
