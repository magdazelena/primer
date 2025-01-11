import ProductSelect from "../../components/ProductSelect";
import { fetchAPI } from "@/api/fetch-api";
import { findParentCategory } from "@/utils/find-parent-category";
import { fetchSideMenuData } from "@/api/requests/get-side-menu-data";



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
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/products`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const productResponse = await fetchAPI(
    path,
    {
      populate: { category: { fields: ["slug"] } },
    },
    options
  );

  const staticParams = productResponse.data.map(
    (product: {
      slug: string;
      category: {
        slug: string;
      };
    }) => ({
      slug: product.slug,
      productCategory: product.category.slug,
    })
  );
  return staticParams;
}
export async function getStaticPaths() {
  const paths = await generateStaticParams(); // Use your generateStaticParams here
  return {
    paths,
    fallback: false, // Ensure correct behavior if a route is missing
  };
}
