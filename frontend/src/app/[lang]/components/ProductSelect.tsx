import { ProductCategory, Product } from "@/types/product";
import { ProductThumbnail } from "./ProductThumbnail";
import { CategoryThumbnail } from "./CategoryThumbnail";
import { findParentCategory } from "../utils/find-parent-category";
import { ProductCarousel } from "./ProductCarousel";

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
      <h4 className="text-xl font-semibold">
        See products in other categories
      </h4>

      <div>
        <div className="flex flex-wrap py-6 space-x-2 border-accent">
          {categories.map((productCategory: ProductCategory) => {
            if (productCategory.attributes.products.data.length === 0)
              return null;
            return (
              <CategoryThumbnail
                key={productCategory.id}
                categoryName={productCategory.attributes.name}
                categorySlug={productCategory.attributes.slug}
                selected={params["product-category"]}
                basePath="/products"
              />
            );
          })}
          <CategoryThumbnail
            categoryName={`${
              parentCategory ? parentCategory.attributes.name : "All products"
            }`}
            categorySlug={`${
              parentCategory ? parentCategory.attributes.slug : ""
            }`}
            selected="filter"
            basePath="/products"
          />
        </div>

        {products.length > 0 && <ProductCarousel products={products} />}
      </div>
    </div>
  );
}
