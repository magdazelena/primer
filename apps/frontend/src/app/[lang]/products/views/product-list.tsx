import { ProductThumbnail } from "../components/ProductThumbnail";

import type { Product } from "@/types/product";

export const ProductList = ({
  products,
  children,
}: {
  products: Product[];
  children?: React.ReactNode;
}) => {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductThumbnail key={product.id} product={product} />
        ))}
      </div>
      {children && children}
    </section>
  );
};
