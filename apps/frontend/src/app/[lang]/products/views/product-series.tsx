import { Product } from "@/types/product";
import { ProductMedia } from "./Product/ProductMedia";
import { ProductSide } from "./Product/ProductSide";
import { ProductDescription } from "./Product/ProductDescription";
import { CreatorThumbnail } from "@/app/[lang]/creators/components/CreatorThumbnail";
import  List  from "./product-list";

export default function ProductSeriesView({series, products}: {series: Product, products: Product[]} ) {
  const { name, description, media, shortDescription, creator } =
    series;
    const getRetailRange = () => {
        const prices = products.map((product) => product.retailPrice);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        if (min === max) {
            return min;
        }
        return min + " - " + max;
    }
  return (
    <article className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 text-dark pb-10">
     
      <ProductMedia media={media} />
      <ProductSide name={name} retailPrice={getRetailRange()} shortDescription={shortDescription} />
      <ProductDescription description={description} />
      <div className="col-span-12">
        {creator && <CreatorThumbnail creator={creator} />}
      </div>
      <div className="container p-8 mx-auto space-y-6 sm:space-y-12">
        <h2 className="text-2xl font-bold">{products.length} product{products.length > 1 ? "s" : ""} available in this series:</h2>
        <List products={products} />
      </div>
    </article>
  );
}
