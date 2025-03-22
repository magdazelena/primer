import ProductSelect from "../../components/ProductSelect";
import { findParentCategory } from "@/utils/find-parent-category";
import { fetchSideMenuData } from "@/api/requests/get-side-menu-data";
import { getProductSlugAndCategoryList } from "@/api/requests/get-product-list";



export default async function LayoutRoute(props: {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
    ["product-category"]: string;
  }>;
}) {
  const params = await props.params;

  const { children } = props;

  const productCategory = params["product-category"];

  const { categories, products } = await fetchSideMenuData(
    productCategory
  );
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
        <section className="container mx-auto space-y-6 p-8 sm:space-y-12">
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
    <section className="container mx-auto space-y-6 p-8 sm:space-y-12">
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
}

export async function generateStaticParams() {
  const params = await getProductSlugAndCategoryList()
  return params;
}
export async function getStaticPaths() {
  const paths = await generateStaticParams(); 
  return {
    paths,
    fallback: false, 
  };
}
