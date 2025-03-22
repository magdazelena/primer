import { Product } from "@/types/product";
import { ProductThumbnail } from "../components/ProductThumbnail";

export default function ProductList({
  products,
  children,
}: {
  products: Product[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container mx-auto space-y-6 p-6 sm:space-y-12">
      <div className="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductThumbnail product={product} />
        ))}
      </div>
      {children && children}
    </section>
  );
}
