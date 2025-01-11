import { ProductCategory, Product } from "@/types/product";
import { CategoryThumbnail } from "@/app/[lang]/creators/components/CategoryThumbnail";
import { findParentCategory } from "@/utils/find-parent-category";
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
        <div className="flex flex-wrap py-6 space-x-2 border-accentDark">
          {categories.map((productCategory: ProductCategory) => {
            if (productCategory.products.length === 0)
              return null;
            return (
              <CategoryThumbnail
                key={productCategory.id}
                categoryName={productCategory.name}
                categorySlug={productCategory.slug}
                selected={params["product-category"]}
                basePath="/products"
              />
            );
          })}
          <CategoryThumbnail
            categoryName={`${
              parentCategory ? parentCategory.name : "All products"
            }`}
            categorySlug={`${
              parentCategory ? parentCategory.slug : ""
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
