import Link from "next/link";
import { ProductCategory, Product } from "@/types/product";
import { ProductThumbnail } from "./ProductThumbnail";

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "px-3 py-1 rounded-lg hover:underline bg-accent text-primary"
    : "px-3 py-1 rounded-lg hover:underline bg-accent/50 text-secondary";
}

export default function ProductSelect({
  categories,
  products,
  params,
}: {
  categories: ProductCategory[];
  products: Product[];
  params: {
    slug: string;
    productCategory: string;
  };
}) {
  return (
    <div className="p-4 rounded-lg  min-h-[365px] relative">
      <h4 className="text-xl font-semibold">Browse By ProductCategory</h4>

      <div>
        <div className="flex flex-wrap py-6 space-x-2 border-accent">
          {categories.map((productCategory: ProductCategory) => {
            if (productCategory.attributes.products.data.length === 0)
              return null;
            return (
              <Link
                href={`/products/${productCategory.attributes.slug}`}
                className={selectedFilter(
                  productCategory.attributes.slug,
                  params.productCategory
                )}
              >
                #{productCategory.attributes.name}
              </Link>
            );
          })}
          <Link href={"/products"} className={selectedFilter("", "filter")}>
            #all
          </Link>
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Other Posts You May Like</h4>
          <div className="space-y-1 flex justify-start">
            {products.map((product: Product) => (
              <ProductThumbnail product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
