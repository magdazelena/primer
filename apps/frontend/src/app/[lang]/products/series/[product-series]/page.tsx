import { fetchProductsAndSeries } from "@/api/requests/get-products-by-series";
import { PageHeader } from "@/components/PageHeader";

import { ProductSeriesView } from "../../views/product-series";

const ProductSeriesRoute = async (props: {
  params: Promise<{ "product-series": string }>;
}) => {
  const params = await props.params;
  const filter = params["product-series"];
  const data = await fetchProductsAndSeries(filter);
  //TODO: CREATE A COMPONENT FOR THIS
  if (!data || data.products.length === 0)
    return <div>Not products in this series</div>;

  const { productSeries, products } = data;
  return (
    <div>
      <PageHeader
        heading={`Series: ${productSeries.name}`}
        text={productSeries.shortDescription}
      />
      <ProductSeriesView series={productSeries} products={products} />
    </div>
  );
};

export async function generateStaticParams() {
  return [];
}

export default ProductSeriesRoute;
