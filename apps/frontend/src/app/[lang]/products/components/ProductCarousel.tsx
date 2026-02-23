import { ProductThumbnail } from "./ProductThumbnail";

import type { Product } from "@/types/product";

const ProductCarousel = ({
  products,
  title,
}: {
  products: Product[];
  title?: string;
}) => {
  return (
    <div className="space-y-2">
      <hr />
      <h4 className="text-lg font-semibold">
        {title || "Products You May Like"}
      </h4>
      <div className="py-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <ProductThumbnail key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export { ProductCarousel };
