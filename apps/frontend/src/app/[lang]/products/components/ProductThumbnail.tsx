import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/api/api-helpers";

const ProductThumbnail = ({ product }: { product: Product }) => {
  const imageUrl = getStrapiMedia(
    product.coverImage?.url
  );

  const category = product.category;

  return (
    <Link
      href={`/products/${category?.slug}/${product.slug}`}
      key={product.id}
      className="max-w-sm mb-3 lg:mr-8 group hover:no-underline focus:no-underline w-[250px] lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
      data-testid="product-card"
    >
      {imageUrl && (
        <Image
          alt="presentation"
          width="240"
          height="240"
          className="object-cover w-full h-44 "
          src={imageUrl}
        />
      )}
      <div className="p-6 space-y-2 relative text-dark">
        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {product.name}
        </h3>

        <div className="flex justify-between items-center">
          <h4 className="font-bold">
            {product.retailPrice.toFixed(2)}
          </h4>
        </div>
        <p>{product.shortDescription}</p>
      </div>
    </Link>
  );
};

export { ProductThumbnail };
