import { Product } from "@/types/product";
import { ProductThumbnail } from "../../../components/ProductThumbnail";

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
        {products.map((product) => (
          <ProductThumbnail product={product} />
        ))}
      </div>
      {children && children}
    </section>
  );
}
