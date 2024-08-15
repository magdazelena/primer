import PageHeader from "@/app/[lang]/components/PageHeader";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import List from "@/app/[lang]/views/product-list";

async function fetchPostsByCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/products`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: {
        productCategory: {
          slug: filter,
        },
      },
      populate: {
        coverImage: { fields: ["url"] },
        productCategory: {
          populate: "*",
        },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoryRoute({
  params,
}: {
  params: { category: string };
}) {
  const filter = params.category;
  const { data } = await fetchPostsByCategory(filter);

  //TODO: CREATE A COMPONENT FOR THIS
  if (data.length === 0) return <div>Not Posts In this category</div>;

  const { name, description } =
    data[0]?.attributes.productCategory.data.attributes;

  return (
    <div>
      <PageHeader heading={name} text="description" />
      <List data={data} />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}
