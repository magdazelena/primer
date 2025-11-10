import { CreatorThumbnail } from "@/app/[lang]/creators/components/CreatorThumbnail";

import { ProductDescription } from "./Product/ProductDescription";
import { ProductMedia } from "./Product/ProductMedia";
import { ProductSide } from "./Product/ProductSide";
import { ProductList } from "./product-list";

import type { Product } from "@/types/product";

interface ProductSeriesViewProps {
  series: Product;
  products: Product[];
}

export const ProductSeriesView = (props: ProductSeriesViewProps) => {
  const { name, description, media, shortDescription, creator } = props.series;
  const getRetailRange = () => {
    const prices = props.products.map((product) => product.retailPrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    if (min === max) {
      return min;
    }
    return min + " - " + max;
  };
  return (
    <article
      className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4 text-dark pb-10"
      data-testid="product-series-view"
    >
      <ProductMedia media={media} />
      <ProductSide
        name={name}
        retailPrice={getRetailRange()}
        shortDescription={shortDescription}
      />
      <ProductDescription description={description} />
      <div className="col-span-12">
        {creator && <CreatorThumbnail creator={creator} />}
      </div>
      <div className="container p-8 mx-auto space-y-6 sm:space-y-12">
        <h2 className="text-2xl font-bold">
          {props.products.length} product{props.products.length > 1 ? "s" : ""}{" "}
          available in this series:
        </h2>
        <ProductList products={props.products} />
      </div>
    </article>
  );
};
