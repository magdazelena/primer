import { ProductCategory, Product } from "@/types/product";
import { ProductThumbnail } from "./ProductThumbnail";
import { ProductCategoryThumbnail } from "./ProductCategoryThumbnail";
import { findParentCategory } from "../utils/find-parent-category";

export default function ProductSelect({
  categories,
  products,
  params,
}: {
  categories: ProductCategory[];
  products: Product[];
  params: {
    slug: string;
    ["product-category"]: string;
  };
}) {
  const parentCategory = findParentCategory(
    categories,
    params["product-category"]
  );
  return (
    <div className="p-4 rounded-lg  min-h-[365px] relative">
      <h4 className="text-xl font-semibold">Browse By ProductCategory</h4>

      <div>
        <div className="flex flex-wrap py-6 space-x-2 border-accent">
          {categories.map((productCategory: ProductCategory) => {
            if (productCategory.attributes.products.data.length === 0)
              return null;
            return (
              <ProductCategoryThumbnail
                key={productCategory.id}
                categoryName={productCategory.attributes.name}
                categorySlug={productCategory.attributes.slug}
                selected={params["product-category"]}
              />
            );
          })}
          <ProductCategoryThumbnail
            categoryName={`${
              parentCategory ? parentCategory.attributes.name : "All products"
            }`}
            categorySlug={`${
              parentCategory ? parentCategory.attributes.slug : ""
            }`}
            selected="filter"
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Other Posts You May Like</h4>
          <div className="space-y-1 flex justify-start">
            {products.map((product: Product) => (
              <ProductThumbnail key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
