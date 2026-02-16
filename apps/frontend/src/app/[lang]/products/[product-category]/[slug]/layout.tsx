import { fetchSideMenuData } from "@/api/requests/get-side-menu-data";
import { findParentCategory } from "@/utils/find-parent-category";

import { ProductSelect } from "../../components/ProductSelect";

const LayoutRoute = async (props: {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
    ["product-category"]: string;
  }>;
}) => {
  const params = await props.params;
  const { children } = props;

  const productCategory = params["product-category"];

  const { categories, products } = await fetchSideMenuData(productCategory);

  const filteredProducts = products.filter((product) => {
    return product.slug.trim() !== params.slug.trim();
  });

  if (filteredProducts.length === 0) {
    const parentCategory = findParentCategory(categories, productCategory);

    if (parentCategory) {
      const { products: otherProducts } = await fetchSideMenuData(
        parentCategory.slug
      );
      return (
        <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
          <div>
            {children}
            <ProductSelect
              categories={categories}
              products={otherProducts}
              params={params}
            />
          </div>
        </section>
      );
    }
  }

  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div>
        {children}
        <ProductSelect
          categories={categories}
          products={filteredProducts}
          params={params}
        />
      </div>
    </section>
  );
};


export default LayoutRoute;
