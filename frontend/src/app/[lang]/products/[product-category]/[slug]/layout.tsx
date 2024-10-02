import ProductSelect from "@/app/[lang]/components/ProductSelect";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import { Product, ProductCategory } from "@/types/product";

async function fetchSideMenuData(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const categoriesResponse = await fetchAPI(
      "/product-categories",
      { populate: "*" },
      options
    );

    const productsResponse = await fetchAPI(
      "/products",
      filter
        ? {
            filters: {
              category: {
                name: filter,
              },
            },
          }
        : {},
      options
    );

    return {
      products: productsResponse.data,
      categories: categoriesResponse.data,
    };
  } catch (error) {
    console.error(error);
  }
}

interface Data {
  products: Product[];
  categories: ProductCategory[];
}

export default async function LayoutRoute({
  params,
  children,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
    productCategory: string;
  };
}) {
  const { productCategory } = params;
  const { categories, products } = (await fetchSideMenuData(
    productCategory
  )) as Data;

  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div>
        {children}
        <ProductSelect
          categories={categories}
          products={products}
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
      populate: ["productCategory"],
    },
    options
  );

  return productResponse.data.map(
    (product: {
      attributes: {
        slug: string;
        productCategory: {
          slug: string;
        };
      };
    }) => ({
      slug: product.attributes.slug,
      productCategory: product.attributes.slug,
    })
  );
}
