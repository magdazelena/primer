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
    const filters = filter
      ? {
          filters: {
            category: {
              slug: filter,
            },
          },
        }
      : {};
    const productsResponse = await fetchAPI(
      "/products",
      {
        populate: {
          coverImage: { fields: ["url"] },
          category: { fields: ["slug"] },
        },
        ...filters,
      },
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
    ["product-category"]: string;
  };
}) {
  const productCategory = params["product-category"];
  const { categories, products } = (await fetchSideMenuData(
    productCategory
  )) as Data;
  const filteredProducts = products.filter((product) => {
    return product.attributes.slug.trim() !== params.slug.trim();
  });

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
      attributes: {
        slug: string;
        category: {
          data: {
            attributes: {
              slug: string;
            };
          };
        };
      };
    }) => ({
      slug: product.attributes.slug,
      productCategory: product.attributes.category.data.attributes.slug,
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
