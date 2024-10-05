import { Product } from "@/types/product";
import { ProductThumbnail } from "./ProductThumbnail";

const ProductCarousel = ({ products }: { products: Product[] }) => {
  return (
    <div className="space-y-2">
      <hr />
      <h4 className="text-lg font-semibold">Other Posts You May Like</h4>
      <div className="py-5 flex flex-wrap justify-center lg:justify-start">
        {products.map((product: Product) => (
          <ProductThumbnail key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export { ProductCarousel };
