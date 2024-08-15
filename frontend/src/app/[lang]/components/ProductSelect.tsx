import Link from "next/link";
import { ProductCategory, Product } from "@/types/product";

function selectedFilter(current: string, selected: string) {
  return current === selected
    ? "px-3 py-1 rounded-lg hover:underline dark:bg-violet-700 dark:text-gray-100"
    : "px-3 py-1 rounded-lg hover:underline dark:bg-violet-400 dark:text-gray-900";
}

export default function ProductSelect({
  categories,
  products,
  params,
}: {
  categories: ProductCategory[];
  products: Product[];
  params: {
    PID: string;
    productCategory: string;
  };
}) {
  return (
    <div className="p-4 rounded-lg dark:bg-gray-900 min-h-[365px] relative">
      <h4 className="text-xl font-semibold">Browse By ProductCategory</h4>

      <div>
        <div className="flex flex-wrap py-6 space-x-2 dark:border-gray-400">
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
          <ul className="ml-4 space-y-1 list-disc">
            {products.map((product: Product) => {
              return (
                <li>
                  <Link
                    rel="noopener noreferrer"
                    href={`/products/${params.productCategory}/${product.attributes.slug}`}
                    className={`${
                      params.PID === product.attributes.slug &&
                      "text-violet-400"
                    }  hover:underline hover:text-violet-400 transition-colors duration-200`}
                  >
                    {product.attributes.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
