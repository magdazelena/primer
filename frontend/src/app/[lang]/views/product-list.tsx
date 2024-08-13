import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface Product {
  id: number;
  attributes: {
    name: string;
    description: string[];
    PID: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    productCategory: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
  };
}

export default function ProductList({
  data: products,
  children,
}: {
  data: Product[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          console.dir(product);
          const imageUrl = getStrapiMedia(
            product.attributes.image.data?.attributes.url
          );

          const category = product.attributes.productCategory.data?.attributes;

          return (
            <Link
              href={`/products/${category?.slug}/${product.attributes.PID}`}
              key={product.id}
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-2xl overflow-hidden shadow-lg"
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
              <div className="p-6 space-y-2 relative">
                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {product.attributes.name}
                </h3>

                <div className="flex justify-between items-center">
                  <span className="text-xs dark:text-gray-400">
                    {formatDate(product.attributes.publishedAt)}
                  </span>
                </div>
                <p className="py-4">description</p>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
